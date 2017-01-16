var Validator = function(){
    return this;
}
Validator.prototype = {
    isTypeOf: function (obj,type){
        return (Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() === type);
    },
    defaultFor: function(arg,type,defaultVal){
        return (this.isTypeOf(arg,type)) ? arg : defaultVal;
    },
    isObject: function(obj) {
        return this.isTypeOf(obj,'object');
    },
    isArray: function(obj) {
        return this.isTypeOf(obj,'array');
    },
    isBoolean: function(obj) {
        return this.isTypeOf(obj,'boolean');
    },
    isDefined: function(obj) {
        return !this.isTypeOf(obj,'undefined');
    },
    isDate: function(obj) {
        return this.isTypeOf(obj,'date');
    },
    isNumber: function(obj) {
        return this.isTypeOf(obj,'number');
    },
    isNull: function(obj) {
        return this.isTypeOf(obj,'null');
    },
    isFunction: function(obj) {
        return this.isTypeOf(obj,'function');
    },
    isRegex: function(obj) {
        return this.isTypeOf(obj,'regexp');
    },
    isString: function(obj) {
        return this.isTypeOf(obj,'string');
    },
    isBetween: function (num,min,max,equalTo){
        equalTo = this.defaultFor(equalTo,'boolean',false);
        return (this.isTypeOf(num,'number') &&
        this.isTypeOf(min,'number') &&
        this.isTypeOf(max,'number') &&
        (equalTo) ? num >= min : num > min &&
        (equalTo) ? num <= max : num < min)
    },
    getArgs: function(func) {
        var args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];
        return args.split(',').map(function(arg) {
            return arg.replace(/\/\*.*\*\//, '').trim();
        }).filter(function(arg) {
            return arg;
        });
    },
    functions: function(){
        var obj = Object.keys(Validator.prototype),
            removeFuncs = ['getArgs'],
            retArr = [];
        for(var i = obj.length - 1; i >= 0; i--) {
            removeFuncs.includes(obj[i])
            if(removeFuncs.includes(obj[i])) {
                obj.splice(i, 1);
            }
            else{
                var args = this.getArgs(this[obj[i]]);
                retArr.push(obj[i] + "("+args.toString()+")");
            }
        }
        retArr.reverse();
        return retArr;
    }
};
var validator = new Validator();