const
  validateConfig = require('./validateConfig'),
  getLanguages = require('./getLanguages'),
  checkExistance = require('./checkExistance'),
  I18n = require('../config/locales')

module.exports = (processDir, config, i18n) => {

  validateConfig(config, i18n)

  checkExistance(processDir, [config.base], i18n)

  checkExistance(processDir, getLanguages(config.translations), i18n)

  return true
}
