let log = (x) =>{
    console.log(x);
};

/*url增加参数
* @url url
* @value 参数以及值
* */
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
* Usage: quickSortAsc([2331])
* Result [1233]
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
 * Usage: quickSortDesc([2331])
 * Result [3321]
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
/*一维数组合并去重,
* @order 升降序，取值asc/desc/other,必填
* @arr 数组，可多填
* Usage: unique('asc',[2331],[43])
* Result [1234]
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
        obj[name] = paraString[i].substring(paraString[i].indexOf('=')+1,paraString[i].length);
    }
    return obj
};
/*删除字符串左右两端空格
* @str 字符串
* */
let trim = (str) => str.replace(/(^\s*)|(\s*$)/g, '');
/*删除字符串左端空格
* @str 字符串
* */
let trimLeft = (str) => str.replace(/(^\s*)/g, '');
/*删除字符串右端空格
* @str 字符串
* */
let trimRight = (str) => str.replace(/(\s*$)/g, '');

/*格式化浮点数，保留小数并四舍五入
* @num 浮点数
* @digit 位数,选填,默认为2
* 不对NAN进行处理，方便报错。
* Usage: floatNumFormatted(1)
* Result 1.00
* */
let floatNumFormatted = (num,digit = 2) => Number.parseFloat(num).toFixed(digit);
/*格式化文件大小
* @size 文件大小，单位：字节
* 不对NAN进行处理，方便报错
* Usage: fileSizeFormatted(5439)
* Result 5.31KB
* */
let fileSizeFormatted = (size = 'default') =>{
    size = Number.parseInt(size);
    let i = 0;
    let unit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB'];
    let getIndex = (_size) => {
        if(_size >= 1024){
            i++;
            return getIndex(_size / 1024);
        }
        return _size;
    };
    return  floatNumFormatted(getIndex(size),2) + ' ' + unit[i];
};
/*数字阅读格式化，从右开始，每3位增加一个逗号，小数位不增加逗号
* @num 数字，string或者num都可。
* Usage: commaFormatted(2222.12356)
* Result 2,222.12356
* */
let commaFormatted = (num) =>{
    num = num.toString();
    let a = num.split('.');
    let b = a[0];
    let c = a[1];
    let d = [];
    if(a.length > 2){
        return 'wrong Num'
    }
    while (b.length>3){
        let e = ',' + b.substring(b.length-3,b.length);
        b = b.substring(0,b.length - 3);
        d.unshift(e);
    }
    return b + d  +'.' + c;
};
/*保留小数点n位数并数字阅读格式化
* @num 数字
* @digit 位数
* Usage: moneyFormatted(2222.12356)
* Result 2,222.12
* */
let moneyFormatted = (num,digit) => commaFormatted(floatNumFormatted(num,digit));

/*基数词序列化为序数词
* @num 数字
* 若有小数部分则小数部分被抹去。
* Usage: ordinalFormatted(22)
* Result 22st
* */
let ordinalFormatted = (num) =>{
    num = Math.trunc(num);
    let a = num.toString();
    a = [...a];
    let b = a[a.length-1]%10;
    let c = ['th', 'st', 'nd', 'rd'];
    c.length = 10;
    c.fill('th',4,10);
    return num + c[b];
};
/*格式百分比化，并保留n位小数
* @数字
* @digit 位数，选填，默认值为2
* Usage: percentFormatted(6.565252)
* Result: 656.53%
* */
let percentFormatted = (num,digit = 2) =>floatNumFormatted(num*100,digit) + '%';
/*获取cookie
*并转化为json格式
* Usage: cookieGet
* Result: {key:val,key2:val2}
* */
let cookieGetAll = () =>{
    let a = document.cookie.split(';');
    let c = {};
    for(let i=0;i<a.length;i++){
        let d = a[i].substring(0,a[i].indexOf('='));
        c[d] = a[i].substring(a[i].indexOf('=') + 1,a[i].length);
    }
    return c;
};
/*获取cookie指定值
* @key 键名
* Usage: cookieGetExact('username')
* Result: val
* */
let cookieGetExact = (key) =>cookieGetAll()[key];
/*cookie设置
* @key 键名
* @val 键值
* @day 保存时间;单位：天;选填;默认为30天
* Usage: cookieSet('userName','lwz')
* */
let cookieSet = (key,val,day = 30) =>{
    let data = new Date();
    data.setTime(data.getTime() + day * 24 * 60 *60 *1000);
    document.cookie = key + '=' + val + ';path=/;expires=' + data ;
};
let cookieDeleteExact = (...keys) =>{
    // debugger
    let data = new Date();

    for(let key of keys){
        let val = cookieGetExact(key);
        log(val);
        // data.setTime(data.getTime()-1);
        // document.cookie = key + '=' + val + ';path=/;expires=' + data ;
    }
};
// log(cookieGetAll());
// cookieSet('eee','321');
// log(cookieGetExact('username'))
// cookieDeleteExact('eee');
// log(cookieGetAll());