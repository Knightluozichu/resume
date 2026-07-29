"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么Program Design可以从Function …",
    mechanism:
      "Function composition把小operations连接成larger behavior：前一个output必须符合后一个input。这个简单规则把architecture问题变成可检查的data flow。若连接不上，通常暴露missing adapter、hidden effect、…",
    failure:
      "若把「为什么Program Design可以从Function …」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「为什么Program Design可以从Function …」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
  {
    label: "Function composition",
    mechanism:
      "Ordinary composition： f: A - B 与 g: B - C 得到 g after f: A - C 。若f返回Option B，需Map/Bind；若g产生effect，result type应显式表达command/IO boundary。Composition不是字符串拼…",
    failure:
      "若把「Function composition」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「Function composition」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
  {
    label: "Thinking in terms of data flow",
    mechanism:
      "Data-flow view把program看成values经过stages，而不是objects互相发命令。每个stage声明input、output、error/effect，便于插入logging、metrics或parallel step而不污染core calculation。Branch…",
    failure:
      "若把「Thinking in terms of data flow」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「Thinking in terms of data flow」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
];

export function DesigningProgramsWithFunctionCompositionDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 5. Designing programs with function composition：机制与证据"
      prompt="切换《Chapter 5. Designing programs with function composition》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 5. Designing programs with function composition》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function DesigningProgramsWithFunctionCompositionMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 5. Designing programs with function composition：机制路径"
      stages={STAGES}
    />
  );
}

export function DesigningProgramsWithFunctionCompositionFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 5. Designing programs with function composition：失效与核验"
      stages={STAGES}
    />
  );
}
