import { CssSecretsOfficialLab } from "./official-css-secrets-lab";

const chain = [
  "分离内容与装饰",
  "标出背景绘制区",
  "组合多层图像",
  "校准尺寸与定位",
  "验证透明边界",
  "保留纯色回退",
] as const;
const concepts = [
  "第2章 背景与边框",
  "1 半透明边框",
  "2 多重边框",
  "3 灵活的背景定位",
  "4 边框内圆角",
  "5 条纹背景",
  "6 复杂的背景图案",
  "7 伪随机背景",
  "8 连续的图像边框",
] as const;

export function Csec02BackgroundsBordersMapLab() {
  return (
    <CssSecretsOfficialLab
      title="第 2 章 背景与边框 · 问题地图"
      label="CSS Secrets / Map"
      color="#a21caf"
      soft="#fae8ff"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}

export function Csec02BackgroundsBordersExperimentLab() {
  return (
    <CssSecretsOfficialLab
      title="第 2 章 背景与边框 · 技巧实验"
      label="CSS Secrets / Experiment"
      color="#a21caf"
      soft="#fae8ff"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}

export function Csec02BackgroundsBordersEvidenceLab() {
  return (
    <CssSecretsOfficialLab
      title="第 2 章 背景与边框 · 回退证据"
      label="CSS Secrets / Evidence"
      color="#a21caf"
      soft="#fae8ff"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
