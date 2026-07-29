"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "直觉：让你的类用起来像内置类型",
    mechanism:
      "你写 int a = 3 + 5; 、 cout << 42; 、 if (x == y) 时，这些 + << == 符号背后是语言内置的一套规则——编译器知道 int 和 int 怎么加、 int 和 ostream 怎么输出。现在你要写自己的类了—— SalesData 、 Complex 、 …",
    failure:
      "若把「直觉：让你的类用起来像内置类型」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「直觉：让你的类用起来像内置类型」的契约。",
  },
  {
    label: "官方 Chapter 14 的运算符与转换契约",
    mechanism:
      "重载只改变“某个既有运算符遇到类类型时调用哪个函数”，不会改变语法。至少一个操作数必须是类或枚举类型；不能发明新符号，也不能改变操作数个数、优先级或结合性。",
    failure:
      "若把「官方 Chapter 14 的运算符与转换契约」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「官方 Chapter 14 的运算符与转换契约」的契约。",
  },
  {
    label: "运算符重载的基本规则：成员还是普通函数？",
    mechanism:
      "当你写 a + b 时，编译器把它翻译成两种等价形式之一：① a.operator+(b) （成员函数形式）；② operator+(a, b) （非成员函数形式）。这两条背后是 运算符重载（operator overloading） ——只是语法糖，背后就是一个普通的函数调用。",
    failure:
      "若把「运算符重载的基本规则：成员还是普通函数？」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「运算符重载的基本规则：成员还是普通函数？」的契约。",
  },
];

export function OverloadedOperationsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="重载运算与类型转换：机制与证据"
      prompt="切换《重载运算与类型转换》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《重载运算与类型转换》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function OverloadedOperationsMechanismMap() {
  return (
    <ChapterMechanismMap title="重载运算与类型转换：机制路径" stages={STAGES} />
  );
}

export function OverloadedOperationsFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="重载运算与类型转换：失效与核验"
      stages={STAGES}
    />
  );
}
