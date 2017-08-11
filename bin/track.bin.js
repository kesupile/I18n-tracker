#!/usr/bin/env node

console.log('We are ready to track your package!!');
const processDir = process.cwd());
const configDir = `processDir/i18n-tracker.config.json`
const config = require(configDir)
console.log(config)
console.log(config.testproperty)
