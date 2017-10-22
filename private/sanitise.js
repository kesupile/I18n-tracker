const jsonProp2Js = (string) => {
  return string.split('"').join("")
}

const convertJsonToJs = (string) => {
  const JSReadyObject = string.replace(/"\w+":/g, jsonProp2Js)
  return `module.exports = ${JSReadyObject}`
}

module.exports = (obj) => {
  return convertJsonToJs(JSON.stringify(obj,null,2))
}
