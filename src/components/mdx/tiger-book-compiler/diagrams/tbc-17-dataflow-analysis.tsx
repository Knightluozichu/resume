import { OfficialTigerCompilerLab } from "./official-tiger-compiler-lab";

const data = {
  title: "第17章 数据流分析",
  label: "第17章 数据流分析",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: [
    "选择中间表示",
    "定义数据流格",
    "求解不动点",
    "建立使用定值链",
    "证明变换前提",
    "差分执行结果",
  ],
  concepts: [
    "第17章 数据流分析",
    "17.1 流分析使用的中间表示",
    "17.2 各种数据流分析",
    "17.2.1 到达定值",
    "17.2.2 可用表达式",
    "17.2.3 到达表达式",
    "17.2.4 活跃分析",
    "17.3 使用数据流分析结果的几种转换",
    "17.3.1 公共子表达式删除",
    "17.3.2 常数传播",
    "17.3.3 复写传播",
    "17.3.4 死代码删除",
    "17.4 加快数据流分析",
    "17.4.1 位向量",
    "17.4.2 基本块",
    "17.4.3 结点排序",
    "17.4.4 使用-定值链和定值-使用链",
    "17.4.5 工作表算法",
    "17.4.6 增量式数据流分析",
    "17.5 别名分析",
    "17.5.1 基于类型的别名分析",
    "17.5.2 基于流的别名分析",
    "17.5.3 使用可能别名信息",
    "17.5.4 严格的纯函数式语言中的别名分析",
  ],
} as const;

export function Tbc17DataflowAnalysisMapLab() {
  return <OfficialTigerCompilerLab {...data} view="map" />;
}

export function Tbc17DataflowAnalysisExperimentLab() {
  return <OfficialTigerCompilerLab {...data} view="experiment" />;
}

export function Tbc17DataflowAnalysisEvidenceLab() {
  return <OfficialTigerCompilerLab {...data} view="evidence" />;
}
