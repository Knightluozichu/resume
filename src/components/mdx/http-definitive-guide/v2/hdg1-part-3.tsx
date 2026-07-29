import {
  OfficialHttpTransactionLab,
  type HttpExperimentModel,
} from "./official-http-transaction-lab";

const model = {
  title: "第三部分 识别、认证与安全",
  focus: "建立客户端识别、Cookie、Basic、Digest与安全HTTP的身份链",
  concepts: ["第三部分 识别、认证与安全"],
  fault: "身份、realm、cookie作用域或证书主体没有绑定到当前请求",
  evidence:
    "request target、realm/origin、credentials、Set-Cookie/Cookie、TLS identity与status",
} satisfies HttpExperimentModel;

export function Hdg1Part3MessageLab() {
  return <OfficialHttpTransactionLab model={model} mode="message" />;
}

export function Hdg1Part3FlowLab() {
  return <OfficialHttpTransactionLab model={model} mode="flow" />;
}

export function Hdg1Part3EvidenceLab() {
  return <OfficialHttpTransactionLab model={model} mode="evidence" />;
}
