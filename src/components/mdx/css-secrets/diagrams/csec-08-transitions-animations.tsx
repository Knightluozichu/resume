import { CssSecretsOfficialLab } from "./official-css-secrets-lab";

const chain = [
  "定义状态端点",
  "选择连续或离散",
  "设计时间函数",
  "控制变换原点",
  "处理中途反转",
  "验证减少动态",
] as const;
const concepts = [
  "第8章 过渡与动画",
  "42 缓动效果",
  "43 逐帧动画",
  "44 闪烁效果",
  "45 打字动画",
  "46 状态平滑的动画",
  "47 沿环形路径平移的动画",
] as const;

export function Csec08TransitionsAnimationsMapLab() {
  return (
    <CssSecretsOfficialLab
      title="第 8 章 过渡与动画 · 问题地图"
      label="CSS Secrets / Map"
      color="#c2410c"
      soft="#ffedd5"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}

export function Csec08TransitionsAnimationsExperimentLab() {
  return (
    <CssSecretsOfficialLab
      title="第 8 章 过渡与动画 · 技巧实验"
      label="CSS Secrets / Experiment"
      color="#c2410c"
      soft="#ffedd5"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}

export function Csec08TransitionsAnimationsEvidenceLab() {
  return (
    <CssSecretsOfficialLab
      title="第 8 章 过渡与动画 · 回退证据"
      label="CSS Secrets / Evidence"
      color="#c2410c"
      soft="#ffedd5"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
