const
  { addOmission } = require('./PrototypeMethods')

function Comparison(language){
  this.language = language
  this.omissions = new Array(0)
  this.nests = new Array(0)
}

Comparison.prototype.addOmission = addOmission

module.exports = Comparison
