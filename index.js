// url增加参数
//箭头函数多于一条啊语句，增加大括号并用回return返回内容。
var appendUrlPara = (url,value) => {
  if(url.indexOf('?')>-1){
      return url += '?'+value;
  }else{
      return url += '&'+value;
  }
};
//rest参数的之前的参数可以省略吗？
/*一维数组合并去重
* */
var unique = (order,...arr) => {
    let a = [];
    let c = [];
    for(let b=0;b<arr.length;b++){
        c.push(...arr[b]);
    }
    for(let i=0;i<c.length;i++){
        if(!a.includes(c[i])){
            a.push(c[i]);
        }
    }
    // console.log(order)
    return a;
};

console.log(unique([9,5,4,4,2,1,5],[1,2,3,4,5,6,7,8,9,10,13]));
