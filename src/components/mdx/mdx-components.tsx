import type { MDXRemoteProps } from "next-mdx-remote/rsc";

import { Attribution } from "./attribution";
import { Callout } from "./callout";
import { CodeTabs, Tab } from "./code-tabs";
import { CompareSlider } from "./compare-slider";
import { DemoStage, Slider, Toggle } from "./controls";
import { RgbMixerDemo } from "./demos/rgb-mixer-demo";
import { PowerFrameRateDiagram } from "./diagrams/power-frame-rate-diagram";
import { VsyncFrameBudgetDiagram } from "./diagrams/vsync-frame-budget-diagram";
import { PlatformProfilingOverviewDiagram } from "./diagrams/platform-profiling-overview-diagram";
import { RemoteProfilerDiagram } from "./diagrams/remote-profiler-diagram";
import {
  RenderScaleDiagram,
  TargetFrameRateDiagram,
  ThermalThrottlingDiagram,
  MobileQualityDiagram,
  PowerDemo,
  ToolComparisonDiagram,
  PlatformProfilingDemo,
} from "./diagrams/profiling-diagrams";
import {
  UrpArchitectureDiagram,
  UrpAssetConfigDiagram,
  TileBasedGpuDiagram,
  XrFrameBudgetDiagram,
  XrInputOverheadDiagram,
  WebAssemblyFeatureDiagram,
} from "./diagrams/prof-mxrw-diagrams";
import { FrameStageDiagram } from "./diagrams/frame-stage-diagram";
import { HomogeneousTranslateDiagram } from "./diagrams/homogeneous-translate-diagram";
import { InterpolationDiagram } from "./diagrams/interpolation-diagram";
import { MipmapPyramidDiagram } from "./diagrams/mipmap-pyramid-diagram";
import { SetupPipelineDiagram } from "./diagrams/setup-pipeline-diagram";
import { ShaderIODiagram } from "./diagrams/shader-io-diagram";
import { TextureCoordDiagram } from "./diagrams/texture-coord-diagram";
import { CompilationPipelineDiagram } from "./diagrams/compilation-pipeline-diagram";
import { CHistoryTimelineDiagram } from "./diagrams/c-history-timeline-diagram";
import { CProgramAnatomyDiagram } from "./diagrams/c-program-anatomy-diagram";
import { VariableMemoryDiagram } from "./diagrams/variable-memory-diagram";
import { PrintfFormatDiagram } from "./diagrams/printf-format-diagram";
import { PrintfFormatFlagsDiagram } from "./diagrams/printf-format-flags-diagram";
import { ScanfInputDiagram } from "./diagrams/scanf-input-diagram";
import { IOMemoryBufferDiagram } from "./diagrams/io-memory-buffer-diagram";
import { CStringMemoryDiagram } from "./diagrams/cstring-memory-diagram";
import { MultiFileCompilationDiagram } from "./diagrams/multi-file-compilation-diagram";
import { CCompilationDiagram } from "./diagrams/c-compilation-diagram";
import { DevelopmentCycleDiagram } from "./diagrams/development-cycle-diagram";
import { PortabilityDiagram } from "./diagrams/portability-diagram";
import { ProfilerWorkflowDiagram } from "./diagrams/profiler-workflow-diagram";
import { EditorTipsDiagram } from "./diagrams/editor-tips-diagram";
import { ProfilerSamplingDiagram } from "./diagrams/profiler-sampling-diagram";
import { BuildSizeDiagram } from "./diagrams/build-size-diagram";
import { UnityProfilerWindowDiagram } from "./diagrams/unity-profiler-window-diagram";
import { CpuGpuBottleneckDiagram } from "./diagrams/cpu-gpu-bottleneck-diagram";
import { ProfilingToolsDiagram } from "./diagrams/profiling-tools-diagram";
import { ProfilerExportDiagram } from "./diagrams/profiler-export-diagram";
import { ProfileAnalyzerWorkflowDiagram } from "./diagrams/profile-analyzer-workflow-diagram";
import { PercentileStatisticsDiagram } from "./diagrams/percentile-statistics-diagram";
import { RegressionDetectionDiagram } from "./diagrams/regression-detection-diagram";
import { CIProfilingDiagram } from "./diagrams/ci-profiling-diagram";
import { GetComponentCacheDiagram } from "./diagrams/get-component-cache-diagram";
import { EmptyCallbackDiagram } from "./diagrams/empty-callback-diagram";
import { UpdateMechanismDiagram } from "./diagrams/update-mechanism-diagram";
import { FindSendMessageDiagram } from "./diagrams/find-send-message-diagram";
import { DrawCallPipelineDiagram } from "./diagrams/draw-call-pipeline-diagram";
import { DynamicBatchingDiagram } from "./diagrams/dynamic-batching-diagram";
import { StaticBatchingDiagram } from "./diagrams/static-batching-diagram";
import { SrpBatcherDiagram } from "./diagrams/srp-batcher-diagram";
import { FrameDebuggerBatchDiagram } from "./diagrams/frame-debugger-batch-diagram";
import { MeshImportDiagram } from "./diagrams/mesh-import-diagram";
import { TextureImportDiagram } from "./diagrams/texture-import-diagram";
import { ResourcesAssetBundleDiagram } from "./diagrams/resources-assetbundle-diagram";
import { AsyncLoadDiagram } from "./diagrams/async-load-diagram";
import { PhysicsTimestepDiagram } from "./diagrams/physics-timestep-diagram";
import { LayerCollisionDiagram } from "./diagrams/layer-collision-diagram";
import { RigidbodySleepDiagram } from "./diagrams/rigidbody-sleep-diagram";
import { CollisionDetectionDiagram } from "./diagrams/collision-detection-diagram";
import { RenderingPipelineGpuDiagram } from "./diagrams/rendering-pipeline-gpu-diagram";
import { LodTransitionDiagram } from "./diagrams/lod-transition-diagram";
import { OcclusionCullingDiagram } from "./diagrams/occlusion-culling-diagram";
import { PostProcessStackDiagram } from "./diagrams/post-process-stack-diagram";
import { XrPerformanceBudgetDiagram } from "./diagrams/xr-performance-budget-diagram";
import { SinglePassStereoDiagram } from "./diagrams/single-pass-stereo-diagram";
import { FoveatedRenderingDiagram } from "./diagrams/foveated-rendering-diagram";
import { UrpXrSettingsDiagram } from "./diagrams/urp-xr-settings-diagram";
import { MonoIl2cppRuntimeDiagram } from "./diagrams/mono-il2cpp-runtime-diagram";
import { GcAllocDiagram } from "./diagrams/gc-alloc-diagram";
import { ObjectPoolDiagram } from "./diagrams/object-pool-diagram";
import { ThreadingProblemDiagram } from "./diagrams/threading-problem-diagram";
import { JobSystemDiagram } from "./diagrams/job-system-diagram";
import { EcsArchitectureDiagram } from "./diagrams/ecs-architecture-diagram";
import { BurstCompilerDiagram } from "./diagrams/burst-compiler-diagram";
import { BurstThreadDiagram } from "./diagrams/burst-thread-diagram";
import { CPUUsageTimelineDiagram } from "./diagrams/cpu-usage-timeline-diagram";
import { CPUHierarchyDiagram } from "./diagrams/cpu-hierarchy-diagram";
import { GCAllocColorDiagram } from "./diagrams/gc-alloc-color-diagram";
import { ScriptsVsEngineDiagram } from "./diagrams/scripts-vs-engine-diagram";
import { GPUProfilerOverviewDiagram } from "./diagrams/gpu-profiler-overview-diagram";
import { FillRateBandwidthDiagram } from "./diagrams/fill-rate-bandwidth-diagram";
import { FrameDebuggerWorkflowDiagram } from "./diagrams/frame-debugger-workflow-diagram";
import { MemorySnapshotWorkflowDiagram } from "./diagrams/memory-snapshot-workflow-diagram";
import { ManagedVsNativeDiagram } from "./diagrams/managed-vs-native-diagram";
import { DrawCallExplanationDiagram } from "./diagrams/draw-call-explanation-diagram";
import { AssetBreakdownDiagram } from "./diagrams/asset-breakdown-diagram";
import { GameObjectToEcsDiagram } from "./diagrams/gameobject-to-ecs-diagram";
import { UrpVsBuiltinDiagram } from "./diagrams/urp-vs-builtin-diagram";
import { SrpBatcherFlowDiagram } from "./diagrams/srp-batcher-flow-diagram";
import { MotionToPhotonDiagram } from "./diagrams/motion-to-photon-diagram";
import { XrInputFlowDiagram } from "./diagrams/xr-input-flow-diagram";
import { Wasm2023Diagram } from "./diagrams/wasm-2023-diagram";
import { HelloWorldAnnotatedDiagram } from "./diagrams/hello-world-annotated-diagram";
import { IOStreamDiagram } from "./diagrams/iostream-diagram";
import { CoordinatePipelineDiagram } from "./diagrams/coordinate-pipeline-diagram";
import { FrustumDiagram } from "./diagrams/frustum-diagram";
import { LookAtDiagram } from "./diagrams/lookat-diagram";
import { EulerAnglesDiagram } from "./diagrams/euler-angles-diagram";
import { CameraMovementDiagram } from "./diagrams/camera-movement-diagram";
import { DiffuseNormalDiagram } from "./diagrams/diffuse-normal-diagram";
import { SpecularReflectDiagram } from "./diagrams/specular-reflect-diagram";
import { DiffuseMapDiagram } from "./diagrams/diffuse-map-diagram";
import { SpecularMapDiagram } from "./diagrams/specular-map-diagram";
import { LightCastersDiagram } from "./diagrams/light-casters-diagram";
import { AttenuationCurveDiagram } from "./diagrams/attenuation-curve-diagram";
import { MultipleLightsDiagram } from "./diagrams/multiple-lights-diagram";
import { TransformOrderDiagram } from "./diagrams/transform-order-diagram";
import { VectorOpsDiagram } from "./diagrams/vector-ops-diagram";
import { VertexPipelineDiagram } from "./diagrams/vertex-pipeline-diagram";
import { AssimpSceneGraphDiagram } from "./diagrams/assimp-scene-graph-diagram";
import { AssimpImportFlowDiagram } from "./diagrams/assimp-import-flow-diagram";
import { MeshDataLayoutDiagram } from "./diagrams/mesh-data-layout-diagram";
import { MeshTextureBindingDiagram } from "./diagrams/mesh-texture-binding-diagram";
import { NodeRecursionDiagram } from "./diagrams/node-recursion-diagram";
import { ModelCompositionDiagram } from "./diagrams/model-composition-diagram";
import { DepthBufferDiagram } from "./diagrams/depth-buffer-diagram";
import { DepthTestStepDiagram } from "./diagrams/depth-test-step-diagram";
import { DepthPrecisionDiagram } from "./diagrams/depth-precision-diagram";
import { ZFightingDiagram } from "./diagrams/z-fighting-diagram";
import { StencilBufferDiagram } from "./diagrams/stencil-buffer-diagram";
import { StencilTestFlowDiagram } from "./diagrams/stencil-test-flow-diagram";
import { StencilOutlineStepDiagram } from "./diagrams/stencil-outline-step-diagram";
import { BlendEquationDiagram } from "./diagrams/blend-equation-diagram";
import { DiscardVsBlendDiagram } from "./diagrams/discard-vs-blend-diagram";
import { AlphaSortDiagram } from "./diagrams/alpha-sort-diagram";
import { BlendSortStepDiagram } from "./diagrams/blend-sort-step-diagram";
import { TypeSizeDiagram } from "./diagrams/type-size-diagram";
import { SignedUnsignedDiagram } from "./diagrams/signed-unsigned-diagram";
import { LiteralTypesDiagram } from "./diagrams/literal-types-diagram";
import { ScopeNestingDiagram } from "./diagrams/scope-nesting-diagram";
import { VariableLifecycleDiagram } from "./diagrams/variable-lifecycle-diagram";
import { StringMemoryDiagram } from "./diagrams/string-memory-diagram";
import { VectorGrowthDiagram } from "./diagrams/vector-growth-diagram";
import { IteratorDiagram } from "./diagrams/iterator-diagram";
import { ArrayVsVectorDiagram } from "./diagrams/array-vs-vector-diagram";
import { ExpressionTreeDiagram } from "./diagrams/expression-tree-diagram";
import { PrecedenceTable } from "./diagrams/precedence-table";
import { IncrementDecrementDiagram } from "./diagrams/increment-decrement-diagram";
import { TypeConversionDiagram } from "./diagrams/type-conversion-diagram";
import { IfElseFlowDiagram } from "./diagrams/if-else-flow-diagram";
import { SwitchFlowDiagram } from "./diagrams/switch-flow-diagram";
import { LoopComparisonDiagram } from "./diagrams/loop-comparison-diagram";
import { BreakContinueDiagram } from "./diagrams/break-continue-diagram";
import { ClassLayoutDiagram } from "./diagrams/class-layout-diagram";
import { AccessControlDiagram } from "./diagrams/access-control-diagram";
import { IOClassHierarchyDiagram } from "./diagrams/io-class-hierarchy-diagram";
import { FileStreamLifecycleDiagram } from "./diagrams/file-stream-lifecycle-diagram";
import { StreamStateDiagram } from "./diagrams/stream-state-diagram";
import { IOManipulatorTable } from "./diagrams/io-manipulator-table";
import { ContainerOverviewDiagram } from "./diagrams/container-overview-diagram";
import { VectorMemoryModelDiagram } from "./diagrams/vector-memory-model-diagram";
import { ContainerOperationTable } from "./diagrams/container-operation-table";
import { AdapterConceptDiagram } from "./diagrams/adapter-concept-diagram";
import { AlgorithmArchitectureDiagram } from "./diagrams/algorithm-architecture-diagram";
import { AssociativeContainerOverviewDiagram } from "./diagrams/associative-container-overview-diagram";
import { MapOperationTable } from "./diagrams/map-operation-table";
import { UnorderedMapInternalsDiagram } from "./diagrams/unordered-map-internals-diagram";
import { ContainerSelectionFlow } from "./diagrams/container-selection-flow";
import { SmartPointerOverviewDiagram } from "./diagrams/smart-pointer-overview-diagram";
import { SharedPtrInternalsDiagram } from "./diagrams/shared-ptr-internals-diagram";
import { CircularReferenceDiagram } from "./diagrams/circular-reference-diagram";
import { DynamicArrayDiagram } from "./diagrams/dynamic-array-diagram";
import { CopySemanticsDiagram } from "./diagrams/copy-semantics-diagram";
import { RuleOfFiveDiagram } from "./diagrams/rule-of-five-diagram";
import { MoveSemanticsDiagram } from "./diagrams/move-semantics-diagram";
import { ResourceLifetimeDiagram } from "./diagrams/resource-lifetime-diagram";
import { AlgorithmExecutionDiagram } from "./diagrams/algorithm-execution-diagram";
import { SortStagesDiagram } from "./diagrams/sort-stages-diagram";
import { LambdaSyntaxDiagram } from "./diagrams/lambda-syntax-diagram";
import { ConstructorCallDiagram } from "./diagrams/constructor-call-diagram";
import { ConstMemberDiagram } from "./diagrams/const-member-diagram";
import { FunctionCallStackDiagram } from "./diagrams/function-call-stack-diagram";
import { ParameterPassingDiagram } from "./diagrams/parameter-passing-diagram";
import { FunctionPrototypeDiagram } from "./diagrams/function-prototype-diagram";
import { RecursionStackDiagram } from "./diagrams/recursion-stack-diagram";
import { ArrayMemoryLayoutDiagram } from "./diagrams/array-memory-layout-diagram";
import { PointerArithmeticDiagram } from "./diagrams/pointer-arithmetic-diagram";
import { ArrayPointerEquivalenceDiagram } from "./diagrams/array-pointer-equivalence-diagram";
import { TwoDimArrayDiagram } from "./diagrams/two-dim-array-diagram";
import { CStringNullTerminatorDiagram } from "./diagrams/cstring-null-terminator-diagram";
import { StrcpyBufferDiagram } from "./diagrams/strcpy-buffer-diagram";
import { StringFunctionTableDiagram } from "./diagrams/string-function-table-diagram";
import { StringPointerVsArrayDiagram } from "./diagrams/string-pointer-vs-array-diagram";
import { StorageClassDiagram } from "./diagrams/storage-class-diagram";
import { MemoryRegionsDiagram } from "./diagrams/memory-regions-diagram";
import { MallocFreeDiagram } from "./diagrams/malloc-free-diagram";
import { LinkageDiagram } from "./diagrams/linkage-diagram";
import { FilePointerDiagram } from "./diagrams/file-pointer-diagram";
import { FileOpenModesDiagram } from "./diagrams/file-open-modes-diagram";
import { FileReadWriteFlowDiagram } from "./diagrams/file-read-write-flow-diagram";
import { BinaryVsTextIODiagram } from "./diagrams/binary-vs-text-io-diagram";
import { StructMemoryLayoutDiagram } from "./diagrams/struct-memory-layout-diagram";
import { StructPointerAccessDiagram } from "./diagrams/struct-pointer-access-diagram";
import { UnionMemoryDiagram } from "./diagrams/union-memory-diagram";
import { EnumDiagram } from "./diagrams/enum-diagram";
import { PreprocessorPipelineDiagram } from "./diagrams/preprocessor-pipeline-diagram";
import { MacroExpansionDiagram } from "./diagrams/macro-expansion-diagram";
import { ConditionalCompileDiagram } from "./diagrams/conditional-compile-diagram";
import { MacroPitfallDiagram } from "./diagrams/macro-pitfall-diagram";
import { BinaryHexDiagram } from "./diagrams/binary-hex-diagram";
import { BitwiseOperatorsDiagram } from "./diagrams/bitwise-operators-diagram";
import { ShiftOperatorsDiagram } from "./diagrams/shift-operators-diagram";
import { BitFieldDiagram } from "./diagrams/bit-field-diagram";
import { FunctionPointerDiagram } from "./diagrams/function-pointer-diagram";
import { LinkedListDiagram } from "./diagrams/linked-list-diagram";
import { QueueStackDiagram } from "./diagrams/queue-stack-diagram";
import { QsortBsearchDiagram } from "./diagrams/qsort-bsearch-diagram";
import { ArrayParameterDiagram } from "./diagrams/array-parameter-diagram";
import { OverloadResolutionDiagram } from "./diagrams/overload-resolution-diagram";
import { OperatorOverloadTable } from "./diagrams/operator-overload-table";
import { OperatorChainDiagram } from "./diagrams/operator-chain-diagram";
import { TypeConversionOperatorDiagram } from "./diagrams/type-conversion-operator-diagram";
import { CallableConceptDiagram } from "./diagrams/callable-concept-diagram";
import { InheritanceHierarchyDiagram } from "./diagrams/inheritance-hierarchy-diagram";
import { VTableDiagram } from "./diagrams/vtable-diagram";
import { InheritanceLifetimeDiagram } from "./diagrams/inheritance-lifetime-diagram";
import { AccessInheritanceTable } from "./diagrams/access-inheritance-table";
import { TemplateInstantiationDiagram } from "./diagrams/template-instantiation-diagram";
import { ClassTemplateDiagram } from "./diagrams/class-template-diagram";
import { TemplateSpecializationDiagram } from "./diagrams/template-specialization-diagram";
import { VariadicTemplateDiagram } from "./diagrams/variadic-template-diagram";
import { TupleLayoutDiagram } from "./diagrams/tuple-layout-diagram";
import { BitsetOperationDiagram } from "./diagrams/bitset-operation-diagram";
import { RegexMatchDiagram } from "./diagrams/regex-match-diagram";
import { RandomPipelineDiagram } from "./diagrams/random-pipeline-diagram";
import { ExceptionHierarchyDiagram } from "./diagrams/exception-hierarchy-diagram";
import { NamespaceNestingDiagram } from "./diagrams/namespace-nesting-diagram";
import { MultipleInheritanceDiagram } from "./diagrams/multiple-inheritance-diagram";
import { ExceptionSafetyTable } from "./diagrams/exception-safety-table";
import { MemoryLayoutDiagram } from "./diagrams/memory-layout-diagram";
import { RTTIDiagram } from "./diagrams/rtti-diagram";
import { EnumUnionDiagram } from "./diagrams/enum-union-diagram";
import { AdvancedFeatureTable } from "./diagrams/advanced-feature-table";
import { WindingOrderDiagram } from "./diagrams/winding-order-diagram";
import { WindingCullStepDiagram } from "./diagrams/winding-cull-step-diagram";
import { FaceCullingDiagram } from "./diagrams/face-culling-diagram";
import { FramebufferAttachmentDiagram } from "./diagrams/framebuffer-attachment-diagram";
import { TwoPassDiagram } from "./diagrams/two-pass-diagram";
import { KernelDiagram } from "./diagrams/kernel-diagram";
import { Cubemap6FacesDiagram } from "./diagrams/cubemap-6faces-diagram";
import { SkyboxDiagram } from "./diagrams/skybox-diagram";
import { ReflectionRefractionDiagram } from "./diagrams/reflection-refraction-diagram";
import { BufferLayoutDiagram } from "./diagrams/buffer-layout-diagram";
import { BufferSubDataDiagram } from "./diagrams/buffer-subdata-diagram";
import { GlFragCoordDiagram } from "./diagrams/gl-fragcoord-diagram";
import { InterfaceBlockDiagram } from "./diagrams/interface-block-diagram";
import { UboBindingDiagram } from "./diagrams/ubo-binding-diagram";
import { GeometryShaderPipelineDiagram } from "./diagrams/geometry-shader-pipeline-diagram";
import { EmitVertexDiagram } from "./diagrams/emit-vertex-diagram";
import { ExplodeDiagram } from "./diagrams/explode-diagram";
import { InstancingDiagram } from "./diagrams/instancing-diagram";
import { AttribDivisorDiagram } from "./diagrams/attrib-divisor-diagram";
import { DrawcallCompareDiagram } from "./diagrams/drawcall-compare-diagram";
import { AliasingDiagram } from "./diagrams/aliasing-diagram";
import { MsaaSampleDiagram } from "./diagrams/msaa-sample-diagram";
import { SsaaVsMsaaDiagram } from "./diagrams/ssaa-vs-msaa-diagram";
import { PhongBlinnHighlightDiagram } from "./diagrams/phong-blinn-highlight-diagram";
import { HalfVectorDiagram } from "./diagrams/half-vector-diagram";
import { GammaCurveDiagram } from "./diagrams/gamma-curve-diagram";
import { GammaGradientBarDiagram } from "./diagrams/gamma-gradient-bar-diagram";
import { ShadowMapStepDiagram } from "./diagrams/shadow-map-step-diagram";
import { ShadowAcneDiagram } from "./diagrams/shadow-acne-diagram";
import { PointShadowStepDiagram } from "./diagrams/point-shadow-step-diagram";
import { TBNDiagram } from "./diagrams/tbn-diagram";
import { NormalDecodeDiagram } from "./diagrams/normal-decode-diagram";
import { ParallaxPrincipleDiagram } from "./diagrams/parallax-principle-diagram";
import { SteepParallaxStepDiagram } from "./diagrams/steep-parallax-step-diagram";
import { DynamicRangeDiagram } from "./diagrams/dynamic-range-diagram";
import { ToneMapCurveDiagram } from "./diagrams/tone-map-curve-diagram";
import { BloomPipelineDiagram } from "./diagrams/bloom-pipeline-diagram";
import { SeparableGaussianDiagram } from "./diagrams/separable-gaussian-diagram";
import { GBufferDiagram } from "./diagrams/gbuffer-diagram";
import { ForwardVsDeferredDiagram } from "./diagrams/forward-vs-deferred-diagram";
import { HemisphereKernelDiagram } from "./diagrams/hemisphere-kernel-diagram";
import { DepthCompareDiagram } from "./diagrams/depth-compare-diagram";
import { NoiseBlurDiagram } from "./diagrams/noise-blur-diagram";
import { MicrofacetSurfaceDiagram } from "./diagrams/microfacet-surface-diagram";
import { EnergyConservationDiagram } from "./diagrams/energy-conservation-diagram";
import { ReflectanceEquationDiagram } from "./diagrams/reflectance-equation-diagram";
import { CookTorranceSplitDiagram } from "./diagrams/cook-torrance-split-diagram";
import { NdfRoughnessDiagram } from "./diagrams/ndf-roughness-diagram";
import { GeometryOcclusionDiagram } from "./diagrams/geometry-occlusion-diagram";
import { FresnelEffectDiagram } from "./diagrams/fresnel-effect-diagram";
import { MetallicWorkflowDiagram } from "./diagrams/metallic-workflow-diagram";
import { PbrLightSetupDiagram } from "./diagrams/pbr-light-setup-diagram";
import { PbrRenderLoopDiagram } from "./diagrams/pbr-render-loop-diagram";
import { LinearHdrPipelineDiagram } from "./diagrams/linear-hdr-pipeline-diagram";
import { IblConceptDiagram } from "./diagrams/ibl-concept-diagram";
import { EquirectToCubemapDiagram } from "./diagrams/equirect-to-cubemap-diagram";
import { HemisphereConvolutionDiagram } from "./diagrams/hemisphere-convolution-diagram";
import { SplitSumDiagram } from "./diagrams/split-sum-diagram";
import { PrefilterMipDiagram } from "./diagrams/prefilter-mip-diagram";
import { BrdfLutDiagram } from "./diagrams/brdf-lut-diagram";
import { AndroidArchLayersDiagram } from "./diagrams/android-arch-layers-diagram";
import { AndroidStartupSequenceDiagram } from "./diagrams/android-startup-sequence-diagram";
import { AndroidProjectStructureDiagram } from "./diagrams/android-project-structure-diagram";
import { GradleBuildPipelineDiagram } from "./diagrams/gradle-build-pipeline-diagram";
import { ApkAnatomyDiagram } from "./diagrams/apk-anatomy-diagram";
import { CTypeSizeDiagram } from "./diagrams/c-type-size-diagram";
import { IntegerRangeDiagram } from "./diagrams/integer-range-diagram";
import { EscapeSequenceDiagram } from "./diagrams/escape-sequence-diagram";
import { DataTypeMemoryLayout } from "./diagrams/data-type-memory-layout";
import { COperatorTable } from "./diagrams/c-operator-table";
import { IncrementTimelineDiagram } from "./diagrams/increment-timeline-diagram";
import { TypePromotionDiagram } from "./diagrams/type-promotion-diagram";
import { WhileLoopFlowDiagram } from "./diagrams/while-loop-flow-diagram";
import { ForLoopFlowDiagram } from "./diagrams/for-loop-flow-diagram";
import { DoWhileVsWhileDiagram } from "./diagrams/do-while-vs-while-diagram";
import { NestedLoopDiagram } from "./diagrams/nested-loop-diagram";
import { SentinelLoopDiagram } from "./diagrams/sentinel-loop-diagram";
import { IfElseChainDiagram } from "./diagrams/if-else-chain-diagram";
import { SwitchCaseDiagram } from "./diagrams/switch-case-diagram";
import { ShortCircuitDiagram } from "./diagrams/short-circuit-diagram";
import { BufferedIODiagram } from "./diagrams/buffered-io-diagram";
import { InputValidationFlowDiagram } from "./diagrams/input-validation-flow-diagram";
import { StdinBufferDiagram } from "./diagrams/stdin-buffer-diagram";
import { MenuDriverDiagram } from "./diagrams/menu-driver-diagram";
import { Answer, Exercises } from "./exercises";
import { Figure } from "./figure";
import { Glossary, GlossaryItem } from "./glossary";
import { BrdfCurveExplorer } from "./brdf-curve-explorer";
import { MathViz } from "./math-viz";
import { Objectives } from "./objectives";
import { PipelineViz } from "./pipeline-viz";
import { ShaderDemo } from "./shader-demo";
import { Step, Stepper } from "./stepper";
import { Term } from "./term";
import { TextureDemo } from "./texture-demo";
import { CameraDemo } from "./camera-demo";
import { LightingDemo } from "./lighting-demo";
import { LightingMapsDemo } from "./lighting/lighting-maps-demo";
import { MultiLightDemo } from "./lighting/multi-light-demo";
import { ModelDemo } from "./model-demo";
import { FramebufferDemo } from "./framebuffer-demo";
import { CubemapDemo } from "./cubemap-demo";
import { InstancingDemo } from "./instancing-demo";
import { ShadowMappingDemo } from "./shadow-mapping-demo";
import { PointShadowsDemo } from "./point-shadows-demo";
import { ActivityLifecycleDiagram } from "./diagrams/activity-lifecycle-diagram";
import { MvcDataFlowDiagram } from "./diagrams/mvc-data-flow-diagram";
import { MvvmDataFlowDiagram } from "./diagrams/mvvm-data-flow-diagram";
import { BackStackDiagram } from "./diagrams/back-stack-diagram";
import { ClassLoaderDelegationDiagram } from "./diagrams/class-loader-delegation-diagram";
import { NavGraphDiagram } from "./diagrams/nav-graph-diagram";
import { FragmentTransactionDiagram } from "./diagrams/fragment-transaction-diagram";
import { RecyclerViewRecyclingDiagram } from "./diagrams/recyclerview-recycling-diagram";
import { HotfixDexInjectionDiagram } from "./diagrams/hotfix-dex-injection-diagram";
import { MessageLoopDiagram } from "./diagrams/message-loop-diagram";
import { ConfigChangeViewModelDiagram } from "./diagrams/config-change-viewmodel-diagram";
import { PropertyAnimationDiagram } from "./diagrams/property-animation-diagram";
import { LogcatLineAnatomyDiagram } from "./diagrams/logcat-line-anatomy-diagram";
import { XmlDrawableTypesDiagram } from "./diagrams/xml-drawable-types-diagram";
import { DebugLoopDiagram } from "./diagrams/debug-loop-diagram";
import { SdkVersionAxisDiagram } from "./diagrams/sdk-version-axis-diagram";
import { LaunchModeDiagram } from "./diagrams/launch-mode-diagram";
import { TestPyramidDiagram } from "./diagrams/test-pyramid-diagram";
import { ViewHierarchyDiagram } from "./diagrams/view-hierarchy-diagram";
import { RoomArchitectureDiagram } from "./diagrams/room-architecture-diagram";
import { ContextHierarchyDiagram } from "./diagrams/context-hierarchy-diagram";
import { StyleThemeInheritanceDiagram } from "./diagrams/style-theme-inheritance-diagram";
import { DialogFragmentDiagram } from "./diagrams/dialog-fragment-diagram";
import { WebViewAnatomyDiagram } from "./diagrams/web-view-anatomy-diagram";
import { AppBarMenuDiagram } from "./diagrams/app-bar-menu-diagram";
import { ImplicitIntentResolutionDiagram } from "./diagrams/implicit-intent-resolution-diagram";
import { CameraIntentFlowDiagram } from "./diagrams/camera-intent-flow-diagram";
import { ResourceQualifierDiagram } from "./diagrams/resource-qualifier-diagram";
import { AccessibilityTreeDiagram } from "./diagrams/accessibility-tree-diagram";
import { ThreadModelDiagram } from "./diagrams/thread-model-diagram";
import { DrawPipelineDiagram } from "./diagrams/draw-pipeline-diagram";
import { SearchFlowDiagram } from "./diagrams/search-flow-diagram";
import { WorkManagerDiagram } from "./diagrams/work-manager-diagram";
import { BroadcastDispatchDiagram } from "./diagrams/broadcast-dispatch-diagram";
import { TouchEventSequenceDiagram } from "./diagrams/touch-event-sequence-diagram";
import { ComponentWorkflowDiagram } from "./diagrams/component-workflow-diagram";
import { JniBridgeDiagram } from "./diagrams/jni-bridge-diagram";
import { LayerCallTraversalDiagram } from "./diagrams/layer-call-traversal-diagram";
import { AmsStartActivityDiagram } from "./diagrams/ams-start-activity-diagram";
import { ZygoteForkDiagram } from "./diagrams/zygote-fork-diagram";
import { WindowManagerDiagram } from "./diagrams/window-manager-diagram";
import { WmsArchitectureDiagram } from "./diagrams/wms-architecture-diagram";
import { DalvikArtCompareDiagram } from "./diagrams/dalvik-art-compare-diagram";
import { JvmRuntimeAreasDiagram } from "./diagrams/jvm-runtime-areas-diagram";
import { HookMechanismDiagram } from "./diagrams/hook-mechanism-diagram";
import { PluginArchitectureDiagram } from "./diagrams/plugin-architecture-diagram";
import { MemoryLeakDiagram } from "./diagrams/memory-leak-diagram";
import { BootSequenceDiagram } from "./diagrams/boot-sequence-diagram";
import { AgentAnatomyDiagram } from "./diagrams/agent-anatomy-diagram";
import { AgentVsWorkflowDiagram } from "./diagrams/agent-vs-workflow-diagram";
import { AgentLoopDiagram } from "./diagrams/agent-loop-diagram";
import { AutonomySpectrumDiagram } from "./diagrams/autonomy-spectrum-diagram";
import { AugmentedLlmDiagram } from "./diagrams/augmented-llm-diagram";
import { RetrievalFlowDiagram } from "./diagrams/retrieval-flow-diagram";
import { MemoryTypesDiagram } from "./diagrams/memory-types-diagram";
import { AugmentedCallDiagram } from "./diagrams/augmented-call-diagram";

