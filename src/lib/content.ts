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

/** v2 章节必须声明读者实际完成的练习形态，避免跨领域硬塞代码题。 */
export type ChapterPracticeMode =
  | "code"
  | "calculation"
  | "simulation"
  | "diagnosis"
  | "design";

/**
 * licensed-adaptation 仅用于确有改编授权的来源；只有目录或参考资料时必须使用
 * independent-rewrite，不能把“核对过目录”写成“复现了原书正文”。
 */
export type ChapterSourceMode =
  | "licensed-adaptation"
  | "independent-rewrite"
  | "original";

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
  /** 旧章默认为 1；完成新 SOP 全套验收后才可标 2。 */
  qualityVersion: 1 | 2;
  /** v1 旧章为 null；v2 必填。 */
  practiceMode: ChapterPracticeMode | null;
  /** v1 旧章为 null；v2 必填。 */
  sourceMode: ChapterSourceMode | null;
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

// A production build worker renders many chapter routes. Keep one immutable
// index per draft policy so metadata, page rendering, sidebars, and adjacent
// links do not rescan all 2,445 MDX files for every route. Development reads
// from disk on every request because fs-discovered MDX files are not reliable
// HMR dependencies and a process cache would serve stale chapter content.
const chapterIndexCache = new Map<boolean, ChapterMeta[]>();

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
  "cpp-primer-5e",
  "c-primer-plus",
  "cpp-concurrency",
  "coding-interviews",
  "unity-game-optimization",
  "profiling-unity-games",
  "mobile-xr-web-optimization",
  "auto-why-car-runs",
  "unity5",
  "ai-agent-dev",
  "ai-agent",
  "ai-agent-apps",
  "design-patterns",
  "code-quality-refactoring",
  "architecture-domain-design",
  "advanced-algorithm-engineering",
  "automotive-systems-specialization",
  "vehicle-software-intelligence",
  "easy-cpp-5e",
  "cpp-server-essence",
  "head-first-design-patterns",
  "csharp-functional-programming",
  "csharp-10-core",
  "clr-via-csharp",
  "rust-programming-language",
  "go-programming-language",
  "python-crash-course",
  "lua-programming",
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
  "programmers-math",
  "head-first-statistics",
  "linear-algebra-done-right",
  "concrete-mathematics",
  "geometric-data-structures",
  "ray-tracing-weekend",
  "deep-opengl",
  "vulkan-guide",
  "opengl-redbook",
  "opengl-superbible",
  "gpu-gems",
  "real-time-rendering-4e",
  "pbrt-book",
  "unity-shader-essentials",
  "shader-practice",
  "unity-shaderlab",
  "unity-screen-effects",
  "unity-urp-shaders",
  "gpu-pro",
  "shaderx",
  // §6 游戏开发
  "unity-hmi",
  "game-programmer-path",
  "unity-ui-design",
  "unity-scripting",
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
  "linux-os-practice",
  "mfc-deep-dive",
  "windows-kernel-programming",
  "linux-kernel-essence",
  "linux-kernel-design",
  "unix-advanced-programming",
  "spring-in-action",
  "jvm-troubleshooting",
  "deep-understanding-jvm",
  "jvm-g1-tuning",
  "gc-handbook",
  "first-line-android",
  "crazy-android",
  "big-nerd-ranch-guide",
  "android-art-exploration",
  "kotlin-in-action",
  "android-component-arch",
  "android-perf-optimization",
  "jetpack-compose",
  "android-advanced-light",
  "deep-android-kernel",
  "mysql-essentials",
  "sql-ten-minutes",
  "high-performance-mysql",
  "ddia",
  "kafka-definitive-guide",
  "rabbitmq-practice",
  "kong-gateway",
  "kubernetes-in-action",
  "phoenix-architecture",
  "microservices-patterns",
  "http-definitive-guide",
  "wireshark-packet-analysis",
  "tcp-ip-illustrated-vol1",
  "unix-network-programming-vol1",
  "two-week-scripting-language",
  "engineering-a-compiler",
  "dragon-book-compilers",
  "tiger-book-compiler",
  "illustrated-ai",
  "illustrated-ml",
  "illustrated-dl",
  "machine-learning-watermelon",
  "statistical-learning-methods",
  "deep-learning-from-scratch",
  "deep-learning-from-scratch-2",
  "deep-learning-nlp-advanced",
  "deep-learning-rl-from-scratch",
  "deep-learning-gen-models",
  "deep-learning-textbook",
  "pattern-recognition-ml",
  "rl-deep-learning-c",
  "deep-reinforcement-learning",
  "this-is-chatgpt",
  "llm-app-dev-essentials",
  "langchain-programming",
  "chatgpt-principles-practice",
  "large-language-models",
  "large-scale-llm-practice",
  "building-llm-applications",
  "multiagent-systems",
  "blockchain-plain",
  "blockchain-dev-practice",
  "mastering-bitcoin",
  "mastering-ethereum",
  "illustrated-nev",
  "car-structure-illustrated",
  "autosar-vehicle-controller",
  "soa-vehicle-architecture",
  "mythical-man-month",
  "poeaa-enterprise-patterns",
  "coder-revolution",
  "make-it-stick",
  "mindset-growth",
  "peak-deliberate-practice",
  "out-of-control",
  "effective-executive",
  "org-problem-tools",
  "cg-principles-practice",
  "computer-graphics-4e",
  "real-time-collision-detection",
  "global-illumination",
  "beginning-cpp-game-programming",
  "game-design-fundamentals",
  "game-programming-patterns",
  "game-engine-practice-vol2",
  "game-mechanics-advanced",
  "unity-animation",
  "kotlin-definitive-guide",
  "android-design-patterns",
  "android-advanced-decryption",
  "deep-android-volumes",
  "cpp-primer-plus",
  "the-c-programming-language",
  "cpu-eye-cpp",
  "effective-cpp",
  "effective-modern-cpp",
  "cpp-high-performance",
  "cpp-testing-recipes",
  "inside-cpp-object-model",
  "modern-cpp-design",
  "optimized-cpp",
  "head-first-java",
  "java-core-tech",
  "effective-java",
  "essential-csharp-7",
  "deep-understanding-csharp",
  "effective-csharp",
  "csharp-quality-code",
  "dotnet-memory",
  "data-structures-visual",
  "math-girl",
  "hackers-delight",
  "taocp",
  "pragmatic-programmer",
  "code-complete-2e",
  "illustrated-server-network",
  "ruby-programming",
  "redis-design-implementation",
  "database-system-concepts",
  "illustrated-http",
  "computer-networks-top-down",
  "art-of-unix-programming",
  "windows-journey",
  "crafting-compiler",
] as const;

