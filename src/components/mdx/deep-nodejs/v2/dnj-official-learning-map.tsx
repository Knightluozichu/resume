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

type Path = "runtime" | "async" | "bytes" | "web" | "process" | "release";
type Fault = "none" | "backpressure" | "duplicate" | "crash";
type Evidence = "trace" | "metrics" | "replay";

const STEPS: readonly TeachingStep[] = [
  { label: "identity", caption: "固定 2013 版身份与现代运行时边界" },
  { label: "module", caption: "沿模块解析与缓存确定数据所有权" },
  { label: "async", caption: "用事件循环和完成通知解释异步顺序" },
  { label: "bytes", caption: "在 Buffer、流和背压处守住字节边界" },
  { label: "boundary", caption: "把网络、进程和 Web 边界变成可注入故障" },
  { label: "release", caption: "用测试、日志和关闭证据交付可恢复服务" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const PATH_LABELS: Record<Path, string> = {
  runtime: "运行时身份",
  async: "异步资源",
  bytes: "字节与流",
  web: "Web 边界",
  process: "进程治理",
  release: "生产交付",
};

const FAULT_LABELS: Record<Fault, string> = {
  none: "基线",
  backpressure: "慢消费者",
  duplicate: "重复完成",
  crash: "崩溃重启",
};

const EVIDENCE_LABELS: Record<Evidence, string> = {
  trace: "请求轨迹",
  metrics: "尾延迟与资源",
  replay: "恢复后重放",
};

function resultFor(path: Path, fault: Fault, evidence: Evidence) {
  if (fault === "duplicate") {
    return {
      ok: false,
      color: C.danger,
      title: "单一完成出口未守住",
      note: "回调、Promise、事件或进程消息可能为同一操作签发多个结果；先锁定操作 id、所有者和取消传播，再讨论吞吐。",
    };
  }
  if (fault === "backpressure" && path !== "bytes") {
    return {
      ok: false,
      color: C.warning,
      title: "慢消费者越过了字节边界",
      note: "只看请求成功不能证明流已排空；需要观察背压、队列长度、分块解码和关闭时机。",
    };
  }
  if (fault === "crash" && evidence !== "replay") {
    return {
      ok: false,
      color: C.warning,
      title: "重启后缺少可重放证据",
      note: "进程退出码和服务在线只能说明控制面恢复；必须用固定输入重放，并确认文件、套接字、Worker 与日志排空。",
    };
  }
  if (evidence === "metrics") {
    return {
      ok: true,
      color: C.warning,
      title: "指标通过，语义仍需核对",
      note: "尾延迟和资源计数可以定位压力，但不能单独证明字节完整、错误只出现一次或关闭没有丢数据。",
    };
  }
  return {
    ok: true,
    color: C.success,
    title: "Node 路径可交接",
    note: "版本、资源所有权、异步顺序、字节边界、故障历史和关闭证据能够沿同一个请求 id 复核。",
  };
}

export function DnjOfficialLearningMapLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `dnj-learning-arrow-${instanceId}`;
  const warningArrowId = `dnj-learning-warning-${instanceId}`;
  const [path, setPath] = useState<Path>("async");
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
  const result = resultFor(path, fault, evidence);

  function reset() {
    setPath("async");
    setFault("none");
    setEvidence("trace");
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="deep-nodejs-learning-map"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Node.js · 运行时学习地图
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              从模块身份走到可关闭的生产服务
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择一条学习路径、注入一个边界故障，再切换证据方式；沿六阶段时间线观察数据如何从模块进入异步资源、字节流和生产交付。
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择 Node 学习路径">
            {(Object.entries(PATH_LABELS) as [Path, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={path === value}
                  onClick={() => setPath(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    path === value
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
          <div className="flex flex-wrap gap-2" aria-label="选择 Node 故障">
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
          <div className="flex flex-wrap gap-2" aria-label="选择 Node 证据">
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
          viewBox="0 0 900 650"
          role="img"
          aria-label={`Node.js 学习地图实验：路径为${PATH_LABELS[path]}，故障为${FAULT_LABELS[fault]}，证据为${EVIDENCE_LABELS[evidence]}，当前结论为${result.title}。时间线展示身份、模块、异步、字节、边界和发布六阶段；支持播放、暂停、单步、拖进度、路径故障证据切换和重置。`}
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

          <rect x="0" y="0" width="900" height="650" rx="14" fill={C.bg} />
          <text x="28" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            模块 → 异步 → 字节 → 网络 → 进程 → 生产
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            学习地图把历史 API、现代替代和可观察故障放在同一条运行链上
          </text>

          <rect
            x="28"
            y="78"
            width="844"
            height="82"
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
            当前结论：{result.title} · {PATH_LABELS[path]} ·{" "}
            {FAULT_LABELS[fault]} · {EVIDENCE_LABELS[evidence]}
          </text>
          <text x="48" y="134" fontSize="11" fill={C.secondary}>
            {result.note}
          </text>
          <text x="48" y="152" fontSize="11" fill={result.color}>
            验收条件：输入、所有者、错误出口和关闭证据可由同一请求 id 复核
          </text>

          <g
            ref={(node) => {
              stageRefs.current[0] = node;
            }}
            opacity="0"
          >
            <rect
              x="28"
              y="192"
              width="128"
              height="112"
              rx="10"
              fill={C.accent}
              fillOpacity="0.1"
              stroke={C.accent}
            />
            <text x="44" y="222" fontSize="12" fontWeight="700" fill={C.accent}>
              身份
            </text>
            <text x="44" y="250" fontSize="11" fill={C.secondary}>
              Node 2013 · modern
            </text>
            <text x="44" y="274" fontSize="11" fill={C.secondary}>
              版本账本与边界
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
              y="192"
              width="128"
              height="112"
              rx="10"
              fill={C.accent}
              fillOpacity="0.1"
              stroke={C.accent}
            />
            <text
              x="186"
              y="222"
              fontSize="12"
              fontWeight="700"
              fill={C.accent}
            >
              模块
            </text>
            <text x="186" y="250" fontSize="11" fill={C.secondary}>
              resolve · cache · export
            </text>
            <text x="186" y="274" fontSize="11" fill={C.secondary}>
              循环依赖可解释
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
              y="192"
              width="128"
              height="112"
              rx="10"
              fill={C.accent}
              fillOpacity="0.1"
              stroke={C.accent}
            />
            <text
              x="328"
              y="222"
              fontSize="12"
              fontWeight="700"
              fill={C.accent}
            >
              异步
            </text>
            <text x="328" y="250" fontSize="11" fill={C.secondary}>
              event loop · callback
            </text>
            <text x="328" y="274" fontSize="11" fill={C.secondary}>
              完成通知只发一次
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
              y="192"
              width="128"
              height="112"
              rx="10"
              fill={path === "bytes" ? C.success : C.accent}
              fillOpacity="0.1"
              stroke={path === "bytes" ? C.success : C.accent}
            />
            <text
              x="470"
              y="222"
              fontSize="12"
              fontWeight="700"
              fill={path === "bytes" ? C.success : C.accent}
            >
              字节
            </text>
            <text x="470" y="250" fontSize="11" fill={C.secondary}>
              Buffer · stream · decoder
            </text>
            <text x="470" y="274" fontSize="11" fill={C.secondary}>
              背压与分块边界
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
              y="192"
              width="128"
              height="112"
              rx="10"
              fill={fault === "none" ? C.accent : C.warning}
              fillOpacity="0.1"
              stroke={fault === "none" ? C.accent : C.warning}
            />
            <text
              x="612"
              y="222"
              fontSize="12"
              fontWeight="700"
              fill={fault === "none" ? C.accent : C.warning}
            >
              边界
            </text>
            <text x="612" y="250" fontSize="11" fill={C.secondary}>
              TCP · HTTP · Worker
            </text>
            <text x="612" y="274" fontSize="11" fill={C.secondary}>
              {FAULT_LABELS[fault]} 可重放
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
              y="192"
              width="134"
              height="112"
              rx="10"
              fill={result.ok ? C.success : C.warning}
              fillOpacity="0.1"
              stroke={result.ok ? C.success : C.warning}
            />
            <text
              x="754"
              y="222"
              fontSize="12"
              fontWeight="700"
              fill={result.ok ? C.success : C.warning}
            >
              发布
            </text>
            <text x="754" y="250" fontSize="11" fill={C.secondary}>
              test · log · close
            </text>
            <text x="754" y="274" fontSize="11" fill={C.secondary}>
              恢复责任明确
            </text>
          </g>

          <line
            x1="156"
            y1="248"
            x2="166"
            y2="248"
            stroke={C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${arrowId})`}
          />
          <line
            x1="298"
            y1="248"
            x2="308"
            y2="248"
            stroke={C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${arrowId})`}
          />
          <line
            x1="440"
            y1="248"
            x2="450"
            y2="248"
            stroke={path === "bytes" ? C.border : C.warning}
            strokeWidth="1.5"
            markerEnd={`url(#${path === "bytes" ? arrowId : warningArrowId})`}
          />
          <line
            x1="582"
            y1="248"
            x2="592"
            y2="248"
            stroke={fault === "none" ? C.border : C.warning}
            strokeWidth="1.5"
            markerEnd={`url(#${fault === "none" ? arrowId : warningArrowId})`}
          />
          <line
            x1="724"
            y1="248"
            x2="734"
            y2="248"
            stroke={result.ok ? C.border : C.warning}
            strokeWidth="1.5"
            markerEnd={`url(#${result.ok ? arrowId : warningArrowId})`}
          />

          <rect
            x="28"
            y="338"
            width="404"
            height="110"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="48" y="368" fontSize="12" fontWeight="700" fill={C.primary}>
            11 章 · 4 附录的依赖
          </text>
          <text x="48" y="396" fontSize="11" fill={C.secondary}>
            运行时 / 模块 / 异步 / 内存 / Buffer
          </text>
          <text x="48" y="420" fontSize="11" fill={C.secondary}>
            网络 / Web / 进程 / 测试 / 产品化 / 安装调试规范
          </text>

          <rect
            x="460"
            y="338"
            width="412"
            height="110"
            rx="12"
            fill={result.color}
            fillOpacity="0.08"
            stroke={result.color}
          />
          <text
            x="480"
            y="368"
            fontSize="12"
            fontWeight="700"
            fill={result.color}
          >
            当前证据门
          </text>
          <text x="480" y="396" fontSize="11" fill={C.secondary}>
            路径：{PATH_LABELS[path]} · 证据：{EVIDENCE_LABELS[evidence]}
          </text>
          <text x="480" y="420" fontSize="11" fill={result.color}>
            {result.ok
              ? "可交接：故障、恢复和关闭条件均已写明。"
              : "不可交接：先暂停，补齐首个偏离点和恢复证据。"}
          </text>

          <rect
            x="28"
            y="480"
            width="844"
            height="112"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="48" y="510" fontSize="12" fontWeight="700" fill={C.primary}>
            外部证据：输入 · 所有者 · 调度 · 字节 · 关闭
          </text>
          <text x="48" y="538" fontSize="11" fill={C.secondary}>
            request：node-map-1042 · input：chunk-v3 · owner：stream-worker
          </text>
          <text x="48" y="562" fontSize="11" fill={C.secondary}>
            fault：{FAULT_LABELS[fault]} · evidence：{EVIDENCE_LABELS[evidence]}{" "}
            · close：socket-drained
          </text>
          <rect
            x="48"
            y="572"
            width="804"
            height="12"
            rx="6"
            fill={result.color}
            fillOpacity="0.16"
          />

          <text x="28" y="624" fontSize="11" fill={result.color}>
            当前时间线：第 {activeIndex + 1} / {STEPS.length} 步 ·{" "}
            {activeStep?.caption ?? "选择阶段"}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先固定版本与资源所有权，再只改变一个故障条件，最后用轨迹和重放确认关闭。"
          reset={{
            label: "重置 Node 学习地图实验",
            ariaLabel: "重置 Node.js 学习地图实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        学习地图的终点不是记住
        API，而是能从输入、所有权和调度推导出故障边界，并证明资源已经安全关闭。
      </figcaption>
    </figure>
  );
}
