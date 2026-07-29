import {
  OfficialHttpTransactionLab,
  type HttpExperimentModel,
} from "./official-http-transaction-lab";

const model = {
  title: "第8章 集成点：网关、隧道及中继",
  focus: "区分网关、资源网关、应用接口、CONNECT隧道、SSL隧道和中继",
  concepts: [
    "第8章 集成点：网关、隧道及中继",
    "8.1 网关",
    "8.2 协议网关",
    "8.2.1 http/*：服务器端web 网关",
    "8.2.2 http/https：服务器端安全网关",
    "8.2.3 https/http 客户端安全加速器网关",
    "8.3 资源网关",
    "8.3.1 cgi",
    "8.3.2 服务器扩展api",
    "8.4 应用程序接口和web 服务",
    "8.5 隧道",
    "8.5.1 用connect 建立http 隧道",
    "8.5.2 数据隧道、定时及连接管理",
    "8.5.3 ssl 隧道",
    "8.5.4 ssl 隧道与http/https 网关的对比",
    "8.5.5 隧道认证",
    "8.5.6 隧道的安全性考虑",
    "8.6 中继",
    "8.7 更多信息",
  ],
  fault: "逐跳字段被错误转发，导致下一跳误解连接或认证状态",
  evidence:
    "URL、request bytes、response bytes、Via/next hop、timestamp、fault与recovery",
} satisfies HttpExperimentModel;

export function Hdg108MessageLab() {
  return <OfficialHttpTransactionLab model={model} mode="message" />;
}

export function Hdg108FlowLab() {
  return <OfficialHttpTransactionLab model={model} mode="flow" />;
}

export function Hdg108EvidenceLab() {
  return <OfficialHttpTransactionLab model={model} mode="evidence" />;
}
