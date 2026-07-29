import {
  OfficialHttpTransactionLab,
  type HttpExperimentModel,
} from "./official-http-transaction-lab";

const model = {
  title: "第12章 基本认证机制",
  focus: "掌握HTTP质询响应框架、安全域、Basic与代理认证及其缺陷",
  concepts: [
    "第12章 基本认证机制",
    "12.1 认证",
    "12.1.1 http 的质询/ 响应认证框架",
    "12.1.2 认证协议与首部",
    "12.1.3 安全域",
    "12.2 基本认证",
    "12.2.1 基本认证实例",
    "12.2.2 base-64 用户名/ 密码编码",
    "12.2.3 代理认证",
    "12.3 基本认证的安全缺陷",
    "12.4 更多信息",
  ],
  fault: "身份、realm、cookie作用域或证书主体没有绑定到当前请求",
  evidence:
    "request target、realm/origin、credentials、Set-Cookie/Cookie、TLS identity与status",
} satisfies HttpExperimentModel;

export function Hdg112MessageLab() {
  return <OfficialHttpTransactionLab model={model} mode="message" />;
}

export function Hdg112FlowLab() {
  return <OfficialHttpTransactionLab model={model} mode="flow" />;
}

export function Hdg112EvidenceLab() {
  return <OfficialHttpTransactionLab model={model} mode="evidence" />;
}
