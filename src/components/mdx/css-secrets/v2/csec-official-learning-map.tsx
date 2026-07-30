"use client";

import {
  CssSecretsEvidenceLab,
  type CssSecretsEvidenceModel,
} from "./css-secrets-evidence-lab";

const model = {
  unitId: "learningMap",
  title: "《CSS Secrets》47项技巧与57个目录坐标学习地图",
  question:
    "怎样保留2015年原书的解题方法，同时用现行CSS规范区分仍成立的机制、已有原生替代和需要回退的技巧？",
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
      name: "目录分母",
      declaration: "--secret-count: 47",
      fallback: "保留8章结构",
      explanation: "47只统计连续编号技巧，57统计公开目录坐标",
    },
    {
      name: "声明最小化",
      declaration: "border: 1px solid",
      fallback: "保持语义结构",
      explanation: "先定义问题约束，再选择最少声明",
    },
    {
      name: "渐进增强",
      declaration: "@supports (...) { ... }",
      fallback: "基础样式可用",
      explanation: "增强层失败时不破坏内容和操作",
    },
  ],
  normalTrace: [
    "“《CSS Secrets》47项技巧与57个目录坐标学习地图”从版本化DOM和浏览器基线收集候选声明、初始值与继承值",
    "层叠按来源、重要性、层、特异性、作用域和顺序为“《CSS Secrets》47项技巧与57个目录坐标学习地图”选出声明",
    "计算阶段解析相对值、变量、字体与包含块依赖，保存“《CSS Secrets》47项技巧与57个目录坐标学习地图”的computed style",
    "布局阶段把计算值转成使用尺寸、位置、行盒或时间样本",
    "绘制与合成生成可截图结果，并交付47项技巧清单、57坐标映射、原版年份标签、声明最小化记录、值处理轨迹、规范锚点、现代替代、回退和浏览器矩阵。",
  ],
  failureTrace: [
    "“《CSS Secrets》47项技巧与57个目录坐标学习地图”复用同一DOM、浏览器、视口、字体、输入和用户偏好",
    "只注入CSS故障：把2026年已有的Grid、现代颜色或新函数反写成2015年原书方案，并省略原始技巧的约束",
    "在层叠或计算阶段定位首个丢失、被覆盖、无效或依赖未解析的声明",
    "保存错误使用值、布局盒或绘制层，不用手工修图覆盖差异",
    "依据“47个编号技巧与57个目录坐标分别计数，每项声明都能追到层叠、计算、使用与绘制结果，现代语法不倒填原书”拒绝提交并恢复基线声明",
  ],
  invariant:
    "47个编号技巧与57个目录坐标分别计数，每项声明都能追到层叠、计算、使用与绘制结果，现代语法不倒填原书",
  fault:
    "把2026年已有的Grid、现代颜色或新函数反写成2015年原书方案，并省略原始技巧的约束",
  artifact:
    "47项技巧清单、57坐标映射、原版年份标签、声明最小化记录、值处理轨迹、规范锚点、现代替代、回退和浏览器矩阵。",
  gates: [
    {
      label: "语义基线",
      detail:
        "“《CSS Secrets》47项技巧与57个目录坐标学习地图”保留可读DOM、内容顺序、原生状态和基础样式。",
    },
    {
      label: "特性与回退",
      detail:
        "“《CSS Secrets》47项技巧与57个目录坐标学习地图”的增强声明有规范锚点、支持边界和可用回退。",
    },
    {
      label: "输入与可读",
      detail:
        "“《CSS Secrets》47项技巧与57个目录坐标学习地图”经过键盘、触摸、焦点、缩放、对比和长内容复核。",
    },
    {
      label: "响应与偏好",
      detail:
        "“《CSS Secrets》47项技巧与57个目录坐标学习地图”覆盖窄屏、宽屏、减少动态、不支持特性和目标浏览器。",
    },
  ],
} as const satisfies CssSecretsEvidenceModel;

export function CsecOfficialLearningMapRenderProbe() {
  return <CssSecretsEvidenceLab model={model} view="render-probe" />;
}

export function CsecOfficialLearningMapCascadeTraceLab() {
  return <CssSecretsEvidenceLab model={model} view="cascade-trace" />;
}

export function CsecOfficialLearningMapReleaseGateLab() {
  return <CssSecretsEvidenceLab model={model} view="release-gate" />;
}
