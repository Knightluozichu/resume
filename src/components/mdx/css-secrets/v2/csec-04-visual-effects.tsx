"use client";

import {
  CssSecretsEvidenceLab,
  type CssSecretsEvidenceModel,
} from "./css-secrets-evidence-lab";

const model = {
  unitId: "csec-unit-04",
  title: "第 4 章 视觉效果",
  question:
    "怎样区分盒投影、alpha轮廓投影、滤镜、背景模糊和伪元素层，并控制合成成本？",
  concepts: [
    "第4章 视觉效果",
    "15 单侧投影",
    "16 不规则投影",
    "17 染色效果",
    "18 毛玻璃效果",
    "19 折角效果",
  ],
  visualKind: "effect",
  recipes: [
    {
      name: "不规则投影",
      declaration: "filter: drop-shadow(...)",
      fallback: "box-shadow矩形投影",
      explanation: "沿元素alpha轮廓生成投影",
    },
    {
      name: "毛玻璃",
      declaration: "backdrop-filter: blur(...)",
      fallback: "半透明实色背景",
      explanation: "模糊元素背后的已合成图像",
    },
    {
      name: "染色",
      declaration: "filter: sepia() saturate()",
      fallback: "保留原图",
      explanation: "组合滤镜但不替代信息文本",
    },
  ],
  normalTrace: [
    "“第 4 章 视觉效果”从版本化DOM和浏览器基线收集候选声明、初始值与继承值",
    "层叠按来源、重要性、层、特异性、作用域和顺序为“第 4 章 视觉效果”选出声明",
    "计算阶段解析相对值、变量、字体与包含块依赖，保存“第 4 章 视觉效果”的computed style",
    "布局阶段把计算值转成使用尺寸、位置、行盒或时间样本",
    "绘制与合成生成可截图结果，并交付效果输入、box-shadow或drop-shadow参数、滤镜序列、伪元素层、backdrop范围、对比度、合成性能和回退截图。",
  ],
  failureTrace: [
    "“第 4 章 视觉效果”复用同一DOM、浏览器、视口、字体、输入和用户偏好",
    "只注入CSS故障：对整页内容使用大半径blur并持续动画，造成文字不可读、离屏缓冲放大和滚动掉帧",
    "在层叠或计算阶段定位首个丢失、被覆盖、无效或依赖未解析的声明",
    "保存错误使用值、布局盒或绘制层，不用手工修图覆盖差异",
    "依据“效果作用对象、滤镜输入、模糊采样区、堆叠上下文、回退和性能边界明确”拒绝提交并恢复基线声明",
  ],
  invariant:
    "效果作用对象、滤镜输入、模糊采样区、堆叠上下文、回退和性能边界明确",
  fault:
    "对整页内容使用大半径blur并持续动画，造成文字不可读、离屏缓冲放大和滚动掉帧",
  artifact:
    "效果输入、box-shadow或drop-shadow参数、滤镜序列、伪元素层、backdrop范围、对比度、合成性能和回退截图。",
  gates: [
    {
      label: "语义基线",
      detail: "“第 4 章 视觉效果”保留可读DOM、内容顺序、原生状态和基础样式。",
    },
    {
      label: "特性与回退",
      detail: "“第 4 章 视觉效果”的增强声明有规范锚点、支持边界和可用回退。",
    },
    {
      label: "输入与可读",
      detail:
        "“第 4 章 视觉效果”经过键盘、触摸、焦点、缩放、对比和长内容复核。",
    },
    {
      label: "响应与偏好",
      detail:
        "“第 4 章 视觉效果”覆盖窄屏、宽屏、减少动态、不支持特性和目标浏览器。",
    },
  ],
} as const satisfies CssSecretsEvidenceModel;

export function Csec04VisualEffectsRenderProbe() {
  return <CssSecretsEvidenceLab model={model} view="render-probe" />;
}

export function Csec04VisualEffectsCascadeTraceLab() {
  return <CssSecretsEvidenceLab model={model} view="cascade-trace" />;
}

export function Csec04VisualEffectsReleaseGateLab() {
  return <CssSecretsEvidenceLab model={model} view="release-gate" />;
}
