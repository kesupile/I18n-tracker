const
  UUID = require('uuid/v4'),
  colors = require('colors'),
  { addOmission } = require('./PrototypeMethods')

function Nest(root, cloneProps) {
  if(!cloneProps){
    this.id = UUID()
    this.root = root
  } else {
    this.id = cloneProps.id
    this.root = cloneProps.root
    this.fullRoot = cloneProps.fullRoot
  }
  this.doesExist = null
  this.children = []
  this.props = []
  this.omissions = []
  this.parentTriggered = false
}

Nest.prototype.setExistance = function(bool){
  this.doesExist = bool

  // if a property object is missing, propergate this state
  // down towards its children
  if(bool === false){
    this.children.forEach((child) => {

      // keep track of whether it was triggered by parent
      child.triggeredByParent()
      child.setExistance(false)
    })
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

Nest.prototype.triggeredByParent = function(){
  this.parentTriggered = true
}

Nest.prototype.pushMyselfIntoOmissions = function(nestOmissions){
  nestOmissions.push(this)
  this.children.forEach((child) => child.pushMyselfIntoOmissions(nestOmissions))
}

Nest.prototype.clone = function(parent){
  let clone = new Nest(null, {id: this.id, root: this.root, fullRoot: this.fullRoot})
  parent ? parent.addChild(clone) : null
  this.children.forEach((child) => child.clone(clone))
  return clone
}

Nest.prototype.logOmissions = function(language){
  const logRoot = `${language}.${this.fullRoot}`

  // if triggeredByParent===false AND doesExist===true we know it is the
  // child of a missing object, so there is no need to show it to the user
  if(this.doesExist === false && !this.parentTriggered){
    console.log(
            `  ${String('Missing object: ').red}${String(logRoot).yellow}\n`
            );
  } else if(this.doesExist === true){
    let omString = ''
    this.omissions.forEach((omission) => {
      omString += `   -- ${omission} \n`
    })
    console.log(
      `  ${String(logRoot).red} \n${String(omString).yellow}`
    )

  }

}

Nest.prototype.addOmission = addOmission

module.exports = Nest
