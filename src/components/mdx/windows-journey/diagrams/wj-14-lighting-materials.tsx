import { OfficialWindowsJourneyLab } from "./official-windows-journey-lab";

const data = {
  title: "第14章 绘制出质感的世界—光照与材质",
  label: "第三篇 · DirectX游戏编程基础",
  color: "#047857",
  soft: "#ecfdf5",
  chain: [
    "准备法线",
    "定义材质",
    "配置光源",
    "计算光照分量",
    "绘制几何体",
    "检查空间与归一化",
  ],
  concepts: [
    "第14章 绘制出质感的世界—光照与材质",
    "14.1 引言",
    "14.2 四大光照类型",
    "14.3 三大光源类型",
    "14.4 材质",
    "14.5 关于顶点法线",
    "14.6 总结与升华",
    "14.7 几何体的快捷绘制",
    "14.7.1 D3D中内置的几何体概述",
    "14.7.2 D3D中几种内置的几何体绘制四步曲",
    "14.7.3 D3D中几种内置几何体的创建",
    "14.8 示例程序D3Ddemo7",
    "14.9 章节小憩",
  ],
} as const;

export function Wj14LightingMaterialsMapLab() {
  return <OfficialWindowsJourneyLab {...data} view="map" />;
}

export function Wj14LightingMaterialsExperimentLab() {
  return <OfficialWindowsJourneyLab {...data} view="experiment" />;
}

export function Wj14LightingMaterialsEvidenceLab() {
  return <OfficialWindowsJourneyLab {...data} view="evidence" />;
}
