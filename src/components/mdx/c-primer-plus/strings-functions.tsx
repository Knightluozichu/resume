"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么需要专门的「字符串函数」？",
    mechanism:
      "上一章你已经知道：C 里没有 string 类型，文本就是 字符数组（character array） 。但「知道地址从哪开始」还不够——你还得知道「到哪结束」。",
    failure:
      "若只记语法而忽略「为什么需要专门的「字符串函数」？」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「为什么需要专门的「字符串函数」？」的实际行为。",
  },
  {
    label: "字符串表示：可见字符 + 看不见的 \\0",
    mechanism:
      "编译器放入 4 个字符： C 、 a 、 t 、 \\0 。数组总长 10，剩余 6 个字节自动填 \\0 （若未初始化则内容不确定，但字符串有效部分仍到第一个 \\0 为止）。",
    failure:
      "若只记语法而忽略「字符串表示：可见字符 + 看不见的 \\0」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「字符串表示：可见字符 + 看不见的 \\0」的实际行为。",
  },
  {
    label: "string.h 四大基础函数",
    mechanism:
      "参数必须是 以 \\0 结尾 的有效字符串。若数组中间没有 \\0 ， strlen 会一直往后读——危险。",
    failure:
      "若只记语法而忽略「string.h 四大基础函数」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「string.h 四大基础函数」的实际行为。",
  },
];

export function StringsFunctionsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="字符串和字符串函数：机制与证据"
      prompt="切换《字符串和字符串函数》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《字符串和字符串函数》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function StringsFunctionsMechanismMap() {
  return (
    <ChapterMechanismMap title="字符串和字符串函数：机制路径" stages={STAGES} />
  );
}

export function StringsFunctionsFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="字符串和字符串函数：失效与核验"
      stages={STAGES}
    />
  );
}
