import makePromise1 from './promiseMaker'

console.log("main handler starting")

function driver(promiseName: string, flag: boolean) {
    console.log(`starting driver(${flag})`)
    makePromise1(promiseName,flag,10)
        .then(n => {console.log(`promise ${promiseName} fulfilled and passed ${n} to its successor`);
                    return n+1
                })
        .then(m => console.log(`the second then block received ${m}`))
        .catch(n => console.log(`promise ${promiseName} rejected and passed "${n}" to its successor`))
}

async function driver2(promiseName: string, flag: boolean) {
    try {
        console.log(`starting driver2(${flag})`)
        const n = await makePromise1(promiseName, flag, 10)
        console.log(`promise ${promiseName} fulfilled and passed ${n} to its successor`);
        const m = n + 1
        console.log(`the second then block received ${m}`)
    } catch (n) { console.log(`promise ${promiseName} rejected and passed "${n}" to its successor`) }
}

console.log("first group") 
driver("promise1",true)
driver("promise2",false)
driver2("promise1a",true)
driver2("promise2a",false)

console.log('main handler finished')



