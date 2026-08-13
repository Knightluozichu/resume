"use client";

import { useId, useRef, useState } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

const COLORS = {
  background: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

const STAGES = [
  {
    key: "source",
    label: "归档",
    detail: "source + hash",
    evidence: "锁定历史输入",
  },
  {
    key: "host",
    label: "主机",
    detail: "Windows + isolation",
    evidence: "记录边界",
  },
  {
    key: "toolchain",
    label: "工具链",
    detail: "bootstrap JDK + compiler",
    evidence: "保存版本",
  },
  {
    key: "configure",
    label: "配置",
    detail: "configure + variables",
    evidence: "保存参数",
  },
  {
    key: "build",
    label: "构建",
    detail: "make images",
    evidence: "保留日志",
  },
  {
    key: "verify",
    label: "验收",
    detail: "hash + fresh replay",
    evidence: "清理交付",
  },
] as const;

const BOUNDARIES = [
  {
    key: "source",
    label: "输入边界",
    value: "archive + commit",
    signal: "归档哈希、补丁、来源 URL",
  },
  {
    key: "host",
    label: "主机边界",
    value: "Windows + isolated workspace",
    signal: "OS、权限、路径、磁盘",
  },
  {
    key: "toolchain",
    label: "工具链边界",
    value: "bootstrap JDK + compiler",
    signal: "版本、供应商、环境变量",
  },
  {
    key: "artifact",
    label: "产物边界",
    value: "images + logs",
    signal: "退出码、文件清单、校验和",
  },
  {
    key: "cleanup",
    label: "清理边界",
    value: "fresh replay + retention",
    signal: "新目录、失败原文、保留策略",
  },
] as const;

const STEPS: readonly TeachingStep[] = STAGES.map((stage) => ({
  label: stage.key,
  caption: `${stage.label}：${stage.detail}`,
}));

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

type HostMode = "windows" | "isolated";

export function Duj3AppendixABuildOpenJdk6EvidenceMap() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `duj3-appendix-a-build-openjdk6-arrow-${instanceId}`;
  const [boundary, setBoundary] =
    useState<(typeof BOUNDARIES)[number]["key"]>("source");
  const [hostMode, setHostMode] = useState<HostMode>("windows");
  const [failureInjected, setFailureInjected] = useState(false);
  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STAGES.forEach((stage, index) => {
        const element = stageRefs.current[index];
        if (element) {
          tl.add(
            element,
            {
              opacity: [0.18, 1],
              translateX: [-12, 0],
              duration: TEACHING_BEAT_MS,
              ease: "out(3)",
            },
            index * TEACHING_BEAT_MS,
          );
        }
        tl.label(stage.key, index * TEACHING_BEAT_MS);
      });
    },
  });

  const activeStage = STAGES[timeline.currentStep] ?? STAGES[0];
  const selectedBoundary =
    BOUNDARIES.find((item) => item.key === boundary) ?? BOUNDARIES[0];
  const statusColor = failureInjected ? COLORS.warning : COLORS.success;
  const hostDescription =
    hostMode === "windows"
      ? "Windows 主机：先记录权限、路径和磁盘"
      : "隔离工作区：主机只提供可审计边界";

  function reset() {
    setBoundary("source");
    setHostMode("windows");
    setFailureInjected(false);
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="duj3-appendix-a-build-openjdk6-evidence"
      data-unit-id="duj3-appendix-a-build-openjdk6"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DUJ3 · 附录 A
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              OpenJDK 6 历史构建证据图
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              把“能否构建”拆成输入、主机、工具链、配置、产物和重放六个可验收阶段；历史版本不与现代
              JDK 默认值混写。
            </p>
          </div>
          <button
            type="button"
            aria-label="重置 OpenJDK 6 历史构建证据图"
            onClick={reset}
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
          >
            重置
          </button>
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="flex flex-wrap gap-2" aria-label="选择构建边界">
            <span className="self-center text-xs text-secondary">边界：</span>
            {BOUNDARIES.map((item) => (
              <button
                key={item.key}
                type="button"
                aria-pressed={boundary === item.key}
                onClick={() => setBoundary(item.key)}
                className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
                  boundary === item.key
                    ? "border-accent text-accent"
                    : "border-border text-secondary hover:border-accent hover:text-primary"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-pressed={failureInjected}
            onClick={() => setFailureInjected((value) => !value)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
              failureInjected
                ? "border-warning text-warning"
                : "border-border text-secondary hover:border-warning hover:text-warning"
            }`}
          >
            {failureInjected ? "恢复输入合同" : "注入工具链故障"}
          </button>
        </div>

        <div
          className="mb-4 grid gap-2 sm:grid-cols-2"
          aria-label="选择运行边界"
        >
          <button
            type="button"
            aria-pressed={hostMode === "windows"}
            onClick={() => setHostMode("windows")}
            className={`min-h-11 rounded-control border px-3 py-2 text-left text-xs transition-colors ${
              hostMode === "windows"
                ? "border-accent text-accent"
                : "border-border text-secondary hover:border-accent hover:text-primary"
            }`}
          >
            Windows 主机：记录原生路径与权限
          </button>
          <button
            type="button"
            aria-pressed={hostMode === "isolated"}
            onClick={() => setHostMode("isolated")}
            className={`min-h-11 rounded-control border px-3 py-2 text-left text-xs transition-colors ${
              hostMode === "isolated"
                ? "border-accent text-accent"
                : "border-border text-secondary hover:border-accent hover:text-primary"
            }`}
          >
            隔离工作区：保存镜像与挂载清单
          </button>
        </div>

        <svg
          aria-label="OpenJDK 6 历史构建证据图：源码归档经过 Windows 主机与隔离边界、引导 JDK 和编译器、配置、构建、产物校验与全新工作区重放；支持边界切换、主机边界切换、工具链故障注入、播放、暂停、单步和进度拖动。"
          className="h-auto w-full"
          role="img"
          viewBox="0 0 700 1160"
        >
          <defs>
            <marker
              id={arrowId}
              markerHeight="8"
              markerWidth="8"
              orient="auto"
              refX="6"
              refY="4"
              viewBox="0 0 8 8"
            >
              <path d="M0 0 L8 4 L0 8 Z" fill={COLORS.border} />
            </marker>
          </defs>

          <text
            x="54"
            y="28"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.primary}
          >
            当前阶段 · {activeStage.label}
          </text>
          <text x="54" y="50" fontSize="12" fill={COLORS.secondary}>
            {activeStage.detail} · {activeStage.evidence} · {hostDescription}
          </text>

          {STAGES.map((stage, index) => {
            const y = 72 + index * 58;
            const selected = index === timeline.currentStep;
            return (
              <g
                key={stage.key}
                ref={(element) => {
                  stageRefs.current[index] = element;
                }}
              >
                {index < STAGES.length - 1 ? (
                  <line
                    x1="350"
                    y1={y + 44}
                    x2="350"
                    y2={y + 56}
                    stroke={COLORS.border}
                    strokeWidth="2"
                    markerEnd={`url(#${arrowId})`}
                  />
                ) : null}
                <rect
                  x="54"
                  y={y}
                  width="592"
                  height="44"
                  rx="10"
                  fill={selected ? COLORS.elevated : COLORS.background}
                  stroke={selected ? COLORS.accent : COLORS.border}
                  strokeWidth={selected ? 2 : 1}
                />
                <circle
                  cx="88"
                  cy={y + 22}
                  r="13"
                  fill={selected ? COLORS.background : COLORS.accent}
                />
                <text
                  x="88"
                  y={y + 27}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={selected ? COLORS.accent : COLORS.background}
                >
                  {index + 1}
                </text>
                <text
                  x="118"
                  y={y + 19}
                  fontSize="13"
                  fontWeight="700"
                  fill={selected ? COLORS.accent : COLORS.primary}
                >
                  {stage.label}
                </text>
                <text x="118" y={y + 35} fontSize="12" fill={COLORS.secondary}>
                  {stage.detail} · {stage.evidence}
                </text>
                <circle
                  cx="614"
                  cy={y + 22}
                  r="5"
                  fill={selected ? COLORS.success : COLORS.border}
                />
              </g>
            );
          })}

          <text
            x="54"
            y="436"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.primary}
          >
            当前证据边界 · {selectedBoundary.label} ({selectedBoundary.value})
          </text>
          {BOUNDARIES.map((item, index) => {
            const y = 460 + index * 38;
            const selected = boundary === item.key;
            return (
              <g key={item.key}>
                <rect
                  x="54"
                  y={y}
                  width="592"
                  height="29"
                  rx="8"
                  fill={selected ? COLORS.elevated : COLORS.background}
                  stroke={selected ? COLORS.accent : COLORS.border}
                  strokeWidth={selected ? 2 : 1}
                />
                <text
                  x="72"
                  y={y + 19}
                  fontSize="12"
                  fontWeight="700"
                  fill={selected ? COLORS.accent : COLORS.primary}
                >
                  {item.label} · {item.value}
                </text>
                <text x="382" y={y + 19} fontSize="12" fill={COLORS.secondary}>
                  证据：{item.signal}
                </text>
              </g>
            );
          })}

          <rect
            x="54"
            y="672"
            width="592"
            height="154"
            rx="10"
            fill={COLORS.background}
            stroke={statusColor}
            strokeWidth="1.5"
          />
          <text
            x="76"
            y="702"
            fontSize="13"
            fontWeight="700"
            fill={statusColor}
          >
            {failureInjected ? "失败模式" : "当前构建合同"} · {hostMode}
          </text>
          <text
            x="76"
            y="732"
            fontSize="13"
            fontWeight="700"
            fill={COLORS.primary}
          >
            {failureInjected
              ? "工具链不匹配：先保存失败原文，再换隔离输入"
              : "历史输入可追溯，产物可校验，失败可重放"}
          </text>
          <text x="76" y="762" fontSize="12" fill={COLORS.secondary}>
            {failureInjected
              ? "记录 bootstrap JDK、编译器、环境变量、命令、退出码与完整日志；不要用现代工具悄悄覆盖失败。"
              : "归档哈希、主机边界、工具链版本、构建日志、产物清单和清理策略必须进入同一份档案。"}
          </text>
          <text x="76" y="792" fontSize="12" fill={COLORS.secondary}>
            当前边界：{selectedBoundary.label} · 下一份记录：
            {activeStage.evidence}
          </text>

          <line
            x1="54"
            y1="854"
            x2="646"
            y2="854"
            stroke={COLORS.border}
            strokeDasharray="5 4"
          />
          <text x="54" y="884" fontSize="12" fill={COLORS.secondary}>
            结论格式：输入哈希 · 工具链 · 构建日志 · 产物校验 · 全新工作区重放
          </text>
          <text x="54" y="910" fontSize="12" fill={COLORS.secondary}>
            未测量的历史默认值、厂商差异与现代替代路径保留为 unknowns。
          </text>
          <text x="54" y="948" fontSize="12" fill={COLORS.accent}>
            正式节点：1 个 · 当前：附录A 在Windows系统下编译OpenJDK 6
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先锁定历史输入与工具链，再构建和校验；失败时保存原文，用全新工作区重放。"
          reset={{
            label: "重置历史构建证据链",
            ariaLabel: "重置历史构建证据链",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        专属证据地图：附录 A 的 1
        个正式节点接入“归档—主机—工具链—构建—验收”状态链。
      </figcaption>
    </figure>
  );
}
