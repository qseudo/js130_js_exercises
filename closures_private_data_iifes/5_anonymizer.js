/* eslint-disable max-lines-per-function */
"use strict";

function makeAccount() {
  let userEmail;
  let userPassword;
  let userFirstName;
  let userLastName;

  function inputPasswordValid(inputPassword) {
    return userPassword === inputPassword;
  }

  function getRandomAlphaNumericChar() {
    const ALPHA_NUMERIC_CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomIndex = Math.floor(Math.random() * ALPHA_NUMERIC_CHARS.length);
    return ALPHA_NUMERIC_CHARS[randomIndex];
  }

  function anonymize() {
    const SEQUENCE_LENGTH = 16;
    let sequence = '';

    for (let idx = 0; idx < SEQUENCE_LENGTH; idx += 1) {
      sequence += getRandomAlphaNumericChar();
    }

    return sequence;
  }

  return {
    init(email, password, firstName, lastName) {
      userEmail = email;
      userPassword = password;
      userFirstName = firstName;
      userLastName = lastName;
      this.displayName = anonymize();
      return this;
    },

    reanonymize(password) {
      if (inputPasswordValid(password)) {
        this.displayName = anonymize();
        return true;
      } else {
        return 'Invalid Password';
      }
    },

    resetPassword(inputPassword, newPassword) {
      if (inputPasswordValid(inputPassword)) {
        userPassword = newPassword;
        return true;
      } else {
        return 'Invalid Password';
      }
    },

    firstName(password) {
      if (inputPasswordValid(password)) {
        return userFirstName;
      } else {
        return 'Invalid Password';
      }
    },

    lastName(password) {
      if (inputPasswordValid(password)) {
        return userLastName;
      } else {
        return 'Invalid Password';
      }
    },

    email(password) {
      if (inputPasswordValid(password)) {
        return userEmail;
      } else {
        return 'Invalid Password';
      }
    },

    displayName() {
      return this.displayName;
    }
  };
}

let fooBar = Object.create(makeAccount()).init('foo@bar.com', '123456', 'foo', 'bar');
console.log(fooBar.firstName);                      // returns the firstName function
console.log(fooBar.email);                          // returns the email function
console.log(fooBar.firstName('123456'));            // logs 'foo'
console.log(fooBar.firstName('abc'));               // logs 'Invalid Password'
console.log(fooBar.displayName);                    // logs 16 character sequence
console.log(fooBar.resetPassword('123', 'abc'));    // logs 'Invalid Password'
console.log(fooBar.resetPassword('123456', 'abc')); // logs true

let displayName = fooBar.displayName;
fooBar.reanonymize('abc');                          // returns true
console.log(displayName === fooBar.displayName);    // logs false

let bazQux = Object.create(makeAccount()).init('baz@qux.com', '123456', 'baz', 'qux');
console.log(fooBar.firstName('abc'));               // logs 'Invalid Password'
console.log(fooBar.email('abc'));                   // logs 'Invalid Password'
