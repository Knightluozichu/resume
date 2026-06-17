"use client";

import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/components/review/use-prefers-reduced-motion";

import { DemoStage } from "../controls";

/**
 * <RaceConditionExplorer>：竞态交错器（HEL-231，§5 主 Demo·本章灵魂）。
 *
 * 餐厅后厨隐喻：counter = 同一张订单上的「已下单菜数」。线程 A、线程 B 各执行一次
 * `++counter`（各自给订单 +1）。一次 `++counter` 在机器层面不是原子的，要拆成 3 微步：
 *  - read ：把订单上的数字读进自己手里的小本子（寄存器）
 *  - +1   ：在小本子上加一
 *  - write：把小本子上的数字抄回订单
 *
 * 关键教学点：两个线程的 6 个微步可以按不同顺序交错。每个线程内部 3 步保持先后
 * （read→+1→write），但两线程之间如何穿插由调度决定——顺序一变，结果就变：
 *  - 若 A 整段做完再轮到 B（或 B 先做完再 A）：counter == 2（正确）
 *  - 若两线程「都先把旧值读进各自小本子」再各自 +1、各自写回：counter == 1（丢更新）
 *
 * 提供若干「交错顺序」预设按钮，点按钮后可单步动画走该交错；每一微步高亮当前操作的是
 * 哪个线程、它手里寄存器的值、以及订单 counter 当前值，最后给出结果（2 或 1）。
 *
 * 为何 client：预设选择、逐步动画、单步、重置都是真交互（事件 + state + 定时器）。
 * 叶子壳，不会把整页变 client。
 *
 * reduced-motion：直接跳到最终态（全部微步执行完、显示结果），不做逐步定时推进
 * （DESIGN §动效原则 4）。配色全部 DESIGN token（accent / danger / success / warning /
 * border / text-*），动效只动 opacity/颜色，时长走具名常量（硬规则 5）。
 */

// 一个微步：哪条线程、哪种操作。read/inc/write 三种。
type Op = "read" | "inc" | "write";
type Thread = "A" | "B";
type MicroStep = { thread: Thread; op: Op };

// 一个预设交错：人话标题 + 6 个微步序列 + 该交错下的最终结果 + 一句解读。
type Preset = {
  id: string;
  label: string;
  steps: readonly MicroStep[];
  result: 1 | 2;
  verdict: string;
};

// 三个交错预设。每条都满足「各线程内部 read→inc→write 不乱序」。
const PRESETS: readonly Preset[] = [
  {
    id: "serial",
    label: "A 整段先跑完 → B",
    // A.read A.inc A.write 全做完，B 才开始：B 读到的是 A 写回的 1，最终 2。
    steps: [
      { thread: "A", op: "read" },
      { thread: "A", op: "inc" },
      { thread: "A", op: "write" },
      { thread: "B", op: "read" },
      { thread: "B", op: "inc" },
      { thread: "B", op: "write" },
    ],
    result: 2,
    verdict:
      "A 把 ++ 整段（读→加→写）做完，订单已是 1；B 这才开始，读到的是 1，写回 2——正确。两次 ++ 没有重叠就没事。",
  },
  {
    id: "lost",
    label: "两线程都先读 → 丢更新",
    // A.read B.read 都读到旧值 0，各自 +1 得 1，各自写回 1：第二次写覆盖第一次，最终 1。
    steps: [
      { thread: "A", op: "read" },
      { thread: "B", op: "read" },
      { thread: "A", op: "inc" },
      { thread: "B", op: "inc" },
      { thread: "A", op: "write" },
      { thread: "B", op: "write" },
    ],
    result: 1,
    verdict:
      "A、B 都先把旧值 0 读进各自小本子，各自 +1 都得 1，再各自写回 1——B 的写覆盖了 A 的写，一次 ++ 凭空蒸发：丢更新，最终只有 1。",
  },
  {
    id: "interleave1",
    label: "读写交叉 → 还是丢更新",
    // A.read A.inc B.read（B 读到的还是旧值 0）A.write B.inc B.write：B 最终写 1，覆盖 A 的 1。
    steps: [
      { thread: "A", op: "read" },
      { thread: "A", op: "inc" },
      { thread: "B", op: "read" },
      { thread: "A", op: "write" },
      { thread: "B", op: "inc" },
      { thread: "B", op: "write" },
    ],
    result: 1,
    verdict:
      "B 在 A 还没写回前就读了旧值 0，哪怕 A 随后写回 1，B 算完仍写 1 盖掉它——只要两次 ++ 有重叠，就可能丢更新，最终 1。",
  },
];

