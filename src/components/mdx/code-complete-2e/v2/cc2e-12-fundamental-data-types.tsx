"use client";

import { useState } from "react";

const RANGE_OPTIONS = [
  {
    id: "normal",
    label: "正常值",
    sample: "1,200",
    result: "可表示",
    detail: "输入落在业务域和整数表示范围内。",
  },
  {
    id: "boundary",
    label: "恰好边界",
    sample: "2,147,483,647",
    result: "需记录边界",
    detail: "当前值合法，但下一次加一就会越界。",
  },
  {
    id: "fault",
    label: "故障值",
    sample: "2,147,483,648",
    result: "拒绝",
    detail: "不要使用回绕后的结果继续运算或写入。",
  },
] as const;

const PRECISION_OPTIONS = [
  {
    id: "cents",
    label: "整数分",
    value: "1,299 分",
    result: "合同清楚",
    detail: "金额以最小单位保存，舍入点只出现在明确的结算边界。",
  },
  {
    id: "float",
    label: "浮点近似",
    value: "12.99 元",
    result: "需容差",
    detail: "结果可能带有近似误差，比较时必须说明误差预算。",
  },
  {
    id: "measure",
    label: "测量值",
    value: "12.990 ± 0.005",
    result: "可接受",
    detail: "允许近似，但要把单位、量级和容差写进合同。",
  },
] as const;

const SEMANTIC_OPTIONS = [
  {
    id: "enum",
    label: "枚举状态",
    value: "PaymentStatus.Paid",
    result: "域受限",
    detail: "状态成员有名字，未知成员不会静默变成已支付。",
  },
  {
    id: "boolean",
    label: "布尔事实",
    value: "isArchived = true",
    result: "问题可读",
    detail: "值能直接回答一个问题；未知状态不能伪装成 false。",
  },
  {
    id: "constant",
    label: "命名常量",
    value: "CacheTtlSeconds",
    result: "单位可见",
    detail: "使用点能看出用途和单位，不必猜一个裸数字。",
  },
] as const;

type Focus = "range" | "precision" | "semantics";
type RangeId = (typeof RANGE_OPTIONS)[number]["id"];
type PrecisionId = (typeof PRECISION_OPTIONS)[number]["id"];
type SemanticId = (typeof SEMANTIC_OPTIONS)[number]["id"];

const FOCUS_LABELS: Record<Focus, string> = {
  range: "表示范围",
  precision: "精度与运算",
  semantics: "状态语义",
};

function findById<T extends { id: string }>(items: readonly T[], id: string): T {
  return items.find((item) => item.id === id) ?? items[0];
}

/**
 * 第 12 章专属实验：把类型选择拆成范围、精度和状态语义三个可操作检查点。
 * 图示展示同一条“输入 → 表示 → 决定”链，控件只改变数据合同，不生成随机分数。
 */
