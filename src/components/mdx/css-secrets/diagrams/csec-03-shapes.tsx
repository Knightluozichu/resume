import { CssSecretsOfficialLab } from "./official-css-secrets-lab";

const chain = [
  "确定基础矩形",
  "选择几何原语",
  "隔离内容坐标",
  "调整变换原点",
  "注入非方形边界",
  "验证自适应尺寸",
] as const;
const concepts = [
  "第3章 形状",
  "9 自适应的椭圆",
  "10 平行四边形",
  "11 菱形图片",
  "12 切角效果",
  "13 梯形标签页",
  "14 简单的饼图",
] as const;

export function Csec03ShapesMapLab() {
  return (
    <CssSecretsOfficialLab
      title="第 3 章 形状 · 问题地图"
      label="CSS Secrets / Map"
      color="#b45309"
      soft="#fef3c7"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}

export function Csec03ShapesExperimentLab() {
  return (
    <CssSecretsOfficialLab
      title="第 3 章 形状 · 技巧实验"
      label="CSS Secrets / Experiment"
      color="#b45309"
      soft="#fef3c7"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}

export function Csec03ShapesEvidenceLab() {
  return (
    <CssSecretsOfficialLab
      title="第 3 章 形状 · 回退证据"
      label="CSS Secrets / Evidence"
      color="#b45309"
      soft="#fef3c7"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
