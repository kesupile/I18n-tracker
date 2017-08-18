const colors = require('colors')
const _ = require('lodash')

function Omissions(root){
  if(!root || typeof root !== 'string'){
    throw new Error('Ommisions constructor requires a root property of type String')
  }
  this.root = root
  this.omissions = new Array(0)
}

Omissions.prototype.add = function (omission) {
  this.omissions.push(omission)
}

Omissions.prototype.logOmissions = function() {
  let omString = ''
  _.forEach(this.omissions, (omission) => {
    omString += `   -- ${omission} \n`
  })
  console.log(
    `  ${String(this.root).red} \n${String(omString).yellow}`
  )
}

module.exports = Omissions
