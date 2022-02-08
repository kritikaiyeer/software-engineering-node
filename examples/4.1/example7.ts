import makePromise1 from '../promiseMaker'

console.log("main handler starting")

// p1 will be rejected
const p1 = makePromise1("p1", true, 10)
const p2 = makePromise1("p2", true, 20)

const p3 = p1.then(n => {
    console.log(`callback A says: p1 passed ${n} to me`);
    return n+1
})

const p4 = p1.then(n => {
    console.log(`callback B says: p1 passed ${n} to me, too`);
    return n+100
})

const p5 = Promise.all([p4,p3])
    .then(values => {
        console.log(`p3 returned ${values[1]}`);
        console.log(`p4 returned ${values[0]}`)
    })

    
console.log("main handler finishing\n")
