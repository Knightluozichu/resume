"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import type { PagefindApi, PagefindResultData } from "./pagefind";

/**
 * 站内搜索浮层（client，HEL-42）。
 *
 * 设计原则（DESIGN.md）：
 *  - 暗色浮层走 token：背景 bg-elevated、1px border、卡片 12px 圆角、accent 高亮，
 *    零魔法值；动效用页面级 320ms 档 + ease-standard，只动 opacity/transform。
 *  - 无障碍：role=dialog + aria-modal、focus 进框、Esc 关、上下键选 + 回车跳转、
 *    aria-activedescendant 指向当前高亮项。
 *
 * 性能（硬规则 2 的理念）：pagefind 运行时（/pagefind/pagefind.js，约 50KB + WASM）
 * 仅在用户首次「打开搜索」时按需动态 import，不进首屏、不进公共 layout 静态依赖；
 * 索引分片由 pagefind 自身按查询词惰性拉取。
 *
 * 入口与快捷键由本组件自带：顶部导航渲染触发按钮（带 ⌘K 提示），⌘K / Ctrl-K
 * 全局打开，已在输入框内则不重复拦截。
 */

/** 防抖延时：输入停顿后再查，避免每个按键打一次（非视觉值，纯交互节流，不属 DESIGN token 范畴） */
const SEARCH_DEBOUNCE_MS = 160;

interface SearchHit {
  url: string;
  title: string;
  /** 含 <mark> 的摘录 HTML（pagefind 已转义文本、仅注入 <mark> 标签） */
  excerpt: string;
  kind: "book" | "page";
}

export interface BookSearchEntry {
  slug: string;
  title: string;
  url: string;
  chapterCount: number;
  sections: string[];
  keywords: string[];
}

/**
 * 懒加载 pagefind 运行时。`/pagefind/pagefind.js` 是构建产物，构建期不存在，
 * 故用 turbopack/webpack ignore 注释让打包器跳过静态解析，运行时再按 URL 取。
 */
async function loadPagefind(): Promise<PagefindApi> {
  // /pagefind/pagefind.js 是 pagefind CLI 的构建产物，以绝对 URL 在运行时由浏览器加载；
  // 构建期文件不存在，TS 也无法用 `declare module` 给「以 / 开头的相对/根路径」声明类型
  // （环境模块声明只匹配非相对的裸标识符），故此处用 @ts-expect-error 跳过模块解析，
  // 再断言为已声明的 PagefindApi 形状。打包器侧用 webpack/turbopack ignore 注释跳过静态解析。
  const mod = (await import(
    /* webpackIgnore: true */
    /* turbopackIgnore: true */
    // @ts-expect-error 运行时按 URL 加载的构建产物，构建期无类型
    "/pagefind/pagefind.js"
  )) as PagefindApi;
  await mod.options({ excerptLength: 24 });
  await mod.init();
  return mod;
}

