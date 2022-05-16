function delegate(obj, method, ...args) {
  /*
  input:
    -the object
    -name of method on the object
    - opt:
      -arguments for the method on the object
  output:
    -returns a function that references the method on the obj

  rules:
    -method maintains execution context of obj it's stored in
    -if property of obj is reassigned to a new method, the
    reference to the new method is still maintained
  */

  // returns `bar` property of obj referenced by `foo`
  return function() {
    obj[method](...args);
  };
}

let foo = {
  name: 'test',
  bar: function(greeting) {
    console.log(greeting + ' ' + this.name);
  },
};

let baz = {
  qux: delegate(foo, 'bar', 'hello'),
};

baz.qux();   // logs 'hello test';

foo.bar = function() { console.log('changed'); };

baz.qux();          // logs 'changed'