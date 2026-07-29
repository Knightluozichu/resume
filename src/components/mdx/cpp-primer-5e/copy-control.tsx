"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "直觉：对象拷贝时，到底发生了什么？",
    mechanism:
      "你已经习惯写 auto b = a; 把 a 的值拷贝给 b 。对于 int 、 double 这些简单类型，拷贝就是复制那几个字节——干净利落。但现在你开始设计自己的类了——里面可能有指向堆内存的指针、有文件句柄、有网络连接——这时候 auto b = a; 到底该干什么？",
    failure:
      "若把「直觉：对象拷贝时，到底发生了什么？」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「直觉：对象拷贝时，到底发生了什么？」的契约。",
  },
  {
    label: "官方 Chapter 13 的生成规则与值语义契约",
    mechanism:
      "五个特殊成员不是彼此独立的开关。用户声明其中一些成员会抑制另一些成员的隐式生成，成员或基类不可执行某操作时，对应合成函数还可能被定义为 deleted。设计类时应先决定它表现得像值、像共享句柄，还是不可复制资源，再决定 = default 、 = delete 或自定义实现。",
    failure:
      "若把「官方 Chapter 13 的生成规则与值语义契约」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「官方 Chapter 13 的生成规则与值语义契约」的契约。",
  },
  {
    label: "合成的拷贝：编译器替你做了什么",
    mechanism:
      "如果你不为类定义拷贝构造函数和拷贝赋值运算符，编译器可能隐式声明并合成它们，也可能因成员或其他特殊成员规则将其定义为 deleted。",
    failure:
      "若把「合成的拷贝：编译器替你做了什么」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「合成的拷贝：编译器替你做了什么」的契约。",
  },
];

export function CopyControlDecisionLab() {
  return (
    <ChapterDecisionLab
      title="拷贝控制：机制与证据"
      prompt="切换《拷贝控制》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《拷贝控制》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function CopyControlMechanismMap() {
  return <ChapterMechanismMap title="拷贝控制：机制路径" stages={STAGES} />;
}

export function CopyControlFailureDiagram() {
  return <ChapterFailureMatrix title="拷贝控制：失效与核验" stages={STAGES} />;
}
