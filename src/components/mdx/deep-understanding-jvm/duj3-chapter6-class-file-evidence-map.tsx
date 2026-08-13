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
    key: "header",
    label: "头部",
    detail: "魔数 / 版本",
    evidence: "先确认输入身份",
  },
  {
    key: "pool",
    label: "常量池",
    detail: "标签 / 索引 / 描述符",
    evidence: "还原符号关系",
  },
  {
    key: "members",
    label: "成员表",
    detail: "类 / 字段 / 方法",
    evidence: "核对公开契约",
  },
  {
    key: "attributes",
    label: "属性表",
    detail: "签名 / 调试 / 异常",
    evidence: "不要丢扩展信息",
  },
  {
    key: "code",
    label: "Code",
    detail: "局部变量 / 栈 / 指令",
    evidence: "追踪执行形状",
  },
  {
    key: "replay",
    label: "重放",
    detail: "哈希 / 工具 / 运行时",
    evidence: "差异可交接",
  },
] as const;

const LAYERS = [
  {
    key: "header",
    label: "头部",
    value: "magic + version",
    signal: "魔数 · 主版本号",
  },
  {
    key: "pool",
    label: "常量池",
    value: "cp_info[]",
    signal: "标签 · 索引 · 描述符",
  },
  {
    key: "members",
    label: "成员表",
    value: "fields/methods",
    signal: "访问标志 · 名称",
  },
  {
    key: "attributes",
    label: "属性表",
    value: "attributes[]",
    signal: "签名 · 注解 · 异常表",
  },
  {
    key: "code",
    label: "Code 属性",
    value: "locals/stack",
    signal: "偏移 · 控制流 · 栈形状",
  },
] as const;

const OFFICIAL_NODES = [
  "第6章 类文件结构",
  "6.1 概述",
  "6.2 无关性的基石",
  "6.3 Class类文件的结构",
  "6.3.1 魔数与Class文件的版本",
  "6.3.2 常量池",
  "6.3.3 访问标志",
  "6.3.4 类索引、父类索引与接口索引集合",
  "6.3.5 字段表集合",
  "6.3.6 方法表集合",
  "6.3.7 属性表集合",
  "6.4 字节码指令简介",
  "6.4.1 字节码与数据类型",
  "6.4.2 加载和存储指令",
  "6.4.3 运算指令",
  "6.4.4 类型转换指令",
  "6.4.5 对象创建与访问指令",
  "6.4.6 操作数栈管理指令",
  "6.4.7 控制转移指令",
  "6.4.8 方法调用和返回指令",
  "6.4.9 异常处理指令",
  "6.4.10 同步指令",
  "6.5 公有设计，私有实现",
  "6.6 Class文件结构的发展",
  "6.7 本章小结",
] as const;

type Lens = "structure" | "instruction" | "evolution";
const LENSES: Record<Lens, { label: string; title: string; note: string }> = {
  structure: {
    label: "结构",
    title: "先按字段边界还原输入",
    note: "从魔数和版本走到属性与 Code；每个索引都要追到常量池语义。",
  },
  instruction: {
    label: "指令",
    title: "用栈形状解释 Code",
    note: "局部变量、操作数栈、分支、调用和异常表共同决定字节码的可验证路径。",
  },
  evolution: {
    label: "演进",
    title: "差异必须带版本范围",
    note: "属性、常量池标签和工具输出会随 JDK 演进；规范、工具和实现分别记录。",
  },
};

