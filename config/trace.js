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

const debug = require('debug')

const trace = function(dbg, msg) {

    if (dbg) {

        const trc = debug(dbg)
        trc.enabled = true

        const orig = Error.prepareStackTrace;
        Error.prepareStackTrace = function(_, stack) {
            return stack[0]
        };
        const err = new Error()
        Error.captureStackTrace(err, arguments.callee);
        const stack = err.stack
        Error.prepareStackTrace = orig

        const fil = stack.getFileName()
        const fct = stack.getFunctionName()
        const lin = stack.getLineNumber()

        let args = [...arguments].slice(1)

        args[0] = 'file ' + fil + ' function ' + fct + ' line ' + lin + ': ' + msg

        trc.apply(null, args)
    }
}

module.exports = trace