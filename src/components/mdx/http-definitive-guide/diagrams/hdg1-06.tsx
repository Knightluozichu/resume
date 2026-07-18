"use client";

import { HttpTransactionLab } from "./official-http-transaction-lab";

const config = {
  title: "第6章 代理",
  focus:
    "理解代理部署、层次、流量获取、客户端配置、URI差异、Via追踪、认证与互操作",
  invariant:
    "每个代理跳都能解释请求目标形式、逐跳首部、Via链、认证边界和转发结果",
  failure:
    "代理若盲转Connection列出的逐跳首部或错误改写URI，会破坏持久连接与虚拟主机",
  hops: [
    {
      label: "客户端",
      request: "GET /item HTTP/1.1\\nHost: example.test",
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
      response: "HTTP/1.1 200 OK\\nContent-Length: ...",
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

export function Hdg106MessageLab() {
  return (
    <HttpTransactionLab
      {...config}
      hops={[...config.hops]}
      gates={[...config.gates]}
      mode="message"
    />
  );
}

export function Hdg106DecisionLab() {
  return (
    <HttpTransactionLab
      {...config}
      hops={[...config.hops]}
      gates={[...config.gates]}
      mode="decision"
    />
  );
}

export function Hdg106EvidenceLab() {
  return (
    <HttpTransactionLab
      {...config}
      hops={[...config.hops]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
