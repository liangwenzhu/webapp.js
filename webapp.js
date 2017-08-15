// JS扩展方法******************************************************
String.prototype.replaceAll = function(s1, s2) {
        return this.replace(new RegExp(s1, "gm"), s2);
    }
    //******************************************************
    /*公共属性*/
var g_Variable = {
    ajaxTimeout: 1000 //ajax超时
};
/*url处理是否含有？或&*/
var appendUrlPara=function(url,value){
    if (url.indexOf('?') > -1) {
        return url+='&'+value;
    }else{
        return url+='?'+value;
    }
};
/*从服务端下载数据，检查缓存，如果服务端无修改则使用浏览器缓存数据
para.weburl:文件名
para.ifModified:true,使用缓存
*/
function GetCacheFile(para,sucFunc,errFunc){
    if (!para.ifModified){
        para.ifModified=true;
    }
    if (para.ifModified){
        $.ajax({
        	url : para.weburl,
        	type : 'get',
        	dataType : "text",
        	ifModified : true,//强制要求检测最后更新时间,防止拿到旧的数据
        	success : function(data){
        		if(data==undefined){//没有数据,及没有数据变化,这时候再执行一次ajax,就是从浏览器缓存拿数据
        			$.ajax({
        				url : para.weburl,
        				type : 'get',
        				dataType : "text",
        				success : function(data){
        					if(sucFunc){
                                sucFunc(data,para);
                            }
        				}
        			});
        		}else{
                    if(sucFunc){
                        sucFunc(data,para);
                    }
        		}
        	},
            error : function(xhr, s) {
                if(errFunc){
                    errFunc();
                }
            },
            timeout : 600000
        });
    }else{
        $.ajax({
			url : hrefAppendRandom(para.weburl),
			type : "POST",
			dataType : "text",
			success : function(data) {
                if(sucFunc){
                    sucFunc(data,para);
                }
			},
			error : function(xhr, s) {
                if(errFunc){
                    errFunc(para);
                }
			},
			timeout : 600000
		});
    }

};

// var str=decToHex("decToHex unicode 编码转换");
// alert("编码后："+str+"\n\n解码后："+hexToDec(str));
var GdecToHex = function(str) {
    var res = [];
    for (var i = 0; i < str.length; i++)
        res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
    return "\\u" + res.join("\\u");
};
var GhexToDec = function(str) {
    str = str.replace(/\\/g, "%");
    return unescape(str);
};

/*在树形表格的节点的首行,单击显示子列表,并关闭其它列表*/
var expandALineForTreeGrid = function(tg, id) {
    var nodes = $('#' + tg).treegrid('getRoots');
    for (var I = nodes.length - 1; I >= 0; I--) {
        if (nodes[I].GUID == id) {
            $('#' + tg).treegrid('expand', nodes[I].GUID);
        } else {
            $('#' + tg).treegrid('collapse', nodes[I].GUID);
        }
    }
};
var expandABrotherForThreeGrid = function(tg, id) {
    var node = $('#' + tg).treegrid('getParent', id);
    var nodes = $('#' + tg).treegrid('getChildren', node.GUID);
    for (var I = nodes.length - 1; I >= 0; I--) {
        if (nodes[I].GUID != id) {
            $('#' + tg).treegrid('collapse', nodes[I].GUID);
        } else {
            $('#' + tg).treegrid('expand', nodes[I].GUID);
        }
    }
};
/*下载文件*/
var download = function(fileName, blob) {
        var aLink = document.createElement('a');
        var evt = document.createEvent("MouseEvents");
        evt.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        aLink.download = fileName;
        aLink.href = URL.createObjectURL(blob);
        aLink.dispatchEvent(evt);
    }
    /*一维数组去重*/
var unique = function(arr) {
        var n = {},
            r = []; //n为hash表，r为临时数组
        for (var i = 0; i < arr.length; i++) //遍历当前数组
        {
            if (!n[arr[i]]) //如果hash表中没有当前项
            {
                n[arr[i]] = true; //存入hash表
                r.push(arr[i]); //把当前数组的当前项push到临时数组里面
            }
        }
        return r;
    }
    /* 文本转Blob对象 */
var stringToBlob = function(text) {
        var u8arr = new Uint8Array(text.length);
        for (var i = 0, len = text.length; i < len; ++i) {
            u8arr[i] = text.charCodeAt(i);
        }
        var blob = new Blob([u8arr]);
        return blob;
    }
    /*从url中获取参数*/
var getUrlParam = function(paras) {
    var url = location.href;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {}
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof(returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
};
/*动态加载jscss文件*/
function loadjscssfile(filename, filetype) {
    if (filetype == "js") {
        var fileref = document.createElement('script');
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", filename);
    } else if (filetype == "css") {

        var fileref = document.createElement('link');
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
    }
    if (typeof fileref != "undefined") {
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }
}

function js_strto_time(str_time) {
    var new_str = str_time.replace(/:/g, '-');
    new_str = new_str.replace(/ /g, '-');
    var arr = new_str.split("-");
    var datum = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5]));
    return strtotime = datum.getTime() / 1000;
}

