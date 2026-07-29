import {
  OfficialHttpTransactionLab,
  type HttpExperimentModel,
} from "./official-http-transaction-lab";

const model = {
  title: "附录H mime 字符集注册表",
  focus: "查证MIME字符集注册表、首选名称和已注册字符集",
  concepts: ["附录H mime 字符集注册表"],
  fault: "Content-Type、字符集、Content-Encoding或长度与真实主体不一致",
  evidence:
    "URL、request bytes、response bytes、Via/next hop、timestamp、fault与recovery",
} satisfies HttpExperimentModel;

export function Hdg1AppendixHMessageLab() {
  return <OfficialHttpTransactionLab model={model} mode="message" />;
}

export function Hdg1AppendixHFlowLab() {
  return <OfficialHttpTransactionLab model={model} mode="flow" />;
}

export function Hdg1AppendixHEvidenceLab() {
  return <OfficialHttpTransactionLab model={model} mode="evidence" />;
}
