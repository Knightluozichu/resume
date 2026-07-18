import { CssWorldLab } from "./official-css-world-lab";

const nodes = [
  "确定文字书写方向",
  "应用双向算法",
  "设置块流方向",
  "重映射内联与块轴",
  "改写逻辑尺寸",
  "验证混合语言",
] as const;

export function Csw12WritingDirectionsMapLab() {
  return (
    <CssWorldLab
      title="第 12 章 流向的改变 · 盒与流地图"
      label="CSS 世界 · 界面与流向"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Csw12WritingDirectionsExperimentLab() {
  return (
    <CssWorldLab
      title="第 12 章 流向的改变 · 边界实验"
      label="CSS 世界 · 界面与流向"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Csw12WritingDirectionsEvidenceLab() {
  return (
    <CssWorldLab
      title="第 12 章 流向的改变 · 恢复证据"
      label="CSS 世界 · 界面与流向"
      nodes={nodes}
      mode="evidence"
    />
  );
}