function handleEnter(field, event) {
    var keyCode = event.keyCode ? event.keyCode : event.which ?
        event.which : event.charCode;
    if (keyCode == 13) {
        var i;
        for (i = 0; i < field.form.elements.length; i++)
            if (field == field.form.elements[i])
                break;
        i = (i + 1) % field.form.elements.length;
        field.form.elements[i].focus();
        return false;
    } else
        return true;
}

//
function getStrRight(str, value) {
    var pos = str.indexOf(value);
    str1 = str;
    while (pos > -1) {
        str1 = str1.substr(pos + 1, str1.length - pos);
        pos = str1.indexOf(value);
    }
    return str1;
};

function trim(str) { //删除左右两端的空格
    　　
    return str.replace(/(^\s*)|(\s*$)/g, "");　　
};　　
function ltrim(str) { //删除左边的空格
    　　
    return str.replace(/(^\s*)/g, "");　　
};　
function rtrim(str) { //删除右边的空格
    　　
    return str.replace(/(\s*$)/g, "");　　
};

//去除二端空白
            
// function trim(str) {                
//     var m = str.match(/^\s*(\S+(\s+\S+)*)\s*$/);                
//     return (m == null) ? "" : m[1];            
//     };            
//判断是否手机号
            
function isMobile(str) {                            
    return (/^(?:13\d|15[012389]|189)-?\d{5}(\d{3}|\*{3})$/.test($.trim(str)));            
};             //判断是否电话号码
            
function isTel(str) {                
    return (/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test($.trim(str)));            
};             //判断是否手机或电话号码
            
function isMobileTel(str) {                
    return $.isTel(str) || $.isMobile(str);            
};             //判断是否手机号
            
function isEmail(str) {                
    return (/^(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)$/.test($.trim(str)));            
};             //判断是否为数字
            
function isNumber(str) {                            
    return (!isNaN($.trim(str)));            
};

/** 下面两个函数都能对浮点数进行四舍五入，保留小数点后两位 **/
/**
 *   Usage:  CurrencyFormatted(12345.678);
 *   result: 12345.68
 **/
function CurrencyFormatted(amount) {
    var i = parseFloat(amount);
    if (isNaN(i)) {
        i = 0.00;
    }
    var minus = '';
    if (i < 0) {
        minus = '-';
    }
    i = Math.abs(i);
    i = parseInt((i + .005) * 100);
    i = i / 100;
    s = new String(i);
    if (s.indexOf('.') < 0) {
        s += '.00';
    }
    if (s.indexOf('.') == (s.length - 2)) {
        s += '0';
    }
    s = minus + s;
    return s;
}
/**
 * 格式化文件大小,基础单位是字节,如3240791 -> 3.08 M
 * @param size
 * @returns
 */
function formatFileSizeByByte(size) {
    if (size == undefined || size == '') {
        return "";
    }
    if (isNaN(size)) {
        return size;
    }
    var i = 0;

    function getIndex(_size) {
        var step = 1024;
        if (_size >= step) {
            i++;
            return getIndex(_size / step);
        }
        return _size;
    }
    var unit = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB", "BB"];
    var rs = getIndex(size);
    return format_number(rs, 2) + " " + unit[i];
};

/** 格式化字符串
 *   Usage:  format_number(12345.678, 2);
 *   result: 12345.68
 **/
function format_number(pnumber, decimals) {
    if (isNaN(pnumber)) {
        return 0
    };
    if (pnumber == '') {
        return 0
    };
    //判断是否是负数,先转成正数
    var isMinus = false;
    if (pnumber < 0) {
        isMinus = true;
        pnumber = Math.abs(pnumber);
    }
    var snum = new String(pnumber);
    var sec = snum.split('.');
    var whole = parseFloat(sec[0]);
    var result = '';

    if (sec.length > 1) {
        var dec = new String(sec[1]);
        dec = String(parseFloat(sec[1]) / Math.pow(10, (dec.length - decimals)));
        dec = String(whole + Math.round(parseFloat(dec)) / Math.pow(10, decimals));
        var dot = dec.indexOf('.');
        if (dot == -1) {
            dec += '.';
            dot = dec.indexOf('.');
        }
        while (dec.length <= dot + decimals) {
            dec += '0';
        }
        result = dec;
    } else {
        var dot;
        var dec = new String(whole);
        dec += '.';
        dot = dec.indexOf('.');
        while (dec.length <= dot + decimals) {
            dec += '0';
        }
        result = dec;
    }
    //防止1.7392078638076782-0.34743452072143555 这种情况出现1.3900000000000001
    result = result.substring(0, result.indexOf(".") + decimals + 1);
    //把负号补回
    if (isMinus) {
        result = "-" + result;
    }
    return result;
}

/** 每三位数字添加一个逗号，方便阅读 (有bug)**/
/**
 *   Usage:  CommaFormatted(12345678);
 *   result: 12,345,678
 **/
function CommaFormatted(amount) {
    var delimiter = ","; // replace comma if desired
    amount = new String(amount);
    var a = amount.split('.', 2)
    var d = a[1];
    var i = parseInt(a[0]);
    if (isNaN(i)) {
        return '';
    }
    var minus = '';
    if (i < 0) {
        minus = '-';
    }
    i = Math.abs(i);
    var n = new String(i);
    var a = [];
    while (n.length > 3) {
        var nn = n.substr(n.length - 3);
        a.unshift(nn);
        n = n.substr(0, n.length - 3);
    }
    if (n.length > 0) {
        a.unshift(n);
    }
    n = a.join(delimiter);
    if (d.length < 1) {
        amount = n;
    } else {
        amount = n + '.' + d;
    }
    amount = minus + amount;
    return amount;
}

