"use client";

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
 *  - 智能间隔抽题（Leitner 盒，引擎在 ./engine）+「刷新」重新抽一组
 *  - 记录作答（✓ box+1 / ✗ box=0 进错题集）+ localStorage 持久化
 *  - 正确率：本组 + 累计；错题集大小
 *  - 可选：L1–L4 等级 chip 筛选
 *
 * SSR 安全（硬规则相关 / 任务约束）：首渲染绝不读 localStorage——
 * state 初值为 null，仅在 mount 后的 effect 里 loadState() 并抽第一组，
 * 避免 server / client 首帧 DOM 不一致（hydration mismatch）。
 */

type Mode = "review" | "wrong";

const LEVELS: ReviewLevel[] = [1, 2, 3, 4];

export default function ReviewEngineApp() {
  // null = 尚未挂载（首渲染态，SSR 与 client 首帧一致，不读 localStorage）。
  const [state, setState] = useState<ReviewState | null>(null);
  const [mode, setMode] = useState<Mode>("review");
  const [levelFilter, setLevelFilter] = useState<ReviewLevel | null>(null);
  const [session, setSession] = useState<ReviewQuestion[]>([]);
  const [cursor, setCursor] = useState(0);
  // 本组当前统计（不含历史；累计在 state.stats 里）。
  const [round, setRound] = useState({ correct: 0, answered: 0, wrong: 0 });

  /** 按模式 + 等级筛选抽一组，并重置组内游标/统计。 */
  const startSession = useCallback(
    (s: ReviewState, m: Mode, level: ReviewLevel | null) => {
      const base = m === "wrong" ? pickWrongSession(s) : pickSession(s);
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
      startSession(loaded, "review", null);
    };
    init();
  }, [startSession]);

  const wrongCount = useMemo(() => (state ? wrongPileSize(state) : 0), [state]);

  /** 切模式：重新按新模式抽一组。 */
  const switchMode = (m: Mode) => {
    if (!state || m === mode) return;
    setMode(m);
    startSession(state, m, levelFilter);
  };

  /** 切等级筛选：在当前模式下重抽一组。 */
  const switchLevel = (level: ReviewLevel | null) => {
    if (!state) return;
    setLevelFilter(level);
    startSession(state, mode, level);
  };

  /** 刷新：当前模式 + 当前筛选，重新随机抽一组 50。 */
  const refresh = () => {
    if (!state) return;
    startSession(state, mode, levelFilter);
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

  return (
    <div className="flex flex-col gap-6">
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

      {/* —— 等级筛选 chip（可选） —— */}
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
        <EmptyState mode={mode} />
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

/** 空集态：错题练习无错题、或某等级筛完无题。 */
function EmptyState({ mode }: { mode: Mode }) {
  return (
    <div className="rounded-card border border-border bg-elevated p-6 text-center">
      <p className="text-sm text-secondary">
        {mode === "wrong"
          ? "错题集是空的——做几道普通复习、把没掌握的攒进来，再回来专攻。"
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
