import { OfficialWindowsJourneyLab } from "./official-windows-journey-lab";

const data = {
  title: "第12章 腾飞前的助跑——Direct3D 绘制基础",
  label: "第三篇 · DirectX游戏编程基础",
  color: "#0f766e",
  soft: "#f0fdfa",
  chain: [
    "定义顶点格式",
    "创建缓存",
    "锁定并填充",
    "绑定数据流",
    "提交图元",
    "校验索引边界",
  ],
  concepts: [
    "第12章 腾飞前的助跑——Direct3D 绘制基础",
    "12.1 顶点缓存的逆袭",
    "12.1.1 引言",
    "12.1.2 顶点缓存相关基础知识",
    "12.1.3 顶点缓存使用四步曲之一：设计顶点缓存",
    "12.1.4 顶点缓存使用四步曲之二：创建顶点缓存",
    "12.1.5 顶点缓存使用四步曲之三：访问顶点缓存",
    "12.1.6 顶点缓存使用四步曲之四：图形的绘制",
    "12.1.7 示例程序D3Ddemo3",
    "12.2 索引缓存——顶点缓存的红颜知己",
    "12.2.1 引言",
    "12.2.2 索引缓存的使用思路",
    "12.2.3 相濡以沫的顶点缓存与索引缓存",
    "12.2.4 双剑合璧：顶点缓存、索引缓存使用四步曲",
    "12.2.5 示例程序D3Ddemo4",
    "12.3 章节小憩",
  ],
} as const;

export function Wj12Direct3dDrawingMapLab() {
  return <OfficialWindowsJourneyLab {...data} view="map" />;
}

export function Wj12Direct3dDrawingExperimentLab() {
  return <OfficialWindowsJourneyLab {...data} view="experiment" />;
}

export function Wj12Direct3dDrawingEvidenceLab() {
  return <OfficialWindowsJourneyLab {...data} view="evidence" />;
}
