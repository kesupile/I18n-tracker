function checkExistance(dir, translations){
  let exist = true
  translations.forEach((translation) => {
    try {
      require(`${dir}\\${translation[0]}`)
    } catch (e) {
      error = false
      throw new Error(`${translation[1]} TRANSLATION FILE MISSING: ${translation[0]}`)
    }
  })
  return exist
}

module.exports = checkExistance
