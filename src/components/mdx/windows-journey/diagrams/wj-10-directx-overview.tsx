import { OfficialWindowsJourneyLab } from "./official-windows-journey-lab";

const data = {
  title: "第10章 快到碗里来——DirectX大局观认知",
  label: "第三篇 · DirectX游戏编程基础",
  color: "#a16207",
  soft: "#fefce8",
  chain: [
    "定义目标",
    "识别平台",
    "比较图形接口",
    "选择技术路线",
    "建立练习证据",
    "复盘学习路径",
  ],
  concepts: [
    "第10章 快到碗里来——DirectX大局观认知",
    "10.1 对DirectX的认知",
    "10.1.1 DirectX的目前地位",
    "10.1.2 DirectX的两种不同含义",
    "10.1.3 DirectX的几套开发方案",
    "10.1.4 图形API体系认知",
    "10.1.5 微软的宠儿——DirectX",
    "10.1.6 不甘做备胎——OpenGL",
    "10.2 宿敌的世纪之斗：DirectX与OpenGL的博弈",
    "10.3 DirectX开发环境的配置",
    "10.4 新版DirectXSDK的组件介绍",
    "10.4.1 新版DirectXSDK中现存的组件",
    "10.4.2 新版DirectXSDK中被移除的组件",
    "10.4.3 关于当前2D游戏开发可用的图形API",
    "10.5 对DirectXSDK文件组成的剖析",
    "10.6 让DirectXSDK物尽其用",
    "10.7 选择我们的DirectX学习版本",
    "10.7.1 DirectX的几套版本简介",
    "10.7.2 DirectX11 vs DirectX9，现阶段学哪个好",
    "10.8 当前Direct3D中的两套渲染体系",
    "10.9 Direct3D程序的体系结构",
    "10.10 学习DirectX的两个技巧",
    "10.11 章节小憩",
  ],
} as const;

export function Wj10DirectxOverviewMapLab() {
  return <OfficialWindowsJourneyLab {...data} view="map" />;
}

export function Wj10DirectxOverviewExperimentLab() {
  return <OfficialWindowsJourneyLab {...data} view="experiment" />;
}

export function Wj10DirectxOverviewEvidenceLab() {
  return <OfficialWindowsJourneyLab {...data} view="evidence" />;
}
