"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么总复习必须让15章作用于同一个系统",
    mechanism:
      "能解释generic variance不代表会设计跨assembly SDK；知道LINQ deferred execution不代表会管理DbContext lifetime；会写async method不代表理解generated state、context和cleanup；会用Span不代表能…",
    failure:
      "若解释「为什么总复习必须让15章作用于同一个系统」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「为什么总复习必须让15章作用于同一个系统」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
  {
    label: "第一轮：按四个Part扫描系统",
    mechanism:
      "先记录language version、compiler SDK、target runtime/BCL与consumer matrix。一个feature“不工作”必须定位到parser/type checker、lowering、runtime capability还是library surfac…",
    failure:
      "若解释「第一轮：按四个Part扫描系统」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「第一轮：按四个Part扫描系统」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
  {
    label: "第二轮：沿四条Contract Chain追踪",
    mechanism:
      "External input先进入typed adapter，经generic constraints/inference/variance，到LINQ expression或dynamic boundary，再进入tuple/pattern和nullable reference contract。",
    failure:
      "若解释「第二轮：沿四条Contract Chain追踪」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「第二轮：沿四条Contract Chain追踪」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
];

export function DcsFinalReviewDecisionLab() {
  return (
    <ChapterDecisionLab
      title="C# in Depth 第四版总复习：15章整书验收：机制与证据"
      prompt="切换《C# in Depth 第四版总复习：15章整书验收》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《C# in Depth 第四版总复习：15章整书验收》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function DcsFinalReviewMechanismMap() {
  return (
    <ChapterMechanismMap
      title="C# in Depth 第四版总复习：15章整书验收：机制路径"
      stages={STAGES}
    />
  );
}

export function DcsFinalReviewFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="C# in Depth 第四版总复习：15章整书验收：失效与核验"
      stages={STAGES}
    />
  );
}
