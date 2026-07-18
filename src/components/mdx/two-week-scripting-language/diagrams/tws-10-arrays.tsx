import { OfficialTwoWeekScriptingLab } from "./official-two-week-scripting-lab";

const data = {
  title: "第10天 无法割舍的数组",
  label: "基础篇 · 解释器与语言功能",
  color: "#be123c",
  soft: "#ffe4e6",
  chain: [
    "扩展对象语法",
    "创建类环境",
    "实例化对象",
    "解析成员",
    "读写数组",
    "验证隔离性",
  ],
  concepts: [
    "第10天 无法割舍的数组",
    "10.1 扩展语法分析器",
    "10.2 仅通过修改器来实现数组",
    "专栏第3话 系主任的工作",
  ],
} as const;

export function Tws10ArraysMapLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="map" />;
}

export function Tws10ArraysExperimentLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="experiment" />;
}

export function Tws10ArraysEvidenceLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="evidence" />;
}
