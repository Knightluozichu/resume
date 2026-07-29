"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "编译前还有一道「改写」工序",
    mechanism:
      "你写的 .c 文件进入语法与类型分析前，会先经过 预处理器（preprocessor） 。它不是任意字符级“搜索替换”：源文件先经历字符映射、行拼接、注释替换和预处理记号划分，宏参数替换后还会按规则重扫。",
    failure:
      "若只记语法而忽略「编译前还有一道「改写」工序」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「编译前还有一道「改写」工序」的实际行为。",
  },
  {
    label: "预处理器在流水线中的位置",
    mechanism:
      "完整路径仍是：源码 → 预处理 → 编译 → 汇编 → 链接。本章聚焦第一道工位。",
    failure:
      "若只记语法而忽略「预处理器在流水线中的位置」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「预处理器在流水线中的位置」的实际行为。",
  },
  {
    label: "define：常量与宏",
    mechanism:
      "本节把「define：常量与宏」放回《C预处理器和C标准库》的输入、状态变化与输出路径中理解。",
    failure:
      "若只记语法而忽略「define：常量与宏」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「define：常量与宏」的实际行为。",
  },
];

export function PreprocessorDecisionLab() {
  return (
    <ChapterDecisionLab
      title="C预处理器和C标准库：机制与证据"
      prompt="切换《C预处理器和C标准库》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《C预处理器和C标准库》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function PreprocessorMechanismMap() {
  return (
    <ChapterMechanismMap title="C预处理器和C标准库：机制路径" stages={STAGES} />
  );
}

export function PreprocessorFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="C预处理器和C标准库：失效与核验"
      stages={STAGES}
    />
  );
}
