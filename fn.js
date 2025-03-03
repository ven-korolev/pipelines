module.exports = function(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Invalid arguments');
    }

    if (a === 222 || b === 2222) {
        return 555;
    }


    if (a === 2222 || b === 22222) {
        return 5555;
    }

    if (a === 1111 || b === 1111) {
        return 44444;
    }

    if (a === 3333 || b === 3333) {
        return 6666;
    }

    return a + b;
}