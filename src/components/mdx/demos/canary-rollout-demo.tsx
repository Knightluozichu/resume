"use client";

import { useState } from "react";

import { DemoStage } from "../controls";

/**
 * <CanaryRolloutDemo>：灰度发布（canary）+ 回滚的交互演示
 * （HEL-320，《生产化部署》篇5·3，知识点 4：灰度发布与回滚）。
 *
 * 全书隐喻：AI Agent = 私人助理「小特」。新版本（改了 prompt / 换了模型）别一上来就全量。
 * 灰度：先放 5% 流量试，盯第12章那些指标（成功率 / 延迟 / 成本），没问题再 50% → 100%；
 * 一旦某档指标变差，立刻回滚切回老版本。让上线可控、出事能撤。
 *
 * 玩法：从「5% 灰度」起步，每一档显示该档的 canned 指标（成功率 / P95 延迟）。读者按两个
 * 按钮推进：
 *   - 「指标正常，继续放量」→ 进到下一档（5% → 50% → 100% 全量发布完成）；
 *   - 「指标变差，回滚」→ 立刻切回老版本（撤掉新版本，流量回到 0%）。
 * 不同档可注入「指标变差」（这里在 50% 档预置一组变差的指标，读者会看到该不该继续）。
 *
 * canned（标注「指标示意，非真实流量」）——指标是预置的，只为直观展示「一档档放量 + 出事
 * 回滚」的流程。必有重置（回默认：5% 灰度起步、未做任何决定）。
 *
 * 为何 client：推进 / 回滚是真交互（受控状态机 + 重算当前档指标与进度）。颜色 / 间距 / 圆角
 * 全走 DESIGN token（硬规则 5）；进度柱 / 状态用语义色；字号 ≥10px；无 WebGL（纯 div + SVG 进度）。
 */

type Metrics = {
  /** 成功率（%）。 */
  successRate: number;
  /** P95 延迟（毫秒）。 */
  p95Ms: number;
  /** 这一档指标是好是坏。 */
  healthy: boolean;
  /** 一句话点评。 */
  note: string;
};

type Stage = {
  /** 灰度档位标签。 */
  label: string;
  /** 放量百分比（进度柱用）。 */
  pct: number;
  /** 该档的 canned 指标。 */
  metrics: Metrics;
};

// 老版本基线（对照用）：成功率 98.5%、P95 1100ms。
const BASELINE = { successRate: 98.5, p95Ms: 1100 };

// 灰度三档：5% 正常 → 50% 指标变差（这里埋一颗雷，演示「该回滚」）→ 100% 全量。
// 注：50% 档故意预置成不健康，读者点到这会看到「指标变差，该回滚」。
const STAGES: readonly Stage[] = [
  {
    label: "5% 灰度",
    pct: 5,
    metrics: {
      successRate: 98.3,
      p95Ms: 1150,
      healthy: true,
      note: "5% 流量上，成功率和延迟都和老版本基本持平——看着没问题，可以继续放量。",
    },
  },
  {
    label: "50% 灰度",
    pct: 50,
    metrics: {
      successRate: 92.1,
      p95Ms: 2600,
      healthy: false,
      note: "放到 50% 后露馅了：成功率从 98% 掉到 92%、P95 延迟从 1.1s 飙到 2.6s——指标明显变差，这时该回滚，别再往 100% 推。",
    },
  },
  {
    label: "100% 全量",
    pct: 100,
    metrics: {
      successRate: 98.4,
      p95Ms: 1120,
      healthy: true,
      note: "（仅当前两档都健康才会走到这）全量发布完成，新版本接管全部流量。",
    },
  },
];

type Outcome = "rolling" | "fullyDeployed" | "rolledBack";

