/* ------- for debugging --------------*/

require('colors')

const { forEach } = require('lodash')





module.exports = (omissions, langName, langObj) => {

  const comparison = omissions.newComparison(langName)

  forEach(omissions.props, (prop) => {
    //check whether the prop exists
    langObj[prop] ? null : comparison.addOmission(prop)
  })


  /*
  //check the basic props first
  _.forEach(omissions.props, (value) => {
    //check whether the prop exists
    // translationFile[value] ? null : omissions.add(value)
    _.get(translationFile, value, null) === null ? omissions.add(value) : null
  }) */

  //check the nested props next

  //1. does the parent exist? ------ THIS IS A LOOP
    //NO ----- set all dependacies as non existant

    //YES ---- inspect each dependancy
}
