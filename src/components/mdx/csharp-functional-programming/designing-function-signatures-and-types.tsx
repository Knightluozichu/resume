"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么Signature是最便宜的Architecture",
    mechanism:
      "Function body可以写得很functional，但若signature接收primitive soup、读取global、通过out parameter或exception偷偷返回结果，caller仍无法组合和推理。Signature是每个consumer必经的architecture s…",
    failure:
      "若把「为什么Signature是最便宜的Architecture」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「为什么Signature是最便宜的Architecture」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
  {
    label: "Function signature design",
    mechanism:
      "先把function写成arrow： A - B ，再问是否真的只有A输入、B输出。Clock、configuration、repository若藏在object fields/global中也是inputs；mutation、logging、out/ref、exception是额外outputs/…",
    failure:
      "若把「Function signature design」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「Function signature design」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
  {
    label: "Capturing data with data obje…",
    mechanism:
      "Data object把相关values作为一个immutable snapshot传递，避免long parameter list和temporal mutation。它应表达construction invariant、value equality需求与serialization boundar…",
    failure:
      "若把「Capturing data with data obje…」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「Capturing data with data obje…」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
];

export function DesigningFunctionSignaturesAndTypesDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 3. Designing function signatures and types：机制与证据"
      prompt="切换《Chapter 3. Designing function signatures and types》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 3. Designing function signatures and types》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function DesigningFunctionSignaturesAndTypesMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 3. Designing function signatures and types：机制路径"
      stages={STAGES}
    />
  );
}

export function DesigningFunctionSignaturesAndTypesFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 3. Designing function signatures and types：失效与核验"
      stages={STAGES}
    />
  );
}
