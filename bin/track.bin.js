#!/usr/bin/env node

const fs = require('fs')

//const processDir = process.cwd() //needed for node package
// const configDir = `${processDir}/i18n-tracker.config.json`
const configDir = '../../test-client/translations/i18n-tracker.config.json' //temporary for testing
console.log(configDir)


const config = JSON.parse(fs.readFileSync(configDir, 'utf8'))
console.log(config)
console.log(config.testproperty)
