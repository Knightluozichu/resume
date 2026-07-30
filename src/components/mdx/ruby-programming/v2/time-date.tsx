"use client";

import { RubyEvidenceLab, type RubyEvidenceModel } from "./ruby-evidence-lab";

const model = {
  unitId: "tr5-20",
  title: "第20章 Time类与Date类",
  question: "怎样区分时间点、日历日期、偏移量、时区规则与字符串格式？",
  concepts: [
    "获取时间",
    "计算时间",
    "时间的格式",
    "本地时间",
    "从字符串中获取时间",
    "获取日期",
    "计算日期",
    "日期的格式",
    "从字符串中获取日期",
    "Time与Date的互相转换",
  ],
  stages: [
    {
      label: "建立获取时间输入",
      input: "固定获取时间所需的原始值、Ruby 版本和调用入口。",
      state: "在执行前记录接收者身份，并声明计算时间的允许状态。",
      evidence: "保存第20章 Time类与Date类的初值、参数、编码或资源位置。",
    },
    {
      label: "执行计算时间",
      input: "保持相同输入，只改变与计算时间直接相关的一项操作。",
      state: "逐步记录时间的格式造成的对象、控制或边界变化。",
      evidence:
        "定位“把固定 UTC 偏移当成时区规则，跨夏令时计算得到错误本地时间”出现时的第一处不同状态。",
    },
    {
      label: "验收Time与Date的互相转换",
      input: "恢复基线，再以Time与Date的互相转换覆盖正常、错误和重复执行。",
      state:
        "最终状态必须重新满足：解析和计算明确日历、偏移与边界，格式化结果可以往返或解释损失。",
      evidence:
        "交付第20章 Time类与Date类的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
    },
  ],
  normalTrace: [
    "固定获取时间的输入和接收者",
    "执行计算时间并记录状态",
    "观察时间的格式的返回或副作用",
    "用Time与Date的互相转换核对不变量并复位",
  ],
  failureTrace: [
    "保持第20章 Time类与Date类的输入与初值不变",
    "仅注入故障：把固定 UTC 偏移当成时区规则，跨夏令时计算得到错误本地时间",
    "记录首个对象、控制或边界分岔",
    "拒绝把最终现象误当成根因",
  ],
  invariant: "解析和计算明确日历、偏移与边界，格式化结果可以往返或解释损失。",
  fault: "把固定 UTC 偏移当成时区规则，跨夏令时计算得到错误本地时间",
  artifact:
    "第20章 Time类与Date类的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
} satisfies RubyEvidenceModel;

export function RubTimeDateObjectModelLab() {
  return <RubyEvidenceLab model={model} view="object-model" />;
}

export function RubTimeDateControlTraceLab() {
  return <RubyEvidenceLab model={model} view="control-trace" />;
}

export function RubTimeDateBoundaryProbeLab() {
  return <RubyEvidenceLab model={model} view="boundary-probe" />;
}
