const fs = require('fs')

const getLanguages = require('./private/getLanguages')
const checkExistance = require('./private/checkExistance')
const getThisDir = require('./private/getThisDir')

const thisDir = getThisDir(module.parent.filename)
const configDir = './i18n-tracker.config.json'
const config = JSON.parse(fs.readFileSync(configDir, 'utf8'))


function logThisDir() {
  console.log(thisDir);
}

function getTranslations() {
  const translations = getLanguages(config.translations)

  //check the existance of translation files
  checkExistance(thisDir, translations)
}


module.exports = {
  logThisDir: logThisDir,
  getTranslations: getTranslations
}
