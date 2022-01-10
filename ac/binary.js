/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
 var addBinary = function(a, b) {
    
    let i = a.length - 1, j = b.length - 1, carry = 0, result = [];
    while(i >= 0 || j >= 0) {
        let n1 = +a[i] || 0;
        let n2 = +b[j] || 0;
        let sum = n1 + n2 + carry;
        if(sum === 0) {
          result.unshift(0);
          carry = 0;
        } else if(sum === 1) {
          result.unshift(1);
           carry = 0;
        } else if(sum === 2) {
          result.unshift(0);
          carry = 1;
        } else if(sum === 3) {
          result.unshift(1);
          carry = 1;
        }
        i--;
        j--; 
    }
      if(carry) {
        result.unshift(1);
      }
      return result.join("");
    
};