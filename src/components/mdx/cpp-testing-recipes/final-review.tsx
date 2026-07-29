"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "总复习不是重复 11 章摘要",
    mechanism:
      "真正的掌握表现为遇到问题能选择下一条证据，而不是背出章节标题。规则错了需要最窄行为例；依赖不可控需要 seam 与替身；遗留未知需要特征护栏；线程问题需要受控交错与不变量；用户价值和性能需要外层证据；测试系统衰退需要 CI owner 与团队标准。",
    failure:
      "若把「总复习不是重复 11 章摘要」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「总复习不是重复 11 章摘要」是否提供快速反馈。",
  },
  {
    label: "第一问：这是真正的红灯吗",
    mechanism:
      "若所有测试因动态库缺失无法启动，先修环境；若旧测试本来就红，先恢复基线；若新测试立即绿，确认它是否执行、断言是否能失败。TDD 的后续设计全依赖红灯信号，不能把任何红色输出都当需求证据。",
    failure:
      "若把「第一问：这是真正的红灯吗」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「第一问：这是真正的红灯吗」是否提供快速反馈。",
  },
  {
    label: "第二问：这个测试是否给设计留出空间",
    mechanism:
      "高质量测试按行为组织，断言显示差值，fixture 不隐藏关键输入，参数化只压缩稳定同规则。直接读取 private 字段、精确要求每次查询顺序、用巨大 snapshot 接受所有变化，都会让测试对错误对象敏感。",
    failure:
      "若把「第二问：这个测试是否给设计留出空间」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「第二问：这个测试是否给设计留出空间」是否提供快速反馈。",
  },
];

export function FinalReviewDecisionLab() {
  return (
    <ChapterDecisionLab
      title="总复习：从红灯到团队反馈系统：机制与证据"
      prompt="切换《总复习：从红灯到团队反馈系统》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《总复习：从红灯到团队反馈系统》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function FinalReviewMechanismMap() {
  return (
    <ChapterMechanismMap
      title="总复习：从红灯到团队反馈系统：机制路径"
      stages={STAGES}
    />
  );
}

export function FinalReviewFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="总复习：从红灯到团队反馈系统：失效与核验"
      stages={STAGES}
    />
  );
}
