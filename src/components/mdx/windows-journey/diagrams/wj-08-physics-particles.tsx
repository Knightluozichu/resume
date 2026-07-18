import { OfficialWindowsJourneyLab } from "./official-windows-journey-lab";

const data = {
  title: "第8章 玄妙的物理——物理建模与粒子系统初步",
  label: "第二篇 · GDI 2D游戏编程",
  color: "#047857",
  soft: "#ecfdf5",
  chain: [
    "定义状态量",
    "积分运动",
    "施加约束",
    "生成与回收粒子",
    "绘制当前状态",
    "比较守恒误差",
  ],
  concepts: [
    "第8章 玄妙的物理——物理建模与粒子系统初步",
    "8.1 基础物理建模初步",
    "8.1.1 匀速与加速运动模拟",
    "8.1.2 重力系统模拟",
    "8.1.3 摩擦力系统模拟",
    "8.2 粒子系统初步",
    "8.2.1 基本概念",
    "8.2.2 雪花飞舞示例程序",
    "8.2.3 星光绽放示例程序",
    "8.3 章节小憩",
  ],
} as const;

export function Wj08PhysicsParticlesMapLab() {
  return <OfficialWindowsJourneyLab {...data} view="map" />;
}

export function Wj08PhysicsParticlesExperimentLab() {
  return <OfficialWindowsJourneyLab {...data} view="experiment" />;
}

export function Wj08PhysicsParticlesEvidenceLab() {
  return <OfficialWindowsJourneyLab {...data} view="evidence" />;
}
