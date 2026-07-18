import { OfficialTwoWeekScriptingLab } from "./official-two-week-scripting-lab";

const data = {
  title: "第7天 添加函数功能",
  label: "基础篇 · 解释器与语言功能",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: [
    "扩展函数语法",
    "捕获词法环境",
    "建立调用帧",
    "绑定实参形参",
    "返回结果",
    "检查闭包生存期",
  ],
  concepts: [
    "第7天 添加函数功能",
    "7.1 扩充语法规则",
    "7.2 作用域与生存周期",
    "7.3 执行函数",
    "7.4 计算斐波那契数",
    "7.5 为闭包提供支持",
    "7.6 实现闭包",
  ],
} as const;

export function Tws07FunctionsClosuresMapLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="map" />;
}

export function Tws07FunctionsClosuresExperimentLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="experiment" />;
}

export function Tws07FunctionsClosuresEvidenceLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="evidence" />;
}
