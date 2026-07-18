import { OfficialAvc2BookLab } from "./official-avc2-book-lab";

const props = {
  unitId: "avc2-06-rte-bsw",
  title: "第6章：AUTOSAR ECU级开发之RTE与BSW（除MCAL外）",
  nodes: ["系统抽取", "BSW配置", "RTE Contract", "RTE Generation", "OS构建"],
  focuses: ["RTA工具", "CAN通信栈", "EcuM与BswM", "RTE两阶段", "OS任务调度"],
} as const;

export function Avc206RteBswArchitectureLab() {
  return <OfficialAvc2BookLab {...props} mode="architecture" />;
}

export function Avc206RteBswConfigurationLab() {
  return <OfficialAvc2BookLab {...props} mode="configuration" />;
}

export function Avc206RteBswEvidenceLab() {
  return <OfficialAvc2BookLab {...props} mode="evidence" />;
}
