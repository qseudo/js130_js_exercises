function newStack() {
  /*
    input: n/a
    output: stack object with 3 methods: push, pop, printStack
      -push appends a value to stack
      -pop removes and returns last element from stack

      -printStack logs each remaining element of stack on
      its own line, starting with oldest item added to stack,
      ending with newest item added to stack.

    rules:
      -use an array to implement stack
      -array cannot be accessible from outside the methods
  */

  const stack = [];
  return {
    push(item) {
      stack.push(item);
    },

    pop() {
      return stack.pop();
    },

    printStack() {
      stack.forEach(item => console.log(item));
    }
  };
}