const io = require('@pm2/io');
io.init({});

// @ts-ignore
console.log(typeof Bun);
console.log('hello pm2.io');
