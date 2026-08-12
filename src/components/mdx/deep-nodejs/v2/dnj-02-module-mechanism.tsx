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

type Boundary = "file" | "core" | "native" | "package";
type Fault = "none" | "cycle" | "abi" | "tamper";
type Evidence = "graph" | "trace" | "lock";

const STEPS: readonly TeachingStep[] = [
  { label: "identifier", caption: "从入口标识确定解析边界" },
  { label: "cache", caption: "检查缓存键与循环依赖状态" },
  { label: "locate", caption: "区分文件、核心模块和包路径" },
  { label: "compile", caption: "记录包装、编译与原生 ABI" },
  { label: "export", caption: "确认导出对象和调用栈契约" },
  { label: "package", caption: "用锁文件与完整性完成分发" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOUNDARY_LABELS: Record<Boundary, string> = {
  file: "文件模块",
  core: "核心模块",
  native: "原生扩展",
  package: "npm 包",
};

const FAULT_LABELS: Record<Fault, string> = {
  none: "基线",
  cycle: "循环依赖",
  abi: "ABI 不兼容",
  tamper: "包被篡改",
};

const EVIDENCE_LABELS: Record<Evidence, string> = {
  graph: "模块图与调用栈",
  trace: "解析轨迹",
  lock: "锁文件与完整性",
};

function resultFor(boundary: Boundary, fault: Fault, evidence: Evidence) {
  if (fault === "cycle" && evidence !== "graph") {
    return {
      ok: false,
      color: C.warning,
      title: "循环依赖的部分导出未解释",
      note: "缓存命中和导出对象必须放进调用栈，不能用最终模块值掩盖初始化顺序；需要模块图和部分导出的轨迹。",
    };
  }
  if (fault === "abi" && boundary !== "native") {
    return {
      ok: false,
      color: C.warning,
      title: "故障边界与模块类型不一致",
      note: "ABI 风险属于原生扩展的编译与加载边界；先确认模块类型、Node 版本、架构和构建产物，再判断是否可恢复。",
    };
  }
  if (fault === "abi" && boundary === "native") {
    return {
      ok: false,
      color: C.danger,
      title: "原生扩展 ABI 未满足",
      note: "源码能解析不代表二进制能加载；需要记录构建工具链、Node ABI、架构、错误出口和回滚制品。",
    };
  }
  if (fault === "tamper" && evidence !== "lock") {
    return {
      ok: false,
      color: C.danger,
      title: "包完整性证据不足",
      note: "包能安装或入口能执行不能证明制品未被替换；必须核对锁文件、完整性哈希、来源和可回滚版本。",
    };
  }
  return {
    ok: true,
    color: C.success,
    title: "模块图可交接",
    note: "标识符、缓存键、解析路径、编译边界、导出对象和分发证据能够沿同一请求 id 复核。",
  };
}

export function DnjModuleMechanismLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `dnj-module-arrow-${instanceId}`;
  const warningArrowId = `dnj-module-warning-${instanceId}`;
  const [boundary, setBoundary] = useState<Boundary>("file");
  const [fault, setFault] = useState<Fault>("none");
  const [evidence, setEvidence] = useState<Evidence>("graph");

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
  const result = resultFor(boundary, fault, evidence);

  function reset() {
    setBoundary("file");
    setFault("none");
    setEvidence("graph");
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="deep-nodejs-module-mechanism"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Node.js · 第 2 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              把 require 或 import 还原成可审计的模块调用栈
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择模块边界、注入解析故障和切换证据方式；沿六阶段时间线观察标识符如何变成导出对象，并把缓存、ABI
              与包完整性纳入结果。
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择模块边界">
            {(Object.entries(BOUNDARY_LABELS) as [Boundary, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={boundary === value}
                  onClick={() => setBoundary(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    boundary === value
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
          <div className="flex flex-wrap gap-2" aria-label="选择解析故障">
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
          <div className="flex flex-wrap gap-2" aria-label="选择模块证据">
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
                      ? value === "lock"
                        ? "border-success text-success"
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
          viewBox="0 0 900 660"
          role="img"
          aria-label={`Node 第 2 章模块机制实验：模块边界为${BOUNDARY_LABELS[boundary]}，故障为${FAULT_LABELS[fault]}，证据为${EVIDENCE_LABELS[evidence]}，当前结论为${result.title}。时间线展示标识符、缓存、定位、编译、导出和包分发六阶段；支持播放、暂停、单步、拖进度、三组条件切换和重置。`}
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

          <rect x="0" y="0" width="900" height="660" rx="14" fill={C.bg} />
          <text x="28" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            标识符 → 缓存 → 定位 → 编译 → 导出 → 分发
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            模块的正确性来自可解释的解析路径，而不是入口恰好返回一个对象
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
            当前结论：{result.title} · {BOUNDARY_LABELS[boundary]} ·{" "}
            {FAULT_LABELS[fault]} · {EVIDENCE_LABELS[evidence]}
          </text>
          <text x="48" y="134" fontSize="11" fill={C.secondary}>
            {result.note}
          </text>
          <text x="48" y="152" fontSize="11" fill={result.color}>
            验收条件：模块图、缓存键、编译边界、版本与分发完整性可追踪
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
              标识符
            </text>
            <text x="44" y="252" fontSize="11" fill={C.secondary}>
              相对 · 绝对 · node:
            </text>
            <text x="44" y="276" fontSize="11" fill={C.secondary}>
              入口与版本
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
              fill={fault === "cycle" ? C.warning : C.accent}
              fillOpacity="0.1"
              stroke={fault === "cycle" ? C.warning : C.accent}
            />
            <text
              x="186"
              y="224"
              fontSize="12"
              fontWeight="700"
              fill={fault === "cycle" ? C.warning : C.accent}
            >
              缓存
            </text>
            <text x="186" y="252" fontSize="11" fill={C.secondary}>
              cache key · partial export
            </text>
            <text x="186" y="276" fontSize="11" fill={C.secondary}>
              循环依赖
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
              定位
            </text>
            <text x="328" y="252" fontSize="11" fill={C.secondary}>
              file · core · package
            </text>
            <text x="328" y="276" fontSize="11" fill={C.secondary}>
              路径优先级
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
              fill={fault === "abi" ? C.danger : C.accent}
              fillOpacity="0.1"
              stroke={fault === "abi" ? C.danger : C.accent}
            />
            <text
              x="470"
              y="224"
              fontSize="12"
              fontWeight="700"
              fill={fault === "abi" ? C.danger : C.accent}
            >
              编译
            </text>
            <text x="470" y="252" fontSize="11" fill={C.secondary}>
              wrapper · C/C++ ABI
            </text>
            <text x="470" y="276" fontSize="11" fill={C.secondary}>
              构建产物
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
              fill={C.accent}
              fillOpacity="0.1"
              stroke={C.accent}
            />
            <text
              x="612"
              y="224"
              fontSize="12"
              fontWeight="700"
              fill={C.accent}
            >
              导出
            </text>
            <text x="612" y="252" fontSize="11" fill={C.secondary}>
              exports · require stack
            </text>
            <text x="612" y="276" fontSize="11" fill={C.secondary}>
              调用契约
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
              fill={fault === "tamper" ? C.danger : C.success}
              fillOpacity="0.1"
              stroke={fault === "tamper" ? C.danger : C.success}
            />
            <text
              x="754"
              y="224"
              fontSize="12"
              fontWeight="700"
              fill={fault === "tamper" ? C.danger : C.success}
            >
              分发
            </text>
            <text x="754" y="252" fontSize="11" fill={C.secondary}>
              lock · hash · rollback
            </text>
            <text x="754" y="276" fontSize="11" fill={C.secondary}>
              供应链边界
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
            stroke={fault === "cycle" ? C.warning : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${fault === "cycle" ? warningArrowId : arrowId})`}
          />
          <line
            x1="440"
            y1="250"
            x2="450"
            y2="250"
            stroke={fault === "abi" ? C.warning : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${fault === "abi" ? warningArrowId : arrowId})`}
          />
          <line
            x1="582"
            y1="250"
            x2="592"
            y2="250"
            stroke={C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${arrowId})`}
          />
          <line
            x1="724"
            y1="250"
            x2="734"
            y2="250"
            stroke={fault === "tamper" ? C.danger : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${fault === "tamper" ? warningArrowId : arrowId})`}
          />

          <rect
            x="28"
            y="340"
            width="404"
            height="112"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="48" y="370" fontSize="12" fontWeight="700" fill={C.primary}>
            模块类型：{BOUNDARY_LABELS[boundary]}
          </text>
          <text x="48" y="398" fontSize="11" fill={C.secondary}>
            标识符 → 解析路径 → 缓存键 → 编译结果
          </text>
          <text x="48" y="422" fontSize="11" fill={C.secondary}>
            任何一步改变，都要重新核对导出和调用栈
          </text>

          <rect
            x="460"
            y="340"
            width="412"
            height="112"
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
            故障：{FAULT_LABELS[fault]} · 证据：{EVIDENCE_LABELS[evidence]}
          </text>
          <text x="480" y="422" fontSize="11" fill={result.color}>
            {result.ok
              ? "可交接：路径、版本、完整性和回滚均已写明。"
              : "不可交接：先暂停，补齐缓存、ABI 或制品证据。"}
          </text>

          <rect
            x="28"
            y="484"
            width="844"
            height="112"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="48" y="514" fontSize="12" fontWeight="700" fill={C.primary}>
            外部证据：解析轨迹、模块图和制品完整性必须互相对上
          </text>
          <text x="48" y="542" fontSize="11" fill={C.secondary}>
            request：module-1042 · boundary：{BOUNDARY_LABELS[boundary]} ·
            fault：{FAULT_LABELS[fault]}
          </text>
          <text x="48" y="566" fontSize="11" fill={C.secondary}>
            evidence：{EVIDENCE_LABELS[evidence]} · cache：module-v7 ·
            rollback：package-v6
          </text>
          <rect
            x="48"
            y="578"
            width="804"
            height="12"
            rx="6"
            fill={result.color}
            fillOpacity="0.16"
          />

          <text x="28" y="630" fontSize="11" fill={result.color}>
            当前时间线：第 {activeIndex + 1} / {STEPS.length} 步 ·{" "}
            {activeStep?.caption ?? "选择阶段"}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先固定入口和依赖锁，再只改变模块边界或解析故障，最后用模块图与制品证据复核。"
          reset={{
            label: "重置模块机制实验",
            ariaLabel: "重置 Node 模块机制实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        模块机制的终点不是拿到一个导出对象，而是能解释它从哪里来、何时缓存、如何编译，以及为什么可以安全分发。
      </figcaption>
    </figure>
  );
}
