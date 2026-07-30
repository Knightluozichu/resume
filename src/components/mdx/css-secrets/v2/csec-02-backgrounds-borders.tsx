"use client";

import {
  CssSecretsEvidenceLab,
  type CssSecretsEvidenceModel,
} from "./css-secrets-evidence-lab";

const model = {
  unitId: "csec-unit-02",
  title: "第 2 章 背景与边框",
  question:
    "怎样把多个背景层、边框绘制区和渐变尺寸写成可计算的层序，而不是靠截图猜位置？",
  concepts: [
    "第2章 背景与边框",
    "1 半透明边框",
    "2 多重边框",
    "3 灵活的背景定位",
    "4 边框内圆角",
    "5 条纹背景",
    "6 复杂的背景图案",
    "7 伪随机背景",
    "8 连续的图像边框",
  ],
  visualKind: "background",
  recipes: [
    {
      name: "半透明边框",
      declaration: "background-clip: padding-box",
      fallback: "实色边框",
      explanation: "阻止背景绘制到透明边框下方",
    },
    {
      name: "条纹周期",
      declaration: "repeating-linear-gradient(...)",
      fallback: "单色背景",
      explanation: "把色标距离写成可复算周期",
    },
    {
      name: "连续图像边框",
      declaration: "border-image: ... 1",
      fallback: "普通solid边框",
      explanation: "让切片和填充随盒尺寸延续",
    },
  ],
  normalTrace: [
    "“第 2 章 背景与边框”从版本化DOM和浏览器基线收集候选声明、初始值与继承值",
    "层叠按来源、重要性、层、特异性、作用域和顺序为“第 2 章 背景与边框”选出声明",
    "计算阶段解析相对值、变量、字体与包含块依赖，保存“第 2 章 背景与边框”的computed style",
    "布局阶段把计算值转成使用尺寸、位置、行盒或时间样本",
    "绘制与合成生成可截图结果，并交付background层序、origin与clip、位置、尺寸、色标周期、border-radius、border-image切片、三档尺寸截图和回退。",
  ],
  failureTrace: [
    "“第 2 章 背景与边框”复用同一DOM、浏览器、视口、字体、输入和用户偏好",
    "只注入CSS故障：半透明边框下的背景延伸到border-box，视觉上看不到透明效果且换背景后颜色污染",
    "在层叠或计算阶段定位首个丢失、被覆盖、无效或依赖未解析的声明",
    "保存错误使用值、布局盒或绘制层，不用手工修图覆盖差异",
    "依据“背景层顺序、绘制区域、定位区域、尺寸、重复周期和边框盒均显式，透明层下方颜色可追溯”拒绝提交并恢复基线声明",
  ],
  invariant:
    "背景层顺序、绘制区域、定位区域、尺寸、重复周期和边框盒均显式，透明层下方颜色可追溯",
  fault:
    "半透明边框下的背景延伸到border-box，视觉上看不到透明效果且换背景后颜色污染",
  artifact:
    "background层序、origin与clip、位置、尺寸、色标周期、border-radius、border-image切片、三档尺寸截图和回退。",
  gates: [
    {
      label: "语义基线",
      detail: "“第 2 章 背景与边框”保留可读DOM、内容顺序、原生状态和基础样式。",
    },
    {
      label: "特性与回退",
      detail: "“第 2 章 背景与边框”的增强声明有规范锚点、支持边界和可用回退。",
    },
    {
      label: "输入与可读",
      detail:
        "“第 2 章 背景与边框”经过键盘、触摸、焦点、缩放、对比和长内容复核。",
    },
    {
      label: "响应与偏好",
      detail:
        "“第 2 章 背景与边框”覆盖窄屏、宽屏、减少动态、不支持特性和目标浏览器。",
    },
  ],
} as const satisfies CssSecretsEvidenceModel;

export function Csec02BackgroundsBordersRenderProbe() {
  return <CssSecretsEvidenceLab model={model} view="render-probe" />;
}

export function Csec02BackgroundsBordersCascadeTraceLab() {
  return <CssSecretsEvidenceLab model={model} view="cascade-trace" />;
}

export function Csec02BackgroundsBordersReleaseGateLab() {
  return <CssSecretsEvidenceLab model={model} view="release-gate" />;
}
