import { MasteringRustOfficialLab, type MasteringRustCase } from "./official-lab";

const cases: MasteringRustCase[] = [
  { label: "元编程边界", input: "目标与输入", rule: "元编程在编译期生成或变换代码，适合重复语法和领域接口", evidence: "元编程边界的边界测试与结果记录", invariant: "元编程在编译期生成或变换代码，适合重复语法和领域接口；如果函数或泛型能清楚表达，就不应让宏隐藏控制流和类型错误。" },
  { label: "声明宏", input: "元编程边界", rule: "macro_rules使用模式匹配输入token并展开模板，片段说明符限定语法类别", evidence: "声明宏的边界测试与结果记录", invariant: "macro_rules使用模式匹配输入token并展开模板，片段说明符限定语法类别；展开结果仍接受名称解析、类型检查和借用检查。" },
  { label: "重复与 DSL", input: "声明宏", rule: "重复模式可以构建集合初始化等小型DSL，但分隔符、零项和尾逗号必须显式设计", evidence: "重复与 DSL的边界测试与结果记录", invariant: "重复模式可以构建集合初始化等小型DSL，但分隔符、零项和尾逗号必须显式设计；DSL错误消息也是公共接口的一部分。" },
  { label: "过程宏与派生宏", input: "重复与 DSL", rule: "过程宏接收TokenStream并返回TokenStream，属性宏、函数式宏和derive用途不同", evidence: "过程宏与派生宏的边界测试与结果记录", invariant: "过程宏接收TokenStream并返回TokenStream，属性宏、函数式宏和derive用途不同；实现应保留span，让诊断指向调用者源码。" },
  { label: "宏测试与调试", input: "过程宏与派生宏", rule: "宏既要测试展开后的运行语义，也要测试应当编译失败的输入", evidence: "宏测试与调试的边界测试与结果记录", invariant: "宏既要测试展开后的运行语义，也要测试应当编译失败的输入；调试先缩小token边界，再检查展开和卫生，而不是在宏中打印临时文本。" },
];

export function MrsMetaprogrammingMacrosModelLab() {
  return <MasteringRustOfficialLab title="使用宏进行元编程：概念执行链" caption="选择核心单元，沿输入、规则与证据追踪。" cases={cases} tone="cyan" />;
}

export function MrsMetaprogrammingMacrosBoundaryLab() {
  return <MasteringRustOfficialLab title="使用宏进行元编程：边界切换" caption="切换单元，比较静态契约与运行期协议。" cases={cases} tone="amber" initial={1} />;
}

export function MrsMetaprogrammingMacrosEvidenceLab() {
  return <MasteringRustOfficialLab title="使用宏进行元编程：验收证据" caption="把编译、测试与外部结果收束为可复现记录。" cases={cases} tone="emerald" initial={2} />;
}
