"use client";

import {
  CssSecretsEvidenceLab,
  type CssSecretsEvidenceModel,
} from "./css-secrets-evidence-lab";

const model = {
  unitId: "csec-unit-05",
  title: "第 5 章 字体排印",
  question:
    "怎样在语言、字体特性、行盒、装饰线和阅读顺序约束下实现排印，而不把文本栅格化？",
  concepts: [
    "第5章 字体排印",
    "20 连字符断行",
    "21 插入换行",
    "22 文本行的斑马条纹",
    "23 调整 tab 的宽度",
    "24 连字",
    "25 华丽的 & 符号",
    "26 自定义下划线",
    "27 现实中的文字效果",
    "28 环形文字",
  ],
  visualKind: "typography",
  recipes: [
    {
      name: "自定义下划线",
      declaration: "text-decoration-thickness: ...",
      fallback: "浏览器默认下划线",
      explanation: "控制厚度与偏移但保留文本语义",
    },
    {
      name: "连字符",
      declaration: "hyphens: auto",
      fallback: "允许正常换行",
      explanation: "由lang与词典决定合法断词点",
    },
    {
      name: "连字",
      declaration: "font-variant-ligatures: common-ligatures",
      fallback: "普通字形",
      explanation: "使用字体提供的OpenType替换",
    },
  ],
  normalTrace: [
    "“第 5 章 字体排印”从版本化DOM和浏览器基线收集候选声明、初始值与继承值",
    "层叠按来源、重要性、层、特异性、作用域和顺序为“第 5 章 字体排印”选出声明",
    "计算阶段解析相对值、变量、字体与包含块依赖，保存“第 5 章 字体排印”的computed style",
    "布局阶段把计算值转成使用尺寸、位置、行盒或时间样本",
    "绘制与合成生成可截图结果，并交付lang、字体栈、OpenType能力、hyphens、white-space、tab-size、行盒、装饰参数、复制文本、缩放与屏幕阅读顺序。",
  ],
  failureTrace: [
    "“第 5 章 字体排印”复用同一DOM、浏览器、视口、字体、输入和用户偏好",
    "只注入CSS故障：未设置正确lang就启用自动连字符，浏览器按错误词典断词并破坏专有名词",
    "在层叠或计算阶段定位首个丢失、被覆盖、无效或依赖未解析的声明",
    "保存错误使用值、布局盒或绘制层，不用手工修图覆盖差异",
    "依据“语言标签、字体回退、OpenType特性、行高、换行机会、装饰线和可复制文本均被验证”拒绝提交并恢复基线声明",
  ],
  invariant:
    "语言标签、字体回退、OpenType特性、行高、换行机会、装饰线和可复制文本均被验证",
  fault: "未设置正确lang就启用自动连字符，浏览器按错误词典断词并破坏专有名词",
  artifact:
    "lang、字体栈、OpenType能力、hyphens、white-space、tab-size、行盒、装饰参数、复制文本、缩放与屏幕阅读顺序。",
  gates: [
    {
      label: "语义基线",
      detail: "“第 5 章 字体排印”保留可读DOM、内容顺序、原生状态和基础样式。",
    },
    {
      label: "特性与回退",
      detail: "“第 5 章 字体排印”的增强声明有规范锚点、支持边界和可用回退。",
    },
    {
      label: "输入与可读",
      detail:
        "“第 5 章 字体排印”经过键盘、触摸、焦点、缩放、对比和长内容复核。",
    },
    {
      label: "响应与偏好",
      detail:
        "“第 5 章 字体排印”覆盖窄屏、宽屏、减少动态、不支持特性和目标浏览器。",
    },
  ],
} as const satisfies CssSecretsEvidenceModel;

export function Csec05TypographyRenderProbe() {
  return <CssSecretsEvidenceLab model={model} view="render-probe" />;
}

export function Csec05TypographyCascadeTraceLab() {
  return <CssSecretsEvidenceLab model={model} view="cascade-trace" />;
}

export function Csec05TypographyReleaseGateLab() {
  return <CssSecretsEvidenceLab model={model} view="release-gate" />;
}