/** book slug → 书显示名（侧边栏书头、列表页书标题）。 */
export const BOOK_TITLES: Record<string, string> = {
  "grokking-algorithms-2e": "算法图解（第2版）",
  "game-math-3d": "游戏和图形学的 3D 数学",
  learnopengl: "LearnOpenGL",
  "game-engine-architecture-3e": "游戏引擎架构（第三版）",
  "game-engine-practice-vol1": "游戏引擎原理与实践·卷1",
  "game-engine-practice-vol2": "游戏引擎原理与实践·卷2：高级技术",
  "real-time-collision-detection": "实时碰撞检测算法技术",
  "cpp-primer-5e": "C++ Primer 第5版",
  "c-primer-plus": "C Primer Plus（第6版）",
  "coding-interviews": "剑指Offer：名企面试官精讲典型编程题（第2版）",
  "big-nerd-ranch-guide": "Android 编程权威指南（第4版）",
  "android-design-patterns": "Android アプリ设计パターン入门",
  "android-advanced-decryption": "Android进阶解密",
  "unity-game-optimization": "Unity 游戏优化",
  "profiling-unity-games": "Unity 游戏性能分析终极指南（Unity 6 第 2 版）",
  "mobile-xr-web-optimization": "移动、XR 与 Web 游戏性能优化（Unity 6 版）",
  "auto-why-car-runs": "汽车为什么会跑：图解汽车构造与原理（第4版 / 2018）",
  "cpp-concurrency": "C++ 并发编程实战（第2版）",
  unity5: "Unity 5 权威讲解",
  "ai-agent-dev": "AI Agent 开发实战（工程专题 / 2026）",
  "ai-agent": "从零构建 AI Agent（基础专题 / 2026）",
  "ai-agent-apps": "AI 智能体应用开发（应用专题 / 2026）",
  "design-patterns": "设计模式：GoF 23 模式图解（第1版 / 1994）",
  "game-programming-patterns": "游戏编程模式",
  "code-quality-refactoring": "代码质量与重构（Clean Code + Refactoring）",
  "architecture-domain-design": "架构与领域设计（Clean Architecture + DDD）",
  "advanced-algorithm-engineering":
    "算法工程珠玑（Pearls of Algorithm Engineering）",
  "automotive-systems-specialization":
    "汽车系统专项（Bosch 权威资料版 / 2024）",
  "vehicle-software-intelligence": "车载软件与智能化（AUTOSAR R25-11 / 2026）",
  "the-c-programming-language": "C 程序设计语言（K&R）",
  "beginning-cpp-game-programming": "C++ 游戏编程入门",
  "effective-cpp": "Effective C++",
  "effective-modern-cpp": "Effective Modern C++",
  "cpp-high-performance": "C++ 高性能编程",
  "inside-cpp-object-model": "深度探索 C++ 对象模型",
  "optimized-cpp": "C++ 性能优化指南",
  "modern-cpp-design": "Modern C++ Design",
  "cpu-eye-cpp": "CPU眼里的C/C++",
  "easy-cpp-5e": "Easy C++（第5版）",
  "cpp-primer-plus": "C++ Primer Plus",
  "cpp-testing-recipes": "现代 C++ 测试驱动开发",
  "cpp-server-essence": "C++ 服务器开发精髓",
  "head-first-design-patterns": "Head First 设计模式（第2版 / 2020）",
  "essential-csharp-7": "C# 7.0 本质论",
  "csharp-quality-code": "编写高质量代码：改善 C# 程序的 157 个建议",
  "effective-csharp": "Effective C#",
  "deep-understanding-csharp": "深入理解 C#",
  "csharp-functional-programming": "C# 函数式编程",
  "csharp-10-core": "C# 10 核心技术指南",
  "clr-via-csharp": "CLR via C#",
  "dotnet-memory": "Pro .NET 内存管理（第2版）",
  "rust-programming-language": "Rust 程序设计语言",
  "go-programming-language": "Go 程序设计语言",
  "python-crash-course": "Python 编程：从入门到实践",
  "lua-programming": "Lua 程序设计",
  "ruby-programming": "Ruby 基础教程",
  "data-structures-visual": "大话数据结构",
  "math-girl": "图灵数学女孩系列",
  "dsa-cpp": "数据结构与算法分析（C++描述，第3版）",
  "rust-way": "Rust 编程之道",
  "go-in-action": "Go 语言实战",
  "go-web-programming": "Go Web 编程",
  "fluent-python": "流畅的 Python",
  "python-ops": "Python 自动化运维",
  "mastering-rust-2e": "精通 Rust（第2版）",
  "python-advanced": "Python 高级编程",
  "algorithms-4e": "算法（第4版）",
  "programming-pearls": "编程珠玑",
  "competitive-algorithms": "深入浅出算法竞赛（图解版）",
  "introduction-to-algorithms": "算法导论（第4版）",
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
  "unity-shaderlab": "Unity 3D ShaderLab 开发实战详解",
  "unity-screen-effects": "Unity 着色器和屏幕特效开发秘笈",
  "unity-urp-shaders": "Unity 6 URP 内置 Shader 源码解析",
  "gpu-pro": "GPU Pro 系列",
  shaderx: "ShaderX 系列",
  "unity-hmi": "Unity for HMI：未来已来，Unity开启3D座舱新篇章",
  "game-design-fundamentals": "游戏设计基础（原书第3版）",
  "game-mechanics-advanced": "游戏机制：高级游戏设计技术",
  "game-programmer-path": "游戏程序员的学习之路（Milo Yip 图谱）",
  "unity-ui-design": "Unity UI 设计",
  "unity-scripting": "Unity 脚本设计",
  "unity-animation": "Unity 游戏动画设计",
  "blender-3d": "玩转 Blender：3D 动画角色创作（第 3 版）",
  "unity-core-tech": "Unity 3D实战核心技术详解",
  "unity-game-cases": "Unity 游戏案例开发大全",
  "unity-vfx": "Unity 3D 游戏特效制作典型实例",
  "unity-scripting-game-dev": "Unity 3D 脚本编程与游戏开发",
  "unity-master": "Unity 神技达人炼成记",
  "unity-advanced-programming": "Unity 3D 高级编程之进阶主程",
  "game-server-programming": "网络游戏服务器端编程",
  "unity-mmo-game": "Unity3D网络游戏实战（第2版）",
  "unity-cpp-network-game": "Unity与C++网络游戏开发实战",
  "multiplayer-game-architecture":
    "多人在线游戏架构实战：基于C++的分布式游戏编程",
  "game-network-core-tech": "网络游戏核心技术与实战",
  "game-server-architecture": "游戏服务器架构与优化",
  "multiplayer-game-programming":
    "Multiplayer Game Programming: Architecting Networked Games",
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
  "how-computers-work": "计算机是怎样跑起来的",
  "how-programs-work": "程序是怎样跑起来的",
  csapp: "深入理解计算机系统（CSAPP）",
  "modern-os": "现代操作系统（第4版）",
  "os-concepts": "操作系统概念（恐龙书）",
  "windows-journey": "Windows逐梦旅程",
  "linux-os-practice": "Linux操作系统实战",
  "mfc-deep-dive": "深入浅出MFC",
  "windows-kernel-programming": "Windows内核编程",
  "linux-kernel-essence": "Linux内核精髓",
  "linux-kernel-design": "Linux内核设计与实现",
  "unix-advanced-programming": "UNIX环境高级编程",
  "head-first-java": "Head First Java（第3版）",
  "java-core-tech": "Java核心技术（第14版·全两卷）",
  "effective-java": "Effective Java（第3版）",
  "spring-in-action": "Spring in Action（第6版）",
  "jvm-troubleshooting": "Troubleshooting Java（第2版）",
  "deep-understanding-jvm": "深入理解Java虚拟机（第3版）",
  "jvm-g1-tuning": "JVM G1源码分析和调优（彭成寒）",
  "gc-handbook": "垃圾回收算法手册：自动内存管理的艺术（2016中文版）",
  "first-line-android": "第一行代码 Android（第3版）",
  "crazy-android": "疯狂Android讲义（第4版）",
  "kotlin-definitive-guide": "Kotlin编程权威指南（原书第1版）",
  "android-art-exploration": "Android开发艺术探索（Android 5.0）",
  "kotlin-in-action": "Kotlin实战（第1版 / Kotlin 1.0）",
  "android-component-arch": "Android组件化架构（2018 / Gradle 4.1时代）",
  "android-perf-optimization": "Android应用性能优化（2012 / Android 4.0时代）",
  "jetpack-compose": "Jetpack Compose从入门到实战（2022 / 第1版）",
  "android-advanced-light": "Android进阶之光（第1版 / Android 7.0时代）",
  "deep-android-kernel": "深入理解Android内核设计思想（第1版 / Android 4.3）",
  "deep-android-volumes":
    "深入理解Android（Framework卷I-III / Android 2.2-4.2.2）",
  "mysql-essentials": "MySQL数据库应用从入门到精通（第3版 / 2016）",
  "sql-ten-minutes": "SQL必知必会（第5版 / 2020）",
  "database-system-concepts": "数据库系统概念（原书第7版 / 2021）",
  "high-performance-mysql": "高性能MySQL（第4版 / 2022）",
  ddia: "数据密集型应用系统设计（第1版 / 2018）",
  "redis-design-implementation": "Redis设计与实现（第2版 / Redis 3.0 / 2014）",
  "kafka-definitive-guide": "Kafka权威指南（第2版 / 2022）",
  "rabbitmq-practice":
    "RabbitMQ实战：高效部署分布式消息队列（RabbitMQ 2.7 / 2015）",
  "kong-gateway": "Kong网关：入门、实战与进阶（Kong 2.0.5 / 2021）",
  "kubernetes-in-action":
    "Kubernetes in Action中文版（第1版 / Kubernetes 1.8 / 2018）",
  "phoenix-architecture": "凤凰架构",
  "microservices-patterns": "微服务架构设计模式",
  "illustrated-http": "图解HTTP（2014年首版 / HTTP/1.1时代）",
  "illustrated-server-network": "图解服务器端网络架构（2015年首版）",
  "computer-networks-top-down": "计算机网络：自顶向下方法（原书第8版 / 2022）",
  "http-definitive-guide": "HTTP权威指南（2002年英文首版 / 2012年中译本）",
  "wireshark-packet-analysis": "Wireshark数据包分析实战（第3版 / 2018）",
  "tcp-ip-illustrated-vol1": "TCP/IP详解 卷1：协议（原书第2版 / 2016）",
  "unix-network-programming-vol1":
    "UNIX网络编程 卷1：套接字联网API（第3版 / 2010）",
  "two-week-scripting-language": "两周自制脚本语言（第1版 / 2014）",
  "crafting-compiler": "自制编译器（第1版 / 2016）",
  "engineering-a-compiler": "编译器设计（第2版 / 2013）",
  "dragon-book-compilers": "龙书：编译原理（第2版 / 2009）",
  "tiger-book-compiler": "虎书：现代编译原理 C语言描述（修订版 / 2018）",
  "illustrated-ai": "图解人工智能（第1版 / 2021）",
  "illustrated-ml": "图解机器学习（第1版 / 2015）",
  "illustrated-dl": "图解深度学习（第1版 / 2018）",
  "machine-learning-watermelon": "机器学习（西瓜书，第1版 / 2016）",
  "statistical-learning-methods": "统计学习方法",
  "deep-learning-from-scratch": "深度学习入门：基于Python的理论与实现",
  "deep-learning-from-scratch-2": "深度学习入门2：自制框架",
  "deep-learning-nlp-advanced": "深度学习进阶：自然语言处理",
  "deep-learning-rl-from-scratch": "深度学习入门4：强化学习",
  "deep-learning-gen-models": "深度学习入门5：生成模型",
  "deep-learning-textbook": "深度学习（花书）",
  "pattern-recognition-ml": "模式识别与机器学习（PRML）",
  "rl-deep-learning-c": "强化学习与深度学习：通过C语言模拟",
  "deep-reinforcement-learning": "深度强化学习",
  "this-is-chatgpt": "这就是 ChatGPT",
  "llm-app-dev-essentials": "大模型应用开发极简入门",
  "langchain-programming": "LangChain 编程从入门到实践",
  "chatgpt-principles-practice": "ChatGPT 原理与实战",
  "large-language-models": "大语言模型：基础与前沿",
  "large-scale-llm-practice": "大规模语言模型：从理论到实践",
  "building-llm-applications": "Building LLM Powered Applications",
  "multiagent-systems": "多智能体系统",
  "blockchain-plain": "白话区块链",
  "blockchain-dev-practice": "区块链开发实战",
  "mastering-bitcoin": "精通比特币",
  "mastering-ethereum": "精通以太坊",
  "illustrated-nev": "图解新能源汽车原理与构造",
  "car-structure-illustrated": "汽车构造与知识全图解",
  "autosar-vehicle-controller": "AUTOSAR 规范与车用控制器软件开发",
  "soa-vehicle-architecture": "汽车电子与软件架构",
  "mythical-man-month": "人月神话",
  "code-complete-2e": "代码大全（第2版）",
  "pragmatic-programmer": "程序员修炼之道",
  "poeaa-enterprise-patterns": "企业应用架构模式",
  "art-of-unix-programming": "UNIX编程艺术",
  "coder-revolution": "码农翻身",
  "make-it-stick": "认知天性",
  "mindset-growth": "终身成长",
  "peak-deliberate-practice": "刻意练习",
  "out-of-control": "失控",
  "effective-executive": "卓有成效的管理者",
  "org-problem-tools": "解决组织问题的49个工具",
};

