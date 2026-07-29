"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "可验收学习目标",
    mechanism:
      "首要陷阱是“只让示例App申请成功，未稳定公开API、生命周期、并发请求、拒绝分支、测试和仓库迁移”。先预测再运行；任何“能跑”结论都要经过生命周期、失败输入、安全、资源释放和目标SDK迁移检查。",
    failure:
      "若学习「可验收学习目标」只复制顺利路径代码而不处理权限、生命周期、线程、持久状态和资源释放，应用会在拒绝、旋转、进程重建或弱网时丢失行为。",
    evidence:
      "在 Android 10/Kotlin 基线上复现「可验收学习目标」，用正常、权限拒绝/弱网和组件重建样本核对界面状态、持久数据、线程与资源释放。",
  },
  {
    label: "先建立直觉",
    mechanism:
      "在《第16章 编写并发布一个开源库，PermissionX》中，先把 生命周期 看成系统与应用之间的时序合同，再把 版本边界 看成这份合同的坐标。API 名称只是入口；真正要追踪的是输入由谁接收、状态由谁保存、任务由谁取消，以及失败后用户看到什么。",
    failure:
      "若学习「先建立直觉」只复制顺利路径代码而不处理权限、生命周期、线程、持久状态和资源释放，应用会在拒绝、旋转、进程重建或弱网时丢失行为。",
    evidence:
      "在 Android 10/Kotlin 基线上复现「先建立直觉」，用正常、权限拒绝/弱网和组件重建样本核对界面状态、持久数据、线程与资源释放。",
  },
  {
    label: "最小可执行切片",
    mechanism:
      "fun reduce(state: UiState, event: UserEvent): UiState = nextState(state, event)",
    failure:
      "若学习「最小可执行切片」只复制顺利路径代码而不处理权限、生命周期、线程、持久状态和资源释放，应用会在拒绝、旋转、进程重建或弱网时丢失行为。",
    evidence:
      "在 Android 10/Kotlin 基线上复现「最小可执行切片」，用正常、权限拒绝/弱网和组件重建样本核对界面状态、持久数据、线程与资源释放。",
  },
];

export function Fla316PermissionxDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第16章 编写并发布一个开源库，PermissionX：机制与证据"
      prompt="切换《第16章 编写并发布一个开源库，PermissionX》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第16章 编写并发布一个开源库，PermissionX》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function Fla316PermissionxMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第16章 编写并发布一个开源库，PermissionX：机制路径"
      stages={STAGES}
    />
  );
}

export function Fla316PermissionxFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第16章 编写并发布一个开源库，PermissionX：失效与核验"
      stages={STAGES}
    />
  );
}
