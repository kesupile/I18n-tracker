const
  colours = require('colors'),
  { forEach } = require('lodash')


module.exports.addOmission = function(prop){
  this.omissions.push(prop)
}

module.exports.logOmissions = function logOmissions() {
  let omString = ''
  forEach(this.omissions, (omission) => {
    omString += `   -- ${omission} \n`
  })
  console.log(
    `  ${String(this.root).red} \n${String(omString).yellow}`
  )
}
