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

type Strategy = "leader" | "multi" | "quorum";
type Fault = "healthy" | "leader-down" | "lagging";
type Guarantee = "eventual" | "session" | "monotonic";

const STEPS: readonly TeachingStep[] = [
  { label: "write", caption: "先把一次写入和权威顺序固定下来" },
  { label: "replicate", caption: "复制日志把更新传播到其他副本" },
  { label: "read", caption: "读请求选择副本并暴露可见性保证" },
  { label: "lag", caption: "延迟、断链或分区让副本暂时落后" },
  { label: "failover", caption: "故障切换要确认未传播写入和新领导者" },
  { label: "reconcile", caption: "用版本与业务对账检查冲突是否可解释" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STRATEGY_LABELS: Record<Strategy, string> = {
  leader: "单主复制",
  multi: "多主复制",
  quorum: "无主复制",
};

const FAULT_LABELS: Record<Fault, string> = {
  healthy: "正常传播",
  "leader-down": "领导者宕机",
  lagging: "追随者滞后",
};

const GUARANTEE_LABELS: Record<Guarantee, string> = {
  eventual: "最终一致",
  session: "读己之写",
  monotonic: "单调读",
};

function strategyNote(strategy: Strategy, fault: Fault) {
  if (strategy === "leader") {
    return fault === "leader-down"
      ? "切换前要判断最后确认的日志位置，避免旧主复活后产生双主。"
      : "一个写入口给更新排序，追随者异步或同步应用复制日志。";
  }
  if (strategy === "multi") {
    return "多个写入口需要冲突规则、拓扑和版本信息，局部成功不等于全局收敛。";
  }
  return "读写由多个副本承担，法定人数只约束一次操作观察到的副本集合。";
}

export function Ddi05ReplicationLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const forwardArrowId = `ddia-05-forward-arrow-${instanceId}`;
  const faultArrowId = `ddia-05-fault-arrow-${instanceId}`;
  const [strategy, setStrategy] = useState<Strategy>("leader");
  const [fault, setFault] = useState<Fault>("healthy");
  const [guarantee, setGuarantee] = useState<Guarantee>("session");

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
  const isFault = fault !== "healthy";
  const strategyColor =
    strategy === "leader"
      ? C.accent
      : strategy === "multi"
        ? C.warning
        : C.success;
  const guaranteeNote =
    guarantee === "eventual"
      ? "不同副本最终收敛，但一次读取可能暂时看到旧值。"
      : guarantee === "session"
        ? "同一会话的读取路由到足够新的副本，避免刚写就读不到。"
        : "同一读者不会从新版本退回旧版本，需要记录已见位置。";

  function reset() {
    setStrategy("leader");
    setFault("healthy");
    setGuarantee("session");
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ddia-05-replication"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DDIA · 第 5 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              复制是传播、读取保证和故障恢复的联合实验
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换复制策略、故障条件和读取保证；观察一次写入如何传播，以及副本滞后怎样改变用户看到的结果。
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择复制策略">
            {(Object.entries(STRATEGY_LABELS) as [Strategy, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={strategy === value}
                  onClick={() => setStrategy(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    strategy === value
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
          <div className="flex flex-wrap gap-2" aria-label="注入复制故障">
            <span className="self-center text-xs text-secondary">条件：</span>
            {(Object.entries(FAULT_LABELS) as [Fault, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={fault === value}
                  onClick={() => setFault(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    fault === value
                      ? value === "healthy"
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
          <div className="flex flex-wrap gap-2" aria-label="选择读取保证">
            <span className="self-center text-xs text-secondary">读取：</span>
            {(Object.entries(GUARANTEE_LABELS) as [Guarantee, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={guarantee === value}
                  onClick={() => setGuarantee(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    guarantee === value
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
          aria-label={`复制实验图：当前策略为${STRATEGY_LABELS[strategy]}，条件为${FAULT_LABELS[fault]}，读取保证为${GUARANTEE_LABELS[guarantee]}。时间线展示写入、传播、读取、滞后、故障切换和对账六阶段；支持播放、暂停、单步、拖进度、策略切换、故障注入、读取保证切换和重置。`}
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id={forwardArrowId}
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id={faultArrowId}
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
            写入 → 复制日志 → 副本 → 读取保证 → 故障切换 → 对账
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            一次确认只说明某个副本集合看见了写入，不自动说明所有读者都看见
          </text>

          <rect
            x="28"
            y="80"
            width="844"
            height="92"
            rx="12"
            fill={C.elevated}
            stroke={isFault ? C.danger : strategyColor}
            strokeWidth="1.5"
          />
          <text
            x="48"
            y="108"
            fontSize="12"
            fontWeight="700"
            fill={isFault ? C.danger : strategyColor}
          >
            当前实验：{STRATEGY_LABELS[strategy]} · {FAULT_LABELS[fault]} ·{" "}
            {GUARANTEE_LABELS[guarantee]}
          </text>
          <text x="48" y="136" fontSize="11" fill={C.secondary}>
            {strategyNote(strategy, fault)}
          </text>
          <text
            x="48"
            y="157"
            fontSize="11"
            fill={isFault ? C.danger : C.secondary}
          >
            {isFault
              ? fault === "leader-down"
                ? "故障证据：未确认的日志位置、租约或纪元必须先交接。"
                : "滞后证据：副本位置落后，读取保证需要选择或等待。"
              : guaranteeNote}
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
              客户端写入
            </text>
            <text x="48" y="258" fontSize="11" fill={C.secondary}>
              key = cart-7
            </text>
            <text x="48" y="282" fontSize="11" fill={C.secondary}>
              版本 v42 · ack 边界
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
              fill={strategyColor}
              fillOpacity="0.1"
              stroke={strategyColor}
            />
            <text
              x="240"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={strategyColor}
            >
              复制日志
            </text>
            <text x="240" y="258" fontSize="11" fill={C.secondary}>
              {strategy === "leader"
                ? "单一顺序"
                : strategy === "multi"
                  ? "多个本地顺序"
                  : "版本集合"}
            </text>
            <text x="240" y="282" fontSize="11" fill={C.secondary}>
              传播 / 重试 / 去重
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
              fill={C.success}
              fillOpacity="0.1"
              stroke={C.success}
            />
            <text
              x="432"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={C.success}
            >
              副本读取
            </text>
            <text x="432" y="258" fontSize="11" fill={C.secondary}>
              R1 · R2 · R3
            </text>
            <text x="432" y="282" fontSize="11" fill={C.secondary}>
              {GUARANTEE_LABELS[guarantee]}
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
              fill={isFault ? C.danger : C.warning}
              fillOpacity="0.1"
              stroke={isFault ? C.danger : C.warning}
            />
            <text
              x="624"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={isFault ? C.danger : C.warning}
            >
              副本状态
            </text>
            <text x="624" y="258" fontSize="11" fill={C.secondary}>
              {fault === "lagging"
                ? "R2 落后 3 个日志位置"
                : fault === "leader-down"
                  ? "旧主不可确认最新位置"
                  : "R1、R2、R3 可继续传播"}
            </text>
            <text
              x="624"
              y="282"
              fontSize="11"
              fill={isFault ? C.danger : C.secondary}
            >
              {isFault ? "读写语义需要显式边界" : "延迟也必须被观测"}
            </text>
          </g>

          <line
            x1="188"
            y1="256"
            x2="216"
            y2="256"
            stroke={C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${forwardArrowId})`}
          />
          <line
            x1="380"
            y1="256"
            x2="408"
            y2="256"
            stroke={C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${forwardArrowId})`}
          />
          <line
            x1="572"
            y1="256"
            x2="600"
            y2="256"
            stroke={isFault ? C.danger : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${isFault ? faultArrowId : forwardArrowId})`}
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
            读取保证的可见证据
          </text>
          <text x="48" y="402" fontSize="11" fill={C.secondary}>
            已见位置：v42
          </text>
          <text x="270" y="402" fontSize="11" fill={C.secondary}>
            当前副本：{isFault ? "可能落后" : "可追上"}
          </text>
          <text x="512" y="402" fontSize="11" fill={C.secondary}>
            读结果：{guarantee === "eventual" ? "旧或新" : "不退回"}
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
            fill={isFault ? C.danger : C.warning}
            fillOpacity="0.1"
          />
          <rect
            x="532"
            y="426"
            width="276"
            height="38"
            rx="8"
            fill={guarantee === "eventual" ? C.warning : C.success}
            fillOpacity="0.1"
          />
          <text
            x="158"
            y="450"
            textAnchor="middle"
            fontSize="11"
            fill={C.primary}
          >
            日志位置 / session token
          </text>
          <text
            x="400"
            y="450"
            textAnchor="middle"
            fontSize="11"
            fill={C.primary}
          >
            {isFault ? "等待 / 路由 / 降级" : "传播延迟"}
          </text>
          <text
            x="670"
            y="450"
            textAnchor="middle"
            fontSize="11"
            fill={C.primary}
          >
            {guaranteeNote}
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
              fill={isFault ? C.danger : C.warning}
              fillOpacity="0.08"
              stroke={isFault ? C.danger : C.warning}
            />
            <text
              x="48"
              y="558"
              fontSize="12"
              fontWeight="700"
              fill={isFault ? C.danger : C.warning}
            >
              故障切换
            </text>
            <text x="48" y="586" fontSize="11" fill={C.secondary}>
              停止旧主、确认纪元与日志位置，再决定新主能否接受写入。
            </text>
            <text x="48" y="610" fontSize="11" fill={C.secondary}>
              切换不是魔法：未传播写入、冲突和重复重试都要留证。
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
              版本与业务对账
            </text>
            <text x="482" y="586" fontSize="11" fill={C.secondary}>
              比较版本向量、日志位置、读结果和业务不变量，识别并发写而非掩盖冲突。
            </text>
            <text x="482" y="610" fontSize="11" fill={C.success}>
              通过条件：滞后可解释，冲突有规则，读取保证能被复现。
            </text>
          </g>

          <text
            x="30"
            y="676"
            fontSize="11"
            fill={isFault ? C.danger : C.secondary}
          >
            当前时间线：第 {activeIndex + 1} / {STEPS.length} 步 ·{" "}
            {activeStep?.caption ?? "选择阶段"}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测读者会看到哪个版本，再只改变一个复制条件并保存日志位置与对账结果。"
          reset={{
            label: "重置第 5 章实验",
            ariaLabel: "重置复制第 5 章实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        复制不是让所有副本瞬间相同，而是让传播、读取保证、冲突与故障恢复都能被解释和验证。
      </figcaption>
    </figure>
  );
}
