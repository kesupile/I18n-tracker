#!/usr/bin/env node

const fs = require('fs')
const colors = require('colors')

const validateEnvironment = require('../private/validateEnvironment')
const getLanguages = require('../private/getLanguages')

//const processDir = process.cwd() //needed for node package
// const configDir = `${processDir}/i18n-tracker.config.json`
const processDir = '../../test-client/translations' //temporary for testing
const configDir = '../../test-client/translations/i18n-tracker.config.json' //temporary for testing


let config
try {
  config = JSON.parse(fs.readFileSync(configDir, 'utf8'))
} catch (e) {
  throw new Error('i18n-tracker.config.json missing')
}
console.log(config)

//validate the environment
const environmentValid = validateEnvironment(processDir, config)
console.log(`environmentValid: ${environmentValid}`);

//map out the structure of the base file