export function CanaryRolloutDemo() {
  // stageIdx：当前在第几档（0=5%, 1=50%, 2=100%）。outcome：流程状态。
  const [stageIdx, setStageIdx] = useState(0);
  const [outcome, setOutcome] = useState<Outcome>("rolling");

  const reset = () => {
    setStageIdx(0);
    setOutcome("rolling");
  };

  const stage = STAGES[stageIdx];
  const isLast = stageIdx === STAGES.length - 1;

  const advance = () => {
    if (isLast) {
      setOutcome("fullyDeployed");
    } else {
      setStageIdx((i) => i + 1);
    }
  };
  const rollback = () => setOutcome("rolledBack");

  // 进度柱：回滚 = 0%，全量完成 = 100%，否则 = 当前档百分比。
  const progressPct =
    outcome === "rolledBack"
      ? 0
      : outcome === "fullyDeployed"
        ? 100
        : stage.pct;

  const finished = outcome !== "rolling";

  // 当前档指标对比基线的颜色。
  const rateColor = stage.metrics.healthy ? "var(--success)" : "var(--danger)";
  const latColor = stage.metrics.healthy ? "var(--success)" : "var(--danger)";

  return (
    <DemoStage
      title="灰度发布 + 回滚：新版本先放 5% 流量盯指标，好就放量、变差就回滚"
      onReset={reset}
      controls={
        <div className="flex flex-col gap-2">
          <span className="text-xs text-secondary">
            {finished
              ? "流程已结束，点「重置」从 5% 灰度重新走一遍。"
              : "看这一档的指标，决定继续放量还是回滚："}
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={advance}
              disabled={finished}
              className="rounded-control border border-success/60 px-3 py-1.5 text-xs text-success transition-colors duration-(--duration-hover) ease-standard hover:border-success disabled:cursor-not-allowed disabled:opacity-40"
            >
              指标正常 → {isLast ? "完成全量发布" : "继续放量"}
            </button>
            <button
              type="button"
              onClick={rollback}
              disabled={finished}
              className="rounded-control border border-danger/60 px-3 py-1.5 text-xs text-danger transition-colors duration-(--duration-hover) ease-standard hover:border-danger disabled:cursor-not-allowed disabled:opacity-40"
            >
              指标变差 → 回滚
            </button>
          </div>
        </div>
      }
    >
      <div className="w-full max-w-[520px] text-sm">
        {/* 放量进度柱 */}
        <div className="mb-3">
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="font-semibold text-primary">新版本流量占比</span>
            <span
              className="font-mono font-bold tabular-nums"
              style={{
                color:
                  outcome === "rolledBack" ? "var(--danger)" : "var(--accent)",
              }}
            >
              {progressPct}%
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full border border-border bg-bg">
            <div
              className="h-full rounded-full transition-all duration-(--duration-hover) ease-standard"
              style={{
                width: `${progressPct}%`,
                backgroundColor:
                  outcome === "rolledBack" ? "var(--danger)" : "var(--accent)",
              }}
            />
          </div>
        </div>

        {!finished && (
          <>
            {/* 当前档 + 指标对照 */}
            <div className="mb-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-control border border-accent/50 px-2 py-1 text-[11px] font-semibold text-accent">
                <span aria-hidden="true">🐤</span>
                当前档：{stage.label}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-control border border-border bg-bg p-2.5">
                <p className="text-[10.5px] text-secondary">成功率</p>
                <p
                  className="font-mono text-base font-bold tabular-nums"
                  style={{ color: rateColor }}
                >
                  {stage.metrics.successRate}%
                </p>
                <p className="text-[10px] text-secondary">
                  老版本基线 {BASELINE.successRate}%
                </p>
              </div>
              <div className="rounded-control border border-border bg-bg p-2.5">
                <p className="text-[10.5px] text-secondary">P95 延迟</p>
                <p
                  className="font-mono text-base font-bold tabular-nums"
                  style={{ color: latColor }}
                >
                  {stage.metrics.p95Ms}ms
                </p>
                <p className="text-[10px] text-secondary">
                  老版本基线 {BASELINE.p95Ms}ms
                </p>
              </div>
            </div>

            <p
              className="mt-2 rounded-control border bg-bg p-2 text-[11px] leading-relaxed text-secondary"
              style={{
                borderColor: stage.metrics.healthy
                  ? "var(--success)"
                  : "var(--danger)",
              }}
            >
              <strong
                style={{
                  color: stage.metrics.healthy
                    ? "var(--success)"
                    : "var(--danger)",
                }}
              >
                {stage.metrics.healthy ? "指标健康" : "指标变差"}：
              </strong>
              {stage.metrics.note}
            </p>
          </>
        )}

        {/* 结束态 */}
        {outcome === "fullyDeployed" && (
          <div className="rounded-control border border-success bg-bg p-3">
            <p className="text-xs font-bold text-success">
              <span aria-hidden="true">🎉 </span>
              全量发布完成：新版本平稳接管 100% 流量
            </p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-secondary">
              一档档放量、每档都盯住指标确认没问题，新版本才走到全量——这就是灰度：把「一上来全量、有问题瞬间炸全部用户」的赌注，拆成可控的小步。
            </p>
          </div>
        )}
        {outcome === "rolledBack" && (
          <div className="rounded-control border border-danger bg-bg p-3">
            <p className="text-xs font-bold text-danger">
              <span aria-hidden="true">↩️ </span>
              已回滚：流量切回老版本，新版本撤下
            </p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-secondary">
              一旦某档指标变差，立刻回滚——只有那一小撮灰度流量受了点影响，绝大多数用户始终用着稳定的老版本。这就是回滚的价值：出事能撤、损失封顶。
            </p>
          </div>
        )}

        {/* canned 标注 */}
        <p className="mt-3 text-[10px] text-secondary">
          ⚠️ 各档指标为
          <strong className="text-primary">预置示意、非真实流量</strong>
          ；真实灰度是从线上监控实时读成功率 / 延迟 / 成本来决定继续还是回滚。
        </p>
      </div>
    </DemoStage>
  );
}
