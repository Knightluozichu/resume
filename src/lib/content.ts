import "server-only";

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

/**
 * MDX 内容索引（HEL-18，HEL-48 书化）
 *
 * 内容以 .mdx 文件存仓库：content/<book-slug>/<section-slug>/<chapter-slug>.mdx
 * 「书」= content/ 下的顶层目录（如 learnopengl），为多书扩展打地基。
 * 本模块在构建期（SSG）扫描 content/，解析 frontmatter，提供类型安全的章节索引。
 *
 * 仅供 Server Component / 构建期使用（server-only 守卫）。
 */

/** 章节类型：A 概念型 | B 数学型 | C 实战型 | D 对比型（见 docs/chapter-spec.md §〇） */
export type ChapterType = "A" | "B" | "C" | "D";

/** 章节 frontmatter（与 docs/chapter-template.mdx 字段一一对应） */
export interface ChapterFrontmatter {
  /** 章节标题（与 LearnOpenGL-CN 对应章名一致） */
  title: string;
  /** 章节类型 */
  type: ChapterType;
  /** 所属 section（入门 | 光照 | 模型加载 | 高级OpenGL | 高级光照 | PBR） */
  section: string;
  /** 在所属 section 内的顺序 */
  order: number;
  /** 一句话——读完这章你能做出什么 */
  description: string;
  /** 是否含交互 Demo */
  demo: boolean;
  /** 本章是否含数学推导节 */
  math: boolean;
  /** 总监按 chapter-spec.md 逐节 review 通过前不得改为 false */
  draft: boolean;
  /** 改编出处链接（LearnOpenGL-CN） */
  sourceUrl: string;
}

