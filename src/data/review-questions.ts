/**
 * 复习系统题库（聚合器）。
 *
 * 对外单一入口：引擎（components/review/engine.ts）与各 UI 组件都从这里 import，
 * 导出名与签名保持稳定（REVIEW_QUESTIONS / ReviewQuestion / ReviewLevel /
 * CHAPTER_TITLES / LEVEL_LABELS / ReviewChapterSlug / REVIEW_QUESTION_COUNT）。
 *
 * Phase B 把题库扩到 ~500 题：题目按章拆进 src/data/review/<chapter>.ts，
 * 7 个并行 subagent 各写各的章节文件互不冲突；本文件只负责「重导出类型/常量 +
 * 把 7 章数组拼成全集」，不再内联题目数据。
 *
 * 答案文案约定（卡片富文本渲染，见 components/review/rich-text.tsx）：
 *  - 行内代码 `code`（反引号）渲染为等宽 code 片段；
 *  - 行内数学 `$...$` 走 KaTeX；其余纯文本，`\n` 保留换行。
 *
 * 本模块被 ReviewApp 的 next/dynamic(ssr:false) 边界懒加载，切成独立 chunk、
 * 不进 /review 首屏关键路径（与全站 WebGL/重数据同一原则）。
 */

import { basicLightingQuestions } from "./review/basic-lighting";
import { cameraQuestions } from "./review/camera";
import { colorsQuestions } from "./review/colors";
import { coordinateSystemsQuestions } from "./review/coordinate-systems";
import { helloTriangleQuestions } from "./review/hello-triangle";
import { helloWindowQuestions } from "./review/hello-window";
import { lightCastersQuestions } from "./review/light-casters";
import { lightingMapsQuestions } from "./review/lighting-maps";
import { materialsQuestions } from "./review/materials";
import { multipleLightsQuestions } from "./review/multiple-lights";
import { shadersQuestions } from "./review/shaders";
import { texturesQuestions } from "./review/textures";
import { transformationsQuestions } from "./review/transformations";
import { assimpQuestions } from "./review/assimp";
import { meshQuestions } from "./review/mesh";
import { modelQuestions } from "./review/model";
import { depthTestingQuestions } from "./review/depth-testing";
import { stencilTestingQuestions } from "./review/stencil-testing";
import { blendingQuestions } from "./review/blending";
import { faceCullingQuestions } from "./review/face-culling";
import { framebuffersQuestions } from "./review/framebuffers";
import { cubemapsQuestions } from "./review/cubemaps";
import { advancedDataQuestions } from "./review/advanced-data";
import { advancedGlslQuestions } from "./review/advanced-glsl";
import { geometryShaderQuestions } from "./review/geometry-shader";
import { instancingQuestions } from "./review/instancing";
import { antiAliasingQuestions } from "./review/anti-aliasing";
import { cppGettingStartedQuestions } from "./review/cpp-getting-started";
import { cppVariablesAndTypesQuestions } from "./review/cpp-variables-and-types";
import { cppStringsVectorsArraysQuestions } from "./review/cpp-strings-vectors-arrays";
import { cppExpressionsQuestions } from "./review/cpp-expressions";
import { cppStatementsQuestions } from "./review/cpp-statements";
import { cppFunctionsQuestions } from "./review/cpp-functions";

export {
  CHAPTER_TITLES,
  LEVEL_LABELS,
  type ReviewChapterSlug,
  type ReviewLevel,
  type ReviewQuestion,
} from "./review/types";

import type { ReviewQuestion } from "./review/types";

/** 全库（按入门 7 章 + 光照 6 章顺序拼接）。各章数组顺序即卡片自检/小结里的默认章序。 */
export const REVIEW_QUESTIONS: ReviewQuestion[] = [
  ...helloWindowQuestions,
  ...helloTriangleQuestions,
  ...shadersQuestions,
  ...texturesQuestions,
  ...transformationsQuestions,
  ...coordinateSystemsQuestions,
  ...cameraQuestions,
  ...colorsQuestions,
  ...basicLightingQuestions,
  ...materialsQuestions,
  ...lightingMapsQuestions,
  ...lightCastersQuestions,
  ...multipleLightsQuestions,
  ...assimpQuestions,
  ...meshQuestions,
  ...modelQuestions,
  ...depthTestingQuestions,
  ...stencilTestingQuestions,
  ...blendingQuestions,
  ...faceCullingQuestions,
  ...framebuffersQuestions,
  ...cubemapsQuestions,
  ...advancedDataQuestions,
  ...advancedGlslQuestions,
  ...geometryShaderQuestions,
  ...instancingQuestions,
  ...antiAliasingQuestions,
  ...cppGettingStartedQuestions,
  ...cppVariablesAndTypesQuestions,
  ...cppStringsVectorsArraysQuestions,
  ...cppExpressionsQuestions,
  ...cppStatementsQuestions,
  ...cppFunctionsQuestions,
];

/** 题库总数（自检/小结展示用）。 */
export const REVIEW_QUESTION_COUNT = REVIEW_QUESTIONS.length;
