const
  colors = require('colors'),
  _ = require('lodash'),
  Nest = require('./Nest')

function Omissions(root){
  if(!root || typeof root !== 'string'){
    throw new Error('Ommisions constructor requires a root property of type String')
  }
  this.root = root
  this.inspectRoot = null
  this.omissions = new Array(0)
  this.props = new Array(0)
  this.inspectProps = new Array(0)
  this.nests = []
}

Omissions.prototype.setInspectRoot = function(root) {
  this.inspectRoot = root
}

Omissions.prototype.add = function(omission) {
  this.omissions.push(omission)
}

Omissions.prototype.addProp = function(prop) {
  this.props.push(prop)
}

Omissions.prototype.addInspectProp = function(prop) {
  this.nests.push(new Nest(prop))
  this.inspectProps.push(prop)
}

Omissions.prototype.logOmissions = function () {
  let omString = ''
  _.forEach(this.omissions, (omission) => {
    omString += `   -- ${omission} \n`
  })
  console.log(
    `  ${String(this.root).red} \n${String(omString).yellow}`
  )
}

Omissions.prototype.getKeyWithRoot = function(key){
  if(this.inspectRoot === ''){
    return key
  } else {
    return `${this.inspectRoot}.${key}`
  }
}

module.exports = Omissions
