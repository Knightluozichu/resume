import { OfficialMfcLab } from "./official-mfc-lab";

const data = {
  title: "第5章 总观Application Framework",
  label: "第三篇 · 框架总观",
  color: "#be123c",
  soft: "#fff1f2",
  chain: [
    "识别框架入口",
    "定位类层次",
    "选择通用类",
    "接入Windows封装",
    "调用Afx服务",
    "核对宏与类型",
  ],
  concepts: [
    "第5章 总观Application Framework",
    "什么是Application Framework？",
    "侯捷怎么说",
    "我怎么说",
    "别人怎么说",
    "为什么使用Application Framework",
    "Microsoft Foundation Classes（MFC）",
    "白头宫女话天宝：Visual C++与MFC",
    "纵览MFC",
    "General Purpose classes",
    "CObject",
    "数据处理类（collection classes）",
    "杂项类",
    "异常处理类（exception handling classes）",
    "Windows API classes",
    "Application framework classes",
    "High level Abstractions",
    "Afx全局函数",
    "MFC宏（macros）",
    "MFC数据类型（data types）",
  ],
} as const;

export function Mfc05ApplicationFrameworkOverviewMapLab() {
  return <OfficialMfcLab {...data} view="map" />;
}

export function Mfc05ApplicationFrameworkOverviewExperimentLab() {
  return <OfficialMfcLab {...data} view="experiment" />;
}

export function Mfc05ApplicationFrameworkOverviewEvidenceLab() {
  return <OfficialMfcLab {...data} view="evidence" />;
}