/** 章节元信息：frontmatter + 路由 slug + 原始正文（不含 frontmatter） */
export interface ChapterMeta {
  /** book slug（来自顶层目录名，用于 URL 第一段） */
  bookSlug: string;
  /** section slug（来自目录名，用于 URL 第二段） */
  sectionSlug: string;
  /** chapter slug（来自文件名，用于 URL 第三段） */
  chapterSlug: string;
  /** 已解析的 frontmatter */
  frontmatter: ChapterFrontmatter;
  /** MDX 正文（已剥离 frontmatter） */
  source: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content");

/**
 * 书的教学顺序（总监指定，HEL-48）。
 *
 * 侧边栏分书与全局上/下一章顺序均以此为准。未列入的书排在已知书之后，
 * 组内再按 bookSlug 稳定回退，保证新增书也有确定顺序。
 */
export const BOOK_ORDER = [
  "grokking-algorithms-2e",
  "game-math-3d",
  "learnopengl",
  "game-engine-architecture-3e",
  "game-engine-practice-vol1",
  "game-engine-practice-vol2",
  "real-time-collision-detection",
  "cpp-primer-5e",
  "c-primer-plus",
  "coding-interviews",
  "big-nerd-ranch-guide",
  "android-design-patterns",
  "android-advanced-decryption",
  "unity-game-optimization",
  "profiling-unity-games",
  "mobile-xr-web-optimization",
  "auto-why-car-runs",
  "cpp-concurrency",
  "unity5",
  "ai-agent-dev",
  "ai-agent",
  "ai-agent-apps",
  "design-patterns",
  "game-programming-patterns",
  "code-quality-refactoring",
  "architecture-domain-design",
  "advanced-algorithm-engineering",
  "automotive-systems-specialization",
  "vehicle-software-intelligence",
  "the-c-programming-language",
  "beginning-cpp-game-programming",
  "effective-cpp",
  "effective-modern-cpp",
  "cpp-high-performance",
  "inside-cpp-object-model",
  "optimized-cpp",
  "modern-cpp-design",
  "cpu-eye-cpp",
  "easy-cpp-5e",
  "cpp-primer-plus",
  "cpp-testing-recipes",
  "cpp-server-essence",
  "head-first-design-patterns",
  "essential-csharp-7",
  "csharp-quality-code",
  "effective-csharp",
  "deep-understanding-csharp",
  "csharp-functional-programming",
  "csharp-10-core",
  "clr-via-csharp",
  "dotnet-memory",
  "rust-programming-language",
  "go-programming-language",
  "python-crash-course",
  "lua-programming",
  "ruby-programming",
  "data-structures-visual",
  "math-girl",
  "dsa-cpp",
  "rust-way",
  "go-in-action",
  "go-web-programming",
  "fluent-python",
  "python-ops",
  "mastering-rust-2e",
  "python-advanced",
  "algorithms-4e",
  "programming-pearls",
  "competitive-algorithms",
  "introduction-to-algorithms",
  "hackers-delight",
  "taocp",
  "programmers-math",
  "head-first-statistics",
  "linear-algebra-done-right",
  "concrete-mathematics",
  "geometric-data-structures",
  "ray-tracing-weekend",
  "deep-opengl",
  "vulkan-guide",
  "computer-graphics-4e",
  "opengl-redbook",
  "opengl-superbible",
  "gpu-gems",
  "real-time-rendering-4e",
  "cg-principles-practice",
  "pbrt-book",
  "global-illumination",
  "unity-shader-essentials",
  "shader-practice",
  "unity-shaderlab",
  "unity-screen-effects",
  "unity-urp-shaders",
  "gpu-pro",
  "shaderx",
  // §6 游戏开发
  "unity-hmi",
  "game-design-fundamentals",
  "game-mechanics-advanced",
  "game-programmer-path",
  "unity-ui-design",
  "unity-scripting",
  "unity-animation",
  "blender-3d",
  "unity-core-tech",
  "unity-game-cases",
  "unity-vfx",
  "unity-scripting-game-dev",
  "unity-master",
  "unity-advanced-programming",
  "game-server-programming",
  "unity-mmo-game",
  "unity-cpp-network-game",
  "multiplayer-game-architecture",
  "game-network-core-tech",
  "game-server-architecture",
  "multiplayer-game-programming",
  "javascript-pro-guide",
  "vuejs-practice",
  "vuejs-design-implementation",
  "you-dont-know-js",
  "javascript-definitive-guide",
  "javascript-fullstack",
  "css-world",
  "css-secrets",
  "nodejs-definitive-guide",
  "nodejs-debugging-guide",
  "deep-nodejs",
  "frontend-engineering",
  "how-computers-work",
  "how-programs-work",
  "csapp",
  "modern-os",
  "os-concepts",
  "windows-journey",
  "linux-os-practice",
  "mfc-deep-dive",
  "windows-kernel-programming",
  "linux-kernel-essence",
  "linux-kernel-design",
  "unix-advanced-programming",
  "head-first-java",
  "java-core-tech",
  "effective-java",
  "spring-in-action",
  "jvm-troubleshooting",
  "deep-understanding-jvm",
  "jvm-g1-tuning",
  "gc-handbook",
  "first-line-android",
  "crazy-android",
  "kotlin-definitive-guide",
  "android-art-exploration",
  "kotlin-in-action",
  "android-component-arch",
  "android-perf-optimization",
  "jetpack-compose",
  "android-advanced-light",
  "deep-android-kernel",
  "deep-android-volumes",
  "mysql-essentials",
  "sql-ten-minutes",
  "database-system-concepts",
  "high-performance-mysql",
  "ddia",
  "redis-design-implementation",
  "kafka-definitive-guide",
  "rabbitmq-practice",
  "kong-gateway",
  "kubernetes-in-action",
  "phoenix-architecture",
  "microservices-patterns",
  "illustrated-http",
  "illustrated-server-network",
  "computer-networks-top-down",
  "http-definitive-guide",
  "wireshark-packet-analysis",
  "tcp-ip-illustrated-vol1",
  "unix-network-programming-vol1",
  "two-week-scripting-language",
  "crafting-compiler",
  "engineering-a-compiler",
  "dragon-book-compilers",
  "tiger-book-compiler",
  "illustrated-ai",
  "illustrated-ml",
  "illustrated-dl",
  "machine-learning-watermelon",
] as const;

/** book slug → 书显示名（侧边栏书头、列表页书标题）。 */
export const BOOK_TITLES: Record<string, string> = {
  "grokking-algorithms-2e": "算法图解（第2版）",
  "game-math-3d": "游戏和图形学的 3D 数学",
  learnopengl: "LearnOpenGL",
  "game-engine-architecture-3e": "游戏引擎架构（第三版）",
  "game-engine-practice-vol1": "游戏引擎原理与实践·卷1",
  "game-engine-practice-vol2": "游戏引擎原理与实践·卷2",
  "real-time-collision-detection": "实时碰撞检测算法技术",
  "cpp-primer-5e": "C++ Primer 第5版",
  "c-primer-plus": "C Primer Plus（第6版）",
  "coding-interviews": "剑指Offer：名企面试官精讲典型编程题（第2版）",
  "big-nerd-ranch-guide": "Android 编程权威指南（第4版）",
  "android-design-patterns": "Android アプリ设计パターン入门",
  "android-advanced-decryption": "Android进阶解密",
  "unity-game-optimization": "Unity 游戏优化",
  "profiling-unity-games": "Unity Profiling 指南",
  "mobile-xr-web-optimization": "Unity Mobile/XR/Web 优化",
  "auto-why-car-runs": "汽车为什么会跑：图解汽车构造与原理",
  "cpp-concurrency": "C++ 并发编程实战（第2版）",
  unity5: "Unity 5 权威讲解",
  "ai-agent-dev": "AI Agent 开发实战",
  "ai-agent": "从零构建 AI Agent",
  "ai-agent-apps": "AI 智能体应用开发",
  "design-patterns": "设计模式：GoF 23 模式图解",
  "game-programming-patterns": "游戏编程模式",
  "code-quality-refactoring": "代码质量与重构",
  "architecture-domain-design": "架构与领域设计",
  "advanced-algorithm-engineering": "高级算法与算法工程",
  "automotive-systems-specialization": "汽车系统专项",
  "vehicle-software-intelligence": "车载软件与智能化",
  "the-c-programming-language": "C 程序设计语言（K&R）",
  "beginning-cpp-game-programming": "C++ 游戏编程入门",
  "effective-cpp": "Effective C++",
  "effective-modern-cpp": "Effective Modern C++",
  "cpp-high-performance": "C++ 高性能编程",
  "inside-cpp-object-model": "深度探索 C++ 对象模型",
  "optimized-cpp": "C++ 性能优化指南",
  "modern-cpp-design": "Modern C++ Design",
  "cpu-eye-cpp": "CPU 眼里的 C++",
  "easy-cpp-5e": "Easy C++（第5版）",
  "cpp-primer-plus": "C++ Primer Plus",
  "cpp-testing-recipes": "C++ 编程测试秘籍",
  "cpp-server-essence": "C++ 服务器开发精髓",
  "head-first-design-patterns": "Head First 设计模式",
  "essential-csharp-7": "C# 7.0 本质论",
  "csharp-quality-code": "编写高质量代码：改善 C# 程序的 157 个建议",
  "effective-csharp": "Effective C#",
  "deep-understanding-csharp": "深入理解 C#",
  "csharp-functional-programming": "C# 函数式编程",
  "csharp-10-core": "C# 10 核心技术指南",
  "clr-via-csharp": "CLR via C#",
  "dotnet-memory": ".NET 内存管理宝典",
  "rust-programming-language": "Rust 程序设计语言",
  "go-programming-language": "Go 程序设计语言",
  "python-crash-course": "Python 编程：从入门到实践",
  "lua-programming": "Lua 程序设计",
  "ruby-programming": "Ruby 基础教程",
  "data-structures-visual": "大话数据结构",
  "math-girl": "图灵数学女孩系列",
  "dsa-cpp": "数据结构与算法分析（C++描述）",
  "rust-way": "Rust 编程之道",
  "go-in-action": "Go 语言实战",
  "go-web-programming": "Go Web 编程",
  "fluent-python": "流畅的 Python",
  "python-ops": "Python 自动化运维",
  "mastering-rust-2e": "精通 Rust（第2版）",
  "python-advanced": "Python 高级编程",
  "algorithms-4e": "算法（第4版）",
  "programming-pearls": "编程珠玑",
  "competitive-algorithms": "深入浅出竞赛算法",
  "introduction-to-algorithms": "算法导论",
  "hackers-delight": "算法心得",
  taocp: "计算机程序设计艺术",
  "programmers-math": "程序员的数学",
  "head-first-statistics": "深入浅出统计学",
  "linear-algebra-done-right": "线性代数应该这样学",
  "concrete-mathematics": "具体数学",
  "geometric-data-structures": "计算机图形学：几何体数据结构",
  "ray-tracing-weekend": "Ray Tracing in One Weekend",
  "deep-opengl": "深入理解 OpenGL WebGL OpenGL ES",
  "vulkan-guide": "Vulkan 学习指南",
  "computer-graphics-4e": "计算机图形学第4版",
  "opengl-redbook": "OpenGL 红宝书",
  "opengl-superbible": "OpenGL 超级宝典",
  "gpu-gems": "GPU Gems 系列",
  "real-time-rendering-4e": "实时渲染第4版",
  "cg-principles-practice": "计算机图形学：原理及实践",
  "pbrt-book": "基于物理的渲染 PBRT",
  "global-illumination": "全局光照技术",
  "unity-shader-essentials": "Unity Shader 入门精要",
  "shader-practice": "Shader 开发实战",
  "unity-shaderlab": "Unity ShaderLab 开发实战详解",
  "unity-screen-effects": "Unity 着色器和屏幕特效",
  "unity-urp-shaders": "Unity URP 内置 Shader 解析",
  "gpu-pro": "GPU Pro 系列",
  shaderx: "ShaderX 系列",
  "unity-hmi": "Unity HMI 开发",
  "game-design-fundamentals": "游戏设计基础",
  "game-mechanics-advanced": "游戏机制：高级游戏设计技术",
  "game-programmer-path": "游戏程序员之路",
  "unity-ui-design": "Unity UI 设计",
  "unity-scripting": "Unity 脚本编程",
  "unity-animation": "Unity 动画",
  "blender-3d": "Blender 3D",
  "unity-core-tech": "Unity 核心技术",
  "unity-game-cases": "Unity 游戏案例",
  "unity-vfx": "Unity 3D 游戏特效制作典型实例",
  "unity-scripting-game-dev": "Unity 3D 脚本编程与游戏开发",
  "unity-master": "Unity 神技达人炼成记",
  "unity-advanced-programming": "Unity 3D 高级编程之进阶主程",
  "game-server-programming": "网络游戏服务器端编程",
  "unity-mmo-game": "Unity 3D 网游游戏实战",
  "unity-cpp-network-game": "Unity 与 C++ 网络游戏开发实战",
  "multiplayer-game-architecture": "多人在线游戏架构与开发实战",
  "game-network-core-tech": "网络游戏核心技术与实战",
  "game-server-architecture": "游戏服务器架构与优化",
  "multiplayer-game-programming": "Multiplayer Game Programming",
  "javascript-pro-guide": "JavaScript高级程序设计（第4版）",
  "vuejs-practice": "Vue.js从入门到项目实战",
  "vuejs-design-implementation": "Vue.js设计与实现",
  "you-dont-know-js": "你不知道的JavaScript",
  "javascript-definitive-guide": "JavaScript权威指南（第7版）",
  "javascript-fullstack": "JavaScript全栈开发",
  "css-world": "CSS世界",
  "css-secrets": "CSS揭秘",
  "nodejs-definitive-guide": "Node.js权威指南",
  "nodejs-debugging-guide": "Node.js调试指南",
  "deep-nodejs": "深入浅出Node.js",
  "frontend-engineering": "前端工程化体系设计与实践",
  "how-computers-work": "计算机是怎么跑起来的",
  "how-programs-work": "程序是怎么跑起来的",
  "csapp": "深入理解计算机系统（CSAPP）",
  "modern-os": "现代操作系统（第4版）",
  "os-concepts": "操作系统概念（恐龙书）",
  "windows-journey": "Windows逐梦旅程",
  "linux-os-practice": "Linux操作系统实战",
  "mfc-deep-dive": "深入浅出MFC",
  "windows-kernel-programming": "Windows内核编程",
  "linux-kernel-essence": "Linux内核精髓",
  "linux-kernel-design": "Linux内核设计与实现",
  "unix-advanced-programming": "UNIX环境高级编程",
  "head-first-java": "Head First Java",
  "java-core-tech": "Java核心技术",
  "effective-java": "Effective Java",
  "spring-in-action": "Spring in Action",
  "jvm-troubleshooting": "JVM故障诊断与性能优化",
  "deep-understanding-jvm": "深入理解Java虚拟机",
  "jvm-g1-tuning": "JVM G1源码分析和调优",
  "gc-handbook": "垃圾回收算法手册",
  "first-line-android": "第一行代码Android",
  "crazy-android": "疯狂Android讲义",
  "kotlin-definitive-guide": "Kotlin编程权威指南",
  "android-art-exploration": "Android开发艺术探索",
  "kotlin-in-action": "Kotlin实战",
  "android-component-arch": "Android组件化架构",
  "android-perf-optimization": "Android应用性能优化",
  "jetpack-compose": "Jetpack Compose从入门到实战",
  "android-advanced-light": "Android进阶之光",
  "deep-android-kernel": "深入理解Android内核设计思想",
  "deep-android-volumes": "深入理解Android（卷I/II/III）",
  "mysql-essentials": "MySQL数据库应用从入门到精通",
  "sql-ten-minutes": "SQL必知必会",
  "database-system-concepts": "数据库系统概念",
  "high-performance-mysql": "高性能MySQL",
  "ddia": "数据密集型应用系统设计",
  "redis-design-implementation": "Redis设计与实现",
  "kafka-definitive-guide": "Kafka权威指南",
  "rabbitmq-practice": "RabbitMQ实战",
  "kong-gateway": "Kong网关入门实战与进阶",
  "kubernetes-in-action": "Kubernetes in Action",
  "phoenix-architecture": "凤凰架构",
  "microservices-patterns": "微服务架构设计模式",
  "illustrated-http": "图解HTTP",
  "illustrated-server-network": "图解服务端网络架构",
  "computer-networks-top-down": "计算机网络：自顶向下方法",
  "http-definitive-guide": "HTTP权威指南",
  "wireshark-packet-analysis": "Wireshark数据包分析实战",
  "tcp-ip-illustrated-vol1": "TCP/IP详解 卷1：协议",
  "unix-network-programming-vol1": "UNIX网络编程 卷1：套接字联网API",
  "two-week-scripting-language": "两周自制脚本语言",
  "crafting-compiler": "自制编译器",
  "engineering-a-compiler": "编译器设计",
  "dragon-book-compilers": "龙书（编译原理）",
  "tiger-book-compiler": "虎书（现代编译器实现）",
  "illustrated-ai": "图解人工智能",
  "illustrated-ml": "图解机器学习",
  "illustrated-dl": "图解深度学习",
  "machine-learning-watermelon": "机器学习（西瓜书）",
};

export type LearningStageLevel = "beginner" | "intermediate" | "advanced";

export const LEARNING_STAGE_LABELS: Record<LearningStageLevel, string> = {
  beginner: "初级",
  intermediate: "中级",
  advanced: "高级",
};

type LearningPathBookConfig = {
  bookSlug: string;
  note: string;
  optional?: boolean;
};

type LearningPathMissingConfig = {
  title: string;
  note: string;
  missing: true;
};

type LearningPathItemConfig =
  | LearningPathBookConfig
  | LearningPathMissingConfig;

type LearningPathStageConfig = {
  level: LearningStageLevel;
  summary: string;
  items: LearningPathItemConfig[];
};

type LearningPathConfig = {
  slug: string;
  title: string;
  description: string;
  stages: LearningPathStageConfig[];
};

/**
 * 学习路径是书籍之上的产品层：用户先选方向，再按初/中/高级推进。
 * 这里保留缺口项，用来在首页和 /learn 明确提示“下一本该补什么”。
 */
const LEARNING_PATH_CONFIGS: LearningPathConfig[] = [
  {
    slug: "algorithms",
    title: "算法",
    description:
      "从图解直觉开始，逐步进入数据结构、图算法、优化策略和机器学习入门。",
    stages: [
      {
        level: "beginner",
        summary: "先用动画建立搜索、排序、递归、图、树和动态规划的第一直觉。",
        items: [
          {
            bookSlug: "grokking-algorithms-2e",
            note: "算法入门主线，适合先建立可视化心智，再进入更系统的算法训练。",
          },
        ],
      },
      {
        level: "intermediate",
        summary: "进入更完整的数据结构、复杂度证明和题型训练。",
        items: [
          {
            bookSlug: "coding-interviews",
            note: "中级算法与数据结构实战，通过经典面试题训练代码鲁棒性与多种设计模式。",
          },
        ],
      },
      {
        level: "advanced",
        summary: "进一步学习图优化、随机算法、近似算法和系统级算法工程。",
        items: [
          {
            bookSlug: "advanced-algorithm-engineering",
            note: "高级算法与算法工程：大规模图、索引、调度、分布式算法和性能工程，从理论到生产级实现。",
          },
        ],
      },
    ],
  },
  {
    slug: "android",
    title: "Android",
    description: "从应用开发入门，到工程架构，再到系统源码与性能机制。",
    stages: [
      {
        level: "beginner",
        summary:
          "先把 Activity、Fragment、Intent、后台任务这些应用层手感练稳。",
        items: [
          {
            bookSlug: "big-nerd-ranch-guide",
            note: "主线入门书，适合从零建立 Android 应用开发心智。",
          },
        ],
      },
      {
        level: "intermediate",
        summary: "把应用层经验推进到团队协作、架构模式、测试与现代化迁移。",
        items: [
          {
            bookSlug: "android-design-patterns",
            note: "Android 中级架构桥梁：从 Fat Activity 走向 MVP、MVVM、Flux、AAC、Kotlin 与团队协作规则。",
          },
        ],
      },
      {
        level: "advanced",
        summary: "再进入系统服务、进程、ClassLoader、插件化与性能优化。",
        items: [
          {
            bookSlug: "android-advanced-decryption",
            note: "源码与系统机制主线，适合进阶读者。",
          },
        ],
      },
    ],
  },
  {
    slug: "cpp",
    title: "C / C++",
    description: "从 C 语言基本功，到现代 C++，再到并发与工程化。",
    stages: [
      {
        level: "beginner",
        summary: "补齐指针、内存、I/O 与 C 语言底层语感。",
        items: [
          {
            bookSlug: "c-primer-plus",
            note: "可选基础：不是所有 C++ 学习者必读，但能补强底层概念。",
            optional: true,
          },
        ],
      },
      {
        level: "intermediate",
        summary: "建立 C++ 类型、容器、类设计和标准库主干。",
        items: [
          {
            bookSlug: "cpp-primer-5e",
            note: "C++ 主线书，适合作为长期学习骨架。",
          },
        ],
      },
      {
        level: "advanced",
        summary: "把语言能力推进到并发、内存模型和工程级同步。",
        items: [
          {
            bookSlug: "cpp-concurrency",
            note: "并发专项，适合掌握 C++ 基础后进入高阶。",
          },
        ],
      },
    ],
  },
  {
    slug: "unity",
    title: "Unity",
    description: "先会做，再会优化，最后按平台和 Profiler 体系化定位问题。",
    stages: [
      {
        level: "beginner",
        summary: "先熟悉编辑器、脚本、物理、动画、UI 与发布流程。",
        items: [
          {
            bookSlug: "unity5",
            note: "Unity 开发基础主线，补齐常用模块。",
          },
        ],
      },
      {
        level: "intermediate",
        summary: "进入脚本、图形、资源、物理和内存优化。",
        items: [
          {
            bookSlug: "unity-game-optimization",
            note: "性能优化主线，先学如何减少浪费。",
          },
          {
            bookSlug: "profiling-unity-games",
            note: "Profiler 诊断主线，学会量化和定位。",
          },
        ],
      },
      {
        level: "advanced",
        summary: "按移动端、XR、Web、URP 等平台约束做专项优化。",
        items: [
          {
            bookSlug: "mobile-xr-web-optimization",
            note: "高级平台专项，更像优化分支而不是入门主线。",
          },
        ],
      },
    ],
  },
  {
    slug: "automotive",
    title: "汽车体系",
    description:
      "从整车构造入门，逐步进入底盘、动力、电气电子、新能源和车载软件。",
    stages: [
      {
        level: "beginner",
        summary: "先看懂汽车为什么能跑、能转、能停、能稳。",
        items: [
          {
            bookSlug: "auto-why-car-runs",
            note: "汽车体系第一本：用图解、动画和交互建立整车系统认知。",
          },
        ],
      },
      {
        level: "intermediate",
        summary: "进入发动机、传动、底盘、电气电子和新能源三电专项。",
        items: [
          {
            bookSlug: "automotive-systems-specialization",
            note: "汽车系统专项：发动机、变速器、底盘、汽车电子与新能源三电的深度技术解析。",
          },
        ],
      },
      {
        level: "advanced",
        summary: "继续进入智能座舱、ADAS、自动驾驶基础和车载软件工程。",
        items: [
          {
            bookSlug: "vehicle-software-intelligence",
            note: "车载软件与智能化：座舱、车载中间件、感知融合、规控基础和整车系统工程，从传统汽车到智能汽车的软件进阶。",
          },
        ],
      },
    ],
  },
  {
    slug: "graphics",
    title: "图形渲染",
    description: "从数学和图形学基础，到 OpenGL 实作，再到实时渲染架构。",
    stages: [
      {
        level: "beginner",
        summary: "先用可视化补齐线性代数、空间变换和运动直觉。",
        items: [
          {
            bookSlug: "game-math-3d",
            note: "图形与游戏数学地基，建议在 LearnOpenGL 之前先读。",
          },
        ],
      },
      {
        level: "intermediate",
        summary: "用 OpenGL 把渲染管线、光照、模型、PBR 跑起来。",
        items: [
          {
            bookSlug: "learnopengl",
            note: "当前图形主线书，内容很长，适合作为中级实作主轴。",
          },
        ],
      },
      {
        level: "advanced",
        summary: "进入实时渲染、引擎架构、工具链和生产级运行时系统。",
        items: [
          {
            bookSlug: "game-engine-architecture-3e",
            note: "高级架构主线，串起渲染、动画、物理、音频、资源、工具和玩法系统。",
          },
        ],
      },
    ],
  },
  {
    slug: "ai-agent",
    title: "AI Agent",
    description: "从概念心智，到开发实践，再到应用模式与生产化。",
    stages: [
      {
        level: "beginner",
        summary: "先理解什么是 Agent、工具调用和基础循环。",
        items: [
          {
            bookSlug: "ai-agent",
            note: "概念入门，解决“Agent 到底是什么”。",
          },
        ],
      },
      {
        level: "intermediate",
        summary: "进入 RAG、规划、记忆、多智能体与评估。",
        items: [
          {
            bookSlug: "ai-agent-dev",
            note: "开发实践主线，适合开始搭系统。",
          },
        ],
      },
      {
        level: "advanced",
        summary: "把模式组合、工具边界和生产化检查清单串起来。",
        items: [
          {
            bookSlug: "ai-agent-apps",
            note: "应用与生产化主线，适合做真实项目。",
          },
        ],
      },
    ],
  },
  {
    slug: "software-engineering",
    title: "软件工程",
    description: "从设计模式入门，逐步掌握面向对象设计原则与工程最佳实践。",
    stages: [
      {
        level: "beginner",
        summary:
          "先用图解建立 23 种设计模式的直觉，理解「为什么需要模式」；再用游戏编程模式拓展视野。",
        items: [
          {
            bookSlug: "design-patterns",
            note: "GoF 23 模式图解：从 Strategy、Observer、Decorator 等核心模式开始，建立面向对象设计心智。",
          },
          {
            bookSlug: "game-programming-patterns",
            note: "游戏编程模式：在游戏场景中实践 GoF 模式，学习游戏特有的序列、行为、解耦与优化模式。",
          },
        ],
      },
      {
        level: "intermediate",
        summary: "进入代码整洁、重构和工程实践。",
        items: [
          {
            bookSlug: "code-quality-refactoring",
            note: "代码整洁之道 + 重构：把设计模式落地为日常工程习惯，学会识别和消除代码异味。",
          },
        ],
      },
      {
        level: "advanced",
        summary: "进入架构设计和领域驱动。",
        items: [
          {
            bookSlug: "architecture-domain-design",
            note: "架构整洁之道 + DDD：从 SOLID 原则到整洁架构，从限界上下文到聚合设计，完成从模式到架构的进阶。",
          },
        ],
      },
    ],
  },
];

/** bookRank: index in BOOK_ORDER, or fallback past known books */
function bookRank(bookSlug: string): number {
  const i = (BOOK_ORDER as readonly string[]).indexOf(bookSlug);
  return i === -1 ? BOOK_ORDER.length : i;
}

/**
 * Section 教学顺序（总监指定，HEL-21）。
 *
 * 侧边栏分组与全局上/下一章顺序均以此为准——绝不能用 localeCompare 中文字典序，
 * 那排不出教学递进（HEL-18 审查发现的坑）。未列入的 section 排在已知 section 之后，
 * 组内再按各自 section 名做稳定回退，保证新增 section 也有确定顺序。
 */
export const SECTION_ORDER = [
  "算法核心直觉",
  "树与图",
  "策略与规划",
  "继续前进",
  "入门",
  "数学基础",
  "空间与变换",
  "图形与运动",
  "Foundations",
  "Low-Level Engine Systems",
  "Graphics, Motion, and Sound",
  "Gameplay",
  "Conclusion",
  "光照",
  "模型加载",
  "高级OpenGL",
  "高级光照",
  "PBR",
  // C++ Primer 第5版
  "C++基础",
  "C++标准库",
  "类设计者工具",
  "高级主题",
  // C Primer Plus（第6版）
  "C基础",
  "C控制与IO",
  "C函数数组指针",
  "C高级主题",
  // Android 编程权威指南
  "基础入门",
  "UI与Fragment",
  "Intent与数据",
  "后台与网络",
  "高级UI与动画",
  // 团队协作中的 Android 应用设计模式入门
  "团队协作与设计基础",
  "Android 架构与设计模式",
  "测试重构与现代化",
  // Android进阶解密
  "系统架构",
  "系统启动",
  "进程管理",
  "四大组件",
  "核心服务",
  "底层技术",
  "高级技术",
  "性能优化",
  // Unity Game Optimization
  "基础脚本优化",
  "图形优化",
  "高级优化",
  // Profiling Unity Games
  "Profiling 工作流",
  "CPU 性能分析",
  "GPU 性能分析",
  "内存与功耗",
  "平台专项",
  // Mobile XR Web Optimization
  "URP 专项优化",
  "XR 专项优化",
  "Web 专项优化",
  // C++ 并发编程实战（第2版）
  "并发基础",
  "共享数据",
  "内存模型与原子操作",
  "并发数据结构",
  "高级并发与工程",
  // Unity 5 权威讲解
  "Unity入门",
  "Unity脚本",
  "Unity物理",
  "Unity动画与UI",
  "Unity渲染与发布",
  // 汽车为什么会跑：图解汽车构造与原理
  "全书地图",
  "整车系统",
  "车身结构",
  "动力系统",
  "传动与底盘",
  "安全与电子",
  "新能源与制造",
  "总复习",
  // AI Agent 开发实战
  "基础原理",
  "核心机制",
  "知识增强",
  "多智能体",
  "企业级应用",
  // 从零构建 AI Agent（七篇）
  "认识智能体",
  "驾驭大模型",
  "让智能体行动",
  "记忆与知识",
  "规划与反思",
  "多智能体协作",
  "走向生产",
  // AI 智能体应用开发
  "智能体基础",
  "上下文工程",
  "工具使用",
  "智能体模式",
  "记忆与检索",
  "生产化",
  // 剑指Offer 章节
  "数组",
  "字符串",
  "链表",
  "树",
  "栈和队列",
  "数学",
  "回溯与递归",
  // 设计模式
  "设计模式入门",
  "创建型模式",
  "结构型模式",
  "行为型模式",
  "复合与总复习",
  // 游戏编程模式
  "游戏编程入门",
  "序列模式",
  "游戏行为模式",
  "解耦模式",
  "优化模式",
  // 代码质量与重构
  "代码质量入门",
  "整洁代码",
  "重构手法",
  // 架构与领域设计
  "架构入门",
  "架构原则",
  "领域驱动设计",
  "架构实践",
  // 高级算法与算法工程
  "算法工程基础",
  "高级数据结构",
  "图与字符串算法",
  "概率与分布式算法",
  // 汽车系统专项
  "发动机与动力",
  "底盘与控制",
  "汽车电子",
  "新能源三电",
  // 车载软件与智能化
  "智能座舱",
  "车载中间件",
  "感知融合",
  "规控与系统工程",
  // C 程序设计语言（K&R）
  "C语言概览",
  "类型与运算符",
  "控制流与函数",
  "指针与数组",
  "结构体与IO",
  // C++ 游戏编程入门
  "C++基础",
  "游戏编程入门",
  "游戏开发实战",
  // Effective C++
  "资源管理",
  "类与继承",
  "模板与泛型",
  "Effective杂项",
  // Effective Modern C++
  "类型推导与auto",
  "智能指针与资源管理",
  "移动语义与转发",
  "并发与其他",
  // C++ 高性能编程
  "性能基础",
  "内存与数据结构",
  "并发优化",
  "模板与元编程性能",
  // 深度探索 C++ 对象模型
  "对象模型基础",
  "构造语义",
  "运行时机制",
  // C++ 性能优化指南
  "性能思维",
  "字符串与算法",
  "内存管理",
  "I/O与并发",
  "优化实践",
  // Modern C++ Design
  "Policy 与 Typelist",
  "Loki 组件",
  "设计模式实现",
  // CPU 眼里的 C++
  "编译与链接",
  "CPU运行时机制",
  "CPU性能优化",
  // Easy C++（第5版）
  "C++入门",
  "类与对象",
  "STL与进阶",
  // C++ Primer Plus
  "C++基础语法",
  "类与继承",
  "模板与STL",
  // C++ 编程测试秘籍
  "基础测试",
  "进阶测试",
  "面试实战",
  // C++ 服务器开发精髓
  "服务器基础",
  "网络与IO",
  "并发架构",
  "工程实践",
  // Head First 设计模式
  "模式入门",
  "封装变化",
  "对象组合",
  "状态变化",
  "模式总结",
  // C# 7.0 本质论
  "C#基础",
  "面向对象",
  "泛型与委托",
  "高级特性",
  // 编写高质量代码
  "语法质量",
  "设计质量",
  "性能质量",
  "工程质量",
  // Effective C#
  "语言习惯",
  "资源管理",
  "泛型LINQ",
  "并发设计",
  // 深入理解 C#
  "C#演进",
  "语言核心",
  "动态并发",
  "现代特性",
  // C# 函数式编程
  "函数式基础",
  "高阶函数",
  "不可变性",
  "函数式实践",
  // C# 10 核心技术指南
  "语言核心C10",
  "类型系统C10",
  "异步并发C10",
  "现代C#",
  // CLR via C#
  "CLR基础",
  "类型设计",
  "内存GC",
  "高级CLR",
  // §6 游戏开发
  "游戏开发",
  // 游戏引擎原理与实践·卷1
  "游戏引擎架构",
  "网络游戏与服务器",
  // JavaScript高级程序设计（第4版）
  "前端与Web",
  "系统与操作系统",
  "JVM与Java生态",
  "Android开发",
  "数据库",
  "分布式与中间件",
  "网络",
  "编译原理",
  "人工智能与机器学习",
] as const;

/** sectionRank: index in SECTION_ORDER, or fallback past known sections */
function sectionRank(section: string): number {
  const i = (SECTION_ORDER as readonly string[]).indexOf(section);
  return i === -1 ? SECTION_ORDER.length : i;
}

/** frontmatter 必填字段及其期望类型（缺失 / 类型错误 = 构建期抛错） */
function parseFrontmatter(
  raw: Record<string, unknown>,
  filePath: string,
): ChapterFrontmatter {
  const fail = (msg: string): never => {
    throw new Error(`[content] ${filePath} frontmatter 非法：${msg}`);
  };

  const str = (key: keyof ChapterFrontmatter): string => {
    const v = raw[key];
    if (typeof v !== "string" || v.trim() === "")
      fail(`字段 \`${key}\` 必须是非空字符串`);
    return v as string;
  };
  /** 允许 sourceUrl 为空（原创内容/非 LearnOpenGL 改编章节可无出处） */
  const optStr = (key: "sourceUrl"): string => {
    const v = raw[key];
    if (typeof v !== "string") fail(`字段 \`${key}\` 必须是字符串`);
    return v as string;
  };
  const bool = (key: keyof ChapterFrontmatter): boolean => {
    const v = raw[key];
    if (typeof v !== "boolean") fail(`字段 \`${key}\` 必须是布尔值`);
    return v as boolean;
  };

  const type = raw.type;
  if (type !== "A" && type !== "B" && type !== "C" && type !== "D")
    fail("字段 `type` 必须是 A | B | C | D 之一");

  const order = raw.order;
  if (typeof order !== "number" || !Number.isInteger(order))
    fail("字段 `order` 必须是整数");

  return {
    title: str("title"),
    type: type as ChapterType,
    section: str("section"),
    order: order as number,
    description: str("description"),
    demo: bool("demo"),
    math: bool("math"),
    draft: bool("draft"),
    sourceUrl: optStr("sourceUrl"),
  };
}

/**
 * 扫描 content/ 下全部三层 .mdx（content/<book>/<section>/<chapter>.mdx），
 * 解析为 ChapterMeta，按 bookRank（书顺序）→ sectionRank（section 教学顺序）
 * → section 名 localeCompare 回退 → order 排序。
 *
 * draft 处理（HEL-21）：默认（含构建/生产）过滤掉 draft:true 章节；
 * 仅当 includeDraft 显式为 true（开发期侧边栏想显示草稿并标注）时才保留。
 * 排序结果对所有调用稳定：上/下一章、generateStaticParams、侧边栏共用同一顺序。
 */
export function getAllChapters({
  includeDraft = false,
}: { includeDraft?: boolean } = {}): ChapterMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const chapters: ChapterMeta[] = [];

