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
  | "adp-android-app-basic-structure"
  | "adp-mvp-application-structure"
  | "adp-mvvm-application-structure"
  | "adp-differential-development-design"
  | "adp-designer-role-in-oss"
  | "adp-flux-architecture"
  | "adp-team-and-architecture"
  | "adp-android-architecture-components"
  | "adp-kotlin-impact-on-design"
  | "adp-design-question-square"
  | "gea3-introduction"
  | "gea3-tools-of-the-trade"
  | "gea3-software-engineering-for-games"
  | "gea3-parallelism-and-concurrency"
  | "gea3-3d-math-for-games"
  | "gea3-engine-support-systems"
  | "gea3-resources-and-file-system"
  | "gea3-game-loop-real-time-simulation"
  | "gea3-human-interface-devices"
  | "gea3-debugging-and-development-tools"
  | "gea3-rendering-engine"
  | "gea3-animation-systems"
  | "gea3-collision-and-rigid-body-dynamics"
  | "gea3-audio"
  | "gea3-gameplay-systems-introduction"
  | "gea3-runtime-gameplay-foundation-systems"
  | "gea3-you-mean-theres-more"
  | "gm3d-cartesian-coordinate-systems"
  | "gm3d-vectors"
  | "gm3d-multiple-coordinate-spaces"
  | "gm3d-matrices"
  | "gm3d-linear-transformations"
  | "gm3d-homogeneous-and-projection"
  | "gm3d-polar-coordinate-systems"
  | "gm3d-rotations-in-three-dimensions"
  | "gm3d-quaternions"
  | "gm3d-geometric-primitives"
  | "gm3d-mathematical-topics-in-3d-graphics"
  | "gm3d-mechanics"
  | "gm3d-curves-in-3d"
  | "gm3d-afterword-and-review"
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
  | "android-architecture"
  | "system-startup"
  | "app-process-startup"
  | "component-workflow"
  | "context"
  | "ams"
  | "window-manager"
  | "wms"
  | "jni-principle"
  | "java-vm"
  | "dalvik-art"
  | "classloader"
  | "hotfix-principle"
  | "hook-technology"
  | "plugin-principle"
  | "draw-optimization"
  | "memory-optimization"
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
  // Profiling Unity Games
  | "prof-profiling-workflow-baseline"
  | "prof-cpu-profiler-deep-dive"
  | "prof-gpu-performance-analysis"
  | "prof-memory-profiler"
  | "prof-profile-analyzer-regression"
  | "prof-power-optimization"
  | "prof-platform-specific-profiling"
  // Mobile/XR/Web Optimization
  | "mxrw-urp-optimization"
  | "mxrw-mobile-optimization"
  | "mxrw-xr-specific-optimization"
  | "mxrw-web-specific-optimization"
  | "mxrw-cross-platform-checklist"
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
  // Unity 5 权威讲解
  | "u5-editor-project"
  | "u5-gameobject-component"
  | "u5-transform-coordinate"
  | "u5-monobehaviour-lifecycle"
  | "u5-scripting-objects"
  | "u5-coroutines-time"
  | "u5-rigidbody-collider"
  | "u5-collision-raycast"
  | "u5-mecanim"
  | "u5-ugui"
  | "u5-materials-lighting"
  | "u5-prefabs-assets"
  | "u5-build-deploy"
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
  | "gpp-learning-map"
  | "gpp-intro"
  | "gpp-gof-in-games"
  | "gpp-game-loop"
  | "gpp-update-method"
  | "gpp-double-buffer"
  | "gpp-subclass-sandbox"
  | "gpp-type-object"
  | "gpp-component"
  | "gpp-event-queue"
  | "gpp-service-locator"
  | "gpp-data-locality"
  | "gpp-dirty-flag"
  | "gpp-object-pool"
  | "gpp-spatial-partition"
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
  | "aae-final-review";

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
  "adp-android-app-basic-structure": "Android 应用的基本构成",
  "adp-mvp-application-structure": "MVP 模式应用构成",
  "adp-mvvm-application-structure": "MVVM 模式应用构成",
  "adp-differential-development-design": "差分开发中的设计方法",
  "adp-designer-role-in-oss": "OSS 中设计者的角色",
  "adp-flux-architecture": "Flux 架构",
  "adp-team-and-architecture": "团队与架构",
  "adp-android-architecture-components": "Android Architecture Components",
  "adp-kotlin-impact-on-design": "Kotlin 对设计的影响",
  "adp-design-question-square": "设计问答广场",
  "gea3-introduction": "引言：游戏引擎到底是什么",
  "gea3-tools-of-the-trade": "工具与工作流",
  "gea3-software-engineering-for-games": "游戏软件工程基础",
  "gea3-parallelism-and-concurrency": "并行与并发编程",
  "gea3-3d-math-for-games": "游戏中的 3D 数学",
  "gea3-engine-support-systems": "引擎支撑系统",
  "gea3-resources-and-file-system": "资源与文件系统",
  "gea3-game-loop-real-time-simulation": "游戏循环与实时模拟",
  "gea3-human-interface-devices": "人机输入设备",
  "gea3-debugging-and-development-tools": "调试与开发工具",
  "gea3-rendering-engine": "渲染引擎",
  "gea3-animation-systems": "动画系统",
  "gea3-collision-and-rigid-body-dynamics": "碰撞与刚体动力学",
  "gea3-audio": "音频",
  "gea3-gameplay-systems-introduction": "玩法系统导论",
  "gea3-runtime-gameplay-foundation-systems": "运行时玩法基础系统",
  "gea3-you-mean-theres-more": "远不止这些：引擎架构地图",
  "gm3d-cartesian-coordinate-systems": "笛卡尔坐标系统",
  "gm3d-vectors": "向量",
  "gm3d-multiple-coordinate-spaces": "多个坐标空间",
  "gm3d-matrices": "矩阵",
  "gm3d-linear-transformations": "线性变换",
  "gm3d-homogeneous-and-projection": "齐次坐标与投影矩阵",
  "gm3d-polar-coordinate-systems": "极坐标系统",
  "gm3d-rotations-in-three-dimensions": "三维旋转",
  "gm3d-quaternions": "四元数",
  "gm3d-geometric-primitives": "几何图元",
  "gm3d-mathematical-topics-in-3d-graphics": "3D 图形学数学主题",
  "gm3d-mechanics": "力学",
  "gm3d-curves-in-3d": "3D 曲线",
  "gm3d-afterword-and-review": "后记与全书复习",
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
  "android-architecture": "Android 系统架构",
  "system-startup": "Android 系统启动",
  "app-process-startup": "应用程序进程启动",
  "component-workflow": "四大组件的工作过程",
  context: "理解上下文 Context",
  ams: "理解 AMS",
  "window-manager": "理解 WindowManager",
  wms: "理解 WMS",
  "jni-principle": "JNI 原理",
  "java-vm": "Java 虚拟机",
  "dalvik-art": "Dalvik 和 ART",
  classloader: "理解 ClassLoader",
  "hotfix-principle": "热修复原理",
  "hook-technology": "Hook 技术",
  "plugin-principle": "插件化原理",
  "draw-optimization": "绘制优化",
  "memory-optimization": "内存优化",
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
  // Profiling Unity Games
  "prof-profiling-workflow-baseline": "Profiling 工作流与基线",
  "prof-cpu-profiler-deep-dive": "CPU Profiler 深度使用",
  "prof-gpu-performance-analysis": "GPU 性能分析",
  "prof-memory-profiler": "Memory Profiler 内存分析",
  "prof-profile-analyzer-regression": "Profile Analyzer 与回归测试",
  "prof-power-optimization": "功耗优化",
  "prof-platform-specific-profiling": "平台专项 Profiling",
  // Mobile/XR/Web Optimization
  "mxrw-urp-optimization": "URP 专项优化",
  "mxrw-mobile-optimization": "移动端性能优化",
  "mxrw-xr-specific-optimization": "XR 专项优化",
  "mxrw-web-specific-optimization": "Web 专项优化",
  "mxrw-cross-platform-checklist": "跨平台性能检查清单",
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
  // Unity 5 权威讲解
  "u5-editor-project": "编辑器与项目结构",
  "u5-gameobject-component": "GameObject 与组件模型",
  "u5-transform-coordinate": "场景、Transform 与坐标空间",
  "u5-monobehaviour-lifecycle": "MonoBehaviour 生命周期",
  "u5-scripting-objects": "脚本控制对象与组件",
  "u5-coroutines-time": "协程与时间",
  "u5-rigidbody-collider": "刚体与碰撞器",
  "u5-collision-raycast": "碰撞触发事件与射线检测",
  "u5-mecanim": "Mecanim 动画状态机",
  "u5-ugui": "uGUI 界面系统",
  "u5-materials-lighting": "材质、光照与渲染基础",
  "u5-prefabs-assets": "预制体与资源管线",
  "u5-build-deploy": "构建与发布",
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
  "gpp-learning-map": "游戏编程模式全书学习地图",
  "gpp-intro": "架构、性能与游戏",
  "gpp-gof-in-games": "GoF 模式游戏速览",
  "gpp-game-loop": "游戏循环",
  "gpp-update-method": "更新方法",
  "gpp-double-buffer": "双缓冲",
  "gpp-subclass-sandbox": "子类沙箱",
  "gpp-type-object": "类型对象",
  "gpp-component": "组件模式",
  "gpp-event-queue": "事件队列",
  "gpp-service-locator": "服务定位器",
  "gpp-data-locality": "数据局部性",
  "gpp-dirty-flag": "脏标记",
  "gpp-object-pool": "对象池",
  "gpp-spatial-partition": "空间分区",
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
};

/** 等级 → 短标签（卡片徽标文案）。 */
export const LEVEL_LABELS: Record<ReviewLevel, string> = {
  1: "L1 认记",
  2: "L2 理解",
  3: "L3 应用",
  4: "L4 综合",
};
