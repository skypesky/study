const express = require('express');
const app = express();
const port = 3000;
const v8 = require('v8');

// 全局变量存储请求数据 - 这会导致内存泄露
let idx = 1;
class MyMap extends Map {

}
const testMap = new MyMap(); // 这个 Map 会持续增长，从不清理

// 中间件：为每个请求分配 ID 并存储到全局 Map 中
app.use((req, res, next) => {
  req.id = idx++;
  // 故意不清理，导致内存泄露
  testMap.set(req.id, {
    id: req.id,
    url: req.url,
    method: req.method,
    timestamp: Date.now()
  });
  next();
});

// 路由：返回请求 ID
app.get('/', (req, res) => {
  res.send(`Hello World ${req.id}`);
});

// 内存快照端点
app.get('/memory', (req, res) => {
  v8.writeHeapSnapshot();
  return res.send({message: 'ok'});
});

// 启动服务器
app.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}`);
  console.log(`Get memory snapshot: http://localhost:${port}/memory`);
});

// 定期输出内存使用情况
setInterval(() => {
  const memUsage = process.memoryUsage();
  console.log(`Map size: ${testMap.size}, Memory: ${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`);
}, 1000);