/**
 * MDX 结构教学组件 map（HEL-20）。
 *
 * 经 page.tsx 的 compileMDX(... components ...) 注入，使 content 下各书的 .mdx 可直接用
 * <Objectives> / <CodeTabs><Tab> / <Exercises><Answer> / <Attribution> / <Callout> /
 * <ShaderDemo> 等标签。
 *
 * Server / Client 划分：
 *  - Server（纯展示）：Objectives / Callout / Attribution
 *  - Client（真交互）：CodeTabs+Tab（Tab 切换）、Exercises 区的 Answer（折叠披露）
 * client 组件被注入后仍是叶子交互壳，不会把整页变成 client（RSC 边界保持）。
 *
 * 轻量交互/动画/图示组件（HEL-23，非 WebGL，立即可用）：
 *  - Server（纯展示）：Figure（图片比喻 + 百分比标注）
 *  - Client（真交互）：CompareSlider（左右拖动对比）、Stepper+Step（分步动画：
 *    可暂停/单步/拖进度）、Slider/Toggle（内联控件）、DemoStage（Demo 容器卡片）
 *
 * WebGL 片段着色器实时渲染（HEL-25，M4 基座）：
 *  - Client（dynamic 边界）：ShaderDemo —— WebGL2 能力检测 + next/dynamic(ssr:false)
 *    懒加载含 WebGL 代码的 ShaderCanvas（独立 chunk，不进首屏/公共 layout，硬规则 2/6）。
 *    标准 uniforms：uTime / uResolution / uMouse。HEL-26 加 uniform 控件、HEL-27 加在线改 GLSL。
 *
 * WebGL 纹理交互演示（HEL-45，HEL-34「纹理」章核心 viz）：
 *  - Client（dynamic 边界）：TextureDemo —— WebGL2 能力检测 + next/dynamic(ssr:false)
 *    懒加载含 WebGL 代码的 TextureCanvas（独立 chunk，硬规则 2/6）。贴满纹理的 quad +
 *    环绕(REPEAT/MIRRORED/CLAMP) / 过滤(NEAREST/LINEAR) 分段按钮 + UV 缩放 / 放大观察滑块；
 *    默认程序化「UV 测试图」（无外部资源），按需重绘不挂 rAF 常转（reduced-motion 友好）。
 *
 * 术语高亮 + 名词解释（HEL-24）：
 *  - Client（真交互）：Term（行内术语高亮 + hover/focus tooltip + Esc + 锚点跳词条）
 *  - Server（纯展示）：Glossary / GlossaryItem（章末「人话词典」，词条 id 与 Term 锚点对齐）
 *
 * 概念型(A)章节主 Demo（HEL-29，非 WebGL）：
 *  - Client（叶子壳）：PipelineViz —— 渲染管线五阶段数据流 SVG 可视化（点→三角形→
 *    像素格→上色→帧缓冲），可暂停/单步/拖进度，reduced-motion 默认暂停。自带默认五阶段，
 *    无 WebGL 故不需 dynamic 切分；作者如需进一步延后可在用例里 dynamic(ssr:false)。
 *
 * 数学型(B)章节主 Demo（HEL-28，非 WebGL）：
 *  - Client（dynamic 边界）：MathViz —— 2D 向量/矩阵/坐标变换 SVG 交互可视化（拖动输入
 *    向量、调 2×2 矩阵 Slider、实时看 M·v 与变换后网格/基向量、预设/重置/键盘可调）。
 *    虽非 WebGL 但属重交互组件，按硬规则 2 经 next/dynamic(ssr:false) 懒加载独立 chunk。
 *
 * 章节专用静态示意图（Server，纯展示 SVG，无 three / 无交互 / reduced-motion 无关）：
 *  - SetupPipelineDiagram / FrameStageDiagram（你好窗口）、VertexPipelineDiagram（你好三角形）
 *  - ShaderIODiagram / InterpolationDiagram（着色器，HEL-33）：in/out + uniform 数据流、
 *    顶点→片段插值。一律 token 色、无内联多行 SVG 进 mdx（规避 hydration mismatch）。
 *  - TextureCoordDiagram / MipmapPyramidDiagram（纹理，HEL-34）：UV 四角如何对应纹理四角 +
 *    逐顶点带 UV / 片段插值采样、mipmap「纹理金字塔」逐级减半按远近取级。同款 Server SVG。
 *  - VectorOpsDiagram / HomogeneousTranslateDiagram / TransformOrderDiagram（变换，HEL-35）：
 *    向量加法首尾相接 + 取负 / 数乘 / 点乘叉乘、齐次坐标 w=1 让平移量住进矩阵末列、
 *    组合顺序不交换（T·S vs S·T 终点不同）。同款 Server SVG，配 §4 数学一起读。
 *  - CoordinatePipelineDiagram / FrustumDiagram / LookAtDiagram（坐标系统）：
 *    五空间流水线 / 透视投影视锥体压进 NDC 立方体 / LookAt 矩阵三轴构造。同款 Server SVG。
 *  - EulerAnglesDiagram / CameraMovementDiagram（摄像机）：
 *    Pitch/Yaw/Roll 三角度示意 / WASD 沿 front·right 移动示意。同款 Server SVG。
 *  - DiffuseNormalDiagram / SpecularReflectDiagram（基础光照，HEL-51）：
 *    漫反射看法线 N 与指向光源 L 的夹角（N·L，正对最亮、背光 max 截 0）/ 镜面看反射方向 R
 *    与观察 V 的贴合度 + 反光度 shininess 是 pow(R·V,n) 的指数（n 越大斑越小越锐）。同款 Server SVG。
 *  - DiffuseMapDiagram / SpecularMapDiagram（光照贴图，HEL-53）：
 *    漫反射贴图把常量 diffuse 换成逐片段采样的底色（整块一色 → 各处各色）/ 镜面光贴图是灰度遮罩
 *    （白=反光强、黑=不反光，木箱钢边亮、木头哑），采样灰度值直接当镜面强度乘数。同款 Server SVG。
 *  - LightCastersDiagram / AttenuationCurveDiagram（投光物，HEL-54）：
 *    三类投光物对照（平行光一组平行箭头·只方向不衰减 / 点光源放射 + 同心圆越远越淡·随距离衰减 /
 *    聚光锥形 + 内外圆锥 + 切光角）/ 衰减曲线（亮度随 d 先陡后缓掉、二次项 Kq·d² 比线性下跌更狠）。同款 Server SVG。
 *  - MultipleLightsDiagram（多光源，HEL-55，光照篇收官）：
 *    每类光封成独立函数（CalcDirLight/CalcPointLight/CalcSpotLight）各算各的贡献，三份贡献
 *    汇入 ∑ 相加 = 这块表面最终色；强调「每个光独立算、结果累加」（漏加 = 只显其中一盏）。同款 Server SVG。
 *  - 模型加载篇：AssimpSceneGraph/AssimpImportFlow（Assimp）、MeshDataLayout/MeshTextureBinding（网格）、NodeRecursion/ModelComposition（模型）。同款 Server SVG。
 *  - 高级OpenGL篇·深度测试（HEL-67）：DepthBufferDiagram（每像素颜色+深度、近物盖远物）、
 *    DepthTestStepDiagram（§5 Stepper 逐片段测试每步图示：①两深度并列待比→②0.3<0.7 通过→
 *    ③写色 + 深度 0.7→0.3→④更远 0.5 丢弃、那格不变）、
 *    DepthPrecisionDiagram（非线性深度：near 刻度密 far 稀、精度堆近处）、
 *    ZFightingDiagram（两面几乎共面争夺同深度 → 撕裂条纹）。同款 Server SVG。
 *  - 高级OpenGL篇·模板测试（HEL-68）：StencilBufferDiagram（模板缓冲＝喷漆模板：每像素存整数，
 *    只在镂空/满足比较的格子让漆透到画布）、StencilTestFlowDiagram（一个片段流转：模板测试→深度测试→
 *    写颜色，标 glStencilOp 的 sfail/dpfail/dppass 三情形；模板测试在深度测试之前）、
 *    StencilOutlineStepDiagram（§5 Stepper 物体描边两遍法每步图示：①画物体 + 模板写 1→
 *    ②画放大物体 + GL_NOTEQUAL 只取外环上描边色→③留下一圈描边）。同款 Server SVG。
 *  - 高级OpenGL篇·混合（HEL-69）：BlendEquationDiagram（混合方程 C=Csrc·Fsrc+Cdst·Fdst
 *    图解：源色×源因子 + 目标色×目标因子 = 混出色，over 取 Fsrc=αsrc / Fdst=1−αsrc）、
 *    DiscardVsBlendDiagram（discard 硬边镂空·草/铁丝网 vs blend 半透明渐变·玻璃，何时用哪个）、
 *    AlphaSortDiagram（半透明排序：乱序穿帮 vs 从远到近 + 关深度写入 正确透叠）、
 *    BlendSortStepDiagram（§5 Stepper 半透明排序每步图示：①乱序穿帮→②先画不透明物→
 *    ③半透明从远到近 + 关深度写入 透叠正确）。同款 Server SVG。
 *  - 高级OpenGL篇·面剔除（HEL-70）：WindingOrderDiagram（环绕顺序判正背：v0→v1→v2 逆时针 CCW=正面
 *    保留 vs 顺时针 CW=背面剔除，并排对照）、WindingCullStepDiagram（§5 Stepper 环绕判正背每步图示：
 *    ①模型里顶点统一逆时针定义→②投影到屏幕后朝你的仍 CCW=正面 / 背对你的反转成 CW=背面→
 *    ③背面被剔除不画、省片段开销）、FaceCullingDiagram（剔除关 vs 开 同构同框：culled=false 背面也画、
 *    透视看到内壁穿帮 / culled=true 只画正面、干净省一半，供 CompareSlider 两侧分别传）。同款 Server SVG。
 *  - 高级OpenGL篇·帧缓冲（HEL-71）：FramebufferAttachmentDiagram（帧缓冲 FBO = 只是个「框」+
 *    挂在上面的颜色纹理附件 / 深度 renderbuffer 附件，旁标 checkFramebufferStatus 完整性检查）、
 *    TwoPassDiagram（§5 Stepper 两遍渲染每步图示：①第一遍绑自建 FBO 把场景渲进颜色纹理→
 *    ②绑回默认帧缓冲取出离屏纹理→③第二遍全屏四边形采样纹理 + 后处理核 上屏）、
 *    KernelDiagram（3×3 卷积核怎么对邻域 9 格加权求和：邻域 ⊗ 权重核 = 新色，权重和 1 不变亮暗 / 0 突出边缘）。同款 Server SVG。
 *  - 高级OpenGL篇·立方体贴图（HEL-72）：Cubemap6FacesDiagram（立方体贴图＝6 张面图 +X/−X/+Y/−Y/+Z/−Z
 *    十字展开 + 一根从中心射出的方向向量命中某面某点示意「用方向向量采样、不是 uv」）、
 *    SkyboxDiagram（天空盒去平移对照：没去平移则盒子跟相机位移糊脸 vs 去平移 mat3(view) 盒永以相机为中心在最远处）、
 *    ReflectionRefractionDiagram（反射 R=reflect(I,N) 关于法线对称弹出 vs 折射 R=refract(I,N,ratio)
 *    穿界面弯折、弯折量由 ratio=n₁/n₂ 定）。同款 Server SVG。
 *  - 高级OpenGL篇·高级数据（HEL-73）：BufferLayoutDiagram（mode=interleaved/batched/compare：交错布局
 *    一个顶点 P|N|U 挨着重复·stride=32 共用·offset 0/12/24 vs 分批布局 所有 P 一段|所有 N 一段|所有 U 一段·
 *    各属性独立 stride=12/12/8·offset=各段起点；compare 两条并列「同一 VAO 只是 stride/offset 填法不同」，
 *    兼作 §5 Stepper 三步配图）、BufferSubDataDiagram（glBufferData 整块重建 vs glBufferSubData(offset,size,data)
 *    只覆盖中间一段·标 offset 起点 + size 长度）。同款 Server SVG。
 *  - 高级OpenGL篇·高级GLSL（HEL-74）：GlFragCoordDiagram（gl_FragCoord 是窗口像素坐标：左下原点 (0,0)、
 *    向右 x 向上 y、右上 (宽,高)，标「x∈0..宽/y∈0..高，不是 -1..1，要除 uResolution」掐死 NDC 误区）、
 *    InterfaceBlockDiagram（散装 in/out 一根根连·易乱 vs 接口块 out VS_OUT{...}vs_out / in VS_OUT{...}fs_in
 *    整组打包·块名两端对上即可、实例名可不同）、UboBindingDiagram（step=1/2/3：①不用 UBO 每 program 各传一遍·
 *    冗余 → ②用 UBO 一块缓冲经绑定点 0 接多 program·改一次全体生效 → ③std140 内存条·vec3 补齐 16 字节留 padding，
 *    兼作 §5 Stepper 三步配图）。同款 Server SVG。
 *  - 高级OpenGL篇·几何着色器（HEL-75，⚠WebGL2 无此阶段）：GeometryShaderPipelineDiagram（管线位置：顶点着色器→
 *    【几何着色器·可增删改图元·可选阶段】→光栅化，中间格高亮、标「图元装配后/光栅化前·输入 1 图元→输出 0/1/多个」）、
 *    EmitVertexDiagram（一个点如何被造成四边形：输入 1 点 → EmitVertex×4 发顶点 ①②③④ → EndPrimitive 收尾 →
 *    triangle_strip 连成 1 个 billboard 四边形，「0 维点凭空长成一片面」）、ExplodeDiagram（爆破 explode 同构同框：
 *    exploded=false 六三角形紧凑拼合 vs exploded=true 各片沿面法线推开 magnitude 飞溅碎片 + 绿法线箭头，bare 去图注，
 *    供 Stepper 第三步 + CompareSlider 两侧分别传）。同款 Server SVG。
 *  - 高级OpenGL篇·实例化（HEL-76，C 实战型）：InstancingDiagram（一个网格模子「只存一份」+ 一张「每实例变换表」
 *    第 i 行 = gl_InstanceID==i → 照表盖出 N 个实例，一次 draw call）、AttribDivisorDiagram（mode=divisor0/divisor1/compare：
 *    divisor=0 逐顶点步进 每个顶点读一条 vs divisor=1 每实例步进 一条覆盖整个实例所有顶点，compare 并列 + 「忘设 1 = 被当逐顶点读」提醒）、
 *    DrawcallCompareDiagram（不实例化 CPU 喊 N 遍 N 根红箭头·瓶颈 vs 实例化 CPU 喊 1 遍 1 根绿粗箭头 instanceCount=N·流畅，
 *    点明省的是 CPU 反复喊话发起 draw call 的通信开销）。同款 Server SVG。
 *  - C++ Primer·表达式（cpp-primer-ch4，A 概念型）：ExpressionTreeDiagram（a+b*c 表达式树，标求值顺序）、
 *    PrecedenceTable（运算符优先级速查表 SVG）、IncrementDecrementDiagram（++i 前缀 vs i++ 后缀时序对照）、
 *    TypeConversionDiagram（内建类型隐式转换方向链，支持 step prop 选展示层）。同款 Server SVG。
 *  - C++ Primer·语句（cpp-primer-ch5，C 实战型）：IfElseFlowDiagram（if→else if→else 菱形判断分支图）、
 *    SwitchFlowDiagram（switch 多路 case/default 跳转图）、LoopComparisonDiagram（while/for/do-while 三栏对比）、
 *    BreakContinueDiagram（break 跳出循环 vs continue 跳到下一轮的语义对比图）。同款 Server SVG。
 *
 *  - 高级OpenGL篇·抗锯齿（HEL-77，A 概念型，篇收官）：AliasingDiagram（aa 布尔 + bare：屏幕是方格纸，斜边落格上
 *    aa=false 每格整涂/不涂成硬阶梯·锯齿 vs aa=true 边缘格按覆盖度涂半深过渡灰·平滑，虚线标理想斜边，
 *    供 Stepper 第一步 + CompareSlider 两侧分别传）、MsaaSampleDiagram（§5 Stepper MSAA 判覆盖度每步图示：
 *    ①一条斜边压过一个像素格切成内/外两片→②像素内放 4 个采样点数 2/4 在内=覆盖度 50%→
 *    ③按覆盖度 50% 取图元色与背景色中间色填边缘像素·柔和）、SsaaVsMsaaDiagram（SSAA 每像素拆 4 子像素且
 *    每个子像素都着色·贵 vs MSAA 只边缘多采样点判覆盖度·片段着色仍每像素一次·性价比，并排对照）。同款 Server SVG。
 *  - 高级光照篇·Blinn-Phong（HEL-80，D 对比型，篇开篇）：PhongBlinnHighlightDiagram（mode=phong/blinn + bare：
 *    掠射光下沿表面的高光强度带，phong 用 R·V 走到中途 R·V<0 被 clamp 成 0「啪」掉成竖直硬边·断裂 vs
 *    blinn 用 N·H 全程圆润曲线平滑滑到 0·无硬边，同坐标轴/表面/光视方位同框，供 CompareSlider 两侧分别传）、
 *    HalfVectorDiagram（左 Phong 先求 L 关于 N 的反射 R 再看 R·V vs 右 Blinn 把 L、V 相加归一化得半程向量
 *    H=normalize(L+V) 落在 L、V 正中间·改看 N·H，点明 H 总在 L、V 间故 N·H 夹角永不越界=平滑根）。同款 Server SVG。
 *  - 高级光照篇·Gamma 校正（HEL-81，A 概念型 + math:true）：GammaCurveDiagram（同坐标系画三条幂曲线：
 *    y=x 线性基准虚线 / y=x^2.2 显示器非线性响应=sRGB 编码曲线·压暗中间调(0.5→约0.22) / y=x^(1/2.2)
 *    gamma 校正曲线·提亮中间调(0.5→约0.73)，后两条互为反函数串起来=线性对角线，点明「校正抵消显示器压暗」，
 *    本章核心概念图）、GammaGradientBarDiagram（corrected=false/true + bare：黑到白渐变条，未校正 线性值
 *    直接显示·中段被显示器压暗偏黑·过渡挤亮端 vs 已校正 pow(c,1/2.2) 提亮中段·过渡均匀，同框供 CompareSlider
 *    两侧分别传）。同款 Server SVG。
 *  - 高级光照篇·阴影映射（HEL-82，C 实战型）：ShadowMapStepDiagram（§5 Stepper 两遍法四步配图：
 *    ①第一遍从光源视角沿每方向记最近遮挡距离渲进深度图 shadow map（亮=近/暗=远）→②存下这张深度图→
 *    ③第二遍从相机渲、用光的 view×proj 把每片元变到光空间取当前深度→④比深度判阴影：current>closest=被挡在阴影(红)
 *    / current≈closest=自己最近受光(绿)）、ShadowAcneDiagram（mode=acne/bias：深度图一格覆盖斜面一小片只存取样点一个最近深度，
 *    远光半 current>stored 被自己误判「在阴影」→交替亮暗条纹=shadow acne vs 加 depth bias 把 stored 往更远推一点·整片受光条纹消失）。同款 Server SVG。
 *  - 高级光照篇·点阴影（HEL-83，C 实战型，阴影映射的全向版）：PointShadowStepDiagram（§5 Stepper 深度立方图全向阴影四步配图：
 *    ①方向光只朝一向·一张 2D 够 vs 点光源向 360° 发光·单张 2D 只罩一个方向其余漏掉→②用 6 个面 +X/−X/+Y/−Y/+Z/−Z 的朝外小相机
 *    把光源包住各渲一张 = 深度立方体贴图·全包住→③每面存「到光源的最近线性距离」而非裁剪空间深度·距离÷far 归一化·亮=近暗=远→
 *    ④第二遍用 方向=fragPos−lightPos 去 cubemap 采样取最近距离·×far 还原·和 length(fragToLight) 比：更大=在阴影(红)/相等=受光(绿)）。同款 Server SVG。
 *
 * WebGL 摄像机视角交互演示（摄像机章 CameraDemo）：
 *  - Client（dynamic 边界）：CameraDemo —— WebGL2 能力检测 + next/dynamic(ssr:false)
 *    懒加载 CameraCanvas（独立 chunk，硬规则 2/6）。网格 + 彩色立方体场景，
 *    pitch/yaw/distance/fov 滑块驱动 lookAt 视角，按需重绘。
 *
 * WebGL Phong 光照交互演示（「光照篇」2–6 章共享主 viz LightingDemo，HEL-49）：
 *  - Client（dynamic 边界）：LightingDemo —— WebGL2 能力检测 + next/dynamic(ssr:false)
 *    懒加载 LightingCanvas（独立 chunk，硬规则 2/6）。带法线立方体 + 可公转点光源
 *    （小自发光标记），片元做 ambient+diffuse+specular Phong；光源方位/环境强度/
 *    镜面强度/高光指数滑块 + 重置，uniform 驱动按需重绘（不重编译、不挂常驻 rAF）。
 *    复用 camera-math 矩阵基座（新增 mat3 法线矩阵 / 归一化 / 叉乘 / 带法线立方体）。
 *
 * WebGL 光照贴图渐进演示（lighting-maps 章 LightingMapsDemo，HEL-65）：
 *  - Client（dynamic 边界）：LightingMapsDemo —— WebGL2 能力检测 + next/dynamic(ssr:false)
 *    懒加载 LightingMapsCanvas（独立 chunk，硬规则 2/6）。贴图立方体（程序化木箱风 diffuse +
 *    配套灰度 specular 遮罩，零外部资源，UV 严格对齐）+ 公转点光源（小亮块标记）。
 *    三步推进：常量材质 → +漫反射贴图（texture(diffuseMap).rgb）→ +镜面光贴图遮罩
 *    （×texture(specularMap).r）；第 3 步只有钢边/铆钉随光高光、木面哑光。
 *    自带「位置+法线+UV」立方体常量（不改 camera-math 共享常量）；光源方位滑块 + 自转开关
 *    （reduced-motion 默认关、离屏停转）+ 重置；切步/改参仅改 uniform 按需重绘，不重编译。
 *
 * WebGL 多光源交互演示（multiple-lights 章 MultiLightDemo，HEL-66）：
 *  - Client（dynamic 边界）：MultiLightDemo —— WebGL2 能力检测 + next/dynamic(ssr:false)
 *    懒加载 MultiLightCanvas（独立 chunk，硬规则 2/6）。一个立方体同时叠加 1 平行光 +
 *    至多 4 点光源（可增删，GLSL 固定大小数组 + uActivePointCount 循环防越界）+ 1 聚光；
 *    片元对每类光各算一份 ambient+diffuse+specular Phong 后相加，**不 clamp**，被多盏同照处
 *    可顶白过曝（本章核心现象）。主从控件（≤5）：顶部灯管理（选灯/开关/点光源 ＋－）+
 *    下方只显示选中那盏的颜色/方位/强度/衰减或切光角 + 重置；默认布灯开箱即「多盏叠加亮处过曝」。
 *    uniform 驱动按需重绘（不重编译、不挂常驻 rAF），离屏暂停，卸载释放 GL 资源。
 *
 * R3F 交互式模型查看器（「模型加载篇·模型 Model 章」ModelDemo，HEL-58）：
 *  - Client（dynamic 边界）：ModelDemo —— WebGL2 能力检测 + next/dynamic(ssr:false)
 *    懒加载 ModelCanvas（独立 chunk，硬规则 2/6）。复用 Hero 的 ferrari.glb（drei useGLTF
 *    + 本地 Draco decoder，不新增资源、不跑 gltf-transform，硬规则 3）。
 *    教学核心「模型 = 一堆有名字的 mesh」：运行时 scene.traverse 收集所有 isMesh 节点生成
 *    下拉，选某 mesh = 高亮该件 + 压暗其余；线框开关 + 自转开关（reduced-motion 默认关）+ 重置。
 *    frameloop="demand" + IntersectionObserver 离屏停转（不空转 rAF）。
 *
 * WebGL 帧缓冲「渲到纹理 + 后处理核」交互演示（「高级OpenGL篇·帧缓冲」FramebufferDemo，HEL-71）：
 *  - Client（dynamic 边界）：FramebufferDemo —— WebGL2 能力检测 + next/dynamic(ssr:false)
 *    懒加载 FramebufferCanvas（独立 chunk，硬规则 2/6）。真两遍渲染：第一遍把自转彩色立方体
 *    （复用 camera-math 带法线立方体 + 矩阵，开深度测试）渲进自建 FBO 的颜色纹理附件 + 深度
 *    renderbuffer 附件（checkFramebufferStatus 验完整）；第二遍绑回默认帧缓冲、关深度测试，
 *    画铺满 NDC 的全屏四边形采样离屏纹理，按 uKernel 0..4 输出 原图/反相/灰度/模糊(3×3 均值核)/
 *    边缘检测(3×3 边缘核)。控件：5 核分段选择器（默认原图）+ 重置；reduced-motion 默认不自转、
 *    IntersectionObserver 离屏停转、resize 重建附件、卸载释放全部 GL 资源。
 *
 * R3F 立方体贴图「天空盒 + 反射/折射/漫反射」交互演示（「高级OpenGL篇·立方体贴图」CubemapDemo，HEL-72）：
 *  - Client（dynamic 边界）：CubemapDemo —— WebGL2 能力检测 + next/dynamic(ssr:false)
 *    懒加载 CubemapCanvas（独立 chunk，硬规则 2/6）。R3F + drei 实现，避开手写裸 WebGL2 两遍管线。
 *    程序化环境（禁外部资源，硬规则 3）：6 面用 canvas 代码画「黄昏天空盒」（上紫天/下近黑地/
 *    四周地平线渐变 + 网格 + 方位字 RIGHT/LEFT/…）拼成 CubeTexture，设为 scene.background（天空盒
 *    去平移由 three background 机制自动完成）+ 一个 BackSide 大球作冗余背景。中央球三材质切换：
 *    反射（MeshStandardMaterial metalness=1/roughness=0 + envMap 全镜面）/ 折射（drei
 *    MeshTransmissionMaterial 玻璃 ior 1.5）/ 漫反射（哑光中性、不挂 envMap 对照）。控件：材质
 *    分段选择器（默认反射）+ OrbitControls 拖拽转视角/滚轮缩放 + 重置；frameloop="demand"、
 *    OrbitControls onChange/切材质/离屏恢复时 invalidate，无自转动画（天然 reduced-motion 友好），
 *    卸载 dispose 立方体贴图。
 *
 * R3F 实例化「行星带」交互演示（「高级OpenGL篇·实例化」InstancingDemo，HEL-76）：
 *  - Client（dynamic 边界）：InstancingDemo —— WebGL2 能力检测 + next/dynamic(ssr:false)
 *    懒加载 InstancingCanvas（独立 chunk，硬规则 2/6）。一个 <instancedMesh args={[geo, mat, MAX]}> 画一整条
 *    程序化「行星带」（同一个小立方体几何，固定种子伪随机摆环形阵列 + setColorAt 每实例 HSL 渐变色，零外部资源，
 *    硬规则 3）。滑块改实例数 100~10000 只调 mesh.count（实例化下几乎零成本，画到上万仍流畅）；自转开关
 *    （reduced-motion 默认关）+ 重置；顶部 draw call 对比条：实例化恒 1 vs 不实例化需 count 次。frameloop
 *    可见性门控 always/never（离屏停转、避开 demand 首屏黑屏），OrbitControls 拖拽转视角/滚轮缩放。
 *
 * R3F 阴影映射「内建 shadow map 实时调参」交互演示（「高级光照篇·阴影映射」ShadowMappingDemo，HEL-82）：
 *  - Client（dynamic 边界）：ShadowMappingDemo —— WebGL2 能力检测 + next/dynamic(ssr:false)
 *    懒加载 ShadowMappingCanvas（独立 chunk，硬规则 2/6）。<Canvas shadows> + 一盏 DirectionalLight castShadow，
 *    地面 receiveShadow + 两立方体一球 castShadow/receiveShadow，零外部资源（硬规则 3）。three.js 内建 shadow map
 *    本质就是本章两遍法（光源视角渲深度图→相机比深度判阴影），把要教的参数全做成实时控件让读者亲手拖出概念：
 *    ①光源角度（绕场景转光看阴影方向变）②阴影图分辨率 256/512/1024/2048 分段（改后 dispose 旧 shadow.map 重建·看锯齿随分辨率变）
 *    ③depth bias 滑块（拖最小→shadow acne 自遮挡条纹/拖最大→peter panning 阴影脱离悬浮/中间干净）
 *    ④PCF 软阴影开关（R3F 声明式 <Canvas shadows={pcf?"soft":"basic"}>：soft=PCFSoftShadowMap 软边 ↔ basic=BasicShadowMap 硬边）+ 重置。
 *    frameloop 可见性门控 always/never（离屏停转、避开 demand 首屏黑屏），OrbitControls 拖拽转视角/滚轮缩放，
 *    改参 invalidate 踢一帧（场景静止·天然 reduced-motion 友好）。
 *
 * R3F 点阴影「内建点光阴影 = 深度立方图全向阴影」交互演示（「高级光照篇·点阴影」PointShadowsDemo，HEL-83）：
 *  - Client（dynamic 边界）：PointShadowsDemo —— WebGL2 能力检测 + next/dynamic(ssr:false)
 *    懒加载 PointShadowsCanvas（独立 chunk，硬规则 2/6）。<Canvas shadows> + 一盏 PointLight castShadow（位置可动），
 *    一个朝内的大盒子当房间（boxGeometry side=BackSide + receiveShadow）+ 房间内两立方体一球 castShadow/receiveShadow，
 *    零外部资源（硬规则 3）。three.js 的 PointLight 内建阴影本质就是本章的深度立方体贴图（朝 6 个方向各渲一张距离图把光源
 *    360° 全包住），把要教的参数全做成实时控件让读者亲手拖出概念：①光源方位 + 高度（头牌：在房间内移动点光源·四壁阴影全向同时变·
 *    点阴影 vs 方向光单向阴影最直观差异）②阴影图分辨率 256/512/1024/2048 分段（点光是 6 面 cubemap·每面这个尺寸·改后 dispose 旧
 *    shadow.map 重建·看锯齿随分辨率变）③depth bias 滑块（拖最大→peter panning 阴影脱离/中间干净·诚实化不声称拖得出 acne）
 *    ④物体自转开关（reduced-motion 默认关）+ 重置。点光阴影相机是透视（shadow-camera near/far 罩住整间房）。
 *    frameloop 可见性门控 always/never（离屏停转、避开 demand 首屏黑屏），OrbitControls 拖拽转视角/滚轮缩放，
 *    改参 invalidate 踢一帧。
 *  - 高级光照篇·法线贴图（HEL-84，C 实战型）：TBNDiagram（一块带透视的表面上某点立起三个互相垂直的轴：
 *    切线 T 沿纹理 U·副切线 B 沿纹理 V·法线 N 垂直表面朝外 = 切线空间「以表面自己为参照」的局部坐标系，
 *    标「三个轴当矩阵三列 → TBN 矩阵 [T|B|N]」，点明法线图里的法线是相对表面自身存的、靠 TBN 在切线↔世界空间换算）、
 *    NormalDecodeDiagram（三栏：左 法线图里存的偏蓝色块 RGB(0.5,0.5,1.0) → 中 解码公式 normal=texColor*2.0-1.0 把 0~1 拉回 -1~1 →
 *    右 解出 (0,0,1) 正对外不扰动的箭头 + 偏色→法线推歪=凹凸一例，底部警示「忘了 *2-1 直接当法线 → z 恒正 → 光照全错整片发蓝」）。同款 Server SVG。
 *  - 高级光照篇·视差贴图（HEL-85，C 实战型，承接法线贴图）：ParallaxPrincipleDiagram（本章最核心直觉图·侧视图：
 *    眼睛斜射一条视线到几何平面、本该采样几何交点 A（红），但真实表面轮廓在 B 处先凸起挡住视线、眼睛真正该看到的是 B（绿），
 *    视差偏移就是沿视方向把采样 UV 从 A 挪到 B·标偏移量 offset，点明「视线越斜 A↔B 差越大·正看 A≈B 视差几乎无效」）、
 *    SteepParallaxStepDiagram（§5 Stepper 陡峭视差分层步进四步配图：①把深度切几层·视线沿视方向往深处走每层横移一点 UV→
 *    ②逐层采样高度图比较「层深度<表面深度？」成立=仍在表面上方继续下探→③某层层深度首次≥表面深度=钻到表面下=命中·该层 UV 即采样点→
 *    ④POM 在命中层与上一层之间线性插值·逼近真实交点更平滑）。同款 Server SVG。
 *  - 高级光照篇·HDR（HEL-86，C 实战型，承接 gamma-correction + framebuffers）：DynamicRangeDiagram（一条 0→6 的强度轴上下排对照：
 *    上排 普通 LDR 帧缓冲 RGBA8 每通道只存 0~1·强度 >1 的整段全压成纯白·高光层次在写入时就丢失·死白一片 vs
 *    下排 HDR 浮点帧缓冲 RGBA16F 把 >1 完整存下·高光仍有层次留给色调映射，强度=1 处竖直分界虚线标「普通帧缓冲上限」，
 *    直观展示「截断 vs 保留」）、ToneMapCurveDiagram（同坐标系画三条色调映射曲线把 [0,∞) 压回 [0,1]：clamp=min(x,1)
 *    到 1 水平封顶·>1 死白无层次 / Reinhard=x/(x+1) 平滑趋近 1 保高光层次 / exposure=1−exp(−x·k) 模拟相机曝光·形状由曝光值调，
 *    横轴 HDR 输入 0~5 远超 1、纵轴输出 0~1，x=1 对照虚线 + 图例）。同款 Server SVG。
 *  - 高级光照篇·泛光 Bloom（HEL-87，C 实战型，承接 HDR + framebuffers）：BloomPipelineDiagram（§5 Stepper 泛光多遍流程四步配图：
 *    ①几何 pass + MRT 一次输出 场景色 + 仅亮区色（亮度 >阈值才留·暗区全黑不发光晕）→②横向高斯把亮区图沿水平糊一遍（孤立亮点拉成模糊横条）→
 *    ③纵向高斯再沿垂直糊·横纵交替反复=乒乓 N 次越糊越柔→④叠加合成 scene+bloom 加回原图·再 tonemap+gamma 上屏·亮点透出柔和辉光，每步带缩略图示意数据形态）、
 *    SeparableGaussianDiagram（左 2D N×N 核 一像素采整片 N²=25 个邻居 vs 右 先横 1×N 再纵 N×1 两遍各 N 次合计 2N=10·中间「=」标结果等价，
 *    点明采样次数 N²→2N·N 越大省越狠 N=9 时 81 vs 18，讲清为何做两遍可分离而非一遍 2D 大核）。同款 Server SVG。
 *  - 高级光照篇·延迟着色 Deferred Shading（HEL-88，A 概念 + C 实战型，承接 framebuffers MRT + HDR/Bloom 浮点 FBO 多遍）：
 *    GBufferDiagram（G-buffer 几何缓冲三图并排：①位置图 gPosition xyz→rgb 彩色编码·②法线图 gNormal n*0.5+0.5 偏蓝紫·
 *    ③反照率图 gAlbedoSpec 物体本色 + 镜面强度塞 a 通道，顶部标「几何 pass 一次 MRT 输出这几张·都不含光照」，
 *    底部点明「光照 pass 再采这几张算一次光」）、ForwardVsDeferredDiagram（上下两条管线对比：上排前向 几何 →
 *    每个物体片元含被遮挡的 × 每盏灯立刻算光照·overdraw 浪费·光照次数 ~ 物体片元数×灯·标红 vs 下排延迟 几何 pass 填
 *    G-buffer 不点灯 → 光照 pass 全屏四边形只对每个可见像素 × 灯算一次·光照次数 ~ 屏幕像素数×灯·与场景复杂度/overdraw 解耦·
 *    标绿，点明延迟把光照从「每个物体片元都算」变成「只对可见像素算一次」→ 轻松上几百盏灯）。同款 Server SVG。
 * PBR 篇·BRDF 曲线交互（HEL-167，B 数学型主 Demo）：
 *  - Client（dynamic 边界）：BrdfCurveExplorer —— next/dynamic(ssr:false) 懒加载
 *    BrdfCurveCanvas（独立 chunk，硬规则 2）。Canvas2D 绘制 D(NDF GGX)、G(Smith-Schlick-GGX)、
 *    F(Fresnel-Schlick) 三条曲线随 theta 0..90deg 变化。粗糙度 Slider 0.05~1.0 + metallic
 *    Toggle 电介质/金属（F0=0.04 vs 0.7）+ 重置。颜色全部 CSS 变量运行时读取（硬规则 5）。
 *    ResizeObserver 自适应宽度，无 three.js / 无 WebGL。
 *
 *  - 高级光照篇·SSAO 屏幕空间环境光遮蔽（HEL-89，C 实战型，篇收官，承接 deferred-shading G-buffer 位置/法线）：
 *    HemisphereKernelDiagram（侧视片元 P + 朝外法线 N，在 N 朝向的半球内撒若干随机采样点，落进周围几何的标红=被挡遮蔽+1、
 *    落在空气里的标绿=不计；点明「被挡越多→接收环境光越少→越暗」，并强调只用法线半球而非整球以免平坦面凭空变暗）、
 *    DepthCompareDiagram（采样点投影到屏幕、读 G-buffer 该处存的真实表面深度 D 比一比：采样点在表面后面/更远=被前面实体挡住=遮蔽+1·红、
 *    在表面前面/更近=没挡=不计·绿，点明 SSAO 不重算真几何只借 G-buffer 已存深度近似=「屏幕空间」由来）、
 *    NoiseBlurDiagram（三格并排去噪：①核不旋转→规则条带 banding·红 → ②小随机向量纹理逐像素旋转核→碎噪点 noise·黄 →
 *    ③小盒式模糊抹平→干净柔和 AO·绿，点明随机旋转是用可控噪点换刺眼条带、模糊再抹平噪点，两步配合缺一不可）。同款 Server SVG。
 */
