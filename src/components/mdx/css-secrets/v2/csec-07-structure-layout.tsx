"use client";

import {
  CssSecretsEvidenceLab,
  type CssSecretsEvidenceModel,
} from "./css-secrets-evidence-lab";

const model = {
  unitId: "csec-unit-07",
  title: "第 7 章 结构与布局",
  question:
    "怎样用内在尺寸、格式化上下文和可用空间解释布局，而不是用固定高度与魔数补丁？",
  concepts: [
    "第7章 结构与布局",
    "36 自适应内部元素",
    "37 精确控制表格列宽",
    "38 根据兄弟元素的数量来设置样式",
    "39 满幅的背景，定宽的内容",
    "40 垂直居中",
    "41 紧贴底部的页脚",
  ],
  visualKind: "layout",
  recipes: [
    {
      name: "内在尺寸",
      declaration: "width: fit-content",
      fallback: "width: auto",
      explanation: "让盒尺寸由内容贡献和可用空间共同限制",
    },
    {
      name: "垂直居中",
      declaration: "display: grid; place-items: center",
      fallback: "正常文档流",
      explanation: "由布局算法分配自由空间",
    },
    {
      name: "紧贴底部页脚",
      declaration: "min-block-size: 100dvb",
      fallback: "内容自然流动",
      explanation: "用flex或grid吸收剩余空间",
    },
  ],
  normalTrace: [
    "“第 7 章 结构与布局”从版本化DOM和浏览器基线收集候选声明、初始值与继承值",
    "层叠按来源、重要性、层、特异性、作用域和顺序为“第 7 章 结构与布局”选出声明",
    "计算阶段解析相对值、变量、字体与包含块依赖，保存“第 7 章 结构与布局”的computed style",
    "布局阶段把计算值转成使用尺寸、位置、行盒或时间样本",
    "绘制与合成生成可截图结果，并交付包含块、min/max-content贡献、轨道、自由空间、表格算法、兄弟数量、长短内容、窄屏、溢出和页脚位置记录。",
  ],
  failureTrace: [
    "“第 7 章 结构与布局”复用同一DOM、浏览器、视口、字体、输入和用户偏好",
    "只注入CSS故障：用固定视口高度减去猜测头部高度实现页脚，内容换行后发生重叠和双滚动",
    "在层叠或计算阶段定位首个丢失、被覆盖、无效或依赖未解析的声明",
    "保存错误使用值、布局盒或绘制层，不用手工修图覆盖差异",
    "依据“包含块、最小与最大内容尺寸、自由空间、溢出和DOM关系固定，布局在内容增长与窄屏下仍成立”拒绝提交并恢复基线声明",
  ],
  invariant:
    "包含块、最小与最大内容尺寸、自由空间、溢出和DOM关系固定，布局在内容增长与窄屏下仍成立",
  fault: "用固定视口高度减去猜测头部高度实现页脚，内容换行后发生重叠和双滚动",
  artifact:
    "包含块、min/max-content贡献、轨道、自由空间、表格算法、兄弟数量、长短内容、窄屏、溢出和页脚位置记录。",
  gates: [
    {
      label: "语义基线",
      detail: "“第 7 章 结构与布局”保留可读DOM、内容顺序、原生状态和基础样式。",
    },
    {
      label: "特性与回退",
      detail: "“第 7 章 结构与布局”的增强声明有规范锚点、支持边界和可用回退。",
    },
    {
      label: "输入与可读",
      detail:
        "“第 7 章 结构与布局”经过键盘、触摸、焦点、缩放、对比和长内容复核。",
    },
    {
      label: "响应与偏好",
      detail:
        "“第 7 章 结构与布局”覆盖窄屏、宽屏、减少动态、不支持特性和目标浏览器。",
    },
  ],
} as const satisfies CssSecretsEvidenceModel;

export function Csec07StructureLayoutRenderProbe() {
  return <CssSecretsEvidenceLab model={model} view="render-probe" />;
}

export function Csec07StructureLayoutCascadeTraceLab() {
  return <CssSecretsEvidenceLab model={model} view="cascade-trace" />;
}

export function Csec07StructureLayoutReleaseGateLab() {
  return <CssSecretsEvidenceLab model={model} view="release-gate" />;
}