/** 这个函数可以添加分隔逗号或者进行四舍五入。 **/
/**
 *   Usage:  number_format(123456.789, 2, '.', ',');
 *   result: 123,456.79
 **/
function number_format(number, decimals, dec_point, thousands_sep) {
    return formatMoney(number, decimals);
    /*number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function(n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/B(?=(?:d{3})+(?!d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);*/
}

function formatMoney(s, n) {
    n = n > 0 && n <= 20 ? n : 2;
    //防止出现因为-1.1368681564654e-13这种情况的导致成格式化为-1.14,增加个差值
    var dif = Math.pow(0.1, n + 1);
    if (Math.abs(s) < dif) { //如果绝对值小于格式化的差值,则默认为0
        s = 0;
    }
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
    t = "";
    for (i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    var str = t.split("").reverse().join("") + "." + r;
    return str.replace("-,", "-");
}

/** 给数字添加"st, nd, rd, th"等序数词。 **/
/*
 *   Usage:
 *   var myNumOld = 23
 *   var myNumNew = myNumOld.toOrdinal()
 *   Result: 23rd
 */
Number.prototype.toOrdinal = function() {
        var n = this % 100;
        var suffix = ['th', 'st', 'nd', 'rd', 'th'];
        var ord = n < 21 ? (n < 4 ? suffix[n] : suffix[0]) : (n % 10 > 4 ? suffix[0] : suffix[n % 10]);
        return this + ord;
    }
    /*格式化百分比，用于表格中小数显示*/
function formatPercent(V, option) {
    var o = option === undefined ? 100 : option;
    return V * o;
}

function setCurrPrjTitle(title) {
    $("#lblProject", parent.document).text(title);
}

function setCurrPrjText(title) {
    $("#lblProject").text(title);
}

function getRequest(strParame, def) {
    var args = new Object();
    var query = location.search.substring(1);

    var pairs = query.split("&"); // Break at ampersand
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');
        if (pos == -1) continue;
        var argname = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos + 1);
        value = decodeURIComponent(value);
        args[argname] = value;
    }
    if (!args[strParame]) {
        return def;
    }
    return args[strParame];
}

function ShowHomeAtIndex() {
    $("#DataDiv").fadeOut(100, function() {
        $("#HomeDiv").fadeIn(300);
    });
    $("#btnDataDivTitle").hide();
}

function ShowHomeMain() {
    $("#DataDiv").fadeOut(100, function() {
        $("#HomeDiv").fadeIn(900);
    });
    $("#btnDataDivTitle").hide();
}

function ShowHome() {
    $("#DataDiv", parent.document).fadeOut(100, function() {
        $("#HomeDiv", parent.document).fadeIn(900);
    });
    $("#btnDataDivTitle", parent.document).hide();
}

function HideHome(title) {
    $("#lblTitle", parent.document).text(title);
    $("#btnDataDivTitle", parent.document).show();
    $("#HomeDiv", parent.document).fadeOut(100, function() {
        $("#DataDiv", parent.document).fadeIn(300);
    });
}
//typec显示位置
//0   1    2
//3   4    5
//6   7    8
function ShowTips(info, typec) {
    if (typec === 1 || typec == undefined) {
        top.$.messager.show({
            title: '5D BIM',
            msg: info,
            showType: 'slide',
            width: 600,
            height: 100,
            showSpeed: 300,
            timeout: 5000,
            style: {
                right: '',
                top: document.body.scrollTop + document.documentElement.scrollTop,
                bottom: ''
            }
        });
    } else if (typec === 2) {
        top.$.messager.show({
            title: '5D BIM',
            msg: info,
            showType: 'slide',
            width: 600,
            height: 100,
            showSpeed: 300,
            timeout: 5000,
            style: {
                left: '',
                right: 0,
                top: document.body.scrollTop + document.documentElement.scrollTop,
                bottom: ''
            }
        });
    }
};

function ShowError(info) {
    top.$.messager.alert('5D BIM', info, 'info');
};

function ShowNoFunc() {
    ShowTips('Function is NOT!');
};

function loadPage(url, title) {
    var href = url;
    if (href.indexOf('?') > -1) {
        href += '&' + Math.random();
    } else {
        href += '?' + Math.random();
    }
    $("#iframeData", parent.document).attr("src", href);

}
var load2Target = function(url, target) {
    var href = url;
    if (href.indexOf('?') > -1) {
        href += '&' + Math.random();
    } else {
        href += '?' + Math.random();
    }
    if (target != undefined) {
        window.open(href, target);
    } else {
        window.open(href, '_self');
    }
};

function loadPage2iFrame(iframeName, url, state, callback) {
    var href = url;
    if (href.indexOf('?') > -1) {
        href += '&' + Math.random();
    } else {
        href += '?' + Math.random();
    }
    if (state) {
        $("#" + iframeName).attr("src", url);
    } else {
        $("#" + iframeName).attr("src", href);
    }
    $("#" + iframeName).load(function() {
        if (callback) {
            callback();
        }
    });
};

