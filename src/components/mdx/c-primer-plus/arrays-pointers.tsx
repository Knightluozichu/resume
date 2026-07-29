"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么需要「数组」和「指针」？",
    mechanism:
      "想象一排带编号的小抽屉：第 0 格放周一温度，第 1 格放周二……你要算一周平均，就得依次打开每一格。如果给每个温度单独起名 mon 、 tue ……变量名会爆炸，代码也无法用循环处理「第 i 个」。",
    failure:
      "若只记语法而忽略「为什么需要「数组」和「指针」？」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「为什么需要「数组」和「指针」？」的实际行为。",
  },
  {
    label: "维数组：连续内存里的一排元素",
    mechanism:
      "scores[5] 表示 5 个 int 占一段 连续 内存。合法下标是 0 到 4 ——访问 scores[5] 已越界，行为未定义（可能崩溃、可能看似正常）。",
    failure:
      "若只记语法而忽略「维数组：连续内存里的一排元素」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「维数组：连续内存里的一排元素」的实际行为。",
  },
  {
    label: "指针基础：地址、解引用、取地址",
    mechanism:
      "指针也有类型： int p 是“指向 int 的指针”，可保存有效 int 对象地址、同一数组的尾后地址或空指针值；只有指向有效对象时才能解引用。",
    failure:
      "若只记语法而忽略「指针基础：地址、解引用、取地址」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「指针基础：地址、解引用、取地址」的实际行为。",
  },
];

export function ArraysPointersDecisionLab() {
  return (
    <ChapterDecisionLab
      title="数组和指针：机制与证据"
      prompt="切换《数组和指针》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《数组和指针》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function ArraysPointersMechanismMap() {
  return <ChapterMechanismMap title="数组和指针：机制路径" stages={STAGES} />;
}

export function ArraysPointersFailureDiagram() {
  return (
    <ChapterFailureMatrix title="数组和指针：失效与核验" stages={STAGES} />
  );
}
