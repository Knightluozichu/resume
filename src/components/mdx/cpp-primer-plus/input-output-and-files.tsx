"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么 I/O 的结果不只是“变量有了一个值”",
    mechanism:
      "一次流操作同时改变三样东西：目标值或输出字符、输入/输出位置、stream state。只检查变量会漏掉未消费分隔符、部分读取与失败后旧值；只检查 EOF 又会把格式错误误报成正常结束。可靠 I/O 让操作成功本身驱动控制流。",
    failure:
      "若只复述「为什么 I/O 的结果不只是“变量有了一个值”」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「为什么 I/O 的结果不只是“变量有了一个值”」的状态变化。",
  },
  {
    label: "formatted output 是类型值到字符表示的策略",
    mechanism:
      "格式化输出（formatted output）把数值、字符、指针等类型值转换成字符并插入 ostream。",
    failure:
      "若只复述「formatted output 是类型值到字符表示的策略」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「formatted output 是类型值到字符表示的策略」的状态变化。",
  },
  {
    label: "formatted input 从字符尝试建立类型值",
    mechanism:
      "格式化输入（formatted input）用 operator 跳过规则允许的前导空白，读取能构成目标类型的字符，并停在第一个不属于该值的字符。成功后才可使用新值；失败时目标不应被当作新数据。",
    failure:
      "若只复述「formatted input 从字符尝试建立类型值」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「formatted input 从字符尝试建立类型值」的状态变化。",
  },
];

export function InputOutputAndFilesDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 17：Input, Output, and Files：机制与证据"
      prompt="切换《Chapter 17：Input, Output, and Files》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 17：Input, Output, and Files》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function InputOutputAndFilesMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 17：Input, Output, and Files：机制路径"
      stages={STAGES}
    />
  );
}

export function InputOutputAndFilesFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 17：Input, Output, and Files：失效与核验"
      stages={STAGES}
    />
  );
}
