function inherit(sub, sup) {
	let proto = Object.create(sup.prototype);
	proto.constructor = sub;
	sub.prototype = proto;
}
function sup(name) {
	this.name = name;
}
function sub(name, age) {
	//sup.call(this, name);
	this.age = age;
}
inherit(sub, sup);
let test1 = new sub('name', 123);

function a() {};
function b() {};
b.prototype = a.prototype;
let test2 = new b();
test2 instanceof a;

var ajax = new XMLHttpRequest()
ajax.open('get', '/v2/template/info?mSysid=2725019', true);
ajax.setRequestHeader('myheader', 'myheadervalue');
ajax.onload = function () {
console.log('readyState',ajax.readyState)
}
ajax.onloadstart= function () {
console.log('readyState',ajax.readyState)
}
ajax.onloadend = function () {
console.log('readyState',ajax.readyState)
}
ajax.onprogress = function (event) {
	if(event.lengthComputable) {
		console.log('progress', event.position, event.totalSize)
	}
}
ajax.send(null);

var ajax = new XMLHttpRequest()
ajax.onreadystatechange=function () {
console.log('readyState',ajax.readyState)
}
//ajax.timeout = 10;
//ajax.ontimeout = function() {console.log('timeout',ajax.status)}
ajax.open('post', '/v2/template/info?mSysid=2725019', true);
ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//ajax.overrideMimeType('text/xml')
ajax.send("asdf=123&bbbb=999");

_.mergeWith({ 'a': { 'b': 0, c: { d:1 }, e: 1}, f:1 }, { 'a': { 'b': 1, c: { d:1 }, e: 0}, f:1 }, (a,b) => a && b);


var sup = function(name) {
	this.name = name
}
sup.prototype.say  = function(){
	console.log(this.name)
}
var sub = function(name,age) {
	sup.call(this, name);
	this.age = age;
}
var object = function(o) {
	var f = function(){};
	f.prototype = o;
	return new f();
}
var mextend = function(sup,sub) {
	var p = object(sup.prototype);
	p.constructor = sub;
	sub.prototype = p;
}
mextend(sup, sub);
var s = new sub('aaa',122);
console.log(s.name);
console.log(s.age)
s.say();