export function Cc2e12FundamentalDataTypesLab({
  focus = "range",
}: {
  focus?: Focus;
}) {
  const [activeFocus, setActiveFocus] = useState<Focus>(focus);
  const [rangeId, setRangeId] = useState<RangeId>("normal");
  const [precisionId, setPrecisionId] = useState<PrecisionId>("cents");
  const [semanticId, setSemanticId] = useState<SemanticId>("enum");

  const range = findById(RANGE_OPTIONS, rangeId);
  const precision = findById(PRECISION_OPTIONS, precisionId);
  const semantic = findById(SEMANTIC_OPTIONS, semanticId);
  const rangeFailure = rangeId === "fault";
  const precisionWarning = precisionId === "float";
  const semanticSafe = semanticId !== "boolean";

  const reset = () => {
    setActiveFocus(focus);
    setRangeId("normal");
    setPrecisionId("cents");
    setSemanticId("enum");
  };

  const activeLabel = FOCUS_LABELS[activeFocus];
  const statusColor = rangeFailure
    ? "var(--danger)"
    : precisionWarning
      ? "var(--warning)"
      : "var(--success)";
  const statusText = rangeFailure
    ? "在边界拒绝"
    : precisionWarning
      ? "先声明容差"
      : "合同可复核";

  return (
    <section
      aria-label="第 12 章基本数据类型专属实验"
      data-visual-kind="cc2e-12-fundamental-data-types"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border p-5">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            第 12 章 · 类型合同实验
          </p>
          <h3 className="mt-2 text-lg font-semibold text-primary">
            先证明能表示，再决定能否接受
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
            切换检查点和样本，观察输入如何经过范围、精度与语义三层检查。
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          aria-label="重置基本数据类型实验"
          className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </header>

      <div className="min-w-0 p-5">
        <div className="flex flex-wrap gap-2" aria-label="选择类型检查点">
          {(Object.keys(FOCUS_LABELS) as Focus[]).map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={activeFocus === item}
              onClick={() => setActiveFocus(item)}
              className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
                activeFocus === item
                  ? "border-accent bg-accent/10 text-primary"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              {FOCUS_LABELS[item]}
            </button>
          ))}
        </div>

        {activeFocus === "range" && (
          <div className="mt-4 flex flex-wrap gap-2" aria-label="选择范围样本">
            {RANGE_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={rangeId === option.id}
                onClick={() => setRangeId(option.id)}
                className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
                  rangeId === option.id
                    ? "border-accent bg-accent/10 text-primary"
                    : "border-border text-secondary hover:border-accent hover:text-primary"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}

        {activeFocus === "precision" && (
          <div className="mt-4 flex flex-wrap gap-2" aria-label="选择精度策略">
            {PRECISION_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={precisionId === option.id}
                onClick={() => setPrecisionId(option.id)}
                className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
                  precisionId === option.id
                    ? "border-accent bg-accent/10 text-primary"
                    : "border-border text-secondary hover:border-accent hover:text-primary"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}

        {activeFocus === "semantics" && (
          <div className="mt-4 flex flex-wrap gap-2" aria-label="选择状态语义">
            {SEMANTIC_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={semanticId === option.id}
                onClick={() => setSemanticId(option.id)}
                className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
                  semanticId === option.id
                    ? "border-accent bg-accent/10 text-primary"
                    : "border-border text-secondary hover:border-accent hover:text-primary"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}

        <div className="mt-5 overflow-hidden rounded-card border border-border bg-surface p-3 sm:p-5">
          <svg
            viewBox="0 0 720 390"
            role="img"
            aria-label={`基本数据类型实验：当前检查点为${activeLabel}。输入为${range.sample}，精度策略为${precision.value}，语义选择为${semantic.value}，当前结论为${statusText}。`}
            className="mx-auto block h-auto w-full max-w-[720px]"
          >
            <text
              x="360"
              y="28"
              textAnchor="middle"
              fontSize="16"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              输入 → 表示 → 决定
            </text>
            <text
              x="360"
              y="52"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              当前检查点：{activeLabel}
            </text>

            <rect
              x="24"
              y="84"
              width="194"
              height="184"
              rx="12"
              fill="var(--accent)"
              fillOpacity="0.08"
              stroke="var(--accent)"
              strokeWidth="1.5"
            />
            <text x="42" y="112" fontSize="12" fontWeight="700" fill="var(--accent)">
              输入样本
            </text>
            <text x="42" y="151" fontSize="17" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
              {range.sample}
            </text>
            <text x="42" y="185" fontSize="12" fill="var(--text-secondary)">
              {precision.value}
            </text>
            <text x="42" y="221" fontSize="12" fill="var(--text-primary)">
              {semantic.value}
            </text>
            <text x="42" y="247" fontSize="12" fill="var(--text-secondary)">
              业务域先于声明
            </text>

            <line x1="230" y1="176" x2="266" y2="176" stroke="var(--border)" strokeWidth="2" />
            <path d="M260 168 L272 176 L260 184" fill="none" stroke="var(--border)" strokeWidth="2" />

            <rect
              x="276"
              y="84"
              width="194"
              height="184"
              rx="12"
              fill="var(--bg)"
              stroke="var(--border)"
              strokeWidth="1.5"
            />
            <text x="294" y="112" fontSize="12" fontWeight="700" fill="var(--text-primary)">
              表示检查
            </text>
            <circle cx="307" cy="147" r="7" fill={rangeFailure ? "var(--danger)" : "var(--success)"} />
            <text x="325" y="152" fontSize="12" fill="var(--text-primary)">
              范围：{range.result}
            </text>
            <circle cx="307" cy="184" r="7" fill={precisionWarning ? "var(--warning)" : "var(--success)"} />
            <text x="325" y="189" fontSize="12" fill="var(--text-primary)">
              精度：{precision.result}
            </text>
            <circle cx="307" cy="221" r="7" fill={semanticSafe ? "var(--success)" : "var(--warning)"} />
            <text x="325" y="226" fontSize="12" fill="var(--text-primary)">
              语义：{semantic.result}
            </text>
            <text x="294" y="251" fontSize="12" fill="var(--text-secondary)">
              {activeFocus === "range" ? range.detail : activeFocus === "precision" ? precision.detail : semantic.detail}
            </text>

            <line x1="482" y1="176" x2="518" y2="176" stroke="var(--border)" strokeWidth="2" />
            <path d="M512 168 L524 176 L512 184" fill="none" stroke="var(--border)" strokeWidth="2" />

            <rect
              x="528"
              y="84"
              width="168"
              height="184"
              rx="12"
              fill={statusColor}
              fillOpacity="0.08"
              stroke={statusColor}
              strokeWidth="1.5"
            />
            <text x="546" y="112" fontSize="12" fontWeight="700" fill={statusColor}>
              决定
            </text>
            <text x="546" y="153" fontSize="16" fontWeight="700" fill={statusColor}>
              {statusText}
            </text>
            <text x="546" y="186" fontSize="12" fill="var(--text-primary)">
              {rangeFailure ? "返回拒绝理由" : "保留可复核证据"}
            </text>
            <text x="546" y="211" fontSize="12" fill="var(--text-primary)">
              {precisionWarning ? "不要静默比较" : "再进入下一边界"}
            </text>
            <text x="546" y="247" fontSize="12" fill="var(--text-secondary)">
              先预测，再动手试
            </text>

            <line x1="42" y1="319" x2="678" y2="319" stroke="var(--border)" strokeWidth="1" strokeDasharray="5 4" />
            <circle cx="120" cy="319" r="8" fill="var(--accent)" />
            <circle cx="360" cy="319" r="8" fill={rangeFailure ? "var(--danger)" : "var(--success)"} />
            <circle cx="600" cy="319" r="8" fill={statusColor} />
            <text x="120" y="350" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
              输入
            </text>
            <text x="360" y="350" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
              表示
            </text>
            <text x="600" y="350" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
              决定
            </text>
          </svg>
        </div>

        <p className="mt-3 text-center text-xs text-secondary" role="status" aria-live="polite">
          {range.detail} {precision.detail} {semantic.detail}
        </p>
      </div>
    </section>
  );
}
