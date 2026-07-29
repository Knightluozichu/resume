"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: '为什么 C 的输入输出这么"啰嗦"？',
    mechanism:
      '想象你要给一个自动化仓库发指令："把一个红色盒子放到 3 号架第 2 层"。这条指令必须精确到每个细节——什么颜色、哪个架子、哪一层，错一个仓库机器人就放不对。',
    failure:
      '若只记语法而忽略「为什么 C 的输入输出这么"啰嗦"？」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。',
    evidence:
      '用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「为什么 C 的输入输出这么"啰嗦"？」的实际行为。',
  },
  {
    label: "C 字符串的本质——char 数组加一个看不见的尾巴",
    mechanism:
      "在 C 语言里没有独立的字符串类型。 字符串（string） 依赖末尾的 空字符（null character） \\0 判断结束。",
    failure:
      "若只记语法而忽略「C 字符串的本质——char 数组加一个看不见的尾巴」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「C 字符串的本质——char 数组加一个看不见的尾巴」的实际行为。",
  },
  {
    label: "动手：scanf 从键盘到变量的三步",
    mechanism:
      '猜一猜： scanf("%d %f", &n, &f); 输入 42 3.14 回车后， n 是 42、 f 是 3.14——但回车符去哪了？它留在输入缓冲区里了！通过下面 Stepper 一步步揭晓。',
    failure:
      "若只记语法而忽略「动手：scanf 从键盘到变量的三步」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「动手：scanf 从键盘到变量的三步」的实际行为。",
  },
];

export function StringsIoDecisionLab() {
  return (
    <ChapterDecisionLab
      title="字符串和格式化输入/输出：机制与证据"
      prompt="切换《字符串和格式化输入/输出》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《字符串和格式化输入/输出》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function StringsIoMechanismMap() {
  return (
    <ChapterMechanismMap
      title="字符串和格式化输入/输出：机制路径"
      stages={STAGES}
    />
  );
}

export function StringsIoFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="字符串和格式化输入/输出：失效与核验"
      stages={STAGES}
    />
  );
}
