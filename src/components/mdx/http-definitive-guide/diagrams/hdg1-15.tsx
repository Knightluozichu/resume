"use client";

import { HttpTransactionLab } from "./official-http-transaction-lab";

const config = {
  title: "第15章 实体和编码",
  focus:
    "掌握实体长度、摘要、媒体类型、内容编码、传输编码、分块、验证器、范围与差异编码",
  invariant:
    "接收方能无歧义确定主体边界、解码顺序、媒体解释、实例身份和部分响应范围",
  failure:
    "把Content-Encoding与Transfer-Encoding颠倒或信任错误Content-Length会截断、挂起或错误解析连接",
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

export function Hdg115MessageLab() {
  return (
    <HttpTransactionLab
      {...config}
      hops={[...config.hops]}
      gates={[...config.gates]}
      mode="message"
    />
  );
}

export function Hdg115DecisionLab() {
  return (
    <HttpTransactionLab
      {...config}
      hops={[...config.hops]}
      gates={[...config.gates]}
      mode="decision"
    />
  );
}

export function Hdg115EvidenceLab() {
  return (
    <HttpTransactionLab
      {...config}
      hops={[...config.hops]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