export const mdxComponents: NonNullable<MDXRemoteProps["components"]> = {
  Objectives,
  CodeTabs,
  Tab,
  Exercises,
  Answer,
  Attribution,
  Callout,
  ShaderDemo,
  TextureDemo,
  CameraDemo,
  LightingDemo,
  LightingMapsDemo,
  MultiLightDemo,
  ModelDemo,
  FramebufferDemo,
  CubemapDemo,
  InstancingDemo,
  ShadowMappingDemo,
  PointShadowsDemo,
  BrdfCurveExplorer,
  PipelineViz,
  MathViz,
  CompareSlider,
  Figure,
  SetupPipelineDiagram,
  FrameStageDiagram,
  VertexPipelineDiagram,
  ShaderIODiagram,
  InterpolationDiagram,
  TextureCoordDiagram,
  MipmapPyramidDiagram,
  VectorOpsDiagram,
  HomogeneousTranslateDiagram,
  TransformOrderDiagram,
  CoordinatePipelineDiagram,
  FrustumDiagram,
  LookAtDiagram,
  EulerAnglesDiagram,
  CameraMovementDiagram,
  DiffuseNormalDiagram,
  SpecularReflectDiagram,
  DiffuseMapDiagram,
  SpecularMapDiagram,
  LightCastersDiagram,
  AttenuationCurveDiagram,
  MultipleLightsDiagram,
  AssimpSceneGraphDiagram,
  AssimpImportFlowDiagram,
  MeshDataLayoutDiagram,
  MeshTextureBindingDiagram,
  NodeRecursionDiagram,
  ModelCompositionDiagram,
  DepthBufferDiagram,
  DepthTestStepDiagram,
  DepthPrecisionDiagram,
  ZFightingDiagram,
  StencilBufferDiagram,
  StencilTestFlowDiagram,
  StencilOutlineStepDiagram,
  BlendEquationDiagram,
  DiscardVsBlendDiagram,
  AlphaSortDiagram,
  BlendSortStepDiagram,
  WindingOrderDiagram,
  WindingCullStepDiagram,
  FaceCullingDiagram,
  FramebufferAttachmentDiagram,
  TwoPassDiagram,
  KernelDiagram,
  Cubemap6FacesDiagram,
  SkyboxDiagram,
  ReflectionRefractionDiagram,
  BufferLayoutDiagram,
  BufferSubDataDiagram,
  GlFragCoordDiagram,
  InterfaceBlockDiagram,
  UboBindingDiagram,
  GeometryShaderPipelineDiagram,
  EmitVertexDiagram,
  ExplodeDiagram,
  InstancingDiagram,
  AttribDivisorDiagram,
  DrawcallCompareDiagram,
  AliasingDiagram,
  MsaaSampleDiagram,
  SsaaVsMsaaDiagram,
  PhongBlinnHighlightDiagram,
  HalfVectorDiagram,
  GammaCurveDiagram,
  GammaGradientBarDiagram,
  ShadowMapStepDiagram,
  ShadowAcneDiagram,
  PointShadowStepDiagram,
  TBNDiagram,
  NormalDecodeDiagram,
  ParallaxPrincipleDiagram,
  SteepParallaxStepDiagram,
  DynamicRangeDiagram,
  ToneMapCurveDiagram,
  BloomPipelineDiagram,
  SeparableGaussianDiagram,
  GBufferDiagram,
  ForwardVsDeferredDiagram,
  HemisphereKernelDiagram,
  DepthCompareDiagram,
  NoiseBlurDiagram,
  MicrofacetSurfaceDiagram,
  EnergyConservationDiagram,
  ReflectanceEquationDiagram,
  CookTorranceSplitDiagram,
  NdfRoughnessDiagram,
  GeometryOcclusionDiagram,
  FresnelEffectDiagram,
  MetallicWorkflowDiagram,
  PbrLightSetupDiagram,
  PbrRenderLoopDiagram,
  LinearHdrPipelineDiagram,
  IblConceptDiagram,
  EquirectToCubemapDiagram,
  HemisphereConvolutionDiagram,
  SplitSumDiagram,
  PrefilterMipDiagram,
  BrdfLutDiagram,
  CompilationPipelineDiagram,
  CHistoryTimelineDiagram,
  CCompilationDiagram,
  DevelopmentCycleDiagram,
  PortabilityDiagram,
  CProgramAnatomyDiagram,
  VariableMemoryDiagram,
  PrintfFormatDiagram,
  PrintfFormatFlagsDiagram,
  ScanfInputDiagram,
  IOMemoryBufferDiagram,
  CStringMemoryDiagram,
  MultiFileCompilationDiagram,
  ProfilerWorkflowDiagram,
  EditorTipsDiagram,
  ProfilerSamplingDiagram,
  BuildSizeDiagram,
  UnityProfilerWindowDiagram,
  CpuGpuBottleneckDiagram,
  ProfilingToolsDiagram,
  ProfilerExportDiagram,
  ProfileAnalyzerWorkflowDiagram,
  PercentileStatisticsDiagram,
  RegressionDetectionDiagram,
  CIProfilingDiagram,
  GetComponentCacheDiagram,
  EmptyCallbackDiagram,
  UpdateMechanismDiagram,
  FindSendMessageDiagram,
  DrawCallPipelineDiagram,
  DynamicBatchingDiagram,
  StaticBatchingDiagram,
  SrpBatcherDiagram,
  FrameDebuggerBatchDiagram,
  MeshImportDiagram,
  TextureImportDiagram,
  ResourcesAssetBundleDiagram,
  AsyncLoadDiagram,
  PhysicsTimestepDiagram,
  LayerCollisionDiagram,
  RigidbodySleepDiagram,
  CollisionDetectionDiagram,
  RenderingPipelineGpuDiagram,
  LodTransitionDiagram,
  OcclusionCullingDiagram,
  PostProcessStackDiagram,
  XrPerformanceBudgetDiagram,
  SinglePassStereoDiagram,
  FoveatedRenderingDiagram,
  UrpXrSettingsDiagram,
  MonoIl2cppRuntimeDiagram,
  GcAllocDiagram,
  ObjectPoolDiagram,
  ThreadingProblemDiagram,
  JobSystemDiagram,
  EcsArchitectureDiagram,
  BurstCompilerDiagram,
  BurstThreadDiagram,
  CPUUsageTimelineDiagram,
  CPUHierarchyDiagram,
  GCAllocColorDiagram,
  ScriptsVsEngineDiagram,
  GPUProfilerOverviewDiagram,
  FillRateBandwidthDiagram,
  FrameDebuggerWorkflowDiagram,
  MemorySnapshotWorkflowDiagram,
  ManagedVsNativeDiagram,
  DrawCallExplanationDiagram,
  AssetBreakdownDiagram,
  GameObjectToEcsDiagram,
  UrpVsBuiltinDiagram,
  SrpBatcherFlowDiagram,
  MotionToPhotonDiagram,
  XrInputFlowDiagram,
  Wasm2023Diagram,
  HelloWorldAnnotatedDiagram,
  IOStreamDiagram,
  AndroidArchLayersDiagram,
  AndroidStartupSequenceDiagram,
  AndroidProjectStructureDiagram,
  GradleBuildPipelineDiagram,
  ApkAnatomyDiagram,
  ActivityLifecycleDiagram,
  MvcDataFlowDiagram,
  MvvmDataFlowDiagram,
  ImplicitIntentResolutionDiagram,
  CameraIntentFlowDiagram,
  ResourceQualifierDiagram,
  AccessibilityTreeDiagram,
  ThreadModelDiagram,
  DrawPipelineDiagram,
  SearchFlowDiagram,
  WorkManagerDiagram,
  BroadcastDispatchDiagram,
  TouchEventSequenceDiagram,
  ComponentWorkflowDiagram,
  JniBridgeDiagram,
  LayerCallTraversalDiagram,
  AmsStartActivityDiagram,
  ZygoteForkDiagram,
  WindowManagerDiagram,
  WmsArchitectureDiagram,
  DalvikArtCompareDiagram,
  JvmRuntimeAreasDiagram,
  HookMechanismDiagram,
  PluginArchitectureDiagram,
  MemoryLeakDiagram,
  BootSequenceDiagram,
  BackStackDiagram,
  ClassLoaderDelegationDiagram,
  NavGraphDiagram,
  FragmentTransactionDiagram,
  RecyclerViewRecyclingDiagram,
  HotfixDexInjectionDiagram,
  MessageLoopDiagram,
  ConfigChangeViewModelDiagram,
  PropertyAnimationDiagram,
  LogcatLineAnatomyDiagram,
  XmlDrawableTypesDiagram,
  DebugLoopDiagram,
  SdkVersionAxisDiagram,
  LaunchModeDiagram,
  TestPyramidDiagram,
  ViewHierarchyDiagram,
  RoomArchitectureDiagram,
  ContextHierarchyDiagram,
  StyleThemeInheritanceDiagram,
  DialogFragmentDiagram,
  WebViewAnatomyDiagram,
  AppBarMenuDiagram,
  TypeSizeDiagram,
  SignedUnsignedDiagram,
  LiteralTypesDiagram,
  ScopeNestingDiagram,
  VariableLifecycleDiagram,
  StringMemoryDiagram,
  VectorGrowthDiagram,
  IteratorDiagram,
  ArrayVsVectorDiagram,
  ExpressionTreeDiagram,
  PrecedenceTable,
  IncrementDecrementDiagram,
  TypeConversionDiagram,
  IfElseFlowDiagram,
  SwitchFlowDiagram,
  LoopComparisonDiagram,
  BreakContinueDiagram,
  ClassLayoutDiagram,
  ConstMemberDiagram,
  ConstructorCallDiagram,
  FunctionCallStackDiagram,
  ParameterPassingDiagram,
  FunctionPrototypeDiagram,
  RecursionStackDiagram,
  ArrayMemoryLayoutDiagram,
  PointerArithmeticDiagram,
  ArrayPointerEquivalenceDiagram,
  TwoDimArrayDiagram,
  CStringNullTerminatorDiagram,
  StrcpyBufferDiagram,
  StringFunctionTableDiagram,
  StringPointerVsArrayDiagram,
  StorageClassDiagram,
  MemoryRegionsDiagram,
  MallocFreeDiagram,
  LinkageDiagram,
  FilePointerDiagram,
  FileOpenModesDiagram,
  FileReadWriteFlowDiagram,
  BinaryVsTextIODiagram,
  StructMemoryLayoutDiagram,
  StructPointerAccessDiagram,
  UnionMemoryDiagram,
  EnumDiagram,
  PreprocessorPipelineDiagram,
  MacroExpansionDiagram,
  ConditionalCompileDiagram,
  MacroPitfallDiagram,
  BinaryHexDiagram,
  BitwiseOperatorsDiagram,
  ShiftOperatorsDiagram,
  BitFieldDiagram,
  FunctionPointerDiagram,
  LinkedListDiagram,
  QueueStackDiagram,
  QsortBsearchDiagram,
  ArrayParameterDiagram,
  OverloadResolutionDiagram,
  OperatorOverloadTable,
  OperatorChainDiagram,
  TypeConversionOperatorDiagram,
  CallableConceptDiagram,
  InheritanceHierarchyDiagram,
  VTableDiagram,
  InheritanceLifetimeDiagram,
  AccessInheritanceTable,
  TemplateInstantiationDiagram,
  ClassTemplateDiagram,
  TemplateSpecializationDiagram,
  VariadicTemplateDiagram,
  TupleLayoutDiagram,
  BitsetOperationDiagram,
  RegexMatchDiagram,
  RandomPipelineDiagram,
  ExceptionHierarchyDiagram,
  NamespaceNestingDiagram,
  MultipleInheritanceDiagram,
  ExceptionSafetyTable,
  MemoryLayoutDiagram,
  RTTIDiagram,
  EnumUnionDiagram,
  AdvancedFeatureTable,
  AccessControlDiagram,
  IOClassHierarchyDiagram,
  FileStreamLifecycleDiagram,
  StreamStateDiagram,
  IOManipulatorTable,
  ContainerOverviewDiagram,
  VectorMemoryModelDiagram,
  ContainerOperationTable,
  AdapterConceptDiagram,
  AlgorithmArchitectureDiagram,
  AlgorithmExecutionDiagram,
  SortStagesDiagram,
  LambdaSyntaxDiagram,
  AssociativeContainerOverviewDiagram,
  MapOperationTable,
  UnorderedMapInternalsDiagram,
  ContainerSelectionFlow,
  SmartPointerOverviewDiagram,
  SharedPtrInternalsDiagram,
  CircularReferenceDiagram,
  DynamicArrayDiagram,
  CopySemanticsDiagram,
  RuleOfFiveDiagram,
  MoveSemanticsDiagram,
  ResourceLifetimeDiagram,
  CTypeSizeDiagram,
  IntegerRangeDiagram,
  EscapeSequenceDiagram,
  DataTypeMemoryLayout,
  COperatorTable,
  IncrementTimelineDiagram,
  TypePromotionDiagram,
  WhileLoopFlowDiagram,
  ForLoopFlowDiagram,
  DoWhileVsWhileDiagram,
  NestedLoopDiagram,
  SentinelLoopDiagram,
  IfElseChainDiagram,
  SwitchCaseDiagram,
  ShortCircuitDiagram,
  BufferedIODiagram,
  InputValidationFlowDiagram,
  StdinBufferDiagram,
  MenuDriverDiagram,
  Stepper,
  Step,
  Slider,
  Toggle,
  DemoStage,
  RgbMixerDemo,
  PowerFrameRateDiagram,
  VsyncFrameBudgetDiagram,
  RenderScaleDiagram,
  TargetFrameRateDiagram,
  ThermalThrottlingDiagram,
  MobileQualityDiagram,
  PowerDemo,
  PlatformProfilingOverviewDiagram,
  RemoteProfilerDiagram,
  ToolComparisonDiagram,
  PlatformProfilingDemo,
  UrpArchitectureDiagram,
  UrpAssetConfigDiagram,
  TileBasedGpuDiagram,
  XrFrameBudgetDiagram,
  XrInputOverheadDiagram,
  WebAssemblyFeatureDiagram,
  AgentAnatomyDiagram,
  AgentVsWorkflowDiagram,
  AgentLoopDiagram,
  AutonomySpectrumDiagram,
  AugmentedLlmDiagram,
  RetrievalFlowDiagram,
  MemoryTypesDiagram,
  AugmentedCallDiagram,
  Term,
  Glossary,
  GlossaryItem,
};
