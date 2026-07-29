"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "测试构造决定失败是否可理解",
    mechanism:
      "测试通过时几乎没有信息，失败时才暴露构造质量。一个有效测试应让读者快速回答：哪个行为坏了，输入是什么，期望与实际差在哪里，失败属于单元逻辑还是外部资源。组织、断言和数据表达共同决定这条诊断路径。",
    failure:
      "若把「测试构造决定失败是否可理解」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「测试构造决定失败是否可理解」是否提供快速反馈。",
  },
  {
    label: "快测试与慢测试承担不同反馈节奏",
    mechanism:
      "快速测试支撑每次红绿循环，慢速测试证明文件格式、数据库映射、进程协议等真实边界。目标不是把慢测试删掉，而是让两组入口明确：开发者频繁运行快速集，提交前和 CI 运行完整集，并监控慢测试时长与不稳定性。",
    failure:
      "若把「快测试与慢测试承担不同反馈节奏」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「快测试与慢测试承担不同反馈节奏」是否提供快速反馈。",
  },
  {
    label: "过滤器缩短反馈，套件表达领域",
    mechanism:
      "CTest 标签：适合项目级快慢分层 ctest --test-dir build -L fast --output-on-failure ctest --test-dir build --output-on-failure",
    failure:
      "若把「过滤器缩短反馈，套件表达领域」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「过滤器缩短反馈，套件表达领域」是否提供快速反馈。",
  },
];

export function TestConstructionDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 4：Test Construction：机制与证据"
      prompt="切换《Chapter 4：Test Construction》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 4：Test Construction》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function TestConstructionMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 4：Test Construction：机制路径"
      stages={STAGES}
    />
  );
}

export function TestConstructionFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 4：Test Construction：失效与核验"
      stages={STAGES}
    />
  );
}
