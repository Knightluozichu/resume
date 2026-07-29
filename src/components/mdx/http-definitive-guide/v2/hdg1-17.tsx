import {
  OfficialHttpTransactionLab,
  type HttpExperimentModel,
} from "./official-http-transaction-lab";

const model = {
  title: "第17章 内容协商与转码",
  focus: "比较客户端驱动、服务器驱动、透明协商以及Vary与转码",
  concepts: [
    "第17章 内容协商与转码",
    "17.1 内容协商技术",
    "17.2 客户端驱动的协商",
    "17.3 服务器驱动的协商",
    "17.3.1 内容协商首部集",
    "17.3.2 内容协商首部中的质量值",
    "17.3.3 随其他首部集而变化",
    "17.3.4 apache 中的内容协商",
    "17.3.5 服务器端扩展",
    "17.4 透明协商",
    "17.4.1 进行缓存与备用候选",
    "17.4.2 vary 首部",
    "17.5 转码",
    "17.5.1 格式转换",
    "17.5.2 信息综合",
    "17.5.3 内容注入",
    "17.5.4 转码与静态预生成的对比",
    "17.6 下一步计划",
    "17.7 更多信息",
  ],
  fault: "Content-Type、字符集、Content-Encoding或长度与真实主体不一致",
  evidence:
    "URL、request bytes、response bytes、Via/next hop、timestamp、fault与recovery",
} satisfies HttpExperimentModel;

export function Hdg117MessageLab() {
  return <OfficialHttpTransactionLab model={model} mode="message" />;
}

export function Hdg117FlowLab() {
  return <OfficialHttpTransactionLab model={model} mode="flow" />;
}

export function Hdg117EvidenceLab() {
  return <OfficialHttpTransactionLab model={model} mode="evidence" />;
}
