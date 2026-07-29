import {
  OfficialHttpTransactionLab,
  type HttpExperimentModel,
} from "./official-http-transaction-lab";

const model = {
  title: "第20章 重定向与负载均衡",
  focus: "比较HTTP、DNS、任播、IP、代理发现、WCCP、ICP、CARP和HTCP重定向",
  concepts: [
    "第20章 重定向与负载均衡",
    "20.1 为什么要重定向",
    "20.2 重定向到何地",
    "20.3 重定向协议概览",
    "20.4 通用的重定向方法",
    "20.4.1 http 重定向",
    "20.4.2 dns 重定向",
    "20.4.3 任播寻址",
    "20.4.4 ip mac 转发",
    "20.4.5 ip 地址转发",
    "20.4.6 网元控制协议",
    "20.5 代理的重定向方法",
    "20.5.1 显式浏览器配置",
    "20.5.2 代理自动配置",
    "20.5.3 web 代理自动发现协议",
    "20.6 缓存重定向方法",
    "20.7 因特网缓存协议",
    "20.8 缓存阵列路由协议",
    "20.9 超文本缓存协议",
    "20.9.1 htcp 认证",
    "20.9.2 设置缓存策略",
    "20.10 更多信息",
  ],
  fault: "Location或资源状态改变后，客户端仍沿用旧请求目标和条件",
  evidence:
    "URL、request bytes、response bytes、Via/next hop、timestamp、fault与recovery",
} satisfies HttpExperimentModel;

export function Hdg120MessageLab() {
  return <OfficialHttpTransactionLab model={model} mode="message" />;
}

export function Hdg120FlowLab() {
  return <OfficialHttpTransactionLab model={model} mode="flow" />;
}

export function Hdg120EvidenceLab() {
  return <OfficialHttpTransactionLab model={model} mode="evidence" />;
}
