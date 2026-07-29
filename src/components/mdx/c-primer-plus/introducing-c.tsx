"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "你写的代码，是怎么变成电脑能跑的程序的？",
    mechanism:
      "上一章你看到了整条工厂流水线的全貌：四道工位把 .c 加工成可执行文件。这一章，我们走进流水线的 第一道工序 ——你敲的是什么？",
    failure:
      "若只记语法而忽略「你写的代码，是怎么变成电脑能跑的程序的？」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「你写的代码，是怎么变成电脑能跑的程序的？」的实际行为。",
  },
  {
    label: "最小 C 程序的结构解剖",
    mechanism:
      "把你看到的第一个 C 程序拿出来，逐段标清楚：头文件是干什么的、main 函数什么角色、花括号管哪块、 printf 怎么输出、 return 给谁看。",
    failure:
      "若只记语法而忽略「最小 C 程序的结构解剖」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「最小 C 程序的结构解剖」的实际行为。",
  },
  {
    label: "动手：把两个 .c 文件编译成一个可执行文件",
    mechanism:
      "真实项目里，你不会把所有代码塞进一个大文件——你得拆成多个 .c ，每个负责一块功能，最后拼起来。下面用 Stepper 一步步看这个「拆开→各编各的→拼起来」的过程。",
    failure:
      "若只记语法而忽略「动手：把两个 .c 文件编译成一个可执行文件」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「动手：把两个 .c 文件编译成一个可执行文件」的实际行为。",
  },
];

export function IntroducingCDecisionLab() {
  return (
    <ChapterDecisionLab
      title="C语言概述：机制与证据"
      prompt="切换《C语言概述》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《C语言概述》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function IntroducingCMechanismMap() {
  return <ChapterMechanismMap title="C语言概述：机制路径" stages={STAGES} />;
}

export function IntroducingCFailureDiagram() {
  return <ChapterFailureMatrix title="C语言概述：失效与核验" stages={STAGES} />;
}
