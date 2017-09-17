#!/usr/bin/env node

const
  fs = require('fs'),
  validateEnvironment = require('../private/validateEnvironment'),
  getLanguages = require('../private/getLanguages'),
  inspect = require('../private/inspect'),
  compare = require('../private/compare'),
  { forEach } = require('lodash')

  //const processDir = process.cwd() //needed for node package
  //const configDir = `${processDir}/i18n-tracker.config.json`
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
const baseName = config.base[0]


const languages = getLanguages(config.translations)
const german = require(`${processDir}/${languages[0][0]}`)

console.log(languages);

const omissions = inspect(baseObj, baseName)

// const copy = omissions.nests.slice()

// console.log('--------------slice is:-------------------');
// console.log(JSON.stringify(copy,null,4));

require('colors') /* ---------- FOR DEBUGGING -------------- */

forEach(languages, (language) => {

  const langObj = require(`${processDir}/${language[0]}`)
  compare(omissions, language[0], langObj)

})

console.log(JSON.stringify(omissions.comparisons, null, 4).yellow);

// compare()
//omissions.logOmissions()
