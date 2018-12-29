/*
基本类型 String Boolean Number Undefined Null
基本类型保存在栈内存 占据固定大小内存
引用类型保存堆内存
*/

function Person(name) {
    this.name = name;
}
let person = new Person('andy');
person instanceof Person;
Person.prototype.consrtructor = null;
person instanceof Person;
person.__proto__ === Person.prototype;
Person.prototype = {};
person instanceof Person;


let obj = {
    name: 'andy'
}
let num = 1;
function setName(obj) {
    obj.name = 'nike';
    obj = new Object();
    obj.name = 'mike'
}
function setNum(num){
    num = 2
}
obj.name;
setName(obj);
obj.name;

let num = 1;
function setNum(num){
    num = 2
}
setNum(num);
num;

let color = 'blue';
function changeColor() {
    if(color === 'blue')
        color = 'red';
    else
        color = 'blue';
}
changeColor();
color;

let color = 'blue';
function changeColor() {
    let another = 'red';
    function swap() {
        let temp = another;
        another = color;
        color = temp;
    }
    swap();
}
changeColor();
color;

function buildUrl() {
    let qs = '?a=1';
    with(location) {
        var url = href + qs; //使用var声明的变量会添加到最近的执行环境
        // let url = href + qs;
    }
    return url;
}
buildUrl();

if(1) {
    var color = 'red';
}
color;

for(var i = 0; i<10; i++){}
i;

try {
    throw new Error('message');
} catch(error) {

}

function add(n1, n2) {
    sum =n1 + n2; // 被添加到全局执行环境
}
add(1,2)

let color = 1;
function getColor() {
    let color = 2;
    console.log(color);
}
getColor();

/*
标记清除
标记所有变量
去除可访问变量的标记
删除剩下带标记的变量
*/
//循环引用
let a = new Object();
let b = new Object();
a.b = b;
b.a = a;

//性能 垃圾收集器运行时机
//收集率大时提高临界值 收集率低时降低临界值

