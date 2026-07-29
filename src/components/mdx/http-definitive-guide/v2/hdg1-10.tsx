import {
  OfficialHttpTransactionLab,
  type HttpExperimentModel,
} from "./official-http-transaction-lab";

const model = {
  title: "第10章 http-ng",
  focus:
    "在历史语境中理解HTTP-NG的模块化、分布式对象、三层架构、WebMUX和二进制协议",
  concepts: [
    "第10章 http-ng",
    "10.1 http 发展中存在的问题",
    "10.2 http-ng 的活动",
    "10.3 模块化及功能增强",
    "10.4 分布式对象",
    "10.5 第一层——报文传输",
    "10.6 第二层——远程调用",
    "10.7 第三层——web 应用",
    "10.8 webmux",
    "10.9 二进制连接协议",
    "10.10 当前的状态",
    "10.11 更多信息",
  ],
  fault: "主体边界或连接关闭条件错误，使下一条报文从错误字节开始解析",
  evidence:
    "URL、request bytes、response bytes、Via/next hop、timestamp、fault与recovery",
} satisfies HttpExperimentModel;

export function Hdg110MessageLab() {
  return <OfficialHttpTransactionLab model={model} mode="message" />;
}

export function Hdg110FlowLab() {
  return <OfficialHttpTransactionLab model={model} mode="flow" />;
}

export function Hdg110EvidenceLab() {
  return <OfficialHttpTransactionLab model={model} mode="evidence" />;
}
