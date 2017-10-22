module.exports = (comparison, oldObj, placeholder) => {

  const langObj = Object.assign({}, oldObj)

  // replace the single omissions
  comparison.omissions.forEach(omission => {
    langObj[omission] = placeholder
  })

  // replace nested omissions
  comparison.nestOmissions.forEach(nest => {
    if(nest.doesExist){
      nest.omissions.forEach(omission => {
        langObj[nest.fullRoot][omission] = placeholder
      })
    } else {
      langObj[nest.fullRoot] = {}
    }
  })

  return langObj

}
