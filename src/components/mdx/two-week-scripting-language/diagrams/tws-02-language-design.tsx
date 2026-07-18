import { OfficialTwoWeekScriptingLab } from "./official-two-week-scripting-lab";

const data = {
  title: "第2天 设计程序设计语言",
  label: "基础篇 · 语言前端",
  color: "#047857",
  soft: "#d1fae5",
  chain: [
    "冻结语言目标",
    "写出样例程序",
    "定义词法语法",
    "建立AST",
    "选择执行方式",
    "回归最小语言",
  ],
  concepts: [
    "第2天 设计程序设计语言",
    "2.1 麻雀虽小、五脏俱全的程序设计语言",
    "2.2 句尾的分号",
    "2.3 含糊不得的语言",
  ],
} as const;

export function Tws02LanguageDesignMapLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="map" />;
}

export function Tws02LanguageDesignExperimentLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="experiment" />;
}

export function Tws02LanguageDesignEvidenceLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="evidence" />;
}
