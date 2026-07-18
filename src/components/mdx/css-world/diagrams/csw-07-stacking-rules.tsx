import { CssWorldLab } from "./official-css-world-lab";

const nodes = [
  "识别层叠上下文",
  "列出层叠水平",
  "按顺序绘制",
  "比较同级 z-index",
  "封装子上下文",
  "限制层级变量",
] as const;

export function Csw07StackingRulesMapLab() {
  return (
    <CssWorldLab
      title="第 7 章 CSS 世界的层叠规则 · 盒与流地图"
      label="CSS 世界 · 流、定位与层叠"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Csw07StackingRulesExperimentLab() {
  return (
    <CssWorldLab
      title="第 7 章 CSS 世界的层叠规则 · 边界实验"
      label="CSS 世界 · 流、定位与层叠"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Csw07StackingRulesEvidenceLab() {
  return (
    <CssWorldLab
      title="第 7 章 CSS 世界的层叠规则 · 恢复证据"
      label="CSS 世界 · 流、定位与层叠"
      nodes={nodes}
      mode="evidence"
    />
  );
}
