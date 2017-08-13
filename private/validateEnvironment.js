const validateConfig = require('./validateConfig')
const getLanguages = require('./getLanguages')
const checkExistance = require('./checkExistance')

module.exports = (processDir, config) => {

  validateConfig(config)

  checkExistance(processDir, [config.base])

  checkExistance(processDir, getLanguages(config.translations))

  return true
}
