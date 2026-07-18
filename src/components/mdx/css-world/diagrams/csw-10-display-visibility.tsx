import { CssWorldLab } from "./official-css-world-lab";

const nodes = [
  "决定是否生成盒",
  "计算布局占位",
  "传播 visibility",
  "处理后代覆盖",
  "核对交互与可访问性",
  "比较 collapse",
] as const;

export function Csw10DisplayVisibilityMapLab() {
  return (
    <CssWorldLab
      title="第 10 章 元素的显示与隐藏 · 盒与流地图"
      label="CSS 世界 · 界面与流向"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Csw10DisplayVisibilityExperimentLab() {
  return (
    <CssWorldLab
      title="第 10 章 元素的显示与隐藏 · 边界实验"
      label="CSS 世界 · 界面与流向"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Csw10DisplayVisibilityEvidenceLab() {
  return (
    <CssWorldLab
      title="第 10 章 元素的显示与隐藏 · 恢复证据"
      label="CSS 世界 · 界面与流向"
      nodes={nodes}
      mode="evidence"
    />
  );
}
