import { CssWorldLab } from "./official-css-world-lab";

const nodes = [
  "核验 CSS 2.1 身份",
  "建立流与盒模型",
  "推演尺寸和内联",
  "控制脱流与层叠",
  "组织文本与装饰",
  "验证界面和流向",
] as const;

export function CswOfficialLearningMapMapLab() {
  return (
    <CssWorldLab
      title="《CSS 世界》权威学习地图 · 盒与流地图"
      label="CSS 世界 · 导学"
      nodes={nodes}
      mode="map"
    />
  );
}
export function CswOfficialLearningMapExperimentLab() {
  return (
    <CssWorldLab
      title="《CSS 世界》权威学习地图 · 边界实验"
      label="CSS 世界 · 导学"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function CswOfficialLearningMapEvidenceLab() {
  return (
    <CssWorldLab
      title="《CSS 世界》权威学习地图 · 恢复证据"
      label="CSS 世界 · 导学"
      nodes={nodes}
      mode="evidence"
    />
  );
}
