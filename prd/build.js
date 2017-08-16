/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

eval("// url增加参数\n//箭头函数多于一条啊语句，增加大括号并用回return返回内容。\nlet appendUrlPara = (url, value) => {\n    if (url.indexOf('?') > -1) {\n        return url += '?' + value;\n    } else {\n        return url += '&' + value;\n    }\n};\n/*快速排序\r\n* @pivot 基准值，默认为第一个\r\n* @rest 除基准值以外的值的数组。\r\n* */\nlet quickSort = arr => {\n    if (!arr.length) {\n        return [];\n    }\n    const [pivot, ...rest] = arr;\n    return [...quickSort(rest.filter(x => x < pivot)), pivot, ...quickSort(rest.filter(x => x >= pivot))];\n};\n\n/*一维数组合并去重\r\n* */\nlet unique = (order = 'default', ...arr) => {\n    let a = [];\n    let c = [];\n    for (let b = 0; b < arr.length; b++) {\n        c.push(...arr[b]);\n    }\n    for (let i = 0; i < c.length; i++) {\n        if (!a.includes(c[i])) {\n            a.push(c[i]);\n        }\n    }\n    switch (order) {\n        case 'asc':\n\n            break;\n        case 'desc':\n\n            break;\n        default:\n            break;\n    }\n    return a;\n};\n\n// console.log(unique([9,5,4,4,2,1,5],[1,2,3,4,5,6,7,8,9,10,13]));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/OTU1MiJdLCJuYW1lcyI6WyJhcHBlbmRVcmxQYXJhIiwidXJsIiwidmFsdWUiLCJpbmRleE9mIiwicXVpY2tTb3J0IiwiYXJyIiwibGVuZ3RoIiwicGl2b3QiLCJyZXN0IiwiZmlsdGVyIiwieCIsInVuaXF1ZSIsIm9yZGVyIiwiYSIsImMiLCJiIiwicHVzaCIsImkiLCJpbmNsdWRlcyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBLElBQUlBLGdCQUFnQixDQUFDQyxHQUFELEVBQUtDLEtBQUwsS0FBZTtBQUNqQyxRQUFHRCxJQUFJRSxPQUFKLENBQVksR0FBWixJQUFpQixDQUFDLENBQXJCLEVBQXVCO0FBQ25CLGVBQU9GLE9BQU8sTUFBSUMsS0FBbEI7QUFDSCxLQUZELE1BRUs7QUFDRCxlQUFPRCxPQUFPLE1BQUlDLEtBQWxCO0FBQ0g7QUFDRixDQU5EO0FBT0E7Ozs7QUFJQSxJQUFJRSxZQUFhQyxHQUFELElBQVE7QUFDcEIsUUFBRyxDQUFDQSxJQUFJQyxNQUFSLEVBQWU7QUFBQyxlQUFPLEVBQVA7QUFBVTtBQUMxQixVQUFNLENBQUNDLEtBQUQsRUFBTyxHQUFHQyxJQUFWLElBQWtCSCxHQUF4QjtBQUNBLFdBQU8sQ0FDSCxHQUFHRCxVQUFVSSxLQUFLQyxNQUFMLENBQVlDLEtBQUdBLElBQUVILEtBQWpCLENBQVYsQ0FEQSxFQUVIQSxLQUZHLEVBR0gsR0FBR0gsVUFBVUksS0FBS0MsTUFBTCxDQUFZQyxLQUFHQSxLQUFHSCxLQUFsQixDQUFWLENBSEEsQ0FBUDtBQUtILENBUkQ7O0FBVUE7O0FBRUEsSUFBSUksU0FBUyxDQUFDQyxRQUFRLFNBQVQsRUFBbUIsR0FBR1AsR0FBdEIsS0FBOEI7QUFDdkMsUUFBSVEsSUFBSSxFQUFSO0FBQ0EsUUFBSUMsSUFBSSxFQUFSO0FBQ0EsU0FBSSxJQUFJQyxJQUFFLENBQVYsRUFBWUEsSUFBRVYsSUFBSUMsTUFBbEIsRUFBeUJTLEdBQXpCLEVBQTZCO0FBQ3pCRCxVQUFFRSxJQUFGLENBQU8sR0FBR1gsSUFBSVUsQ0FBSixDQUFWO0FBQ0g7QUFDRCxTQUFJLElBQUlFLElBQUUsQ0FBVixFQUFZQSxJQUFFSCxFQUFFUixNQUFoQixFQUF1QlcsR0FBdkIsRUFBMkI7QUFDdkIsWUFBRyxDQUFDSixFQUFFSyxRQUFGLENBQVdKLEVBQUVHLENBQUYsQ0FBWCxDQUFKLEVBQXFCO0FBQ2pCSixjQUFFRyxJQUFGLENBQU9GLEVBQUVHLENBQUYsQ0FBUDtBQUNIO0FBQ0o7QUFDRCxZQUFRTCxLQUFSO0FBQ0ksYUFBSyxLQUFMOztBQUVJO0FBQ0osYUFBSyxNQUFMOztBQUVJO0FBQ0o7QUFDSTtBQVJSO0FBVUEsV0FBT0MsQ0FBUDtBQUNILENBdEJEOztBQXdCQSIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdXJs5aKe5Yqg5Y+C5pWwXHJcbi8v566t5aS05Ye95pWw5aSa5LqO5LiA5p2h5ZWK6K+t5Y+l77yM5aKe5Yqg5aSn5ous5Y+35bm255So5ZuecmV0dXJu6L+U5Zue5YaF5a6544CCXHJcbmxldCBhcHBlbmRVcmxQYXJhID0gKHVybCx2YWx1ZSkgPT4ge1xyXG4gIGlmKHVybC5pbmRleE9mKCc/Jyk+LTEpe1xyXG4gICAgICByZXR1cm4gdXJsICs9ICc/Jyt2YWx1ZTtcclxuICB9ZWxzZXtcclxuICAgICAgcmV0dXJuIHVybCArPSAnJicrdmFsdWU7XHJcbiAgfVxyXG59O1xyXG4vKuW/q+mAn+aOkuW6j1xyXG4qIEBwaXZvdCDln7rlh4blgLzvvIzpu5jorqTkuLrnrKzkuIDkuKpcclxuKiBAcmVzdCDpmaTln7rlh4blgLzku6XlpJbnmoTlgLznmoTmlbDnu4TjgIJcclxuKiAqL1xyXG5sZXQgcXVpY2tTb3J0ID0gKGFycikgPT57XHJcbiAgICBpZighYXJyLmxlbmd0aCl7cmV0dXJuIFtdfVxyXG4gICAgY29uc3QgW3Bpdm90LC4uLnJlc3RdID0gYXJyO1xyXG4gICAgcmV0dXJuIFtcclxuICAgICAgICAuLi5xdWlja1NvcnQocmVzdC5maWx0ZXIoeD0+eDxwaXZvdCkpLFxyXG4gICAgICAgIHBpdm90LFxyXG4gICAgICAgIC4uLnF1aWNrU29ydChyZXN0LmZpbHRlcih4PT54Pj1waXZvdCkpXHJcbiAgICBdXHJcbn07XHJcblxyXG4vKuS4gOe7tOaVsOe7hOWQiOW5tuWOu+mHjVxyXG4qICovXHJcbmxldCB1bmlxdWUgPSAob3JkZXIgPSAnZGVmYXVsdCcsLi4uYXJyKSA9PiB7XHJcbiAgICBsZXQgYSA9IFtdO1xyXG4gICAgbGV0IGMgPSBbXTtcclxuICAgIGZvcihsZXQgYj0wO2I8YXJyLmxlbmd0aDtiKyspe1xyXG4gICAgICAgIGMucHVzaCguLi5hcnJbYl0pO1xyXG4gICAgfVxyXG4gICAgZm9yKGxldCBpPTA7aTxjLmxlbmd0aDtpKyspe1xyXG4gICAgICAgIGlmKCFhLmluY2x1ZGVzKGNbaV0pKXtcclxuICAgICAgICAgICAgYS5wdXNoKGNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHN3aXRjaCAob3JkZXIpe1xyXG4gICAgICAgIGNhc2UgJ2FzYyc6XHJcblxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdkZXNjJzpcclxuXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGE7XHJcbn07XHJcblxyXG4vLyBjb25zb2xlLmxvZyh1bmlxdWUoWzksNSw0LDQsMiwxLDVdLFsxLDIsMyw0LDUsNiw3LDgsOSwxMCwxM10pKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///0\n");

/***/ })
/******/ ]);