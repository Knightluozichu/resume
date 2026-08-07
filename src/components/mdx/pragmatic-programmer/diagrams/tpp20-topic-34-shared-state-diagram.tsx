"use client";

import { useState } from "react";

const COLORS = {
  accent: "var(--accent)",
  border: "var(--border)",
  danger: "var(--danger)",
  elevated: "var(--bg-elevated)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  warning: "var(--warning)",
};

const STAGES = [
  { key: "shared", label: "共享状态", detail: "同一份事实" },
  { key: "window", label: "竞争窗口", detail: "旧快照仍可写回" },
  { key: "owner", label: "所有权", detail: "谁可以修改" },
  { key: "boundary", label: "同步边界", detail: "读写一起提交" },
  { key: "invariant", label: "不变量", detail: "结果必须成立" },
] as const;

function Arrow({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <g aria-hidden="true">
      <line
        x1={x1}
        y1={y}
        x2={x2 - 16}
        y2={y}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <path
        d={`M${x2 - 24} ${y - 7} L${x2 - 8} ${y} L${x2 - 24} ${y + 7}`}
        fill="none"
        stroke={COLORS.accent}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

export function Tpp20Topic34SharedStateDiagram({
  step = 0,
  fault = false,
}: {
  step?: number;
  fault?: boolean;
}) {
  const focus =
    step < 0 ? 0 : step >= STAGES.length ? STAGES.length - 1 : Math.round(step);
  const cardWidth = 164;
  const gap = 25;
  const startX = 16;
  const cardY = 126;

  return (
    <figure
      className="my-6 overflow-hidden rounded-card border border-border bg-elevated p-4"
      data-visual-kind="shared-state-flow"
    >
      <svg
        viewBox="0 0 960 430"
        role="img"
        aria-label="共享状态、竞争窗口、所有权、同步边界和不变量的关系图"
        className="mx-auto block h-auto w-full max-w-[960px]"
      >
        <text
          x="480"
          y="34"
          textAnchor="middle"
          fontSize="19"
          fontWeight="700"
          fill={COLORS.primary}
        >
          先保护修改权，再验证结果
        </text>
        <text
          x="480"
          y="62"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          共享状态是不正确的状态：随机故障通常是并发问题
        </text>
        {STAGES.slice(0, -1).map((stage, index) => {
          const x1 = startX + index * (cardWidth + gap) + cardWidth;
          const x2 = startX + (index + 1) * (cardWidth + gap);
          return (
            <Arrow key={`${stage.key}-arrow`} x1={x1} x2={x2} y={cardY + 70} />
          );
        })}
        {STAGES.map((stage, index) => {
          const x = startX + index * (cardWidth + gap);
          const reached = index <= focus;
          const active = index === focus;
          return (
            <g key={stage.key}>
              <rect
                x={x}
                y={cardY}
                width={cardWidth}
                height="164"
                rx="14"
                fill={active ? COLORS.accent : COLORS.elevated}
                fillOpacity={active ? "0.12" : "1"}
                stroke={active ? COLORS.accent : COLORS.border}
                strokeWidth={active ? "2" : "1"}
              />
              <circle
                cx={x + 26}
                cy={cardY + 29}
                r="13"
                fill={
                  active
                    ? COLORS.accent
                    : reached
                      ? COLORS.success
                      : COLORS.border
                }
                fillOpacity={active || reached ? "1" : "0.35"}
              />
              <text
                x={x + 26}
                y={cardY + 34}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={COLORS.elevated}
              >
                {index + 1}
              </text>
              <text
                x={x + 49}
                y={cardY + 34}
                fontSize="15"
                fontWeight="700"
                fill={active ? COLORS.accent : COLORS.primary}
              >
                {stage.label}
              </text>
              <line
                x1={x + 18}
                y1={cardY + 61}
                x2={x + cardWidth - 18}
                y2={cardY + 61}
                stroke={COLORS.border}
              />
              <text
                x={x + cardWidth / 2}
                y={cardY + 96}
                textAnchor="middle"
                fontSize="12"
                fill={COLORS.primary}
              >
                {stage.detail}
              </text>
              <text
                x={x + cardWidth / 2}
                y={cardY + 129}
                textAnchor="middle"
                fontSize="12"
                fill={
                  active
                    ? COLORS.accent
                    : reached
                      ? COLORS.success
                      : COLORS.secondary
                }
              >
                {active ? "当前观察点" : reached ? "已核对" : "等待证据"}
              </text>
            </g>
          );
        })}
        <rect
          x="16"
          y="328"
          width="928"
          height="54"
          rx="12"
          fill={fault ? COLORS.danger : COLORS.success}
          fillOpacity="0.1"
          stroke={fault ? COLORS.danger : COLORS.success}
        />
        <text
          x="480"
          y="361"
          textAnchor="middle"
          fontSize="13"
          fontWeight="600"
          fill={fault ? COLORS.danger : COLORS.primary}
        >
          {fault
            ? "故障：旧版本在提交前被拒绝；先保存首差，再从原始输入重放"
            : "同步边界只提交满足前置条件的结果，不变量负责最后验收"}
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        专属图示：沿着状态、修改权和提交边界定位第一个不变量破坏点。
      </figcaption>
    </figure>
  );
}

type Mode = "unsafe" | "owner" | "message";

const MODES: Record<
  Mode,
  { label: string; status: string; detail: string; accent: string }
> = {
  unsafe: {
    label: "并发读取",
    status: "两个请求都拿着旧快照写回，候选被拒绝。",
    detail: "版本 7 → 7：第二次写回没有新证据",
    accent: COLORS.danger,
  },
  owner: {
    label: "所有权转移",
    status: "单一拥有者串行提交，旧拥有者失去写回权。",
    detail: "版本 7 → 8：写入权只有账户拥有者持有",
    accent: COLORS.success,
  },
  message: {
    label: "不可变消息",
    status: "每个下游处理自己的版本化快照，重复消息可被拒绝。",
    detail: "版本 7 → 8：消息带版本与幂等键",
    accent: COLORS.accent,
  },
};

export function Tpp20Topic34SharedStateLab() {
  const [mode, setMode] = useState<Mode>("unsafe");
  const current = MODES[mode];

  return (
    <section
      aria-label="共享状态实验"
      className="my-6 rounded-card border border-border bg-elevated p-5"
      data-visual-kind="shared-state-lab"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-primary">
            隔离方式实验台
          </h3>
          <p className="mt-1 text-xs text-secondary">
            只改变修改权边界，保持输入、版本和观察点不变。
          </p>
        </div>
        <span className="rounded-control border border-border px-2 py-1 text-xs text-secondary">
          初始：并发读取
        </span>
      </div>

      <div
        className="mb-4 flex flex-wrap gap-2"
        role="group"
        aria-label="选择隔离方式"
      >
        {(Object.keys(MODES) as Mode[]).map((key) => (
          <button
            key={key}
            type="button"
            aria-pressed={mode === key}
            onClick={() => setMode(key)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
              mode === key
                ? "border-accent text-accent"
                : "border-border text-secondary hover:border-accent hover:text-primary"
            }`}
          >
            {MODES[key].label}
          </button>
        ))}
      </div>

      <figure className="overflow-hidden rounded-card border border-border bg-elevated p-3">
        <svg
          viewBox="0 0 760 310"
          role="img"
          aria-label={`${current.label}下两个请求的状态版本示意`}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <text
            x="380"
            y="28"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill={COLORS.primary}
          >
            {current.label}：谁能提交版本 8？
          </text>
          <text
            x="190"
            y="76"
            textAnchor="middle"
            fontSize="14"
            fill={COLORS.secondary}
          >
            请求 A
          </text>
          <text
            x="570"
            y="76"
            textAnchor="middle"
            fontSize="14"
            fill={COLORS.secondary}
          >
            请求 B
          </text>
          <rect
            x="82"
            y="96"
            width="216"
            height="88"
            rx="12"
            fill={COLORS.elevated}
            stroke={COLORS.border}
          />
          <rect
            x="462"
            y="96"
            width="216"
            height="88"
            rx="12"
            fill={COLORS.elevated}
            stroke={COLORS.border}
          />
          <text
            x="190"
            y="128"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.primary}
          >
            读取版本 7
          </text>
          <text
            x="570"
            y="128"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.primary}
          >
            读取版本 7
          </text>
          <text
            x="190"
            y="157"
            textAnchor="middle"
            fontSize="12"
            fill={COLORS.secondary}
          >
            {mode === "unsafe" ? "保留旧快照" : "等待修改权"}
          </text>
          <text
            x="570"
            y="157"
            textAnchor="middle"
            fontSize="12"
            fill={COLORS.secondary}
          >
            {mode === "message" ? "处理自己的消息" : "等待修改权"}
          </text>
          <line
            x1="300"
            y1="140"
            x2="448"
            y2="140"
            stroke={current.accent}
            strokeWidth="3"
          />
          <path
            d="M432 132 L448 140 L432 148"
            fill="none"
            stroke={current.accent}
            strokeWidth="3"
          />
          <rect
            x="236"
            y="210"
            width="288"
            height="58"
            rx="12"
            fill={current.accent}
            fillOpacity="0.1"
            stroke={current.accent}
          />
          <text
            x="380"
            y="235"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={current.accent}
          >
            {current.detail}
          </text>
          <text
            x="380"
            y="257"
            textAnchor="middle"
            fontSize="12"
            fill={COLORS.primary}
          >
            {mode === "unsafe" ? "拒绝旧提交" : "不变量可验收"}
          </text>
        </svg>
        <figcaption className="mt-2 text-center text-xs text-secondary">
          状态边界只接受带有当前版本证据的提交。
        </figcaption>
      </figure>

      <p
        role="status"
        className="mt-4 rounded-control border border-border px-3 py-2 text-sm text-primary"
      >
        {current.status}
      </p>

      <div className="mt-4 flex justify-center">
        <button
          type="button"
          aria-label="重置共享状态实验"
          onClick={() => setMode("unsafe")}
          className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
        >
          重置
        </button>
      </div>
    </section>
  );
}
