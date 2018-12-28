var PENDING = 'pending';
var REJECT = 'reject';
var RESOLVE = 'resolve';
function PromiseA(fn) {
    exec(fn);

    var status = undefined;
    var callbacks = [];
    var value = undefined;
    this.resolve = resolve;
    function exec(fn){
        fn(resolve, reject);
    }
    function resolve(result) {
        if(result && result.then) {
            return exec(result.then);
        }
        fullfill(result);
        return this;
    }
    function fullfill(result) {
        value = result;
        status = RESOLVE;
        callbacks.forEach(handle);
    }
    function reject(result) {
        status = REJECT;
        value = result;
        callbacks.forEach(handle);
    }
    function handle(callback) {
        if(status === RESOLVE)
            callback.onFullfill(value);
        else if(status === REJECT)
            callback.onReject(value);
        else
            callbacks.push(callback);
    }
    this.done = function(onFullfill, onReject) {
        setTimeout(handle({onFullfill, onReject}));
    }
    this.then = function(onFullfill, onReject) {
        var self = this;
        return new PromiseA(function(resolve, reject) {
            self.done(function(result) {
                resolve(onFullfill(result));
            }, function(result) {
                reject(onReject(result));
            })
        });
    }
}

new PromiseA(function(resolve) {
    setTimeout(() => {
        resolve('123');
    }, 2000)
}).then((res) => {
    console.log(res);
})