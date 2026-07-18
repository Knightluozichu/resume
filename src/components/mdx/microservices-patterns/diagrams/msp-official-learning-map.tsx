"use client";

import { MicroservicesPatternsLab } from "./official-microservices-patterns-lab";

const config = {
  unitTitle: "2019中文版初版权威学习地图",
  focus:
    "建立13章、52个二级节、177个三级节和44个模式的依赖图，固定2019中文版初版与2018英文初版边界",
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
    "242个编号目录节点全部可达，每个模式能回指问题、约束、解决方案、结果、相关模式和可复现实验，不混入第二版新增结构",
  failure:
    "用当前microservices.io网站或第二版MEAP目录替换2018/2019初版，会改变章节分母和模式关系，导致课程无法忠实对应用户书架中的版本",
  patterns: [
    {
      label: "架构与拆分",
      problem: "从单体走向服务需要边界",
      mechanism: "第1至2章建立目标与拆分",
      evidence: "系统操作和服务责任",
    },
    {
      label: "通信与数据",
      problem: "分布后出现失败和一致性",
      mechanism: "第3至7章处理通信、Saga、事件和查询",
      evidence: "消息、状态和视图对账",
    },
    {
      label: "边缘与质量",
      problem: "服务需要可测试可运营",
      mechanism: "第8至12章覆盖API、测试、生产与部署",
      evidence: "契约、流水线和运行证据",
    },
    {
      label: "渐进迁移",
      problem: "现有单体不能一次替换",
      mechanism: "第13章绞杀并转移能力",
      evidence: "旧责任下降与回退",
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

export function MspOfficialLearningMapPatternLab() {
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

export function MspOfficialLearningMapFailureLab() {
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

export function MspOfficialLearningMapEvidenceLab() {
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
