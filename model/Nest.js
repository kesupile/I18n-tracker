const
  UUID = require('uuid/v4'),
  { logOmissions } = require('./PrototypeMethods')

function Nest(root) {
  this.id = UUID()
  this.root = root
  this.doesExist = null
  this.children = new Array(0)
  this.props = new Array(0)
  this.omissions = new Array(0)
}

Nest.prototype.setExistance = function(bool){
  this.doesExist = bool

  //if a parent doesn't exist propagate this state throughout it's children
  if(!bool){
    this.children.forEach((child) => {child.setExistance(false)})
  }
}

//keep track of children so that we can alter their existance
Nest.prototype.addChild = function(nest){
  this.children.push(nest)
}

Nest.prototype.addProp = function(prop){
  this.props.push(prop)
}

Nest.prototype.setFullRoot = function(root){
  this.fullRoot = root
}

Nest.prototype.logOmissions = logOmissions

module.exports = Nest
