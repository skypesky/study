import * as z from "zod";
import { AIMessage, createAgent, tool } from "langchain";
import { ChatOpenAI } from "@langchain/openai";
import DotenvFlow from "dotenv-flow";
DotenvFlow.config();

// 定义工具（不变）
const getWeather = tool(
  ({ city }) => `${city} 天气总是晴朗！`,
  {
    name: "get_weather",
    description: "获取指定城市的天气",
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
  systemPrompt: "你是一位擅长用文言文表达的专家天气预报员，使用中文回答问题。",
});

const data = await agent.invoke({
  messages: [{ role: "user", content: "东京天气如何？" }],
})
const message = data.messages.at(-1) as AIMessage
console.log((message.content as string).replace(/<think>[\s\S]*?<\/think>/g, '').trim());
