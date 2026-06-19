"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  LEVEL_LABELS,
  type ReviewLevel,
  type ReviewQuestion,
} from "@/data/review-questions";

import {
  filterByLevel,
  loadState,
  pickSession,
  pickWrongSession,
  recordAnswer,
  saveState,
  wrongPileSize,
  type ChapterScope,
  type ReviewScopeTree,
  type ReviewState,
} from "./engine";
import { FlashCard } from "./flash-card";

/**
 * <ReviewEngineApp>：复习会话引擎（'use client'）。
 *
 * 这是被 ReviewApp 的 next/dynamic(ssr:false) 边界懒加载的「真正含数据 + 引擎」的组件，
 * 切成独立 chunk、不进 /review 首屏关键路径（题库 + 引擎都在这一侧）。
 *
 * 职责：
 *  - 两种模式切换：普通复习（全库智能抽 50）/ 错题练习（只抽错题集）
 *  - 范围复习：全部 / 某本书 / 某本书某一章（两级原生 select），把会话限定到该范围
 *  - 智能间隔抽题（Leitner 盒，引擎在 ./engine）+「刷新」重新抽一组
 *  - 记录作答（✓ box+1 / ✗ box=0 进错题集）+ localStorage 持久化
 *  - 正确率：本组 + 累计；错题集大小
 *  - 可选：L1–L4 等级 chip 筛选（与范围过滤叠加）
 *
 * SSR 安全（硬规则相关 / 任务约束）：首渲染绝不读 localStorage——
 * state 初值为 null，仅在 mount 后的 effect 里 loadState() 并抽第一组，
 * 避免 server / client 首帧 DOM 不一致（hydration mismatch）。
 *
 * 范围数据（scopeTree / initialChapter）由 server 的 page.tsx 算好下传（纯 JSON），
 * 本组件只消费，不碰 content.ts（server-only/fs）。
 */

type Mode = "review" | "wrong";

const LEVELS: ReviewLevel[] = [1, 2, 3, 4];

/** 全部范围（不限书/章）的哨兵值，用于 book-level select 的 value。 */
const ALL = "__all__";
/** 「整本书」（限定到书但不限章）的哨兵值，用于 chapter-level select 的 value。 */
const WHOLE_BOOK = "__whole_book__";

