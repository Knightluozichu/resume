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
  | "ai-production-deployment";

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
};

/** 等级 → 短标签（卡片徽标文案）。 */
export const LEVEL_LABELS: Record<ReviewLevel, string> = {
  1: "L1 认记",
  2: "L2 理解",
  3: "L3 应用",
  4: "L4 综合",
};
