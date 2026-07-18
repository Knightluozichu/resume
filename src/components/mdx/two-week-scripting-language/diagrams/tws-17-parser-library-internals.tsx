import { OfficialTwoWeekScriptingLab } from "./official-two-week-scripting-lab";

const data = {
  title: "第17天 Parser库的内部结构",
  label: "解说篇 · 理论与实现机制",
  color: "#7c3aed",
  soft: "#ede9fe",
  chain: [
    "写出BNF",
    "消除入口歧义",
    "组合解析器",
    "生成AST",
    "定位语法错误",
    "快照树结构",
  ],
  concepts: [
    "第17天 Parser库的内部结构",
    "17.1 组合子分析",
    "17.2 解析器组合子的内部",
  ],
} as const;

export function Tws17ParserLibraryInternalsMapLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="map" />;
}

export function Tws17ParserLibraryInternalsExperimentLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="experiment" />;
}

export function Tws17ParserLibraryInternalsEvidenceLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="evidence" />;
}
