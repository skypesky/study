const axios = require('axios');

// 单次HEAD请求函数
async function singleHeadRequest(url, locale = 'zh') {
  const startTime = Date.now();
  
  try {
    const { headers } = await axios.head(url, {
      timeout: 1000 * 120,
      headers: {
        'x-locale': locale,
      },
    });
    
    const endTime = Date.now();
    const timeSpent = endTime - startTime;
    
    return {
      success: true,
      timeSpent,
      headers
    };
  } catch (error) {
    const endTime = Date.now();
    const timeSpent = endTime - startTime;
    
    return {
      success: false,
      timeSpent,
      error: error.message,
      status: error.response?.status,
      headers: error.response?.headers
    };
  }
}

// 控制并发请求的函数
async function batchRequest(url, requestsPerSecond = 100, durationSeconds = 1) {
  const totalRequests = requestsPerSecond * durationSeconds;
  const results = [];
  const batchSize = Math.min(100, requestsPerSecond); // 每批次最多100个并发请求
  const batches = Math.ceil(totalRequests / batchSize);
  const delayBetweenBatches = 1000 / (totalRequests / batchSize); // 批次间延迟，保证每秒请求量
  
  console.log(`开始执行测试: 每秒${requestsPerSecond}次请求，持续${durationSeconds}秒，总共${totalRequests}次请求`);
  console.log(`分为${batches}批，每批${batchSize}个请求，批次间延迟${delayBetweenBatches.toFixed(2)}毫秒`);
  
  const globalStartTime = Date.now();
  
  for (let batch = 0; batch < batches; batch++) {
    const batchStartTime = Date.now();
    
    const requests = [];
    const currentBatchSize = Math.min(batchSize, totalRequests - batch * batchSize);
    
    for (let i = 0; i < currentBatchSize; i++) {
      requests.push(singleHeadRequest(url));
    }
    
    console.log(`批次 ${batch + 1}/${batches} 开始: ${currentBatchSize}个请求`);
    const batchResults = await Promise.all(requests);
    results.push(...batchResults);
    
    const batchEndTime = Date.now();
    const batchTimeSpent = batchEndTime - batchStartTime;
    console.log(`批次 ${batch + 1}/${batches} 完成: 耗时${batchTimeSpent}毫秒`);
    
    // 控制发送速率
    if (batch < batches - 1) {
      const waitTime = Math.max(0, delayBetweenBatches - batchTimeSpent);
      if (waitTime > 0) {
        console.log(`等待${waitTime.toFixed(2)}毫秒以保持请求速率...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }
  
  const globalEndTime = Date.now();
  const actualDuration = (globalEndTime - globalStartTime) / 1000;
  const actualRate = results.length / actualDuration;
  
  // 统计结果
  const successResults = results.filter(r => r.success);
  const failedResults = results.filter(r => !r.success);
  
  const times = successResults.map(r => r.timeSpent);
  const avgTime = times.length ? times.reduce((a, b) => a + b, 0) / times.length : 0;
  const minTime = times.length ? Math.min(...times) : 0;
  const maxTime = times.length ? Math.max(...times) : 0;
  
  console.log('\n==== 测试结果 ====');
  console.log(`总请求数: ${results.length}`);
  console.log(`成功请求: ${successResults.length}`);
  console.log(`失败请求: ${failedResults.length}`);
  console.log(`实际持续时间: ${actualDuration.toFixed(2)}秒`);
  console.log(`实际请求速率: ${actualRate.toFixed(2)}次/秒`);
  console.log('\n==== 响应时间统计 ====');
  console.log(`平均响应时间: ${avgTime.toFixed(2)}毫秒`);
  console.log(`最小响应时间: ${minTime}毫秒`);
  console.log(`最大响应时间: ${maxTime}毫秒`);
  
  if (failedResults.length > 0) {
    console.log('\n==== 错误统计 ====');
    const errorCounts = {};
    failedResults.forEach(result => {
      const errorKey = `${result.status || 'unknown'}: ${result.error}`;
      errorCounts[errorKey] = (errorCounts[errorKey] || 0) + 1;
    });
    
    Object.entries(errorCounts).forEach(([error, count]) => {
      console.log(`${error}: ${count}次`);
    });
  }
  
  return {
    total: results.length,
    success: successResults.length,
    failed: failedResults.length,
    avgTime,
    minTime,
    maxTime,
    actualDuration,
    actualRate
  };
}

// 主函数
async function sendHeadRequest() {
  const url = 'https://space.team.arcblock.io/app/api/space/zNKnMUtbZQ79jRhqUDZLXRMDnRyK372gDV9y/app/zNKgJ1SYxCLPLDgxCcd6Tgks74Za2oAJtSfW/object/?withExtras=true&test=2';
  
  // 每秒发送100次请求，持续1秒（总共100次）
  // 你可以调整这两个参数来改变测试强度
  const requestsPerSecond = 200;
  const durationSeconds = 1;
  
  try {
    await batchRequest(url, requestsPerSecond, durationSeconds);
    console.log('所有请求已完成');
  } catch (error) {
    console.error('测试执行失败:', error.message);
  }
}

// 执行请求
sendHeadRequest()
  .then(() => console.log('测试结束'))
  .catch(() => console.log('测试出错'));
