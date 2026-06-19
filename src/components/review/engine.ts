/**
 * 复习引擎（Leitner 盒间隔算法 + 抽题排序 + localStorage 持久化）。
 *
 * 纯逻辑模块，不含 JSX/DOM——便于复用与 Phase B 扩展。
 * 与题库一起被 ReviewApp 的 next/dynamic(ssr:false) 边界懒加载，切成独立 chunk。
 *
 * SSR 安全：本模块所有读写 localStorage 的函数都在调用处（effect / 事件）才被触发，
 * 模块顶层不碰 window；每个函数内部都做 typeof window 守卫，首渲染不读，避免 hydration mismatch。
 */

import {
  REVIEW_QUESTIONS,
  type ReviewLevel,
  type ReviewQuestion,
} from "@/data/review-questions";

/** 一组复习会话的题量上限。 */
export const SESSION_SIZE = 50;

/**
 * 复习「范围树」的可序列化形状（按章/按书复习）。
 *
 * 由 server 侧 src/lib/review-scope.ts 构造、经 page.tsx 下传给客户端引擎；类型放在这里
 * （引擎客户端 chunk 内）是为了让 client 组件能 import 这个纯类型而不触碰 server-only 的
 * content.ts。slug = 复习 slug（= ?chapter= 取值、filterByChapter 过滤键）。
 */
export interface ReviewScopeChapter {
  slug: string;
  title: string;
  count: number;
}
export interface ReviewScopeBook {
  bookSlug: string;
  bookTitle: string;
  count: number;
  chapters: ReviewScopeChapter[];
}
export type ReviewScopeTree = ReviewScopeBook[];

export interface ReviewScopeStage {
  level: string;
  label: string;
  count: number;
  chapterSlugs: string[];
}
export interface ReviewScopePath {
  slug: string;
  title: string;
  count: number;
  stages: ReviewScopeStage[];
}
export type ReviewScopePathTree = ReviewScopePath[];

/** Leitner 盒：0(最生)~4(最熟)。✓ 升一格(上限 4)，✗ 跌回 0。 */
export type Box = 0 | 1 | 2 | 3 | 4;
const MAX_BOX: Box = 4;

/** 单题进度记录（存进 localStorage 的 progress 表里，键 = 题 id）。 */
export type QuestionProgress = {
  box: Box;
  seen: number; // 见过几次
  correctCount: number;
  wrongCount: number;
  lastWrong: boolean; // 最近一次是否答错（用于错题优先 / 错题集判定）
};

/** 累计统计（跨会话，存 localStorage）。 */
export type Stats = {
  correct: number;
  answered: number;
};

/** localStorage 整体形状。 */
export type ReviewState = {
  progress: Record<string, QuestionProgress>;
  stats: Stats;
};

const STORAGE_KEY = "remuse.review.v1";

const EMPTY_STATE: ReviewState = {
  progress: {},
  stats: { correct: 0, answered: 0 },
};

/** 新题的默认进度（box=0、从未见过）。 */
function freshProgress(): QuestionProgress {
  return { box: 0, seen: 0, correctCount: 0, wrongCount: 0, lastWrong: false };
}

/**
 * 读 localStorage（SSR 安全：window 不存在直接返回空态；解析失败也回退空态，不抛）。
 * 容错合并：缺字段用默认补齐，避免旧数据 / 手改坏数据导致引擎崩。
 */
export function loadState(): ReviewState {
  if (typeof window === "undefined") return structuredCloneState(EMPTY_STATE);
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredCloneState(EMPTY_STATE);
    const parsed = JSON.parse(raw) as Partial<ReviewState> | null;
    if (!parsed || typeof parsed !== "object")
      return structuredCloneState(EMPTY_STATE);
    return {
      progress:
        parsed.progress && typeof parsed.progress === "object"
          ? parsed.progress
          : {},
      stats: {
        correct: Number(parsed.stats?.correct) || 0,
        answered: Number(parsed.stats?.answered) || 0,
      },
    };
  } catch {
    return structuredCloneState(EMPTY_STATE);
  }
}

/** 写 localStorage（SSR 安全：window 不存在或写失败时静默忽略，绝不抛断流程）。 */
export function saveState(state: ReviewState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // 配额满 / 隐私模式禁写等：复习是体验增强，写不进就不写，不影响当前会话。
  }
}

function structuredCloneState(s: ReviewState): ReviewState {
  return {
    progress: { ...s.progress },
    stats: { ...s.stats },
  };
}

/** 取某题进度，没有则返回全新进度（不写库）。 */
export function getProgress(state: ReviewState, id: string): QuestionProgress {
  return state.progress[id] ?? freshProgress();
}

/**
 * 记一次作答，返回「新的 state」（不可变更新；调用方负责 setState + saveState）。
 *  ✓：box = min(box+1, 4)、correctCount++、lastWrong=false
 *  ✗：box = 0、wrongCount++、lastWrong=true（→ 自动进错题集）
 * 同时累计 stats（answered++，correct 视对错）。seen 每次 ++。
 */
