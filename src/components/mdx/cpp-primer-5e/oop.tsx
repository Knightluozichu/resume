"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "直觉：一模多型，从一张图纸到一整条产品线",
    mechanism:
      '你已经学会了设计一个类——封装数据、定义接口、管理资源。但现在遇到一个新问题：你的书店系统里有普通书籍，还有批量折扣书、限量版精装书——它们都是"书"，有很多共性，但计算价格的方式各不相同。你不想写三个几乎一模一样的类，然后把 if (type == BULK) ...',
    failure:
      "若把「直觉：一模多型，从一张图纸到一整条产品线」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「直觉：一模多型，从一张图纸到一整条产品线」的契约。",
  },
  {
    label: "官方 Chapter 15 的完整继承契约",
    mechanism:
      "继承体系不仅是“virtual 调到派生版本”。访问控制决定向上转换是否可见，类作用域决定候选名字能否进入重载集，构造与拷贝控制维护每层子对象，容器则必须保存多态所有者而不是发生对象切片。",
    failure:
      "若把「官方 Chapter 15 的完整继承契约」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「官方 Chapter 15 的完整继承契约」的契约。",
  },
  {
    label: "继承：用已有的类定义新类",
    mechanism:
      '这行代码声明了三件事：① Bulk quote 是一种 Quote （IS-A 关系）；② Bulk quote 自动获得了 Quote 的全部成员——数据成员和函数成员都"继承"下来了；③ public 继承意味着基类的 public 成员在派生类中仍是 public——用户代码可以通过 Bulk quote 对象直接调用继承来的 isbn() 等接口。',
    failure:
      "若把「继承：用已有的类定义新类」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「继承：用已有的类定义新类」的契约。",
  },
];

export function OopDecisionLab() {
  return (
    <ChapterDecisionLab
      title="面向对象程序设计：机制与证据"
      prompt="切换《面向对象程序设计》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《面向对象程序设计》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function OopMechanismMap() {
  return (
    <ChapterMechanismMap title="面向对象程序设计：机制路径" stages={STAGES} />
  );
}

export function OopFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="面向对象程序设计：失效与核验"
      stages={STAGES}
    />
  );
}
