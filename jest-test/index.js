const { default: axios } = require("axios");
const fs = require("fs-extra");
const util = require("util");
const stream = require("stream");
const pipeline = util.promisify(stream.pipeline);

// axios.defaults.proxy = {
//   host: "127.0.0.1",
//   port: 7890,
// };
// console.log({ proxy: process.env.http_proxy });

async function downloadUseArrayBuffer(url, fileName) {
  console.time(`${fileName} download`);

  const response = await axios({
    baseURL: new URL(url).origin,
    url,
    method: "GET",
    responseType: "arraybuffer",
    timeout: 1000 * 10000,
  });

  fs.ensureDirSync("dist");
  fs.writeFileSync(`dist/${fileName}.tgz`, response.data);

  console.timeEnd(`${fileName} download`);
}

// https://test.store.blocklet.dev/api/blocklets/z8ia1WEiBZ7hxURf6LwH21Wpg99vophFwSJdu/did-comments-0.3.0.tgz
// https://store.blocklet.dev/api/blocklets/z8iZqkCjLP6TZpR12tT3jESWxB8SGzNsx8nZa/nft-store-0.6.12.tgz

async function download(url, fileName) {
  console.time(`${fileName} download`);

  const response = await axios({
    baseURL: new URL(url).origin,
    url,
    method: "GET",
    responseType: "stream",
    timeout: 1000 * 10000,
  });

  fs.ensureDirSync("dist");
  await pipeline(
    response.data,
    fs.createWriteStream(`dist/${fileName}.tgz`),
    {}
  );
  console.timeEnd(`${fileName} download`);
}

(async () => {
  // await download(
  //   `https://031b02ed-znkolau1otfhxq5jqpuzx9oskuxujgjypvmi.did.abtnet.io/api/blocklets/z8iZurgRS8uMtyGqKxUSjqkD83XAXd8yBudve/test-for-ios-0.1.11.tgz`,
  //   "local store free blocklet"
  // ),
  // await download(
  //   `https://dev.store.blocklet.dev/api/blocklets/z8iZwR8kvUuU8VJLzPyXtTR3ekLQDP5EmUMve/nft-factory-demo-0.7.2.tgz`,
  //   `dev store NFT Factory Demo`
  // );
  // await download(
  //   `https://store.blocklet.dev/api/blocklets/z8iZqkCjLP6TZpR12tT3jESWxB8SGzNsx8nZa/nft-store-0.6.12.tgz`,
  //   "prd store nft-store"
  // );

  // await download(
  //   `https://031b02ed-znkolau1otfhxq5jqpuzx9oskuxujgjypvmi.did.abtnet.io/api/blocklets/z8iZhfAjot5PaDA7fFZ3vQW8nRgNwoaHtD8er/express-test-for-pc-0.1.47.tgz`,
  //   "local store express"
  // );

  await download(
    `https://test.store.blocklet.dev/api/blocklets/z8ia1WEiBZ7hxURf6LwH21Wpg99vophFwSJdu/did-comments-0.3.0.tgz`,
    "test store vote"
  ).catch(console.error);

  await download(
    `https://test.store.blocklet.dev/api/blocklets/z8iZqkCjLP6TZpR12tT3jESWxB8SGzNsx8nZa/nft-store-0.6.12.tgz`,
    "test store nft-store"
  ).catch(console.error);
})();
