"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从framework因果链开始",
    mechanism:
      "Android API只是入口。在《第11章 Android的线程和线程池》中，每个实验先找 生命周期所有者 ，再画“应用调用 → framework代理 → Binder或消息队列 → 系统/目标对象 → 回调”的链路。",
    failure:
      "若分析「从framework因果链开始」时只停留在 API 调用而不追踪 framework、Binder/消息、目标对象和生命周期回调，表面成功会掩盖跨线程或进程状态错误。",
    evidence:
      "固定 Android 5.0/Java 基线，沿源码与运行链追踪「从framework因果链开始」，保存 PID/TID、对象或 token、状态前后值、最终行为及一个故障注入。",
  },
  {
    label: "最小可执行切片",
    mechanism:
      "在《第11章 Android的线程和线程池》中，下面的Java片段只抓住本章核心合同。先预测线程、状态和失败，再在匹配Android 5.0语境的样例工程中运行；代码所依赖的上下文和导入应在工程中显式声明。",
    failure:
      "若分析「最小可执行切片」时只停留在 API 调用而不追踪 framework、Binder/消息、目标对象和生命周期回调，表面成功会掩盖跨线程或进程状态错误。",
    evidence:
      "固定 Android 5.0/Java 基线，沿源码与运行链追踪「最小可执行切片」，保存 PID/TID、对象或 token、状态前后值、最终行为及一个故障注入。",
  },
  {
    label: "层源码与故障证明",
    mechanism:
      "在《第11章 Android的线程和线程池》中， 调用层。 从“第11章 Android的线程和线程池”选择一次入口，写出应用对象、framework代理、系统服务或目标组件以及返回路径。对源码分析，记录Android版本、类名、方法与关键分支；对应用实验，记录用户动作、Intent或消息标识。先解释谁创建工作、谁持有引用、谁负责结束，再谈API细节。",
    failure:
      "若分析「层源码与故障证明」时只停留在 API 调用而不追踪 framework、Binder/消息、目标对象和生命周期回调，表面成功会掩盖跨线程或进程状态错误。",
    evidence:
      "固定 Android 5.0/Java 基线，沿源码与运行链追踪「层源码与故障证明」，保存 PID/TID、对象或 token、状态前后值、最终行为及一个故障注入。",
  },
];

export function Adae1511ThreadsPoolsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第11章 Android的线程和线程池：机制与证据"
      prompt="切换《第11章 Android的线程和线程池》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第11章 Android的线程和线程池》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function Adae1511ThreadsPoolsMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第11章 Android的线程和线程池：机制路径"
      stages={STAGES}
    />
  );
}

export function Adae1511ThreadsPoolsFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第11章 Android的线程和线程池：失效与核验"
      stages={STAGES}
    />
  );
}
