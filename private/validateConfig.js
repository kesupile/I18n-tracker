const _ = require('lodash')

module.exports = function(config) {

  if(!config.base || !Array.isArray(config.base)){
    throw new Error('i18n-tracker.config.json requires a base property of type Array')
  }

  if(!config.translations || _.size(config.translations) < 1){
    throw new Error('i18n-tracker.config.json requires a translation property with at least one entry')
  }

  return true
}
