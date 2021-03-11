const start = new Date(new Date().setHours(0, 0, 0))
console.log(start)

// using a resolved promise, the 'then' block will be triggered instantly,
// but its handlers will be triggered asynchronously as demonstrated by the console.logs
/* const resolvedProm = Promise.resolve(33)

let thenProm = resolvedProm.then(value => {
	console.log(
		'this gets called after the end of the main stack. the value received and returned is: ' +
			value
	)
	return value + 1
})
// instantly logging the value of thenProm
console.log(thenProm)

// using setTimeout we can postpone the execution of a function to the moment the stack is empty
setTimeout(() => {
	console.log(thenProm)
}, 1000) */

/* var promise1 = new Promise(function (resolve, reject) {
	setTimeout(function () {
		resolve('foo')
	}, 2000)
})

promise1.then(function (value) {
	console.log(value)
	// expected output: "foo"
})

console.log(promise1) */
// expected output: [object Promise pending]

/* var promise1 = new Promise(function (resolve, reject) {
	resolve(1)
})

var testy = promise1.then(function (value) {
	console.log(value + 1)
	// expected output: "Success!"
	return value + 2
})

console.log(testy)

setTimeout(() => {
	console.log(testy)
}, 2000) */

/* var p1 = new Promise((resolve, reject) => {
	resolve('Success!')
	// or
	// reject(new Error('Errorrrr!'))
})

p1.then(
	value => {
		console.log(value) // Success!
	},
	reason => {
		console.error(reason) // Errorrrr!
	} // equal to .catch(error => console.error(error))
) */

/* const resolvedProm = Promise.resolve('foo')

resolvedProm
	.then(value => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				value += 'bar'
				resolve(value)
			}, 1000) // Wait 1s to resolve
		})
	})
	.then(value => {
		// Then go here
		setTimeout(() => {
			value += 'baz'
			console.log(value)
		}, 1000) // Set timeout does what it does

		return value + 'lololo' // resolves right away, don't care about setTimeout
	})
	.then(value => {
		// go here
		console.log(
			"Last Then:  oops... didn't bother to instantiate and return " +
				'a promise in the prior then so the sequence may be a bit ' +
				'surprising'
		)
		console.log(value)
	}) */

// logs, in order:
// Last Then: oops... didn't bother to instantiate and return a promise in the prior then so the sequence may be a bit surprising
// foobarlololo
// foobarbaz*/

/* var p2 = new Promise((resolve, reject) => {
	resolve(1)
})

p2.then(value => {
	console.log(value) //1 Print this first
	return value + 1
}).then(value => {
	console.log(value + ' - A synchronous value works') // Print this last because it must wait for the previous promise: p2. then() to resolve
})

p2.then(value => {
	console.log(value) //1 Print this second
}) */

/* const resolvedProm = Promise.resolve()

resolvedProm
	.then(() => {
		// Makes .then() return a rejected promise
		throw new Error('oh no!')
	})
	.then(
		() => {
			console.log('Not called') //Not printed because the previous promise return an Error, which is a kind of Reject
		},
		error => {
			//error here is the thing in reject(the thing)
			// this ", error" is equal to .catch(error => {})
			console.error('onRejected function called: ' + error.message)
		}
	) */

/* const rejectedProm = Promise.reject()

rejectedProm
	.then(
		() => 99,
		() => 42
	) // onRejected returns 42 which is wrapped in a resolving Promise
	// if it resolves, takes what is resolved, return 99.
	// In this case, the promise is not resolved
	// Because it is instantly rejected
	// so ", ()" means if it's rejected (in this case there is no rejected value returned)
	// return 42 if it's rejected
	.then(value => console.log('Resolved with ' + value)) // Resolved with 42
// the first then was actually resolved with a value of 42 being returned.
// That's why the second then can use .then(value)
// Can test by changing rejectProm = Promise.resolve()
// It will return 99 as the final result */

/* const resolvedProm = Promise.resolve()

resolvedProm
	.then(() => {
		// Makes .then() return a rejected promise
		throw new Error('oh no!')
	})
	.catch(error => {
		console.error(`onRejected function called: ${error.message}`) // Because the previous then return a reject
		// So we have to use catch()
		return 'This catch returns a promise, and that promise is resolved because I use return()'
	})
	.then(value => {
		console.log(
			`I am always called even if the prior then's (the first then) promise rejects`
		)
		console.log(`Because ${value}`)
	}) */

/* function fetch_current_data() {
	// The fetch() API returns a Promise.  This function
	// exposes a similar API, except the fulfillment
	// value of this function's Promise has had more
	// work done on it.
	return fetch('current_data.json').then(response => {
		if (response.headers.get('content-type') != 'application/json') {
			throw new TypeError()
		}

		var j = response.json()

		//maybe do something with j
		return j // fulfillment value given to user of
		// fetch_current_data().then()
	})
} */

/* function resolveLater(resolve, reject) {
	setTimeout(() => {
		resolve(10)
	}, 1000)
}

function rejectLater(resolve, reject) {
	setTimeout(() => {
		reject(new Error('Error'))
	}, 1000)
}

var p1 = Promise.resolve('foo')
var p2 = p1.then(() => {
	// Return promise here, that will be resolved to 10 after 1 second
	return new Promise(resolveLater)
}) // So p1.then() = p2 is a promise. That promise has "return". It means it is resolved. And the thing it returns is another promise. Like resolve(aPromise)
// In turn, this promise that was returned is a resolved promise, because after 1 second, it resolved (10).
// So finally, because p1.then() returns a resolved promise, what it actually returns is the value of that resolved promise
// which, in this case, is 10

p2.then(
	value => {
		console.log('resolved', value) // "resolved", 10
	},
	error => {
		// not called
		console.error('rejected', error)
	}
)

// SIMILARLY
var p3 = p1.then(function () {
	// Return promise here, that will be rejected with 'Error' after 1 second
	return new Promise(rejectLater)
})

p3.then(value => {
	// not called
	console.log('resolved', value)
}).catch(error => {
	console.error('rejected', error) // "rejected", 'Error'
}) */
