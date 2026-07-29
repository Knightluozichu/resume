"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "匹配产物",
    mechanism: "源码、编译参数、二进制、符号和 build-id 必须对应同一次构建。",
    failure: "相同 tag 被误当成相同机器码，core 解析出错误栈。",
    evidence: "build-id、symbol package 与 compile_commands。",
  },
  {
    label: "选择上下文",
    mechanism: "先锁定 inferior、thread 和 frame，再解释局部变量与寄存器。",
    failure: "在 master 或错误线程里解释 worker 状态。",
    evidence: "info inferiors、thread apply all bt 与 frame args。",
  },
  {
    label: "捕捉事件",
    mechanism: "条件断点和 watchpoint 用最少停顿捕捉首次错误写入。",
    failure: "广泛单步改变时序，优化变量又被误判为不存在。",
    evidence: "watchpoint 命中栈、反汇编与内存快照。",
  },
];

export function BackendDebugEvidenceLab() {
  return (
    <ChapterDecisionLab
      title="从构建产物到线程现场的调试证据链"
      prompt="选择证据层，判断当前结论依赖哪些匹配的产物和运行上下文。"
      stages={STAGES}
      conclusion="调试不是随机单步，而是从可复现 artifact 开始，逐层缩小到进程、线程、栈帧和具体写入事件。"
    />
  );
}

export function BackendDebugEvidenceMechanismMap() {
  return (
    <ChapterMechanismMap
      title="从构建产物到线程现场的调试证据链"
      stages={STAGES}
    />
  );
}

export function BackendDebugEvidenceFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="从构建产物到线程现场的调试证据链"
      stages={STAGES}
    />
  );
}
