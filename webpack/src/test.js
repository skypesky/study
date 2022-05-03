/**
 * @param {number} n
 * @return {number}
 */
var numberOfMatches = function (n) {
    let sum = 0;
    while (n !== 1) {
        if (n % 2) {
            n /= 2;
        } else {
            n = (n - 1) / 2 + 1;
        }
        sum += n;
    }
    return sum;
};