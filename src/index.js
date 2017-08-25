const log = (x) =>{
    console.log(x);
};

/*url增加参数
* @url url
* @value 参数以及值
* */
const appendUrlPara = (url,value) => {
  if(url.indexOf('?')>-1){
      return url += '?'+value;
  }else{
      return url += '&'+value;
  }
};
/*数组快速排序-升序
* @pivot 基准值，默认为第一个
* @rest 除基准值以外的值的数组。
* Usage: quickSortAsc([2331])
* Result [1233]
* */
const quickSortAsc = (arr) =>{
    if(!arr.length){return []}
    const [pivot,...rest] = arr;
    return [
        ...quickSortAsc(rest.filter(x=>x<pivot)),
        pivot,
        ...quickSortAsc(rest.filter(x=>x>=pivot))
    ]
};
/*数组快速排序-降序
 * @pivot 基准值，默认为第一个
 * @rest 除基准值以外的值的数组。
 * Usage: quickSortDesc([2331])
 * Result [3321]
 * */
const quickSortDesc = (arr) =>{
    if(!arr.length){return []}
    const [pivot,...rest] = arr;
    return [
        ...quickSortDesc(rest.filter(x=>x>pivot)),
        pivot,
        ...quickSortDesc(rest.filter(x=>x<=pivot))
    ]
};
/*对象属性值-快速排序-升序
 * @arr 数组对象
 * @key 属性名
 * Usage: quickSortObjDesc([{a:2},{a:1},{a:3}],'a'))
 * Result:: [{"a":1},{"a":2},{"a":3}]
 * */
