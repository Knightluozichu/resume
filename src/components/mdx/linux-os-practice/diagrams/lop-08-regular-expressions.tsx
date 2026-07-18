import { OfficialLinuxPracticeLab } from "./official-linux-practice-lab";

const data = {
  title: "第8章 正则表达式",
  label: "自动化 · Shell与正则",
  color: "#a16207",
  soft: "#fefce8",
  chain: [
    "定义文本样本",
    "选择正则方言",
    "写出匹配边界",
    "执行文本工具",
    "检查假阳假阴",
    "固化回归样本",
  ],
  concepts: [
    "第8章 正则表达式",
    "8.1 正则表达式简介",
    "8.1.1 正则表达式的起源",
    "8.1.2 正则表达式的概念",
    "8.2 正则表达式的使用",
    "8.2.1 符号定义与匹配规则",
    "8.2.2 文本处理工具",
    "8.3 本章小结",
  ],
} as const;

export function Lop08RegularExpressionsMapLab() {
  return <OfficialLinuxPracticeLab {...data} view="map" />;
}
export function Lop08RegularExpressionsExperimentLab() {
  return <OfficialLinuxPracticeLab {...data} view="experiment" />;
}
export function Lop08RegularExpressionsEvidenceLab() {
  return <OfficialLinuxPracticeLab {...data} view="evidence" />;
}
