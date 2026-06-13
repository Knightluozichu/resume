/**
 * pagefind 运行时 API 的最小类型声明（HEL-42）。
 *
 * `/pagefind/pagefind.js` 是构建期由 pagefind CLI 生成的静态产物，仓库里不存在
 * （进 .gitignore，deploy 时本地生成），因此用 `@ts-expect-error` + 本声明给动态
 * import 的返回值套一个结构类型，避免 any 漫游、又不要求构建期存在该文件。
 *
 * 仅声明本站搜索用到的子集；完整 API 见 https://pagefind.app/docs/api/
 */

/** 单条搜索结果在 `search()` 时的「未加载详情」句柄 */
export interface PagefindSearchResult {
  /** 结果的稳定 id */
  id: string;
  /** 拉取该结果的完整数据（标题 / 摘录 / url / 子结果等） */
  data(): Promise<PagefindResultData>;
}

/** 单个高亮子结果（命中所在的小节，含锚点） */
export interface PagefindSubResult {
  title: string;
  /** 带锚点的页面内 url（如 /learn/.../shaders/#uniform） */
  url: string;
  /** 含 <mark> 高亮标记的摘录 HTML */
  excerpt: string;
}

/** 拉取后的完整结果数据 */
export interface PagefindResultData {
  /** 页面 url（pagefind 已去掉结尾 index.html，含结尾斜杠） */
  url: string;
  /** 页面标题（取自 <h1> / <title>） */
  meta: { title?: string } & Record<string, string | undefined>;
  /** 含 <mark> 高亮标记的摘录 HTML（纯文本片段，已转义） */
  excerpt: string;
  /** 页面内命中的小节（取首个作为「跳转到此节」） */
  sub_results: PagefindSubResult[];
}

/** `search()` 的返回 */
export interface PagefindSearchResponse {
  results: PagefindSearchResult[];
}

/** pagefind.js 的运行时 API（以命名导出形式提供，无 default export） */
export interface PagefindApi {
  options(opts: Record<string, unknown>): Promise<void>;
  init(): Promise<void>;
  search(term: string): Promise<PagefindSearchResponse>;
  /** 预加载：用户敲字时提前取索引分片，降低首查延迟 */
  preload(term: string): Promise<void>;
}
