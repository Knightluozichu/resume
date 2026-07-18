import { OfficialAes23BookLab } from "./official-aes23-book-lab";

const props = {
  unitId: "aes23-05-development-ota",
  title: "第5章：软件开发流程及其OTA升级",
  nodes: ["需求与模型", "实现集成", "安全验证", "升级交付", "监控回滚"],
  focuses: ["发展挑战", "模型设计", "V模式与敏捷", "功能安全", "OTA升级"],
} as const;

export function Aes2305DevelopmentOtaTopologyLab() {
  return <OfficialAes23BookLab {...props} mode="topology" />;
}

export function Aes2305DevelopmentOtaProtocolLab() {
  return <OfficialAes23BookLab {...props} mode="protocol" />;
}

export function Aes2305DevelopmentOtaEvidenceLab() {
  return <OfficialAes23BookLab {...props} mode="evidence" />;
}