function callFunction4Page(iframeId, url, callback) {
    var $ifr = $("#" + iframeId);
    var src = $ifr.attr("src");
    if (src == undefined || src == "" || src.indexOf(url) != 0) {
        $ifr.bind("load",function() {
            if (callback) {
                callback($ifr[0].contentWindow,true);
            }
        });
        $ifr.attr("src",url);
    } else {
        callback($ifr[0].contentWindow,false);
    }
};

function hrefRandom(url) {
    return hrefAppendRandom(url);
};

function hrefAppendRandom(url) {
    var href = url;
    if (href.indexOf('?') > -1) {
        href += '&' + Math.random();
    } else {
        href += '?' + Math.random();
    }
    return href;
};

//清单模块菜单切换  end //////////////////////////////////////////////////////////////////////


// 5D建模模块菜单切换  start //////////////////////////////////////////////////////////////////////

//*****************

// 5D建模模块菜单切换 Start //////////////////////////////////////////////////////////////////////



//function SetCwinHeight(obj) {
//    var cwin = obj;
//    if (document.getElementById) {
//        if (cwin && !window.opera) {
//            if (cwin.contentDocument && cwin.contentDocument.body.offsetHeight)
//                cwin.height = cwin.contentDocument.body.offsetHeight + 20; //FF NS
//            else if (cwin.Document && cwin.Document.body.scrollHeight)
//                cwin.height = cwin.Document.body.scrollHeight + 10; //IE
//        }
//        else {
//            if (cwin.contentWindow.document && cwin.contentWindow.document.body.scrollHeight)
//                cwin.height = cwin.contentWindow.document.body.scrollHeight; //Opera
//        }
//    }
//}
//$("iframe").load(function() {
//    $(this).width(document.body.clientWidth - 20);
//    $(this).height(document.body.scrollHeight - 120);
//    var clientHeight = $("iframe").contents().find("body").height();
//    $(this).height(clientHeight);
//});

function cookie(name) {
    var cookieArray = document.cookie.split("; "); //得到分割的cookie名值对
    var cookie = new Object();
    for (var i = 0; i < cookieArray.length; i++) {
        var arr = cookieArray[i].split("="); //将名和值分开
        if (arr[0] == name) return unescape(arr[1]); //如果是指定的cookie，则返回它的值
    }
    return "";
}



function delCookie(name) //删除cookie
{
    document.cookie = name + "=;expires=" + (new Date(0)).toGMTString();
}



function getCookie(objName) { //获取指定名称的cookie的值
    var arrStr = document.cookie.split("; ");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == objName) return unescape(temp[1]);
    }
}






function addCookie(objName, objValue, objHours) { //添加cookie
    var str = objName + "=" + escape(objValue);
    if (objHours > 0) { //为时不设定过期时间，浏览器关闭时cookie自动消失
        var date = new Date();
        var ms = objHours * 3600 * 1000;
        date.setTime(date.getTime() + ms);
        str += "; expires=" + date.toGMTString();
    }
    document.cookie = str;
}



function SetCookie(name, value) //两个参数，一个是cookie的名子，一个是值
{
    var Days = 30; //此 cookie 将被保存 30 天
    var exp = new Date(); //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString();
}

function getCookie(name) //取cookies函数
{
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null;
}

function delCookie(name) //删除cookie
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
/**
 * 智能获取参数
 * 先从url中获取,获取不到再从cookie中获取
 * @param requestName 从url中获取
 * @param cookieName 从Cookie中获取(如果为空,则默认和requestName一样)
 * @returns
 */
function getParameterAuto(requestName, cookieName) {
    var _requestName = requestName;
    var _cookieName = cookieName;
    if (_cookieName == undefined) {
        _cookieName = _requestName;
    }
    var value;
    value = getRequest(_requestName);
    if (value == undefined || value == "") {
        value = getCookie(_cookieName);
    }
    return value;
}

function toFloat(val, n) {
    if ("" != val) {
        val = val + "";
        //递归调用时val为int
        if (val.indexOf(".") == 0) {
            val = "0" + val;
        }
        //val不含小数点
        if (val.indexOf(".") == -1) {
            var zero = ".";
            for (i = 0; i < n; i++) {
                zero = zero + "0";
            }
            return val + zero;
            //val小数点后的位数比需要的多
        } else if (eval(val.substring(val.indexOf(".") + 1, val.length).length) > eval(n)) {
            var next = val.substring(val.indexOf(".") + eval(n) + 1, val.indexOf(".") + eval(n) + 2);
            //四舍五入
            if (next >= 5) {
                var result = eval(val.substring(0, val.indexOf(".") + eval(n) + 1)) + 0.01;
                //四舍五入后result变为int型
                return toFloat(result, n);
            } else {
                return val.substring(0, val.indexOf(".") + eval(n) + 1);
            }
        } else if (eval(val.substring(val.indexOf("."), val.length).length) < eval(n)) {
            //截取的小数的后的数字并减去点占的长度
            var pointNum = eval(val.substring(val.indexOf("."), val.length).length) - 1;
            //需要补0的个数
            var zeroNum = eval(n - pointNum);
            var zero = "";
            for (i = 0; i < zeroNum; i++) {
                zero = zero + "0";
            }
            return val + zero;
        } else {
            //符合需求直接返回
            return val;
        }
    } else {
        var zero = "0.";
        for (i = 0; i < n; i++) {
            zero = zero + "0"
        }
        return zero;
    }
}