// 计算「执行到第 n 个微步后」的状态：counter、各线程寄存器（已 read 的值）。
type SimState = {
  counter: number;
  regA: number | null; // A 手里小本子的值（null = 还没 read）
  regB: number | null;
};

function simulate(steps: readonly MicroStep[], upto: number): SimState {
  let counter = 0;
  let regA: number | null = null;
  let regB: number | null = null;
  for (let i = 0; i < upto; i++) {
    const s = steps[i];
    if (s.op === "read") {
      if (s.thread === "A") regA = counter;
      else regB = counter;
    } else if (s.op === "inc") {
      if (s.thread === "A") regA = (regA ?? 0) + 1;
      else regB = (regB ?? 0) + 1;
    } else {
      // write
      counter = (s.thread === "A" ? regA : regB) ?? counter;
    }
  }
  return { counter, regA, regB };
}

const OP_LABEL: Record<Op, string> = {
  read: "读 read",
  inc: "+1",
  write: "写回 write",
};

// 每微步推进间隔（ms），单一具名常量，禁止散落魔法数字（硬规则 5）。
const STEP_INTERVAL_MS = 900;

const COLOR_A = "var(--accent)";
const COLOR_B = "var(--success)";

export function RaceConditionExplorer() {
  const reducedMotion = usePrefersReducedMotion();
  const [presetId, setPresetId] = useState<string | null>(null);
  // 已执行的微步数（0..6）。done = preset.steps.length 时显示结果。
  const [executed, setExecuted] = useState(0);
  const [autoPlaying, setAutoPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const preset = PRESETS.find((p) => p.id === presetId) ?? null;
  const total = preset?.steps.length ?? 0;
  const state = preset ? simulate(preset.steps, executed) : null;
  const finished = preset != null && executed >= total;

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  // 卸载时清定时器，防泄漏。
  useEffect(() => clearTimer, []);

  // 选预设：reduced-motion 直接跳最终态，否则停在 0 步等用户播放/单步。
  const choose = (p: Preset) => {
    clearTimer();
    setAutoPlaying(false);
    setPresetId(p.id);
    setExecuted(reducedMotion ? p.steps.length : 0);
  };

  // 自动逐步播放：到末步停。
  const play = () => {
    if (!preset || finished) return;
    setAutoPlaying(true);
    timerRef.current = setInterval(() => {
      setExecuted((n) => {
        const next = n + 1;
        if (next >= preset.steps.length) {
          clearTimer();
          setAutoPlaying(false);
        }
        return Math.min(next, preset.steps.length);
      });
    }, STEP_INTERVAL_MS);
  };

  const stepNext = () => {
    clearTimer();
    setAutoPlaying(false);
    setExecuted((n) => Math.min(n + 1, total));
  };
  const stepPrev = () => {
    clearTimer();
    setAutoPlaying(false);
    setExecuted((n) => Math.max(n - 1, 0));
  };

  const reset = () => {
    clearTimer();
    setAutoPlaying(false);
    setPresetId(null);
    setExecuted(0);
  };

  // 当前正在执行 / 刚执行完的那一微步（用于高亮）。
  const activeIdx = executed > 0 ? executed - 1 : -1;
  const activeStep = preset && activeIdx >= 0 ? preset.steps[activeIdx] : null;

  return (
    <DemoStage
      title="竞态交错器：两个线程各 ++ 一次，结果一定是 2 吗？"
      onReset={preset ? reset : undefined}
      controls={
        <div className="flex flex-col gap-3">
          {/* 预设交错按钮 */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-secondary">选一种交错顺序：</span>
            {PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => choose(p)}
                className={`rounded-control border px-3 py-1.5 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                  presetId === p.id
                    ? "border-accent text-accent"
                    : "border-border text-secondary hover:border-accent hover:text-primary"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* 步进控件（选了预设、且非 reduced-motion 才显示播放/单步） */}
          {preset && !reducedMotion && (
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={stepPrev}
                disabled={executed === 0}
                aria-label="上一微步"
                className="rounded-control border border-border px-3 py-1.5 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span aria-hidden="true">⏮</span> 上一步
              </button>
              <button
                type="button"
                onClick={play}
                disabled={autoPlaying || finished}
                aria-label="自动播放到结果"
                className="rounded-control border border-accent px-3 py-1.5 text-xs text-accent transition-colors duration-(--duration-hover) ease-standard hover:bg-accent-glow disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span aria-hidden="true">▶</span> 自动播放
              </button>
              <button
                type="button"
                onClick={stepNext}
                disabled={finished}
                aria-label="下一微步"
                className="rounded-control border border-border px-3 py-1.5 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                下一步 <span aria-hidden="true">⏭</span>
              </button>
              <span className="text-xs text-secondary">
                {`微步 ${executed} / ${total}`}
              </span>
            </div>
          )}
        </div>
      }
    >
      <div className="w-full max-w-xl">
        {!preset ? (
          <p className="text-center text-sm text-secondary">
            猜一猜：两个线程各 ++ 一次，最后 counter 一定是 2 吗？
            <br />
            选一种交错顺序，再单步看看每个微步发生了什么。
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {/* 共享订单：counter */}
            <div className="flex items-center justify-center gap-3">
              <span className="text-xs text-secondary">
                共享订单 counter（同一块砧板）
              </span>
              <span
                className="rounded-control border px-4 py-1.5 font-mono text-lg font-bold"
                style={{
                  borderColor:
                    activeStep?.op === "write"
                      ? "var(--warning)"
                      : "var(--border)",
                  color: "var(--text-primary)",
                }}
              >
                {state!.counter}
              </span>
            </div>

            {/* 两条线程：寄存器小本子 */}
            <div className="grid grid-cols-2 gap-3">
              {(["A", "B"] as const).map((th) => {
                const reg = th === "A" ? state!.regA : state!.regB;
                const color = th === "A" ? COLOR_A : COLOR_B;
                const isActive = activeStep?.thread === th;
                return (
                  <div
                    key={th}
                    className="rounded-control border p-3 transition-colors"
                    style={{
                      borderColor: isActive ? color : "var(--border)",
                      transitionDuration: "var(--duration-hover)",
                    }}
                  >
                    <div className="text-xs font-semibold" style={{ color }}>
                      线程 {th}（厨师 {th}）做 ++counter
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-secondary">
                      <span>手里小本子（寄存器）</span>
                      <span
                        className="font-mono text-base font-bold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {reg === null ? "—" : reg}
                      </span>
                    </div>
                    {/* 三微步进度点 */}
                    <div className="mt-2 flex gap-1.5">
                      {(["read", "inc", "write"] as const).map((op) => {
                        const stepIdx = preset.steps.findIndex(
                          (s, i) =>
                            s.thread === th && s.op === op && i < executed,
                        );
                        const isExecuted = stepIdx !== -1;
                        const isNow =
                          activeStep?.thread === th && activeStep?.op === op;
                        return (
                          <span
                            key={op}
                            className="rounded-control border px-2 py-0.5 text-[10px] transition-colors"
                            style={{
                              borderColor: isExecuted ? color : "var(--border)",
                              color: isExecuted
                                ? color
                                : "var(--text-secondary)",
                              fontWeight: isNow ? 700 : 400,
                              transitionDuration: "var(--duration-hover)",
                            }}
                          >
                            {OP_LABEL[op]}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 当前微步说明 / 最终结果 */}
            <div
              className="rounded-control border border-border p-3 text-xs"
              aria-live="polite"
              style={{ background: "var(--bg)" }}
            >
              {!finished ? (
                activeStep ? (
                  <span style={{ color: "var(--text-primary)" }}>
                    {`微步 ${executed}：线程 ${activeStep.thread} 执行「${OP_LABEL[activeStep.op]}」`}
                    {activeStep.op === "read" &&
                      `——把 counter 当前值 ${state!.counter} 读进线程 ${activeStep.thread} 的小本子`}
                    {activeStep.op === "inc" &&
                      `——线程 ${activeStep.thread} 在小本子上加一`}
                    {activeStep.op === "write" &&
                      `——把线程 ${activeStep.thread} 小本子的值抄回 counter`}
                  </span>
                ) : (
                  <span className="text-secondary">
                    点「下一步」或「自动播放」开始走这条交错。
                  </span>
                )
              ) : (
                <div className="flex flex-col gap-1.5">
                  <span
                    className="font-semibold"
                    style={{
                      color:
                        preset.result === 2
                          ? "var(--success)"
                          : "var(--danger)",
                    }}
                  >
                    {preset.result === 2
                      ? "结果 counter = 2 ✓ 正确"
                      : "结果 counter = 1 ✗ 丢了一次更新"}
                  </span>
                  <span style={{ color: "var(--text-primary)" }}>
                    {preset.verdict}
                  </span>
                </div>
              )}
            </div>

            <p className="text-center text-xs text-secondary">
              换一种交错顺序再走一遍——你会发现同样两次 ++，结果在 2 和 1
              之间摇摆。这就是竞态：结果取决于谁先谁后。
            </p>
          </div>
        )}
      </div>
    </DemoStage>
  );
}
