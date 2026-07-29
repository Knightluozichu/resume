import {
  OfficialHttpTransactionLab,
  type HttpExperimentModel,
} from "./official-http-transaction-lab";

const model = {
  title: "附录B http 状态码",
  focus: "按类别查证HTTP状态码、适用方法、响应主体和缓存语义",
  concepts: ["附录B http 状态码"],
  fault: "只观察最终页面，没有保存两端原始报文和中间实体状态",
  evidence:
    "URL、request bytes、response bytes、Via/next hop、timestamp、fault与recovery",
} satisfies HttpExperimentModel;

export function Hdg1AppendixBMessageLab() {
  return <OfficialHttpTransactionLab model={model} mode="message" />;
}

export function Hdg1AppendixBFlowLab() {
  return <OfficialHttpTransactionLab model={model} mode="flow" />;
}

export function Hdg1AppendixBEvidenceLab() {
  return <OfficialHttpTransactionLab model={model} mode="evidence" />;
}
