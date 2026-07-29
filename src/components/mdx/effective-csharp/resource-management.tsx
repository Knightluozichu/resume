"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "初始化",
    mechanism:
      "成员初始值与构造链应共享一个事实来源，静态状态按类型语义初始化。",
    failure: "重复赋值让不同构造入口形成不同不变量。",
    evidence: "构造路径测试、nullable 分析与静态初始化顺序。",
  },
  {
    label: "使用",
    mechanism: "短命对象控制分配，长寿资源的 owner 不被回调或缓存意外延长。",
    failure: "捕获、缓存和装箱制造隐性保留与 GC 压力。",
    evidence: "allocation profile、heap path 与 owner graph。",
  },
  {
    label: "释放",
    mechanism: "IDisposable 负责确定释放外部资源，using/finally 覆盖异常路径。",
    failure: "依赖 finalizer 时文件、句柄或连接长期占用。",
    evidence: "故障注入后的 Dispose 次数与句柄计数。",
  },
];

export function ResourceManagementDecisionLab() {
  return (
    <ChapterDecisionLab
      title="对象生命周期与外部资源责任实验"
      prompt="选择生命周期阶段，区分 GC 管理的内存与必须确定释放的资源。"
      stages={STAGES}
      conclusion="资源管理的核心不是多写清理代码，而是让每个资源只有一个可证明的 owner 和一条覆盖所有退出路径的释放协议。"
    />
  );
}

export function ResourceManagementDecisionMechanismMap() {
  return (
    <ChapterMechanismMap
      title="对象生命周期与外部资源责任实验"
      stages={STAGES}
    />
  );
}

export function ResourceManagementDecisionFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="对象生命周期与外部资源责任实验"
      stages={STAGES}
    />
  );
}
