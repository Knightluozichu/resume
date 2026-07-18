import { OfficialWindowsJourneyLab } from "./official-windows-journey-lab";

const data = {
  title: "第16章 起舞不落幕——与纹理映射的华丽邂逅",
  label: "第三篇 · DirectX游戏编程基础",
  color: "#a16207",
  soft: "#fefce8",
  chain: [
    "载入纹理资源",
    "生成纹理坐标",
    "选择过滤器",
    "设置寻址方式",
    "绑定并采样",
    "检查接缝与走样",
  ],
  concepts: [
    "第16章 起舞不落幕——与纹理映射的华丽邂逅",
    "16.1 纹理映射的概念",
    "16.2 纹理映射使用四步曲",
    "16.3 总结与升华",
    "16.4 示例程序D3Ddemo10",
    "16.5 四大纹理过滤方式精讲",
    "16.6 四大纹理寻址方式精讲",
    "16.7 纹理映射知识总结",
    "16.8 示例程序D3Ddemo11",
    "16.9 章节小憩",
  ],
} as const;

export function Wj16TextureMappingMapLab() {
  return <OfficialWindowsJourneyLab {...data} view="map" />;
}

export function Wj16TextureMappingExperimentLab() {
  return <OfficialWindowsJourneyLab {...data} view="experiment" />;
}

export function Wj16TextureMappingEvidenceLab() {
  return <OfficialWindowsJourneyLab {...data} view="evidence" />;
}
