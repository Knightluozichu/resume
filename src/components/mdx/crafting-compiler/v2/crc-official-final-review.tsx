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

const VIEW_W = 800;
const VIEW_H = 460;
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

type Fault = "none" | "front" | "load" | "runtime";
type Decision = "repair" | "rollback" | "expand";

const CONCEPTS = [
  "第1章 开始制作编译器",
  "第2章 C♭和cbc",
  "第3章 语法分析的概要",
  "第4章 词法分析",
  "第5章 基于JavaCC的解析器描述",
  "第6章 语法分析",
  "第7章 JavaCC的action和抽象语法树",
  "第8章 抽象语法树的生成",
  "第9章 语义分析（1）引用的消解",
  "第10章 语义分析（2）静态类型检查",
  "第11章 中间代码的转换",
  "第12章 x86架构的概要",
  "第13章 x86汇编器编程",
  "第14章 函数和变量",
  "第15章 编译表达式和语句",
  "第16章 分配栈帧",
  "第17章 优化的方法",
  "第18章 生成目标文件",
  "第19章 链接和库",
  "第20章 加载程序",
  "第21章 生成地址无关代码",
  "第22章 扩展阅读",
  "附录",
] as const;

const STAGES: readonly {
  id: string;
  label: string;
  artifact: string;
}[] = [
  { id: "front", label: "前端", artifact: "token · AST · type" },
  { id: "ir", label: "IR", artifact: "control flow" },
  { id: "machine", label: "机器码", artifact: "asm · stack" },
  { id: "elf", label: "ELF", artifact: "section · symbol" },
  { id: "load", label: "加载", artifact: "map · dependency" },
  { id: "runtime", label: "运行", artifact: "exit code" },
] as const;

