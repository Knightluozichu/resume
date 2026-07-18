import { OfficialWindowsJourneyLab } from "./official-windows-journey-lab";

const data = {
  title: "第18章 水乳交融的艺术——Alpha混合技术",
  label: "第三篇 · DirectX游戏编程基础",
  color: "#0f766e",
  soft: "#f0fdfa",
  chain: [
    "确认Alpha来源",
    "选择源目标因子",
    "设置混合运算",
    "控制绘制顺序",
    "提交透明图元",
    "检查颜色与覆盖率",
  ],
  concepts: [
    "第18章 水乳交融的艺术——Alpha混合技术",
    "18.1 初识Alpha通道与混合技术",
    "18.2 Direct3D中的融合套路——融合因子",
    "18.3 融合运算方式的取法",
    "18.4 融合因子的取法",
    "18.5 Alpha的三处来源",
    "18.6 Alpha融合使用三步曲",
    "18.7 示例程序D3Ddemo13",
    "18.8 章节小憩",
  ],
} as const;

export function Wj18AlphaBlendingMapLab() {
  return <OfficialWindowsJourneyLab {...data} view="map" />;
}

export function Wj18AlphaBlendingExperimentLab() {
  return <OfficialWindowsJourneyLab {...data} view="experiment" />;
}

export function Wj18AlphaBlendingEvidenceLab() {
  return <OfficialWindowsJourneyLab {...data} view="evidence" />;
}
