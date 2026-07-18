import { CssWorldLab } from "./official-css-world-lab";

const nodes = [
  "拆分规则与声明",
  "辨认属性和值",
  "解析关键字和单位",
  "确定初始与继承",
  "标记未定义行为",
  "建立可移植测试",
] as const;

export function Csw02TermsUndefinedBehaviorMapLab() {
  return (
    <CssWorldLab
      title="第 2 章 需提前了解的术语和概念 · 盒与流地图"
      label="CSS 世界 · 世界观与术语"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Csw02TermsUndefinedBehaviorExperimentLab() {
  return (
    <CssWorldLab
      title="第 2 章 需提前了解的术语和概念 · 边界实验"
      label="CSS 世界 · 世界观与术语"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Csw02TermsUndefinedBehaviorEvidenceLab() {
  return (
    <CssWorldLab
      title="第 2 章 需提前了解的术语和概念 · 恢复证据"
      label="CSS 世界 · 世界观与术语"
      nodes={nodes}
      mode="evidence"
    />
  );
}
