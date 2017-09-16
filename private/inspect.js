const
  _ = require('lodash'),
  compare = require('../private/compare'),
  Omissions = require('../model/Omissions')

function trampoline  (fn) {

  while (typeof fn === 'function'){
    fn = fn()
  }

  return fn

}

function inspectNest(omissions, baseObj, prop){

  //get the nested Object
  const nestedObj = _.get(baseObj, prop, null)

  //check for strings
  return checkForString(omissions, baseObj, nestedObj)

}

function checkForString(omissions, baseObj, nestedObj) {

  _.forEach(nestedObj, (val, key) => {
    typeof val === 'string' ? omissions.addProp(omissions.getKeyWithRoot(key)) : omissions.addInspectProp(omissions.getKeyWithRoot(key))
  })

  //if there are more props to inspect, inspect those props
  if(omissions.inspectProps.length > 0){
    const prop = omissions.inspectProps.shift()
    omissions.setInspectRoot(prop)
    return inspectNest(omissions, baseObj, prop)
  }

  return true

}


// baseobject, name of baseobject language, name of translation language, translation object
module.exports = (baseObj, baseName, transBaseName, translationObj) => {

  console.log('about to log root');
  console.log(baseName);

  let omissions = new Omissions(baseName)
  omissions.setInspectRoot('')

  trampoline(checkForString(omissions, baseObj, baseObj))


  console.log('------ FINISHED INSPECTING---------');

  console.log(omissions.props)

  console.log(omissions.inspectProps)






  // //if the property is an string add it to the ommissions
  // //if the property is an object add it to the inspectProps
  // _.forEach(baseObj, (val, key) => {
  //   typeof val === 'string' ? omissions.addProp(key) : omissions.addInspectProp(key)
  // })
  //
  // compare(omissions, translationObj)
  //
  // return omissions
}

//Documents/Orion/I18n-tracker/dev/I18n-tracker
