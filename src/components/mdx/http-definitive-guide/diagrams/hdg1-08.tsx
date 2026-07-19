"use client";

import { HttpTransactionLab } from "./official-http-transaction-lab";

const config = {
  title: "第8章 集成点：网关、隧道及中继",
  focus: "区分网关、资源网关、应用接口、CONNECT隧道、SSL隧道和中继",
  invariant:
    "每个集成点都能说明客户端侧协议、服务器侧协议、字节边界、认证和安全责任",
  failure: "把中继当完整代理或开放任意CONNECT会泄漏逐跳首部并形成滥用通道",
  hops: [
    {
      label: "客户端",
      request: "GET /item HTTP/1.1\nHost: example.test",
      response: "解析URL并发送请求",
    },
    {
      label: "代理",
      request: "Via与逐跳首部检查",
      response: "转发、认证或拒绝",
    },
    {
      label: "缓存",
      request: "键、Age、Vary、验证器",
      response: "命中、再验证或回源",
    },
    {
      label: "源服务器",
      request: "映射资源并处理方法",
      response: "HTTP/1.1 200 OK\nContent-Length: ...",
    },
  ],
  gates: [
    "首版正式节点与历史边界",
    "原始请求行、首部和主体",
    "TCP连接与消息边界",
    "代理、缓存和网关决策",
    "身份、证书、编码与隐私",
    "故障、恢复、责任人与复核人",
  ],
} as const;

export function Hdg108MessageLab() {
  return (
    <HttpTransactionLab
      {...config}
      hops={[...config.hops]}
      gates={[...config.gates]}
      mode="message"
    />
  );
}

export function Hdg108DecisionLab() {
  return (
    <HttpTransactionLab
      {...config}
      hops={[...config.hops]}
      gates={[...config.gates]}
      mode="decision"
    />
  );
}

export function Hdg108EvidenceLab() {
  return (
    <HttpTransactionLab
      {...config}
      hops={[...config.hops]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
