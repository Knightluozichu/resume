"use client";

import { RubyEvidenceLab, type RubyEvidenceModel } from "./ruby-evidence-lab";

const model = {
  unitId: "tr5-07",
  title: "第7章 方法",
  question: "怎样把接收者、参数、块、返回值与方法可见性写成可检查契约？",
  concepts: [
    "简单的方法调用",
    "带块的方法调用",
    "运算符形式的方法调用",
    "实例方法、类方法与函数式方法",
    "方法的返回值",
    "定义带块的方法",
    "参数个数不确定的方法",
    "关键字参数",
  ],
  stages: [
    {
      label: "建立简单的方法调用输入",
      input: "固定简单的方法调用所需的原始值、Ruby 版本和调用入口。",
      state: "在执行前记录接收者身份，并声明带块的方法调用的允许状态。",
      evidence: "保存第7章 方法的初值、参数、编码或资源位置。",
    },
    {
      label: "执行带块的方法调用",
      input: "保持相同输入，只改变与带块的方法调用直接相关的一项操作。",
      state: "逐步记录运算符形式的方法调用造成的对象、控制或边界变化。",
      evidence:
        "定位“省略接收者和括号后误判参数边界，调用了非预期方法”出现时的第一处不同状态。",
    },
    {
      label: "验收关键字参数",
      input: "恢复基线，再以关键字参数覆盖正常、错误和重复执行。",
      state:
        "最终状态必须重新满足：调用点匹配唯一意图，所有返回路径满足参数和结果约束。",
      evidence:
        "交付第7章 方法的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
    },
  ],
  normalTrace: [
    "固定简单的方法调用的输入和接收者",
    "执行带块的方法调用并记录状态",
    "观察运算符形式的方法调用的返回或副作用",
    "用关键字参数核对不变量并复位",
  ],
  failureTrace: [
    "保持第7章 方法的输入与初值不变",
    "仅注入故障：省略接收者和括号后误判参数边界，调用了非预期方法",
    "记录首个对象、控制或边界分岔",
    "拒绝把最终现象误当成根因",
  ],
  invariant: "调用点匹配唯一意图，所有返回路径满足参数和结果约束。",
  fault: "省略接收者和括号后误判参数边界，调用了非预期方法",
  artifact:
    "第7章 方法的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
} satisfies RubyEvidenceModel;

export function RubMethodsObjectModelLab() {
  return <RubyEvidenceLab model={model} view="object-model" />;
}

export function RubMethodsControlTraceLab() {
  return <RubyEvidenceLab model={model} view="control-trace" />;
}

export function RubMethodsBoundaryProbeLab() {
  return <RubyEvidenceLab model={model} view="boundary-probe" />;
}
