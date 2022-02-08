import makePromise1 from './promiseMaker'

console.log("main handler starting")

makePromise1("promise1",true, 10)
 .then(n => console.log(`promise1 passed ${n} to its successor`))
makePromise1("promise2",false)
 .then(n => console.log(`promise2 passed ${n} to its successor`))
console.log('main thread finished')
