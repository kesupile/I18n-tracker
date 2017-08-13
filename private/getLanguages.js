const _ = require('lodash')

module.exports = (translations) => {
  if(!translations){
    throw new Error('Argument is required')
  } else if(typeof translations !== 'object'){
    throw new Error('Argument must be an object')
  }

  let translationFiles = []
  _.forEach(translations, (value,key) => {
    const translation = key
    translationFiles.push([translation, value])
  })

  return translationFiles

}
