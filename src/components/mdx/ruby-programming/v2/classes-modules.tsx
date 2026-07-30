"use client";

import { RubyEvidenceLab, type RubyEvidenceModel } from "./ruby-evidence-lab";

const model = {
  unitId: "tr5-08",
  title: "第8章 类和模块",
  question: "怎样用类不变量和方法查找链解释继承、模块混入与单例方法？",
  concepts: [
    "类和实例",
    "继承",
    "class语句与initialize方法",
    "实例变量与实例方法",
    "存取器",
    "特殊变量self",
    "限制方法的调用",
    "扩展类",
    "alias与undef",
    "单例类",
    "Mix-in与命名空间",
    "查找方法的规则",
    "extend方法",
    "鸭子类型",
  ],
  stages: [
    {
      label: "建立类和实例输入",
      input: "固定类和实例所需的原始值、Ruby 版本和调用入口。",
      state: "在执行前记录接收者身份，并声明继承的允许状态。",
      evidence: "保存第8章 类和模块的初值、参数、编码或资源位置。",
    },
    {
      label: "执行继承",
      input: "保持相同输入，只改变与继承直接相关的一项操作。",
      state: "逐步记录class语句与initialize方法造成的对象、控制或边界变化。",
      evidence:
        "定位“混入同名方法后不核对 ancestors，错误实现静默覆盖原行为”出现时的第一处不同状态。",
    },
    {
      label: "验收鸭子类型",
      input: "恢复基线，再以鸭子类型覆盖正常、错误和重复执行。",
      state:
        "最终状态必须重新满足：公开操作保持对象有效，方法来源和 self 在每个调用点都可追踪。",
      evidence:
        "交付第8章 类和模块的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
    },
  ],
  normalTrace: [
    "固定类和实例的输入和接收者",
    "执行继承并记录状态",
    "观察class语句与initialize方法的返回或副作用",
    "用鸭子类型核对不变量并复位",
  ],
  failureTrace: [
    "保持第8章 类和模块的输入与初值不变",
    "仅注入故障：混入同名方法后不核对 ancestors，错误实现静默覆盖原行为",
    "记录首个对象、控制或边界分岔",
    "拒绝把最终现象误当成根因",
  ],
  invariant: "公开操作保持对象有效，方法来源和 self 在每个调用点都可追踪。",
  fault: "混入同名方法后不核对 ancestors，错误实现静默覆盖原行为",
  artifact:
    "第8章 类和模块的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
} satisfies RubyEvidenceModel;

export function RubClassesModulesObjectModelLab() {
  return <RubyEvidenceLab model={model} view="object-model" />;
}

export function RubClassesModulesControlTraceLab() {
  return <RubyEvidenceLab model={model} view="control-trace" />;
}

export function RubClassesModulesBoundaryProbeLab() {
  return <RubyEvidenceLab model={model} view="boundary-probe" />;
}
