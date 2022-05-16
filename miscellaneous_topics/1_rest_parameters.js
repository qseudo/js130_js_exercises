// refactor code so we don't need to use arguments
// function invocation cannot be changed

function sum(...args) {
  let values = args;

  return values.reduce(function(a, b) {
    return a + b;
  });
}

console.log(sum(1, 4, 5, 6)); // 16