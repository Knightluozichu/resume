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
  "learnopengl",
  "cpp-primer-5e",
  "c-primer-plus",
  "android-advanced-decryption",
  "big-nerd-ranch-guide",
  "unity-game-optimization",
  "profiling-unity-games",
  "mobile-xr-web-optimization",
  "cpp-concurrency",
  "unity5",
  "ai-agent-dev",
  "ai-agent",
  "ai-agent-apps",
] as const;

/** book slug → 书显示名（侧边栏书头、列表页书标题）。 */
export const BOOK_TITLES: Record<string, string> = {
  learnopengl: "LearnOpenGL",
  "cpp-primer-5e": "C++ Primer 第5版",
  "c-primer-plus": "C Primer Plus（第6版）",
  "android-advanced-decryption": "Android进阶解密",
  "big-nerd-ranch-guide": "Android 编程权威指南（第4版）",
  "unity-game-optimization": "Unity 游戏优化",
  "profiling-unity-games": "Unity Profiling 指南",
  "mobile-xr-web-optimization": "Unity Mobile/XR/Web 优化",
  "cpp-concurrency": "C++ 并发编程实战（第2版）",
  unity5: "Unity 5 权威讲解",
  "ai-agent-dev": "AI Agent 开发实战",
  "ai-agent": "从零构建 AI Agent",
  "ai-agent-apps": "AI 智能体应用开发",
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
        summary: "需要一座从应用层到源码层的桥。",
        items: [
          {
            title: "Jetpack / Compose / 架构工程实践",
            note: "待补：建议覆盖 ViewModel、Room、Navigation、Compose、架构分层与测试。",
            missing: true,
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
    slug: "graphics",
    title: "图形渲染",
    description: "从数学和图形学基础，到 OpenGL 实作，再到实时渲染架构。",
    stages: [
      {
        level: "beginner",
        summary: "LearnOpenGL 之前最好补一点线性代数和图形学基础。",
        items: [
          {
            title: "图形学数学基础",
            note: "待补：建议覆盖向量、矩阵、坐标变换、光照模型和采样直觉。",
            missing: true,
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
        summary: "继续补实时渲染、引擎渲染架构和现代图形 API。",
        items: [
          {
            title: "实时渲染 / 引擎渲染架构",
            note: "待补：建议覆盖渲染图、GPU 驱动成本、现代管线与引擎架构。",
            missing: true,
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
  "入门",
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
  // Android进阶解密
  "系统架构",
  "系统启动",
  "进程管理",
  "四大组件",
  "核心服务",
  "底层技术",
  "高级技术",
  "性能优化",
  // Android 编程权威指南
  "基础入门",
  "UI与Fragment",
  "Intent与数据",
  "后台与网络",
  "高级UI与动画",
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
