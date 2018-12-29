// 函数申明可访问name
function myname() {};
console.log(myname.name)

fn(); // error
var fn = function() {
    console.log('i am fn')
}
fn();
function fn() {
    console.log('i am fn')
}

fn(); //i am fn2
if(0) {
    function fn() {
        console.log('i am fn1')
    }
} else {
    function fn() {
        console.log('i am fn2')
    }
}
// 递归
'use strict';
var factorial = (function() {
    return function f(num) {
        if(num===1)
            return num;
        return num * f(num-1);
        // return num * arguments.callee(num-1);
    }
}());
let another = factorial;
factorial = null;
another(5);

//闭包
// 函数创建时，初始作用域链，保存在[scope]中，
// 调用函数时，创建一个执行环境，执行环境通过[scope]创建作用域链，
// 此后，将一个活动对象做为变量对象推入作用域链中
function outer(name) {
    return function () {
        console.log(name);
    }
}
let inner = outer('myname');
outer = null;
inner();

function createFn() {
    let result = [];
    for(var i = 0; i<10; i++){
        result[i] = (function(i){
            return function(){console.log(i)}
        })(i)
    }
    return result;
}
let fn = createFn();
for(let i = 0 ; i < 10; i++){
    fn[i]();
}
// this 在以对象的方法调用时，this=对象
var name ="outer";
var object = {
    name: 'inner',
    getName: function(){
        return function() {
            return this.name;
        }
    }
}
object.getName()();

var name ="outer";
var object = {
    name: 'inner',
    getName: function(){
        return this.name;
    }
}
object.getName();
(object.getName)();
(object.getName = object.getName)();

// 闭包用于创建私有作用域
function ouput(){
    (function() {
        for(var i = 0; i< 10; i++){
            console.log(i);
        }
    })();
    console.log(i); // undefined

}
(function() {
    var now = new Date();
    if(now.getMonth() === 0 && now.getDate() === 1)
        console.log('happy new year');
    console.log((now.getMonth()+1)+'月'+now.getDate()+'日');

})();

//私有变量
// 缺点 无法复用函数
function Person(name) {
    this.getName = function () {
        return name;
    }
    this.setName = function (value) {
        name = value;
    }
}
let person = new Person('myname');
person.getName();
person.setName('zzzz');
person.getName();

// 静态私有变量
let Person;
(function() {
    let private = '';
    let getName = function () {
        return private;
    }
    let setName = function (value) {
        private = value;
    }
    Person = function(name) {
        private = name;
    }
    Person.prototype.getName = getName;
    Person.prototype.setName = setName;
})();
let person = new Person('myname');
person.getName();
person.setName('zzzz');
person.getName();

//模块模式
// 单例对象 惯例:已对象字面量创建
let app = (function() {
    let list = [];
    return {
        getLength: function() {
            return list.length;
        },
        push: function(item) {
            list.push(item)
        }
    }
})();
app.push('aaa');
app.push('bbb');
app.getLength();

//增强模块模式
// 返回特定类型
function Person (name) {
    this.name = name
}
Person.prototype = {
    consrtructor: Person,
    say: function () {
        console.log(this.name);
    }
}
let app = (function() {
    let list = [];
    let obj = new Person('name1');
    obj.getLength = function() {
        return list.length;
    };
    obj.push = function(item) {
        list.push(item)
    }
    return obj;
})();
app.push('aaa');
app.push('bbb');
app.getLength();

/*
函数表达式  又叫匿名函数，拉姆达函数
递归函数使用arguments.callee调用自身，或者封装闭包
闭包模仿块级作用域
立即执行函数，不影响作用域，立即销毁，不占用内存
闭包创建私有变量
公有方法，特权方法可以访问私有变量
模块模式、原型模式，构造函数模式，实现单例或自定义类性的特权方法
*/
