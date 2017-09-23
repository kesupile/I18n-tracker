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

  const baseExist = checkExistance(thisDir,[config.base])
  const allExist = checkExistance(thisDir, translations)

  let returnObj = {}
  if(allExist && baseExist){
    const base = require(`${thisDir}\\${config.base[0]}`)
    returnObj[config.base[0]] = base
    translations.forEach((translation) => {
      const thisTrans = require(`${thisDir}\\${translation[0]}`)
      returnObj[translation[0]] = thisTrans
    })
  }
  return returnObj
}


module.exports = {
  getTranslations: getTranslations
}
