"use client";

import {
  CssSecretsEvidenceLab,
  type CssSecretsEvidenceModel,
} from "./css-secrets-evidence-lab";

const model = {
  unitId: "csec-unit-01",
  title: "第 1 章 引言",
  question:
    "怎样把一个视觉需求转成可验证约束，并判断该由标准特性、回退声明还是脚本处理？",
  concepts: ["第1章 引言", "Web 标准：是敌还是友", "CSS 编码技巧"],
  visualKind: "cascade",
  recipes: [
    {
      name: "依赖值",
      declaration: "background: currentColor",
      fallback: "显式基础色",
      explanation: "让声明复用已计算值而非重复魔数",
    },
    {
      name: "相对单位",
      declaration: "padding: .6em 1em",
      fallback: "保留可读内边距",
      explanation: "组件随字体度量扩展",
    },
    {
      name: "颜色派生",
      declaration: "border-color: color-mix(...)",
      fallback: "先给静态颜色",
      explanation: "增强声明覆盖而不是替换基线",
    },
  ],
  normalTrace: [
    "“第 1 章 引言”从版本化DOM和浏览器基线收集候选声明、初始值与继承值",
    "层叠按来源、重要性、层、特异性、作用域和顺序为“第 1 章 引言”选出声明",
    "计算阶段解析相对值、变量、字体与包含块依赖，保存“第 1 章 引言”的computed style",
    "布局阶段把计算值转成使用尺寸、位置、行盒或时间样本",
    "绘制与合成生成可截图结果，并交付问题陈述、浏览器基线、最小DOM、声明依赖图、指定值与计算值、失败样本、规范锚点、回退和维护说明。",
  ],
  failureTrace: [
    "“第 1 章 引言”复用同一DOM、浏览器、视口、字体、输入和用户偏好",
    "只注入CSS故障：复制一段看似有效的技巧，却没有记录它依赖的背景色、字体度量、包含块或浏览器特性",
    "在层叠或计算阶段定位首个丢失、被覆盖、无效或依赖未解析的声明",
    "保存错误使用值、布局盒或绘制层，不用手工修图覆盖差异",
    "依据“问题、浏览器基线、语义结构、声明依赖和验收截图固定，解法不依赖偶然的默认值”拒绝提交并恢复基线声明",
  ],
  invariant:
    "问题、浏览器基线、语义结构、声明依赖和验收截图固定，解法不依赖偶然的默认值",
  fault:
    "复制一段看似有效的技巧，却没有记录它依赖的背景色、字体度量、包含块或浏览器特性",
  artifact:
    "问题陈述、浏览器基线、最小DOM、声明依赖图、指定值与计算值、失败样本、规范锚点、回退和维护说明。",
  gates: [
    {
      label: "语义基线",
      detail: "“第 1 章 引言”保留可读DOM、内容顺序、原生状态和基础样式。",
    },
    {
      label: "特性与回退",
      detail: "“第 1 章 引言”的增强声明有规范锚点、支持边界和可用回退。",
    },
    {
      label: "输入与可读",
      detail: "“第 1 章 引言”经过键盘、触摸、焦点、缩放、对比和长内容复核。",
    },
    {
      label: "响应与偏好",
      detail:
        "“第 1 章 引言”覆盖窄屏、宽屏、减少动态、不支持特性和目标浏览器。",
    },
  ],
} as const satisfies CssSecretsEvidenceModel;

export function Csec01IntroductionRenderProbe() {
  return <CssSecretsEvidenceLab model={model} view="render-probe" />;
}

export function Csec01IntroductionCascadeTraceLab() {
  return <CssSecretsEvidenceLab model={model} view="cascade-trace" />;
}

export function Csec01IntroductionReleaseGateLab() {
  return <CssSecretsEvidenceLab model={model} view="release-gate" />;
}
