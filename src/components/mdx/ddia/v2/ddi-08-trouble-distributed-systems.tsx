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

type Network = "bounded" | "delayed" | "partition";
type Clock = "monotonic" | "skewed";
type Action = "retry" | "fence" | "none";

const STEPS: readonly TeachingStep[] = [
  { label: "request", caption: "请求先绑定 request id 和 deadline" },
  { label: "network", caption: "消息穿过可能延迟、丢失或分区的网络" },
  { label: "timeout", caption: "超时只说明本地不知道，不说明远端未执行" },
  { label: "clock", caption: "持续时间看单调时钟，墙钟只作为带误差的线索" },
  { label: "pause", caption: "进程暂停后可能拿着过期租约继续运行" },
  { label: "recover", caption: "重试、隔离令牌与对账一起收束未知结果" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const NETWORK_LABELS: Record<Network, string> = {
  bounded: "低延迟",
  delayed: "尾延迟",
  partition: "网络分区",
};

const CLOCK_LABELS: Record<Clock, string> = {
  monotonic: "单调时钟",
  skewed: "墙钟有偏差",
};

const ACTION_LABELS: Record<Action, string> = {
  retry: "幂等重试",
  fence: "隔离令牌",
  none: "直接继续",
};

function resultFor(network: Network, clock: Clock, action: Action) {
  if (action === "fence") {
    return {
      ok: true,
      color: C.success,
      title: "旧参与者被隔离",
      note: "新令牌在资源端被检查；恢复后的旧进程即使醒来，也不能继续写入。",
    };
  }
  if (network === "partition") {
    return {
      ok: false,
      color: C.danger,
      title: "结果仍然未知",
      note: "分区让沉默同时兼容未执行、已执行和正在执行；单方超时不能宣布全局事实。",
    };
  }
  if (clock === "skewed" || action === "none") {
    return {
      ok: false,
      color: C.warning,
      title: "需要外部核对",
      note: "墙钟偏差或直接继续都会把诊断线索误当提交证明；先查 request id 再决定补偿。",
    };
  }
  return {
    ok: true,
    color: C.success,
    title: "可安全收束",
    note: "重试使用同一幂等键，完成后用权威状态和业务对账确认唯一结果。",
  };
}

export function Ddi08TroubleDistributedSystemsLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `ddia-08-network-arrow-${instanceId}`;
  const warningArrowId = `ddia-08-warning-arrow-${instanceId}`;
  const [network, setNetwork] = useState<Network>("delayed");
  const [clock, setClock] = useState<Clock>("monotonic");
  const [action, setAction] = useState<Action>("fence");

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
  const result = resultFor(network, clock, action);
  const uncertain = network !== "bounded" || action !== "fence";

  function reset() {
    setNetwork("delayed");
    setClock("monotonic");
    setAction("fence");
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ddia-08-trouble-distributed-systems"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DDIA · 第 8 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              把“我不知道”变成可恢复的协议状态
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换网络、时钟与恢复动作；沿时间线观察一次超时如何进入未知状态，再用重试、隔离和对账收束它。
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择网络模型">
            {(Object.entries(NETWORK_LABELS) as [Network, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={network === value}
                  onClick={() => setNetwork(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    network === value
                      ? value === "partition"
                        ? "border-danger text-danger"
                        : "border-accent text-accent"
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
          <div className="flex flex-wrap gap-2" aria-label="选择时钟模型">
            <span className="self-center text-xs text-secondary">时钟：</span>
            {(Object.entries(CLOCK_LABELS) as [Clock, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={clock === value}
                  onClick={() => setClock(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    clock === value
                      ? "border-accent text-accent"
                      : "border-border text-secondary hover:border-accent hover:text-primary"
                  }`}
                >
                  {label}
                </button>
              ),
            )}
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择恢复动作">
            <span className="self-center text-xs text-secondary">恢复：</span>
            {(Object.entries(ACTION_LABELS) as [Action, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={action === value}
                  onClick={() => setAction(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    action === value
                      ? value === "none"
                        ? "border-danger text-danger"
                        : "border-accent text-accent"
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
          aria-label={`分布式系统实验图：网络为${NETWORK_LABELS[network]}，时钟为${CLOCK_LABELS[clock]}，恢复动作是${ACTION_LABELS[action]}，当前结论为${result.title}。时间线展示请求、网络、超时、时钟、进程暂停和恢复六阶段；支持播放、暂停、单步、拖进度、三个条件切换和重置。`}
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
              id={warningArrowId}
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
            请求 → 网络 → 超时 → 时钟线索 → 进程暂停 → 隔离与对账
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            一个沉默的响应可能对应三种历史；协议要限制错误推断的后果
          </text>

          <rect
            x="28"
            y="80"
            width="844"
            height="88"
            rx="12"
            fill={C.elevated}
            stroke={result.color}
            strokeWidth="1.5"
          />
          <text
            x="48"
            y="108"
            fontSize="12"
            fontWeight="700"
            fill={result.color}
          >
            当前结论：{result.title} · {NETWORK_LABELS[network]} ·{" "}
            {CLOCK_LABELS[clock]} · {ACTION_LABELS[action]}
          </text>
          <text x="48" y="136" fontSize="11" fill={C.secondary}>
            {result.note}
          </text>
          <text
            x="48"
            y="156"
            fontSize="11"
            fill={uncertain ? C.warning : C.success}
          >
            业务读者看到的状态：
            {uncertain
              ? "需要查询或仲裁，不能直接重复副作用"
              : "可按幂等键完成唯一收束"}
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
              width="170"
              height="112"
              rx="10"
              fill={C.accent}
              fillOpacity="0.1"
              stroke={C.accent}
            />
            <text x="48" y="232" fontSize="12" fontWeight="700" fill={C.accent}>
              客户端请求
            </text>
            <text x="48" y="260" fontSize="11" fill={C.secondary}>
              request id = R-204
            </text>
            <text x="48" y="284" fontSize="11" fill={C.secondary}>
              deadline 与副作用键
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[1] = node;
            }}
            opacity="0"
          >
            <rect
              x="226"
              y="202"
              width="190"
              height="112"
              rx="10"
              fill={network === "partition" ? C.danger : C.accent}
              fillOpacity="0.1"
              stroke={network === "partition" ? C.danger : C.accent}
            />
            <text
              x="246"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={network === "partition" ? C.danger : C.accent}
            >
              网络边界
            </text>
            <text x="246" y="260" fontSize="11" fill={C.secondary}>
              {network === "bounded"
                ? "消息按预期抵达"
                : network === "delayed"
                  ? "排队、延迟或重复"
                  : "一侧看不到另一侧"}
            </text>
            <text x="246" y="284" fontSize="11" fill={C.secondary}>
              沉默不是失败证明
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[2] = node;
            }}
            opacity="0"
          >
            <rect
              x="444"
              y="202"
              width="190"
              height="112"
              rx="10"
              fill={network === "bounded" ? C.success : C.warning}
              fillOpacity="0.1"
              stroke={network === "bounded" ? C.success : C.warning}
            />
            <text
              x="464"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={network === "bounded" ? C.success : C.warning}
            >
              本地超时
            </text>
            <text x="464" y="260" fontSize="11" fill={C.secondary}>
              {network === "bounded"
                ? "更可能按时收到响应"
                : "未收到响应，结果未知"}
            </text>
            <text x="464" y="284" fontSize="11" fill={C.warning}>
              不宣布远端未执行
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[3] = node;
            }}
            opacity="0"
          >
            <rect
              x="662"
              y="202"
              width="210"
              height="112"
              rx="10"
              fill={clock === "skewed" ? C.warning : C.accent}
              fillOpacity="0.1"
              stroke={clock === "skewed" ? C.warning : C.accent}
            />
            <text
              x="682"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={clock === "skewed" ? C.warning : C.accent}
            >
              计时依据
            </text>
            <text x="682" y="260" fontSize="11" fill={C.secondary}>
              {clock === "monotonic"
                ? "持续时间：单调时钟"
                : "事件顺序：墙钟可能倒退"}
            </text>
            <text x="682" y="284" fontSize="11" fill={C.secondary}>
              时间戳必须带误差范围
            </text>
          </g>

          <line
            x1="198"
            y1="258"
            x2="222"
            y2="258"
            stroke={C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${arrowId})`}
          />
          <line
            x1="416"
            y1="258"
            x2="440"
            y2="258"
            stroke={network === "partition" ? C.danger : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${network === "partition" ? warningArrowId : arrowId})`}
          />
          <line
            x1="634"
            y1="258"
            x2="658"
            y2="258"
            stroke={C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${arrowId})`}
          />

          <g
            ref={(node) => {
              stageRefs.current[4] = node;
            }}
            opacity="0"
          >
            <rect
              x="28"
              y="350"
              width="404"
              height="112"
              rx="12"
              fill={C.warning}
              fillOpacity="0.08"
              stroke={C.warning}
            />
            <text
              x="48"
              y="380"
              fontSize="12"
              fontWeight="700"
              fill={C.warning}
            >
              进程暂停与租约
            </text>
            <text x="48" y="408" fontSize="11" fill={C.secondary}>
              GC、抢占或休眠让旧进程错过租约，却不一定知道自己已经过期。
            </text>
            <text x="48" y="436" fontSize="11" fill={C.warning}>
              旧主醒来后继续写资源，是隔离边界被绕过的信号。
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[5] = node;
            }}
            opacity="0"
          >
            <rect
              x="460"
              y="350"
              width="412"
              height="112"
              rx="12"
              fill={result.color}
              fillOpacity="0.08"
              stroke={result.color}
            />
            <text
              x="480"
              y="380"
              fontSize="12"
              fontWeight="700"
              fill={result.color}
            >
              恢复与收束
            </text>
            <text x="480" y="408" fontSize="11" fill={C.secondary}>
              {action === "fence"
                ? "资源端检查递增令牌，过期持有者写入失败。"
                : action === "retry"
                  ? "先查 R-204，再用幂等键重试未知请求。"
                  : "没有隔离或查询，恢复动作仍可能重复副作用。"}
            </text>
            <text x="480" y="436" fontSize="11" fill={result.color}>
              {result.ok
                ? "可证明：旧参与者不能破坏资源"
                : "待核对：未知结果不能凭沉默收束"}
            </text>
          </g>

          <rect
            x="28"
            y="500"
            width="844"
            height="136"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="48" y="530" fontSize="12" fontWeight="700" fill={C.primary}>
            外部证据表：把不确定性留在协议内
          </text>
          <text x="48" y="558" fontSize="11" fill={C.secondary}>
            请求：R-204 · 权威状态：版本 18 · 本地耗时：单调时钟测量
          </text>
          <text x="48" y="584" fontSize="11" fill={C.secondary}>
            网络：{NETWORK_LABELS[network]} · 时钟：{CLOCK_LABELS[clock]} ·
            令牌：{action === "fence" ? "新令牌已检查" : "未检查"}
          </text>
          <rect
            x="48"
            y="600"
            width="804"
            height="22"
            rx="7"
            fill={result.color}
            fillOpacity="0.12"
          />
          <text
            x="450"
            y="616"
            textAnchor="middle"
            fontSize="11"
            fill={result.color}
          >
            {result.ok
              ? "通过条件：幂等、令牌和权威对账共同证明唯一结果"
              : "通过条件：查询提交状态或取得仲裁，不把超时当成未执行"}
          </text>

          <text x="30" y="676" fontSize="11" fill={result.color}>
            当前时间线：第 {activeIndex + 1} / {STEPS.length} 步 ·{" "}
            {activeStep?.caption ?? "选择阶段"}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测超时后的三种可能历史，再只改变一个网络、时钟或恢复条件并重放。"
          reset={{
            label: "重置第 8 章实验",
            ariaLabel: "重置分布式系统的麻烦第 8 章实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        网络、时钟和进程都可能只给出局部线索；可靠性来自可验证的边界、隔离和恢复协议。
      </figcaption>
    </figure>
  );
}
