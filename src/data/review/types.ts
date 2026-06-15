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
  | "ugo-evaluating-performance-problems"
  | "ugo-scripting-strategies"
  | "ugo-benefits-of-batching"
  | "ugo-optimizing-art-assets"
  | "ugo-faster-physics"
  | "ugo-dynamic-graphics"
  | "ugo-xr-optimizations"
  | "ugo-memory-management";

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
  "ugo-evaluating-performance-problems": "评估性能问题",
  "ugo-scripting-strategies": "脚本优化策略",
  "ugo-benefits-of-batching": "合批的收益",
  "ugo-optimizing-art-assets": "美术资源优化",
  "ugo-faster-physics": "物理加速",
  "ugo-dynamic-graphics": "动态图形",
  "ugo-xr-optimizations": "XR 优化",
  "ugo-memory-management": "内存管理",
};

/** 等级 → 短标签（卡片徽标文案）。 */
export const LEVEL_LABELS: Record<ReviewLevel, string> = {
  1: "L1 认记",
  2: "L2 理解",
  3: "L3 应用",
  4: "L4 综合",
};
