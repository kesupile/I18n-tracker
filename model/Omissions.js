const
  colors = require('colors'),
  Nest = require('./Nest'),
  Comparison = require('./Comparison'),
  { logOmissions } = require('./PrototypeMethods'),
  logError = require('../private/logError')

function Omissions(root){
  if(!root || typeof root !== 'string'){
    throw new Error('Ommisions constructor requires a root property of type String')
  }
  this.root = root
  this.inspectId = null
  this.inspectRoot = ''
  this.props = []
  this.inspectProps = []
  this.nests = []
  this.comparisons = []
}

Omissions.prototype.setInspectRoot = function() {
  const root = this.inspectProps.shift()
  this.inspectId = root[0]
  this.inspectRoot = root[1]
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

Omissions.prototype.newComparison = function(langName){
  const comparison = new Comparison(langName)
  this.comparisons.push(comparison)
  return comparison

}

Omissions.prototype.logOmissions = function(languages) {

  require('../config/locales').then(i18n => {


    let omissions = false

    this.comparisons.forEach((comparison) => {
      if(!comparison.clear){omissions = true}
    })

    if(!omissions){
      console.log(String(`\n \n         ${i18n.t('omissions.noOmissions')}     `).yellow)
      return
    }

    this.comparisons.forEach((comparison) => {

      if(comparison.clear){return }

      const lang = languages.filter((language) => language[0] === comparison.language)
      console.log(`\n \n \n             *** ${lang[0][1]} ***`);
      comparison.logOmissions()
      comparison.nestOmissions.forEach((nest) => {
        nest.logOmissions(comparison.language, i18n)})
    })



  }).catch(logError)
}


module.exports = Omissions
