"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么要把多种数据「绑」在一起？",
    mechanism:
      "程序里常要描述 一个整体 ：一本书有书名、价格、页数；一名学生有学号、姓名、成绩。若用三个互不相关的变量，容易传参漏项、排序时对不齐。",
    failure:
      "若只记语法而忽略「为什么要把多种数据「绑」在一起？」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「为什么要把多种数据「绑」在一起？」的实际行为。",
  },
  {
    label: "定义 struct 与成员访问",
    mechanism:
      'struct book novel = .title = "C Primer Plus", .price = 29.9f, .pages = 720 ;',
    failure:
      "若只记语法而忽略「定义 struct 与成员访问」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「定义 struct 与成员访问」的实际行为。",
  },
  {
    label: "结构体数组",
    mechanism:
      "若 sizeof(struct book) 为 52，则 shelf[1] 的起始地址比 shelf[0] 大 52 字节。这与「数组元素等宽连续」的规则一致，只是元素类型变「宽」了。",
    failure:
      "若只记语法而忽略「结构体数组」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「结构体数组」的实际行为。",
  },
];

export function StructuresDecisionLab() {
  return (
    <ChapterDecisionLab
      title="结构和其他数据形式：机制与证据"
      prompt="切换《结构和其他数据形式》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《结构和其他数据形式》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function StructuresMechanismMap() {
  return (
    <ChapterMechanismMap title="结构和其他数据形式：机制路径" stages={STAGES} />
  );
}

export function StructuresFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="结构和其他数据形式：失效与核验"
      stages={STAGES}
    />
  );
}
