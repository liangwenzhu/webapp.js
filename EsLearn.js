function ObjFn(value){
    this.value = value;
    this.next = null;
}
ObjFn.prototype[Symbol.iterator] = function(){
    let iterator = {
        next:next
    };
    let current = this;
    function next(){
        if(current){
            let value = current.value;
            current = current.next; //aa.next->bb,此时，原型链的current = bb; 当第2次运行原型链的函数时，current不再等于this,而是bb。直一直运行，直到done为false才会停止运行。
            return {done:false,value:value};
        }else{
            return {done:true}
        }
    }
    return iterator; //此时，iterator = {done:false,value:1}
};

let aa = new ObjFn(1);
let bb = new ObjFn(2);
aa.next = bb;
function* f(){
    for(let i=0;true;i++){
        let reset = yield i;
        if(reset){
            i = -1
        }else{

        }
    }
}
let g = f();
//log(g.next());
//log(g.next(1)); 带参数后，上一次yield的表达式返回值为这个参数
let gg = function* (){
    try{
        yield;
    }catch(e){
        log('内部捕获'+e);
    }
    yield log(1)
};
let i = gg();
i.next();
try{
    i.throw('a');
    i.throw('b');
}catch(e){
    log('外部捕获'+e);
}let kk = function* (){
    let x = yield 3;
    let y = x.toUpperCase();
    yield y;
    yield log(6);
};
let it = kk();
it.next();
try{
    // it.next(42);
}catch(e){
    log('出错')
}
//内部错误被外部捕获，同时将这次错误的yield的done设置为true
let gen1 = function* (){
    yield 1;
    yield 2;
    yield 3;
};
let g = gen1();
log(g.next());
log(g.return('foo'));
//终结generator函数，在内部插入一条return 'foo'。因此done为true
function* bar(){
    yield 'u';
    yield* foo();
    yield 'v';
}
function* foo(){
    yield 'w';
    yield 'x';
}
//yield* foo()，等同于下面的for of
// function* bar (){
//     yield 'u';
//     for(let i of foo()){
//         yield i
//     }
//     yield 'x'
// }
for(let i of bar()){
    log(i);
}
function* foo1() {
    yield 2;
    yield 3;
    return 'foo';
}
function* bar1(){
    yield 1;
    let v = yield* foo1();
    log('v' + v);
    yield 4;
}
let it1 = bar();
for(i of it1){
    log(i)
}
//由于foo有返回值，因此，v等于foo()的返回值。
function* iterTree(tree){
    if(Array.isArray(tree)){
        for(let i of tree){
            yield*  iterTree(i);
        }
    }else{
        yield tree;
    }
}
let tree = ['a',['b','c',['d','e']],'f','g'];
for(let i of iterTree(tree)){
    log(i);
}
//快速遍历嵌套数组
let ticking = true;
let clock = function* (){
    while(true){
        log('true');
        yield;
        log('false');
        yield;
    }
};
let a = clock();
a.next();
a.next();
a.next();
//状态机。

// Promise 的异步链式（1）；
let Promises = new Promise(function(resolve,reject){
    setTimeout(function(){
        log(2);
        resolve();
    },1000);
}).then(function(){
    return new Promise(function(resolve){
        setTimeout(function(){
            log(3);
            resolve();
        },200);
    })
}).then(function(){
    log(4);
});
// （2）
let step1 = new Promise(function(resolve,reject){
    log(1);
    resolve();
});
let step2 = new Promise((resolve)=>{
    log(2);
    resolve();
});
let step3 = new Promise((resolve)=>{
    log(3);
    resolve();
});
let step4 = new Promise((resolve)=>{
    log(4);
    resolve();
});
let step5 = new Promise(()=>{
    log(5);

});
step1.then(step2).then(step3).then(step4).then(step5);
//then之所以可以链在一起，是因为then返回了Promise对象，并调用了resolve();否不不能。

function* task(val){
    let val1 = yield step1(val);
    let val2 = yield step2(val1) + 1;
    let val3 = yield step3(val2) + 1;
}
function aaa (task){
    let taskObj = task.next(task.value);
    log(taskObj.value);
    if(!taskObj.done){
        task.value = taskObj.value;
        aaa(task);
    }
}
aaa(task(1));
//generator进行链式调用。为什么包一层，就可以第一次使用next就可以传参
const bar = Symbol('bar');
class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.z = undefined;
    }
    toString(){
        return this.x + this.y;
    }
    usePrivateFn(){
        return this[bar]();
    }
    [bar](){
        return 1;
    }
}
let b = new Point(1,2);
// log(b[bar]());
//模拟私有属性（实际上就是方法），?????外部还是可以使用啊？？