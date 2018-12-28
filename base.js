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
