import makePromise1 from '../promiseMaker'

console.log("main handler starting")

// p1 will be rejected
const p1 = makePromise1("p1", false, 10)
const p2 = makePromise1("p2", true, 20)

// p3 results in an unhandled error
const p3 = p1.then(n => {
    console.log(`p1 passed ${n} to its callback`)
})
// and p4 is never run
const p4 = p3.then(() => {
    console.log(`p3 passed no value to its callback`)
})

console.log("main handler finishing\n")
