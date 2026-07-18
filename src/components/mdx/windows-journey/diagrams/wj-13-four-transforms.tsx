import { OfficialWindowsJourneyLab } from "./official-windows-journey-lab";

const data = {
  title: "第13章 迈向三维世界——Direct3D 的四大变换",
  label: "第三篇 · DirectX游戏编程基础",
  color: "#b91c1c",
  soft: "#fef2f2",
  chain: [
    "建立模型坐标",
    "应用世界变换",
    "构造观察变换",
    "执行投影",
    "映射视口",
    "验证空间不变量",
  ],
  concepts: [
    "第13章 迈向三维世界——Direct3D 的四大变换",
    "13.1 四大变换的基本认知",
    "13.2 四大变换之一：世界变换",
    "13.2.1 矩阵的平移",
    "13.2.2 矩阵的旋转",
    "13.2.3 矩阵的缩放",
    "13.3 四大变换之二：取景变换",
    "13.4 四大变换之三：投影变换",
    "13.5 四大变换之四：视口变换",
    "13.6 总结",
    "13.7 示例程序D3Ddemo5",
    "13.8 章节小憩",
  ],
} as const;

export function Wj13FourTransformsMapLab() {
  return <OfficialWindowsJourneyLab {...data} view="map" />;
}

export function Wj13FourTransformsExperimentLab() {
  return <OfficialWindowsJourneyLab {...data} view="experiment" />;
}

export function Wj13FourTransformsEvidenceLab() {
  return <OfficialWindowsJourneyLab {...data} view="evidence" />;
}
