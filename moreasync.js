var resolveAfter2Secs = () => {
  console.log('starting slow promise')
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('slow w w')
      console.log('slow promise is done')
    }, 2000)
  })
}

var resolveAfter1Sec = () => {
  console.log('starting fast promise')
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('fast t t')
      console.log('fast promise is done')
    }, 1000)
  })
}

var sequentialStart = async () => {
  console.log('++SEQUENTIAL START')

  // 1. Execution gets here almost instantly
  const slow = await resolveAfter2Secs()
  console.log(slow) // 2. This runs 2 seconds after 1

  const fast = await resolveAfter1Sec()
  console.log(fast) // 3. This run 3 (2+1) seconds after 1
}

var concurrentStart = async () => {
  console.log('++CONCURRENT START WITH ASYNC')
  const slow = resolveAfter2Secs() // Start timer immediately
  const fast = resolveAfter1Sec() // Start timer immediately

  // 1. Execution gets here almost instantly
  console.log(await slow) // 2. This run 2 secs after 1
  console.log(await fast) // 3. This run 2 secs after 1, immediately after 2, since fast is already resolved
}

var concurrentPromise = () => {
  console.log('++CONCURRENT START WITH PROMISE.ALL')
  return Promise.all([resolveAfter2Secs(), resolveAfter1Sec()]).then(
    messages => {
      console.log(messages[0]) // Slow
      console.log(messages[1]) // Fast
    }
  )
}

var parallel = async () => {
  console.log('++PARALLEL WITH AWAIT PROMISE.ALL==')
  // Start 2 "jobs" in parallel and wait for both of them to complete
  await Promise.all([
    (async () => console.log(await resolveAfter2Secs()))(),
    (async () => console.log(await resolveAfter1Sec()))()
  ])
}

var parallel2 = async () => {
  console.log('++PARALLEL WITH AWAIT PROMISE.ALL CACH 2')
  const messages = await Promise.all([resolveAfter2Secs(), resolveAfter1Sec()])
  console.log(messages[0]) // Slow
  console.log(messages[1]) // fast
}

// This function does not handle errors. See warning below!
var parallelPromise = function() {
  console.log('==PARALLEL with Promise.then==')
  resolveAfter2Secs().then(message => console.log(message))
  resolveAfter1Sec().then(message => console.log(message))
}

parallel2()
