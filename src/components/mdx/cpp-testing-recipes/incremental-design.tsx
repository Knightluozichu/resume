"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "设计不是编码前的一次活动",
    mechanism:
      "TDD 不取消设计，它改变设计发生的节奏。开始前仍要理解业务目标、外部协议、质量属性和不可逆风险；编码中则用每个新例子和重构持续校正类、函数与依赖边界。最终结构来自多次有证据的选择，而不是第一张类图冻结的猜测。",
    failure:
      "若把「设计不是编码前的一次活动」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「设计不是编码前的一次活动」是否提供快速反馈。",
  },
  {
    label: "简单设计有优先顺序",
    mechanism:
      "“简单”不是行数最少。把税率公式复制进三个 if 可能很短，却让知识散落；引入七层抽象也消除重复，却让当前需求难以理解。先保证行为，再让名字和边界直接，随后统一重复知识，最后删除没有当前价值的元素。",
    failure:
      "若把「简单设计有优先顺序」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「简单设计有优先顺序」是否提供快速反馈。",
  },
  {
    label: "先预测：哪项决策值得现在冻结",
    mechanism:
      "在继续阅读前，把“公开消息 schema、内部 helper 名称、p95 延迟预算、数据库产品、日志字段顺序”分别标成低、中或高可逆，并写下验证方法。读完本章后重新分类：若理由只有“以后也许需要”，它不是前置设计证据；若错误选择会影响外部消费者、安全或迁移成本，就应先做最薄试验。",
    failure:
      "若把「先预测：哪项决策值得现在冻结」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「先预测：哪项决策值得现在冻结」是否提供快速反馈。",
  },
];

export function IncrementalDesignDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 6：Incremental Design：机制与证据"
      prompt="切换《Chapter 6：Incremental Design》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 6：Incremental Design》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function IncrementalDesignMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 6：Incremental Design：机制路径"
      stages={STAGES}
    />
  );
}

export function IncrementalDesignFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 6：Incremental Design：失效与核验"
      stages={STAGES}
    />
  );
}
