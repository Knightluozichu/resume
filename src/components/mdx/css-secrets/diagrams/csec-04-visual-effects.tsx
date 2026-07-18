import { CssSecretsOfficialLab } from "./official-css-secrets-lab";

const chain = [
  "识别目标轮廓",
  "选择绘制阶段",
  "裁剪多余阴影",
  "建立背景采样",
  "控制对比度",
  "验证无滤镜回退",
] as const;
const concepts = [
  "第4章 视觉效果",
  "15 单侧投影",
  "16 不规则投影",
  "17 染色效果",
  "18 毛玻璃效果",
  "19 折角效果",
] as const;

export function Csec04VisualEffectsMapLab() {
  return (
    <CssSecretsOfficialLab
      title="第 4 章 视觉效果 · 问题地图"
      label="CSS Secrets / Map"
      color="#be123c"
      soft="#ffe4e6"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}

export function Csec04VisualEffectsExperimentLab() {
  return (
    <CssSecretsOfficialLab
      title="第 4 章 视觉效果 · 技巧实验"
      label="CSS Secrets / Experiment"
      color="#be123c"
      soft="#ffe4e6"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}

export function Csec04VisualEffectsEvidenceLab() {
  return (
    <CssSecretsOfficialLab
      title="第 4 章 视觉效果 · 回退证据"
      label="CSS Secrets / Evidence"
      color="#be123c"
      soft="#ffe4e6"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
