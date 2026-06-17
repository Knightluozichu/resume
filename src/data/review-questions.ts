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
import { blinnPhongQuestions } from "./review/blinn-phong";
import { gammaCorrectionQuestions } from "./review/gamma-correction";
import { shadowMappingQuestions } from "./review/shadow-mapping";
import { pointShadowsQuestions } from "./review/point-shadows";
import { normalMappingQuestions } from "./review/normal-mapping";
import { parallaxMappingQuestions } from "./review/parallax-mapping";
import { hdrQuestions } from "./review/hdr";
import { bloomQuestions } from "./review/bloom";
import { deferredShadingQuestions } from "./review/deferred-shading";
import { ssaoQuestions } from "./review/ssao";
import { cppGettingStartedQuestions } from "./review/cpp-getting-started";
import { cppVariablesAndTypesQuestions } from "./review/cpp-variables-and-types";
import { cppStringsVectorsArraysQuestions } from "./review/cpp-strings-vectors-arrays";
import { cppExpressionsQuestions } from "./review/cpp-expressions";
import { cppStatementsQuestions } from "./review/cpp-statements";
import { cppFunctionsQuestions } from "./review/cpp-functions";
import { cppClassesQuestions } from "./review/cpp-classes";
import { cppIoLibraryQuestions } from "./review/cpp-io-library";
import { cppSequentialContainersQuestions } from "./review/cpp-sequential-containers";
import { cppGenericAlgorithmsQuestions } from "./review/cpp-generic-algorithms";
import { cppAssociativeContainersQuestions } from "./review/cpp-associative-containers";
import { cppDynamicMemoryQuestions } from "./review/cpp-dynamic-memory";
import { cppCopyControlQuestions } from "./review/cpp-copy-control";
import { cppOverloadedOperationsQuestions } from "./review/cpp-overloaded-operations";
import { cppOopQuestions } from "./review/cpp-oop";
import { cppTemplatesQuestions } from "./review/cpp-templates";
import { cppSpecializedLibraryQuestions } from "./review/cpp-specialized-library";
import { cppLargeProgramsQuestions } from "./review/cpp-large-programs";
import { androidArchitectureQuestions } from "./review/android-architecture";
import { systemStartupQuestions } from "./review/system-startup";
import { appProcessStartupQuestions } from "./review/app-process-startup";
import { componentWorkflowQuestions } from "./review/component-workflow";
import { contextQuestions } from "./review/context";
import { amsQuestions } from "./review/ams";
import { windowManagerQuestions } from "./review/window-manager";
import { wmsQuestions } from "./review/wms";
import { jniPrincipleQuestions } from "./review/jni-principle";
import { javaVmQuestions } from "./review/java-vm";
import { dalvikArtQuestions } from "./review/dalvik-art";
import { classloaderQuestions } from "./review/classloader";
import { hotfixPrincipleQuestions } from "./review/hotfix-principle";
import { hookTechnologyQuestions } from "./review/hook-technology";
import { pluginPrincipleQuestions } from "./review/plugin-principle";
import { drawOptimizationQuestions } from "./review/draw-optimization";
import { memoryOptimizationQuestions } from "./review/memory-optimization";
import { cppSpecializedToolsQuestions } from "./review/cpp-specialized-tools";
import { cprDataAndCQuestions } from "./review/cpr-data-and-c";
import { cprGettingReadyQuestions } from "./review/cpr-getting-ready";
import { cprIntroducingCQuestions } from "./review/cpr-introducing-c";
import { cprStringsIOQuestions } from "./review/cpr-strings-io";
import { cprOperatorsExpressionsQuestions } from "./review/cpr-operators-expressions";
import { cprControlLoopsQuestions } from "./review/cpr-control-loops";
import { cprControlBranchingQuestions } from "./review/cpr-control-branching";
import { cprCharIoValidationQuestions } from "./review/cpr-char-io-validation";
import { cprFunctionsQuestions } from "./review/cpr-functions";
import { cprArraysPointersQuestions } from "./review/cpr-arrays-pointers";
import { cprStringsFunctionsQuestions } from "./review/cpr-strings-functions";
import { cprStorageLinkageMemoryQuestions } from "./review/cpr-storage-linkage-memory";
import { cprFileIoQuestions } from "./review/cpr-file-io";
import { cprStructuresQuestions } from "./review/cpr-structures";
import { cprPreprocessorQuestions } from "./review/cpr-preprocessor";
import { cprBitFiddlingQuestions } from "./review/cpr-bit-fiddling";
import { cprAdvancedDataQuestions } from "./review/cpr-advanced-data";
import { bnrgFirstAppQuestions } from "./review/bnrg-first-app";
import { bnrgMvcQuestions } from "./review/bnrg-mvc";
import { bnrgLifecycleQuestions } from "./review/bnrg-lifecycle";
import { bnrgUiStateQuestions } from "./review/bnrg-ui-state";
import { bnrgDebuggingQuestions } from "./review/bnrg-debugging";
import { bnrgSecondActivityQuestions } from "./review/bnrg-second-activity";
import { bnrgSdkCompatQuestions } from "./review/bnrg-sdk-compat";
import { bnrgFragmentsQuestions } from "./review/bnrg-fragments";
import { bnrgRecyclerviewQuestions } from "./review/bnrg-recyclerview";
import { bnrgLayoutsQuestions } from "./review/bnrg-layouts";
import { bnrgRoomQuestions } from "./review/bnrg-room";
import { bnrgFragmentNavQuestions } from "./review/bnrg-fragment-nav";
import { bnrgDialogsQuestions } from "./review/bnrg-dialogs";
import { bnrgAppBarQuestions } from "./review/bnrg-app-bar";
import { bnrgImplicitIntentsQuestions } from "./review/bnrg-implicit-intents";
import { bnrgTakingPicturesQuestions } from "./review/bnrg-taking-pictures";
import { bnrgLocalizationQuestions } from "./review/bnrg-localization";
import { bnrgAccessibilityQuestions } from "./review/bnrg-accessibility";
import { bnrgDataBindingQuestions } from "./review/bnrg-data-binding";
import { bnrgAudioTestingQuestions } from "./review/bnrg-audio-testing";
import { bnrgStylesQuestions } from "./review/bnrg-styles";
import { bnrgXmlDrawablesQuestions } from "./review/bnrg-xml-drawables";
import { bnrgMoreIntentsQuestions } from "./review/bnrg-more-intents";
import { bnrgHttpBackgroundQuestions } from "./review/bnrg-http-background";
import { bnrgLooperHandlerQuestions } from "./review/bnrg-looper-handler";
import { bnrgSearchQuestions } from "./review/bnrg-search";
import { bnrgWorkmanagerQuestions } from "./review/bnrg-workmanager";
import { bnrgBroadcastQuestions } from "./review/bnrg-broadcast";
import { bnrgWebviewQuestions } from "./review/bnrg-webview";
import { bnrgCustomViewsQuestions } from "./review/bnrg-custom-views";
import { bnrgPropertyAnimationQuestions } from "./review/bnrg-property-animation";
import { bnrgAfterwordQuestions } from "./review/bnrg-afterword";
import { ugoEvaluatingPerformanceProblemsQuestions } from "./review/ugo-evaluating-performance-problems";
import { ugoScriptingStrategiesQuestions } from "./review/ugo-scripting-strategies";
import { ugoBenefitsOfBatchingQuestions } from "./review/ugo-benefits-of-batching";
import { ugoOptimizingArtAssetsQuestions } from "./review/ugo-optimizing-art-assets";
import { ugoFasterPhysicsQuestions } from "./review/ugo-faster-physics";
import { ugoDynamicGraphicsQuestions } from "./review/ugo-dynamic-graphics";
import { ugoXrOptimizationsQuestions } from "./review/ugo-xr-optimizations";
import { ugoMemoryManagementQuestions } from "./review/ugo-memory-management";
import { ugoDataOrientedTechnologyStackQuestions } from "./review/ugo-data-oriented-technology-stack";
import { ugoTacticalTipsAndTricksQuestions } from "./review/ugo-tactical-tips-and-tricks";
import { profProfilingWorkflowBaselineQuestions } from "./review/prof-profiling-workflow-baseline";
import { profCpuProfilerDeepDiveQuestions } from "./review/prof-cpu-profiler-deep-dive";
import { profGpuPerformanceAnalysisQuestions } from "./review/prof-gpu-performance-analysis";
import { profMemoryProfilerQuestions } from "./review/prof-memory-profiler";
import { profProfileAnalyzerRegressionQuestions } from "./review/prof-profile-analyzer-regression";
import { profPowerOptimizationQuestions } from "./review/prof-power-optimization";
import { profPlatformSpecificProfilingQuestions } from "./review/prof-platform-specific-profiling";
import { mxrwUrpOptimizationQuestions } from "./review/mxrw-urp-optimization";
import { mxrwMobileOptimizationQuestions } from "./review/mxrw-mobile-optimization";
import { mxrwXrSpecificOptimizationQuestions } from "./review/mxrw-xr-specific-optimization";
import { mxrwWebSpecificOptimizationQuestions } from "./review/mxrw-web-specific-optimization";
import { mxrwCrossPlatformChecklistQuestions } from "./review/mxrw-cross-platform-checklist";
import { pbrTheoryQuestions } from "./review/pbr-theory";
import { pbrLightingQuestions } from "./review/pbr-lighting";
import { pbrIblDiffuseQuestions } from "./review/pbr-ibl-diffuse";
import { pbrIblSpecularQuestions } from "./review/pbr-ibl-specular";
import { ccHelloConcurrencyQuestions } from "./review/cc-hello-concurrency";
import { ccManagingThreadsQuestions } from "./review/cc-managing-threads";
import { ccProtectingSharedDataQuestions } from "./review/cc-protecting-shared-data";
import { ccSynchronizingOperationsQuestions } from "./review/cc-synchronizing-operations";
import { ccAtomicTypesQuestions } from "./review/cc-atomic-types";
import { ccMemoryOrderingQuestions } from "./review/cc-memory-ordering";
import { ccLockBasedQuestions } from "./review/cc-lock-based";
import { ccLockFreeQuestions } from "./review/cc-lock-free";
import { ccDesigningConcurrentCodeQuestions } from "./review/cc-designing-concurrent-code";
import { ccThreadPoolsQuestions } from "./review/cc-thread-pools";
import { ccParallelAlgorithmsQuestions } from "./review/cc-parallel-algorithms";
import { ccTestingDebuggingQuestions } from "./review/cc-testing-debugging";
import { u5EditorProjectQuestions } from "./review/u5-editor-project";
import { u5GameobjectComponentQuestions } from "./review/u5-gameobject-component";
import { u5TransformCoordinateQuestions } from "./review/u5-transform-coordinate";
import { u5MonobehaviourLifecycleQuestions } from "./review/u5-monobehaviour-lifecycle";
import { u5ScriptingObjectsQuestions } from "./review/u5-scripting-objects";
import { u5CoroutinesTimeQuestions } from "./review/u5-coroutines-time";
import { u5RigidbodyColliderQuestions } from "./review/u5-rigidbody-collider";
import { u5CollisionRaycastQuestions } from "./review/u5-collision-raycast";
import { u5MecanimQuestions } from "./review/u5-mecanim";
import { u5UguiQuestions } from "./review/u5-ugui";
import { u5MaterialsLightingQuestions } from "./review/u5-materials-lighting";

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
  ...blinnPhongQuestions,
  ...gammaCorrectionQuestions,
  ...shadowMappingQuestions,
  ...pointShadowsQuestions,
  ...normalMappingQuestions,
  ...parallaxMappingQuestions,
  ...hdrQuestions,
  ...bloomQuestions,
  ...deferredShadingQuestions,
  ...ssaoQuestions,
  ...cprDataAndCQuestions,
  ...cppGettingStartedQuestions,
  ...cppVariablesAndTypesQuestions,
  ...cppStringsVectorsArraysQuestions,
  ...cppExpressionsQuestions,
  ...cppStatementsQuestions,
  ...cppFunctionsQuestions,
  ...cppClassesQuestions,
  ...cppIoLibraryQuestions,
  ...cppSequentialContainersQuestions,
  ...cppGenericAlgorithmsQuestions,
  ...cppAssociativeContainersQuestions,
  ...cppDynamicMemoryQuestions,
  ...cppCopyControlQuestions,
  ...cppOverloadedOperationsQuestions,
  ...cppTemplatesQuestions,
  ...cppOopQuestions,
  ...cppSpecializedLibraryQuestions,
  ...cppSpecializedToolsQuestions,
  ...cppLargeProgramsQuestions,
  ...cprGettingReadyQuestions,
  ...cprIntroducingCQuestions,
  ...cprStringsIOQuestions,
  ...cprOperatorsExpressionsQuestions,
  ...cprControlLoopsQuestions,
  ...cprControlBranchingQuestions,
  ...cprCharIoValidationQuestions,
  ...cprFunctionsQuestions,
  ...cprArraysPointersQuestions,
  ...cprStringsFunctionsQuestions,
  ...cprStorageLinkageMemoryQuestions,
  ...cprFileIoQuestions,
  ...cprStructuresQuestions,
  ...cprPreprocessorQuestions,
  ...cprBitFiddlingQuestions,
  ...cprAdvancedDataQuestions,
  ...androidArchitectureQuestions,
  ...systemStartupQuestions,
  ...appProcessStartupQuestions,
  ...componentWorkflowQuestions,
  ...contextQuestions,
  ...amsQuestions,
  ...windowManagerQuestions,
  ...wmsQuestions,
  ...jniPrincipleQuestions,
  ...javaVmQuestions,
  ...dalvikArtQuestions,
  ...classloaderQuestions,
  ...hotfixPrincipleQuestions,
  ...hookTechnologyQuestions,
  ...pluginPrincipleQuestions,
  ...drawOptimizationQuestions,
  ...memoryOptimizationQuestions,
  ...bnrgFirstAppQuestions,
  ...bnrgMvcQuestions,
  ...bnrgLifecycleQuestions,
  ...bnrgUiStateQuestions,
  ...bnrgDebuggingQuestions,
  ...bnrgSecondActivityQuestions,
  ...bnrgSdkCompatQuestions,
  ...bnrgFragmentsQuestions,
  ...bnrgRecyclerviewQuestions,
  ...bnrgLayoutsQuestions,
  ...bnrgRoomQuestions,
  ...bnrgFragmentNavQuestions,
  ...bnrgDialogsQuestions,
  ...bnrgAppBarQuestions,
  ...bnrgImplicitIntentsQuestions,
  ...bnrgTakingPicturesQuestions,
  ...bnrgLocalizationQuestions,
  ...bnrgAccessibilityQuestions,
  ...bnrgDataBindingQuestions,
  ...bnrgAudioTestingQuestions,
  ...bnrgStylesQuestions,
  ...bnrgXmlDrawablesQuestions,
  ...bnrgMoreIntentsQuestions,
  ...bnrgHttpBackgroundQuestions,
  ...bnrgLooperHandlerQuestions,
  ...bnrgSearchQuestions,
  ...bnrgWorkmanagerQuestions,
  ...bnrgBroadcastQuestions,
  ...bnrgWebviewQuestions,
  ...bnrgCustomViewsQuestions,
  ...bnrgPropertyAnimationQuestions,
  ...bnrgAfterwordQuestions,
  ...ugoEvaluatingPerformanceProblemsQuestions,
  ...ugoScriptingStrategiesQuestions,
  ...ugoBenefitsOfBatchingQuestions,
  ...ugoOptimizingArtAssetsQuestions,
  ...ugoFasterPhysicsQuestions,
  ...ugoDynamicGraphicsQuestions,
  ...ugoXrOptimizationsQuestions,
  ...ugoMemoryManagementQuestions,
  ...ugoDataOrientedTechnologyStackQuestions,
  ...ugoTacticalTipsAndTricksQuestions,
  ...profProfilingWorkflowBaselineQuestions,
  ...profCpuProfilerDeepDiveQuestions,
  ...profGpuPerformanceAnalysisQuestions,
  ...profMemoryProfilerQuestions,
  ...profProfileAnalyzerRegressionQuestions,
  ...profPowerOptimizationQuestions,
  ...profPlatformSpecificProfilingQuestions,
  ...mxrwUrpOptimizationQuestions,
  ...mxrwMobileOptimizationQuestions,
  ...mxrwXrSpecificOptimizationQuestions,
  ...mxrwWebSpecificOptimizationQuestions,
  ...mxrwCrossPlatformChecklistQuestions,
  ...pbrTheoryQuestions,
  ...pbrLightingQuestions,
  ...pbrIblDiffuseQuestions,
  ...pbrIblSpecularQuestions,
  // C++ 并发编程实战（第2版）
  ...ccHelloConcurrencyQuestions,
  ...ccManagingThreadsQuestions,
  ...ccProtectingSharedDataQuestions,
  ...ccSynchronizingOperationsQuestions,
  ...ccAtomicTypesQuestions,
  ...ccMemoryOrderingQuestions,
  ...ccLockBasedQuestions,
  ...ccLockFreeQuestions,
  ...ccDesigningConcurrentCodeQuestions,
  ...ccThreadPoolsQuestions,
  ...ccParallelAlgorithmsQuestions,
  ...ccTestingDebuggingQuestions,
  // Unity 5 权威讲解
  ...u5EditorProjectQuestions,
  ...u5GameobjectComponentQuestions,
  ...u5TransformCoordinateQuestions,
  ...u5MonobehaviourLifecycleQuestions,
  ...u5ScriptingObjectsQuestions,
  ...u5CoroutinesTimeQuestions,
  ...u5RigidbodyColliderQuestions,
  ...u5CollisionRaycastQuestions,
  ...u5MecanimQuestions,
  ...u5UguiQuestions,
  ...u5MaterialsLightingQuestions,
];

/** 题库总数（自检/小结展示用）。 */
export const REVIEW_QUESTION_COUNT = REVIEW_QUESTIONS.length;
