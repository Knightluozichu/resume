import { CssWorldLab } from "./official-css-world-lab";

const nodes = [
  "观察 float 环绕",
  "用 clear 结束影响",
  "建立 BFC 保护",
  "定义 overflow 边界",
  "求解 absolute 包含块",
  "限制 relative 与 fixed",
] as const;

export function Csw06FlowBreakingProtectionMapLab() {
  return (
    <CssWorldLab
      title="第 6 章 流的破坏与保护 · 盒与流地图"
      label="CSS 世界 · 流、定位与层叠"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Csw06FlowBreakingProtectionExperimentLab() {
  return (
    <CssWorldLab
      title="第 6 章 流的破坏与保护 · 边界实验"
      label="CSS 世界 · 流、定位与层叠"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Csw06FlowBreakingProtectionEvidenceLab() {
  return (
    <CssWorldLab
      title="第 6 章 流的破坏与保护 · 恢复证据"
      label="CSS 世界 · 流、定位与层叠"
      nodes={nodes}
      mode="evidence"
    />
  );
}
