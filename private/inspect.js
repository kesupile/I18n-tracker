const _ = require('lodash')

const compare = require('../private/compare')

const Omissions = require('../model/Omissions')

function trampoline  (f) {

}

function inspect (baseObj, root, translationObj) {


  let omissions = new Omissions(root)

  _.forEach(baseObj, (val, key) => {
    typeof val === 'string' ? omissions.addProp(key) : omissions.addInspectProp(key)
  })

  compare(omissions, translationObj)

  return omissions
}

const doesInspectExist = function(omissions, translationObj) {
  _.forEach(omissions.inspectProps, (value) => {
    translationObj[value] ? omissions.addNest(value) : omissions.add(value)
  })
}




module.exports = (baseObj, root, translationObj) => {

  let omissions = inspect(baseObj, root, translationObj)

  if(omissions.inspectProps.length > 0){
    doesInspectExist(omissions, translationObj)
  }

  omissions.logOmissions()
  console.log(omissions.nests)
  //console.log(omissions.inspectProps);
}
//Documents/Orion/I18n-tracker/dev/I18n-tracker
