// Number
// 八进制 0开头 0-7 严格模式无效
let num = 070 //56
// 十六进制 0x开头 0-9 a-f
let num = 0x1f // 31

// 浮点数值
// 储存空间是整数两倍 自动转为整数
1. // 解析为1
10.0 // 解析为10

// 极大极小 科学计数法
// 小数点后6位以上自动转换
0.0000001 // 1e-7
//最高精度 17位 
//计算误差无法测试 转换为整数再计算
0.1 + 0.2 = 0.30000000000000004;
// 17位整数与其他数计算也会有问题
30000000000000004 + 1 !== 30000000000000005
//最大数 最小数
Number.MIN_VALUE  Number.MAX_VALUE
//Infinity 不能参与数值计算
Infinity !== (Number.MAX_VALUE + 1)
(Infinity -1 ) === Infinity
(Infinity + 1 ) === Infinity
Infinity === (Number.MAX_VALUE + Number.MAX_VALUE)
isFinite(Infinity)  === false;

//NaN 
//除以0等于 NaN
1/0 // Infinity
0/0 // NaN
NaN / 1 // NaN
NaN !== NaN // 任何数不等于NaN
//判断能否转换数字
isNaN('1') // false
isNaN('a') // true
isNaN(object) // 先调用valueOf 不能 再调用 toString()

//数值转换
Number //参数为任何类型
parseInt // 参数为字符串
// Number转换规则
Boolean true:1 false:0
Number number
undefined 0
null 0
String 
    '123'=123 '0.1'=0.1 '011'=11 '0x1f'=31 number//只包含数字
    '' = 0
    'ad' NaN
Object
    valueOf() // 如果返回对象，调用原对象的toString()
    toString()
+a === Number(a)

let obj = {};
obj.valueOf = () => {
    return {};
}
obj.toString = () => {
    return '1234';
};
Number(obj); // 1234

let obj = {};
obj.valueOf = () => {
    return '333';
}
obj.toString = () => {
    return '1234';
};
Number(obj); // 333

// 忽略前面的空格 遇到第一个必须为数字，否则为NaN 第一个为数字继续读取至非数字
// 识别十六进制，不识别八进制
parseInt(' 070ads'); 70
parseInt(' 0x1fsads');  31
// 加参数
parseInt('070',8); 56
parseInt('100',2); 4
// 非字符串参数也可
parseInt(100,2); 4

//忽略前面的零，固定为十进制
parseFloat('0000123'); 123
parseFloat(011); 9// 因为011是八进制数字 等于9
parseFloat('22.33.44'); 22.33 
parseFloat('1.2e3'); 1200

String
'\n \t \b \r'
'\x41' ASCii 65 = "A"
'\u03a3' unicode length =1

toString
// Number Boolean String Object都有 string.toString() 返回字符串副本
// 数值的toString 返回特定进制字符串
(2).toString(2) // "10"
//2进制 转换为 10进制 parseInt('100',2) //4
//10进制 转换为 2进制 (4).toString(2) // "100"

String()//转换规则
// 调用toString
// null 返回'null'
// undefined 返回 "undefined"
+"" = String()

Object
// 实例属性方法
constructor // 构造函数
hasOwnProperty // 属于实例而非原型
isProrotypeOf // 对象是否是另一对象原型
propertyIsEnumerable // 能否在for in循环出现 for in 循环可循环原型对象
toLocaleString
toString // 一般返回 [Object, Object]
valueOf // 一般返回对象
console.log(object) // 打印该类型数值，不进行类型转换

// 一元操作符 只操作一个值
++i;
let i =1;let j = ++i; j=2
let i =1;let j = i++; j=1
let i = '1';let j = ++i;
+value; == Number(value)

//位操作
// 数值均以64位储存 位操作符 转换为32位再操作，结果再返回64位
// 前31位表示值 32位表示符号 0整数 1负数
//负数以补码储存
1.求绝对值的二进制
2.去反码 1 0互换
3.加1

//按位非 取反码
~1 = -2
~-1 = 0
//按位与 
25 & 3 = 1
//按位或
5 | 2 = 7 
// 按位异或
5 ^ 3 = 6
//左移 不移动符号位
2>>1 =1 2<<1=4
//有符号右移
-8>>1 = -4 // 补符号位值
//无符号右移 转为整数
-8>>>1 =2147483644

//逻辑非
!a =  !Boolean(a)
!!a = Boolean(a)
//逻辑与 短路操作符
&& 
//不一定返回boolean
//第一个数为true 返回第二个数
//第一个数为false 返回第一个数
//逻辑或 短路操作符
||
//第一个数为true 返回第一个数
//第一个数为false 返回第二个数

