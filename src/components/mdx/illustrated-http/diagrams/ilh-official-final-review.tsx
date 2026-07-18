"use client";

import { IllustratedHttpLab } from "./official-illustrated-http-lab";

const config = {
  unitTitle: "2014年首版总复习与协议审计",
  snapshot: "《图解HTTP》2014年4月首版 / HTTP/1.1时代",
  focus:
    "把11章、202个正式目录节点压缩成可独立复核的一条HTTP请求生命周期与四道证据门",
  nodes: [
    "复习1 第1章：Web与网络基础",
    "复习2 第2章：简单HTTP协议",
    "复习3 第3章：HTTP报文信息",
    "复习4 第4章：HTTP状态码",
    "复习5 第5章：协作Web服务器",
    "复习6 第6章：HTTP首部",
    "复习7 第7章：HTTPS",
    "复习8 第8章：认证",
    "复习9 第9章：HTTP扩展",
    "复习10 第10章：Web内容技术",
    "复习11 第11章：Web攻击技术",
  ],
  invariant:
    "读者能从URI输入追踪到响应呈现或攻击阻断，逐段说明协议、中介、表示、身份和安全状态",
  failure:
    "按术语列表复习会失去跨章因果；真正掌握必须让同一个请求同时通过报文、缓存、认证和攻击面审计",
  links: [
    {
      label: "协议轨迹",
      mechanism: "从URI、DNS、TCP、请求、响应到浏览器处理的有序证据链",
      evidence: "请求行、目标URI与时间线",
    },
    {
      label: "报文边界",
      mechanism: "起始行、首部、空行、主体以及长度或分块终止条件",
      evidence: "原始首部、主体边界与状态码",
    },
    {
      label: "缓存验证",
      mechanism: "新鲜度、实体标签、修改时间和Vary共同决定副本是否可复用",
      evidence: "正常/失败对照和状态前后值",
    },
    {
      label: "身份边界",
      mechanism: "TLS对端认证、应用认证、Session和对象授权各自独立的检查点",
      evidence: "缓存、会话或安全边界复核",
    },
  ],
  gates: [
    "首版目录节点与2014年技术边界",
    "原始请求行、状态行与首部",
    "主体边界、编码和表示元数据",
    "连接、中介、缓存或会话状态",
    "单变量失败与无副作用证明",
    "恢复、限制、责任人与复核人",
  ],
} as const;

export function IlhOfficialFinalReviewFlowLab() {
  return (
    <IllustratedHttpLab
      {...config}
      nodes={[...config.nodes]}
      links={[...config.links]}
      gates={[...config.gates]}
      mode="flow"
    />
  );
}

export function IlhOfficialFinalReviewExperimentLab() {
  return (
    <IllustratedHttpLab
      {...config}
      nodes={[...config.nodes]}
      links={[...config.links]}
      gates={[...config.gates]}
      mode="experiment"
    />
  );
}

export function IlhOfficialFinalReviewEvidenceLab() {
  return (
    <IllustratedHttpLab
      {...config}
      nodes={[...config.nodes]}
      links={[...config.links]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
