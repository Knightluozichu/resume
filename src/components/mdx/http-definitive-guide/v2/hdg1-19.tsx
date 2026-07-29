import {
  OfficialHttpTransactionLab,
  type HttpExperimentModel,
} from "./official-http-transaction-lab";

const model = {
  title: "第19章 发布系统",
  focus:
    "在历史边界内掌握FrontPage RPC与WebDAV协作发布、锁、属性、集合和方法扩展",
  concepts: [
    "第19章 发布系统",
    "19.1 frontpage 为支持发布而做的服务器扩展",
    "19.1.1 frontpage 服务器扩展",
    "19.1.2 frontpage 术语表",
    "19.1.3 frontpage 的rpc 协议",
    "19.1.4 frontpage 的安全模型",
    "19.2 webdav 与协作写作",
    "19.2.1 webdav 的方法",
    "19.2.2 webdav 与xml",
    "19.2.3 webdav 首部集",
    "19.2.4 webdav 的锁定与防止覆写",
    "19.2.5 lock 方法",
    "19.2.6 unlock 方法",
    "19.2.7 属性和元数据",
    "19.2.8 propfind 方法",
    "19.2.9 proppatch 方法",
    "19.2.10 集合与名字空间管理",
    "19.2.11 mkcol 方法",
    "19.2.12 delete 方法",
    "19.2.13 copy 与move 方法",
    "19.2.14 增强的http/1.1 方法",
    "19.2.15 webdav 中的版本管理",
    "19.2.16 webdav 的未来发展",
    "19.3 更多信息",
  ],
  fault: "Location或资源状态改变后，客户端仍沿用旧请求目标和条件",
  evidence:
    "URL、request bytes、response bytes、Via/next hop、timestamp、fault与recovery",
} satisfies HttpExperimentModel;

export function Hdg119MessageLab() {
  return <OfficialHttpTransactionLab model={model} mode="message" />;
}

export function Hdg119FlowLab() {
  return <OfficialHttpTransactionLab model={model} mode="flow" />;
}

export function Hdg119EvidenceLab() {
  return <OfficialHttpTransactionLab model={model} mode="evidence" />;
}
