import * as z from "zod";
import { createAgent, tool } from "langchain";
import { ChatOpenAI } from "@langchain/openai";
import DotenvFlow from "dotenv-flow";
DotenvFlow.config();

// WMO 天气码 → 中文描述（Open-Meteo current_weather 字段）
const wmoDesc = {
  0: "晴朗",
  1: "少云",
  2: "多云",
  3: "阴",
  45: "雾",
  48: "�雾",
  51: "毛毛雨（轻）",
  53: "毛毛雨（中）",
  55: "毛毛雨（密）",
  56: "冻毛毛雨（轻）",
  57: "冻毛毛雨（密）",
  61: "小雨",
  63: "中雨",
  65: "大雨",
  66: "冻雨（轻）",
  67: "冻雨（重）",
  71: "小雪",
  73: "中雪",
  75: "大雪",
  77: "米雪",
  80: "阵雨（轻）",
  81: "阵雨（中）",
  82: "阵雨（强）",
  85: "阵雪（轻）",
  86: "阵雪（强）",
  95: "雷暴",
  96: "雷暴伴小冰雹",
  99: "雷暴伴大冰雹",
};

// 定义工具（调用 Open-Meteo：先 geocoding 拿经纬度，再 current_weather）
const getWeather = tool(
  async ({ city }) => {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&language=zh&countryCode=CN&count=1`;
    let geoData;
    try {
      const r = await fetch(geoUrl);
      if (!r.ok) throw new Error(`geocoding HTTP ${r.status}`);
      geoData = await r.json();
    } catch (err) {
      return `天气查询失败：${err.message}`;
    }
    if (!geoData.results?.length) {
      return `未找到城市："${city}"。请用中文名（如 北京、上海、朝阳）。`;
    }
    const { latitude, longitude, name, admin2, country } = geoData.results[0];

    const wxUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=Asia/Shanghai`;
    let wxData;
    try {
      const r = await fetch(wxUrl);
      if (!r.ok) throw new Error(`forecast HTTP ${r.status}`);
      wxData = await r.json();
    } catch (err) {
      return `天气查询失败：${err.message}`;
    }
    const w = wxData.current_weather;
    const desc = wmoDesc[w.weathercode] ?? `未知（code ${w.weathercode}）`;
    return `${name}（${country} ${admin2}）当前天气：${desc}，温度 ${w.temperature}°C，风速 ${w.windspeed} km/h。数据时间 ${w.time}。`;
  },
  {
    name: "get_weather",
    description: "获取指定城市的实时天气（数据来自 Open-Meteo，无需 API key）",
    schema: z.object({
      city: z.string(),
    }),
  },
);

// 使用 ChatOpenAI 接入 MiniMax 兼容接口
const model = new ChatOpenAI({
  model: "MiniMax-M3",                  // 模型名称
  apiKey: process.env.MINIMAX_API_KEY,       // 替换为你的 API Key
  configuration: {
    baseURL: "https://api.minimax.chat/v1", // MiniMax OpenAI 兼容端点
  },
  temperature: 0.7,                     // 可选，MiniMax 温度范围 (0,1]
});

// 创建 Agent（现在模型支持 bindTools）
const agent = createAgent({
  model: model,
  tools: [getWeather],
  systemPrompt: "你是一位专家天气预报员+搞笑播音主持，使用中文回答问题。",
});

const data = await agent.invoke({
  messages: [{ role: "user", content: "中山天气如何？" }],
})
/**
 * @type {AIMessage}
 */
const message = data.messages.at(-1);
console.log((message.content).replace(/<think>[\s\S]*?<\/think>/g, '').trim());
