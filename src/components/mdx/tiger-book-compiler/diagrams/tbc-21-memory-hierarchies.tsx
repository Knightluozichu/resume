import { OfficialTigerCompilerLab } from "./official-tiger-compiler-lab";

const data = {
  title: "第21章 存储层次",
  label: "第21章 存储层次",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: [
    "冻结cache模型",
    "测量访问步长",
    "调整布局对齐",
    "交换合法循环",
    "选择分块尺寸",
    "记录缺失率和带宽",
  ],
  concepts: [
    "第21章 存储层次",
    "21.1 cache的组织结构",
    "21.2 cache块对齐",
    "21.3 预取",
    "21.4 循环交换",
    "21.5 分块",
    "21.6 垃圾收集和存储层次",
  ],
} as const;

export function Tbc21MemoryHierarchiesMapLab() {
  return <OfficialTigerCompilerLab {...data} view="map" />;
}

export function Tbc21MemoryHierarchiesExperimentLab() {
  return <OfficialTigerCompilerLab {...data} view="experiment" />;
}

export function Tbc21MemoryHierarchiesEvidenceLab() {
  return <OfficialTigerCompilerLab {...data} view="evidence" />;
}
