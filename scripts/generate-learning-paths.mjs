#!/usr/bin/env node
/**
 * generate-learning-paths.mjs —— 生成完整的 LEARNING_PATH_CONFIGS（覆盖全部书籍）。
 * 用法：node scripts/generate-learning-paths.mjs > /tmp/learning-paths.txt
 * 输出可直接替换 content.ts 中 LEARNING_PATH_CONFIGS 的代码块。
 * 内置校验：每本书必须且只能归入一个路径。
 */
import fs from "node:fs";

// 每个路径：slug, title, description, stages[{level, summary, books[]}]
// 标注 * 的为已上架书（保持原位）。共 225 本。
const PATHS = [
  {
    slug: "graphics", title: "计算机图形学与渲染",
    description: "从图形学概念与 API 实作，进入实时渲染、PBR 与全局光照。",
    stages: [
      { level: "beginner", summary: "理解渲染管线、光栅化、OpenGL 基础与光线追踪直觉。", books: ["ray-tracing-weekend", "learnopengl", "cg-principles-practice", "computer-graphics-4e"] },
      { level: "intermediate", summary: "用 OpenGL、Vulkan 与几何数据结构完成现代渲染实践。", books: ["deep-opengl", "opengl-superbible", "opengl-redbook", "vulkan-guide", "geometric-data-structures", "real-time-collision-detection", "game-math-3d"] },
      { level: "advanced", summary: "深入实时渲染架构、基于物理的渲染与全局光照。", books: ["pbrt-book", "real-time-rendering-4e", "global-illumination", "gpu-gems", "gpu-pro", "shaderx", "shader-practice"] },
    ],
  },
  {
    slug: "game-dev", title: "游戏开发",
    description: "游戏引擎架构、网络同步、服务器与性能优化的工程实践。",
    stages: [
      { level: "beginner", summary: "游戏程序员成长路径、设计基础、脚本语言与 3D 创作入门。", books: ["game-programmer-path", "beginning-cpp-game-programming", "game-design-fundamentals", "lua-programming", "blender-3d"] },
      { level: "intermediate", summary: "游戏编程模式、引擎架构与核心机制设计。", books: ["game-programming-patterns", "game-engine-architecture-3e", "game-engine-practice-vol1", "game-engine-practice-vol2", "game-mechanics-advanced", "unity-game-optimization"] },
      { level: "advanced", summary: "网络游戏核心技术、服务器架构与多人在线架构。", books: ["game-network-core-tech", "game-server-programming", "game-server-architecture", "multiplayer-game-architecture", "multiplayer-game-programming"] },
    ],
  },
  {
    slug: "unity", title: "Unity 引擎",
    description: "Unity 脚本、渲染、动画、特效与性能优化的系统训练。",
    stages: [
      { level: "beginner", summary: "Unity 脚本、UI、动画与核心技术入门。", books: ["unity5", "unity-core-tech", "unity-scripting", "unity-scripting-game-dev", "unity-ui-design", "unity-animation"] },
      { level: "intermediate", summary: "Shader、URP、屏幕特效与高级编程进阶。", books: ["unity-advanced-programming", "unity-master", "unity-game-cases", "unity-shader-essentials", "unity-shaderlab", "unity-urp-shaders", "unity-screen-effects", "unity-vfx"] },
      { level: "advanced", summary: "网络游戏、HMI 座舱、性能分析与跨平台优化。", books: ["unity-mmo-game", "unity-cpp-network-game", "unity-hmi", "profiling-unity-games", "mobile-xr-web-optimization"] },
    ],
  },
  {
    slug: "android", title: "Android 开发",
    description: "从入门到内核的 Android 应用与系统开发系统训练。",
    stages: [
      { level: "beginner", summary: "Android 应用开发入门、Kotlin 语言与第一行代码。", books: ["big-nerd-ranch-guide", "first-line-android", "crazy-android", "kotlin-definitive-guide", "kotlin-in-action"] },
      { level: "intermediate", summary: "开发艺术探索、组件化架构、设计模式与 Compose。", books: ["android-art-exploration", "android-advanced-light", "android-component-arch", "android-design-patterns", "jetpack-compose"] },
      { level: "advanced", summary: "进阶解密、性能优化与 Framework/内核深入。", books: ["android-advanced-decryption", "android-perf-optimization", "deep-android-kernel", "deep-android-volumes"] },
    ],
  },
  {
    slug: "cpp", title: "C/C++ 编程",
    description: "从 C 语言基础到 C++ 高性能、并发与对象模型的深度训练。",
    stages: [
      { level: "beginner", summary: "C/C++ 语言基础：指针、内存、语法与底层视角。", books: ["c-primer-plus", "cpp-primer-plus", "easy-cpp-5e", "the-c-programming-language", "cpu-eye-cpp"] },
      { level: "intermediate", summary: "Effective 系列、高性能与对象模型深入。", books: ["cpp-primer-5e", "effective-cpp", "effective-modern-cpp", "cpp-high-performance", "cpp-testing-recipes", "inside-cpp-object-model"] },
      { level: "advanced", summary: "并发编程、服务器开发、泛型设计与性能优化。", books: ["cpp-concurrency", "cpp-server-essence", "modern-cpp-design", "optimized-cpp"] },
    ],
  },
  {
    slug: "java", title: "Java 与 JVM",
    description: "Java 核心技术、Effective 实践与 JVM 调优深入。",
    stages: [
      { level: "beginner", summary: "Java 语言入门与核心技术体系。", books: ["head-first-java", "java-core-tech"] },
      { level: "intermediate", summary: "Effective Java 最佳实践与 JVM 深入理解。", books: ["effective-java", "deep-understanding-jvm", "jvm-troubleshooting"] },
      { level: "advanced", summary: "G1 垃圾收集器源码分析与调优。", books: ["jvm-g1-tuning"] },
    ],
  },
  {
    slug: "csharp-dotnet", title: "C# 与 .NET",
    description: "C# 语言核心、函数式编程与 .NET 内存管理。",
    stages: [
      { level: "beginner", summary: "C# 语言核心与本质论入门。", books: ["csharp-10-core", "essential-csharp-7"] },
      { level: "intermediate", summary: "CLR 原理、深入理解 C# 与函数式编程。", books: ["clr-via-csharp", "deep-understanding-csharp", "effective-csharp", "csharp-functional-programming"] },
      { level: "advanced", summary: "高质量代码实践与 .NET 内存管理。", books: ["csharp-quality-code", "dotnet-memory"] },
    ],
  },
  {
    slug: "python", title: "Python 编程",
    description: "Python 从入门到流畅、高级编程与自动化运维。",
    stages: [
      { level: "beginner", summary: "Python 编程入门与实践。", books: ["python-crash-course"] },
      { level: "intermediate", summary: "流畅的 Python 与高级编程。", books: ["fluent-python", "python-advanced"] },
      { level: "advanced", summary: "Python 自动化运维实践。", books: ["python-ops"] },
    ],
  },
  {
    slug: "go", title: "Go 语言",
    description: "Go 程序设计、实战与 Web 编程。",
    stages: [
      { level: "beginner", summary: "Go 程序设计语言基础。", books: ["go-programming-language"] },
      { level: "intermediate", summary: "Go 语言实战与 Web 编程。", books: ["go-in-action", "go-web-programming"] },
    ],
  },
  {
    slug: "rust", title: "Rust 语言",
    description: "Rust 程序设计语言、编程之道与精通。",
    stages: [
      { level: "beginner", summary: "Rust 程序设计语言入门。", books: ["rust-programming-language"] },
      { level: "intermediate", summary: "Rust 编程之道与精通进阶。", books: ["rust-way", "mastering-rust-2e"] },
    ],
  },
  {
    slug: "frontend", title: "前端开发",
    description: "JavaScript、CSS、Vue.js 与前端工程化体系。",
    stages: [
      { level: "beginner", summary: "JavaScript 高级程序设计与 CSS 揭秘。", books: ["javascript-pro-guide", "css-secrets"] },
      { level: "intermediate", summary: "JavaScript 权威指南、CSS 世界与 Vue 实战。", books: ["javascript-definitive-guide", "you-dont-know-js", "css-world", "vuejs-practice"] },
      { level: "advanced", summary: "Vue.js 设计与实现、全栈开发与前端工程化。", books: ["vuejs-design-implementation", "javascript-fullstack", "frontend-engineering"] },
    ],
  },
  {
    slug: "nodejs", title: "Node.js",
    description: "Node.js 深入浅出、权威指南与调试。",
    stages: [
      { level: "beginner", summary: "Node.js 权威指南入门。", books: ["nodejs-definitive-guide"] },
      { level: "intermediate", summary: "深入浅出 Node.js 与调试指南。", books: ["deep-nodejs", "nodejs-debugging-guide"] },
    ],
  },
  {
    slug: "algorithms", title: "算法与数据结构",
    description: "从图解算法直觉到算法导论与数学基础的体系训练。",
    stages: [
      { level: "beginner", summary: "图解建立算法直觉、数据结构与程序员数学。", books: ["grokking-algorithms-2e", "data-structures-visual", "programmers-math", "math-girl"] },
      { level: "intermediate", summary: "面试、算法竞赛与经典算法教材。", books: ["coding-interviews", "algorithms-4e", "dsa-cpp", "competitive-algorithms", "programming-pearls", "advanced-algorithm-engineering", "hackers-delight"] },
      { level: "advanced", summary: "算法导论、具体数学、线代与统计基础。", books: ["introduction-to-algorithms", "taocp", "concrete-mathematics", "linear-algebra-done-right", "head-first-statistics"] },
    ],
  },
  {
    slug: "ai-ml", title: "人工智能与机器学习",
    description: "从机器学习基础、深度学习到大模型应用与智能体开发。",
    stages: [
      { level: "beginner", summary: "图解 AI/ML/DL 与经典机器学习教材。", books: ["illustrated-ai", "illustrated-ml", "illustrated-dl", "machine-learning-watermelon", "statistical-learning-methods"] },
      { level: "intermediate", summary: "深度学习入门系列、花书与强化学习。", books: ["rl-deep-learning-c", "deep-learning-from-scratch", "deep-learning-from-scratch-2", "deep-learning-textbook", "deep-learning-nlp-advanced", "deep-learning-rl-from-scratch", "deep-learning-gen-models", "deep-reinforcement-learning", "pattern-recognition-ml", "multiagent-systems"] },
      { level: "advanced", summary: "大语言模型、LangChain 与 AI Agent 开发。", books: ["ai-agent-dev", "ai-agent-apps", "ai-agent", "building-llm-applications", "langchain-programming", "large-language-models", "large-scale-llm-practice", "llm-app-dev-essentials", "chatgpt-principles-practice", "this-is-chatgpt"] },
    ],
  },
  {
    slug: "software-engineering", title: "软件工程与最佳实践",
    description: "设计模式、代码质量、重构与架构的工程管理。",
    stages: [
      { level: "beginner", summary: "设计模式动机、代码大全与程序员修炼之道。", books: ["head-first-design-patterns", "pragmatic-programmer", "code-complete-2e", "coder-revolution"] },
      { level: "intermediate", summary: "代码质量、重构与 GoF 设计模式。", books: ["code-quality-refactoring", "design-patterns"] },
      { level: "advanced", summary: "整洁架构、DDD 与企业应用模式。", books: ["architecture-domain-design", "poeaa-enterprise-patterns", "mythical-man-month"] },
    ],
  },
  {
    slug: "backend", title: "后端与分布式系统",
    description: "Spring、微服务、消息队列与分布式数据架构。",
    stages: [
      { level: "beginner", summary: "Spring 实战与服务器端网络架构入门。", books: ["spring-in-action", "illustrated-server-network", "ruby-programming"] },
      { level: "intermediate", summary: "微服务架构、Kafka、RabbitMQ、网关与 Kubernetes。", books: ["microservices-patterns", "kafka-definitive-guide", "rabbitmq-practice", "kong-gateway", "kubernetes-in-action"] },
      { level: "advanced", summary: "凤凰架构与分布式数据密集型应用。", books: ["phoenix-architecture", "ddia"] },
    ],
  },
  {
    slug: "database", title: "数据库",
    description: "SQL、MySQL、Redis 与数据库系统概念。",
    stages: [
      { level: "beginner", summary: "SQL 必知必会与 MySQL 入门。", books: ["sql-ten-minutes", "mysql-essentials"] },
      { level: "intermediate", summary: "高性能 MySQL 与 Redis 设计与实现。", books: ["high-performance-mysql", "redis-design-implementation"] },
      { level: "advanced", summary: "数据库系统概念深入。", books: ["database-system-concepts"] },
    ],
  },
  {
    slug: "networking", title: "计算机网络",
    description: "HTTP、TCP/IP 与网络抓包分析。",
    stages: [
      { level: "beginner", summary: "图解 HTTP 与 HTTP 权威指南。", books: ["illustrated-http", "http-definitive-guide"] },
      { level: "intermediate", summary: "自顶向下计算机网络、TCP/IP 详解与抓包分析。", books: ["computer-networks-top-down", "tcp-ip-illustrated-vol1", "wireshark-packet-analysis"] },
      { level: "advanced", summary: "UNIX 网络编程套接字 API。", books: ["unix-network-programming-vol1"] },
    ],
  },
  {
    slug: "os-systems", title: "操作系统与系统编程",
    description: "计算机原理、操作系统、Linux/Windows 内核与系统编程。",
    stages: [
      { level: "beginner", summary: "计算机与程序是怎样跑起来的、CSAPP。", books: ["how-computers-work", "how-programs-work", "csapp"] },
      { level: "intermediate", summary: "操作系统概念、现代操作系统与 UNIX 编程艺术。", books: ["os-concepts", "modern-os", "linux-os-practice", "art-of-unix-programming"] },
      { level: "advanced", summary: "Linux/Windows 内核、UNIX 高级编程与内存管理。", books: ["linux-kernel-design", "linux-kernel-essence", "unix-advanced-programming", "windows-journey", "windows-kernel-programming", "mfc-deep-dive", "gc-handbook"] },
    ],
  },
  {
    slug: "compilers", title: "编译原理",
    description: "从自制编译器到龙书、虎书的编译原理体系。",
    stages: [
      { level: "beginner", summary: "两周自制脚本语言与自制编译器入门。", books: ["two-week-scripting-language", "crafting-compiler"] },
      { level: "intermediate", summary: "编译器设计与虎书现代编译原理。", books: ["engineering-a-compiler", "tiger-book-compiler"] },
      { level: "advanced", summary: "龙书编译原理深入。", books: ["dragon-book-compilers"] },
    ],
  },
  {
    slug: "blockchain", title: "区块链",
    description: "白话区块链、开发实战与比特币/以太坊精通。",
    stages: [
      { level: "beginner", summary: "白话区块链入门。", books: ["blockchain-plain"] },
      { level: "intermediate", summary: "区块链开发实战与精通比特币。", books: ["blockchain-dev-practice", "mastering-bitcoin"] },
      { level: "advanced", summary: "精通以太坊。", books: ["mastering-ethereum"] },
    ],
  },
  {
    slug: "automotive", title: "汽车与车机",
    description: "从整车构造到 AUTOSAR、SOA 与智能车软件。",
    stages: [
      { level: "beginner", summary: "汽车构造图解与新能源汽车原理。", books: ["auto-why-car-runs", "car-structure-illustrated", "illustrated-nev"] },
      { level: "intermediate", summary: "汽车电子软件架构与 AUTOSAR。", books: ["automotive-systems-specialization", "soa-vehicle-architecture", "autosar-vehicle-controller"] },
      { level: "advanced", summary: "智能车软件与软件定义汽车。", books: ["vehicle-software-intelligence"] },
    ],
  },
  {
    slug: "soft-skills", title: "职业素养与学习方法",
    description: "认知科学、刻意练习、管理与组织方法论。",
    stages: [
      { level: "beginner", summary: "认知天性、终身成长与刻意练习。", books: ["make-it-stick", "mindset-growth", "peak-deliberate-practice"] },
      { level: "intermediate", summary: "卓有成效的管理者、组织问题工具与失控。", books: ["effective-executive", "org-problem-tools", "out-of-control"] },
    ],
  },
];

