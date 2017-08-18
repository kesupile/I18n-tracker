const _ = require('lodash')

const compare = require('../private/compare')

const Omissions = require('../model/Omissions')

const inspect = function(baseObj, root) {
  let omissions = new Omissions(root)

  _.forEach(baseObj, (val, key) => {
    typeof val === 'string' ? omissions.addProp(key) : omissions.addInspectProp(key)
  })

  compare(omissions, translationObj)
  omissions.logOmissions()

  return omissions
}

module.exports = (baseObj, root, translationObj) => {

  let omissions = inspect(baseObj, root)

  if(omissions.inspectProps.length > 0){

  }
  //console.log(omissions.inspectProps);
}
