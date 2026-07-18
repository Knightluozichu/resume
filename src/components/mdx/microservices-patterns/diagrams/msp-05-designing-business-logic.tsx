"use client";

import { MicroservicesPatternsLab } from "./official-microservices-patterns-lab";

const config = {
  unitTitle: "第5章 微服务架构中的业务逻辑设计",
  focus:
    "在六边形架构内比较事务脚本与领域模型，用DDD聚合建立一致性边界，并以领域事件连接服务协作",
  nodes: [
    "5.1 业务逻辑组织模式",
    "5.2 使用DDD聚合模式设计领域模型",
    "5.3 发布领域事件",
    "5.4 Kitchen Service的业务逻辑",
    "5.5 Order Service的业务逻辑",
  ],
  invariant:
    "所有修改只能经聚合根维护不变量，一个本地事务只创建或更新一个聚合；跨聚合协作通过标识和可靠领域事件发生",
  failure:
    "允许对象直接引用并修改其他聚合，或在一个本地事务中更新多个服务数据，会重新形成共享数据库和模糊一致性边界",
  patterns: [
    {
      label: "事务脚本",
      problem: "业务规则简单且过程稳定",
      mechanism: "每个请求对应一个过程",
      evidence: "分支复杂度和重复规则",
    },
    {
      label: "领域模型",
      problem: "规则、状态和协作复杂",
      mechanism: "实体和值对象封装行为",
      evidence: "不变量测试与模型语言",
    },
    {
      label: "聚合",
      problem: "需要明确事务一致性边界",
      mechanism: "只经聚合根修改一个对象簇",
      evidence: "并发版本与不变量",
    },
    {
      label: "领域事件",
      problem: "其他组件需要获知状态变化",
      mechanism: "聚合发布不可变业务事实",
      evidence: "事件与聚合提交对账",
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

export function Msp05DesigningBusinessLogicPatternLab() {
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

export function Msp05DesigningBusinessLogicFailureLab() {
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

export function Msp05DesigningBusinessLogicEvidenceLab() {
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
