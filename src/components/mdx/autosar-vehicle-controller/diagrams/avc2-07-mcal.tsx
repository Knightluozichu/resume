import { OfficialAvc2BookLab } from "./official-avc2-book-lab";

const props = {
  unitId: "avc2-07-mcal",
  title: "第7章：AUTOSAR ECU级开发之MCAL",
  nodes: ["芯片资源", "时钟引脚", "采样输出", "通信通道", "配置生成"],
  focuses: ["配置工具", "Mcu与Gpt", "Port与Dio", "Adc/Pwm/Icu", "Can与资源"],
} as const;

export function Avc207McalArchitectureLab() {
  return <OfficialAvc2BookLab {...props} mode="architecture" />;
}

export function Avc207McalConfigurationLab() {
  return <OfficialAvc2BookLab {...props} mode="configuration" />;
}

export function Avc207McalEvidenceLab() {
  return <OfficialAvc2BookLab {...props} mode="evidence" />;
}
