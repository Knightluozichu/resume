/**
 * 复习题库的类型与常量（与具体题目数据解耦）。
 *
 * Phase B 把题库扩到 ~500 题：题目按章拆进 src/data/review/<chapter>.ts，
 * 由 7 个并行 subagent 各写各的章节文件，互不冲突；类型与常量集中在此处单一来源，
 * 各章文件与聚合器（src/data/review-questions.ts）都从这里引入。
 *
 * 答案文案约定（与卡片富文本渲染对齐，见 components/review/rich-text.tsx）：
 *  - 行内代码用反引号 `code`，会渲染成与正文同款的等宽 code 片段；
 *  - 行内数学用 `$...$`（KaTeX），如 `$\cos\theta$`、`$(x+t_x)$`；
 *  - 其余为纯文本，`\n` 保留为换行。
 */

/** 章节 slug：与 content/learnopengl/getting-started/<slug>.mdx 一一对应。 */
export type ReviewChapterSlug =
  | "ga2-introduction-to-algorithms"
  | "ga2-selection-sort"
  | "ga2-recursion"
  | "ga2-quicksort"
  | "ga2-hash-tables"
  | "ga2-breadth-first-search"
  | "ga2-trees"
  | "ga2-balanced-trees"
  | "ga2-dijkstras-algorithm"
  | "ga2-greedy-algorithms"
  | "ga2-dynamic-programming"
  | "ga2-k-nearest-neighbors"
  | "ga2-where-to-go-next"
  | "adp-official-learning-map"
  | "adp-preface"
  | "adp-01-android-app-basic-structure"
  | "adp-02-mvvm-application-structure"
  | "adp-03-mvp-application-structure"
  | "adp-04-incremental-development-design"
  | "adp-05-designer-role-in-oss"
  | "adp-06-flux-architecture"
  | "adp-07-team-and-architecture"
  | "adp-08-android-architecture-components"
  | "adp-afterword"
  | "adp-index"
  | "adp-author-profiles"
  | "adp-official-final-review"
  | "gea3-official-learning-map"
  | "gea3-preface"
  | "gea3-chapter-01-introduction"
  | "gea3-chapter-02-tools-of-the-trade"
  | "gea3-chapter-03-software-engineering"
  | "gea3-chapter-04-parallelism-concurrency"
  | "gea3-chapter-05-3d-math"
  | "gea3-chapter-06-engine-support"
  | "gea3-chapter-07-resources-file-system"
  | "gea3-chapter-08-game-loop"
  | "gea3-chapter-09-human-interface"
  | "gea3-chapter-10-debugging-development"
  | "gea3-chapter-11-rendering-engine"
  | "gea3-chapter-12-animation-systems"
  | "gea3-chapter-13-collision-rigid-body"
  | "gea3-chapter-14-audio"
  | "gea3-chapter-15-gameplay-introduction"
  | "gea3-chapter-16-runtime-gameplay"
  | "gea3-chapter-17-more"
  | "gea3-bibliography"
  | "gea3-index"
  | "gea3-official-final-review"
  | "gm3d-official-learning-map"
  | "gm3d-cartesian-coordinate-systems"
  | "gm3d-vectors"
  | "gm3d-multiple-coordinate-spaces"
  | "gm3d-introduction-to-matrices"
  | "gm3d-matrices-linear-transformations"
  | "gm3d-more-on-matrices"
  | "gm3d-polar-coordinate-systems"
  | "gm3d-rotation-three-dimensions"
  | "gm3d-geometric-primitives"
  | "gm3d-mathematical-topics-graphics"
  | "gm3d-linear-kinematics-calculus"
  | "gm3d-linear-rotational-dynamics"
  | "gm3d-curves-in-3d"
  | "gm3d-afterword"
  | "gm3d-geometric-tests"
  | "gm3d-official-final-review"
  | "hello-window"
  | "hello-triangle"
  | "shaders"
  | "textures"
  | "transformations"
  | "coordinate-systems"
  | "camera"
  | "colors"
  | "basic-lighting"
  | "materials"
  | "lighting-maps"
  | "light-casters"
  | "multiple-lights"
  | "assimp"
  | "mesh"
  | "model"
  | "depth-testing"
  | "stencil-testing"
  | "blending"
  | "face-culling"
  | "framebuffers"
  | "cubemaps"
  | "advanced-data"
  | "advanced-glsl"
  | "geometry-shader"
  | "instancing"
  | "anti-aliasing"
  | "blinn-phong"
  | "gamma-correction"
  | "shadow-mapping"
  | "point-shadows"
  | "normal-mapping"
  | "parallax-mapping"
  | "hdr"
  | "bloom"
  | "deferred-shading"
  | "ssao"
  | "cpr-data-and-c"
  | "cpp-getting-started"
  | "cpp-variables-and-types"
  | "cpp-strings-vectors-arrays"
  | "cpp-expressions"
  | "cpp-statements"
  | "cpp-functions"
  | "cpp-classes"
  | "cpp-io-library"
  | "cpp-sequential-containers"
  | "cpp-generic-algorithms"
  | "cpp-associative-containers"
  | "cpp-dynamic-memory"
  | "cpp-copy-control"
  | "cpp-overloaded-operations"
  | "cpp-templates"
  | "cpp-oop"
  | "cpp-specialized-library"
  | "cpp-specialized-tools"
  | "cpp-large-programs"
  // C Primer Plus（第6版）
  | "cpr-getting-ready"
  | "cpr-introducing-c"
  | "cpr-strings-io"
  | "cpr-operators-expressions"
  | "cpr-control-loops"
  | "cpr-control-branching"
  | "cpr-char-io-validation"
  | "cpr-functions"
  | "cpr-arrays-pointers"
  | "cpr-strings-functions"
  | "cpr-storage-linkage-memory"
  | "cpr-file-io"
  | "cpr-structures"
  | "cpr-preprocessor"
  | "cpr-bit-fiddling"
  | "cpr-advanced-data"
  // Android进阶解密
  | "aad8-official-learning-map"
  | "aad8-01-android-system-architecture"
  | "aad8-02-android-system-startup"
  | "aad8-03-app-process-startup"
  | "aad8-04-four-components-workflow"
  | "aad8-05-context"
  | "aad8-06-activity-manager-service"
  | "aad8-07-window-manager"
  | "aad8-08-window-manager-service"
  | "aad8-09-jni"
  | "aad8-10-java-virtual-machine"
  | "aad8-11-dalvik-art"
  | "aad8-12-class-loader"
  | "aad8-13-hotfix"
  | "aad8-14-hook"
  | "aad8-15-pluginization"
  | "aad8-16-rendering-optimization"
  | "aad8-17-memory-optimization"
  | "aad8-official-final-review"
  // 剑指 Offer
  | "coi-find-in-matrix"
  | "coi-replace-spaces"
  | "coi-print-list-reverse"
  | "coi-rebuild-binary-tree"
  | "coi-print-tree-from-top-to-bottom"
  | "coi-queue-with-two-stacks"
  | "coi-stack-push-pop-order"
  | "coi-power"
  | "coi-print-numbers"
  | "coi-delete-node"
  | "coi-regular-expressions-matching"
  | "coi-numeric-strings"
  | "coi-reorder-array"
  | "coi-kth-node-from-end"
  | "coi-entry-node-of-loop"
  | "coi-reverse-list"
  | "coi-merge-sorted-lists"
  | "coi-subtree-structure"
  | "coi-mirror-binary-tree"
  | "coi-symmetric-binary-tree"
  | "coi-print-trees-in-lines"
  | "coi-spiral-matrix"
  | "coi-min-stack"
  | "coi-print-trees-in-zigzag"
  | "coi-squence-of-bst"
  | "coi-path-in-tree"
  | "coi-copy-complex-list"
  | "coi-convert-binary-search-tree"
  | "coi-serialize-binary-trees"
  | "coi-string-permutation"
  | "coi-more-than-half-number"
  | "coi-k-least-numbers"
  | "coi-stream-median"
  | "coi-greatest-sum-of-subarrays"
  | "coi-number-of-1"
  | "coi-digits-in-sequence"
  | "coi-sort-array-for-min-number"
  | "coi-translate-numbers-to-strings"
  | "coi-max-value-of-gifts"
  | "coi-longest-substring-without-dup"
  | "coi-ugly-number"
  | "coi-first-not-repeating-char"
  | "coi-first-character-in-stream"
  | "coi-inverse-pairs"
  | "coi-first-common-nodes-in-lists"
  | "coi-number-of-k"
  | "coi-missing-number"
  | "coi-integer-identical-to-index"
  | "coi-kth-node-in-bst"
  | "coi-tree-depth"
  | "coi-balanced-binary-tree"
  | "coi-numbers-appear-once"
  | "coi-number-appearing-once"
  | "coi-two-numbers-with-sum"
  | "coi-continuous-sequence-with-sum"
  | "coi-max-in-sliding-window"
  | "coi-queue-with-max"
  | "coi-dices-probability"
  | "coi-continous-cards"
  | "coi-last-number-in-circle"
  | "coi-maximal-profit"
  | "coi-accumulate"
  | "coi-add-two-numbers"
  | "coi-constuct-array"
  | "coi-string-to-int"
  | "coi-common-parent-in-tree"
  // BNRG
  | "bnrg-first-app"
  | "bnrg-mvc"
  | "bnrg-lifecycle"
  | "bnrg-ui-state"
  | "bnrg-debugging"
  | "bnrg-second-activity"
  | "bnrg-sdk-compat"
  | "bnrg-fragments"
  | "bnrg-recyclerview"
  | "bnrg-layouts"
  | "bnrg-room"
  | "bnrg-fragment-nav"
  | "bnrg-dialogs"
  | "bnrg-app-bar"
  | "bnrg-implicit-intents"
  | "bnrg-taking-pictures"
  | "bnrg-localization"
  | "bnrg-accessibility"
  | "bnrg-data-binding"
  | "bnrg-audio-testing"
  | "bnrg-styles"
  | "bnrg-xml-drawables"
  | "bnrg-more-intents"
  | "bnrg-http-background"
  | "bnrg-looper-handler"
  | "bnrg-search"
  | "bnrg-workmanager"
  | "bnrg-broadcast"
  | "bnrg-webview"
  | "bnrg-custom-views"
  | "bnrg-property-animation"
  | "bnrg-afterword"
  // Unity Game Optimization
  | "ugo-official-learning-map"
  | "ugo-evaluating-performance-problems"
  | "ugo-scripting-strategies"
  | "ugo-benefits-of-batching"
  | "ugo-optimizing-art-assets"
  | "ugo-faster-physics"
  | "ugo-dynamic-graphics"
  | "ugo-xr-optimizations"
  | "ugo-memory-management"
  | "ugo-data-oriented-technology-stack"
  | "ugo-tactical-tips-and-tricks"
  | "ugo-official-final-review"
  // Profiling Unity Games
  | "prof-official-learning-map"
  | "prof-01-profiling-101"
  | "prof-02-profiling-workflow"
  | "prof-03-cpu-render-worker-bounds"
  | "prof-04-gpu-mobile-power"
  | "prof-05-memory-budget-profiling"
  | "prof-06-unity-profiler"
  | "prof-07-profile-analyzer"
  | "prof-08-memory-profiler"
  | "prof-09-frame-rendering-debuggers"
  | "prof-10-project-auditor-deep-profiling"
  | "prof-11-tool-selection-automation"
  | "prof-12-native-tool-index"
  | "prof-13-gpu-tools-resources"
  | "prof-official-final-review"
  // Mobile/XR/Web Optimization, Unity 6 edition
  | "mxrw-official-learning-map"
  | "mxrw-01-introduction"
  | "mxrw-02-choose-urp"
  | "mxrw-03-profiling-tips"
  | "mxrw-04-memory-management"
  | "mxrw-05-adaptive-performance"
  | "mxrw-06-assets"
  | "mxrw-07-programming-architecture"
  | "mxrw-08-project-configuration"
  | "mxrw-09-graphics-gpu"
  | "mxrw-10-shaders"
  | "mxrw-11-user-interface"
  | "mxrw-12-audio"
  | "mxrw-13-animation"
  | "mxrw-14-physics"
  | "mxrw-15-workflow-collaboration"
  | "mxrw-16-unity-web"
  | "mxrw-17-xr"
  | "mxrw-official-final-review"
  // PBR
  | "pbr-theory"
  | "pbr-lighting"
  | "pbr-ibl-diffuse"
  | "pbr-ibl-specular"
  // C++ 并发编程实战（第2版）
  | "cc-hello-concurrency"
  | "cc-managing-threads"
  | "cc-protecting-shared-data"
  | "cc-synchronizing-operations"
  | "cc-atomic-types"
  | "cc-memory-ordering"
  | "cc-lock-based"
  | "cc-lock-free"
  | "cc-designing-concurrent-code"
  | "cc-thread-pools"
  | "cc-parallel-algorithms"
  | "cc-testing-debugging"
  // Unity 5 权威讲解，李在贤，2016
  | "u5-official-learning-map"
  | "u5-01-unity5-introduction"
  | "u5-02-project-preparation"
  | "u5-03-game-scene"
  | "u5-04-player-character"
  | "u5-05-projectile-effects"
  | "u5-06-enemy-character"
  | "u5-07-unity-ui"
  | "u5-08-game-manager"
  | "u5-09-raycasting"
  | "u5-10-navigation-advanced"
  | "u5-11-lightmaps-light-probes"
  | "u5-12-scene-split-merge"
  | "u5-13-built-in-networking"
  | "u5-14-photon-cloud"
  | "u5-15-game-realism"
  | "u5-appendix-database"
  | "u5-official-final-review"
  // AI Agent 开发实战
  | "ai-what-is-agent"
  | "ai-llm-brain"
  | "ai-prompting-roles"
  | "ai-react-loop"
  | "ai-tool-calling"
  | "ai-memory"
  | "ai-planning"
  | "ai-rag"
  | "ai-context-engineering"
  | "ai-multi-agent-patterns"
  | "ai-orchestration"
  | "ai-evaluation-observability"
  | "ai-safety-guardrails"
  | "ai-production-deployment"
  // 从零构建 AI Agent
  | "agt-chatbot-to-agent"
  | "agt-llm-as-brain"
  | "agt-agent-anatomy"
  | "agt-prompt-engineering"
  | "agt-sampling-decoding"
  | "agt-structured-output"
  | "agt-function-calling"
  | "agt-react-loop"
  | "agt-tool-design"
  // AI 智能体应用开发
  | "agent-what-is-an-agent"
  | "agent-augmented-llm"
  | "agent-agentic-loop"
  | "agent-first-agent"
  | "agent-prompt-engineering"
  | "agent-context-window"
  | "agent-structured-output"
  | "agent-function-calling"
  | "agent-tool-design"
  | "agent-mcp"
  | "agent-workflow-vs-agent"
  | "agent-chaining-and-routing"
  | "agent-parallelization-and-orchestrator-workers"
  | "agent-evaluator-optimizer"
  | "agent-autonomous-agents"
  | "agent-combining-patterns"
  | "agent-agents-in-practice"
  | "agent-tool-prompt-engineering"
  | "agent-production-readiness-checklist"
  // 汽车为什么会跑：图解汽车构造与原理
  | "auto-learning-map"
  | "auto-whole-car-system"
  | "auto-body-structure"
  | "auto-engine-principles"
  | "auto-transmission-principles"
  | "auto-drivetrain-system"
  | "auto-suspension-system"
  | "auto-steering-system"
  | "auto-brake-system"
  | "auto-electronics-system"
  | "auto-tire-wheel-system"
  | "auto-electric-drive-system"
  | "auto-design-manufacturing"
  | "auto-final-review"
  // 设计模式
  | "dp-learning-map"
  | "dp-intro"
  | "dp-strategy"
  | "dp-observer"
  | "dp-decorator"
  | "dp-command"
  | "dp-state"
  | "dp-singleton"
  | "dp-factory-method"
  | "dp-abstract-factory"
  | "dp-builder"
  | "dp-prototype"
  | "dp-adapter"
  | "dp-bridge"
  | "dp-composite"
  | "dp-facade"
  | "dp-flyweight"
  | "dp-proxy"
  | "dp-chain-of-responsibility"
  | "dp-iterator"
  | "dp-mediator"
  | "dp-memento"
  | "dp-template-method"
  | "dp-visitor"
  | "dp-interpreter"
  | "dp-compound-patterns"
  | "dp-final-review"
  | "gpp-official-learning-map"
  | "gpp-acknowledgements"
  | "gpp-introduction"
  | "gpp-chapter-01-architecture-performance-games"
  | "gpp-design-patterns-revisited"
  | "gpp-chapter-02-command"
  | "gpp-chapter-03-flyweight"
  | "gpp-chapter-04-observer"
  | "gpp-chapter-05-prototype"
  | "gpp-chapter-06-singleton"
  | "gpp-chapter-07-state"
  | "gpp-sequencing-patterns"
  | "gpp-chapter-08-double-buffer"
  | "gpp-chapter-09-game-loop"
  | "gpp-chapter-10-update-method"
  | "gpp-behavioral-patterns"
  | "gpp-chapter-11-bytecode"
  | "gpp-chapter-12-subclass-sandbox"
  | "gpp-chapter-13-type-object"
  | "gpp-decoupling-patterns"
  | "gpp-chapter-14-component"
  | "gpp-chapter-15-event-queue"
  | "gpp-chapter-16-service-locator"
  | "gpp-optimization-patterns"
  | "gpp-chapter-17-data-locality"
  | "gpp-chapter-18-dirty-flag"
  | "gpp-chapter-19-object-pool"
  | "gpp-chapter-20-spatial-partition"
  | "gpp-official-final-review"
  | "cqr-learning-map"
  | "cqr-intro"
  | "cqr-naming"
  | "cqr-functions"
  | "cqr-comments-format"
  | "cqr-error-handling"
  | "cqr-testing"
  | "cqr-classes"
  | "cqr-code-smells"
  | "cqr-refactoring-techniques"
  | "cqr-final-review"
  // 架构与领域设计
  | "add-learning-map"
  | "add-what-is-architecture"
  | "add-solid-principles"
  | "add-dependency-inversion"
  | "add-layered-architecture"
  | "add-clean-architecture"
  | "add-ddd-fundamentals"
  | "add-bounded-context"
  | "add-tactical-patterns"
  | "add-strategic-patterns"
  | "add-cqrs-event-sourcing"
  | "add-hexagonal-architecture"
  | "add-final-review"
  // 高级算法与算法工程
  | "aae-learning-map"
  | "aae-complexity-analysis"
  | "aae-advanced-data-structures"
  | "aae-graph-algorithms"
  | "aae-string-algorithms"
  | "aae-approximation-algorithms"
  | "aae-randomized-algorithms"
  | "aae-parallel-algorithms"
  | "aae-distributed-algorithms"
  | "aae-indexing-search"
  | "aae-algorithm-engineering"
  | "aae-final-review"
  // 汽车系统专项
  | "ass-learning-map"
  | "ass-engine-thermodynamics"
  | "ass-engine-performance"
  | "ass-transmission-types"
  | "ass-drivetrain-components"
  | "ass-suspension-systems"
  | "ass-steering-brake-systems"
  | "ass-ecu-can-bus"
  | "ass-sensors-actuators"
  | "ass-body-electronics"
  | "ass-ev-motor-controller"
  | "ass-battery-management"
  | "ass-final-review"
  // 车载软件与智能化
  | "vsi-learning-map"
  | "vsi-smart-cockpit"
  | "vsi-ivi-platform"
  | "vsi-middleware"
  | "vsi-ota-updates"
  | "vsi-perception-sensors"
  | "vsi-sensor-fusion"
  | "vsi-perception-algorithms"
  | "vsi-path-planning"
  | "vsi-vehicle-control"
  | "vsi-functional-safety"
  | "vsi-cybersecurity"
  | "vsi-final-review"
  // C 程序设计语言（K&R）
  | "krc-learning-map"
  | "krc-types-operators"
  | "krc-control-flow"
  | "krc-functions-program"
  | "krc-pointers-arrays"
  | "krc-pointer-arithmetic"
  | "krc-structures"
  | "krc-input-output"
  | "krc-unix-interface"
  | "krc-final-review"
  // C++ 游戏编程入门
  | "bcg-learning-map"
  | "bcg-types-variables"
  | "bcg-flow-control"
  | "bcg-functions"
  | "bcg-classes-oop"
  | "bcg-game-loop"
  | "bcg-graphics-sfml"
  | "bcg-collision-detection"
  | "bcg-game-project"
  | "bcg-final-review"
  // Effective C++
  | "efc-learning-map"
  | "efc-resource-management"
  | "efc-constructors-destructors"
  | "efc-class-design"
  | "efc-inheritance-polymorphism"
  | "efc-templates-generics"
  | "efc-template-metaprogramming"
  | "efc-new-exceptions"
  | "efc-coding-conventions"
  | "efc-final-review"
  // Effective Modern C++
  | "emc-learning-map"
  | "emc-type-deduction"
  | "emc-auto-decltype"
  | "emc-smart-pointers"
  | "emc-unique-shared-ptr"
  | "emc-move-semantics"
  | "emc-perfect-forwarding"
  | "emc-lambda-expressions"
  | "emc-concurrency-api"
  | "emc-final-review"
  // C++ 高性能编程
  | "chp-learning-map"
  | "chp-brief-introduction-to-cpp"
  | "chp-modern-cpp-concepts"
  | "chp-measuring-performance"
  | "chp-memory-management"
  | "chp-data-structures"
  | "chp-deeper-look-at-iterators"
  | "chp-stl-algorithms-and-beyond"
  | "chp-metaprogramming-compile-time"
  | "chp-proxy-objects-lazy-evaluation"
  | "chp-concurrency"
  | "chp-parallel-stl"
  | "chp-final-review"
  // 深度探索 C++ 对象模型
  | "ico-learning-map"
  | "ico-object-lessons"
  | "ico-semantics-of-constructors"
  | "ico-semantics-of-data"
  | "ico-semantics-of-function"
  | "ico-construction-destruction-copy"
  | "ico-runtime-semantics"
  | "ico-cusp-of-object-model"
  | "ico-final-review"
  // C++ 性能优化指南
  | "opc-learning-map"
  | "opc-overview-of-optimization"
  | "opc-computer-behavior"
  | "opc-measure-performance"
  | "opc-optimize-string-use"
  | "opc-optimize-algorithms"
  | "opc-dynamically-allocated-variables"
  | "opc-optimize-hot-statements"
  | "opc-use-better-libraries"
  | "opc-searching-and-sorting"
  | "opc-optimize-data-structures"
  | "opc-optimize-io"
  | "opc-optimize-concurrency"
  | "opc-optimize-memory-management"
  | "opc-final-review"
  // Modern C++ Design
  | "mcd-learning-map"
  | "mcd-policy-based-class-design"
  | "mcd-techniques"
  | "mcd-typelists"
  | "mcd-small-object-allocation"
  | "mcd-generalized-functors"
  | "mcd-implementing-singletons"
  | "mcd-smart-pointers"
  | "mcd-object-factories"
  | "mcd-abstract-factory"
  | "mcd-visitor"
  | "mcd-multimethods"
  | "mcd-final-review"
  // CPU 眼里的 C++
  | "cpc-learning-map"
  | "cpc-prerequisites"
  | "cpc-basic-syntax"
  | "cpc-function-principles"
  | "cpc-cpp-features"
  | "cpc-advanced-programming"
  | "cpc-interview-challenges"
  | "cpc-final-review"
  // Easy C++（第5版）
  | "ecp-learning-map"
  | "ecp-first-steps"
  | "ecp-cpp-basics"
  | "ecp-variables"
  | "ecp-expressions-and-operators"
  | "ecp-conditional-processing"
  | "ecp-repetition"
  | "ecp-functions"
  | "ecp-pointers"
  | "ecp-arrays"
  | "ecp-building-large-programs"
  | "ecp-various-types"
  | "ecp-class-basics"
  | "ecp-class-features"
  | "ecp-new-classes"
  | "ecp-advanced-class-topics"
  | "ecp-file-input-output"
  | "ecp-final-review"
  // C++ Primer Plus
  | "epp-learning-map"
  | "epp-getting-started-with-cpp"
  | "epp-setting-out-to-cpp"
  | "epp-dealing-with-data"
  | "epp-compound-types"
  | "epp-loops-and-relational-expressions"
  | "epp-branching-statements-and-logical-operators"
  | "epp-functions-programming-modules"
  | "epp-adventures-in-functions"
  | "epp-memory-models-and-namespaces"
  | "epp-objects-and-classes"
  | "epp-working-with-classes"
  | "epp-classes-and-dynamic-memory-allocation"
  | "epp-class-inheritance"
  | "epp-reusing-code-in-cpp"
  | "epp-friends-exceptions-and-more"
  | "epp-string-class-and-stl"
  | "epp-input-output-and-files"
  | "epp-visiting-new-cpp-standard"
  | "epp-final-review"
  // 现代 C++ 测试驱动开发
  | "ctr-learning-map"
  | "ctr-global-setup"
  | "ctr-tdd-first-example"
  | "ctr-tdd-foundations"
  | "ctr-test-construction"
  | "ctr-test-doubles"
  | "ctr-incremental-design"
  | "ctr-quality-tests"
  | "ctr-legacy-challenges"
  | "ctr-tdd-and-threading"
  | "ctr-additional-tdd-concepts"
  | "ctr-growing-and-sustaining-tdd"
  | "ctr-final-review"
  // C++ 服务器开发精髓
  | "cse-cpp-must-know"
  | "cse-backend-tools-debugging"
  | "cse-multithreading-resource-sync"
  | "cse-network-programming-hard-points"
  | "cse-network-troubleshooting-commands"
  | "cse-network-protocol-design"
  | "cse-single-service-structure"
  | "cse-redis-network-module-source-analysis"
  | "cse-common-server-module-design"
  | "cse-learning-map"
  | "cse-final-review"
  // Head First 设计模式
  | "hfd-learning-map"
  | "hfd-strategy"
  | "hfd-observer"
  | "hfd-decorator"
  | "hfd-factory"
  | "hfd-singleton"
  | "hfd-command"
  | "hfd-adapter-facade"
  | "hfd-template-method"
  | "hfd-iterator-composite"
  | "hfd-state"
  | "hfd-proxy"
  | "hfd-compound-patterns"
  | "hfd-real-world"
  | "hfd-leftover-patterns"
  | "hfd-final-review"
  // C# 7.0 本质论
  | "ec7e6-introducing-csharp"
  | "ec7e6-data-types"
  | "ec7e6-more-with-data-types"
  | "ec7e6-operators-and-control-flow"
  | "ec7e6-methods-and-parameters"
  | "ec7e6-classes"
  | "ec7e6-inheritance"
  | "ec7e6-interfaces"
  | "ec7e6-value-types"
  | "ec7e6-well-formed-types"
  | "ec7e6-exception-handling"
  | "ec7e6-generics"
  | "ec7e6-delegates-and-lambda-expressions"
  | "ec7e6-events"
  | "ec7e6-collection-interfaces-with-standard-query-operators"
  | "ec7e6-linq-with-query-expressions"
  | "ec7e6-building-custom-collections"
  | "ec7e6-reflection-attributes-and-dynamic-programming"
  | "ec7e6-multithreading"
  | "ec7e6-thread-synchronization"
  | "ec7e6-platform-interoperability-and-unsafe-code"
  | "ec7e6-the-common-language-infrastructure"
  | "ec7-learning-map"
  | "ec7-final-review"
  | "cqc157-basic-language-elements"
  | "cqc157-collections-and-linq"
  | "cqc157-generics-delegates-and-events"
  | "cqc157-resource-management-and-serialization"
  | "cqc157-exceptions-and-custom-exceptions"
  | "cqc157-asynchrony-multithreading-tasks-and-parallelism"
  | "cqc157-member-design"
  | "cqc157-type-design"
  | "cqc157-security-design"
  | "cqc157-naming-conventions"
  | "cqc157-clean-code"
  | "cqc157-development-practices"
  // 编写高质量代码
  | "cqc-learning-map"
  | "cqc-final-review"
  // Effective C#
  | "ecs-learning-map"
  | "ecs3-language-idioms"
  | "ecs3-resource-management"
  | "ecs3-working-with-generics"
  | "ecs3-working-with-linq"
  | "ecs3-exception-practices"
  | "ecs-final-review"
  // 深入理解 C#
  | "dcs-learning-map"
  | "survival-of-the-sharpest"
  | "csharp-2"
  | "csharp-3-linq"
  | "csharp-4-interoperability"
  | "writing-asynchronous-code"
  | "async-implementation"
  | "csharp-5-bonus-features"
  | "super-sleek-properties"
  | "stringy-features"
  | "concise-code-smorgasbord"
  | "composition-using-tuples"
  | "deconstruction-and-pattern-matching"
  | "pass-by-reference-efficiency"
  | "concise-code-csharp-7"
  | "csharp-8-and-beyond"
  | "dcs-final-review"
  // C# 函数式编程
  | "cfp-learning-map"
  | "introducing-functional-programming"
  | "why-function-purity-matters"
  | "designing-function-signatures-and-types"
  | "patterns-in-functional-programming"
  | "designing-programs-with-function-composition"
  | "functional-error-handling"
  | "structuring-an-application-with-functions"
  | "multi-argument-functions"
  | "thinking-about-data-functionally"
  | "event-sourcing-functional-persistence"
  | "lazy-computations-continuations-monadic-composition"
  | "stateful-programs-and-computations"
  | "asynchronous-computations"
  | "reactive-data-streams"
  | "message-passing-concurrency"
  | "cfp-final-review"
  // C# 10 核心技术指南
  | "ctc-learning-map"
  | "introducing-csharp-and-dotnet"
  | "csharp-language-basics"
  | "creating-types-in-csharp"
  | "advanced-csharp"
  | "dotnet-overview"
  | "dotnet-fundamentals"
  | "collections"
  | "linq-queries"
  | "linq-operators"
  | "linq-to-xml"
  | "xml-json-technologies"
  | "disposal-and-garbage-collection"
  | "diagnostics"
  | "concurrency-and-asynchrony"
  | "streams-and-io"
  | "networking"
  | "assemblies"
  | "reflection-and-metadata"
  | "dynamic-programming"
  | "cryptography"
  | "advanced-threading"
  | "parallel-programming"
  | "span-and-memory"
  | "native-com-interoperability"
  | "regular-expressions"
  | "ctc-final-review"
  // CLR via C#
  | "cvc-learning-map"
  | "clr-execution-model"
  | "building-packaging-deploying-types"
  | "shared-strongly-named-assemblies"
  | "type-fundamentals"
  | "primitive-reference-value-types"
  | "type-member-basics"
  | "constants-and-fields"
  | "methods"
  | "parameters"
  | "properties"
  | "events"
  | "generics"
  | "interfaces"
  | "chars-strings-working-with-text"
  | "enumerated-types-bit-flags"
  | "arrays"
  | "delegates"
  | "custom-attributes"
  | "nullable-value-types"
  | "exceptions-state-management"
  | "managed-heap-garbage-collection"
  | "clr-hosting-appdomains"
  | "assembly-loading-reflection"
  | "runtime-serialization"
  | "interoperating-winrt-components"
  | "thread-basics"
  | "compute-bound-asynchronous-operations"
  | "io-bound-asynchronous-operations"
  | "primitive-thread-synchronization-constructs"
  | "hybrid-thread-synchronization-constructs"
  | "cvc-final-review"
  // Pro .NET 内存管理（第2版）
  | "dnm-basic-concepts"
  | "dnm-low-level-memory-management"
  | "dnm-memory-measurements"
  | "dnm-dotnet-fundamentals"
  | "dnm-memory-partitioning"
  | "dnm-memory-allocation"
  | "dnm-garbage-collection-introduction"
  | "dnm-garbage-collection-mark-phase"
  | "dnm-garbage-collection-plan-phase"
  | "dnm-garbage-collection-sweep-and-compact"
  | "dnm-gc-flavors-and-settings"
  | "dnm-object-lifetime"
  | "dnm-miscellaneous-topics"
  | "dnm-advanced-techniques"
  | "dnm-programmatical-apis"
  | "dnm-memory-model"
  | "dnm-final-review"
  // Rust 程序设计语言
  | "rpl-getting-started"
  | "rpl-programming-a-guessing-game"
  | "rpl-common-programming-concepts"
  | "rpl-understanding-ownership"
  | "rpl-using-structs-to-structure-related-data"
  | "rpl-enums-and-pattern-matching"
  | "rpl-packages-crates-and-modules"
  | "rpl-common-collections"
  | "rpl-official-error-handling"
  | "rpl-generic-types-traits-and-lifetimes"
  | "rpl-writing-automated-tests"
  | "rpl-an-io-project"
  | "rpl-functional-language-features"
  | "rpl-more-about-cargo-and-crates-io"
  | "rpl-smart-pointers"
  | "rpl-fearless-concurrency"
  | "rpl-fundamentals-of-asynchronous-programming"
  | "rpl-object-oriented-programming-features"
  | "rpl-patterns-and-matching"
  | "rpl-advanced-features"
  | "rpl-final-project-building-a-multithreaded-web-server"
  | "rpl-learning-map"
  | "rpl-final-review"
  // Go 程序设计语言
  | "gopl-tutorial"
  | "gopl-program-structure"
  | "gopl-basic-data-types"
  | "gopl-composite-types"
  | "gopl-functions"
  | "gopl-methods"
  | "gopl-interfaces"
  | "gopl-goroutines-and-channels"
  | "gopl-concurrency-with-shared-variables"
  | "gopl-packages-and-the-go-tool"
  | "gopl-testing"
  | "gopl-reflection"
  | "gopl-low-level-programming"
  | "gpl-learning-map"
  | "gpl-final-review"
  // Python 编程：从入门到实践
  | "pcc3-getting-started"
  | "pcc3-variables-and-simple-data-types"
  | "pcc3-introducing-lists"
  | "pcc3-working-with-lists"
  | "pcc3-if-statements"
  | "pcc3-dictionaries"
  | "pcc3-user-input-and-while-loops"
  | "pcc3-functions"
  | "pcc3-classes"
  | "pcc3-files-and-exceptions"
  | "pcc3-testing-your-code"
  | "pcc3-a-ship-that-fires-bullets"
  | "pcc3-aliens"
  | "pcc3-scoring"
  | "pcc3-generating-data"
  | "pcc3-downloading-data"
  | "pcc3-working-with-apis"
  | "pcc3-getting-started-with-django"
  | "pcc3-user-accounts"
  | "pcc3-styling-and-deploying-an-app"
  | "pcc-learning-map"
  | "pcc-final-review"
  // Lua 程序设计
  | "pil4-learning-map"
  | "pil4-getting-started"
  | "pil4-eight-queen-puzzle"
  | "pil4-numbers"
  | "pil4-strings"
  | "pil4-tables"
  | "pil4-functions"
  | "pil4-external-world"
  | "pil4-filling-some-gaps"
  | "pil4-closures"
  | "pil4-pattern-matching"
  | "pil4-most-frequent-words"
  | "pil4-date-time"
  | "pil4-bits-bytes"
  | "pil4-data-structures"
  | "pil4-data-files-serialization"
  | "pil4-compilation-errors"
  | "pil4-modules-packages"
  | "pil4-iterators-generic-for"
  | "pil4-markov-chain"
  | "pil4-metatables-metamethods"
  | "pil4-object-oriented-programming"
  | "pil4-environment"
  | "pil4-garbage"
  | "pil4-coroutines"
  | "pil4-reflection"
  | "pil4-multithreading-coroutines"
  | "pil4-c-api-overview"
  | "pil4-extending-application"
  | "pil4-calling-c-from-lua"
  | "pil4-c-function-techniques"
  | "pil4-user-defined-types"
  | "pil4-managing-resources"
  | "pil4-threads-states"
  | "pil4-final-review"
  // Ruby 基础教程（たのしいRuby 第5版）
  | "tr5-learning-map"
  | "tr5-first-ruby"
  | "tr5-useful-objects"
  | "tr5-building-command"
  | "tr5-objects-variables-constants"
  | "tr5-conditional-judgment"
  | "tr5-loops"
  | "tr5-methods"
  | "tr5-classes-modules"
  | "tr5-operators"
  | "tr5-errors-exceptions"
  | "tr5-blocks"
  | "tr5-numeric"
  | "tr5-arrays"
  | "tr5-strings"
  | "tr5-hashes"
  | "tr5-regular-expressions"
  | "tr5-io"
  | "tr5-file-dir"
  | "tr5-encoding"
  | "tr5-time-date"
  | "tr5-proc"
  | "tr5-text-processing"
  | "tr5-postal-code-search"
  | "tr5-final-review"
  // 大话数据结构
  | "dsvc-learning-map"
  | "dsvc-data-structure-introduction"
  | "dsvc-algorithms"
  | "dsvc-linear-list"
  | "dsvc-stacks-and-queues"
  | "dsvc-strings"
  | "dsvc-trees"
  | "dsvc-graphs"
  | "dsvc-searching"
  | "dsvc-sorting"
  | "dsvc-final-review"
  // 图灵数学女孩系列
  | "mgl-learning-map"
  | "mgl-number-theory"
  | "mgl-equations"
  | "mgl-functions"
  | "mgl-combinatorics"
  | "mgl-graph-theory"
  | "mgl-probability"
  | "mgl-algorithms"
  | "mgl-machine-learning"
  | "mgl-final-review"
  // 数据结构与算法分析（C++描述）
  | "dsa-learning-map"
  | "dsa-complexity-analysis"
  | "dsa-lists"
  | "dsa-trees"
  | "dsa-hash-tables"
  | "dsa-disjoint-sets"
  | "dsa-graph-algs"
  | "dsa-sorting"
  | "dsa-dynamic-programming"
  | "dsa-final-review"
  // Rust 编程之道
  | "rsw-learning-map"
  | "rsw-new-era-language"
  | "rsw-language-essentials"
  | "rsw-ownership-borrow"
  | "rsw-traits-generics"
  | "rsw-lifetimes"
  | "rsw-functions-closures-iterators"
  | "rsw-structured-programming"
  | "rsw-strings-collections"
  | "rsw-error-handling"
  | "rsw-modular-development"
  | "rsw-unsafe-rust"
  | "rsw-concurrency"
  | "rsw-async-runtime"
  | "rsw-macros"
  | "rsw-final-review"
  // Go 语言实战
  | "gia-learning-map"
  | "gia-go-philosophy"
  | "gia-quick-start"
  | "gia-packaging-tooling"
  | "gia-arrays-slices"
  | "gia-map-struct"
  | "gia-goroutines"
  | "gia-concurrency-patterns"
  | "gia-testing-packaging"
  | "gia-standard-lib"
  | "gia-final-review"
  // Go Web 编程
  | "gwp-learning-map"
  | "gwp-http-basics"
  | "gwp-chitchat"
  | "gwp-routing"
  | "gwp-processing-requests"
  | "gwp-database"
  | "gwp-templates"
  | "gwp-json-api"
  | "gwp-testing"
  | "gwp-concurrency"
  | "gwp-deployment"
  | "gwp-final-review"
  // 流畅的 Python
  | "flp-learning-map"
  | "flp-data-model"
  | "flp-sequences"
  | "flp-dict-sets"
  | "flp-unicode-text-bytes"
  | "flp-data-class-builders"
  | "flp-object-references"
  | "flp-functions-first-class"
  | "flp-type-hints"
  | "flp-closures-decorators"
  | "flp-design-patterns"
  | "flp-pythonic-object"
  | "flp-special-methods-sequences"
  | "flp-protocols-abc"
  | "flp-inheritance-mixins"
  | "flp-more-type-hints"
  | "flp-operator-overloading"
  | "flp-generators"
  | "flp-with-match-else"
  | "flp-concurrency-models"
  | "flp-concurrent-executors"
  | "flp-async-programming"
  | "flp-dynamic-attributes"
  | "flp-descriptors"
  | "flp-class-metaprogramming"
  | "flp-final-review"
  // Python 自动化运维
  | "pop-learning-map"
  | "pop-system-information"
  | "pop-service-monitoring"
  | "pop-quality-reports"
  | "pop-system-security"
  | "pop-pexpect"
  | "pop-ssh-paramiko"
  | "pop-fabric"
  | "pop-webserver"
  | "pop-ansible"
  | "pop-saltstack"
  | "pop-func"
  | "pop-big-data"
  | "pop-bs-ops-platform"
  | "pop-linux-security-audit"
  | "pop-distributed-quality-monitoring"
  | "pop-cs-ops-platform"
  | "pop-final-review"
  // 精通 Rust（第2版）
  | "mrs-learning-map"
  | "mrs-getting-started"
  | "mrs-managing-projects-cargo"
  | "mrs-tests-docs-benchmarks"
  | "mrs-types-generics-traits"
  | "mrs-memory-management-safety"
  | "mrs-error-handling"
  | "mrs-advanced-concepts"
  | "mrs-concurrency"
  | "mrs-metaprogramming-macros"
  | "mrs-unsafe-ffi"
  | "mrs-logging"
  | "mrs-network-programming"
  | "mrs-web-applications"
  | "mrs-databases"
  | "mrs-webassembly"
  | "mrs-desktop-applications"
  | "mrs-debugging"
  | "mrs-final-review"
  // Python 高级编程
  | "pya-learning-map"
  | "pya-getting-started"
  | "pya-syntax-below-class"
  | "pya-syntax-above-class"
  | "pya-choosing-good-names"
  | "pya-writing-package"
  | "pya-writing-application"
  | "pya-zc-buildout"
  | "pya-managing-code"
  | "pya-managing-life-cycle"
  | "pya-documenting-project"
  | "pya-test-driven-development"
  | "pya-optimization-profiling"
  | "pya-optimization-solutions"
  | "pya-useful-design-patterns"
  | "pya-final-review"
  // 算法（第4版）
  | "al4-learning-map"
  | "al4-fundamentals"
  | "al4-sorting-elementary"
  | "al4-sorting-merge-quick"
  | "al4-searching-st"
  | "al4-hash-tables"
  | "al4-graphs-undirected"
  | "al4-graphs-directed"
  | "al4-strings"
  | "al4-final-review"
  // 编程珠玑
  | "pp-learning-map"
  | "pp-cracking-problems"
  | "pp-binary-search"
  | "pp-bit-vectors"
  | "pp-design-principles"
  | "pp-code-tuning"
  | "pp-back-of-envelope"
  | "pp-perspectives"
  | "pp-epilog"
  | "pp-final-review"
  // 深入浅出竞赛算法
  | "ca-learning-map"
  | "ca-contest-basics"
  | "ca-dp"
  | "ca-greedy"
  | "ca-graph-algos"
  | "ca-string-algos"
  | "ca-math-tricks"
  | "ca-segment-tree"
  | "ca-union-find"
  | "ca-final-review"
  // 算法导论
  | "ial-learning-map"
  | "ial-foundations"
  | "ial-sorting"
  | "ial-selection"
  | "ial-binary-search-trees"
  | "ial-hash-tables"
  | "ial-data-structures"
  | "ial-graph-algorithms"
  | "ial-dp-advanced"
  | "ial-final-review"
  // 算法心得
  | "hd-learning-map"
  | "hd-bit-manipulation"
  | "hd-arithmetic-tricks"
  | "hd-division"
  | "hd-power"
  | "hd-unusual-bases"
  | "hd-hashing-search"
  | "hd-floating-point"
  | "hd-crc-error"
  | "hd-final-review"
  // 计算机程序设计艺术
  | "tcp-learning-map"
  | "tcp-mathematical-preliminaries"
  | "tcp-sequences"
  | "tcp-arithmetic"
  | "tcp-polynomials"
  | "tcp-gf2"
  | "tcp-random-numbers"
  | "tcp-efficient-searching"
  | "tcp-info-structures"
  | "tcp-final-review"
  // 程序员的数学三册系列
  | "pm-series-learning-map"
  | "pm1-zero"
  | "pm1-logic"
  | "pm1-remainder"
  | "pm1-induction"
  | "pm1-counting"
  | "pm1-recursion"
  | "pm1-exponential-explosion"
  | "pm1-undecidable-problems"
  | "pm1-programmers-mathematics"
  | "pm2-probability-definition"
  | "pm2-multiple-random-variables"
  | "pm2-discrete-distributions"
  | "pm2-continuous-distributions"
  | "pm2-covariance-normal"
  | "pm2-estimation-testing"
  | "pm2-pseudorandom"
  | "pm2-applications"
  | "pm3-motivation"
  | "pm3-vectors-matrices-determinants"
  | "pm3-rank-inverse-equations"
  | "pm3-lu-decomposition"
  | "pm3-eigenvalues-jordan"
  | "pm3-numerical-eigenvalues"
  | "pm-series-final-review"
  // 深入浅出统计学官方15章
  | "hfs-official-learning-map"
  | "hfs-visualizing-information"
  | "hfs-central-tendency"
  | "hfs-variability-spread"
  | "hfs-calculating-probabilities"
  | "hfs-discrete-probability-distributions"
  | "hfs-permutations-combinations"
  | "hfs-geometric-binomial-poisson"
  | "hfs-normal-distribution"
  | "hfs-normal-beyond"
  | "hfs-statistical-sampling"
  | "hfs-estimating-populations"
  | "hfs-confidence-intervals"
  | "hfs-hypothesis-tests"
  | "hfs-chi-square"
  | "hfs-correlation-regression"
  | "hfs-official-final-review"
  // 线性代数应该这样学
  | "lad4-official-learning-map"
  | "lad4-vector-spaces"
  | "lad4-finite-dimensional-vector-spaces"
  | "lad4-linear-maps"
  | "lad4-polynomials"
  | "lad4-eigenvalues-eigenvectors"
  | "lad4-inner-product-spaces"
  | "lad4-operators-inner-product-spaces"
  | "lad4-operators-complex-vector-spaces"
  | "lad4-multilinear-algebra-determinants"
  | "lad4-official-final-review"
  // 具体数学
  | "cm2-official-learning-map"
  | "cm2-recurrent-problems"
  | "cm2-sums"
  | "cm2-integer-functions"
  | "cm2-number-theory"
  | "cm2-binomial-coefficients"
  | "cm2-special-numbers"
  | "cm2-generating-functions"
  | "cm2-discrete-probability"
  | "cm2-asymptotics"
  | "cm2-official-final-review"
  // Geometric Data Structures for Computer Graphics
  | "gdscg-official-learning-map"
  | "gdscg-quadtrees-octrees"
  | "gdscg-orthogonal-queries"
  | "gdscg-bsp-trees"
  | "gdscg-bounding-volume-hierarchies"
  | "gdscg-distance-fields"
  | "gdscg-voronoi-diagrams"
  | "gdscg-geometric-proximity-graphs"
  | "gdscg-kinetic-data-structures"
  | "gdscg-degeneracy-robustness"
  | "gdscg-dynamization"
  | "gdscg-official-final-review"
  // 计算机图形学第4版
  | "cg4-learning-map"
  | "cg4-graphics-pipeline"
  | "cg4-rasterization"
  | "cg4-transformations"
  | "cg4-visibility"
  | "cg4-lighting-models"
  | "cg4-texturing"
  | "cg4-curves-surfaces"
  | "cg4-advanced-rendering"
  | "cg4-final-review"
  // OpenGL 红宝书
  | "glr-learning-map"
  | "glr-opengl-basics"
  | "glr-shaders"
  | "glr-geometry"
  | "glr-textures"
  | "glr-lighting"
  | "glr-framebuffer"
  | "glr-advanced-buffers"
  | "glr-modern-opengl"
  | "glr-final-review"
  // OpenGL 超级宝典
  | "gls-learning-map"
  | "gls-first-program"
  | "gls-shader-pipeline"
  | "gls-vertex-processing"
  | "gls-fragment-shading"
  | "gls-texture-mapping"
  | "gls-buffer-objects"
  | "gls-geometry-shaders"
  | "gls-performance"
  | "gls-final-review"
  // Ray Tracing in One Weekend
  | "rtw-learning-map"
  | "rtw-ray-basics"
  | "rtw-camera"
  | "rtw-sphere-hittable"
  | "rtw-materials"
  | "rtw-diffuse"
  | "rtw-metal-dielectric"
  | "rtw-defocus-blur"
  | "rtw-final-scene"
  | "rtw-final-review"
  // 深入理解 OpenGL WebGL OpenGL ES
  | "dog-learning-map"
  | "dog-opengl-architecture"
  | "dog-shader-language"
  | "dog-webgl-basics"
  | "dog-opengl-es"
  | "dog-rendering-optimization"
  | "dog-fbo-techniques"
  | "dog-cross-platform"
  | "dog-debugging-tools"
  | "dog-final-review"
  // Vulkan 学习指南
  | "vkg-learning-map"
  | "vkg-vulkan-basics"
  | "vkg-instance-device"
  | "vkg-swapchain"
  | "vkg-graphics-pipeline"
  | "vkg-command-buffers"
  | "vkg-render-pass"
  | "vkg-textures-shaders"
  | "vkg-advanced-features"
  | "vkg-final-review"
  // GPU Gems 系列
  | "gpg-learning-map"
  | "gpg-natural-effects"
  | "gpg-lighting-shadows"
  | "gpg-materials-shaders"
  | "gpg-image-processing"
  | "gpg-geometry"
  | "gpg-particle-systems"
  | "gpg-gpu-computing"
  | "gpg-advanced-techniques"
  | "gpg-final-review"
  // 实时渲染第4版
  | "rtr-learning-map"
  | "rtr-graphics-pipeline"
  | "rtr-transforms"
  | "rtr-shading-basics"
  | "rtr-texturing"
  | "rtr-advanced-shading"
  | "rtr-shadows"
  | "rtr-global-illumination"
  | "rtr-optimization"
  | "rtr-final-review"
  // 计算机图形学：原理及实践
  | "cgp-learning-map"
  | "cgp-introduction"
  | "cgp-raster-graphics"
  | "cgp-2d-graphics"
  | "cgp-3d-graphics"
  | "cgp-rendering-algorithms"
  | "cgp-lighting-models"
  | "cgp-modeling"
  | "cgp-advanced-topics"
  | "cgp-final-review"
  // 基于物理的渲染 PBRT
  | "pbt-learning-map"
  | "pbt-radiometry"
  | "pbt-camera-model"
  | "pbt-monte-carlo"
  | "pbt-bxdf"
  | "pbt-volume-scattering"
  | "pbt-light-transport"
  | "pbt-integrators"
  | "pbt-system-architecture"
  | "pbt-final-review"
  // 全局光照技术
  | "gil-learning-map"
  | "gil-direct-indirect"
  | "gil-radiosity"
  | "gil-path-tracing"
  | "gil-photon-mapping"
  | "gil-importance-sampling"
  | "gil-bias-unbiased"
  | "gil-realtime-gi"
  | "gil-advanced-techniques"
  | "gil-final-review"
  // Unity Shader入门精要 第一版
  | "useb-official-learning-map"
  | "useb-01-welcome-shader-world"
  | "useb-02-rendering-pipeline"
  | "useb-03-unity-shader-basics"
  | "useb-04-shader-mathematics"
  | "useb-05-first-unity-shader"
  | "useb-06-basic-lighting"
  | "useb-07-basic-textures"
  | "useb-08-transparency"
  | "useb-09-complex-lighting"
  | "useb-10-advanced-textures"
  | "useb-11-animated-image"
  | "useb-12-screen-post-effects"
  | "useb-13-depth-normal-textures"
  | "useb-14-non-photorealistic-rendering"
  | "useb-15-noise"
  | "useb-16-rendering-optimization"
  | "useb-17-surface-shader"
  | "useb-18-physically-based-rendering"
  | "useb-19-unity5-changes"
  | "useb-20-more-to-learn"
  | "useb-official-final-review"
  // Practical Shader Development 第一版
  | "psd-official-learning-map"
  | "psd-01-hello-game-graphics"
  | "psd-02-first-shaders"
  | "psd-03-using-textures"
  | "psd-04-translucency-depth"
  | "psd-05-making-things-move"
  | "psd-06-cameras-coordinates"
  | "psd-07-first-3d-project"
  | "psd-08-diffuse-lighting"
  | "psd-09-first-lighting-model"
  | "psd-10-normal-mapping"
  | "psd-11-cubemaps-skyboxes"
  | "psd-12-lighting-in-depth"
  | "psd-13-profiling-shaders"
  | "psd-14-optimizing-shaders"
  | "psd-15-precision"
  | "psd-16-writing-shaders-unity"
  | "psd-17-writing-shaders-ue4"
  | "psd-18-writing-shaders-godot"
  | "psd-appendix-a-code-snippets"
  | "psd-official-final-review"
  // Unity 3D ShaderLab 开发实战详解 第一版
  | "usl-official-learning-map"
  | "usl-01-shader-concept"
  | "usl-02-unity-shader-forms"
  | "usl-03-coordinate-spaces"
  | "usl-04-basic-lighting-models"
  | "usl-05-first-executed-pass"
  | "usl-06-vertexlit-path"
  | "usl-07-forward-path"
  | "usl-08-baked-lightmaps"
  | "usl-09-light-probes"
  | "usl-10-planar-shadows"
  | "usl-11-spherical-shadows"
  | "usl-12-volume-shadows"
  | "usl-13-shadow-mapping"
  | "usl-14-built-in-shadows"
  | "usl-15-pass-state-commands"
  | "usl-16-fixed-function-pipeline"
  | "usl-17-surface-shader"
  | "usl-18-bump-material"
  | "usl-19-toon-material"
  | "usl-20-mirror-material"
  | "usl-21-translucent-material"
  | "usl-22-volumetric-fog"
  | "usl-23-wrap-model"
  | "usl-24-area-light"
  | "usl-25-volumetric-light"
  | "usl-26-replacement-rendering"
  | "usl-27-post-effects"
  | "usl-28-terrain"
  | "usl-29-projection"
  | "usl-30-organization-reuse"
  | "usl-31-rendering-concepts"
  | "usl-32-render-path-optimization"
  | "usl-33-mobile-optimization"
  | "usl-official-final-review"
  // Unity着色器和屏幕特效开发秘笈 第一版
  | "usf-official-learning-map"
  | "usf-01-diffuse-shading"
  | "usf-02-texture-effects"
  | "usf-03-specular-reflection"
  | "usf-04-shader-reflections"
  | "usf-05-custom-lighting-models"
  | "usf-06-transparency"
  | "usf-07-vertex-magic"
  | "usf-08-mobile-shader-optimization"
  | "usf-09-cginclude-modularity"
  | "usf-10-rendertexture-screen-effects"
  | "usf-11-gameplay-screen-effects"
  | "usf-official-final-review"
  // Unity 6 URP 内置 Shader 源码解析
  | "uus-official-learning-map"
  | "uus-01-package-topology"
  | "uus-02-shaderlab-pass-contract"
  | "uus-03-lit-input-material"
  | "uus-04-brdf-surface-data"
  | "uus-05-lit-forward-pass"
  | "uus-06-lit-gbuffer-pass"
  | "uus-07-shared-utility-passes"
  | "uus-08-simple-lit"
  | "uus-09-complex-lit"
  | "uus-10-baked-lit"
  | "uus-11-unlit"
  | "uus-12-particle-family"
  | "uus-13-terrain-family"
  | "uus-14-nature-speedtree"
  | "uus-15-renderer-2d"
  | "uus-16-decal-dbuffer"
  | "uus-17-postprocess-fullscreen"
  | "uus-18-core-input-transforms"
  | "uus-19-lighting-realtime-gi"
  | "uus-20-shadows-ao-screen-inputs"
  | "uus-21-variants-batching-xr-debug"
  | "uus-official-final-review"
  // GPU Pro 系列
  | "gpo-official-learning-map"
  | "gpo-geometry-terrain"
  | "gpo-pipeline-visibility"
  | "gpo-data-compression"
  | "gpo-lighting-gi"
  | "gpo-shadow-systems"
  | "gpo-material-shading"
  | "gpo-volume-environment"
  | "gpo-image-reconstruction"
  | "gpo-transparency-raytracing"
  | "gpo-compute-simulation"
  | "gpo-mobile-bandwidth"
  | "gpo-engine-tools"
  | "gpo-official-final-review"
  // ShaderX 系列
  | "sxx-official-learning-map"
  | "sxx-language-models"
  | "sxx-geometry-data"
  | "sxx-animation-deformation"
  | "sxx-terrain-displacement"
  | "sxx-material-surface"
  | "sxx-lighting-gi"
  | "sxx-texture-representation"
  | "sxx-particles-volume"
  | "sxx-image-post"
  | "sxx-transparency-aa"
  | "sxx-shadow-systems"
  | "sxx-environment-weather"
  | "sxx-engine-architecture"
  | "sxx-tools-performance"
  | "sxx-gpgpu-simulation"
  | "sxx-mobile-portability"
  | "sxx-official-final-review"
  | "bl3-official-learning-map"
  | "bl3-01-what-you-need-know-about-blender"
  | "bl3-02-user-interface"
  | "bl3-03-first-scene"
  | "bl3-04-project-overview"
  | "bl3-05-character-design"
  | "bl3-06-modeling-tools"
  | "bl3-07-character-modeling"
  | "bl3-08-unwrapping-uvs"
  | "bl3-09-painting-textures"
  | "bl3-10-materials-shaders"
  | "bl3-11-character-rigging"
  | "bl3-12-animating-character"
  | "bl3-13-camera-tracking"
  | "bl3-14-lighting-compositing-rendering"
  | "bl3-15-other-features"
  | "bl3-official-final-review"
  | "gdf-3e-official-learning-map"
  | "gdf-3e-introduction"
  | "gdf-3e-01-games-video-games"
  | "gdf-3e-02-designing-developing-games"
  | "gdf-3e-03-major-genres"
  | "gdf-3e-04-understanding-player"
  | "gdf-3e-05-understanding-machine"
  | "gdf-3e-06-making-money"
  | "gdf-3e-07-game-concepts"
  | "gdf-3e-08-game-worlds"
  | "gdf-3e-09-creative-expressive-play"
  | "gdf-3e-10-character-development"
  | "gdf-3e-11-storytelling"
  | "gdf-3e-12-creating-user-experience"
  | "gdf-3e-13-gameplay"
  | "gdf-3e-14-core-mechanics"
  | "gdf-3e-15-game-balancing"
  | "gdf-3e-16-level-design"
  | "gdf-3e-17-online-gaming"
  | "gdf-3e-glossary"
  | "gdf-3e-references"
  | "gdf-3e-index"
  | "gdf-3e-official-final-review"
  | "gma-official-learning-map"
  | "gma-01-designing-game-mechanics"
  | "gma-02-emergence-progression"
  | "gma-03-complex-systems-emergence"
  | "gma-04-internal-economy"
  | "gma-05-machinations"
  | "gma-06-common-mechanisms"
  | "gma-07-design-patterns"
  | "gma-08-simulating-balancing-games"
  | "gma-09-building-economies"
  | "gma-10-level-design-mechanics"
  | "gma-11-progression-mechanisms"
  | "gma-12-meaningful-mechanics"
  | "gma-appendix-a-machinations-reference"
  | "gma-appendix-b-pattern-library"
  | "gma-appendix-c-machinations-start"
  | "gma-official-final-review"
  | "gmp17-official-learning-map"
  | "gmp17-00-programming-preschool"
  | "gmp17-01-computer-science"
  | "gmp17-02-programming-languages"
  | "gmp17-03-software-development"
  | "gmp17-04-game-mathematics"
  | "gmp17-05-game-programming"
  | "gmp17-06-game-engine-development"
  | "gmp17-07-computer-graphics"
  | "gmp17-08-game-audio"
  | "gmp17-09-game-physics-animation"
  | "gmp17-10-game-ai"
  | "gmp17-11-multiplayer-programming"
  | "gmp17-official-final-review"
  | "uan-official-learning-map"
  | "uan-01-animation-fundamentals"
  | "uan-02-sprite-animation"
  | "uan-03-native-animation"
  | "uan-04-noncharacter-animation-mecanim"
  | "uan-05-character-animation-fundamentals"
  | "uan-06-advanced-character-animation"
  | "uan-07-blend-shapes-ik-movie-textures"
  | "uan-official-final-review"
  | "uct-official-learning-map"
  | "uct-01-3d-math-unity"
  | "uct-02-avatar-outfit-system"
  | "uct-03-message-event-encapsulation"
  | "uct-04-protobuf-in-games"
  | "uct-05-text-file-encryption"
  | "uct-06-behavior-trees"
  | "uct-07-afterimage"
  | "uct-08-mobile-realtime-shadows"
  | "uct-09-mobile-ocean-simulation"
  | "uct-10-mvc-architecture"
  | "uct-11-fsm-in-games"
  | "uct-12-mobile-hot-update"
  | "uct-13-mobile-shader-techniques"
  | "uct-14-game-development-experience"
  | "uct-official-final-review"
  | "ugc-official-learning-map"
  | "ugc-01-unity3d-foundation-environment"
  | "ugc-02-3d-billiards"
  | "ugc-03-3d-maze-box"
  | "ugc-04-crossing-meridian"
  | "ugc-05-tomb-coin-pusher"
  | "ugc-06-coke-cans"
  | "ugc-07-tank-battle"
  | "ugc-08-dog-runner"
  | "ugc-09-3d-virtual-parking"
  | "ugc-10-save-mushroom-village"
  | "ugc-11-baina-racing"
  | "ugc-official-final-review"
  | "uhm-2024-official-learning-map"
  | "uhm-2024-slide-01-cover"
  | "uhm-2024-slide-02-new-chapter"
  | "uhm-2024-slide-03-made-with-unity"
  | "uhm-2024-slide-04-production-evidence"
  | "uhm-2024-slide-05-beijing-auto-show"
  | "uhm-2024-slide-06-model-performance-budget"
  | "uhm-2024-slide-07-soc-os-compatibility"
  | "uhm-2024-slide-08-architecture-combinations"
  | "uhm-2024-slide-09-ecosystem"
  | "uhm-2024-slide-10-head-unit-edition"
  | "uhm-2024-slide-11-tuanjie-head-unit"
  | "uhm-2024-slide-12-qnx-support"
  | "uhm-2024-slide-13-embedded-linux-support"
  | "uhm-2024-slide-14-tuanjie-engine"
  | "uhm-2024-slide-15-uras-architecture"
  | "uhm-2024-slide-16-uras-unified-rendering"
  | "uhm-2024-slide-17-uras-view-isolation"
  | "uhm-2024-slide-18-unity-china"
  | "uhm-2024-slide-19-timeline"
  | "uhm-2024-slide-20-capability-foundation"
  | "uhm-2024-slide-21-service-model"
  | "uhm-2024-slide-22-innovation-scenarios"
  | "uhm-2024-slide-23-evidence-closure"
  | "uhm-2024-official-final-review"
  | "uid-official-learning-map"
  | "uid-01-looking-back-looking-forward"
  | "uid-02-building-layouts"
  | "uid-03-control-control"
  | "uid-04-anchors-away"
  | "uid-05-screen-world-camera"
  | "uid-06-working-with-ui-source"
  | "uid-appendix-3d-scene-sample"
  | "uid-official-final-review"
  | "usc-official-learning-map"
  | "usc-01-unity-csharp-refresher"
  | "usc-02-debugging"
  | "usc-03-singletons-statics-gameobjects-world"
  | "usc-04-event-driven-programming"
  | "usc-05-cameras-rendering-scenes"
  | "usc-06-working-with-mono"
  | "usc-07-artificial-intelligence"
  | "usc-08-customizing-unity-editor"
  | "usc-09-textures-models-2d"
  | "usc-10-source-control-other-tips"
  | "usc-official-final-review"
  | "uvf-official-learning-map"
  | "uvf-01-unity3d-engine-overview"
  | "uvf-02-vfx-foundations"
  | "uvf-03-unity3d-foundations"
  | "uvf-04-scene-fire-snow"
  | "uvf-05-unity-max-weapon-buff-slash"
  | "uvf-06-particle-hit-projectile-ui"
  | "uvf-07-physical-attacks"
  | "uvf-08-magic-attacks"
  | "uvf-09-common-skills"
  | "uvf-official-final-review"
  | "usg-official-learning-map"
  | "usg-01-script-overview"
  | "usg-02-concepts-scripting-shooter"
  | "usg-03-physics-system"
  | "usg-04-game-math"
  | "usg-05-ui-system"
  | "usg-06-animation-system"
  | "usg-07-effects"
  | "usg-08-audio"
  | "usg-09-resource-management"
  | "usg-10-save-load"
  | "usg-11-game-ai"
  | "usg-12-secret-commandos"
  | "usg-13-advanced-programming"
  | "usg-official-final-review"
  // Unity 神技达人炼成记
  | "ums-official-learning-map"
  | "ums-00-prologue-creative-space"
  | "ums-01-creating-the-world"
  | "ums-02-thinking-and-structure"
  | "ums-03-world-composition"
  | "ums-04-scripting-foundations"
  | "ums-05-animation-and-characters"
  | "ums-06-gui-and-audio"
  | "ums-07-build-and-output"
  | "ums-08-unity-possibilities"
  | "ums-09-playmaker-visual-scripting"
  | "ums-10-optimization-and-pro"
  | "ums-appendix-tools-assets"
  | "ums-official-final-review"
  | "u3ap-official-learning-map"
  | "u3ap-01-csharp-key-techniques"
  | "u3ap-02-architecture"
  | "u3ap-03-data-tables"
  | "u3ap-04-ui"
  | "u3ap-05-models-animation"
  | "u3ap-06-network-layer"
  | "u3ap-07-rendering-graphics"
  | "u3ap-08-ai"
  | "u3ap-10-map-pathfinding"
  | "u3ap-official-final-review"
  | "gep1-official-learning-map"
  | "gep1-front-matter"
  | "gep1-chapter-01-engine-conflict"
  | "gep1-chapter-02-setting-sail"
  | "gep1-chapter-03-basic-system"
  | "gep1-chapter-04-data-structures"
  | "gep1-chapter-05-math-library"
  | "gep1-chapter-06-initialization-destruction"
  | "gep1-chapter-07-application-framework"
  | "gep1-chapter-08-object-system"
  | "gep1-chapter-09-resource-management"
  | "gep1-chapter-10-design-philosophy"
  | "gep1-chapter-11-scene-management"
  | "gep1-chapter-12-models-textures"
  | "gep1-chapter-13-lod"
  | "gep1-official-final-review"
  | "rtcd-official-learning-map"
  | "rtcd-front-matter"
  | "rtcd-chapter-01-introduction"
  | "rtcd-chapter-02-design-issues"
  | "rtcd-chapter-03-math-geometry-primer"
  | "rtcd-chapter-04-bounding-volumes"
  | "rtcd-chapter-05-basic-primitive-tests"
  | "rtcd-chapter-06-bounding-volume-hierarchies"
  | "rtcd-chapter-07-spatial-partitioning"
  | "rtcd-chapter-08-bsp-tree-hierarchies"
  | "rtcd-chapter-09-convexity-methods"
  | "rtcd-chapter-10-gpu-assisted"
  | "rtcd-chapter-11-numerical-robustness"
  | "rtcd-chapter-12-geometrical-robustness"
  | "rtcd-chapter-13-optimization"
  | "rtcd-back-matter"
  | "rtcd-official-final-review"
  | "gep2-official-learning-map"
  | "gep2-front-matter"
  | "gep2-chapter-01-skeletal-skinning-basics"
  | "gep2-chapter-02-animation-playback-slots"
  | "gep2-chapter-03-animation-blending"
  | "gep2-chapter-04-morph-animation-blending"
  | "gep2-chapter-05-ik-characters"
  | "gep2-chapter-06-lighting-rendering-history"
  | "gep2-chapter-07-renderer-interface"
  | "gep2-chapter-08-materials"
  | "gep2-chapter-09-render-pipeline-architecture"
  | "gep2-chapter-10-lighting-materials"
  | "gep2-chapter-11-post-effects"
  | "gep2-chapter-12-shadows"
  | "gep2-chapter-13-multithreading"
  | "gep2-chapter-14-dynamic-buffers-profiler"
  | "gep2-official-final-review"
  | "gsp-official-learning-map"
  | "gsp-01-network-programming-foundations"
  | "gsp-02-multithreading"
  | "gsp-03-efficient-communication-models"
  | "gsp-04-game-data-encryption"
  | "gsp-05-game-database"
  | "gsp-06-game-lobby"
  | "gsp-07-gm-tool"
  | "gsp-08-auto-update"
  | "gsp-official-final-review"
  | "umm-official-learning-map"
  | "umm-01-echo"
  | "umm-02-async-multiplexing"
  | "umm-03-battle-royale"
  | "umm-04-tcp-data-stream"
  | "umm-05-deep-tcp"
  | "umm-06-client-network-module"
  | "umm-07-server-framework"
  | "umm-08-tank-battle-project"
  | "umm-09-ui-module"
  | "umm-10-lobby-rooms"
  | "umm-11-battle-result"
  | "umm-12-battle-sync"
  | "umm-official-final-review"
  | "ucn-official-learning-map"
  | "ucn-01-unity-environment"
  | "ucn-02-hello-simulation"
  | "ucn-03-csharp-language"
  | "ucn-04-graphics-in-unity"
  | "ucn-05-unity-editor"
  | "ucn-06-simulation-architecture"
  | "ucn-07-character-development"
  | "ucn-08-scene-development"
  | "ucn-09-assets-interactions"
  | "ucn-10-ngui-interaction"
  | "ucn-11-cpp-language"
  | "ucn-12-cpp-network-basics"
  | "ucn-13-threading-async-socket"
  | "ucn-14-mysql"
  | "ucn-15-protobuf"
  | "ucn-16-server-topology"
  | "ucn-17-login-server"
  | "ucn-18-gate-server"
  | "ucn-19-center-server"
  | "ucn-20-battle-server"
  | "ucn-21-hla-ai"
  | "ucn-afterword-career-development"
  | "ucn-official-final-review"
  | "mga-official-learning-map"
  | "mga-01-network-basics"
  | "mga-02-io-multiplexing"
  | "mga-03-threads-actor"
  | "mga-04-account-login"
  | "mga-05-performance-object-pool"
  | "mga-06-ecs-framework"
  | "mga-07-mysql"
  | "mga-08-component-programming"
  | "mga-09-app-manager-http"
  | "mga-10-distributed-login-redis"
  | "mga-11-distributed-world-transfer"
  | "mga-12-disconnect-dynamic-system"
  | "mga-official-final-review"
  | "gnc-official-learning-map"
  | "gnc-00-quickstart-network-game-programming"
  | "gnc-01-history-evolution"
  | "gnc-02-what-is-online-game"
  | "gnc-03-online-game-architecture"
  | "gnc-04-cs-mmo-practice"
  | "gnc-05-p2p-mo-practice"
  | "gnc-06-auxiliary-systems"
  | "gnc-07-operations-infrastructure"
  | "gnc-08-development-organization"
  | "gnc-official-final-review"
  | "gsa-official-learning-map"
  | "gsa-01-python-networking"
  | "gsa-02-communication-encryption"
  | "gsa-03-server-practice"
  | "gsa-04-basic-storage"
  | "gsa-05-storage-solutions"
  | "gsa-06-game-server-foundations"
  | "gsa-07-server-interactions"
  | "gsa-08-game-lobby"
  | "gsa-09-realtime-interaction"
  | "gsa-10-ladder-economy"
  | "gsa-11-capacity-client-optimization"
  | "gsa-12-distributed-servers"
  | "gsa-appendix-language-comparison"
  | "gsa-official-final-review"
  | "mgp-official-learning-map"
  | "mgp-01-overview-networked-games"
  | "mgp-02-internet"
  | "mgp-03-berkeley-sockets"
  | "mgp-04-object-serialization"
  | "mgp-05-object-replication"
  | "mgp-06-network-topologies"
  | "mgp-07-latency-jitter-reliability"
  | "mgp-08-improved-latency-handling"
  | "mgp-09-scalability"
  | "mgp-10-security"
  | "mgp-11-real-world-engines"
  | "mgp-12-gamer-services"
  | "mgp-13-cloud-dedicated-servers"
  | "mgp-appendix-modern-cpp"
  | "mgp-official-final-review"
  | "jpg-official-learning-map"
  | "jpg-01-what-is-javascript"
  | "jpg-02-javascript-in-html"
  | "jpg-03-language-basics"
  | "jpg-04-variables-scope-memory"
  | "jpg-05-basic-reference-types"
  | "jpg-06-collection-reference-types"
  | "jpg-07-iterators-generators"
  | "jpg-08-objects-classes-oop"
  | "jpg-09-proxies-reflect"
  | "jpg-10-functions"
  | "jpg-11-promises-async-functions"
  | "jpg-12-browser-object-model"
  | "jpg-13-client-detection"
  | "jpg-14-dom"
  | "jpg-15-dom-extensions"
  | "jpg-16-dom-levels-2-3"
  | "jpg-17-events"
  | "jpg-18-animation-canvas"
  | "jpg-19-form-scripting"
  | "jpg-20-javascript-apis"
  | "jpg-21-error-handling-debugging"
  | "jpg-22-working-with-xml"
  | "jpg-23-json"
  | "jpg-24-network-requests"
  | "jpg-25-client-storage"
  | "jpg-26-modules"
  | "jpg-27-workers"
  | "jpg-28-best-practices"
  | "jpg-appendix-a-es2018-es2019"
  | "jpg-appendix-b-strict-mode"
  | "jpg-appendix-c-libraries-frameworks"
  | "jpg-appendix-d-javascript-tools"
  | "jpg-official-final-review"
  | "vjp-official-learning-map"
  | "vjp-01-introduction"
  | "vjp-02-basic-introduction"
  | "vjp-03-vue-syntax"
  | "vjp-04-vue-options"
  | "vjp-05-built-in-components"
  | "vjp-06-projectization"
  | "vjp-07-online-mall-one"
  | "vjp-08-online-mall-two"
  | "vjp-09-corporate-website"
  | "vjp-10-mobile-news"
  | "vjp-11-svg-drawing-board"
  | "vjp-appendix-a-git"
  | "vjp-appendix-b-npm"
  | "vjp-appendix-c-webpack"
  | "vjp-appendix-d-closures-object-references"
  | "vjp-appendix-e-ecmascript-6"
  | "vjp-official-final-review"
  | "vdi-official-learning-map"
  | "vdi-01-art-of-tradeoffs"
  | "vdi-02-core-elements-framework-design"
  | "vdi-03-vue3-design-thinking"
  | "vdi-04-reactivity-role-implementation"
  | "vdi-05-non-primitive-reactivity"
  | "vdi-06-primitive-reactivity"
  | "vdi-07-renderer-design"
  | "vdi-08-mount-update"
  | "vdi-09-simple-diff"
  | "vdi-10-double-ended-diff"
  | "vdi-11-fast-diff"
  | "vdi-12-component-implementation"
  | "vdi-13-async-functional-components"
  | "vdi-14-built-in-components-modules"
  | "vdi-15-compiler-core-overview"
  | "vdi-16-parser"
  | "vdi-17-compiler-optimization"
  | "vdi-18-isomorphic-rendering"
  | "vdi-official-final-review"
  | "ydk-official-learning-map"
  | "ydk-scope-01-what-is-scope"
  | "ydk-scope-02-lexical-scope"
  | "ydk-scope-03-function-vs-block-scope"
  | "ydk-scope-04-hoisting"
  | "ydk-scope-05-scope-closures"
  | "ydk-scope-appendix-a-dynamic-scope"
  | "ydk-scope-appendix-b-block-scope-polyfill"
  | "ydk-scope-appendix-c-lexical-this"
  | "ydk-this-01-this-or-that"
  | "ydk-this-02-this-all-makes-sense"
  | "ydk-this-03-objects"
  | "ydk-this-04-mixing-class-objects"
  | "ydk-this-05-prototypes"
  | "ydk-this-06-behavior-delegation"
  | "ydk-this-appendix-a-es6-class"
  | "ydk-types-01-types"
  | "ydk-types-02-values"
  | "ydk-types-03-natives"
  | "ydk-types-04-coercion"
  | "ydk-types-05-grammar"
  | "ydk-types-appendix-a-mixed-environment"
  | "ydk-async-01-now-and-later"
  | "ydk-async-02-callbacks"
  | "ydk-async-03-promises"
  | "ydk-async-04-generators"
  | "ydk-async-05-program-performance"
  | "ydk-async-06-benchmarking-tuning"
  | "ydk-async-appendix-a-asynquence"
  | "ydk-async-appendix-b-advanced-patterns"
  | "ydk-up-01-into-programming"
  | "ydk-up-02-into-javascript"
  | "ydk-up-03-into-ydkjs"
  | "ydk-es6-01-now-future"
  | "ydk-es6-02-syntax"
  | "ydk-es6-03-organization"
  | "ydk-es6-04-async-flow-control"
  | "ydk-es6-05-collections"
  | "ydk-es6-06-api-additions"
  | "ydk-es6-07-meta-programming"
  | "ydk-es6-08-beyond-es6"
  | "ydk-official-final-review"
  | "jdg-official-learning-map"
  | "jdg-01-introduction"
  | "jdg-02-lexical-structure"
  | "jdg-03-types-values-variables"
  | "jdg-04-expressions-operators"
  | "jdg-05-statements"
  | "jdg-06-objects"
  | "jdg-07-arrays"
  | "jdg-08-functions"
  | "jdg-09-classes"
  | "jdg-10-modules"
  | "jdg-11-standard-library"
  | "jdg-12-iterators-generators"
  | "jdg-13-asynchronous-javascript"
  | "jdg-14-metaprogramming"
  | "jdg-15-web-browsers"
  | "jdg-16-node"
  | "jdg-17-tools-extensions"
  | "jdg-official-final-review"
  | "jfs-official-learning-map"
  | "jfs-01-javascript-introduction"
  | "jfs-02-variables-expressions-statements"
  | "jfs-03-functions-objects"
  | "jfs-04-object-oriented-programming"
  | "jfs-05-asynchronous-programming"
  | "jfs-06-frontend-overview"
  | "jfs-07-dom-standard"
  | "jfs-08-dom-extensions-bom"
  | "jfs-09-frontend-events"
  | "jfs-10-ajax-programming"
  | "jfs-11-nodejs-overview"
  | "jfs-12-build-web-services"
  | "jfs-13-handle-client-requests"
  | "jfs-14-data-persistence"
  | "jfs-official-final-review"
  | "csw-official-learning-map"
  | "csw-01-worldview-flow"
  | "csw-02-terms-undefined-behavior"
  | "csw-03-flow-elements-sizing"
  | "csw-04-box-dimensions"
  | "csw-05-inline-flow"
  | "csw-06-flow-breaking-protection"
  | "csw-07-stacking-rules"
  | "csw-08-text-processing"
  | "csw-09-decoration"
  | "csw-10-display-visibility"
  | "csw-11-user-interface"
  | "csw-12-writing-directions"
  | "csw-official-final-review"
  | "csec-official-learning-map"
  | "csec-01-introduction"
  | "csec-02-backgrounds-borders"
  | "csec-03-shapes"
  | "csec-04-visual-effects"
  | "csec-05-typography"
  | "csec-06-user-experience"
  | "csec-07-structure-layout"
  | "csec-08-transitions-animations"
  | "csec-official-final-review"
  | "ndg-official-learning-map"
  | "ndg-01-introduction"
  | "ndg-02-repl"
  | "ndg-03-foundations"
  | "ndg-04-modules-npm"
  | "ndg-05-buffer-binary"
  | "ndg-06-filesystem"
  | "ndg-07-tcp-udp"
  | "ndg-08-http-https"
  | "ndg-09-process-child-process"
  | "ndg-10-errors-assertions"
  | "ndg-11-crypto-compression"
  | "ndg-12-other-modules"
  | "ndg-13-database-access"
  | "ndg-14-express-web-apps"
  | "ndg-15-socketio-websocket"
  | "ndg-16-integrated-cases"
  | "ndg-official-final-review"
  | "ndbg-official-learning-map"
  | "ndbg-01-cpu"
  | "ndbg-02-memory"
  | "ndbg-03-code"
  | "ndbg-04-tools"
  | "ndbg-05-logging"
  | "ndbg-06-apm"
  | "ndbg-07-monitoring"
  | "ndbg-08-applications"
  | "ndbg-official-final-review"
  | "dnj-official-learning-map"
  | "dnj-01-node-introduction"
  | "dnj-02-module-mechanism"
  | "dnj-03-async-io"
  | "dnj-04-async-programming"
  | "dnj-05-memory-control"
  | "dnj-06-buffer"
  | "dnj-07-network-programming"
  | "dnj-08-web-application"
  | "dnj-09-processes"
  | "dnj-10-testing"
  | "dnj-11-productization"
  | "dnj-appendix-a-installation"
  | "dnj-appendix-b-debugging"
  | "dnj-appendix-c-coding-style"
  | "dnj-appendix-d-local-npm"
  | "dnj-official-final-review"
  | "feng-official-learning-map"
  | "feng-01-history"
  | "feng-02-scaffolding"
  | "feng-03-build"
  | "feng-04-local-dev-server"
  | "feng-05-deployment"
  | "feng-06-workflow"
  | "feng-07-future"
  | "feng-official-final-review"
  | "hcw-official-learning-map"
  | "hcw-01-three-principles"
  | "hcw-02-build-computer"
  | "hcw-03-manual-assembly"
  | "hcw-04-program-flow"
  | "hcw-05-algorithms"
  | "hcw-06-data-structures"
  | "hcw-07-oop"
  | "hcw-08-database"
  | "hcw-09-tcp-ip"
  | "hcw-10-encryption"
  | "hcw-11-xml"
  | "hcw-12-system-engineering"
  | "hcw-official-final-review"
  | "hpw-official-learning-map"
  | "hpw-01-cpu"
  | "hpw-02-binary"
  | "hpw-03-floating-point"
  | "hpw-04-memory"
  | "hpw-05-memory-disk"
  | "hpw-06-compression"
  | "hpw-07-runtime-environment"
  | "hpw-08-source-executable"
  | "hpw-09-os-applications"
  | "hpw-10-assembly"
  | "hpw-11-hardware-control"
  | "hpw-12-thinking"
  | "hpw-appendix-c"
  | "hpw-official-final-review"
  | "cap-official-learning-map"
  | "cap-01-system-tour"
  | "cap-02-information"
  | "cap-03-machine-level"
  | "cap-04-processor-architecture"
  | "cap-05-optimization"
  | "cap-06-memory-hierarchy"
  | "cap-07-linking"
  | "cap-08-exceptional-control"
  | "cap-09-virtual-memory"
  | "cap-10-system-io"
  | "cap-11-network-programming"
  | "cap-12-concurrent-programming"
  | "cap-appendix-a-error-handling"
  | "cap-official-final-review"
  | "mos-official-learning-map"
  | "mos-01-introduction"
  | "mos-02-processes-threads"
  | "mos-03-memory-management"
  | "mos-04-file-systems"
  | "mos-05-input-output"
  | "mos-06-deadlocks"
  | "mos-07-virtualization-cloud"
  | "mos-08-multiple-processor-systems"
  | "mos-09-security"
  | "mos-10-unix-linux-android"
  | "mos-11-windows-8"
  | "mos-12-os-design"
  | "mos-13-bibliography"
  | "mos-official-final-review"
  | "osc-official-learning-map"
  | "osc-01-introduction"
  | "osc-02-os-structures"
  | "osc-03-processes"
  | "osc-04-threads-concurrency"
  | "osc-05-cpu-scheduling"
  | "osc-06-synchronization-tools"
  | "osc-07-synchronization-examples"
  | "osc-08-deadlocks"
  | "osc-09-main-memory"
  | "osc-10-virtual-memory"
  | "osc-11-mass-storage"
  | "osc-12-io-systems"
  | "osc-13-file-system-interface"
  | "osc-14-file-system-implementation"
  | "osc-15-file-system-internals"
  | "osc-16-security"
  | "osc-17-protection"
  | "osc-18-virtual-machines"
  | "osc-19-network-distributed"
  | "osc-20-linux"
  | "osc-21-windows-10"
  | "osc-official-final-review"
  | "wj-official-learning-map"
  | "wj-01-game-development-landscape"
  | "wj-02-visual-studio"
  | "wj-03-windows-programming"
  | "wj-04-gdi-foundations"
  | "wj-05-gdi-drawing"
  | "wj-06-windows-animation"
  | "wj-07-input-messages"
  | "wj-08-physics-particles"
  | "wj-09-turn-based-game"
  | "wj-10-directx-overview"
  | "wj-11-direct3d-foundations"
  | "wj-12-direct3d-drawing"
  | "wj-13-four-transforms"
  | "wj-14-lighting-materials"
  | "wj-15-directinput"
  | "wj-16-texture-mapping"
  | "wj-17-mesh-loading"
  | "wj-18-alpha-blending"
  | "wj-19-depth-z-buffer"
  | "wj-20-stencil-techniques"
  | "wj-21-game-camera"
  | "wj-22-terrain"
  | "wj-23-skybox"
  | "wj-24-particle-system"
  | "wj-25-multi-model-loading"
  | "wj-26-game-engines"
  | "wj-appendix-a-reading-guide"
  | "wj-official-final-review"
  | "lop-official-learning-map"
  | "lop-01-recognizing-linux"
  | "lop-02-using-linux"
  | "lop-03-user-management"
  | "lop-04-software-management"
  | "lop-05-programming-environment"
  | "lop-06-network-configuration"
  | "lop-07-shell-programming"
  | "lop-08-regular-expressions"
  | "lop-09-tetris-project"
  | "lop-official-final-review"
  | "mfc-official-learning-map"
  | "mfc-00-reading-guide"
  | "mfc-01-win32-program-concepts"
  | "mfc-02-cpp-essential-properties"
  | "mfc-03-six-key-techniques-simulation"
  | "mfc-04-visual-cpp-ide"
  | "mfc-05-application-framework-overview"
  | "mfc-06-program-lifecycle"
  | "mfc-07-framework-skeleton"
  | "mfc-08-document-view"
  | "mfc-09-message-map-command-routing"
  | "mfc-10-dialogs"
  | "mfc-11-view-and-redraw"
  | "mfc-12-print-preview"
  | "mfc-13-multiple-documents-views"
  | "mfc-14-multithreading"
  | "mfc-15-custom-appwizard"
  | "mfc-16-components-activex"
  | "mfc-appendix-a-learning-roadmap"
  | "mfc-appendix-b-scribble-step5-source"
  | "mfc-appendix-c-sample-catalog"
  | "mfc-appendix-d-dbwin"
  | "mfc-official-final-review"
  | "wkp-official-learning-map"
  | "wkp-01-windows-internals-overview"
  | "wkp-02-getting-started-kernel-development"
  | "wkp-03-kernel-programming-basics"
  | "wkp-04-driver-start-to-finish"
  | "wkp-05-debugging"
  | "wkp-06-kernel-mechanisms"
  | "wkp-07-io-request-packet"
  | "wkp-08-process-thread-notifications"
  | "wkp-09-object-registry-notifications"
  | "wkp-10-file-system-minifilters"
  | "wkp-11-miscellaneous-topics"
  | "wkp-official-final-review"
  | "lke-official-learning-map"
  | "lke-01-kernel-intro"
  | "lke-02-resource-management"
  | "lke-03-filesystems"
  | "lke-04-networking"
  | "lke-05-virtualization"
  | "lke-06-power-saving"
  | "lke-07-debugging"
  | "lke-08-profiling-tracing"
  | "lke-official-final-review"
  | "lkd-official-learning-map"
  | "lkd-01-linux-kernel-intro"
  | "lkd-02-getting-started"
  | "lkd-03-process-management"
  | "lkd-04-process-scheduling"
  | "lkd-05-system-calls"
  | "lkd-06-kernel-data-structures"
  | "lkd-07-interrupts"
  | "lkd-08-bottom-halves"
  | "lkd-09-sync-intro"
  | "lkd-10-sync-methods"
  | "lkd-11-timers-time"
  | "lkd-12-memory-management"
  | "lkd-13-vfs"
  | "lkd-14-block-io"
  | "lkd-15-process-address-space"
  | "lkd-16-page-cache-writeback"
  | "lkd-17-devices-modules"
  | "lkd-18-debugging"
  | "lkd-19-portability"
  | "lkd-20-patches-community"
  | "lkd-official-final-review"
  | "uap-official-learning-map"
  | "uap-unix-basics"
  | "uap-standards-implementations"
  | "uap-file-io"
  | "uap-files-directories"
  | "uap-standard-io"
  | "uap-system-data-information"
  | "uap-process-environment"
  | "uap-process-control"
  | "uap-process-relationships"
  | "uap-signals"
  | "uap-threads"
  | "uap-thread-control"
  | "uap-daemon-processes"
  | "uap-advanced-io"
  | "uap-interprocess-communication"
  | "uap-network-ipc-sockets"
  | "uap-advanced-ipc"
  | "uap-terminal-io"
  | "uap-pseudo-terminals"
  | "uap-database-library"
  | "uap-network-printer"
  | "uap-appendix-a-function-prototypes"
  | "uap-appendix-b-source-code"
  | "uap-appendix-c-exercise-solutions"
  | "uap-official-final-review"
  | "hfj-3e-official-learning-map"
  | "hfj-3e-intro"
  | "hfj-3e-01-breaking-surface"
  | "hfj-3e-02-classes-objects"
  | "hfj-3e-03-primitives-references"
  | "hfj-3e-04-methods-instance-variables"
  | "hfj-3e-05-writing-program"
  | "hfj-3e-06-java-api"
  | "hfj-3e-07-inheritance-polymorphism"
  | "hfj-3e-08-interfaces-abstract-classes"
  | "hfj-3e-09-constructors-gc"
  | "hfj-3e-10-numbers-statics"
  | "hfj-3e-11-collections-generics"
  | "hfj-3e-12-lambdas-streams"
  | "hfj-3e-13-exceptions"
  | "hfj-3e-14-gui"
  | "hfj-3e-15-swing"
  | "hfj-3e-16-serialization-io"
  | "hfj-3e-17-networking-threads"
  | "hfj-3e-18-concurrency-issues"
  | "hfj-3e-appendix-a-final-code-kitchen"
  | "hfj-3e-appendix-b-top-ten-topics"
  | "hfj-3e-official-final-review"
  | "jct-14e-official-learning-map"
  | "jct-14e-v1-01-introduction-java"
  | "jct-14e-v1-02-programming-environment"
  | "jct-14e-v1-03-fundamental-structures"
  | "jct-14e-v1-04-objects-classes"
  | "jct-14e-v1-05-inheritance"
  | "jct-14e-v1-06-interfaces-lambdas-inner"
  | "jct-14e-v1-07-exceptions-assertions-logging"
  | "jct-14e-v1-08-generic-programming"
  | "jct-14e-v1-09-collections"
  | "jct-14e-v1-10-concurrency"
  | "jct-14e-v1-11-annotations"
  | "jct-14e-v1-12-modules"
  | "jct-14e-v2-01-streams"
  | "jct-14e-v2-02-input-output"
  | "jct-14e-v2-03-xml"
  | "jct-14e-v2-04-networking"
  | "jct-14e-v2-05-database"
  | "jct-14e-v2-06-date-time"
  | "jct-14e-v2-07-internationalization"
  | "jct-14e-v2-08-compiling-scripting"
  | "jct-14e-v2-09-security"
  | "jct-14e-v2-10-gui-programming"
  | "jct-14e-v2-11-swing-components"
  | "jct-14e-v2-12-advanced-swing-graphics"
  | "jct-14e-v2-13-foreign-functions-memory"
  | "jct-14e-official-final-review"
  | "ejv-3e-official-learning-map"
  | "ejv-3e-01-introduction"
  | "ejv-3e-02-creating-destroying-objects"
  | "ejv-3e-03-common-object-methods"
  | "ejv-3e-04-classes-interfaces"
  | "ejv-3e-05-generics"
  | "ejv-3e-06-enums-annotations"
  | "ejv-3e-07-lambdas-streams"
  | "ejv-3e-08-methods"
  | "ejv-3e-09-general-programming"
  | "ejv-3e-10-exceptions"
  | "ejv-3e-11-concurrency"
  | "ejv-3e-12-serialization"
  | "ejv-3e-second-edition-crosswalk"
  | "ejv-3e-references"
  | "ejv-3e-index"
  | "ejv-3e-official-final-review"
  | "sia-learning-map"
  | "sia-spring-core"
  | "sia-bean-wiring"
  | "sia-aop"
  | "sia-spring-mvc"
  | "sia-data-jpa"
  | "sia-spring-security"
  | "sia-spring-boot"
  | "sia-spring-cloud"
  | "sia-final-review"
  | "sia-6e-official-learning-map"
  | "sia-6e-part-1-foundational-spring"
  | "sia-6e-01-getting-started"
  | "sia-6e-02-developing-web-applications"
  | "sia-6e-03-working-with-data"
  | "sia-6e-04-nonrelational-data"
  | "sia-6e-05-securing-spring"
  | "sia-6e-06-configuration-properties"
  | "sia-6e-part-2-integrated-spring"
  | "sia-6e-07-creating-rest-services"
  | "sia-6e-08-securing-rest"
  | "sia-6e-09-asynchronous-messaging"
  | "sia-6e-10-integrating-spring"
  | "sia-6e-part-3-reactive-spring"
  | "sia-6e-11-introducing-reactor"
  | "sia-6e-12-reactive-apis"
  | "sia-6e-13-reactive-persistence"
  | "sia-6e-14-working-with-rsocket"
  | "sia-6e-part-4-deployed-spring"
  | "sia-6e-15-spring-boot-actuator"
  | "sia-6e-16-administering-spring"
  | "sia-6e-17-monitoring-with-jmx"
  | "sia-6e-18-deploying-spring"
  | "sia-6e-appendix-bootstrapping"
  | "sia-6e-official-final-review"
  | "jvt-2e-official-learning-map"
  | "jvt-2e-part-1-foundation"
  | "jvt-2e-01-starting-to-know-apps"
  | "jvt-2e-02-debugging-techniques"
  | "jvt-2e-03-advanced-debugging"
  | "jvt-2e-04-logs-auditing"
  | "jvt-2e-part-2-deep-diagnosing"
  | "jvt-2e-05-resource-profiling"
  | "jvt-2e-06-hidden-profiling"
  | "jvt-2e-07-thread-locks"
  | "jvt-2e-08-deadlocks-thread-dumps"
  | "jvt-2e-part-3-memory"
  | "jvt-2e-09-memory-profiling"
  | "jvt-2e-10-heap-dumps"
  | "jvt-2e-11-gc-logs"
  | "jvt-2e-part-4-large-systems"
  | "jvt-2e-12-system-failures"
  | "jvt-2e-13-consistency-transactions"
  | "jvt-2e-appendices"
  | "jvt-2e-appendix-a-tools"
  | "jvt-2e-appendix-b-opening-project"
  | "jvt-2e-appendix-c-reading"
  | "jvt-2e-appendix-d-threads"
  | "jvt-2e-appendix-e-memory"
  | "jvt-2e-appendix-f-references"
  | "jvt-2e-official-final-review"
  | "jvt-learning-map"
  | "jvt-jvm-architecture"
  | "jvt-memory-model"
  | "jvt-garbage-collection"
  | "jvt-gc-tuning"
  | "jvt-jvm-tools"
  | "jvt-thread-analysis"
  | "jvt-memory-leak"
  | "jvt-cpu-performance"
  | "jvt-final-review"
  | "duj3-official-learning-map"
  | "duj3-part-1-approaching-java"
  | "duj3-01-approaching-java"
  | "duj3-part-2-memory-management"
  | "duj3-02-memory-areas"
  | "duj3-03-gc-allocation"
  | "duj3-04-monitoring-tools"
  | "duj3-05-tuning-cases"
  | "duj3-part-3-execution-subsystem"
  | "duj3-06-class-file"
  | "duj3-07-class-loading"
  | "duj3-08-bytecode-engine"
  | "duj3-09-loading-execution-cases"
  | "duj3-part-4-compilation"
  | "duj3-10-frontend-compiler"
  | "duj3-11-backend-compiler"
  | "duj3-part-5-concurrency"
  | "duj3-12-memory-model-threads"
  | "duj3-13-thread-safety-locks"
  | "duj3-appendix-a-build-openjdk6"
  | "duj3-appendix-b-java-future-2013"
  | "duj3-appendix-c-bytecode-table"
  | "duj3-appendix-d-oql"
  | "duj3-appendix-e-jdk-history"
  | "duj3-official-final-review"
  | "duj-learning-map"
  | "duj-memory-region"
  | "duj-gc-algorithms"
  | "duj-class-loader"
  | "duj-execution-engine"
  | "duj-compile-optimize"
  | "duj-memory-model"
  | "duj-lock-optimize"
  | "duj-practice-tuning"
  | "duj-final-review"
  | "jg1b-official-learning-map"
  | "jg1b-01-gc-overview"
  | "jg1b-02-g1-basics"
  | "jg1b-03-object-allocation"
  | "jg1b-04-refine-thread"
  | "jg1b-05-young-gc"
  | "jg1b-06-mixed-gc"
  | "jg1b-07-full-gc"
  | "jg1b-08-reference-processing"
  | "jg1b-09-string-dedup"
  | "jg1b-10-safepoints"
  | "jg1b-11-collector-choice"
  | "jg1b-12-next-collectors"
  | "jg1b-appendix-a-debug-jvm"
  | "jg1b-appendix-b-nmt"
  | "jg1b-appendix-c-cpp"
  | "jg1b-official-final-review"
  | "jg1-learning-map"
  | "jg1-g1-overview"
  | "jg1-region-management"
  | "jg1-remembered-set"
  | "jg1-gc-cycle"
  | "jg1-young-gc"
  | "jg1-mixed-gc"
  | "jg1-full-gc"
  | "jg1-g1-tuning-practice"
  | "jg1-final-review"
  | "gch1-official-learning-map"
  | "gch1-01-introduction"
  | "gch1-02-mark-sweep"
  | "gch1-03-mark-compact"
  | "gch1-04-copying"
  | "gch1-05-reference-counting"
  | "gch1-06-comparing-collectors"
  | "gch1-07-allocation"
  | "gch1-08-partitioning"
  | "gch1-09-generational"
  | "gch1-10-other-partitioned"
  | "gch1-11-runtime-interface"
  | "gch1-12-language-concerns"
  | "gch1-13-concurrency-preliminaries"
  | "gch1-14-parallel"
  | "gch1-15-concurrent"
  | "gch1-16-concurrent-mark-sweep"
  | "gch1-17-concurrent-copy-compact"
  | "gch1-18-concurrent-reference-counting"
  | "gch1-19-realtime"
  | "gch1-glossary"
  | "gch1-bibliography"
  | "gch1-index"
  | "gch1-official-final-review"
  | "gch-learning-map"
  | "gch-gc-overview"
  | "gch-mark-sweep"
  | "gch-copying-collection"
  | "gch-mark-compact"
  | "gch-generational"
  | "gch-concurrent-gc"
  | "gch-realtime-gc"
  | "gch-modern-gc"
  | "gch-final-review"
  | "bnr4-official-learning-map"
  | "bnr4-01-first-app"
  | "bnr4-02-android-mvc"
  | "bnr4-03-activity-lifecycle"
  | "bnr4-04-ui-state-persistence"
  | "bnr4-05-debugging"
  | "bnr4-06-second-activity"
  | "bnr4-07-sdk-compatibility"
  | "bnr4-08-ui-fragments"
  | "bnr4-09-recyclerview"
  | "bnr4-10-layouts-widgets"
  | "bnr4-11-room-database"
  | "bnr4-12-fragment-navigation"
  | "bnr4-13-dialogs"
  | "bnr4-14-app-bar"
  | "bnr4-15-implicit-intents"
  | "bnr4-16-taking-pictures"
  | "bnr4-17-localization"
  | "bnr4-18-accessibility"
  | "bnr4-19-data-binding-mvvm"
  | "bnr4-20-audio-unit-testing"
  | "bnr4-21-styles-themes"
  | "bnr4-22-xml-drawables"
  | "bnr4-23-more-intents-tasks"
  | "bnr4-24-http-background"
  | "bnr4-25-looper-handler"
  | "bnr4-26-search"
  | "bnr4-27-workmanager"
  | "bnr4-28-broadcast-intents"
  | "bnr4-29-webview"
  | "bnr4-30-custom-views-touch"
  | "bnr4-31-property-animation"
  | "bnr4-32-afterword"
  | "bnr4-official-final-review"
  | "fla3-official-learning-map"
  | "fla3-01-first-code"
  | "fla3-02-kotlin"
  | "fla3-03-activity"
  | "fla3-04-ui"
  | "fla3-05-fragment"
  | "fla3-06-broadcast"
  | "fla3-07-persistence"
  | "fla3-08-content-provider"
  | "fla3-09-multimedia"
  | "fla3-10-service"
  | "fla3-11-network"
  | "fla3-12-material"
  | "fla3-13-jetpack"
  | "fla3-14-advanced"
  | "fla3-15-weather-app"
  | "fla3-16-permissionx"
  | "fla3-official-final-review"
  | "fla-learning-map"
  | "fla-android-basics"
  | "fla-ui-layout"
  | "fla-activity"
  | "fla-data-storage"
  | "fla-broadcast"
  | "fla-service"
  | "fla-network"
  | "fla-advanced-features"
  | "fla-final-review"
  | "cra4-official-learning-map"
  | "cra4-01-environment"
  | "cra4-02-ui-programming"
  | "cra4-03-event-mechanism"
  | "cra4-04-activity-fragment"
  | "cra4-05-intent-filter"
  | "cra4-06-application-resources"
  | "cra4-07-graphics-images"
  | "cra4-08-storage-io"
  | "cra4-09-content-provider"
  | "cra4-10-service-broadcast"
  | "cra4-11-multimedia"
  | "cra4-12-opengl-3d"
  | "cra4-13-network"
  | "cra4-14-system-desktop"
  | "cra4-15-sensors"
  | "cra4-16-gps"
  | "cra4-17-amap"
  | "cra4-18-metal-slug"
  | "cra4-19-auction-system"
  | "cra4-official-final-review"
  | "cra-learning-map"
  | "cra-android-quickstart"
  | "cra-ui-components"
  | "cra-event-handling"
  | "cra-advanced-ui"
  | "cra-data-persistence"
  | "cra-service-broadcast"
  | "cra-multimedia"
  | "cra-web-network"
  | "cra-final-review"
  | "kdg1-official-learning-map"
  | "kdg1-introducing-kotlin"
  | "kdg1-01-first-application"
  | "kdg1-02-variables-types"
  | "kdg1-03-conditionals"
  | "kdg1-04-functions"
  | "kdg1-05-anonymous-functions"
  | "kdg1-06-null-safety-exceptions"
  | "kdg1-07-strings"
  | "kdg1-08-numbers"
  | "kdg1-09-standard-functions"
  | "kdg1-10-lists-sets"
  | "kdg1-11-maps"
  | "kdg1-12-defining-classes"
  | "kdg1-13-initialization"
  | "kdg1-14-inheritance"
  | "kdg1-15-objects"
  | "kdg1-16-interfaces-abstract-classes"
  | "kdg1-17-generics"
  | "kdg1-18-extensions"
  | "kdg1-19-functional-programming"
  | "kdg1-20-java-interoperability"
  | "kdg1-21-first-android-application"
  | "kdg1-22-coroutines-introduction"
  | "kdg1-23-afterword"
  | "kdg1-appendix-a-more-challenges"
  | "kdg1-glossary"
  | "kdg1-index"
  | "kdg1-official-final-review"
  | "adae15-official-learning-map"
  | "adae15-01-activity-lifecycle-launch-mode"
  | "adae15-02-ipc"
  | "adae15-03-view-event-system"
  | "adae15-04-view-working-principles"
  | "adae15-05-remoteviews"
  | "adae15-06-drawable"
  | "adae15-07-animation"
  | "adae15-08-window-windowmanager"
  | "adae15-09-four-components"
  | "adae15-10-message-mechanism"
  | "adae15-11-threads-pools"
  | "adae15-12-bitmap-cache"
  | "adae15-13-integrated-techniques"
  | "adae15-14-jni-ndk"
  | "adae15-15-performance-optimization"
  | "adae15-official-final-review"
  | "kia1-official-learning-map"
  | "kia1-part1-kotlin-introduction"
  | "kia1-01-kotlin-what-and-why"
  | "kia1-02-kotlin-basics"
  | "kia1-03-defining-calling-functions"
  | "kia1-04-classes-objects-interfaces"
  | "kia1-05-programming-with-lambdas"
  | "kia1-06-kotlin-type-system"
  | "kia1-part2-embracing-kotlin"
  | "kia1-07-operator-overloading-conventions"
  | "kia1-08-higher-order-functions"
  | "kia1-09-generics"
  | "kia1-10-annotations-reflection"
  | "kia1-11-dsl-construction"
  | "kia1-appendix-a-building-projects"
  | "kia1-appendix-b-documenting-code"
  | "kia1-appendix-c-kotlin-ecosystem"
  | "kia1-index-figures-tables-listings"
  | "kia1-official-final-review"
  | "aca18-official-learning-map"
  | "aca18-01-component-foundations"
  | "aca18-02-component-programming"
  | "aca18-03-component-optimization"
  | "aca18-04-component-compilation"
  | "aca18-05-component-distribution"
  | "aca18-06-component-circulation"
  | "aca18-07-architecture-templates"
  | "aca18-08-architecture-evolution"
  | "aca18-appendix-a-thinking-architecture"
  | "aca18-official-final-review"
  | "apo12-official-learning-map"
  | "apo12-01-optimizing-java-code"
  | "apo12-02-getting-started-ndk"
  | "apo12-03-advanced-ndk"
  | "apo12-04-using-memory-efficiently"
  | "apo12-05-multithreading-synchronization"
  | "apo12-06-benchmarking-profiling"
  | "apo12-07-maximizing-battery-life"
  | "apo12-08-graphics"
  | "apo12-09-renderscript"
  | "apo12-official-final-review"
  | "jpc-22-official-learning-map"
  | "jpc-22-01-new-android-ui"
  | "jpc-22-02-common-ui-components"
  | "jpc-22-03-custom-ui"
  | "jpc-22-04-state-recomposition"
  | "jpc-22-05-rendering-pipeline"
  | "jpc-22-06-animation"
  | "jpc-22-07-gestures"
  | "jpc-22-08-navigation-hilt"
  | "jpc-22-09-third-party"
  | "jpc-22-10-tetris"
  | "jpc-22-11-chatty"
  | "jpc-22-official-final-review"
  | "aal-17-official-learning-map"
  | "aal-17-01-android-features"
  | "aal-17-02-material-design"
  | "aal-17-03-view-custom-view"
  | "aal-17-04-multithreading"
  | "aal-17-05-network-frameworks"
  | "aal-17-06-design-patterns"
  | "aal-17-07-event-bus"
  | "aal-17-08-rxjava"
  | "aal-17-09-annotations-di"
  | "aal-17-10-app-architecture"
  | "aal-17-11-system-mediaplayer"
  | "aal-17-official-final-review"
  | "dak-14-official-learning-map"
  | "dak-14-01-system-introduction"
  | "dak-14-02-source-build"
  | "dak-14-03-build-system"
  | "dak-14-04-os-foundations"
  | "dak-14-05-process-thread"
  | "dak-14-06-binder"
  | "dak-14-07-boot"
  | "dak-14-08-ams"
  | "dak-14-09-surfaceflinger"
  | "dak-14-10-wms"
  | "dak-14-11-view"
  | "dak-14-12-input"
  | "dak-14-13-audio"
  | "dak-14-14-intent"
  | "dak-14-15-resources"
  | "dak-14-16-encoding"
  | "dak-14-17-opengl"
  | "dak-14-18-systemui"
  | "dak-14-19-widget"
  | "dak-14-20-apk-build"
  | "dak-14-21-git"
  | "dak-14-22-debug-tools"
  | "dak-14-official-final-review"
  | "dav-series-official-learning-map"
  | "dav-v1-01-preparation"
  | "dav-v1-02-jni"
  | "dav-v1-03-init"
  | "dav-v1-04-zygote"
  | "dav-v1-05-common-classes"
  | "dav-v1-06-binder-native"
  | "dav-v1-07-audio-native"
  | "dav-v1-08-surface"
  | "dav-v1-09-vold-rild"
  | "dav-v1-10-media-scanner"
  | "dav-v2-01-source-environment"
  | "dav-v2-02-java-binder-messagequeue"
  | "dav-v2-03-system-server"
  | "dav-v2-04-package-manager-service"
  | "dav-v2-05-power-manager-service"
  | "dav-v2-06-activity-manager-service"
  | "dav-v2-07-content-provider"
  | "dav-v2-08-content-account-sync"
  | "dav-v3-01-development-environment"
  | "dav-v3-02-java-binder-messagequeue"
  | "dav-v3-03-audio-service"
  | "dav-v3-04-window-manager-service"
  | "dav-v3-05-input-system"
  | "dav-v3-06-view-system"
  | "dav-v3-07-system-ui"
  | "dav-v3-08-wallpaper"
  | "dav-series-official-final-review"
  | "mse-official-learning-map"
  | "mse-ch01-database-overview"
  | "mse-ch02-install-configuration"
  | "mse-ch03-database-operations"
  | "mse-ch04-engines-data-types"
  | "mse-ch05-table-operations"
  | "mse-ch06-indexes"
  | "mse-ch07-views"
  | "mse-ch08-triggers"
  | "mse-ch09-data-manipulation"
  | "mse-ch10-single-table-query"
  | "mse-ch11-multi-table-query"
  | "mse-ch12-operators"
  | "mse-ch13-functions"
  | "mse-ch14-routines"
  | "mse-ch15-transactions"
  | "mse-ch16-security"
  | "mse-ch17-logs"
  | "mse-ch18-maintenance-performance"
  | "mse-ch19-java-bookstore"
  | "mse-ch20-php-exam-system"
  | "mse-official-final-review"
  | "sqt-official-learning-map"
  | "sqt-lesson01-understanding-sql"
  | "sqt-lesson02-retrieving-data"
  | "sqt-lesson03-sorting-data"
  | "sqt-lesson04-filtering-data"
  | "sqt-lesson05-advanced-filtering"
  | "sqt-lesson06-wildcards"
  | "sqt-lesson07-calculated-fields"
  | "sqt-lesson08-functions"
  | "sqt-lesson09-summarizing-data"
  | "sqt-lesson10-grouping-data"
  | "sqt-lesson11-subqueries"
  | "sqt-lesson12-joining-tables"
  | "sqt-lesson13-advanced-joins"
  | "sqt-lesson14-combining-queries"
  | "sqt-lesson15-inserting-data"
  | "sqt-lesson16-updating-deleting"
  | "sqt-lesson17-tables"
  | "sqt-lesson18-views"
  | "sqt-lesson19-stored-procedures"
  | "sqt-lesson20-transactions"
  | "sqt-lesson21-cursors"
  | "sqt-lesson22-advanced-features"
  | "sqt-official-final-review"
  | "dsc-official-learning-map"
  | "dsc-ch01-introduction"
  | "dsc-ch02-relational-model"
  | "dsc-ch03-introduction-to-sql"
  | "dsc-ch04-intermediate-sql"
  | "dsc-ch05-advanced-sql"
  | "dsc-ch06-er-design"
  | "dsc-ch07-relational-design"
  | "dsc-ch08-complex-data-types"
  | "dsc-ch09-application-development"
  | "dsc-ch10-big-data"
  | "dsc-ch11-data-analytics"
  | "dsc-ch12-physical-storage"
  | "dsc-ch13-storage-structures"
  | "dsc-ch14-indexing"
  | "dsc-ch15-query-processing"
  | "dsc-ch16-query-optimization"
  | "dsc-ch17-transactions"
  | "dsc-ch18-concurrency-control"
  | "dsc-ch19-recovery"
  | "dsc-ch20-architectures"
  | "dsc-ch21-parallel-distributed-storage"
  | "dsc-ch22-parallel-distributed-query"
  | "dsc-ch23-distributed-transactions"
  | "dsc-ch24-advanced-indexing"
  | "dsc-ch25-advanced-app-development"
  | "dsc-ch26-blockchain-databases"
  | "dsc-ch27-formal-query-languages"
  | "dsc-ch28-advanced-relational-design"
  | "dsc-ch29-object-based-databases"
  | "dsc-ch30-xml"
  | "dsc-ch31-information-retrieval"
  | "dsc-ch32-postgresql"
  | "dsc-appendix-a-university-schema"
  | "dsc-official-final-review"
  | "hpm4-official-learning-map"
  | "hpm4-ch01-mysql-architecture"
  | "hpm4-ch02-reliability-monitoring"
  | "hpm4-ch03-performance-schema"
  | "hpm4-ch04-os-hardware"
  | "hpm4-ch05-server-settings"
  | "hpm4-ch06-schema-design"
  | "hpm4-ch07-indexing"
  | "hpm4-ch08-query-optimization"
  | "hpm4-ch09-replication"
  | "hpm4-ch10-backup-recovery"
  | "hpm4-ch11-scaling"
  | "hpm4-ch12-mysql-cloud"
  | "hpm4-ch13-compliance"
  | "hpm4-appendix-a-upgrading"
  | "hpm4-appendix-b-kubernetes"
  | "hpm4-official-final-review"
  | "ddi-official-learning-map"
  | "ddi-01-reliable-scalable-maintainable-applications"
  | "ddi-02-data-models-query-languages"
  | "ddi-03-storage-retrieval"
  | "ddi-04-encoding-evolution"
  | "ddi-05-replication"
  | "ddi-06-partitioning"
  | "ddi-07-transactions"
  | "ddi-08-trouble-distributed-systems"
  | "ddi-09-consistency-consensus"
  | "ddi-10-batch-processing"
  | "ddi-11-stream-processing"
  | "ddi-12-future-data-systems"
  | "ddi-glossary"
  | "ddi-official-final-review"
  | "rdi-official-learning-map"
  | "rdi-01-introduction"
  | "rdi-02-simple-dynamic-string"
  | "rdi-03-linked-list"
  | "rdi-04-dictionary"
  | "rdi-05-skiplist"
  | "rdi-06-integer-set"
  | "rdi-07-ziplist"
  | "rdi-08-object"
  | "rdi-09-database"
  | "rdi-10-rdb-persistence"
  | "rdi-11-aof-persistence"
  | "rdi-12-event"
  | "rdi-13-client"
  | "rdi-14-server"
  | "rdi-15-replication"
  | "rdi-16-sentinel"
  | "rdi-17-cluster"
  | "rdi-18-pubsub"
  | "rdi-19-transaction"
  | "rdi-20-lua"
  | "rdi-21-sort"
  | "rdi-22-bit-array"
  | "rdi-23-slow-log"
  | "rdi-24-monitor"
  | "rdi-official-final-review"
  | "kfk-official-learning-map"
  | "kfk-01-meet-kafka"
  | "kfk-02-installing-kafka"
  | "kfk-03-kafka-producers"
  | "kfk-04-kafka-consumers"
  | "kfk-05-programmatic-administration"
  | "kfk-06-kafka-internals"
  | "kfk-07-reliable-data-delivery"
  | "kfk-08-exactly-once-semantics"
  | "kfk-09-building-data-pipelines"
  | "kfk-10-cross-cluster-mirroring"
  | "kfk-11-securing-kafka"
  | "kfk-12-administering-kafka"
  | "kfk-13-monitoring-kafka"
  | "kfk-14-stream-processing"
  | "kfk-appendix-a-installation"
  | "kfk-appendix-b-tools"
  | "kfk-official-final-review"
  | "rmq-official-learning-map"
  | "rmq-01-pulling-rabbit-out-of-hat"
  | "rmq-02-understanding-messaging"
  | "rmq-03-running-administering-rabbit"
  | "rmq-04-coding-patterns"
  | "rmq-05-clustering-failure"
  | "rmq-06-surviving-failure"
  | "rmq-07-warrens-shovels"
  | "rmq-08-web-administration"
  | "rmq-09-rest-api"
  | "rmq-10-monitoring"
  | "rmq-11-performance-security"
  | "rmq-12-extending-rabbitmq"
  | "rmq-appendix-a-java-dotnet"
  | "rmq-appendix-b-online-resources"
  | "rmq-appendix-c-windows-installation"
  | "rmq-official-final-review"
  | "kga-official-learning-map"
  | "kga-01-overview"
  | "kga-02-nginx"
  | "kga-03-lua"
  | "kga-04-openresty"
  | "kga-05-config-deployment"
  | "kga-06-cli"
  | "kga-07-proxy-auth"
  | "kga-08-load-balancing-health"
  | "kga-09-plugins"
  | "kga-10-logging"
  | "kga-11-operations"
  | "kga-12-security-ha"
  | "kga-13-microservices-devops"
  | "kga-14-kubernetes"
  | "kga-15-kuma"
  | "kga-16-serverless"
  | "kga-appendix-a-docker"
  | "kga-appendix-b-konga"
  | "kga-appendix-c-database"
  | "kga-appendix-d-admin-api"
  | "kga-official-final-review"
  | "k8s-official-learning-map"
  | "k8s-01-introduction"
  | "k8s-02-docker-first-app"
  | "k8s-03-pods"
  | "k8s-04-replication-controllers"
  | "k8s-05-services"
  | "k8s-06-volumes"
  | "k8s-07-configmaps-secrets"
  | "k8s-08-downward-api"
  | "k8s-09-deployments"
  | "k8s-10-statefulsets"
  | "k8s-11-internals"
  | "k8s-12-api-security"
  | "k8s-13-node-network-security"
  | "k8s-14-resources"
  | "k8s-15-autoscaling"
  | "k8s-16-scheduling"
  | "k8s-17-best-practices"
  | "k8s-18-extension"
  | "k8s-appendix-a-kubectl-multicluster"
  | "k8s-appendix-b-kubeadm"
  | "k8s-appendix-c-runtimes"
  | "k8s-appendix-d-federation"
  | "k8s-official-final-review"
  | "pha-official-learning-map"
  | "pha-01-architecture-evolution"
  | "pha-02-remote-services"
  | "pha-03-transactions"
  | "pha-04-diversion-system"
  | "pha-05-security"
  | "pha-06-consensus"
  | "pha-07-library-to-service"
  | "pha-08-traffic-governance"
  | "pha-09-reliable-communication"
  | "pha-10-observability"
  | "pha-11-containers"
  | "pha-12-container-network"
  | "pha-13-persistent-storage"
  | "pha-14-resource-scheduling"
  | "pha-15-service-mesh"
  | "pha-16-forward-microservices"
  | "pha-appendix-a-projects"
  | "pha-appendix-b-kubernetes"
  | "pha-official-final-review"
  | "msp-official-learning-map"
  | "msp-01-escaping-monolithic-hell"
  | "msp-02-decomposition-strategies"
  | "msp-03-interprocess-communication"
  | "msp-04-managing-transactions-with-sagas"
  | "msp-05-designing-business-logic"
  | "msp-06-event-sourcing"
  | "msp-07-implementing-queries"
  | "msp-08-external-api-patterns"
  | "msp-09-testing-part-1"
  | "msp-10-testing-part-2"
  | "msp-11-production-ready-services"
  | "msp-12-deploying-microservices"
  | "msp-13-refactoring-to-microservices"
  | "msp-official-final-review"
  | "ilh-official-learning-map"
  | "ilh-01-web-network-foundations"
  | "ilh-02-simple-http-protocol"
  | "ilh-03-http-message-information"
  | "ilh-04-http-status-codes"
  | "ilh-05-web-servers-cooperation"
  | "ilh-06-http-headers"
  | "ilh-07-https-security"
  | "ilh-08-user-authentication"
  | "ilh-09-http-extensions"
  | "ilh-10-web-content-technologies"
  | "ilh-11-web-attack-techniques"
  | "ilh-official-final-review"
  | "isn-official-learning-map"
  | "isn-00-book-usage"
  | "isn-01-physical-design"
  | "isn-02-logical-design"
  | "isn-03-security-load-balancing"
  | "isn-04-high-availability"
  | "isn-05-management-design"
  | "isn-official-final-review"
  | "cnt8-official-learning-map"
  | "cnt8-01-internet"
  | "cnt8-02-application"
  | "cnt8-03-transport"
  | "cnt8-04-data-plane"
  | "cnt8-05-control-plane"
  | "cnt8-06-link-lans"
  | "cnt8-07-wireless-mobile"
  | "cnt8-08-security"
  | "cnt8-official-final-review"
  | "hdg1-official-learning-map"
  | "hdg1-part-1"
  | "hdg1-01"
  | "hdg1-02"
  | "hdg1-03"
  | "hdg1-04"
  | "hdg1-part-2"
  | "hdg1-05"
  | "hdg1-06"
  | "hdg1-07"
  | "hdg1-08"
  | "hdg1-09"
  | "hdg1-10"
  | "hdg1-part-3"
  | "hdg1-11"
  | "hdg1-12"
  | "hdg1-13"
  | "hdg1-14"
  | "hdg1-part-4"
  | "hdg1-15"
  | "hdg1-16"
  | "hdg1-17"
  | "hdg1-part-5"
  | "hdg1-18"
  | "hdg1-19"
  | "hdg1-20"
  | "hdg1-21"
  | "hdg1-part-6"
  | "hdg1-appendix-a"
  | "hdg1-appendix-b"
  | "hdg1-appendix-c"
  | "hdg1-appendix-d"
  | "hdg1-appendix-e"
  | "hdg1-appendix-f"
  | "hdg1-appendix-g"
  | "hdg1-appendix-h"
  | "hdg1-index"
  | "hdg1-official-final-review"
  | "ppa3-official-learning-map"
  | "ppa3-introduction"
  | "ppa3-01-packet-analysis-network-basics"
  | "ppa3-02-tapping-into-wire"
  | "ppa3-03-introduction-wireshark"
  | "ppa3-04-working-captured-packets"
  | "ppa3-05-advanced-wireshark-features"
  | "ppa3-06-command-line-analysis"
  | "ppa3-07-network-layer-protocols"
  | "ppa3-08-transport-layer-protocols"
  | "ppa3-09-upper-layer-protocols"
  | "ppa3-10-real-world-scenarios"
  | "ppa3-11-fighting-slow-network"
  | "ppa3-12-security-analysis"
  | "ppa3-13-wireless-analysis"
  | "ppa3-appendix-a"
  | "ppa3-appendix-b"
  | "ppa3-index"
  | "ppa3-official-final-review"
  | "tip2-official-learning-map"
  | "tip2-foreword"
  | "tip2-preface-second-edition"
  | "tip2-adapted-preface-first-edition"
  | "tip2-01-introduction"
  | "tip2-02-address-architecture"
  | "tip2-03-link-layer"
  | "tip2-04-arp"
  | "tip2-05-internet-protocol"
  | "tip2-06-dhcp-autoconfiguration"
  | "tip2-07-firewalls-nat"
  | "tip2-08-icmp"
  | "tip2-09-broadcast-multicast"
  | "tip2-10-udp-fragmentation"
  | "tip2-11-dns"
  | "tip2-12-tcp-preliminaries"
  | "tip2-13-tcp-connection-management"
  | "tip2-14-tcp-timeout-retransmission"
  | "tip2-15-tcp-data-flow-window"
  | "tip2-16-tcp-congestion-control"
  | "tip2-17-tcp-keepalive"
  | "tip2-18-security"
  | "tip2-glossary-acronyms"
  | "tip2-index"
  | "tip2-official-final-review"
  | "unp-official-learning-map"
  | "unp-01-introduction"
  | "unp-02-transport-layer"
  | "unp-03-sockets-introduction"
  | "unp-04-elementary-tcp-sockets"
  | "unp-05-tcp-client-server-example"
  | "unp-06-io-multiplexing"
  | "unp-07-socket-options"
  | "unp-08-elementary-udp-sockets"
  | "unp-09-elementary-sctp-sockets"
  | "unp-10-sctp-client-server-example"
  | "unp-11-name-address-conversions"
  | "unp-12-ipv4-ipv6-interoperability"
  | "unp-13-daemon-inetd"
  | "unp-14-advanced-io-functions"
  | "unp-15-unix-domain-protocols"
  | "unp-16-nonblocking-io"
  | "unp-17-ioctl-operations"
  | "unp-18-routing-sockets"
  | "unp-19-key-management-sockets"
  | "unp-20-broadcasting"
  | "unp-21-multicasting"
  | "unp-22-advanced-udp"
  | "unp-23-advanced-sctp"
  | "unp-24-out-of-band-data"
  | "unp-25-signal-driven-io"
  | "unp-26-threads"
  | "unp-27-ip-options"
  | "unp-28-raw-sockets"
  | "unp-29-datalink-access"
  | "unp-30-client-server-design"
  | "unp-31-streams"
  | "unp-appendix-a-internet-protocols"
  | "unp-appendix-b-virtual-networks"
  | "unp-appendix-c-debugging-techniques"
  | "unp-appendix-d-misc-source-code"
  | "unp-appendix-e-selected-solutions"
  | "unp-official-final-review"
  | "tws-official-learning-map"
  | "tws-01-what-to-build"
  | "tws-02-language-design"
  | "tws-03-tokenization"
  | "tws-04-program-objects"
  | "tws-05-parser-design"
  | "tws-06-interpreter-execution"
  | "tws-07-functions-closures"
  | "tws-08-java-interop"
  | "tws-09-object-oriented-language"
  | "tws-10-arrays"
  | "tws-11-fast-variable-access"
  | "tws-12-fast-object-access"
  | "tws-13-bytecode-interpreter"
  | "tws-14-static-types"
  | "tws-15-handwritten-lexer"
  | "tws-16-parsing-methods"
  | "tws-17-parser-library-internals"
  | "tws-18-gluonj"
  | "tws-19-ast-design-patterns"
  | "tws-official-final-review"
  | "crc-official-learning-map"
  | "crc-01-start-compiler"
  | "crc-02-cflat-cbc"
  | "crc-03-parsing-overview"
  | "crc-04-lexical-analysis"
  | "crc-05-javacc-parser"
  | "crc-06-syntax-analysis"
  | "crc-07-javacc-actions-ast"
  | "crc-08-build-ast"
  | "crc-09-reference-resolution"
  | "crc-10-static-type-checking"
  | "crc-11-ir-conversion"
  | "crc-12-x86-overview"
  | "crc-13-x86-assembly"
  | "crc-14-functions-variables"
  | "crc-15-compile-expressions-statements"
  | "crc-16-stack-frame"
  | "crc-17-optimization"
  | "crc-18-object-files"
  | "crc-19-linking-libraries"
  | "crc-20-program-loading"
  | "crc-21-position-independent-code"
  | "crc-22-further-reading"
  | "crc-appendix-resources"
  | "crc-official-final-review"
  | "eac-official-learning-map"
  | "eac-01-overview-compilation"
  | "eac-02-scanners"
  | "eac-03-parsers"
  | "eac-04-context-sensitive-analysis"
  | "eac-05-intermediate-representations"
  | "eac-06-procedure-abstraction"
  | "eac-07-code-shape"
  | "eac-08-introduction-optimization"
  | "eac-09-data-flow-analysis"
  | "eac-10-scalar-optimizations"
  | "eac-11-instruction-selection"
  | "eac-12-instruction-scheduling"
  | "eac-13-register-allocation"
  | "eac-appendix-a-iloc"
  | "eac-appendix-b-data-structures"
  | "eac-official-final-review"
  | "dbc-official-learning-map"
  | "dbc-01-introduction"
  | "dbc-02-simple-syntax-directed-translator"
  | "dbc-03-lexical-analysis"
  | "dbc-04-syntax-analysis"
  | "dbc-05-syntax-directed-translation"
  | "dbc-06-intermediate-code-generation"
  | "dbc-07-runtime-environments"
  | "dbc-08-code-generation"
  | "dbc-09-machine-independent-optimizations"
  | "dbc-10-instruction-level-parallelism"
  | "dbc-11-parallelism-locality"
  | "dbc-12-interprocedural-analysis"
  | "dbc-appendix-a-complete-front-end"
  | "dbc-appendix-b-linear-independent-solutions"
  | "dbc-official-final-review"
  | "tbc-official-learning-map"
  | "tbc-01-introduction"
  | "tbc-02-lexical-analysis"
  | "tbc-03-parsing"
  | "tbc-04-abstract-syntax"
  | "tbc-05-semantic-analysis"
  | "tbc-06-activation-records"
  | "tbc-07-translation-intermediate-code"
  | "tbc-08-basic-blocks-traces"
  | "tbc-09-instruction-selection"
  | "tbc-10-liveness-analysis"
  | "tbc-11-register-allocation"
  | "tbc-12-putting-it-all-together"
  | "tbc-13-garbage-collection"
  | "tbc-14-object-oriented-languages"
  | "tbc-15-functional-languages"
  | "tbc-16-polymorphic-types"
  | "tbc-17-dataflow-analysis"
  | "tbc-18-loop-optimizations"
  | "tbc-19-static-single-assignment"
  | "tbc-20-scheduling-pipelining"
  | "tbc-21-memory-hierarchies"
  | "tbc-appendix-tiger-language-reference"
  | "tbc-official-final-review"
  | "iai-official-learning-map"
  | "iai-01-ai-past-present-future"
  | "iai-02-rule-systems-variants"
  | "iai-03-automata-artificial-life"
  | "iai-04-weighting-optimal-solutions"
  | "iai-05-weighting-optimization-programs"
  | "iai-06-statistical-ml-probability-modeling"
  | "iai-07-statistical-ml-supervised-unsupervised"
  | "iai-08-reinforcement-distributed-ai"
  | "iai-09-deep-learning"
  | "iai-10-image-speech-pattern-recognition"
  | "iai-11-nlp-machine-learning"
  | "iai-12-knowledge-representation-data-structures"
  | "iai-13-distributed-computing"
  | "iai-14-big-data-iot"
  | "iai-official-final-review"
  | "iml-official-learning-map"
  | "iml-01-what-is-machine-learning"
  | "iml-02-learning-models"
  | "iml-03-least-squares-learning"
  | "iml-04-constrained-least-squares"
  | "iml-05-sparse-learning"
  | "iml-06-robust-learning"
  | "iml-07-least-squares-classification"
  | "iml-08-support-vector-classification"
  | "iml-09-ensemble-classification"
  | "iml-10-probabilistic-classification"
  | "iml-11-sequence-classification"
  | "iml-12-anomaly-detection"
  | "iml-13-unsupervised-dimensionality-reduction"
  | "iml-14-clustering"
  | "iml-15-online-learning"
  | "iml-16-semi-supervised-learning"
  | "iml-17-supervised-dimensionality-reduction"
  | "iml-18-transfer-learning"
  | "iml-19-multi-task-learning"
  | "iml-20-summary-outlook"
  | "iml-official-final-review"
  | "idl-official-learning-map"
  | "idl-01-introduction"
  | "idl-02-neural-networks"
  | "idl-03-convolutional-neural-networks"
  | "idl-04-restricted-boltzmann-machines"
  | "idl-05-autoencoders"
  | "idl-06-improving-generalization"
  | "idl-07-deep-learning-tools"
  | "idl-08-present-and-future"
  | "idl-official-final-review"
  | "mlw-official-learning-map"
  | "mlw-01-introduction"
  | "mlw-02-model-assessment-selection"
  | "mlw-03-linear-models"
  | "mlw-04-decision-trees"
  | "mlw-05-neural-networks"
  | "mlw-06-support-vector-machines"
  | "mlw-07-bayesian-classifiers"
  | "mlw-08-ensemble-learning"
  | "mlw-09-clustering"
  | "mlw-10-dimensionality-reduction-metric-learning"
  | "mlw-11-feature-selection-sparse-learning"
  | "mlw-12-computational-learning-theory"
  | "mlw-13-semi-supervised-learning"
  | "mlw-14-probabilistic-graphical-models"
  | "mlw-15-rule-learning"
  | "mlw-16-reinforcement-learning"
  | "mlw-appendices"
  | "mlw-official-final-review"
  | "slm-official-learning-map"
  | "slm-01-introduction"
  | "slm-02-perceptron"
  | "slm-03-knn"
  | "slm-04-naive-bayes"
  | "slm-05-decision-tree"
  | "slm-06-logistic-maxent"
  | "slm-07-svm"
  | "slm-08-boosting"
  | "slm-09-em"
  | "slm-10-hmm"
  | "slm-11-crf"
  | "slm-12-supervised-summary"
  | "slm-13-unsupervised-introduction"
  | "slm-14-clustering"
  | "slm-15-svd"
  | "slm-16-pca"
  | "slm-17-lsa"
  | "slm-18-plsa"
  | "slm-19-mcmc"
  | "slm-20-lda"
  | "slm-21-pagerank"
  | "slm-22-unsupervised-summary"
  | "slm-appendices"
  | "slm-official-final-review"
  | "dls-official-learning-map"
  | "dls-01-python-introduction"
  | "dls-02-perceptron"
  | "dls-03-neural-network"
  | "dls-04-neural-network-learning"
  | "dls-05-backpropagation"
  | "dls-06-learning-techniques"
  | "dls-07-cnn"
  | "dls-08-deep-learning"
  | "dls-appendix-softmax-loss"
  | "dls-official-final-review"
  | "dl2-official-learning-map"
  | "dl2-step-01-variable-box"
  | "dl2-step-02-function-creator"
  | "dl2-step-03-function-chain"
  | "dl2-step-04-numerical-differentiation"
  | "dl2-step-05-backprop-theory"
  | "dl2-step-06-manual-backprop"
  | "dl2-step-07-automatic-backprop"
  | "dl2-step-08-recursion-to-loop"
  | "dl2-step-09-usable-functions"
  | "dl2-step-10-testing"
  | "dl2-step-11-variadic-forward"
  | "dl2-step-12-variadic-improvements"
  | "dl2-step-13-variadic-backward"
  | "dl2-step-14-reused-variable"
  | "dl2-step-15-complex-graph-theory"
  | "dl2-step-16-complex-graph-implementation"
  | "dl2-step-17-memory-cycles"
  | "dl2-step-18-memory-mode"
  | "dl2-step-19-usable-variable"
  | "dl2-step-20-operator-overload-one"
  | "dl2-step-21-operator-overload-two"
  | "dl2-step-22-operator-overload-three"
  | "dl2-step-23-package"
  | "dl2-step-24-complex-derivatives"
  | "dl2-step-25-graphviz-one"
  | "dl2-step-26-graphviz-two"
  | "dl2-step-27-taylor-derivative"
  | "dl2-step-28-function-optimization"
  | "dl2-step-29-manual-newton"
  | "dl2-step-30-higher-order-preparation"
  | "dl2-step-31-higher-order-theory"
  | "dl2-step-32-higher-order-implementation"
  | "dl2-step-33-automatic-newton"
  | "dl2-step-34-sin-higher-order"
  | "dl2-step-35-higher-order-graph"
  | "dl2-step-36-double-backprop"
  | "dl2-step-37-tensor"
  | "dl2-step-38-reshape-transpose"
  | "dl2-step-39-sum"
  | "dl2-step-40-broadcast"
  | "dl2-step-41-matrix-product"
  | "dl2-step-42-linear-regression"
  | "dl2-step-43-neural-network"
  | "dl2-step-44-parameter-layer"
  | "dl2-step-45-model-layer"
  | "dl2-step-46-optimizer"
  | "dl2-step-47-softmax-cross-entropy"
  | "dl2-step-48-multiclass"
  | "dl2-step-49-dataset-preprocess"
  | "dl2-step-50-dataloader"
  | "dl2-step-51-mnist"
  | "dl2-step-52-gpu"
  | "dl2-step-53-save-load"
  | "dl2-step-54-dropout-test-mode"
  | "dl2-step-55-cnn-mechanism-one"
  | "dl2-step-56-cnn-mechanism-two"
  | "dl2-step-57-conv2d-pooling"
  | "dl2-step-58-vgg16"
  | "dl2-step-59-rnn"
  | "dl2-step-60-lstm-dataloader"
  | "dl2-appendix-a-in-place"
  | "dl2-appendix-b-get-item"
  | "dl2-appendix-c-colab"
  | "dl2-official-final-review"
  | "dna-official-learning-map"
  | "dna-01-neural-network-review"
  | "dna-02-distributed-word-representations"
  | "dna-03-word2vec"
  | "dna-04-word2vec-acceleration"
  | "dna-05-rnn"
  | "dna-06-gated-rnn"
  | "dna-07-rnn-text-generation"
  | "dna-08-attention"
  | "dna-appendix-a-activation-derivatives"
  | "dna-appendix-b-wordnet"
  | "dna-appendix-c-gru"
  | "dna-official-final-review"
  | "dlr-official-learning-map"
  | "dlr-01-bandit"
  | "dlr-02-mdp"
  | "dlr-03-bellman"
  | "dlr-04-dynamic-programming"
  | "dlr-05-monte-carlo"
  | "dlr-06-td"
  | "dlr-07-neural-q-learning"
  | "dlr-08-dqn"
  | "dlr-09-policy-gradient"
  | "dlr-10-further"
  | "dlr-appendix-a-off-policy-mc"
  | "dlr-appendix-b-n-step-td"
  | "dlr-appendix-c-double-dqn"
  | "dlr-appendix-d-policy-gradient-proof"
  | "dlr-official-final-review"
  | "dlg-official-learning-map"
  | "dlg-01-normal-distribution"
  | "dlg-02-maximum-likelihood"
  | "dlg-03-multivariate-normal"
  | "dlg-04-gaussian-mixture"
  | "dlg-05-em-algorithm"
  | "dlg-06-neural-network"
  | "dlg-07-vae"
  | "dlg-08-diffusion-theory"
  | "dlg-09-diffusion-implementation"
  | "dlg-10-diffusion-applications"
  | "dlg-appendix-a-multivariate-mle"
  | "dlg-appendix-b-jensen"
  | "dlg-appendix-c-hierarchical-vae"
  | "dlg-appendix-d-notation"
  | "dlg-official-final-review"
  | "dlt-official-learning-map"
  | "dlt-01-introduction"
  | "dlt-02-linear-algebra"
  | "dlt-03-probability-information"
  | "dlt-04-numerical-computation"
  | "dlt-05-machine-learning-basics"
  | "dlt-06-feedforward-networks"
  | "dlt-07-regularization"
  | "dlt-08-optimization"
  | "dlt-09-convolutional-networks"
  | "dlt-10-sequence-modeling"
  | "dlt-11-practical-methodology"
  | "dlt-12-applications"
  | "dlt-13-linear-factor-models"
  | "dlt-14-autoencoders"
  | "dlt-15-representation-learning"
  | "dlt-16-structured-probabilistic-models"
  | "dlt-17-monte-carlo"
  | "dlt-18-partition-function"
  | "dlt-19-approximate-inference"
  | "dlt-20-deep-generative-models"
  | "dlt-official-final-review"
  | "prl-official-learning-map"
  | "prl-01-introduction"
  | "prl-02-probability-distributions"
  | "prl-03-linear-regression"
  | "prl-04-linear-classification"
  | "prl-05-neural-networks"
  | "prl-06-kernel-methods"
  | "prl-07-sparse-kernel-machines"
  | "prl-08-graphical-models"
  | "prl-09-mixture-models-em"
  | "prl-10-approximate-inference"
  | "prl-11-sampling-methods"
  | "prl-12-continuous-latent-variables"
  | "prl-13-sequential-data"
  | "prl-14-combining-models"
  | "prl-appendix-a-data-sets"
  | "prl-appendix-b-probability-distributions"
  | "prl-appendix-c-properties-matrices"
  | "prl-appendix-d-calculus-variations"
  | "prl-appendix-e-lagrange-multipliers"
  | "prl-official-final-review"
  | "rlc-official-learning-map"
  | "rlc-01-rl-deep-learning"
  | "rlc-02-reinforcement-implementation"
  | "rlc-03-deep-learning-techniques"
  | "rlc-04-deep-reinforcement-learning"
  | "rlc-official-final-review"
  | "drl-official-learning-map"
  | "drl-01-machine-learning-foundations"
  | "drl-02-monte-carlo-method"
  | "drl-03-reinforcement-learning-concepts"
  | "drl-04-dqn-q-learning"
  | "drl-05-sarsa"
  | "drl-06-advanced-value-learning"
  | "drl-07-policy-gradient"
  | "drl-08-policy-gradient-baseline"
  | "drl-09-advanced-policy-learning"
  | "drl-10-continuous-control"
  | "drl-11-partial-observability"
  | "drl-12-imitation-learning"
  | "drl-13-parallel-computing"
  | "drl-14-multi-agent-systems"
  | "drl-15-cooperative-marl"
  | "drl-16-noncooperative-marl"
  | "drl-17-attention-marl"
  | "drl-18-alphago-mcts"
  | "drl-19-real-world-applications"
  | "drl-appendix-a-bellman-equations"
  | "drl-appendix-b-exercise-answers"
  | "drl-official-final-review"
  | "tcg-official-learning-map"
  | "tcg-preface"
  | "tcg-main-01-one-word-at-a-time"
  | "tcg-main-02-probabilities"
  | "tcg-main-03-model"
  | "tcg-main-04-human-like-tasks"
  | "tcg-main-05-neural-nets"
  | "tcg-main-06-training-neural-nets"
  | "tcg-main-07-training-practice"
  | "tcg-main-08-universal-network"
  | "tcg-main-09-embeddings"
  | "tcg-main-10-inside-chatgpt"
  | "tcg-main-11-training-chatgpt"
  | "tcg-main-12-beyond-basic-training"
  | "tcg-main-13-what-lets-it-work"
  | "tcg-main-14-meaning-space"
  | "tcg-main-15-semantic-grammar"
  | "tcg-main-16-conclusion"
  | "tcg-thanks-additional-resources"
  | "tcg-wa-01-chatgpt-wolfram-alpha"
  | "tcg-wa-02-basic-example"
  | "tcg-wa-03-more-examples"
  | "tcg-wa-04-path-forward"
  | "tcg-official-final-review"
  | "lae-official-learning-map"
  | "lae-preface"
  | "lae-01-gpt4-chatgpt-essentials"
  | "lae-02-api-deep-dive"
  | "lae-03-building-apps"
  | "lae-04-advanced-techniques"
  | "lae-05-langchain-plugins"
  | "lae-glossary"
  | "lae-official-final-review"
  | "lcp-official-learning-map"
  | "lcp-preface"
  | "lcp-01-introduction"
  | "lcp-02-first-experience"
  | "lcp-03-model-io"
  | "lcp-04-building-chains"
  | "lcp-05-rag"
  | "lcp-06-agents"
  | "lcp-07-memory"
  | "lcp-08-callbacks"
  | "lcp-09-multimodal-bot"
  | "lcp-10-community-resources"
  | "lcp-official-final-review"
  | "cgpt-official-learning-map"
  | "cgpt-preface"
  | "cgpt-01-understanding-chatgpt"
  | "cgpt-02-principles"
  | "cgpt-03-pretrained-language-models"
  | "cgpt-04-reinforcement-learning"
  | "cgpt-05-prompt-emergence"
  | "cgpt-06-llm-pretraining"
  | "cgpt-07-gpt-series"
  | "cgpt-08-ppo-rlhf"
  | "cgpt-09-chatgpt-practice"
  | "cgpt-10-trends"
  | "cgpt-official-final-review"
  | "llm-official-learning-map"
  | "llm-preface"
  | "llm-01-debates-future"
  | "llm-02-language-modeling-tokenization"
  | "llm-03-transformer"
  | "llm-04-pretraining-decoding"
  | "llm-05-icl-lightweight-finetuning"
  | "llm-06-training-larger-models"
  | "llm-07-sparse-moe"
  | "llm-08-retrieval-augmented-lm"
  | "llm-09-human-preference-alignment"
  | "llm-10-bias-toxicity"
  | "llm-11-vision-language-models"
  | "llm-12-environmental-impact"
  | "llm-references"
  | "llm-official-final-review"
  | "lsl-official-learning-map"
  | "lsl-preface"
  | "lsl-mathematical-notation"
  | "lsl-01-introduction"
  | "lsl-02-llm-foundations"
  | "lsl-03-pretraining-data"
  | "lsl-04-distributed-training"
  | "lsl-05-supervised-finetuning"
  | "lsl-06-reinforcement-learning"
  | "lsl-07-llm-applications"
  | "lsl-08-llm-evaluation"
  | "lsl-references"
  | "lsl-index"
  | "lsl-official-final-review"
  | "bla-official-learning-map"
  | "bla-preface"
  | "bla-01-introduction-to-large-language-models"
  | "bla-02-llms-for-ai-powered-applications"
  | "bla-03-choosing-an-llm"
  | "bla-04-prompt-engineering"
  | "bla-05-embedding-llms-in-applications"
  | "bla-06-conversational-applications"
  | "bla-07-search-recommendation"
  | "bla-08-structured-data"
  | "bla-09-working-with-code"
  | "bla-10-multimodal-applications"
  | "bla-11-fine-tuning"
  | "bla-12-responsible-ai"
  | "bla-13-emerging-trends"
  | "bla-other-books"
  | "bla-index"
  | "bla-official-final-review"
  | "mas-official-learning-map"
  | "mas-preface"
  | "mas-part-01-setting-scene"
  | "mas-01-introduction"
  | "mas-part-02-intelligent-autonomous-agents"
  | "mas-02-intelligent-agents"
  | "mas-03-deductive-reasoning-agents"
  | "mas-04-practical-reasoning-agents"
  | "mas-05-reactive-hybrid-agents"
  | "mas-part-03-communication-cooperation"
  | "mas-06-understanding-each-other"
  | "mas-07-communicating"
  | "mas-08-working-together"
  | "mas-09-methodologies"
  | "mas-10-applications"
  | "mas-part-04-multiagent-decision-making"
  | "mas-11-multiagent-interactions"
  | "mas-12-making-group-decisions"
  | "mas-13-forming-coalitions"
  | "mas-14-allocating-scarce-resources"
  | "mas-15-bargaining"
  | "mas-16-arguing"
  | "mas-17-logical-foundations"
  | "mas-coda"
  | "mas-appendix-a-history-lesson"
  | "mas-appendix-b-afterword"
  | "mas-official-final-review"
  | "bp-official-learning-map"
  | "bp-technical-review"
  | "bp-preface"
  | "bp-01-first-blockchain"
  | "bp-02-application-development"
  | "bp-03-cryptography"
  | "bp-04-consensus"
  | "bp-05-scaling-sidechains-lightning"
  | "bp-06-ethereum"
  | "bp-07-hyperledger"
  | "bp-08-build-mini-chain"
  | "bp-09-potential-problems"
  | "bp-afterword-programmable-society"
  | "bp-official-final-review"
  | "bdp-official-learning-map"
  | "bdp-preface"
  | "bdp-01-understand-blockchain"
  | "bdp-02-practice-preparation"
  | "bdp-03-ethereum-introduction"
  | "bdp-04-compile-install-run"
  | "bdp-05-private-chain"
  | "bdp-06-programming-interfaces"
  | "bdp-07-solidity-ide-quickstart"
  | "bdp-08-solidity-syntax"
  | "bdp-09-contract-compile-deploy"
  | "bdp-10-truffle"
  | "bdp-11-dapps-practice"
  | "bdp-appendix-a-bitcoin-principles"
  | "bdp-appendix-b-bitcoin-cli"
  | "bdp-appendix-c-bitcoin-apis"
  | "bdp-official-final-review"
  | "mbt3-official-learning-map"
  | "mbt3-preface"
  | "mbt3-01-introduction"
  | "mbt3-02-how-bitcoin-works"
  | "mbt3-03-bitcoin-core"
  | "mbt3-04-keys-addresses"
  | "mbt3-05-wallet-recovery"
  | "mbt3-06-transactions"
  | "mbt3-07-authorization-authentication"
  | "mbt3-08-digital-signatures"
  | "mbt3-09-transaction-fees"
  | "mbt3-10-bitcoin-network"
  | "mbt3-11-blockchain"
  | "mbt3-12-mining-consensus"
  | "mbt3-13-security"
  | "mbt3-14-second-layer-applications"
  | "mbt3-appendix-a-whitepaper"
  | "mbt3-appendix-b-whitepaper-errata"
  | "mbt3-appendix-c-bips"
  | "mbt3-official-final-review"
  | "met2-official-learning-map"
  | "met2-preface"
  | "met2-01-what-is-ethereum"
  | "met2-02-ethereum-basics"
  | "met2-03-ethereum-nodes"
  | "met2-04-cryptography"
  | "met2-05-wallets"
  | "met2-06-transactions"
  | "met2-07-smart-contracts-solidity"
  | "met2-08-smart-contracts-vyper"
  | "met2-09-smart-contract-security"
  | "met2-10-tokens"
  | "met2-11-oracles"
  | "met2-12-decentralized-applications"
  | "met2-13-decentralized-finance"
  | "met2-14-ethereum-virtual-machine"
  | "met2-15-consensus"
  | "met2-16-scaling-ethereum"
  | "met2-17-zero-knowledge-proofs"
  | "met2-official-final-review"
  | "ine23-official-learning-map"
  | "ine23-content-summary"
  | "ine23-preface"
  | "ine23-01-classification"
  | "ine23-02-motors"
  | "ine23-03-batteries"
  | "ine23-04-battery-electric-vehicles"
  | "ine23-05-hybrid-vehicles"
  | "ine23-06-fuel-cell-vehicles"
  | "ine23-07-natural-gas-vehicles"
  | "ine23-08-lpg-vehicles"
  | "ine23-references"
  | "ine23-official-final-review"
  | "csi23-official-learning-map"
  | "csi23-book-guide"
  | "csi23-prologue"
  | "csi23-01-vehicle-structure"
  | "csi23-02-production"
  | "csi23-03-eco-cars"
  | "csi23-final-future"
  | "csi23-index"
  | "csi23-official-final-review"
  | "avc2-official-learning-map"
  | "avc2-01-automotive-electronics"
  | "avc2-02-autosar-foundations"
  | "avc2-03-example-solutions"
  | "avc2-04-swc-development"
  | "avc2-05-system-design-configuration"
  | "avc2-06-rte-bsw"
  | "avc2-07-mcal"
  | "avc2-08-integration-debugging"
  | "avc2-09-functional-safety"
  | "avc2-10-outlook"
  | "avc2-references"
  | "avc2-official-final-review"
  | "aes23-official-learning-map"
  | "aes23-foreword"
  | "aes23-preface"
  | "aes23-01-architecture"
  | "aes23-02-networks"
  | "aes23-03-software"
  | "aes23-04-soa"
  | "aes23-05-development-ota"
  | "aes23-afterword"
  | "aes23-references"
  | "aes23-official-final-review"
  | "tmm40-official-learning-map"
  | "tmm40-translator-preface"
  | "tmm40-20th-anniversary-preface"
  | "tmm40-first-edition-preface"
  | "tmm40-01-tar-pit"
  | "tmm40-02-man-month"
  | "tmm40-03-surgical-team"
  | "tmm40-04-conceptual-integrity"
  | "tmm40-05-second-system-effect"
  | "tmm40-06-passing-the-word"
  | "tmm40-07-babel"
  | "tmm40-08-calling-the-shot"
  | "tmm40-09-ten-pounds"
  | "tmm40-10-documentary-hypothesis"
  | "tmm40-11-plan-to-throw-one-away"
  | "tmm40-12-sharp-tools"
  | "tmm40-13-whole-and-parts"
  | "tmm40-14-hatching-catastrophe"
  | "tmm40-15-other-face"
  | "tmm40-16-no-silver-bullet"
  | "tmm40-17-no-silver-bullet-refired"
  | "tmm40-18-propositions"
  | "tmm40-19-twenty-years-later"
  | "tmm40-notes-references"
  | "tmm40-appendix-practice"
  | "tmm40-official-final-review"
  | "cc2e-official-learning-map"
  | "cc2e-preface"
  | "cc2e-acknowledgments"
  | "cc2e-checklist-index"
  | "cc2e-table-index"
  | "cc2e-figure-index"
  | "cc2e-part-01-foundations"
  | "cc2e-01-construction-world"
  | "cc2e-02-software-metaphors"
  | "cc2e-03-prerequisites"
  | "cc2e-04-construction-decisions"
  | "cc2e-part-02-high-quality-code"
  | "cc2e-05-design-in-construction"
  | "cc2e-06-working-classes"
  | "cc2e-07-high-quality-routines"
  | "cc2e-08-defensive-programming"
  | "cc2e-09-pseudocode-programming-process"
  | "cc2e-part-03-variables"
  | "cc2e-10-general-variable-use"
  | "cc2e-11-power-of-variable-names"
  | "cc2e-12-fundamental-data-types"
  | "cc2e-13-unusual-data-types"
  | "cc2e-part-04-statements"
  | "cc2e-14-straight-line-code"
  | "cc2e-15-conditionals"
  | "cc2e-16-loops"
  | "cc2e-17-unusual-control-structures"
  | "cc2e-18-table-driven-methods"
  | "cc2e-19-general-control-issues"
  | "cc2e-part-05-code-improvement"
  | "cc2e-20-software-quality-landscape"
  | "cc2e-21-collaborative-construction"
  | "cc2e-22-developer-testing"
  | "cc2e-23-debugging"
  | "cc2e-24-refactoring"
  | "cc2e-25-code-tuning-strategies"
  | "cc2e-26-code-tuning-techniques"
  | "cc2e-part-06-system-considerations"
  | "cc2e-27-program-size"
  | "cc2e-28-managing-construction"
  | "cc2e-29-integration"
  | "cc2e-30-programming-tools"
  | "cc2e-part-07-software-craftsmanship"
  | "cc2e-31-layout-and-style"
  | "cc2e-32-self-documenting-code"
  | "cc2e-33-personal-character"
  | "cc2e-34-software-craftsmanship"
  | "cc2e-35-more-information"
  | "cc2e-references"
  | "cc2e-index"
  | "cc2e-official-final-review"
  | "tpp20-official-learning-map"
  | "tpp20-foreword"
  | "tpp20-second-edition-preface"
  | "tpp20-first-edition-preface"
  | "tpp20-chapter-01-pragmatic-philosophy"
  | "tpp20-topic-01-your-life"
  | "tpp20-topic-02-cat-ate-source-code"
  | "tpp20-topic-03-software-entropy"
  | "tpp20-topic-04-stone-soup-boiled-frogs"
  | "tpp20-topic-05-good-enough-software"
  | "tpp20-topic-06-knowledge-portfolio"
  | "tpp20-topic-07-communicate"
  | "tpp20-chapter-02-pragmatic-approach"
  | "tpp20-topic-08-essence-good-design"
  | "tpp20-topic-09-dry-duplication"
  | "tpp20-topic-10-orthogonality"
  | "tpp20-topic-11-reversibility"
  | "tpp20-topic-12-tracer-bullets"
  | "tpp20-topic-13-prototypes-post-it-notes"
  | "tpp20-topic-14-domain-languages"
  | "tpp20-topic-15-estimating"
  | "tpp20-chapter-03-basic-tools"
  | "tpp20-topic-16-power-plain-text"
  | "tpp20-topic-17-shell-games"
  | "tpp20-topic-18-power-editing"
  | "tpp20-topic-19-version-control"
  | "tpp20-topic-20-debugging"
  | "tpp20-topic-21-text-manipulation"
  | "tpp20-topic-22-engineering-daybooks"
  | "tpp20-chapter-04-pragmatic-paranoia"
  | "tpp20-topic-23-design-by-contract"
  | "tpp20-topic-24-dead-programs-tell-no-lies"
  | "tpp20-topic-25-assertive-programming"
  | "tpp20-topic-26-balance-resources"
  | "tpp20-topic-27-headlights"
  | "tpp20-chapter-05-bend-or-break"
  | "tpp20-topic-28-decoupling"
  | "tpp20-topic-29-juggling-real-world"
  | "tpp20-topic-30-transforming-programming"
  | "tpp20-topic-31-inheritance-tax"
  | "tpp20-topic-32-configuration"
  | "tpp20-chapter-06-concurrency"
  | "tpp20-topic-33-breaking-temporal-coupling"
  | "tpp20-topic-34-shared-state"
  | "tpp20-topic-35-actors-processes"
  | "tpp20-topic-36-blackboards"
  | "tpp20-chapter-07-while-coding"
  | "tpp20-topic-37-lizard-brain"
  | "tpp20-topic-38-programming-by-coincidence"
  | "tpp20-topic-39-algorithm-speed"
  | "tpp20-topic-40-refactoring"
  | "tpp20-topic-41-test-to-code"
  | "tpp20-topic-42-property-based-testing"
  | "tpp20-topic-43-stay-safe"
  | "tpp20-topic-44-naming-things"
  | "tpp20-chapter-08-before-project"
  | "tpp20-topic-45-requirements-pit"
  | "tpp20-topic-46-impossible-puzzles"
  | "tpp20-topic-47-working-together"
  | "tpp20-topic-48-essence-agility"
  | "tpp20-chapter-09-pragmatic-projects"
  | "tpp20-topic-49-pragmatic-teams"
  | "tpp20-topic-50-coconuts-dont-cut-it"
  | "tpp20-topic-51-starter-kit"
  | "tpp20-topic-52-delight-users"
  | "tpp20-topic-53-pride-prejudice"
  | "tpp20-postface"
  | "tpp20-bibliography"
  | "tpp20-exercise-answers"
  | "tpp20-translator-postface"
  | "tpp20-official-final-review"
  | "poeaa24-official-learning-map"
  | "poeaa24-translator-preface"
  | "poeaa24-preface"
  | "poeaa24-pattern-list"
  | "poeaa24-introduction"
  | "poeaa24-part-01-narratives"
  | "poeaa24-chapter-01-layering"
  | "poeaa24-chapter-02-organizing-domain-logic"
  | "poeaa24-chapter-03-relational-mapping"
  | "poeaa24-chapter-04-web-presentation"
  | "poeaa24-chapter-05-concurrency"
  | "poeaa24-chapter-06-session-state"
  | "poeaa24-chapter-07-distribution-strategies"
  | "poeaa24-chapter-08-putting-together"
  | "poeaa24-part-02-patterns"
  | "poeaa24-chapter-09-domain-logic-patterns"
  | "poeaa24-pattern-01-transaction-script"
  | "poeaa24-pattern-02-domain-model"
  | "poeaa24-pattern-03-table-module"
  | "poeaa24-pattern-04-service-layer"
  | "poeaa24-chapter-10-data-source-patterns"
  | "poeaa24-pattern-05-table-data-gateway"
  | "poeaa24-pattern-06-row-data-gateway"
  | "poeaa24-pattern-07-active-record"
  | "poeaa24-pattern-08-data-mapper"
  | "poeaa24-chapter-11-object-relational-behavior"
  | "poeaa24-pattern-09-unit-of-work"
  | "poeaa24-pattern-10-identity-map"
  | "poeaa24-pattern-11-lazy-load"
  | "poeaa24-chapter-12-object-relational-structure"
  | "poeaa24-pattern-12-identity-field"
  | "poeaa24-pattern-13-foreign-key-mapping"
  | "poeaa24-pattern-14-association-table-mapping"
  | "poeaa24-pattern-15-dependent-mapping"
  | "poeaa24-pattern-16-embedded-value"
  | "poeaa24-pattern-17-serialized-lob"
  | "poeaa24-pattern-18-single-table-inheritance"
  | "poeaa24-pattern-19-class-table-inheritance"
  | "poeaa24-pattern-20-concrete-table-inheritance"
  | "poeaa24-pattern-21-inheritance-mappers"
  | "poeaa24-chapter-13-object-relational-metadata"
  | "poeaa24-pattern-22-metadata-mapping"
  | "poeaa24-pattern-23-query-object"
  | "poeaa24-pattern-24-repository"
  | "poeaa24-chapter-14-web-presentation-patterns"
  | "poeaa24-pattern-25-model-view-controller"
  | "poeaa24-pattern-26-page-controller"
  | "poeaa24-pattern-27-front-controller"
  | "poeaa24-pattern-28-template-view"
  | "poeaa24-pattern-29-transform-view"
  | "poeaa24-pattern-30-two-step-view"
  | "poeaa24-pattern-31-application-controller"
  | "poeaa24-chapter-15-distribution-patterns"
  | "poeaa24-pattern-32-remote-facade"
  | "poeaa24-pattern-33-data-transfer-object"
  | "poeaa24-chapter-16-offline-concurrency-patterns"
  | "poeaa24-pattern-34-optimistic-offline-lock"
  | "poeaa24-pattern-35-pessimistic-offline-lock"
  | "poeaa24-pattern-36-coarse-grained-lock"
  | "poeaa24-pattern-37-implicit-lock"
  | "poeaa24-chapter-17-session-state-patterns"
  | "poeaa24-pattern-38-client-session-state"
  | "poeaa24-pattern-39-server-session-state"
  | "poeaa24-pattern-40-database-session-state"
  | "poeaa24-chapter-18-base-patterns"
  | "poeaa24-pattern-41-gateway"
  | "poeaa24-pattern-42-mapper"
  | "poeaa24-pattern-43-layer-supertype"
  | "poeaa24-pattern-44-separated-interface"
  | "poeaa24-pattern-45-registry"
  | "poeaa24-pattern-46-value-object"
  | "poeaa24-pattern-47-money"
  | "poeaa24-pattern-48-special-case"
  | "poeaa24-pattern-49-plugin"
  | "poeaa24-pattern-50-service-stub"
  | "poeaa24-pattern-51-record-set"
  | "poeaa24-references"
  | "poeaa24-official-final-review"
  | "taoup-official-learning-map"
  | "taoup-preface"
  | "taoup-part-01"
  | "taoup-chapter-01-philosophy"
  | "taoup-chapter-02-history"
  | "taoup-chapter-03-contrasts"
  | "taoup-part-02"
  | "taoup-chapter-04-modularity"
  | "taoup-chapter-05-textuality"
  | "taoup-chapter-06-transparency"
  | "taoup-chapter-07-multiprogramming"
  | "taoup-chapter-08-minilanguages"
  | "taoup-chapter-09-generation"
  | "taoup-chapter-10-configuration"
  | "taoup-chapter-11-interfaces"
  | "taoup-chapter-12-optimization"
  | "taoup-chapter-13-complexity"
  | "taoup-part-03"
  | "taoup-chapter-14-languages"
  | "taoup-chapter-15-tools"
  | "taoup-chapter-16-reuse"
  | "taoup-part-04"
  | "taoup-chapter-17-portability"
  | "taoup-chapter-18-documentation"
  | "taoup-chapter-19-open-source"
  | "taoup-chapter-20-futures"
  | "taoup-appendix-a-glossary-of-abbreviations"
  | "taoup-appendix-b-references"
  | "taoup-appendix-c-contributors"
  | "taoup-appendix-d-rootless-root"
  | "taoup-colophon"
  | "taoup-index"
  | "taoup-official-final-review"
  | "crv18-official-learning-map"
  | "crv18-preface"
  | "crv18-chapter-01"
  | "crv18-section-01-01"
  | "crv18-section-01-02"
  | "crv18-section-01-03"
  | "crv18-section-01-04"
  | "crv18-section-01-05"
  | "crv18-section-01-06"
  | "crv18-section-01-07"
  | "crv18-section-01-08"
  | "crv18-section-01-09"
  | "crv18-section-01-10"
  | "crv18-section-01-11"
  | "crv18-section-01-12"
  | "crv18-section-01-13"
  | "crv18-section-01-14"
  | "crv18-chapter-02"
  | "crv18-section-02-01"
  | "crv18-section-02-02"
  | "crv18-section-02-03"
  | "crv18-section-02-04"
  | "crv18-section-02-05"
  | "crv18-section-02-06"
  | "crv18-section-02-07"
  | "crv18-section-02-08"
  | "crv18-section-02-09"
  | "crv18-section-02-10"
  | "crv18-section-02-11"
  | "crv18-section-02-12"
  | "crv18-section-02-13"
  | "crv18-section-02-14"
  | "crv18-chapter-03"
  | "crv18-section-03-01"
  | "crv18-section-03-02"
  | "crv18-section-03-03"
  | "crv18-section-03-04"
  | "crv18-section-03-05"
  | "crv18-section-03-06"
  | "crv18-section-03-07"
  | "crv18-section-03-08"
  | "crv18-section-03-09"
  | "crv18-section-03-10"
  | "crv18-chapter-04"
  | "crv18-section-04-01"
  | "crv18-section-04-02"
  | "crv18-section-04-03"
  | "crv18-section-04-04"
  | "crv18-section-04-05"
  | "crv18-chapter-05"
  | "crv18-section-05-01"
  | "crv18-section-05-02"
  | "crv18-section-05-03"
  | "crv18-section-05-04"
  | "crv18-section-05-05"
  | "crv18-chapter-06"
  | "crv18-section-06-01"
  | "crv18-section-06-02"
  | "crv18-section-06-03"
  | "crv18-section-06-04"
  | "crv18-section-06-05"
  | "crv18-official-final-review"
  | "mis18-official-learning-map"
  | "mis18-recommendation-01"
  | "mis18-recommendation-02"
  | "mis18-preface"
  | "mis18-chapter-01"
  | "mis18-chapter-02"
  | "mis18-chapter-03"
  | "mis18-chapter-04"
  | "mis18-chapter-05"
  | "mis18-chapter-06"
  | "mis18-chapter-07"
  | "mis18-chapter-08"
  | "mis18-suggested-reading"
  | "mis18-acknowledgments"
  | "mis18-official-final-review"
  | "msg17-official-learning-map"
  | "msg17-introduction"
  | "msg17-chapter-01"
  | "msg17-chapter-02"
  | "msg17-chapter-03"
  | "msg17-chapter-04"
  | "msg17-chapter-05"
  | "msg17-chapter-06"
  | "msg17-chapter-07"
  | "msg17-chapter-08"
  | "msg17-publishing-postscript"
  | "msg17-official-final-review"
  | "pdp16-official-learning-map"
  | "pdp16-copyright"
  | "pdp16-to-readers"
  | "pdp16-praise"
  | "pdp16-recommendation"
  | "pdp16-author-statement"
  | "pdp16-introduction"
  | "pdp16-chapter-01"
  | "pdp16-chapter-02"
  | "pdp16-chapter-03"
  | "pdp16-chapter-04"
  | "pdp16-chapter-05"
  | "pdp16-chapter-06"
  | "pdp16-chapter-07"
  | "pdp16-chapter-08"
  | "pdp16-chapter-09"
  | "pdp16-references-notes"
  | "pdp16-official-final-review"
  | "ooc16-official-learning-map"
  | "ooc16-chinese-preface"
  | "ooc16-chapter-01"
  | "ooc16-chapter-02"
  | "ooc16-chapter-03"
  | "ooc16-chapter-04"
  | "ooc16-chapter-05"
  | "ooc16-chapter-06"
  | "ooc16-chapter-07"
  | "ooc16-chapter-08"
  | "ooc16-chapter-09"
  | "ooc16-chapter-10"
  | "ooc16-chapter-11"
  | "ooc16-chapter-12"
  | "ooc16-chapter-13"
  | "ooc16-chapter-14"
  | "ooc16-chapter-15"
  | "ooc16-chapter-16"
  | "ooc16-chapter-17"
  | "ooc16-chapter-18"
  | "ooc16-chapter-19"
  | "ooc16-chapter-20"
  | "ooc16-chapter-21"
  | "ooc16-chapter-22"
  | "ooc16-chapter-23"
  | "ooc16-chapter-24"
  | "ooc16-translator-postscript"
  | "ooc16-official-final-review"
  | "eex19-official-learning-map"
  | "eex19-recommendation-01"
  | "eex19-recommendation-02"
  | "eex19-recommendation-03"
  | "eex19-preface"
  | "eex19-chapter-01"
  | "eex19-chapter-02"
  | "eex19-chapter-03"
  | "eex19-chapter-04"
  | "eex19-chapter-05"
  | "eex19-chapter-06"
  | "eex19-chapter-07"
  | "eex19-chapter-08"
  | "eex19-official-final-review"
  | "opt-23-official-learning-map"
  | "opt-23-introduction"
  | "opt-23-chapter-01"
  | "opt-23-chapter-02"
  | "opt-23-chapter-03"
  | "opt-23-chapter-04"
  | "opt-23-afterword"
  | "opt-23-official-final-review";

/** 认知层级：1 认记 / 2 理解 / 3 应用 / 4 综合。 */
export type ReviewLevel = 1 | 2 | 3 | 4;

export type ReviewQuestion = {
  id: string;
  chapter: ReviewChapterSlug;
  level: ReviewLevel;
  question: string;
  answer: string;
  tags?: string[];
};

/** 章节 slug → 中文章名（卡片上展示，复习页无 MDX frontmatter 可读，故就近内置）。 */
export const CHAPTER_TITLES: Record<ReviewChapterSlug, string> = {
  "ga2-introduction-to-algorithms": "算法简介",
  "ga2-selection-sort": "选择排序",
  "ga2-recursion": "递归",
  "ga2-quicksort": "快速排序",
  "ga2-hash-tables": "散列表",
  "ga2-breadth-first-search": "广度优先搜索",
  "ga2-trees": "树",
  "ga2-balanced-trees": "平衡树",
  "ga2-dijkstras-algorithm": "狄克斯特拉算法",
  "ga2-greedy-algorithms": "贪心算法",
  "ga2-dynamic-programming": "动态规划",
  "ga2-k-nearest-neighbors": "K 近邻算法",
  "ga2-where-to-go-next": "下一步学什么",
  "adp-official-learning-map": "2018年正式版权威学习地图",
  "adp-preface": "はじめに（前言）",
  "adp-01-android-app-basic-structure": "第1章 Android 应用的基本构成",
  "adp-02-mvvm-application-structure": "第2章 MVVM 模式应用构成",
  "adp-03-mvp-application-structure": "第3章 MVP 模式应用构成",
  "adp-04-incremental-development-design": "第4章 差分开发中的设计方法",
  "adp-05-designer-role-in-oss": "第5章 OSS 中设计者的角色",
  "adp-06-flux-architecture": "第6章 Flux 架构",
  "adp-07-team-and-architecture": "第7章 团队与架构",
  "adp-08-android-architecture-components":
    "第8章 Android Architecture Components",
  "adp-afterword": "おわりに（后记）",
  "adp-index": "索引（概念检索矩阵）",
  "adp-author-profiles": "著者紹介（作者与案例责任）",
  "adp-official-final-review": "2018年正式版总复习",
  "gea3-official-learning-map": "《游戏引擎架构》第3版权威学习地图",
  "gea3-preface": "前言（Preface）",
  "gea3-chapter-01-introduction": "第1章 Introduction",
  "gea3-chapter-02-tools-of-the-trade": "第2章 Tools of the Trade",
  "gea3-chapter-03-software-engineering":
    "第3章 Fundamentals of Software Engineering for Games",
  "gea3-chapter-04-parallelism-concurrency":
    "第4章 Parallelism and Concurrent Programming",
  "gea3-chapter-05-3d-math": "第5章 3D Math for Games",
  "gea3-chapter-06-engine-support": "第6章 Engine Support Systems",
  "gea3-chapter-07-resources-file-system":
    "第7章 Resources and the File System",
  "gea3-chapter-08-game-loop": "第8章 The Game Loop and Real-Time Simulation",
  "gea3-chapter-09-human-interface": "第9章 Human Interface Devices (HID)",
  "gea3-chapter-10-debugging-development":
    "第10章 Tools for Debugging and Development",
  "gea3-chapter-11-rendering-engine": "第11章 The Rendering Engine",
  "gea3-chapter-12-animation-systems": "第12章 Animation Systems",
  "gea3-chapter-13-collision-rigid-body":
    "第13章 Collision and Rigid Body Dynamics",
  "gea3-chapter-14-audio": "第14章 Audio",
  "gea3-chapter-15-gameplay-introduction":
    "第15章 Introduction to Gameplay Systems",
  "gea3-chapter-16-runtime-gameplay":
    "第16章 Runtime Gameplay Foundation Systems",
  "gea3-chapter-17-more": "第17章 You Mean There’s More?",
  "gea3-bibliography": "参考文献（Bibliography）",
  "gea3-index": "索引（Index）",
  "gea3-official-final-review": "《游戏引擎架构》第3版全书综合复核",
  "gm3d-official-learning-map": "《3D数学基础》全书导览",
  "gm3d-cartesian-coordinate-systems": "第1章 笛卡尔坐标系",
  "gm3d-vectors": "第2章 向量",
  "gm3d-multiple-coordinate-spaces": "第3章 多个坐标空间",
  "gm3d-introduction-to-matrices": "第4章 矩阵导论",
  "gm3d-matrices-linear-transformations": "第5章 矩阵与线性变换",
  "gm3d-more-on-matrices": "第6章 矩阵进阶",
  "gm3d-polar-coordinate-systems": "第7章 极坐标系",
  "gm3d-rotation-three-dimensions": "第8章 三维旋转",
  "gm3d-geometric-primitives": "第9章 几何图元",
  "gm3d-mathematical-topics-graphics": "第10章 3D图形学中的数学主题",
  "gm3d-linear-kinematics-calculus": "第11章 力学1：线性运动学与微积分",
  "gm3d-linear-rotational-dynamics": "第12章 力学2：线性与旋转动力学",
  "gm3d-curves-in-3d": "第13章 三维曲线",
  "gm3d-afterword": "第14章 后记：接下来做什么",
  "gm3d-geometric-tests": "附录A 几何测试",
  "gm3d-official-final-review": "《3D数学基础》全书总复习",
  "hello-window": "你好，窗口",
  "hello-triangle": "你好，三角形",
  shaders: "着色器",
  textures: "纹理",
  transformations: "变换",
  "coordinate-systems": "坐标系统",
  camera: "摄像机",
  colors: "颜色",
  "basic-lighting": "基础光照",
  materials: "材质",
  "lighting-maps": "光照贴图",
  "light-casters": "投光物",
  "multiple-lights": "多光源",
  assimp: "Assimp",
  mesh: "网格",
  model: "模型",
  "depth-testing": "深度测试",
  "stencil-testing": "模板测试",
  blending: "混合",
  "face-culling": "面剔除",
  framebuffers: "帧缓冲",
  cubemaps: "立方体贴图",
  "advanced-data": "高级数据",
  "advanced-glsl": "高级 GLSL",
  "geometry-shader": "几何着色器",
  instancing: "实例化",
  "anti-aliasing": "抗锯齿",
  "blinn-phong": "高级光照",
  "gamma-correction": "Gamma 校正",
  "shadow-mapping": "阴影映射",
  "point-shadows": "点阴影",
  "normal-mapping": "法线贴图",
  "parallax-mapping": "视差贴图",
  hdr: "HDR",
  bloom: "泛光",
  "deferred-shading": "延迟着色",
  ssao: "SSAO",
  "cpr-data-and-c": "数据和C",
  "cpp-getting-started": "快速入门",
  "cpp-variables-and-types": "变量和基本类型",
  "cpp-strings-vectors-arrays": "字符串、向量和数组",
  "cpp-expressions": "表达式",
  "cpp-statements": "语句",
  "cpp-functions": "函数",
  "cpp-classes": "类",
  "cpp-io-library": "IO库",
  "cpp-sequential-containers": "顺序容器",
  "cpp-generic-algorithms": "泛型算法",
  "cpp-associative-containers": "关联容器",
  "cpp-dynamic-memory": "动态内存",
  "cpp-copy-control": "拷贝控制",
  "cpp-overloaded-operations": "重载运算与类型转换",
  "cpp-templates": "模板与泛型编程",
  "cpp-oop": "面向对象程序设计",
  "cpp-specialized-library": "标准库特殊设施",
  "cpp-specialized-tools": "特殊工具与技术",
  "cpp-large-programs": "用于大型程序的工具",
  // C Primer Plus（第6版）
  "cpr-getting-ready": "初识C语言",
  "cpr-introducing-c": "C语言概述",
  "cpr-strings-io": "字符串和格式化输入/输出",
  "cpr-operators-expressions": "运算符、表达式和语句",
  "cpr-control-loops": "C控制语句：循环",
  "cpr-control-branching": "C控制语句：分支与跳转",
  "cpr-char-io-validation": "字符I/O与输入验证",
  "cpr-functions": "函数",
  "cpr-arrays-pointers": "数组和指针",
  "cpr-strings-functions": "字符串和字符串函数",
  "cpr-storage-linkage-memory": "存储类、链接和内存管理",
  "cpr-file-io": "文件输入/输出",
  "cpr-structures": "结构和其他数据形式",
  "cpr-preprocessor": "C预处理器",
  "cpr-bit-fiddling": "位操作",
  "cpr-advanced-data": "高级数据表示",
  // Android进阶解密
  "aad8-official-learning-map": "Android 8.0源码权威学习地图",
  "aad8-01-android-system-architecture": "第1章 Android系统架构",
  "aad8-02-android-system-startup": "第2章 Android系统启动",
  "aad8-03-app-process-startup": "第3章 应用程序进程启动过程",
  "aad8-04-four-components-workflow": "第4章 四大组件的工作过程",
  "aad8-05-context": "第5章 理解上下文Context",
  "aad8-06-activity-manager-service": "第6章 理解ActivityManagerService",
  "aad8-07-window-manager": "第7章 理解WindowManager",
  "aad8-08-window-manager-service": "第8章 理解WindowManagerService",
  "aad8-09-jni": "第9章 JNI原理",
  "aad8-10-java-virtual-machine": "第10章 Java虚拟机",
  "aad8-11-dalvik-art": "第11章 Dalvik和ART",
  "aad8-12-class-loader": "第12章 理解ClassLoader",
  "aad8-13-hotfix": "第13章 热修复原理",
  "aad8-14-hook": "第14章 Hook技术",
  "aad8-15-pluginization": "第15章 插件化原理",
  "aad8-16-rendering-optimization": "第16章 绘制优化",
  "aad8-17-memory-optimization": "第17章 内存优化",
  "aad8-official-final-review": "Android 8.0源码总复习",
  // BNRG
  "bnrg-first-app": "Android开发初体验",
  "bnrg-mvc": "Android与MVC设计模式",
  "bnrg-lifecycle": "activity的生命周期",
  "bnrg-ui-state": "UI状态的保存与恢复",
  "bnrg-debugging": "Android应用的调试",
  "bnrg-second-activity": "第二个activity",
  "bnrg-sdk-compat": "Android SDK版本与兼容",
  "bnrg-fragments": "UI fragment与fragment管理器",
  "bnrg-recyclerview": "使用RecyclerView显示列表",
  "bnrg-layouts": "使用布局与部件创建用户界面",
  "bnrg-room": "数据库与Room库",
  "bnrg-fragment-nav": "Fragment Navigation",
  "bnrg-dialogs": "对话框",
  "bnrg-app-bar": "应用栏",
  "bnrg-implicit-intents": "隐式intent",
  "bnrg-taking-pictures": "使用intent拍照",
  "bnrg-localization": "应用本地化",
  "bnrg-accessibility": "Android辅助功能",
  "bnrg-data-binding": "数据绑定与MVVM",
  "bnrg-audio-testing": "音频播放与单元测试",
  "bnrg-styles": "样式与主题",
  "bnrg-xml-drawables": "XML drawable",
  "bnrg-more-intents": "深入学习intent和任务",
  "bnrg-http-background": "HTTP与后台任务",
  "bnrg-looper-handler": "Looper、Handler和HandlerThread",
  "bnrg-search": "搜索",
  "bnrg-workmanager": "WorkManager",
  "bnrg-broadcast": "broadcast intent",
  "bnrg-webview": "网页浏览",
  "bnrg-custom-views": "定制视图与触摸事件",
  "bnrg-property-animation": "属性动画",
  "bnrg-afterword": "编后语",
  // Unity Game Optimization
  "ugo-official-learning-map": "Unity Game Optimization 第三版官方学习地图",
  "ugo-evaluating-performance-problems": "评估性能问题",
  "ugo-scripting-strategies": "脚本优化策略",
  "ugo-benefits-of-batching": "合批的收益",
  "ugo-optimizing-art-assets": "美术资源优化",
  "ugo-faster-physics": "物理加速",
  "ugo-dynamic-graphics": "动态图形",
  "ugo-xr-optimizations": "XR 优化",
  "ugo-memory-management": "内存管理",
  "ugo-data-oriented-technology-stack": "DOTS 数据导向技术栈",
  "ugo-tactical-tips-and-tricks": "战术技巧",
  "ugo-official-final-review": "Unity Game Optimization 第三版综合验收",
  // Profiling Unity Games
  "prof-official-learning-map": "《Unity 游戏性能分析终极指南》权威学习地图",
  "prof-01-profiling-101": "Profiling 101：帧预算、帧结构与测量方法",
  "prof-02-profiling-workflow": "端到端 Profiling 工作流与性能基线",
  "prof-03-cpu-render-worker-bounds": "CPU、渲染线程与工作线程瓶颈",
  "prof-04-gpu-mobile-power": "GPU 瓶颈、移动端温控与电池寿命",
  "prof-05-memory-budget-profiling": "内存预算与 Memory Profiling 方法",
  "prof-06-unity-profiler": "Unity Profiler：连接、采集与读图",
  "prof-07-profile-analyzer": "Profile Analyzer：多帧统计与前后对比",
  "prof-08-memory-profiler": "Memory Profiler：快照、泄漏与 GC",
  "prof-09-frame-rendering-debuggers": "Frame Debugger 与 Rendering Debugger",
  "prof-10-project-auditor-deep-profiling": "Project Auditor 与 Deep Profiling",
  "prof-11-tool-selection-automation": "工具选择、自动指标与性能测试",
  "prof-12-native-tool-index": "原生平台 Profiling 工具索引",
  "prof-13-gpu-tools-resources": "GPU 调试工具与进阶资源",
  "prof-official-final-review": "《Unity 游戏性能分析终极指南》综合验收",
  // Mobile/XR/Web Optimization, Unity 6 edition
  "mxrw-official-learning-map": "《移动、XR 与 Web 性能优化》权威学习地图",
  "mxrw-01-introduction": "导言：把优化变成贯穿开发周期的工程合同",
  "mxrw-02-choose-urp": "选择 URP：性能、视觉质量与跨平台伸缩",
  "mxrw-03-profiling-tips": "Profiling：目标机基线、帧预算与瓶颈归因",
  "mxrw-04-memory-management": "内存管理：预算、快照、分配与增量 GC",
  "mxrw-05-adaptive-performance": "Adaptive Performance：热状态驱动的动态质量",
  "mxrw-06-assets": "资产：纹理、网格、导入门禁与 Addressables",
  "mxrw-07-programming-architecture":
    "编程与代码架构：PlayerLoop、缓存与对象池",
  "mxrw-08-project-configuration": "项目配置：帧率、层级、物理与 VSync",
  "mxrw-09-graphics-gpu": "图形与 GPU：Draw Call、光照、LOD 与分辨率",
  "mxrw-10-shaders": "Shader：过绘、透明、后处理与移动 GPU 指标",
  "mxrw-11-user-interface": "用户界面：UGUI Canvas 与 UI Toolkit 成本模型",
  "mxrw-12-audio": "音频：声道、压缩、加载类型与采样率",
  "mxrw-13-animation": "动画：骨骼、可见性、绑定与层级成本",
  "mxrw-14-physics": "物理：Collider、步进、查询与调试器",
  "mxrw-15-workflow-collaboration":
    "工作流与协作：版本控制、场景拆分与资源清理",
  "mxrw-16-unity-web": "Unity Web：发布设置、Wasm 2023 与 Chrome DevTools",
  "mxrw-17-xr": "XR：Render Mode、注视点渲染与交互测试",
  "mxrw-official-final-review": "《移动、XR 与 Web 性能优化》综合验收",
  // PBR
  "pbr-theory": "PBR 理论",
  "pbr-lighting": "PBR 光照",
  "pbr-ibl-diffuse": "IBL 漫反射辐照",
  "pbr-ibl-specular": "IBL 镜面反射",
  // C++ 并发编程实战（第2版）
  "cc-hello-concurrency": "你好并发世界",
  "cc-managing-threads": "管理线程",
  "cc-protecting-shared-data": "线程间共享数据",
  "cc-synchronizing-operations": "同步并发操作",
  "cc-atomic-types": "原子类型与内存模型基础",
  "cc-memory-ordering": "内存顺序与同步关系",
  "cc-lock-based": "基于锁的并发数据结构",
  "cc-lock-free": "无锁并发数据结构",
  "cc-designing-concurrent-code": "设计并发代码",
  "cc-thread-pools": "高级线程管理：线程池",
  "cc-parallel-algorithms": "并行算法",
  "cc-testing-debugging": "多线程应用的测试与调试",
  // Unity 5 权威讲解，李在贤，2016
  "u5-official-learning-map": "《Unity 5权威讲解》权威学习地图",
  "u5-01-unity5-introduction": "第1章 Unity 5 简介",
  "u5-02-project-preparation": "第2章 准备游戏开发",
  "u5-03-game-scene": "第3章 制作游戏场景",
  "u5-04-player-character": "第4章 制作主人公角色",
  "u5-05-projectile-effects": "第5章 制作子弹发射效果",
  "u5-06-enemy-character": "第6章 制作敌对角色",
  "u5-07-unity-ui": "第7章 Unity UI",
  "u5-08-game-manager": "第8章 游戏管理器",
  "u5-09-raycasting": "第9章 灵活运用射线投射",
  "u5-10-navigation-advanced": "第10章 导航仪高级技巧",
  "u5-11-lightmaps-light-probes": "第11章 光照贴图与灯光探测器",
  "u5-12-scene-split-merge": "第12章 场景分离与合并",
  "u5-13-built-in-networking": "第13章 Unity 内置网络游戏",
  "u5-14-photon-cloud": "第14章 使用 Photon Cloud 制作网络游戏",
  "u5-15-game-realism": "第15章 提升游戏真实感",
  "u5-appendix-database": "附录 数据库",
  "u5-official-final-review": "《Unity 5权威讲解》全书综合验收",
  // AI Agent 开发实战
  "ai-what-is-agent": "什么是 AI Agent",
  "ai-llm-brain": "LLM：Agent 的大脑",
  "ai-prompting-roles": "提示工程与角色设定",
  "ai-react-loop": "ReAct：推理与行动循环",
  "ai-tool-calling": "工具调用 Tool Calling",
  "ai-memory": "记忆系统 Memory",
  "ai-planning": "规划与任务分解",
  "ai-rag": "RAG 检索增强生成",
  "ai-context-engineering": "上下文工程与压缩",
  "ai-multi-agent-patterns": "多智能体协作模式",
  "ai-orchestration": "编排·通信·终止",
  "ai-evaluation-observability": "评估与可观测性",
  "ai-safety-guardrails": "安全护栏与成本控制",
  "ai-production-deployment": "生产化部署",
  // 从零构建 AI Agent
  "agt-chatbot-to-agent": "从聊天机器人到智能体",
  "agt-llm-as-brain": "大模型：智能体的大脑",
  "agt-agent-anatomy": "智能体解剖图",
  "agt-prompt-engineering": "提示工程基础",
  "agt-sampling-decoding": "采样与解码",
  "agt-structured-output": "结构化输出",
  "agt-function-calling": "函数调用原理",
  "agt-react-loop": "ReAct 循环",
  "agt-tool-design": "工具设计与安全执行",
  // AI 智能体应用开发
  "agent-what-is-an-agent": "什么是 AI Agent：从会聊天到会做事",
  "agent-augmented-llm": "增强型 LLM：工具、检索与记忆",
  "agent-agentic-loop": "智能体循环：Reason → Act → Observe",
  "agent-first-agent": "第一个 Agent：从脚本到闭环",
  "agent-prompt-engineering": "提示工程：把意图写进上下文",
  "agent-context-window": "上下文窗口：预算、压缩与遗忘",
  "agent-structured-output": "结构化输出：让回答可解析",
  "agent-function-calling": "函数调用：模型如何选择工具",
  "agent-tool-design": "工具设计：边界、粒度与错误恢复",
  "agent-mcp": "MCP：把工具连接成生态",
  "agent-workflow-vs-agent": "工作流 vs 智能体：什么时候该让它自己决定",
  "agent-chaining-and-routing": "链式与路由：把任务拆成稳定路径",
  "agent-parallelization-and-orchestrator-workers": "并行化与编排者-工人模式",
  "agent-evaluator-optimizer": "评估器-优化器：让模型审自己",
  "agent-autonomous-agents": "自主智能体：开放循环与风险边界",
  "agent-combining-patterns": "组合模式：把多个 agentic pattern 拼成系统",
  "agent-agents-in-practice": "实践中的 Agent：从客服到代码助手",
  "agent-tool-prompt-engineering":
    "工具提示工程：让 agent 会用工具而不是猜工具",
  "agent-production-readiness-checklist":
    "生产化收官：简单、透明与 ACI 上线检查清单",
  "auto-learning-map": "汽车为什么会跑：全书学习地图",
  "auto-whole-car-system": "整车系统",
  "auto-body-structure": "车身结构",
  "auto-engine-principles": "发动机原理",
  "auto-transmission-principles": "变速器原理",
  "auto-drivetrain-system": "传动系统",
  "auto-suspension-system": "悬架系统",
  "auto-steering-system": "转向系统",
  "auto-brake-system": "制动系统",
  "auto-electronics-system": "电气电子",
  "auto-tire-wheel-system": "车轮轮胎",
  "auto-electric-drive-system": "电力驱动",
  "auto-design-manufacturing": "设计制造",
  "auto-final-review": "汽车为什么会跑总复习",
  // 设计模式
  "dp-learning-map": "设计模式全书学习地图",
  "dp-intro": "什么是设计模式",
  "dp-strategy": "策略模式",
  "dp-observer": "观察者模式",
  "dp-decorator": "装饰器模式",
  "dp-command": "命令模式",
  "dp-state": "状态模式",
  "dp-singleton": "单例模式",
  "dp-factory-method": "工厂方法模式",
  "dp-abstract-factory": "抽象工厂模式",
  "dp-builder": "建造者模式",
  "dp-prototype": "原型模式",
  "dp-adapter": "适配器模式",
  "dp-bridge": "桥接模式",
  "dp-composite": "组合模式",
  "dp-facade": "外观模式",
  "dp-flyweight": "享元模式",
  "dp-proxy": "代理模式",
  "dp-chain-of-responsibility": "责任链模式",
  "dp-iterator": "迭代器模式",
  "dp-mediator": "中介者模式",
  "dp-memento": "备忘录模式",
  "dp-template-method": "模板方法模式",
  "dp-visitor": "访问者模式",
  "dp-interpreter": "解释器模式",
  "dp-compound-patterns": "复合模式",
  "dp-final-review": "设计模式总复习",
  "gpp-official-learning-map": "《游戏编程模式》权威学习地图",
  "gpp-acknowledgements": "Acknowledgements",
  "gpp-introduction": "I. Introduction",
  "gpp-chapter-01-architecture-performance-games":
    "1. Architecture, Performance, and Games",
  "gpp-design-patterns-revisited": "II. Design Patterns Revisited",
  "gpp-chapter-02-command": "2. Command",
  "gpp-chapter-03-flyweight": "3. Flyweight",
  "gpp-chapter-04-observer": "4. Observer",
  "gpp-chapter-05-prototype": "5. Prototype",
  "gpp-chapter-06-singleton": "6. Singleton",
  "gpp-chapter-07-state": "7. State",
  "gpp-sequencing-patterns": "III. Sequencing Patterns",
  "gpp-chapter-08-double-buffer": "8. Double Buffer",
  "gpp-chapter-09-game-loop": "9. Game Loop",
  "gpp-chapter-10-update-method": "10. Update Method",
  "gpp-behavioral-patterns": "IV. Behavioral Patterns",
  "gpp-chapter-11-bytecode": "11. Bytecode",
  "gpp-chapter-12-subclass-sandbox": "12. Subclass Sandbox",
  "gpp-chapter-13-type-object": "13. Type Object",
  "gpp-decoupling-patterns": "V. Decoupling Patterns",
  "gpp-chapter-14-component": "14. Component",
  "gpp-chapter-15-event-queue": "15. Event Queue",
  "gpp-chapter-16-service-locator": "16. Service Locator",
  "gpp-optimization-patterns": "VI. Optimization Patterns",
  "gpp-chapter-17-data-locality": "17. Data Locality",
  "gpp-chapter-18-dirty-flag": "18. Dirty Flag",
  "gpp-chapter-19-object-pool": "19. Object Pool",
  "gpp-chapter-20-spatial-partition": "20. Spatial Partition",
  "gpp-official-final-review": "《游戏编程模式》全书总复习",
  "cqr-learning-map": "代码质量与重构全书学习地图",
  "cqr-intro": "整洁代码的意义",
  "cqr-naming": "有意义的命名",
  "cqr-functions": "函数",
  "cqr-comments-format": "注释与格式",
  "cqr-error-handling": "错误处理",
  "cqr-testing": "单元测试",
  "cqr-classes": "类与组织",
  "cqr-code-smells": "代码异味",
  "cqr-refactoring-techniques": "重构手法",
  "cqr-final-review": "代码质量总复习",
  // 架构与领域设计
  "add-learning-map": "架构与领域设计全书学习地图",
  "add-what-is-architecture": "什么是架构",
  "add-solid-principles": "SOLID 原则",
  "add-dependency-inversion": "依赖倒置与边界",
  "add-layered-architecture": "分层架构",
  "add-clean-architecture": "整洁架构",
  "add-ddd-fundamentals": "DDD 核心概念",
  "add-bounded-context": "限界上下文",
  "add-tactical-patterns": "实体、值对象与聚合",
  "add-strategic-patterns": "上下文映射",
  "add-cqrs-event-sourcing": "CQRS 与事件溯源",
  "add-hexagonal-architecture": "六边形架构",
  "add-final-review": "架构与领域设计总复习",
  // 高级算法与算法工程
  "aae-learning-map": "高级算法与算法工程全书学习地图",
  "aae-complexity-analysis": "复杂度分析与工程权衡",
  "aae-advanced-data-structures": "高级数据结构",
  "aae-graph-algorithms": "高级图算法",
  "aae-string-algorithms": "字符串算法",
  "aae-approximation-algorithms": "近似算法",
  "aae-randomized-algorithms": "随机算法",
  "aae-parallel-algorithms": "并行算法",
  "aae-distributed-algorithms": "分布式算法",
  "aae-indexing-search": "索引与搜索引擎",
  "aae-algorithm-engineering": "算法工程化实践",
  "aae-final-review": "高级算法与算法工程总复习",
  // 汽车系统专项
  "ass-learning-map": "汽车系统专项全书学习地图",
  "ass-engine-thermodynamics": "发动机热力学与工作循环",
  "ass-engine-performance": "发动机性能与增压技术",
  "ass-transmission-types": "变速器类型与对比",
  "ass-drivetrain-components": "传动系统核心部件",
  "ass-suspension-systems": "悬架系统深入",
  "ass-steering-brake-systems": "转向与制动系统",
  "ass-ecu-can-bus": "ECU与CAN总线",
  "ass-sensors-actuators": "传感器与执行器",
  "ass-body-electronics": "车身电子系统",
  "ass-ev-motor-controller": "电驱系统：电机与电控",
  "ass-battery-management": "动力电池与BMS",
  "ass-final-review": "汽车系统专项总复习",
  // 车载软件与智能化
  "vsi-learning-map": "车载软件与智能化全书学习地图",
  "vsi-smart-cockpit": "智能座舱架构",
  "vsi-ivi-platform": "车载信息娱乐系统平台",
  "vsi-middleware": "车载中间件",
  "vsi-ota-updates": "OTA升级与软件管理",
  "vsi-perception-sensors": "感知传感器体系",
  "vsi-sensor-fusion": "多传感器融合",
  "vsi-perception-algorithms": "感知算法基础",
  "vsi-path-planning": "路径规划",
  "vsi-vehicle-control": "车辆控制与执行",
  "vsi-functional-safety": "功能安全 ISO 26262",
  "vsi-cybersecurity": "车载信息安全",
  "vsi-final-review": "车载软件与智能化总复习",
  // C 程序设计语言（K&R）
  "krc-learning-map": "C 程序设计语言全书学习地图",
  "krc-types-operators": "类型、运算符与表达式",
  "krc-control-flow": "控制流",
  "krc-functions-program": "函数与程序结构",
  "krc-pointers-arrays": "指针与数组",
  "krc-pointer-arithmetic": "指针运算与字符串",
  "krc-structures": "结构体与联合",
  "krc-input-output": "输入与输出",
  "krc-unix-interface": "UNIX 系统接口",
  "krc-final-review": "C 程序设计语言总复习",
  // C++ 游戏编程入门
  "bcg-learning-map": "C++ 游戏编程入门学习地图",
  "bcg-types-variables": "类型、变量与运算",
  "bcg-flow-control": "流程控制",
  "bcg-functions": "函数与引用",
  "bcg-classes-oop": "类与面向对象",
  "bcg-game-loop": "游戏循环与状态",
  "bcg-graphics-sfml": "图形与 SFML",
  "bcg-collision-detection": "碰撞检测",
  "bcg-game-project": "综合游戏项目",
  "bcg-final-review": "C++ 游戏编程入门总复习",
  // Effective C++
  "efc-learning-map": "Effective C++ 学习地图",
  "efc-resource-management": "资源管理",
  "efc-constructors-destructors": "构造与析构",
  "efc-class-design": "类与设计",
  "efc-inheritance-polymorphism": "继承与多态",
  "efc-templates-generics": "模板与泛型",
  "efc-template-metaprogramming": "模板元编程",
  "efc-new-exceptions": "new、delete 与异常",
  "efc-coding-conventions": "编码约定",
  "efc-final-review": "Effective C++ 总复习",
  // Effective Modern C++
  "emc-learning-map": "Effective Modern C++ 学习地图",
  "emc-type-deduction": "类型推导",
  "emc-auto-decltype": "auto 与 decltype",
  "emc-smart-pointers": "智能指针",
  "emc-unique-shared-ptr": "unique_ptr 与 shared_ptr",
  "emc-move-semantics": "移动语义",
  "emc-perfect-forwarding": "完美转发",
  "emc-lambda-expressions": "Lambda 表达式",
  "emc-concurrency-api": "并发 API",
  "emc-final-review": "Effective Modern C++ 总复习",
  // C++ 高性能编程
  "chp-learning-map": "C++ 高性能编程学习地图",
  "chp-brief-introduction-to-cpp": "第1章 C++简要介绍",
  "chp-modern-cpp-concepts": "第2章 现代C++核心技术",
  "chp-measuring-performance": "第3章 测量性能",
  "chp-data-structures": "第4章 数据结构",
  "chp-deeper-look-at-iterators": "第5章 深入迭代器",
  "chp-stl-algorithms-and-beyond": "第6章 STL算法及其扩展",
  "chp-memory-management": "第7章 内存管理",
  "chp-metaprogramming-compile-time": "第8章 元编程与编译期求值",
  "chp-proxy-objects-lazy-evaluation": "第9章 代理对象与惰性求值",
  "chp-concurrency": "第10章 并发",
  "chp-parallel-stl": "第11章 Parallel STL",
  "chp-final-review": "C++ 高性能编程总复习",
  // 深度探索 C++ 对象模型
  "ico-learning-map": "深度探索 C++ 对象模型学习地图",
  "ico-object-lessons": "第1章 对象模型初识",
  "ico-semantics-of-constructors": "第2章 构造函数语义",
  "ico-semantics-of-data": "第3章 数据语义",
  "ico-semantics-of-function": "第4章 函数语义",
  "ico-construction-destruction-copy": "第5章 构造、析构与复制语义",
  "ico-runtime-semantics": "第6章 运行期语义",
  "ico-cusp-of-object-model": "第7章 对象模型边缘",
  "ico-final-review": "深度探索 C++ 对象模型总复习",
  // C++ 性能优化指南
  "opc-learning-map": "学习路线图",
  "opc-overview-of-optimization": "第1章 优化全景",
  "opc-computer-behavior": "第2章 影响优化的计算机行为",
  "opc-measure-performance": "第3章 测量性能",
  "opc-optimize-string-use": "第4章 优化字符串使用案例",
  "opc-optimize-algorithms": "第5章 优化算法",
  "opc-dynamically-allocated-variables": "第6章 优化动态分配变量",
  "opc-optimize-hot-statements": "第7章 优化热点语句",
  "opc-use-better-libraries": "第8章 使用更好的库",
  "opc-searching-and-sorting": "第9章 优化查找与排序",
  "opc-optimize-data-structures": "第10章 优化数据结构",
  "opc-optimize-io": "第11章 优化 I/O",
  "opc-optimize-concurrency": "第12章 优化并发",
  "opc-optimize-memory-management": "第13章 优化内存管理",
  "opc-final-review": "C++ 性能优化指南总复习",
  // Modern C++ Design
  "mcd-learning-map": "学习路线图",
  "mcd-policy-based-class-design": "第1章 基于 Policy 的类设计",
  "mcd-techniques": "第2章 模板技术工具箱",
  "mcd-typelists": "第3章 Typelists",
  "mcd-small-object-allocation": "第4章 小对象分配",
  "mcd-generalized-functors": "第5章 广义仿函数",
  "mcd-implementing-singletons": "第6章 实现 Singletons",
  "mcd-smart-pointers": "第7章 智能指针",
  "mcd-object-factories": "第8章 对象工厂",
  "mcd-abstract-factory": "第9章 抽象工厂",
  "mcd-visitor": "第10章 Visitor",
  "mcd-multimethods": "第11章 Multimethods",
  "mcd-final-review": "Modern C++ Design 总复习",
  // CPU 眼里的 C++
  "cpc-learning-map": "从源码到 CPU 证据",
  "cpc-prerequisites": "第1章 预备知识",
  "cpc-basic-syntax": "第2章 基础语法",
  "cpc-function-principles": "第3章 函数原理",
  "cpc-cpp-features": "第4章 C++ 特性",
  "cpc-advanced-programming": "第5章 高级编程",
  "cpc-interview-challenges": "第6章 面试挑战",
  "cpc-final-review": "从现象回到证据链",
  // Easy C++（第5版）
  "ecp-learning-map": "学习路线图",
  "ecp-first-steps": "Lesson 1 迈出第一步",
  "ecp-cpp-basics": "Lesson 2 C++ 的基本结构",
  "ecp-variables": "Lesson 3 变量",
  "ecp-expressions-and-operators": "Lesson 4 表达式与运算符",
  "ecp-conditional-processing": "Lesson 5 按情况处理",
  "ecp-repetition": "Lesson 6 反复执行",
  "ecp-functions": "Lesson 7 函数",
  "ecp-pointers": "Lesson 8 指针",
  "ecp-arrays": "Lesson 9 数组",
  "ecp-building-large-programs": "Lesson 10 构建大型程序",
  "ecp-various-types": "Lesson 11 各种类型",
  "ecp-class-basics": "Lesson 12 类的基本",
  "ecp-class-features": "Lesson 13 类的功能",
  "ecp-new-classes": "Lesson 14 新的类",
  "ecp-advanced-class-topics": "Lesson 15 类的高级主题",
  "ecp-file-input-output": "Lesson 16 文件输入输出",
  "ecp-final-review": "Easy C++ 总复习",
  // C++ Primer Plus
  "epp-learning-map": "学习路线图",
  "epp-getting-started-with-cpp": "Chapter 1 Getting Started with C++",
  "epp-setting-out-to-cpp": "Chapter 2 Setting Out to C++",
  "epp-dealing-with-data": "Chapter 3 Dealing with Data",
  "epp-compound-types": "Chapter 4 Compound Types",
  "epp-loops-and-relational-expressions":
    "Chapter 5 Loops and Relational Expressions",
  "epp-branching-statements-and-logical-operators":
    "Chapter 6 Branching Statements and Logical Operators",
  "epp-functions-programming-modules":
    "Chapter 7 Functions: C++'s Programming Modules",
  "epp-adventures-in-functions": "Chapter 8 Adventures in Functions",
  "epp-memory-models-and-namespaces": "Chapter 9 Memory Models and Namespaces",
  "epp-objects-and-classes": "Chapter 10 Objects and Classes",
  "epp-working-with-classes": "Chapter 11 Working with Classes",
  "epp-classes-and-dynamic-memory-allocation":
    "Chapter 12 Classes and Dynamic Memory Allocation",
  "epp-class-inheritance": "Chapter 13 Class Inheritance",
  "epp-reusing-code-in-cpp": "Chapter 14 Reusing Code in C++",
  "epp-friends-exceptions-and-more": "Chapter 15 Friends, Exceptions, and More",
  "epp-string-class-and-stl":
    "Chapter 16 The string Class and the Standard Template Library",
  "epp-input-output-and-files": "Chapter 17 Input, Output, and Files",
  "epp-visiting-new-cpp-standard":
    "Chapter 18 Visiting with the New C++ Standard",
  "epp-final-review": "C++ Primer Plus 总复习",
  // 现代 C++ 测试驱动开发
  "ctr-learning-map": "学习路线图",
  "ctr-global-setup": "Chapter 1 Global Setup",
  "ctr-tdd-first-example": "Chapter 2 Test-Driven Development: A First Example",
  "ctr-tdd-foundations": "Chapter 3 Test-Driven Development Foundations",
  "ctr-test-construction": "Chapter 4 Test Construction",
  "ctr-test-doubles": "Chapter 5 Test Doubles",
  "ctr-incremental-design": "Chapter 6 Incremental Design",
  "ctr-quality-tests": "Chapter 7 Quality Tests",
  "ctr-legacy-challenges": "Chapter 8 Legacy Challenges",
  "ctr-tdd-and-threading": "Chapter 9 TDD and Threading",
  "ctr-additional-tdd-concepts":
    "Chapter 10 Additional TDD Concepts and Discussions",
  "ctr-growing-and-sustaining-tdd": "Chapter 11 Growing and Sustaining TDD",
  "ctr-final-review": "现代 C++ 测试驱动开发总复习",
  // 剑指 Offer
  "coi-find-in-matrix": "二维数组中的查找",
  "coi-replace-spaces": "替换空格",
  "coi-print-list-reverse": "从尾到头打印链表",
  "coi-rebuild-binary-tree": "重建二叉树",
  "coi-print-trees-in-lines": "从上到下打印二叉树 II",
  "coi-print-tree-from-top-to-bottom": "从上到下打印二叉树",
  "coi-queue-with-two-stacks": "用两个栈实现队列",
  "coi-stack-push-pop-order": "栈的压入、弹出序列",
  "coi-power": "数值的整数次方",
  "coi-print-numbers": "打印从 1 到最大的 n 位数",
  "coi-delete-node": "删除链表节点",
  "coi-regular-expressions-matching": "正则表达式匹配",
  "coi-numeric-strings": "表示数值的字符串",
  "coi-reorder-array": "调整数组顺序使奇数位于偶数前面",
  "coi-kth-node-from-end": "链表中倒数第 k 个节点",
  "coi-entry-node-of-loop": "链表中环的入口节点",
  "coi-reverse-list": "反转链表",
  "coi-merge-sorted-lists": "合并两个排序的链表",
  "coi-subtree-structure": "树的子结构",
  "coi-mirror-binary-tree": "二叉树的镜像",
  "coi-symmetric-binary-tree": "对称的二叉树",
  "coi-spiral-matrix": "顺时针打印矩阵",
  "coi-min-stack": "包含 min 函数的栈",
  "coi-print-trees-in-zigzag": "二叉树的按层打印（之字形）",
  "coi-squence-of-bst": "二叉搜索树的后序遍历序列",
  "coi-path-in-tree": "二叉树中和为某一值的路径",
  "coi-copy-complex-list": "复杂链表的复制",
  "coi-convert-binary-search-tree": "二叉搜索树与双向链表",
  "coi-serialize-binary-trees": "序列化二叉树",
  "coi-string-permutation": "字符串的排列",
  "coi-more-than-half-number": "数组中出现次数超过一半的数字",
  "coi-k-least-numbers": "最小的 K 个数",
  "coi-stream-median": "数据流中的中位数",
  "coi-greatest-sum-of-subarrays": "连续子数组的最大和",
  "coi-number-of-1": "数字中 1 出现的次数",
  "coi-digits-in-sequence": "数字序列中的某位数字",
  "coi-sort-array-for-min-number": "把数组排成最小的数",
  "coi-translate-numbers-to-strings": "把数字翻译成字符串",
  "coi-max-value-of-gifts": "礼物的最大价值",
  "coi-longest-substring-without-dup": "最长不含重复字符的子字符串",
  "coi-ugly-number": "丑数",
  "coi-first-not-repeating-char": "字符串中第一个只出现一次的字符",
  "coi-first-character-in-stream": "字符流中第一个不重复的字符",
  "coi-inverse-pairs": "数组中的逆序对",
  "coi-first-common-nodes-in-lists": "两个链表的第一个公共节点",
  "coi-number-of-k": "数组中出现次数超过 K 次的数字",
  "coi-missing-number": "缺失的数字",
  "coi-integer-identical-to-index": "数组中数值和下标相等的元素",
  "coi-kth-node-in-bst": "二叉搜索树中第 K 小的节点",
  "coi-tree-depth": "树的深度",
  "coi-balanced-binary-tree": "平衡二叉树",
  "coi-numbers-appear-once": "数组中只出现一次的两个数字",
  "coi-number-appearing-once": "数组中只出现一次的数字",
  "coi-two-numbers-with-sum": "和为 S 的两个数字",
  "coi-continuous-sequence-with-sum": "和为 S 的连续正数序列",
  "coi-max-in-sliding-window": "滑动窗口的最大值",
  "coi-queue-with-max": "队列的最大值",
  "coi-dices-probability": "n 个骰子的点数",
  "coi-continous-cards": "扑克牌中的顺子",
  "coi-last-number-in-circle": "圆圈中最后剩下的数",
  "coi-maximal-profit": "股票的最大利润",
  "coi-accumulate": "累加",
  "coi-add-two-numbers": "两数相加",
  "coi-constuct-array": "构建乘积数组",
  "coi-string-to-int": "把字符串转换成整数",
  "coi-common-parent-in-tree": "二叉树的公共祖先",
  // C++ 服务器开发精髓
  "cse-cpp-must-know": "第1章 C++ 必知必会",
  "cse-backend-tools-debugging": "第2章 后端工具与调试",
  "cse-multithreading-resource-sync": "第3章 多线程编程与资源同步",
  "cse-network-programming-hard-points": "第4章 网络编程重难点解析",
  "cse-network-troubleshooting-commands": "第5章 网络通信故障排查常用命令",
  "cse-network-protocol-design": "第6章 网络通信协议设计",
  "cse-single-service-structure": "第7章 单个服务的基本结构",
  "cse-redis-network-module-source-analysis":
    "第8章 Redis 网络通信模块源码分析",
  "cse-common-server-module-design": "第9章 服务器开发中的常用模块设计",
  "cse-learning-map": "学习地图",
  "cse-final-review": "总复习",
  // Head First 设计模式
  "hfd-learning-map": "学习地图",
  "hfd-strategy": "策略模式",
  "hfd-observer": "观察者模式",
  "hfd-decorator": "装饰器模式",
  "hfd-factory": "工厂模式",
  "hfd-singleton": "单例模式",
  "hfd-command": "命令模式",
  "hfd-adapter-facade": "适配器与外观",
  "hfd-template-method": "第8章 模板方法",
  "hfd-iterator-composite": "第9章 迭代器与组合模式",
  "hfd-state": "第10章 状态模式",
  "hfd-proxy": "第11章 代理模式",
  "hfd-compound-patterns": "第12章 复合模式",
  "hfd-real-world": "第13章 真实世界中的模式",
  "hfd-leftover-patterns": "附录A 其他模式",
  "hfd-final-review": "总复习",
  // C# 7.0 本质论
  "ec7e6-introducing-csharp": "第1章 Introducing C#",
  "ec7e6-data-types": "第2章 Data Types",
  "ec7e6-more-with-data-types": "第3章 More with Data Types",
  "ec7e6-operators-and-control-flow": "第4章 Operators and Control Flow",
  "ec7e6-methods-and-parameters": "第5章 Methods and Parameters",
  "ec7e6-classes": "第6章 Classes",
  "ec7e6-inheritance": "第7章 Inheritance",
  "ec7e6-interfaces": "第8章 Interfaces",
  "ec7e6-value-types": "第9章 Value Types",
  "ec7e6-well-formed-types": "第10章 Well-Formed Types",
  "ec7e6-exception-handling": "第11章 Exception Handling",
  "ec7e6-generics": "第12章 Generics",
  "ec7e6-delegates-and-lambda-expressions":
    "第13章 Delegates and Lambda Expressions",
  "ec7e6-events": "第14章 Events",
  "ec7e6-collection-interfaces-with-standard-query-operators":
    "第15章 Collection Interfaces with Standard Query Operators",
  "ec7e6-linq-with-query-expressions": "第16章 LINQ with Query Expressions",
  "ec7e6-building-custom-collections": "第17章 Building Custom Collections",
  "ec7e6-reflection-attributes-and-dynamic-programming":
    "第18章 Reflection, Attributes, and Dynamic Programming",
  "ec7e6-multithreading": "第19章 Multithreading",
  "ec7e6-thread-synchronization": "第20章 Thread Synchronization",
  "ec7e6-platform-interoperability-and-unsafe-code":
    "第21章 Platform Interoperability and Unsafe Code",
  "ec7e6-the-common-language-infrastructure":
    "第22章 The Common Language Infrastructure",
  "ec7-learning-map": "导学：官方22章学习地图",
  "ec7-final-review": "总复习：官方22章整书验收",
  "cqc157-basic-language-elements": "第1章 基本语言要素（建议1-15）",
  "cqc157-collections-and-linq": "第2章 集合和LINQ（建议16-31）",
  "cqc157-generics-delegates-and-events": "第3章 泛型、委托和事件（建议32-45）",
  "cqc157-resource-management-and-serialization":
    "第4章 资源管理和序列化（建议46-57）",
  "cqc157-exceptions-and-custom-exceptions":
    "第5章 异常与自定义异常（建议58-70）",
  "cqc157-asynchrony-multithreading-tasks-and-parallelism":
    "第6章 异步、多线程、任务和并行（建议71-89）",
  "cqc157-member-design": "第7章 成员设计（建议90-101）",
  "cqc157-type-design": "第8章 类型设计（建议102-112）",
  "cqc157-security-design": "第9章 安全性设计（建议113-121）",
  "cqc157-naming-conventions": "第10章 命名规范（建议122-139）",
  "cqc157-clean-code": "第11章 代码整洁（建议140-153）",
  "cqc157-development-practices": "第12章 规范开发行为（建议154-157）",
  // 编写高质量代码
  "cqc-learning-map": "导学：官方12章与157条建议学习地图",
  "cqc-final-review": "总复习：官方12章与157条建议整书验收",
  // Effective C#
  "ecs-learning-map": "导学：官方5章与50条Item学习地图",
  "ecs3-language-idioms": "第1章 C# Language Idioms（Items 1-10）",
  "ecs3-resource-management": "第2章 .NET Resource Management（Items 11-17）",
  "ecs3-working-with-generics": "第3章 Working with Generics（Items 18-28）",
  "ecs3-working-with-linq": "第4章 Working with LINQ（Items 29-44）",
  "ecs3-exception-practices": "第5章 Exception Practices（Items 45-50）",
  "ecs-final-review": "总复习：官方5章与50条Item整书验收",
  // 深入理解 C#
  "dcs-learning-map": "导学：第四版4 Parts / 15 Chapters",
  "survival-of-the-sharpest": "第1章 Survival of the sharpest",
  "csharp-2": "第2章 C# 2",
  "csharp-3-linq": "第3章 C# 3: LINQ and everything that comes with it",
  "csharp-4-interoperability": "第4章 C# 4: Improving interoperability",
  "writing-asynchronous-code": "第5章 Writing asynchronous code",
  "async-implementation": "第6章 Async implementation",
  "csharp-5-bonus-features": "第7章 C# 5 bonus features",
  "super-sleek-properties":
    "第8章 Super-sleek properties and expression-bodied members",
  "stringy-features": "第9章 Stringy features",
  "concise-code-smorgasbord":
    "第10章 A smörgåsbord of features for concise code",
  "composition-using-tuples": "第11章 Composition using tuples",
  "deconstruction-and-pattern-matching":
    "第12章 Deconstruction and pattern matching",
  "pass-by-reference-efficiency":
    "第13章 Improving efficiency with more pass by reference",
  "concise-code-csharp-7": "第14章 Concise code in C# 7",
  "csharp-8-and-beyond": "第15章 C# 8 and beyond",
  "dcs-final-review": "总复习：第四版15章整书验收",
  // C# 函数式编程
  "cfp-learning-map": "学习地图：第一版三部分十五章",
  "introducing-functional-programming":
    "第1章 Introducing functional programming",
  "why-function-purity-matters": "第2章 Why function purity matters",
  "designing-function-signatures-and-types":
    "第3章 Designing function signatures and types",
  "patterns-in-functional-programming":
    "第4章 Patterns in functional programming",
  "designing-programs-with-function-composition":
    "第5章 Designing programs with function composition",
  "functional-error-handling": "第6章 Functional error handling",
  "structuring-an-application-with-functions":
    "第7章 Structuring an application with functions",
  "multi-argument-functions":
    "第8章 Working effectively with multi-argument functions",
  "thinking-about-data-functionally": "第9章 Thinking about data functionally",
  "event-sourcing-functional-persistence":
    "第10章 Event sourcing: functional persistence",
  "lazy-computations-continuations-monadic-composition":
    "第11章 Lazy computations and continuations",
  "stateful-programs-and-computations":
    "第12章 Stateful programs and computations",
  "asynchronous-computations": "第13章 Asynchronous computations",
  "reactive-data-streams": "第14章 Reactive data streams",
  "message-passing-concurrency": "第15章 Message-passing concurrency",
  "cfp-final-review": "总复习：第一版十五章工程验收",
  // C# 10 核心技术指南
  "ctc-learning-map": "学习地图：官方25章",
  "introducing-csharp-and-dotnet": "第1章 Introducing C# and .NET",
  "csharp-language-basics": "第2章 C# Language Basics",
  "creating-types-in-csharp": "第3章 Creating Types in C#",
  "advanced-csharp": "第4章 Advanced C#",
  "dotnet-overview": "第5章 .NET Overview",
  "dotnet-fundamentals": "第6章 .NET Fundamentals",
  collections: "第7章 Collections",
  "linq-queries": "第8章 LINQ Queries",
  "linq-operators": "第9章 LINQ Operators",
  "linq-to-xml": "第10章 LINQ to XML",
  "xml-json-technologies": "第11章 Other XML and JSON Technologies",
  "disposal-and-garbage-collection": "第12章 Disposal and Garbage Collection",
  diagnostics: "第13章 Diagnostics",
  "concurrency-and-asynchrony": "第14章 Concurrency and Asynchrony",
  "streams-and-io": "第15章 Streams and I/O",
  networking: "第16章 Networking",
  assemblies: "第17章 Assemblies",
  "reflection-and-metadata": "第18章 Reflection and Metadata",
  "dynamic-programming": "第19章 Dynamic Programming",
  cryptography: "第20章 Cryptography",
  "advanced-threading": "第21章 Advanced Threading",
  "parallel-programming": "第22章 Parallel Programming",
  "span-and-memory": "第23章 Span<T> and Memory<T>",
  "native-com-interoperability": "第24章 Native and COM Interoperability",
  "regular-expressions": "第25章 Regular Expressions",
  "ctc-final-review": "总复习：25章工程验收",
  // CLR via C#
  "cvc-learning-map": "第四版30章学习地图",
  "clr-execution-model": "第1章 The CLR's Execution Model",
  "building-packaging-deploying-types":
    "第2章 Building, Packaging, Deploying, and Administering Applications and Types",
  "shared-strongly-named-assemblies":
    "第3章 Shared Assemblies and Strongly Named Assemblies",
  "type-fundamentals": "第4章 Type Fundamentals",
  "primitive-reference-value-types":
    "第5章 Primitive, Reference, and Value Types",
  "type-member-basics": "第6章 Type and Member Basics",
  "constants-and-fields": "第7章 Constants and Fields",
  methods: "第8章 Methods",
  parameters: "第9章 Parameters",
  properties: "第10章 Properties",
  events: "第11章 Events",
  generics: "第12章 Generics",
  interfaces: "第13章 Interfaces",
  "chars-strings-working-with-text":
    "第14章 Chars, Strings, and Working with Text",
  "enumerated-types-bit-flags": "第15章 Enumerated Types and Bit Flags",
  arrays: "第16章 Arrays",
  delegates: "第17章 Delegates",
  "custom-attributes": "第18章 Custom Attributes",
  "nullable-value-types": "第19章 Nullable Value Types",
  "exceptions-state-management": "第20章 Exceptions and State Management",
  "managed-heap-garbage-collection":
    "第21章 The Managed Heap and Garbage Collection",
  "clr-hosting-appdomains": "第22章 CLR Hosting and AppDomains",
  "assembly-loading-reflection": "第23章 Assembly Loading and Reflection",
  "runtime-serialization": "第24章 Runtime Serialization",
  "interoperating-winrt-components":
    "第25章 Interoperating with WinRT Components",
  "thread-basics": "第26章 Thread Basics",
  "compute-bound-asynchronous-operations":
    "第27章 Compute-Bound Asynchronous Operations",
  "io-bound-asynchronous-operations":
    "第28章 I/O-Bound Asynchronous Operations",
  "primitive-thread-synchronization-constructs":
    "第29章 Primitive Thread Synchronization Constructs",
  "hybrid-thread-synchronization-constructs":
    "第30章 Hybrid Thread Synchronization Constructs",
  "cvc-final-review": "第四版30章总复习",
  // Pro .NET 内存管理（第2版）
  "dnm-basic-concepts": "第1章 基础概念",
  "dnm-low-level-memory-management": "第2章 底层内存管理",
  "dnm-memory-measurements": "第3章 内存测量",
  "dnm-dotnet-fundamentals": "第4章 .NET 基础",
  "dnm-memory-partitioning": "第5章 内存分区",
  "dnm-memory-allocation": "第6章 内存分配",
  "dnm-garbage-collection-introduction": "第7章 垃圾回收导论",
  "dnm-garbage-collection-mark-phase": "第8章 垃圾回收标记阶段",
  "dnm-garbage-collection-plan-phase": "第9章 垃圾回收计划阶段",
  "dnm-garbage-collection-sweep-and-compact": "第10章 垃圾回收清扫与压缩",
  "dnm-gc-flavors-and-settings": "第11章 GC 模式与设置",
  "dnm-object-lifetime": "第12章 对象生命周期",
  "dnm-miscellaneous-topics": "第13章 杂项主题",
  "dnm-advanced-techniques": "第14章 高级技术",
  "dnm-programmatical-apis": "第15章 程序化 API",
  "dnm-memory-model": "学习地图",
  "dnm-final-review": "总复习",
  // Rust 程序设计语言
  "rpl-getting-started": "第1章 入门",
  "rpl-programming-a-guessing-game": "第2章 编写猜数字游戏",
  "rpl-common-programming-concepts": "第3章 通用编程概念",
  "rpl-understanding-ownership": "第4章 理解所有权",
  "rpl-using-structs-to-structure-related-data": "第5章 使用结构体组织相关数据",
  "rpl-enums-and-pattern-matching": "第6章 枚举与模式匹配",
  "rpl-packages-crates-and-modules": "第7章 包、Crate 与模块",
  "rpl-common-collections": "第8章 常用集合",
  "rpl-official-error-handling": "第9章 错误处理",
  "rpl-generic-types-traits-and-lifetimes": "第10章 泛型、Trait 与生命周期",
  "rpl-writing-automated-tests": "第11章 编写自动化测试",
  "rpl-an-io-project": "第12章 I/O 项目：构建命令行程序",
  "rpl-functional-language-features": "第13章 迭代器与闭包",
  "rpl-more-about-cargo-and-crates-io": "第14章 深入 Cargo 与 Crates.io",
  "rpl-smart-pointers": "第15章 智能指针",
  "rpl-fearless-concurrency": "第16章 无畏并发",
  "rpl-fundamentals-of-asynchronous-programming": "第17章 异步编程基础",
  "rpl-object-oriented-programming-features": "第18章 面向对象编程特性",
  "rpl-patterns-and-matching": "第19章 模式与匹配",
  "rpl-advanced-features": "第20章 高级特性",
  "rpl-final-project-building-a-multithreaded-web-server":
    "第21章 最终项目：构建多线程 Web Server",
  "rpl-learning-map": "学习地图",
  "rpl-final-review": "总复习",
  // Go 程序设计语言
  "gopl-tutorial": "第1章 Tutorial",
  "gopl-program-structure": "第2章 Program Structure",
  "gopl-basic-data-types": "第3章 Basic Data Types",
  "gopl-composite-types": "第4章 Composite Types",
  "gopl-functions": "第5章 Functions",
  "gopl-methods": "第6章 Methods",
  "gopl-interfaces": "第7章 Interfaces",
  "gopl-goroutines-and-channels": "第8章 Goroutines and Channels",
  "gopl-concurrency-with-shared-variables":
    "第9章 Concurrency with Shared Variables",
  "gopl-packages-and-the-go-tool": "第10章 Packages and the Go Tool",
  "gopl-testing": "第11章 Testing",
  "gopl-reflection": "第12章 Reflection",
  "gopl-low-level-programming": "第13章 Low-Level Programming",
  "gpl-learning-map": "学习地图",
  "gpl-final-review": "总复习",
  // Python 编程：从入门到实践
  "pcc3-getting-started": "第1章 Getting Started",
  "pcc3-variables-and-simple-data-types":
    "第2章 Variables and Simple Data Types",
  "pcc3-introducing-lists": "第3章 Introducing Lists",
  "pcc3-working-with-lists": "第4章 Working with Lists",
  "pcc3-if-statements": "第5章 if Statements",
  "pcc3-dictionaries": "第6章 Dictionaries",
  "pcc3-user-input-and-while-loops": "第7章 User Input and while Loops",
  "pcc3-functions": "第8章 Functions",
  "pcc3-classes": "第9章 Classes",
  "pcc3-files-and-exceptions": "第10章 Files and Exceptions",
  "pcc3-testing-your-code": "第11章 Testing Your Code",
  "pcc3-a-ship-that-fires-bullets": "第12章 A Ship That Fires Bullets",
  "pcc3-aliens": "第13章 Aliens!",
  "pcc3-scoring": "第14章 Scoring",
  "pcc3-generating-data": "第15章 Generating Data",
  "pcc3-downloading-data": "第16章 Downloading Data",
  "pcc3-working-with-apis": "第17章 Working with APIs",
  "pcc3-getting-started-with-django": "第18章 Getting Started with Django",
  "pcc3-user-accounts": "第19章 User Accounts",
  "pcc3-styling-and-deploying-an-app": "第20章 Styling and Deploying an App",
  "pcc-learning-map": "学习地图",
  "pcc-final-review": "总复习",
  // Lua 程序设计
  "pil4-learning-map": "学习地图",
  "pil4-getting-started": "Chapter 1. Getting Started",
  "pil4-eight-queen-puzzle": "Chapter 2. Interlude: The Eight-Queen Puzzle",
  "pil4-numbers": "Chapter 3. Numbers",
  "pil4-strings": "Chapter 4. Strings",
  "pil4-tables": "Chapter 5. Tables",
  "pil4-functions": "Chapter 6. Functions",
  "pil4-external-world": "Chapter 7. The External World",
  "pil4-filling-some-gaps": "Chapter 8. Filling Some Gaps",
  "pil4-closures": "Chapter 9. Closures",
  "pil4-pattern-matching": "Chapter 10. Pattern Matching",
  "pil4-most-frequent-words": "Chapter 11. Interlude: Most Frequent Words",
  "pil4-date-time": "Chapter 12. Date and Time",
  "pil4-bits-bytes": "Chapter 13. Bits and Bytes",
  "pil4-data-structures": "Chapter 14. Data Structures",
  "pil4-data-files-serialization": "Chapter 15. Data Files and Serialization",
  "pil4-compilation-errors": "Chapter 16. Compilation, Execution, and Errors",
  "pil4-modules-packages": "Chapter 17. Modules and Packages",
  "pil4-iterators-generic-for": "Chapter 18. Iterators and the Generic for",
  "pil4-markov-chain": "Chapter 19. Interlude: Markov Chain",
  "pil4-metatables-metamethods": "Chapter 20. Metatables and Metamethods",
  "pil4-object-oriented-programming": "Chapter 21. Object-Oriented Programming",
  "pil4-environment": "Chapter 22. The Environment",
  "pil4-garbage": "Chapter 23. Garbage",
  "pil4-coroutines": "Chapter 24. Coroutines",
  "pil4-reflection": "Chapter 25. Reflection",
  "pil4-multithreading-coroutines":
    "Chapter 26. Interlude: Multithreading with Coroutines",
  "pil4-c-api-overview": "Chapter 27. An Overview of the C API",
  "pil4-extending-application": "Chapter 28. Extending Your Application",
  "pil4-calling-c-from-lua": "Chapter 29. Calling C from Lua",
  "pil4-c-function-techniques":
    "Chapter 30. Techniques for Writing C Functions",
  "pil4-user-defined-types": "Chapter 31. User-Defined Types in C",
  "pil4-managing-resources": "Chapter 32. Managing Resources",
  "pil4-threads-states": "Chapter 33. Threads and States",
  "pil4-final-review": "总复习",
  // Ruby 基础教程（たのしいRuby 第5版）
  "tr5-learning-map": "学习地图",
  "tr5-first-ruby": "第1章 Ruby初探",
  "tr5-useful-objects": "第2章 便利的对象",
  "tr5-building-command": "第3章 创建命令",
  "tr5-objects-variables-constants": "第4章 对象、变量和常量",
  "tr5-conditional-judgment": "第5章 条件判断",
  "tr5-loops": "第6章 循环",
  "tr5-methods": "第7章 方法",
  "tr5-classes-modules": "第8章 类和模块",
  "tr5-operators": "第9章 运算符",
  "tr5-errors-exceptions": "第10章 错误处理与异常",
  "tr5-blocks": "第11章 块",
  "tr5-numeric": "第12章 数值类",
  "tr5-arrays": "第13章 数组类",
  "tr5-strings": "第14章 字符串类",
  "tr5-hashes": "第15章 散列类",
  "tr5-regular-expressions": "第16章 正则表达式类",
  "tr5-io": "第17章 IO类",
  "tr5-file-dir": "第18章 File类与Dir类",
  "tr5-encoding": "第19章 Encoding类",
  "tr5-time-date": "第20章 Time类与Date类",
  "tr5-proc": "第21章 Proc类",
  "tr5-text-processing": "第22章 文本处理",
  "tr5-postal-code-search": "第23章 检索邮政编码",
  "tr5-final-review": "总复习",
  // 大话数据结构
  "dsvc-learning-map": "大话数据结构（溢彩加强版）· 学习地图",
  "dsvc-data-structure-introduction": "第1章 数据结构绪论",
  "dsvc-algorithms": "第2章 算法",
  "dsvc-linear-list": "第3章 线性表",
  "dsvc-stacks-and-queues": "第4章 栈与队列",
  "dsvc-strings": "第5章 串",
  "dsvc-trees": "第6章 树",
  "dsvc-graphs": "第7章 图",
  "dsvc-searching": "第8章 查找",
  "dsvc-sorting": "第9章 排序",
  "dsvc-final-review": "大话数据结构（溢彩加强版）· 总复习",
  // 图灵数学女孩系列
  "mgl-learning-map": "学习地图",
  "mgl-number-theory": "数论",
  "mgl-equations": "方程",
  "mgl-functions": "函数",
  "mgl-combinatorics": "组合数学",
  "mgl-graph-theory": "图论",
  "mgl-probability": "概率",
  "mgl-algorithms": "算法",
  "mgl-machine-learning": "机器学习",
  "mgl-final-review": "总复习",
  // 数据结构与算法分析（C++描述）
  "dsa-learning-map": "学习地图",
  "dsa-complexity-analysis": "复杂度分析",
  "dsa-lists": "线性表",
  "dsa-trees": "树",
  "dsa-hash-tables": "散列表",
  "dsa-disjoint-sets": "并查集",
  "dsa-graph-algs": "图算法",
  "dsa-sorting": "排序",
  "dsa-dynamic-programming": "动态规划",
  "dsa-final-review": "总复习",
  // Rust 编程之道
  "rsw-learning-map": "《Rust编程之道》学习地图",
  "rsw-new-era-language": "第1章 新时代的语言",
  "rsw-language-essentials": "第2章 语言精要",
  "rsw-traits-generics": "第3章 类型系统",
  "rsw-lifetimes": "第4章 内存管理",
  "rsw-ownership-borrow": "第5章 所有权系统",
  "rsw-functions-closures-iterators": "第6章 函数、闭包和迭代器",
  "rsw-structured-programming": "第7章 结构化编程",
  "rsw-strings-collections": "第8章 字符串与集合",
  "rsw-error-handling": "第9章 构建健壮的程序",
  "rsw-modular-development": "第10章 模块化开发",
  "rsw-concurrency": "第11章 安全并发",
  "rsw-async-runtime": "异步运行时",
  "rsw-macros": "第12章 元编程",
  "rsw-unsafe-rust": "第13章 超越安全边界",
  "rsw-final-review": "《Rust编程之道》总复习",
  // Go 语言实战
  "gia-learning-map": "《Go语言实战》学习地图",
  "gia-go-philosophy": "第1章 Go语言介绍",
  "gia-quick-start": "第2章 Go快速入门",
  "gia-packaging-tooling": "第3章 包与工具",
  "gia-arrays-slices": "第4章 数组、切片和映射",
  "gia-map-struct": "第5章 Go语言的类型系统",
  "gia-goroutines": "第6章 并发",
  "gia-concurrency-patterns": "第7章 并发模式",
  "gia-standard-lib": "第8章 标准库",
  "gia-testing-packaging": "第9章 测试和性能",
  "gia-final-review": "《Go语言实战》总复习",
  // Go Web 编程
  "gwp-learning-map": "《Go Web编程》学习地图",
  "gwp-http-basics": "第1章 Go与Web应用",
  "gwp-chitchat": "第2章 Go ChitChat",
  "gwp-routing": "第3章 处理请求",
  "gwp-processing-requests": "第4章 处理请求内容",
  "gwp-templates": "第5章 展示内容",
  "gwp-database": "第6章 存储数据",
  "gwp-json-api": "第7章 Go Web服务",
  "gwp-testing": "第8章 测试应用",
  "gwp-concurrency": "第9章 利用Go并发",
  "gwp-deployment": "第10章 部署Go应用",
  "gwp-final-review": "《Go Web编程》总复习",
  // 流畅的 Python
  "flp-learning-map": "《流畅的Python》第2版学习地图",
  "flp-data-model": "第1章 Python数据模型",
  "flp-sequences": "第2章 序列构成的数组",
  "flp-dict-sets": "第3章 字典与集合",
  "flp-unicode-text-bytes": "第4章 Unicode文本与字节",
  "flp-data-class-builders": "第5章 数据类构建器",
  "flp-object-references": "第6章 对象引用、可变性与回收",
  "flp-functions-first-class": "第7章 函数作为一等对象",
  "flp-type-hints": "第8章 函数中的类型提示",
  "flp-closures-decorators": "第9章 装饰器与闭包",
  "flp-design-patterns": "第10章 使用一等函数实现设计模式",
  "flp-pythonic-object": "第11章 Python风格对象",
  "flp-special-methods-sequences": "第12章 序列特殊方法",
  "flp-protocols-abc": "第13章 接口、协议与ABC",
  "flp-inheritance-mixins": "第14章 继承的利与弊",
  "flp-more-type-hints": "第15章 类型提示进阶",
  "flp-operator-overloading": "第16章 运算符重载",
  "flp-generators": "第17章 迭代器、生成器与经典协程",
  "flp-with-match-else": "第18章 with、match与else块",
  "flp-concurrency-models": "第19章 Python并发模型",
  "flp-concurrent-executors": "第20章 并发执行器",
  "flp-async-programming": "第21章 异步编程",
  "flp-dynamic-attributes": "第22章 动态属性与特性",
  "flp-descriptors": "第23章 属性描述符",
  "flp-class-metaprogramming": "第24章 类元编程",
  "flp-final-review": "《流畅的Python》第2版总复习",
  // Python 自动化运维
  "pop-learning-map": "《Python自动化运维》全书导览",
  "pop-system-information": "第1章 系统基础信息模块详解",
  "pop-service-monitoring": "第2章 业务服务监控详解",
  "pop-quality-reports": "第3章 定制业务质量报表详解",
  "pop-system-security": "第4章 Python与系统安全",
  "pop-pexpect": "第5章 pexpect详解",
  "pop-ssh-paramiko": "第6章 paramiko详解",
  "pop-fabric": "第7章 Fabric详解",
  "pop-webserver": "第8章 轻量级WebServer",
  "pop-ansible": "第9章 Ansible详解",
  "pop-saltstack": "第10章 SaltStack详解",
  "pop-func": "第11章 Func详解",
  "pop-big-data": "第12章 Python大数据应用",
  "pop-bs-ops-platform": "第13章 B/S自动化运维平台",
  "pop-linux-security-audit": "第14章 Linux系统安全审计",
  "pop-distributed-quality-monitoring": "第15章 分布式质量监控平台",
  "pop-cs-ops-platform": "第16章 C/S自动化运维平台",
  "pop-final-review": "《Python自动化运维》总复习",
  // 精通 Rust（第2版）
  "mrs-learning-map": "《精通 Rust（第2版）》全书导览",
  "mrs-getting-started": "第1章 开始使用 Rust",
  "mrs-managing-projects-cargo": "第2章 使用 Cargo 管理项目",
  "mrs-tests-docs-benchmarks": "第3章 测试、文档与基准",
  "mrs-types-generics-traits": "第4章 类型、泛型与 Trait",
  "mrs-memory-management-safety": "第5章 内存管理与安全",
  "mrs-error-handling": "第6章 错误处理",
  "mrs-advanced-concepts": "第7章 高级概念",
  "mrs-concurrency": "第8章 并发",
  "mrs-metaprogramming-macros": "第9章 使用宏进行元编程",
  "mrs-unsafe-ffi": "第10章 Unsafe Rust 与 FFI",
  "mrs-logging": "第11章 日志",
  "mrs-network-programming": "第12章 Rust 网络编程",
  "mrs-web-applications": "第13章 使用 Rust 构建 Web 应用",
  "mrs-databases": "第14章 Rust 数据库交互",
  "mrs-webassembly": "第15章 Rust 与 WebAssembly",
  "mrs-desktop-applications": "第16章 Rust 桌面应用",
  "mrs-debugging": "第17章 调试",
  "mrs-final-review": "《精通 Rust（第2版）》总复习",
  // Python 高级编程
  "pya-learning-map": "《Python高级编程》全书导览",
  "pya-getting-started": "第1章 搭建专业开发环境",
  "pya-syntax-below-class": "第2章 类以下层级的语法最佳实践",
  "pya-syntax-above-class": "第3章 类以上层级的语法最佳实践",
  "pya-choosing-good-names": "第4章 选择好名字与设计API",
  "pya-writing-package": "第5章 编写与分发包",
  "pya-writing-application": "第6章 编写模块化应用",
  "pya-zc-buildout": "第7章 使用zc.buildout管理环境",
  "pya-managing-code": "第8章 管理代码与持续集成",
  "pya-managing-life-cycle": "第9章 管理软件生命周期",
  "pya-documenting-project": "第10章 编写项目文档",
  "pya-test-driven-development": "第11章 测试驱动开发",
  "pya-optimization-profiling": "第12章 优化原则与性能剖析",
  "pya-optimization-solutions": "第13章 优化解法",
  "pya-useful-design-patterns": "第14章 Python中的实用设计模式",
  "pya-final-review": "《Python高级编程》总复习",
  // 算法（第4版）
  "al4-learning-map": "学习地图",
  "al4-fundamentals": "基础",
  "al4-sorting-elementary": "基础排序",
  "al4-sorting-merge-quick": "归并与快速排序",
  "al4-searching-st": "符号表查找",
  "al4-hash-tables": "散列表",
  "al4-graphs-undirected": "无向图",
  "al4-graphs-directed": "有向图",
  "al4-strings": "字符串",
  "al4-final-review": "总复习",
  // 编程珠玑
  "pp-learning-map": "学习地图",
  "pp-cracking-problems": "破题",
  "pp-binary-search": "二分搜索",
  "pp-bit-vectors": "位向量",
  "pp-design-principles": "设计原则",
  "pp-code-tuning": "代码调优",
  "pp-back-of-envelope": "粗略估算",
  "pp-perspectives": "视角",
  "pp-epilog": "结语",
  "pp-final-review": "总复习",
  // 深入浅出竞赛算法
  "ca-learning-map": "深入浅出竞赛算法全书学习地图",
  "ca-contest-basics": "竞赛基础：I/O、复杂度与调试",
  "ca-dp": "动态规划：状态转移",
  "ca-greedy": "贪心算法：局部最优到全局最优",
  "ca-graph-algos": "图算法：最短路、最小生成树与拓扑排序",
  "ca-string-algos": "字符串算法：KMP、字典树与 AC 自动机",
  "ca-math-tricks": "数学技巧：数论、组合与快速幂",
  "ca-segment-tree": "线段树：区间查询与更新",
  "ca-union-find": "并查集：连通性判断",
  "ca-final-review": "深入浅出竞赛算法总复习",
  // 算法导论
  "ial-learning-map": "算法导论全书学习地图",
  "ial-foundations": "算法基础：渐近分析与递归",
  "ial-sorting": "排序算法：堆排、快排与线性排序",
  "ial-selection": "选择与中位数",
  "ial-binary-search-trees": "二叉搜索树与红黑树",
  "ial-hash-tables": "散列表",
  "ial-data-structures": "基本数据结构：栈、队列与链表",
  "ial-graph-algorithms": "图算法：BFS、DFS 与最短路",
  "ial-dp-advanced": "高级动态规划",
  "ial-final-review": "算法导论总复习",
  // 算法心得
  "hd-learning-map": "算法心得全书学习地图",
  "hd-bit-manipulation": "位操作基础：掩码与位运算",
  "hd-arithmetic-tricks": "算术技巧：无分支与位运算加减",
  "hd-division": "除法优化：常量除法与取模",
  "hd-power": "幂运算与根号：快速幂与整数开方",
  "hd-unusual-bases": "非常规进位制：Gray 码与负二进制",
  "hd-hashing-search": "哈希与搜索：完美哈希与 Bloom 过滤器",
  "hd-floating-point": "浮点数技巧：IEEE 754 的位级操作",
  "hd-crc-error": "CRC 校验与纠错码",
  "hd-final-review": "算法心得总复习",
  // 计算机程序设计艺术
  "tcp-learning-map": "TAOCP 全书学习地图",
  "tcp-mathematical-preliminaries": "数学预备知识",
  "tcp-sequences": "序列的生成与排列",
  "tcp-arithmetic": "浮点算术与进制转换",
  "tcp-polynomials": "多项式运算",
  "tcp-gf2": "GF(2) 域上的运算",
  "tcp-random-numbers": "随机数生成",
  "tcp-efficient-searching": "高效搜索",
  "tcp-info-structures": "信息结构",
  "tcp-final-review": "TAOCP 总复习",
  // 程序员的数学三册系列
  "pm-series-learning-map": "《程序员的数学》三册全书导览",
  "pm1-zero": "第1章 0的故事：无即是有",
  "pm1-logic": "第2章 逻辑：真与假的二元世界",
  "pm1-remainder": "第3章 余数：周期性和分组",
  "pm1-induction": "第4章 数学归纳法：推倒无穷多骨牌",
  "pm1-counting": "第5章 排列组合：不重不漏地计数",
  "pm1-recursion": "第6章 递归：用自身定义自身",
  "pm1-exponential-explosion": "第7章 指数爆炸：识别问题空间",
  "pm1-undecidable-problems": "第8章 不可解问题：程序能力的边界",
  "pm1-programmers-mathematics": "第9章 什么是程序员的数学：总结篇",
  "pm2-probability-definition": "第1章 概率的定义",
  "pm2-multiple-random-variables": "第2章 多个随机变量的相互影响",
  "pm2-discrete-distributions": "第3章 离散值的概率分布",
  "pm2-continuous-distributions": "第4章 连续值的概率分布",
  "pm2-covariance-normal": "第5章 协方差矩阵、多元正态分布与椭圆",
  "pm2-estimation-testing": "第6章 估计与检验",
  "pm2-pseudorandom": "第7章 伪随机数",
  "pm2-applications": "第8章 概率论的各类应用",
  "pm3-motivation": "第0章 动机：空间想象与线性近似",
  "pm3-vectors-matrices-determinants": "第1章 用空间语言表达向量、矩阵和行列式",
  "pm3-rank-inverse-equations": "第2章 秩、逆矩阵与线性方程组",
  "pm3-lu-decomposition": "第3章 计算机上的计算（一）：LU分解",
  "pm3-eigenvalues-jordan": "第4章 特征值、对角化与Jordan标准形",
  "pm3-numerical-eigenvalues": "第5章 计算机上的计算（二）：特征值算法",
  "pm-series-final-review": "《程序员的数学》三册总复习",
  // 深入浅出统计学官方15章
  "hfs-official-learning-map": "《深入浅出统计学》全书导览",
  "hfs-visualizing-information": "第1章 信息可视化：第一印象",
  "hfs-central-tendency": "第2章 集中趋势：中间道路",
  "hfs-variability-spread": "第3章 变异与离散：有力的范围",
  "hfs-calculating-probabilities": "第4章 概率计算：把握机会",
  "hfs-discrete-probability-distributions": "第5章 离散概率分布：管理期望",
  "hfs-permutations-combinations": "第6章 排列与组合：安排次序",
  "hfs-geometric-binomial-poisson": "第7章 几何、二项与泊松分布：离散模型",
  "hfs-normal-distribution": "第8章 正态分布：保持正常",
  "hfs-normal-beyond": "第9章 正态分布进阶：超越正态",
  "hfs-statistical-sampling": "第10章 统计抽样：取得样本",
  "hfs-estimating-populations": "第11章 估计总体与样本：做出预测",
  "hfs-confidence-intervals": "第12章 构造置信区间：有把握地猜",
  "hfs-hypothesis-tests": "第13章 假设检验：查看证据",
  "hfs-chi-square": "第14章 卡方分布：事情不对劲",
  "hfs-correlation-regression": "第15章 相关与回归：最佳拟合线",
  "hfs-official-final-review": "《深入浅出统计学》15章总复习",
  // 线性代数应该这样学
  "lad4-official-learning-map": "《线性代数应该这样学》第四版导览",
  "lad4-vector-spaces": "第1章 向量空间",
  "lad4-finite-dimensional-vector-spaces": "第2章 有限维向量空间",
  "lad4-linear-maps": "第3章 线性映射",
  "lad4-polynomials": "第4章 多项式",
  "lad4-eigenvalues-eigenvectors": "第5章 特征值与特征向量",
  "lad4-inner-product-spaces": "第6章 内积空间",
  "lad4-operators-inner-product-spaces": "第7章 内积空间上的算子",
  "lad4-operators-complex-vector-spaces": "第8章 复向量空间上的算子",
  "lad4-multilinear-algebra-determinants": "第9章 多线性代数与行列式",
  "lad4-official-final-review": "《线性代数应该这样学》第四版总复习",
  // 具体数学
  "cm2-official-learning-map": "《具体数学》第二版全书导览",
  "cm2-recurrent-problems": "第1章 递归问题",
  "cm2-sums": "第2章 求和",
  "cm2-integer-functions": "第3章 整数函数",
  "cm2-number-theory": "第4章 数论",
  "cm2-binomial-coefficients": "第5章 二项式系数",
  "cm2-special-numbers": "第6章 特殊数",
  "cm2-generating-functions": "第7章 生成函数",
  "cm2-discrete-probability": "第8章 离散概率",
  "cm2-asymptotics": "第9章 渐近分析",
  "cm2-official-final-review": "《具体数学》第二版总复习",
  // Geometric Data Structures for Computer Graphics
  "gdscg-official-learning-map":
    "《Geometric Data Structures for Computer Graphics》全书导览",
  "gdscg-quadtrees-octrees": "第1章 四叉树与八叉树",
  "gdscg-orthogonal-queries": "第2章 正交窗口与刺穿查询",
  "gdscg-bsp-trees": "第3章 BSP树",
  "gdscg-bounding-volume-hierarchies": "第4章 包围体层次",
  "gdscg-distance-fields": "第5章 距离场",
  "gdscg-voronoi-diagrams": "第6章 Voronoi图",
  "gdscg-geometric-proximity-graphs": "第7章 几何邻近图",
  "gdscg-kinetic-data-structures": "第8章 动力数据结构",
  "gdscg-degeneracy-robustness": "第9章 退化与鲁棒性",
  "gdscg-dynamization": "第10章 几何数据结构动态化",
  "gdscg-official-final-review":
    "《Geometric Data Structures for Computer Graphics》总复习",
  // 计算机图形学第4版
  "cg4-learning-map": "全书学习地图",
  "cg4-graphics-pipeline": "图形渲染管线",
  "cg4-rasterization": "光栅化与片段处理",
  "cg4-transformations": "几何变换与坐标系",
  "cg4-visibility": "可见性与深度缓冲",
  "cg4-lighting-models": "光照模型与着色",
  "cg4-texturing": "纹理映射技术",
  "cg4-curves-surfaces": "曲线与曲面",
  "cg4-advanced-rendering": "高级渲染技术",
  "cg4-final-review": "总复习",
  // OpenGL 红宝书
  "glr-learning-map": "全书学习地图",
  "glr-opengl-basics": "OpenGL 基础与初始化",
  "glr-shaders": "着色器编程",
  "glr-geometry": "几何图元与顶点处理",
  "glr-textures": "纹理与采样器",
  "glr-lighting": "光照与材质",
  "glr-framebuffer": "帧缓冲与混合",
  "glr-advanced-buffers": "高级缓冲技术",
  "glr-modern-opengl": "现代 OpenGL 实践",
  "glr-final-review": "总复习",
  // OpenGL 超级宝典
  "gls-learning-map": "全书学习地图",
  "gls-first-program": "第一个 OpenGL 程序",
  "gls-shader-pipeline": "着色器管线详解",
  "gls-vertex-processing": "顶点处理与变换",
  "gls-fragment-shading": "片段着色与混合",
  "gls-texture-mapping": "纹理映射高级技术",
  "gls-buffer-objects": "缓冲对象与数据管理",
  "gls-geometry-shaders": "几何着色器与图元",
  "gls-performance": "性能优化与调试",
  "gls-final-review": "总复习",
  // Ray Tracing in One Weekend
  "rtw-learning-map": "全书学习地图",
  "rtw-ray-basics": "光线与射线相交",
  "rtw-camera": "相机与光线生成",
  "rtw-sphere-hittable": "球体与可命中对象",
  "rtw-materials": "材质与散射",
  "rtw-diffuse": "漫反射与兰伯特模型",
  "rtw-metal-dielectric": "金属与电介质材质",
  "rtw-defocus-blur": "散焦模糊与景深",
  "rtw-final-scene": "最终场景渲染",
  "rtw-final-review": "总复习",
  // 深入理解 OpenGL WebGL OpenGL ES
  "dog-learning-map": "全书学习地图",
  "dog-opengl-architecture": "OpenGL 架构与状态机",
  "dog-shader-language": "GLSL ES 着色器语言",
  "dog-webgl-basics": "WebGL 基础与上下文",
  "dog-opengl-es": "OpenGL ES 移动端适配",
  "dog-rendering-optimization": "渲染优化策略",
  "dog-fbo-techniques": "FBO 与后处理技术",
  "dog-cross-platform": "跨平台兼容性",
  "dog-debugging-tools": "调试与性能分析",
  "dog-final-review": "总复习",
  // Vulkan 学习指南
  "vkg-learning-map": "全书学习地图",
  "vkg-vulkan-basics": "Vulkan 基础与概念",
  "vkg-instance-device": "实例与物理设备",
  "vkg-swapchain": "交换链与呈现",
  "vkg-graphics-pipeline": "图形管线",
  "vkg-command-buffers": "命令缓冲与录制",
  "vkg-render-pass": "渲染通道与附件",
  "vkg-textures-shaders": "纹理与着色器",
  "vkg-advanced-features": "高级特性与扩展",
  "vkg-final-review": "总复习",
  // GPU Gems 系列
  "gpg-learning-map": "GPU Gems 系列全书学习地图",
  "gpg-natural-effects": "自然效果渲染",
  "gpg-lighting-shadows": "光照与阴影技术",
  "gpg-materials-shaders": "材质与着色器",
  "gpg-image-processing": "图像处理与后处理",
  "gpg-geometry": "几何体处理与细分",
  "gpg-particle-systems": "粒子系统与物理",
  "gpg-gpu-computing": "GPU 通用计算",
  "gpg-advanced-techniques": "高级渲染技术",
  "gpg-final-review": "GPU Gems 总复习",
  // 实时渲染第4版
  "rtr-learning-map": "实时渲染第4版全书学习地图",
  "rtr-graphics-pipeline": "图形渲染管线",
  "rtr-transforms": "几何变换与空间",
  "rtr-shading-basics": "着色基础与光照模型",
  "rtr-texturing": "纹理与采样技术",
  "rtr-advanced-shading": "高级着色与BRDF",
  "rtr-shadows": "实时阴影技术",
  "rtr-global-illumination": "实时全局光照",
  "rtr-optimization": "渲染优化与加速",
  "rtr-final-review": "实时渲染第4版总复习",
  // 计算机图形学：原理及实践
  "cgp-learning-map": "计算机图形学：原理及实践 全书学习地图",
  "cgp-introduction": "图形学导论与历史",
  "cgp-raster-graphics": "光栅图形学基础",
  "cgp-2d-graphics": "2D图形与变换",
  "cgp-3d-graphics": "3D图形与投影",
  "cgp-rendering-algorithms": "渲染算法与可见性",
  "cgp-lighting-models": "光照模型与着色",
  "cgp-modeling": "建模与表示方法",
  "cgp-advanced-topics": "高级主题与动画",
  "cgp-final-review": "计算机图形学：原理及实践 总复习",
  // 基于物理的渲染 PBRT
  "pbt-learning-map": "基于物理的渲染全书学习地图",
  "pbt-radiometry": "辐射度量学",
  "pbt-camera-model": "相机模型与采样",
  "pbt-monte-carlo": "蒙特卡洛积分",
  "pbt-bxdf": "BRDF 与 BxDF 模型",
  "pbt-volume-scattering": "体积散射",
  "pbt-light-transport": "光线传输方程",
  "pbt-integrators": "积分器与采样器",
  "pbt-system-architecture": "系统架构与并行",
  "pbt-final-review": "基于物理的渲染总复习",
  // 全局光照技术
  "gil-learning-map": "全局光照技术全书学习地图",
  "gil-direct-indirect": "直接光与间接光",
  "gil-radiosity": "辐射度方法",
  "gil-path-tracing": "路径追踪",
  "gil-photon-mapping": "光子映射",
  "gil-importance-sampling": "重要性采样",
  "gil-bias-unbiased": "有偏与无偏估计",
  "gil-realtime-gi": "实时全局光照",
  "gil-advanced-techniques": "高级 GI 技术",
  "gil-final-review": "全局光照技术总复习",
  // Unity Shader入门精要 第一版
  "useb-official-learning-map": "《Unity Shader入门精要》全书导览",
  "useb-01-welcome-shader-world": "第1章 欢迎来到Shader的世界",
  "useb-02-rendering-pipeline": "第2章 渲染流水线",
  "useb-03-unity-shader-basics": "第3章 Unity Shader基础",
  "useb-04-shader-mathematics": "第4章 学习Shader所需的数学基础",
  "useb-05-first-unity-shader": "第5章 开始Unity Shader学习之旅",
  "useb-06-basic-lighting": "第6章 Unity中的基础光照",
  "useb-07-basic-textures": "第7章 基础纹理",
  "useb-08-transparency": "第8章 透明效果",
  "useb-09-complex-lighting": "第9章 更复杂的光照",
  "useb-10-advanced-textures": "第10章 高级纹理",
  "useb-11-animated-image": "第11章 让画面动起来",
  "useb-12-screen-post-effects": "第12章 屏幕后处理效果",
  "useb-13-depth-normal-textures": "第13章 使用深度和法线纹理",
  "useb-14-non-photorealistic-rendering": "第14章 非真实感渲染",
  "useb-15-noise": "第15章 使用噪声",
  "useb-16-rendering-optimization": "第16章 Unity中的渲染优化技术",
  "useb-17-surface-shader": "第17章 Surface Shader探秘",
  "useb-18-physically-based-rendering": "第18章 基于物理的渲染",
  "useb-19-unity5-changes": "第19章 Unity 5更新了什么",
  "useb-20-more-to-learn": "第20章 还有更多内容吗",
  "useb-official-final-review": "《Unity Shader入门精要》总复习",
  // Practical Shader Development 第一版
  "psd-official-learning-map": "《Shader开发实战》全书导览",
  "psd-01-hello-game-graphics": "第1章 初识游戏图形",
  "psd-02-first-shaders": "第2章 第一个着色器",
  "psd-03-using-textures": "第3章 使用纹理",
  "psd-04-translucency-depth": "第4章 半透明与深度",
  "psd-05-making-things-move": "第5章 使物体动起来",
  "psd-06-cameras-coordinates": "第6章 摄像机和坐标",
  "psd-07-first-3d-project": "第7章 第一个3D项目",
  "psd-08-diffuse-lighting": "第8章 漫反射光照",
  "psd-09-first-lighting-model": "第9章 第一个光照模型",
  "psd-10-normal-mapping": "第10章 法线贴图",
  "psd-11-cubemaps-skyboxes": "第11章 立方体贴图和天空盒",
  "psd-12-lighting-in-depth": "第12章 深入光照",
  "psd-13-profiling-shaders": "第13章 剖析着色器性能",
  "psd-14-optimizing-shaders": "第14章 优化着色器",
  "psd-15-precision": "第15章 精度",
  "psd-16-writing-shaders-unity": "第16章 在Unity中编写着色器",
  "psd-17-writing-shaders-ue4": "第17章 在UE4中编写着色器",
  "psd-18-writing-shaders-godot": "第18章 在Godot中编写着色器",
  "psd-appendix-a-code-snippets": "附录A 重要代码片段",
  "psd-official-final-review": "《Shader开发实战》总复习",
  // Unity 3D ShaderLab 开发实战详解 第一版
  "usl-official-learning-map": "《Unity 3D ShaderLab开发实战详解》全书导览",
  "usl-01-shader-concept": "第1章 Shader（着色器）的概念和在3D游戏中的作用",
  "usl-02-unity-shader-forms": "第2章 Unity中Shader（着色器）的形态",
  "usl-03-coordinate-spaces": "第3章 Shader（着色器）中用到的各种空间概念",
  "usl-04-basic-lighting-models": "第4章 基本的光照模型",
  "usl-05-first-executed-pass": "第5章 第一个被执行的Pass",
  "usl-06-vertexlit-path": "第6章 VertexLit渲染路径",
  "usl-07-forward-path": "第7章 Forward渲染路径",
  "usl-08-baked-lightmaps": "第8章 基于光照贴图的烘焙照明",
  "usl-09-light-probes": "第9章 基于LightProbes的照明",
  "usl-10-planar-shadows": "第10章 平面阴影",
  "usl-11-spherical-shadows": "第11章 球体阴影",
  "usl-12-volume-shadows": "第12章 体积阴影",
  "usl-13-shadow-mapping": "第13章 阴影映射",
  "usl-14-built-in-shadows": "第14章 内置的阴影",
  "usl-15-pass-state-commands": "第15章 Pass的通用指令开关",
  "usl-16-fixed-function-pipeline": "第16章 固定管线",
  "usl-17-surface-shader": "第17章 Surface Shader",
  "usl-18-bump-material": "第18章 凹凸材质",
  "usl-19-toon-material": "第19章 卡通材质",
  "usl-20-mirror-material": "第20章 镜面材质",
  "usl-21-translucent-material": "第21章 半透明材质",
  "usl-22-volumetric-fog": "第22章 体积雾",
  "usl-23-wrap-model": "第23章 Wrap Model新解",
  "usl-24-area-light": "第24章 面积光",
  "usl-25-volumetric-light": "第25章 体积光",
  "usl-26-replacement-rendering": "第26章 材质替代渲染",
  "usl-27-post-effects": "第27章 后期效果",
  "usl-28-terrain": "第28章 地形",
  "usl-29-projection": "第29章 投影",
  "usl-30-organization-reuse": "第30章 Shader的组织和复用",
  "usl-31-rendering-concepts": "第31章 你必须知道的渲染概念",
  "usl-32-render-path-optimization": "第32章 基于渲染路径的优化",
  "usl-33-mobile-optimization": "第33章 移动平台上的优化",
  "usl-official-final-review": "《Unity 3D ShaderLab开发实战详解》总复习",
  // Unity着色器和屏幕特效开发秘笈 第一版
  "usf-official-learning-map": "《Unity着色器和屏幕特效开发秘笈》全书导览",
  "usf-01-diffuse-shading": "第1章 漫反射着色",
  "usf-02-texture-effects": "第2章 使用纹理贴图制作特效",
  "usf-03-specular-reflection": "第3章 利用镜面反射让游戏闪耀起来",
  "usf-04-shader-reflections": "第4章 着色器的反射",
  "usf-05-custom-lighting-models": "第5章 创建自定义光照模型",
  "usf-06-transparency": "第6章 透明度",
  "usf-07-vertex-magic": "第7章 顶点魔法",
  "usf-08-mobile-shader-optimization": "第8章 移动平台上着色器的优化",
  "usf-09-cginclude-modularity": "第9章 使用CgInclude文件让着色器模块化",
  "usf-10-rendertexture-screen-effects":
    "第10章 使用Unity的渲染纹理实现屏幕特效",
  "usf-11-gameplay-screen-effects": "第11章 游戏的可玩性和屏幕特效",
  "usf-official-final-review": "《Unity着色器和屏幕特效开发秘笈》总复习",
  // Unity 6 URP 内置 Shader 源码解析
  "uus-official-learning-map": "《Unity 6 URP内置Shader源码解析》全图",
  "uus-01-package-topology": "源码单元1 包入口与Shader索引",
  "uus-02-shaderlab-pass-contract": "源码单元2 ShaderLab与LightMode契约",
  "uus-03-lit-input-material": "源码单元3 Lit.shader与LitInput材质入口",
  "uus-04-brdf-surface-data": "源码单元4 SurfaceData到BRDFData",
  "uus-05-lit-forward-pass": "源码单元5 LitForwardPass前向主链",
  "uus-06-lit-gbuffer-pass": "源码单元6 LitGBufferPass延迟写入",
  "uus-07-shared-utility-passes": "源码单元7 深度、法线、阴影、Meta与运动Pass",
  "uus-08-simple-lit": "源码单元8 SimpleLit材质族",
  "uus-09-complex-lit": "源码单元9 ComplexLit与ClearCoat",
  "uus-10-baked-lit": "源码单元10 BakedLit静态照明材质",
  "uus-11-unlit": "源码单元11 Unlit与多Pass兼容",
  "uus-12-particle-family": "源码单元12 Particles Lit、SimpleLit与Unlit",
  "uus-13-terrain-family": "源码单元13 Terrain Lit、Detail与Grass",
  "uus-14-nature-speedtree": "源码单元14 SpeedTree 7、8、9与Billboard",
  "uus-15-renderer-2d": "源码单元15 2D Lit、Unlit、Mask与Shape Light",
  "uus-16-decal-dbuffer": "源码单元16 Decal ShaderGraph与DBuffer",
  "uus-17-postprocess-fullscreen": "源码单元17 后处理、Blit与时域效果",
  "uus-18-core-input-transforms": "源码单元18 Core、Input与坐标变换",
  "uus-19-lighting-realtime-gi": "源码单元19 Lighting、RealtimeLights与GI",
  "uus-20-shadows-ao-screen-inputs": "源码单元20 Shadows、AO与屏幕纹理",
  "uus-21-variants-batching-xr-debug":
    "源码单元21 变体、SRP Batcher、DOTS、XR与调试",
  "uus-official-final-review": "《Unity 6 URP内置Shader源码解析》总复习",
  // GPU Pro 系列
  "gpo-official-learning-map": "GPU Pro 1-7 · 183篇官方学习地图",
  "gpo-geometry-terrain": "几何、地形与程序化表面：16篇复现",
  "gpo-pipeline-visibility": "渲染管线、可见性与光源分桶：16篇复现",
  "gpo-data-compression": "纹理、压缩、资产与数据表示：8篇复现",
  "gpo-lighting-gi": "光照、全局光照与反射：23篇复现",
  "gpo-shadow-systems": "阴影表示、过滤与软阴影：15篇复现",
  "gpo-material-shading": "材质、皮肤、毛发与表面细节：10篇复现",
  "gpo-volume-environment": "水体、大气、云雾与体积效果：15篇复现",
  "gpo-image-reconstruction": "图像空间、抗锯齿与时域重建：21篇复现",
  "gpo-transparency-raytracing": "透明、体素、光追与稀疏结构：13篇复现",
  "gpo-compute-simulation": "GPU计算、物理模拟与数值算法：9篇复现",
  "gpo-mobile-bandwidth": "移动GPU、带宽与跨API迁移：20篇复现",
  "gpo-engine-tools": "引擎架构、工具与项目复盘：17篇复现",
  "gpo-official-final-review": "GPU Pro 1-7 · 183篇综合验收",
  // ShaderX 系列
  "sxx-official-learning-map": "ShaderX 1-7 官方学习地图",
  "sxx-language-models": "语言、Shader Model 与可编程管线",
  "sxx-geometry-data": "几何数据、拓扑与细分",
  "sxx-animation-deformation": "动画、蒙皮与动态形变",
  "sxx-terrain-displacement": "地形、位移与表面细节",
  "sxx-material-surface": "材质、BRDF 与风格化表面",
  "sxx-lighting-gi": "直接光照、全局光照与环境遮蔽",
  "sxx-texture-representation": "纹理、立方体图与数据表示",
  "sxx-particles-volume": "粒子、体积、雾与流体",
  "sxx-image-post": "图像空间、后处理与重建",
  "sxx-transparency-aa": "透明、抗锯齿与可见样本",
  "sxx-shadow-systems": "阴影表示、过滤与稳定性",
  "sxx-environment-weather": "天空、天气与自然环境",
  "sxx-engine-architecture": "渲染器、材质系统与引擎集成",
  "sxx-tools-performance": "工具链、调试与性能工程",
  "sxx-gpgpu-simulation": "通用计算、模拟与非传统GPU任务",
  "sxx-mobile-portability": "移动GPU、精度与跨平台迁移",
  "sxx-official-final-review": "ShaderX 1-7 官方总验收",
  // §6 游戏开发
  "bl3-official-learning-map": "玩转 Blender 第 3 版 官方学习地图",
  "bl3-01-what-you-need-know-about-blender": "第 1 章 Blender 软件、历史与社区",
  "bl3-02-user-interface": "第 2 章 Blender 用户界面",
  "bl3-03-first-scene": "第 3 章 第一个 Blender 场景",
  "bl3-04-project-overview": "第 4 章 三阶段角色项目计划",
  "bl3-05-character-design": "第 5 章 角色设计与参考图",
  "bl3-06-modeling-tools": "第 6 章 Blender 建模工具",
  "bl3-07-character-modeling": "第 7 章 Jim 角色建模",
  "bl3-08-unwrapping-uvs": "第 8 章 UV 展开",
  "bl3-09-painting-textures": "第 9 章 绘制纹理",
  "bl3-10-materials-shaders": "第 10 章 材质与着色器",
  "bl3-11-character-rigging": "第 11 章 角色绑定",
  "bl3-12-animating-character": "第 12 章 角色动画",
  "bl3-13-camera-tracking": "第 13 章 摄像机追踪",
  "bl3-14-lighting-compositing-rendering": "第 14 章 灯光、合成与渲染",
  "bl3-15-other-features": "第 15 章 Blender 延伸功能",
  "bl3-official-final-review": "玩转 Blender 第 3 版 全书综合验收",
  "gdf-3e-official-learning-map": "《游戏设计基础（原书第3版）》权威学习地图",
  "gdf-3e-introduction": "导言 Introduction",
  "gdf-3e-01-games-video-games": "第1章 游戏与电子游戏",
  "gdf-3e-02-designing-developing-games": "第2章 设计与开发游戏",
  "gdf-3e-03-major-genres": "第3章 主要游戏类型",
  "gdf-3e-04-understanding-player": "第4章 理解玩家",
  "gdf-3e-05-understanding-machine": "第5章 理解机器",
  "gdf-3e-06-making-money": "第6章 盈利方式",
  "gdf-3e-07-game-concepts": "第7章 游戏概念",
  "gdf-3e-08-game-worlds": "第8章 游戏世界",
  "gdf-3e-09-creative-expressive-play": "第9章 创造性与表达性玩法",
  "gdf-3e-10-character-development": "第10章 角色开发",
  "gdf-3e-11-storytelling": "第11章 叙事",
  "gdf-3e-12-creating-user-experience": "第12章 创建用户体验",
  "gdf-3e-13-gameplay": "第13章 玩法",
  "gdf-3e-14-core-mechanics": "第14章 核心机制",
  "gdf-3e-15-game-balancing": "第15章 游戏平衡",
  "gdf-3e-16-level-design": "第16章 关卡设计",
  "gdf-3e-17-online-gaming": "第17章 在线游戏",
  "gdf-3e-glossary": "术语表 Glossary",
  "gdf-3e-references": "参考文献 References",
  "gdf-3e-index": "索引 Index",
  "gdf-3e-official-final-review": "《游戏设计基础（原书第3版）》综合验收",
  "gma-official-learning-map": "《游戏机制：高级游戏设计技术》权威学习地图",
  "gma-01-designing-game-mechanics": "第1章 设计游戏机制",
  "gma-02-emergence-progression": "第2章 突现和渐进",
  "gma-03-complex-systems-emergence": "第3章 复杂系统和突现结构",
  "gma-04-internal-economy": "第4章 内部经济",
  "gma-05-machinations": "第5章 Machinations",
  "gma-06-common-mechanisms": "第6章 常见机制",
  "gma-07-design-patterns": "第7章 设计模式",
  "gma-08-simulating-balancing-games": "第8章 模拟并平衡游戏",
  "gma-09-building-economies": "第9章 构建游戏经济",
  "gma-10-level-design-mechanics": "第10章 将关卡设计和游戏机制融合起来",
  "gma-11-progression-mechanisms": "第11章 渐进机制",
  "gma-12-meaningful-mechanics": "第12章 有意义的机制",
  "gma-appendix-a-machinations-reference": "附录A Machinations速查手册",
  "gma-appendix-b-pattern-library": "附录B 设计模式库",
  "gma-appendix-c-machinations-start": "附录C Machinations入门指南",
  "gma-official-final-review": "《游戏机制：高级游戏设计技术》全书综合验收",
  "gmp17-official-learning-map": "《游戏程序员的学习之路》官方图谱学习地图",
  "gmp17-00-programming-preschool": "0. 编程学前班",
  "gmp17-01-computer-science": "1. 计算机科学",
  "gmp17-02-programming-languages": "2. 编程语言",
  "gmp17-03-software-development": "3. 软件开发",
  "gmp17-04-game-mathematics": "4. 游戏程序员的数学课",
  "gmp17-05-game-programming": "5. 游戏编程",
  "gmp17-06-game-engine-development": "6. 游戏引擎开发",
  "gmp17-07-computer-graphics": "7. 计算机图形学（CG）",
  "gmp17-08-game-audio": "8. 游戏音效",
  "gmp17-09-game-physics-animation": "9. 游戏物理和动画",
  "gmp17-10-game-ai": "10. 游戏人工智能（AI）",
  "gmp17-11-multiplayer-programming": "11. 多人游戏编程",
  "gmp17-official-final-review": "《游戏程序员的学习之路》全图综合验收",
  "uhm-2024-official-learning-map": "《Unity for HMI》2024官方演讲学习地图",
  "uhm-2024-slide-01-cover": "第1页 Unity for HMI",
  "uhm-2024-slide-02-new-chapter": "第2页 未来已来：Unity开启3D座舱新篇章",
  "uhm-2024-slide-03-made-with-unity": "第3页 Made with Unity",
  "uhm-2024-slide-04-production-evidence": "第4页 量产采用证据",
  "uhm-2024-slide-05-beijing-auto-show":
    "第5页 搭载Unity HMI技术的量产车型汇聚北京车展",
  "uhm-2024-slide-06-model-performance-budget": "第6页 模型预算与性能优化",
  "uhm-2024-slide-07-soc-os-compatibility": "第7页 主流SoC与操作系统适配",
  "uhm-2024-slide-08-architecture-combinations": "第8页 多种架构组合",
  "uhm-2024-slide-09-ecosystem": "第9页 地图方案与合作伙伴生态",
  "uhm-2024-slide-10-head-unit-edition": "第10页 车机版",
  "uhm-2024-slide-11-tuanjie-head-unit": "第11页 团结引擎车机版",
  "uhm-2024-slide-12-qnx-support": "第12页 QNX平台支持与优化",
  "uhm-2024-slide-13-embedded-linux-support":
    "第13页 Embedded Linux平台支持与优化",
  "uhm-2024-slide-14-tuanjie-engine": "第14页 团结引擎",
  "uhm-2024-slide-15-uras-architecture": "第15页 专有架构：URAS渲染方案",
  "uhm-2024-slide-16-uras-unified-rendering": "第16页 URAS统一后台渲染服务",
  "uhm-2024-slide-17-uras-view-isolation": "第17页 URAS View组件与隔离工程",
  "uhm-2024-slide-18-unity-china": "第18页 Unity中国",
  "uhm-2024-slide-19-timeline": "第19页 Unity与Unity中国时间线",
  "uhm-2024-slide-20-capability-foundation": "第20页 车载HMI能力底座",
  "uhm-2024-slide-21-service-model": "第21页 创新、实施与迭代服务模式",
  "uhm-2024-slide-22-innovation-scenarios": "第22页 六大HMI创新场景",
  "uhm-2024-slide-23-evidence-closure": "第23页 Thank you与证据闭环",
  "uhm-2024-official-final-review": "《Unity for HMI》2024官方演讲综合验收",
  "uid-official-learning-map": "Unity UI 设计：官方学习地图",
  "uid-01-looking-back-looking-forward": "第 1 章：回顾过去，展望未来",
  "uid-02-building-layouts": "第 2 章：构建布局",
  "uid-03-control-control": "第 3 章：控件，控件，你必须学会控件",
  "uid-04-anchors-away": "第 4 章：锚点起航",
  "uid-05-screen-world-camera": "第 5 章：屏幕空间、世界空间与相机",
  "uid-06-working-with-ui-source": "第 6 章：与 UI 源码协同工作",
  "uid-appendix-3d-scene-sample": "附录：3D 场景示例",
  "uid-official-final-review": "Unity UI 设计：全书综合验收",
  "usc-official-learning-map": "Unity 脚本设计：官方学习地图",
  "usc-01-unity-csharp-refresher": "第 1 章：Unity C# 复习",
  "usc-02-debugging": "第 2 章：调试",
  "usc-03-singletons-statics-gameobjects-world":
    "第 3 章：单例、静态、GameObject 与世界",
  "usc-04-event-driven-programming": "第 4 章：事件驱动编程",
  "usc-05-cameras-rendering-scenes": "第 5 章：相机、渲染与场景",
  "usc-06-working-with-mono": "第 6 章：使用 Mono",
  "usc-07-artificial-intelligence": "第 7 章：人工智能",
  "usc-08-customizing-unity-editor": "第 8 章：定制 Unity 编辑器",
  "usc-09-textures-models-2d": "第 9 章：纹理、模型与 2D",
  "usc-10-source-control-other-tips": "第 10 章：版本控制与其他技巧",
  "usc-official-final-review": "Unity 脚本设计：全书综合验收",
  "uan-official-learning-map": "Unity 游戏动画设计：官方学习地图",
  "uan-01-animation-fundamentals": "第 1 章：动画基础",
  "uan-02-sprite-animation": "第 2 章：精灵动画",
  "uan-03-native-animation": "第 3 章：原生动画",
  "uan-04-noncharacter-animation-mecanim": "第 4 章：非角色 Mecanim 动画",
  "uan-05-character-animation-fundamentals": "第 5 章：角色动画基础",
  "uan-06-advanced-character-animation": "第 6 章：高级角色动画",
  "uan-07-blend-shapes-ik-movie-textures":
    "第 7 章：Blend Shape、IK 与视频纹理",
  "uan-official-final-review": "Unity 游戏动画设计：全书综合验收",
  "uct-official-learning-map": "Unity 3D实战核心技术详解：权威学习地图",
  "uct-01-3d-math-unity": "第1章：3D数学与UNITY",
  "uct-02-avatar-outfit-system": "第2章：AVATAR换装系统",
  "uct-03-message-event-encapsulation": "第3章：消息事件封装",
  "uct-04-protobuf-in-games": "第4章：PROTOBUF在游戏中运用",
  "uct-05-text-file-encryption": "第5章：游戏中的文本文件加密",
  "uct-06-behavior-trees": "第6章：行为树在游戏中的运用",
  "uct-07-afterimage": "第7章：残影",
  "uct-08-mobile-realtime-shadows": "第8章：移动端实时阴影绘制",
  "uct-09-mobile-ocean-simulation": "第9章：移动端海水仿真技术",
  "uct-10-mvc-architecture": "第10章：MVC架构设计",
  "uct-11-fsm-in-games": "第11章：FSM有限状态机在游戏中的运用",
  "uct-12-mobile-hot-update": "第12章：移动端热更新技术实现",
  "uct-13-mobile-shader-techniques": "第13章：移动端SHADER技术",
  "uct-14-game-development-experience": "第14章：游戏开发经验分享",
  "uct-official-final-review": "Unity 3D实战核心技术详解：全书综合验收",
  "ugc-official-learning-map": "Unity游戏案例开发大全：权威学习地图",
  "ugc-01-unity3d-foundation-environment":
    "第1章：Unity 3D基础以及开发环境的搭建",
  "ugc-02-3d-billiards": "第2章：3D极品桌球",
  "ugc-03-3d-maze-box": "第3章：3D迷宫魔盒",
  "ugc-04-crossing-meridian": "第4章：穿越子午线",
  "ugc-05-tomb-coin-pusher": "第5章：古墓推金币",
  "ugc-06-coke-cans": "第6章：益智休闲类游戏——可乐可乐",
  "ugc-07-tank-battle": "第7章：坦克大战",
  "ugc-08-dog-runner": "第8章：酷跑类游戏——小狗快跑",
  "ugc-09-3d-virtual-parking": "第9章：3D虚拟停车场",
  "ugc-10-save-mushroom-village": "第10章：拯救蘑菇村",
  "ugc-11-baina-racing": "第11章：百纳赛车",
  "ugc-official-final-review": "Unity游戏案例开发大全：全书综合验收",
  "uvf-official-learning-map": "《Unity 3D游戏特效制作典型实例》权威学习地图",
  "uvf-01-unity3d-engine-overview": "第1章：Unity3D游戏引擎概述",
  "uvf-02-vfx-foundations": "第2章：游戏特效基础知识",
  "uvf-03-unity3d-foundations": "第3章：Unity3D基础知识入门",
  "uvf-04-scene-fire-snow": "第4章：Unity3D场景特效分析与讲解",
  "uvf-05-unity-max-weapon-buff-slash": "第5章：Unity3D与MAX的基本配合",
  "uvf-06-particle-hit-projectile-ui": "第6章：深入学习粒子系统",
  "uvf-07-physical-attacks": "第7章：物理攻击特效案例",
  "uvf-08-magic-attacks": "第8章：法术攻击特效案例",
  "uvf-09-common-skills": "第9章：通用类技能特效案例",
  "uvf-official-final-review": "《Unity 3D游戏特效制作典型实例》全书综合验收",
  "usg-official-learning-map": "《Unity 3D脚本编程与游戏开发》权威学习地图",
  "usg-01-script-overview": "第1章：Unity脚本概览",
  "usg-02-concepts-scripting-shooter": "第2章：Unity基本概念与脚本编程",
  "usg-03-physics-system": "第3章：物理系统",
  "usg-04-game-math": "第4章：游戏开发数学基础",
  "usg-05-ui-system": "第5章：脚本与UI系统",
  "usg-06-animation-system": "第6章：脚本与动画系统",
  "usg-07-effects": "第7章：脚本与特效",
  "usg-08-audio": "第8章：脚本与音频",
  "usg-09-resource-management": "第9章：脚本与资源管理",
  "usg-10-save-load": "第10章：数据的保存与加载",
  "usg-11-game-ai": "第11章：脚本与游戏AI",
  "usg-12-secret-commandos": "第12章：综合实例——秘密敢死队",
  "usg-13-advanced-programming": "第13章：进阶编程技术",
  "usg-official-final-review": "《Unity 3D脚本编程与游戏开发》全书综合验收",
  "ums-official-learning-map": "《Unity神技达人炼成记》权威学习地图",
  "ums-00-prologue-creative-space": "序章 制作空间的乐趣",
  "ums-01-creating-the-world": "第一章 开天辟地",
  "ums-02-thinking-and-structure": "第二章 思考方式与构造",
  "ums-03-world-composition": "第三章 世界的构成",
  "ums-04-scripting-foundations": "第四章 脚本基础知识",
  "ums-05-animation-and-characters": "第五章 动画和角色",
  "ums-06-gui-and-audio": "第六章 GUI与Audio",
  "ums-07-build-and-output": "第七章 输出",
  "ums-08-unity-possibilities": "第八章 Unity的可能性",
  "ums-09-playmaker-visual-scripting": "第九章 使用playMaker插件",
  "ums-10-optimization-and-pro": "第十章 优化和Professional版",
  "ums-appendix-tools-assets": "附录 外部工具与推荐Assets",
  "ums-official-final-review": "《Unity神技达人炼成记》全书综合验收",
  "u3ap-official-learning-map": "《Unity3D 高级编程之进阶主程》权威学习地图",
  "u3ap-01-csharp-key-techniques": "第1章 C# 要点技术",
  "u3ap-02-architecture": "第2章 架构",
  "u3ap-03-data-tables": "第3章 数据表",
  "u3ap-04-ui": "第4章 UI",
  "u3ap-05-models-animation": "第5章 资源、3D 模型与动画",
  "u3ap-06-network-layer": "第6章 网络层",
  "u3ap-07-rendering-graphics": "第7章 渲染管线与图形学",
  "u3ap-08-ai": "第8章 AI",
  "u3ap-10-map-pathfinding": "第10章 地图与寻路",
  "u3ap-official-final-review": "《Unity3D 高级编程之进阶主程》综合验收",
  "gep1-official-learning-map": "《游戏引擎原理与实践·卷1》权威学习地图",
  "gep1-front-matter": "书前资料：版权、提要、推荐序、前言与资源",
  "gep1-chapter-01-engine-conflict": "第1章 引擎的纷争",
  "gep1-chapter-02-setting-sail": "第2章 起航",
  "gep1-chapter-03-basic-system": "第3章 基本系统",
  "gep1-chapter-04-data-structures": "第4章 基本数据结构",
  "gep1-chapter-05-math-library": "第5章 数学库",
  "gep1-chapter-06-initialization-destruction": "第6章 初始化与销毁",
  "gep1-chapter-07-application-framework": "第7章 应用程序框架",
  "gep1-chapter-08-object-system": "第8章 对象系统",
  "gep1-chapter-09-resource-management": "第9章 资源管理",
  "gep1-chapter-10-design-philosophy": "第10章 引擎的设计哲学",
  "gep1-chapter-11-scene-management": "第11章 场景管理",
  "gep1-chapter-12-models-textures": "第12章 模型与贴图",
  "gep1-chapter-13-lod": "第13章 LOD",
  "gep1-official-final-review": "《游戏引擎原理与实践·卷1》全书综合复核",
  "rtcd-official-learning-map": "《实时碰撞检测算法技术》权威学习地图",
  "rtcd-front-matter": "前置资料：版本、作者、图表与前言",
  "rtcd-chapter-01-introduction": "Chapter 1 Introduction",
  "rtcd-chapter-02-design-issues":
    "Chapter 2 Collision Detection Design Issues",
  "rtcd-chapter-03-math-geometry-primer":
    "Chapter 3 A Math and Geometry Primer",
  "rtcd-chapter-04-bounding-volumes": "Chapter 4 Bounding Volumes",
  "rtcd-chapter-05-basic-primitive-tests": "Chapter 5 Basic Primitive Tests",
  "rtcd-chapter-06-bounding-volume-hierarchies":
    "Chapter 6 Bounding Volume Hierarchies",
  "rtcd-chapter-07-spatial-partitioning": "Chapter 7 Spatial Partitioning",
  "rtcd-chapter-08-bsp-tree-hierarchies": "Chapter 8 BSP Tree Hierarchies",
  "rtcd-chapter-09-convexity-methods": "Chapter 9 Convexity-based Methods",
  "rtcd-chapter-10-gpu-assisted": "Chapter 10 GPU-assisted Collision Detection",
  "rtcd-chapter-11-numerical-robustness": "Chapter 11 Numerical Robustness",
  "rtcd-chapter-12-geometrical-robustness": "Chapter 12 Geometrical Robustness",
  "rtcd-chapter-13-optimization": "Chapter 13 Optimization",
  "rtcd-back-matter": "后置资料：参考文献、索引与配套光盘",
  "rtcd-official-final-review": "《实时碰撞检测算法技术》全书总复习",
  "gep2-official-learning-map":
    "《游戏引擎原理与实践·卷2：高级技术》权威学习地图",
  "gep2-front-matter": "书前资料：版本、范围、读者与资源",
  "gep2-chapter-01-skeletal-skinning-basics": "第1章 骨骼蒙皮模型与动画基础",
  "gep2-chapter-02-animation-playback-slots": "第2章 动画播放与插槽",
  "gep2-chapter-03-animation-blending": "第3章 动画混合",
  "gep2-chapter-04-morph-animation-blending": "第4章 变形动画混合",
  "gep2-chapter-05-ik-characters": "第5章 IK与角色",
  "gep2-chapter-06-lighting-rendering-history": "第6章 光照渲染的发展史",
  "gep2-chapter-07-renderer-interface": "第7章 渲染器接口",
  "gep2-chapter-08-materials": "第8章 材质",
  "gep2-chapter-09-render-pipeline-architecture": "第9章 流程渲染架构",
  "gep2-chapter-10-lighting-materials": "第10章 光照与材质",
  "gep2-chapter-11-post-effects": "第11章 后期效果",
  "gep2-chapter-12-shadows": "第12章 阴影",
  "gep2-chapter-13-multithreading": "第13章 多线程",
  "gep2-chapter-14-dynamic-buffers-profiler": "第14章 动态缓冲区与性能分析器",
  "gep2-official-final-review":
    "《游戏引擎原理与实践·卷2：高级技术》全书总复习",
  "gsp-official-learning-map": "《网络游戏服务器端编程》权威学习地图",
  "gsp-01-network-programming-foundations": "第1章 网络编程基础",
  "gsp-02-multithreading": "第2章 多线程",
  "gsp-03-efficient-communication-models": "第3章 高效通信模型",
  "gsp-04-game-data-encryption": "第4章 网络游戏数据加密技术",
  "gsp-05-game-database": "第5章 网络游戏数据库技术",
  "gsp-06-game-lobby": "第6章 游戏大厅的设计与实现",
  "gsp-07-gm-tool": "第7章 GM工具的设计与实现",
  "gsp-08-auto-update": "第8章 自动更新系统的设计与实现",
  "gsp-official-final-review": "《网络游戏服务器端编程》全书总复习",
  "umm-official-learning-map": "《Unity3D网络游戏实战（第2版）》权威学习地图",
  "umm-01-echo": "第1章 网络游戏的开端：Echo",
  "umm-02-async-multiplexing": "第2章 分身有术：异步和多路复用",
  "umm-03-battle-royale": "第3章 实践出真知：大乱斗游戏",
  "umm-04-tcp-data-stream": "第4章 正确收发数据流",
  "umm-05-deep-tcp": "第5章 深入了解TCP，解决暗藏问题",
  "umm-06-client-network-module": "第6章 通用客户端网络模块",
  "umm-07-server-framework": "第7章 通用服务端框架",
  "umm-08-tank-battle-project": "第8章 完整大项目《坦克大战》",
  "umm-09-ui-module": "第9章 UI界面模块",
  "umm-10-lobby-rooms": "第10章 游戏大厅和房间",
  "umm-11-battle-result": "第11章 战斗和胜负判定",
  "umm-12-battle-sync": "第12章 同步战斗信息",
  "umm-official-final-review": "《Unity3D网络游戏实战（第2版）》全书总复习",
  "ucn-official-learning-map": "《Unity与C++网络游戏开发实战》权威学习地图",
  "ucn-01-unity-environment": "第1章 Unity介绍与相关环境的搭建和调试",
  "ucn-02-hello-simulation": "第2章 编写Hello World与仿真系统体验",
  "ucn-03-csharp-language": "第3章 Unity游戏开发语言",
  "ucn-04-graphics-in-unity": "第4章 在Unity中使用图形学知识",
  "ucn-05-unity-editor": "第5章 Unity编辑器的使用",
  "ucn-06-simulation-architecture": "第6章 虚拟仿真训练系统的架构和模块",
  "ucn-07-character-development": "第7章 人物资源编辑与程序开发",
  "ucn-08-scene-development": "第8章 场景资源编辑与程序开发",
  "ucn-09-assets-interactions": "第9章 资源组件和交互物品开发",
  "ucn-10-ngui-interaction": "第10章 NGUI组件开发和操作交互开发",
  "ucn-11-cpp-language": "第11章 C++语言基础",
  "ucn-12-cpp-network-basics": "第12章 C++网络编程基础",
  "ucn-13-threading-async-socket": "第13章 多线程和异步套接字",
  "ucn-14-mysql": "第14章 MySQL数据库的使用",
  "ucn-15-protobuf": "第15章 网络协议Protobuf的使用",
  "ucn-16-server-topology": "第16章 设计架构简单的互动服务器体系",
  "ucn-17-login-server": "第17章 开发登录服务器LoginServer",
  "ucn-18-gate-server": "第18章 开发网关服务器GateServer",
  "ucn-19-center-server": "第19章 开发中心服务器CenterServer",
  "ucn-20-battle-server": "第20章 开发战场服务器BattleServer",
  "ucn-21-hla-ai": "第21章 一些仿真框架和人工智能的介绍",
  "ucn-afterword-career-development": "后记——全书总结与个人发展建议",
  "ucn-official-final-review": "《Unity与C++网络游戏开发实战》全书总复习",
  "mga-official-learning-map":
    "《多人在线游戏架构实战：基于C++的分布式游戏编程》权威学习地图",
  "mga-01-network-basics": "第1章 网络编程基础",
  "mga-02-io-multiplexing": "第2章 网络IO多路复用",
  "mga-03-threads-actor": "第3章 线程、进程以及Actor模型",
  "mga-04-account-login": "第4章 账号登录与验证",
  "mga-05-performance-object-pool": "第5章 性能优化与对象池",
  "mga-06-ecs-framework": "第6章 搭建ECS框架",
  "mga-07-mysql": "第7章 MySQL数据库",
  "mga-08-component-programming": "第8章 深入学习组件式编程",
  "mga-09-app-manager-http": "第9章 服务器管理进程与HTTP",
  "mga-10-distributed-login-redis": "第10章 分布式登录与Redis内存数据库",
  "mga-11-distributed-world-transfer": "第11章 分布式跳转方案",
  "mga-12-disconnect-dynamic-system": "第12章 断线与动态加载系统",
  "mga-official-final-review":
    "《多人在线游戏架构实战：基于C++的分布式游戏编程》全书总复习",
  "gnc-official-learning-map": "《网络游戏核心技术与实战》权威学习地图",
  "gnc-00-quickstart-network-game-programming":
    "第0章 [快速入门]网络游戏编程：网络和游戏编程的技术基础",
  "gnc-01-history-evolution": "第1章 网络游戏的历史和演化：游戏进入了网络世界",
  "gnc-02-what-is-online-game": "第2章 何为网络游戏：网络游戏面面观",
  "gnc-03-online-game-architecture":
    "第3章 网络游戏的架构：挑战游戏的可玩性和技术限制",
  "gnc-04-cs-mmo-practice": "第4章 [实践]C/S MMO游戏开发：长期运行的游戏服务器",
  "gnc-05-p2p-mo-practice":
    "第5章 [实践]P2P MO游戏开发：没有专用服务器的动作类游戏的实现",
  "gnc-06-auxiliary-systems":
    "第6章 网络游戏的辅助系统：完善游戏服务的必要机制",
  "gnc-07-operations-infrastructure":
    "第7章 支持网络游戏运营的基础设施：架构、负荷测试和运营",
  "gnc-08-development-organization": "第8章 网络游戏的开发体制：团队管理的挑战",
  "gnc-official-final-review": "《网络游戏核心技术与实战》全书总复习",
  "gsa-official-learning-map": "《游戏服务器架构与优化》权威学习地图",
  "gsa-01-python-networking": "第1章 Python网络编程模块",
  "gsa-02-communication-encryption": "第2章 通信加密",
  "gsa-03-server-practice": "第3章 服务器实作",
  "gsa-04-basic-storage": "第4章 基础内容存储",
  "gsa-05-storage-solutions": "第5章 存储方案",
  "gsa-06-game-server-foundations": "第6章 游戏服务器初探",
  "gsa-07-server-interactions": "第7章 游戏服务器的交互",
  "gsa-08-game-lobby": "第8章 游戏大厅",
  "gsa-09-realtime-interaction": "第9章 实时交互服务器",
  "gsa-10-ladder-economy": "第10章 天梯和经济系统",
  "gsa-11-capacity-client-optimization": "第11章 服务器承载量和客户端优化方案",
  "gsa-12-distributed-servers": "第12章 分布式服务器",
  "gsa-appendix-language-comparison": "附录A 不同语言之间的区别",
  "gsa-official-final-review": "《游戏服务器架构与优化》全书总复习",
  "mgp-official-learning-map": "《Multiplayer Game Programming》权威学习地图",
  "mgp-01-overview-networked-games":
    "第1章 网络游戏概览（Overview of Networked Games）",
  "mgp-02-internet": "第2章 互联网（The Internet）",
  "mgp-03-berkeley-sockets": "第3章 Berkeley套接字（Berkeley Sockets）",
  "mgp-04-object-serialization": "第4章 对象序列化（Object Serialization）",
  "mgp-05-object-replication": "第5章 对象复制（Object Replication）",
  "mgp-06-network-topologies":
    "第6章 网络拓扑与样例游戏（Network Topologies and Sample Games）",
  "mgp-07-latency-jitter-reliability":
    "第7章 延迟、抖动与可靠性（Latency, Jitter, and Reliability）",
  "mgp-08-improved-latency-handling":
    "第8章 改进延迟处理（Improved Latency Handling）",
  "mgp-09-scalability": "第9章 可伸缩性（Scalability）",
  "mgp-10-security": "第10章 安全（Security）",
  "mgp-11-real-world-engines": "第11章 真实世界引擎（Real-World Engines）",
  "mgp-12-gamer-services": "第12章 玩家服务（Gamer Services）",
  "mgp-13-cloud-dedicated-servers":
    "第13章 云端托管专用服务器（Cloud Hosting Dedicated Servers）",
  "mgp-appendix-modern-cpp": "附录A 现代C++入门（A Modern C++ Primer）",
  "mgp-official-final-review": "《Multiplayer Game Programming》全书总复习",
  "jpg-official-learning-map":
    "《JavaScript高级程序设计（第4版）》权威学习地图",
  "jpg-01-what-is-javascript": "第 1 章 什么是JavaScript",
  "jpg-02-javascript-in-html": "第 2 章 HTML中的JavaScript",
  "jpg-03-language-basics": "第 3 章 语言基础",
  "jpg-04-variables-scope-memory": "第 4 章 变量、作用域与内存",
  "jpg-05-basic-reference-types": "第 5 章 基本引用类型",
  "jpg-06-collection-reference-types": "第 6 章 集合引用类型",
  "jpg-07-iterators-generators": "第 7 章 迭代器与生成器",
  "jpg-08-objects-classes-oop": "第 8 章 对象、类与面向对象编程",
  "jpg-09-proxies-reflect": "第 9 章 代理与反射",
  "jpg-10-functions": "第 10 章 函数",
  "jpg-11-promises-async-functions": "第 11 章 期约与异步函数",
  "jpg-12-browser-object-model": "第 12 章 BOM",
  "jpg-13-client-detection": "第 13 章 客户端检测",
  "jpg-14-dom": "第 14 章 DOM",
  "jpg-15-dom-extensions": "第 15 章 DOM扩展",
  "jpg-16-dom-levels-2-3": "第 16 章 DOM2和DOM3",
  "jpg-17-events": "第 17 章 事件",
  "jpg-18-animation-canvas": "第 18 章 动画与Canvas图形",
  "jpg-19-form-scripting": "第 19 章 表单脚本",
  "jpg-20-javascript-apis": "第 20 章 JavaScript API",
  "jpg-21-error-handling-debugging": "第 21 章 错误处理与调试",
  "jpg-22-working-with-xml": "第 22 章 处理XML",
  "jpg-23-json": "第 23 章 JSON",
  "jpg-24-network-requests": "第 24 章 网络请求与远程资源",
  "jpg-25-client-storage": "第 25 章 客户端存储",
  "jpg-26-modules": "第 26 章 模块",
  "jpg-27-workers": "第 27 章 工作者线程",
  "jpg-28-best-practices": "第 28 章 最佳实践",
  "jpg-appendix-a-es2018-es2019": "附录 A ES2018和ES2019",
  "jpg-appendix-b-strict-mode": "附录 B 严格模式",
  "jpg-appendix-c-libraries-frameworks": "附录 C JavaScript库和框架",
  "jpg-appendix-d-javascript-tools": "附录 D JavaScript工具",
  "jpg-official-final-review": "《JavaScript高级程序设计（第4版）》全书总复习",
  "vjp-official-learning-map": "《Vue.js从入门到项目实战》权威学习地图",
  "vjp-01-introduction": "第 1 章 引言",
  "vjp-02-basic-introduction": "第 2 章 基本介绍",
  "vjp-03-vue-syntax": "第 3 章 Vue语法",
  "vjp-04-vue-options": "第 4 章 Vue选项",
  "vjp-05-built-in-components": "第 5 章 Vue内置组件",
  "vjp-06-projectization": "第 6 章 Vue项目化",
  "vjp-07-online-mall-one": "第 7 章 打造线上商城（一）",
  "vjp-08-online-mall-two": "第 8 章 打造线上商城（二）",
  "vjp-09-corporate-website": "第 9 章 企业官网的建设",
  "vjp-10-mobile-news": "第 10 章 我的掌上新闻",
  "vjp-11-svg-drawing-board": "第 11 章 SVG画图板",
  "vjp-appendix-a-git": "附录 A Git入门",
  "vjp-appendix-b-npm": "附录 B NPM入门",
  "vjp-appendix-c-webpack": "附录 C Webpack入门",
  "vjp-appendix-d-closures-object-references": "附录 D 闭包和对象引用",
  "vjp-appendix-e-ecmascript-6": "附录 E 常见的ECMAScript 6语法",
  "vjp-official-final-review": "《Vue.js从入门到项目实战》全书总复习",
  "vdi-official-learning-map": "《Vue.js设计与实现》权威学习地图",
  "vdi-01-art-of-tradeoffs": "第 1 章 权衡的艺术",
  "vdi-02-core-elements-framework-design": "第 2 章 框架设计的核心要素",
  "vdi-03-vue3-design-thinking": "第 3 章 Vue.js 3的设计思路",
  "vdi-04-reactivity-role-implementation": "第 4 章 响应系统的作用与实现",
  "vdi-05-non-primitive-reactivity": "第 5 章 非原始值的响应式方案",
  "vdi-06-primitive-reactivity": "第 6 章 原始值的响应式方案",
  "vdi-07-renderer-design": "第 7 章 渲染器的设计",
  "vdi-08-mount-update": "第 8 章 挂载与更新",
  "vdi-09-simple-diff": "第 9 章 简单Diff算法",
  "vdi-10-double-ended-diff": "第 10 章 双端Diff算法",
  "vdi-11-fast-diff": "第 11 章 快速Diff算法",
  "vdi-12-component-implementation": "第 12 章 组件的实现原理",
  "vdi-13-async-functional-components": "第 13 章 异步组件与函数式组件",
  "vdi-14-built-in-components-modules": "第 14 章 内建组件和模块",
  "vdi-15-compiler-core-overview": "第 15 章 编译器核心技术概览",
  "vdi-16-parser": "第 16 章 解析器",
  "vdi-17-compiler-optimization": "第 17 章 编译优化",
  "vdi-18-isomorphic-rendering": "第 18 章 同构渲染",
  "vdi-official-final-review": "《Vue.js设计与实现》全书总复习",
  "ydk-official-learning-map": "《你不知道的 JavaScript》权威学习地图",
  "ydk-scope-01-what-is-scope": "第 1 章 作用域是什么",
  "ydk-scope-02-lexical-scope": "第 2 章 词法作用域",
  "ydk-scope-03-function-vs-block-scope": "第 3 章 函数作用域和块作用域",
  "ydk-scope-04-hoisting": "第 4 章 提升",
  "ydk-scope-05-scope-closures": "第 5 章 作用域闭包",
  "ydk-scope-appendix-a-dynamic-scope": "附录 A 动态作用域",
  "ydk-scope-appendix-b-block-scope-polyfill": "附录 B 块作用域的替代方案",
  "ydk-scope-appendix-c-lexical-this": "附录 C this 词法",
  "ydk-this-01-this-or-that": "第 1 章 关于 this",
  "ydk-this-02-this-all-makes-sense": "第 2 章 this 全面解析",
  "ydk-this-03-objects": "第 3 章 对象",
  "ydk-this-04-mixing-class-objects": "第 4 章 混合对象“类”",
  "ydk-this-05-prototypes": "第 5 章 原型",
  "ydk-this-06-behavior-delegation": "第 6 章 行为委托",
  "ydk-this-appendix-a-es6-class": "附录 A ES6 中的 class",
  "ydk-types-01-types": "第 1 章 类型",
  "ydk-types-02-values": "第 2 章 值",
  "ydk-types-03-natives": "第 3 章 原生函数",
  "ydk-types-04-coercion": "第 4 章 强制类型转换",
  "ydk-types-05-grammar": "第 5 章 语法",
  "ydk-types-appendix-a-mixed-environment": "附录 A 混合环境 JavaScript",
  "ydk-async-01-now-and-later": "第 1 章 异步：现在与将来",
  "ydk-async-02-callbacks": "第 2 章 回调",
  "ydk-async-03-promises": "第 3 章 Promise",
  "ydk-async-04-generators": "第 4 章 生成器",
  "ydk-async-05-program-performance": "第 5 章 程序性能",
  "ydk-async-06-benchmarking-tuning": "第 6 章 性能测试与调优",
  "ydk-async-appendix-a-asynquence": "附录 A asynquence 库",
  "ydk-async-appendix-b-advanced-patterns": "附录 B 高级异步模式",
  "ydk-up-01-into-programming": "第 1 章 深入编程",
  "ydk-up-02-into-javascript": "第 2 章 深入 JavaScript",
  "ydk-up-03-into-ydkjs": "第 3 章 深入 YDKJS",
  "ydk-es6-01-now-future": "第 1 章 ES？现在与未来",
  "ydk-es6-02-syntax": "第 2 章 语法",
  "ydk-es6-03-organization": "第 3 章 代码组织",
  "ydk-es6-04-async-flow-control": "第 4 章 异步流程控制",
  "ydk-es6-05-collections": "第 5 章 集合",
  "ydk-es6-06-api-additions": "第 6 章 新增 API",
  "ydk-es6-07-meta-programming": "第 7 章 元编程",
  "ydk-es6-08-beyond-es6": "第 8 章 ES6 之后",
  "ydk-official-final-review": "《你不知道的 JavaScript》全书总复习",
  "jdg-official-learning-map": "《JavaScript 权威指南（第 7 版）》权威学习地图",
  "jdg-01-introduction": "第 1 章 JavaScript 简介",
  "jdg-02-lexical-structure": "第 2 章 词法结构",
  "jdg-03-types-values-variables": "第 3 章 类型、值和变量",
  "jdg-04-expressions-operators": "第 4 章 表达式与操作符",
  "jdg-05-statements": "第 5 章 语句",
  "jdg-06-objects": "第 6 章 对象",
  "jdg-07-arrays": "第 7 章 数组",
  "jdg-08-functions": "第 8 章 函数",
  "jdg-09-classes": "第 9 章 类",
  "jdg-10-modules": "第 10 章 模块",
  "jdg-11-standard-library": "第 11 章 JavaScript 标准库",
  "jdg-12-iterators-generators": "第 12 章 迭代器与生成器",
  "jdg-13-asynchronous-javascript": "第 13 章 异步 JavaScript",
  "jdg-14-metaprogramming": "第 14 章 元编程",
  "jdg-15-web-browsers": "第 15 章 浏览器中的 JavaScript",
  "jdg-16-node": "第 16 章 Node 服务器端 JavaScript",
  "jdg-17-tools-extensions": "第 17 章 JavaScript 工具与扩展",
  "jdg-official-final-review": "《JavaScript 权威指南（第 7 版）》全书总复习",
  "jfs-official-learning-map": "《JavaScript 全栈开发》权威学习地图",
  "jfs-01-javascript-introduction": "第 1 章 JavaScript 简介",
  "jfs-02-variables-expressions-statements": "第 2 章 变量、表达式与语句",
  "jfs-03-functions-objects": "第 3 章 函数与对象",
  "jfs-04-object-oriented-programming": "第 4 章 面向对象编程",
  "jfs-05-asynchronous-programming": "第 5 章 异步编程",
  "jfs-06-frontend-overview": "第 6 章 前端编程概述",
  "jfs-07-dom-standard": "第 7 章 DOM 标准与使用",
  "jfs-08-dom-extensions-bom": "第 8 章 DOM 扩展与 BOM",
  "jfs-09-frontend-events": "第 9 章 前端事件处理",
  "jfs-10-ajax-programming": "第 10 章 AJAX 编程方法",
  "jfs-11-nodejs-overview": "第 11 章 Node.js 概述",
  "jfs-12-build-web-services": "第 12 章 构建 Web 服务",
  "jfs-13-handle-client-requests": "第 13 章 响应客户请求",
  "jfs-14-data-persistence": "第 14 章 实现数据存取",
  "jfs-official-final-review": "《JavaScript 全栈开发》全书总复习",
  "csw-official-learning-map": "《CSS 世界》权威学习地图",
  "csw-01-worldview-flow": "第 1 章 概述",
  "csw-02-terms-undefined-behavior": "第 2 章 需提前了解的术语和概念",
  "csw-03-flow-elements-sizing": "第 3 章 流、元素与基本尺寸",
  "csw-04-box-dimensions": "第 4 章 盒尺寸四大家族",
  "csw-05-inline-flow": "第 5 章 内联元素与流",
  "csw-06-flow-breaking-protection": "第 6 章 流的破坏与保护",
  "csw-07-stacking-rules": "第 7 章 CSS 世界的层叠规则",
  "csw-08-text-processing": "第 8 章 强大的文本处理能力",
  "csw-09-decoration": "第 9 章 元素的装饰与美化",
  "csw-10-display-visibility": "第 10 章 元素的显示与隐藏",
  "csw-11-user-interface": "第 11 章 用户界面样式",
  "csw-12-writing-directions": "第 12 章 流向的改变",
  "csw-official-final-review": "《CSS 世界》全书总复习",
  "csec-official-learning-map": "《CSS 揭秘》权威学习地图",
  "csec-01-introduction": "第 1 章 引言",
  "csec-02-backgrounds-borders": "第 2 章 背景与边框",
  "csec-03-shapes": "第 3 章 形状",
  "csec-04-visual-effects": "第 4 章 视觉效果",
  "csec-05-typography": "第 5 章 字体排印",
  "csec-06-user-experience": "第 6 章 用户体验",
  "csec-07-structure-layout": "第 7 章 结构与布局",
  "csec-08-transitions-animations": "第 8 章 过渡与动画",
  "csec-official-final-review": "《CSS 揭秘》全书总复习",
  "ndg-official-learning-map": "《Node.js 权威指南》权威学习地图",
  "ndg-01-introduction": "第 1 章 Node.js 介绍",
  "ndg-02-repl": "第 2 章 Node.js 中的交互式运行环境 REPL",
  "ndg-03-foundations": "第 3 章 Node.js 基础知识",
  "ndg-04-modules-npm": "第 4 章 模块与 npm 包管理工具",
  "ndg-05-buffer-binary": "第 5 章 使用 Buffer 类处理二进制数据",
  "ndg-06-filesystem": "第 6 章 在 Node.js 中操作文件系统",
  "ndg-07-tcp-udp": "第 7 章 实现基于 TCP 与 UDP 的数据通信",
  "ndg-08-http-https": "第 8 章 创建 HTTP 与 HTTPS 服务器及客户端",
  "ndg-09-process-child-process": "第 9 章 进程与子进程",
  "ndg-10-errors-assertions": "第 10 章 Node.js 中的错误处理与断言处理",
  "ndg-11-crypto-compression": "第 11 章 加密与压缩",
  "ndg-12-other-modules": "第 12 章 Node.js 中的其他模块",
  "ndg-13-database-access": "第 13 章 数据库访问",
  "ndg-14-express-web-apps": "第 14 章 使用 Express 构建 Web 应用程序",
  "ndg-15-socketio-websocket":
    "第 15 章 使用 Socket.IO 类库实现 WebSocket 通信",
  "ndg-16-integrated-cases": "第 16 章 综合案例介绍",
  "ndg-official-final-review": "《Node.js 权威指南》全书总复习",
  "ndbg-official-learning-map": "《Node.js 调试指南》权威学习地图",
  "ndbg-01-cpu": "第 1 章 CPU",
  "ndbg-02-memory": "第 2 章 内存",
  "ndbg-03-code": "第 3 章 代码",
  "ndbg-04-tools": "第 4 章 工具",
  "ndbg-05-logging": "第 5 章 日志",
  "ndbg-06-apm": "第 6 章 APM",
  "ndbg-07-monitoring": "第 7 章 监控",
  "ndbg-08-applications": "第 8 章 应用",
  "ndbg-official-final-review": "《Node.js 调试指南》全书总复习",
  "dnj-official-learning-map": "《深入浅出 Node.js》权威学习地图",
  "dnj-01-node-introduction": "第 1 章 Node 简介",
  "dnj-02-module-mechanism": "第 2 章 模块机制",
  "dnj-03-async-io": "第 3 章 异步 I/O",
  "dnj-04-async-programming": "第 4 章 异步编程",
  "dnj-05-memory-control": "第 5 章 内存控制",
  "dnj-06-buffer": "第 6 章 理解 Buffer",
  "dnj-07-network-programming": "第 7 章 网络编程",
  "dnj-08-web-application": "第 8 章 构建 Web 应用",
  "dnj-09-processes": "第 9 章 玩转进程",
  "dnj-10-testing": "第 10 章 测试",
  "dnj-11-productization": "第 11 章 产品化",
  "dnj-appendix-a-installation": "附录 A 安装 Node",
  "dnj-appendix-b-debugging": "附录 B 调试 Node",
  "dnj-appendix-c-coding-style": "附录 C Node 编码规范",
  "dnj-appendix-d-local-npm": "附录 D 搭建局域 npm 仓库",
  "dnj-official-final-review": "《深入浅出 Node.js》全书总复习",
  "feng-official-learning-map": "《前端工程化：体系设计与实践》权威学习地图",
  "feng-01-history": "第 1 章 前端工程简史",
  "feng-02-scaffolding": "第 2 章 脚手架",
  "feng-03-build": "第 3 章 构建",
  "feng-04-local-dev-server": "第 4 章 本地开发服务器",
  "feng-05-deployment": "第 5 章 部署",
  "feng-06-workflow": "第 6 章 工作流",
  "feng-07-future": "第 7 章 前端工程化的未来",
  "feng-official-final-review": "《前端工程化：体系设计与实践》全书总复习",
  "hcw-official-learning-map": "《计算机是怎样跑起来的》权威学习地图",
  "hcw-01-three-principles": "第 1 章 计算机的三大原则",
  "hcw-02-build-computer": "第 2 章 试着制造一台计算机吧",
  "hcw-03-manual-assembly": "第 3 章 体验一次手工汇编",
  "hcw-04-program-flow": "第 4 章 程序像河水一样流动着",
  "hcw-05-algorithms": "第 5 章 与算法成为好朋友的七个要点",
  "hcw-06-data-structures": "第 6 章 与数据结构成为好朋友的七个要点",
  "hcw-07-oop": "第 7 章 成为会使用面向对象编程的程序员吧",
  "hcw-08-database": "第 8 章 一用就会的数据库",
  "hcw-09-tcp-ip": "第 9 章 通过七个简单的实验理解TCP/IP网络",
  "hcw-10-encryption": "第 10 章 试着加密数据吧",
  "hcw-11-xml": "第 11 章 XML是什么",
  "hcw-12-system-engineering": "第 12 章 SE负责监管计算机系统的构建",
  "hcw-official-final-review": "《计算机是怎样跑起来的》全书总复习",
  "hpw-official-learning-map": "《程序是怎样跑起来的》权威学习地图",
  "hpw-01-cpu": "第 1 章 对程序员来说CPU是什么",
  "hpw-02-binary": "第 2 章 数据是用二进制数表示的",
  "hpw-03-floating-point": "第 3 章 计算机进行小数运算时出错的原因",
  "hpw-04-memory": "第 4 章 熟练使用有棱有角的内存",
  "hpw-05-memory-disk": "第 5 章 内存和磁盘的亲密关系",
  "hpw-06-compression": "第 6 章 亲自尝试压缩数据",
  "hpw-07-runtime-environment": "第 7 章 程序是在何种环境中运行的",
  "hpw-08-source-executable": "第 8 章 从源文件到可执行文件",
  "hpw-09-os-applications": "第 9 章 操作系统和应用的关系",
  "hpw-10-assembly": "第 10 章 通过汇编语言了解程序的实际构成",
  "hpw-11-hardware-control": "第 11 章 硬件控制方法",
  "hpw-12-thinking": "第 12 章 让计算机“思考”",
  "hpw-appendix-c": "附录 让我们开始C语言之旅",
  "hpw-official-final-review": "《程序是怎样跑起来的》全书总复习",
  "cap-official-learning-map": "《深入理解计算机系统》权威学习地图",
  "cap-01-system-tour": "第 1 章 计算机系统漫游",
  "cap-02-information": "第 2 章 信息的表示和处理",
  "cap-03-machine-level": "第 3 章 程序的机器级表示",
  "cap-04-processor-architecture": "第 4 章 处理器体系结构",
  "cap-05-optimization": "第 5 章 优化程序性能",
  "cap-06-memory-hierarchy": "第 6 章 存储器层次结构",
  "cap-07-linking": "第 7 章 链接",
  "cap-08-exceptional-control": "第 8 章 异常控制流",
  "cap-09-virtual-memory": "第 9 章 虚拟内存",
  "cap-10-system-io": "第 10 章 系统级 I/O",
  "cap-11-network-programming": "第 11 章 网络编程",
  "cap-12-concurrent-programming": "第 12 章 并发编程",
  "cap-appendix-a-error-handling": "附录 A 错误处理",
  "cap-official-final-review": "《深入理解计算机系统》全书总复习",
  "mos-official-learning-map": "《现代操作系统（原书第4版）》权威学习地图",
  "mos-01-introduction": "第 1 章 引论",
  "mos-02-processes-threads": "第 2 章 进程与线程",
  "mos-03-memory-management": "第 3 章 内存管理",
  "mos-04-file-systems": "第 4 章 文件系统",
  "mos-05-input-output": "第 5 章 输入/输出",
  "mos-06-deadlocks": "第 6 章 死锁",
  "mos-07-virtualization-cloud": "第 7 章 虚拟化和云",
  "mos-08-multiple-processor-systems": "第 8 章 多处理机系统",
  "mos-09-security": "第 9 章 安全",
  "mos-10-unix-linux-android": "第 10 章 实例研究 1：UNIX、Linux 和 Android",
  "mos-11-windows-8": "第 11 章 实例研究 2：Windows 8",
  "mos-12-os-design": "第 12 章 操作系统设计",
  "mos-13-bibliography": "第 13 章 参考书目与文献",
  "mos-official-final-review": "《现代操作系统（原书第4版）》全书总复习",
  "osc-official-learning-map": "《操作系统概念（原书第10版）》权威学习地图",
  "osc-01-introduction": "第 1 章 导论",
  "osc-02-os-structures": "第 2 章 操作系统结构",
  "osc-03-processes": "第 3 章 进程",
  "osc-04-threads-concurrency": "第 4 章 线程与并发",
  "osc-05-cpu-scheduling": "第 5 章 CPU 调度",
  "osc-06-synchronization-tools": "第 6 章 同步工具",
  "osc-07-synchronization-examples": "第 7 章 同步案例",
  "osc-08-deadlocks": "第 8 章 死锁",
  "osc-09-main-memory": "第 9 章 内存",
  "osc-10-virtual-memory": "第 10 章 虚拟内存",
  "osc-11-mass-storage": "第 11 章 大容量存储",
  "osc-12-io-systems": "第 12 章 I/O 系统",
  "osc-13-file-system-interface": "第 13 章 文件系统接口",
  "osc-14-file-system-implementation": "第 14 章 文件系统实现",
  "osc-15-file-system-internals": "第 15 章 文件系统内部细节",
  "osc-16-security": "第 16 章 安全",
  "osc-17-protection": "第 17 章 保护",
  "osc-18-virtual-machines": "第 18 章 虚拟机",
  "osc-19-network-distributed": "第 19 章 网络与分布式系统",
  "osc-20-linux": "第 20 章 Linux",
  "osc-21-windows-10": "第 21 章 Windows 10",
  "osc-official-final-review": "《操作系统概念（原书第10版）》全书总复习",
  "wj-official-learning-map": "《逐梦旅程》权威学习地图",
  "wj-01-game-development-landscape": "第1章 高瞻远瞩——游戏开发面面观",
  "wj-02-visual-studio":
    "第2章 开锋你的绝世名刃—— Visual Studio开发环境的安装、配置",
  "wj-03-windows-programming": "第3章 启程——Windows编程基础",
  "wj-04-gdi-foundations": "第4章 入门心法——Windows游戏图形基础",
  "wj-05-gdi-drawing": "第5章 遮羞的艺术——Windows游戏绘图技巧",
  "wj-06-windows-animation": "第6章 光与影的交汇——Windows游戏动画技术",
  "wj-07-input-messages": "第7章 做游戏的主人——Windows游戏输入消息处理",
  "wj-08-physics-particles": "第8章 玄妙的物理——物理建模与粒子系统初步",
  "wj-09-turn-based-game": "第9章 梦的初现——开发回合制游戏《勇者斗恶龙》",
  "wj-10-directx-overview": "第10章 快到碗里来——DirectX大局观认知",
  "wj-11-direct3d-foundations": "第11章 三维内功心法——Direct3D编程基础",
  "wj-12-direct3d-drawing": "第12章 腾飞前的助跑——Direct3D 绘制基础",
  "wj-13-four-transforms": "第13章 迈向三维世界——Direct3D 的四大变换",
  "wj-14-lighting-materials": "第14章 绘制出质感的世界—光照与材质",
  "wj-15-directinput": "第15章 做游戏的主人——输出控制利器DirectInput",
  "wj-16-texture-mapping": "第16章 起舞不落幕——与纹理映射的华丽邂逅",
  "wj-17-mesh-loading": "第17章 他山之石可攻玉——三维游戏模型的载入",
  "wj-18-alpha-blending": "第18章 水乳交融的艺术——Alpha混合技术",
  "wj-19-depth-z-buffer": "第19章 横看成岭侧成峰——深度测试与Z缓存",
  "wj-20-stencil-techniques": "第20章 虚实结合的光影——模板技术",
  "wj-21-game-camera": "第21章 翱翔于三维空间——游戏摄像机的构建",
  "wj-22-terrain": "第22章 钟灵毓秀的世界——三维地形的构建",
  "wj-23-skybox": "第23章 向碧蓝的苍穹致敬——三维天空的构建",
  "wj-24-particle-system": "第24章 让唯美的雪花飘扬——三维粒子系统的实现",
  "wj-25-multi-model-loading": "第25章 造物主的降临——多游戏模型的载入",
  "wj-26-game-engines": "第26章 站在巨人肩膀上——游戏引擎技术导论",
  "wj-appendix-a-reading-guide": "附录A 进阶游戏编程书籍总结与推荐",
  "wj-official-final-review": "《逐梦旅程》全书总复习",
  "lop-official-learning-map":
    "《Linux操作系统实战（Ubuntu）（慕课版）》权威学习地图",
  "lop-01-recognizing-linux": "第1章 认识 Linux 操作系统",
  "lop-02-using-linux": "第2章 Linux 操作系统的使用",
  "lop-03-user-management": "第3章 Linux 用户管理",
  "lop-04-software-management": "第4章 Linux 软件管理",
  "lop-05-programming-environment": "第5章 Linux 编程环境",
  "lop-06-network-configuration": "第6章 Linux 网络配置",
  "lop-07-shell-programming": "第7章 Shell 编程",
  "lop-08-regular-expressions": "第8章 正则表达式",
  "lop-09-tetris-project": "第9章 项目实战：俄罗斯方块游戏",
  "lop-official-final-review":
    "《Linux操作系统实战（Ubuntu）（慕课版）》全书总复习",
  "mfc-official-learning-map": "《深入浅出MFC（第二版）》权威学习地图",
  "mfc-00-reading-guide": "第0章 你一定要知道（导读）",
  "mfc-01-win32-program-concepts": "第1章 Win32程序基本概念",
  "mfc-02-cpp-essential-properties": "第2章 C++的重要性质",
  "mfc-03-six-key-techniques-simulation": "第3章 MFC六大关键技术之仿真",
  "mfc-04-visual-cpp-ide": "第4章 Visual C++集成开发环境",
  "mfc-05-application-framework-overview": "第5章 总观Application Framework",
  "mfc-06-program-lifecycle": "第6章 MFC程序的生死因果",
  "mfc-07-framework-skeleton": "第7章 简单而完整：MFC骨干程序",
  "mfc-08-document-view": "第8章 Document-View深入探讨",
  "mfc-09-message-map-command-routing": "第9章 消息映射与命令传递",
  "mfc-10-dialogs": "第10章 MFC与对话盒",
  "mfc-11-view-and-redraw": "第11章 View功能的加强与重绘效率的提高",
  "mfc-12-print-preview": "第12章 打印与预览",
  "mfc-13-multiple-documents-views": "第13章 多重文件与多重显示",
  "mfc-14-multithreading": "第14章 MFC多线程程序设计",
  "mfc-15-custom-appwizard": "第15章 定制一个AppWizard",
  "mfc-16-components-activex":
    "第16章 站上众人的肩膀——使用Components&activeX Controls",
  "mfc-appendix-a-learning-roadmap":
    "附录A 无责任书评：从摇篮到坟墓Windows的完全学习",
  "mfc-appendix-b-scribble-step5-source": "附录B Scribble Step 5完整原始码",
  "mfc-appendix-c-sample-catalog": "附录C Visual C++5.0MFC范例程序一览",
  "mfc-appendix-d-dbwin": "附录D 以MFC重建DBWIN",
  "mfc-official-final-review": "《深入浅出MFC（第二版）》全书总复习",
  "wkp-official-learning-map": "《Windows内核编程》权威学习地图",
  "wkp-01-windows-internals-overview": "第1章 Windows内部概览",
  "wkp-02-getting-started-kernel-development": "第2章 开始内核开发",
  "wkp-03-kernel-programming-basics": "第3章 内核程序设计基础",
  "wkp-04-driver-start-to-finish": "第4章 驱动程序：从头到尾",
  "wkp-05-debugging": "第5章 调试",
  "wkp-06-kernel-mechanisms": "第6章 内核机制",
  "wkp-07-io-request-packet": "第7章 I/O请求包",
  "wkp-08-process-thread-notifications": "第8章 进程和线程通知",
  "wkp-09-object-registry-notifications": "第9章 对象和注册表通知",
  "wkp-10-file-system-minifilters": "第10章 文件系统小过滤驱动",
  "wkp-11-miscellaneous-topics": "第11章 其他主题",
  "wkp-official-final-review": "《Windows内核编程》全书总复习",
  "lke-official-learning-map": "《Linux内核精髓》权威学习地图",
  "lke-01-kernel-intro": "第1章 内核入门",
  "lke-02-resource-management": "第2章 资源管理",
  "lke-03-filesystems": "第3章 文件系统",
  "lke-04-networking": "第4章 网络",
  "lke-05-virtualization": "第5章 虚拟化",
  "lke-06-power-saving": "第6章 省电",
  "lke-07-debugging": "第7章 调试",
  "lke-08-profiling-tracing": "第8章 概要分析与追踪",
  "lke-official-final-review": "《Linux内核精髓》全书总复习",
  "lkd-official-learning-map":
    "《Linux内核设计与实现（原书第3版）》权威学习地图",
  "lkd-01-linux-kernel-intro": "第1章 Linux内核简介",
  "lkd-02-getting-started": "第2章 从内核出发",
  "lkd-03-process-management": "第3章 进程管理",
  "lkd-04-process-scheduling": "第4章 进程调度",
  "lkd-05-system-calls": "第5章 系统调用",
  "lkd-06-kernel-data-structures": "第6章 内核数据结构",
  "lkd-07-interrupts": "第7章 中断和中断处理",
  "lkd-08-bottom-halves": "第8章 下半部和推后执行的工作",
  "lkd-09-sync-intro": "第9章 内核同步介绍",
  "lkd-10-sync-methods": "第10章 内核同步方法",
  "lkd-11-timers-time": "第11章 定时器和时间管理",
  "lkd-12-memory-management": "第12章 内存管理",
  "lkd-13-vfs": "第13章 虚拟文件系统",
  "lkd-14-block-io": "第14章 块I/O层",
  "lkd-15-process-address-space": "第15章 进程地址空间",
  "lkd-16-page-cache-writeback": "第16章 页高速缓存和页回写",
  "lkd-17-devices-modules": "第17章 设备与模块",
  "lkd-18-debugging": "第18章 调试",
  "lkd-19-portability": "第19章 可移植性",
  "lkd-20-patches-community": "第20章 补丁、开发和社区",
  "lkd-official-final-review": "《Linux内核设计与实现（原书第3版）》全书总复习",
  "uap-official-learning-map": "《UNIX环境高级编程（第3版）》权威学习地图",
  "uap-unix-basics": "第1章 UNIX基础知识",
  "uap-standards-implementations": "第2章 UNIX标准及实现",
  "uap-file-io": "第3章 文件I/O",
  "uap-files-directories": "第4章 文件和目录",
  "uap-standard-io": "第5章 标准I/O库",
  "uap-system-data-information": "第6章 系统数据文件和信息",
  "uap-process-environment": "第7章 进程环境",
  "uap-process-control": "第8章 进程控制",
  "uap-process-relationships": "第9章 进程关系",
  "uap-signals": "第10章 信号",
  "uap-threads": "第11章 线程",
  "uap-thread-control": "第12章 线程控制",
  "uap-daemon-processes": "第13章 守护进程",
  "uap-advanced-io": "第14章 高级I/O",
  "uap-interprocess-communication": "第15章 进程间通信",
  "uap-network-ipc-sockets": "第16章 网络IPC：套接字",
  "uap-advanced-ipc": "第17章 高级进程间通信",
  "uap-terminal-io": "第18章 终端I/O",
  "uap-pseudo-terminals": "第19章 伪终端",
  "uap-database-library": "第20章 数据库函数库",
  "uap-network-printer": "第21章 与网络打印机通信",
  "uap-appendix-a-function-prototypes": "附录A 函数原型",
  "uap-appendix-b-source-code": "附录B 其他源代码",
  "uap-appendix-c-exercise-solutions": "附录C 部分习题答案",
  "uap-official-final-review": "《UNIX环境高级编程（第3版）》全书总复习",
  "hfj-3e-official-learning-map": "《Head First Java（第3版）》权威学习地图",
  "hfj-3e-intro": "使用说明：让大脑真正学会 Java",
  "hfj-3e-01-breaking-surface": "第1章 破开水面：快速潜入",
  "hfj-3e-02-classes-objects": "第2章 对象村之旅：类与对象",
  "hfj-3e-03-primitives-references": "第3章 认清变量：基本类型与引用",
  "hfj-3e-04-methods-instance-variables":
    "第4章 对象如何行动：方法使用实例变量",
  "hfj-3e-05-writing-program": "第5章 强力方法：编写完整程序",
  "hfj-3e-06-java-api": "第6章 使用 Java 类库：认识 API",
  "hfj-3e-07-inheritance-polymorphism": "第7章 对象村的更好生活：继承与多态",
  "hfj-3e-08-interfaces-abstract-classes": "第8章 严肃多态：接口与抽象类",
  "hfj-3e-09-constructors-gc": "第9章 对象的生与死：构造器与垃圾回收",
  "hfj-3e-10-numbers-statics": "第10章 数字很重要：数字与静态成员",
  "hfj-3e-11-collections-generics": "第11章 数据结构：集合与泛型",
  "hfj-3e-12-lambdas-streams": "第12章 Lambda 与 Stream：说做什么，不说怎么做",
  "hfj-3e-13-exceptions": "第13章 风险行为：异常处理",
  "hfj-3e-14-gui": "第14章 图形故事：进入 GUI",
  "hfj-3e-15-swing": "第15章 练好 Swing：使用 Swing",
  "hfj-3e-16-serialization-io": "第16章 保存对象与文本：序列化和文件 I/O",
  "hfj-3e-17-networking-threads": "第17章 建立连接：网络与线程",
  "hfj-3e-18-concurrency-issues": "第18章 处理并发问题：竞态与不可变数据",
  "hfj-3e-appendix-a-final-code-kitchen": "附录A 最终代码厨房",
  "hfj-3e-appendix-b-top-ten-topics": "附录B 未进入正文的十大左右主题",
  "hfj-3e-official-final-review": "《Head First Java（第3版）》全书总复习",
  "jct-14e-official-learning-map":
    "《Java核心技术（第14版·全两卷）》权威学习地图",
  "jct-14e-v1-01-introduction-java": "卷I 第1章 Java 概述",
  "jct-14e-v1-02-programming-environment": "卷I 第2章 Java 编程环境",
  "jct-14e-v1-03-fundamental-structures": "卷I 第3章 Java 基本程序结构",
  "jct-14e-v1-04-objects-classes": "卷I 第4章 对象与类",
  "jct-14e-v1-05-inheritance": "卷I 第5章 继承",
  "jct-14e-v1-06-interfaces-lambdas-inner": "卷I 第6章 接口、Lambda 与内部类",
  "jct-14e-v1-07-exceptions-assertions-logging": "卷I 第7章 异常、断言与日志",
  "jct-14e-v1-08-generic-programming": "卷I 第8章 泛型程序设计",
  "jct-14e-v1-09-collections": "卷I 第9章 集合",
  "jct-14e-v1-10-concurrency": "卷I 第10章 并发",
  "jct-14e-v1-11-annotations": "卷I 第11章 注解",
  "jct-14e-v1-12-modules": "卷I 第12章 Java 平台模块系统",
  "jct-14e-v2-01-streams": "卷II 第1章 Stream",
  "jct-14e-v2-02-input-output": "卷II 第2章 输入与输出",
  "jct-14e-v2-03-xml": "卷II 第3章 XML",
  "jct-14e-v2-04-networking": "卷II 第4章 网络",
  "jct-14e-v2-05-database": "卷II 第5章 数据库编程",
  "jct-14e-v2-06-date-time": "卷II 第6章 日期与时间 API",
  "jct-14e-v2-07-internationalization": "卷II 第7章 国际化",
  "jct-14e-v2-08-compiling-scripting": "卷II 第8章 编译与脚本",
  "jct-14e-v2-09-security": "卷II 第9章 安全",
  "jct-14e-v2-10-gui-programming": "卷II 第10章 图形用户界面编程",
  "jct-14e-v2-11-swing-components": "卷II 第11章 Swing 用户界面组件",
  "jct-14e-v2-12-advanced-swing-graphics": "卷II 第12章 高级 Swing 与图形",
  "jct-14e-v2-13-foreign-functions-memory": "卷II 第13章 外部函数与内存 API",
  "jct-14e-official-final-review":
    "《Java核心技术（第14版·全两卷）》全书总复习",
  "ejv-3e-official-learning-map": "《Effective Java（第3版）》权威学习地图",
  "ejv-3e-01-introduction": "第1章 导言",
  "ejv-3e-02-creating-destroying-objects": "第2章 创建和销毁对象",
  "ejv-3e-03-common-object-methods": "第3章 所有对象都通用的方法",
  "ejv-3e-04-classes-interfaces": "第4章 类和接口",
  "ejv-3e-05-generics": "第5章 泛型",
  "ejv-3e-06-enums-annotations": "第6章 枚举和注解",
  "ejv-3e-07-lambdas-streams": "第7章 Lambda 和 Stream",
  "ejv-3e-08-methods": "第8章 方法",
  "ejv-3e-09-general-programming": "第9章 通用程序设计",
  "ejv-3e-10-exceptions": "第10章 异常",
  "ejv-3e-11-concurrency": "第11章 并发",
  "ejv-3e-12-serialization": "第12章 序列化",
  "ejv-3e-second-edition-crosswalk": "第二版条目对照",
  "ejv-3e-references": "参考文献",
  "ejv-3e-index": "索引",
  "ejv-3e-official-final-review": "《Effective Java（第3版）》全书总复习",
  "sia-learning-map": "全书学习地图",
  "sia-spring-core": "Spring核心与IoC",
  "sia-bean-wiring": "Bean装配",
  "sia-aop": "面向切面编程",
  "sia-spring-mvc": "Spring MVC",
  "sia-data-jpa": "数据访问与JPA",
  "sia-spring-security": "Spring Security",
  "sia-spring-boot": "Spring Boot",
  "sia-spring-cloud": "Spring Cloud微服务",
  "sia-final-review": "全书复习",
  "sia-6e-official-learning-map": "《Spring in Action（第6版）》权威学习地图",
  "sia-6e-part-1-foundational-spring": "Part 1 基础Spring",
  "sia-6e-01-getting-started": "第1章 Spring起步",
  "sia-6e-02-developing-web-applications": "第2章 开发Web应用",
  "sia-6e-03-working-with-data": "第3章 使用关系数据",
  "sia-6e-04-nonrelational-data": "第4章 使用非关系数据",
  "sia-6e-05-securing-spring": "第5章 保护Spring应用",
  "sia-6e-06-configuration-properties": "第6章 使用配置属性",
  "sia-6e-part-2-integrated-spring": "Part 2 集成Spring",
  "sia-6e-07-creating-rest-services": "第7章 创建REST服务",
  "sia-6e-08-securing-rest": "第8章 保护REST API",
  "sia-6e-09-asynchronous-messaging": "第9章 异步消息",
  "sia-6e-10-integrating-spring": "第10章 Spring Integration",
  "sia-6e-part-3-reactive-spring": "Part 3 响应式Spring",
  "sia-6e-11-introducing-reactor": "第11章 Reactor入门",
  "sia-6e-12-reactive-apis": "第12章 开发响应式API",
  "sia-6e-13-reactive-persistence": "第13章 响应式持久化",
  "sia-6e-14-working-with-rsocket": "第14章 使用RSocket",
  "sia-6e-part-4-deployed-spring": "Part 4 部署Spring",
  "sia-6e-15-spring-boot-actuator": "第15章 Spring Boot Actuator",
  "sia-6e-16-administering-spring": "第16章 管理Spring应用",
  "sia-6e-17-monitoring-with-jmx": "第17章 使用JMX监控Spring",
  "sia-6e-18-deploying-spring": "第18章 部署Spring",
  "sia-6e-appendix-bootstrapping": "附录A 启动Spring应用",
  "sia-6e-official-final-review": "《Spring in Action（第6版）》全书总复习",
  "jvt-2e-official-learning-map":
    "《Troubleshooting Java（第2版）》权威学习地图",
  "jvt-2e-part-1-foundation": "Part 1 重访代码调查基础",
  "jvt-2e-01-starting-to-know-apps": "第1章 开始认识应用",
  "jvt-2e-02-debugging-techniques": "第2章 用调试技术理解应用逻辑",
  "jvt-2e-03-advanced-debugging": "第3章 用高级调试技术寻找根因",
  "jvt-2e-04-logs-auditing": "第4章 用日志审计应用行为",
  "jvt-2e-part-2-deep-diagnosing": "Part 2 深入诊断应用执行",
  "jvt-2e-05-resource-profiling": "第5章 用剖析识别资源消耗问题",
  "jvt-2e-06-hidden-profiling": "第6章 用剖析发现隐藏问题",
  "jvt-2e-07-thread-locks": "第7章 调查多线程架构中的锁",
  "jvt-2e-08-deadlocks-thread-dumps": "第8章 用线程转储调查死锁",
  "jvt-2e-part-3-memory": "Part 3 诊断内存相关问题",
  "jvt-2e-09-memory-profiling": "第9章 剖析内存相关问题",
  "jvt-2e-10-heap-dumps": "第10章 用堆转储调查内存问题",
  "jvt-2e-11-gc-logs": "第11章 用GC日志分析潜在JVM问题",
  "jvt-2e-part-4-large-systems": "Part 4 在大型系统中寻找问题",
  "jvt-2e-12-system-failures": "第12章 揭示系统级与服务通信故障",
  "jvt-2e-13-consistency-transactions": "第13章 测量数据一致性与事务",
  "jvt-2e-appendices": "附录总览",
  "jvt-2e-appendix-a-tools": "附录A 所需工具",
  "jvt-2e-appendix-b-opening-project": "附录B 打开项目",
  "jvt-2e-appendix-c-reading": "附录C 延伸阅读",
  "jvt-2e-appendix-d-threads": "附录D 理解Java线程",
  "jvt-2e-appendix-e-memory": "附录E Java应用内存管理",
  "jvt-2e-appendix-f-references": "附录F 参考资料",
  "jvt-2e-official-final-review": "《Troubleshooting Java（第2版）》全书总复习",
  "jvt-learning-map": "全书学习地图",
  "jvt-jvm-architecture": "JVM架构与类加载",
  "jvt-memory-model": "JVM内存模型",
  "jvt-garbage-collection": "垃圾回收机制",
  "jvt-gc-tuning": "GC调优实践",
  "jvt-jvm-tools": "JVM诊断工具",
  "jvt-thread-analysis": "线程分析与死锁",
  "jvt-memory-leak": "内存泄漏排查",
  "jvt-cpu-performance": "CPU性能分析",
  "jvt-final-review": "全书复习",
  "duj3-official-learning-map": "《深入理解Java虚拟机（第3版）》权威学习地图",
  "duj3-part-1-approaching-java": "第一部分 走近Java",
  "duj3-01-approaching-java": "第1章 走近Java",
  "duj3-part-2-memory-management": "第二部分 自动内存管理",
  "duj3-02-memory-areas": "第2章 Java内存区域与内存溢出异常",
  "duj3-03-gc-allocation": "第3章 垃圾收集器与内存分配策略",
  "duj3-04-monitoring-tools": "第4章 虚拟机性能监控、故障处理工具",
  "duj3-05-tuning-cases": "第5章 调优案例分析与实战",
  "duj3-part-3-execution-subsystem": "第三部分 虚拟机执行子系统",
  "duj3-06-class-file": "第6章 类文件结构",
  "duj3-07-class-loading": "第7章 虚拟机类加载机制",
  "duj3-08-bytecode-engine": "第8章 虚拟机字节码执行引擎",
  "duj3-09-loading-execution-cases": "第9章 类加载及执行子系统的案例与实战",
  "duj3-part-4-compilation": "第四部分 程序编译与代码优化",
  "duj3-10-frontend-compiler": "第10章 前端编译与优化",
  "duj3-11-backend-compiler": "第11章 后端编译与优化",
  "duj3-part-5-concurrency": "第五部分 高效并发",
  "duj3-12-memory-model-threads": "第12章 Java内存模型与线程",
  "duj3-13-thread-safety-locks": "第13章 线程安全与锁优化",
  "duj3-appendix-a-build-openjdk6": "附录A 在Windows系统下编译OpenJDK 6",
  "duj3-appendix-b-java-future-2013": "附录B 展望Java技术的未来（2013年版）",
  "duj3-appendix-c-bytecode-table": "附录C 虚拟机字节码指令表",
  "duj3-appendix-d-oql": "附录D 对象查询语言（OQL）简介",
  "duj3-appendix-e-jdk-history": "附录E JDK历史版本轨迹",
  "duj3-official-final-review": "《深入理解Java虚拟机（第3版）》全书总复习",
  "duj-learning-map": "全书学习地图",
  "duj-memory-region": "JVM内存区域",
  "duj-gc-algorithms": "垃圾收集器与算法",
  "duj-class-loader": "类加载机制",
  "duj-execution-engine": "执行引擎",
  "duj-compile-optimize": "编译优化与逃逸分析",
  "duj-memory-model": "Java内存模型与线程",
  "duj-lock-optimize": "锁优化",
  "duj-practice-tuning": "实战调优",
  "duj-final-review": "全书复习",
  "jg1b-official-learning-map": "《JVM G1源码分析和调优》权威学习地图",
  "jg1b-01-gc-overview": "第1章 垃圾回收概述",
  "jg1b-02-g1-basics": "第2章 G1的基本概念",
  "jg1b-03-object-allocation": "第3章 G1的对象分配",
  "jg1b-04-refine-thread": "第4章 G1的Refine线程",
  "jg1b-05-young-gc": "第5章 新生代回收",
  "jg1b-06-mixed-gc": "第6章 混合回收",
  "jg1b-07-full-gc": "第7章 Full GC",
  "jg1b-08-reference-processing": "第8章 G1中的引用处理",
  "jg1b-09-string-dedup": "第9章 G1的新特性：字符串去重",
  "jg1b-10-safepoints": "第10章 线程中的安全点",
  "jg1b-11-collector-choice": "第11章 垃圾回收器的选择",
  "jg1b-12-next-collectors": "第12章 新一代垃圾回收器",
  "jg1b-appendix-a-debug-jvm": "附录A 编译调试JVM",
  "jg1b-appendix-b-nmt": "附录B 本地内存跟踪",
  "jg1b-appendix-c-cpp": "附录C 阅读JVM需要了解的C++知识",
  "jg1b-official-final-review": "《JVM G1源码分析和调优》全书总复习",
  "jg1-learning-map": "全书学习地图",
  "jg1-g1-overview": "G1收集器概述",
  "jg1-region-management": "Region管理与内存布局",
  "jg1-remembered-set": "RSet与卡表",
  "jg1-gc-cycle": "G1 GC周期",
  "jg1-young-gc": "Young GC源码分析",
  "jg1-mixed-gc": "Mixed GC源码分析",
  "jg1-full-gc": "Full GC与退化",
  "jg1-g1-tuning-practice": "G1调优实践",
  "jg1-final-review": "全书复习",
  "gch1-official-learning-map": "《垃圾回收算法手册》权威学习地图",
  "gch1-01-introduction": "第1章 引言",
  "gch1-02-mark-sweep": "第2章 标记-清扫垃圾回收",
  "gch1-03-mark-compact": "第3章 标记-整理垃圾回收",
  "gch1-04-copying": "第4章 复制式垃圾回收",
  "gch1-05-reference-counting": "第5章 引用计数",
  "gch1-06-comparing-collectors": "第6章 比较垃圾回收器",
  "gch1-07-allocation": "第7章 分配",
  "gch1-08-partitioning": "第8章 堆分区",
  "gch1-09-generational": "第9章 分代垃圾回收",
  "gch1-10-other-partitioned": "第10章 其他分区方案",
  "gch1-11-runtime-interface": "第11章 运行时接口",
  "gch1-12-language-concerns": "第12章 语言特定问题",
  "gch1-13-concurrency-preliminaries": "第13章 并发基础",
  "gch1-14-parallel": "第14章 并行垃圾回收",
  "gch1-15-concurrent": "第15章 并发垃圾回收",
  "gch1-16-concurrent-mark-sweep": "第16章 并发标记-清扫",
  "gch1-17-concurrent-copy-compact": "第17章 并发复制与整理",
  "gch1-18-concurrent-reference-counting": "第18章 并发引用计数",
  "gch1-19-realtime": "第19章 实时垃圾回收",
  "gch1-glossary": "术语表",
  "gch1-bibliography": "参考文献",
  "gch1-index": "索引",
  "gch1-official-final-review": "《垃圾回收算法手册》全书总复习",
  "gch-learning-map": "全书学习地图",
  "gch-gc-overview": "GC概述与历史",
  "gch-mark-sweep": "标记-清除算法",
  "gch-copying-collection": "复制式回收",
  "gch-mark-compact": "标记-压缩算法",
  "gch-generational": "分代回收",
  "gch-concurrent-gc": "并发回收",
  "gch-realtime-gc": "实时GC",
  "gch-modern-gc": "现代GC对比",
  "gch-final-review": "全书复习",
  "bnr4-official-learning-map":
    "《Android Programming: The Big Nerd Ranch Guide（第4版）》权威学习地图",
  "bnr4-01-first-app": "第1章 Your First Android Application",
  "bnr4-02-android-mvc": "第2章 Android and Model-View-Controller",
  "bnr4-03-activity-lifecycle": "第3章 The Activity Lifecycle",
  "bnr4-04-ui-state-persistence": "第4章 Persisting UI State",
  "bnr4-05-debugging": "第5章 Debugging Android Apps",
  "bnr4-06-second-activity": "第6章 Your Second Activity",
  "bnr4-07-sdk-compatibility": "第7章 Android SDK Versions and Compatibility",
  "bnr4-08-ui-fragments": "第8章 UI Fragments and the Fragment Manager",
  "bnr4-09-recyclerview": "第9章 Displaying Lists with RecyclerView",
  "bnr4-10-layouts-widgets":
    "第10章 Creating User Interfaces with Layouts and Widgets",
  "bnr4-11-room-database": "第11章 Databases and the Room Library",
  "bnr4-12-fragment-navigation": "第12章 Fragment Navigation",
  "bnr4-13-dialogs": "第13章 Dialogs",
  "bnr4-14-app-bar": "第14章 The App Bar",
  "bnr4-15-implicit-intents": "第15章 Implicit Intents",
  "bnr4-16-taking-pictures": "第16章 Taking Pictures with Intents",
  "bnr4-17-localization": "第17章 Localization",
  "bnr4-18-accessibility": "第18章 Accessibility",
  "bnr4-19-data-binding-mvvm": "第19章 Data Binding and MVVM",
  "bnr4-20-audio-unit-testing": "第20章 Unit Testing and Audio Playback",
  "bnr4-21-styles-themes": "第21章 Styles and Themes",
  "bnr4-22-xml-drawables": "第22章 XML Drawables",
  "bnr4-23-more-intents-tasks": "第23章 More About Intents and Tasks",
  "bnr4-24-http-background": "第24章 HTTP and Background Tasks",
  "bnr4-25-looper-handler": "第25章 Loopers, Handlers, and HandlerThread",
  "bnr4-26-search": "第26章 SearchView and SharedPreferences",
  "bnr4-27-workmanager": "第27章 WorkManager",
  "bnr4-28-broadcast-intents": "第28章 Broadcast Intents",
  "bnr4-29-webview": "第29章 Browsing the Web and WebView",
  "bnr4-30-custom-views-touch": "第30章 Custom Views and Touch Events",
  "bnr4-31-property-animation": "第31章 Property Animation",
  "bnr4-32-afterword": "第32章 Afterword",
  "bnr4-official-final-review":
    "《Android Programming: The Big Nerd Ranch Guide（第4版）》全书总复习",
  "fla3-official-learning-map": "《第一行代码 Android（第3版）》权威学习地图",
  "fla3-01-first-code": "第1章 开始启程，你的第一行Android代码",
  "fla3-02-kotlin": "第2章 探究新语言，快速入门Kotlin编程",
  "fla3-03-activity": "第3章 先从看得到的入手，探究Activity",
  "fla3-04-ui": "第4章 软件也要拼脸蛋，UI开发的点点滴滴",
  "fla3-05-fragment": "第5章 手机平板要兼顾，探究Fragment",
  "fla3-06-broadcast": "第6章 全局大喇叭，详解广播机制",
  "fla3-07-persistence": "第7章 数据存储全方案，详解持久化技术",
  "fla3-08-content-provider": "第8章 跨程序共享数据，探究ContentProvider",
  "fla3-09-multimedia": "第9章 丰富你的程序，运用手机多媒体",
  "fla3-10-service": "第10章 后台默默的劳动者，探究Service",
  "fla3-11-network": "第11章 看看精彩的世界，使用网络技术",
  "fla3-12-material": "第12章 最佳的UI体验，Material Design实战",
  "fla3-13-jetpack": "第13章 高级程序开发组件，探究Jetpack",
  "fla3-14-advanced": "第14章 继续进阶，你还应该掌握的高级技巧",
  "fla3-15-weather-app": "第15章 进入实战，开发一个天气预报App",
  "fla3-16-permissionx": "第16章 编写并发布一个开源库，PermissionX",
  "fla3-official-final-review": "《第一行代码 Android（第3版）》全书总复习",
  "fla-learning-map": "全书学习地图",
  "fla-android-basics": "Android入门",
  "fla-ui-layout": "UI布局与控件",
  "fla-activity": "Activity与Fragment",
  "fla-data-storage": "数据存储",
  "fla-broadcast": "广播机制",
  "fla-service": "服务与通知",
  "fla-network": "网络编程",
  "fla-advanced-features": "高级特性（Material Design/Jetpack）",
  "fla-final-review": "全书复习",
  "cra4-official-learning-map": "《疯狂Android讲义（第4版）》权威学习地图",
  "cra4-01-environment": "第1章 Android应用和开发环境",
  "cra4-02-ui-programming": "第2章 Android应用的界面编程",
  "cra4-03-event-mechanism": "第3章 Android事件机制",
  "cra4-04-activity-fragment": "第4章 深入理解Activity与Fragment",
  "cra4-05-intent-filter": "第5章 使用Intent和IntentFilter通信",
  "cra4-06-application-resources": "第6章 Android应用资源",
  "cra4-07-graphics-images": "第7章 图形与图像处理",
  "cra4-08-storage-io": "第8章 Android数据存储与IO",
  "cra4-09-content-provider": "第9章 使用ContentProvider实现数据共享",
  "cra4-10-service-broadcast": "第10章 Service和BroadcastReceiver",
  "cra4-11-multimedia": "第11章 多媒体应用开发",
  "cra4-12-opengl-3d": "第12章 OpenGL与3D开发",
  "cra4-13-network": "第13章 Android网络应用",
  "cra4-14-system-desktop": "第14章 管理Android系统桌面",
  "cra4-15-sensors": "第15章 传感器应用开发",
  "cra4-16-gps": "第16章 GPS应用开发",
  "cra4-17-amap": "第17章 整合高德Map服务",
  "cra4-18-metal-slug": "第18章 合金弹头",
  "cra4-19-auction-system": "第19章 电子拍卖系统",
  "cra4-official-final-review": "《疯狂Android讲义（第4版）》全书总复习",
  "cra-learning-map": "全书学习地图",
  "cra-android-quickstart": "Android快速入门",
  "cra-ui-components": "UI组件与布局",
  "cra-event-handling": "事件处理",
  "cra-advanced-ui": "高级UI（对话框/菜单/滚动）",
  "cra-data-persistence": "数据持久化",
  "cra-service-broadcast": "Service与Broadcast",
  "cra-multimedia": "多媒体与图形",
  "cra-web-network": "Web与网络通信",
  "cra-final-review": "全书复习",
  "kdg1-official-learning-map": "《Kotlin编程权威指南》权威学习地图",
  "kdg1-introducing-kotlin": "Kotlin导论",
  "kdg1-01-first-application": "1. Your First Kotlin Application",
  "kdg1-02-variables-types": "2. Variables, Constants, and Types",
  "kdg1-03-conditionals": "3. Conditionals",
  "kdg1-04-functions": "4. Functions",
  "kdg1-05-anonymous-functions": "5. Anonymous Functions and the Function Type",
  "kdg1-06-null-safety-exceptions": "6. Null Safety and Exceptions",
  "kdg1-07-strings": "7. Strings",
  "kdg1-08-numbers": "8. Numbers",
  "kdg1-09-standard-functions": "9. Standard Functions",
  "kdg1-10-lists-sets": "10. Lists and Sets",
  "kdg1-11-maps": "11. Maps",
  "kdg1-12-defining-classes": "12. Defining Classes",
  "kdg1-13-initialization": "13. Initialization",
  "kdg1-14-inheritance": "14. Inheritance",
  "kdg1-15-objects": "15. Objects",
  "kdg1-16-interfaces-abstract-classes": "16. Interfaces and Abstract Classes",
  "kdg1-17-generics": "17. Generics",
  "kdg1-18-extensions": "18. Extensions",
  "kdg1-19-functional-programming": "19. Functional Programming Basics",
  "kdg1-20-java-interoperability": "20. Java Interoperability",
  "kdg1-21-first-android-application":
    "21. Building Your First Android Application with Kotlin",
  "kdg1-22-coroutines-introduction": "22. Introduction to Coroutines",
  "kdg1-23-afterword": "23. Afterword",
  "kdg1-appendix-a-more-challenges": "附录A 补充挑战练习",
  "kdg1-glossary": "术语表",
  "kdg1-index": "索引",
  "kdg1-official-final-review": "《Kotlin编程权威指南》全书总复习",
  "adae15-official-learning-map": "《Android开发艺术探索》权威学习地图",
  "adae15-01-activity-lifecycle-launch-mode":
    "第1章 Activity的生命周期和启动模式",
  "adae15-02-ipc": "第2章 IPC机制",
  "adae15-03-view-event-system": "第3章 View的事件体系",
  "adae15-04-view-working-principles": "第4章 View的工作原理",
  "adae15-05-remoteviews": "第5章 理解RemoteViews",
  "adae15-06-drawable": "第6章 Android的Drawable",
  "adae15-07-animation": "第7章 Android动画深入分析",
  "adae15-08-window-windowmanager": "第8章 理解Window和WindowManager",
  "adae15-09-four-components": "第9章 四大组件的工作过程",
  "adae15-10-message-mechanism": "第10章 Android的消息机制",
  "adae15-11-threads-pools": "第11章 Android的线程和线程池",
  "adae15-12-bitmap-cache": "第12章 Bitmap的加载和Cache",
  "adae15-13-integrated-techniques": "第13章 综合技术",
  "adae15-14-jni-ndk": "第14章 JNI和NDK编程",
  "adae15-15-performance-optimization": "第15章 Android性能优化",
  "adae15-official-final-review": "《Android开发艺术探索》全书总复习",
  "kia1-official-learning-map": "《Kotlin实战》第1版权威学习地图",
  "kia1-part1-kotlin-introduction": "第1部分 Kotlin简介",
  "kia1-01-kotlin-what-and-why": "第1章 Kotlin：定义和目的",
  "kia1-02-kotlin-basics": "第2章 Kotlin基础",
  "kia1-03-defining-calling-functions": "第3章 函数的定义与调用",
  "kia1-04-classes-objects-interfaces": "第4章 类、对象和接口",
  "kia1-05-programming-with-lambdas": "第5章 Lambda编程",
  "kia1-06-kotlin-type-system": "第6章 Kotlin的类型系统",
  "kia1-part2-embracing-kotlin": "第2部分 拥抱Kotlin",
  "kia1-07-operator-overloading-conventions": "第7章 运算符重载及其他约定",
  "kia1-08-higher-order-functions": "第8章 高阶函数：Lambda作为形参和返回值",
  "kia1-09-generics": "第9章 泛型",
  "kia1-10-annotations-reflection": "第10章 注解与反射",
  "kia1-11-dsl-construction": "第11章 DSL构建",
  "kia1-appendix-a-building-projects": "附录A 构建Kotlin项目",
  "kia1-appendix-b-documenting-code": "附录B Kotlin代码的文档化",
  "kia1-appendix-c-kotlin-ecosystem": "附录C Kotlin生态系统",
  "kia1-index-figures-tables-listings": "索引与图表代码清单",
  "kia1-official-final-review": "《Kotlin实战》第1版全书总复习",
  "aca18-official-learning-map": "《Android组件化架构》权威学习地图",
  "aca18-01-component-foundations": "第1章 组件化基础",
  "aca18-02-component-programming": "第2章 组件化编程",
  "aca18-03-component-optimization": "第3章 组件化优化",
  "aca18-04-component-compilation": "第4章 组件化编译",
  "aca18-05-component-distribution": "第5章 组件化分发",
  "aca18-06-component-circulation": "第6章 组件化流通",
  "aca18-07-architecture-templates": "第7章 架构模板",
  "aca18-08-architecture-evolution": "第8章 架构演化",
  "aca18-appendix-a-thinking-architecture": "附录A 思维与架构",
  "aca18-official-final-review": "《Android组件化架构》全书总复习",
  "apo12-official-learning-map": "《Android应用性能优化》权威学习地图",
  "apo12-01-optimizing-java-code": "第1章 Java代码优化",
  "apo12-02-getting-started-ndk": "第2章 NDK入门",
  "apo12-03-advanced-ndk": "第3章 NDK进阶",
  "apo12-04-using-memory-efficiently": "第4章 高效使用内存",
  "apo12-05-multithreading-synchronization": "第5章 多线程和同步",
  "apo12-06-benchmarking-profiling": "第6章 性能评测和剖析",
  "apo12-07-maximizing-battery-life": "第7章 延长电池续航时间",
  "apo12-08-graphics": "第8章 图形",
  "apo12-09-renderscript": "第9章 RenderScript",
  "apo12-official-final-review": "《Android应用性能优化》全书总复习",
  "jpc-22-official-learning-map": "《Jetpack Compose从入门到实战》权威学习地图",
  "jpc-22-01-new-android-ui": "第1章 全新的Android UI框架",
  "jpc-22-02-common-ui-components": "第2章 了解常用UI组件",
  "jpc-22-03-custom-ui": "第3章 定制UI视图",
  "jpc-22-04-state-recomposition": "第4章 状态管理与重组",
  "jpc-22-05-rendering-pipeline": "第5章 Compose组件渲染流程",
  "jpc-22-06-animation": "第6章 让页面动起来：动画",
  "jpc-22-07-gestures": "第7章 增进交互体验：手势处理",
  "jpc-22-08-navigation-hilt": "第8章 为Compose添加页面导航",
  "jpc-22-09-third-party": "第9章 Accompanist与第三方组件库",
  "jpc-22-10-tetris": "第10章 项目实战：小游戏Tetris",
  "jpc-22-11-chatty": "第11章 项目实战：聊天应用Chatty",
  "jpc-22-official-final-review": "《Jetpack Compose从入门到实战》全书总复习",
  "aal-17-official-learning-map": "《Android进阶之光》权威学习地图",
  "aal-17-01-android-features": "第1章 Android新特性",
  "aal-17-02-material-design": "第2章 Material Design",
  "aal-17-03-view-custom-view": "第3章 View体系与自定义View",
  "aal-17-04-multithreading": "第4章 多线程编程",
  "aal-17-05-network-frameworks": "第5章 网络编程与网络框架",
  "aal-17-06-design-patterns": "第6章 设计模式",
  "aal-17-07-event-bus": "第7章 事件总线",
  "aal-17-08-rxjava": "第8章 函数响应式编程",
  "aal-17-09-annotations-di": "第9章 注解与依赖注入框架",
  "aal-17-10-app-architecture": "第10章 应用架构设计",
  "aal-17-11-system-mediaplayer": "第11章 系统架构与MediaPlayer框架",
  "aal-17-official-final-review": "《Android进阶之光》全书总复习",
  "dak-14-official-learning-map": "《深入理解Android内核设计思想》权威学习地图",
  "dak-14-01-system-introduction": "第1章 Android系统简介",
  "dak-14-02-source-build": "第2章 Android源码下载及编译",
  "dak-14-03-build-system": "第3章 Android编译系统",
  "dak-14-04-os-foundations": "第4章 操作系统基础",
  "dak-14-05-process-thread": "第5章 Android进程/线程管理",
  "dak-14-06-binder": "第6章 进程间通信——Binder",
  "dak-14-07-boot": "第7章 Android启动过程简析",
  "dak-14-08-ams": "第8章 ActivityManagerService（AMS）",
  "dak-14-09-surfaceflinger": "第9章 GUI系统之SurfaceFlinger",
  "dak-14-10-wms": "第10章 GUI系统之窗口管理员——WMS",
  "dak-14-11-view": "第11章 GUI系统之View体系",
  "dak-14-12-input": "第12章 InputManagerService与输入事件",
  "dak-14-13-audio": "第13章 应用不再同质化——音频系统",
  "dak-14-14-intent": "第14章 Intent的匹配规则",
  "dak-14-15-resources": "第15章 APK应用程序的资源适配",
  "dak-14-16-encoding": "第16章 Android字符编码格式",
  "dak-14-17-opengl": "第17章 Android和OpenGL ES",
  "dak-14-18-systemui": "第18章 系统的UI——SystemUI",
  "dak-14-19-widget": "第19章 Android常用的小插件——Widget机制",
  "dak-14-20-apk-build": "第20章 Android应用程序的编译和打包",
  "dak-14-21-git": "第21章 软件版本管理",
  "dak-14-22-debug-tools": "第22章 系统调试辅助工具",
  "dak-14-official-final-review": "《深入理解Android内核设计思想》全书总复习",
  "dav-series-official-learning-map":
    "《深入理解Android》Framework三卷权威学习地图",
  "dav-v1-01-preparation": "卷I 第1章 阅读前的准备工作",
  "dav-v1-02-jni": "卷I 第2章 深入理解JNI",
  "dav-v1-03-init": "卷I 第3章 深入理解init",
  "dav-v1-04-zygote": "卷I 第4章 深入理解zygote",
  "dav-v1-05-common-classes": "卷I 第5章 深入理解常见类",
  "dav-v1-06-binder-native": "卷I 第6章 深入理解Binder",
  "dav-v1-07-audio-native": "卷I 第7章 深入理解Audio系统",
  "dav-v1-08-surface": "卷I 第8章 深入理解Surface系统",
  "dav-v1-09-vold-rild": "卷I 第9章 深入理解Vold和Rild",
  "dav-v1-10-media-scanner": "卷I 第10章 深入理解MediaScanner",
  "dav-v2-01-source-environment": "卷II 第1章 搭建Android源码工作环境",
  "dav-v2-02-java-binder-messagequeue":
    "卷II 第2章 深入理解Java Binder和MessageQueue",
  "dav-v2-03-system-server": "卷II 第3章 深入理解SystemServer",
  "dav-v2-04-package-manager-service":
    "卷II 第4章 深入理解PackageManagerService",
  "dav-v2-05-power-manager-service": "卷II 第5章 深入理解PowerManagerService",
  "dav-v2-06-activity-manager-service":
    "卷II 第6章 深入理解ActivityManagerService",
  "dav-v2-07-content-provider": "卷II 第7章 深入理解ContentProvider",
  "dav-v2-08-content-account-sync":
    "卷II 第8章 深入理解ContentService和AccountManagerService",
  "dav-v3-01-development-environment": "卷III 第1章 开发环境部署",
  "dav-v3-02-java-binder-messagequeue":
    "卷III 第2章 深入理解Java Binder和MessageQueue",
  "dav-v3-03-audio-service": "卷III 第3章 深入理解AudioService",
  "dav-v3-04-window-manager-service":
    "卷III 第4章 深入理解WindowManagerService",
  "dav-v3-05-input-system": "卷III 第5章 深入理解Android输入系统",
  "dav-v3-06-view-system": "卷III 第6章 深入理解控件系统",
  "dav-v3-07-system-ui": "卷III 第7章 深入理解SystemUI",
  "dav-v3-08-wallpaper": "卷III 第8章 深入理解Android壁纸",
  "dav-series-official-final-review": "《深入理解Android》Framework三卷总复习",
  "mse-official-learning-map": "第3版权威学习地图",
  "mse-ch01-database-overview": "第1章 数据库概述",
  "mse-ch02-install-configuration": "第2章 MySQL的安装与配置",
  "mse-ch03-database-operations": "第3章 数据库基本操作",
  "mse-ch04-engines-data-types": "第4章 存储引擎和数据类型",
  "mse-ch05-table-operations": "第5章 操作数据表",
  "mse-ch06-indexes": "第6章 操作索引",
  "mse-ch07-views": "第7章 操作视图",
  "mse-ch08-triggers": "第8章 操作触发器",
  "mse-ch09-data-manipulation": "第9章 数据的操作",
  "mse-ch10-single-table-query": "第10章 单表查询",
  "mse-ch11-multi-table-query": "第11章 多表查询",
  "mse-ch12-operators": "第12章 运算符",
  "mse-ch13-functions": "第13章 常用函数",
  "mse-ch14-routines": "第14章 存储过程和函数的操作",
  "mse-ch15-transactions": "第15章 事务",
  "mse-ch16-security": "第16章 MySQL安全机制",
  "mse-ch17-logs": "第17章 MySQL日志管理",
  "mse-ch18-maintenance-performance": "第18章 数据库维护和性能提高",
  "mse-ch19-java-bookstore": "第19章 Java+MySQL案例：在线书城",
  "mse-ch20-php-exam-system": "第20章 PHP+MySQL案例：智能考试系统",
  "mse-official-final-review": "第3版全书复习与项目验收",
  "sqt-official-learning-map": "第5版权威学习地图",
  "sqt-lesson01-understanding-sql": "第1课 了解SQL",
  "sqt-lesson02-retrieving-data": "第2课 检索数据",
  "sqt-lesson03-sorting-data": "第3课 排序检索数据",
  "sqt-lesson04-filtering-data": "第4课 过滤数据",
  "sqt-lesson05-advanced-filtering": "第5课 高级数据过滤",
  "sqt-lesson06-wildcards": "第6课 用通配符进行过滤",
  "sqt-lesson07-calculated-fields": "第7课 创建计算字段",
  "sqt-lesson08-functions": "第8课 使用函数处理数据",
  "sqt-lesson09-summarizing-data": "第9课 汇总数据",
  "sqt-lesson10-grouping-data": "第10课 分组数据",
  "sqt-lesson11-subqueries": "第11课 使用子查询",
  "sqt-lesson12-joining-tables": "第12课 联结表",
  "sqt-lesson13-advanced-joins": "第13课 创建高级联结",
  "sqt-lesson14-combining-queries": "第14课 组合查询",
  "sqt-lesson15-inserting-data": "第15课 插入数据",
  "sqt-lesson16-updating-deleting": "第16课 更新和删除数据",
  "sqt-lesson17-tables": "第17课 创建和操纵表",
  "sqt-lesson18-views": "第18课 使用视图",
  "sqt-lesson19-stored-procedures": "第19课 使用存储过程",
  "sqt-lesson20-transactions": "第20课 管理事务处理",
  "sqt-lesson21-cursors": "第21课 使用游标",
  "sqt-lesson22-advanced-features": "第22课 高级SQL特性",
  "sqt-official-final-review": "第5版全书复习与跨DBMS验收",
  "dsc-official-learning-map": "第7版权威学习地图",
  "dsc-ch01-introduction": "第1章 引言",
  "dsc-ch02-relational-model": "第2章 关系模型概述",
  "dsc-ch03-introduction-to-sql": "第3章 SQL入门",
  "dsc-ch04-intermediate-sql": "第4章 中级SQL",
  "dsc-ch05-advanced-sql": "第5章 高级SQL",
  "dsc-ch06-er-design": "第6章 使用E-R模型的数据库设计",
  "dsc-ch07-relational-design": "第7章 关系数据库设计",
  "dsc-ch08-complex-data-types": "第8章 复杂数据类型",
  "dsc-ch09-application-development": "第9章 应用开发",
  "dsc-ch10-big-data": "第10章 大数据",
  "dsc-ch11-data-analytics": "第11章 数据分析",
  "dsc-ch12-physical-storage": "第12章 物理存储系统",
  "dsc-ch13-storage-structures": "第13章 数据存储结构",
  "dsc-ch14-indexing": "第14章 索引",
  "dsc-ch15-query-processing": "第15章 查询处理",
  "dsc-ch16-query-optimization": "第16章 查询优化",
  "dsc-ch17-transactions": "第17章 事务",
  "dsc-ch18-concurrency-control": "第18章 并发控制",
  "dsc-ch19-recovery": "第19章 恢复系统",
  "dsc-ch20-architectures": "第20章 数据库系统体系结构",
  "dsc-ch21-parallel-distributed-storage": "第21章 并行与分布式存储",
  "dsc-ch22-parallel-distributed-query": "第22章 并行与分布式查询处理",
  "dsc-ch23-distributed-transactions": "第23章 并行与分布式事务处理",
  "dsc-ch24-advanced-indexing": "第24章 高级索引技术",
  "dsc-ch25-advanced-app-development": "第25章 高级应用开发",
  "dsc-ch26-blockchain-databases": "第26章 区块链数据库",
  "dsc-ch27-formal-query-languages": "第27章 形式化关系查询语言",
  "dsc-ch28-advanced-relational-design": "第28章 高级关系数据库设计",
  "dsc-ch29-object-based-databases": "第29章 基于对象的数据库",
  "dsc-ch30-xml": "第30章 XML",
  "dsc-ch31-information-retrieval": "第31章 信息检索",
  "dsc-ch32-postgresql": "第32章 PostgreSQL",
  "dsc-appendix-a-university-schema": "附录A 详细大学模式",
  "dsc-official-final-review": "第7版全书复习与系统验收",
  "hpm4-official-learning-map": "第4版权威学习地图",
  "hpm4-ch01-mysql-architecture": "第1章 MySQL架构",
  "hpm4-ch02-reliability-monitoring": "第2章 可靠性工程世界中的监控",
  "hpm4-ch03-performance-schema": "第3章 Performance Schema",
  "hpm4-ch04-os-hardware": "第4章 操作系统和硬件优化",
  "hpm4-ch05-server-settings": "第5章 优化服务器设置",
  "hpm4-ch06-schema-design": "第6章 Schema设计与管理",
  "hpm4-ch07-indexing": "第7章 创建高性能索引",
  "hpm4-ch08-query-optimization": "第8章 查询性能优化",
  "hpm4-ch09-replication": "第9章 复制",
  "hpm4-ch10-backup-recovery": "第10章 备份与恢复",
  "hpm4-ch11-scaling": "第11章 扩展MySQL",
  "hpm4-ch12-mysql-cloud": "第12章 云端的MySQL",
  "hpm4-ch13-compliance": "第13章 MySQL的合规性",
  "hpm4-appendix-a-upgrading": "附录A 升级MySQL",
  "hpm4-appendix-b-kubernetes": "附录B Kubernetes上的MySQL",
  "hpm4-official-final-review": "第4版全书复习与生产验收",
  "ddi-official-learning-map": "第1版权威学习地图",
  "ddi-01-reliable-scalable-maintainable-applications":
    "第1章 可靠、可扩展与可维护的应用系统",
  "ddi-02-data-models-query-languages": "第2章 数据模型与查询语言",
  "ddi-03-storage-retrieval": "第3章 数据存储与检索",
  "ddi-04-encoding-evolution": "第4章 数据编码与演化",
  "ddi-05-replication": "第5章 复制",
  "ddi-06-partitioning": "第6章 分区",
  "ddi-07-transactions": "第7章 事务",
  "ddi-08-trouble-distributed-systems": "第8章 分布式系统的麻烦",
  "ddi-09-consistency-consensus": "第9章 一致性与共识",
  "ddi-10-batch-processing": "第10章 批处理",
  "ddi-11-stream-processing": "第11章 流处理",
  "ddi-12-future-data-systems": "第12章 数据系统的未来",
  "ddi-glossary": "术语表",
  "ddi-official-final-review": "第1版全书总复习",
  "rdi-official-learning-map": "第2版权威学习地图",
  "rdi-01-introduction": "第1章 简介",
  "rdi-02-simple-dynamic-string": "第2章 简单动态字符串",
  "rdi-03-linked-list": "第3章 链表",
  "rdi-04-dictionary": "第4章 字典",
  "rdi-05-skiplist": "第5章 跳跃表",
  "rdi-06-integer-set": "第6章 整数集合",
  "rdi-07-ziplist": "第7章 压缩列表",
  "rdi-08-object": "第8章 对象",
  "rdi-09-database": "第9章 数据库",
  "rdi-10-rdb-persistence": "第10章 RDB持久化",
  "rdi-11-aof-persistence": "第11章 AOF持久化",
  "rdi-12-event": "第12章 事件",
  "rdi-13-client": "第13章 客户端",
  "rdi-14-server": "第14章 服务器",
  "rdi-15-replication": "第15章 复制",
  "rdi-16-sentinel": "第16章 Sentinel",
  "rdi-17-cluster": "第17章 集群",
  "rdi-18-pubsub": "第18章 发布与订阅",
  "rdi-19-transaction": "第19章 事务",
  "rdi-20-lua": "第20章 Lua脚本",
  "rdi-21-sort": "第21章 排序",
  "rdi-22-bit-array": "第22章 二进制位数组",
  "rdi-23-slow-log": "第23章 慢查询日志",
  "rdi-24-monitor": "第24章 监视器",
  "rdi-official-final-review": "第2版全书总复习",
  "kfk-official-learning-map": "第2版权威学习地图",
  "kfk-01-meet-kafka": "第1章 初识Kafka",
  "kfk-02-installing-kafka": "第2章 安装Kafka",
  "kfk-03-kafka-producers": "第3章 Kafka生产者——向Kafka写入数据",
  "kfk-04-kafka-consumers": "第4章 Kafka消费者——从Kafka读取数据",
  "kfk-05-programmatic-administration": "第5章 编程式管理Kafka",
  "kfk-06-kafka-internals": "第6章 深入Kafka",
  "kfk-07-reliable-data-delivery": "第7章 可靠的数据传递",
  "kfk-08-exactly-once-semantics": "第8章 精确一次性语义",
  "kfk-09-building-data-pipelines": "第9章 构建数据管道",
  "kfk-10-cross-cluster-mirroring": "第10章 跨集群数据镜像",
  "kfk-11-securing-kafka": "第11章 保护Kafka",
  "kfk-12-administering-kafka": "第12章 管理Kafka",
  "kfk-13-monitoring-kafka": "第13章 监控Kafka",
  "kfk-14-stream-processing": "第14章 流式处理",
  "kfk-appendix-a-installation": "附录A 在其他操作系统中安装Kafka",
  "kfk-appendix-b-tools": "附录B 其他Kafka工具",
  "kfk-official-final-review": "第2版全书总复习",
  "rmq-official-learning-map": "原书权威学习地图",
  "rmq-01-pulling-rabbit-out-of-hat": "第1章 天降奇兵",
  "rmq-02-understanding-messaging": "第2章 理解消息通信",
  "rmq-03-running-administering-rabbit": "第3章 运行和管理Rabbit",
  "rmq-04-coding-patterns": "第4章 解决Rabbit相关问题：编码与模式",
  "rmq-05-clustering-failure": "第5章 集群并处理失败",
  "rmq-06-surviving-failure": "第6章 从故障中恢复",
  "rmq-07-warrens-shovels": "第7章 warren和Shovel：故障转移和复制",
  "rmq-08-web-administration": "第8章 从Web端管理RabbitMQ",
  "rmq-09-rest-api": "第9章 使用REST API控制Rabbit",
  "rmq-10-monitoring": "第10章 监控",
  "rmq-11-performance-security": "第11章 提升性能，保障安全",
  "rmq-12-extending-rabbitmq": "第12章 聪明的Rabbit：扩展RabbitMQ",
  "rmq-appendix-a-java-dotnet": "附录A 在Java和.NET上使用Rabbit",
  "rmq-appendix-b-online-resources": "附录B 在线资源",
  "rmq-appendix-c-windows-installation": "附录C 在Windows上安装RabbitMQ",
  "rmq-official-final-review": "全书总复习",
  "kga-official-learning-map": "原书权威学习地图",
  "kga-01-overview": "第1章 全面了解Kong网关",
  "kga-02-nginx": "第2章 Nginx知识",
  "kga-03-lua": "第3章 Lua知识",
  "kga-04-openresty": "第4章 OpenResty知识",
  "kga-05-config-deployment": "第5章 Kong网关配置与部署",
  "kga-06-cli": "第6章 Kong网关命令行",
  "kga-07-proxy-auth": "第7章 Kong网关代理及鉴权",
  "kga-08-load-balancing-health": "第8章 Kong网关负载均衡策略与健康检查",
  "kga-09-plugins": "第9章 Kong网关插件",
  "kga-10-logging": "第10章 Kong网关日志",
  "kga-11-operations": "第11章 Kong网关运维",
  "kga-12-security-ha": "第12章 Kong网关安全与集群高可用",
  "kga-13-microservices-devops": "第13章 Kong网关结合微服务架构",
  "kga-14-kubernetes": "第14章 Kong网关结合Kubernetes架构方案",
  "kga-15-kuma": "第15章 Service Mesh实践之Kuma",
  "kga-16-serverless": "第16章 Serverless架构",
  "kga-appendix-a-docker": "附录A Docker安装指南",
  "kga-appendix-b-konga": "附录B KONGA安装指南",
  "kga-appendix-c-database": "附录C 数据库明细",
  "kga-appendix-d-admin-api": "附录D Admin API",
  "kga-official-final-review": "全书总复习",
  "k8s-official-learning-map": "第1版权威学习地图",
  "k8s-01-introduction": "第1章 Kubernetes 介绍",
  "k8s-02-docker-first-app": "第2章 开始使用 Kubernetes 和 Docker",
  "k8s-03-pods": "第3章 pod ：运行于 Kubernetes 中的容器",
  "k8s-04-replication-controllers":
    "第4章 副本机制和其他控制器 ：部署托管的 pod",
  "k8s-05-services": "第5章 服务 ：让客户端发现 pod 并与之通信",
  "k8s-06-volumes": "第6章 卷 ：将磁盘挂载到容器",
  "k8s-07-configmaps-secrets": "第7章 ConfigMap 和 Secret ：配置应用程序",
  "k8s-08-downward-api": "第8章 从应用访问 pod 元数据以及其他资源",
  "k8s-09-deployments": "第9章 Deployment: 声明式地升级应用",
  "k8s-10-statefulsets": "第10章 StatefulSet ：部署有状态的多副本应用",
  "k8s-11-internals": "第11章 了解 Kubernetes 机理",
  "k8s-12-api-security": "第12章 Kubernetes API 服务器的安全防护",
  "k8s-13-node-network-security": "第13章 保障集群内节点和网络安全",
  "k8s-14-resources": "第14章 计算资源管理",
  "k8s-15-autoscaling": "第15章 自动横向伸缩 pod 与集群节点",
  "k8s-16-scheduling": "第16章 高级调度",
  "k8s-17-best-practices": "第17章 开发应用的最佳实践",
  "k8s-18-extension": "第18章 Kubernetes 应用扩展",
  "k8s-appendix-a-kubectl-multicluster": "附录A 在多个集群中使用 kubectl",
  "k8s-appendix-b-kubeadm": "附录B 使用 kubeadm 配置多节点集群",
  "k8s-appendix-c-runtimes": "附录C 使用其他容器运行时",
  "k8s-appendix-d-federation": "附录D Cluster Federation",
  "k8s-official-final-review": "第1版全书总复习",
  "pha-official-learning-map": "2021纸书版权威学习地图",
  "pha-01-architecture-evolution": "第1章 服务架构演进史",
  "pha-02-remote-services": "第2章 访问远程服务",
  "pha-03-transactions": "第3章 事务处理",
  "pha-04-diversion-system": "第4章 透明多级分流系统",
  "pha-05-security": "第5章 架构安全性",
  "pha-06-consensus": "第6章 分布式共识",
  "pha-07-library-to-service": "第7章 从类库到服务",
  "pha-08-traffic-governance": "第8章 流量治理",
  "pha-09-reliable-communication": "第9章 可靠通信",
  "pha-10-observability": "第10章 可观测性",
  "pha-11-containers": "第11章 虚拟化容器",
  "pha-12-container-network": "第12章 容器间网络",
  "pha-13-persistent-storage": "第13章 持久化存储",
  "pha-14-resource-scheduling": "第14章 资源与调度",
  "pha-15-service-mesh": "第15章 服务网格",
  "pha-16-forward-microservices": "第16章 向微服务迈进",
  "pha-appendix-a-projects": "附录A 技术演示工程实践",
  "pha-appendix-b-kubernetes": "附录B 部署Kubernetes集群",
  "pha-official-final-review": "2021纸书版总复习与架构评审",
  "msp-official-learning-map": "2019中文版初版权威学习地图",
  "msp-01-escaping-monolithic-hell": "第1章 逃离单体地狱",
  "msp-02-decomposition-strategies": "第2章 服务的拆分策略",
  "msp-03-interprocess-communication": "第3章 微服务架构中的进程间通信",
  "msp-04-managing-transactions-with-sagas": "第4章 使用Saga管理事务",
  "msp-05-designing-business-logic": "第5章 微服务架构中的业务逻辑设计",
  "msp-06-event-sourcing": "第6章 使用事件溯源开发业务逻辑",
  "msp-07-implementing-queries": "第7章 在微服务架构中实现查询",
  "msp-08-external-api-patterns": "第8章 外部API模式",
  "msp-09-testing-part-1": "第9章 微服务架构中的测试策略（上）",
  "msp-10-testing-part-2": "第10章 微服务架构中的测试策略（下）",
  "msp-11-production-ready-services": "第11章 开发面向生产环境的微服务应用",
  "msp-12-deploying-microservices": "第12章 部署微服务应用",
  "msp-13-refactoring-to-microservices": "第13章 微服务架构的重构策略",
  "msp-official-final-review": "2019中文版初版总复习与架构评审",
  "ilh-official-learning-map": "2014年首版权威学习地图",
  "ilh-01-web-network-foundations": "第1章 了解Web及网络基础",
  "ilh-02-simple-http-protocol": "第2章 简单的HTTP协议",
  "ilh-03-http-message-information": "第3章 HTTP报文内的HTTP信息",
  "ilh-04-http-status-codes": "第4章 返回结果的HTTP状态码",
  "ilh-05-web-servers-cooperation": "第5章 与HTTP协作的Web服务器",
  "ilh-06-http-headers": "第6章 HTTP首部",
  "ilh-07-https-security": "第7章 确保Web安全的HTTPS",
  "ilh-08-user-authentication": "第8章 确认访问用户身份的认证",
  "ilh-09-http-extensions": "第9章 基于HTTP的功能追加协议",
  "ilh-10-web-content-technologies": "第10章 构建Web内容的技术",
  "ilh-11-web-attack-techniques": "第11章 Web的攻击技术",
  "ilh-official-final-review": "2014年首版总复习与协议审计",
  "isn-official-learning-map": "2015年首版权威学习地图",
  "isn-00-book-usage": "第0章 本书的用法",
  "isn-01-physical-design": "第1章 物理设计",
  "isn-02-logical-design": "第2章 逻辑设计",
  "isn-03-security-load-balancing": "第3章 数据安全设计和负载均衡设计",
  "isn-04-high-availability": "第4章 高可用性设计",
  "isn-05-management-design": "第5章 管理设计",
  "isn-official-final-review": "2015年首版总复习与网络设计评审",
  "cnt8-official-learning-map": "原书第8版权威学习地图",
  "cnt8-01-internet": "第1章 计算机网络和因特网",
  "cnt8-02-application": "第2章 应用层",
  "cnt8-03-transport": "第3章 运输层",
  "cnt8-04-data-plane": "第4章 网络层：数据平面",
  "cnt8-05-control-plane": "第5章 网络层：控制平面",
  "cnt8-06-link-lans": "第6章 链路层和局域网",
  "cnt8-07-wireless-mobile": "第7章 无线网络和移动网络",
  "cnt8-08-security": "第8章 计算机网络中的安全",
  "cnt8-official-final-review": "原书第8版总复习与端到端诊断",
  "hdg1-official-learning-map": "2002年首版权威学习地图",
  "hdg1-part-1": "第一部分 http：web 的基础",
  "hdg1-01": "第1章 http 概述",
  "hdg1-02": "第2章 url 与资源",
  "hdg1-03": "第3章 http 报文",
  "hdg1-04": "第4章 连接管理",
  "hdg1-part-2": "第二部分 http 结构",
  "hdg1-05": "第5章 web 服务器",
  "hdg1-06": "第6章 代理",
  "hdg1-07": "第7章 缓存",
  "hdg1-08": "第8章 集成点：网关、隧道及中继",
  "hdg1-09": "第9章 web 机器人",
  "hdg1-10": "第10章 http-ng",
  "hdg1-part-3": "第三部分 识别、认证与安全",
  "hdg1-11": "第11章 客户端识别与cookie 机制",
  "hdg1-12": "第12章 基本认证机制",
  "hdg1-13": "第13章 摘要认证",
  "hdg1-14": "第14章 安全http",
  "hdg1-part-4": "第四部分 实体、编码和国际化",
  "hdg1-15": "第15章 实体和编码",
  "hdg1-16": "第16章 国际化",
  "hdg1-17": "第17章 内容协商与转码",
  "hdg1-part-5": "第五部分 内容发布与分发",
  "hdg1-18": "第18章 web 主机托管",
  "hdg1-19": "第19章 发布系统",
  "hdg1-20": "第20章 重定向与负载均衡",
  "hdg1-21": "第21章 日志记录与使用情况跟踪",
  "hdg1-part-6": "第六部分 附 录",
  "hdg1-appendix-a": "附录A uri 方案",
  "hdg1-appendix-b": "附录B http 状态码",
  "hdg1-appendix-c": "附录C http 首部参考",
  "hdg1-appendix-d": "附录D mime 类型",
  "hdg1-appendix-e": "附录E base-64 编码",
  "hdg1-appendix-f": "附录F 摘要认证",
  "hdg1-appendix-g": "附录G 语言标记",
  "hdg1-appendix-h": "附录H mime 字符集注册表",
  "hdg1-index": "索引",
  "hdg1-official-final-review": "2002年首版总复习与HTTP事务审计",
  "ppa3-official-learning-map": "第3版权威学习地图",
  "ppa3-introduction": "导言",
  "ppa3-01-packet-analysis-network-basics": "第1章 数据包分析技术与网络基础",
  "ppa3-02-tapping-into-wire": "第2章 监听网络线路",
  "ppa3-03-introduction-wireshark": "第3章 Wireshark入门",
  "ppa3-04-working-captured-packets": "第4章 玩转捕获数据包",
  "ppa3-05-advanced-wireshark-features": "第5章 Wireshark高级特性",
  "ppa3-06-command-line-analysis": "第6章 用命令行分析数据包",
  "ppa3-07-network-layer-protocols": "第7章 网络层协议",
  "ppa3-08-transport-layer-protocols": "第8章 传输层协议",
  "ppa3-09-upper-layer-protocols": "第9章 常见高层网络协议",
  "ppa3-10-real-world-scenarios": "第10章 基础的现实世界场景",
  "ppa3-11-fighting-slow-network": "第11章 让网络不再卡",
  "ppa3-12-security-analysis": "第12章 安全领域的数据包分析",
  "ppa3-13-wireless-analysis": "第13章 无线网络数据包分析",
  "ppa3-appendix-a": "附录A 延伸阅读",
  "ppa3-appendix-b": "附录B 分析数据包结构",
  "ppa3-index": "索引",
  "ppa3-official-final-review": "第3版总复习与数据包诊断审计",
  "tip2-official-learning-map": "第2版权威学习地图",
  "tip2-foreword": "推荐序",
  "tip2-preface-second-edition": "第2版前言",
  "tip2-adapted-preface-first-edition": "第1版前言（修订收录）",
  "tip2-01-introduction": "第1章 概述",
  "tip2-02-address-architecture": "第2章 Internet地址结构",
  "tip2-03-link-layer": "第3章 链路层",
  "tip2-04-arp": "第4章 地址解析协议",
  "tip2-05-internet-protocol": "第5章 Internet协议",
  "tip2-06-dhcp-autoconfiguration": "第6章 系统配置：DHCP和自动配置",
  "tip2-07-firewalls-nat": "第7章 防火墙和网络地址转换",
  "tip2-08-icmp": "第8章 ICMPv4和ICMPv6：Internet控制报文协议",
  "tip2-09-broadcast-multicast": "第9章 广播和本地组播（IGMP和MLD）",
  "tip2-10-udp-fragmentation": "第10章 用户数据报协议和IP分片",
  "tip2-11-dns": "第11章 名称解析和域名系统",
  "tip2-12-tcp-preliminaries": "第12章 TCP：传输控制协议（初步）",
  "tip2-13-tcp-connection-management": "第13章 TCP连接管理",
  "tip2-14-tcp-timeout-retransmission": "第14章 TCP超时与重传",
  "tip2-15-tcp-data-flow-window": "第15章 TCP数据流与窗口管理",
  "tip2-16-tcp-congestion-control": "第16章 TCP拥塞控制",
  "tip2-17-tcp-keepalive": "第17章 TCP保活机制",
  "tip2-18-security": "第18章 安全：EAP、IPsec、TLS、DNSSEC和DKIM",
  "tip2-glossary-acronyms": "缩略语表",
  "tip2-index": "索引",
  "tip2-official-final-review": "全书终局复核",
  "unp-official-learning-map":
    "《UNIX网络编程 卷1：套接字联网API（第3版）》权威学习地图",
  "unp-01-introduction": "第1章 简介",
  "unp-02-transport-layer": "第2章 传输层：TCP、UDP和SCTP",
  "unp-03-sockets-introduction": "第3章 套接字编程简介",
  "unp-04-elementary-tcp-sockets": "第4章 基本TCP套接字编程",
  "unp-05-tcp-client-server-example": "第5章 TCP客户/服务器程序示例",
  "unp-06-io-multiplexing": "第6章 I/O复用：select和poll函数",
  "unp-07-socket-options": "第7章 套接字选项",
  "unp-08-elementary-udp-sockets": "第8章 基本UDP套接字编程",
  "unp-09-elementary-sctp-sockets": "第9章 基本SCTP套接字编程",
  "unp-10-sctp-client-server-example": "第10章 SCTP客户/服务器程序例子",
  "unp-11-name-address-conversions": "第11章 名字与地址转换",
  "unp-12-ipv4-ipv6-interoperability": "第12章 IPv4与IPv6的互操作性",
  "unp-13-daemon-inetd": "第13章 守护进程和inetd超级服务器",
  "unp-14-advanced-io-functions": "第14章 高级I/O函数",
  "unp-15-unix-domain-protocols": "第15章 UNIX域协议",
  "unp-16-nonblocking-io": "第16章 非阻塞式I/O",
  "unp-17-ioctl-operations": "第17章 ioctl操作",
  "unp-18-routing-sockets": "第18章 路由套接字",
  "unp-19-key-management-sockets": "第19章 密钥管理套接字",
  "unp-20-broadcasting": "第20章 广播",
  "unp-21-multicasting": "第21章 多播",
  "unp-22-advanced-udp": "第22章 高级UDP套接字编程",
  "unp-23-advanced-sctp": "第23章 高级SCTP套接字编程",
  "unp-24-out-of-band-data": "第24章 带外数据",
  "unp-25-signal-driven-io": "第25章 信号驱动式I/O",
  "unp-26-threads": "第26章 线程",
  "unp-27-ip-options": "第27章 IP选项",
  "unp-28-raw-sockets": "第28章 原始套接字",
  "unp-29-datalink-access": "第29章 数据链路访问",
  "unp-30-client-server-design": "第30章 客户/服务器程序设计范式",
  "unp-31-streams": "第31章 流",
  "unp-appendix-a-internet-protocols": "附录A IPv4、IPv6、ICMPv4和ICMPv6",
  "unp-appendix-b-virtual-networks": "附录B 虚拟网络",
  "unp-appendix-c-debugging-techniques": "附录C 调试技术",
  "unp-appendix-d-misc-source-code": "附录D 杂凑的源代码",
  "unp-appendix-e-selected-solutions": "附录E 精选习题答案",
  "unp-official-final-review":
    "《UNIX网络编程 卷1：套接字联网API（第3版）》全书总复习",
  "tws-official-learning-map": "《两周自制脚本语言》权威学习地图",
  "tws-01-what-to-build": "第1天 来，我们一起做些什么吧",
  "tws-02-language-design": "第2天 设计程序设计语言",
  "tws-03-tokenization": "第3天 分割单词",
  "tws-04-program-objects": "第4天 用于表示程序的对象",
  "tws-05-parser-design": "第5天 设计语法分析器",
  "tws-06-interpreter-execution": "第6天 通过解释器执行程序",
  "tws-07-functions-closures": "第7天 添加函数功能",
  "tws-08-java-interop": "第8天 关联Java语言",
  "tws-09-object-oriented-language": "第9天 设计面向对象语言",
  "tws-10-arrays": "第10天 无法割舍的数组",
  "tws-11-fast-variable-access": "第11天 优化变量读写性能",
  "tws-12-fast-object-access": "第12天 优化对象操作性能",
  "tws-13-bytecode-interpreter": "第13天 设计中间代码解释器",
  "tws-14-static-types": "第14天 为Stone语言添加静态类型支持以优化性能",
  "tws-15-handwritten-lexer": "第15天 手工设计词法分析器",
  "tws-16-parsing-methods": "第16天 语法分析方式",
  "tws-17-parser-library-internals": "第17天 Parser库的内部结构",
  "tws-18-gluonj": "第18天 GluonJ的使用方法",
  "tws-19-ast-design-patterns": "第19天 抽象语法树与设计模式",
  "tws-official-final-review": "《两周自制脚本语言》全书总复习",
  "crc-official-learning-map": "《自制编译器》权威学习地图",
  "crc-01-start-compiler": "第1章 开始制作编译器",
  "crc-02-cflat-cbc": "第2章 C♭和cbc",
  "crc-03-parsing-overview": "第3章 语法分析的概要",
  "crc-04-lexical-analysis": "第4章 词法分析",
  "crc-05-javacc-parser": "第5章 基于JavaCC的解析器描述",
  "crc-06-syntax-analysis": "第6章 语法分析",
  "crc-07-javacc-actions-ast": "第7章 JavaCC的action和抽象语法树",
  "crc-08-build-ast": "第8章 抽象语法树的生成",
  "crc-09-reference-resolution": "第9章 语义分析（1）引用的消解",
  "crc-10-static-type-checking": "第10章 语义分析（2）静态类型检查",
  "crc-11-ir-conversion": "第11章 中间代码的转换",
  "crc-12-x86-overview": "第12章 x86架构的概要",
  "crc-13-x86-assembly": "第13章 x86汇编器编程",
  "crc-14-functions-variables": "第14章 函数和变量",
  "crc-15-compile-expressions-statements": "第15章 编译表达式和语句",
  "crc-16-stack-frame": "第16章 分配栈帧",
  "crc-17-optimization": "第17章 优化的方法",
  "crc-18-object-files": "第18章 生成目标文件",
  "crc-19-linking-libraries": "第19章 链接和库",
  "crc-20-program-loading": "第20章 加载程序",
  "crc-21-position-independent-code": "第21章 生成地址无关代码",
  "crc-22-further-reading": "第22章 扩展阅读",
  "crc-appendix-resources": "附录",
  "crc-official-final-review": "《自制编译器》全书总复习",
  "eac-official-learning-map": "《编译器设计（第2版）》权威学习地图",
  "eac-01-overview-compilation": "第1章 编译概观",
  "eac-02-scanners": "第2章 词法分析器",
  "eac-03-parsers": "第3章 语法分析器",
  "eac-04-context-sensitive-analysis": "第4章 上下文相关分析",
  "eac-05-intermediate-representations": "第5章 中间表示",
  "eac-06-procedure-abstraction": "第6章 过程抽象",
  "eac-07-code-shape": "第7章 代码形式",
  "eac-08-introduction-optimization": "第8章 优化简介",
  "eac-09-data-flow-analysis": "第9章 数据流分析",
  "eac-10-scalar-optimizations": "第10章 标量优化",
  "eac-11-instruction-selection": "第11章 指令选择",
  "eac-12-instruction-scheduling": "第12章 指令调度",
  "eac-13-register-allocation": "第13章 寄存器分配",
  "eac-appendix-a-iloc": "附录A ILOC",
  "eac-appendix-b-data-structures": "附录B 数据结构",
  "eac-official-final-review": "《编译器设计（第2版）》全书总复习",
  "dbc-official-learning-map": "《编译原理（第2版）》权威学习地图",
  "dbc-01-introduction": "第1章 引论",
  "dbc-02-simple-syntax-directed-translator": "第2章 一个简单的语法制导翻译器",
  "dbc-03-lexical-analysis": "第3章 词法分析",
  "dbc-04-syntax-analysis": "第4章 语法分析",
  "dbc-05-syntax-directed-translation": "第5章 语法制导翻译",
  "dbc-06-intermediate-code-generation": "第6章 中间代码生成",
  "dbc-07-runtime-environments": "第7章 运行时刻环境",
  "dbc-08-code-generation": "第8章 代码生成",
  "dbc-09-machine-independent-optimizations": "第9章 机器无关优化",
  "dbc-10-instruction-level-parallelism": "第10章 指令级并行性",
  "dbc-11-parallelism-locality": "第11章 并行性和局部性的优化",
  "dbc-12-interprocedural-analysis": "第12章 过程间分析",
  "dbc-appendix-a-complete-front-end": "附录A 一个完整的前端",
  "dbc-appendix-b-linear-independent-solutions": "附录B 寻找线性无关解",
  "dbc-official-final-review": "《编译原理（第2版）》全书总复习",
  "tbc-official-learning-map":
    "《现代编译原理：C语言描述（修订版）》权威学习地图",
  "tbc-01-introduction": "第1章 绪论",
  "tbc-02-lexical-analysis": "第2章 词法分析",
  "tbc-03-parsing": "第3章 语法分析",
  "tbc-04-abstract-syntax": "第4章 抽象语法",
  "tbc-05-semantic-analysis": "第5章 语义分析",
  "tbc-06-activation-records": "第6章 活动记录",
  "tbc-07-translation-intermediate-code": "第7章 翻译成中间代码",
  "tbc-08-basic-blocks-traces": "第8章 基本块和轨迹",
  "tbc-09-instruction-selection": "第9章 指令选择",
  "tbc-10-liveness-analysis": "第10章 活跃分析",
  "tbc-11-register-allocation": "第11章 寄存器分配",
  "tbc-12-putting-it-all-together": "第12章 整合为一体",
  "tbc-13-garbage-collection": "第13章 垃圾收集",
  "tbc-14-object-oriented-languages": "第14章 面向对象的语言",
  "tbc-15-functional-languages": "第15章 函数式程序设计语言",
  "tbc-16-polymorphic-types": "第16章 多态类型",
  "tbc-17-dataflow-analysis": "第17章 数据流分析",
  "tbc-18-loop-optimizations": "第18章 循环优化",
  "tbc-19-static-single-assignment": "第19章 静态单赋值形式",
  "tbc-20-scheduling-pipelining": "第20章 流水和调度",
  "tbc-21-memory-hierarchies": "第21章 存储层次",
  "tbc-appendix-tiger-language-reference": "附录 Tiger语言参考手册",
  "tbc-official-final-review":
    "《现代编译原理：C语言描述（修订版）》全书总复习",
  "iai-official-learning-map": "《图解人工智能》权威学习地图",
  "iai-01-ai-past-present-future": "第1章 人工智能的过去、现在和未来",
  "iai-02-rule-systems-variants": "第2章 规则系统及其变体",
  "iai-03-automata-artificial-life": "第3章 自动机和人工生命程序",
  "iai-04-weighting-optimal-solutions": "第4章 权重和寻找最优解",
  "iai-05-weighting-optimization-programs": "第5章 权重和优化程序",
  "iai-06-statistical-ml-probability-modeling":
    "第6章 统计机器学习（概率分布和建模）",
  "iai-07-statistical-ml-supervised-unsupervised":
    "第7章 统计机器学习（无监督学习和有监督学习）",
  "iai-08-reinforcement-distributed-ai": "第8章 强化学习和分布式人工智能",
  "iai-09-deep-learning": "第9章 深度学习",
  "iai-10-image-speech-pattern-recognition": "第10章 图像和语音的模式识别",
  "iai-11-nlp-machine-learning": "第11章 自然语言处理和机器学习",
  "iai-12-knowledge-representation-data-structures":
    "第12章 知识表示和数据结构",
  "iai-13-distributed-computing": "第13章 分布式计算",
  "iai-14-big-data-iot": "第14章 人工智能与海量数据和物联网",
  "iai-official-final-review": "《图解人工智能》全书总复习",
  "iml-official-learning-map": "《图解机器学习》权威学习地图",
  "iml-01-what-is-machine-learning": "第1章 什么是机器学习",
  "iml-02-learning-models": "第2章 学习模型",
  "iml-03-least-squares-learning": "第3章 最小二乘学习法",
  "iml-04-constrained-least-squares": "第4章 带有约束条件的最小二乘法",
  "iml-05-sparse-learning": "第5章 稀疏学习",
  "iml-06-robust-learning": "第6章 鲁棒学习",
  "iml-07-least-squares-classification": "第7章 基于最小二乘法的分类",
  "iml-08-support-vector-classification": "第8章 支持向量机分类",
  "iml-09-ensemble-classification": "第9章 集成分类",
  "iml-10-probabilistic-classification": "第10章 概率分类法",
  "iml-11-sequence-classification": "第11章 序列数据的分类",
  "iml-12-anomaly-detection": "第12章 异常检测",
  "iml-13-unsupervised-dimensionality-reduction": "第13章 无监督降维",
  "iml-14-clustering": "第14章 聚类",
  "iml-15-online-learning": "第15章 在线学习",
  "iml-16-semi-supervised-learning": "第16章 半监督学习",
  "iml-17-supervised-dimensionality-reduction": "第17章 监督降维",
  "iml-18-transfer-learning": "第18章 迁移学习",
  "iml-19-multi-task-learning": "第19章 多任务学习",
  "iml-20-summary-outlook": "第20章 总结与展望",
  "iml-official-final-review": "《图解机器学习》全书总复习",
  "idl-official-learning-map": "《图解深度学习》权威学习地图",
  "idl-01-introduction": "第1章 绪论",
  "idl-02-neural-networks": "第2章 神经网络",
  "idl-03-convolutional-neural-networks": "第3章 卷积神经网络",
  "idl-04-restricted-boltzmann-machines": "第4章 受限玻尔兹曼机",
  "idl-05-autoencoders": "第5章 自编码器",
  "idl-06-improving-generalization": "第6章 提高泛化能力的方法",
  "idl-07-deep-learning-tools": "第7章 深度学习工具",
  "idl-08-present-and-future": "第8章 深度学习的现在和未来",
  "idl-official-final-review": "《图解深度学习》全书总复习",
  "mlw-official-learning-map": "《机器学习》权威学习地图",
  "mlw-01-introduction": "第1章 绪论",
  "mlw-02-model-assessment-selection": "第2章 模型评估与选择",
  "mlw-03-linear-models": "第3章 线性模型",
  "mlw-04-decision-trees": "第4章 决策树",
  "mlw-05-neural-networks": "第5章 神经网络",
  "mlw-06-support-vector-machines": "第6章 支持向量机",
  "mlw-07-bayesian-classifiers": "第7章 贝叶斯分类器",
  "mlw-08-ensemble-learning": "第8章 集成学习",
  "mlw-09-clustering": "第9章 聚类",
  "mlw-10-dimensionality-reduction-metric-learning": "第10章 降维与度量学习",
  "mlw-11-feature-selection-sparse-learning": "第11章 特征选择与稀疏学习",
  "mlw-12-computational-learning-theory": "第12章 计算学习理论",
  "mlw-13-semi-supervised-learning": "第13章 半监督学习",
  "mlw-14-probabilistic-graphical-models": "第14章 概率图模型",
  "mlw-15-rule-learning": "第15章 规则学习",
  "mlw-16-reinforcement-learning": "第16章 强化学习",
  "mlw-appendices": "附录 数学基础",
  "mlw-official-final-review": "《机器学习》全书总复习",
  "slm-official-learning-map": "《统计学习方法（第2版）》权威学习地图",
  "slm-01-introduction": "第1章 统计学习及监督学习概论",
  "slm-02-perceptron": "第2章 感知机",
  "slm-03-knn": "第3章 k近邻法",
  "slm-04-naive-bayes": "第4章 朴素贝叶斯法",
  "slm-05-decision-tree": "第5章 决策树",
  "slm-06-logistic-maxent": "第6章 逻辑斯谛回归与最大熵模型",
  "slm-07-svm": "第7章 支持向量机",
  "slm-08-boosting": "第8章 提升方法",
  "slm-09-em": "第9章 EM算法及其推广",
  "slm-10-hmm": "第10章 隐马尔可夫模型",
  "slm-11-crf": "第11章 条件随机场",
  "slm-12-supervised-summary": "第12章 监督学习方法总结",
  "slm-13-unsupervised-introduction": "第13章 无监督学习概论",
  "slm-14-clustering": "第14章 聚类方法",
  "slm-15-svd": "第15章 奇异值分解",
  "slm-16-pca": "第16章 主成分分析",
  "slm-17-lsa": "第17章 潜在语义分析",
  "slm-18-plsa": "第18章 概率潜在语义分析",
  "slm-19-mcmc": "第19章 马尔可夫链蒙特卡罗法",
  "slm-20-lda": "第20章 潜在狄利克雷分配",
  "slm-21-pagerank": "第21章 PageRank算法",
  "slm-22-unsupervised-summary": "第22章 无监督学习方法总结",
  "slm-appendices": "附录 最优化与矩阵工具",
  "slm-official-final-review": "《统计学习方法（第2版）》全书总复习",
  "dls-official-learning-map": "《深度学习入门》权威学习地图",
  "dls-01-python-introduction": "第1章 Python入门",
  "dls-02-perceptron": "第2章 感知机",
  "dls-03-neural-network": "第3章 神经网络",
  "dls-04-neural-network-learning": "第4章 神经网络的学习",
  "dls-05-backpropagation": "第5章 误差反向传播法",
  "dls-06-learning-techniques": "第6章 与学习相关的技巧",
  "dls-07-cnn": "第7章 卷积神经网络",
  "dls-08-deep-learning": "第8章 深度学习",
  "dls-appendix-softmax-loss": "附录A Softmax-with-Loss层的计算图",
  "dls-official-final-review": "《深度学习入门》全书总复习",
  "dl2-official-learning-map": "《深度学习入门2：自制框架》权威学习地图",
  "dl2-step-01-variable-box": "步骤1 作为“箱子”的变量",
  "dl2-step-02-function-creator": "步骤2 创建变量的函数",
  "dl2-step-03-function-chain": "步骤3 函数的连续调用",
  "dl2-step-04-numerical-differentiation": "步骤4 数值微分",
  "dl2-step-05-backprop-theory": "步骤5 反向传播的理论知识",
  "dl2-step-06-manual-backprop": "步骤6 手动进行反向传播",
  "dl2-step-07-automatic-backprop": "步骤7 反向传播的自动化",
  "dl2-step-08-recursion-to-loop": "步骤8 从递归到循环",
  "dl2-step-09-usable-functions": "步骤9 让函数更易用",
  "dl2-step-10-testing": "步骤10 测试",
  "dl2-step-11-variadic-forward": "步骤11 可变长参数（正向传播篇）",
  "dl2-step-12-variadic-improvements": "步骤12 可变长参数（改进篇）",
  "dl2-step-13-variadic-backward": "步骤13 可变长参数（反向传播篇）",
  "dl2-step-14-reused-variable": "步骤14 重复使用同一个变量",
  "dl2-step-15-complex-graph-theory": "步骤15 复杂的计算图（理论篇）",
  "dl2-step-16-complex-graph-implementation": "步骤16 复杂的计算图（实现篇）",
  "dl2-step-17-memory-cycles": "步骤17 内存管理和循环引用",
  "dl2-step-18-memory-mode": "步骤18 减少内存使用量的模式",
  "dl2-step-19-usable-variable": "步骤19 让变量更易用",
  "dl2-step-20-operator-overload-one": "步骤20 运算符重载（1）",
  "dl2-step-21-operator-overload-two": "步骤21 运算符重载（2）",
  "dl2-step-22-operator-overload-three": "步骤22 运算符重载（3）",
  "dl2-step-23-package": "步骤23 打包",
  "dl2-step-24-complex-derivatives": "步骤24 复杂函数的求导",
  "dl2-step-25-graphviz-one": "步骤25 计算图的可视化（1）",
  "dl2-step-26-graphviz-two": "步骤26 计算图的可视化（2）",
  "dl2-step-27-taylor-derivative": "步骤27 泰勒展开的导数",
  "dl2-step-28-function-optimization": "步骤28 函数优化",
  "dl2-step-29-manual-newton": "步骤29 使用牛顿法进行优化（手动计算）",
  "dl2-step-30-higher-order-preparation": "步骤30 高阶导数（准备篇）",
  "dl2-step-31-higher-order-theory": "步骤31 高阶导数（理论篇）",
  "dl2-step-32-higher-order-implementation": "步骤32 高阶导数（实现篇）",
  "dl2-step-33-automatic-newton": "步骤33 使用牛顿法进行优化（自动计算）",
  "dl2-step-34-sin-higher-order": "步骤34 sin函数的高阶导数",
  "dl2-step-35-higher-order-graph": "步骤35 高阶导数的计算图",
  "dl2-step-36-double-backprop": "步骤36 DeZero的其他用途",
  "dl2-step-37-tensor": "步骤37 处理张量",
  "dl2-step-38-reshape-transpose": "步骤38 改变形状的函数",
  "dl2-step-39-sum": "步骤39 求和的函数",
  "dl2-step-40-broadcast": "步骤40 进行广播的函数",
  "dl2-step-41-matrix-product": "步骤41 矩阵的乘积",
  "dl2-step-42-linear-regression": "步骤42 线性回归",
  "dl2-step-43-neural-network": "步骤43 神经网络",
  "dl2-step-44-parameter-layer": "步骤44 汇总参数的层",
  "dl2-step-45-model-layer": "步骤45 汇总层的层",
  "dl2-step-46-optimizer": "步骤46 通过Optimizer更新参数",
  "dl2-step-47-softmax-cross-entropy": "步骤47 softmax函数和交叉熵误差",
  "dl2-step-48-multiclass": "步骤48 多分类",
  "dl2-step-49-dataset-preprocess": "步骤49 Dataset类和预处理",
  "dl2-step-50-dataloader": "步骤50 用于取出小批量数据的DataLoader",
  "dl2-step-51-mnist": "步骤51 MNIST的训练",
  "dl2-step-52-gpu": "步骤52 支持GPU",
  "dl2-step-53-save-load": "步骤53 模型的保存和加载",
  "dl2-step-54-dropout-test-mode": "步骤54 Dropout和测试模式",
  "dl2-step-55-cnn-mechanism-one": "步骤55 CNN的机制（1）",
  "dl2-step-56-cnn-mechanism-two": "步骤56 CNN的机制（2）",
  "dl2-step-57-conv2d-pooling": "步骤57 conv2d函数和pooling函数",
  "dl2-step-58-vgg16": "步骤58 具有代表性的CNN（VGG16）",
  "dl2-step-59-rnn": "步骤59 使用RNN处理时间序列数据",
  "dl2-step-60-lstm-dataloader": "步骤60 LSTM与数据加载器",
  "dl2-appendix-a-in-place": "附录A in-place运算（步骤14的补充内容）",
  "dl2-appendix-b-get-item": "附录B 实现get_item函数（步骤47的补充内容）",
  "dl2-appendix-c-colab": "附录C 在Google Colaboratory上运行",
  "dl2-official-final-review": "《深度学习入门2：自制框架》全书总复习",
  "dna-official-learning-map": "《深度学习进阶：自然语言处理》权威学习地图",
  "dna-01-neural-network-review": "第1章 神经网络的复习",
  "dna-02-distributed-word-representations": "第2章 自然语言和单词的分布式表示",
  "dna-03-word2vec": "第3章 word2vec",
  "dna-04-word2vec-acceleration": "第4章 word2vec的高速化",
  "dna-05-rnn": "第5章 RNN",
  "dna-06-gated-rnn": "第6章 Gated RNN",
  "dna-07-rnn-text-generation": "第7章 基于RNN生成文本",
  "dna-08-attention": "第8章 Attention",
  "dna-appendix-a-activation-derivatives": "附录A sigmoid函数和tanh函数的导数",
  "dna-appendix-b-wordnet": "附录B 运行WordNet",
  "dna-appendix-c-gru": "附录C GRU",
  "dna-official-final-review": "《深度学习进阶：自然语言处理》全书总复习",
  "dlr-official-learning-map": "《深度学习入门4：强化学习》权威学习地图",
  "dlr-01-bandit": "第1章 赌场老虎机问题",
  "dlr-02-mdp": "第2章 马尔可夫决策过程",
  "dlr-03-bellman": "第3章 贝尔曼方程",
  "dlr-04-dynamic-programming": "第4章 动态规划法",
  "dlr-05-monte-carlo": "第5章 蒙特卡罗方法",
  "dlr-06-td": "第6章 TD方法",
  "dlr-07-neural-q-learning": "第7章 神经网络和Q学习",
  "dlr-08-dqn": "第8章 DQN",
  "dlr-09-policy-gradient": "第9章 策略梯度法",
  "dlr-10-further": "第10章 进一步学习",
  "dlr-appendix-a-off-policy-mc": "附录A 异策略型的蒙特卡罗方法",
  "dlr-appendix-b-n-step-td": "附录B n-step TD方法",
  "dlr-appendix-c-double-dqn": "附录C Double DQN的理解",
  "dlr-appendix-d-policy-gradient-proof": "附录D 策略梯度法的证明",
  "dlr-official-final-review": "《深度学习入门4：强化学习》全书总复习",
  "dlg-official-learning-map": "《深度学习入门5：生成模型》权威学习地图",
  "dlg-01-normal-distribution": "步骤1 正态分布",
  "dlg-02-maximum-likelihood": "步骤2 最大似然估计",
  "dlg-03-multivariate-normal": "步骤3 多维正态分布",
  "dlg-04-gaussian-mixture": "步骤4 高斯混合模型",
  "dlg-05-em-algorithm": "步骤5 EM算法",
  "dlg-06-neural-network": "步骤6 神经网络",
  "dlg-07-vae": "步骤7 变分自动编码器（VAE）",
  "dlg-08-diffusion-theory": "步骤8 扩散模型的理论",
  "dlg-09-diffusion-implementation": "步骤9 扩散模型的实现",
  "dlg-10-diffusion-applications": "步骤10 扩散模型的应用",
  "dlg-appendix-a-multivariate-mle": "附录A 多维正态分布最大似然估计的推导",
  "dlg-appendix-b-jensen": "附录B 詹森不等式",
  "dlg-appendix-c-hierarchical-vae": "附录C 层级VAE的理论和实现",
  "dlg-appendix-d-notation": "附录D 数学符号一览",
  "dlg-official-final-review": "《深度学习入门5：生成模型》全书总复习",
  "dlt-official-learning-map": "《深度学习》权威学习地图",
  "dlt-01-introduction": "第1章 引言",
  "dlt-02-linear-algebra": "第2章 线性代数",
  "dlt-03-probability-information": "第3章 概率与信息论",
  "dlt-04-numerical-computation": "第4章 数值计算",
  "dlt-05-machine-learning-basics": "第5章 机器学习基础",
  "dlt-06-feedforward-networks": "第6章 深度前馈网络",
  "dlt-07-regularization": "第7章 深度学习中的正则化",
  "dlt-08-optimization": "第8章 深度模型中的优化",
  "dlt-09-convolutional-networks": "第9章 卷积网络",
  "dlt-10-sequence-modeling": "第10章 序列建模：循环和递归网络",
  "dlt-11-practical-methodology": "第11章 实践方法论",
  "dlt-12-applications": "第12章 应用",
  "dlt-13-linear-factor-models": "第13章 线性因子模型",
  "dlt-14-autoencoders": "第14章 自编码器",
  "dlt-15-representation-learning": "第15章 表示学习",
  "dlt-16-structured-probabilistic-models": "第16章 深度学习中的结构化概率模型",
  "dlt-17-monte-carlo": "第17章 蒙特卡罗方法",
  "dlt-18-partition-function": "第18章 直面配分函数",
  "dlt-19-approximate-inference": "第19章 近似推断",
  "dlt-20-deep-generative-models": "第20章 深度生成模型",
  "dlt-official-final-review": "《深度学习》全书总复习",
  "prl-official-learning-map": "《模式识别与机器学习》权威学习地图",
  "prl-01-introduction": "第1章 引言",
  "prl-02-probability-distributions": "第2章 概率分布",
  "prl-03-linear-regression": "第3章 线性回归模型",
  "prl-04-linear-classification": "第4章 线性分类模型",
  "prl-05-neural-networks": "第5章 神经网络",
  "prl-06-kernel-methods": "第6章 核方法",
  "prl-07-sparse-kernel-machines": "第7章 稀疏核机",
  "prl-08-graphical-models": "第8章 图模型",
  "prl-09-mixture-models-em": "第9章 混合模型与EM",
  "prl-10-approximate-inference": "第10章 近似推断",
  "prl-11-sampling-methods": "第11章 采样方法",
  "prl-12-continuous-latent-variables": "第12章 连续潜变量",
  "prl-13-sequential-data": "第13章 序列数据",
  "prl-14-combining-models": "第14章 模型组合",
  "prl-appendix-a-data-sets": "附录A 数据集",
  "prl-appendix-b-probability-distributions": "附录B 概率分布",
  "prl-appendix-c-properties-matrices": "附录C 矩阵性质",
  "prl-appendix-d-calculus-variations": "附录D 变分法",
  "prl-appendix-e-lagrange-multipliers": "附录E 拉格朗日乘子",
  "prl-official-final-review": "《模式识别与机器学习》全书总复习",
  "rlc-official-learning-map":
    "《强化学习与深度学习：通过C语言模拟》权威学习地图",
  "rlc-01-rl-deep-learning": "第1章 强化学习与深度学习",
  "rlc-02-reinforcement-implementation": "第2章 强化学习的实现",
  "rlc-03-deep-learning-techniques": "第3章 深度学习技术",
  "rlc-04-deep-reinforcement-learning": "第4章 深度强化学习",
  "rlc-official-final-review":
    "《强化学习与深度学习：通过C语言模拟》全书总复习",
  "drl-official-learning-map": "《深度强化学习》权威学习地图",
  "drl-01-machine-learning-foundations": "第1章 机器学习基础",
  "drl-02-monte-carlo-method": "第2章 蒙特卡洛方法",
  "drl-03-reinforcement-learning-concepts": "第3章 强化学习基本概念",
  "drl-04-dqn-q-learning": "第4章 DQN与Q学习",
  "drl-05-sarsa": "第5章 SARSA算法",
  "drl-06-advanced-value-learning": "第6章 价值学习高级技巧",
  "drl-07-policy-gradient": "第7章 策略梯度方法",
  "drl-08-policy-gradient-baseline": "第8章 带基线的策略梯度方法",
  "drl-09-advanced-policy-learning": "第9章 策略学习高级技巧",
  "drl-10-continuous-control": "第10章 连续控制",
  "drl-11-partial-observability": "第11章 对状态的不完全观测",
  "drl-12-imitation-learning": "第12章 模仿学习",
  "drl-13-parallel-computing": "第13章 并行计算",
  "drl-14-multi-agent-systems": "第14章 多智能体系统",
  "drl-15-cooperative-marl": "第15章 完全合作关系设定下的多智能体强化学习",
  "drl-16-noncooperative-marl": "第16章 非合作关系设定下的多智能体强化学习",
  "drl-17-attention-marl": "第17章 注意力机制与多智能体强化学习",
  "drl-18-alphago-mcts": "第18章 AlphaGo与蒙特卡洛树搜索",
  "drl-19-real-world-applications": "第19章 现实世界中的应用",
  "drl-appendix-a-bellman-equations": "附录A 贝尔曼方程",
  "drl-appendix-b-exercise-answers": "附录B 习题答案",
  "drl-official-final-review": "《深度强化学习》全书总复习",
  "tcg-official-learning-map": "《这就是ChatGPT》权威学习地图",
  "tcg-preface": "前言",
  "tcg-main-01-one-word-at-a-time": "一次只添加一个词",
  "tcg-main-02-probabilities": "概率从何而来",
  "tcg-main-03-model": "什么是模型",
  "tcg-main-04-human-like-tasks": "面向类人任务的模型",
  "tcg-main-05-neural-nets": "神经网络",
  "tcg-main-06-training-neural-nets": "机器学习和神经网络训练",
  "tcg-main-07-training-practice": "神经网络训练的实践与经验",
  "tcg-main-08-universal-network": "足够大的网络什么都能做吗",
  "tcg-main-09-embeddings": "嵌入的概念",
  "tcg-main-10-inside-chatgpt": "ChatGPT内部",
  "tcg-main-11-training-chatgpt": "ChatGPT的训练",
  "tcg-main-12-beyond-basic-training": "超越基础训练",
  "tcg-main-13-what-lets-it-work": "真正让ChatGPT工作的是什么",
  "tcg-main-14-meaning-space": "意义空间与语义运动定律",
  "tcg-main-15-semantic-grammar": "语义语法与计算语言的力量",
  "tcg-main-16-conclusion": "ChatGPT究竟在做什么，为什么有效",
  "tcg-thanks-additional-resources": "致谢与补充资源",
  "tcg-wa-01-chatgpt-wolfram-alpha": "ChatGPT与Wolfram|Alpha",
  "tcg-wa-02-basic-example": "一个基本示例",
  "tcg-wa-03-more-examples": "更多示例",
  "tcg-wa-04-path-forward": "前进之路",
  "tcg-official-final-review": "《这就是ChatGPT》全书总复习",
  "lae-official-learning-map": "《大模型应用开发极简入门》权威学习地图",
  "lae-preface": "前言",
  "lae-01-gpt4-chatgpt-essentials": "第1章 初识GPT-4和ChatGPT",
  "lae-02-api-deep-dive": "第2章 深入了解GPT-4和ChatGPT的API",
  "lae-03-building-apps": "第3章 使用GPT-4和ChatGPT构建应用程序",
  "lae-04-advanced-techniques": "第4章 GPT-4和ChatGPT的高级技巧",
  "lae-05-langchain-plugins": "第5章 使用LangChain框架和插件增强LLM的功能",
  "lae-glossary": "术语表",
  "lae-official-final-review": "《大模型应用开发极简入门》全书总复习",
  "lcp-official-learning-map": "《LangChain编程：从入门到实践》权威学习地图",
  "lcp-preface": "前言",
  "lcp-01-introduction": "第1章 LangChain简介",
  "lcp-02-first-experience": "第2章 LangChain初体验",
  "lcp-03-model-io": "第3章 模型输入与输出",
  "lcp-04-building-chains": "第4章 链的构建",
  "lcp-05-rag": "第5章 RAG",
  "lcp-06-agents": "第6章 智能代理设计",
  "lcp-07-memory": "第7章 记忆组件",
  "lcp-08-callbacks": "第8章 回调机制",
  "lcp-09-multimodal-bot": "第9章 构建多模态机器人",
  "lcp-10-community-resources": "第10章 社区和资源",
  "lcp-official-final-review": "《LangChain编程：从入门到实践》全书总复习",
  "cgpt-official-learning-map": "《ChatGPT原理与实战》权威学习地图",
  "cgpt-preface": "前言",
  "cgpt-01-understanding-chatgpt": "第1章 了解ChatGPT",
  "cgpt-02-principles": "第2章 ChatGPT原理解构",
  "cgpt-03-pretrained-language-models": "第3章 预训练语言模型",
  "cgpt-04-reinforcement-learning": "第4章 强化学习基础",
  "cgpt-05-prompt-emergence": "第5章 提示学习与大型语言模型的涌现",
  "cgpt-06-llm-pretraining": "第6章 大型语言模型预训练",
  "cgpt-07-gpt-series": "第7章 GPT系列模型分析",
  "cgpt-08-ppo-rlhf": "第8章 PPO算法与RLHF理论实战",
  "cgpt-09-chatgpt-practice": "第9章 类ChatGPT实战",
  "cgpt-10-trends": "第10章 ChatGPT发展趋势",
  "cgpt-official-final-review": "《ChatGPT原理与实战》全书总复习",
  "llm-official-learning-map": "《大语言模型：基础与前沿》权威学习地图",
  "llm-preface": "前言",
  "llm-01-debates-future": "第1章 大语言模型：辩论、争议与未来发展方向",
  "llm-02-language-modeling-tokenization": "第2章 语言模型和分词",
  "llm-03-transformer": "第3章 Transformer",
  "llm-04-pretraining-decoding": "第4章 预训练目标和解码策略",
  "llm-05-icl-lightweight-finetuning": "第5章 上下文学习和轻量级微调",
  "llm-06-training-larger-models": "第6章 训练更大的模型",
  "llm-07-sparse-moe": "第7章 稀疏专家模型",
  "llm-08-retrieval-augmented-lm": "第8章 检索增强型语言模型",
  "llm-09-human-preference-alignment": "第9章 对齐语言模型与人类偏好",
  "llm-10-bias-toxicity": "第10章 减少偏见和有害性",
  "llm-11-vision-language-models": "第11章 视觉语言模型",
  "llm-12-environmental-impact": "第12章 环境影响",
  "llm-references": "参考文献与研究复核",
  "llm-official-final-review": "《大语言模型：基础与前沿》全书总复习",
  "lsl-official-learning-map": "《大规模语言模型：从理论到实践》权威学习地图",
  "lsl-preface": "前言",
  "lsl-mathematical-notation": "数学符号",
  "lsl-01-introduction": "第1章 绪论",
  "lsl-02-llm-foundations": "第2章 大语言模型基础",
  "lsl-03-pretraining-data": "第3章 大语言模型预训练数据",
  "lsl-04-distributed-training": "第4章 分布式训练",
  "lsl-05-supervised-finetuning": "第5章 有监督微调",
  "lsl-06-reinforcement-learning": "第6章 强化学习",
  "lsl-07-llm-applications": "第7章 大语言模型应用",
  "lsl-08-llm-evaluation": "第8章 大语言模型评估",
  "lsl-references": "参考文献与证据复核",
  "lsl-index": "索引与概念依赖",
  "lsl-official-final-review": "《大规模语言模型：从理论到实践》总复习",
  "bla-official-learning-map": "Building LLM Powered Applications 权威学习地图",
  "bla-preface": "Preface",
  "bla-01-introduction-to-large-language-models":
    "Chapter 1: Introduction to Large Language Models",
  "bla-02-llms-for-ai-powered-applications":
    "Chapter 2: LLMs for AI-Powered Applications",
  "bla-03-choosing-an-llm": "Chapter 3: Choosing an LLM for Your Application",
  "bla-04-prompt-engineering": "Chapter 4: Prompt Engineering",
  "bla-05-embedding-llms-in-applications":
    "Chapter 5: Embedding LLMs within Your Applications",
  "bla-06-conversational-applications":
    "Chapter 6: Building Conversational Applications",
  "bla-07-search-recommendation":
    "Chapter 7: Search and Recommendation Engines with LLMs",
  "bla-08-structured-data": "Chapter 8: Using LLMs with Structured Data",
  "bla-09-working-with-code": "Chapter 9: Working with Code",
  "bla-10-multimodal-applications":
    "Chapter 10: Building Multimodal Applications with LLMs",
  "bla-11-fine-tuning": "Chapter 11: Fine-Tuning Large Language Models",
  "bla-12-responsible-ai": "Chapter 12: Responsible AI",
  "bla-13-emerging-trends": "Chapter 13: Emerging Trends and Innovations",
  "bla-other-books": "Other Books You May Enjoy",
  "bla-index": "Index",
  "bla-official-final-review": "Building LLM Powered Applications 全书总复习",
  "mas-official-learning-map":
    "An Introduction to MultiAgent Systems 第二版权威学习地图",
  "mas-preface": "Preface",
  "mas-part-01-setting-scene": "Part I Setting the Scene",
  "mas-01-introduction": "Chapter 1 Introduction",
  "mas-part-02-intelligent-autonomous-agents":
    "Part II Intelligent Autonomous Agents",
  "mas-02-intelligent-agents": "Chapter 2 Intelligent Agents",
  "mas-03-deductive-reasoning-agents": "Chapter 3 Deductive Reasoning Agents",
  "mas-04-practical-reasoning-agents": "Chapter 4 Practical Reasoning Agents",
  "mas-05-reactive-hybrid-agents": "Chapter 5 Reactive and Hybrid Agents",
  "mas-part-03-communication-cooperation":
    "Part III Communication and Cooperation",
  "mas-06-understanding-each-other": "Chapter 6 Understanding Each Other",
  "mas-07-communicating": "Chapter 7 Communicating",
  "mas-08-working-together": "Chapter 8 Working Together",
  "mas-09-methodologies": "Chapter 9 Methodologies",
  "mas-10-applications": "Chapter 10 Applications",
  "mas-part-04-multiagent-decision-making":
    "Part IV Multiagent Decision Making",
  "mas-11-multiagent-interactions": "Chapter 11 Multiagent Interactions",
  "mas-12-making-group-decisions": "Chapter 12 Making Group Decisions",
  "mas-13-forming-coalitions": "Chapter 13 Forming Coalitions",
  "mas-14-allocating-scarce-resources":
    "Chapter 14 Allocating Scarce Resources",
  "mas-15-bargaining": "Chapter 15 Bargaining",
  "mas-16-arguing": "Chapter 16 Arguing",
  "mas-17-logical-foundations": "Chapter 17 Logical Foundations",
  "mas-coda": "Coda",
  "mas-appendix-a-history-lesson": "Appendix A -- A History Lesson",
  "mas-appendix-b-afterword": "Appendix B -- Afterword",
  "mas-official-final-review":
    "An Introduction to MultiAgent Systems 第二版总复习",
  "bp-official-learning-map": "《白话区块链》2017版权威学习地图",
  "bp-technical-review": "技术审校",
  "bp-preface": "前言",
  "bp-01-first-blockchain": "第1章 初识区块链",
  "bp-02-application-development": "第2章 区块链应用发展",
  "bp-03-cryptography": "第3章 区块链骨骼：密码算法",
  "bp-04-consensus": "第4章 区块链灵魂：共识算法",
  "bp-05-scaling-sidechains-lightning":
    "第5章 区块链扩展：扩容、侧链和闪电网络",
  "bp-06-ethereum": "第6章 区块链开发平台：以太坊",
  "bp-07-hyperledger": "第7章 区块链开发平台：超级账本",
  "bp-08-build-mini-chain": "第8章 动手做个实验：搭建微链",
  "bp-09-potential-problems": "第9章 潜在的问题",
  "bp-afterword-programmable-society": "后记 区块链与可编程社会",
  "bp-official-final-review": "《白话区块链》2017版全书总复习",
  "bdp-official-learning-map": "《区块链开发实战》2018版权威学习地图",
  "bdp-preface": "前言",
  "bdp-01-understand-blockchain": "第1章 全面认识区块链",
  "bdp-02-practice-preparation": "第2章 实战准备",
  "bdp-03-ethereum-introduction": "第3章 以太坊介绍",
  "bdp-04-compile-install-run": "第4章 以太坊的编译、安装与运行",
  "bdp-05-private-chain": "第5章 以太坊私有链的搭建与运行",
  "bdp-06-programming-interfaces": "第6章 以太坊的编程接口",
  "bdp-07-solidity-ide-quickstart": "第7章 Solidity IDE和Solidity快速入门",
  "bdp-08-solidity-syntax": "第8章 Solidity语法详解",
  "bdp-09-contract-compile-deploy": "第9章 Solidity合约编译、部署",
  "bdp-10-truffle": "第10章 Truffle详解",
  "bdp-11-dapps-practice": "第11章 以太坊DApps应用开发实战",
  "bdp-appendix-a-bitcoin-principles": "附录A 比特币的原理和运行方式",
  "bdp-appendix-b-bitcoin-cli": "附录B 比特币的bitcoin-cli模块详解",
  "bdp-appendix-c-bitcoin-apis": "附录C 比特币系统的编程接口",
  "bdp-official-final-review": "《区块链开发实战》2018版全书总复习",
  "mbt3-official-learning-map": "《Mastering Bitcoin》第3版权威学习地图",
  "mbt3-preface": "Preface",
  "mbt3-01-introduction": "Chapter 1 Introduction",
  "mbt3-02-how-bitcoin-works": "Chapter 2 How Bitcoin Works",
  "mbt3-03-bitcoin-core":
    "Chapter 3 Bitcoin Core: The Reference Implementation",
  "mbt3-04-keys-addresses": "Chapter 4 Keys and Addresses",
  "mbt3-05-wallet-recovery": "Chapter 5 Wallet Recovery",
  "mbt3-06-transactions": "Chapter 6 Transactions",
  "mbt3-07-authorization-authentication":
    "Chapter 7 Authorization and Authentication",
  "mbt3-08-digital-signatures": "Chapter 8 Digital Signatures",
  "mbt3-09-transaction-fees": "Chapter 9 Transaction Fees",
  "mbt3-10-bitcoin-network": "Chapter 10 The Bitcoin Network",
  "mbt3-11-blockchain": "Chapter 11 The Blockchain",
  "mbt3-12-mining-consensus": "Chapter 12 Mining and Consensus",
  "mbt3-13-security": "Chapter 13 Bitcoin Security",
  "mbt3-14-second-layer-applications": "Chapter 14 Second-Layer Applications",
  "mbt3-appendix-a-whitepaper":
    "Appendix A The Bitcoin Whitepaper by Satoshi Nakamoto",
  "mbt3-appendix-b-whitepaper-errata":
    "Appendix B Errata to the Bitcoin Whitepaper",
  "mbt3-appendix-c-bips": "Appendix C Bitcoin Improvement Proposals",
  "mbt3-official-final-review": "《Mastering Bitcoin》第3版全书总复习",
  "met2-official-learning-map": "《Mastering Ethereum》第2版权威学习地图",
  "met2-preface": "前言：版本、读者与证据合同",
  "met2-01-what-is-ethereum": "第1章：什么是以太坊",
  "met2-02-ethereum-basics": "第2章：以太坊基础操作",
  "met2-03-ethereum-nodes": "第3章：以太坊节点",
  "met2-04-cryptography": "第4章：密码学",
  "met2-05-wallets": "第5章：钱包",
  "met2-06-transactions": "第6章：交易",
  "met2-07-smart-contracts-solidity": "第7章：智能合约与Solidity",
  "met2-08-smart-contracts-vyper": "第8章：智能合约与Vyper",
  "met2-09-smart-contract-security": "第9章：智能合约安全",
  "met2-10-tokens": "第10章：代币",
  "met2-11-oracles": "第11章：预言机",
  "met2-12-decentralized-applications": "第12章：去中心化应用",
  "met2-13-decentralized-finance": "第13章：去中心化金融",
  "met2-14-ethereum-virtual-machine": "第14章：以太坊虚拟机",
  "met2-15-consensus": "第15章：共识",
  "met2-16-scaling-ethereum": "第16章：扩展以太坊",
  "met2-17-zero-knowledge-proofs": "第17章：零知识证明",
  "met2-official-final-review": "《Mastering Ethereum》第2版全书总复习",
  "ine23-official-learning-map": "《图解新能源汽车原理与构造》权威学习地图",
  "ine23-content-summary": "内容提要：范围与图解方法",
  "ine23-preface": "前言：编写原则与章节分工",
  "ine23-01-classification": "第1章：新能源汽车分类",
  "ine23-02-motors": "第2章：新能源汽车电机",
  "ine23-03-batteries": "第3章：新能源汽车电池",
  "ine23-04-battery-electric-vehicles": "第4章：纯电动汽车",
  "ine23-05-hybrid-vehicles": "第5章：混合动力汽车",
  "ine23-06-fuel-cell-vehicles": "第6章：燃料电池汽车",
  "ine23-07-natural-gas-vehicles": "第7章：天然气汽车",
  "ine23-08-lpg-vehicles": "第8章：液化石油气汽车",
  "ine23-references": "参考文献：车型资料与复核边界",
  "ine23-official-final-review": "《图解新能源汽车原理与构造》全书总复习",
  "csi23-official-learning-map": "《汽车构造&知识全图解》权威学习地图",
  "csi23-book-guide": "本书的使用方法",
  "csi23-prologue": "序章：汽车的前世今生",
  "csi23-01-vehicle-structure": "第1章：汽车的构造",
  "csi23-02-production": "第2章：汽车的生产方式",
  "csi23-03-eco-cars": "第3章：环境友善的汽车",
  "csi23-final-future": "终章：未来的汽车与汽车社会",
  "csi23-index": "索引：术语与系统反向定位",
  "csi23-official-final-review": "《汽车构造&知识全图解》全书总复习",
  "avc2-official-learning-map":
    "《AUTOSAR规范与车用控制器软件开发》权威学习地图",
  "avc2-01-automotive-electronics": "第1章：汽车电子控制系统介绍",
  "avc2-02-autosar-foundations": "第2章：AUTOSAR规范基础理论",
  "avc2-03-example-solutions": "第3章：本书示例及AUTOSAR系统解决方案介绍",
  "avc2-04-swc-development": "第4章：AUTOSAR软件组件级设计与开发",
  "avc2-05-system-design-configuration": "第5章：AUTOSAR系统级设计与配置",
  "avc2-06-rte-bsw": "第6章：AUTOSAR ECU级开发之RTE与BSW（除MCAL外）",
  "avc2-07-mcal": "第7章：AUTOSAR ECU级开发之MCAL",
  "avc2-08-integration-debugging": "第8章：AUTOSAR工程代码集成与调试",
  "avc2-09-functional-safety": "第9章：AUTOSAR与功能安全",
  "avc2-10-outlook": "第10章：AUTOSAR技术展望",
  "avc2-references": "参考文献：规范、工具与证据边界",
  "avc2-official-final-review": "《AUTOSAR规范与车用控制器软件开发》全书总复习",
  "aes23-official-learning-map": "《汽车电子与软件架构》权威学习地图",
  "aes23-foreword": "序：汽车电子与软件架构课程坐标",
  "aes23-preface": "前言：写作范围与学习方法",
  "aes23-01-architecture": "第1章：汽车电子与软件架构",
  "aes23-02-networks": "第2章：车载通信网络",
  "aes23-03-software": "第3章：软件架构与基础软件",
  "aes23-04-soa": "第4章：面向服务的架构",
  "aes23-05-development-ota": "第5章：软件开发流程及其OTA升级",
  "aes23-afterword": "后记与致谢：课程闭环与协作边界",
  "aes23-references": "参考文献：规范、协议与版本裁决",
  "aes23-official-final-review": "《汽车电子与软件架构》全书总复习",
  "tmm40-official-learning-map": "《人月神话》40周年版权威学习地图",
  "tmm40-translator-preface": "译者序：把经典经验放回工程语境",
  "tmm40-20th-anniversary-preface": "20周年纪念版序言：旧命题的新检验",
  "tmm40-first-edition-preface": "第1版序言：经验、样本与外推边界",
  "tmm40-01-tar-pit": "第1章：焦油坑",
  "tmm40-02-man-month": "第2章：人月神话",
  "tmm40-03-surgical-team": "第3章：外科手术队伍",
  "tmm40-04-conceptual-integrity": "第4章：贵族专制、民主政治和系统设计",
  "tmm40-05-second-system-effect": "第5章：画蛇添足",
  "tmm40-06-passing-the-word": "第6章：贯彻执行",
  "tmm40-07-babel": "第7章：为什么巴比伦塔会失败",
  "tmm40-08-calling-the-shot": "第8章：胸有成竹",
  "tmm40-09-ten-pounds": "第9章：削足适履",
  "tmm40-10-documentary-hypothesis": "第10章：提纲挈领",
  "tmm40-11-plan-to-throw-one-away": "第11章：未雨绸缪",
  "tmm40-12-sharp-tools": "第12章：干将莫邪",
  "tmm40-13-whole-and-parts": "第13章：整体部分",
  "tmm40-14-hatching-catastrophe": "第14章：祸起萧墙",
  "tmm40-15-other-face": "第15章：另外一面",
  "tmm40-16-no-silver-bullet": "第16章：没有银弹",
  "tmm40-17-no-silver-bullet-refired": "第17章：再论“没有银弹”",
  "tmm40-18-propositions": "第18章：《人月神话》的观点：是与非",
  "tmm40-19-twenty-years-later": "第19章：20年后的《人月神话》",
  "tmm40-notes-references": "注解与参考文献：证据坐标与版本裁决",
  "tmm40-appendix-practice": "附录：人月落地实战体验",
  "tmm40-official-final-review": "《人月神话》40周年版全书总复习",
  "cc2e-official-learning-map": "《代码大全（第2版）》权威学习地图",
  "cc2e-preface": "前言",
  "cc2e-acknowledgments": "鸣谢",
  "cc2e-checklist-index": "核对表目录",
  "cc2e-table-index": "表目录",
  "cc2e-figure-index": "图目录",
  "cc2e-part-01-foundations": "第1部分：打好基础",
  "cc2e-01-construction-world": "第1章：欢迎进入软件构建的世界",
  "cc2e-02-software-metaphors": "第2章：用隐喻来更充分地理解软件开发",
  "cc2e-03-prerequisites": "第3章：三思而后行：前期准备",
  "cc2e-04-construction-decisions": "第4章：关键的“构建”决策",
  "cc2e-part-02-high-quality-code": "第2部分：创建高质量的代码",
  "cc2e-05-design-in-construction": "第5章：软件构建中的设计",
  "cc2e-06-working-classes": "第6章：可以工作的类",
  "cc2e-07-high-quality-routines": "第7章：高质量的子程序",
  "cc2e-08-defensive-programming": "第8章：防御式编程",
  "cc2e-09-pseudocode-programming-process": "第9章：伪代码编程过程",
  "cc2e-part-03-variables": "第3部分：变量",
  "cc2e-10-general-variable-use": "第10章：使用变量的一般事项",
  "cc2e-11-power-of-variable-names": "第11章：变量名的力量",
  "cc2e-12-fundamental-data-types": "第12章：基本数据类型",
  "cc2e-13-unusual-data-types": "第13章：不常见的数据类型",
  "cc2e-part-04-statements": "第4部分：语句",
  "cc2e-14-straight-line-code": "第14章：组织直线型代码",
  "cc2e-15-conditionals": "第15章：使用条件语句",
  "cc2e-16-loops": "第16章：控制循环",
  "cc2e-17-unusual-control-structures": "第17章：不常见的控制结构",
  "cc2e-18-table-driven-methods": "第18章：表驱动方法",
  "cc2e-19-general-control-issues": "第19章：一般控制问题",
  "cc2e-part-05-code-improvement": "第5部分：代码改善",
  "cc2e-20-software-quality-landscape": "第20章：软件质量概述",
  "cc2e-21-collaborative-construction": "第21章：协同构造",
  "cc2e-22-developer-testing": "第22章：开发者测试",
  "cc2e-23-debugging": "第23章：调试",
  "cc2e-24-refactoring": "第24章：重构",
  "cc2e-25-code-tuning-strategies": "第25章：代码调整策略",
  "cc2e-26-code-tuning-techniques": "第26章：代码调整方法",
  "cc2e-part-06-system-considerations": "第6部分：系统考虑",
  "cc2e-27-program-size": "第27章：程序规模对“构建”的影响",
  "cc2e-28-managing-construction": "第28章：管理“构建”",
  "cc2e-29-integration": "第29章：集成",
  "cc2e-30-programming-tools": "第30章：编程工具",
  "cc2e-part-07-software-craftsmanship": "第7部分：软件工艺",
  "cc2e-31-layout-and-style": "第31章：布局与风格",
  "cc2e-32-self-documenting-code": "第32章：自说明代码",
  "cc2e-33-personal-character": "第33章：个人性格",
  "cc2e-34-software-craftsmanship": "第34章：软件开发艺术的有关问题",
  "cc2e-35-more-information": "第35章：何处有更多信息",
  "cc2e-references": "参考文献",
  "cc2e-index": "索引",
  "cc2e-official-final-review": "《代码大全（第2版）》全书总复习",
  "tpp20-official-learning-map": "《程序员修炼之道（第2版）》权威学习地图",
  "tpp20-foreword": "序",
  "tpp20-second-edition-preface": "新版前言",
  "tpp20-first-edition-preface": "第一版前言",
  "tpp20-chapter-01-pragmatic-philosophy": "第1章 务实的哲学",
  "tpp20-topic-01-your-life": "1 人生是你的",
  "tpp20-topic-02-cat-ate-source-code": "2 我的源码被猫吃了",
  "tpp20-topic-03-software-entropy": "3 软件的熵",
  "tpp20-topic-04-stone-soup-boiled-frogs": "4 石头做的汤和煮熟的青蛙",
  "tpp20-topic-05-good-enough-software": "5 够好即可的软件",
  "tpp20-topic-06-knowledge-portfolio": "6 知识组合",
  "tpp20-topic-07-communicate": "7 交流！",
  "tpp20-chapter-02-pragmatic-approach": "第2章 务实的方法",
  "tpp20-topic-08-essence-good-design": "8 优秀设计的精髓",
  "tpp20-topic-09-dry-duplication": "9 DRY——邪恶的重复",
  "tpp20-topic-10-orthogonality": "10 正交性",
  "tpp20-topic-11-reversibility": "11 可逆性",
  "tpp20-topic-12-tracer-bullets": "12 曳光弹",
  "tpp20-topic-13-prototypes-post-it-notes": "13 原型与便签",
  "tpp20-topic-14-domain-languages": "14 领域语言",
  "tpp20-topic-15-estimating": "15 估算",
  "tpp20-chapter-03-basic-tools": "第3章 基础工具",
  "tpp20-topic-16-power-plain-text": "16 纯文本的威力",
  "tpp20-topic-17-shell-games": "17 Shell游戏",
  "tpp20-topic-18-power-editing": "18 加强编辑能力",
  "tpp20-topic-19-version-control": "19 版本控制",
  "tpp20-topic-20-debugging": "20 调试",
  "tpp20-topic-21-text-manipulation": "21 文本处理",
  "tpp20-topic-22-engineering-daybooks": "22 工程日记",
  "tpp20-chapter-04-pragmatic-paranoia": "第4章 务实的偏执",
  "tpp20-topic-23-design-by-contract": "23 契约式设计",
  "tpp20-topic-24-dead-programs-tell-no-lies": "24 死掉的程序不会说谎",
  "tpp20-topic-25-assertive-programming": "25 断言式编程",
  "tpp20-topic-26-balance-resources": "26 如何保持资源的平衡",
  "tpp20-topic-27-headlights": "27 不要冲出前灯范围",
  "tpp20-chapter-05-bend-or-break": "第5章 宁弯不折",
  "tpp20-topic-28-decoupling": "28 解耦",
  "tpp20-topic-29-juggling-real-world": "29 在现实世界中抛球杂耍",
  "tpp20-topic-30-transforming-programming": "30 变换式编程",
  "tpp20-topic-31-inheritance-tax": "31 继承税",
  "tpp20-topic-32-configuration": "32 配置",
  "tpp20-chapter-06-concurrency": "第6章 并发",
  "tpp20-topic-33-breaking-temporal-coupling": "33 打破时域耦合",
  "tpp20-topic-34-shared-state": "34 共享状态是不正确的状态",
  "tpp20-topic-35-actors-processes": "35 角色与进程",
  "tpp20-topic-36-blackboards": "36 黑板",
  "tpp20-chapter-07-while-coding": "第7章 当你编码时",
  "tpp20-topic-37-lizard-brain": "37 听从蜥蜴脑",
  "tpp20-topic-38-programming-by-coincidence": "38 巧合式编程",
  "tpp20-topic-39-algorithm-speed": "39 算法速度",
  "tpp20-topic-40-refactoring": "40 重构",
  "tpp20-topic-41-test-to-code": "41 为编码测试",
  "tpp20-topic-42-property-based-testing": "42 基于特性测试",
  "tpp20-topic-43-stay-safe": "43 出门在外注意安全",
  "tpp20-topic-44-naming-things": "44 事物命名",
  "tpp20-chapter-08-before-project": "第8章 项目启动之前",
  "tpp20-topic-45-requirements-pit": "45 需求之坑",
  "tpp20-topic-46-impossible-puzzles": "46 处理无法解决的难题",
  "tpp20-topic-47-working-together": "47 携手共建",
  "tpp20-topic-48-essence-agility": "48 敏捷的本质",
  "tpp20-chapter-09-pragmatic-projects": "第9章 务实的项目",
  "tpp20-topic-49-pragmatic-teams": "49 务实的团队",
  "tpp20-topic-50-coconuts-dont-cut-it": "50 椰子派不上用场",
  "tpp20-topic-51-starter-kit": "51 务实的入门套件",
  "tpp20-topic-52-delight-users": "52 取悦用户",
  "tpp20-topic-53-pride-prejudice": "53 傲慢与偏见",
  "tpp20-postface": "跋",
  "tpp20-bibliography": "参考文献",
  "tpp20-exercise-answers": "练习的参考答案",
  "tpp20-translator-postface": "译者跋",
  "tpp20-official-final-review": "《程序员修炼之道（第2版）》全书总复习",
  "poeaa24-official-learning-map": "《企业应用架构模式》权威学习地图",
  "poeaa24-translator-preface": "译者序",
  "poeaa24-preface": "前言",
  "poeaa24-pattern-list": "模式列表",
  "poeaa24-introduction": "引言",
  "poeaa24-part-01-narratives": "第一部分 表述",
  "poeaa24-chapter-01-layering": "第1章 分层",
  "poeaa24-chapter-02-organizing-domain-logic": "第2章 组织领域逻辑",
  "poeaa24-chapter-03-relational-mapping": "第3章 映射到关系数据库",
  "poeaa24-chapter-04-web-presentation": "第4章 Web表示层",
  "poeaa24-chapter-05-concurrency": "第5章 并发",
  "poeaa24-chapter-06-session-state": "第6章 会话状态",
  "poeaa24-chapter-07-distribution-strategies": "第7章 分布策略",
  "poeaa24-chapter-08-putting-together": "第8章 通盘考虑",
  "poeaa24-part-02-patterns": "第二部分 模式",
  "poeaa24-chapter-09-domain-logic-patterns": "第9章 领域逻辑模式",
  "poeaa24-pattern-01-transaction-script": "9.1 事务脚本",
  "poeaa24-pattern-02-domain-model": "9.2 领域模型",
  "poeaa24-pattern-03-table-module": "9.3 表模块",
  "poeaa24-pattern-04-service-layer": "9.4 服务层",
  "poeaa24-chapter-10-data-source-patterns": "第10章 数据源架构模式",
  "poeaa24-pattern-05-table-data-gateway": "10.1 表数据入口",
  "poeaa24-pattern-06-row-data-gateway": "10.2 行数据入口",
  "poeaa24-pattern-07-active-record": "10.3 活动记录",
  "poeaa24-pattern-08-data-mapper": "10.4 数据映射器",
  "poeaa24-chapter-11-object-relational-behavior": "第11章 对象-关系行为模式",
  "poeaa24-pattern-09-unit-of-work": "11.1 工作单元",
  "poeaa24-pattern-10-identity-map": "11.2 标识映射",
  "poeaa24-pattern-11-lazy-load": "11.3 延迟加载",
  "poeaa24-chapter-12-object-relational-structure": "第12章 对象-关系结构模式",
  "poeaa24-pattern-12-identity-field": "12.1 标识字段",
  "poeaa24-pattern-13-foreign-key-mapping": "12.2 外键映射",
  "poeaa24-pattern-14-association-table-mapping": "12.3 关联表映射",
  "poeaa24-pattern-15-dependent-mapping": "12.4 依赖映射",
  "poeaa24-pattern-16-embedded-value": "12.5 嵌入值",
  "poeaa24-pattern-17-serialized-lob": "12.6 序列化LOB",
  "poeaa24-pattern-18-single-table-inheritance": "12.7 单表继承",
  "poeaa24-pattern-19-class-table-inheritance": "12.8 类表继承",
  "poeaa24-pattern-20-concrete-table-inheritance": "12.9 具体表继承",
  "poeaa24-pattern-21-inheritance-mappers": "12.10 继承映射器",
  "poeaa24-chapter-13-object-relational-metadata":
    "第13章 对象-关系元数据映射模式",
  "poeaa24-pattern-22-metadata-mapping": "13.1 元数据映射",
  "poeaa24-pattern-23-query-object": "13.2 查询对象",
  "poeaa24-pattern-24-repository": "13.3 资源库",
  "poeaa24-chapter-14-web-presentation-patterns": "第14章 Web表现模式",
  "poeaa24-pattern-25-model-view-controller": "14.1 模型-视图-控制器",
  "poeaa24-pattern-26-page-controller": "14.2 页面控制器",
  "poeaa24-pattern-27-front-controller": "14.3 前端控制器",
  "poeaa24-pattern-28-template-view": "14.4 模板视图",
  "poeaa24-pattern-29-transform-view": "14.5 转换视图",
  "poeaa24-pattern-30-two-step-view": "14.6 两步视图",
  "poeaa24-pattern-31-application-controller": "14.7 应用控制器",
  "poeaa24-chapter-15-distribution-patterns": "第15章 分布模式",
  "poeaa24-pattern-32-remote-facade": "15.1 远程外观",
  "poeaa24-pattern-33-data-transfer-object": "15.2 数据传输对象",
  "poeaa24-chapter-16-offline-concurrency-patterns": "第16章 离线并发模式",
  "poeaa24-pattern-34-optimistic-offline-lock": "16.1 乐观离线锁",
  "poeaa24-pattern-35-pessimistic-offline-lock": "16.2 悲观离线锁",
  "poeaa24-pattern-36-coarse-grained-lock": "16.3 粗粒度锁",
  "poeaa24-pattern-37-implicit-lock": "16.4 隐含锁",
  "poeaa24-chapter-17-session-state-patterns": "第17章 会话状态模式",
  "poeaa24-pattern-38-client-session-state": "17.1 客户会话状态",
  "poeaa24-pattern-39-server-session-state": "17.2 服务器会话状态",
  "poeaa24-pattern-40-database-session-state": "17.3 数据库会话状态",
  "poeaa24-chapter-18-base-patterns": "第18章 基本模式",
  "poeaa24-pattern-41-gateway": "18.1 入口",
  "poeaa24-pattern-42-mapper": "18.2 映射器",
  "poeaa24-pattern-43-layer-supertype": "18.3 层超类型",
  "poeaa24-pattern-44-separated-interface": "18.4 分离接口",
  "poeaa24-pattern-45-registry": "18.5 注册表",
  "poeaa24-pattern-46-value-object": "18.6 值对象",
  "poeaa24-pattern-47-money": "18.7 货币",
  "poeaa24-pattern-48-special-case": "18.8 特殊情况",
  "poeaa24-pattern-49-plugin": "18.9 插件",
  "poeaa24-pattern-50-service-stub": "18.10 服务桩",
  "poeaa24-pattern-51-record-set": "18.11 记录集",
  "poeaa24-references": "参考文献",
  "poeaa24-official-final-review": "《企业应用架构模式》全书总复习",
  "taoup-official-learning-map": "《UNIX编程艺术》权威学习地图",
  "taoup-preface": "序",
  "taoup-part-01": "第一部分 背景",
  "taoup-chapter-01-philosophy": "第1章 哲学",
  "taoup-chapter-02-history": "第2章 历史——双流记",
  "taoup-chapter-03-contrasts": "第3章 对比：Unix哲学同其他哲学的比较",
  "taoup-part-02": "第二部分 设计",
  "taoup-chapter-04-modularity": "第4章 模块性：保持清晰，保持简洁",
  "taoup-chapter-05-textuality": "第5章 文本化：好协议产生好实践",
  "taoup-chapter-06-transparency": "第6章 透明性：来点儿光",
  "taoup-chapter-07-multiprogramming":
    "第7章 多道程序设计：分离进程为独立的功能",
  "taoup-chapter-08-minilanguages": "第8章 微型语言：寻找歌唱的乐符",
  "taoup-chapter-09-generation": "第9章 生成：提升规格说明的层次",
  "taoup-chapter-10-configuration": "第10章 配置：迈出正确的第一步",
  "taoup-chapter-11-interfaces": "第11章 接口：Unix环境下的用户接口设计模式",
  "taoup-chapter-12-optimization": "第12章 优化",
  "taoup-chapter-13-complexity": "第13章 复杂度：尽可能简单，但别简单过了头",
  "taoup-part-03": "第三部分 实现",
  "taoup-chapter-14-languages": "第14章 语言：C还是非C",
  "taoup-chapter-15-tools": "第15章 工具：开发的战术",
  "taoup-chapter-16-reuse": "第16章 重用：论不要重新发明轮子",
  "taoup-part-04": "第四部分 社区",
  "taoup-chapter-17-portability": "第17章 可移植性：软件可移植性与遵循标准",
  "taoup-chapter-18-documentation": "第18章 文档：向网络世界阐释代码",
  "taoup-chapter-19-open-source": "第19章 开放源码：在Unix新社区中编程",
  "taoup-chapter-20-futures": "第20章 未来：危机与机遇",
  "taoup-appendix-a-glossary-of-abbreviations": "附录A 缩写词表",
  "taoup-appendix-b-references": "附录B 参考文献",
  "taoup-appendix-c-contributors": "附录C 贡献者",
  "taoup-appendix-d-rootless-root": "附录D 无根的根：无名师的Unix心传",
  "taoup-colophon": "Colophon",
  "taoup-index": "索引",
  "taoup-official-final-review": "《UNIX编程艺术》全书总复习",
  "crv18-official-learning-map": "《码农翻身》权威学习地图",
  "crv18-preface": "前言",
  "crv18-chapter-01": "第1章 计算机的世界你不懂",
  "crv18-section-01-01": "1.1 我是一个线程",
  "crv18-section-01-02": "1.2 TCP/IP之大明内阁",
  "crv18-section-01-03": "1.3 TCP/IP之大明邮差",
  "crv18-section-01-04": "1.4 CPU阿甘",
  "crv18-section-01-05": "1.5 我是一个进程",
  "crv18-section-01-06": "1.6 我是一块硬盘",
  "crv18-section-01-07": "1.7 我是一个键盘",
  "crv18-section-01-08": "1.8 数据库的奇妙之旅",
  "crv18-section-01-09": "1.9 搞清楚Socket",
  "crv18-section-01-10": "1.10 从1加到100：一道简单的数学题挑战一下你的大脑",
  "crv18-section-01-11": "1.11 一个翻译家族的发家史",
  "crv18-section-01-12": "1.12 编程世界的那把锁",
  "crv18-section-01-13": "1.13 绕不开的加法器",
  "crv18-section-01-14": "1.14 递归那点事儿",
  "crv18-chapter-02": "第2章 Java帝国",
  "crv18-section-02-01": "2.1 Java：一个帝国的诞生",
  "crv18-section-02-02": "2.2 我是一个Java Class",
  "crv18-section-02-03": "2.3 持久化：Java帝国反击战",
  "crv18-section-02-04": "2.4 JDBC的诞生",
  "crv18-section-02-05": "2.5 Java帝国之宫廷内斗",
  "crv18-section-02-06": "2.6 JSP：一个装配工的没落",
  "crv18-section-02-07": "2.7 Java 帝国之消息队列",
  "crv18-section-02-08": "2.8 Java帝国之动态代理",
  "crv18-section-02-09": "2.9 Java注解是怎么成功上位的",
  "crv18-section-02-10": "2.10 Java帝国之泛型",
  "crv18-section-02-11": "2.11 一个著名的日志系统是怎么设计出来的",
  "crv18-section-02-12": "2.12 序列化：一个老家伙的咸鱼翻身",
  "crv18-section-02-13": "2.13 加锁还是不加锁，这是一个问题",
  "crv18-section-02-14": "2.14 Spring 的本质",
  "crv18-chapter-03": "第3章 浪潮之巅的Web",
  "crv18-section-03-01": "3.1 Web的起源",
  "crv18-section-03-02": "3.2 两个程序的爱情故事",
  "crv18-section-03-03": "3.3 一个故事讲完HTTPS",
  "crv18-section-03-04": "3.4 机房夜话",
  "crv18-section-03-05": "3.5 从密码到token，一个有关授权的故事",
  "crv18-section-03-06": "3.6 后端风云",
  "crv18-section-03-07": "3.7 我是一个函数",
  "crv18-section-03-08": "3.8 从SOA到微服务",
  "crv18-section-03-09": "3.9 什么是框架",
  "crv18-section-03-10": "3.10 HTTP Server：一个差生的逆袭",
  "crv18-chapter-04": "第4章 代码管理那些事儿",
  "crv18-section-04-01": "4.1 版本管理简史",
  "crv18-section-04-02": "4.2 Build的演进之路",
  "crv18-section-04-03": "4.3 烂代码传奇",
  "crv18-section-04-04": "4.4 敏捷下的单元测试",
  "crv18-section-04-05": "4.5 再见！Bug",
  "crv18-chapter-05": "第5章 我的编程语言简史",
  "crv18-section-05-01": "5.1 JavaScript ：一个草根的逆袭",
  "crv18-section-05-02": "5.2 Node.js：我只需要一个店小二",
  "crv18-section-05-03": "5.3 C老头儿和Java小子的硬盘夜话",
  "crv18-section-05-04": "5.4 编程语言的“爱恨情仇”",
  "crv18-section-05-05": "5.5 命令式编程 VS 声明式编程",
  "crv18-chapter-06": "第6章 老司机的精进",
  "crv18-section-06-01": "6.1 凡事必先骑上虎背，和性格内向的程序员聊几句",
  "crv18-section-06-02": "6.2 码农需要知道的“潜规则”",
  "crv18-section-06-03": "6.3 15年编程生涯，一名架构师的总结",
  "crv18-section-06-04": "6.4 对自己狠一点，开始写作吧",
  "crv18-section-06-05": "6.5 学习编程的四兄弟",
  "crv18-official-final-review": "《码农翻身》全书综合复核",
  "mis18-official-learning-map": "《认知天性》权威学习地图",
  "mis18-recommendation-01": "推荐序一 轻松的学习是无效的",
  "mis18-recommendation-02": "推荐序二 学习不止技巧",
  "mis18-preface": "前言",
  "mis18-chapter-01": "1 学习是挑战天性的必修课",
  "mis18-chapter-02": "2 学习的本质：知识链和记忆结",
  "mis18-chapter-03": "3 “后刻意练习”时代的到来",
  "mis18-chapter-04": "4 知识的“滚雪球”效应",
  "mis18-chapter-05": "5 打造适合自己的心智模型",
  "mis18-chapter-06": "6 选择适合自己的学习风格",
  "mis18-chapter-07": "7 终身学习者基本的基本",
  "mis18-chapter-08": "8 写给大家的学习策略",
  "mis18-suggested-reading": "推荐阅读",
  "mis18-acknowledgments": "致谢",
  "mis18-official-final-review": "《认知天性》全书综合复核",
  "msg17-official-learning-map": "《终身成长》权威学习地图",
  "msg17-introduction": "引言",
  "msg17-chapter-01": "第 1 章 思维模式",
  "msg17-chapter-02": "第 2 章 思维模式解析",
  "msg17-chapter-03": "第 3 章 关于能力和成就的真相",
  "msg17-chapter-04": "第 4 章 体育：冠军的思维模式",
  "msg17-chapter-05": "第 5 章 商业：思维模式和领导力",
  "msg17-chapter-06": "第 6 章 人际关系：关于相处的思维模式",
  "msg17-chapter-07": "第 7 章 父母、老师与教练：思维模式的传播",
  "msg17-chapter-08": "第 8 章 改变思维模式",
  "msg17-publishing-postscript": "出版后记",
  "msg17-official-final-review": "《终身成长》全书综合复核",
  "pdp16-official-learning-map": "《刻意练习》权威学习地图",
  "pdp16-copyright": "版权信息",
  "pdp16-to-readers": "致读者",
  "pdp16-praise": "赞誉",
  "pdp16-recommendation": "推荐序",
  "pdp16-author-statement": "作者声明",
  "pdp16-introduction": "引言 天才存在吗",
  "pdp16-chapter-01": "第1章 有目的的练习",
  "pdp16-chapter-02": "第2章 大脑的适应能力",
  "pdp16-chapter-03": "第3章 心理表征",
  "pdp16-chapter-04": "第4章 黄金标准",
  "pdp16-chapter-05": "第5章 在工作中运用刻意练习原则",
  "pdp16-chapter-06": "第6章 在生活中运用刻意练习原则",
  "pdp16-chapter-07": "第7章 成为杰出人物的路线图",
  "pdp16-chapter-08": "第8章 怎样解释天生才华",
  "pdp16-chapter-09": "第9章 用刻意练习创造全新的世界",
  "pdp16-references-notes": "参考文献和注释",
  "pdp16-official-final-review": "《刻意练习》全书综合复核",
  "ooc16-official-learning-map": "《失控》权威学习地图",
  "ooc16-chinese-preface": "致《失控》中文版",
  "ooc16-chapter-01": "第1章 人造与天生",
  "ooc16-chapter-02": "第2章 蜂群思维",
  "ooc16-chapter-03": "第3章 有心智的机器",
  "ooc16-chapter-04": "第4章 组装复杂性",
  "ooc16-chapter-05": "第5章 共同进化",
  "ooc16-chapter-06": "第6章 自然之流变",
  "ooc16-chapter-07": "第7章 控制的兴起",
  "ooc16-chapter-08": "第8章 封闭系统",
  "ooc16-chapter-09": "第9章 “冒出”的生态圈",
  "ooc16-chapter-10": "第10章 工业生态学",
  "ooc16-chapter-11": "第11章 网络经济学",
  "ooc16-chapter-12": "第12章 电子货币",
  "ooc16-chapter-13": "第13章 上帝的游戏",
  "ooc16-chapter-14": "第14章 在形式的图书馆中",
  "ooc16-chapter-15": "第15章 人工进化",
  "ooc16-chapter-16": "第16章 控制的未来",
  "ooc16-chapter-17": "第17章 开放的宇宙",
  "ooc16-chapter-18": "第18章 有组织的变化之架构",
  "ooc16-chapter-19": "第19章 后达尔文主义",
  "ooc16-chapter-20": "第20章 沉睡的蝴蝶",
  "ooc16-chapter-21": "第21章 水往高处流",
  "ooc16-chapter-22": "第22章 预言机",
  "ooc16-chapter-23": "第23章 整体，空洞，以及空间",
  "ooc16-chapter-24": "第24章 九律",
  "ooc16-translator-postscript": "译后记：“失控”的协作与进化",
  "ooc16-official-final-review": "《失控》全书综合复核",
  "eex19-official-learning-map": "《卓有成效的管理者》权威学习地图",
  "eex19-recommendation-01": "推荐序一（邵明路）",
  "eex19-recommendation-02": "推荐序二（赵曙明）",
  "eex19-recommendation-03": "推荐序三（珍妮·达罗克）",
  "eex19-preface": "前言",
  "eex19-chapter-01": "第1章 卓有成效是可以学会的",
  "eex19-chapter-02": "第2章 掌握自己的时间",
  "eex19-chapter-03": "第3章 我能贡献什么",
  "eex19-chapter-04": "第4章 如何发挥人的长处",
  "eex19-chapter-05": "第5章 要事优先",
  "eex19-chapter-06": "第6章 决策的要素",
  "eex19-chapter-07": "第7章 有效的决策",
  "eex19-chapter-08": "第8章 结论：管理者必须卓有成效",
  "eex19-official-final-review": "《卓有成效的管理者》全书综合复核",
  "opt-23-official-learning-map": "《引导工具箱》权威学习地图",
  "opt-23-introduction": "导论 公司内的讨论流程：成为引导顾问",
  "opt-23-chapter-01": "第1章 入门套装：一定要掌握的8个工具",
  "opt-23-chapter-02": "第2章 初级套装：让思考更简单的13个工具",
  "opt-23-chapter-03": "第3章 中级套装：助你开会轻松又有条理的16个工具",
  "opt-23-chapter-04": "第4章 高级套装：提高执行力的12个工具",
  "opt-23-afterword": "后记",
  "opt-23-official-final-review": "《引导工具箱》全书综合复核",
};

/** 等级 → 短标签（卡片徽标文案）。 */
export const LEVEL_LABELS: Record<ReviewLevel, string> = {
  1: "L1 认记",
  2: "L2 理解",
  3: "L3 应用",
  4: "L4 综合",
};
