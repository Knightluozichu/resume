"use client";

import { useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/components/review/use-prefers-reduced-motion";

import { DemoStage } from "../controls";

/**
 * <HelloThreadsInterleaveDemo>：双线程输出顺序不确定的交互演示（HEL-229）。
 *
 * 餐厅后厨隐喻：主线程（[main]）和 worker 线程（[厨师2]）各喊 3 句话。点「运行 ▶」后，
 * 把两组共 6 行按一个随机交错顺序依次淡入显示——每次运行交错顺序都不同，
 * 直观演示「两个线程同时往屏幕打印，谁先谁后是不确定的」。
 *
 * 随机交错（非简单 shuffle）：保持各自线程内部 3 行的相对先后（main 的第 1 句一定在第 2 句前），
 * 但两条线之间如何交织随机——这才贴近真实调度：每条线程内顺序确定、线程之间穿插不可控。
 *
 * 为何 client：点击运行、随机排序、逐行淡入、重置都是真交互（事件 + 状态 + 定时器）。
 * 叶子壳，不会把整页变 client。
 *
 * reduced-motion：直接一次性显示最终（随机后的）结果，不做逐行淡入与 setTimeout 节奏
 * （DESIGN §动效原则 4）。配色全部 DESIGN token（accent / danger / success /
 * border / text-*），动效只动 opacity，时长走具名常量（硬规则 5）。
 */

// 每条线程各 3 行台词。color 走语义 token：main 红、worker 绿（与并发图任务 A/B 呼应）。
const MAIN_LINES = [
  "[main] 后厨开张啦",
  "[main] 摆好餐具",
  "[main] 等上菜",
] as const;
const WORKER_LINES = [
  "[厨师2] 开火热锅",
  "[厨师2] 切菜中",
  "[厨师2] 装盘出菜",
] as const;

type Line = { key: string; text: string; from: "main" | "worker" };

// 逐行淡入间隔（ms），单一具名常量，禁止散落魔法数字（硬规则 5）。
const REVEAL_STEP_MS = 420;

/**
 * 生成一个「保各自内序、线程间随机交织」的合并序列。
 * 做法：维护两条队列的游标，每步在「还有剩」的两条线里随机挑一条吐一行。
 */
function buildInterleaving(): Line[] {
  let i = 0;
  let j = 0;
  const out: Line[] = [];
  while (i < MAIN_LINES.length || j < WORKER_LINES.length) {
    const canMain = i < MAIN_LINES.length;
    const canWorker = j < WORKER_LINES.length;
    // 两条都还有剩 → 抛硬币；只剩一条 → 取那条。
    const pickMain = canMain && (!canWorker || Math.random() < 0.5);
    if (pickMain) {
      out.push({ key: `m${i}`, text: MAIN_LINES[i], from: "main" });
      i++;
    } else {
      out.push({ key: `w${j}`, text: WORKER_LINES[j], from: "worker" });
      j++;
    }
  }
  return out;
}

export function HelloThreadsInterleaveDemo() {
  const reducedMotion = usePrefersReducedMotion();
  const [lines, setLines] = useState<Line[]>([]);
  // 已显示的行数（淡入进度）；reduced-motion 下直接 = lines.length。
  const [revealed, setRevealed] = useState(0);
  const [running, setRunning] = useState(false);
  // 清理在途的 setTimeout，避免重置/重跑时残留定时器。
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  const run = () => {
    clearTimers();
    const seq = buildInterleaving();
    setLines(seq);

    if (reducedMotion) {
      // reduced-motion：一次性显示最终结果，不逐行淡入。
      setRevealed(seq.length);
      setRunning(false);
      return;
    }

    setRevealed(0);
    setRunning(true);
    seq.forEach((_, idx) => {
      const t = setTimeout(
        () => {
          setRevealed(idx + 1);
          if (idx === seq.length - 1) setRunning(false);
        },
        REVEAL_STEP_MS * (idx + 1),
      );
      timersRef.current.push(t);
    });
  };

  const reset = () => {
    clearTimers();
    setLines([]);
    setRevealed(0);
    setRunning(false);
  };

  return (
    <DemoStage
      title="两个线程同时打印：输出顺序固定吗？"
      onReset={lines.length > 0 ? reset : undefined}
      controls={
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={run}
            disabled={running}
            className="rounded-control border border-accent px-4 py-2 text-xs font-medium text-accent transition-colors duration-(--duration-hover) ease-standard hover:bg-accent-glow disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span aria-hidden="true">▶</span> 运行
          </button>
          <span className="text-xs text-secondary">
            反复点几次「运行」——每次的输出先后都不一样。
          </span>
        </div>
      }
    >
      <div className="w-full max-w-lg">
        {/* 图例：哪条颜色是哪个线程 */}
        <div className="mb-3 flex items-center gap-4 text-xs">
          <span className="inline-flex items-center gap-1.5 text-secondary">
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ background: "var(--danger)" }}
            />
            主线程 main
          </span>
          <span className="inline-flex items-center gap-1.5 text-secondary">
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ background: "var(--success)" }}
            />
            worker 线程
          </span>
        </div>

        {/* 终端式输出区 */}
        <div
          className="min-h-44 rounded-control border border-border p-4 font-mono text-sm"
          style={{ background: "var(--bg)" }}
          aria-live="polite"
        >
          {lines.length === 0 ? (
            <p className="text-secondary">
              点「运行 ▶」启动两个线程，看它们的输出怎么交错。
            </p>
          ) : (
            <ul className="space-y-1.5">
              {lines.map((line, idx) => {
                const shown = idx < revealed;
                return (
                  <li
                    key={line.key}
                    className="transition-opacity"
                    style={{
                      opacity: shown ? 1 : 0,
                      // 只动 opacity；reduced-motion 下 globals 已把过渡时长置 0（瞬切）。
                      transitionDuration: "var(--duration-expand)",
                      color:
                        line.from === "main"
                          ? "var(--danger)"
                          : "var(--success)",
                    }}
                  >
                    {line.text}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* 猜一猜引导 */}
        <p className="mt-3 text-xs text-secondary">
          猜一猜：两个厨师同时喊话，谁先谁后是固定的吗？跑几次看看再下结论。
        </p>
      </div>
    </DemoStage>
  );
}
