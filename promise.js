var PENDING = 0; // 进行中
var FULFILLED = 1; // 成功
var REJECTED = 2; // 失败

function PromiseB(fn) {
    var state = PENDING;  // 存储PENDING, FULFILLED或者REJECTED的状态
    var value = null;  // 存储成功或失败的结果值
    var handlers = []; // 存储成功或失败的处理程序，通过调用`.then`或者`.done`方法
  
    // 成功状态变化
    function fulfill(result) {
        state = FULFILLED;
        value = result;
        handlers.forEach(handle); // 处理函数，下文会提到
        handlers = null;
     }
  
    // 失败状态变化
    function reject(error) {
        state = REJECTED;
        value = error;
        handlers.forEach(handle); // 处理函数，下文会提到
        handlers = null;
    }
    
    function resolve(result) {
        try {
          var then = getThen(result);
          if (then) {
            doResolve(then.bind(result), resolve, reject)
            return;
          }
          fulfill(result);
        } catch (e) {
          reject(e);
        }
    }
    // getThen 检查如果value是一个Promise对象，则返回then方法等待执行完成。
    function getThen(value) {
        var t = typeof value;
        if (value && (t === 'object' || t === 'function')) {
            var then = value.then;
            if (typeof then === 'function') {
                return then;
            }
        }
        return null;
    }
    // 异常参数检查函数，确保onFulfilled和onRejected两个函数中只执行一个且只执行一次，但是不保证异步。
    function doResolve(fn, onFulfilled, onRejected) {
        var done = false;
        try {
        fn(
            function(value) {
            if (done) return;
            done = true;
            onFulfilled(value);
            },
            function(reason) {
            if (done) return;
            done = true;
            onRejected(reason);
            }
        );
        } catch(ex) {
        if (done) return;
        done = true;
        onRejected(ex);
        }
    }

    doResolve(fn, resolve, reject);

    // 不同状态，进行不同的处理
    function handle(handler) {
      if (state === PENDING) {
        handlers.push(handler);
      } else {
        if (state === FULFILLED && typeof handler.onFulfilled === 'function') {
          handler.onFulfilled(value);
        }
        if (state === REJECTED && typeof handler.onRejected === 'function') {
          handler.onRejected(value);
        }
      }
    }
  
    this.done = function (onFulfilled, onRejected) {
      // 保证异步
      setTimeout(function () {
        handle({onFulfilled: onFulfilled, onRejected: onRejected});
      }, 0);
    }
  
    this.then = function(onFulfilled, onRejected) {
      var self = this;
      return new PromiseB(function (resolve, reject) {
        self.done(function (result) {
          if (typeof onFulfilled === 'function') {
            try {
              // onFulfilled方法要有返回值！
              return resolve(onFulfilled(result));
            } catch (ex) {
              return reject(ex);
            }
          } else {
            return resolve(result);
          }
        }, function (error) {
          if (typeof onRejected === 'function') {
            try {
              return resolve(onRejected(error));
            } catch (ex) {
              return reject(ex);
            }
          } else {
            return reject(error);
          }
        });
      });
    }

    this.catch = function(errorHandle) {
        return this.then(null, errorHandle);
    }
}

new PromiseB(function(resolve) {
    setTimeout(() => {
        resolve('123');
    }, 2000)
}).then((res) => {
    console.log(res);
})