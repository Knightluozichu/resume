"use client";

import { MicroservicesPatternsLab } from "./official-microservices-patterns-lab";

const config = {
  unitTitle: "第13章 微服务架构的重构策略",
  focus:
    "用绞杀策略渐进迁移单体，比较新功能服务化、前后端分离和提取业务能力，并设计反腐层、数据一致性与身份协作",
  nodes: [
    "13.1 重构到微服务需要考虑的问题",
    "13.2 将单体应用重构为微服务架构的若干策略",
    "13.3 设计服务与单体的协作方式",
    "13.4 将新功能实现为服务：处理错误配送订单",
    "13.5 从单体中提取送餐管理功能",
  ],
  invariant:
    "每次迁移都保持业务连续、单一数据权威和可回退路径；旧单体责任随流量和数据迁移而真实缩小，不出现双写无主或永久胶水层",
  failure:
    "大爆炸重写会让新旧系统长期分叉且无法交付；没有数据所有权和退出条件的胶水层会成为永久双向耦合",
  patterns: [
    {
      label: "绞杀单体",
      problem: "不能承担大爆炸重写风险",
      mechanism: "逐能力转移流量、代码和数据",
      evidence: "旧责任与调用持续下降",
    },
    {
      label: "新功能即服务",
      problem: "单体仍在快速增长",
      mechanism: "新能力从一开始放在服务中",
      evidence: "新代码不再进入单体",
    },
    {
      label: "反腐层",
      problem: "新旧领域模型语义不同",
      mechanism: "适配器显式转换契约",
      evidence: "模型泄漏和转换失败",
    },
    {
      label: "提取业务能力",
      problem: "高价值能力阻塞独立交付",
      mechanism: "迁移代码、数据所有权和调用",
      evidence: "双写窗口、切流与删除旧路",
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

export function Msp13RefactoringToMicroservicesPatternLab() {
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

export function Msp13RefactoringToMicroservicesFailureLab() {
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

export function Msp13RefactoringToMicroservicesEvidenceLab() {
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