export function SearchOverlay({ books }: { books: BookSearchEntry[] }) {
  const router = useRouter();
  const listboxId = useId();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pagefindReady, setPagefindReady] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const pagefindRef = useRef<PagefindApi | null>(null);
  // 记录打开搜索前的焦点元素，关闭时还焦（无障碍）
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  // —— 关闭：清空查询态（下次打开干净）+ 收起。所有关闭路径走这里，
  // 状态重置发生在事件回调内而非 effect 中（避免 set-state-in-effect 级联渲染）。——
  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setHits([]);
    setActive(0);
  }, []);

  // —— ⌘K / Ctrl-K 全局开/关 ——
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) close();
        else setOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  // —— 打开时：记录原焦点、聚焦输入框、锁滚动；首次打开惰性加载 pagefind ——
  useEffect(() => {
    if (!open) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    // 锁背景滚动
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // 聚焦输入框（下一帧，确保已挂载）
    const id = window.requestAnimationFrame(() => inputRef.current?.focus());

    if (!pagefindRef.current) {
      setLoading(true);
      loadPagefind()
        .then((pf) => {
          pagefindRef.current = pf;
          setPagefindReady(true);
        })
        .catch((err) => {
          // 索引缺失（如 dev 未跑 build:search）时静默降级为「无结果」，不崩 UI
          console.error("[search] pagefind 加载失败：", err);
        })
        .finally(() => setLoading(false));
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      window.cancelAnimationFrame(id);
      restoreFocusRef.current?.focus?.();
    };
  }, [open]);

  const searchBooks = useCallback(
    (term: string): SearchHit[] => {
      const trimmed = term.trim().toLowerCase();
      if (trimmed === "") return [];

      const out: SearchHit[] = [];
      for (const book of books) {
        const haystack = [book.title, book.slug, ...book.keywords]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(trimmed)) continue;

        const sections = book.sections.slice(0, 4).join(" / ");
        out.push({
          url: book.url,
          title: book.title,
          excerpt: `${book.chapterCount} 章 · ${sections}`,
          kind: "book",
        });
        if (out.length >= 4) break;
      }
      return out;
    },
    [books],
  );

  // —— 查询：先给出书籍直达，再防抖 + 惰性拉每条 pagefind 结果详情 ——
  const runSearch = useCallback(async (term: string) => {
    const pf = pagefindRef.current;
    const trimmed = term.trim();
    const bookHits = searchBooks(trimmed);
    if (!pf || trimmed === "") {
      setHits(bookHits);
      setActive(0);
      return;
    }
    const { results } = await pf.search(trimmed);
    // 书籍结果排在前面，正文结果补足到 8 条；命中小节优先（带锚点），否则回退页面 url。
    const top = results.slice(0, Math.max(0, 8 - bookHits.length));
    const data: PagefindResultData[] = await Promise.all(
      top.map((r) => r.data()),
    );
    const mapped: SearchHit[] = data.map((d) => {
      const sub = d.sub_results?.[0];
      return {
        url: sub?.url ?? d.url,
        title: d.meta.title ?? "（无标题）",
        excerpt: sub?.excerpt ?? d.excerpt,
        kind: "page",
      };
    });
    setHits([...bookHits, ...mapped]);
    setActive(0);
  }, [searchBooks]);

  useEffect(() => {
    if (!open) return;
    const handle = window.setTimeout(() => {
      void runSearch(query);
    }, SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(handle);
  }, [query, open, runSearch, pagefindReady]);

  // —— 跳转：Next router 规整尾斜杠/锚点；关闭浮层 ——
  const go = useCallback(
    (url: string) => {
      close();
      router.push(url);
    },
    [router, close],
  );

  // —— 键盘：上下选、回车跳、Esc 关 ——
  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (hits.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % hits.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + hits.length) % hits.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const hit = hits[active];
      if (hit) go(hit.url);
    }
  };

  return (
    <>
      {/* 顶部导航入口：ghost 风格按钮 + ⌘K 提示（与全站 hover 120ms 档一致） */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="搜索（快捷键 Cmd 或 Ctrl + K）"
        aria-keyshortcuts="Meta+K Control+K"
        className="flex items-center gap-2 rounded-control border border-border px-2 py-1 text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
      >
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden="true"
          className="h-4 w-4"
        >
          <circle cx="7" cy="7" r="4.5" />
          <path d="m10.5 10.5 3 3" />
        </svg>
        <span className="hidden text-xs sm:inline">搜索</span>
        <kbd className="hidden rounded-control border border-border px-1 text-xs sm:inline">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div
          // 浮层根：固定铺满，顶部对齐式弹窗。背景用 bg/70 + 模糊（与首页 CTA 同手法），
          // 不做染色遮罩（DESIGN：层级靠 border + 背景明度）。
          className="fixed inset-0 z-50 flex items-start justify-center bg-bg/70 px-4 pt-24 backdrop-blur-sm"
          onClick={(e) => {
            // 点 panel 外（即根容器本身）关闭
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="站内搜索"
            className="w-full max-w-2xl overflow-hidden rounded-card border border-border bg-elevated"
          >
            {/* 输入行 */}
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-secondary"
              >
                <circle cx="7" cy="7" r="4.5" />
                <path d="m10.5 10.5 3 3" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-expanded={hits.length > 0}
                aria-controls={listboxId}
                aria-activedescendant={
                  hits.length > 0 ? `${listboxId}-opt-${active}` : undefined
                }
                aria-autocomplete="list"
                placeholder="搜索书籍、章节、术语、代码…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                className="min-w-0 flex-1 bg-transparent text-base text-primary placeholder:text-secondary focus:outline-none"
              />
              <kbd className="shrink-0 rounded-control border border-border px-1 text-xs text-secondary">
                Esc
              </kbd>
            </div>

            {/* 结果区 */}
            <div className="max-h-[60vh] overflow-y-auto">
              {loading && (
                <p className="px-4 py-6 text-sm text-secondary">
                  加载搜索索引…
                </p>
              )}

              {!loading && query.trim() !== "" && hits.length === 0 && (
                <p className="px-4 py-6 text-sm text-secondary">
                  没有找到「{query.trim()}」相关内容
                </p>
              )}

              {!loading && query.trim() === "" && (
                <p className="px-4 py-6 text-sm text-secondary">
                  输入书名、章节或术语开始搜索。↑↓ 选择，回车跳转，Esc 关闭。
                </p>
              )}

              {hits.length > 0 && (
                <ul id={listboxId} role="listbox" aria-label="搜索结果">
                  {hits.map((hit, i) => {
                    const selected = i === active;
                    return (
                      <li
                        key={`${hit.url}-${i}`}
                        id={`${listboxId}-opt-${i}`}
                        role="option"
                        aria-selected={selected}
                        onMouseEnter={() => setActive(i)}
                        onClick={() => go(hit.url)}
                        className={`cursor-pointer border-l-2 px-4 py-3 transition-colors duration-(--duration-hover) ease-standard ${
                          selected
                            ? "border-accent bg-bg"
                            : "border-transparent hover:bg-bg"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {hit.kind === "book" && (
                            <span className="rounded-control border border-border px-1.5 py-0.5 text-[10px] text-secondary">
                              书籍
                            </span>
                          )}
                          <p
                            className={`min-w-0 truncate text-sm font-medium ${
                              selected ? "text-accent" : "text-primary"
                            }`}
                          >
                            {hit.title}
                          </p>
                        </div>
                        {/* 摘录：pagefind 给的是已转义文本 + <mark> 高亮标记。
                            mark 用 accent 文字呈现命中词（DESIGN：accent 仅小面积）。 */}
                        <p
                          className="mt-1 line-clamp-2 text-xs text-secondary [&_mark]:bg-transparent [&_mark]:text-accent"
                          dangerouslySetInnerHTML={{ __html: hit.excerpt }}
                        />
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
