"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么要在「位」这一层思考？",
    mechanism:
      "程序里的 int flags 看起来是一个整数，但在 CPU 和硬件寄存器里，它是一串 0/1 位 。嵌入式驱动要读「第 3 位是否为 1」、网络协议要把多个小标志塞进 2 字节、权限系统要用一个 unsigned 同时表示读/写/执行——这些都离不开 按位操作 。",
    failure:
      "若只记语法而忽略「为什么要在「位」这一层思考？」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「为什么要在「位」这一层思考？」的实际行为。",
  },
  {
    label: "多种进制：同一数值的不同写法",
    mechanism:
      "日常用 十进制 ；硬件与调试更常用 二进制 、 八进制 、 十六进制 ——它们都是同一整数的不同 书写方式 ，不是不同数值。",
    failure:
      "若只记语法而忽略「多种进制：同一数值的不同写法」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「多种进制：同一数值的不同写法」的实际行为。",
  },
  {
    label: "按位运算符：& ^ ~",
    mechanism:
      "注意： 按位 & 与逻辑 && 不同 。 a & b 对每一位运算； a && b 只看「是否为 0」，且会短路。标志位操作几乎总是用 unsigned 配合按位运算符。",
    failure:
      "若只记语法而忽略「按位运算符：& ^ ~」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「按位运算符：& ^ ~」的实际行为。",
  },
];

export function BitFiddlingDecisionLab() {
  return (
    <ChapterDecisionLab
      title="位操作：机制与证据"
      prompt="切换《位操作》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《位操作》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function BitFiddlingMechanismMap() {
  return <ChapterMechanismMap title="位操作：机制路径" stages={STAGES} />;
}

export function BitFiddlingFailureDiagram() {
  return <ChapterFailureMatrix title="位操作：失效与核验" stages={STAGES} />;
}
