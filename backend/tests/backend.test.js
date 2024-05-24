const assert = require('assert');
const { print } = require('../server.js');  // Import the print function

assert.strictEqual(typeof print, 'function', 'print should be a function');
print();  // Call the print function
