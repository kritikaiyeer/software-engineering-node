import makePromise1 from './promiseMaker'

console.log("main handler starting")

// create a new promise, labeled "promise100",
// and throw it in the pool
makePromise1("promise100",true,10)

// finish the main handler
console.log('main handler finished')
// and go on to run any handlers left in the pool


