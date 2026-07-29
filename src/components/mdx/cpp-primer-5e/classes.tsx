"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "直觉：你的代码需要一张「零件图纸」",
    mechanism:
      "到目前为止，你一直在用 C++ 内置的类型—— int 、 double 、 string 、 vector 。但真实世界的软件里，数据从来不是孤立的——一本书有书名、销量和单价，一个学生有姓名、学号和成绩。这些数据天然应该捆在一起。",
    failure:
      "若把「直觉：你的代码需要一张「零件图纸」」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「直觉：你的代码需要一张「零件图纸」」的契约。",
  },
  {
    label: "类是什么：一张图纸 + 工厂",
    mechanism:
      "看上面的内存布局图——一个对象在内存中只是一块连续的数据区域。成员函数不占对象空间——它们的代码在另一块区域，所有同类的对象共享。",
    failure:
      "若把「类是什么：一张图纸 + 工厂」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「类是什么：一张图纸 + 工厂」的契约。",
  },
  {
    label: "访问控制：谁可以碰我的数据？",
    mechanism:
      "上一节看到数据存在对象里——那外部代码能不能直接读写这些数据？如果能，调用方就可能绕过你的规则乱改——比如把收入设成负数。C++ 用 访问控制（access control） 解决这个问题。",
    failure:
      "若把「访问控制：谁可以碰我的数据？」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「访问控制：谁可以碰我的数据？」的契约。",
  },
];

export function ClassesDecisionLab() {
  return (
    <ChapterDecisionLab
      title="类：机制与证据"
      prompt="切换《类》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《类》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function ClassesMechanismMap() {
  return <ChapterMechanismMap title="类：机制路径" stages={STAGES} />;
}

export function ClassesFailureDiagram() {
  return <ChapterFailureMatrix title="类：失效与核验" stages={STAGES} />;
}