  for (const bookSlug of fs.readdirSync(CONTENT_DIR)) {
    const bookDir = path.join(CONTENT_DIR, bookSlug);
    if (!fs.statSync(bookDir).isDirectory()) continue;

    for (const sectionSlug of fs.readdirSync(bookDir)) {
      const sectionDir = path.join(bookDir, sectionSlug);
      if (!fs.statSync(sectionDir).isDirectory()) continue;

      for (const file of fs.readdirSync(sectionDir)) {
        if (!file.endsWith(".mdx")) continue;
        const chapterSlug = file.replace(/\.mdx$/, "");
        const filePath = path.join(sectionDir, file);
        const rel = path.relative(process.cwd(), filePath);

        const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
        const frontmatter = parseFrontmatter(data, rel);

        if (frontmatter.draft && !includeDraft) continue;

        chapters.push({
          bookSlug,
          sectionSlug,
          chapterSlug,
          frontmatter,
          source: content,
        });
      }
    }
  }

  return chapters.sort((a, b) => {
    const rb = bookRank(a.bookSlug) - bookRank(b.bookSlug);
    if (rb !== 0) return rb;
    // 同一书位次内（含两本未知书）按 bookSlug 稳定回退
    const sb = a.bookSlug.localeCompare(b.bookSlug);
    if (sb !== 0) return sb;

    const r =
      sectionRank(a.frontmatter.section) - sectionRank(b.frontmatter.section);
    if (r !== 0) return r;
    // 同一教学位次内（含两个未知 section）按 section 名稳定回退，再按 order
    const s = a.frontmatter.section.localeCompare(b.frontmatter.section, "zh");
    return s !== 0 ? s : a.frontmatter.order - b.frontmatter.order;
  });
}

