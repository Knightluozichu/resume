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
import { gea319OfficialQuestions } from "./review/gea319-official-units";
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
import { adpOfficialQuestions } from "./review/adp18-official-units";
import { aad8OfficialQuestions } from "./review/aad8-official-chapters";
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
import { bnr4OfficialUnitQuestions } from "./review/bnr4-official-units";
import { ugoOfficialLearningMapQuestions } from "./review/ugo-official-learning-map";
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
import { ugoOfficialFinalReviewQuestions } from "./review/ugo-official-final-review";
import { profOfficialUnitQuestions } from "./review/prof-official-units";
import { mxrwOfficialUnitQuestions } from "./review/mxrw-official-units";
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
import { u5OfficialChapterQuestions } from "./review/u5-official-chapters";
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
import { gpp14OfficialQuestions } from "./review/gpp14-official-units";
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
import {
  icoConstructionDestructionCopyQuestions,
  icoConstructorSemanticsQuestions,
  icoCuspQuestions,
  icoDataSemanticsQuestions,
  icoFunctionSemanticsQuestions,
  icoObjectLessonsQuestions,
  icoRuntimeSemanticsQuestions,
} from "./review/ico-official-chapters";
import { icoFinalReviewQuestions } from "./review/ico-final-review";
import { chpLearningMapQuestions } from "./review/chp-learning-map";
import {
  chpBriefIntroductionQuestions,
  chpConcurrencyQuestions,
  chpDataStructuresQuestions,
  chpIteratorQuestions,
  chpMeasuringPerformanceQuestions,
  chpMemoryManagementQuestions,
  chpMetaprogrammingQuestions,
  chpModernConceptsQuestions,
  chpParallelStlQuestions,
  chpProxyLazyQuestions,
  chpStlAlgorithmsQuestions,
} from "./review/chp-official-chapters";
import { chpFinalReviewQuestions } from "./review/chp-final-review";
import { cpcLearningMapQuestions } from "./review/cpc-learning-map";
import {
  cpcAdvancedProgrammingQuestions,
  cpcBasicSyntaxQuestions,
  cpcCppFeaturesQuestions,
  cpcFunctionPrinciplesQuestions,
  cpcInterviewChallengesQuestions,
  cpcPrerequisitesQuestions,
} from "./review/cpc-official-chapters";
import { cpcFinalReviewQuestions } from "./review/cpc-final-review";
import { opcLearningMapQuestions } from "./review/opc-learning-map";
import { opcOfficialChapterQuestions } from "./review/opc-official-chapters";
import { opcFinalReviewQuestions } from "./review/opc-final-review";
import { mcdLearningMapQuestions } from "./review/mcd-learning-map";
import { mcdOfficialChapterQuestions } from "./review/mcd-official-chapters";
import { mcdFinalReviewQuestions } from "./review/mcd-final-review";
// Easy C++（第5版）
import { ecpOfficialChapterQuestions } from "./review/ecp-official-chapters";
import { ecpLearningMapQuestions } from "./review/ecp-learning-map";
import { ecpFinalReviewQuestions } from "./review/ecp-final-review";
// C++ Primer Plus（Stephen Prata）
import { eppOfficialChapterQuestions } from "./review/epp-official-chapters";
import { eppLearningMapQuestions } from "./review/epp-learning-map";
import { eppFinalReviewQuestions } from "./review/epp-final-review";
// 现代 C++ 测试驱动开发
import { ctrOfficialChapterQuestions } from "./review/ctr-official-chapters";
import { ctrLearningMapQuestions } from "./review/ctr-learning-map";
import { ctrFinalReviewQuestions } from "./review/ctr-final-review";
import { cseLearningMapQuestions } from "./review/cse-learning-map";
import { cseOfficialChapterQuestions } from "./review/cse-official-chapters";
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
import { hfd2OfficialAdditionalQuestions } from "./review/hfd2-official-additions";
import { ec7e6OfficialChapterQuestions } from "./review/ec7e6-official-chapters";
import { ec7LearningMapQuestions } from "./review/ec7-learning-map";
import { ec7FinalReviewQuestions } from "./review/ec7-final-review";
import { cqc157OfficialChapterQuestions } from "./review/cqc157-official-chapters";
import { cqcLearningMapQuestions } from "./review/cqc-learning-map";
import { cqcFinalReviewQuestions } from "./review/cqc-final-review";
import { ecs3OfficialChapterQuestions } from "./review/ecs3-official-chapters";
import { ecsLearningMapQuestions } from "./review/ecs-learning-map";
import { ecsFinalReviewQuestions } from "./review/ecs-final-review";
import { cid4OfficialChapterQuestions } from "./review/cid4-official-chapters";
import { dcsLearningMapQuestions } from "./review/dcs-learning-map";
import { dcsFinalReviewQuestions } from "./review/dcs-final-review";
import { fpc1OfficialChapterQuestions } from "./review/fpc1-official-chapters";
import { cfpLearningMapQuestions } from "./review/cfp-learning-map";
import { cfpFinalReviewQuestions } from "./review/cfp-final-review";
import { ctc10OfficialChapterQuestions } from "./review/ctc10-official-chapters";
import { ctcLearningMapQuestions } from "./review/ctc-learning-map";
import { ctcFinalReviewQuestions } from "./review/ctc-final-review";
import { cvc4OfficialChapterQuestions } from "./review/cvc4-official-chapters";
import { cvcLearningMapQuestions } from "./review/cvc-learning-map";
import { cvcFinalReviewQuestions } from "./review/cvc-final-review";
// Pro .NET 内存管理（第2版）
import { dnmOfficialChapterQuestions } from "./review/dnm-official-chapters";
import { dnmMemoryModelQuestions } from "./review/dnm-memory-model";
import { dnmFinalReviewQuestions } from "./review/dnm-final-review";
// Rust 程序设计语言
import { rplOfficialChapterQuestions } from "./review/rpl-official-chapters";
import { rplLearningMapQuestions } from "./review/rpl-learning-map";
import { rplFinalReviewQuestions } from "./review/rpl-final-review";
// Go 程序设计语言
import { goplOfficialChapterQuestions } from "./review/gopl-official-chapters";
import { gplLearningMapQuestions } from "./review/gpl-learning-map";
import { gplFinalReviewQuestions } from "./review/gpl-final-review";
// Python 编程：从入门到实践
import { pcc3OfficialChapterQuestions } from "./review/pcc3-official-chapters";
import { pccLearningMapQuestions } from "./review/pcc-learning-map";
import { pccFinalReviewQuestions } from "./review/pcc-final-review";
// Lua 程序设计
import { pil4OfficialChapterQuestions } from "./review/pil4-official-chapters";
// Ruby 基础教程
import { tr5OfficialChapterQuestions } from "./review/tr5-official-chapters";
// 大话数据结构
import { dsvcOfficialChapterQuestions } from "./review/dsvc-official-chapters";
// 图灵数学女孩系列
import { mglLearningMapQuestions } from "./review/mgl-learning-map";
import { mglNumberTheoryQuestions } from "./review/mgl-number-theory";
import { mglEquationsQuestions } from "./review/mgl-equations";
import { mglFunctionsQuestions } from "./review/mgl-functions";
import { mglCombinatoricsQuestions } from "./review/mgl-combinatorics";
import { mglGraphTheoryQuestions } from "./review/mgl-graph-theory";
import { mglProbabilityQuestions } from "./review/mgl-probability";
import { mglAlgorithmsQuestions } from "./review/mgl-algorithms";
import { mglMachineLearningQuestions } from "./review/mgl-machine-learning";
import { mglFinalReviewQuestions } from "./review/mgl-final-review";
// 数据结构与算法分析（C++描述）
import { dsaLearningMapQuestions } from "./review/dsa-learning-map";
import { dsaComplexityAnalysisQuestions } from "./review/dsa-complexity-analysis";
import { dsaListsQuestions } from "./review/dsa-lists";
import { dsaTreesQuestions } from "./review/dsa-trees";
import { dsaHashTablesQuestions } from "./review/dsa-hash-tables";
import { dsaDisjointSetsQuestions } from "./review/dsa-disjoint-sets";
import { dsaGraphAlgsQuestions } from "./review/dsa-graph-algs";
import { dsaSortingQuestions } from "./review/dsa-sorting";
import { dsaDynamicProgrammingQuestions } from "./review/dsa-dynamic-programming";
import { dsaFinalReviewQuestions } from "./review/dsa-final-review";
// Rust 编程之道
import { rswOfficialChapterQuestions } from "./review/rsw-official-chapters";
import { rswLearningMapQuestions } from "./review/rsw-learning-map";
import { rswOwnershipBorrowQuestions } from "./review/rsw-ownership-borrow";
import { rswTraitsGenericsQuestions } from "./review/rsw-traits-generics";
import { rswLifetimesQuestions } from "./review/rsw-lifetimes";
import { rswErrorHandlingQuestions } from "./review/rsw-error-handling";
import { rswUnsafeRustQuestions } from "./review/rsw-unsafe-rust";
import { rswConcurrencyQuestions } from "./review/rsw-concurrency";
import { rswAsyncRuntimeQuestions } from "./review/rsw-async-runtime";
import { rswMacrosQuestions } from "./review/rsw-macros";
import { rswFinalReviewQuestions } from "./review/rsw-final-review";
// Go 语言实战
import { giaLearningMapQuestions } from "./review/gia-learning-map";
import { giaOfficialChapterQuestions } from "./review/gia-official-chapters";
import { giaFinalReviewQuestions } from "./review/gia-final-review";
// Go Web 编程
import { gwpLearningMapQuestions } from "./review/gwp-learning-map";
import { gwpOfficialChapterQuestions } from "./review/gwp-official-chapters";
import { gwpFinalReviewQuestions } from "./review/gwp-final-review";
// 流畅的 Python
import { flpLearningMapQuestions } from "./review/flp-learning-map";
import { flpOfficialChapterQuestions } from "./review/flp-official-chapters";
import { flpFinalReviewQuestions } from "./review/flp-final-review";
// Python 自动化运维
import { popLearningMapQuestions } from "./review/pop-learning-map";
import { popOfficialChapterQuestions } from "./review/pop-official-chapters";
import { popFinalReviewQuestions } from "./review/pop-final-review";
// 精通 Rust（第2版）
import { mrsLearningMapQuestions } from "./review/mrs-learning-map";
import { mrsOfficialChapterQuestions } from "./review/mrs-official-chapters";
import { mrsFinalReviewQuestions } from "./review/mrs-final-review";
// Python 高级编程
import { pyaLearningMapQuestions } from "./review/pya-learning-map";
import { pyaOfficialChapterQuestions } from "./review/pya-official-chapters";
import { pyaFinalReviewQuestions } from "./review/pya-final-review";
// 算法（第4版）
import { al4LearningMapQuestions } from "./review/al4-learning-map";
import { al4FundamentalsQuestions } from "./review/al4-fundamentals";
import { al4SortingElementaryQuestions } from "./review/al4-sorting-elementary";
import { al4SortingMergeQuickQuestions } from "./review/al4-sorting-merge-quick";
import { al4SearchingStQuestions } from "./review/al4-searching-st";
import { al4HashTablesQuestions } from "./review/al4-hash-tables";
import { al4GraphsUndirectedQuestions } from "./review/al4-graphs-undirected";
import { al4GraphsDirectedQuestions } from "./review/al4-graphs-directed";
import { al4StringsQuestions } from "./review/al4-strings";
import { al4FinalReviewQuestions } from "./review/al4-final-review";
// 编程珠玑
import { ppLearningMapQuestions } from "./review/pp-learning-map";
import { ppCrackingProblemsQuestions } from "./review/pp-cracking-problems";
import { ppBinarySearchQuestions } from "./review/pp-binary-search";
import { ppBitVectorsQuestions } from "./review/pp-bit-vectors";
import { ppDesignPrinciplesQuestions } from "./review/pp-design-principles";
import { ppCodeTuningQuestions } from "./review/pp-code-tuning";
import { ppBackOfEnvelopeQuestions } from "./review/pp-back-of-envelope";
import { ppPerspectivesQuestions } from "./review/pp-perspectives";
import { ppEpilogQuestions } from "./review/pp-epilog";
import { ppFinalReviewQuestions } from "./review/pp-final-review";
import { caLearningMapQuestions } from "./review/ca-learning-map";
import { caContestBasicsQuestions } from "./review/ca-contest-basics";
import { caDpQuestions } from "./review/ca-dp";
import { caGreedyQuestions } from "./review/ca-greedy";
import { caGraphAlgosQuestions } from "./review/ca-graph-algos";
import { caStringAlgosQuestions } from "./review/ca-string-algos";
import { caMathTricksQuestions } from "./review/ca-math-tricks";
import { caSegmentTreeQuestions } from "./review/ca-segment-tree";
import { caUnionFindQuestions } from "./review/ca-union-find";
import { caFinalReviewQuestions } from "./review/ca-final-review";
import { ialLearningMapQuestions } from "./review/ial-learning-map";
import { ialFoundationsQuestions } from "./review/ial-foundations";
import { ialSortingQuestions } from "./review/ial-sorting";
import { ialSelectionQuestions } from "./review/ial-selection";
import { ialBinarySearchTreesQuestions } from "./review/ial-binary-search-trees";
import { ialHashTablesQuestions } from "./review/ial-hash-tables";
import { ialDataStructuresQuestions } from "./review/ial-data-structures";
import { ialGraphAlgorithmsQuestions } from "./review/ial-graph-algorithms";
import { ialDpAdvancedQuestions } from "./review/ial-dp-advanced";
import { ialFinalReviewQuestions } from "./review/ial-final-review";
import { hdLearningMapQuestions } from "./review/hd-learning-map";
import { hdBitManipulationQuestions } from "./review/hd-bit-manipulation";
import { hdArithmeticTricksQuestions } from "./review/hd-arithmetic-tricks";
import { hdDivisionQuestions } from "./review/hd-division";
import { hdPowerQuestions } from "./review/hd-power";
import { hdUnusualBasesQuestions } from "./review/hd-unusual-bases";
import { hdHashingSearchQuestions } from "./review/hd-hashing-search";
import { hdFloatingPointQuestions } from "./review/hd-floating-point";
import { hdCrcErrorQuestions } from "./review/hd-crc-error";
import { hdFinalReviewQuestions } from "./review/hd-final-review";
import { tcpLearningMapQuestions } from "./review/tcp-learning-map";
import { tcpMathematicalPreliminariesQuestions } from "./review/tcp-mathematical-preliminaries";
import { tcpSequencesQuestions } from "./review/tcp-sequences";
import { tcpArithmeticQuestions } from "./review/tcp-arithmetic";
import { tcpPolynomialsQuestions } from "./review/tcp-polynomials";
import { tcpGf2Questions } from "./review/tcp-gf2";
import { tcpRandomNumbersQuestions } from "./review/tcp-random-numbers";
import { tcpEfficientSearchingQuestions } from "./review/tcp-efficient-searching";
import { tcpInfoStructuresQuestions } from "./review/tcp-info-structures";
import { tcpFinalReviewQuestions } from "./review/tcp-final-review";
import { pmSeriesLearningMapQuestions } from "./review/pm-series-learning-map";
import { pmOfficialChapterQuestions } from "./review/pm-official-chapters";
import { pmSeriesFinalReviewQuestions } from "./review/pm-series-final-review";
import { hfsOfficialLearningMapQuestions } from "./review/hfs-official-learning-map";
import { hfsOfficialChapterQuestions } from "./review/hfs-official-chapters";
import { hfsOfficialFinalReviewQuestions } from "./review/hfs-official-final-review";
import { lad4LearningMapQuestions } from "./review/lad4-learning-map";
import { lad4OfficialChapterQuestions } from "./review/lad4-official-chapters";
import { lad4FinalReviewQuestions } from "./review/lad4-final-review";
import { cm2LearningMapQuestions } from "./review/cm2-learning-map";
import { cm2OfficialChapterQuestions } from "./review/cm2-official-chapters";
import { cm2FinalReviewQuestions } from "./review/cm2-final-review";
import { gdscgLearningMapQuestions } from "./review/gdscg-learning-map";
import { gdscgOfficialChapterQuestions } from "./review/gdscg-official-chapters";
import { gdscgFinalReviewQuestions } from "./review/gdscg-final-review";
import { rtwLearningMapQuestions } from "./review/rtw-learning-map";
import { rtwRayBasicsQuestions } from "./review/rtw-ray-basics";
import { rtwCameraQuestions } from "./review/rtw-camera";
import { rtwSphereHittableQuestions } from "./review/rtw-sphere-hittable";
import { rtwMaterialsQuestions } from "./review/rtw-materials";
import { rtwDiffuseQuestions } from "./review/rtw-diffuse";
import { rtwMetalDielectricQuestions } from "./review/rtw-metal-dielectric";
import { rtwDefocusBlurQuestions } from "./review/rtw-defocus-blur";
import { rtwFinalSceneQuestions } from "./review/rtw-final-scene";
import { rtwFinalReviewQuestions } from "./review/rtw-final-review";
import { dogLearningMapQuestions } from "./review/dog-learning-map";
import { dogOpenglArchitectureQuestions } from "./review/dog-opengl-architecture";
import { dogShaderLanguageQuestions } from "./review/dog-shader-language";
import { dogWebglBasicsQuestions } from "./review/dog-webgl-basics";
import { dogOpenglEsQuestions } from "./review/dog-opengl-es";
import { dogRenderingOptimizationQuestions } from "./review/dog-rendering-optimization";
import { dogFboTechniquesQuestions } from "./review/dog-fbo-techniques";
import { dogCrossPlatformQuestions } from "./review/dog-cross-platform";
import { dogDebuggingToolsQuestions } from "./review/dog-debugging-tools";
import { dogFinalReviewQuestions } from "./review/dog-final-review";
import { vkgLearningMapQuestions } from "./review/vkg-learning-map";
import { vkgVulkanBasicsQuestions } from "./review/vkg-vulkan-basics";
import { vkgInstanceDeviceQuestions } from "./review/vkg-instance-device";
import { vkgSwapchainQuestions } from "./review/vkg-swapchain";
import { vkgGraphicsPipelineQuestions } from "./review/vkg-graphics-pipeline";
import { vkgCommandBuffersQuestions } from "./review/vkg-command-buffers";
import { vkgRenderPassQuestions } from "./review/vkg-render-pass";
import { vkgTexturesShadersQuestions } from "./review/vkg-textures-shaders";
import { vkgAdvancedFeaturesQuestions } from "./review/vkg-advanced-features";
import { vkgFinalReviewQuestions } from "./review/vkg-final-review";
import { cg4LearningMapQuestions } from "./review/cg4-learning-map";
import { cg4GraphicsPipelineQuestions } from "./review/cg4-graphics-pipeline";
import { cg4RasterizationQuestions } from "./review/cg4-rasterization";
import { cg4TransformationsQuestions } from "./review/cg4-transformations";
import { cg4VisibilityQuestions } from "./review/cg4-visibility";
import { cg4LightingModelsQuestions } from "./review/cg4-lighting-models";
import { cg4TexturingQuestions } from "./review/cg4-texturing";
import { cg4CurvesSurfacesQuestions } from "./review/cg4-curves-surfaces";
import { cg4AdvancedRenderingQuestions } from "./review/cg4-advanced-rendering";
import { cg4FinalReviewQuestions } from "./review/cg4-final-review";
import { glrLearningMapQuestions } from "./review/glr-learning-map";
import { glrOpenglBasicsQuestions } from "./review/glr-opengl-basics";
import { glrShadersQuestions } from "./review/glr-shaders";
import { glrGeometryQuestions } from "./review/glr-geometry";
import { glrTexturesQuestions } from "./review/glr-textures";
import { glrLightingQuestions } from "./review/glr-lighting";
import { glrFramebufferQuestions } from "./review/glr-framebuffer";
import { glrAdvancedBuffersQuestions } from "./review/glr-advanced-buffers";
import { glrModernOpenglQuestions } from "./review/glr-modern-opengl";
import { glrFinalReviewQuestions } from "./review/glr-final-review";
import { glsLearningMapQuestions } from "./review/gls-learning-map";
import { glsFirstProgramQuestions } from "./review/gls-first-program";
import { glsShaderPipelineQuestions } from "./review/gls-shader-pipeline";
import { glsVertexProcessingQuestions } from "./review/gls-vertex-processing";
import { glsFragmentShadingQuestions } from "./review/gls-fragment-shading";
import { glsTextureMappingQuestions } from "./review/gls-texture-mapping";
import { glsBufferObjectsQuestions } from "./review/gls-buffer-objects";
import { glsGeometryShadersQuestions } from "./review/gls-geometry-shaders";
import { glsPerformanceQuestions } from "./review/gls-performance";
import { glsFinalReviewQuestions } from "./review/gls-final-review";
import { GpgLearningMapQuestions } from "./review/gpg-learning-map";
import { GpgNaturalEffectsQuestions } from "./review/gpg-natural-effects";
import { GpgLightingShadowsQuestions } from "./review/gpg-lighting-shadows";
import { GpgMaterialsShadersQuestions } from "./review/gpg-materials-shaders";
import { GpgImageProcessingQuestions } from "./review/gpg-image-processing";
import { GpgGeometryQuestions } from "./review/gpg-geometry";
import { GpgParticleSystemsQuestions } from "./review/gpg-particle-systems";
import { GpgGpuComputingQuestions } from "./review/gpg-gpu-computing";
import { GpgAdvancedTechniquesQuestions } from "./review/gpg-advanced-techniques";
import { GpgFinalReviewQuestions } from "./review/gpg-final-review";
import { RtrLearningMapQuestions } from "./review/rtr-learning-map";
import { RtrGraphicsPipelineQuestions } from "./review/rtr-graphics-pipeline";
import { RtrTransformsQuestions } from "./review/rtr-transforms";
import { RtrShadingBasicsQuestions } from "./review/rtr-shading-basics";
import { RtrTexturingQuestions } from "./review/rtr-texturing";
import { RtrAdvancedShadingQuestions } from "./review/rtr-advanced-shading";
import { RtrShadowsQuestions } from "./review/rtr-shadows";
import { RtrGlobalIlluminationQuestions } from "./review/rtr-global-illumination";
import { RtrOptimizationQuestions } from "./review/rtr-optimization";
import { RtrFinalReviewQuestions } from "./review/rtr-final-review";
import { CgpLearningMapQuestions } from "./review/cgp-learning-map";
import { CgpIntroductionQuestions } from "./review/cgp-introduction";
import { CgpRasterGraphicsQuestions } from "./review/cgp-raster-graphics";
import { Cgp2dGraphicsQuestions } from "./review/cgp-2d-graphics";
import { Cgp3dGraphicsQuestions } from "./review/cgp-3d-graphics";
import { CgpRenderingAlgorithmsQuestions } from "./review/cgp-rendering-algorithms";
import { CgpLightingModelsQuestions } from "./review/cgp-lighting-models";
import { CgpModelingQuestions } from "./review/cgp-modeling";
import { CgpAdvancedTopicsQuestions } from "./review/cgp-advanced-topics";
import { CgpFinalReviewQuestions } from "./review/cgp-final-review";
import { pbtLearningMapQuestions } from "./review/pbt-learning-map";
import { pbtRadiometryQuestions } from "./review/pbt-radiometry";
import { pbtCameraModelQuestions } from "./review/pbt-camera-model";
import { pbtMonteCarloQuestions } from "./review/pbt-monte-carlo";
import { pbtBxdfQuestions } from "./review/pbt-bxdf";
import { pbtVolumeScatteringQuestions } from "./review/pbt-volume-scattering";
import { pbtLightTransportQuestions } from "./review/pbt-light-transport";
import { pbtIntegratorsQuestions } from "./review/pbt-integrators";
import { pbtSystemArchitectureQuestions } from "./review/pbt-system-architecture";
import { pbtFinalReviewQuestions } from "./review/pbt-final-review";
import { gilLearningMapQuestions } from "./review/gil-learning-map";
import { gilDirectIndirectQuestions } from "./review/gil-direct-indirect";
import { gilRadiosityQuestions } from "./review/gil-radiosity";
import { gilPathTracingQuestions } from "./review/gil-path-tracing";
import { gilPhotonMappingQuestions } from "./review/gil-photon-mapping";
import { gilImportanceSamplingQuestions } from "./review/gil-importance-sampling";
import { gilBiasUnbiasedQuestions } from "./review/gil-bias-unbiased";
import { gilRealtimeGiQuestions } from "./review/gil-realtime-gi";
import { gilAdvancedTechniquesQuestions } from "./review/gil-advanced-techniques";
import { gilFinalReviewQuestions } from "./review/gil-final-review";
import { usebLearningMapQuestions } from "./review/useb-learning-map";
import { usebOfficialChapterQuestions } from "./review/useb-official-chapters";
import { usebFinalReviewQuestions } from "./review/useb-final-review";
import { psdLearningMapQuestions } from "./review/psd-learning-map";
import { psdOfficialUnitQuestions } from "./review/psd-official-units";
import { psdFinalReviewQuestions } from "./review/psd-final-review";
import { uslLearningMapQuestions } from "./review/usl-learning-map";
import { uslOfficialChapterQuestions } from "./review/usl-official-chapters";
import { uslFinalReviewQuestions } from "./review/usl-final-review";
import { usfLearningMapQuestions } from "./review/usf-learning-map";
import { usfOfficialChapterQuestions } from "./review/usf-official-chapters";
import { usfFinalReviewQuestions } from "./review/usf-final-review";
import { uusLearningMapQuestions } from "./review/uus-learning-map";
import { uusOfficialUnitQuestions } from "./review/uus-official-units";
import { uusFinalReviewQuestions } from "./review/uus-final-review";
import { gpoLearningMapQuestions } from "./review/gpo-learning-map";
import { gpoOfficialThemeQuestions } from "./review/gpo-official-themes";
import { gpoFinalReviewQuestions } from "./review/gpo-final-review";
import { sxxLearningMapQuestions } from "./review/sxx-learning-map";
import { sxxOfficialThemeQuestions } from "./review/sxx-official-themes";
import { sxxFinalReviewQuestions } from "./review/sxx-final-review";
import { bl3OfficialQuestions } from "./review/bl3-official-chapters";
import { gdf3OfficialUnitQuestions } from "./review/gdf3-official-units";
import { gmp17OfficialDomainQuestions } from "./review/gmp17-official-domains";
import { uanOfficialQuestions } from "./review/uan-official-chapters";
import { uctOfficialQuestions } from "./review/uct-official-chapters";
import { ugcOfficialQuestions } from "./review/ugc-official-chapters";
import { uhm24OfficialQuestions } from "./review/uhm24-official-slides";
import { uidOfficialQuestions } from "./review/uid-official-chapters";
import { uscOfficialQuestions } from "./review/usc-official-chapters";
import { uvfOfficialQuestions } from "./review/uvf-official-chapters";
import { usgOfficialQuestions } from "./review/usg-official-chapters";
import { gmaOfficialQuestions } from "./review/gma-official-units";
import { umsOfficialQuestions } from "./review/ums-official-units";
import { u3apOfficialUnitQuestions } from "./review/u3ap-official-units";
import { hfj3OfficialUnitQuestions } from "./review/hfj3-official-units";
import { jct14OfficialQuestions } from "./review/jct14-official-chapters";
import { ejv3OfficialQuestions } from "./review/ejv3-official-items";
import { sia6OfficialQuestions } from "./review/sia6-official-chapters";
import { jvt2OfficialQuestions } from "./review/jvt2-official-units";
import { duj3OfficialQuestions } from "./review/duj3-official-units";
import { jg1bOfficialQuestions } from "./review/jg1b-official-units";
import { gep120OfficialQuestions } from "./review/gep120-official-units";
import { rtcd25OfficialQuestions } from "./review/rtcd25-official-units";
import { gep221OfficialQuestions } from "./review/gep221-official-units";
import { gspOfficialQuestions } from "./review/gsp-official-chapters";
import { ummOfficialQuestions } from "./review/umm-official-chapters";
import { ucnOfficialQuestions } from "./review/ucn-official-chapters";
import { mgaOfficialQuestions } from "./review/mga-official-chapters";
import { gncOfficialQuestions } from "./review/gnc-official-chapters";
import { gsaOfficialQuestions } from "./review/gsa-official-chapters";
import { mgpOfficialQuestions } from "./review/mgp-official-chapters";
import { jpgOfficialQuestions } from "./review/jpg-official-chapters";
import { vjpOfficialQuestions } from "./review/vjp-official-chapters";
import { ydkOfficialQuestions } from "./review/ydk-official-chapters";
import { jdgOfficialQuestions } from "./review/jdg-official-chapters";
import { jfsOfficialQuestions } from "./review/jfs-official-chapters";
import { cswOfficialQuestions } from "./review/csw-official-chapters";
import { csecOfficialQuestions } from "./review/csec-official-chapters";
import { ndgOfficialQuestions } from "./review/ndg-official-chapters";
import { ndbgOfficialQuestions } from "./review/ndbg-official-chapters";
import { dnjOfficialQuestions } from "./review/dnj-official-chapters";
import { vdiOfficialQuestions } from "./review/vdi-official-chapters";
import { fengOfficialQuestions } from "./review/feng-official-chapters";
import { hcwOfficialQuestions } from "./review/hcw-official-chapters";
import { hpwOfficialQuestions } from "./review/hpw-official-chapters";
import { capOfficialQuestions } from "./review/cap-official-chapters";
import { mosOfficialQuestions } from "./review/mos-official-chapters";
import { oscOfficialQuestions } from "./review/osc-official-chapters";
import { wjOfficialQuestions } from "./review/wj-official-chapters";
import { lopOfficialQuestions } from "./review/lop-official-chapters";
import { mfcOfficialQuestions } from "./review/mfc-official-chapters";
import { wkpOfficialQuestions } from "./review/wkp-official-chapters";
import { lkeOfficialQuestions } from "./review/lke-official-chapters";
import { lkdOfficialQuestions } from "./review/lkd-official-chapters";
import { uapOfficialQuestions } from "./review/uap-official-units";
import { gch1OfficialQuestions } from "./review/gch1-official-units";
import { fla3OfficialQuestions } from "./review/fla3-official-units";
import { cra4OfficialChapterQuestions } from "./review/cra4-official-chapters";
import { kdg1OfficialUnitQuestions } from "./review/kdg1-official-units";
import { adae15OfficialChapterQuestions } from "./review/adae15-official-chapters";
import { kia1OfficialUnitQuestions } from "./review/kia1-official-units";
import { aca18OfficialUnitQuestions } from "./review/aca18-official-units";
import { apo12OfficialChapterQuestions } from "./review/apo12-official-chapters";
import { jpc22OfficialChapterQuestions } from "./review/jpc22-official-chapters";
import { aal17OfficialChapterQuestions } from "./review/aal17-official-chapters";
import { dak14OfficialChapterQuestions } from "./review/dak14-official-chapters";
import { davSeriesOfficialQuestions } from "./review/dav-series-official";
import { mseOfficialQuestions } from "./review/mse-official";
import { sqtOfficialQuestions } from "./review/sqt-official";
import { dscOfficialQuestions } from "./review/dsc-official";
import { hpm4OfficialQuestions } from "./review/hpm4-official";
import { ddi1OfficialQuestions } from "./review/ddi1-official";
import { rdi2OfficialQuestions } from "./review/rdi2-official";
import { kfk2OfficialQuestions } from "./review/kfk2-official";
import { rmqActionOfficialQuestions } from "./review/rmq-action-official";
import { kgaOfficialQuestions } from "./review/kga-official-units";
import { k8s1OfficialQuestions } from "./review/k8s1-official-units";
import { phaOfficialQuestions } from "./review/pha-official-units";
import { mspOfficialQuestions } from "./review/msp1-official-chapters";
import { ilhOfficialQuestions } from "./review/ilh-official-chapters";
import { isnOfficialQuestions } from "./review/isn-official-chapters";
import { cnt8OfficialQuestions } from "./review/cnt8-official-chapters";
import { hdg1OfficialQuestions } from "./review/hdg1-official-units";
import { ppa3OfficialQuestions } from "./review/ppa3-official-units";
import { tip2OfficialQuestions } from "./review/tip2-official-units";
import { unpOfficialQuestions } from "./review/unp-official-units";
import { twsOfficialQuestions } from "./review/tws-official-days";
import { crcOfficialQuestions } from "./review/crc-official-units";
import { eacOfficialQuestions } from "./review/eac-official-units";
import { dbcOfficialQuestions } from "./review/dbc-official-units";
import { tbcOfficialQuestions } from "./review/tbc-official-units";
import { iaiOfficialQuestions } from "./review/iai-official-chapters";
import { imlOfficialQuestions } from "./review/iml-official-chapters";
import { idlOfficialQuestions } from "./review/idl-official-chapters";
import { mlwOfficialQuestions } from "./review/mlw-official-chapters";
import { slmOfficialQuestions } from "./review/slm-official-chapters";
import { dlsOfficialQuestions } from "./review/dls-official-chapters";
import { dl2OfficialQuestions } from "./review/dl2-official-steps";
import { dnaOfficialQuestions } from "./review/dna-official-chapters";
import { dlrOfficialQuestions } from "./review/dlr-official-chapters";
import { dlgOfficialQuestions } from "./review/dlg-official-steps";
import { dltOfficialQuestions } from "./review/dlt-official-chapters";
import { prlOfficialQuestions } from "./review/prl-official-chapters";
import { rlcOfficialQuestions } from "./review/rlc-official-chapters";
import { drlOfficialQuestions } from "./review/drl-official-chapters";
import { tcgOfficialQuestions } from "./review/tcg-official-sections";
import { laeOfficialQuestions } from "./review/lae-official-chapters";
import { lcpOfficialQuestions } from "./review/lcp-official-chapters";
import { cgptOfficialQuestions } from "./review/cgpt-official-chapters";
import { llmOfficialQuestions } from "./review/llm-official-chapters";
import { lslOfficialQuestions } from "./review/lsl-official-chapters";
import { blaOfficialQuestions } from "./review/bla-official-chapters";
import { masOfficialQuestions } from "./review/mas-official-chapters";
import { bpOfficialQuestions } from "./review/bp-official-chapters";
import { bdpOfficialQuestions } from "./review/bdp-official-chapters";
import { mbt3OfficialQuestions } from "./review/mbt3-official-chapters";
import { met2OfficialQuestions } from "./review/met2-official-chapters";
import { ine23OfficialQuestions } from "./review/ine23-official-chapters";
import { csi23OfficialQuestions } from "./review/csi23-official-chapters";
import { avc2OfficialQuestions } from "./review/avc2-official-chapters";
import { aes23OfficialQuestions } from "./review/aes23-official-units";
import { tmm40OfficialQuestions } from "./review/tmm40-official-units";
import { cc2eOfficialQuestions } from "./review/cc2e-official-units";
import { tpp20OfficialQuestions } from "./review/tpp20-official-units";
import { poeaa24OfficialQuestions } from "./review/poeaa24-official-units";
import { taoupOfficialQuestions } from "./review/taoup-official-units";
import { crv18OfficialQuestions } from "./review/crv18-official-units";
import { mis18OfficialQuestions } from "./review/mis18-official-units";
import { msg17OfficialQuestions } from "./review/msg17-official-units";
import { pdp16OfficialQuestions } from "./review/pdp16-official-units";
import { ooc16OfficialQuestions } from "./review/ooc16-official-units";
import { eex19OfficialQuestions } from "./review/eex19-official-units";
import { opt23OfficialQuestions } from "./review/opt23-official-units";

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
  ...aad8OfficialQuestions,
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

  ...bnr4OfficialUnitQuestions,
  ...adpOfficialQuestions,
  ...ugoOfficialLearningMapQuestions,
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
  ...ugoOfficialFinalReviewQuestions,
  ...profOfficialUnitQuestions,
  ...mxrwOfficialUnitQuestions,
  ...pbrTheoryQuestions,
  ...pbrLightingQuestions,
  ...pbrIblDiffuseQuestions,
  ...pbrIblSpecularQuestions,
  ...gea319OfficialQuestions,
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
  ...u5OfficialChapterQuestions,
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
  ...gpp14OfficialQuestions,
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
  ...icoObjectLessonsQuestions,
  ...icoConstructorSemanticsQuestions,
  ...icoDataSemanticsQuestions,
  ...icoFunctionSemanticsQuestions,
  ...icoConstructionDestructionCopyQuestions,
  ...icoRuntimeSemanticsQuestions,
  ...icoCuspQuestions,
  ...icoFinalReviewQuestions,
  ...chpLearningMapQuestions,
  ...chpBriefIntroductionQuestions,
  ...chpModernConceptsQuestions,
  ...chpMeasuringPerformanceQuestions,
  ...chpDataStructuresQuestions,
  ...chpIteratorQuestions,
  ...chpStlAlgorithmsQuestions,
  ...chpMemoryManagementQuestions,
  ...chpMetaprogrammingQuestions,
  ...chpProxyLazyQuestions,
  ...chpConcurrencyQuestions,
  ...chpParallelStlQuestions,
  ...chpFinalReviewQuestions,
  ...cpcLearningMapQuestions,
  ...cpcPrerequisitesQuestions,
  ...cpcBasicSyntaxQuestions,
  ...cpcFunctionPrinciplesQuestions,
  ...cpcCppFeaturesQuestions,
  ...cpcAdvancedProgrammingQuestions,
  ...cpcInterviewChallengesQuestions,
  ...cpcFinalReviewQuestions,
  ...opcLearningMapQuestions,
  ...opcOfficialChapterQuestions,
  ...opcFinalReviewQuestions,
  ...mcdLearningMapQuestions,
  ...mcdOfficialChapterQuestions,
  ...mcdFinalReviewQuestions,
  // Easy C++（第5版）
  ...ecpOfficialChapterQuestions,
  ...ecpLearningMapQuestions,
  ...ecpFinalReviewQuestions,
  // C++ Primer Plus（Stephen Prata）
  ...eppOfficialChapterQuestions,
  ...eppLearningMapQuestions,
  ...eppFinalReviewQuestions,
  // 现代 C++ 测试驱动开发
  ...ctrOfficialChapterQuestions,
  ...ctrLearningMapQuestions,
  ...ctrFinalReviewQuestions,
  ...cseLearningMapQuestions,
  ...cseOfficialChapterQuestions,
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
  ...hfd2OfficialAdditionalQuestions,
  ...ec7e6OfficialChapterQuestions,
  ...ec7LearningMapQuestions,
  ...ec7FinalReviewQuestions,
  ...cqc157OfficialChapterQuestions,
  ...cqcLearningMapQuestions,
  ...cqcFinalReviewQuestions,
  ...ecs3OfficialChapterQuestions,
  ...ecsLearningMapQuestions,
  ...ecsFinalReviewQuestions,
  ...cid4OfficialChapterQuestions,
  ...dcsLearningMapQuestions,
  ...dcsFinalReviewQuestions,
  ...fpc1OfficialChapterQuestions,
  ...cfpLearningMapQuestions,
  ...cfpFinalReviewQuestions,
  ...ctcLearningMapQuestions,
  ...ctc10OfficialChapterQuestions,
  ...ctcFinalReviewQuestions,
  ...cvcLearningMapQuestions,
  ...cvc4OfficialChapterQuestions,
  ...cvcFinalReviewQuestions,
  // Pro .NET 内存管理（第2版）
  ...dnmOfficialChapterQuestions,
  ...dnmMemoryModelQuestions,
  ...dnmFinalReviewQuestions,
  // Rust 程序设计语言
  ...rplOfficialChapterQuestions,
  ...rplLearningMapQuestions,
  ...rplFinalReviewQuestions,
  // Go 程序设计语言
  ...goplOfficialChapterQuestions,
  ...gplLearningMapQuestions,
  ...gplFinalReviewQuestions,
  // Python 编程：从入门到实践
  ...pcc3OfficialChapterQuestions,
  ...pccLearningMapQuestions,
  ...pccFinalReviewQuestions,
  // Lua 程序设计
  ...pil4OfficialChapterQuestions,
  // Ruby 基础教程
  ...tr5OfficialChapterQuestions,
  // 大话数据结构
  ...dsvcOfficialChapterQuestions,
  // 图灵数学女孩系列
  ...mglLearningMapQuestions,
  ...mglNumberTheoryQuestions,
  ...mglEquationsQuestions,
  ...mglFunctionsQuestions,
  ...mglCombinatoricsQuestions,
  ...mglGraphTheoryQuestions,
  ...mglProbabilityQuestions,
  ...mglAlgorithmsQuestions,
  ...mglMachineLearningQuestions,
  ...mglFinalReviewQuestions,
  // 数据结构与算法分析（C++描述）
  ...dsaLearningMapQuestions,
  ...dsaComplexityAnalysisQuestions,
  ...dsaListsQuestions,
  ...dsaTreesQuestions,
  ...dsaHashTablesQuestions,
  ...dsaDisjointSetsQuestions,
  ...dsaGraphAlgsQuestions,
  ...dsaSortingQuestions,
  ...dsaDynamicProgrammingQuestions,
  ...dsaFinalReviewQuestions,
  // Rust 编程之道
  ...rswOfficialChapterQuestions,
  ...rswLearningMapQuestions,
  ...rswOwnershipBorrowQuestions,
  ...rswTraitsGenericsQuestions,
  ...rswLifetimesQuestions,
  ...rswErrorHandlingQuestions,
  ...rswUnsafeRustQuestions,
  ...rswConcurrencyQuestions,
  ...rswAsyncRuntimeQuestions,
  ...rswMacrosQuestions,
  ...rswFinalReviewQuestions,
  // Go 语言实战
  ...giaLearningMapQuestions,
  ...giaOfficialChapterQuestions,
  ...giaFinalReviewQuestions,
  // Go Web 编程
  ...gwpLearningMapQuestions,
  ...gwpOfficialChapterQuestions,
  ...gwpFinalReviewQuestions,
  // 流畅的 Python
  ...flpLearningMapQuestions,
  ...flpOfficialChapterQuestions,
  ...flpFinalReviewQuestions,
  // Python 自动化运维
  ...popLearningMapQuestions,
  ...popOfficialChapterQuestions,
  ...popFinalReviewQuestions,
  // 精通 Rust（第2版）
  ...mrsLearningMapQuestions,
  ...mrsOfficialChapterQuestions,
  ...mrsFinalReviewQuestions,
  // Python 高级编程
  ...pyaLearningMapQuestions,
  ...pyaOfficialChapterQuestions,
  ...pyaFinalReviewQuestions,
  // 算法（第4版）
  ...al4LearningMapQuestions,
  ...al4FundamentalsQuestions,
  ...al4SortingElementaryQuestions,
  ...al4SortingMergeQuickQuestions,
  ...al4SearchingStQuestions,
  ...al4HashTablesQuestions,
  ...al4GraphsUndirectedQuestions,
  ...al4GraphsDirectedQuestions,
  ...al4StringsQuestions,
  ...al4FinalReviewQuestions,
  // 编程珠玑
  ...ppLearningMapQuestions,
  ...ppCrackingProblemsQuestions,
  ...ppBinarySearchQuestions,
  ...ppBitVectorsQuestions,
  ...ppDesignPrinciplesQuestions,
  ...ppCodeTuningQuestions,
  ...ppBackOfEnvelopeQuestions,
  ...ppPerspectivesQuestions,
  ...ppEpilogQuestions,
  ...ppFinalReviewQuestions,
  // 深入浅出竞赛算法
  ...caLearningMapQuestions,
  ...caContestBasicsQuestions,
  ...caDpQuestions,
  ...caGreedyQuestions,
  ...caGraphAlgosQuestions,
  ...caStringAlgosQuestions,
  ...caMathTricksQuestions,
  ...caSegmentTreeQuestions,
  ...caUnionFindQuestions,
  ...caFinalReviewQuestions,
  // 算法导论
  ...ialLearningMapQuestions,
  ...ialFoundationsQuestions,
  ...ialSortingQuestions,
  ...ialSelectionQuestions,
  ...ialBinarySearchTreesQuestions,
  ...ialHashTablesQuestions,
  ...ialDataStructuresQuestions,
  ...ialGraphAlgorithmsQuestions,
  ...ialDpAdvancedQuestions,
  ...ialFinalReviewQuestions,
  // 算法心得
  ...hdLearningMapQuestions,
  ...hdBitManipulationQuestions,
  ...hdArithmeticTricksQuestions,
  ...hdDivisionQuestions,
  ...hdPowerQuestions,
  ...hdUnusualBasesQuestions,
  ...hdHashingSearchQuestions,
  ...hdFloatingPointQuestions,
  ...hdCrcErrorQuestions,
  ...hdFinalReviewQuestions,
  // 计算机程序设计艺术
  ...tcpLearningMapQuestions,
  ...tcpMathematicalPreliminariesQuestions,
  ...tcpSequencesQuestions,
  ...tcpArithmeticQuestions,
  ...tcpPolynomialsQuestions,
  ...tcpGf2Questions,
  ...tcpRandomNumbersQuestions,
  ...tcpEfficientSearchingQuestions,
  ...tcpInfoStructuresQuestions,
  ...tcpFinalReviewQuestions,
  // 程序员的数学三册系列
  ...pmSeriesLearningMapQuestions,
  ...pmOfficialChapterQuestions,
  ...pmSeriesFinalReviewQuestions,
  // 深入浅出统计学官方15章
  ...hfsOfficialLearningMapQuestions,
  ...hfsOfficialChapterQuestions,
  ...hfsOfficialFinalReviewQuestions,
  // 线性代数应该这样学
  ...lad4LearningMapQuestions,
  ...lad4OfficialChapterQuestions,
  ...lad4FinalReviewQuestions,
  // 具体数学
  ...cm2LearningMapQuestions,
  ...cm2OfficialChapterQuestions,
  ...cm2FinalReviewQuestions,
  // 计算机图形学：几何体数据结构
  ...gdscgLearningMapQuestions,
  ...gdscgOfficialChapterQuestions,
  ...gdscgFinalReviewQuestions,
  ...rtwLearningMapQuestions,
  ...rtwRayBasicsQuestions,
  ...rtwCameraQuestions,
  ...rtwSphereHittableQuestions,
  ...rtwMaterialsQuestions,
  ...rtwDiffuseQuestions,
  ...rtwMetalDielectricQuestions,
  ...rtwDefocusBlurQuestions,
  ...rtwFinalSceneQuestions,
  ...rtwFinalReviewQuestions,
  ...dogLearningMapQuestions,
  ...dogOpenglArchitectureQuestions,
  ...dogShaderLanguageQuestions,
  ...dogWebglBasicsQuestions,
  ...dogOpenglEsQuestions,
  ...dogRenderingOptimizationQuestions,
  ...dogFboTechniquesQuestions,
  ...dogCrossPlatformQuestions,
  ...dogDebuggingToolsQuestions,
  ...dogFinalReviewQuestions,
  ...vkgLearningMapQuestions,
  ...vkgVulkanBasicsQuestions,
  ...vkgInstanceDeviceQuestions,
  ...vkgSwapchainQuestions,
  ...vkgGraphicsPipelineQuestions,
  ...vkgCommandBuffersQuestions,
  ...vkgRenderPassQuestions,
  ...vkgTexturesShadersQuestions,
  ...vkgAdvancedFeaturesQuestions,
  ...vkgFinalReviewQuestions,
  // 计算机图形学第4版
  ...cg4LearningMapQuestions,
  ...cg4GraphicsPipelineQuestions,
  ...cg4RasterizationQuestions,
  ...cg4TransformationsQuestions,
  ...cg4VisibilityQuestions,
  ...cg4LightingModelsQuestions,
  ...cg4TexturingQuestions,
  ...cg4CurvesSurfacesQuestions,
  ...cg4AdvancedRenderingQuestions,
  ...cg4FinalReviewQuestions,
  // OpenGL 红宝书
  ...glrLearningMapQuestions,
  ...glrOpenglBasicsQuestions,
  ...glrShadersQuestions,
  ...glrGeometryQuestions,
  ...glrTexturesQuestions,
  ...glrLightingQuestions,
  ...glrFramebufferQuestions,
  ...glrAdvancedBuffersQuestions,
  ...glrModernOpenglQuestions,
  ...glrFinalReviewQuestions,
  // OpenGL 超级宝典
  ...glsLearningMapQuestions,
  ...glsFirstProgramQuestions,
  ...glsShaderPipelineQuestions,
  ...glsVertexProcessingQuestions,
  ...glsFragmentShadingQuestions,
  ...glsTextureMappingQuestions,
  ...glsBufferObjectsQuestions,
  ...glsGeometryShadersQuestions,
  ...glsPerformanceQuestions,
  ...glsFinalReviewQuestions,
  // GPU Gems 系列
  ...GpgLearningMapQuestions,
  ...GpgNaturalEffectsQuestions,
  ...GpgLightingShadowsQuestions,
  ...GpgMaterialsShadersQuestions,
  ...GpgImageProcessingQuestions,
  ...GpgGeometryQuestions,
  ...GpgParticleSystemsQuestions,
  ...GpgGpuComputingQuestions,
  ...GpgAdvancedTechniquesQuestions,
  ...GpgFinalReviewQuestions,
  // 实时渲染第4版
  ...RtrLearningMapQuestions,
  ...RtrGraphicsPipelineQuestions,
  ...RtrTransformsQuestions,
  ...RtrShadingBasicsQuestions,
  ...RtrTexturingQuestions,
  ...RtrAdvancedShadingQuestions,
  ...RtrShadowsQuestions,
  ...RtrGlobalIlluminationQuestions,
  ...RtrOptimizationQuestions,
  ...RtrFinalReviewQuestions,
  // 计算机图形学：原理及实践
  ...CgpLearningMapQuestions,
  ...CgpIntroductionQuestions,
  ...CgpRasterGraphicsQuestions,
  ...Cgp2dGraphicsQuestions,
  ...Cgp3dGraphicsQuestions,
  ...CgpRenderingAlgorithmsQuestions,
  ...CgpLightingModelsQuestions,
  ...CgpModelingQuestions,
  ...CgpAdvancedTopicsQuestions,
  ...CgpFinalReviewQuestions,
  // 基于物理的渲染 PBRT
  ...pbtLearningMapQuestions,
  ...pbtRadiometryQuestions,
  ...pbtCameraModelQuestions,
  ...pbtMonteCarloQuestions,
  ...pbtBxdfQuestions,
  ...pbtVolumeScatteringQuestions,
  ...pbtLightTransportQuestions,
  ...pbtIntegratorsQuestions,
  ...pbtSystemArchitectureQuestions,
  ...pbtFinalReviewQuestions,
  // 全局光照技术
  ...gilLearningMapQuestions,
  ...gilDirectIndirectQuestions,
  ...gilRadiosityQuestions,
  ...gilPathTracingQuestions,
  ...gilPhotonMappingQuestions,
  ...gilImportanceSamplingQuestions,
  ...gilBiasUnbiasedQuestions,
  ...gilRealtimeGiQuestions,
  ...gilAdvancedTechniquesQuestions,
  ...gilFinalReviewQuestions,
  // Unity Shader 入门精要
  ...usebLearningMapQuestions,
  ...usebOfficialChapterQuestions,
  ...usebFinalReviewQuestions,
  // Shader 开发实战
  ...psdLearningMapQuestions,
  ...psdOfficialUnitQuestions,
  ...psdFinalReviewQuestions,
  // Unity ShaderLab 开发实战详解
  ...uslLearningMapQuestions,
  ...uslOfficialChapterQuestions,
  ...uslFinalReviewQuestions,
  // Unity 着色器和屏幕特效
  ...usfLearningMapQuestions,
  ...usfOfficialChapterQuestions,
  ...usfFinalReviewQuestions,
  // Unity URP 内置 Shader 解析
  ...uusLearningMapQuestions,
  ...uusOfficialUnitQuestions,
  ...uusFinalReviewQuestions,
  // GPU Pro 系列
  ...gpoLearningMapQuestions,
  ...gpoOfficialThemeQuestions,
  ...gpoFinalReviewQuestions,
  // ShaderX 系列
  ...sxxLearningMapQuestions,
  ...sxxOfficialThemeQuestions,
  ...sxxFinalReviewQuestions,
  ...bl3OfficialQuestions,
  ...gdf3OfficialUnitQuestions,
  ...gmp17OfficialDomainQuestions,
  ...uanOfficialQuestions,
  ...uctOfficialQuestions,
  ...ugcOfficialQuestions,
  ...uhm24OfficialQuestions,
  ...uidOfficialQuestions,
  ...uscOfficialQuestions,
  ...uvfOfficialQuestions,
  ...usgOfficialQuestions,
  ...gmaOfficialQuestions,
  ...umsOfficialQuestions,
  ...u3apOfficialUnitQuestions,
  ...gep120OfficialQuestions,
  ...rtcd25OfficialQuestions,
  ...gep221OfficialQuestions,
  ...gspOfficialQuestions,
  ...ummOfficialQuestions,
  ...ucnOfficialQuestions,
  ...mgaOfficialQuestions,
  ...gncOfficialQuestions,
  ...gsaOfficialQuestions,
  ...mgpOfficialQuestions,
  ...jpgOfficialQuestions,
  ...vjpOfficialQuestions,
  ...ydkOfficialQuestions,
  ...jdgOfficialQuestions,
  ...jfsOfficialQuestions,
  ...cswOfficialQuestions,
  ...csecOfficialQuestions,
  ...ndgOfficialQuestions,
  ...ndbgOfficialQuestions,
  ...dnjOfficialQuestions,
  ...vdiOfficialQuestions,
  // 前端工程化体系设计与实践
  ...fengOfficialQuestions,
  // 计算机是怎么跑起来的
  ...hcwOfficialQuestions,
  // 程序是怎么跑起来的
  ...hpwOfficialQuestions,
  // 深入理解计算机系统（原书第3版）
  ...capOfficialQuestions,
  // 现代操作系统（原书第4版）
  ...mosOfficialQuestions,
  // 操作系统概念（恐龙书，第10版）
  // 操作系统概念（原书第10版）
  ...oscOfficialQuestions,
  ...wjOfficialQuestions,
  ...lopOfficialQuestions,
  ...mfcOfficialQuestions,
  ...wkpOfficialQuestions,
  ...lkeOfficialQuestions,
  ...lkdOfficialQuestions,
  ...uapOfficialQuestions,
  ...hfj3OfficialUnitQuestions,
  ...jct14OfficialQuestions,
  ...ejv3OfficialQuestions,
  ...sia6OfficialQuestions,
  ...jvt2OfficialQuestions,
  ...duj3OfficialQuestions,
  ...jg1bOfficialQuestions,
  ...gch1OfficialQuestions,
  ...fla3OfficialQuestions,
  ...cra4OfficialChapterQuestions,
  ...kdg1OfficialUnitQuestions,
  ...adae15OfficialChapterQuestions,
  ...kia1OfficialUnitQuestions,
  ...aca18OfficialUnitQuestions,
  ...apo12OfficialChapterQuestions,
  ...jpc22OfficialChapterQuestions,
  ...aal17OfficialChapterQuestions,
  ...dak14OfficialChapterQuestions,
  ...davSeriesOfficialQuestions,
  ...mseOfficialQuestions,
  ...sqtOfficialQuestions,
  ...dscOfficialQuestions,
  ...hpm4OfficialQuestions,
  ...ddi1OfficialQuestions,
  ...rdi2OfficialQuestions,
  ...kfk2OfficialQuestions,
  ...rmqActionOfficialQuestions,
  ...kgaOfficialQuestions,
  ...k8s1OfficialQuestions,
  ...phaOfficialQuestions,
  ...mspOfficialQuestions,
  ...ilhOfficialQuestions,
  ...isnOfficialQuestions,
  ...cnt8OfficialQuestions,
  ...hdg1OfficialQuestions,
  ...ppa3OfficialQuestions,
  ...tip2OfficialQuestions,
  ...unpOfficialQuestions,
  ...twsOfficialQuestions,
  ...crcOfficialQuestions,
  ...eacOfficialQuestions,
  ...dbcOfficialQuestions,
  ...tbcOfficialQuestions,
  ...iaiOfficialQuestions,
  ...imlOfficialQuestions,
  ...idlOfficialQuestions,
  ...mlwOfficialQuestions,
  ...slmOfficialQuestions,
  ...dlsOfficialQuestions,
  ...dl2OfficialQuestions,
  ...dnaOfficialQuestions,
  ...dlrOfficialQuestions,
  ...dlgOfficialQuestions,
  ...dltOfficialQuestions,
  ...prlOfficialQuestions,
  ...rlcOfficialQuestions,
  ...drlOfficialQuestions,
  ...tcgOfficialQuestions,
  ...laeOfficialQuestions,
  ...lcpOfficialQuestions,
  ...cgptOfficialQuestions,
  ...llmOfficialQuestions,
  ...lslOfficialQuestions,
  ...blaOfficialQuestions,
  ...masOfficialQuestions,
  ...bpOfficialQuestions,
  ...bdpOfficialQuestions,
  ...mbt3OfficialQuestions,
  ...met2OfficialQuestions,
  ...ine23OfficialQuestions,
  ...csi23OfficialQuestions,
  ...avc2OfficialQuestions,
  ...aes23OfficialQuestions,
  ...tmm40OfficialQuestions,
  ...cc2eOfficialQuestions,
  ...tpp20OfficialQuestions,
  ...poeaa24OfficialQuestions,
  ...taoupOfficialQuestions,
  ...crv18OfficialQuestions,
  ...mis18OfficialQuestions,
  ...msg17OfficialQuestions,
  ...pdp16OfficialQuestions,
  ...ooc16OfficialQuestions,
  ...eex19OfficialQuestions,
  ...opt23OfficialQuestions,
];

/** 题库总数（自检/小结展示用）。 */
export const REVIEW_QUESTION_COUNT = REVIEW_QUESTIONS.length;
