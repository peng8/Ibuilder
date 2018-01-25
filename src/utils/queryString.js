export default (name) => {
  let parStr = window.location.search.substr(1)
  if(parStr == ""){
    return ''
  }else{
    let parList = parStr.split('&')
    let newList = []
    parList.forEach((item, index, arr) => {
      let tmpList = item.split('=')
      if(tmpList.length > 1){
        newList[tmpList[0]] = tmpList[1]
      }
    })
    return newList[name]
  }
}