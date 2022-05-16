function myBind(func, ctx) {
  let partialArgs = [].slice.call(arguments, 2);

  return function() {
    let remainingArgs = [].slice.call(arguments);
    let fullArgs = partialArgs.concat(remainingArgs);

    return func.apply(ctx, fullArgs);
  };
}

function addNumbers(a, b) {
  return a + b;
}

let addFive = myBind(addNumbers, null, 5);
/*
  partialArgs = [5]

  function() {
    let remainingArgs = [].slice.call(arguments);
    let fullArgs = partialArgs.concat(remainingArgs);

    return func.apply(ctx, fullArgs);
  }
*/

console.log(addFive(10)); // 15