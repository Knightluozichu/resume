import { OfficialTwoWeekScriptingLab } from "./official-two-week-scripting-lab";

const data = {
  title: "第15天 手工设计词法分析器",
  label: "解说篇 · 理论与实现机制",
  color: "#a16207",
  soft: "#fef9c3",
  chain: [
    "列出Token种类",
    "规定最长匹配",
    "扫描源字符",
    "保留行列位置",
    "拒绝非法输入",
    "重放Token流",
  ],
  concepts: [
    "第3部分 解说篇（自习时间）",
    "第15天 手工设计词法分析器",
    "15.1 修改自动机",
    "15.2 自动机程序",
    "15.3 正则表达式的极限",
  ],
} as const;

export function Tws15HandwrittenLexerMapLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="map" />;
}

export function Tws15HandwrittenLexerExperimentLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="experiment" />;
}

export function Tws15HandwrittenLexerEvidenceLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="evidence" />;
}