/** 取单章；不存在返回 null（路由层 notFound）。草稿章在开发期也可取到（includeDraft）。 */
export function getChapter(
  bookSlug: string,
  sectionSlug: string,
  chapterSlug: string,
): ChapterMeta | null {
  return (
    getAllChapters({
      includeDraft: process.env.NODE_ENV !== "production",
    }).find(
      (c) =>
        c.bookSlug === bookSlug &&
        c.sectionSlug === sectionSlug &&
        c.chapterSlug === chapterSlug,
    ) ?? null
  );
}

/** 侧边栏链接项（可序列化，供 client 组件高亮比对） */
export interface NavChapter {
  /** 三段式路由 /learn/<bookSlug>/<sectionSlug>/<chapterSlug> */
  href: string;
  title: string;
  /** 草稿章（开发期显示并标注；生产已被过滤，不会出现在这里） */
  draft: boolean;
}

/** 侧边栏一个 section 分组（按 SECTION_ORDER 排序后产出） */
export interface NavSection {
  /** section 显示名（中文，如「入门」） */
  section: string;
  chapters: NavChapter[];
}

/** 侧边栏一本书（按 BOOK_ORDER 排序后产出，内含若干 section 分组） */
export interface NavBook {
  /** book slug（用于 client 端 usePathname 比对当前所看的书） */
  bookSlug: string;
  /** 书显示名（来自 BOOK_TITLES，回退为 bookSlug） */
  bookTitle: string;
  sections: NavSection[];
}

