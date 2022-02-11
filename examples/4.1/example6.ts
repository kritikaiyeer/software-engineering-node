import makePromise1 from '../promiseMaker'

console.log("main handler starting")

// p1 will be rejected
const p1 = makePromise1("p1", true, 10)
const p2 = makePromise1("p2", true, 20)

const p3  = p1.then((n:number) => {
    console.log(`callback A says: p1 passed ${n} to me`);
    return true
})

const p4 = p3.then((b:boolean) => {
    console.log(`callback B says: callback A passed ${b} to me`)
})


console.log("main handler finishing\n")
