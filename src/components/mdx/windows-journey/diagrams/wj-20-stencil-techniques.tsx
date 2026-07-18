import { OfficialWindowsJourneyLab } from "./official-windows-journey-lab";

const data = {
  title: "第20章 虚实结合的光影——模板技术",
  label: "第三篇 · DirectX游戏编程基础",
  color: "#047857",
  soft: "#ecfdf5",
  chain: [
    "创建模板缓存",
    "清理参考值",
    "配置比较与操作",
    "写入遮罩区域",
    "绘制受限效果",
    "恢复渲染状态",
  ],
  concepts: [
    "第20章 虚实结合的光影——模板技术",
    "20.1 对模板技术中概念的理解",
    "20.1.1 模板缓存",
    "20.1.2 模板测试",
    "20.2 模板测试精细讲解",
    "20.2.1 创建模板缓冲区",
    "20.2.2 清除模板缓冲区",
    "20.2.3 模板测试相关参数介绍",
    "20.2.4 对模板测试的一些理解",
    "20.3 镜面特效的实现",
    "20.4 通过实例程序讲解",
    "20.5 示例程序D3Ddemo15",
    "20.6 章节小憩",
  ],
} as const;

export function Wj20StencilTechniquesMapLab() {
  return <OfficialWindowsJourneyLab {...data} view="map" />;
}

export function Wj20StencilTechniquesExperimentLab() {
  return <OfficialWindowsJourneyLab {...data} view="experiment" />;
}

export function Wj20StencilTechniquesEvidenceLab() {
  return <OfficialWindowsJourneyLab {...data} view="evidence" />;
}
