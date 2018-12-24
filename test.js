var list = [];
for(var i =0; i <10; i++) {
    var fn = ((i) => { 
        return function() {console.log(i);}
    })(i);
    list.push(fn);
};
list.forEach((fn) => {
    fn();
})

function Sup(name) {
    this.name = name;
}
Sup.prototype.getName = function() {
    console.log(this.name)
}
function Sub(name, age) {
    Sup.call(this, name);
    this.age = age;
}
function inherit(sup, sub) {
    let F = function() {};
    F.prototype = sup.prototype;
    f = new F();
    f.constructor = sub;
    sub.prototype = f;
}
inherit(Sup, Sub);
let sub = new Sub('name',123);
// sub;
// sub.getName();

function f() {};
f.prototype = {
    getName: function() {

    }
}
var obj = new f();
console.log(obj.prototype)