// 校验：收集所有归入路径的书
const assigned = new Map();
for (const p of PATHS) for (const s of p.stages) for (const b of s.books) {
  if (assigned.has(b)) { console.error(`重复归类: ${b} (${assigned.get(b)} 与 ${p.slug})`); process.exit(1); }
  assigned.set(b, p.slug);
}

// 读取实际 content 目录
const dirs = fs.readdirSync("content", { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name)
  .filter((d) => fs.readdirSync("content/" + d).some((f) => f.endsWith(".mdx") || fs.statSync("content/" + d + "/" + f).isDirectory()));

const missing = dirs.filter((d) => !assigned.has(d));
const extra = [...assigned.keys()].filter((b) => !dirs.includes(b));
if (missing.length) { console.error("未归类的书: " + missing.join(", ")); process.exit(1); }
if (extra.length) { console.error("归类了但不存在的书: " + extra.join(", ")); process.exit(1); }
console.error(`校验通过: ${assigned.size} 本书归入 ${PATHS.length} 个路径，无重复无遗漏。`);

// 生成代码
const L = (indent, s) => " ".repeat(indent) + s;
let out = "";
out += L(0, "const LEARNING_PATH_CONFIGS: LearningPathConfig[] = [\n");
for (const p of PATHS) {
  out += L(2, "{\n");
  out += L(4, `slug: "${p.slug}",\n`);
  out += L(4, `title: "${p.title}",\n`);
  out += L(4, `description: "${p.description}",\n`);
  out += L(4, "stages: [\n");
  for (const s of p.stages) {
    out += L(6, "{\n");
    out += L(8, `level: "${s.level}",\n`);
    out += L(8, `summary: "${s.summary}",\n`);
    out += L(8, `items: learningBooks(${JSON.stringify(s.books)}),\n`);
    out += L(6, "},\n");
  }
  out += L(4, "],\n");
  out += L(2, "},\n");
}
out += L(0, "];\n");
console.log(out);
