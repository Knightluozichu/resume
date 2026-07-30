"use client";

import {
  CssSecretsEvidenceLab,
  type CssSecretsEvidenceModel,
} from "./css-secrets-evidence-lab";

const model = {
  unitId: "csec-unit-08",
  title: "第 8 章 过渡与动画",
  question:
    "怎样把离散或连续状态映射到时间函数，并在减少动态、暂停、反向和中断时保持可预测？",
  concepts: [
    "第8章 过渡与动画",
    "42 缓动效果",
    "43 逐帧动画",
    "44 闪烁效果",
    "45 打字动画",
    "46 状态平滑的动画",
    "47 沿环形路径平移的动画",
  ],
  visualKind: "motion",
  recipes: [
    {
      name: "弹性缓动",
      declaration: "transition-timing-function: cubic-bezier(...)",
      fallback: "linear或ease",
      explanation: "曲线允许越界但端点仍固定",
    },
    {
      name: "逐帧动画",
      declaration: "animation-timing-function: steps(...)",
      fallback: "静态首帧",
      explanation: "离散跳变与精灵帧数对齐",
    },
    {
      name: "环形路径",
      declaration: "offset-path: circle(...)",
      fallback: "静态终点",
      explanation: "路径位置与朝向分别定义",
    },
  ],
  normalTrace: [
    "“第 8 章 过渡与动画”从版本化DOM和浏览器基线收集候选声明、初始值与继承值",
    "层叠按来源、重要性、层、特异性、作用域和顺序为“第 8 章 过渡与动画”选出声明",
    "计算阶段解析相对值、变量、字体与包含块依赖，保存“第 8 章 过渡与动画”的computed style",
    "布局阶段把计算值转成使用尺寸、位置、行盒或时间样本",
    "绘制与合成生成可截图结果，并交付关键帧、起止计算值、duration、delay、easing、steps、iteration、fill、合成属性、暂停中断和reduced-motion截图。",
  ],
  failureTrace: [
    "“第 8 章 过渡与动画”复用同一DOM、浏览器、视口、字体、输入和用户偏好",
    "只注入CSS故障：用无限闪烁和逐帧动画表达关键信息，却没有暂停控制或prefers-reduced-motion静态替代",
    "在层叠或计算阶段定位首个丢失、被覆盖、无效或依赖未解析的声明",
    "保存错误使用值、布局盒或绘制层，不用手工修图覆盖差异",
    "依据“起止状态、插值类型、时长、缓动、迭代、填充、合成属性和reduced-motion替代均显式”拒绝提交并恢复基线声明",
  ],
  invariant:
    "起止状态、插值类型、时长、缓动、迭代、填充、合成属性和reduced-motion替代均显式",
  fault:
    "用无限闪烁和逐帧动画表达关键信息，却没有暂停控制或prefers-reduced-motion静态替代",
  artifact:
    "关键帧、起止计算值、duration、delay、easing、steps、iteration、fill、合成属性、暂停中断和reduced-motion截图。",
  gates: [
    {
      label: "语义基线",
      detail: "“第 8 章 过渡与动画”保留可读DOM、内容顺序、原生状态和基础样式。",
    },
    {
      label: "特性与回退",
      detail: "“第 8 章 过渡与动画”的增强声明有规范锚点、支持边界和可用回退。",
    },
    {
      label: "输入与可读",
      detail:
        "“第 8 章 过渡与动画”经过键盘、触摸、焦点、缩放、对比和长内容复核。",
    },
    {
      label: "响应与偏好",
      detail:
        "“第 8 章 过渡与动画”覆盖窄屏、宽屏、减少动态、不支持特性和目标浏览器。",
    },
  ],
} as const satisfies CssSecretsEvidenceModel;

export function Csec08TransitionsAnimationsRenderProbe() {
  return <CssSecretsEvidenceLab model={model} view="render-probe" />;
}

export function Csec08TransitionsAnimationsCascadeTraceLab() {
  return <CssSecretsEvidenceLab model={model} view="cascade-trace" />;
}

export function Csec08TransitionsAnimationsReleaseGateLab() {
  return <CssSecretsEvidenceLab model={model} view="release-gate" />;
}
