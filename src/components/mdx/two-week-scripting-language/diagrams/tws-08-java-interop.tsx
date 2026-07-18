import { OfficialTwoWeekScriptingLab } from "./official-two-week-scripting-lab";

const data = {
  title: "第8天 关联Java语言",
  label: "基础篇 · 解释器与语言功能",
  color: "#047857",
  soft: "#d1fae5",
  chain: [
    "声明宿主边界",
    "解析Java成员",
    "转换参数类型",
    "调用宿主代码",
    "映射异常",
    "验证类路径",
  ],
  concepts: [
    "第8天 关联Java语言",
    "8.1 原生函数",
    "8.2 编写使用原生函数的程序",
  ],
} as const;

export function Tws08JavaInteropMapLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="map" />;
}

export function Tws08JavaInteropExperimentLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="experiment" />;
}

export function Tws08JavaInteropEvidenceLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="evidence" />;
}
