const
  { get, forEach } = require('lodash'),
  Omissions = require('../model/Omissions'),
  Nest = require('../model/Nest')

function trampoline(fn){

  while (typeof fn === 'function'){
    fn = fn()
  }

  return fn

}

function inspectNest(omissions, baseObj){

  //get the nested Object
  const nestedObj = get(baseObj, omissions.inspectRoot)

  //check for strings
  return checkForString(omissions, baseObj, nestedObj, omissions.nests.find((nest) => nest.id === omissions.inspectId))

}

function checkForString(omissions, baseObj, nestedObj, parentNest) {

  forEach(nestedObj, (val, prop) => {
    if(typeof val === 'string' && parentNest === null){
      omissions.addProp(prop)
    } else if(typeof val === 'string' && parentNest) {
      parentNest.addProp(prop)
    } else {
      const nest = new Nest(prop)
      const root = omissions.getPropAsRoot(prop)
      nest.setFullRoot(root)
      parentNest ? parentNest.addChild(nest) : null
      omissions.addInspectProp(root, nest)
    }
  })

  //if there are more props to inspect, inspect those props
  if(omissions.inspectProps.length > 0){
    omissions.setInspectRoot()
    return inspectNest(omissions, baseObj)
  }

  return true

}


// baseobject, name of baseobject language
module.exports = (baseObj, baseName) => {

  const omissions = new Omissions(baseName)

  trampoline(checkForString(omissions, baseObj, baseObj, null))

  return omissions

}
