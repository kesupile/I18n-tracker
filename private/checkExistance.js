module.exports = (dir, translations, i18n) => { //expecting an array

  translations.forEach((translation) => {
    try {
      require(`${dir}\\${translation[0]}`)
    } catch (e) {
      throw new Error(`${i18n.t('errors.translationFileMisisng')}${translation[0]}.js`)
    }
  })

  return true
}
