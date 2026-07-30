"use client";

import {
  CssSecretsEvidenceLab,
  type CssSecretsEvidenceModel,
} from "./css-secrets-evidence-lab";

const model = {
  unitId: "csec-unit-03",
  title: "第 3 章 形状",
  question:
    "怎样从边界框、变换、裁剪路径或渐变角度推导形状，并保持内容不被错误变换？",
  concepts: [
    "第3章 形状",
    "9 自适应的椭圆",
    "10 平行四边形",
    "11 菱形图片",
    "12 切角效果",
    "13 梯形标签页",
    "14 简单的饼图",
  ],
  visualKind: "shape",
  recipes: [
    {
      name: "自适应椭圆",
      declaration: "border-radius: 50%",
      fallback: "普通圆角矩形",
      explanation: "半径相对边框盒随宽高变化",
    },
    {
      name: "切角卡片",
      declaration: "clip-path: polygon(...)",
      fallback: "保留矩形内容",
      explanation: "裁剪视觉外形并检查焦点可见",
    },
    {
      name: "圆锥饼图",
      declaration: "background: conic-gradient(...)",
      fallback: "显示数字文本",
      explanation: "图形只增强比例表达",
    },
  ],
  normalTrace: [
    "“第 3 章 形状”从版本化DOM和浏览器基线收集候选声明、初始值与继承值",
    "层叠按来源、重要性、层、特异性、作用域和顺序为“第 3 章 形状”选出声明",
    "计算阶段解析相对值、变量、字体与包含块依赖，保存“第 3 章 形状”的computed style",
    "布局阶段把计算值转成使用尺寸、位置、行盒或时间样本",
    "绘制与合成生成可截图结果，并交付边界框、半径、变换矩阵、反向内容变换、clip-path顶点、命中测试、比例文本、焦点环和不支持时回退。",
  ],
  failureTrace: [
    "“第 3 章 形状”复用同一DOM、浏览器、视口、字体、输入和用户偏好",
    "只注入CSS故障：对整个按钮做skew而未反向校正内容，文字和点击边界一起倾斜且难以阅读",
    "在层叠或计算阶段定位首个丢失、被覆盖、无效或依赖未解析的声明",
    "保存错误使用值、布局盒或绘制层，不用手工修图覆盖差异",
    "依据“形状边界、内容坐标、命中区域、裁剪回退和宽高比均可测量，装饰几何不改变语义顺序”拒绝提交并恢复基线声明",
  ],
  invariant:
    "形状边界、内容坐标、命中区域、裁剪回退和宽高比均可测量，装饰几何不改变语义顺序",
  fault: "对整个按钮做skew而未反向校正内容，文字和点击边界一起倾斜且难以阅读",
  artifact:
    "边界框、半径、变换矩阵、反向内容变换、clip-path顶点、命中测试、比例文本、焦点环和不支持时回退。",
  gates: [
    {
      label: "语义基线",
      detail: "“第 3 章 形状”保留可读DOM、内容顺序、原生状态和基础样式。",
    },
    {
      label: "特性与回退",
      detail: "“第 3 章 形状”的增强声明有规范锚点、支持边界和可用回退。",
    },
    {
      label: "输入与可读",
      detail: "“第 3 章 形状”经过键盘、触摸、焦点、缩放、对比和长内容复核。",
    },
    {
      label: "响应与偏好",
      detail:
        "“第 3 章 形状”覆盖窄屏、宽屏、减少动态、不支持特性和目标浏览器。",
    },
  ],
} as const satisfies CssSecretsEvidenceModel;

export function Csec03ShapesRenderProbe() {
  return <CssSecretsEvidenceLab model={model} view="render-probe" />;
}

export function Csec03ShapesCascadeTraceLab() {
  return <CssSecretsEvidenceLab model={model} view="cascade-trace" />;
}

export function Csec03ShapesReleaseGateLab() {
  return <CssSecretsEvidenceLab model={model} view="release-gate" />;
}
