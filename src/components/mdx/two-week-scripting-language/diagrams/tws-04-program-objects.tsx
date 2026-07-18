import { OfficialTwoWeekScriptingLab } from "./official-two-week-scripting-lab";

const data = {
  title: "第4天 用于表示程序的对象",
  label: "基础篇 · 语言前端",
  color: "#be123c",
  soft: "#ffe4e6",
  chain: [
    "写出BNF",
    "消除入口歧义",
    "组合解析器",
    "生成AST",
    "定位语法错误",
    "快照树结构",
  ],
  concepts: [
    "第4天 用于表示程序的对象",
    "4.1 抽象语法树的定义",
    "4.2 设计节点类",
    "4.3 BNF",
    "4.4 语法分析与抽象语法树",
    "专栏第1话 程序越简单越好",
  ],
} as const;

export function Tws04ProgramObjectsMapLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="map" />;
}

export function Tws04ProgramObjectsExperimentLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="experiment" />;
}

export function Tws04ProgramObjectsEvidenceLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="evidence" />;
}