function formatDateByNS(nS) {
    if (isNaN(nS)) {
        return nS;
    }
    var newDate = new Date();
    newDate.setTime(nS * 1000);
    return formatDate(newDate);
};

function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().substr(0, 17)
};
//alert(formatDate("2010-04-30", "yyyy-MM-dd"));
//alert(formatDate("2010-04-30", "yyyy-MM-dd HH:mm:ss"));
//alert(formatDate("2010-4-29 1:50:00", "yyyy-MM-dd HH:mm:ss"));
//格式化日期字符串
function formatDate(date, format) {
    if (!date) return;
    if (!format) format = "yyyy/MM/dd";
    switch (typeof date) {
        case "string":
            date = new Date(date.replace(/-/, "/"));
            break;
        case "number":
            date = new Date(date);
            break;
    }
    if (!date instanceof Date) return;
    var dict = {
        "yyyy": date.getFullYear(),
        "M": date.getMonth() + 1,
        "d": date.getDate(),
        "H": date.getHours(),
        "m": date.getMinutes(),
        "s": date.getSeconds(),
        "MM": ("" + (date.getMonth() + 101)).substr(1),
        "dd": ("" + (date.getDate() + 100)).substr(1),
        "HH": ("" + (date.getHours() + 100)).substr(1),
        "mm": ("" + (date.getMinutes() + 100)).substr(1),
        "ss": ("" + (date.getSeconds() + 100)).substr(1)
    };
    return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {
        return dict[arguments[0]];
    });
}


function getDaysByMonth(month, year) {
    var days;
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) days = 31;
    else if (month == 4 || month == 6 || month == 9 || month == 11) days = 30;
    else if (month == 2) {
        if (isLeapYear(year)) {
            days = 29;
        } else {
            days = 28;
        }
    }
    return (days);
}

function isLeapYear(Year) {
    if (((Year % 4) == 0) && ((Year % 100) != 0) || ((Year % 400) == 0)) {
        return (true);
    } else {
        return (false);
    }
}

var getWeekDayTitle = function(Y, M, D) {
    var d = (new Date(Y + '/' + M + '/' + D).getDay());
    switch (d) {
        case 0:
            return '日';
            break;
        case 1:
            return '一';
            break;
        case 2:
            return '二';
            break;
        case 3:
            return '三';
            break;
        case 4:
            return '四';
            break;
        case 5:
            return '五';
            break;
        case 6:
            return '六';

            break;
    }


};
/**
根据输入的日期段，计算之间的天数
*/
function getDays(beginDate, endDate) {
    if (beginDate == undefined || endDate == undefined || beginDate.length == 0 || endDate.length == 0) return 0;
    var sDate = new Date(beginDate),
        eDate = new Date(endDate);
    if (eDate <= sDate) return 0;
    var days = 0,
        sY = sDate.getFullYear(),
        sM = sDate.getMonth() + 1,
        eY = eDate.getFullYear(),
        eM = eDate.getMonth() + 1;
    if (sY == eY) {
        for (var M = sM; M <= eM; M++) {
            days += getDaysByMonth(M, sY);
        }
        return days;
    } else {
        for (var Y = sY; Y <= eY; Y++) {
            if (Y == sY) {
                for (var M = sM; M <= 12; M++) {
                    days += getDaysByMonth(M, Y);
                }
            } else if (Y == eY) {
                for (var M = 1; M <= eM; M++) {
                    days += getDaysByMonth(M, Y);
                }
            } else {
                for (var M = 1; M <= 12; M++) {
                    days += getDaysByMonth(M, Y);
                }
            }
        }
        return days;
    }
}

function getWeeks(beginDate, endDate) {
    if (beginDate == undefined || endDate == undefined) return 0;
    var sDate = new Date(beginDate),
        eDate = new Date(endDate);
    if (eDate <= sDate) return 0;
    var weeks = 0,
        sY = sDate.getFullYear(),
        sM = sDate.getMonth() + 1,
        eY = eDate.getFullYear(),
        eM = eDate.getMonth() + 1;
    return 0;
}

function getMonths(beginDate, endDate) {
    if (beginDate == undefined || endDate == undefined) return 0;
    var sDate = new Date(beginDate),
        eDate = new Date(endDate);
    var months = 0,
        sY = sDate.getFullYear(),
        sM = sDate.getMonth() + 1,
        eY = eDate.getFullYear(),
        eM = eDate.getMonth() + 1;
    if (sY == eY) {
        return eM - sM + 1;
    } else {
        for (var Y = sY; Y <= eY; Y++) {
            if (Y == sY) {
                months += 12 - sM + 1;
            } else if (Y == eY) {
                months += eM;
            } else {
                months += 12;
            }
        }
        return months;
    }
}
/*返回时间戳,到秒*/
function getDateStamp(v) {
    return Date.parse(v.replace('年', '/').replace('月', '/').replace('日', '/')) / 1000;
}
/*返回时间戳,到豪秒*/
Date.prototype.toMyLocaleString = function() {
    return this.getFullYear() + "/" + (this.getMonth() + 1) + "/" + this.getDate() + "/ " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();    /**
     *  var unixTimestamp = new Date(time);
     *  unixTimestamp.toLocaleString();
     */
};
/*计算两个时间戳(秒)之差,返回天数,不足1天返回1*/
function getDiffStamp(v1, v2) {
    return Math.ceil(Math.abs(v1 - v2) / (3600 * 24));
};
//计算两个日期之差
function getDiffDate(startDate, endDate) {
    if (startDate == undefined || endDate == undefined || startDate.length == 0 || endDate.length == 0) return 0;
    startDate = startDate.replace('年', '/').replace('月', '/').replace('日', '/');
    endDate = endDate.replace('年', '/').replace('月', '/').replace('日', '/');
    var sD = Date.parse(startDate),
        eD = Date.parse(endDate);
    return Math.round((eD - sD) / (1000 * 3600 * 24));
}

