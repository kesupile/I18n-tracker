const _ = require('lodash')

module.exports = (translations) => {
  if(!translations){
    throw new Error('Argument is required')
  } else if(typeof translations !== 'object'){
    throw new Error('Argument must be an object')
  }

  let translationFiles = []
  _.forEach(translations, (value,key) => {
    translationFiles.push([key, value])
  })

  return translationFiles

}
