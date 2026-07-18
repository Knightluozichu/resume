"use client";

import { MicroservicesPatternsLab } from "./official-microservices-patterns-lab";

const config = {
  unitTitle: "2019中文版初版总复习与架构评审",
  focus:
    "沿FTGO从单体困境、服务拆分、通信与数据到测试、生产、部署和渐进重构，完成全书架构评审",
  nodes: [
    "1. 第1章 逃离单体地狱",
    "2. 第2章 服务的拆分策略",
    "3. 第3章 微服务架构中的进程间通信",
    "4. 第4章 使用Saga管理事务",
    "5. 第5章 微服务架构中的业务逻辑设计",
    "6. 第6章 使用事件溯源开发业务逻辑",
    "7. 第7章 在微服务架构中实现查询",
    "8. 第8章 外部API模式",
    "9. 第9章 微服务架构中的测试策略（上）",
    "10. 第10章 微服务架构中的测试策略（下）",
    "11. 第11章 开发面向生产环境的微服务应用",
    "12. 第12章 部署微服务应用",
    "13. 第13章 微服务架构的重构策略",
  ],
  invariant:
    "任何微服务方案都同时给出业务目标、服务边界、数据所有权、交互契约、失败恢复、测试层级、运行证据、部署回退和迁移退出条件",
  failure:
    "只会列Saga、CQRS、网关、容器等名词而不能连接它们解决的前驱问题、引入的后继问题和证据门，不算掌握模式语言",
  patterns: [
    {
      label: "边界评审",
      problem: "服务是否真正自治",
      mechanism: "检查能力、数据和团队责任",
      evidence: "跨服务同步变更比例",
    },
    {
      label: "一致性评审",
      problem: "分布式业务会部分失败",
      mechanism: "检查发件箱、Saga、幂等和对账",
      evidence: "终态集合与补偿轨迹",
    },
    {
      label: "运行评审",
      problem: "功能正确不等于可生产",
      mechanism: "检查测试、遥测、配置与部署",
      evidence: "SLO、流水线和回退演练",
    },
    {
      label: "迁移评审",
      problem: "新旧系统长期共存",
      mechanism: "检查反腐层、所有权和退出条件",
      evidence: "旧路径删除与业务连续",
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

export function MspOfficialFinalReviewPatternLab() {
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

export function MspOfficialFinalReviewFailureLab() {
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

export function MspOfficialFinalReviewEvidenceLab() {
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
