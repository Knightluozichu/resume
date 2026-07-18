"use client";

import { HttpTransactionLab } from "./official-http-transaction-lab";

const config = {
  title: "2002年首版权威学习地图",
  focus:
    "按5个正文部分、21章、8附录与索引还原HTTP/1.0、HTTP/1.1时代Web协议与架构",
  invariant:
    "任何结论都能定位到原书正式节点、原始HTTP报文、中间实体状态、历史版本边界和复现实验",
  failure:
    "用HTTP/2、HTTP/3、OAuth、JWT、SameSite或现代CDN术语覆盖原书，会丢失HTTP-NG、Digest、WebDAV、WPAD等真实结构",
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

export function Hdg1OfficialLearningMapMessageLab() {
  return (
    <HttpTransactionLab
      {...config}
      hops={[...config.hops]}
      gates={[...config.gates]}
      mode="message"
    />
  );
}

export function Hdg1OfficialLearningMapDecisionLab() {
  return (
    <HttpTransactionLab
      {...config}
      hops={[...config.hops]}
      gates={[...config.gates]}
      mode="decision"
    />
  );
}

export function Hdg1OfficialLearningMapEvidenceLab() {
  return (
    <HttpTransactionLab
      {...config}
      hops={[...config.hops]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
