const _ = require('lodash')

module.exports = (omissions, translationFile) => {
    _.forEach(omissions.props, (value) => {
      //check whether the prop exists
      translationFile[value] ? null : omissions.add(value)
    })
}
