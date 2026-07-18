import { OfficialGea3Lab } from "./official-gea3-lab";

const props = {
  unitId: "gea3-chapter-09-human-interface",
  title: "第9章 Human Interface Devices (HID)",
  nodes: [
    "枚举设备",
    "采样原始信号",
    "归一化与滤波",
    "映射逻辑动作",
    "输出反馈并测延迟",
  ],
  focuses: ["热插拔", "死区滤波", "动作映射", "可访问性", "端到端延迟"],
};

export function Gea3Chapter09HumanInterfaceMapLab() {
  return <OfficialGea3Lab {...props} initialView="map" />;
}

export function Gea3Chapter09HumanInterfaceExperimentLab() {
  return <OfficialGea3Lab {...props} initialView="experiment" />;
}

export function Gea3Chapter09HumanInterfaceEvidenceLab() {
  return <OfficialGea3Lab {...props} initialView="evidence" />;
}
