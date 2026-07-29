"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从“语法背后留下什么”开始",
    mechanism:
      "《Inside the C++ Object Model》不是一本重讲 class syntax 的书。它追问 class 、inheritance、virtual、constructor、template、exception 和 RTTI 被 compiler 接受后，object bytes、h…",
    failure:
      "若只从源码表面理解「从“语法背后留下什么”开始」，忽略编译器生成布局、调用约定和生命周期代码，调试时就会把实现机制误当成语言承诺。",
    evidence:
      "用对象大小、成员地址、反汇编或构造析构轨迹核对「从“语法背后留下什么”开始」，并区分标准语义与当前 ABI 实现。",
  },
  {
    label: "官方第一版七章路线",
    mechanism:
      "建立全书 vocabulary：simple、table-driven 与 prevailing C++ model；encapsulation 是否改变 layout；base subobject 如何加入； struct/class 的真实差异；pointer static type 与 obj…",
    failure:
      "若只从源码表面理解「官方第一版七章路线」，忽略编译器生成布局、调用约定和生命周期代码，调试时就会把实现机制误当成语言承诺。",
    evidence:
      "用对象大小、成员地址、反汇编或构造析构轨迹核对「官方第一版七章路线」，并区分标准语义与当前 ABI 实现。",
  },
  {
    label: "层机制依赖",
    mechanism:
      "第 1/3 章提供 representation，第 2/4 章把 source operations lower 到这份 representation，第 5/6 章规定 representation 在何时有效、复制和撤销，第 7 章才使用 compile/runtime metadata 做更…",
    failure:
      "若只从源码表面理解「层机制依赖」，忽略编译器生成布局、调用约定和生命周期代码，调试时就会把实现机制误当成语言承诺。",
    evidence:
      "用对象大小、成员地址、反汇编或构造析构轨迹核对「层机制依赖」，并区分标准语义与当前 ABI 实现。",
  },
];

export function LearningMapDecisionLab() {
  return (
    <ChapterDecisionLab
      title="深度探索 C++ 对象模型：官方七章学习地图：机制与证据"
      prompt="切换《深度探索 C++ 对象模型：官方七章学习地图》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《深度探索 C++ 对象模型：官方七章学习地图》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function LearningMapMechanismMap() {
  return (
    <ChapterMechanismMap
      title="深度探索 C++ 对象模型：官方七章学习地图：机制路径"
      stages={STAGES}
    />
  );
}

export function LearningMapFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="深度探索 C++ 对象模型：官方七章学习地图：失效与核验"
      stages={STAGES}
    />
  );
}
