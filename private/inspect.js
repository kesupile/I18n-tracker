const
  _ = require('lodash'),
  compare = require('../private/compare'),
  Omissions = require('../model/Omissions'),
  Nest = require('../model/Nest')

function trampoline  (fn) {

  while (typeof fn === 'function'){
    fn = fn()
  }

  return fn

}

function inspectNest(omissions, baseObj){

  //we split it because prop is of the form: 'parent.child.grandchild'
  const prop = omissions.inspectRoot
  const nestName = prop.split('.').pop();

  //get the nested Object
  const nestedObj = _.get(baseObj, prop)

  //check for strings
  return checkForString(omissions, baseObj, nestedObj, omissions.nests.find((nest) => nest.root === nestName))

}

function checkForString(omissions, baseObj, nestedObj, parentNest) {

  _.forEach(nestedObj, (val, key) => {
    if(typeof val === 'string' && parentNest === null){
      omissions.addProp(key)
    } else if(typeof val === 'string' && parentNest) {
      parentNest.addProp(key)
    } else {
      console.log(`key is: ${key}`)
      const nest = new Nest(key)
      nest.setFullRoot(omissions.getKeyWithRoot(key))
      parentNest ? parentNest.addChild(nest) : null
      omissions.addInspectProp(omissions.getKeyWithRoot(key), nest)
    }
  })

  //if there are more props to inspect, inspect those props
  if(omissions.inspectProps.length > 0){
    const prop = omissions.inspectProps.shift()
    omissions.setInspectRoot(prop)
    return inspectNest(omissions, baseObj)
  }

  return true

}


// baseobject, name of baseobject language, name of translation language, translation object
module.exports = (baseObj, baseName, transBaseName, translationObj) => {

  let omissions = new Omissions(baseName)
  omissions.setInspectRoot('')

  trampoline(checkForString(omissions, baseObj, baseObj, null))


  console.log('------ FINISHED INSPECTING---------');

  console.log('------ FINISHED COMPARING --------');

  console.log(JSON.stringify(omissions.nests,null,4))

  console.log(omissions.props)

  console.log(omissions.inspectProps);

  compare(omissions, translationObj)

  return omissions



  // compare(omissions, translationObj)
  //
  // return omissions
}

//Documents/Orion/I18n-tracker/dev/I18n-tracker
