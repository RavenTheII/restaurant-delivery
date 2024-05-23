const { add } = require('../src/backend'); // Import the backend function to test
const assert = require('assert');

describe('Backend', function() {
  describe('add', function() {
    it('should return the sum of two numbers', function() {
      const result = add(2, 3);
      assert.strictEqual(result, 5);
    });

    it('should handle negative numbers', function() {
      const result = add(-5, 3);
      assert.strictEqual(result, -2);
    });

    it('should handle zero', function() {
      const result = add(0, 0);
      assert.strictEqual(result, 0);
    });
  });
});