const quickSortObjAsc = (arr,key) =>{
    if(!arr.length){return []}
    let[pivot,...rest] = arr;
    return [
        ...quickSortDesc(rest.filter(x=>x[key]<pivot[key]),key),
        pivot,
        ...quickSortDesc(rest.filter(x=>x[key]>=pivot[key]),key)
    ]
};
/*对象属性值-快速排序-降序
* @arr 数组对象
* @key 属性名
* Usage: quickSortObjDesc([{a:2},{a:1},{a:3}],'a'))
* Result:: [{"a":3},{"a":2},{"a":1}]
* */
const quickSortObjDesc = (arr,key) =>{
    if(!arr.length){return []}
    let[pivot,...rest] = arr;
    return [
        ...quickSortDesc(rest.filter(x=>x[key]>pivot[key]),key),
        pivot,
        ...quickSortDesc(rest.filter(x=>x[key]<=pivot[key]),key)
    ]
};
/*一维数组合并去重,
* @order 升降序，取值asc/desc/other,必填
* @arr 数组，可多填
* Usage: unique('asc',[2,3,3,1],[4,3])
* Result [1,2,3,4]
* 字符串和数字之间不重复，'5'和5不重复
* */
const unique = (order = 'default',...arr) => {
    let a;
    let c = [];
    for(let i of arr){
        c.push(...i);
    }
    a = Array.of(...new Set(c));
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
const getUrlParam = ()=>{
    let url = location.href;
    let paraString = url.substring(url.indexOf('?')+1,url.length).split('&');
    let obj = {};
    for(let i of paraString){
        let name = i.substring(0,i.indexOf('='));
        obj[name] = i.substring(i.indexOf('=')+1,i.length);
    }
    return obj
};
/*删除字符串左右两端空格
* @str 字符串
* */
const trim = (str) => str.replace(/(^\s*)|(\s*$)/g, '');
/*删除字符串左端空格
* @str 字符串
* */
const trimLeft = (str) => str.replace(/(^\s*)/g, '');
/*删除字符串右端空格
* @str 字符串
* */
const trimRight = (str) => str.replace(/(\s*$)/g, '');

/*格式化浮点数，保留小数并四舍五入
* @num 浮点数
* @digit 位数,选填,默认为2
* 不对NAN进行处理，方便报错。
* Usage: floatNumFormatted(1)
* Result 1.00
* */
const floatNumFormatted = (num,digit = 2) => Number.parseFloat(num).toFixed(digit);
/*格式化文件大小
* @size 文件大小，单位：字节
* 不对NAN进行处理，方便报错
* Usage: fileSizeFormatted(5439)
* Result 5.31KB
* */
const fileSizeFormatted = (size = 'default') =>{
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
const commaFormatted = (num) =>{
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
const moneyFormatted = (num,digit) => commaFormatted(floatNumFormatted(num,digit));

/*基数词序列化为序数词
* @num 数字
* 若有小数部分则小数部分被抹去。
* Usage: ordinalFormatted(22)
* Result 22st
* */
const ordinalFormatted = (num) =>{
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
const percentFormatted = (num,digit = 2) =>floatNumFormatted(num*100,digit) + '%';
/*获取cookie
*并转化为json格式
* Usage: cookieGet
* Result: {key:val,key2:val2}
* */
const cookieGetAll = () =>{
    let a = document.cookie.split('; ');
    let c = {};
    if(a.length<1){
        return null
    }
    for(let i of a){
        let d = i.substring(0,i.indexOf('='));
        c[d] = i.substring(i.indexOf('=') + 1,i.length);
    }
    return c;
};
/*获取cookie指定值
* @key 键名
* Usage: cookieGetExact('username')
* Result: val
* */
const cookieGetExact = (key) =>cookieGetAll()[key];
/*cookie设置
* @key 键名
* @val 键值
* @day 保存时间;单位：天;选填;默认为30天
* Usage: cookieSet('userName','lwz')
* */
const cookieSet = (key,val,day = 30) =>{
    let data = new Date();
    data.setTime(data.getTime() + day * 24 * 60 *60 *1000);
    document.cookie = key + '=' + val + ';expires=' + data.toUTCString();
};
/*cookie删除
* @keys 键名，支持输入多个，批量删除
* Usage: cookieSet('userName')
* */
const cookieDeleteExact = (...keys) =>{
    for(let key of keys){
        let val = cookieGetExact(key);
        let data = new Date();
        data.setTime(data.getTime()-1);
        document.cookie = key + '=' + val + ';expires=' + data.toUTCString();
    }
};
/*时间戳转日期
*@time 时间戳
* Usage timeFormatted(1503027486)
* Result 2017-7-18-11:38:06
* */
const timeFormatted = (time)=>{
    time = Number.parseInt(time);
    time = new Date(time*1000);
    let [year,month,Data] = [time.getFullYear(),time.getMonth(),time.getDate()];
    let [hour,minute,second] = [time.getHours(),time.getMinutes(),time.getSeconds()].map(x => {
        if(x<10){
            return '0' + x;
        }else{
            return x
        }
    });
    return year + '-' + month + '-' + Data + '-' + hour+ ':' + minute + ':' + second;
};
/*时间戳之差，返回天，时，分，或秒
*@v1,@v2时间戳，顺序可以互换
*@unit 单位，可取值为d,h,m,s 对应天，时，分，秒。默认为秒。
* Usage getDiffStamp(1502854686,1503027486,'d');
* Result 2
* */
const getDiffStamp = (v1,v2,unit = 's')=>{
    [v1,v2] = [new Date(parseInt(v1)*1000),new Date(parseInt(v2)*1000)];
    const a = {};
    a.s = Math.abs(v1 - v2);
    a.d = a.s/(1000 * 60 * 60 * 24);
    a.h = a.d * 24;
    a.m = a.d * 24 * 60;
    return a[unit]
};
/*提取文件后缀名
* @name 文件名
* Usage getSuffix('123.html')
* Result html
* */
const getSuffix =(x)=> x.split('.').pop();

/*输入负数从后面读取数组数据
* @elements 数组
* Usage: let a = reArrayGet(['a','b','c']);a[-1]
* Result: c
* 把数组放进去就可，吐出来的数组就可以拥有这个特性。
* */
function reArrayGet(elements){
    let handler = {
        get(target,propKey){
            let index = Number(propKey);
            if(index<0){
                propKey = String(target.length + index);
            }
            return Reflect.get(target,propKey);//获取数组默认行为
        }
    };
    return new Proxy(elements,handler)
}
/*中序遍历一棵二叉树
* @tree 二叉树数组
* Usage: binaryTree([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]])
* Result:  ["a", "b", "c", "d", "e", "f", "g"]
* */
const binaryTree =(tree)=>{
    let trees = make(tree);
    let treeArr = [];
    function Tree(left,label,right) {
        this.left = left;
        this.label = label;
        this.right = right;
    }
    function* inorder(t){
        if(t){
            yield* inorder(t.left);
            yield t.label;
            yield* inorder(t.right);
        }
    }
    function make(array){
        if(array.length===1){
            return new Tree(null,array[0],null);
        }else{
            return new Tree(make(array[0]),array[1],make(array[2]));
        }
    }
    for(let i of inorder(trees)){
        treeArr.push(i);
    }
    return treeArr;
};

/*让对象部署iterator接口
* @obj 对象
* Usage:
* let myObj = {'for':3,'bar':7}; iterEntries(myObj);
* for(let i of iterEntries(myObj)){
    log(i);
 }
* Result: ['foo':3] ['bar':7]
* */
function* iterEntries(obj){
    let keys = Object.keys(obj);//获取键名
    for(let i=0;i<keys.length;i++){
        let key = keys[i]; //键值
        yield [key,obj[key]]; //部署next()
    }
}
class Logger {
    printName  (name = 'there')  {
        this.print('Hello' + name);
    }
    print(text) {
        console.log(text);
    }
}

const logger = new Logger();
// log(typeof logger)
// log(logger);
// logger.printName();
logger();
const { printName } = logger;
// printName();