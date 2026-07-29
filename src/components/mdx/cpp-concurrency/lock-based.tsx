"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "定义接口",
    mechanism: "pop 返回值与状态变化一次完成，不暴露锁外失效的内部引用。",
    failure: "线程安全成员函数组合成非线程安全调用序列。",
    evidence: "接口竞态测试与异常路径。",
  },
  {
    label: "拆分锁域",
    mechanism: "分桶或逐节点锁让独立键和节点并行，但每个不变量有明确边界。",
    failure: "锁拆得比不变量更细，跨桶操作观察到半更新。",
    evidence: "锁域表、并发度与状态一致性。",
  },
  {
    label: "移动锁",
    mechanism: "hand-over-hand 先取得下一节点再释放当前节点。",
    failure: "释放当前锁后再找下一节点，节点可能被并发删除。",
    evidence: "节点寿命策略、锁序列与 sanitizer。",
  },
];

export function LockBasedStructuresLab() {
  return (
    <ChapterDecisionLab
      title="锁粒度、接口安全与并发数据结构"
      prompt="选择数据结构层级，比较粗粒度锁、分桶锁和逐节点锁的正确性边界。"
      stages={STAGES}
      conclusion="细粒度锁只有在不变量可以局部分解时才提高并发；接口、异常和节点寿命仍必须整体证明。"
    />
  );
}

export function LockBasedStructuresMechanismMap() {
  return (
    <ChapterMechanismMap
      title="锁粒度、接口安全与并发数据结构"
      stages={STAGES}
    />
  );
}

export function LockBasedStructuresFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="锁粒度、接口安全与并发数据结构"
      stages={STAGES}
    />
  );
}