export type LearningStageLevel = "beginner" | "intermediate" | "advanced";

export const LEARNING_STAGE_LABELS: Record<LearningStageLevel, string> = {
  beginner: "初级",
  intermediate: "中级",
  advanced: "高级",
};

type BookSlug = (typeof BOOK_ORDER)[number];

type LearningPathBookConfig = {
  bookSlug: BookSlug;
  note?: string;
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

const LEARNING_STAGE_BOOK_NOTES: Record<LearningStageLevel, string> = {
  beginner: "入门读物：建立基础概念、术语和第一轮实践经验。",
  intermediate: "主干读物：系统掌握方法、工具与工程实践。",
  advanced: "进阶读物：深入底层原理、架构设计与专题难点。",
};

function learningBooks(
  bookSlugs: readonly BookSlug[],
): LearningPathBookConfig[] {
  return bookSlugs.map((bookSlug) => ({ bookSlug }));
}

/**
 * 完整学习体系以 docs/书单.md 为基准：22 个体系、初/中/高三级。
 * 每一本 BOOK_ORDER 图书必须且只能出现一次；getLearningPathTree 会在构建期
 * 校验覆盖关系，防止新增书籍后只出现在书库、没有归入学习体系。
 */
const LEARNING_PATH_CONFIGS: LearningPathConfig[] = [
  {
    slug: "graphics",
    title: "计算机图形学与渲染",
    description: "从图形学概念与 API 实作，进入实时渲染、PBR 与全局光照。",
    stages: [
      {
        level: "beginner",
        summary: "理解渲染管线、光栅化、OpenGL 基础与光线追踪直觉。",
        items: learningBooks(["ray-tracing-weekend","learnopengl","cg-principles-practice","computer-graphics-4e"]),
      },
      {
        level: "intermediate",
        summary: "用 OpenGL、Vulkan 与几何数据结构完成现代渲染实践。",
        items: learningBooks(["deep-opengl","opengl-superbible","opengl-redbook","vulkan-guide","geometric-data-structures","real-time-collision-detection","game-math-3d"]),
      },
      {
        level: "advanced",
        summary: "深入实时渲染架构、基于物理的渲染与全局光照。",
        items: learningBooks(["pbrt-book","real-time-rendering-4e","global-illumination","gpu-gems","gpu-pro","shaderx","shader-practice"]),
      },
    ],
  },
  {
    slug: "game-dev",
    title: "游戏开发",
    description: "游戏引擎架构、网络同步、服务器与性能优化的工程实践。",
    stages: [
      {
        level: "beginner",
        summary: "游戏程序员成长路径、设计基础、脚本语言与 3D 创作入门。",
        items: learningBooks(["game-programmer-path","beginning-cpp-game-programming","game-design-fundamentals","lua-programming","blender-3d"]),
      },
      {
        level: "intermediate",
        summary: "游戏编程模式、引擎架构与核心机制设计。",
        items: learningBooks(["game-programming-patterns","game-engine-architecture-3e","game-engine-practice-vol1","game-engine-practice-vol2","game-mechanics-advanced","unity-game-optimization"]),
      },
      {
        level: "advanced",
        summary: "网络游戏核心技术、服务器架构与多人在线架构。",
        items: learningBooks(["game-network-core-tech","game-server-programming","game-server-architecture","multiplayer-game-architecture","multiplayer-game-programming"]),
      },
    ],
  },
  {
    slug: "unity",
    title: "Unity 引擎",
    description: "Unity 脚本、渲染、动画、特效与性能优化的系统训练。",
    stages: [
      {
        level: "beginner",
        summary: "Unity 脚本、UI、动画与核心技术入门。",
        items: learningBooks(["unity5","unity-core-tech","unity-scripting","unity-scripting-game-dev","unity-ui-design","unity-animation"]),
      },
      {
        level: "intermediate",
        summary: "Shader、URP、屏幕特效与高级编程进阶。",
        items: learningBooks(["unity-advanced-programming","unity-master","unity-game-cases","unity-shader-essentials","unity-shaderlab","unity-urp-shaders","unity-screen-effects","unity-vfx"]),
      },
      {
        level: "advanced",
        summary: "网络游戏、HMI 座舱、性能分析与跨平台优化。",
        items: learningBooks(["unity-mmo-game","unity-cpp-network-game","unity-hmi","profiling-unity-games","mobile-xr-web-optimization"]),
      },
    ],
  },
  {
    slug: "android",
    title: "Android 开发",
    description: "从入门到内核的 Android 应用与系统开发系统训练。",
    stages: [
      {
        level: "beginner",
        summary: "Android 应用开发入门、Kotlin 语言与第一行代码。",
        items: learningBooks(["big-nerd-ranch-guide","first-line-android","crazy-android","kotlin-definitive-guide","kotlin-in-action"]),
      },
      {
        level: "intermediate",
        summary: "开发艺术探索、组件化架构、设计模式与 Compose。",
        items: learningBooks(["android-art-exploration","android-advanced-light","android-component-arch","android-design-patterns","jetpack-compose"]),
      },
      {
        level: "advanced",
        summary: "进阶解密、性能优化与 Framework/内核深入。",
        items: learningBooks(["android-advanced-decryption","android-perf-optimization","deep-android-kernel","deep-android-volumes"]),
      },
    ],
  },
  {
    slug: "cpp",
    title: "C/C++ 编程",
    description: "从 C 语言基础到 C++ 高性能、并发与对象模型的深度训练。",
    stages: [
      {
        level: "beginner",
        summary: "C/C++ 语言基础：指针、内存、语法与底层视角。",
        items: learningBooks(["c-primer-plus","cpp-primer-plus","easy-cpp-5e","the-c-programming-language","cpu-eye-cpp"]),
      },
      {
        level: "intermediate",
        summary: "Effective 系列、高性能与对象模型深入。",
        items: learningBooks(["cpp-primer-5e","effective-cpp","effective-modern-cpp","cpp-high-performance","cpp-testing-recipes","inside-cpp-object-model"]),
      },
      {
        level: "advanced",
        summary: "并发编程、服务器开发、泛型设计与性能优化。",
        items: learningBooks(["cpp-concurrency","cpp-server-essence","modern-cpp-design","optimized-cpp"]),
      },
    ],
  },
  {
    slug: "java",
    title: "Java 与 JVM",
    description: "Java 核心技术、Effective 实践与 JVM 调优深入。",
    stages: [
      {
        level: "beginner",
        summary: "Java 语言入门与核心技术体系。",
        items: learningBooks(["head-first-java","java-core-tech"]),
      },
      {
        level: "intermediate",
        summary: "Effective Java 最佳实践与 JVM 深入理解。",
        items: learningBooks(["effective-java","deep-understanding-jvm","jvm-troubleshooting"]),
      },
      {
        level: "advanced",
        summary: "G1 垃圾收集器源码分析与调优。",
        items: learningBooks(["jvm-g1-tuning"]),
      },
    ],
  },
  {
    slug: "csharp-dotnet",
    title: "C# 与 .NET",
    description: "C# 语言核心、函数式编程与 .NET 内存管理。",
    stages: [
      {
        level: "beginner",
        summary: "C# 语言核心与本质论入门。",
        items: learningBooks(["csharp-10-core","essential-csharp-7"]),
      },
      {
        level: "intermediate",
        summary: "CLR 原理、深入理解 C# 与函数式编程。",
        items: learningBooks(["clr-via-csharp","deep-understanding-csharp","effective-csharp","csharp-functional-programming"]),
      },
      {
        level: "advanced",
        summary: "高质量代码实践与 .NET 内存管理。",
        items: learningBooks(["csharp-quality-code","dotnet-memory"]),
      },
    ],
  },
  {
    slug: "python",
    title: "Python 编程",
    description: "Python 从入门到流畅、高级编程与自动化运维。",
    stages: [
      {
        level: "beginner",
        summary: "Python 编程入门与实践。",
        items: learningBooks(["python-crash-course"]),
      },
      {
        level: "intermediate",
        summary: "流畅的 Python 与高级编程。",
        items: learningBooks(["fluent-python","python-advanced"]),
      },
      {
        level: "advanced",
        summary: "Python 自动化运维实践。",
        items: learningBooks(["python-ops"]),
      },
    ],
  },
  {
    slug: "go",
    title: "Go 语言",
    description: "Go 程序设计、实战与 Web 编程。",
    stages: [
      {
        level: "beginner",
        summary: "Go 程序设计语言基础。",
        items: learningBooks(["go-programming-language"]),
      },
      {
        level: "intermediate",
        summary: "Go 语言实战与 Web 编程。",
        items: learningBooks(["go-in-action","go-web-programming"]),
      },
    ],
  },
  {
    slug: "rust",
    title: "Rust 语言",
    description: "Rust 程序设计语言、编程之道与精通。",
    stages: [
      {
        level: "beginner",
        summary: "Rust 程序设计语言入门。",
        items: learningBooks(["rust-programming-language"]),
      },
      {
        level: "intermediate",
        summary: "Rust 编程之道与精通进阶。",
        items: learningBooks(["rust-way","mastering-rust-2e"]),
      },
    ],
  },
  {
    slug: "frontend",
    title: "前端开发",
    description: "JavaScript、CSS、Vue.js 与前端工程化体系。",
    stages: [
      {
        level: "beginner",
        summary: "JavaScript 高级程序设计与 CSS 揭秘。",
        items: learningBooks(["javascript-pro-guide","css-secrets"]),
      },
      {
        level: "intermediate",
        summary: "JavaScript 权威指南、CSS 世界与 Vue 实战。",
        items: learningBooks(["javascript-definitive-guide","you-dont-know-js","css-world","vuejs-practice"]),
      },
      {
        level: "advanced",
        summary: "Vue.js 设计与实现、全栈开发与前端工程化。",
        items: learningBooks(["vuejs-design-implementation","javascript-fullstack","frontend-engineering"]),
      },
    ],
  },
  {
    slug: "nodejs",
    title: "Node.js",
    description: "Node.js 深入浅出、权威指南与调试。",
    stages: [
      {
        level: "beginner",
        summary: "Node.js 权威指南入门。",
        items: learningBooks(["nodejs-definitive-guide"]),
      },
      {
        level: "intermediate",
        summary: "深入浅出 Node.js 与调试指南。",
        items: learningBooks(["deep-nodejs","nodejs-debugging-guide"]),
      },
    ],
  },
  {
    slug: "algorithms",
    title: "算法与数据结构",
    description: "从图解算法直觉到算法导论与数学基础的体系训练。",
    stages: [
      {
        level: "beginner",
        summary: "图解建立算法直觉、数据结构与程序员数学。",
        items: learningBooks(["grokking-algorithms-2e","data-structures-visual","programmers-math","math-girl"]),
      },
      {
        level: "intermediate",
        summary: "面试、算法竞赛与经典算法教材。",
        items: learningBooks(["coding-interviews","algorithms-4e","dsa-cpp","competitive-algorithms","programming-pearls","advanced-algorithm-engineering","hackers-delight"]),
      },
      {
        level: "advanced",
        summary: "算法导论、具体数学、线代与统计基础。",
        items: learningBooks(["introduction-to-algorithms","taocp","concrete-mathematics","linear-algebra-done-right","head-first-statistics"]),
      },
    ],
  },
  {
    slug: "ai-ml",
    title: "人工智能与机器学习",
    description: "从机器学习基础、深度学习到大模型应用与智能体开发。",
    stages: [
      {
        level: "beginner",
        summary: "图解 AI/ML/DL 与经典机器学习教材。",
        items: learningBooks(["illustrated-ai","illustrated-ml","illustrated-dl","machine-learning-watermelon","statistical-learning-methods"]),
      },
      {
        level: "intermediate",
        summary: "深度学习入门系列、花书与强化学习。",
        items: learningBooks(["rl-deep-learning-c","deep-learning-from-scratch","deep-learning-from-scratch-2","deep-learning-textbook","deep-learning-nlp-advanced","deep-learning-rl-from-scratch","deep-learning-gen-models","deep-reinforcement-learning","pattern-recognition-ml","multiagent-systems"]),
      },
      {
        level: "advanced",
        summary: "大语言模型、LangChain 与 AI Agent 开发。",
        items: learningBooks(["ai-agent-dev","ai-agent-apps","ai-agent","building-llm-applications","langchain-programming","large-language-models","large-scale-llm-practice","llm-app-dev-essentials","chatgpt-principles-practice","this-is-chatgpt"]),
      },
    ],
  },
  {
    slug: "software-engineering",
    title: "软件工程与最佳实践",
    description: "设计模式、代码质量、重构与架构的工程管理。",
    stages: [
      {
        level: "beginner",
        summary: "设计模式动机、代码大全与程序员修炼之道。",
        items: learningBooks(["head-first-design-patterns","pragmatic-programmer","code-complete-2e","coder-revolution"]),
      },
      {
        level: "intermediate",
        summary: "代码质量、重构与 GoF 设计模式。",
        items: learningBooks(["code-quality-refactoring","design-patterns"]),
      },
      {
        level: "advanced",
        summary: "整洁架构、DDD 与企业应用模式。",
        items: learningBooks(["architecture-domain-design","poeaa-enterprise-patterns","mythical-man-month"]),
      },
    ],
  },
  {
    slug: "backend",
    title: "后端与分布式系统",
    description: "Spring、微服务、消息队列与分布式数据架构。",
    stages: [
      {
        level: "beginner",
        summary: "Spring 实战与服务器端网络架构入门。",
        items: learningBooks(["spring-in-action","illustrated-server-network","ruby-programming"]),
      },
      {
        level: "intermediate",
        summary: "微服务架构、Kafka、RabbitMQ、网关与 Kubernetes。",
        items: learningBooks(["microservices-patterns","kafka-definitive-guide","rabbitmq-practice","kong-gateway","kubernetes-in-action"]),
      },
      {
        level: "advanced",
        summary: "凤凰架构与分布式数据密集型应用。",
        items: learningBooks(["phoenix-architecture","ddia"]),
      },
    ],
  },
  {
    slug: "database",
    title: "数据库",
    description: "SQL、MySQL、Redis 与数据库系统概念。",
    stages: [
      {
        level: "beginner",
        summary: "SQL 必知必会与 MySQL 入门。",
        items: learningBooks(["sql-ten-minutes","mysql-essentials"]),
      },
      {
        level: "intermediate",
        summary: "高性能 MySQL 与 Redis 设计与实现。",
        items: learningBooks(["high-performance-mysql","redis-design-implementation"]),
      },
      {
        level: "advanced",
        summary: "数据库系统概念深入。",
        items: learningBooks(["database-system-concepts"]),
      },
    ],
  },
  {
    slug: "networking",
    title: "计算机网络",
    description: "HTTP、TCP/IP 与网络抓包分析。",
    stages: [
      {
        level: "beginner",
        summary: "图解 HTTP 与 HTTP 权威指南。",
        items: learningBooks(["illustrated-http","http-definitive-guide"]),
      },
      {
        level: "intermediate",
        summary: "自顶向下计算机网络、TCP/IP 详解与抓包分析。",
        items: learningBooks(["computer-networks-top-down","tcp-ip-illustrated-vol1","wireshark-packet-analysis"]),
      },
      {
        level: "advanced",
        summary: "UNIX 网络编程套接字 API。",
        items: learningBooks(["unix-network-programming-vol1"]),
      },
    ],
  },
  {
    slug: "os-systems",
    title: "操作系统与系统编程",
    description: "计算机原理、操作系统、Linux/Windows 内核与系统编程。",
    stages: [
      {
        level: "beginner",
        summary: "计算机与程序是怎样跑起来的、CSAPP。",
        items: learningBooks(["how-computers-work","how-programs-work","csapp"]),
      },
      {
        level: "intermediate",
        summary: "操作系统概念、现代操作系统与 UNIX 编程艺术。",
        items: learningBooks(["os-concepts","modern-os","linux-os-practice","art-of-unix-programming"]),
      },
      {
        level: "advanced",
        summary: "Linux/Windows 内核、UNIX 高级编程与内存管理。",
        items: learningBooks(["linux-kernel-design","linux-kernel-essence","unix-advanced-programming","windows-journey","windows-kernel-programming","mfc-deep-dive","gc-handbook"]),
      },
    ],
  },
  {
    slug: "compilers",
    title: "编译原理",
    description: "从自制编译器到龙书、虎书的编译原理体系。",
    stages: [
      {
        level: "beginner",
        summary: "两周自制脚本语言与自制编译器入门。",
        items: learningBooks(["two-week-scripting-language","crafting-compiler"]),
      },
      {
        level: "intermediate",
        summary: "编译器设计与虎书现代编译原理。",
        items: learningBooks(["engineering-a-compiler","tiger-book-compiler"]),
      },
      {
        level: "advanced",
        summary: "龙书编译原理深入。",
        items: learningBooks(["dragon-book-compilers"]),
      },
    ],
  },
  {
    slug: "blockchain",
    title: "区块链",
    description: "白话区块链、开发实战与比特币/以太坊精通。",
    stages: [
      {
        level: "beginner",
        summary: "白话区块链入门。",
        items: learningBooks(["blockchain-plain"]),
      },
      {
        level: "intermediate",
        summary: "区块链开发实战与精通比特币。",
        items: learningBooks(["blockchain-dev-practice","mastering-bitcoin"]),
      },
      {
        level: "advanced",
        summary: "精通以太坊。",
        items: learningBooks(["mastering-ethereum"]),
      },
    ],
  },
  {
    slug: "automotive",
    title: "汽车与车机",
    description: "从整车构造到 AUTOSAR、SOA 与智能车软件。",
    stages: [
      {
        level: "beginner",
        summary: "汽车构造图解与新能源汽车原理。",
        items: learningBooks(["auto-why-car-runs","car-structure-illustrated","illustrated-nev"]),
      },
      {
        level: "intermediate",
        summary: "汽车电子软件架构与 AUTOSAR。",
        items: learningBooks(["automotive-systems-specialization","soa-vehicle-architecture","autosar-vehicle-controller"]),
      },
      {
        level: "advanced",
        summary: "智能车软件与软件定义汽车。",
        items: learningBooks(["vehicle-software-intelligence"]),
      },
    ],
  },
  {
    slug: "soft-skills",
    title: "职业素养与学习方法",
    description: "认知科学、刻意练习、管理与组织方法论。",
    stages: [
      {
        level: "beginner",
        summary: "认知天性、终身成长与刻意练习。",
        items: learningBooks(["make-it-stick","mindset-growth","peak-deliberate-practice"]),
      },
      {
        level: "intermediate",
        summary: "卓有成效的管理者、组织问题工具与失控。",
        items: learningBooks(["effective-executive","org-problem-tools","out-of-control"]),
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
  // Pearls of Algorithm Engineering
  "基础与模型",
  "随机化与并行",
  "排序、集合与搜索",
  "压缩与编码",
  "压缩数据结构",
  "结语",
  // Data Structures and Algorithm Analysis in C++, Third Edition
  "导论与分析",
  "线性结构与树",
  "散列与优先队列",
  "排序、并查集与图",
  "算法设计与均摊",
  "高级数据结构与附录",
  // Algorithms, Fourth Edition
  "基础",
  "排序",
  "查找",
  "图",
  "字符串",
  "背景",
  // 深入浅出算法竞赛（图解版）
  "算法竞赛基础",
  "穷举、贪心与随机",
  "搜索与动态规划",
  "分治方法",
  // Introduction to Algorithms, Fourth Edition
  "CLRS4 · 基础",
  "CLRS4 · 排序与顺序统计",
  "CLRS4 · 数据结构",
  "CLRS4 · 高级设计与分析",
  "CLRS4 · 高级数据结构",
  "CLRS4 · 图算法",
  "CLRS4 · 专题",
  "CLRS4 · 数学基础",
  // Hacker's Delight, Second Edition
  "HD2 · 基础与边界",
  "HD2 · 位统计与重排",
  "HD2 · 乘除法",
  "HD2 · 函数与编码",
  "HD2 · 校验与曲线",
  "HD2 · 数值专题与附录",
  // The Art of Computer Programming, published Volumes 1-4B
  "TAOCP · 全书导览",
  "TAOCP · Volume 1",
  "TAOCP · Volume 2",
  "TAOCP · Volume 3",
  "TAOCP · Volume 4",
  "TAOCP · 总复习",
  // Rust 编程之道（张汉东，2019）
  "Rust之道 · 全书导览",
  "Rust之道 · 基础与类型",
  "Rust之道 · 所有权与抽象",
  "Rust之道 · 工程与并发",
  "Rust之道 · 元编程与安全边界",
  "Rust之道 · 总复习",
  // Go in Action, First Edition
  "Go实战 · 全书导览",
  "Go实战 · 语言与工具",
  "Go实战 · 数据与类型",
  "Go实战 · 并发",
  "Go实战 · 工程",
  "Go实战 · 总复习",
  // Go Web Programming (Sau Sheong Chang, Manning, 2016)
  "Go Web编程 · 全书导览",
  "Go Web编程 · 基础与全景",
  "Go Web编程 · 请求与响应",
  "Go Web编程 · 展示与数据",
  "Go Web编程 · 服务与验证",
  "Go Web编程 · 并发与部署",
  "Go Web编程 · 总复习",
  // Fluent Python, Second Edition
  "流畅Python 2e · 全书导览",
  "流畅Python 2e · Part I 数据结构",
  "流畅Python 2e · Part II 函数作为对象",
  "流畅Python 2e · Part III 类与协议",
  "流畅Python 2e · Part IV 控制流",
  "流畅Python 2e · Part V 元编程",
  "流畅Python 2e · 总复习",
  // Python自动化运维：技术与最佳实践
  "Python自动化运维 · 全书导览",
  "Python自动化运维 · 基础篇",
  "Python自动化运维 · 高级篇",
  "Python自动化运维 · 案例篇",
  "Python自动化运维 · 总复习",
  // Mastering Rust, Second Edition
  "精通Rust 2e · 全书导览",
  "精通Rust 2e · 工程基础",
  "精通Rust 2e · 类型与安全",
  "精通Rust 2e · 并发与底层",
  "精通Rust 2e · 服务端工程",
  "精通Rust 2e · 跨平台与调试",
  "精通Rust 2e · 总复习",
  // Tarek Ziadé · Expert Python Programming / Python高级编程
  "Python高级编程 · 全书导览",
  "Python高级编程 · 语言与API",
  "Python高级编程 · 包与应用",
  "Python高级编程 · 项目生命周期",
  "Python高级编程 · 性能与设计",
  "Python高级编程 · 总复习",
  // 程序员的数学三册系列
  "程序员的数学系列 · 全书导览",
  "程序员的数学1 · 数学思维",
  "程序员的数学2 · 概率统计",
  "程序员的数学3 · 线性代数",
  "程序员的数学系列 · 总复习",
  // Head First Statistics
  "深入浅出统计学 · 全书导览",
  "深入浅出统计学 · 描述统计",
  "深入浅出统计学 · 概率与分布",
  "深入浅出统计学 · 抽样与推断",
  "深入浅出统计学 · 相关与回归",
  "深入浅出统计学 · 总复习",
  "线性代数应该这样学4e · 全书导览",
  "线性代数应该这样学4e · 向量空间",
  "线性代数应该这样学4e · 映射与多项式",
  "线性代数应该这样学4e · 谱与内积",
  "线性代数应该这样学4e · 算子结构",
  "线性代数应该这样学4e · 多线性与行列式",
  "线性代数应该这样学4e · 总复习",
  "具体数学2e · 全书导览",
  "具体数学2e · 递归与求和",
  "具体数学2e · 整数与数论",
  "具体数学2e · 组合数与特殊数",
  "具体数学2e · 生成函数与概率",
  "具体数学2e · 渐近分析",
  "具体数学2e · 总复习",
  "几何数据结构 · 全书导览",
  "几何数据结构 · 空间层次",
  "几何数据结构 · 包围与距离",
  "几何数据结构 · 邻近关系",
  "几何数据结构 · 动态与鲁棒",
  "几何数据结构 · 总复习",
  "Unity Shader精要 · 全书导览",
  "Unity Shader精要 · 基础篇",
  "Unity Shader精要 · 初级篇",
  "Unity Shader精要 · 中级篇",
  "Unity Shader精要 · 高级篇",
  "Unity Shader精要 · 扩展篇",
  "Unity Shader精要 · 总复习",
  "Shader开发实战 · 全书导览",
  "Shader开发实战 · 基础效果",
  "Shader开发实战 · 三维光照",
  "Shader开发实战 · 性能与精度",
  "Shader开发实战 · 引擎落地",
  "Shader开发实战 · 总复习",
  "Unity 3D ShaderLab · 全书导览",
  "Unity 3D ShaderLab · 基础与空间",
  "Unity 3D ShaderLab · 照明路径",
  "Unity 3D ShaderLab · 阴影",
  "Unity 3D ShaderLab · 状态与管线",
  "Unity 3D ShaderLab · 材质与光效",
  "Unity 3D ShaderLab · 场景与屏幕效果",
  "Unity 3D ShaderLab · 组织与优化",
  "Unity 3D ShaderLab · 总复习",
  "Unity屏幕特效秘笈 · 全书导览",
  "Unity屏幕特效秘笈 · 表面与反射",
  "Unity屏幕特效秘笈 · 模型与顶点",
  "Unity屏幕特效秘笈 · 移动与复用",
  "Unity屏幕特效秘笈 · 屏幕效果",
  "Unity屏幕特效秘笈 · 总复习",
  "Unity 6 URP源码 · 全图",
  "Unity 6 URP源码 · 包与契约",
  "Unity 6 URP源码 · Lit主链",
  "Unity 6 URP源码 · 内置材质",
  "Unity 6 URP源码 · 专用Shader",
  "Unity 6 URP源码 · ShaderLibrary",
  "Unity 6 URP源码 · 工程验收",
  "Unity 6 URP源码 · 总复习",
  "GPU Pro 1-7 · 全系列地图",
  "GPU Pro 1-7 · 几何与管线",
  "GPU Pro 1-7 · 光照与材质",
  "GPU Pro 1-7 · 屏幕与稀疏表示",
  "GPU Pro 1-7 · 计算与工程",
  "GPU Pro 1-7 · 综合验收",
  "ShaderX 1-7 · 导读",
  "ShaderX 1-7 · 基础与几何",
  "ShaderX 1-7 · 表面与光照",
  "ShaderX 1-7 · 图像与环境",
  "ShaderX 1-7 · 工程与设备",
  "ShaderX 1-7 · 总验收",
  "入门",
  "3D数学基础 · 全书导览",
  "3D数学基础 · 坐标与向量",
  "3D数学基础 · 矩阵与变换",
  "3D数学基础 · 方位与几何",
  "3D数学基础 · 图形与力学",
  "3D数学基础 · 曲线与下一步",
  "3D数学基础 · 几何测试附录",
  "3D数学基础 · 总复习",
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
  "Unity Game Optimization · 导读",
  "Unity Game Optimization · 诊断与脚本",
  "Unity Game Optimization · 渲染与运行时",
  "Unity Game Optimization · XR、内存与 DOTS",
  "Unity Game Optimization · 工程交付",
  "Unity Game Optimization · 总复习",
  // Unity 3D UI Essentials / Unity UI 设计
  "Unity UI 设计 · 全书导览",
  "Unity UI 设计 · 基础与布局",
  "Unity UI 设计 · 控件与响应式",
  "Unity UI 设计 · 空间与源码",
  "Unity UI 设计 · 总复习",
  // Mastering Unity Scripting / Unity 脚本设计
  "Unity 脚本设计 · 全书导览",
  "Unity 脚本设计 · 语言与调试",
  "Unity 脚本设计 · 世界与事件",
  "Unity 脚本设计 · 渲染与数据",
  "Unity 脚本设计 · AI 与编辑器",
  "Unity 脚本设计 · 资源与交付",
  "Unity 脚本设计 · 总复习",
  // Unity Animation Essentials / Unity 游戏动画设计
  "Unity 游戏动画设计 · 全书导览",
  "Unity 游戏动画设计 · 基础与 2D",
  "Unity 游戏动画设计 · 原生动画与 Mecanim",
  "Unity 游戏动画设计 · 角色动画",
  "Unity 游戏动画设计 · 变形、IK 与视频",
  "Unity 游戏动画设计 · 总复习",
  // Learning Blender, Third Edition / 玩转 Blender：3D 动画角色创作（第 3 版）
  "玩转 Blender 第 3 版 · 全书导览",
  "玩转 Blender 第 3 版 · Blender 基础",
  "玩转 Blender 第 3 版 · 项目与角色设计",
  "玩转 Blender 第 3 版 · 建模",
  "玩转 Blender 第 3 版 · UV、纹理与材质",
  "玩转 Blender 第 3 版 · 绑定与动画",
  "玩转 Blender 第 3 版 · 追踪、合成与渲染",
  "玩转 Blender 第 3 版 · 延伸与总复习",
  // Unity 3D实战核心技术详解
  "Unity 3D 实战核心技术详解 · 全书导览",
  "Unity 3D 实战核心技术详解 · 3D 数学基础",
  "Unity 3D 实战核心技术详解 · 角色、消息与数据",
  "Unity 3D 实战核心技术详解 · AI 与移动端效果",
  "Unity 3D 实战核心技术详解 · MVC 与 FSM 架构",
  "Unity 3D 实战核心技术详解 · 热更新、Shader 与工程发布",
  "Unity 3D 实战核心技术详解 · 总复习",
  // Unity游戏案例开发大全
  "Unity 游戏案例开发大全 · 全书导览",
  "Unity 游戏案例开发大全 · 基础与环境",
  "Unity 游戏案例开发大全 · 桌球与迷宫物理",
  "Unity 游戏案例开发大全 · 触摸、射击与休闲玩法",
  "Unity 游戏案例开发大全 · 酷跑与停车",
  "Unity 游戏案例开发大全 · 飞行与赛车",
  "Unity 游戏案例开发大全 · 总复习",
  // Unity 3D游戏特效制作典型实例
  "Unity 3D 游戏特效制作典型实例 · 全书导览",
  "Unity 3D 游戏特效制作典型实例 · 引擎与规范",
  "Unity 3D 游戏特效制作典型实例 · Unity 工作流",
  "Unity 3D 游戏特效制作典型实例 · 场景与 Max 案例",
  "Unity 3D 游戏特效制作典型实例 · 粒子案例",
  "Unity 3D 游戏特效制作典型实例 · 物理攻击",
  "Unity 3D 游戏特效制作典型实例 · 法术攻击",
  "Unity 3D 游戏特效制作典型实例 · 通用技能",
  "Unity 3D 游戏特效制作典型实例 · 总复习",
  // Unity 3D脚本编程与游戏开发
  "Unity 3D 脚本编程与游戏开发 · 全书导览",
  "Unity 3D 脚本编程与游戏开发 · 脚本与物理",
  "Unity 3D 脚本编程与游戏开发 · 数学与界面",
  "Unity 3D 脚本编程与游戏开发 · 动画、特效与音频",
  "Unity 3D 脚本编程与游戏开发 · 资源与数据",
  "Unity 3D 脚本编程与游戏开发 · AI 与完整项目",
  "Unity 3D 脚本编程与游戏开发 · 进阶编程",
  "Unity 3D 脚本编程与游戏开发 · 总复习",
  // Ultimate Guide to Profiling Unity Games, Unity 6 second edition
  "Profiling Unity 6 · 全书导览",
  "Profiling Unity 6 · 基础与方法",
  "Profiling Unity 6 · 瓶颈与移动端",
  "Profiling Unity 6 · 内存",
  "Profiling Unity 6 · Unity 工具",
  "Profiling Unity 6 · 调试与自动化",
  "Profiling Unity 6 · 平台工具",
  "Profiling Unity 6 · 总复习",
  // Optimize mobile, XR, and web performance, Unity 6 edition
  // Unity 6 mobile, XR, and web optimization guide
  "Unity 6 跨平台优化 · 全书导览",
  "渲染基础、测量与热适应",
  "资产、代码与项目配置",
  "GPU、光照与 Shader",
  "UI、音频与动画",
  "物理、协作与内容治理",
  "Unity Web 构建、发布与 Profiling",
  "XR 专项与舒适度",
  "Unity 6 跨平台优化 · 综合验收",
  // C++ 并发编程实战（第2版）
  "并发基础",
  "共享数据",
  "内存模型与原子操作",
  "并发数据结构",
  "高级并发与工程",
  // Unity 5 权威讲解，李在贤，2016
  "Unity 5 权威讲解 · 全书导览",
  "Unity 5 权威讲解 · 入门与场景",
  "Unity 5 权威讲解 · 角色与战斗",
  "Unity 5 权威讲解 · UI 与架构",
  "Unity 5 权威讲解 · 射线、导航与光照",
  "Unity 5 权威讲解 · 内置网络",
  "Unity 5 权威讲解 · Photon 实战",
  "Unity 5 权威讲解 · 真实感与数据",
  "Unity 5 权威讲解 · 总复习",
  // Game Mechanics: Advanced Game Design, Adams and Dormans, 2012
  "游戏机制高级设计 · 全书导览",
  "游戏机制高级设计 · 基础与复杂系统",
  "游戏机制高级设计 · 经济与 Machinations",
  "游戏机制高级设计 · 模式、模拟与经济",
  "游戏机制高级设计 · 关卡、进程与意义",
  "游戏机制高级设计 · 附录与总复习",
  // Unityで神になる本。, Hiro Tetsuo, 2015 / Chinese edition 2019
  "Unity 神技达人炼成记 · 全书导览",
  "Unity 神技达人炼成记 · 起步与世界",
  "Unity 神技达人炼成记 · 资产与脚本",
  "Unity 神技达人炼成记 · 动画、界面与输出",
  "Unity 神技达人炼成记 · 扩展、可视化与优化",
  "Unity 神技达人炼成记 · 附录与总复习",
  // Unity3D高级编程之进阶主程, Jesse Lu online series
  "Unity3D 高级编程之进阶主程 · 连载导览",
  "Unity3D 高级编程之进阶主程 · 第1章",
  "Unity3D 高级编程之进阶主程 · 第2章",
  "Unity3D 高级编程之进阶主程 · 第3章",
  "Unity3D 高级编程之进阶主程 · 第4章",
  "Unity3D 高级编程之进阶主程 · 第5章",
  "Unity3D 高级编程之进阶主程 · 第6章",
  "Unity3D 高级编程之进阶主程 · 第7章",
  "Unity3D 高级编程之进阶主程 · 第8章",
  "Unity3D 高级编程之进阶主程 · 第10章",
  "Unity3D 高级编程之进阶主程 · 连载验收",
  // 网络游戏服务器端编程, PHEI 2007
  "网络游戏服务器端编程 · 官方导览",
  "网络游戏服务器端编程 · 网络与并发",
  "网络游戏服务器端编程 · 高效通信与安全",
  "网络游戏服务器端编程 · 数据与配套系统",
  "网络游戏服务器端编程 · 全链验收",
  // Unity3D网络游戏实战（第2版）, 罗培羽, 2019
  "Unity3D 网络游戏实战 · 官方导览",
  "Unity3D 网络游戏实战 · 扎基础",
  "Unity3D 网络游戏实战 · 搭框架",
  "Unity3D 网络游戏实战 · 做游戏",
  "Unity3D 网络游戏实战 · 全书验收",
  // Unity与C++网络游戏开发实战, 王静逸/刘岵, 2019
  "Unity 与 C++ 网络游戏 · 官方导览",
  "Unity 与 C++ 网络游戏 · Unity 基础",
  "Unity 与 C++ 网络游戏 · Unity 实战",
  "Unity 与 C++ 网络游戏 · C++ 网络基础",
  "Unity 与 C++ 网络游戏 · C++ 服务器实战",
  "Unity 与 C++ 网络游戏 · 全书验收",
  // 多人在线游戏架构实战：基于C++的分布式游戏编程, 彭放, 2020
  "多人在线游戏架构 · 官方导览",
  "多人在线游戏架构 · 网络基础",
  "多人在线游戏架构 · 框架核心",
  "多人在线游戏架构 · 数据与组件",
  "多人在线游戏架构 · 分布式运行时",
  "多人在线游戏架构 · 全书验收",
  // 网络游戏核心技术与实战, 中嶋谦互, 2014
  "网络游戏核心技术与实战 · 权威学习地图",
  "网络游戏核心技术与实战 · 网络与游戏基础",
  "网络游戏核心技术与实战 · 架构与同步",
  "网络游戏核心技术与实战 · 两类开发实战",
  "网络游戏核心技术与实战 · 辅助系统与运营",
  "网络游戏核心技术与实战 · 开发体制",
  "网络游戏核心技术与实战 · 总复习",
  // 游戏服务器架构与优化, 蔡能, 2018
  "游戏服务器架构与优化 · 权威导览",
  "游戏服务器架构与优化 · 网络和服务器",
  "游戏服务器架构与优化 · 存储与数据库",
  "游戏服务器架构与优化 · 架构演进",
  "游戏服务器架构与优化 · 大厅与实时服务",
  "游戏服务器架构与优化 · 容量、分布式与选型",
  "游戏服务器架构与优化 · 全书验收",
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
  // 逐梦旅程：Windows游戏编程之从零开始
  "学习地图",
  "序篇 · 梦想与行业",
  "第一篇 · Windows程序根基",
  "第二篇 · GDI 2D游戏编程",
  "第三篇 · DirectX游戏编程基础",
  "第四篇 · DirectX游戏编程应用",
  "第五篇 · 引擎与进阶",
  "全书验收",
  // Kotlin Programming: The Big Nerd Ranch Guide（第1版）
  "Kotlin权威指南 · 学习地图",
  "Kotlin权威指南 · 导论",
  "Kotlin权威指南 · 语言基础",
  "Kotlin权威指南 · 函数与空安全",
  "Kotlin权威指南 · 值与集合",
  "Kotlin权威指南 · 对象模型",
  "Kotlin权威指南 · 互操作与协程",
  "Kotlin权威指南 · 参考与挑战",
  "Kotlin权威指南 · 全书验收",
  // 《深入理解Android》Framework三卷
  "深入Android三卷 · 学习地图",
  "深入Android三卷 · 卷I Native基础",
  "深入Android三卷 · 卷I 媒体与设备",
  "深入Android三卷 · 卷II Java基础",
  "深入Android三卷 · 卷II 核心服务",
  "深入Android三卷 · 卷III UI基础",
  "深入Android三卷 · 卷III UI系统",
  "深入Android三卷 · 全书验收",
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
  // 现代 C++ 测试驱动开发
  "TDD 基础",
  "测试设计",
  "工程演进",
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
  "Essential C# 7.0 · Guide",
  "Essential C# 7.0 · Language Foundations",
  "Essential C# 7.0 · Object-Oriented Foundations",
  "Essential C# 7.0 · Type Design",
  "Essential C# 7.0 · Reliability",
  "Essential C# 7.0 · Abstraction and Reuse",
  "Essential C# 7.0 · Functional Building Blocks",
  "Essential C# 7.0 · Collections and Querying",
  "Essential C# 7.0 · Runtime Metadata",
  "Essential C# 7.0 · Concurrency",
  "Essential C# 7.0 · Runtime Boundaries",
  "Essential C# 7.0 · Runtime Architecture",
  "Essential C# 7.0 · Review",
  // 编写高质量代码
  "编写高质量代码 · 导学",
  "编写高质量代码 · 语言篇",
  "编写高质量代码 · 集合与查询",
  "编写高质量代码 · 泛型与消息",
  "编写高质量代码 · 资源与持久化",
  "编写高质量代码 · 失败语义",
  "编写高质量代码 · 并发与并行",
  "编写高质量代码 · API成员",
  "编写高质量代码 · 类型边界",
  "编写高质量代码 · 安全边界",
  "编写高质量代码 · 命名系统",
  "编写高质量代码 · 可维护性",
  "编写高质量代码 · 演进与交付",
  "编写高质量代码 · 总复习",
  // Effective C#
  "Effective C# · 导学",
  "Effective C# · 语言习惯",
  "Effective C# · 资源与构造",
  "Effective C# · 泛型设计",
  "Effective C# · LINQ与执行边界",
  "Effective C# · 异常契约",
  "Effective C# · 总复习",
  // 深入理解 C#
  "C# in Depth 4e · 导学",
  "C# in Depth 4e · Context",
  "C# in Depth 4e · C# 2-5",
  "C# in Depth 4e · C# 6",
  "C# in Depth 4e · C# 7+",
  "C# in Depth 4e · 总复习",
  // C# 函数式编程
  "Functional C# 1e · 导学",
  "Functional C# 1e · Core concepts",
  "Functional C# 1e · Becoming functional",
  "Functional C# 1e · Advanced techniques",
  "Functional C# 1e · 总复习",
  // C# 10 核心技术指南
  "C# 10 Nutshell · 导学",
  "C# 10 Nutshell · Language",
  "C# 10 Nutshell · .NET and Data",
  "C# 10 Nutshell · Runtime Services",
  "C# 10 Nutshell · Metadata and Dynamic",
  "C# 10 Nutshell · Concurrency and Low-level",
  "C# 10 Nutshell · Text",
  "C# 10 Nutshell · 总复习",
  // CLR via C#
  "CLR via C# 4e · 导学",
  "CLR via C# 4e · CLR Basics",
  "CLR via C# 4e · Designing Types",
  "CLR via C# 4e · Essential Types",
  "CLR via C# 4e · Core Facilities",
  "CLR via C# 4e · Threading",
  "CLR via C# 4e · 总复习",
  // Programming in Lua 第4版
  "Programming in Lua 4e · 导学",
  "Programming in Lua 4e · The Basics",
  "Programming in Lua 4e · Real Programming",
  "Programming in Lua 4e · Lua-isms",
  "Programming in Lua 4e · The C API",
  "Programming in Lua 4e · 总复习",
  // たのしいRuby 第5版
  "たのしいRuby 第5版 · 导学",
  "たのしいRuby 第5版 · Ruby初体验",
  "たのしいRuby 第5版 · Ruby的基础",
  "たのしいRuby 第5版 · Ruby的类",
  "たのしいRuby 第5版 · 动手制作工具",
  "たのしいRuby 第5版 · 总复习",
  // 大话数据结构（溢彩加强版）
  "大话数据结构 · 导学",
  "大话数据结构 · 基础",
  "大话数据结构 · 线性结构",
  "大话数据结构 · 树与图",
  "大话数据结构 · 查找与排序",
  "大话数据结构 · 总复习",
  // §6 游戏开发
  "游戏开发",
  // 游戏引擎原理与实践·卷1
  "游戏引擎架构",
  "网络游戏与服务器",
  // JavaScript高级程序设计（第4版）
  "JavaScript高级程序设计（第4版） · 学习地图",
  "JavaScript高级程序设计（第4版） · 语言基础",
  "JavaScript高级程序设计（第4版） · 类型与对象",
  "JavaScript高级程序设计（第4版） · 异步与浏览器",
  "JavaScript高级程序设计（第4版） · DOM与事件",
  "JavaScript高级程序设计（第4版） · 图形、表单与API",
  "JavaScript高级程序设计（第4版） · 数据、网络与存储",
  "JavaScript高级程序设计（第4版） · 模块、Worker与工程",
  "JavaScript高级程序设计（第4版） · 附录",
  "JavaScript高级程序设计（第4版） · 总复习",
  // Vue.js从入门到项目实战
  "Vue.js从入门到项目实战 · 权威导览",
  "Vue.js从入门到项目实战 · 概念与语法",
  "Vue.js从入门到项目实战 · 选项、组件与项目化",
  "Vue.js从入门到项目实战 · 商城实战",
  "Vue.js从入门到项目实战 · 官网、新闻与SVG",
  "Vue.js从入门到项目实战 · 扩展附录",
  "Vue.js从入门到项目实战 · 全书验收",
  // Vue.js设计与实现
  "Vue.js设计与实现 · 权威导览",
  "Vue.js设计与实现 · 框架设计概览",
  "Vue.js设计与实现 · 响应系统",
  "Vue.js设计与实现 · 渲染器",
  "Vue.js设计与实现 · 组件化",
  "Vue.js设计与实现 · 编译器",
  "Vue.js设计与实现 · 服务端渲染",
  "Vue.js设计与实现 · 全书验收",
  // 你不知道的 JavaScript（一版三卷六册）
  "你不知道的 JavaScript · 三卷六册总览",
  "上卷 · 第一部分 作用域和闭包",
  "上卷 · 第二部分 this 和对象原型",
  "中卷 · 第一部分 类型和语法",
  "中卷 · 第二部分 异步和性能",
  "下卷 · 第一部分 入门与进阶",
  "下卷 · 第二部分 ES6 及未来",
  "你不知道的 JavaScript · 全系列复习",
  // JavaScript 权威指南（原书第 7 版）
  "JavaScript 权威指南 · 权威导览",
  "JavaScript 权威指南 · 语言与控制流",
  "JavaScript 权威指南 · 数据与代码组织",
  "JavaScript 权威指南 · 标准库与高级机制",
  "JavaScript 权威指南 · 浏览器平台",
  "JavaScript 权威指南 · Node 与工程工具",
  "JavaScript 权威指南 · 全书验收",
  // JavaScript 全栈开发（凌杰，2021）
  "JavaScript 全栈开发 · 导学",
  "JavaScript 全栈开发 · 起点",
  "JavaScript 全栈开发 · 语言核心",
  "JavaScript 全栈开发 · 浏览器端",
  "JavaScript 全栈开发 · 服务器端",
  "JavaScript 全栈开发 · 总复习",
  "前端与Web",
  "系统与操作系统",
  "JVM与Java生态",
  "Android开发",
  "数据库",
  "分布式与中间件",
  "网络",
  "编译原理",
  "人工智能与机器学习",
  "AI Agent与大模型应用",
  "区块链",
  "汽车与车机",
  "软件工程与最佳实践",
  "通识与个人成长",
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

  const qualityVersion = raw.qualityVersion ?? 1;
  if (qualityVersion !== 1 && qualityVersion !== 2)
    fail("字段 `qualityVersion` 必须是 1 | 2");

  const practiceMode = raw.practiceMode ?? null;
  const practiceModes: readonly ChapterPracticeMode[] = [
    "code",
    "calculation",
    "simulation",
    "diagnosis",
    "design",
  ];
  if (
    practiceMode !== null &&
    !practiceModes.includes(practiceMode as ChapterPracticeMode)
  ) {
    fail(
      "字段 `practiceMode` 必须是 code | calculation | simulation | diagnosis | design",
    );
  }

  const sourceMode = raw.sourceMode ?? null;
  const sourceModes: readonly ChapterSourceMode[] = [
    "licensed-adaptation",
    "independent-rewrite",
    "original",
  ];
  if (
    sourceMode !== null &&
    !sourceModes.includes(sourceMode as ChapterSourceMode)
  ) {
    fail(
      "字段 `sourceMode` 必须是 licensed-adaptation | independent-rewrite | original",
    );
  }
  if (qualityVersion === 2 && (practiceMode === null || sourceMode === null)) {
    fail("qualityVersion: 2 的章节必须声明 practiceMode 与 sourceMode");
  }

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
    qualityVersion: qualityVersion as 1 | 2,
    practiceMode: practiceMode as ChapterPracticeMode | null,
    sourceMode: sourceMode as ChapterSourceMode | null,
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
  const shouldCache = process.env.NODE_ENV === "production";
  if (shouldCache) {
    const cached = chapterIndexCache.get(includeDraft);
    if (cached) return cached;
  }

  if (!fs.existsSync(CONTENT_DIR)) {
    const empty: ChapterMeta[] = [];
    if (shouldCache) chapterIndexCache.set(includeDraft, empty);
    return empty;
  }

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

  const sorted = chapters.sort((a, b) => {
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

  if (shouldCache) chapterIndexCache.set(includeDraft, sorted);
  return sorted;
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

/** 侧边栏首屏只需要书籍身份；章节详情由静态 API 按书加载。 */
export type NavBookSummary = Pick<NavBook, "bookSlug" | "bookTitle">;

export type LibraryPathBookItem = {
  kind: "book";
  book: NavBookSummary;
  optional: boolean;
};

export type LibraryPathMissingItem = {
  kind: "missing";
  title: string;
};

export interface LibraryPathStage {
  level: LearningStageLevel;
  label: string;
  items: Array<LibraryPathBookItem | LibraryPathMissingItem>;
}

export interface LibraryPath {
  slug: string;
  title: string;
  stages: LibraryPathStage[];
}

export type LibraryNavigationTree = LibraryPath[];

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

function assertLearningPathCoverage(books: NavBook[]): void {
  const availableBookSlugs = new Set(books.map((book) => book.bookSlug));
  const assignmentCounts = new Map<string, number>();

  for (const path of LEARNING_PATH_CONFIGS) {
    for (const stage of path.stages) {
      for (const item of stage.items) {
        if (!("bookSlug" in item)) continue;
        assignmentCounts.set(
          item.bookSlug,
          (assignmentCounts.get(item.bookSlug) ?? 0) + 1,
        );
      }
    }
  }

  const missing = books
    .map((book) => book.bookSlug)
    .filter((bookSlug) => !assignmentCounts.has(bookSlug));
  const duplicates = [...assignmentCounts.entries()]
    .filter(([, count]) => count > 1)
    .map(([bookSlug]) => bookSlug);
  const unavailable = [...assignmentCounts.keys()].filter(
    (bookSlug) => !availableBookSlugs.has(bookSlug),
  );

  if (missing.length || duplicates.length || unavailable.length) {
    throw new Error(
      [
        "学习路径必须与已发布书库一一对应。",
        missing.length ? `未归类: ${missing.join(", ")}` : "",
        duplicates.length ? `重复归类: ${duplicates.join(", ")}` : "",
        unavailable.length ? `无可用章节: ${unavailable.join(", ")}` : "",
      ]
        .filter(Boolean)
        .join(" "),
    );
  }
}

export function getLearningPathTree(): LearningPathTree {
  const books = getChapterTree();
  assertLearningPathCoverage(books);
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
            note: item.note ?? LEARNING_STAGE_BOOK_NOTES[stage.level],
            optional: item.optional ?? false,
            firstHref: chapters[0]?.href ?? null,
            chapterCount: chapters.length,
          };
        })
        .filter((item): item is LearningPathItem => item !== null),
    })),
  }));
}

/**
 * 客户端侧栏使用的轻量路径树。完整章节树不再序列化进每个章节页，
 * 而是在用户展开某本书时从 /api/library/<bookSlug> 按需获取。
 */
export function getLibraryNavigationTree(): LibraryNavigationTree {
  return getLearningPathTree().map((path) => ({
    slug: path.slug,
    title: path.title,
    stages: path.stages.map((stage) => ({
      level: stage.level,
      label: stage.label,
      items: stage.items.map((item) =>
        item.kind === "missing"
          ? { kind: "missing" as const, title: item.title }
          : {
              kind: "book" as const,
              book: {
                bookSlug: item.book.bookSlug,
                bookTitle: item.book.bookTitle,
              },
              optional: item.optional,
            },
      ),
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
