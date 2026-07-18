import { OfficialAes23BookLab } from "./official-aes23-book-lab";

const props = {
  unitId: "aes23-03-software",
  title: "第3章：软件架构与基础软件",
  nodes: ["OSEK基线", "AUTOSAR CP", "RTE与BSW", "AUTOSAR AP", "生命周期"],
  focuses: ["实时挑战", "OSEK OS/COM/NM", "CP分层", "AP通信", "功能集群"],
} as const;

export function Aes2303SoftwareTopologyLab() {
  return <OfficialAes23BookLab {...props} mode="topology" />;
}

export function Aes2303SoftwareProtocolLab() {
  return <OfficialAes23BookLab {...props} mode="protocol" />;
}

export function Aes2303SoftwareEvidenceLab() {
  return <OfficialAes23BookLab {...props} mode="evidence" />;
}
