import { OfficialWindowsJourneyLab } from "./official-windows-journey-lab";

const data = {
  title: "第19章 横看成岭侧成峰——深度测试与Z缓存",
  label: "第三篇 · DirectX游戏编程基础",
  color: "#b91c1c",
  soft: "#fef2f2",
  chain: [
    "创建深度表面",
    "清理深度缓存",
    "选择比较函数",
    "启用深度写入",
    "绘制遮挡场景",
    "检查近远面与精度",
  ],
  concepts: [
    "第19章 横看成岭侧成峰——深度测试与Z缓存",
    "19.1 形象化理解深度测试",
    "19.2 深度测试相关概念讲解",
    "19.3 深度测试使用四步曲",
    "19.4 示例程序D3Ddemo14",
    "19.5 章节小憩",
  ],
} as const;

export function Wj19DepthZBufferMapLab() {
  return <OfficialWindowsJourneyLab {...data} view="map" />;
}

export function Wj19DepthZBufferExperimentLab() {
  return <OfficialWindowsJourneyLab {...data} view="experiment" />;
}

export function Wj19DepthZBufferEvidenceLab() {
  return <OfficialWindowsJourneyLab {...data} view="evidence" />;
}
