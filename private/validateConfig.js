const _ = require('lodash')

module.exports = function(config, i18n) {

  if(!config.base || !Array.isArray(config.base)){
    throw new Error(i18n.t('errors.baseNotArray'))
  }

  if(!config.translations || _.size(config.translations) < 1){
    throw new Error(i18n.t('errors.translationsRequired'))
  }

  if(config.placeholder){
    if(typeof config.placeholder !== 'string' && config.placeholder !== true){
      throw new Error(i18n.t('errors.placeholderWrongType'))
    }
  }

  return true
}
