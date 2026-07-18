import { OfficialTigerCompilerLab } from "./official-tiger-compiler-lab";

const data = {
  title: "第10章 活跃分析",
  label: "第10章 活跃分析",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: [
    "构造CFG",
    "提取def/use",
    "迭代活跃方程",
    "验证不动点",
    "加入干涉边",
    "对照动态轨迹",
  ],
  concepts: [
    "第10章 活跃分析",
    "10.1 数据流方程的解",
    "10.1.1 活跃性计算",
    "10.1.2 集合的表示",
    "10.1.3 时间复杂度",
    "10.1.4 最小不动点",
    "10.1.5 静态活跃性与动态活跃性",
    "10.1.6 冲突图",
    "10.2 Tiger编译器的活跃分析",
    "10.2.1 图",
    "10.2.2 控制流图",
    "10.2.3 活跃分析",
    "程序设计：构造流图",
    "程序设计：活跃分析模块",
  ],
} as const;

export function Tbc10LivenessAnalysisMapLab() {
  return <OfficialTigerCompilerLab {...data} view="map" />;
}

export function Tbc10LivenessAnalysisExperimentLab() {
  return <OfficialTigerCompilerLab {...data} view="experiment" />;
}

export function Tbc10LivenessAnalysisEvidenceLab() {
  return <OfficialTigerCompilerLab {...data} view="evidence" />;
}
