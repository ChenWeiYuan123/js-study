/**
 * simple promise 
 * @param {[type]} fun [description]
 */
function PromiseB(fun) {

    this.succArg = undefined;
    this.failArg = undefined;
    this.succCbs = [];
    this.failCbs = [];
    this._status = this.STATUS.PENDING;

    this._execFun(fun);
}

PromiseB.prototype.STATUS = {
    PENDING: 1, //挂起状态
    RESOLVE: 2, //完成状态
    REJECT: 3 //拒绝状态
};

PromiseB.prototype._isFunction = function(f) {
    return Object.prototype.toString.call(f) === '[object Function]';
};

PromiseB.prototype._exec = function(callback, arg) {
    var newcallback;

    if (this._isFunction(callback)) {
        if (callback instanceof PromiseB) {
            callback.resolve(arg);
        } else {
            newcallback = new PromiseB(callback);
            newcallback.resolve(arg);
        }
    }
};

PromiseB.prototype._execFun = function(fun) {
    var that = this;

    if (this._isFunction(fun)) {
        fun(function() {
            that.succArg = Array.prototype.slice.apply(arguments);
            that._status = that.STATUS.RESOLVE;

            that.resolve.apply(that, arguments);
        }, function() {
            that.failArg = Array.prototype.slice.apply(arguments);
            that._status = that.STATUS.REJECT;

            that.reject.apply(that, arguments);
        });
    } else {
        this.resolve(fun);
    }

};

PromiseB.prototype.resolve = function() {
    var arg = arguments,
        ret,
        callback = this.succCbs.shift();
    if (this._status === this.STATUS.RESOLVE && callback) {
        ret = callback.apply(callback, arg);
        if (!(ret instanceof PromiseB)) {
            var _ret = ret;
            ret = new PromiseB(function(resolve) {
                setTimeout(function() {
                    resolve(_ret);
                });
            });

            ret.succCbs = this.succCbs.slice();
        }
        // this._exec(callback.apply(callback, arg), arg);
    }
};

PromiseB.prototype.reject = function() {
    var arg = arguments,
        ret,
        callback = this.failCbs.shift();
    if (this._status === this.STATUS.REJECT && callback) {
        ret = callback.apply(callback, arg);
        if (!(ret instanceof PromiseB)) {
            var _ret = ret;
            ret = new PromiseB(function(resolve) {
                setTimeout(function() {
                    resolve(_ret);
                }, 200);
            });
            ret.failCbs = this.failCbs.slice();
        }
    }
};

PromiseB.prototype.then = function(s, f) {
    this.done(s);
    this.fail(f);
    return this;
};

PromiseB.prototype.done = function(fun) {
    if (this._isFunction(fun)) {
        if (this._status === this.STATUS.RESOLVE) {
            fun.apply(fun, this.succArg);
        } else {
            this.succCbs.push(fun);
        }
    }
    return this;
};

PromiseB.prototype.fail = function(fun) {
    if (this._isFunction(fun)) {
        if (this._status === this.STATUS.REJECT) {
            fun.apply(fun, this.failArg);
        } else {
            this.failCbs.push(fun);
        }
    }
    return this;
};

PromiseB.prototype.always = function(fun) {
    this.done(fun);
    this.fail(fun);
    return this;
};