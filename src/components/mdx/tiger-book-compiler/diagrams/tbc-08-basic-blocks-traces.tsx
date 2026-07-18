import { OfficialTigerCompilerLab } from "./official-tiger-compiler-lab";

const data = {
  title: "第8章 基本块和轨迹",
  label: "第8章 基本块和轨迹",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: [
    "规范化表达式",
    "提升CALL",
    "线性化语句",
    "划分基本块",
    "安排轨迹",
    "比较控制流图",
  ],
  concepts: [
    "第8章 基本块和轨迹",
    "8.1 规范树",
    "8.1.1 ESEQ的转换",
    "8.1.2 一般重写规则",
    "8.1.3 将CALL移到顶层",
    "8.1.4 线性语句表",
    "8.2 处理条件分支",
    "8.2.1 基本块",
    "8.2.2 轨迹",
    "8.2.3 完善",
    "8.2.4 最优轨迹",
  ],
} as const;

export function Tbc08BasicBlocksTracesMapLab() {
  return <OfficialTigerCompilerLab {...data} view="map" />;
}

export function Tbc08BasicBlocksTracesExperimentLab() {
  return <OfficialTigerCompilerLab {...data} view="experiment" />;
}

export function Tbc08BasicBlocksTracesEvidenceLab() {
  return <OfficialTigerCompilerLab {...data} view="evidence" />;
}
