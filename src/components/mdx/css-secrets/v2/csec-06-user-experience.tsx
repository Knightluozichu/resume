"use client";

import {
  CssSecretsEvidenceLab,
  type CssSecretsEvidenceModel,
} from "./css-secrets-evidence-lab";

const model = {
  unitId: "csec-unit-06",
  title: "第 6 章 用户体验",
  question:
    "怎样让视觉提示、命中区域、焦点、原生语义和模态状态保持一致，并覆盖键盘与触摸？",
  concepts: [
    "第6章 用户体验",
    "29 选用合适的鼠标光标",
    "30 扩大可点击区域",
    "31 自定义复选框",
    "32 通过阴影来弱化背景",
    "33 通过模糊来弱化背景",
    "34 滚动提示",
    "35 交互式的图片对比控件",
  ],
  visualKind: "ux",
  recipes: [
    {
      name: "扩大命中区",
      declaration: "padding: .75rem 1rem",
      fallback: "文本仍可操作",
      explanation: "视觉尺寸和实际命中区同时可测",
    },
    {
      name: "自定义复选框",
      declaration: "input:checked + label",
      fallback: "原生input可见可用",
      explanation: "外观增强不能删除表单语义",
    },
    {
      name: "滚动提示",
      declaration: "background-attachment: local",
      fallback: "保留滚动条",
      explanation: "渐变只提示还有内容",
    },
  ],
  normalTrace: [
    "“第 6 章 用户体验”从版本化DOM和浏览器基线收集候选声明、初始值与继承值",
    "层叠按来源、重要性、层、特异性、作用域和顺序为“第 6 章 用户体验”选出声明",
    "计算阶段解析相对值、变量、字体与包含块依赖，保存“第 6 章 用户体验”的computed style",
    "布局阶段把计算值转成使用尺寸、位置、行盒或时间样本",
    "绘制与合成生成可截图结果，并交付语义控件、label关系、焦点顺序、命中尺寸、cursor、checked状态、模态背景、滚动边界、键盘触摸和读屏记录。",
  ],
  failureTrace: [
    "“第 6 章 用户体验”复用同一DOM、浏览器、视口、字体、输入和用户偏好",
    "只注入CSS故障：用display:none隐藏原生复选框并用无语义span替代，键盘和读屏无法切换",
    "在层叠或计算阶段定位首个丢失、被覆盖、无效或依赖未解析的声明",
    "保存错误使用值、布局盒或绘制层，不用手工修图覆盖差异",
    "依据“可点击区域不小于产品基线，原生控件语义保留，焦点可见，背景不可误操作，滚动状态可感知”拒绝提交并恢复基线声明",
  ],
  invariant:
    "可点击区域不小于产品基线，原生控件语义保留，焦点可见，背景不可误操作，滚动状态可感知",
  fault: "用display:none隐藏原生复选框并用无语义span替代，键盘和读屏无法切换",
  artifact:
    "语义控件、label关系、焦点顺序、命中尺寸、cursor、checked状态、模态背景、滚动边界、键盘触摸和读屏记录。",
  gates: [
    {
      label: "语义基线",
      detail: "“第 6 章 用户体验”保留可读DOM、内容顺序、原生状态和基础样式。",
    },
    {
      label: "特性与回退",
      detail: "“第 6 章 用户体验”的增强声明有规范锚点、支持边界和可用回退。",
    },
    {
      label: "输入与可读",
      detail:
        "“第 6 章 用户体验”经过键盘、触摸、焦点、缩放、对比和长内容复核。",
    },
    {
      label: "响应与偏好",
      detail:
        "“第 6 章 用户体验”覆盖窄屏、宽屏、减少动态、不支持特性和目标浏览器。",
    },
  ],
} as const satisfies CssSecretsEvidenceModel;

export function Csec06UserExperienceRenderProbe() {
  return <CssSecretsEvidenceLab model={model} view="render-probe" />;
}

export function Csec06UserExperienceCascadeTraceLab() {
  return <CssSecretsEvidenceLab model={model} view="cascade-trace" />;
}

export function Csec06UserExperienceReleaseGateLab() {
  return <CssSecretsEvidenceLab model={model} view="release-gate" />;
}
