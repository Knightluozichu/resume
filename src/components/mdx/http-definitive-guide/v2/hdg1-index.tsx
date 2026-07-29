import {
  OfficialHttpTransactionLab,
  type HttpExperimentModel,
} from "./official-http-transaction-lab";

const model = {
  title: "索引",
  focus:
    "把协议名、首部、状态码、认证、缓存、代理、编码和发布术语反向定位到原书页与正式节点",
  concepts: ["索引"],
  fault: "只观察最终页面，没有保存两端原始报文和中间实体状态",
  evidence:
    "URL、request bytes、response bytes、Via/next hop、timestamp、fault与recovery",
} satisfies HttpExperimentModel;

export function Hdg1IndexMessageLab() {
  return <OfficialHttpTransactionLab model={model} mode="message" />;
}

export function Hdg1IndexFlowLab() {
  return <OfficialHttpTransactionLab model={model} mode="flow" />;
}

export function Hdg1IndexEvidenceLab() {
  return <OfficialHttpTransactionLab model={model} mode="evidence" />;
}
