const
  colors = require('colors'),
  _ = require('lodash'),
  Nest = require('./Nest'),
  { logOmissions } = require('./PrototypeMethods')

function Omissions(root){
  if(!root || typeof root !== 'string'){
    throw new Error('Ommisions constructor requires a root property of type String')
  }
  this.root = root
  this.inspectId = null
  this.inspectRoot = ''
  this.omissions = new Array(0)
  this.props = new Array(0)
  this.inspectProps = new Array(0)
  this.nests = []
}

Omissions.prototype.setInspectRoot = function() {
  const root = this.inspectProps.shift()
  this.inspectId = root[0]
  this.inspectRoot = root[1]
}

Omissions.prototype.add = function(omission) {
  this.omissions.push(omission)
}

Omissions.prototype.addProp = function(prop) {
  this.props.push(prop)
}

Omissions.prototype.addInspectProp = function(prop, nest) {
  this.inspectProps.push([nest.id, prop])
  this.nests.push(nest)
}

Omissions.prototype.getPropAsRoot = function(key){
  if(this.inspectRoot === ''){
    return key
  } else {
    return `${this.inspectRoot}.${key}`
  }
}

Omissions.prototype.logOmissions = logOmissions


module.exports = Omissions