export type LearningPathBookItem = {
  kind: "book";
  book: NavBook;
  note: string;
  optional: boolean;
  firstHref: string | null;
  chapterCount: number;
};

export type LearningPathMissingItem = {
  kind: "missing";
  title: string;
  note: string;
};

export type LearningPathItem = LearningPathBookItem | LearningPathMissingItem;

export interface LearningPathStage {
  level: LearningStageLevel;
  label: string;
  summary: string;
  items: LearningPathItem[];
}

export interface LearningPath {
  slug: string;
  title: string;
  description: string;
  stages: LearningPathStage[];
}

export type LearningPathTree = LearningPath[];

/**
 * 生成侧边栏章节树：按 BOOK_ORDER 分书、书内按 SECTION_ORDER 分 section、
 * section 内按 order（HEL-48）。只产出有已发布章节的书 / section，
 * 不输出空预留组。
 * 开发期含草稿（标注），生产构建自动隐藏（getAllChapters 过滤）。
 * 返回纯可序列化数据，可安全传给 client 组件做 usePathname 高亮。
 */
export function getChapterTree(): NavBook[] {
  const includeDraft = process.env.NODE_ENV !== "production";
  const books: NavBook[] = [];

  for (const c of getAllChapters({ includeDraft })) {
    const item: NavChapter = {
      href: `/learn/${c.bookSlug}/${c.sectionSlug}/${c.chapterSlug}`,
      title: c.frontmatter.title,
      draft: c.frontmatter.draft,
    };

    // getAllChapters 已按 book → section 顺序排好，相邻同 book 归入同书
    let book = books[books.length - 1];
    if (!book || book.bookSlug !== c.bookSlug) {
      book = {
        bookSlug: c.bookSlug,
        bookTitle: BOOK_TITLES[c.bookSlug] ?? c.bookSlug,
        sections: [],
      };
      books.push(book);
    }

    const lastSection = book.sections[book.sections.length - 1];
    if (lastSection && lastSection.section === c.frontmatter.section) {
      lastSection.chapters.push(item);
    } else {
      book.sections.push({ section: c.frontmatter.section, chapters: [item] });
    }
  }

  return books;
}