export default function ReviewEngineApp({
  scopeTree,
  initialBook,
  initialChapter,
}: {
  scopeTree: ReviewScopeTree;
  initialBook: string | null;
  initialChapter: string | null;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // 复习 slug → 所属书（用于 initialChapter 反查、范围标签）。一次构建，恒定。
  const chapterIndex = useMemo(() => {
    const map = new Map<
      string,
      { bookSlug: string; bookTitle: string; title: string; count: number }
    >();
    for (const b of scopeTree) {
      for (const c of b.chapters) {
        map.set(c.slug, {
          bookSlug: b.bookSlug,
          bookTitle: b.bookTitle,
          title: c.title,
          count: c.count,
        });
      }
    }
    return map;
  }, [scopeTree]);

  // 初始章合法性兜底（page.tsx 已校验，这里再防一手）。
  const safeInitialChapter =
    initialChapter && chapterIndex.has(initialChapter) ? initialChapter : null;

  /**
   * 由（当前章 chapter, 当前书 bookScope）算出引擎抽题范围 ChapterScope：
   *  - 选了具体章 → 单章 slug（最优先）
   *  - 只选了书（整本书）→ 该书全部章 slug 数组
   *  - 都没选（全部）→ null（全库，行为不变）
   */
  const computeScope = useCallback(
    (chapterSlug: string | null, book: string | null): ChapterScope => {
      if (chapterSlug) return chapterSlug;
      if (book) {
        const b = scopeTree.find((x) => x.bookSlug === book);
        return b ? b.chapters.map((c) => c.slug) : null;
      }
      return null;
    },
    [scopeTree],
  );

  // null = 尚未挂载（首渲染态，SSR 与 client 首帧一致，不读 localStorage）。
  const [state, setState] = useState<ReviewState | null>(null);
  const [mode, setMode] = useState<Mode>("review");
  const [levelFilter, setLevelFilter] = useState<ReviewLevel | null>(null);
  // 当前范围 = 复习 slug 限定到某一章；null = 全部（书或全库，见 bookScope）。
  const [chapter, setChapter] = useState<string | null>(safeInitialChapter);
  // 选了「某本书」但还没选具体章时，bookScope 记住这本书；为 null 表示「全部」。
  const [bookScope, setBookScope] = useState<string | null>(
    safeInitialChapter
      ? (chapterIndex.get(safeInitialChapter)?.bookSlug ?? null)
      : initialBook,
  );
  const [session, setSession] = useState<ReviewQuestion[]>([]);
  const [cursor, setCursor] = useState(0);
  // 本组当前统计（不含历史；累计在 state.stats 里）。
  const [round, setRound] = useState({ correct: 0, answered: 0, wrong: 0 });

  /** 按模式 + 等级 + 范围抽一组，并重置组内游标/统计。 */
  const startSession = useCallback(
    (
      s: ReviewState,
      m: Mode,
      level: ReviewLevel | null,
      scope: ChapterScope,
    ) => {
      const base =
        m === "wrong"
          ? pickWrongSession(s, undefined, undefined, scope)
          : pickSession(s, undefined, undefined, scope);
      // 范围（scope）已在引擎抽题前限定子集；等级再叠加过滤，两者正交。
      setSession(filterByLevel(base, level));
      setCursor(0);
      setRound({ correct: 0, answered: 0, wrong: 0 });
    },
    [],
  );

  // 挂载后：读 localStorage + 抽第一组（仅此处首次访问 window，SSR 安全）。
  // 用 ref 幂等 + 把初始化挪进函数里调用——既保证 StrictMode 双 effect 下只跑一次，
  // 也避开「effect 体内直接同步 setState」（React Compiler 规则，同 comments.tsx 的 inject 思路）。
  const initedRef = useRef(false);
  useEffect(() => {
    if (initedRef.current) return;
    const init = () => {
      initedRef.current = true;
      const loaded = loadState();
      setState(loaded);
      // 初始范围取 URL 带来的章（已经过 page.tsx + 本组件兜底校验）。
      const initBook = safeInitialChapter
        ? (chapterIndex.get(safeInitialChapter)?.bookSlug ?? null)
        : initialBook;
      startSession(
        loaded,
        "review",
        null,
        computeScope(safeInitialChapter, initBook),
      );
    };
    init();
  }, [startSession, safeInitialChapter, initialBook, chapterIndex, computeScope]);

  const wrongCount = useMemo(() => (state ? wrongPileSize(state) : 0), [state]);

  /** 把当前范围同步进 URL（?book / ?chapter），方便刷新/分享复现。失败不致命。 */
  const syncUrl = useCallback(
    (bookSlug: string | null, chapterSlug: string | null) => {
      const params = new URLSearchParams();
      if (bookSlug) params.set("book", bookSlug);
      if (chapterSlug) params.set("chapter", chapterSlug);
      const query = params.toString();
      const target = query ? `${pathname}?${query}` : pathname;
      // replace + scroll:false：范围切换不入历史栈、不跳页顶。
      router.replace(target, { scroll: false });
    },
    [pathname, router],
  );

  /** 切模式：重新按新模式抽一组（范围 / 等级保持）。 */
  const switchMode = (m: Mode) => {
    if (!state || m === mode) return;
    setMode(m);
    startSession(state, m, levelFilter, computeScope(chapter, bookScope));
  };

  /** 切等级筛选：在当前模式 + 当前范围下重抽一组。 */
  const switchLevel = (level: ReviewLevel | null) => {
    if (!state) return;
    setLevelFilter(level);
    startSession(state, mode, level, computeScope(chapter, bookScope));
  };

  /** 切「书」：选「全部」清空范围；选某书则限定到整本书（章未定）。 */
  const switchBook = (bookSlug: string) => {
    if (!state) return;
    const nextBook = bookSlug === ALL ? null : bookSlug;
    setBookScope(nextBook);
    // 切书默认落到「整本书」（chapter=null）：scope = 该书全部章；全部 = null（全库）。
    setChapter(null);
    startSession(state, mode, levelFilter, computeScope(null, nextBook));
    syncUrl(nextBook, null);
  };

  /** 切「章」：WHOLE_BOOK = 该书但不限章；否则限定到具体章（复习 slug）。 */
  const switchChapter = (value: string) => {
    if (!state) return;
    const next = value === WHOLE_BOOK ? null : value;
    setChapter(next);
    startSession(state, mode, levelFilter, computeScope(next, bookScope));
    syncUrl(bookScope, next);
  };

  /** 刷新：当前模式 + 当前等级 + 当前范围，重新随机抽一组。 */
  const refresh = () => {
    if (!state) return;
    startSession(state, mode, levelFilter, computeScope(chapter, bookScope));
  };

  /** 记一次作答：更新进度 + 持久化 + 推进游标 + 累计本组统计。 */
  const handleAnswer = (correct: boolean) => {
    if (!state) return;
    const q = session[cursor];
    if (!q) return;
    const nextState = recordAnswer(state, q.id, correct);
    setState(nextState);
    saveState(nextState);
    setRound((r) => ({
      correct: r.correct + (correct ? 1 : 0),
      answered: r.answered + 1,
      wrong: r.wrong + (correct ? 0 : 1),
    }));
    setCursor((c) => c + 1);
  };

  // —— 首渲染 / 挂载前：占位骨架（与挂载后容器气质一致，避免布局跳变） ——
  if (!state) {
    return (
      <div className="rounded-card border border-border bg-elevated p-6">
        <p className="text-sm text-secondary">复习卡片加载中…</p>
      </div>
    );
  }

  const total = session.length;
  const done = cursor >= total;
  const current = session[cursor];

  const roundPct =
    round.answered > 0 ? Math.round((round.correct / round.answered) * 100) : 0;
  const cumulativePct =
    state.stats.answered > 0
      ? Math.round((state.stats.correct / state.stats.answered) * 100)
      : 0;

  // —— 范围 select 的当前值与可读标签 ——
  const currentBook = chapter
    ? (chapterIndex.get(chapter)?.bookSlug ?? bookScope)
    : bookScope;
  const bookSelectValue = currentBook ?? ALL;
  const chapterSelectValue = chapter ?? WHOLE_BOOK;
  const selectedBook = scopeTree.find((b) => b.bookSlug === currentBook) ?? null;

  // 当前范围可读标签 + 题数（如「C++并发编程实战 · 管理线程（18 题）」）。
  let scopeLabel: string;
  let scopeCount: number;
  if (chapter) {
    const info = chapterIndex.get(chapter);
    scopeLabel = info ? `${info.bookTitle} · ${info.title}` : "全部";
    scopeCount = info?.count ?? 0;
  } else if (selectedBook) {
    scopeLabel = selectedBook.bookTitle;
    scopeCount = selectedBook.count;
  } else {
    scopeLabel = "全部";
    scopeCount = scopeTree.reduce((n, b) => n + b.count, 0);
  }

  const selectClass =
    "rounded-control border border-border bg-elevated px-3 py-1 text-sm text-primary transition-colors duration-(--duration-hover) ease-standard hover:border-accent focus:border-accent focus:outline-none";
  const shelfButtonClass =
    "rounded-control border px-3 py-1 text-xs transition-colors duration-(--duration-hover) ease-standard";

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-card border border-border bg-elevated p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-primary">复习书架</p>
            <p className="mt-1 text-sm text-secondary">
              先选整本书，再细到章节；如果你是从正文页跳过来的，也会自动落到对应范围。
            </p>
          </div>
          <button
            type="button"
            onClick={() => switchBook(ALL)}
            className={`rounded-control border px-3 py-1 text-sm transition-colors duration-(--duration-hover) ease-standard ${
              !currentBook
                ? "border-accent text-accent"
                : "border-border text-secondary hover:border-accent hover:text-primary"
            }`}
          >
            全库混刷
          </button>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {scopeTree.map((book) => {
            const active = currentBook === book.bookSlug;

            return (
              <div
                key={book.bookSlug}
                className={`rounded-card border p-4 transition-colors duration-(--duration-hover) ease-standard ${
                  active
                    ? "border-accent bg-accent-glow"
                    : "border-border bg-bg/60"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-primary">{book.bookTitle}</p>
                    <p className="mt-1 text-xs text-secondary">
                      {book.chapters.length} 章 · {book.count} 题
                    </p>
                  </div>
                  {active && (
                    <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">
                      当前范围
                    </span>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => switchBook(book.bookSlug)}
                    className={`${shelfButtonClass} ${
                      active && !chapter
                        ? "border-accent text-accent"
                        : "border-border text-secondary hover:border-accent hover:text-primary"
                    }`}
                  >
                    整本开刷
                  </button>
                  {book.chapters.slice(0, 3).map((item) => (
                    <button
                      key={item.slug}
                      type="button"
                      onClick={() => {
                        setBookScope(book.bookSlug);
                        setChapter(item.slug);
                        startSession(
                          state,
                          mode,
                          levelFilter,
                          computeScope(item.slug, book.bookSlug),
                        );
                        syncUrl(book.bookSlug, item.slug);
                      }}
                      className={`${shelfButtonClass} ${
                        chapter === item.slug
                          ? "border-accent text-accent"
                          : "border-border text-secondary hover:border-accent hover:text-primary"
                      }`}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {selectedBook && (
          <div className="mt-5 border-t border-border pt-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-secondary">
                章节抽题：
                <span className="ml-1 text-primary">{selectedBook.bookTitle}</span>
              </p>
              <p className="text-xs text-secondary">
                当前支持分享 URL，方便把某本书或某一章直接发给自己继续刷。
              </p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => switchChapter(WHOLE_BOOK)}
                className={`${shelfButtonClass} ${
                  chapter === null
                    ? "border-accent text-accent"
                    : "border-border text-secondary hover:border-accent hover:text-primary"
                }`}
              >
                整本书
              </button>
              {selectedBook.chapters.map((item) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => switchChapter(item.slug)}
                  className={`${shelfButtonClass} ${
                    chapter === item.slug
                      ? "border-accent text-accent"
                      : "border-border text-secondary hover:border-accent hover:text-primary"
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* —— 控制条：模式切换 + 刷新 —— */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          role="group"
          aria-label="复习模式"
          className="inline-flex rounded-control border border-border p-1"
        >
          <button
            type="button"
            onClick={() => switchMode("review")}
            aria-pressed={mode === "review"}
            className={`rounded-control px-3 py-1 text-sm transition-colors duration-(--duration-hover) ease-standard ${
              mode === "review"
                ? "border border-accent text-accent"
                : "border border-transparent text-secondary hover:text-primary"
            }`}
          >
            普通复习
          </button>
          <button
            type="button"
            onClick={() => switchMode("wrong")}
            aria-pressed={mode === "wrong"}
            className={`rounded-control px-3 py-1 text-sm transition-colors duration-(--duration-hover) ease-standard ${
              mode === "wrong"
                ? "border border-accent text-accent"
                : "border border-transparent text-secondary hover:text-primary"
            }`}
          >
            错题练习
          </button>
        </div>

        <button
          type="button"
          onClick={refresh}
          aria-label="刷新，重新抽一组题"
          className="rounded-control border border-border px-3 py-1 text-sm text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
        >
          刷新
        </button>
      </div>

      {/* —— 范围选择器（两级 select：书 → 章）+ 当前范围标签 —— */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <label className="text-xs text-secondary" htmlFor="review-book">
            范围
          </label>
          <select
            id="review-book"
            aria-label="选择书"
            value={bookSelectValue}
            onChange={(e) => switchBook(e.target.value)}
            className={selectClass}
          >
            <option value={ALL}>全部</option>
            {scopeTree.map((b) => (
              <option key={b.bookSlug} value={b.bookSlug}>
                {b.bookTitle}
              </option>
            ))}
          </select>

          {selectedBook && (
            <select
              aria-label="选择章"
              value={chapterSelectValue}
              onChange={(e) => switchChapter(e.target.value)}
              className={selectClass}
            >
              <option value={WHOLE_BOOK}>整本书</option>
              {selectedBook.chapters.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.title}（{c.count} 题）
                </option>
              ))}
            </select>
          )}
        </div>

        <p className="text-xs text-secondary">
          范围：
          <span className="text-primary">{scopeLabel}</span>
          <span className="ml-1 font-mono tabular-nums">（{scopeCount} 题）</span>
        </p>
      </div>

      {/* —— 等级筛选 chip（可选，与范围叠加） —— */}
      <div
        role="group"
        aria-label="按等级筛选"
        className="flex flex-wrap items-center gap-2"
      >
        <button
          type="button"
          onClick={() => switchLevel(null)}
          aria-pressed={levelFilter === null}
          className={`rounded-control border px-2 py-1 text-xs transition-colors duration-(--duration-hover) ease-standard ${
            levelFilter === null
              ? "border-accent text-accent"
              : "border-border text-secondary hover:text-primary"
          }`}
        >
          全部
        </button>
        {LEVELS.map((lv) => (
          <button
            key={lv}
            type="button"
            onClick={() => switchLevel(lv)}
            aria-pressed={levelFilter === lv}
            className={`rounded-control border px-2 py-1 text-xs transition-colors duration-(--duration-hover) ease-standard ${
              levelFilter === lv
                ? "border-accent text-accent"
                : "border-border text-secondary hover:text-primary"
            }`}
          >
            {LEVEL_LABELS[lv]}
          </button>
        ))}
      </div>

      {/* —— 正确率 / 错题数 仪表 —— */}
      <dl className="grid grid-cols-3 gap-3 text-center">
        <div className="rounded-card border border-border bg-elevated p-4">
          <dt className="text-xs text-secondary">本组正确率</dt>
          <dd className="mt-1 font-mono text-lg tabular-nums text-primary">
            {round.correct}/{round.answered}
            {round.answered > 0 && (
              <span className="ml-1 text-xs text-secondary">({roundPct}%)</span>
            )}
          </dd>
        </div>
        <div className="rounded-card border border-border bg-elevated p-4">
          <dt className="text-xs text-secondary">累计正确率</dt>
          <dd className="mt-1 font-mono text-lg tabular-nums text-primary">
            {state.stats.correct}/{state.stats.answered}
            {state.stats.answered > 0 && (
              <span className="ml-1 text-xs text-secondary">
                ({cumulativePct}%)
              </span>
            )}
          </dd>
        </div>
        <div className="rounded-card border border-border bg-elevated p-4">
          <dt className="text-xs text-secondary">当前错题</dt>
          <dd className="mt-1 font-mono text-lg tabular-nums text-warning">
            {wrongCount}
          </dd>
        </div>
      </dl>

      {/* —— 卡片区 / 空集 / 小结 三态 —— */}
      {total === 0 ? (
        <EmptyState mode={mode} scoped={chapter !== null || bookScope !== null} />
      ) : done ? (
        <RoundSummary
          round={round}
          roundPct={roundPct}
          wrongCount={wrongCount}
          mode={mode}
          onRefresh={refresh}
        />
      ) : (
        current && (
          <FlashCard
            key={current.id}
            question={current}
            index={cursor}
            total={total}
            onAnswer={handleAnswer}
          />
        )
      )}
    </div>
  );
}

/** 空集态：错题练习无错题、或某等级/范围筛完无题。 */
function EmptyState({ mode, scoped }: { mode: Mode; scoped: boolean }) {
  return (
    <div className="rounded-card border border-border bg-elevated p-6 text-center">
      <p className="text-sm text-secondary">
        {mode === "wrong"
          ? "这个范围里还没有错题——做几道普通复习、把没掌握的攒进来，再回来专攻。"
          : scoped
            ? "这个范围 + 筛选下暂时没有题，换个等级、换本书 / 章，或点「全部」试试。"
            : "这个筛选下暂时没有题，换个等级或点「全部」试试。"}
      </p>
    </div>
  );
}

/** 一组做完的小结：本组正确率 + 错题数 + 再来一组。 */
function RoundSummary({
  round,
  roundPct,
  wrongCount,
  mode,
  onRefresh,
}: {
  round: { correct: number; answered: number; wrong: number };
  roundPct: number;
  wrongCount: number;
  mode: Mode;
  onRefresh: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-card border border-border bg-elevated p-8 text-center">
      <p className="text-lg font-semibold text-primary">这一组做完了</p>
      <p className="text-sm text-secondary">
        本组答对{" "}
        <span className="font-mono tabular-nums text-primary">
          {round.correct}/{round.answered}
        </span>{" "}
        ({roundPct}%)，新增 / 仍在错题集
        <span className="ml-1 font-mono tabular-nums text-warning">
          {wrongCount}
        </span>{" "}
        题。
      </p>
      <button
        type="button"
        onClick={onRefresh}
        className="rounded-control border border-accent px-4 py-2 text-sm text-accent transition-colors duration-(--duration-hover) ease-standard hover:bg-accent-glow"
      >
        {mode === "wrong" ? "再练一组错题" : "再来一组"}
      </button>
    </div>
  );
}
