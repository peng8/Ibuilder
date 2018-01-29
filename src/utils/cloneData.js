//映射任何格式的数据，map为映射表
//map为空时，功能即为对象的深拷贝
function cloneData(data, map={}){
    if(Object.prototype.toString.call(data) === "[object Array]"){
      let list = [];
      for(let index in data){
        list.push(cloneData(data[index], map));
      }
      return list;
    }else if(Object.prototype.toString.call(data) === "[object Object]"){
      let obj = {};
      for(let key in data){
        let newKey;
        if(map[key]){
          newKey = map[key];
        }else{
          newKey = key
        }
        obj[newKey] = cloneData(data[key], map);
      }
      return obj;
    }else{
      return data;
    }
  }
   
   
  export default cloneData;