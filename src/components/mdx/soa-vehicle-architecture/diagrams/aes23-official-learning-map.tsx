import { OfficialAes23BookLab } from "./official-aes23-book-lab";

const props = {
  unitId: "aes23-official-learning-map",
  title: "《汽车电子与软件架构》权威学习地图",
  nodes: ["电子硬件", "通信网络", "基础软件", "服务架构", "开发升级"],
  focuses: ["113节点", "拓扑演进", "协议栈", "CP/AP与SOA", "流程OTA"],
} as const;

export function Aes23OfficialLearningMapTopologyLab() {
  return <OfficialAes23BookLab {...props} mode="topology" />;
}

export function Aes23OfficialLearningMapProtocolLab() {
  return <OfficialAes23BookLab {...props} mode="protocol" />;
}

export function Aes23OfficialLearningMapEvidenceLab() {
  return <OfficialAes23BookLab {...props} mode="evidence" />;
}
