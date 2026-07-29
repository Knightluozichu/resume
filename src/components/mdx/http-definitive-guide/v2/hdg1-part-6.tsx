import {
  OfficialHttpTransactionLab,
  type HttpExperimentModel,
} from "./official-http-transaction-lab";

const model = {
  title: "第六部分 附 录",
  focus: "使用URI、状态码、首部、MIME、Base64、摘要和字符集参考附录",
  concepts: ["第六部分 附 录"],
  fault: "只观察最终页面，没有保存两端原始报文和中间实体状态",
  evidence:
    "URL、request bytes、response bytes、Via/next hop、timestamp、fault与recovery",
} satisfies HttpExperimentModel;

export function Hdg1Part6MessageLab() {
  return <OfficialHttpTransactionLab model={model} mode="message" />;
}

export function Hdg1Part6FlowLab() {
  return <OfficialHttpTransactionLab model={model} mode="flow" />;
}

export function Hdg1Part6EvidenceLab() {
  return <OfficialHttpTransactionLab model={model} mode="evidence" />;
}
