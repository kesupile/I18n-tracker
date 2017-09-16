function Nest(root) {
  this.root = root
  this.doesExist = null
}

Nest.prototype.setExistance = function(bool){
  this.doesExist = bool
}

module.exports = Nest
