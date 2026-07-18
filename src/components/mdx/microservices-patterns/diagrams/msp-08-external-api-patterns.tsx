"use client";

import { MicroservicesPatternsLab } from "./official-microservices-patterns-lab";

const config = {
  unitTitle: "第8章 外部API模式",
  focus:
    "为移动端、浏览器和合作伙伴建立稳定外部边界，比较API Gateway、BFF、响应式组合与GraphQL实现",
  nodes: [
    "8.1 外部API的设计难题",
    "8.2 API Gateway模式",
    "8.3 实现一个API Gateway",
  ],
  invariant:
    "客户端不感知内部服务拓扑；网关只承担路由、边缘安全、协议适配和有限组合，业务不变量仍由领域服务拥有",
  failure:
    "把所有业务逻辑塞进统一网关会形成新的单体与发布瓶颈；客户端直连服务则把发现、版本和故障处理扩散到每个终端",
  patterns: [
    {
      label: "API Gateway",
      problem: "外部客户端不能跟随内部拓扑",
      mechanism: "稳定入口路由和适配",
      evidence: "契约版本、路由与错误语义",
    },
    {
      label: "BFF",
      problem: "客户端需求差异大",
      mechanism: "每类客户端拥有独立边缘后端",
      evidence: "客户端变更的独立发布率",
    },
    {
      label: "响应式组合",
      problem: "网关需并行等待多个服务",
      mechanism: "非阻塞流组合结果与超时",
      evidence: "事件循环饱和和尾延迟",
    },
    {
      label: "GraphQL网关",
      problem: "客户端需要选择数据形状",
      mechanism: "schema解析为受控后端调用",
      evidence: "深度、复杂度和扇出上界",
    },
  ],
  gates: [
    "初版目录、ISBN与版本边界",
    "问题、约束、解决方案与后继模式",
    "主体、数据所有权与契约版本",
    "超时、重复、乱序与部分失败反例",
    "日志、追踪、指标、消息与状态轨迹",
    "业务对账、停止、恢复、回退与责任人",
  ],
} as const;

export function Msp08ExternalApiPatternsPatternLab() {
  return (
    <MicroservicesPatternsLab
      {...config}
      nodes={[...config.nodes]}
      patterns={[...config.patterns]}
      gates={[...config.gates]}
      mode="pattern"
    />
  );
}

export function Msp08ExternalApiPatternsFailureLab() {
  return (
    <MicroservicesPatternsLab
      {...config}
      nodes={[...config.nodes]}
      patterns={[...config.patterns]}
      gates={[...config.gates]}
      mode="failure"
    />
  );
}

export function Msp08ExternalApiPatternsEvidenceLab() {
  return (
    <MicroservicesPatternsLab
      {...config}
      nodes={[...config.nodes]}
      patterns={[...config.patterns]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
