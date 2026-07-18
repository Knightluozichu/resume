import { CssWorldLab } from "./official-css-world-lab";

const nodes = [
  "读取字体 x-height",
  "建立内容区域",
  "计算行内盒",
  "形成行框盒",
  "应用 line-height",
  "按基线 vertical-align",
] as const;

export function Csw05InlineFlowMapLab() {
  return (
    <CssWorldLab
      title="第 5 章 内联元素与流 · 盒与流地图"
      label="CSS 世界 · 流与尺寸"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Csw05InlineFlowExperimentLab() {
  return (
    <CssWorldLab
      title="第 5 章 内联元素与流 · 边界实验"
      label="CSS 世界 · 流与尺寸"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Csw05InlineFlowEvidenceLab() {
  return (
    <CssWorldLab
      title="第 5 章 内联元素与流 · 恢复证据"
      label="CSS 世界 · 流与尺寸"
      nodes={nodes}
      mode="evidence"
    />
  );
}
