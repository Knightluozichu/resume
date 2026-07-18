import { CssSecretsOfficialLab } from "./official-css-secrets-lab";

const chain = [
  "核验版本目录",
  "建立编码原则",
  "推演绘制技巧",
  "保护文本交互",
  "验证布局动效",
  "签发回退证据",
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

export function CsecOfficialLearningMapMapLab() {
  return (
    <CssSecretsOfficialLab
      title="《CSS 揭秘》权威学习地图 · 问题地图"
      label="CSS Secrets / Map"
      color="#0f766e"
      soft="#ccfbf1"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}

export function CsecOfficialLearningMapExperimentLab() {
  return (
    <CssSecretsOfficialLab
      title="《CSS 揭秘》权威学习地图 · 技巧实验"
      label="CSS Secrets / Experiment"
      color="#0f766e"
      soft="#ccfbf1"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}

export function CsecOfficialLearningMapEvidenceLab() {
  return (
    <CssSecretsOfficialLab
      title="《CSS 揭秘》权威学习地图 · 回退证据"
      label="CSS Secrets / Evidence"
      color="#0f766e"
      soft="#ccfbf1"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
