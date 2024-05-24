const assert = require('assert');
const { add } = require('../server');  // Import the function from server.js

assert.strictEqual(add(1, 2), 3, '1 + 2 should equal 3');