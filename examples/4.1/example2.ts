import makePromise1 from '../promiseMaker'

console.log("main handler starting")

const p1 = makePromise1("p1",true,10)
const p2 = makePromise1("p2",true,20)
const p3 = p1.then(n => {console.log(`p1 passed ${n} to its callback`)})
const p4 = p3.then((n) => {console.log(`p3 passed no value to its callback`)})

console.log("main handler finishing\n")
