const
  { addOmission } = require('./PrototypeMethods')
  require('colors')

function Comparison(language){
  this.language = language
  this.root = language
  this.omissions = []
  this.nestOmissions = []
}

Comparison.prototype.isNotOmitted = function(nest){
  //the nest doesn't exist if it is in the NestOmissions and neset.doesExist===false
  return !this.nestOmissions.find((nestOmission) => nest.id === nestOmission.id && !nestOmission.doesExist)
}

Comparison.prototype.addOmittedNest = function(nest){
  //add the nest and its children
  nest.pushMyselfIntoOmissions(this.nestOmissions)
}

Comparison.prototype.addOmittedNestProps = function(nest) {
  this.nestOmissions.push(nest)
}

Comparison.prototype.addOmission = addOmission

Comparison.prototype.logOmissions = function() {
  let omString = ''
  this.omissions.forEach((omission) => {
    omString += `   -- ${omission} \n`
  })
  console.log(
    `  ${String(this.root).red} \n${String(omString).yellow}`
  )
}

module.exports = Comparison
