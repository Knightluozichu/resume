"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么小对象会放大分配成本",
    mechanism:
      "The Default Free Store Allocator 必须服务几乎所有请求：尺寸从数 byte 到数 GiB，分配/释放次序未知，多线程并发，alignment 不同，还要处理 fragmentation、metadata、错误与回收。这个通用性非常有价值，但每次请求的固定工作对 12-…",
    failure:
      "若只复制「为什么小对象会放大分配成本」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「为什么小对象会放大分配成本」的组合规则与扩展边界。",
  },
  {
    label: "The Workings of a Memory Allo…",
    mechanism:
      "The Workings of a Memory Allocator 可以拆成三层：向 OS 取得较大 region；把 region 切成可服务的 blocks；用 free structure 查找、split、coalesce 并记录 ownership。general allocator 要…",
    failure:
      "若只复制「The Workings of a Memory Allo…」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「The Workings of a Memory Allo…」的组合规则与扩展边界。",
  },
  {
    label: "A Small-Object Allocator",
    mechanism:
      "A Small-Object Allocator 利用请求集中在有限小尺寸这一事实：为每个 block size 建专用 pool，一次申请较大连续区域，再切成同样大小的 blocks。固定大小后无需 best-fit 搜索，也无需在每个 block 记录 size。",
    failure:
      "若只复制「A Small-Object Allocator」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「A Small-Object Allocator」的组合规则与扩展边界。",
  },
];

export function SmallObjectAllocationDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第4章：小对象分配：机制与证据"
      prompt="切换《第4章：小对象分配》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第4章：小对象分配》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function SmallObjectAllocationMechanismMap() {
  return (
    <ChapterMechanismMap title="第4章：小对象分配：机制路径" stages={STAGES} />
  );
}

export function SmallObjectAllocationFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第4章：小对象分配：失效与核验"
      stages={STAGES}
    />
  );
}
