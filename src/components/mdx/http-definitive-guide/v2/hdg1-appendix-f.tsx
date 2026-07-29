import {
  OfficialHttpTransactionLab,
  type HttpExperimentModel,
} from "./official-http-transaction-lab";

const model = {
  title: "附录F 摘要认证",
  focus: "查证摘要认证的质询、授权、Authentication-Info指令和参考计算",
  concepts: ["附录F 摘要认证"],
  fault: "身份、realm、cookie作用域或证书主体没有绑定到当前请求",
  evidence:
    "request target、realm/origin、credentials、Set-Cookie/Cookie、TLS identity与status",
} satisfies HttpExperimentModel;

export function Hdg1AppendixFMessageLab() {
  return <OfficialHttpTransactionLab model={model} mode="message" />;
}

export function Hdg1AppendixFFlowLab() {
  return <OfficialHttpTransactionLab model={model} mode="flow" />;
}

export function Hdg1AppendixFEvidenceLab() {
  return <OfficialHttpTransactionLab model={model} mode="evidence" />;
}
