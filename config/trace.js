// debugging help
/*
Object.defineProperty(global, '__stack', {
    get: function() {
        let orig = Error.prepareStackTrace;
        Error.prepareStackTrace = function(_, stack) {
            return stack
        };
        let err = new Error()
        Error.captureStackTrace(err, arguments.callee);
        let stack = err.stack
        Error.prepareStackTrace = orig
        return stack
    }
})
Object.defineProperty(global, '__line', {
    get: function() {
        return __stack[1].getLineNumber()
    }
})

Object.defineProperty(global, '__function', {
    get: function() {
        return __stack[1].getFunctionName()
    }
}) */

let debug = require('debug')

let trace = function(dbg, msg) {

    if (dbg) {

        let trc = debug(dbg)

        let orig = Error.prepareStackTrace;
        Error.prepareStackTrace = function(_, stack) {
            return stack[0]
        };
        let err = new Error()
        Error.captureStackTrace(err, arguments.callee);
        let stack = err.stack
        Error.prepareStackTrace = orig

        let fil = stack.getFileName()
        let fct = stack.getFunctionName()
        let lin = stack.getLineNumber()

        let args = [...arguments].slice(1)

        args[0] = 'file ' + fil + ' function ' + fct + ' line ' + lin + ': ' + msg

        trc.apply(null, args)
    }
}

module.exports = trace