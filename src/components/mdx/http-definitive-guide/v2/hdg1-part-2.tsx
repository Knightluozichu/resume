import {
  OfficialHttpTransactionLab,
  type HttpExperimentModel,
} from "./official-http-transaction-lab";

const model = {
  title: "第二部分 http 结构",
  focus: "理解服务器、代理、缓存、网关、机器人与HTTP-NG等Web结构",
  concepts: ["第二部分 http 结构"],
  fault: "只观察最终页面，没有保存两端原始报文和中间实体状态",
  evidence:
    "URL、request bytes、response bytes、Via/next hop、timestamp、fault与recovery",
} satisfies HttpExperimentModel;

export function Hdg1Part2MessageLab() {
  return <OfficialHttpTransactionLab model={model} mode="message" />;
}

export function Hdg1Part2FlowLab() {
  return <OfficialHttpTransactionLab model={model} mode="flow" />;
}

export function Hdg1Part2EvidenceLab() {
  return <OfficialHttpTransactionLab model={model} mode="evidence" />;
}
