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

type Runtime = "browser" | "node" | "worker";
type Workload = "io" | "cpu";
type Fault = "none" | "slow" | "crash";
type Evidence = "trace" | "metrics" | "replay";

const STEPS: readonly TeachingStep[] = [
  { label: "identity", caption: "固定 Node 版本与 JavaScript 运行边界" },
  { label: "module", caption: "从模块和输入建立资源所有权" },
  { label: "schedule", caption: "沿事件循环解释完成通知与错误" },
  { label: "workload", caption: "区分 I/O 等待与 CPU 阻塞" },
  { label: "fault", caption: "只注入一个边界故障并记录首个偏离" },
  { label: "close", caption: "用重放、退出码和资源计数确认关闭" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const RUNTIME_LABELS: Record<Runtime, string> = {
  browser: "浏览器 JavaScript",
  node: "Node 进程",
  worker: "Worker 边界",
};

const WORKLOAD_LABELS: Record<Workload, string> = {
  io: "I/O 密集",
  cpu: "CPU 密集",
};

const FAULT_LABELS: Record<Fault, string> = {
  none: "基线",
  slow: "慢消费者",
  crash: "进程崩溃",
};

const EVIDENCE_LABELS: Record<Evidence, string> = {
  trace: "请求轨迹",
  metrics: "尾延迟与资源",
  replay: "恢复后重放",
};

function resultFor(
  runtime: Runtime,
  workload: Workload,
  fault: Fault,
  evidence: Evidence,
) {
  if (runtime === "browser" && workload === "io") {
    return {
      ok: false,
      color: C.warning,
      title: "运行边界尚未交代",
      note: "浏览器 API、Node 系统能力和服务端资源的所有权不同；先说明模块、套接字、文件和关闭责任，再比较吞吐。",
    };
  }
  if (workload === "cpu" && runtime === "node") {
    return {
      ok: false,
      color: C.warning,
      title: "CPU 工作堵住了事件循环",
      note: "单线程 JavaScript 执行与运行时内部线程不能混为一谈；需要拆分计算、限制批次或交给 Worker，并记录尾延迟。",
    };
  }
  if (fault === "slow" && evidence !== "trace") {
    return {
      ok: false,
      color: C.danger,
      title: "慢消费者缺少背压证据",
      note: "平均响应成功不能证明队列、Buffer 和套接字已排空；需要原始分块轨迹、队列长度和关闭事件。",
    };
  }
  if (fault === "crash" && evidence !== "replay") {
    return {
      ok: false,
      color: C.danger,
      title: "崩溃后的提交状态未知",
      note: "退出码只能说明进程结束，不能说明请求是否已提交；必须固定输入重放，并对账资源、日志和业务结果。",
    };
  }
  return {
    ok: true,
    color: C.success,
    title: "运行边界可解释",
    note: "运行时、工作负载、异步顺序、故障边界和关闭证据都绑定到同一个请求 id，可交接给下一位工程师。",
  };
}

export function DnjNodeIntroductionLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `dnj-intro-arrow-${instanceId}`;
  const warningArrowId = `dnj-intro-warning-${instanceId}`;
  const [runtime, setRuntime] = useState<Runtime>("node");
  const [workload, setWorkload] = useState<Workload>("io");
  const [fault, setFault] = useState<Fault>("none");
  const [evidence, setEvidence] = useState<Evidence>("trace");

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
  const result = resultFor(runtime, workload, fault, evidence);

  function reset() {
    setRuntime("node");
    setWorkload("io");
    setFault("none");
    setEvidence("trace");
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="deep-nodejs-node-introduction"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Node.js · 第 1 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              从“单线程”标签走到可验证的运行边界
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择运行时、工作负载、故障与证据方式；沿六阶段时间线观察 Node
              如何把 JavaScript、系统 I/O 和资源关闭连接起来。
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择运行时边界">
            {(Object.entries(RUNTIME_LABELS) as [Runtime, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={runtime === value}
                  onClick={() => setRuntime(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    runtime === value
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

        <div className="mb-4 grid gap-3 md:grid-cols-3">
          <div className="flex flex-wrap gap-2" aria-label="选择工作负载">
            <span className="self-center text-xs text-secondary">负载：</span>
            {(Object.entries(WORKLOAD_LABELS) as [Workload, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={workload === value}
                  onClick={() => setWorkload(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    workload === value
                      ? value === "cpu"
                        ? "border-warning text-warning"
                        : "border-accent text-accent"
                      : "border-border text-secondary hover:border-accent hover:text-primary"
                  }`}
                >
                  {label}
                </button>
              ),
            )}
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择故障条件">
            <span className="self-center text-xs text-secondary">故障：</span>
            {(Object.entries(FAULT_LABELS) as [Fault, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={fault === value}
                  onClick={() => setFault(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    fault === value
                      ? value === "none"
                        ? "border-accent text-accent"
                        : "border-warning text-warning"
                      : "border-border text-secondary hover:border-accent hover:text-primary"
                  }`}
                >
                  {label}
                </button>
              ),
            )}
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择证据方式">
            <span className="self-center text-xs text-secondary">证据：</span>
            {(Object.entries(EVIDENCE_LABELS) as [Evidence, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={evidence === value}
                  onClick={() => setEvidence(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    evidence === value
                      ? value === "metrics"
                        ? "border-warning text-warning"
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
          viewBox="0 0 900 680"
          role="img"
          aria-label={`Node 第 1 章实验：运行时为${RUNTIME_LABELS[runtime]}，负载为${WORKLOAD_LABELS[workload]}，故障为${FAULT_LABELS[fault]}，证据为${EVIDENCE_LABELS[evidence]}，当前结论为${result.title}。时间线展示身份、模块、调度、负载、故障和关闭六阶段；支持播放、暂停、单步、拖进度、四组条件切换和重置。`}
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
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="680" rx="14" fill={C.bg} />
          <text x="28" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            身份 → 模块 → 调度 → 负载 → 故障 → 关闭
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            Node 的优势与约束必须同时落到输入、资源和用户可见结果
          </text>

          <rect
            x="28"
            y="78"
            width="844"
            height="84"
            rx="12"
            fill={result.color}
            fillOpacity="0.08"
            stroke={result.color}
            strokeWidth="1.5"
          />
          <text
            x="48"
            y="106"
            fontSize="12"
            fontWeight="700"
            fill={result.color}
          >
            当前结论：{result.title} · {RUNTIME_LABELS[runtime]} ·{" "}
            {WORKLOAD_LABELS[workload]} · {FAULT_LABELS[fault]}
          </text>
          <text x="48" y="134" fontSize="11" fill={C.secondary}>
            {result.note}
          </text>
          <text x="48" y="152" fontSize="11" fill={result.color}>
            验收条件：版本、所有者、完成出口、首个偏离和关闭证据均可追踪
          </text>

          <g
            ref={(node) => {
              stageRefs.current[0] = node;
            }}
            opacity="0"
          >
            <rect
              x="28"
              y="194"
              width="128"
              height="112"
              rx="10"
              fill={C.accent}
              fillOpacity="0.1"
              stroke={C.accent}
            />
            <text x="44" y="224" fontSize="12" fontWeight="700" fill={C.accent}>
              身份
            </text>
            <text x="44" y="252" fontSize="11" fill={C.secondary}>
              2013 版 · current Node
            </text>
            <text x="44" y="276" fontSize="11" fill={C.secondary}>
              版本账本
            </text>
          </g>
          <g
            ref={(node) => {
              stageRefs.current[1] = node;
            }}
            opacity="0"
          >
            <rect
              x="170"
              y="194"
              width="128"
              height="112"
              rx="10"
              fill={C.accent}
              fillOpacity="0.1"
              stroke={C.accent}
            />
            <text
              x="186"
              y="224"
              fontSize="12"
              fontWeight="700"
              fill={C.accent}
            >
              模块
            </text>
            <text x="186" y="252" fontSize="11" fill={C.secondary}>
              resolve · cache · export
            </text>
            <text x="186" y="276" fontSize="11" fill={C.secondary}>
              输入所有权
            </text>
          </g>
          <g
            ref={(node) => {
              stageRefs.current[2] = node;
            }}
            opacity="0"
          >
            <rect
              x="312"
              y="194"
              width="128"
              height="112"
              rx="10"
              fill={C.accent}
              fillOpacity="0.1"
              stroke={C.accent}
            />
            <text
              x="328"
              y="224"
              fontSize="12"
              fontWeight="700"
              fill={C.accent}
            >
              调度
            </text>
            <text x="328" y="252" fontSize="11" fill={C.secondary}>
              event loop · callback
            </text>
            <text x="328" y="276" fontSize="11" fill={C.secondary}>
              错误只传播一次
            </text>
          </g>
          <g
            ref={(node) => {
              stageRefs.current[3] = node;
            }}
            opacity="0"
          >
            <rect
              x="454"
              y="194"
              width="128"
              height="112"
              rx="10"
              fill={workload === "cpu" ? C.warning : C.success}
              fillOpacity="0.1"
              stroke={workload === "cpu" ? C.warning : C.success}
            />
            <text
              x="470"
              y="224"
              fontSize="12"
              fontWeight="700"
              fill={workload === "cpu" ? C.warning : C.success}
            >
              负载
            </text>
            <text x="470" y="252" fontSize="11" fill={C.secondary}>
              {WORKLOAD_LABELS[workload]}
            </text>
            <text x="470" y="276" fontSize="11" fill={C.secondary}>
              尾延迟 · 队列
            </text>
          </g>
          <g
            ref={(node) => {
              stageRefs.current[4] = node;
            }}
            opacity="0"
          >
            <rect
              x="596"
              y="194"
              width="128"
              height="112"
              rx="10"
              fill={fault === "none" ? C.accent : C.warning}
              fillOpacity="0.1"
              stroke={fault === "none" ? C.accent : C.warning}
            />
            <text
              x="612"
              y="224"
              fontSize="12"
              fontWeight="700"
              fill={fault === "none" ? C.accent : C.warning}
            >
              故障
            </text>
            <text x="612" y="252" fontSize="11" fill={C.secondary}>
              {FAULT_LABELS[fault]}
            </text>
            <text x="612" y="276" fontSize="11" fill={C.secondary}>
              首个偏离
            </text>
          </g>
          <g
            ref={(node) => {
              stageRefs.current[5] = node;
            }}
            opacity="0"
          >
            <rect
              x="738"
              y="194"
              width="134"
              height="112"
              rx="10"
              fill={result.ok ? C.success : C.warning}
              fillOpacity="0.1"
              stroke={result.ok ? C.success : C.warning}
            />
            <text
              x="754"
              y="224"
              fontSize="12"
              fontWeight="700"
              fill={result.ok ? C.success : C.warning}
            >
              关闭
            </text>
            <text x="754" y="252" fontSize="11" fill={C.secondary}>
              replay · exit code
            </text>
            <text x="754" y="276" fontSize="11" fill={C.secondary}>
              资源已排空
            </text>
          </g>

          <line
            x1="156"
            y1="250"
            x2="166"
            y2="250"
            stroke={C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${arrowId})`}
          />
          <line
            x1="298"
            y1="250"
            x2="308"
            y2="250"
            stroke={C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${arrowId})`}
          />
          <line
            x1="440"
            y1="250"
            x2="450"
            y2="250"
            stroke={workload === "cpu" ? C.warning : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${workload === "cpu" ? warningArrowId : arrowId})`}
          />
          <line
            x1="582"
            y1="250"
            x2="592"
            y2="250"
            stroke={fault === "none" ? C.border : C.warning}
            strokeWidth="1.5"
            markerEnd={`url(#${fault === "none" ? arrowId : warningArrowId})`}
          />
          <line
            x1="724"
            y1="250"
            x2="734"
            y2="250"
            stroke={result.ok ? C.border : C.warning}
            strokeWidth="1.5"
            markerEnd={`url(#${result.ok ? arrowId : warningArrowId})`}
          />

          <rect
            x="28"
            y="340"
            width="404"
            height="116"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="48" y="370" fontSize="12" fontWeight="700" fill={C.primary}>
            第 1 章的四个判断
          </text>
          <text x="48" y="398" fontSize="11" fill={C.secondary}>
            JavaScript 运行在哪里 · I/O 与 CPU 谁占用哪条路径
          </text>
          <text x="48" y="422" fontSize="11" fill={C.secondary}>
            谁拥有资源 · 哪个事件证明完成 · 退出前要等什么
          </text>

          <rect
            x="460"
            y="340"
            width="412"
            height="116"
            rx="12"
            fill={result.color}
            fillOpacity="0.08"
            stroke={result.color}
          />
          <text
            x="480"
            y="370"
            fontSize="12"
            fontWeight="700"
            fill={result.color}
          >
            当前证据门
          </text>
          <text x="480" y="398" fontSize="11" fill={C.secondary}>
            证据：{EVIDENCE_LABELS[evidence]} · fault：{FAULT_LABELS[fault]}
          </text>
          <text x="480" y="422" fontSize="11" fill={result.color}>
            {result.ok
              ? "可交接：路径、边界、恢复和责任都写明。"
              : "不可交接：先暂停并补齐首个偏离或重放证据。"}
          </text>

          <rect
            x="28"
            y="488"
            width="844"
            height="124"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="48" y="518" fontSize="12" fontWeight="700" fill={C.primary}>
            外部证据：请求、资源、调度、故障和关闭必须互相对上
          </text>
          <text x="48" y="546" fontSize="11" fill={C.secondary}>
            request：node-intro-1042 · runtime：{RUNTIME_LABELS[runtime]} ·
            workload：{WORKLOAD_LABELS[workload]}
          </text>
          <text x="48" y="570" fontSize="11" fill={C.secondary}>
            fault：{FAULT_LABELS[fault]} · evidence：{EVIDENCE_LABELS[evidence]}{" "}
            · close：socket-drained
          </text>
          <rect
            x="48"
            y="586"
            width="804"
            height="12"
            rx="6"
            fill={result.color}
            fillOpacity="0.16"
          />

          <text x="28" y="646" fontSize="11" fill={result.color}>
            当前时间线：第 {activeIndex + 1} / {STEPS.length} 步 ·{" "}
            {activeStep?.caption ?? "选择阶段"}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测同步栈、异步资源和关闭条件，再只改变一个工作负载或故障边界。"
          reset={{
            label: "重置 Node 第 1 章实验",
            ariaLabel: "重置 Node 简介实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        “单线程”不是结论，而是需要和
        I/O、CPU、资源所有权、故障与关闭证据一起验证的运行假设。
      </figcaption>
    </figure>
  );
}
