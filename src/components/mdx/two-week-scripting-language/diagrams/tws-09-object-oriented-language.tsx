import { OfficialTwoWeekScriptingLab } from "./official-two-week-scripting-lab";

const data = {
  title: "第9天 设计面向对象语言",
  label: "基础篇 · 解释器与语言功能",
  color: "#a16207",
  soft: "#fef9c3",
  chain: [
    "扩展对象语法",
    "创建类环境",
    "实例化对象",
    "解析成员",
    "读写数组",
    "验证隔离性",
  ],
  concepts: [
    "第9天 设计面向对象语言",
    "9.1 设计用于操作类与对象的语法",
    "9.2 实现类所需的语法规则",
    "9.3 实现eval方法",
    "9.4 通过闭包表示对象",
    "9.5 运行包含类的程序",
  ],
} as const;

export function Tws09ObjectOrientedLanguageMapLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="map" />;
}

export function Tws09ObjectOrientedLanguageExperimentLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="experiment" />;
}

export function Tws09ObjectOrientedLanguageEvidenceLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="evidence" />;
}
