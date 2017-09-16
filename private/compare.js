const _ = require('lodash')

module.exports = (omissions, translationFile) => {

  //check the basic props first
  _.forEach(omissions.props, (value) => {
    //check whether the prop exists
    // translationFile[value] ? null : omissions.add(value)
    _.get(translationFile, value, null) === null ? omissions.add(value) : null
  })

  //check the nested props next

  //1. does the parent exist? ------ THIS IS A LOOP
    //NO ----- set all dependacies as non existant

    //YES ---- inspect each dependancy
}
