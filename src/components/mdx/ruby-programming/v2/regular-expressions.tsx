"use client";

import { RubyEvidenceLab, type RubyEvidenceModel } from "./ruby-evidence-lab";

const model = {
  unitId: "tr5-16",
  title: "第16章 正则表达式类",
  question: "怎样把正则模式、输入编码、捕获范围和替换结果放进同一证据链？",
  concepts: [
    "正则表达式对象的创建方法",
    "行首、行尾与字符范围",
    "任意字符与反斜杠模式",
    "重复与最短匹配",
    "分组与选择",
    "Regexp.quote",
    "正则表达式的选项",
    "捕获",
    "sub方法与gsub方法",
    "scan方法",
  ],
  stages: [
    {
      label: "建立正则表达式对象的创建方法输入",
      input: "固定正则表达式对象的创建方法所需的原始值、Ruby 版本和调用入口。",
      state: "在执行前记录接收者身份，并声明行首、行尾与字符范围的允许状态。",
      evidence: "保存第16章 正则表达式类的初值、参数、编码或资源位置。",
    },
    {
      label: "执行行首、行尾与字符范围",
      input: "保持相同输入，只改变与行首、行尾与字符范围直接相关的一项操作。",
      state: "逐步记录任意字符与反斜杠模式造成的对象、控制或边界变化。",
      evidence:
        "定位“用局部正则匹配代替结构化格式解析，错误接受残缺记录”出现时的第一处不同状态。",
    },
    {
      label: "验收scan方法",
      input: "恢复基线，再以scan方法覆盖正常、错误和重复执行。",
      state:
        "最终状态必须重新满足：模式只处理声明的文本语法，匹配边界和捕获结果与原输入可对应。",
      evidence:
        "交付第16章 正则表达式类的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
    },
  ],
  normalTrace: [
    "固定正则表达式对象的创建方法的输入和接收者",
    "执行行首、行尾与字符范围并记录状态",
    "观察任意字符与反斜杠模式的返回或副作用",
    "用scan方法核对不变量并复位",
  ],
  failureTrace: [
    "保持第16章 正则表达式类的输入与初值不变",
    "仅注入故障：用局部正则匹配代替结构化格式解析，错误接受残缺记录",
    "记录首个对象、控制或边界分岔",
    "拒绝把最终现象误当成根因",
  ],
  invariant: "模式只处理声明的文本语法，匹配边界和捕获结果与原输入可对应。",
  fault: "用局部正则匹配代替结构化格式解析，错误接受残缺记录",
  artifact:
    "第16章 正则表达式类的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
} satisfies RubyEvidenceModel;

export function RubRegularExpressionsObjectModelLab() {
  return <RubyEvidenceLab model={model} view="object-model" />;
}

export function RubRegularExpressionsControlTraceLab() {
  return <RubyEvidenceLab model={model} view="control-trace" />;
}

export function RubRegularExpressionsBoundaryProbeLab() {
  return <RubyEvidenceLab model={model} view="boundary-probe" />;
}