const STEPS: readonly TeachingStep[] = STAGES.map((stage) => ({
  label: stage.key,
  caption: `${stage.label}：${stage.detail}`,
}));

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function Duj3Chapter6ClassFileEvidenceMap() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `duj3-chapter6-class-file-arrow-${instanceId}`;
  const [lens, setLens] = useState<Lens>("structure");
  const [layer, setLayer] = useState<(typeof LAYERS)[number]["key"]>("header");
  const [faultInjected, setFaultInjected] = useState(false);
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
              translateY: [10, 0],
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
  const selectedLayer = LAYERS.find((item) => item.key === layer) ?? LAYERS[0];
  const lensState = LENSES[lens];
  const statusColor = faultInjected ? COLORS.warning : COLORS.success;

  function reset() {
    setLens("structure");
    setLayer("header");
    setFaultInjected(false);
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="duj3-chapter6-class-file-evidence"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DUJ3 · 第 6 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              Class 文件的分层验收台
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              沿头部、常量池、成员、属性、Code
              和重放移动；高亮只表示字节结构的观察顺序，不把文件大小或指令数伪装成质量分数。
            </p>
          </div>
          <button
            type="button"
            aria-label="重置 Class 文件证据图"
            onClick={reset}
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
          >
            重置
          </button>
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <div
            className="flex flex-wrap gap-2"
            aria-label="选择 Class 文件证据镜头"
          >
            <span className="self-center text-xs text-secondary">镜头：</span>
            {(Object.entries(LENSES) as [Lens, (typeof LENSES)[Lens]][]).map(
              ([value, item]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={lens === value}
                  onClick={() => setLens(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
                    lens === value
                      ? "border-accent text-accent"
                      : "border-border text-secondary hover:border-accent hover:text-primary"
                  }`}
                >
                  {item.label}
                </button>
              ),
            )}
          </div>
          <button
            type="button"
            aria-pressed={faultInjected}
            onClick={() => setFaultInjected((value) => !value)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
              faultInjected
                ? "border-warning text-warning"
                : "border-border text-secondary hover:border-warning hover:text-warning"
            }`}
          >
            {faultInjected ? "恢复基线" : "注入结构缺口"}
          </button>
        </div>

        <svg
          aria-label="Class 文件的分层验收台"
          className="h-auto w-full"
          role="img"
          viewBox="0 0 700 1040"
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
            当前关键帧 · {activeStage.label}
          </text>
          <text x="54" y="50" fontSize="12" fill={COLORS.secondary}>
            {activeStage.detail} · {activeStage.evidence}
          </text>

          {STAGES.map((stage, index) => {
            const y = 72 + index * 78;
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
                    y1={y + 58}
                    x2="350"
                    y2={y + 74}
                    stroke={COLORS.border}
                    strokeWidth="2"
                    markerEnd={`url(#${arrowId})`}
                  />
                ) : null}
                <rect
                  x="54"
                  y={y}
                  width="592"
                  height="58"
                  rx="10"
                  fill={selected ? COLORS.elevated : COLORS.background}
                  stroke={selected ? COLORS.accent : COLORS.border}
                  strokeWidth={selected ? 2 : 1}
                />
                <circle
                  cx="88"
                  cy={y + 29}
                  r="14"
                  fill={selected ? COLORS.background : COLORS.accent}
                />
                <text
                  x="88"
                  y={y + 34}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={selected ? COLORS.accent : COLORS.background}
                >
                  {index + 1}
                </text>
                <text
                  x="118"
                  y={y + 25}
                  fontSize="13"
                  fontWeight="700"
                  fill={selected ? COLORS.accent : COLORS.primary}
                >
                  {stage.label}
                </text>
                <text x="118" y={y + 44} fontSize="12" fill={COLORS.secondary}>
                  {stage.detail} · {stage.evidence}
                </text>
                <circle
                  cx="614"
                  cy={y + 29}
                  r="5"
                  fill={selected ? COLORS.success : COLORS.border}
                />
              </g>
            );
          })}

          <text
            x="54"
            y="570"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.primary}
          >
            当前结构层 · {selectedLayer.label} ({selectedLayer.value})
          </text>
          {LAYERS.map((item, index) => {
            const y = 594 + index * 42;
            const selected = layer === item.key;
            return (
              <g key={item.key}>
                <rect
                  x="54"
                  y={y}
                  width="592"
                  height="32"
                  rx="8"
                  fill={selected ? COLORS.elevated : COLORS.background}
                  stroke={selected ? COLORS.accent : COLORS.border}
                  strokeWidth={selected ? 2 : 1}
                />
                <text
                  x="72"
                  y={y + 21}
                  fontSize="12"
                  fontWeight="700"
                  fill={selected ? COLORS.accent : COLORS.primary}
                >
                  {item.label} · {item.value}
                </text>
                <text x="274" y={y + 21} fontSize="12" fill={COLORS.secondary}>
                  证据：{item.signal}
                </text>
              </g>
            );
          })}

          <rect
            x="54"
            y="850"
            width="592"
            height="142"
            rx="10"
            fill={COLORS.background}
            stroke={statusColor}
            strokeWidth="1.5"
          />
          <text
            x="76"
            y="880"
            fontSize="13"
            fontWeight="700"
            fill={statusColor}
          >
            {faultInjected ? "结构缺口" : "当前验收镜头"} · {lensState.label}
          </text>
          <text
            x="76"
            y="910"
            fontSize="13"
            fontWeight="700"
            fill={COLORS.primary}
          >
            {faultInjected
              ? "索引或偏移不一致：保留原始文件并回滚"
              : lensState.title}
          </text>
          <text x="76" y="940" fontSize="12" fill={COLORS.secondary}>
            {faultInjected
              ? "不要只改一个数字；同时保存常量池引用、分支目标、属性长度、stderr 和 Class 哈希。"
              : lensState.note}
          </text>
          <text x="76" y="970" fontSize="12" fill={COLORS.secondary}>
            当前层：{selectedLayer.label} · 下一份记录：{activeStage.detail}
          </text>
        </svg>

        <div
          className="mt-4 grid gap-2 sm:grid-cols-2"
          aria-label="本章 25 个正式目录节点"
        >
          {OFFICIAL_NODES.map((node, index) => (
            <div
              key={node}
              className="flex min-h-11 items-start gap-2 rounded-control border border-border px-3 py-2 text-xs text-secondary"
            >
              <span className="shrink-0 font-medium text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{node}</span>
            </div>
          ))}
        </div>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先固定源码、编译选项和 Class 哈希，再从头部追到 Code；结构差异必须能回到具体证据。"
          reset={{
            label: "重置 Class 文件证据链",
            ariaLabel: "重置 Class 文件证据链",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        章节地图：25 个正式目录节点接入“头部—常量池—成员—属性—Code—重放”结构链。
      </figcaption>
    </figure>
  );
}
