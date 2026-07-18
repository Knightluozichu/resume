import { OfficialWindowsJourneyLab } from "./official-windows-journey-lab";

const data = {
  title: "第21章 翱翔于三维空间——游戏摄像机的构建",
  label: "第四篇 · DirectX游戏编程应用",
  color: "#1d4ed8",
  soft: "#eff6ff",
  chain: [
    "维护位置朝向",
    "计算基向量",
    "响应移动旋转",
    "构造观察矩阵",
    "同步投影参数",
    "验证视图连续性",
  ],
  concepts: [
    "第21章 翱翔于三维空间——游戏摄像机的构建",
    "21.1 对摄像机的一些概述",
    "21.2 开始设计摄像机类",
    "21.3 关于向量计算的函数讲解",
    "21.4 计算取景变换矩阵",
    "21.5 类的其余实现细节",
    "21.6 示例程序D3Ddemo16",
    "21.7 章节小憩",
  ],
} as const;

export function Wj21GameCameraMapLab() {
  return <OfficialWindowsJourneyLab {...data} view="map" />;
}

export function Wj21GameCameraExperimentLab() {
  return <OfficialWindowsJourneyLab {...data} view="experiment" />;
}

export function Wj21GameCameraEvidenceLab() {
  return <OfficialWindowsJourneyLab {...data} view="evidence" />;
}