export function recordAnswer(
  state: ReviewState,
  id: string,
  correct: boolean,
): ReviewState {
  const prev = getProgress(state, id);
  const next: QuestionProgress = {
    box: correct ? (Math.min(prev.box + 1, MAX_BOX) as Box) : 0,
    seen: prev.seen + 1,
    correctCount: prev.correctCount + (correct ? 1 : 0),
    wrongCount: prev.wrongCount + (correct ? 0 : 1),
    lastWrong: !correct,
  };
  return {
    progress: { ...state.progress, [id]: next },
    stats: {
      correct: state.stats.correct + (correct ? 1 : 0),
      answered: state.stats.answered + 1,
    },
  };
}

/** 错题集判定：见过、且最近一次答错（box 必然为 0）。 */
export function isInWrongPile(p: QuestionProgress): boolean {
  return p.seen > 0 && p.lastWrong;
}

/** 当前错题集大小（用 state 里每题进度判定）。 */
export function wrongPileSize(state: ReviewState): number {
  return REVIEW_QUESTIONS.reduce(
    (n, q) => n + (isInWrongPile(getProgress(state, q.id)) ? 1 : 0),
    0,
  );
}

/**
 * Fisher–Yates 洗牌（拷贝，不改原数组）。
 * 接受可注入的随机源，便于「刷新」每次得到不同顺序；默认 Math.random。
 */
function shuffle<T>(arr: readonly T[], rng: () => number = Math.random): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * 抽题优先级（数字越小越靠前）：
 *  ① 没见过（seen=0）        → 0
 *  ② 错题（box=0 且 lastWrong）→ 1
 *  ③ 其余按 box 升序          → 2 + box（box 越低越优先）
 * 同一优先级内随机打散（靠先 shuffle 全集、再稳定排序保持组内随机）。
 */
function priority(p: QuestionProgress): number {
  if (p.seen === 0) return 0;
  if (p.box === 0 && p.lastWrong) return 1;
  return 2 + p.box;
}

/**
 * 抽题范围：
 *  - null         → 不限（全库，维持现状）
 *  - "<slug>"     → 单章（复习 slug）
 *  - ["a","b",…]  → 一组章（如「整本书」= 该书全部章 slug）
 * 范围键 = 复习 slug（q.chapter），由 server 侧范围树下传，与下列过滤同源。
 */
export type ChapterScope = string | readonly string[] | null;

/**
 * 按范围限定题集；scope 为 null 表示不限（维持全库现状）。
 * 传入空数组（[]）= 该范围内没有任何章 → 返回空集（调用方据此显示空集态）。
 */
export function filterByChapter(
  list: readonly ReviewQuestion[],
  scope: ChapterScope,
): ReviewQuestion[] {
  if (scope == null) return list.slice();
  if (typeof scope === "string") return list.filter((q) => q.chapter === scope);
  const set = new Set(scope);
  return list.filter((q) => set.has(q.chapter));
}

/**
 * 普通复习：智能抽 SESSION_SIZE 题。
 * 先把全库限定到 scope 子集（默认 null = 全库，行为不变），
 * 再按可注入 rng 洗牌（实现「同级随机 + 刷新换一组」），
 * 按优先级稳定排序，取前 N。题不足 N 则取全部。
 */
export function pickSession(
  state: ReviewState,
  size: number = SESSION_SIZE,
  rng: () => number = Math.random,
  scope: ChapterScope = null,
): ReviewQuestion[] {
  const scoped = filterByChapter(REVIEW_QUESTIONS, scope);
  const shuffled = shuffle(scoped, rng);
  const sorted = stableSortByPriority(state, shuffled);
  return sorted.slice(0, size);
}

/**
 * 错题练习：只抽错题集里的题（box=0 且 lastWrong），洗牌后取前 size。
 * scope 非 null 时只在该范围内取错题（默认 null = 全库错题，行为不变）。
 * 答对后 lastWrong 变 false → 自动移出错题集（下次抽不到）。
 */
export function pickWrongSession(
  state: ReviewState,
  size: number = SESSION_SIZE,
  rng: () => number = Math.random,
  scope: ChapterScope = null,
): ReviewQuestion[] {
  const scoped = filterByChapter(REVIEW_QUESTIONS, scope);
  const wrong = scoped.filter((q) => isInWrongPile(getProgress(state, q.id)));
  return shuffle(wrong, rng).slice(0, size);
}

/** 稳定按优先级排序（Array.prototype.sort 在现代引擎稳定，组内顺序沿用入参的洗牌结果）。 */
function stableSortByPriority(
  state: ReviewState,
  list: ReviewQuestion[],
): ReviewQuestion[] {
  return list
    .map((q, i) => ({ q, i, pr: priority(getProgress(state, q.id)) }))
    .sort((a, b) => a.pr - b.pr || a.i - b.i)
    .map((x) => x.q);
}

/** 按等级筛选（可选 chip）；level 为 null 表示不筛。 */
export function filterByLevel(
  list: ReviewQuestion[],
  level: ReviewLevel | null,
): ReviewQuestion[] {
  if (level == null) return list;
  return list.filter((q) => q.level === level);
}
