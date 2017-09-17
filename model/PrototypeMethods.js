const
  colours = require('colors'),
  _ = require('lodash')

module.exports.logOmissions = function logOmissions() {
  let omString = ''
  _.forEach(this.omissions, (omission) => {
    omString += `   -- ${omission} \n`
  })
  console.log(
    `  ${String(this.root).red} \n${String(omString).yellow}`
  )
}
