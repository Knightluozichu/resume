import { OfficialTigerCompilerLab } from "./official-tiger-compiler-lab";

const data = {
  title: "第18章 循环优化",
  label: "第18章 循环优化",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: [
    "计算支配关系",
    "识别回边循环",
    "建立前置结点",
    "证明不变量",
    "重写归纳变量",
    "验证迭代轨迹",
  ],
  concepts: [
    "第18章 循环优化",
    "18.1 必经结点",
    "18.1.1 寻找必经结点的算法",
    "18.1.2 直接必经结点",
    "18.1.3 循环",
    "18.1.4 循环前置结点",
    "18.2 循环不变量计算",
    "18.3 归纳变量",
    "18.3.1 发现归纳变量",
    "18.3.2 强度削弱",
    "18.3.3 删除",
    "18.3.4 重写比较",
    "18.4 数组边界检查",
    "18.5 循环展开",
  ],
} as const;

export function Tbc18LoopOptimizationsMapLab() {
  return <OfficialTigerCompilerLab {...data} view="map" />;
}

export function Tbc18LoopOptimizationsExperimentLab() {
  return <OfficialTigerCompilerLab {...data} view="experiment" />;
}

export function Tbc18LoopOptimizationsEvidenceLab() {
  return <OfficialTigerCompilerLab {...data} view="evidence" />;
}
