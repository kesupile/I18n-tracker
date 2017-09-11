#!/usr/bin/env node

const
  fs = require('fs'),
  validateEnvironment = require('../private/validateEnvironment'),
  getLanguages = require('../private/getLanguages'),
  inspect = require('../private/inspect'),

  //const processDir = process.cwd() //needed for node package
  // const configDir = `${processDir}/i18n-tracker.config.json`
  processDir = '../../test-client/translations', //temporary for testing
  configDir = '../../test-client/translations/i18n-tracker.config.json' //temporary for testing


let config
try {
  config = JSON.parse(fs.readFileSync(configDir, 'utf8'))
} catch (e) {
  throw new Error('i18n-tracker.config.json missing')
}

//validate the environment
const environmentValid = validateEnvironment(processDir, config)

const baseObj = require(`${processDir}/${config.base[0]}`)
console.log(`base is:`);
console.log(baseObj);

const languages = getLanguages(config.translations)
const german = require(`${processDir}/${languages[0][0]}`)
console.log('german is: ');
console.log(german);




inspect(baseObj, languages[0][0], german)
