const
  { I18n } = require('react-i18nify'),
  osLocale = require('os-locale'),
  fs = require('fs'),
  { getTranslations } = require('../index'),
  getLanguages = require('../private/getLanguages')
  config = require('./i18n-tracker.config.json')

I18n.setTranslations(getTranslations())

function findSupportedLocale(string){
  const locale = string.split('_')[0]
  //is the language supported?
  if(config.translations[locale]){
    return locale
  } else { //default to english
    return 'en'
  }
}

module.exports = (function() {
  return new Promise(function(resolve, reject) {

    osLocale().then(locale => {

      const supportedLocale = findSupportedLocale(locale)

      I18n.setLocale(supportedLocale)
      resolve(I18n)
    }).catch(err => {
      reject(err)
    })

  })
})()
