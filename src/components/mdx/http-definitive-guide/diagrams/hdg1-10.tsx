"use client";

import { HttpTransactionLab } from "./official-http-transaction-lab";

const config = {
  title: "第10章 http-ng",
  focus:
    "在历史语境中理解HTTP-NG的模块化、分布式对象、三层架构、WebMUX和二进制协议",
  invariant:
    "每个HTTP-NG主张都标注为2002年前后的探索，不冒充后来HTTP/2或HTTP/3标准",
  failure: "用现代多路复用结果倒推HTTP-NG已标准化会歪曲原书的研究状态",
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

export function Hdg110MessageLab() {
  return (
    <HttpTransactionLab
      {...config}
      hops={[...config.hops]}
      gates={[...config.gates]}
      mode="message"
    />
  );
}

export function Hdg110DecisionLab() {
  return (
    <HttpTransactionLab
      {...config}
      hops={[...config.hops]}
      gates={[...config.gates]}
      mode="decision"
    />
  );
}

export function Hdg110EvidenceLab() {
  return (
    <HttpTransactionLab
      {...config}
      hops={[...config.hops]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
