"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么变量「活多久」和「谁能看见」要分开想？",
    mechanism:
      "写程序时，你声明一个名字，编译器要回答两件事：这块内存 放在哪 （栈？堆？静态区？），以及这个名字 谁能用 （只在当前 里？整个文件？整个程序？）。",
    failure:
      "若只记语法而忽略「为什么变量「活多久」和「谁能看见」要分开想？」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「为什么变量「活多久」和「谁能看见」要分开想？」的实际行为。",
  },
  {
    label: "存储类：不要与作用域、链接、存储期混成一件事",
    mechanism:
      "C11 的存储类说明符包括 typedef 、 extern 、 static 、 Thread local 、 auto 、 register 。",
    failure:
      "若只记语法而忽略「存储类：不要与作用域、链接、存储期混成一件事」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「存储类：不要与作用域、链接、存储期混成一件事」的实际行为。",
  },
  {
    label: "链接：谁能跨文件看见这个名字",
    mechanism:
      "头文件惯用法： extern int foo; 放 .h ； int foo = 0; 只在一个 .c 里定义，避免重复定义链接错误。",
    failure:
      "若只记语法而忽略「链接：谁能跨文件看见这个名字」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「链接：谁能跨文件看见这个名字」的实际行为。",
  },
];

export function StorageLinkageMemoryDecisionLab() {
  return (
    <ChapterDecisionLab
      title="存储类、链接和内存管理：机制与证据"
      prompt="切换《存储类、链接和内存管理》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《存储类、链接和内存管理》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function StorageLinkageMemoryMechanismMap() {
  return (
    <ChapterMechanismMap
      title="存储类、链接和内存管理：机制路径"
      stages={STAGES}
    />
  );
}

export function StorageLinkageMemoryFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="存储类、链接和内存管理：失效与核验"
      stages={STAGES}
    />
  );
}
