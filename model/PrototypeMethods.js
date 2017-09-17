const
  colours = require('colors'),
  { forEach } = require('lodash')


module.exports.addOmission = function(prop){
  this.omissions.push(prop)
}
