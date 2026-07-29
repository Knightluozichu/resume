import {
  OfficialHttpTransactionLab,
  type HttpExperimentModel,
} from "./official-http-transaction-lab";

const model = {
  title: "第一部分 http：web 的基础",
  focus: "用资源、URL、报文和连接奠定HTTP与Web基础",
  concepts: ["第一部分 http：web 的基础"],
  fault: "只观察最终页面，没有保存两端原始报文和中间实体状态",
  evidence:
    "URL、request bytes、response bytes、Via/next hop、timestamp、fault与recovery",
} satisfies HttpExperimentModel;

export function Hdg1Part1MessageLab() {
  return <OfficialHttpTransactionLab model={model} mode="message" />;
}

export function Hdg1Part1FlowLab() {
  return <OfficialHttpTransactionLab model={model} mode="flow" />;
}

export function Hdg1Part1EvidenceLab() {
  return <OfficialHttpTransactionLab model={model} mode="evidence" />;
}