function getDiffMonth(startDate, endDate) { //计算两个日期月份之差
    if (startDate == undefined || endDate == undefined || startDate.length == 0 || endDate.length == 0) return 0;
    var sD = new Date(startDate),
        eD = new Date(endDate),
        sY = sD.getFullYear(),
        sM = sD.getMonth() + 1,
        eY = eD.getFullYear(),
        eM = eD.getMonth() + 1;
    if (eY == sY) {
        return eM - sM + 1;
    } else {
        var Ms = 0;
        for (var Y = sY; Y <= eY; Y++) {
            if (Y == sY) {
                Ms += 12 - sM + 1;
            } else if (Y == eY) {
                Ms += eM;
            } else {
                Ms += 12;
            }
        }
    }
};
//提取后缀名
function getSuffix(str) {
    var strArray = str.split('.');
    return strArray[strArray.length-1];
}
//从input的val中提取文件名。
function getFileName(str){
    /*lwz
    * */
    var array = str.split('\\');
    return array[array.length-1];
}
function Base64toByteArray(b64) {
    var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
    var i;
    var lookup = [];
    var revLookup = [];
    var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var len = code.length;

    for (i = 0; i < len; i++) {

        lookup[i] = code[i];

    }

    for (i = 0; i < len; ++i) {

        revLookup[code.charCodeAt(i)] = i;

    }

    revLookup['-'.charCodeAt(0)] = 62;
    revLookup['_'.charCodeAt(0)] = 63;

    var j, l, tmp, placeHolders, arr;
    var len = b64.length;

    if (len % 4 > 0) {

        throw new Error('Invalid string. Length must be a multiple of 4');

    }

    placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;
    arr = new Arr(len * 3 / 4 - placeHolders);
    l = placeHolders > 0 ? len - 4 : len;

    var L = 0;

    for (i = 0, j = 0; i < l; i += 4, j += 3) {

        tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
        arr[L++] = (tmp & 0xFF0000) >> 16;
        arr[L++] = (tmp & 0xFF00) >> 8;
        arr[L++] = tmp & 0xFF;

    }

    if (placeHolders === 2) {

        tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
        arr[L++] = tmp & 0xFF;

    } else if (placeHolders === 1) {

        tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
        arr[L++] = (tmp >> 8) & 0xFF;
        arr[L++] = tmp & 0xFF;

    }

    return arr;

};

function getStringByCodeArr(data) {
    var stringFile = '';
    var charArray = new Uint8Array(data);
    var i = 0;
    var len = charArray.length;
    while (len--) {
        stringFile += String.fromCharCode(charArray[i++]);
    }
    return stringFile;
}
//byte[]数组转化成base64字符串
function byteArr2Base64(arr) {
    var table = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
        'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
        'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
        'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
        'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
        'w', 'x', 'y', 'z', '0', '1', '2', '3',
        '4', '5', '6', '7', '8', '9', '+', '/'
    ];
    var i = 0; // 遍历索引
    var len = arr.length;
    var res = [];
    while (i < len) {
        var c1 = arr[i++] & 0xFF;
        res.push(table[c1 >> 2]);
        // 需要补2个=
        if (i == len) {
            res.push(table[(c1 & 0x3) << 4]);
            res.push('==');
            break;
        }
        var c2 = arr[i++];
        // 需要补1个=
        if (i == len) {
            res.push(table[((c1 & 0x3) << 4) | ((c2 >> 4) & 0x0F)]);
            res.push(table[(c2 & 0x0F) << 2]);
            res.push('=');
            break;
        }
        var c3 = arr[i++];
        res.push(table[((c1 & 0x3) << 4) | ((c2 >> 4) & 0x0F)]);
        res.push(table[((c2 & 0x0F) << 2) | ((c3 & 0xC0) >> 6)]);
        res.push(table[c3 & 0x3F]);
    }
    return res.join('');
};
var USER_ROLE_DATA = "SJ_RoleData";
/**
 * 从loacalStorage中获取权限数据
 */
var getRoleData = function() {
    var _roleDataStr = localStorage.getItem(USER_ROLE_DATA);
    //如果没有找到数据,则抛出异常
    if (_roleDataStr === undefined) {
        throw "没有用户权限信息!";
    }
    //解析数据
    return eval("(" + _roleDataStr + ")");
};
/**
 * 设置用户权限到loacalStorage
 */
