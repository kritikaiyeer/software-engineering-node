import myPromise from './promiseMaker'

async function driver(flag: boolean) {
    try {
        console.log(`starting driver(${flag})`)
        const n = await myPromise(flag)
        console.log(`myPromise(${flag}) fulfilled and passed ${n} to its successor`);
    } catch (n) {
        console.log(`myPromise(${flag}) rejected and passed "${n}" to its successor`)
    }
}


driver(true)
driver(false)

console.log('main thread finished')