const STEPS: readonly TeachingStep[] = [
  { label: "baseline", caption: "重建复现基线。" },
  { label: "trace", caption: "沿阶段契约追踪。" },
  { label: "locate", caption: "标出首个偏差。" },
  { label: "decide", caption: "选择工程动作。" },
  { label: "regress", caption: "运行回归矩阵。" },
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

function StageCard({
  stage,
  index,
  fault,
}: {
  stage: (typeof STAGES)[number];
  index: number;
  fault: Fault;
}) {
  const isFault =
    (fault === "front" && index === 0) ||
    (fault === "load" && index === 4) ||
    (fault === "runtime" && index === 5);
  const state = isFault ? "偏差" : index < 4 ? "已记录" : "可复查";
  const color = isFault
    ? COLORS.danger
    : index < 4
      ? COLORS.accent
      : COLORS.success;
  return (
    <g>
      <rect
        x={24 + index * 126}
        y="108"
        width="108"
        height="100"
        rx="12"
        fill={COLORS.elevated}
        stroke={color}
        strokeWidth="2"
      />
      <circle cx={44 + index * 126} cy="130" r="6" fill={color} />
      <text
        x={58 + index * 126}
        y="135"
        fontSize="14"
        fontWeight="700"
        fill={COLORS.primary}
      >
        {stage.label}
      </text>
      <text x={38 + index * 126} y="163" fontSize="12" fill={COLORS.secondary}>
        {stage.artifact}
      </text>
      <text x={38 + index * 126} y="190" fontSize="13" fill={color}>
        {state}
      </text>
    </g>
  );
}

function StageArrow({ index }: { index: number }) {
  return (
    <line
      x1={132 + index * 126}
      y1="158"
      x2={144 + index * 126}
      y2="158"
      stroke={COLORS.border}
      strokeWidth="2"
      markerEnd="url(#crc-final-review-arrow)"
    />
  );
}

/** 全书总复习专属实验：沿阶段契约定位偏差，并把证据转成发布动作。 */
export function CrcOfficialFinalReviewLab() {
  const [fault, setFault] = useState<Fault>("none");
  const [decision, setDecision] = useState<Decision>("repair");
  const stageRefs = useRef<Record<string, SVGGElement | null>>({});
  const faultLabel = useMemo(
    () =>
      fault === "none"
        ? "无故障基线"
        : fault === "front"
          ? "前端产物偏差"
          : fault === "load"
            ? "加载依赖偏差"
            : "运行行为偏差",
    [fault],
  );
  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        const node = stageRefs.current[step.label];
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
    setFault("none");
    setDecision("repair");
    timeline.goToStep(0);
  }

  const actionText =
    decision === "repair"
      ? "修复：保留基线，改动首个偏差所在阶段。"
      : decision === "rollback"
        ? "回滚：恢复上一个可解释提交，保留故障证据。"
        : "扩大：基线与回归矩阵稳定后，再增加目标或工具版本。";
  const outcome = fault === "none" ? "证据链完整" : "等待首个偏差的回归结果";

  return (
    <section
      aria-label={`全书总复习专属端到端发布决策实验；${CONCEPTS.join("；")}`}
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="crc-official-final-review-decision-replay"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 CrcOfficialFinalReviewLab · 端到端发布决策回放台
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            从阶段产物推导下一步，而不是从错误文本猜原因
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：加载失败时，哪一张证据卡能把问题与前端代码区分开？
          </p>
        </div>
      </header>

      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="注入端到端故障">
          <ToggleButton
            active={fault === "none"}
            onClick={() => setFault("none")}
          >
            成功基线
          </ToggleButton>
          <ToggleButton
            active={fault === "front"}
            onClick={() => setFault("front")}
          >
            前端偏差
          </ToggleButton>
          <ToggleButton
            active={fault === "load"}
            onClick={() => setFault("load")}
          >
            加载偏差
          </ToggleButton>
          <ToggleButton
            active={fault === "runtime"}
            onClick={() => setFault("runtime")}
          >
            运行偏差
          </ToggleButton>
        </div>
        <div className="flex flex-wrap gap-2" aria-label="选择发布动作">
          <ToggleButton
            active={decision === "repair"}
            onClick={() => setDecision("repair")}
          >
            修复
          </ToggleButton>
          <ToggleButton
            active={decision === "rollback"}
            onClick={() => setDecision("rollback")}
          >
            回滚
          </ToggleButton>
          <ToggleButton
            active={decision === "expand"}
            onClick={() => setDecision("expand")}
          >
            扩大范围
          </ToggleButton>
        </div>

        <div className="min-w-0 rounded-card border border-border bg-background p-3 sm:p-4">
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label={`全书总复习阶段证据与发布动作可视化；当前${faultLabel}，决定为${decision === "repair" ? "修复" : decision === "rollback" ? "回滚" : "扩大范围"}`}
            className="h-auto w-full"
          >
            <defs>
              <marker
                id="crc-final-review-arrow"
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
              {faultLabel} · token 到进程的证据链
            </text>
            <text x="28" y="68" fontSize="13" fill={COLORS.secondary}>
              只沿阶段契约移动，找到最早不一致的产物
            </text>
            <g aria-hidden="true" opacity="0" pointerEvents="none">
              {STEPS.map((step, index) => (
                <g
                  key={step.label}
                  ref={(element) => {
                    stageRefs.current[step.label] = element;
                  }}
                  transform={`translate(${40 + index * 146} 82)`}
                >
                  <rect width="116" height="22" rx="6" fill={COLORS.accent} />
                  <text x="10" y="16" fontSize="11" fill="var(--bg)">
                    T{index} · {step.label}
                  </text>
                </g>
              ))}
            </g>
            {STAGES.map((stage, index) => (
              <g key={stage.id}>
                <StageCard stage={stage} index={index} fault={fault} />
                {index < STAGES.length - 1 && <StageArrow index={index} />}
              </g>
            ))}
            <rect
              x="24"
              y="244"
              width="752"
              height="78"
              rx="12"
              fill={fault === "none" ? COLORS.success : COLORS.warning}
              fillOpacity="0.12"
              stroke={fault === "none" ? COLORS.success : COLORS.warning}
              strokeWidth="2"
            />
            <text
              x="44"
              y="272"
              fontSize="14"
              fontWeight="700"
              fill={fault === "none" ? COLORS.success : COLORS.warning}
            >
              {outcome}
            </text>
            <text x="44" y="298" fontSize="13" fill={COLORS.secondary}>
              {fault === "front"
                ? "先比较 token、AST 与类型注释；不要把后端输出当成前端通过证据。"
                : fault === "load"
                  ? "先比较程序头、DT_NEEDED、搜索路径和加载日志；源码不必先改。"
                  : fault === "runtime"
                    ? "先对照汇编、目标文件和成功/边界样本，再判断语义还是环境发生变化。"
                    : "所有阶段都有可定位产物，可以运行回归矩阵并评估下一轮范围。"}
            </text>
            <g transform="translate(24 356)">
              <text
                x="0"
                y="0"
                fontSize="13"
                fontWeight="700"
                fill={COLORS.primary}
              >
                当前发布动作
              </text>
              <rect
                x="0"
                y="16"
                width="752"
                height="44"
                rx="9"
                fill={COLORS.elevated}
                stroke={COLORS.border}
              />
              <circle
                cx="20"
                cy="38"
                r="6"
                fill={
                  decision === "repair"
                    ? COLORS.accent
                    : decision === "rollback"
                      ? COLORS.danger
                      : COLORS.success
                }
              />
              <text x="38" y="43" fontSize="13" fill={COLORS.primary}>
                {actionText}
              </text>
            </g>
          </svg>
        </div>
        <div
          className="rounded-card border border-border bg-background p-4"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm font-semibold text-primary">{faultLabel}</p>
          <p className="mt-1 text-sm leading-6 text-secondary">
            {fault === "none"
              ? "基线完整：清理重建后运行成功、边界和故障样本，再决定是否扩大范围。"
              : `已注入${faultLabel}；${actionText}`}
          </p>
        </div>
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="单步回放 baseline、trace、locate、decide 和 regress；重置后以同一实验条件重新选择故障与发布动作。"
          reset={{
            label: "重置总复习实验",
            ariaLabel: "重置全书总复习专属发布决策实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
