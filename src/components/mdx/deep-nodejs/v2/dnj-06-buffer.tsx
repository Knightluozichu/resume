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

type Encoding = "utf8" | "hex" | "base64";
type Fault = "none" | "split" | "unsafe" | "alias";
type Evidence = "bytes" | "decode" | "cost";

const STEPS: readonly TeachingStep[] = [
  { label: "input", caption: "确认原始字节、编码和长度" },
  { label: "allocate", caption: "选择初始化方式与容量边界" },
  { label: "split", caption: "把输入切成可观察的数据块" },
  { label: "decode", caption: "保留跨块字符的解码状态" },
  { label: "join", caption: "比较复制、视图和拼接成本" },
  { label: "verify", caption: "用摘要、长度和 owner 完成验收" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const ENCODING_LABELS: Record<Encoding, string> = {
  utf8: "UTF-8",
  hex: "十六进制",
  base64: "Base64",
};

const FAULT_LABELS: Record<Fault, string> = {
  none: "基线",
  split: "字符中间切块",
  unsafe: "未覆盖 unsafe",
  alias: "视图持有大块",
};

const EVIDENCE_LABELS: Record<Evidence, string> = {
  bytes: "字节摘要",
  decode: "解码状态",
  cost: "复制与生命周期",
};

function verdict(encoding: Encoding, fault: Fault, evidence: Evidence) {
  if (fault === "split" && evidence !== "decode") {
    return {
      ok: false,
      color: C.warning,
      title: "跨块字符尚未解释",
      note: `${ENCODING_LABELS[encoding]} 输入从字符中间切开；只有解码状态证据能说明为什么输出是否完整。`,
    };
  }
  if (fault === "unsafe" && evidence !== "bytes") {
    return {
      ok: false,
      color: C.danger,
      title: "初始化安全性缺少字节证据",
      note: "没有覆盖全部字节就读取 unsafe 区域，可能把旧内容带入输出；先核对初始化和实际写入范围。",
    };
  }
  if (fault === "alias" && evidence !== "cost") {
    return {
      ok: false,
      color: C.warning,
      title: "视图生命周期尚未对账",
      note: "共享视图节省了复制，却可能让大块底层存储继续存活；需要复制成本和 owner 证据。",
    };
  }
  return {
    ok: true,
    color: C.success,
    title: "字节处理可以验收",
    note: `${ENCODING_LABELS[encoding]} 的输入、边界、解码和存储生命周期由${EVIDENCE_LABELS[evidence]}串起。`,
  };
}

export function DnjBufferLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `dnj-buffer-arrow-${instanceId}`;
  const warningArrowId = `dnj-buffer-warning-${instanceId}`;
  const [encoding, setEncoding] = useState<Encoding>("utf8");
  const [fault, setFault] = useState<Fault>("none");
  const [evidence, setEvidence] = useState<Evidence>("bytes");

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
  const result = verdict(encoding, fault, evidence);

  function reset() {
    setEncoding("utf8");
    setFault("none");
    setEvidence("bytes");
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="deep-nodejs-buffer"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Node.js · 第 6 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              从字节边界追踪到文本结果
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择编码、切块故障和证据视图；沿六阶段时间线观察 Buffer
              的分配、跨块解码、拼接和共享存储成本。
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择字符编码">
            {(Object.entries(ENCODING_LABELS) as [Encoding, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={encoding === value}
                  onClick={() => setEncoding(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    encoding === value
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
          <div className="flex flex-wrap gap-2" aria-label="选择字节故障">
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
          <div className="flex flex-wrap gap-2" aria-label="选择字节证据">
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
          viewBox="0 0 900 710"
          role="img"
          aria-label={`Node 第 6 章 Buffer 实验：编码为${ENCODING_LABELS[encoding]}，故障为${FAULT_LABELS[fault]}，证据为${EVIDENCE_LABELS[evidence]}，当前结论为${result.title}。时间线展示输入、分配、切块、解码、拼接和验收六阶段；支持播放、暂停、单步、拖进度、三组条件切换和重置。`}
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

          <rect x="0" y="0" width="900" height="710" rx="14" fill={C.bg} />
          <text x="28" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            字节 → 分配 → 切块 → 解码 → 拼接 → 验收
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            正确文本必须由原始字节、编码、边界和存储生命周期共同证明
          </text>

          <rect
            x="28"
            y="78"
            width="844"
            height="88"
            rx="12"
            fill={result.color}
            fillOpacity="0.08"
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
            当前结论：{result.title} · {ENCODING_LABELS[encoding]} ·{" "}
            {FAULT_LABELS[fault]}
          </text>
          <text x="48" y="136" fontSize="11" fill={C.secondary}>
            {result.note}
          </text>
          <text x="48" y="154" fontSize="11" fill={result.color}>
            验收条件：字节摘要 · 解码状态 · 目标容量 · 复制量 · 底层 owner
          </text>

          <text x="28" y="194" fontSize="12" fontWeight="700" fill={C.primary}>
            六阶段字节处理图
          </text>

          <g
            ref={(node) => {
              stageRefs.current[0] = node;
            }}
            opacity="0"
          >
            <rect
              x="28"
              y="214"
              width="250"
              height="92"
              rx="10"
              fill={C.accent}
              fillOpacity="0.1"
              stroke={C.accent}
            />
            <text x="46" y="244" fontSize="12" fontWeight="700" fill={C.accent}>
              1 · 输入
            </text>
            <text x="46" y="272" fontSize="11" fill={C.secondary}>
              字节来源、编码和原始长度固定
            </text>
            <text x="46" y="292" fontSize="11" fill={C.secondary}>
              encoding：{ENCODING_LABELS[encoding]}
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[1] = node;
            }}
            opacity="0"
          >
            <rect
              x="324"
              y="214"
              width="250"
              height="92"
              rx="10"
              fill={fault === "unsafe" ? C.danger : C.accent}
              fillOpacity="0.1"
              stroke={fault === "unsafe" ? C.danger : C.accent}
            />
            <text
              x="342"
              y="244"
              fontSize="12"
              fontWeight="700"
              fill={fault === "unsafe" ? C.danger : C.accent}
            >
              2 · 分配
            </text>
            <text x="342" y="272" fontSize="11" fill={C.secondary}>
              alloc、from 或受控 unsafe
            </text>
            <text
              x="342"
              y="292"
              fontSize="11"
              fill={fault === "unsafe" ? C.danger : C.secondary}
            >
              init：{fault === "unsafe" ? "uncovered bytes" : "explicit"}
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[2] = node;
            }}
            opacity="0"
          >
            <rect
              x="620"
              y="214"
              width="252"
              height="92"
              rx="10"
              fill={fault === "split" ? C.warning : C.accent}
              fillOpacity="0.1"
              stroke={fault === "split" ? C.warning : C.accent}
            />
            <text
              x="638"
              y="244"
              fontSize="12"
              fontWeight="700"
              fill={fault === "split" ? C.warning : C.accent}
            >
              3 · 切块
            </text>
            <text x="638" y="272" fontSize="11" fill={C.secondary}>
              chunk boundary 可能切开字符
            </text>
            <text
              x="638"
              y="292"
              fontSize="11"
              fill={fault === "split" ? C.warning : C.secondary}
            >
              fault：{FAULT_LABELS[fault]}
            </text>
          </g>

          <line
            x1="278"
            y1="260"
            x2="318"
            y2="260"
            stroke={C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${arrowId})`}
          />
          <line
            x1="574"
            y1="260"
            x2="614"
            y2="260"
            stroke={fault === "unsafe" ? C.warning : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${fault === "unsafe" ? warningArrowId : arrowId})`}
          />

          <g
            ref={(node) => {
              stageRefs.current[3] = node;
            }}
            opacity="0"
          >
            <rect
              x="28"
              y="354"
              width="250"
              height="92"
              rx="10"
              fill={fault === "split" ? C.warning : C.accent}
              fillOpacity="0.1"
              stroke={fault === "split" ? C.warning : C.accent}
            />
            <text
              x="46"
              y="384"
              fontSize="12"
              fontWeight="700"
              fill={fault === "split" ? C.warning : C.accent}
            >
              4 · 解码
            </text>
            <text x="46" y="412" fontSize="11" fill={C.secondary}>
              StringDecoder 保存未完成字节
            </text>
            <text
              x="46"
              y="432"
              fontSize="11"
              fill={fault === "split" ? C.warning : C.secondary}
            >
              state：{fault === "split" ? "partial sequence" : "complete"}
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[4] = node;
            }}
            opacity="0"
          >
            <rect
              x="324"
              y="354"
              width="250"
              height="92"
              rx="10"
              fill={fault === "alias" ? C.warning : C.accent}
              fillOpacity="0.1"
              stroke={fault === "alias" ? C.warning : C.accent}
            />
            <text
              x="342"
              y="384"
              fontSize="12"
              fontWeight="700"
              fill={fault === "alias" ? C.warning : C.accent}
            >
              5 · 拼接
            </text>
            <text x="342" y="412" fontSize="11" fill={C.secondary}>
              比较 copy、concat 与共享视图
            </text>
            <text
              x="342"
              y="432"
              fontSize="11"
              fill={fault === "alias" ? C.warning : C.secondary}
            >
              storage：{fault === "alias" ? "large owner retained" : "bounded"}
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[5] = node;
            }}
            opacity="0"
          >
            <rect
              x="620"
              y="354"
              width="252"
              height="92"
              rx="10"
              fill={result.ok ? C.success : C.danger}
              fillOpacity="0.1"
              stroke={result.ok ? C.success : C.danger}
            />
            <text
              x="638"
              y="384"
              fontSize="12"
              fontWeight="700"
              fill={result.ok ? C.success : C.danger}
            >
              6 · 验收
            </text>
            <text x="638" y="412" fontSize="11" fill={C.secondary}>
              摘要、长度、解码、复制和 owner 对账
            </text>
            <text
              x="638"
              y="432"
              fontSize="11"
              fill={result.ok ? C.success : C.danger}
            >
              {result.ok
                ? "text：stable · budget：ok"
                : "text：hold · evidence：missing"}
            </text>
          </g>

          <line
            x1="745"
            y1="306"
            x2="745"
            y2="346"
            stroke={fault === "split" ? C.warning : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${fault === "split" ? warningArrowId : arrowId})`}
          />
          <line
            x1="614"
            y1="400"
            x2="584"
            y2="400"
            stroke={fault === "alias" ? C.warning : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${fault === "alias" ? warningArrowId : arrowId})`}
          />
          <line
            x1="318"
            y1="400"
            x2="288"
            y2="400"
            stroke={fault === "split" ? C.warning : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${fault === "split" ? warningArrowId : arrowId})`}
          />

          <rect
            x="28"
            y="486"
            width="844"
            height="120"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="48" y="518" fontSize="12" fontWeight="700" fill={C.primary}>
            字节证据对账
          </text>
          <text x="48" y="546" fontSize="11" fill={C.secondary}>
            sample：buffer-06 · encoding：{ENCODING_LABELS[encoding]} ·
            evidence：{EVIDENCE_LABELS[evidence]}
          </text>
          <text x="48" y="570" fontSize="11" fill={C.secondary}>
            fault：{FAULT_LABELS[fault]} · bytes：6 · chunks：2 · copy：
            {fault === "alias" ? "0, owner retained" : "1, bounded"}
          </text>
          <rect
            x="48"
            y="584"
            width="804"
            height="12"
            rx="6"
            fill={result.color}
            fillOpacity="0.16"
          />
          <rect
            x="48"
            y="584"
            width={result.ok ? 804 : 520}
            height="12"
            rx="6"
            fill={result.color}
            fillOpacity="0.75"
          />

          <text x="28" y="650" fontSize="11" fill={result.color}>
            当前时间线：第 {activeIndex + 1} / {STEPS.length} 步 ·{" "}
            {activeStep?.caption ?? "选择阶段"}
          </text>
          <text x="28" y="682" fontSize="11" fill={C.secondary}>
            先保留原始字节，再判断是否复制或共享；解码正确和生命周期安全需要分别证明。
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="固定编码和输入，只改变一个字节边界或存储策略；用摘要、解码状态和复制成本交叉复核。"
          reset={{
            label: "重置 Buffer 实验",
            ariaLabel: "重置 Node Buffer 实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-3 text-center text-xs text-secondary">
        交互提示：先播放时间线，再注入边界故障；比较 chunks、text、copy 和
        owner，避免只看最终字符串。
      </figcaption>
    </figure>
  );
}
