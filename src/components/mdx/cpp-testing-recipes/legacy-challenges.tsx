"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "遗留代码的困难是缺少可信反馈",
    mechanism:
      "遗留代码不由年龄定义，而由改动时能否快速知道破坏了什么定义。一个十年前但有清晰契约与快速测试的模块可以安全演化；昨天写成、依赖全局状态且只能人工验证的代码已经具有遗留风险。",
    failure:
      "若把「遗留代码的困难是缺少可信反馈」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「遗留代码的困难是缺少可信反馈」是否提供快速反馈。",
  },
  {
    label: "保持测试驱动心态，但调整第一步",
    mechanism:
      "新代码可以直接从需求红灯开始；遗留代码常需先写 characterization test。它记录当前输出，不宣称输出正确。护栏建立后，结构调整保持这些测试全绿；真正的新需求另写失败测试，清楚表明语义将改变。",
    failure:
      "若把「保持测试驱动心态，但调整第一步」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「保持测试驱动心态，但调整第一步」是否提供快速反馈。",
  },
  {
    label: "特征测试记录事实，不替系统辩护",
    mechanism:
      "选择稳定入口与代表输入，记录返回值、状态变化、文件内容或外部调用。避免一开始断言每个 private 字段；那会把未知实现冻结。测试名可以说明“characterizes current behavior”，并在注释或 issue 中记录可疑结果。",
    failure:
      "若把「特征测试记录事实，不替系统辩护」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「特征测试记录事实，不替系统辩护」是否提供快速反馈。",
  },
];

export function LegacyChallengesDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 8：Legacy Challenges：机制与证据"
      prompt="切换《Chapter 8：Legacy Challenges》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 8：Legacy Challenges》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function LegacyChallengesMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 8：Legacy Challenges：机制路径"
      stages={STAGES}
    />
  );
}

export function LegacyChallengesFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 8：Legacy Challenges：失效与核验"
      stages={STAGES}
    />
  );
}
