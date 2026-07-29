"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "TDD 从个人技巧变成团队系统",
    mechanism:
      "一个人可以在本地坚持红绿重构，但若主干长期红、测试随机、评审只看覆盖率、需求排期不允许小步，实践很快退化。持续 TDD 需要个人循环、共同学习、交付门禁和组织反馈共同工作。",
    failure:
      "若把「TDD 从个人技巧变成团队系统」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「TDD 从个人技巧变成团队系统」是否提供快速反馈。",
  },
  {
    label: "解释 TDD 要从问题和证据开始",
    mechanism:
      "“测试多所以质量高”很难说服有经验的同事。选择当前痛点：一次回归要两天、修改税率常破坏旧客户、外部依赖使测试随机。展示一个小功能如何先复现、几分钟定位、在全绿下重构，并比较前后反馈距离。",
    failure:
      "若把「解释 TDD 要从问题和证据开始」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「解释 TDD 要从问题和证据开始」是否提供快速反馈。",
  },
  {
    label: "坏测试会形成死亡螺旋",
    mechanism:
      "第一个随机失败若被简单重跑，团队学到红灯不可靠；主干长期红后，新失败无法归因；为了赶进度，开发者跳过测试并扩大改动；代码耦合又产生更慢、更脆的测试。循环会自我强化。",
    failure:
      "若把「坏测试会形成死亡螺旋」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「坏测试会形成死亡螺旋」是否提供快速反馈。",
  },
];

export function GrowingAndSustainingTddDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 11：Growing and Sustaining TDD：机制与证据"
      prompt="切换《Chapter 11：Growing and Sustaining TDD》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 11：Growing and Sustaining TDD》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function GrowingAndSustainingTddMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 11：Growing and Sustaining TDD：机制路径"
      stages={STAGES}
    />
  );
}

export function GrowingAndSustainingTddFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 11：Growing and Sustaining TDD：失效与核验"
      stages={STAGES}
    />
  );
}
