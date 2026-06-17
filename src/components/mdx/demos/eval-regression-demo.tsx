"use client";

import { useState } from "react";

import { DemoStage } from "../controls";

/**
 * <EvalRegressionDemo>：离线 eval + 回归检测的交互演示（HEL-316，《评估与可观测性》
 * 篇5·1，知识点 3/4：离线 eval 与回归）。
 *
 * 全书隐喻：AI Agent = 私人助理「小特」。改了 prompt / 换了模型后，怎么确认没把它改坏？
 * 攒一个**固定测试集**（几道题），每次改动后跑一遍，看逐题通过 ✓/✗ + 总通过率。本 Demo
 * 把「改 prompt 前 vs 改 prompt 后」摆一起：切换看——总通过率**涨了**（70% → 80%，看着是改
 * 进），但**某两题原来对的，悄悄挂了**（回归）。突出核心：别只看总分涨，要**逐题看有没有
 * 改坏**——回归往往藏在总分上涨的背后。
 *
 * canned 数据（标注示意）——不真去跑模型，通过/不通过是预置的，只为直观展示「离线 eval +
 * 逐题对比」长什么样。必有重置（回默认：看「改之前」）。
 *
 * 为何 client：前/后切换是真交互（受控状态 + 重算每题 ✓/✗ 与通过率 + 高亮回归题）。颜色 /
 * 间距 / 圆角全走 DESIGN token（硬规则 5）；字号 ≥10px。
 */

type TestCase = {
  id: string;
  /** 测试题（一句话）。 */
  q: string;
  /** 改 prompt 之前是否通过。 */
  before: boolean;
  /** 改 prompt 之后是否通过。 */
  after: boolean;
};

// 固定测试集：10 题。改后总通过率 7/10 → 8/10（涨），但 t3、t7 从过变挂（回归）。
const TESTS: readonly TestCase[] = [
  { id: "t1", q: "查实时天气并给建议", before: true, after: true },
  { id: "t2", q: "把一段话翻译成英文", before: true, after: true },
  { id: "t3", q: "拒绝回答越界的危险请求", before: true, after: false }, // 回归！
  { id: "t4", q: "多步推理：算订单总价", before: false, after: true }, // 修好
  { id: "t5", q: "从长文里抽取关键日期", before: true, after: true },
  { id: "t6", q: "礼貌地澄清含糊的问题", before: false, after: true }, // 修好
  { id: "t7", q: "答案里带上信息出处", before: true, after: false }, // 回归！
  { id: "t8", q: "拒绝编造不知道的事实", before: true, after: true },
  { id: "t9", q: "调用正确的工具查数据", before: true, after: true },
  { id: "t10", q: "保持简短、不啰嗦", before: false, after: true }, // 修好
];

const TOTAL = TESTS.length;

type Phase = "before" | "after";

export function EvalRegressionDemo() {
  const [phase, setPhase] = useState<Phase>("before");
  const reset = () => setPhase("before");

  const passed = TESTS.filter((t) =>
    phase === "before" ? t.before : t.after,
  ).length;
  const rate = Math.round((passed / TOTAL) * 100);
  const rateColor =
    rate >= 80
      ? "var(--success)"
      : rate >= 50
        ? "var(--warning)"
        : "var(--danger)";

  const showAfter = phase === "after";

  return (
    <DemoStage
      title="离线 eval + 回归：改 prompt 前 vs 后，跑同一个固定测试集，逐题看通过率"
      onReset={reset}
      controls={
        <div className="flex flex-col gap-2">
          <span className="text-xs text-secondary">
            切换「改 prompt 前 / 后」，看同一个测试集的结果怎么变：
          </span>
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["before", "改 prompt 之前"],
                ["after", "改 prompt 之后"],
              ] as const
            ).map(([p, label]) => (
              <button
                key={p}
                type="button"
                onClick={() => setPhase(p)}
                aria-pressed={phase === p}
                className={`rounded-control border px-3 py-1.5 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                  phase === p
                    ? "border-accent text-accent"
                    : "border-border text-secondary hover:text-primary"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      }
    >
      <div className="w-full max-w-[520px] text-sm">
        {/* 总通过率 */}
        <div className="mb-3 flex items-center justify-between rounded-control border border-border bg-bg p-3">
          <span className="text-xs font-semibold text-primary">
            总通过率（{showAfter ? "改之后" : "改之前"}）
          </span>
          <span
            className="font-mono text-base font-bold tabular-nums"
            style={{ color: rateColor }}
          >
            {passed}/{TOTAL}（{rate}%）
          </span>
        </div>

        {/* 逐题清单 */}
        <ul className="flex flex-col gap-1.5">
          {TESTS.map((t) => {
            const pass = showAfter ? t.after : t.before;
            // 只有在「改之后」视图里，才把「原来过、现在挂」高亮成回归。
            const isRegression = showAfter && t.before && !t.after;
            return (
              <li
                key={t.id}
                className={`flex items-center justify-between gap-2 rounded-control border px-3 py-1.5 text-xs ${
                  isRegression ? "border-danger bg-bg" : "border-border bg-bg"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="font-mono font-bold"
                    style={{
                      color: pass ? "var(--success)" : "var(--danger)",
                    }}
                  >
                    {pass ? "✓" : "✗"}
                  </span>
                  <span className={pass ? "text-primary" : "text-secondary"}>
                    {t.q}
                  </span>
                </span>
                {isRegression && (
                  <span className="shrink-0 rounded-control border border-danger px-1.5 py-0.5 text-[10px] font-bold text-danger">
                    回归！原来对的
                  </span>
                )}
              </li>
            );
          })}
        </ul>

        {/* 结论：总分涨 vs 逐题看 */}
        <p className="mt-3 rounded-control border border-accent/40 bg-bg p-2 text-[10.5px] leading-relaxed text-secondary">
          {showAfter ? (
            <>
              ⚠️ 总通过率从 70%{" "}
              <strong className="text-success">涨到 80%</strong>
              ，看着是改进——但
              <strong className="text-danger">
                标红那两题原来是过的，现在悄悄挂了
              </strong>
              （这就是回归）。
              <strong className="text-primary">
                别只看总分涨，要逐题看有没有改坏。
              </strong>
            </>
          ) : (
            <>
              这是改 prompt <strong className="text-primary">之前</strong>
              的基线： 7/10
              通过。记住哪几题是过的——切到「改之后」，再逐题对比有没有被改坏。
            </>
          )}
        </p>

        {/* canned 标注 */}
        <p className="mt-2 text-[10px] text-secondary">
          ⚠️ 通过 / 不通过为预置示意，
          <strong className="text-primary">非实时跑模型</strong>
          ；真实离线 eval 是把测试集喂给当前版本跑一遍、对每题判分。
        </p>
      </div>
    </DemoStage>
  );
}
