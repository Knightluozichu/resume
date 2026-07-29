import {
  OfficialHttpTransactionLab,
  type HttpExperimentModel,
} from "./official-http-transaction-lab";

const model = {
  title: "第21章 日志记录与使用情况跟踪",
  focus: "设计日志内容与格式、代理日志、命中计量和隐私保护",
  concepts: [
    "第21章 日志记录与使用情况跟踪",
    "21.1 记录内容",
    "21.2 日志格式",
    "21.2.1 常见日志格式",
    "21.2.2 组合日志格式",
    "21.2.3 网景扩展日志格式",
    "21.2.4 网景扩展2 日志格式",
    "21.2.5 squid 代理日志格式",
    "21.3 命中率测量",
    "21.3.1 概述",
    "21.3.2 meter 首部",
    "21.4 关于隐私的考虑",
    "21.5 更多信息",
  ],
  fault: "只观察最终页面，没有保存两端原始报文和中间实体状态",
  evidence:
    "URL、request bytes、response bytes、Via/next hop、timestamp、fault与recovery",
} satisfies HttpExperimentModel;

export function Hdg121MessageLab() {
  return <OfficialHttpTransactionLab model={model} mode="message" />;
}

export function Hdg121FlowLab() {
  return <OfficialHttpTransactionLab model={model} mode="flow" />;
}

export function Hdg121EvidenceLab() {
  return <OfficialHttpTransactionLab model={model} mode="evidence" />;
}