var setRoleData = function(data) {
    var value;
    //如果是对象,则先序列化
    if (typeof data == "object") {
        value = JSON.stringify(data);
    } else if (typeof data == "string") {
        value = data;
    } else {
        value = data;
    }
    localStorage.setItem(USER_ROLE_DATA, value);
};
//根据角色的用户类型,返回类型的名字和对应的class文件
var getRoleInfoByRoleType = function(roleType) {
    //转换成String类型,防止switch比较时候,因为类型不同导致的类型转化失败
    var _roleType = new String(roleType).valueOf();
    var roleInfo = {};
    switch (_roleType) {
        case "1":
            roleInfo.name = "业主方";
            roleInfo.clzName = "icon-owner";
            break;
        case "2":
            roleInfo.name = "总控方";
            roleInfo.clzName = "icon-controller";
            break;
        case "3":
            roleInfo.name = "设计方";
            roleInfo.clzName = "icon-designer";
            break;
        case "4":
            roleInfo.name = "咨询方";
            roleInfo.clzName = "icon-counselor";
            break;
        case "5":
            roleInfo.name = "监理方";
            roleInfo.clzName = "icon-supervisor";
            break;
        case "6":
            roleInfo.name = "施工方";
            roleInfo.clzName = "icon-construction";
            break;
        case "7":
            roleInfo.name = "供应方";
            roleInfo.clzName = "icon-supplier";
            break;
        case "8":
            roleInfo.name = "运维方";
            roleInfo.clzName = "icon-operation";
            break;
        case "9":
            roleInfo.name = "招标方";
            roleInfo.clzName = "icon-other";
            break;
        default:
            roleInfo.name = "未知角色";
            roleInfo.clzName = "";
            break;
    }
    return roleInfo;
}

/*总价项目措施Typecode转换*/
var convertZJCSTypecode = function(typec) {
    var value = '';
    switch (typec) {
        case 1:
            value = '安全文明施工费';
            break;
        case 2:
            value = '夜间施工增加费';
            break;
        case 3:
            value = '二次搬运费';
            break;
        case 4:
            value = '冬雨季施工增加费';
            break;
        case 5:
            value = '已完成工程及设备保护费';
            break;
        default:
            value = '其它费用';
            break;
    }
    return value;
};
/*单位工程类型TypeCode转换*/
var convertPrjTypecode = function(typec) {
    var value = '';
    switch (typec) {
        case 1:
            value = '土建';
            break;
        case 2:
            value = '安装';
            break;
        case 3:
            value = '装饰';
            break;
        case 4:
            value = '市政';
            break;
        case 5:
            value = '水利';
            break;
        default:
            value = '其它';
            break;
    }
    return value;
};
//适当iframe
function clearIframe(json) {
    var id = json.id;
    var el = document.getElementById(id),
        iframe = el.contentWindow;
    if (el) {
        el.src = 'about:blank';
        try {
            iframe.document.write('');
            iframe.document.clear();
        } catch (e) {};
        el.src = '';
        //以上可以清除大部分的内存和文档节点记录数了
        //最后删除掉这个 iframe 就哦咧。
        if (json.romove == 1) {
            document.body.removeChild(el);
        }
    }
}

/**
 * 处理序号自增长 在传入的字符串最后一位加一
 * @param str 传入的序号
 * @param num 增长速度，默认为1
 * @returns {string}
 * @constructor
 */
function SelfGrowing(str, num) { //str:Code001
    var nNum = 0;
    var speed = 1;
    if (num != undefined) {
        speed = num;
    }
    var returnStr = '';
    if (str != undefined) {
        var numStr = '';
        for (var i = str.length - 1; i >= 0; i--) { //循环后numStr:"001"  newNumStr:"Code"
            if (!isNaN(str.charAt(i))) { //是数字
                numStr = str.charAt(i) + numStr;
            } else {
                returnStr = str.substring(0, i + 1);
                break
            }
        }
        if (numStr.length == 0) {
            numStr = "1";
        } else {
            var num = new String(parseInt(numStr) + speed); // "2"
            var newNumStr = "";
            for (var i = num.length; i < numStr.length; i++) { //循环后 newNumStr : "00"
                newNumStr += "0";
            }
            newNumStr += num; //"002"
            numStr = newNumStr;
        }
        returnStr += newNumStr; //Code002
    }
    return returnStr;
}

/**
 * 获取对象中的非行间样式
 * @param obj 传入的对象
 * @param attr 属性名
 * @param value 属性
 * @returns {*} 若没传入value，则返回属性，若存在则设置该属性
 */
function getStyle(obj, attr, value) {
    if (typeof obj == 'object') {
        if (!value) {
            var sCurrentStyle = obj.currentStyle;
            if (sCurrentStyle != undefined) {
                return obj.currentStyle(attr);
            } else {
                return getComputedStyle(obj, false)[attr];
            }
        } else {
            obj.style[attr] = value
        }
    } else {
        return;
    }
}
/**
 * rgb与16位色值之间的转换
 * @param rgb
 * @returns {string}
 * @constructor
 */
