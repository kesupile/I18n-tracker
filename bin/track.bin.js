#!/usr/bin/env node

const
  fs = require('fs'),
  colors = require('colors'),
  validateEnvironment = require('../private/validateEnvironment'),
  getLanguages = require('../private/getLanguages'),
  inspect = require('../private/inspect'),
  compare = require('../private/compare'),
  logError = require('../private/logError'),
  insertProps = require('../private/insertProps'),
  sanitise = require('../private/sanitise')

  const processDir = process.cwd()
  const configDir = `${processDir}/i18n-tracker.config.json`

let config

const writeToFile = (string, file, i, length, i18n) => {
  fs.writeFile(file, string, err => {
    err ? console.log(err) : null
    if (i === length - 1 ) {
      console.log(String(`     *** ${i18n.t('completed.missingPropsInserted')} ***`).cyan)
    }
  })
}

require('../config/locales').then(i18n => {

    try {
      config = JSON.parse(fs.readFileSync(configDir, 'utf8'))
    } catch (e) {
      throw new Error(i18n.t('errors.configMissing'))
    }

    //validate the environment
    const environmentValid = validateEnvironment(processDir, config, i18n)

    const baseObj = require(`${processDir}/${config.base[0]}`)
    const baseName = config.base[0]


    const languages = getLanguages(config.translations)
    const german = require(`${processDir}/${languages[0][0]}`)

    const omissions = inspect(baseObj, baseName)


    languages.forEach((language) => {

      const langObj = require(`${processDir}/${language[0]}`)
      compare(omissions, language[0], langObj)

    })

    omissions.logOmissions(languages)

    if (config.placeholder) {

      const placeholder = typeof config.placeholder === 'string' ? config.placeholder : '___REPLACE ME___'

      omissions.comparisons.forEach((comparison, i) => {

        if (comparison.clear) return
        console.log(`comparison not clear ${comparison.language}`);
        const oldLangObj = require(`${processDir}/${comparison.language}`)

        // insert the missing props
        const newLangObj = insertProps(comparison, oldLangObj, placeholder)

        // sanitise the object
        const jsString = sanitise(newLangObj)

        writeToFile(jsString, `${processDir}/${comparison.language}.js`, i, omissions.comparisons.length, i18n)

      })


    }

}).catch(e => console.log(e))