//乘性操作符 * / %
// 非数值自动转换 Number()
// 只要有NaN 返回NaN
// Infinity * 0 = NaN
// 1/0 = Infinity
// 0/0 = NaN
// 1/Infinity = 0
// Infinity/1 = Infinity
// 1 % Infinity = 1
// Infinity%2 = NaN
// Infinity%Infinity = NaN
// Infinity/Infinity NaN
// Infinity*Infinity Infinity

//加性 + -
+
Infinity + Infinity = Infinity
Infinity - Infinity = NaN
//String:
//将另一个转换为string 拼接
//对象 调用toString 
//null undefined 调用String()转换为字符串
-
//一个数字符串 对象 Number() 转换数值

//关系操作符
> < <= >=
一个数值，另一个转换数值
一个数为NaN则返回false
布尔值转换数值比较
字符串比较编码值
对象 转换数值比较（先valueOf 后toString）

相等操作符
== ===
== 转换再比较
=== 不转换比较
==：
布尔值 转换为数值
字符串 转换数值
undefined null 不转换
undefined == null = true
undefined == 0 false
null == 0 false
NaN == NaN = false
对象： 取valueOf
两个对象 比较是否为同一对象（同一地址）
===
不转换值
NaN === NaN false
undefined === null false

复合操作符
+= -= *= /= %= <<= >>= >>>=

语句
if(condition)
自动对condition进行Boolean()转换
let i = 0;
do {
    i++;    
} while(i<10)
至少执行一次
while(){}
执行前执行一次出口条件求值，可能会不执行
for(init;expression;post-loop-expression)
写成while
init
while(expression) {
    post-loop-expression
}
转换while循环
for(;i<1;){

}
无限循环
for(;;){

}

for in
枚举对象属性 可能包含原型属性 顺序不确定

label 
配合循环语句 break continue
outer: for(var i = 0;i<10;i++){
    for(var j = 0;j<10;j++) {
        break outer;
    }
}

break continue
break:立即退出循环
continue:退出循环后从顶部继续执行
var num = 0;
for(let i = 1; i<10; i++) {
    if(i%5 === 0) {
        break;
    }
    num++;
}
num =  4
var num = 0;
for(let i = 1; i<10; i++) {
    if(i%5 === 0) {
        continue;
    }
    num++;
}
num=8
var num = 0;
outer: for(var i=0;i<10;i++) {
    for(var j=0;j<10;j++){
        if(i===5&&j===5)
            continue outer;
        num++;
    }
}
num=95;

with 将作用域设定到特定对象中
导致性能下降 严格模式错误 不建议使用
with(location) {
    var url =href
}

// switch;
var num = 1;
switch(num) {
    case 1: 
        console.log(1);
    case 2: 
        console.log(2); // 不加break 等于 case 1 case 2都执行到这一步
    default:
        console.log('default');
}
1,2,default
使用表达式
var num = 1;
switch(true) {
    case num>1:
        console.log('<'); // 条件num>1
    case num<1:
        console.log('>'); // 条件num>1 || num<1
    case num===1:
        console.log('='); // 条件num>1 || num<1 || num===1
    default:
        console.log('default');
}
= deafult

函数
function say() {
    return;
}
var result = say(); // undefined
function say() {
    // return;
}
var result = say(); // undefined

arguments
function say(){
    return arguments[0] + arguments[1] + arguments.length;
}
say('length','='); // length=2
function say(arg1,arg2){
    return arguments.arg1 + arguments.arg2 + arguments.length;
}
say('length','='); // NaN

与参数同步
'use strict'
function doAdd(num1, num2) {
    arguments[1] = 10;
    return arguments[0]+num2;
}
doAdd(1,2) // 11 
严格模式无效
'use strict'
function doAdd(num1, num2) {
    arguments[1] = 10;
    return arguments[0]+num2;
}
doAdd(1,2) // 3
单向反应//似乎不对 是双向反应
function doAdd(num1, num2) {
    console.log(arguments[1]);
    num2 = 10;
    console.log(arguments[1]);
    return arguments[0]+arguments[1];
}
doAdd(1,2) // 11
arguments 长度由执行传入参数确定而非定义命名参数确定
未传入自动变为undefined
function doAdd(num1, num2) {
    console.log(arguments[1]);
    num2 = 10;
    console.log(arguments[1]);
    return arguments[0]+arguments[1];
}
doAdd(1) // undefined undefined NaN
function doAdd(num1, num2) {
    console.log(num2);
    arguments[1] = 10;
    console.log(num2);
    return arguments[0]+arguments[1];
}
doAdd(1) // undefined undefined 11

没有重载
function add(num){
    return num;
}
function add(num){
    return num+10;
}
add(1) //11 add为后面定义的，覆盖前面的
