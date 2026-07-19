"use client";

import { HttpTransactionLab } from "./official-http-transaction-lab";

const config = {
  title: "2002年首版总复习与HTTP事务审计",
  focus:
    "把URL、连接、报文、中间实体、身份安全、实体编码、国际化、发布分发和日志闭合为完整HTTP事务",
  invariant:
    "第三方能从原始报文与状态复现正常事务、单变量故障、缓存与代理决策以及安全边界",
  failure:
    "只看客户端最终页面会掩盖连接截尾、缓存变体、代理逐跳首部、证书身份和重定向链问题",
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

export function Hdg1OfficialFinalReviewMessageLab() {
  return (
    <HttpTransactionLab
      {...config}
      hops={[...config.hops]}
      gates={[...config.gates]}
      mode="message"
    />
  );
}

export function Hdg1OfficialFinalReviewDecisionLab() {
  return (
    <HttpTransactionLab
      {...config}
      hops={[...config.hops]}
      gates={[...config.gates]}
      mode="decision"
    />
  );
}

export function Hdg1OfficialFinalReviewEvidenceLab() {
  return (
    <HttpTransactionLab
      {...config}
      hops={[...config.hops]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
