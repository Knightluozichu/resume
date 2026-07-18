import { OfficialAes23BookLab } from "./official-aes23-book-lab";

const props = {
  unitId: "aes23-01-architecture",
  title: "第1章：汽车电子与软件架构",
  nodes: ["车辆功能", "ECU分布", "域控制器", "中央计算", "芯片资源"],
  focuses: ["发展背景", "分布式拓扑", "域集中", "集成对比", "硬件实例"],
} as const;

export function Aes2301ArchitectureTopologyLab() {
  return <OfficialAes23BookLab {...props} mode="topology" />;
}

export function Aes2301ArchitectureProtocolLab() {
  return <OfficialAes23BookLab {...props} mode="protocol" />;
}

export function Aes2301ArchitectureEvidenceLab() {
  return <OfficialAes23BookLab {...props} mode="evidence" />;
}
