"use client";

import { useId, useRef, useState } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
} as const;

const T = TEACHING_BEAT_MS;

type Isolation = "committed" | "snapshot" | "serializable";
type History = "safe" | "lost-update" | "write-skew";
type Guard = "lock" | "retry" | "none";

const STEPS: readonly TeachingStep[] = [
  { label: "begin", caption: "事务声明边界，并读取满足条件的状态" },
  { label: "read", caption: "两个并发事务分别建立自己的观察" },
  { label: "overlap", caption: "交错写入暴露丢失更新或写偏差" },
  { label: "commit", caption: "锁、版本检查或序列化规则决定谁能提交" },
  { label: "abort", caption: "冲突时回滚并按幂等协议重试" },
  { label: "verify", caption: "提交后重新检查业务不变量和历史" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const ISOLATION_LABELS: Record<Isolation, string> = {
  committed: "读已提交",
  snapshot: "快照隔离",
  serializable: "可串行化",
};

const HISTORY_LABELS: Record<History, string> = {
  safe: "正常历史",
  "lost-update": "丢失更新",
  "write-skew": "写偏差",
};

const GUARD_LABELS: Record<Guard, string> = {
  lock: "锁保护",
  retry: "冲突重试",
  none: "无额外保护",
};

function resultFor(isolation: Isolation, history: History, guard: Guard) {
  if (history === "safe") {
    return {
      ok: true,
      color: C.success,
      note: "两个事务操作不同对象，不会破坏总额或值域不变量。",
    };
  }
  if (history === "lost-update") {
    const ok = guard !== "none" || isolation === "serializable";
    return {
      ok,
      color: ok ? C.success : C.danger,
      note: ok
        ? "锁、版本检查或串行化阻止旧读覆盖新写。"
        : "两个事务读到同一旧值，后提交者覆盖了先提交者。",
    };
  }
  const ok = guard === "lock" || isolation === "serializable";
  return {
    ok,
    color: ok ? C.success : C.danger,
    note: ok
      ? "约束被锁或串行化观察保护，至少一个事务会等待或回滚。"
      : "两个事务各自看到约束成立，却分别更新不同对象，合并后约束失效。",
  };
}

export function Ddi07TransactionsLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `ddia-07-tx-arrow-${instanceId}`;
  const conflictArrowId = `ddia-07-conflict-arrow-${instanceId}`;
  const [isolation, setIsolation] = useState<Isolation>("snapshot");
  const [history, setHistory] = useState<History>("write-skew");
  const [guard, setGuard] = useState<Guard>("retry");

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex] ?? STEPS[0];
  const result = resultFor(isolation, history, guard);
  const conflict = history !== "safe";

  function reset() {
    setIsolation("snapshot");
    setHistory("write-skew");
    setGuard("retry");
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ddia-07-transactions"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DDIA · 第 7 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              先写不变量，再让并发历史接受或回滚
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换隔离级别、并发历史和保护方式；观察两个事务如何读、写、提交或重试，并检查业务不变量。
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择隔离级别">
            {(Object.entries(ISOLATION_LABELS) as [Isolation, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={isolation === value}
                  onClick={() => setIsolation(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    isolation === value
                      ? "border-accent text-accent"
                      : "border-border text-secondary hover:border-accent hover:text-primary"
                  }`}
                >
                  {label}
                </button>
              ),
            )}
          </div>
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-2">
          <div className="flex flex-wrap gap-2" aria-label="选择并发历史">
            <span className="self-center text-xs text-secondary">历史：</span>
            {(Object.entries(HISTORY_LABELS) as [History, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={history === value}
                  onClick={() => setHistory(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    history === value
                      ? value === "safe"
                        ? "border-accent text-accent"
                        : "border-danger text-danger"
                      : "border-border text-secondary hover:border-accent hover:text-primary"
                  }`}
                >
                  {label}
                </button>
              ),
            )}
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择并发保护">
            <span className="self-center text-xs text-secondary">保护：</span>
            {(Object.entries(GUARD_LABELS) as [Guard, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={guard === value}
                  onClick={() => setGuard(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    guard === value
                      ? "border-accent text-accent"
                      : "border-border text-secondary hover:border-accent hover:text-primary"
                  }`}
                >
                  {label}
                </button>
              ),
            )}
          </div>
        </div>

        <svg
          viewBox="0 0 900 700"
          role="img"
          aria-label={`事务实验图：当前隔离级别为${ISOLATION_LABELS[isolation]}，历史为${HISTORY_LABELS[history]}，保护为${GUARD_LABELS[guard]}，结果${result.ok ? "保持不变量" : "违反不变量"}。时间线展示开始、读取、交错、提交、回滚重试和验证六阶段；支持播放、暂停、单步、拖进度、隔离级别切换、历史切换、保护切换和重置。`}
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id={arrowId}
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id={conflictArrowId}
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="700" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            开始 → 读取 → 交错写 → 提交/冲突 → 回滚重试 → 不变量验证
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            隔离级别不是性能标签，而是允许哪些并发历史被观察和提交的契约
          </text>

          <rect
            x="28"
            y="80"
            width="844"
            height="92"
            rx="12"
            fill={C.elevated}
            stroke={result.ok ? C.success : C.danger}
            strokeWidth="1.5"
          />
          <text
            x="48"
            y="108"
            fontSize="12"
            fontWeight="700"
            fill={result.color}
          >
            当前实验：{ISOLATION_LABELS[isolation]} · {HISTORY_LABELS[history]}{" "}
            · {GUARD_LABELS[guard]}
          </text>
          <text x="48" y="136" fontSize="11" fill={C.secondary}>
            不变量：至少一名值班工程师保持
            on_call=true；同一账户余额不能被重复扣减。
          </text>
          <text x="48" y="157" fontSize="11" fill={result.color}>
            {result.note}
          </text>

          <g
            ref={(node) => {
              stageRefs.current[0] = node;
            }}
            opacity="0"
          >
            <rect
              x="28"
              y="202"
              width="160"
              height="108"
              rx="10"
              fill={C.accent}
              fillOpacity="0.1"
              stroke={C.accent}
            />
            <text x="48" y="232" fontSize="12" fontWeight="700" fill={C.accent}>
              T1 开始
            </text>
            <text x="48" y="258" fontSize="11" fill={C.secondary}>
              账户 A = 100
            </text>
            <text x="48" y="282" fontSize="11" fill={C.secondary}>
              读快照 / 获取锁
            </text>
          </g>
          <g
            ref={(node) => {
              stageRefs.current[1] = node;
            }}
            opacity="0"
          >
            <rect
              x="220"
              y="202"
              width="160"
              height="108"
              rx="10"
              fill={C.accent}
              fillOpacity="0.1"
              stroke={C.accent}
            />
            <text
              x="240"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={C.accent}
            >
              T2 开始
            </text>
            <text x="240" y="258" fontSize="11" fill={C.secondary}>
              同一快照或当前值
            </text>
            <text x="240" y="282" fontSize="11" fill={C.secondary}>
              检查共同条件
            </text>
          </g>
          <g
            ref={(node) => {
              stageRefs.current[2] = node;
            }}
            opacity="0"
          >
            <rect
              x="412"
              y="202"
              width="160"
              height="108"
              rx="10"
              fill={conflict ? C.warning : C.success}
              fillOpacity="0.1"
              stroke={conflict ? C.warning : C.success}
            />
            <text
              x="432"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={conflict ? C.warning : C.success}
            >
              交错写入
            </text>
            <text x="432" y="258" fontSize="11" fill={C.secondary}>
              {history === "lost-update"
                ? "两个写覆盖同一行"
                : history === "write-skew"
                  ? "分别更新不同行"
                  : "不同对象独立更新"}
            </text>
            <text x="432" y="282" fontSize="11" fill={C.secondary}>
              冲突边界开始出现
            </text>
          </g>
          <g
            ref={(node) => {
              stageRefs.current[3] = node;
            }}
            opacity="0"
          >
            <rect
              x="604"
              y="202"
              width="268"
              height="108"
              rx="10"
              fill={result.ok ? C.success : C.danger}
              fillOpacity="0.1"
              stroke={result.ok ? C.success : C.danger}
            />
            <text
              x="624"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={result.color}
            >
              提交决定
            </text>
            <text x="624" y="258" fontSize="11" fill={C.secondary}>
              {result.ok ? "保护让一个事务等待或回滚" : "两个事务都可能提交"}
            </text>
            <text x="624" y="282" fontSize="11" fill={result.color}>
              {result.ok ? "冲突可见且可重试" : "不变量可能失效"}
            </text>
          </g>

          <line
            x1="188"
            y1="256"
            x2="216"
            y2="256"
            stroke={C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${arrowId})`}
          />
          <line
            x1="380"
            y1="256"
            x2="408"
            y2="256"
            stroke={C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${arrowId})`}
          />
          <line
            x1="572"
            y1="256"
            x2="600"
            y2="256"
            stroke={conflict ? C.danger : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${conflict ? conflictArrowId : arrowId})`}
          />

          <rect
            x="28"
            y="342"
            width="844"
            height="150"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="48" y="372" fontSize="12" fontWeight="700" fill={C.primary}>
            并发历史的可见证据
          </text>
          <text x="48" y="402" fontSize="11" fill={C.secondary}>
            T1 读：{history === "lost-update" ? "balance=100" : "on_call=true"}
          </text>
          <text x="328" y="402" fontSize="11" fill={C.secondary}>
            T2 读：{history === "write-skew" ? "另一名仍值班" : "balance=100"}
          </text>
          <text x="620" y="402" fontSize="11" fill={C.secondary}>
            提交：{isolation === "serializable" ? "按序" : "交错"}
          </text>
          <rect
            x="48"
            y="426"
            width="220"
            height="38"
            rx="8"
            fill={C.accent}
            fillOpacity="0.1"
          />
          <rect
            x="290"
            y="426"
            width="220"
            height="38"
            rx="8"
            fill={conflict ? C.warning : C.success}
            fillOpacity="0.1"
          />
          <rect
            x="532"
            y="426"
            width="276"
            height="38"
            rx="8"
            fill={result.ok ? C.success : C.danger}
            fillOpacity="0.1"
          />
          <text
            x="158"
            y="450"
            textAnchor="middle"
            fontSize="11"
            fill={C.primary}
          >
            快照 / 锁 / 当前读
          </text>
          <text
            x="400"
            y="450"
            textAnchor="middle"
            fontSize="11"
            fill={C.primary}
          >
            冲突点与提交顺序
          </text>
          <text
            x="670"
            y="450"
            textAnchor="middle"
            fontSize="11"
            fill={result.color}
          >
            {result.ok ? "不变量保持" : "不变量违反"}
          </text>

          <g
            ref={(node) => {
              stageRefs.current[4] = node;
            }}
            opacity="0"
          >
            <rect
              x="28"
              y="526"
              width="410"
              height="112"
              rx="12"
              fill={result.ok ? C.success : C.danger}
              fillOpacity="0.08"
              stroke={result.ok ? C.success : C.danger}
            />
            <text
              x="48"
              y="558"
              fontSize="12"
              fontWeight="700"
              fill={result.color}
            >
              回滚与重试
            </text>
            <text x="48" y="586" fontSize="11" fill={C.secondary}>
              {guard === "lock"
                ? "等待锁释放后继续"
                : guard === "retry"
                  ? "回滚、重新读取、按幂等键重试"
                  : "没有额外冲突处理"}
            </text>
            <text x="48" y="610" fontSize="11" fill={result.color}>
              {result.ok
                ? "重试不会重复扣款或重复副作用"
                : "重试前必须先处理未知提交结果"}
            </text>
          </g>
          <g
            ref={(node) => {
              stageRefs.current[5] = node;
            }}
            opacity="0"
          >
            <rect
              x="462"
              y="526"
              width="410"
              height="112"
              rx="12"
              fill={C.success}
              fillOpacity="0.08"
              stroke={C.success}
            />
            <text
              x="482"
              y="558"
              fontSize="12"
              fontWeight="700"
              fill={C.success}
            >
              不变量验证
            </text>
            <text x="482" y="586" fontSize="11" fill={C.secondary}>
              重放提交与回滚历史，比较余额、值域、唯一性和至少一名值班者。
            </text>
            <text x="482" y="610" fontSize="11" fill={C.success}>
              通过条件：允许的并发历史可解释，异常历史被阻止或补偿。
            </text>
          </g>

          <text
            x="30"
            y="676"
            fontSize="11"
            fill={result.ok ? C.secondary : C.danger}
          >
            当前时间线：第 {activeIndex + 1} / {STEPS.length} 步 ·{" "}
            {activeStep?.caption ?? "选择阶段"}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测两个事务交错后的不变量，再只改变一个隔离或保护条件并重放。"
          reset={{
            label: "重置第 7 章实验",
            ariaLabel: "重置事务第 7 章实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        事务的价值在于把并发历史约束到可解释范围，并让失败、回滚和重试不破坏业务不变量。
      </figcaption>
    </figure>
  );
}
