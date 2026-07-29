import {
  OfficialHttpTransactionLab,
  type HttpExperimentModel,
} from "./official-http-transaction-lab";

const model = {
  title: "附录G 语言标记",
  focus: "查证语言标记子标记、ISO代码和IANA注册管理",
  concepts: ["附录G 语言标记"],
  fault: "Content-Type、字符集、Content-Encoding或长度与真实主体不一致",
  evidence:
    "URL、request bytes、response bytes、Via/next hop、timestamp、fault与recovery",
} satisfies HttpExperimentModel;

export function Hdg1AppendixGMessageLab() {
  return <OfficialHttpTransactionLab model={model} mode="message" />;
}

export function Hdg1AppendixGFlowLab() {
  return <OfficialHttpTransactionLab model={model} mode="flow" />;
}

export function Hdg1AppendixGEvidenceLab() {
  return <OfficialHttpTransactionLab model={model} mode="evidence" />;
}
