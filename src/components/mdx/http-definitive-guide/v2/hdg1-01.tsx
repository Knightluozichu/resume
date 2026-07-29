import {
  OfficialHttpTransactionLab,
  type HttpExperimentModel,
} from "./official-http-transaction-lab";

const model = {
  title: "第1章 http 概述",
  focus: "建立HTTP资源、事务、报文、连接、版本和Web结构组件的全景模型",
  concepts: [
    "第1章 http 概述",
    "1.1 http——因特网的多媒体信使",
    "1.2 web 客户端和服务器",
    "1.3 资源",
    "1.3.1 媒体类型",
    "1.3.2 uri",
    "1.3.3 url",
    "1.3.4 urn",
    "1.4 事务",
    "1.4.1 方法",
    "1.4.2 状态码",
    "1.4.3 web 页面中可以包含多个对象",
    "1.5 报文",
    "1.6 连接",
    "1.6.1 tcp/ip",
    "1.6.2 连接、ip 地址及端口号",
    "1.6.3 使用telnet 实例",
    "1.7 协议版本",
    "1.8 web 的结构组件",
    "1.8.1 代理",
    "1.8.2 缓存",
    "1.8.3 网关",
    "1.8.4 隧道",
    "1.8.5 agent 代理",
    "1.9 起始部分的结束语",
    "1.10 更多信息",
    "1.10.1 http 协议信息",
    "1.10.2 历史透视",
    "1.10.3 其他万维网信息",
  ],
  fault: "只观察最终页面，没有保存两端原始报文和中间实体状态",
  evidence:
    "URL、request bytes、response bytes、Via/next hop、timestamp、fault与recovery",
} satisfies HttpExperimentModel;

export function Hdg101MessageLab() {
  return <OfficialHttpTransactionLab model={model} mode="message" />;
}

export function Hdg101FlowLab() {
  return <OfficialHttpTransactionLab model={model} mode="flow" />;
}

export function Hdg101EvidenceLab() {
  return <OfficialHttpTransactionLab model={model} mode="evidence" />;
}
