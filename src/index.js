// url增加参数
//箭头函数多于一条啊语句，增加大括号并用回return返回内容。
let appendUrlPara = (url,value) => {
  if(url.indexOf('?')>-1){
      return url += '?'+value;
  }else{
      return url += '&'+value;
  }
};
/*快速排序
* @pivot 基准值，默认为第一个
* @rest 除基准值以外的值的数组。
* */
let quickSort = (arr) =>{
    if(!arr.length){return []}
    const [pivot,...rest] = arr;
    return [
        ...quickSort(rest.filter(x=>x<pivot)),
        pivot,
        ...quickSort(rest.filter(x=>x>=pivot))
    ]
};

/*一维数组合并去重
* */
let unique = (order = 'default',...arr) => {
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
    switch (order){
        case 'asc':

            break;
        case 'desc':

            break;
        default:
            break;
    }
    return a;
};

// console.log(unique([9,5,4,4,2,1,5],[1,2,3,4,5,6,7,8,9,10,13]));
