import { CssSecretsOfficialLab } from "./official-css-secrets-lab";

const chain = [
  "定义视觉问题",
  "调查标准能力",
  "建立最小基线",
  "组合属性副作用",
  "设计回退路径",
  "删除重复约束",
] as const;
const concepts = [
  "第1章 引言",
  "Web 标准：是敌还是友",
  "CSS 编码技巧",
] as const;

export function Csec01IntroductionMapLab() {
  return (
    <CssSecretsOfficialLab
      title="第 1 章 引言 · 问题地图"
      label="CSS Secrets / Map"
      color="#1d4ed8"
      soft="#dbeafe"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}

export function Csec01IntroductionExperimentLab() {
  return (
    <CssSecretsOfficialLab
      title="第 1 章 引言 · 技巧实验"
      label="CSS Secrets / Experiment"
      color="#1d4ed8"
      soft="#dbeafe"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}

export function Csec01IntroductionEvidenceLab() {
  return (
    <CssSecretsOfficialLab
      title="第 1 章 引言 · 回退证据"
      label="CSS Secrets / Evidence"
      color="#1d4ed8"
      soft="#dbeafe"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
