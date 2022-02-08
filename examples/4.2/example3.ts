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

 
driver("promise1",true)
driver("promise2",false)

console.log('main handler finished')

