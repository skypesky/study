const { mkdir } = require('node:fs/promises');


process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
  process.exit(1);
});

async function hello() {
  i = 100;
  while(i > 0) {
    i--;
    console.log('debug233', i);
  }
  await mkdir('/Users/skypesky/workSpaces/javascript/github/temp', { recursive: true });
  await mkdir('/Users/skypesky/workSpaces/javascript/github/temp/a/b/c/d', { recursive: true });
}

(async () => {
  await hello();
})();
