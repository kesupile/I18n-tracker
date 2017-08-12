function checkExistance(dir, translations){
  translations.forEach((translation) => {
    try {
      require(`${dir}\\${translation[0]}`)
    } catch (e) {
      console.log(`ERROR:::FILE MISSING: ${translation[0]}`);
    }
  })
}

module.exports = checkExistance
