const { forEach, get } = require('lodash')

function compareObject(omissions, langObj, comparison){
  omissions.nests.forEach((nest) => {

    // don't look for the object if its parent has been omitted
    if(comparison.isNotOmitted(nest)){

      const clone = nest.clone()

      //check if it exists
      const nestedObj = get(langObj, nest.fullRoot, false)

      //if the nest doesnt exist add a copy to nestOmissions
      if(!nestedObj){

        clone.setExistance(false)
        comparison.addOmittedNest(clone)

      } else { //otherwise check its props

        nest.props.forEach((prop) => {

          if(!nestedObj[prop]){
            clone.addOmission(prop)
          }
        })

        if(clone.omissions.length > 0){
          clone.setExistance(true)
          comparison.addOmittedNestProps(clone)
        }

      }

    }
  })
}



module.exports = (omissions, langName, langObj) => {

  const comparison = omissions.newComparison(langName)

  forEach(omissions.props, (prop) => {
    //check whether the prop exists
    langObj[prop] ? null : comparison.addOmission(prop)
  })


  compareObject(omissions, langObj, comparison)

}
