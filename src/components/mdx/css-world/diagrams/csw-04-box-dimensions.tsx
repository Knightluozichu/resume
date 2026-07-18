import { CssWorldLab } from "./official-css-world-lab";

const nodes = [
  "确定 content 来源",
  "计算 padding 空间",
  "求解 margin 外部尺寸",
  "处理 margin 合并",
  "分配 margin:auto",
  "绘制 border 边界",
] as const;

export function Csw04BoxDimensionsMapLab() {
  return (
    <CssWorldLab
      title="第 4 章 盒尺寸四大家族 · 盒与流地图"
      label="CSS 世界 · 流与尺寸"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Csw04BoxDimensionsExperimentLab() {
  return (
    <CssWorldLab
      title="第 4 章 盒尺寸四大家族 · 边界实验"
      label="CSS 世界 · 流与尺寸"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Csw04BoxDimensionsEvidenceLab() {
  return (
    <CssWorldLab
      title="第 4 章 盒尺寸四大家族 · 恢复证据"
      label="CSS 世界 · 流与尺寸"
      nodes={nodes}
      mode="evidence"
    />
  );
}
