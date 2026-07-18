import { OfficialWindowsJourneyLab } from "./official-windows-journey-lab";

const data = {
  title: "第24章 让唯美的雪花飘扬——三维粒子系统的实现",
  label: "第四篇 · DirectX游戏编程应用",
  color: "#0f766e",
  soft: "#f0fdfa",
  chain: [
    "建立粒子池",
    "按速率发射",
    "积分生命周期",
    "剔除死亡粒子",
    "批量绘制",
    "验证确定性与容量",
  ],
  concepts: [
    "第24章 让唯美的雪花飘扬——三维粒子系统的实现",
    "24.1 对粒子系统的基本认知",
    "24.2 粒子系统的基本原理",
    "24.3 雪花粒子系统的设计",
    "24.4 雪花粒子系统的实现",
    "24.5 雪花飞扬粒子类的使用",
    "24.6 示例程序D3Ddemo19",
    "24.7 章节小憩",
  ],
} as const;

export function Wj24ParticleSystemMapLab() {
  return <OfficialWindowsJourneyLab {...data} view="map" />;
}

export function Wj24ParticleSystemExperimentLab() {
  return <OfficialWindowsJourneyLab {...data} view="experiment" />;
}

export function Wj24ParticleSystemEvidenceLab() {
  return <OfficialWindowsJourneyLab {...data} view="evidence" />;
}
