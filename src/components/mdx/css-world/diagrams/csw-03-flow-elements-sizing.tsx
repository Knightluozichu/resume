import { CssWorldLab } from "./official-css-world-lab";

const nodes = [
  "辨认外在与内在盒",
  "求解 width:auto",
  "应用宽度分离",
  "约束最小最大尺寸",
  "建立内联盒模型",
  "排查幽灵空白",
] as const;

export function Csw03FlowElementsSizingMapLab() {
  return (
    <CssWorldLab
      title="第 3 章 流、元素与基本尺寸 · 盒与流地图"
      label="CSS 世界 · 流与尺寸"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Csw03FlowElementsSizingExperimentLab() {
  return (
    <CssWorldLab
      title="第 3 章 流、元素与基本尺寸 · 边界实验"
      label="CSS 世界 · 流与尺寸"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Csw03FlowElementsSizingEvidenceLab() {
  return (
    <CssWorldLab
      title="第 3 章 流、元素与基本尺寸 · 恢复证据"
      label="CSS 世界 · 流与尺寸"
      nodes={nodes}
      mode="evidence"
    />
  );
}
