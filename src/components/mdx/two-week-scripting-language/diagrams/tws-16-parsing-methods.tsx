import { OfficialTwoWeekScriptingLab } from "./official-two-week-scripting-lab";

const data = {
  title: "第16天 语法分析方式",
  label: "解说篇 · 理论与实现机制",
  color: "#be123c",
  soft: "#ffe4e6",
  chain: [
    "区分词法语法",
    "写出形式规则",
    "选择分析算法",
    "计算前看集合",
    "处理优先级",
    "构造反例",
  ],
  concepts: [
    "第16天 语法分析方式",
    "16.1 正则表达式与BNF",
    "16.2 语法分析算法",
    "16.3 LL语法分析",
    "16.4 算符优先分析法与自底向上语法分析",
    "专栏第6话 武勇传",
  ],
} as const;

export function Tws16ParsingMethodsMapLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="map" />;
}

export function Tws16ParsingMethodsExperimentLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="experiment" />;
}

export function Tws16ParsingMethodsEvidenceLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="evidence" />;
}
