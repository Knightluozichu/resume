"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从版本与断点开始",
    mechanism:
      "在《第6章 进程间通信——Binder》中， 源码版本卡 、 调用链 、 资源所有权 、 证据断点 、 迁移账本 构成本页的分析协议。先预测入口会跨过哪些线程、进程、语言、驱动或硬件抽象边界，再在每个边界保存身份和输入输出；没有标签与证据断点的流程图不能复查。",
    failure:
      "若研究「从版本与断点开始」时混用 AOSP 版本、只画静态类图或遗漏线程进程与资源所有权，得到的调用链无法在单一构建上复现。",
    evidence:
      "锁定 Android 4.3 标签与产品目标追踪「从版本与断点开始」，保存源码符号、PID/TID、对象/缓冲区身份、正常与失败断点、产物哈希及最终释放结果。",
  },
  {
    label: "证据解释",
    mechanism:
      "在《第6章 进程间通信——Binder》中，第一份证据是版本证据：AOSP标签、repo manifest、主机工具链、产品目标和产物哈希必须同时保存。Android源码长期重构，同名类和服务在不同分支可能承担不同职责；跨版本拼接得到的“完整流程”实际上无法编译，也无法在单一设备上运行。",
    failure:
      "若研究「证据解释」时混用 AOSP 版本、只画静态类图或遗漏线程进程与资源所有权，得到的调用链无法在单一构建上复现。",
    evidence:
      "锁定 Android 4.3 标签与产品目标追踪「证据解释」，保存源码符号、PID/TID、对象/缓冲区身份、正常与失败断点、产物哈希及最终释放结果。",
  },
  {
    label: "本章回顾",
    mechanism:
      "从一次真实输入开始，依次回答源码属于哪个标签、入口在哪里、跨过哪些边界、每层保存什么状态、错误如何返回、资源由谁释放。再用sp/wp引用计数、Parcel边界、binder open/mmap/ioctl、事务码、线程池与死亡通知重放；无法在单一版本复现的结论退回研究阶段。",
    failure:
      "若研究「本章回顾」时混用 AOSP 版本、只画静态类图或遗漏线程进程与资源所有权，得到的调用链无法在单一构建上复现。",
    evidence:
      "锁定 Android 4.3 标签与产品目标追踪「本章回顾」，保存源码符号、PID/TID、对象/缓冲区身份、正常与失败断点、产物哈希及最终释放结果。",
  },
];

export function Dak1406BinderDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第6章 进程间通信——Binder：机制与证据"
      prompt="切换《第6章 进程间通信——Binder》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第6章 进程间通信——Binder》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function Dak1406BinderMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第6章 进程间通信——Binder：机制路径"
      stages={STAGES}
    />
  );
}

export function Dak1406BinderFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第6章 进程间通信——Binder：失效与核验"
      stages={STAGES}
    />
  );
}
