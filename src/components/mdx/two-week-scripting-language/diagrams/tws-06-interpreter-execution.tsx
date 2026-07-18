import { OfficialTwoWeekScriptingLab } from "./official-two-week-scripting-lab";

const data = {
  title: "第6天 通过解释器执行程序",
  label: "基础篇 · 解释器与语言功能",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain: [
    "建立根环境",
    "求值叶子节点",
    "传播控制流",
    "更新变量绑定",
    "记录运行错误",
    "核对最终环境",
  ],
  concepts: [
    "第6天 通过解释器执行程序",
    "6.1 eval方法与环境对象",
    "6.2 各种类型的eval方法",
    "6.3 关于GluonJ",
    "6.4 执行程序",
  ],
} as const;

export function Tws06InterpreterExecutionMapLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="map" />;
}

export function Tws06InterpreterExecutionExperimentLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="experiment" />;
}

export function Tws06InterpreterExecutionEvidenceLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="evidence" />;
}
