let log = (x) =>{
    console.log(x);
};

// url增加参数
//箭头函数多于一条啊语句，增加大括号并用回return返回内容。
let appendUrlPara = (url,value) => {
  if(url.indexOf('?')>-1){
      return url += '?'+value;
  }else{
      return url += '&'+value;
  }
};
/*快速排序-升序
* @pivot 基准值，默认为第一个
* @rest 除基准值以外的值的数组。
* */
let quickSortAsc = (arr) =>{
    if(!arr.length){return []}
    const [pivot,...rest] = arr;
    return [
        ...quickSortAsc(rest.filter(x=>x<pivot)),
        pivot,
        ...quickSortAsc(rest.filter(x=>x>=pivot))
    ]
};
/*快速排序-降序
 * @pivot 基准值，默认为第一个
 * @rest 除基准值以外的值的数组。
 * */
let quickSortDesc = (arr) =>{
    if(!arr.length){return []}
    const [pivot,...rest] = arr;
    return [
        ...quickSortDesc(rest.filter(x=>x>pivot)),
        pivot,
        ...quickSortDesc(rest.filter(x=>x<=pivot))
    ]
};
/*一维数组合并去重
* @order 升降序，取值asc/desc/other
* unique('asc',a[],b[]);
* 除第一个参数为必须外，其他均为选填。
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
            a = quickSortAsc(a);
            break;
        case 'desc':
            a = quickSortDesc(a);
            break;
        default:
            break;
    }
    return a;
};
/*url中取参
* 返回一个JSON对象
* */
let getUrlParam = ()=>{
    let url = location.href;
    let paraString = url.substring(url.indexOf('?')+1,url.length).split('&');
    let obj = {};
    for(let i=0;i<paraString.length;i++){
        let name = paraString[i].substring(0,paraString[i].indexOf('='));
        let value = paraString[i].substring(paraString[i].indexOf('=')+1,paraString[i].length);
        obj[name] = value;
    }
    return obj
};
/*删除字符串左右两端空格
* @str 字符串
* */
let trim = (str) => str.replace(/(^\s*)|(\s*$)/g, "");
/*删除字符串左端空格
* @str 字符串
* */
let trimLeft = (str) => str.replace(/(^\s*)/g, "");
/*删除字符串右端空格
* @str 字符串
* */
let trimRight = (str) => str.replace(/(\s*$)/g, "");
