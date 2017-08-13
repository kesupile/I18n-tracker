module.exports = (filename) => {
  const dirArray = filename.split(`\\`)
  let dir = new String()
  for(let i=0; i < dirArray.length - 1; i++){
    dir += dirArray[i]
    !(i === dirArray.length - 2) ? dir += '\\' : null
  }
  return dir
}
