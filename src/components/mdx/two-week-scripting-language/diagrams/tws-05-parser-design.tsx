import { OfficialTwoWeekScriptingLab } from "./official-two-week-scripting-lab";

const data = {
  title: "第5天 设计语法分析器",
  label: "基础篇 · 语言前端",
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
    "第5天 设计语法分析器",
    "5.1 Stone语言的语法",
    "5.2 使用解析器与组合子",
    "5.3 由语法分析器生成的抽象语法树",
    "5.4 测试语法分析器",
    "专栏第2话 写书只需3个月！？",
  ],
} as const;

export function Tws05ParserDesignMapLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="map" />;
}

export function Tws05ParserDesignExperimentLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="experiment" />;
}

export function Tws05ParserDesignEvidenceLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="evidence" />;
}
