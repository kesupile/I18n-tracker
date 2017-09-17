module.exports = (dir, translations) => { //expecting an array

  translations.forEach((translation) => {
    try {
      require(`${dir}\\${translation[0]}`)
    } catch (e) {
      throw new Error(`${translation[1]} TRANSLATION FILE MISSING: ${translation[0]}.js`)
    }
  })
  
  return true
}
