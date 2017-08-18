const _ = require('lodash')

const compare = require('../private/compare')
const Omissions = require('../model/Omissions')

module.exports = (baseObj, root, translationObj) => {
  let omissions = new Omissions(root)
  _.forEach(baseObj, (val, key) => {
    typeof val === 'string' ? omissions.addProp(key) : omissions.addInspectProp(key)
  })
  console.log('ommisions are: ');
  console.log(omissions.props);
  compare(omissions, translationObj)
  console.log('after comparing');
  console.log(omissions.logOmissions());
  //console.log(omissions.inspectProps);
}
