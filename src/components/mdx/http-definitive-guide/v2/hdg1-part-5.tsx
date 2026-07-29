import {
  OfficialHttpTransactionLab,
  type HttpExperimentModel,
} from "./official-http-transaction-lab";

const model = {
  title: "第五部分 内容发布与分发",
  focus: "覆盖托管、发布、重定向、负载均衡与日志分发",
  concepts: ["第五部分 内容发布与分发"],
  fault: "Content-Type、字符集、Content-Encoding或长度与真实主体不一致",
  evidence:
    "URL、request bytes、response bytes、Via/next hop、timestamp、fault与recovery",
} satisfies HttpExperimentModel;

export function Hdg1Part5MessageLab() {
  return <OfficialHttpTransactionLab model={model} mode="message" />;
}

export function Hdg1Part5FlowLab() {
  return <OfficialHttpTransactionLab model={model} mode="flow" />;
}

export function Hdg1Part5EvidenceLab() {
  return <OfficialHttpTransactionLab model={model} mode="evidence" />;
}
