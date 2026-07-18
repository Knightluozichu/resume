import { CssSecretsOfficialLab } from "./official-css-secrets-lab";

const chain = [
  "重述视觉契约",
  "选择最少机制",
  "构造正常样本",
  "注入能力缺失",
  "检查语义性能",
  "恢复并签发",
] as const;
const concepts = [
  "第1章 引言",
  "第2章 背景与边框",
  "第3章 形状",
  "第4章 视觉效果",
  "第5章 字体排印",
  "第6章 用户体验",
  "第7章 结构与布局",
  "第8章 过渡与动画",
] as const;

export function CsecOfficialFinalReviewMapLab() {
  return (
    <CssSecretsOfficialLab
      title="《CSS 揭秘》全书总复习 · 问题地图"
      label="CSS Secrets / Map"
      color="#334155"
      soft="#f1f5f9"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}

export function CsecOfficialFinalReviewExperimentLab() {
  return (
    <CssSecretsOfficialLab
      title="《CSS 揭秘》全书总复习 · 技巧实验"
      label="CSS Secrets / Experiment"
      color="#334155"
      soft="#f1f5f9"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}

export function CsecOfficialFinalReviewEvidenceLab() {
  return (
    <CssSecretsOfficialLab
      title="《CSS 揭秘》全书总复习 · 回退证据"
      label="CSS Secrets / Evidence"
      color="#334155"
      soft="#f1f5f9"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
