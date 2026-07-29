"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从“有一块内存”不等于“有一个对象”开始",
    mechanism:
      "runtime semantics 要区分 storage、lifetime 和 expression result。先预测 malloc(sizeof(T)) 返回后 T 的 constructor 是否已经运行：没有。storage 只是可放 bytes 的区域；只有正确 initializat…",
    failure:
      "若只从源码表面理解「从“有一块内存”不等于“有一个对象”开始」，忽略编译器生成布局、调用约定和生命周期代码，调试时就会把实现机制误当成语言承诺。",
    evidence:
      "用对象大小、成员地址、反汇编或构造析构轨迹核对「从“有一块内存”不等于“有一个对象”开始」，并区分标准语义与当前 ABI 实现。",
  },
  {
    label: "1 Object Construction and Des…",
    mechanism:
      "global object 先经历 zero/constant initialization 能做的部分，再按规则执行 dynamic initialization。相同 translation unit 内有较强的顺序关系，跨 translation units 的动态初始化依赖可能不确定，形成 …",
    failure:
      "若只从源码表面理解「1 Object Construction and Des…」，忽略编译器生成布局、调用约定和生命周期代码，调试时就会把实现机制误当成语言承诺。",
    evidence:
      "用对象大小、成员地址、反汇编或构造析构轨迹核对「1 Object Construction and Des…」，并区分标准语义与当前 ABI 实现。",
  },
  {
    label: "2 Operators new and delete",
    mechanism:
      "new T(args) 先调用适用 operator new 取得 aligned storage，再在其中构造 T。constructor 抛出时，language 寻找 matching deallocation function 回收 storage。",
    failure:
      "若只从源码表面理解「2 Operators new and delete」，忽略编译器生成布局、调用约定和生命周期代码，调试时就会把实现机制误当成语言承诺。",
    evidence:
      "用对象大小、成员地址、反汇编或构造析构轨迹核对「2 Operators new and delete」，并区分标准语义与当前 ABI 实现。",
  },
];

export function RuntimeSemanticsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第6章：运行期语义：机制与证据"
      prompt="切换《第6章：运行期语义》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第6章：运行期语义》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function RuntimeSemanticsMechanismMap() {
  return (
    <ChapterMechanismMap title="第6章：运行期语义：机制路径" stages={STAGES} />
  );
}

export function RuntimeSemanticsFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第6章：运行期语义：失效与核验"
      stages={STAGES}
    />
  );
}
