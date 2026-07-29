"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么 Command 需要广义 callable",
    mechanism:
      "The Command Design Pattern 把“请求”封装成对象，使 invoker 不依赖 receiver 的具体操作，并支持 queue、log、undo。经典 GoF 实现通常定义 Command::Execute() virtual interface，每个动作一个派生类。这解决耦合，却为简单函数也引入命名 class。",
    failure:
      "若只复制「为什么 Command 需要广义 callable」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「为什么 Command 需要广义 callable」的组合规则与扩展边界。",
  },
  {
    label: "C++ Callable Entities",
    mechanism:
      "官方目录的 C++ Callable Entities 包括普通函数、函数指针、重载函数、pointer to member function、拥有 operator() 的 function object，以及现代 lambda。它们的 concrete types、存储和调用语法不同，却可以共享相同有效 signature。",
    failure:
      "若只复制「C++ Callable Entities」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「C++ Callable Entities」的组合规则与扩展边界。",
  },
  {
    label: "The Functor Class Template Sk…",
    mechanism:
      "The Functor Class Template Skeleton 对外是 value-like Functor ，内部持有 abstract FunctorImpl 。旧书用 Typelist 表示参数；现代可用 template class Function 对函数类型 partial-specialize，或直接用 R, Args...",
    failure:
      "若只复制「The Functor Class Template Sk…」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「The Functor Class Template Sk…」的组合规则与扩展边界。",
  },
];

export function GeneralizedFunctorsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第5章：广义仿函数：机制与证据"
      prompt="切换《第5章：广义仿函数》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第5章：广义仿函数》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function GeneralizedFunctorsMechanismMap() {
  return (
    <ChapterMechanismMap title="第5章：广义仿函数：机制路径" stages={STAGES} />
  );
}

export function GeneralizedFunctorsFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第5章：广义仿函数：失效与核验"
      stages={STAGES}
    />
  );
}
