import { CssWorldLab } from "./official-css-world-lab";

const nodes = [
  "读取元素与声明",
  "建立盒树和格式化上下文",
  "求解尺寸与位置",
  "形成行盒和层叠上下文",
  "绘制文本与背景",
  "验证显隐和流向",
] as const;

export function CswOfficialFinalReviewMapLab() {
  return (
    <CssWorldLab
      title="《CSS 世界》全书总复习 · 盒与流地图"
      label="CSS 世界 · 总复习"
      nodes={nodes}
      mode="map"
    />
  );
}
export function CswOfficialFinalReviewExperimentLab() {
  return (
    <CssWorldLab
      title="《CSS 世界》全书总复习 · 边界实验"
      label="CSS 世界 · 总复习"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function CswOfficialFinalReviewEvidenceLab() {
  return (
    <CssWorldLab
      title="《CSS 世界》全书总复习 · 恢复证据"
      label="CSS 世界 · 总复习"
      nodes={nodes}
      mode="evidence"
    />
  );
}
