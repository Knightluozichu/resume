"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么你敲的代码，电脑能看懂？",
    mechanism:
      "你打开编辑器、敲了几行代码、点了运行，屏幕上就出现了一行字。这中间其实经过了一条 工厂流水线 ——你的代码是「原料」，经过好几道工位一道道加工，最后从流水线另一头出来一个能直接运行的「成品」。",
    failure:
      "若只记语法而忽略「为什么你敲的代码，电脑能看懂？」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「为什么你敲的代码，电脑能看懂？」的实际行为。",
  },
  {
    label: "C 语言从哪来？",
    mechanism:
      '在你动手写第一条 C 代码之前，先花几分钟看看这门语言是怎么来的——它对理解 C 语言"长什么样"很有帮助。',
    failure:
      "若只记语法而忽略「C 语言从哪来？」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「C 语言从哪来？」的实际行为。",
  },
  {
    label: "动手：一步步走完编程的全过程",
    mechanism:
      "现在你知道了 C 语言怎么来、代码怎么变程序。下面跟着这条七步流水线，一步步看「编程」这件事到底从哪开始、到哪结束—— 每切一步，上面的循环图都会高亮当前这一步，下方说明这一步具体干什么 。",
    failure:
      "若只记语法而忽略「动手：一步步走完编程的全过程」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「动手：一步步走完编程的全过程」的实际行为。",
  },
];

export function GettingReadyDecisionLab() {
  return (
    <ChapterDecisionLab
      title="初识C语言：机制与证据"
      prompt="切换《初识C语言》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《初识C语言》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function GettingReadyMechanismMap() {
  return <ChapterMechanismMap title="初识C语言：机制路径" stages={STAGES} />;
}

export function GettingReadyFailureDiagram() {
  return <ChapterFailureMatrix title="初识C语言：失效与核验" stages={STAGES} />;
}