export function getLearningPathTree(): LearningPathTree {
  const books = getChapterTree();
  const bookBySlug = new Map(books.map((book) => [book.bookSlug, book]));

  return LEARNING_PATH_CONFIGS.map((path) => ({
    slug: path.slug,
    title: path.title,
    description: path.description,
    stages: path.stages.map((stage) => ({
      level: stage.level,
      label: LEARNING_STAGE_LABELS[stage.level],
      summary: stage.summary,
      items: stage.items
        .map((item): LearningPathItem | null => {
          if ("missing" in item) {
            return { kind: "missing", title: item.title, note: item.note };
          }

          const book = bookBySlug.get(item.bookSlug);
          if (!book) return null;
          const chapters = book.sections.flatMap((section) => section.chapters);

          return {
            kind: "book",
            book,
            note: item.note,
            optional: item.optional ?? false,
            firstHref: chapters[0]?.href ?? null,
            chapterCount: chapters.length,
          };
        })
        .filter((item): item is LearningPathItem => item !== null),
    })),
  }));
}

export function learningPathSlugForBook(bookSlug: string): string | null {
  for (const path of LEARNING_PATH_CONFIGS) {
    for (const stage of path.stages) {
      if (
        stage.items.some(
          (item) => "bookSlug" in item && item.bookSlug === bookSlug,
        )
      ) {
        return path.slug;
      }
    }
  }
  return null;
}

