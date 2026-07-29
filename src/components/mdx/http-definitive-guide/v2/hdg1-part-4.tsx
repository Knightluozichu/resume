import {
  OfficialHttpTransactionLab,
  type HttpExperimentModel,
} from "./official-http-transaction-lab";

const model = {
  title: "第四部分 实体、编码和国际化",
  focus: "掌握实体边界、编码、国际化和内容协商",
  concepts: ["第四部分 实体、编码和国际化"],
  fault: "Content-Type、字符集、Content-Encoding或长度与真实主体不一致",
  evidence:
    "URL、request bytes、response bytes、Via/next hop、timestamp、fault与recovery",
} satisfies HttpExperimentModel;

export function Hdg1Part4MessageLab() {
  return <OfficialHttpTransactionLab model={model} mode="message" />;
}

export function Hdg1Part4FlowLab() {
  return <OfficialHttpTransactionLab model={model} mode="flow" />;
}

export function Hdg1Part4EvidenceLab() {
  return <OfficialHttpTransactionLab model={model} mode="evidence" />;
}
