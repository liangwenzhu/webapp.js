webpackJsonp([0,2],[
/* 0 */,
/* 1 */
/***/ function(module, exports) {

"use strict";
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// url增加参数
//箭头函数多于一条啊语句，增加大括号并用回return返回内容。
var appendUrlPara = function appendUrlPara(url, value) {
    if (url.indexOf('?') > -1) {
        return url += '?' + value;
    } else {
        return url += '&' + value;
    }
};
//rest参数的之前的参数可以省略吗？
/*一维数组合并去重
* */
var unique = function unique(order) {
    for (var _len = arguments.length, arr = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        arr[_key - 1] = arguments[_key];
    }

    var a = [];
    var c = [];
    for (var b = 0; b < arr.length; b++) {
        c.push.apply(c, _toConsumableArray(arr[b]));
    }
    for (var i = 0; i < c.length; i++) {
        if (!a.includes(c[i])) {
            a.push(c[i]);
        }
    }
    // console.log(order)
    return a;
};

console.log(unique([9, 5, 4, 4, 2, 1, 5], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13]));

/***/ }
],[1]);