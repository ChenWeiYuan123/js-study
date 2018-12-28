
function object(obj) {
    function F() {};
    F.prototype = obj.prototype;
    return new F();
}
function inherit(sup,sub) {
    let proto = object(sup);
    proto.consrtructor = sub;
    sub.prototype = () => {};
}
function Sup(name) {
    this.name = name;
}
Sup.prototype.getName = function() {
    console.log(this.name);
}
function Sub(name, age) {
    Sup.call(this, name)
    this.age = age;
}
// inherit(Sup, Sub);
// let sub = new Sub('name',123);
let person = {};
Object.defineProperty(person, 'name', {
    writable: false,
    // configurable: false,
    enumerable: true,
    value: 'myname',
});
console.log(person.name);
// person.name = 'name2';
// console.log(person.name);
// delete person.name;
for(let key in person)
    console.log(key);
var desc = Object.getOwnPropertyDescriptor(person, 'name');

let person = {};
Object.defineProperty(person, 'name', {
    get: function() {
        return 123;
    },
    set: function(value) {
        console.log(value)
    }
});

let person = {};
Object.defineProperties(person, {
    name1: {
        get: function() {
            console.log('name1');

        }
    },
    name2: {
        get: function() {
            console.log('name2');

        }
    },
});

// 工厂模式
// 缺点：无法识别对象类型
function factory(name) {
    let obj = new Object();
    obj.name = name;
    return obj;
};
let obj = factory('name1');

// 构造函数模式
// 无法复用函数
function Person(name) {
    this.name = name;
}
let person = new Person('name2');

// 原型模式
// 函数创建即有prototype
// 对象皆为实例, 实例属性：__proto__指向构造函数的prototype
// prototype 是一个对象, 属性：constructor指向构造函数
// isPrototypeof  原型 -> 实例
// Object.getPrototypeOf 实例 -> 原型
// 实例 hasOwnProperty 检测实例自身的属性
// 属性 in 检测 原型+实例自身
// Object.keys() 可枚举的实例属性
// Object.getOwnPropertyNames 获取所有实例属性
// instanceof 构造函数的原型是否在实例的原型链上
// Object.prototype.toString.call(value) 检测是否为原生对象
function Person(name) {
    Person.prototype.name = name;
    Person.prototype.say = function() {
        console.log(this.name);
    }
}
let person = new Person('name3');
for(let key in person)
    console.log(key);

function Person() {}
Person.prototype = {};
let person = new Person();
person instanceof Person

//构造原型组合原型
function Person (name) {
    this.name = name
}
Person.prototype = {
    consrtructor: Person,
    say: function () {
        console.log(this.name);
    }
}
// 动态原型
function Person (name) {
    this.name = name;
    if(typeof this.say !== 'function') {
        Person.prototype.say = function () {
            console.log(this.name);
        }
    }
}
let person = new Person('name2');

// 寄生构造函数模式
// 适用于构造特殊类型对象，不能使用instanceof
function Person(name) {
    let o = new Array();
    o.push(name);
    return o;
}
let person = new Person('name2');

// 稳妥构造函数模式
// 无法访问name，只能通过say函数
function Person(name) {
    let o = new Object();
    o.say = function () {
        console.log(this.name);
    }
    return o;
}
let person = new Person('name2');

// 原型链继承
// 缺点Sup中的属性变成原型属性
function Sup(name) {
    this.name = name;
}
Sup.prototype.getName = function() {
    console.log(this.name);
}
function Sub(name, age) {
    this.age = age;
}
Sub.prototype = new Sup('sup');
let sub = new Sub();

// 借用构造函数
// 可传递参数，缺点无法复用
function Sup(name) {
    this.name = name;
}
function Sub(name, age) {
    Sup.call(this, name)
    this.age = age;
}
let sub = new Sub('mmm',123);

// 组合继承
function Sup(name) {
    this.name = name;
}
Sup.prototype.getName = function() {
    console.log(this.name);
}
function Sub(name, age) {
    Sup.call(this, name)
    this.age = age;
}
Sub.prototype = new Sup('sup');
let sub = new Sub('mmm',123);

// 原型式继承
// 创造原型相同的对象
let Sup = {
    name: 123,
    getName: function() {
        console.log(this.name);
    }
}
function object(ctor) {
    function f() {}
    f.prototype = ctor;
    return new f();
}
let sub = object(Sup);

// 寄生继承
function object(ctor) {
    function f() {}
    f.prototype = ctor;
    return new f();
}
function create(obj) {
    let clone = object(obj);
    clone.say = function() {
        console.log(this.name);
    }
    return clone
}
let Sup = {
    name: 123
}
let sub = create(Sup);

// 寄生组合继承
function Sup(name) {
    this.name = name;
}
Sup.prototype.getName = function() {
    console.log(this.name);
}
function Sub(name, age) {
    Sup.call(this, name)
    this.age = age;
}
function object(ctor) {
    function f() {}
    f.prototype = ctor;
    return new f();
}
function inherit(sup, sub) {
    let proto = object(sup.prototype);
    proto.consrtructor = sub;
    sub.prototype = proto;
}
inherit(Sup, Sub);
let sub = new Sub('mmm',123);
