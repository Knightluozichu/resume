import { OfficialAes23BookLab } from "./official-aes23-book-lab";

const props = {
  unitId: "aes23-official-final-review",
  title: "《汽车电子与软件架构》全书总复习",
  nodes: ["功能需求", "硬件拓扑", "网络软件", "服务部署", "升级回归"],
  focuses: ["目录覆盖", "端到端时延", "平台边界", "单故障", "发布回滚"],
} as const;

export function Aes23OfficialFinalReviewTopologyLab() {
  return <OfficialAes23BookLab {...props} mode="topology" />;
}

export function Aes23OfficialFinalReviewProtocolLab() {
  return <OfficialAes23BookLab {...props} mode="protocol" />;
}

export function Aes23OfficialFinalReviewEvidenceLab() {
  return <OfficialAes23BookLab {...props} mode="evidence" />;
}
