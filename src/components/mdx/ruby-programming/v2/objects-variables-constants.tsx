"use client";

import { RubyEvidenceLab, type RubyEvidenceModel } from "./ruby-evidence-lab";

const model = {
  unitId: "tr5-04",
  title: "第4章 对象、变量和常量",
  question: "怎样证明变量名、对象身份、作用域与常量查找没有被混为一谈？",
  concepts: [
    "对象",
    "类",
    "局部变量、实例变量、类变量与全局变量",
    "常量",
    "保留字",
    "多重赋值",
    "交换变量的值",
    "获取数组的元素",
  ],
  stages: [
    {
      label: "建立对象输入",
      input: "固定对象所需的原始值、Ruby 版本和调用入口。",
      state: "在执行前记录接收者身份，并声明类的允许状态。",
      evidence: "保存第4章 对象、变量和常量的初值、参数、编码或资源位置。",
    },
    {
      label: "执行类",
      input: "保持相同输入，只改变与类直接相关的一项操作。",
      state:
        "逐步记录局部变量、实例变量、类变量与全局变量造成的对象、控制或边界变化。",
      evidence:
        "定位“把赋值理解为深复制，修改别名后仍期待原对象不变”出现时的第一处不同状态。",
    },
    {
      label: "验收获取数组的元素",
      input: "恢复基线，再以获取数组的元素覆盖正常、错误和重复执行。",
      state:
        "最终状态必须重新满足：每次读取都能指出名字所属作用域、当前对象和允许的重新绑定规则。",
      evidence:
        "交付第4章 对象、变量和常量的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
    },
  ],
  normalTrace: [
    "固定对象的输入和接收者",
    "执行类并记录状态",
    "观察局部变量、实例变量、类变量与全局变量的返回或副作用",
    "用获取数组的元素核对不变量并复位",
  ],
  failureTrace: [
    "保持第4章 对象、变量和常量的输入与初值不变",
    "仅注入故障：把赋值理解为深复制，修改别名后仍期待原对象不变",
    "记录首个对象、控制或边界分岔",
    "拒绝把最终现象误当成根因",
  ],
  invariant: "每次读取都能指出名字所属作用域、当前对象和允许的重新绑定规则。",
  fault: "把赋值理解为深复制，修改别名后仍期待原对象不变",
  artifact:
    "第4章 对象、变量和常量的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
} satisfies RubyEvidenceModel;

export function RubObjectsVariablesConstantsObjectModelLab() {
  return <RubyEvidenceLab model={model} view="object-model" />;
}

export function RubObjectsVariablesConstantsControlTraceLab() {
  return <RubyEvidenceLab model={model} view="control-trace" />;
}

export function RubObjectsVariablesConstantsBoundaryProbeLab() {
  return <RubyEvidenceLab model={model} view="boundary-probe" />;
}
