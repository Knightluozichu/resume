"use client";

import { useId, useState } from "react";

const COLORS = {
  background: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
} as const;

const CLAIMS = [
  {
    key: "language",
    label: "语言演进",
    claim: "语法与库会持续增强",
    evidence: "提案与规范版本",
    outcome: "只记录已发布的变化",
  },
  {
    key: "compiler",
    label: "编译器",
    claim: "编译器会把更多工作提前",
    evidence: "编译器文档与字节码",
    outcome: "用同一源码比较结果",
  },
  {
    key: "runtime",
    label: "运行时",
    claim: "虚拟机会继续优化吞吐与延迟",
    evidence: "VM 参数与观测记录",
    outcome: "不把单次测量写成保证",
  },
] as const;

const LENSES = [
  {
    key: "claim",
    label: "预测声明",
    detail: "保留原日期、原句和不确定性",
  },
  {
    key: "evidence",
    label: "当时证据",
    detail: "只接收当时可取得的提案、规范或实现记录",
  },
  {
    key: "outcome",
    label: "后来结果",
    detail: "以发布记录和可重放实验核对，不倒推当年判断",
  },
] as const;

type ClaimKey = (typeof CLAIMS)[number]["key"];
type LensKey = (typeof LENSES)[number]["key"];

export function Duj3AppendixBJavaFuture2013PredictionReviewMap() {
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `duj3-appendix-b-java-future-2013-arrow-${instanceId}`;
  const [claimKey, setClaimKey] = useState<ClaimKey>("language");
  const [lensKey, setLensKey] = useState<LensKey>("claim");
  const [boundaryFault, setBoundaryFault] = useState(false);

  const claim = CLAIMS.find((item) => item.key === claimKey) ?? CLAIMS[0];
  const lens = LENSES.find((item) => item.key === lensKey) ?? LENSES[0];
  const verdict = boundaryFault
    ? {
        color: COLORS.warning,
        title: "暂停结论：证据越界",
        detail:
          "你把后来发布的结果当成了 2013 年的当时证据。先恢复时间边界，再分别保存预测、证据与结果。",
      }
    : {
        color: COLORS.success,
        title: "证据链完整：可以继续复核",
        detail: `${claim.label}当前聚焦“${lens.label}”：${lens.detail}。结论仍需附带版本、时间戳和不确定性。`,
      };

  function reset() {
    setClaimKey("language");
    setLensKey("claim");
    setBoundaryFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="duj3-appendix-b-java-future-2013-prediction-review"
      data-unit-id="duj3-appendix-b-java-future-2013"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DUJ3 · 附录 B
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              2013 预测复核台
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              把预测、当时证据和后来结果分开保存；切换任一维度，都不能偷偷改写另外两份记录。
            </p>
          </div>
          <button
            type="button"
            aria-label="重置 2013 预测复核台"
            onClick={reset}
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
          >
            重置
          </button>
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="flex flex-wrap gap-2" aria-label="选择预测主题">
            <span className="self-center text-xs text-secondary">主题：</span>
            {CLAIMS.map((item) => (
              <button
                key={item.key}
                type="button"
                aria-pressed={claimKey === item.key}
                onClick={() => setClaimKey(item.key)}
                className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
                  claimKey === item.key
                    ? "border-accent text-accent"
                    : "border-border text-secondary hover:border-accent hover:text-primary"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-pressed={boundaryFault}
            onClick={() => setBoundaryFault((value) => !value)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
              boundaryFault
                ? "border-warning text-warning"
                : "border-border text-secondary hover:border-warning hover:text-warning"
            }`}
          >
            {boundaryFault ? "恢复时间边界" : "注入后见之明故障"}
          </button>
        </div>

        <div className="mb-4 flex flex-wrap gap-2" aria-label="选择复核维度">
          <span className="self-center text-xs text-secondary">复核维度：</span>
          {LENSES.map((item) => (
            <button
              key={item.key}
              type="button"
              aria-pressed={lensKey === item.key}
              onClick={() => setLensKey(item.key)}
              className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
                lensKey === item.key
                  ? "border-accent text-accent"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <svg
          aria-label="2013 预测复核图：从预测声明连接到当时证据，再连接到后来结果；支持主题切换、复核维度切换、后见之明故障注入和重置。"
          className="h-auto w-full"
          role="img"
          viewBox="0 0 760 560"
        >
          <defs>
            <marker
              id={arrowId}
              markerHeight="8"
              markerWidth="8"
              orient="auto"
              refX="6"
              refY="4"
              viewBox="0 0 8 8"
            >
              <path d="M0 0L8 4L0 8Z" fill={COLORS.secondary} />
            </marker>
          </defs>

          <rect
            fill={COLORS.background}
            height="520"
            rx="16"
            stroke={COLORS.border}
            width="720"
            x="20"
            y="20"
          />
          <text fill={COLORS.secondary} fontSize="13" x="48" y="54">
            当前主题：{claim.label} · 只改变观察焦点，不改变历史输入
          </text>

          <line
            markerEnd={`url(#${arrowId})`}
            stroke={COLORS.secondary}
            strokeWidth="2"
            x1="238"
            x2="306"
            y1="210"
            y2="210"
          />
          <line
            markerEnd={`url(#${arrowId})`}
            stroke={COLORS.secondary}
            strokeWidth="2"
            x1="478"
            x2="546"
            y1="210"
            y2="210"
          />

          <g>
            <rect
              fill={lensKey === "claim" ? "var(--bg)" : COLORS.elevated}
              height="250"
              rx="12"
              stroke={lensKey === "claim" ? COLORS.accent : COLORS.border}
              strokeWidth={lensKey === "claim" ? "2" : "1"}
              width="190"
              x="48"
              y="88"
            />
            <text
              fill={COLORS.accent}
              fontSize="13"
              fontWeight="600"
              x="68"
              y="122"
            >
              2013 · 预测声明
            </text>
            <text fill={COLORS.primary} fontSize="14" x="68" y="162">
              {claim.claim}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="68" y="202">
              原始日期：2013
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="68" y="226">
              记录：原句 + 不确定性
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="68" y="266">
              不填入后来结果
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="68" y="306">
              当前焦点：{lensKey === "claim" ? "是" : "否"}
            </text>
          </g>

          <g>
            <rect
              fill={lensKey === "evidence" ? "var(--bg)" : COLORS.elevated}
              height="250"
              rx="12"
              stroke={lensKey === "evidence" ? COLORS.accent : COLORS.border}
              strokeWidth={lensKey === "evidence" ? "2" : "1"}
              width="190"
              x="286"
              y="88"
            />
            <text
              fill={COLORS.accent}
              fontSize="13"
              fontWeight="600"
              x="306"
              y="122"
            >
              当时 · 证据
            </text>
            <text fill={COLORS.primary} fontSize="14" x="306" y="162">
              {claim.evidence}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="306" y="202">
              版本：来源可追溯
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="306" y="226">
              时间：采集窗口固定
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="306" y="266">
              输出：保留原始日志
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="306" y="306">
              当前焦点：{lensKey === "evidence" ? "是" : "否"}
            </text>
          </g>

          <g>
            <rect
              fill={lensKey === "outcome" ? "var(--bg)" : COLORS.elevated}
              height="250"
              rx="12"
              stroke={lensKey === "outcome" ? COLORS.accent : COLORS.border}
              strokeWidth={lensKey === "outcome" ? "2" : "1"}
              width="190"
              x="524"
              y="88"
            />
            <text
              fill={COLORS.accent}
              fontSize="13"
              fontWeight="600"
              x="544"
              y="122"
            >
              后来 · 结果
            </text>
            <text fill={COLORS.primary} fontSize="14" x="544" y="162">
              {claim.outcome}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="544" y="202">
              记录：发布版本与日期
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="544" y="226">
              实验：同输入再测量
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="544" y="266">
              结论：允许保留未知
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="544" y="306">
              当前焦点：{lensKey === "outcome" ? "是" : "否"}
            </text>
          </g>

          <rect
            fill={boundaryFault ? COLORS.warning : COLORS.success}
            height="84"
            rx="12"
            width="664"
            x="48"
            y="382"
          />
          <text
            fill={COLORS.background}
            fontSize="14"
            fontWeight="600"
            x="70"
            y="414"
          >
            {verdict.title}
          </text>
          <text fill={COLORS.background} fontSize="12" x="70" y="444">
            {verdict.detail}
          </text>
        </svg>

        <div
          aria-live="polite"
          className="mt-3 rounded-control border border-border bg-bg p-3 text-xs text-secondary"
          role="status"
        >
          <span className="font-semibold" style={{ color: verdict.color }}>
            {verdict.title}
          </span>
          <span className="ml-2">{verdict.detail}</span>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        本图是审计模型，不是 Java
        版本路线图；每一条结论都要带着日期、证据和不确定性离开复核台。
      </figcaption>
    </figure>
  );
}
