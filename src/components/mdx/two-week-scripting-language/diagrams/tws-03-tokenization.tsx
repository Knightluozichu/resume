import { OfficialTwoWeekScriptingLab } from "./official-two-week-scripting-lab";

const data = {
  title: "第3天 分割单词",
  label: "基础篇 · 语言前端",
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
    "第3天 分割单词",
    "3.1 Token对象",
    "3.2 通过正则表达式定义单词",
    "3.3 借助java.util.regex设计词法分析器",
    "3.4 词法分析器试运行",
  ],
} as const;

export function Tws03TokenizationMapLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="map" />;
}

export function Tws03TokenizationExperimentLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="experiment" />;
}

export function Tws03TokenizationEvidenceLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="evidence" />;
}
