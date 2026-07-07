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
import { grokkingAlgorithmsQuestions } from "./review/grokking-algorithms";
import { helloTriangleQuestions } from "./review/hello-triangle";
import { helloWindowQuestions } from "./review/hello-window";
import { gameEngineArchitecture3eQuestions } from "./review/game-engine-architecture-3e";
import { gameMath3dQuestions } from "./review/game-math-3d";
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
import { aiWhatIsAgentQuestions } from "./review/ai-what-is-agent";
import { aiLlmBrainQuestions } from "./review/ai-llm-brain";
import { aiPromptingRolesQuestions } from "./review/ai-prompting-roles";
import { aiReactLoopQuestions } from "./review/ai-react-loop";
import { aiToolCallingQuestions } from "./review/ai-tool-calling";
import { aiMemoryQuestions } from "./review/ai-memory";
import { aiPlanningQuestions } from "./review/ai-planning";
import { aiRagQuestions } from "./review/ai-rag";
import { aiContextEngineeringQuestions } from "./review/ai-context-engineering";
import { aiMultiAgentPatternsQuestions } from "./review/ai-multi-agent-patterns";
import { aiOrchestrationQuestions } from "./review/ai-orchestration";
import { aiEvaluationObservabilityQuestions } from "./review/ai-evaluation-observability";
import { aiSafetyGuardrailsQuestions } from "./review/ai-safety-guardrails";
import { aiProductionDeploymentQuestions } from "./review/ai-production-deployment";
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
import { androidDesignPatternsQuestions } from "./review/android-design-patterns";
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
import { u5PrefabsAssetsQuestions } from "./review/u5-prefabs-assets";
import { u5BuildDeployQuestions } from "./review/u5-build-deploy";
import { agentWhatIsAnAgentQuestions } from "./review/agent-what-is-an-agent";
import { agentAugmentedLlmQuestions } from "./review/agent-augmented-llm";
import { agentAgenticLoopQuestions } from "./review/agent-agentic-loop";
import { agentFirstAgentQuestions } from "./review/agent-first-agent";
import { agentPromptEngineeringQuestions } from "./review/agent-prompt-engineering";
import { agentContextWindowQuestions } from "./review/agent-context-window";
import { agentStructuredOutputQuestions } from "./review/agent-structured-output";
import { agentFunctionCallingQuestions } from "./review/agent-function-calling";
import { agentToolDesignQuestions } from "./review/agent-tool-design";
import { agentMcpQuestions } from "./review/agent-mcp";
import { agentWorkflowVsAgentQuestions } from "./review/agent-workflow-vs-agent";
import { agentChainingAndRoutingQuestions } from "./review/agent-chaining-and-routing";
import { agentParallelizationAndOrchestratorWorkersQuestions } from "./review/agent-parallelization-and-orchestrator-workers";
import { agentEvaluatorOptimizerQuestions } from "./review/agent-evaluator-optimizer";
import { agentAutonomousAgentsQuestions } from "./review/agent-autonomous-agents";
import { agentCombiningPatternsQuestions } from "./review/agent-combining-patterns";
import { agentAgentsInPracticeQuestions } from "./review/agent-agents-in-practice";
import { agentToolPromptEngineeringQuestions } from "./review/agent-tool-prompt-engineering";
import { agentProductionReadinessChecklistQuestions } from "./review/agent-production-readiness-checklist";
import { agtChatbotToAgentQuestions } from "./review/agt-chatbot-to-agent";
import { agtLlmAsBrainQuestions } from "./review/agt-llm-as-brain";
import { agtAgentAnatomyQuestions } from "./review/agt-agent-anatomy";
import { agtPromptEngineeringQuestions } from "./review/agt-prompt-engineering";
import { agtSamplingDecodingQuestions } from "./review/agt-sampling-decoding";
import { agtStructuredOutputQuestions } from "./review/agt-structured-output";
import { agtFunctionCallingQuestions } from "./review/agt-function-calling";
import { agtReactLoopQuestions } from "./review/agt-react-loop";
import { agtToolDesignQuestions } from "./review/agt-tool-design";
import { autoWhyCarRunsQuestions } from "./review/auto-why-car-runs";
import { coiFindInMatrixQuestions } from "./review/coi-find-in-matrix";
import { coiReplaceSpacesQuestions } from "./review/coi-replace-spaces";
import { coiPrintListReverseQuestions } from "./review/coi-print-list-reverse";
import { coiRebuildBinaryTreeQuestions } from "./review/coi-rebuild-binary-tree";
import { coiPrintTreeFromTopToBottomQuestions } from "./review/coi-print-tree-from-top-to-bottom";
import { coiPrintTreesInLinesQuestions } from "./review/coi-print-trees-in-lines";
import { coiQueueWithTwoStacksQuestions } from "./review/coi-queue-with-two-stacks";
import { coiStackPushPopOrderQuestions } from "./review/coi-stack-push-pop-order";
import { coiPowerQuestions } from "./review/coi-power";
import { coiPrintNumbersQuestions } from "./review/coi-print-numbers";
import { coiDeleteNodeQuestions } from "./review/coi-delete-node";
import { coiRegularExpressionsMatchingQuestions } from "./review/coi-regular-expressions-matching";
import { coiNumericStringsQuestions } from "./review/coi-numeric-strings";
import { coiReorderArrayQuestions } from "./review/coi-reorder-array";
import { coiKthNodeFromEndQuestions } from "./review/coi-kth-node-from-end";
import { coiEntryNodeOfLoopQuestions } from "./review/coi-entry-node-of-loop";
import { coiReverseListQuestions } from "./review/coi-reverse-list";
import { coiMergeSortedListsQuestions } from "./review/coi-merge-sorted-lists";
import { coiSubtreeStructureQuestions } from "./review/coi-subtree-structure";
import { coiMirrorBinaryTreeQuestions } from "./review/coi-mirror-binary-tree";
import { coiSymmetricBinaryTreeQuestions } from "./review/coi-symmetric-binary-tree";
import { coiSpiralMatrixQuestions } from "./review/coi-spiral-matrix";
import { coiMinStackQuestions } from "./review/coi-min-stack";
import { printTreesInZigzagQuestions } from "./review/coi-print-trees-in-zigzag";
import { squenceOfBstQuestions } from "./review/coi-squence-of-bst";
import { pathInTreeQuestions } from "./review/coi-path-in-tree";
import { copyComplexListQuestions } from "./review/coi-copy-complex-list";
import { convertBinarySearchTreeQuestions } from "./review/coi-convert-binary-search-tree";
import { serializeBinaryTreesQuestions } from "./review/coi-serialize-binary-trees";
import { stringPermutationQuestions } from "./review/coi-string-permutation";
import { moreThanHalfNumberQuestions } from "./review/coi-more-than-half-number";
import { kLeastNumbersQuestions } from "./review/coi-k-least-numbers";
import { streamMedianQuestions } from "./review/coi-stream-median";
import { greatestSumOfSubarraysQuestions } from "./review/coi-greatest-sum-of-subarrays";
import { numberOf1Questions } from "./review/coi-number-of-1";
import { digitsInSequenceQuestions } from "./review/coi-digits-in-sequence";
import { sortArrayForMinNumberQuestions } from "./review/coi-sort-array-for-min-number";
import { translateNumbersToStringsQuestions } from "./review/coi-translate-numbers-to-strings";
import { maxValueOfGiftsQuestions } from "./review/coi-max-value-of-gifts";
import { longestSubstringWithoutDupQuestions } from "./review/coi-longest-substring-without-dup";
import { uglyNumberQuestions } from "./review/coi-ugly-number";
import { firstNotRepeatingCharQuestions } from "./review/coi-first-not-repeating-char";
import { firstCharacterInStreamQuestions } from "./review/coi-first-character-in-stream";
import { inversePairsQuestions } from "./review/coi-inverse-pairs";
import { firstCommonNodesInListsQuestions } from "./review/coi-first-common-nodes-in-lists";
import { numberOfKQuestions } from "./review/coi-number-of-k";
import { missingNumberQuestions } from "./review/coi-missing-number";
import { integerIdenticalToIndexQuestions } from "./review/coi-integer-identical-to-index";
import { kthNodeInBstQuestions } from "./review/coi-kth-node-in-bst";
import { treeDepthQuestions } from "./review/coi-tree-depth";
import { balancedBinaryTreeQuestions } from "./review/coi-balanced-binary-tree";
import { numbersAppearOnceQuestions } from "./review/coi-numbers-appear-once";
import { numberAppearingOnceQuestions } from "./review/coi-number-appearing-once";
import { twoNumbersWithSumQuestions } from "./review/coi-two-numbers-with-sum";
import { continuousSequenceWithSumQuestions } from "./review/coi-continuous-sequence-with-sum";
import { maxInSlidingWindowQuestions } from "./review/coi-max-in-sliding-window";
import { queueWithMaxQuestions } from "./review/coi-queue-with-max";
import { dicesProbabilityQuestions } from "./review/coi-dices-probability";
import { continousCardsQuestions } from "./review/coi-continous-cards";
import { lastNumberInCircleQuestions } from "./review/coi-last-number-in-circle";
import { maximalProfitQuestions } from "./review/coi-maximal-profit";
import { accumulateQuestions } from "./review/coi-accumulate";
import { addTwoNumbersQuestions } from "./review/coi-add-two-numbers";
import { constuctArrayQuestions } from "./review/coi-constuct-array";
import { stringToIntQuestions } from "./review/coi-string-to-int";
import { commonParentInTreeQuestions } from "./review/coi-common-parent-in-tree";
import { designPatternsIntroQuestions } from "./review/design-patterns-intro";
import { dpStrategyQuestions } from "./review/dp-strategy";
import { dpObserverQuestions } from "./review/dp-observer";
import { dpDecoratorQuestions } from "./review/dp-decorator";
import { dpCommandQuestions } from "./review/dp-command";
import { dpStateQuestions } from "./review/dp-state";
import { dpSingletonQuestions } from "./review/dp-singleton";
import { dpFactoryMethodQuestions } from "./review/dp-factory-method";
import { dpAbstractFactoryQuestions } from "./review/dp-abstract-factory";
import { dpBuilderQuestions } from "./review/dp-builder";
import { dpPrototypeQuestions } from "./review/dp-prototype";
import { dpAdapterQuestions } from "./review/dp-adapter";
import { dpBridgeQuestions } from "./review/dp-bridge";
import { dpCompositeQuestions } from "./review/dp-composite";
import { dpFacadeQuestions } from "./review/dp-facade";
import { dpFlyweightQuestions } from "./review/dp-flyweight";
import { dpProxyQuestions } from "./review/dp-proxy";
import { dpChainOfResponsibilityQuestions } from "./review/dp-chain-of-responsibility";
import { dpIteratorQuestions } from "./review/dp-iterator";
import { dpMediatorQuestions } from "./review/dp-mediator";
import { dpMementoQuestions } from "./review/dp-memento";
import { dpTemplateMethodQuestions } from "./review/dp-template-method";
import { dpVisitorQuestions } from "./review/dp-visitor";
import { dpInterpreterQuestions } from "./review/dp-interpreter";
import { dpCompoundPatternsQuestions } from "./review/dp-compound-patterns";
import { dpFinalReviewQuestions } from "./review/dp-final-review";
import { gppLearningMapQuestions } from "./review/gpp-learning-map";
import { gppIntroQuestions } from "./review/gpp-intro";
import { gppGofInGamesQuestions } from "./review/gpp-gof-in-games";
import { gppGameLoopQuestions } from "./review/gpp-game-loop";
import { gppUpdateMethodQuestions } from "./review/gpp-update-method";
import { gppDoubleBufferQuestions } from "./review/gpp-double-buffer";
import { gppSubclassSandboxQuestions } from "./review/gpp-subclass-sandbox";
import { gppTypeObjectQuestions } from "./review/gpp-type-object";
import { gppComponentQuestions } from "./review/gpp-component";
import { gppEventQueueQuestions } from "./review/gpp-event-queue";
import { gppServiceLocatorQuestions } from "./review/gpp-service-locator";
import { gppDataLocalityQuestions } from "./review/gpp-data-locality";
import { gppDirtyFlagQuestions } from "./review/gpp-dirty-flag";
import { gppObjectPoolQuestions } from "./review/gpp-object-pool";
import { gppSpatialPartitionQuestions } from "./review/gpp-spatial-partition";
import { cqrLearningMapQuestions } from "./review/cqr-learning-map";
import { cqrIntroQuestions } from "./review/cqr-intro";
import { cqrNamingQuestions } from "./review/cqr-naming";
import { cqrFunctionsQuestions } from "./review/cqr-functions";
import { cqrCommentsFormatQuestions } from "./review/cqr-comments-format";
import { cqrErrorHandlingQuestions } from "./review/cqr-error-handling";
import { cqrTestingQuestions } from "./review/cqr-testing";
import { cqrClassesQuestions } from "./review/cqr-classes";
import { cqrCodeSmellsQuestions } from "./review/cqr-code-smells";
import { cqrFinalReviewQuestions } from "./review/cqr-final-review";
import { addLearningMapQuestions } from "./review/add-learning-map";
import { addWhatIsArchitectureQuestions } from "./review/add-what-is-architecture";
import { addSolidPrinciplesQuestions } from "./review/add-solid-principles";
import { addDependencyInversionQuestions } from "./review/add-dependency-inversion";
import { addLayeredArchitectureQuestions } from "./review/add-layered-architecture";
import { addCleanArchitectureQuestions } from "./review/add-clean-architecture";
import { addDddFundamentalsQuestions } from "./review/add-ddd-fundamentals";
import { addBoundedContextQuestions } from "./review/add-bounded-context";
import { addTacticalPatternsQuestions } from "./review/add-tactical-patterns";
import { addStrategicPatternsQuestions } from "./review/add-strategic-patterns";
import { addCqrsEventSourcingQuestions } from "./review/add-cqrs-event-sourcing";
import { addHexagonalArchitectureQuestions } from "./review/add-hexagonal-architecture";
import { addFinalReviewQuestions } from "./review/add-final-review";
import { aaeLearningMapQuestions } from "./review/aae-learning-map";
import { aaeComplexityAnalysisQuestions } from "./review/aae-complexity-analysis";
import { aaeAdvancedDataStructuresQuestions } from "./review/aae-advanced-data-structures";
import { aaeIndexingSearchQuestions } from "./review/aae-indexing-search";
import { aaeGraphAlgorithmsQuestions } from "./review/aae-graph-algorithms";
import { aaeStringAlgorithmsQuestions } from "./review/aae-string-algorithms";
import { aaeApproximationAlgorithmsQuestions } from "./review/aae-approximation-algorithms";
import { aaeRandomizedAlgorithmsQuestions } from "./review/aae-randomized-algorithms";
import { aaeParallelAlgorithmsQuestions } from "./review/aae-parallel-algorithms";
import { aaeDistributedAlgorithmsQuestions } from "./review/aae-distributed-algorithms";
import { aaeAlgorithmEngineeringQuestions } from "./review/aae-algorithm-engineering";
import { aaeFinalReviewQuestions } from "./review/aae-final-review";
import { assLearningMapQuestions } from "./review/ass-learning-map";
import { assEngineThermodynamicsQuestions } from "./review/ass-engine-thermodynamics";
import { assEnginePerformanceQuestions } from "./review/ass-engine-performance";
import { assTransmissionTypesQuestions } from "./review/ass-transmission-types";
import { assDrivetrainComponentsQuestions } from "./review/ass-drivetrain-components";
import { assSuspensionSystemsQuestions } from "./review/ass-suspension-systems";
import { assSteeringBrakeSystemsQuestions } from "./review/ass-steering-brake-systems";
import { assEcuCanBusQuestions } from "./review/ass-ecu-can-bus";
import { assSensorsActuatorsQuestions } from "./review/ass-sensors-actuators";
import { assBodyElectronicsQuestions } from "./review/ass-body-electronics";
import { assEvMotorControllerQuestions } from "./review/ass-ev-motor-controller";
import { assBatteryManagementQuestions } from "./review/ass-battery-management";
import { assFinalReviewQuestions } from "./review/ass-final-review";
import { vsiLearningMapQuestions } from "./review/vsi-learning-map";
import { vsiSmartCockpitQuestions } from "./review/vsi-smart-cockpit";
import { vsiIviPlatformQuestions } from "./review/vsi-ivi-platform";
import { vsiMiddlewareQuestions } from "./review/vsi-middleware";
import { vsiOtaUpdatesQuestions } from "./review/vsi-ota-updates";
import { vsiPerceptionSensorsQuestions } from "./review/vsi-perception-sensors";
import { vsiSensorFusionQuestions } from "./review/vsi-sensor-fusion";
import { vsiPerceptionAlgorithmsQuestions } from "./review/vsi-perception-algorithms";
import { vsiPathPlanningQuestions } from "./review/vsi-path-planning";
import { vsiVehicleControlQuestions } from "./review/vsi-vehicle-control";
import { vsiFunctionalSafetyQuestions } from "./review/vsi-functional-safety";
import { vsiCybersecurityQuestions } from "./review/vsi-cybersecurity";
import { vsiFinalReviewQuestions } from "./review/vsi-final-review";
import { krcLearningMapQuestions } from "./review/krc-learning-map";
import { krcTypesOperatorsQuestions } from "./review/krc-types-operators";
import { krcControlFlowQuestions } from "./review/krc-control-flow";
import { krcFunctionsProgramQuestions } from "./review/krc-functions-program";
import { krcPointersArraysQuestions } from "./review/krc-pointers-arrays";
import { krcPointerArithmeticQuestions } from "./review/krc-pointer-arithmetic";
import { krcStructuresQuestions } from "./review/krc-structures";
import { krcInputOutputQuestions } from "./review/krc-input-output";
import { krcUnixInterfaceQuestions } from "./review/krc-unix-interface";
import { krcFinalReviewQuestions } from "./review/krc-final-review";
import { bcgLearningMapQuestions } from "./review/bcg-learning-map";
import { bcgTypesVariablesQuestions } from "./review/bcg-types-variables";
import { bcgFlowControlQuestions } from "./review/bcg-flow-control";
import { bcgFunctionsQuestions } from "./review/bcg-functions";
import { bcgClassesOopQuestions } from "./review/bcg-classes-oop";
import { bcgGameLoopQuestions } from "./review/bcg-game-loop";
import { bcgGraphicsSfmlQuestions } from "./review/bcg-graphics-sfml";
import { bcgCollisionDetectionQuestions } from "./review/bcg-collision-detection";
import { bcgGameProjectQuestions } from "./review/bcg-game-project";
import { bcgFinalReviewQuestions } from "./review/bcg-final-review";
import { efcLearningMapQuestions } from "./review/efc-learning-map";
import { efcResourceManagementQuestions } from "./review/efc-resource-management";
import { efcConstructorsDestructorsQuestions } from "./review/efc-constructors-destructors";
import { efcClassDesignQuestions } from "./review/efc-class-design";
import { efcInheritancePolymorphismQuestions } from "./review/efc-inheritance-polymorphism";
import { efcTemplatesGenericsQuestions } from "./review/efc-templates-generics";
import { efcTemplateMetaprogrammingQuestions } from "./review/efc-template-metaprogramming";
import { efcNewExceptionsQuestions } from "./review/efc-new-exceptions";
import { efcCodingConventionsQuestions } from "./review/efc-coding-conventions";
import { efcFinalReviewQuestions } from "./review/efc-final-review";
// Effective Modern C++
import { emcLearningMapQuestions } from "./review/emc-learning-map";
import { emcTypeDeductionQuestions } from "./review/emc-type-deduction";
import { emcAutoDecltypeQuestions } from "./review/emc-auto-decltype";
import { emcSmartPointersQuestions } from "./review/emc-smart-pointers";
import { emcUniqueSharedPtrQuestions } from "./review/emc-unique-shared-ptr";
import { emcMoveSemanticsQuestions } from "./review/emc-move-semantics";
import { emcPerfectForwardingQuestions } from "./review/emc-perfect-forwarding";
import { emcLambdaExpressionsQuestions } from "./review/emc-lambda-expressions";
import { emcConcurrencyApiQuestions } from "./review/emc-concurrency-api";
import { emcFinalReviewQuestions } from "./review/emc-final-review";
// 深度探索 C++ 对象模型
import { icoLearningMapQuestions } from "./review/ico-learning-map";
import { icoObjectModelQuestions } from "./review/ico-object-model";
import { icoConstructionSemanticsQuestions } from "./review/ico-construction-semantics";
import { icoDataMembersQuestions } from "./review/ico-data-members";
import { icoFunctionsSemanticsQuestions } from "./review/ico-functions-semantics";
import { icoVtableVirtualQuestions } from "./review/ico-vtable-virtual";
import { icoRttiTypeidQuestions } from "./review/ico-rtti-typeid";
import { icoMultipleInheritanceQuestions } from "./review/ico-multiple-inheritance";
import { icoObjectLifetimeQuestions } from "./review/ico-object-lifetime";
import { icoFinalReviewQuestions } from "./review/ico-final-review";
import { chpLearningMapQuestions } from "./review/chp-learning-map";
import { chpPerformanceFundamentalsQuestions } from "./review/chp-performance-fundamentals";
import { chpMemoryManagementQuestions } from "./review/chp-memory-management";
import { chpCpuCacheQuestions } from "./review/chp-cpu-cache";
import { chpDataStructuresQuestions } from "./review/chp-data-structures";
import { chpAlgorithmsComplexityQuestions } from "./review/chp-algorithms-complexity";
import { chpConcurrencyQuestions } from "./review/chp-concurrency";
import { chpProfilingBenchmarkingQuestions } from "./review/chp-profiling-benchmarking";
import { chpTemplateMetaprogrammingQuestions } from "./review/chp-template-metaprogramming";
import { chpFinalReviewQuestions } from "./review/chp-final-review";
import { cpcLearningMapQuestions } from "./review/cpc-learning-map";
import { cpcCompilationQuestions } from "./review/cpc-compilation";
import { cpcMemoryModelQuestions } from "./review/cpc-memory-model";
import { cpcFunctionCallsQuestions } from "./review/cpc-function-calls";
import { cpcVirtualFunctionsQuestions } from "./review/cpc-virtual-functions";
import { cpcExceptionHandlingQuestions } from "./review/cpc-exception-handling";
import { cpcInlineQuestions } from "./review/cpc-inline";
import { cpcCacheFriendlyQuestions } from "./review/cpc-cache-friendly";
import { cpcCompilerOptimizationQuestions } from "./review/cpc-compiler-optimization";
import { cpcFinalReviewQuestions } from "./review/cpc-final-review";
import { opcLearningMapQuestions } from "./review/opc-learning-map";
import { opcPerformanceMindsetQuestions } from "./review/opc-performance-mindset";
import { opcStringOptimizationQuestions } from "./review/opc-string-optimization";
import { opcAlgorithmSelectionQuestions } from "./review/opc-algorithm-selection";
import { opcDynamicAllocationQuestions } from "./review/opc-dynamic-allocation";
import { opcSmartPointersQuestions } from "./review/opc-smart-pointers";
import { opcIoOptimizationQuestions } from "./review/opc-io-optimization";
import { opcConcurrencyQuestions } from "./review/opc-concurrency";
import { opcProfilingQuestions } from "./review/opc-profiling";
import { opcFinalReviewQuestions } from "./review/opc-final-review";
import { mcdLearningMapQuestions } from "./review/mcd-learning-map";
import { mcdPolicyDesignQuestions } from "./review/mcd-policy-design";
import { mcdTypelistQuestions } from "./review/mcd-typelist";
import { mcdSmartPointersQuestions } from "./review/mcd-smart-pointers";
import { mcdSmallObjectQuestions } from "./review/mcd-small-object";
import { mcdGeneralizedFunctorQuestions } from "./review/mcd-generalized-functor";
import { mcdSingletonQuestions } from "./review/mcd-singleton";
import { mcdObjectFactoryQuestions } from "./review/mcd-object-factory";
import { mcdAbstractFactoryQuestions } from "./review/mcd-abstract-factory";
import { mcdFinalReviewQuestions } from "./review/mcd-final-review";
// Easy C++（第5版）
import { ecpLearningMapQuestions } from "./review/ecp-learning-map";
import { ecpFirstProgramQuestions } from "./review/ecp-first-program";
import { ecpVariablesTypesQuestions } from "./review/ecp-variables-types";
import { ecpControlFlowQuestions } from "./review/ecp-control-flow";
import { ecpFunctionsQuestions } from "./review/ecp-functions";
import { ecpClassesQuestions } from "./review/ecp-classes";
import { ecpInheritanceQuestions } from "./review/ecp-inheritance";
import { ecpTemplatesQuestions } from "./review/ecp-templates";
import { ecpStlQuestions } from "./review/ecp-stl";
import { ecpFinalReviewQuestions } from "./review/ecp-final-review";
// C++ Primer Plus（Stephen Prata）
import { eppLearningMapQuestions } from "./review/epp-learning-map";
import { eppCppBasicsQuestions } from "./review/epp-cpp-basics";
import { eppDataTypesQuestions } from "./review/epp-data-types";
import { eppControlStatementsQuestions } from "./review/epp-control-statements";
import { eppFunctionsReferencesQuestions } from "./review/epp-functions-references";
import { eppClassesObjectsQuestions } from "./review/epp-classes-objects";
import { eppInheritanceQuestions } from "./review/epp-inheritance";
import { eppTemplatesGenericsQuestions } from "./review/epp-templates-generics";
import { eppStlAlgorithmsQuestions } from "./review/epp-stl-algorithms";
import { eppFinalReviewQuestions } from "./review/epp-final-review";
// C++ 编程测试秘籍
import { ctrLearningMapQuestions } from "./review/ctr-learning-map";
import { ctrBasicsTestQuestions } from "./review/ctr-basics-test";
import { ctrMemoryTestQuestions } from "./review/ctr-memory-test";
import { ctrStlTestQuestions } from "./review/ctr-stl-test";
import { ctrTemplateTestQuestions } from "./review/ctr-template-test";
import { ctrConcurrencyTestQuestions } from "./review/ctr-concurrency-test";
import { ctrDesignTestQuestions } from "./review/ctr-design-test";
import { ctrAlgorithmTestQuestions } from "./review/ctr-algorithm-test";
import { ctrDebuggingTestQuestions } from "./review/ctr-debugging-test";
import { ctrFinalReviewQuestions } from "./review/ctr-final-review";
import { cseLearningMapQuestions } from "./review/cse-learning-map";
import { cseIoModelQuestions } from "./review/cse-io-model";
import { cseEventDrivenQuestions } from "./review/cse-event-driven";
import { cseThreadPoolQuestions } from "./review/cse-thread-pool";
import { cseConnectionMgmtQuestions } from "./review/cse-connection-mgmt";
import { cseBufferDesignQuestions } from "./review/cse-buffer-design";
import { cseProtocolDesignQuestions } from "./review/cse-protocol-design";
import { cseTimerWheelQuestions } from "./review/cse-timer-wheel";
import { csePerformanceTuningQuestions } from "./review/cse-performance-tuning";
import { cseFinalReviewQuestions } from "./review/cse-final-review";
import { hfdLearningMapQuestions } from "./review/hfd-learning-map";
import { hfdStrategyQuestions } from "./review/hfd-strategy";
import { hfdObserverQuestions } from "./review/hfd-observer";
import { hfdDecoratorQuestions } from "./review/hfd-decorator";
import { hfdFactoryQuestions } from "./review/hfd-factory";
import { hfdSingletonQuestions } from "./review/hfd-singleton";
import { hfdCommandQuestions } from "./review/hfd-command";
import { hfdAdapterFacadeQuestions } from "./review/hfd-adapter-facade";
import { hfdTemplateMethodQuestions } from "./review/hfd-template-method";
import { hfdFinalReviewQuestions } from "./review/hfd-final-review";
import { ec7LearningMapQuestions } from "./review/ec7-learning-map";
import { ec7TypesVariablesQuestions } from "./review/ec7-types-variables";
import { ec7OperatorsControlQuestions } from "./review/ec7-operators-control";
import { ec7ClassesObjectsQuestions } from "./review/ec7-classes-objects";
import { ec7InheritanceInterfacesQuestions } from "./review/ec7-inheritance-interfaces";
import { ec7GenericsQuestions } from "./review/ec7-generics";
import { ec7DelegatesEventsQuestions } from "./review/ec7-delegates-events";
import { ec7LinqQuestions } from "./review/ec7-linq";
import { ec7AsyncAwaitQuestions } from "./review/ec7-async-await";
import { ec7FinalReviewQuestions } from "./review/ec7-final-review";

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
  ...grokkingAlgorithmsQuestions,
  ...gameMath3dQuestions,
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
  ...coiFindInMatrixQuestions,
  ...coiReplaceSpacesQuestions,
  ...coiPrintListReverseQuestions,
  ...coiRebuildBinaryTreeQuestions,
  ...coiPrintTreeFromTopToBottomQuestions,
  ...coiPrintTreesInLinesQuestions,
  ...coiQueueWithTwoStacksQuestions,
  ...coiStackPushPopOrderQuestions,
  ...coiPowerQuestions,
  ...coiPrintNumbersQuestions,
  ...coiDeleteNodeQuestions,
  ...coiRegularExpressionsMatchingQuestions,
  ...coiNumericStringsQuestions,
  ...coiReorderArrayQuestions,
  ...coiKthNodeFromEndQuestions,
  ...coiEntryNodeOfLoopQuestions,
  ...coiReverseListQuestions,
  ...coiMergeSortedListsQuestions,
  ...coiSubtreeStructureQuestions,
  ...coiMirrorBinaryTreeQuestions,
  ...coiSymmetricBinaryTreeQuestions,
  ...coiSpiralMatrixQuestions,
  ...coiMinStackQuestions,
  ...printTreesInZigzagQuestions,
  ...squenceOfBstQuestions,
  ...pathInTreeQuestions,
  ...copyComplexListQuestions,
  ...convertBinarySearchTreeQuestions,
  ...serializeBinaryTreesQuestions,
  ...stringPermutationQuestions,
  ...moreThanHalfNumberQuestions,
  ...kLeastNumbersQuestions,
  ...streamMedianQuestions,
  ...greatestSumOfSubarraysQuestions,
  ...numberOf1Questions,
  ...digitsInSequenceQuestions,
  ...sortArrayForMinNumberQuestions,
  ...translateNumbersToStringsQuestions,
  ...maxValueOfGiftsQuestions,
  ...longestSubstringWithoutDupQuestions,
  ...uglyNumberQuestions,
  ...firstNotRepeatingCharQuestions,
  ...firstCharacterInStreamQuestions,
  ...inversePairsQuestions,
  ...firstCommonNodesInListsQuestions,
  ...numberOfKQuestions,
  ...missingNumberQuestions,
  ...integerIdenticalToIndexQuestions,
  ...kthNodeInBstQuestions,
  ...treeDepthQuestions,
  ...balancedBinaryTreeQuestions,
  ...numbersAppearOnceQuestions,
  ...numberAppearingOnceQuestions,
  ...twoNumbersWithSumQuestions,
  ...continuousSequenceWithSumQuestions,
  ...maxInSlidingWindowQuestions,
  ...queueWithMaxQuestions,
  ...dicesProbabilityQuestions,
  ...continousCardsQuestions,
  ...lastNumberInCircleQuestions,
  ...maximalProfitQuestions,
  ...accumulateQuestions,
  ...addTwoNumbersQuestions,
  ...constuctArrayQuestions,
  ...stringToIntQuestions,
  ...commonParentInTreeQuestions,
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
  ...androidDesignPatternsQuestions,
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
  ...gameEngineArchitecture3eQuestions,
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
  // AI Agent 开发实战
  ...aiWhatIsAgentQuestions,
  ...aiLlmBrainQuestions,
  ...aiPromptingRolesQuestions,
  ...aiReactLoopQuestions,
  ...aiToolCallingQuestions,
  ...aiMemoryQuestions,
  ...aiPlanningQuestions,
  ...aiRagQuestions,
  ...aiContextEngineeringQuestions,
  ...aiMultiAgentPatternsQuestions,
  ...aiOrchestrationQuestions,
  ...aiEvaluationObservabilityQuestions,
  ...aiSafetyGuardrailsQuestions,
  ...aiProductionDeploymentQuestions,
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
  ...u5PrefabsAssetsQuestions,
  ...u5BuildDeployQuestions,
  // AI 智能体应用开发
  ...agentWhatIsAnAgentQuestions,
  ...agentAugmentedLlmQuestions,
  ...agentAgenticLoopQuestions,
  ...agentFirstAgentQuestions,
  ...agentPromptEngineeringQuestions,
  ...agentContextWindowQuestions,
  ...agentStructuredOutputQuestions,
  ...agentFunctionCallingQuestions,
  ...agentToolDesignQuestions,
  ...agentMcpQuestions,
  ...agentWorkflowVsAgentQuestions,
  ...agentChainingAndRoutingQuestions,
  ...agentParallelizationAndOrchestratorWorkersQuestions,
  ...agentEvaluatorOptimizerQuestions,
  ...agentAutonomousAgentsQuestions,
  ...agentCombiningPatternsQuestions,
  ...agentAgentsInPracticeQuestions,
  ...agentToolPromptEngineeringQuestions,
  ...agentProductionReadinessChecklistQuestions,
  // 从零构建 AI Agent
  ...agtChatbotToAgentQuestions,
  ...agtLlmAsBrainQuestions,
  ...agtAgentAnatomyQuestions,
  ...agtPromptEngineeringQuestions,
  ...agtSamplingDecodingQuestions,
  ...agtStructuredOutputQuestions,
  ...agtFunctionCallingQuestions,
  ...agtReactLoopQuestions,
  ...agtToolDesignQuestions,
  // 汽车为什么会跑：图解汽车构造与原理
  ...autoWhyCarRunsQuestions,
  // 设计模式：GoF 23 模式图解
  ...designPatternsIntroQuestions,
  ...dpStrategyQuestions,
  ...dpObserverQuestions,
  ...dpDecoratorQuestions,
  ...dpCommandQuestions,
  ...dpStateQuestions,
  ...dpSingletonQuestions,
  ...dpFactoryMethodQuestions,
  ...dpAbstractFactoryQuestions,
  ...dpBuilderQuestions,
  ...dpPrototypeQuestions,
  ...dpAdapterQuestions,
  ...dpBridgeQuestions,
  ...dpCompositeQuestions,
  ...dpFacadeQuestions,
  ...dpFlyweightQuestions,
  ...dpProxyQuestions,
  ...dpChainOfResponsibilityQuestions,
  ...dpIteratorQuestions,
  ...dpMediatorQuestions,
  ...dpMementoQuestions,
  ...dpTemplateMethodQuestions,
  ...dpVisitorQuestions,
  ...dpInterpreterQuestions,
  ...dpCompoundPatternsQuestions,
  ...dpFinalReviewQuestions,
  // 游戏编程模式
  ...gppLearningMapQuestions,
  ...gppIntroQuestions,
  ...gppGofInGamesQuestions,
  ...gppGameLoopQuestions,
  ...gppUpdateMethodQuestions,
  ...gppDoubleBufferQuestions,
  ...gppSubclassSandboxQuestions,
  ...gppTypeObjectQuestions,
  ...gppComponentQuestions,
  ...gppEventQueueQuestions,
  ...gppServiceLocatorQuestions,
  ...gppDataLocalityQuestions,
  ...gppDirtyFlagQuestions,
  ...gppObjectPoolQuestions,
  ...gppSpatialPartitionQuestions,
  // 代码质量与重构
  ...cqrLearningMapQuestions,
  ...cqrIntroQuestions,
  ...cqrNamingQuestions,
  ...cqrFunctionsQuestions,
  ...cqrCommentsFormatQuestions,
  ...cqrErrorHandlingQuestions,
  ...cqrTestingQuestions,
  ...cqrClassesQuestions,
  ...cqrCodeSmellsQuestions,
  ...cqrFinalReviewQuestions,
  ...addLearningMapQuestions,
  ...addWhatIsArchitectureQuestions,
  ...addSolidPrinciplesQuestions,
  ...addDependencyInversionQuestions,
  ...addLayeredArchitectureQuestions,
  ...addCleanArchitectureQuestions,
  ...addDddFundamentalsQuestions,
  ...addBoundedContextQuestions,
  ...addTacticalPatternsQuestions,
  ...addStrategicPatternsQuestions,
  ...addCqrsEventSourcingQuestions,
  ...addHexagonalArchitectureQuestions,
  ...addFinalReviewQuestions,
  ...aaeLearningMapQuestions,
  ...aaeComplexityAnalysisQuestions,
  ...aaeAdvancedDataStructuresQuestions,
  ...aaeIndexingSearchQuestions,
  ...aaeGraphAlgorithmsQuestions,
  ...aaeStringAlgorithmsQuestions,
  ...aaeApproximationAlgorithmsQuestions,
  ...aaeRandomizedAlgorithmsQuestions,
  ...aaeParallelAlgorithmsQuestions,
  ...aaeDistributedAlgorithmsQuestions,
  ...aaeAlgorithmEngineeringQuestions,
  ...aaeFinalReviewQuestions,
  // 汽车系统专项
  ...assLearningMapQuestions,
  ...assEngineThermodynamicsQuestions,
  ...assEnginePerformanceQuestions,
  ...assTransmissionTypesQuestions,
  ...assDrivetrainComponentsQuestions,
  ...assSuspensionSystemsQuestions,
  ...assSteeringBrakeSystemsQuestions,
  ...assEcuCanBusQuestions,
  ...assSensorsActuatorsQuestions,
  ...assBodyElectronicsQuestions,
  ...assEvMotorControllerQuestions,
  ...assBatteryManagementQuestions,
  ...assFinalReviewQuestions,
  // 车载软件与智能化
  ...vsiLearningMapQuestions,
  ...vsiSmartCockpitQuestions,
  ...vsiIviPlatformQuestions,
  ...vsiMiddlewareQuestions,
  ...vsiOtaUpdatesQuestions,
  ...vsiPerceptionSensorsQuestions,
  ...vsiSensorFusionQuestions,
  ...vsiPerceptionAlgorithmsQuestions,
  ...vsiPathPlanningQuestions,
  ...vsiVehicleControlQuestions,
  ...vsiFunctionalSafetyQuestions,
  ...vsiCybersecurityQuestions,
  ...vsiFinalReviewQuestions,
  ...krcLearningMapQuestions,
  ...krcTypesOperatorsQuestions,
  ...krcControlFlowQuestions,
  ...krcFunctionsProgramQuestions,
  ...krcPointersArraysQuestions,
  ...krcPointerArithmeticQuestions,
  ...krcStructuresQuestions,
  ...krcInputOutputQuestions,
  ...krcUnixInterfaceQuestions,
  ...krcFinalReviewQuestions,
  ...bcgLearningMapQuestions,
  ...bcgTypesVariablesQuestions,
  ...bcgFlowControlQuestions,
  ...bcgFunctionsQuestions,
  ...bcgClassesOopQuestions,
  ...bcgGameLoopQuestions,
  ...bcgGraphicsSfmlQuestions,
  ...bcgCollisionDetectionQuestions,
  ...bcgGameProjectQuestions,
  ...bcgFinalReviewQuestions,
  ...efcLearningMapQuestions,
  ...efcResourceManagementQuestions,
  ...efcConstructorsDestructorsQuestions,
  ...efcClassDesignQuestions,
  ...efcInheritancePolymorphismQuestions,
  ...efcTemplatesGenericsQuestions,
  ...efcTemplateMetaprogrammingQuestions,
  ...efcNewExceptionsQuestions,
  ...efcCodingConventionsQuestions,
  ...efcFinalReviewQuestions,
  // Effective Modern C++
  ...emcLearningMapQuestions,
  ...emcTypeDeductionQuestions,
  ...emcAutoDecltypeQuestions,
  ...emcSmartPointersQuestions,
  ...emcUniqueSharedPtrQuestions,
  ...emcMoveSemanticsQuestions,
  ...emcPerfectForwardingQuestions,
  ...emcLambdaExpressionsQuestions,
  ...emcConcurrencyApiQuestions,
  ...emcFinalReviewQuestions,
  // 深度探索 C++ 对象模型
  ...icoLearningMapQuestions,
  ...icoObjectModelQuestions,
  ...icoConstructionSemanticsQuestions,
  ...icoDataMembersQuestions,
  ...icoFunctionsSemanticsQuestions,
  ...icoVtableVirtualQuestions,
  ...icoRttiTypeidQuestions,
  ...icoMultipleInheritanceQuestions,
  ...icoObjectLifetimeQuestions,
  ...icoFinalReviewQuestions,
  ...chpLearningMapQuestions,
  ...chpPerformanceFundamentalsQuestions,
  ...chpMemoryManagementQuestions,
  ...chpCpuCacheQuestions,
  ...chpDataStructuresQuestions,
  ...chpAlgorithmsComplexityQuestions,
  ...chpConcurrencyQuestions,
  ...chpProfilingBenchmarkingQuestions,
  ...chpTemplateMetaprogrammingQuestions,
  ...chpFinalReviewQuestions,
  ...cpcLearningMapQuestions,
  ...cpcCompilationQuestions,
  ...cpcMemoryModelQuestions,
  ...cpcFunctionCallsQuestions,
  ...cpcVirtualFunctionsQuestions,
  ...cpcExceptionHandlingQuestions,
  ...cpcInlineQuestions,
  ...cpcCacheFriendlyQuestions,
  ...cpcCompilerOptimizationQuestions,
  ...cpcFinalReviewQuestions,
  ...opcLearningMapQuestions,
  ...opcPerformanceMindsetQuestions,
  ...opcStringOptimizationQuestions,
  ...opcAlgorithmSelectionQuestions,
  ...opcDynamicAllocationQuestions,
  ...opcSmartPointersQuestions,
  ...opcIoOptimizationQuestions,
  ...opcConcurrencyQuestions,
  ...opcProfilingQuestions,
  ...opcFinalReviewQuestions,
  ...mcdLearningMapQuestions,
  ...mcdPolicyDesignQuestions,
  ...mcdTypelistQuestions,
  ...mcdSmartPointersQuestions,
  ...mcdSmallObjectQuestions,
  ...mcdGeneralizedFunctorQuestions,
  ...mcdSingletonQuestions,
  ...mcdObjectFactoryQuestions,
  ...mcdAbstractFactoryQuestions,
  ...mcdFinalReviewQuestions,
  // Easy C++（第5版）
  ...ecpLearningMapQuestions,
  ...ecpFirstProgramQuestions,
  ...ecpVariablesTypesQuestions,
  ...ecpControlFlowQuestions,
  ...ecpFunctionsQuestions,
  ...ecpClassesQuestions,
  ...ecpInheritanceQuestions,
  ...ecpTemplatesQuestions,
  ...ecpStlQuestions,
  ...ecpFinalReviewQuestions,
  // C++ Primer Plus（Stephen Prata）
  ...eppLearningMapQuestions,
  ...eppCppBasicsQuestions,
  ...eppDataTypesQuestions,
  ...eppControlStatementsQuestions,
  ...eppFunctionsReferencesQuestions,
  ...eppClassesObjectsQuestions,
  ...eppInheritanceQuestions,
  ...eppTemplatesGenericsQuestions,
  ...eppStlAlgorithmsQuestions,
  ...eppFinalReviewQuestions,
  // C++ 编程测试秘籍
  ...ctrLearningMapQuestions,
  ...ctrBasicsTestQuestions,
  ...ctrMemoryTestQuestions,
  ...ctrStlTestQuestions,
  ...ctrTemplateTestQuestions,
  ...ctrConcurrencyTestQuestions,
  ...ctrDesignTestQuestions,
  ...ctrAlgorithmTestQuestions,
  ...ctrDebuggingTestQuestions,
  ...ctrFinalReviewQuestions,
  ...cseLearningMapQuestions,
  ...cseIoModelQuestions,
  ...cseEventDrivenQuestions,
  ...cseThreadPoolQuestions,
  ...cseConnectionMgmtQuestions,
  ...cseBufferDesignQuestions,
  ...cseProtocolDesignQuestions,
  ...cseTimerWheelQuestions,
  ...csePerformanceTuningQuestions,
  ...cseFinalReviewQuestions,
  ...hfdLearningMapQuestions,
  ...hfdStrategyQuestions,
  ...hfdObserverQuestions,
  ...hfdDecoratorQuestions,
  ...hfdFactoryQuestions,
  ...hfdSingletonQuestions,
  ...hfdCommandQuestions,
  ...hfdAdapterFacadeQuestions,
  ...hfdTemplateMethodQuestions,
  ...hfdFinalReviewQuestions,
  ...ec7LearningMapQuestions,
  ...ec7TypesVariablesQuestions,
  ...ec7OperatorsControlQuestions,
  ...ec7ClassesObjectsQuestions,
  ...ec7InheritanceInterfacesQuestions,
  ...ec7GenericsQuestions,
  ...ec7DelegatesEventsQuestions,
  ...ec7LinqQuestions,
  ...ec7AsyncAwaitQuestions,
  ...ec7FinalReviewQuestions,
];

/** 题库总数（自检/小结展示用）。 */
export const REVIEW_QUESTION_COUNT = REVIEW_QUESTIONS.length;
