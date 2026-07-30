"use client";

import { RubyEvidenceLab, type RubyEvidenceModel } from "./ruby-evidence-lab";

const model = {
  unitId: "final-review",
  title: "Ruby基础教程（第5版）· 全书总复习",
  question: "怎样用一个可重建的数据工具证明 23 章知识已经形成系统？",
  concepts: [
    "第1章 Ruby初探",
    "第2章 便利的对象",
    "第3章 创建命令",
    "第4章 对象、变量和常量",
    "第5章 条件判断",
    "第6章 循环",
    "第7章 方法",
    "第8章 类和模块",
    "第9章 运算符",
    "第10章 错误处理与异常",
    "第11章 块",
    "第12章 数值类",
    "第13章 数组类",
    "第14章 字符串类",
    "第15章 散列类",
    "第16章 正则表达式类",
    "第17章 IO类",
    "第18章 File类与Dir类",
    "第19章 Encoding类",
    "第20章 Time类与Date类",
    "第21章 Proc类",
    "第22章 文本处理",
    "第23章 检索邮政编码",
  ],
  stages: [
    {
      label: "建立第1章 Ruby初探输入",
      input: "固定第1章 Ruby初探所需的原始值、Ruby 版本和调用入口。",
      state: "在执行前记录接收者身份，并声明第2章 便利的对象的允许状态。",
      evidence:
        "保存Ruby基础教程（第5版）· 全书总复习的初值、参数、编码或资源位置。",
    },
    {
      label: "执行第2章 便利的对象",
      input: "保持相同输入，只改变与第2章 便利的对象直接相关的一项操作。",
      state: "逐步记录第3章 创建命令造成的对象、控制或边界变化。",
      evidence:
        "定位“只核对最终查询结果，不保存对象状态、异常传播、编码和事务证据”出现时的第一处不同状态。",
    },
    {
      label: "验收第23章 检索邮政编码",
      input: "恢复基线，再以第23章 检索邮政编码覆盖正常、错误和重复执行。",
      state:
        "最终状态必须重新满足：同一输入、Ruby 版本和构建参数产生相同状态、结果、诊断与回滚行为。",
      evidence:
        "交付Ruby基础教程（第5版）· 全书总复习的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
    },
  ],
  normalTrace: [
    "固定第1章 Ruby初探的输入和接收者",
    "执行第2章 便利的对象并记录状态",
    "观察第3章 创建命令的返回或副作用",
    "用第23章 检索邮政编码核对不变量并复位",
  ],
  failureTrace: [
    "保持Ruby基础教程（第5版）· 全书总复习的输入与初值不变",
    "仅注入故障：只核对最终查询结果，不保存对象状态、异常传播、编码和事务证据",
    "记录首个对象、控制或边界分岔",
    "拒绝把最终现象误当成根因",
  ],
  invariant:
    "同一输入、Ruby 版本和构建参数产生相同状态、结果、诊断与回滚行为。",
  fault: "只核对最终查询结果，不保存对象状态、异常传播、编码和事务证据",
  artifact:
    "Ruby基础教程（第5版）· 全书总复习的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
} satisfies RubyEvidenceModel;

export function RubRubFinalReviewObjectModelLab() {
  return <RubyEvidenceLab model={model} view="object-model" />;
}

export function RubRubFinalReviewControlTraceLab() {
  return <RubyEvidenceLab model={model} view="control-trace" />;
}

export function RubRubFinalReviewBoundaryProbeLab() {
  return <RubyEvidenceLab model={model} view="boundary-probe" />;
}
