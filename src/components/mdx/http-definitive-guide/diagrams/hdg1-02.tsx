"use client";

import { HttpTransactionLab } from "./official-http-transaction-lab";

const config = {
  title: "第2章 url 与资源",
  focus: "拆解URL方案、权限、路径、参数、查询、片段、相对引用、转义和多种方案",
  invariant:
    "URL每一部分都能按方案语法解释，解析与转义不会改变资源身份或误把片段发往服务器",
  failure:
    "直接拼接字符串会在相对引用、保留字符、用户信息和非HTTP方案处产生歧义",
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

export function Hdg102MessageLab() {
  return (
    <HttpTransactionLab
      {...config}
      hops={[...config.hops]}
      gates={[...config.gates]}
      mode="message"
    />
  );
}

export function Hdg102DecisionLab() {
  return (
    <HttpTransactionLab
      {...config}
      hops={[...config.hops]}
      gates={[...config.gates]}
      mode="decision"
    />
  );
}

export function Hdg102EvidenceLab() {
  return (
    <HttpTransactionLab
      {...config}
      hops={[...config.hops]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
