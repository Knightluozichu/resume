import {
  OfficialHttpTransactionLab,
  type HttpExperimentModel,
} from "./official-http-transaction-lab";

const model = {
  title: "第14章 安全http",
  focus:
    "从密码、密钥、签名、证书进入SSL/TLS握手、证书验证、HTTPS客户端和代理隧道",
  concepts: [
    "第14章 安全http",
    "14.1 保护http 的安全",
    "14.2 数字加密",
    "14.2.1 密码编制的机制与技巧",
    "14.2.2 密码",
    "14.2.3 密码机",
    "14.2.4 使用了密钥的密码",
    "14.2.5 数字密码",
    "14.3 对称密钥加密技术",
    "14.3.1 密钥长度与枚举攻击",
    "14.3.2 建立共享密钥",
    "14.4 公开密钥加密技术",
    "14.4.1 rsa",
    "14.4.2 混合加密系统和会话密钥",
    "14.5 数字签名",
    "14.6 数字证书",
    "14.6.1 证书的主要内容",
    "14.6.2 x.509 v3 证书",
    "14.6.3 用证书对服务器进行认证",
    "14.7 https——细节介绍",
    "14.7.1 https 概述",
    "14.7.2 https 方案",
    "14.7.3 建立安全传输",
    "14.7.4 ssl 握手",
    "14.7.5 服务器证书",
    "14.7.6 站点证书的有效性",
    "14.7.7 虚拟主机与证书",
    "14.8 https 客户端实例",
    "14.8.1 openssl",
    "14.8.2 简单的https 客户端",
    "14.8.3 执行openssl 客户端",
    "14.9 通过代理以隧道形式传输安全流量",
    "14.10 更多信息",
    "14.10.1 http 安全性",
    "14.10.2 ssl 与tls",
    "14.10.3 公开密钥基础设施",
    "14.10.4 数字密码",
  ],
  fault: "身份、realm、cookie作用域或证书主体没有绑定到当前请求",
  evidence:
    "request target、realm/origin、credentials、Set-Cookie/Cookie、TLS identity与status",
} satisfies HttpExperimentModel;

export function Hdg114MessageLab() {
  return <OfficialHttpTransactionLab model={model} mode="message" />;
}

export function Hdg114FlowLab() {
  return <OfficialHttpTransactionLab model={model} mode="flow" />;
}

export function Hdg114EvidenceLab() {
  return <OfficialHttpTransactionLab model={model} mode="evidence" />;
}
