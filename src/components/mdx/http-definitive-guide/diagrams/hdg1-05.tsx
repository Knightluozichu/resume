"use client";

import { HttpTransactionLab } from "./official-http-transaction-lab";

const config = {
  title: "第5章 web 服务器",
  focus: "沿接受连接、接收、处理、资源映射、构建响应、发送和日志还原Web服务器",
  invariant:
    "请求从套接字到资源和响应的七个步骤都有明确输入、访问控制、MIME类型和日志证据",
  failure:
    "把服务器视为静态文件读取器会遗漏虚拟目录、动态映射、访问控制和并发I/O架构",
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

export function Hdg105MessageLab() {
  return (
    <HttpTransactionLab
      {...config}
      hops={[...config.hops]}
      gates={[...config.gates]}
      mode="message"
    />
  );
}

export function Hdg105DecisionLab() {
  return (
    <HttpTransactionLab
      {...config}
      hops={[...config.hops]}
      gates={[...config.gates]}
      mode="decision"
    />
  );
}

export function Hdg105EvidenceLab() {
  return (
    <HttpTransactionLab
      {...config}
      hops={[...config.hops]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
