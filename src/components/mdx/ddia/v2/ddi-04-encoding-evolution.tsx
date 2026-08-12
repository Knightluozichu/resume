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

type Format = "json" | "protobuf" | "avro";
type Change = "add" | "rename" | "remove";
type Consumer = "old" | "new" | "mixed";

const STEPS: readonly TeachingStep[] = [
  { label: "model", caption: "先写字段、默认值、删除语义和不变量" },
  { label: "encode", caption: "把对象编码成可持久化、可传输的字节" },
  { label: "store", caption: "让数据库中的旧数据和新代码并存" },
  { label: "read", caption: "观察旧消费者能否安全跳过未知字段" },
  { label: "rollout", caption: "滚动升级服务，避免要求同时切换所有实例" },
  { label: "replay", caption: "重放历史消息并对账业务语义" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const FORMAT_LABELS: Record<Format, string> = {
  json: "JSON",
  protobuf: "Protocol Buffers",
  avro: "Avro",
};

const CHANGE_LABELS: Record<Change, string> = {
  add: "新增可选字段",
  rename: "重命名字段",
  remove: "删除字段",
};

function compatibility(format: Format, change: Change, consumer: Consumer) {
  if (change === "add") {
    return {
      ok: true,
      color: C.success,
      note:
        consumer === "old"
          ? "旧消费者忽略未知字段"
          : "新消费者读取默认值或新值",
    };
  }
  if (change === "remove") {
    return {
      ok: consumer !== "new",
      color: consumer === "new" ? C.danger : C.warning,
      note:
        consumer === "new"
          ? "新消费者仍依赖字段，先停止写入再迁移读取"
          : "旧数据仍可能携带字段，解析器需要允许缺失或保留兼容层",
    };
  }
  return {
    ok: format !== "json" && consumer !== "old",
    color: format !== "json" && consumer !== "old" ? C.success : C.danger,
    note:
      format === "json"
        ? "名称通常是协议契约，直接改名会让旧消费者读不到值"
        : "用字段编号或别名保留旧名称，再分阶段切换读写路径",
  };
}

export function Ddi04EncodingEvolutionLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const forwardArrowId = `ddia-04-forward-arrow-${instanceId}`;
  const warningArrowId = `ddia-04-warning-arrow-${instanceId}`;
  const [format, setFormat] = useState<Format>("protobuf");
  const [change, setChange] = useState<Change>("add");
  const [consumer, setConsumer] = useState<Consumer>("mixed");

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
  const check = compatibility(format, change, consumer);
  const consumerLabel =
    consumer === "old"
      ? "旧消费者"
      : consumer === "new"
        ? "新消费者"
        : "新旧并存";

  function reset() {
    setFormat("protobuf");
    setChange("add");
    setConsumer("mixed");
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ddia-04-encoding-evolution"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DDIA · 第 4 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              先定兼容契约，再让代码、数据库和消息独立演进
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换编码格式、字段变化和消费者世代；观察同一份字节在写入、读取、滚动升级与历史重放中的语义。
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择编码格式">
            {(Object.entries(FORMAT_LABELS) as [Format, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={format === value}
                  onClick={() => setFormat(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    format === value
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
          <div className="flex flex-wrap gap-2" aria-label="选择 Schema 变化">
            <span className="self-center text-xs text-secondary">变化：</span>
            {(Object.entries(CHANGE_LABELS) as [Change, string][]).map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={change === value}
                  onClick={() => setChange(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    change === value
                      ? "border-accent text-accent"
                      : "border-border text-secondary hover:border-accent hover:text-primary"
                  }`}
                >
                  {label}
                </button>
              ),
            )}
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择消费者世代">
            <span className="self-center text-xs text-secondary">读取方：</span>
            {(
              [
                ["old", "旧消费者"],
                ["new", "新消费者"],
                ["mixed", "新旧并存"],
              ] as [Consumer, string][]
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={consumer === value}
                onClick={() => setConsumer(value)}
                className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                  consumer === value
                    ? "border-accent text-accent"
                    : "border-border text-secondary hover:border-accent hover:text-primary"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <svg
          viewBox="0 0 900 700"
          role="img"
          aria-label={`数据编码与演化实验图：当前格式为${FORMAT_LABELS[format]}，变化为${CHANGE_LABELS[change]}，读取方为${consumerLabel}，兼容性${check.ok ? "通过" : "需要迁移门禁"}。时间线展示建模、编码、存储、读取、滚动升级和历史重放六阶段；支持播放、暂停、单步、拖进度、格式切换、变化切换、消费者切换和重置。`}
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
            对象 → 字节 → 存储/消息 → 新旧消费者 → 历史重放
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            兼容性是一次部署跨越多个时间点时，数据仍能被正确解释的契约
          </text>

          <rect
            x="28"
            y="80"
            width="844"
            height="92"
            rx="12"
            fill={C.elevated}
            stroke={check.ok ? C.success : C.danger}
            strokeWidth="1.5"
          />
          <text
            x="48"
            y="108"
            fontSize="12"
            fontWeight="700"
            fill={check.color}
          >
            当前组合：{FORMAT_LABELS[format]} · {CHANGE_LABELS[change]} ·{" "}
            {consumerLabel}
          </text>
          <text x="48" y="136" fontSize="11" fill={C.secondary}>
            兼容判断：
            {check.ok ? "可在当前世代共存" : "先保留旧语义，再迁移读取与写入"}
          </text>
          <text x="48" y="157" fontSize="11" fill={check.color}>
            {check.note}
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
              width="174"
              height="112"
              rx="10"
              fill={C.accent}
              fillOpacity="0.1"
              stroke={C.accent}
            />
            <text x="48" y="232" fontSize="12" fontWeight="700" fill={C.accent}>
              Schema v2
            </text>
            <text x="48" y="258" fontSize="11" fill={C.secondary}>
              id · name ·{" "}
              {change === "add"
                ? "email?"
                : change === "rename"
                  ? "display_name"
                  : "name?"}
            </text>
            <text x="48" y="282" fontSize="11" fill={C.secondary}>
              默认值 / 删除语义
            </text>
          </g>
          <g
            ref={(node) => {
              stageRefs.current[1] = node;
            }}
            opacity="0"
          >
            <rect
              x="230"
              y="202"
              width="174"
              height="112"
              rx="10"
              fill={C.accent}
              fillOpacity="0.1"
              stroke={C.accent}
            />
            <text
              x="250"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={C.accent}
            >
              编码器
            </text>
            <text x="250" y="258" fontSize="11" fill={C.secondary}>
              {FORMAT_LABELS[format]}
            </text>
            <text x="250" y="282" fontSize="11" fill={C.secondary}>
              字段名 / 编号 / 类型
            </text>
          </g>
          <g
            ref={(node) => {
              stageRefs.current[2] = node;
            }}
            opacity="0"
          >
            <rect
              x="432"
              y="202"
              width="174"
              height="112"
              rx="10"
              fill={C.warning}
              fillOpacity="0.1"
              stroke={C.warning}
            />
            <text
              x="452"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={C.warning}
            >
              持久化字节
            </text>
            <text x="452" y="258" fontSize="11" fill={C.secondary}>
              数据库行 / 消息记录
            </text>
            <text x="452" y="282" fontSize="11" fill={C.secondary}>
              旧数据与新数据并存
            </text>
          </g>
          <g
            ref={(node) => {
              stageRefs.current[3] = node;
            }}
            opacity="0"
          >
            <rect
              x="634"
              y="202"
              width="238"
              height="112"
              rx="10"
              fill={check.ok ? C.success : C.danger}
              fillOpacity="0.1"
              stroke={check.ok ? C.success : C.danger}
            />
            <text
              x="654"
              y="232"
              fontSize="12"
              fontWeight="700"
              fill={check.color}
            >
              消费者：{consumerLabel}
            </text>
            <text x="654" y="258" fontSize="11" fill={C.secondary}>
              {check.ok
                ? "未知字段可跳过或有默认值"
                : "字段语义变化，旧读路径会误读"}
            </text>
            <text x="654" y="282" fontSize="11" fill={check.color}>
              {check.ok ? "保持业务含义" : "需要兼容层或分阶段迁移"}
            </text>
          </g>

          <line
            x1="202"
            y1="258"
            x2="226"
            y2="258"
            stroke={C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${forwardArrowId})`}
          />
          <line
            x1="404"
            y1="258"
            x2="428"
            y2="258"
            stroke={C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${forwardArrowId})`}
          />
          <line
            x1="606"
            y1="258"
            x2="630"
            y2="258"
            stroke={check.ok ? C.border : C.danger}
            strokeWidth="1.5"
            markerEnd={`url(#${check.ok ? forwardArrowId : warningArrowId})`}
          />

          <rect
            x="28"
            y="348"
            width="844"
            height="144"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="48" y="378" fontSize="12" fontWeight="700" fill={C.primary}>
            三个互操作证据
          </text>
          <text x="48" y="408" fontSize="11" fill={C.secondary}>
            向后兼容：新代码能读旧数据
          </text>
          <text x="328" y="408" fontSize="11" fill={C.secondary}>
            向前兼容：旧代码能读新数据
          </text>
          <text x="620" y="408" fontSize="11" fill={C.secondary}>
            演化安全：未知字段不破坏业务
          </text>
          <rect
            x="48"
            y="430"
            width="220"
            height="36"
            rx="8"
            fill={C.accent}
            fillOpacity="0.1"
          />
          <rect
            x="328"
            y="430"
            width="220"
            height="36"
            rx="8"
            fill={C.warning}
            fillOpacity="0.1"
          />
          <rect
            x="620"
            y="430"
            width="220"
            height="36"
            rx="8"
            fill={check.ok ? C.success : C.danger}
            fillOpacity="0.1"
          />
          <text
            x="158"
            y="453"
            textAnchor="middle"
            fontSize="11"
            fill={C.primary}
          >
            旧行 → 新读代码
          </text>
          <text
            x="438"
            y="453"
            textAnchor="middle"
            fontSize="11"
            fill={C.primary}
          >
            新行 → 旧读代码
          </text>
          <text
            x="730"
            y="453"
            textAnchor="middle"
            fontSize="11"
            fill={check.color}
          >
            {check.ok ? "可对账" : "先阻断发布"}
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
              fill={C.warning}
              fillOpacity="0.08"
              stroke={C.warning}
            />
            <text
              x="48"
              y="558"
              fontSize="12"
              fontWeight="700"
              fill={C.warning}
            >
              滚动升级
            </text>
            <text x="48" y="586" fontSize="11" fill={C.secondary}>
              先部署能读新旧版本的代码，再切换写入，最后清理旧字段。
            </text>
            <text x="48" y="610" fontSize="11" fill={C.secondary}>
              每一步都保留回滚路径，不要求所有实例同时换代。
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
              fill={check.ok ? C.success : C.danger}
              fillOpacity="0.08"
              stroke={check.ok ? C.success : C.danger}
            />
            <text
              x="482"
              y="558"
              fontSize="12"
              fontWeight="700"
              fill={check.color}
            >
              历史重放与对账
            </text>
            <text x="482" y="586" fontSize="11" fill={C.secondary}>
              重放旧消息和旧数据库行，比较结果、默认值、未知字段与业务不变量。
            </text>
            <text x="482" y="610" fontSize="11" fill={check.color}>
              {check.ok ? "兼容证据可以交接" : "发现语义漂移，停止迁移"}
            </text>
          </g>

          <text
            x="30"
            y="676"
            fontSize="11"
            fill={check.ok ? C.secondary : C.danger}
          >
            当前时间线：第 {activeIndex + 1} / {STEPS.length} 步 ·{" "}
            {activeStep?.caption ?? "选择阶段"}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测哪类消费者会误读，再只改变一个字段或格式并重放历史输入。"
          reset={{
            label: "重置第 4 章实验",
            ariaLabel: "重置数据编码与演化第 4 章实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        数据编码把对象变成字节，兼容契约则让数据库、服务和消息在不同时间点仍能解释这些字节。
      </figcaption>
    </figure>
  );
}
