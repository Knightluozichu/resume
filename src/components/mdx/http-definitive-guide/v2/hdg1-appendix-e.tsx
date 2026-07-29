import {
  OfficialHttpTransactionLab,
  type HttpExperimentModel,
} from "./official-http-transaction-lab";

const model = {
  title: "附录E base-64 编码",
  focus: "理解Base64从8位到6位分组、字母表、填充和安全用途边界",
  concepts: ["附录E base-64 编码"],
  fault: "Content-Type、字符集、Content-Encoding或长度与真实主体不一致",
  evidence:
    "URL、request bytes、response bytes、Via/next hop、timestamp、fault与recovery",
} satisfies HttpExperimentModel;

export function Hdg1AppendixEMessageLab() {
  return <OfficialHttpTransactionLab model={model} mode="message" />;
}

export function Hdg1AppendixEFlowLab() {
  return <OfficialHttpTransactionLab model={model} mode="flow" />;
}

export function Hdg1AppendixEEvidenceLab() {
  return <OfficialHttpTransactionLab model={model} mode="evidence" />;
}
