import { CssWorldLab } from "./official-css-world-lab";

const nodes = [
  "建立世界观",
  "辨认浏览器创造的盒",
  "观察正常流",
  "推演流体布局",
  "划定 CSS 2.1 边界",
  "比较 table 与 CSS3",
] as const;

export function Csw01WorldviewFlowMapLab() {
  return (
    <CssWorldLab
      title="第 1 章 概述 · 盒与流地图"
      label="CSS 世界 · 世界观与术语"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Csw01WorldviewFlowExperimentLab() {
  return (
    <CssWorldLab
      title="第 1 章 概述 · 边界实验"
      label="CSS 世界 · 世界观与术语"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Csw01WorldviewFlowEvidenceLab() {
  return (
    <CssWorldLab
      title="第 1 章 概述 · 恢复证据"
      label="CSS 世界 · 世界观与术语"
      nodes={nodes}
      mode="evidence"
    />
  );
}
