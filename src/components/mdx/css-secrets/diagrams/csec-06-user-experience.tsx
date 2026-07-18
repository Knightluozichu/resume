import { CssSecretsOfficialLab } from "./official-css-secrets-lab";

const chain = [
  "确认原生语义",
  "定义输入状态",
  "扩大命中区域",
  "绘制清晰反馈",
  "处理遮罩与滚动",
  "完成键盘验收",
] as const;
const concepts = [
  "第6章 用户体验",
  "29 选用合适的鼠标光标",
  "30 扩大可点击区域",
  "31 自定义复选框",
  "32 通过阴影来弱化背景",
  "33 通过模糊来弱化背景",
  "34 滚动提示",
  "35 交互式的图片对比控件",
] as const;

export function Csec06UserExperienceMapLab() {
  return (
    <CssSecretsOfficialLab
      title="第 6 章 用户体验 · 问题地图"
      label="CSS Secrets / Map"
      color="#4d7c0f"
      soft="#ecfccb"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}

export function Csec06UserExperienceExperimentLab() {
  return (
    <CssSecretsOfficialLab
      title="第 6 章 用户体验 · 技巧实验"
      label="CSS Secrets / Experiment"
      color="#4d7c0f"
      soft="#ecfccb"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}

export function Csec06UserExperienceEvidenceLab() {
  return (
    <CssSecretsOfficialLab
      title="第 6 章 用户体验 · 回退证据"
      label="CSS Secrets / Evidence"
      color="#4d7c0f"
      soft="#ecfccb"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
