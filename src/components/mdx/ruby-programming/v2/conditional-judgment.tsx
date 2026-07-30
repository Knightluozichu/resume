"use client";

import { RubyEvidenceLab, type RubyEvidenceModel } from "./ruby-evidence-lab";

const model = {
  unitId: "tr5-05",
  title: "第5章 条件判断",
  question: "怎样用边界表证明 Ruby 条件、逻辑运算与分支顺序覆盖完整输入域？",
  concepts: [
    "Ruby中的条件",
    "逻辑运算符",
    "if语句",
    "unless语句",
    "case语句",
    "if修饰符与unless修饰符",
  ],
  stages: [
    {
      label: "建立Ruby中的条件输入",
      input: "固定Ruby中的条件所需的原始值、Ruby 版本和调用入口。",
      state: "在执行前记录接收者身份，并声明逻辑运算符的允许状态。",
      evidence: "保存第5章 条件判断的初值、参数、编码或资源位置。",
    },
    {
      label: "执行逻辑运算符",
      input: "保持相同输入，只改变与逻辑运算符直接相关的一项操作。",
      state: "逐步记录if语句造成的对象、控制或边界变化。",
      evidence:
        "定位“把 0 或空字符串当作假值，导致合法输入进入拒绝分支”出现时的第一处不同状态。",
    },
    {
      label: "验收if修饰符与unless修饰符",
      input: "恢复基线，再以if修饰符与unless修饰符覆盖正常、错误和重复执行。",
      state:
        "最终状态必须重新满足：任一合法输入进入唯一预期分支，nil、false、0 与空容器不被混淆。",
      evidence:
        "交付第5章 条件判断的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
    },
  ],
  normalTrace: [
    "固定Ruby中的条件的输入和接收者",
    "执行逻辑运算符并记录状态",
    "观察if语句的返回或副作用",
    "用if修饰符与unless修饰符核对不变量并复位",
  ],
  failureTrace: [
    "保持第5章 条件判断的输入与初值不变",
    "仅注入故障：把 0 或空字符串当作假值，导致合法输入进入拒绝分支",
    "记录首个对象、控制或边界分岔",
    "拒绝把最终现象误当成根因",
  ],
  invariant: "任一合法输入进入唯一预期分支，nil、false、0 与空容器不被混淆。",
  fault: "把 0 或空字符串当作假值，导致合法输入进入拒绝分支",
  artifact:
    "第5章 条件判断的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
} satisfies RubyEvidenceModel;

export function RubConditionalJudgmentObjectModelLab() {
  return <RubyEvidenceLab model={model} view="object-model" />;
}

export function RubConditionalJudgmentControlTraceLab() {
  return <RubyEvidenceLab model={model} view="control-trace" />;
}

export function RubConditionalJudgmentBoundaryProbeLab() {
  return <RubyEvidenceLab model={model} view="boundary-probe" />;
}
