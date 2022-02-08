// 

function f() {
    doThisNow()  
    promiseReturningFunction
        .then(value => onSuccess(value))
        .catch(errmsg => onFailure(errmsg))
}


async function f {
    try {
        doThisNow()
        const value = await promiseReturningFunction()
        onSuccess(value)
    } catch (errmsg) {
        onFailure(errmsg)
    }
}



function f() {
    doThisNow()  // done in the caller's thread
    makeNewPromise(() => doThisLater())  // the rest is all done in a new thread
        .then(value =>onSuccess(value))
        .catch(errmsg => onFailure(errmsg))
}

async function f {
    try {
        doThisNow()
        const value = await doThisLater()
        onSuccess(value)
    } catch (errmsg) {
        onFailure(errmsg)
    }
}