function RGBToHex(rgb) {
    var regexp = /[0-9]{0,3}/g;
    var re = rgb.match(regexp); //利用正则表达式去掉多余的部分，将rgb中的数字提取
    var hexColor = "#";
    var hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    for (var i = 0; i < re.length; i++) {
        var r = null,
            c = re[i],
            l = c;
        var hexAr = [];
        while (c > 16) {
            r = c % 16;
            c = (c / 16) >> 0;
            hexAr.push(hex[r]);
        }
        hexAr.push(hex[c]);
        if (l < 16 && l != "") {
            hexAr.push(0)
        }
        hexColor += hexAr.reverse().join('');
    }
    return hexColor;
}
/**
 * 处理颜色渐变
 * @param str 要处理的rgb格式的颜色数据
 * @param speed 渐变速度
 * @constructor
 */
function RGBGrowing(str, speed) {
    var nSpeed = 1;
    var newNum = 0;
    var RGBStr = 'rgb(';
    if (speed != undefined && !isNaN(Number(speed))) {
        nSpeed = speed;
    }
    if (str != undefined) {
        var sStr01 = str.split('(')[1];
        var sStr02 = sStr01.split(')')[0];
        var aStr02 = sStr02.split(',');
        for (var i = 0; i < aStr02.length; i++) {
            newNum = Number(aStr02[i]) + speed;
            if (newNum < 0) {
                newNum = 0;
            }
            if (newNum > 255) {
                newNum = 255;
            }
            if (i != aStr02.length - 1) {
                RGBStr += newNum + ',';
            } else {
                RGBStr += newNum + ')';
            }
        }
    }
    if (RGBStr != 'rgb(') {
        return RGBStr;
    }
}
/**
 * 添加css样式，若id存在则覆盖
 * @param id css样式ID
 * @param cssText css样式
 * @constructor 在当前文档头部插入该CSS样式
 */
function addCSS(id, cssText) {
    //如果原来已经存在该CSS
    var oStyle = document.getElementById(id);
    if (oStyle != undefined) {
        oStyle.parentNode.removeChild(oStyle);
    }
    var style = document.createElement('style'); //创建一个style元素
    var head = document.head || document.getElementsByTagName('head')[0]; //获取head元素
    style.type = 'text/css'; //这里必须显示设置style元素的type属性为text/css，否则在ie中不起作用
    style.id = id;
    if (style.styleSheet) { //IE
        var func = function() {
            try { //防止IE中stylesheet数量超过限制而发生错误
                style.styleSheet.cssText = cssText;
            } catch (e) {

            }
        };
        //如果当前styleSheet还不能用，则放到异步中则行
        if (style.styleSheet.disabled) {
            setTimeout(func, 10);
        } else {
            func();
        }
    } else { //w3c
        //w3c浏览器中只要创建文本节点插入到style元素中就行了
        var textNode = document.createTextNode(cssText);
        style.appendChild(textNode);
    }
    head.appendChild(style); //把创建的style元素插入到head中
}
////////////////////////////////////////////////////////////////
//图片预览
//function previewImage(divid,file,maxwidth,maxheight) {
//    var MAXWIDTH = maxwidth;
//    var MAXHEIGHT = maxheight;
//    var div = document.getElementById(divid);
//    if (file.files && file.files[0]) {
//        div.innerHTML = '<img id=imghead>';
//        var img = document.getElementById('imghead');
//        img.onload = function () {
//            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
//            img.width = rect.width;
//            img.height = rect.height;
//            img.style.marginLeft = rect.left + 'px';
//            img.style.marginTop = rect.top + 'px';
//        }
//        var reader = new FileReader();
//        reader.onload = function (evt) { img.src = evt.target.result; }
//        reader.readAsDataURL(file.files[0]);
//    }
//    else {
//        var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
//        file.select();
//        var src = document.selection.createRange().text;
//        div.innerHTML = '<img id=imghead>';
//        var img = document.getElementById('imghead');
//        img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
//        var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
//        status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height);
//        div.innerHTML = "<div id=divhead style='width:" + rect.width + "px;height:" + rect.height + "px;margin-top:" + rect.top + "px;margin-left:" + rect.left + "px;" + sFilter + src + "\"'></div>";
//    }
//}
//function clacImgZoomParam(maxWidth, maxHeight, width, height) {
//    var param = { top: 0, left: 0, width: width, height: height };
//    if (width > maxWidth || height > maxHeight) {
//        rateWidth = width / maxWidth;
//        rateHeight = height / maxHeight;

//        if (rateWidth > rateHeight) {
//            param.width = maxWidth;
//            param.height = Math.round(height / rateWidth);
//        } else {
//            param.width = Math.round(width / rateHeight);
//            param.height = maxHeight;
//        }
//    }

//    param.left = Math.round((maxWidth - param.width) / 2);
//    param.top = Math.round((maxHeight - param.height) / 2);
//    return param;
//}
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
// ajax全局控制 Start
$(document).ajaxStart(function() {
    if ($("#sjkjLoading", window.top.document).size() == 0) {
        $("#dvNorth div:eq(0)", window.top.document).append("<p id='sjkjLoading'><img src='/res/css/img/loading.gif' /></p>")
    }
});

$(document).ajaxComplete(function(evt, request, settings) {
    //隐藏遮罩
    if ($("#sjkjLoading", window.top.document).size() > 0) {
        setTimeout(function() {
            $("#sjkjLoading", window.top.document).remove();
        }, 500);

    }
});
// ajax全局控制 End
////////////////////////////////////////////////////////////////
