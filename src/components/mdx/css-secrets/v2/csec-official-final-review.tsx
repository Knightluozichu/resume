"use client";

import {
  CssSecretsEvidenceLab,
  type CssSecretsEvidenceModel,
} from "./css-secrets-evidence-lab";

const model = {
  unitId: "finalReview",
  title: "《CSS Secrets》综合复核：声明、计算值与绘制证据",
  question:
    "怎样证明一个CSS技巧来自明确约束，经层叠和布局得到可解释结果，并在不支持或减少动态时安全回退？",
  concepts: [
    "第 1 章 引言",
    "第 2 章 背景与边框",
    "第 3 章 形状",
    "第 4 章 视觉效果",
    "第 5 章 字体排印",
    "第 6 章 用户体验",
    "第 7 章 结构与布局",
    "第 8 章 过渡与动画",
  ],
  visualKind: "cascade",
  recipes: [
    {
      name: "绘制层",
      declaration: "background + border + filter",
      fallback: "基础盒可读",
      explanation: "逐层增加效果并保留来源",
    },
    {
      name: "布局合同",
      declaration: "minmax() + fit-content",
      fallback: "正常文档流",
      explanation: "内容增长时不依赖固定高度",
    },
    {
      name: "偏好回退",
      declaration: "@media (prefers-reduced-motion)",
      fallback: "静态终态",
      explanation: "动态不是理解内容的唯一途径",
    },
  ],
  normalTrace: [
    "“《CSS Secrets》综合复核：声明、计算值与绘制证据”从版本化DOM和浏览器基线收集候选声明、初始值与继承值",
    "层叠按来源、重要性、层、特异性、作用域和顺序为“《CSS Secrets》综合复核：声明、计算值与绘制证据”选出声明",
    "计算阶段解析相对值、变量、字体与包含块依赖，保存“《CSS Secrets》综合复核：声明、计算值与绘制证据”的computed style",
    "布局阶段把计算值转成使用尺寸、位置、行盒或时间样本",
    "绘制与合成生成可截图结果，并交付47项技巧检查、57坐标映射、语义DOM、声明依赖、指定与计算值、布局盒、绘制层、输入测试、浏览器矩阵和回退。",
  ],
  failureTrace: [
    "“《CSS Secrets》综合复核：声明、计算值与绘制证据”复用同一DOM、浏览器、视口、字体、输入和用户偏好",
    "只注入CSS故障：只提交理想浏览器截图，没有指定值、计算值、窄屏、键盘、减少动态或不支持特性的证据",
    "在层叠或计算阶段定位首个丢失、被覆盖、无效或依赖未解析的声明",
    "保存错误使用值、布局盒或绘制层，不用手工修图覆盖差异",
    "依据“DOM语义、浏览器基线、声明来源、计算值、布局尺寸、绘制层、交互状态和回退形成可重放证据链”拒绝提交并恢复基线声明",
  ],
  invariant:
    "DOM语义、浏览器基线、声明来源、计算值、布局尺寸、绘制层、交互状态和回退形成可重放证据链",
  fault:
    "只提交理想浏览器截图，没有指定值、计算值、窄屏、键盘、减少动态或不支持特性的证据",
  artifact:
    "47项技巧检查、57坐标映射、语义DOM、声明依赖、指定与计算值、布局盒、绘制层、输入测试、浏览器矩阵和回退。",
  gates: [
    {
      label: "语义基线",
      detail:
        "“《CSS Secrets》综合复核：声明、计算值与绘制证据”保留可读DOM、内容顺序、原生状态和基础样式。",
    },
    {
      label: "特性与回退",
      detail:
        "“《CSS Secrets》综合复核：声明、计算值与绘制证据”的增强声明有规范锚点、支持边界和可用回退。",
    },
    {
      label: "输入与可读",
      detail:
        "“《CSS Secrets》综合复核：声明、计算值与绘制证据”经过键盘、触摸、焦点、缩放、对比和长内容复核。",
    },
    {
      label: "响应与偏好",
      detail:
        "“《CSS Secrets》综合复核：声明、计算值与绘制证据”覆盖窄屏、宽屏、减少动态、不支持特性和目标浏览器。",
    },
  ],
} as const satisfies CssSecretsEvidenceModel;

export function CsecOfficialFinalReviewRenderProbe() {
  return <CssSecretsEvidenceLab model={model} view="render-probe" />;
}

export function CsecOfficialFinalReviewCascadeTraceLab() {
  return <CssSecretsEvidenceLab model={model} view="cascade-trace" />;
}

export function CsecOfficialFinalReviewReleaseGateLab() {
  return <CssSecretsEvidenceLab model={model} view="release-gate" />;
}
