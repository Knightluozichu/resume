"use client";

import { useMemo, useRef, useState } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "@/components/mdx/anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";

const VIEW_W = 780;
const VIEW_H = 450;
const T = TEACHING_BEAT_MS;

const COLORS = {
  accent: "var(--accent)",
  border: "var(--border)",
  danger: "var(--danger)",
  elevated: "var(--bg-elevated)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

type ResourceKind = "book" | "online" | "source";
type Fault = "none" | "version" | "hash";

const CONCEPTS = [
  "附录",
  "A.1 参考文献",
  "A.2 在线资料",
  "A.3 源代码",
] as const;

const RESOURCES: readonly {
  id: ResourceKind;
  label: string;
  identity: string;
  boundary: string;
  probe: string;
  artifact: string;
}[] = [
  {
    id: "book",
    label: "A.1 参考文献",
    identity: "作者 · 书名 · 章节",
    boundary: "版本 / 页码 / 目标",
    probe: "最短输入 → 诊断",
    artifact: "规则与边界测试",
  },
  {
    id: "online",
    label: "A.2 在线资料",
    identity: "域名 · 标题 · URL",
    boundary: "访问日 / 工具版",
    probe: "readelf -d -l",
    artifact: "字段对照与加载日志",
  },
  {
    id: "source",
    label: "A.3 源代码",
    identity: "仓库 · 提交 · 依赖",
    boundary: "目标 ABI / 构建项",
    probe: "cbc sample.cb",
    artifact: "IR / 汇编 / 回归",
  },
] as const;

const STEPS: readonly TeachingStep[] = [
  { label: "identity", caption: "锁定资源身份。" },
  { label: "version", caption: "写出版本边界。" },
  { label: "access", caption: "检查可达性。" },
  { label: "hash", caption: "核对校验值。" },
  { label: "probe", caption: "运行最小探针。" },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

function ToggleButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-11 rounded-control border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${active ? "border-accent bg-accent/10 text-primary" : "border-border bg-background text-secondary hover:border-accent hover:text-primary"}`}
    >
      {children}
    </button>
  );
}

function EvidenceCard({
  label,
  value,
  x,
  color,
  status,
}: {
  label: string;
  value: string;
  x: number;
  color: string;
  status: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y="106"
        width="136"
        height="92"
        rx="12"
        fill={COLORS.elevated}
        stroke={color}
        strokeWidth="2"
      />
      <circle cx={x + 18} cy="128" r="6" fill={color} />
      <text
        x={x + 32}
        y="133"
        fontSize="14"
        fontWeight="700"
        fill={COLORS.primary}
      >
        {label}
      </text>
      <text x={x + 14} y="158" fontSize="13" fill={COLORS.secondary}>
        {value}
      </text>
      <text x={x + 14} y="181" fontSize="13" fill={color}>
        {status}
      </text>
    </g>
  );
}

function Arrow({ x1, x2 }: { x1: number; x2: number }) {
  return (
    <line
      x1={x1}
      y1="152"
      x2={x2}
      y2="152"
      stroke={COLORS.border}
      strokeWidth="2"
      markerEnd="url(#crc-appendix-arrow)"
    />
  );
}

/** 附录专属实验：把资料条目从身份推进到可复查产物，并主动注入缺失字段。 */
export function CrcAppendixResourcesLab() {
  const [resourceKind, setResourceKind] = useState<ResourceKind>("book");
  const [fault, setFault] = useState<Fault>("none");
  const nodeRefs = useRef<Record<string, SVGGElement | null>>({});
  const resource = useMemo(
    () => RESOURCES.find((item) => item.id === resourceKind) ?? RESOURCES[0],
    [resourceKind],
  );
  const missingVersion = fault === "version";
  const badHash = fault === "hash";
  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        const node = nodeRefs.current[step.label];
        if (!node) return;
        tl.add(
          node,
          {
            opacity: [0.3, 1],
            scale: [0.94, 1],
            duration: T * 0.65,
            ease: "out(3)",
          },
          T * index,
        );
        tl.label(step.label, T * index);
      });
    },
  });

  function reset() {
    setResourceKind("book");
    setFault("none");
    timeline.goToStep(0);
  }

  const cards = [
    ["身份", resource.identity, COLORS.accent, "可定位"],
    [
      "边界",
      missingVersion ? "缺版本与目标" : resource.boundary,
      missingVersion ? COLORS.danger : COLORS.warning,
      missingVersion ? "需补字段" : "已记录",
    ],
    ["可达", "200 · 12 KB", COLORS.success, "已取回"],
    [
      "校验",
      badHash ? "hash 不一致" : "sha256: 7a…91",
      badHash ? COLORS.danger : COLORS.warning,
      badHash ? "重新取回" : "已核对",
    ],
    [
      "探针",
      resource.probe,
      badHash || missingVersion ? COLORS.danger : COLORS.success,
      badHash || missingVersion ? "暂不采信" : resource.artifact,
    ],
  ] as const;

  return (
    <section
      aria-label={`附录专属资源证据链实验；${CONCEPTS.join("；")}`}
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="crc-unit-23"
      data-visual-kind="crc-appendix-resource-evidence-chain"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 CrcAppendixResourcesLab · 资源证据链回放台
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让一条资料记录通向可以复查的产物
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：如果资源缺少版本或校验值，哪一步最先失去采信资格？
          </p>
        </div>
      </header>

      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择资源类别">
          {RESOURCES.map((item) => (
            <ToggleButton
              key={item.id}
              active={resourceKind === item.id}
              onClick={() => setResourceKind(item.id)}
            >
              {item.label}
            </ToggleButton>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" aria-label="注入资源记录故障">
          <ToggleButton
            active={fault === "none"}
            onClick={() => setFault("none")}
          >
            完整记录
          </ToggleButton>
          <ToggleButton
            active={fault === "version"}
            onClick={() => setFault("version")}
          >
            缺版本边界
          </ToggleButton>
          <ToggleButton
            active={fault === "hash"}
            onClick={() => setFault("hash")}
          >
            校验值变化
          </ToggleButton>
        </div>

        <div className="min-w-0 rounded-card border border-border bg-background p-3 sm:p-4">
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label={`资源证据链可视化：${resource.label}从身份、边界、可达性、校验值推进到最小探针；当前${fault === "none" ? "记录完整" : fault === "version" ? "缺少版本边界" : "校验值发生变化"}`}
            className="h-auto w-full"
          >
            <defs>
              <marker
                id="crc-appendix-arrow"
                markerWidth="10"
                markerHeight="10"
                refX="8"
                refY="5"
                orient="auto"
              >
                <path d="M0,0 L10,5 L0,10 z" fill={COLORS.border} />
              </marker>
            </defs>
            <rect
              x="0"
              y="0"
              width={VIEW_W}
              height={VIEW_H}
              rx="12"
              fill="var(--bg)"
            />
            <text
              x="28"
              y="42"
              fontSize="15"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {resource.label} · 资源条目回放
            </text>
            <text x="28" y="68" fontSize="13" fill={COLORS.secondary}>
              固定身份与环境，只观察缺失字段如何阻断最小探针
            </text>
            <g aria-hidden="true" opacity="0" pointerEvents="none">
              {STEPS.map((step, index) => (
                <g
                  key={step.label}
                  ref={(element) => {
                    nodeRefs.current[step.label] = element;
                  }}
                  transform={`translate(${34 + index * 145} 86)`}
                >
                  <rect width="112" height="20" rx="6" fill={COLORS.accent} />
                  <text x="10" y="15" fontSize="11" fill="var(--bg)">
                    T{index} · {step.label}
                  </text>
                </g>
              ))}
            </g>
            {cards.map(([label, value, color, status], index) => (
              <g key={label}>
                <EvidenceCard
                  label={label}
                  value={value}
                  x={22 + index * 148}
                  color={color}
                  status={status}
                />
                {index < cards.length - 1 && (
                  <Arrow x1={158 + index * 148} x2={166 + index * 148} />
                )}
              </g>
            ))}
            <rect
              x="22"
              y="232"
              width="736"
              height="78"
              rx="12"
              fill={missingVersion || badHash ? COLORS.danger : COLORS.success}
              fillOpacity="0.12"
              stroke={
                missingVersion || badHash ? COLORS.danger : COLORS.success
              }
              strokeWidth="2"
            />
            <text
              x="42"
              y="260"
              fontSize="14"
              fontWeight="700"
              fill={missingVersion || badHash ? COLORS.danger : COLORS.success}
            >
              {missingVersion || badHash
                ? "采信暂停：先修复资源记录"
                : "采信通过：可以进入清理重建与回归"}
            </text>
            <text x="42" y="286" fontSize="13" fill={COLORS.secondary}>
              {missingVersion
                ? "没有版本边界，无法判断同一条规则是否适用于当前目标。"
                : badHash
                  ? "校验值变化，先重新取回并比较差异，再运行探针。"
                  : "身份、边界、可达性和内容摘要都可复查，探针产物可以归档。"}
            </text>
            <g transform="translate(22 342)">
              <text
                x="0"
                y="0"
                fontSize="13"
                fontWeight="700"
                fill={COLORS.primary}
              >
                记录字段
              </text>
              <text x="0" y="28" fontSize="13" fill={COLORS.secondary}>
                identity: {resource.identity}
              </text>
              <text x="0" y="52" fontSize="13" fill={COLORS.secondary}>
                boundary: {missingVersion ? "missing" : resource.boundary}
              </text>
              <text x="360" y="28" fontSize="13" fill={COLORS.secondary}>
                retrieved: 2026-08-12 · status: 200
              </text>
              <text x="360" y="52" fontSize="13" fill={COLORS.secondary}>
                checksum: {badHash ? "changed" : "sha256: 7a…91"} · probe:{" "}
                {resource.probe}
              </text>
            </g>
          </svg>
        </div>
        <div
          className="rounded-card border border-border bg-background p-4"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm font-semibold text-primary">{resource.label}</p>
          <p className="mt-1 text-sm leading-6 text-secondary">
            {missingVersion
              ? "先补齐版本、目标和构建边界；哈希正确也不能让不适用的资源变成证据。"
              : badHash
                ? "先重新取回归档并比较内容；校验值变化时，不要直接把旧的探针结果归给新资料。"
                : `当前探针 ${resource.probe} 将产出 ${resource.artifact}，可在清理重建后再次验证。`}
          </p>
        </div>
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="单步回放 identity、version、access、hash 和 probe；重置后可用同一资源类别重新验证记录边界。"
          reset={{
            label: "重置资源证据链",
            ariaLabel: "重置附录专属资源证据链实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
