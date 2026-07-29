"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么 scanf 有时「不吃」你刚打的字？",
    mechanism:
      "想象快递柜取件：你输入取件码 42 然后按确认，柜门只认数字部分， 确认键的「咔嗒」还留在槽里没清走 。下一次有人来取件，柜门先把上次残留的「咔嗒」当输入处理了——你以为程序在等你打字，其实它早就读到了一个看不见的换行符。",
    failure:
      "若只记语法而忽略「为什么 scanf 有时「不吃」你刚打的字？」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「为什么 scanf 有时「不吃」你刚打的字？」的实际行为。",
  },
  {
    label: "getchar 与 putchar：一次只搬一个字符",
    mechanism:
      'printf("输入字符（Ctrl+D 结束）:\\n"); while ((ch = getchar()) != EOF) putchar(ch); / 原样回显 / return 0;',
    failure:
      "若只记语法而忽略「getchar 与 putchar：一次只搬一个字符」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「getchar 与 putchar：一次只搬一个字符」的实际行为。",
  },
  {
    label: "文件流和键盘输入：标准流与重定向",
    mechanism:
      "C 程序面对的是 流（stream） ，不是直接面对键盘或磁盘。程序启动时已有 stdin 、 stdout 、 stderr 三个标准文本流； fopen 则返回指向其他 FILE 对象的指针。",
    failure:
      "若只记语法而忽略「文件流和键盘输入：标准流与重定向」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「文件流和键盘输入：标准流与重定向」的实际行为。",
  },
];

export function CharIoValidationDecisionLab() {
  return (
    <ChapterDecisionLab
      title="字符I/O与输入验证：机制与证据"
      prompt="切换《字符I/O与输入验证》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《字符I/O与输入验证》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function CharIoValidationMechanismMap() {
  return (
    <ChapterMechanismMap title="字符I/O与输入验证：机制路径" stages={STAGES} />
  );
}

export function CharIoValidationFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="字符I/O与输入验证：失效与核验"
      stages={STAGES}
    />
  );
}
