"use client";

import { RubyEvidenceLab, type RubyEvidenceModel } from "./ruby-evidence-lab";

const model = {
  unitId: "tr5-03",
  title: "第3章 创建命令",
  question:
    "怎样让命令行参数、文件读取、模式匹配和方法返回形成一个可重放命令？",
  concepts: [
    "命令行的输入数据",
    "从文件中读取内容并输出",
    "从文件中逐行读取内容",
    "从文件中读取指定模式",
    "方法的定义",
    "其他文件的引用",
  ],
  stages: [
    {
      label: "建立命令行的输入数据输入",
      input: "固定命令行的输入数据所需的原始值、Ruby 版本和调用入口。",
      state: "在执行前记录接收者身份，并声明从文件中读取内容并输出的允许状态。",
      evidence: "保存第3章 创建命令的初值、参数、编码或资源位置。",
    },
    {
      label: "执行从文件中读取内容并输出",
      input: "保持相同输入，只改变与从文件中读取内容并输出直接相关的一项操作。",
      state: "逐步记录从文件中逐行读取内容造成的对象、控制或边界变化。",
      evidence:
        "定位“文件读取失败后仍沿用旧内容并输出成功状态”出现时的第一处不同状态。",
    },
    {
      label: "验收其他文件的引用",
      input: "恢复基线，再以其他文件的引用覆盖正常、错误和重复执行。",
      state:
        "最终状态必须重新满足：输入路径和模式先验证，资源始终关闭，正常数据与诊断通道分离。",
      evidence:
        "交付第3章 创建命令的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
    },
  ],
  normalTrace: [
    "固定命令行的输入数据的输入和接收者",
    "执行从文件中读取内容并输出并记录状态",
    "观察从文件中逐行读取内容的返回或副作用",
    "用其他文件的引用核对不变量并复位",
  ],
  failureTrace: [
    "保持第3章 创建命令的输入与初值不变",
    "仅注入故障：文件读取失败后仍沿用旧内容并输出成功状态",
    "记录首个对象、控制或边界分岔",
    "拒绝把最终现象误当成根因",
  ],
  invariant: "输入路径和模式先验证，资源始终关闭，正常数据与诊断通道分离。",
  fault: "文件读取失败后仍沿用旧内容并输出成功状态",
  artifact:
    "第3章 创建命令的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
} satisfies RubyEvidenceModel;

export function RubBuildingCommandObjectModelLab() {
  return <RubyEvidenceLab model={model} view="object-model" />;
}

export function RubBuildingCommandControlTraceLab() {
  return <RubyEvidenceLab model={model} view="control-trace" />;
}

export function RubBuildingCommandBoundaryProbeLab() {
  return <RubyEvidenceLab model={model} view="boundary-probe" />;
}