/** 上/下一章（按全局教学顺序）；首/末章对应侧为 null。 */
export interface AdjacentChapters {
  prev: { href: string; title: string } | null;
  next: { href: string; title: string } | null;
}

/**
 * 取某章在「同一本书内」全局顺序中的前后章（HEL-48）。
 * 顺序与侧边栏一致（getAllChapters 过滤出本书）；上/下一章不跨书跳。
 * 开发期把草稿也纳入序列，使草稿章之间的上/下一章导航在开发预览时连贯。
 */
export function getAdjacentChapters(
  bookSlug: string,
  sectionSlug: string,
  chapterSlug: string,
): AdjacentChapters {
  // 先按 bookSlug 过滤，再取前后——prev/next 限同一本书内，绝不跨书
  const all = getAllChapters({
    includeDraft: process.env.NODE_ENV !== "production",
  }).filter((c) => c.bookSlug === bookSlug);
  const i = all.findIndex(
    (c) => c.sectionSlug === sectionSlug && c.chapterSlug === chapterSlug,
  );
  if (i === -1) return { prev: null, next: null };

  const toLink = (c: ChapterMeta) => ({
    href: `/learn/${c.bookSlug}/${c.sectionSlug}/${c.chapterSlug}`,
    title: c.frontmatter.title,
  });

  return {
    prev: i > 0 ? toLink(all[i - 1]) : null,
    next: i < all.length - 1 ? toLink(all[i + 1]) : null,
  };
}
