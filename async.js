/*async function firstAsync() {
    console.log('abc');
    return 27;
}

firstAsync(); // abc
console.log(firstAsync()); // abc and Promise resolved 27
firstAsync().then(value => {
    console.log(value + 1); // 28
});*/

async function firstAsync() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Foo');
    }, 1000);
  });

  // wait until the promise returns us a value
  let result = await promise;

  // 'Foo'
  console.log(result); // 'Foo

  return result + 'bar'; // return 'Foobar'
}

firstAsync(); // 'Foo'
firstAsync().then(value => {
  // 'Foo' first because we call firstAsync()
  console.log(value); // 'Foobar'
});
