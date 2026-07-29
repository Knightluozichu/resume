"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么程序需要「文件」？",
    mechanism:
      "printf 把字打到屏幕， scanf 从键盘读——程序一结束，数据就没了。要把成绩表、配置、游戏存档留下来，就得写到 磁盘文件 ，下次再读回来。",
    failure:
      "若只记语法而忽略「为什么程序需要「文件」？」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「为什么程序需要「文件」？」的实际行为。",
  },
  {
    label: "fopen 与 fclose：打开与关闭",
    mechanism:
      'FILE fp = fopen("scores.txt", "w"); if (fp == NULL) perror("scores.txt"); return 1; / 使用 fp ...',
    failure:
      "若只记语法而忽略「fopen 与 fclose：打开与关闭」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「fopen 与 fclose：打开与关闭」的实际行为。",
  },
  {
    label: "标准流程：打开 → 读写 → 检查 → 关闭",
    mechanism:
      "本节把「标准流程：打开 → 读写 → 检查 → 关闭」放回《文件输入/输出》的输入、状态变化与输出路径中理解。",
    failure:
      "若只记语法而忽略「标准流程：打开 → 读写 → 检查 → 关闭」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「标准流程：打开 → 读写 → 检查 → 关闭」的实际行为。",
  },
];

export function FileIoDecisionLab() {
  return (
    <ChapterDecisionLab
      title="文件输入/输出：机制与证据"
      prompt="切换《文件输入/输出》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《文件输入/输出》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function FileIoMechanismMap() {
  return (
    <ChapterMechanismMap title="文件输入/输出：机制路径" stages={STAGES} />
  );
}

export function FileIoFailureDiagram() {
  return (
    <ChapterFailureMatrix title="文件输入/输出：失效与核验" stages={STAGES} />
  );
}
