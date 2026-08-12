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

const VIEW_W = 760;
const VIEW_H = 420;
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

type View = "grammar" | "decision" | "diagnostic";
type Sample = "call" | "identifier" | "semicolon";
type Fault = "none" | "short" | "ambiguous";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "grammar",
    label: "语法节点",
    detail: "把第5章的三个正式节点放入 token、production、选择和结果证据链。",
  },
  {
    id: "decision",
    label: "EBNF边界",
    detail: "逐个检查序列、可选项、重复项和 expansion 的消费边界。",
  },
  {
    id: "diagnostic",
    label: "前看诊断",
    detail:
      "改变共同前缀或输入完整性，观察 LOOKAHEAD 与 ParseException 的证据。",
  },
] as const;

const SAMPLES: readonly {
  id: Sample;
  label: string;
  tokens: string;
  result: string;
}[] = [
  {
    id: "call",
    label: "调用",
    tokens: "IDENTIFIER LPAREN IDENTIFIER RPAREN",
    result: "Call(name, argument)",
  },
  {
    id: "identifier",
    label: "标识符",
    tokens: "IDENTIFIER EOF",
    result: "Name(identifier)",
  },
  {
    id: "semicolon",
    label: "分号",
    tokens: "IDENTIFIER SEMICOLON EOF",
    result: "Statement(name)",
  },
] as const;

const STEPS: readonly TeachingStep[] = [
  {
    label: "tokens",
    caption: "固定 token 序列、源位置和 EOF，先不猜分支。",
  },
  {
    label: "production",
    caption: "进入 production，列出可用的 expansion 和返回节点。",
  },
  {
    label: "lookahead",
    caption: "向前读取足以区分分支的 token，并保存窗口内容。",
  },
  {
    label: "choice",
    caption: "选择一条 expansion，记录共同前缀后的差异 token。",
  },
  {
    label: "result",
    caption: "交付结构或 ParseException，同时保存跨度和退出码。",
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const CONCEPTS = [
  {
    label: "第5章 基于JavaCC的解析器描述",
    detail: "grammar → parser",
    color: COLORS.primary,
  },
  {
    label: "5.1 基于EBNF语法的描述",
    detail: "边界 → expansion",
    color: COLORS.accent,
  },
  {
    label: "5.2 语法的二义性和token的超前扫描",
    detail: "前缀 → 选择",
    color: COLORS.warning,
  },
] as const;

function ViewButton({
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

function Stage({
  label,
  refCallback,
  status,
  x,
}: {
  label: string;
  refCallback?: (element: SVGGElement | null) => void;
  status: string;
  x: number;
}) {
  return (
    <g ref={refCallback}>
      <rect
        x={x}
        y="104"
        width="132"
        height="80"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x={x + 16}
        y="132"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        {label}
      </text>
      <text x={x + 16} y="162" fontSize="13" fill={COLORS.secondary}>
        {status}
      </text>
    </g>
  );
}

function GrammarView({
  activeStep,
  sample,
}: {
  activeStep: number;
  sample: Sample;
}) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        三个正式节点，共享一条解析证据链
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        先确认 token，再进入 production；选择和结果都要能被回放。
      </text>
      {CONCEPTS.map((concept, index) => {
        const x = 28 + index * 236;
        const active = activeStep >= Math.min(index + 1, 4);
        return (
          <g key={concept.label}>
            <rect
              x={x}
              y="98"
              width="214"
              height="112"
              rx="12"
              fill={concept.color}
              fillOpacity={active ? 0.14 : 0.04}
              stroke={active ? concept.color : COLORS.border}
              strokeWidth={active ? 2.5 : 1.5}
            />
            <circle
              cx={x + 24}
              cy="126"
              r="8"
              fill={active ? concept.color : COLORS.border}
            />
            <text
              x={x + 46}
              y="130"
              fontSize="13"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {concept.label}
            </text>
            <text x={x + 46} y="160" fontSize="13" fill={COLORS.secondary}>
              {concept.detail}
            </text>
            <text x={x + 46} y="188" fontSize="13" fill={COLORS.accent}>
              {active ? "已进入回放" : "等待 token"}
            </text>
          </g>
        );
      })}
      <rect
        x="28"
        y="246"
        width="704"
        height="76"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="278" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        当前样本：{selected.label}
      </text>
      <text x="52" y="304" fontSize="13" fill={COLORS.secondary}>
        {selected.tokens} → {selected.result}
      </text>
      <text x="28" y="372" fontSize="13" fill={COLORS.accent}>
        先预测：缺少 production 时，哪一段 token 解释会断开？
      </text>
    </g>
  );
}

function DecisionView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const lookahead = fault === "short" ? "IDENTIFIER" : "IDENTIFIER → LPAREN";
  const decision =
    fault === "short"
      ? "LOOKAHEAD(1) 不足：两个 expansion 仍共享首 token"
      : fault === "ambiguous"
        ? "二义性未消解：共同前缀后没有可见差异"
        : "LOOKAHEAD(2) 区分调用与其他标识符路径";
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        EBNF 边界：从 token 消费到 expansion
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        可选项和重复项必须有结束条件，前看窗口必须有选择证据。
      </text>
      <rect
        x="28"
        y="96"
        width="704"
        height="54"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="130" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        输入 token：{selected.tokens}
      </text>
      <text
        x="28"
        y="186"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.secondary}
      >
        expansion A：IDENTIFIER LPAREN [ arguments ] RPAREN
      </text>
      <text
        x="28"
        y="220"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.secondary}
      >
        expansion B：IDENTIFIER EOF
      </text>
      <line
        x1="386"
        y1="202"
        x2="468"
        y2="202"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#crc-javacc-parser-arrow)"
      />
      <rect
        x="484"
        y="168"
        width="248"
        height="76"
        rx="12"
        fill={COLORS.accent}
        fillOpacity="0.12"
        stroke={COLORS.accent}
        strokeWidth="2"
      />
      <text
        x="506"
        y="198"
        fontSize="14"
        fontWeight="700"
        fill={COLORS.primary}
      >
        LOOKAHEAD 窗口
      </text>
      <text x="506" y="224" fontSize="13" fill={COLORS.secondary}>
        {lookahead}
      </text>
      <rect
        x="28"
        y="278"
        width="704"
        height="66"
        rx="12"
        fill={COLORS.elevated}
        stroke={fault === "none" ? COLORS.success : COLORS.warning}
        strokeWidth="2"
      />
      <text
        x="52"
        y="306"
        fontSize="14"
        fontWeight="700"
        fill={fault === "none" ? COLORS.success : COLORS.warning}
      >
        当前判断：{decision}
      </text>
      <text x="52" y="328" fontSize="13" fill={COLORS.secondary}>
        保存窗口与剩余 token，才能解释选择，而不是只记录最终节点。
      </text>
      <text x="28" y="382" fontSize="13" fill={COLORS.accent}>
        动手试：把 LPAREN 换成 ASSIGN，比较 LOOKAHEAD(2) 是否仍能区分。
      </text>
    </g>
  );
}

function DiagnosticView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const result =
    fault === "short"
      ? "需要继续查看差异 token"
      : fault === "ambiguous"
        ? "两个 expansion 都可行"
        : selected.id === "semicolon"
          ? "Statement(name)；跨度 [0, 19)"
          : "Call(name, argument)；跨度 [0, 31)";
  const error =
    fault === "none" ? "无 ParseException" : "ParseException @ token 2";
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        前看诊断：把选择理由和失败位置一起保存
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        正常输入交付结构；非法或未决输入停在当前 production，不生成伪节点。
      </text>
      <rect
        x="28"
        y="98"
        width="324"
        height="210"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="132" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        LOOKAHEAD 记录
      </text>
      <text x="52" y="168" fontSize="13" fill={COLORS.secondary}>
        production：Primary
      </text>
      <text x="52" y="198" fontSize="13" fill={COLORS.secondary}>
        已消费：IDENTIFIER
      </text>
      <text x="52" y="228" fontSize="13" fill={COLORS.secondary}>
        下一枚：{selected.tokens.split(" ")[1] ?? "EOF"}
      </text>
      <text x="52" y="268" fontSize="13" fill={COLORS.accent}>
        样本：{selected.label}
      </text>
      <rect
        x="382"
        y="98"
        width="350"
        height="210"
        rx="12"
        fill={COLORS.elevated}
        stroke={fault === "none" ? COLORS.success : COLORS.warning}
        strokeWidth="2"
      />
      <text
        x="406"
        y="132"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        运行结果
      </text>
      <text
        x="406"
        y="172"
        fontSize="13"
        fill={fault === "none" ? COLORS.success : COLORS.warning}
      >
        {result}
      </text>
      <text x="406" y="214" fontSize="13" fill={COLORS.secondary}>
        {error}
      </text>
      <text x="406" y="250" fontSize="13" fill={COLORS.secondary}>
        保留期望 token、源位置和退出码
      </text>
      <text x="406" y="278" fontSize="13" fill={COLORS.secondary}>
        清理生成目录后重放，结果应保持一致
      </text>
      <text x="28" y="372" fontSize="13" fill={COLORS.accent}>
        先猜一猜：错误位置提前，是否意味着 grammar 边界变得更可解释？
      </text>
    </g>
  );
}

/** 第5章专属实验：回放 JavaCC 的 EBNF 边界、LOOKAHEAD 选择与诊断证据。 */
export function CrcJavaccParserLab() {
  const [view, setView] = useState<View>("grammar");
  const [sample, setSample] = useState<Sample>("call");
  const [fault, setFault] = useState<Fault>("none");
  const nodeRefs = useRef<Record<string, SVGGElement | null>>({});
  const current = useMemo(
    () => VIEWS.find((item) => item.id === view) ?? VIEWS[0],
    [view],
  );
  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        const node = nodeRefs.current[step.label];
        if (!node) return;
        tl.add(
          node,
          {
            opacity: [0.36, 1],
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
    setView("grammar");
    setSample("call");
    setFault("none");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label="第5章基于JavaCC的解析器描述专属 EBNF、LOOKAHEAD 与 ParseException 回放实验；第5章 基于JavaCC的解析器描述；5.1 基于EBNF语法的描述；5.2 语法的二义性和token的超前扫描"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="crc-unit-05"
      data-visual-kind="crc-javacc-parser-lookahead-replay"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 CrcJavaccParserLab · EBNF、前看与诊断
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让每次 expansion 选择都留下可复查证据
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：共同前缀增加一枚差异 token 后，先改变选择窗口还是
            ParseException 位置？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div
          className="flex flex-wrap gap-2"
          aria-label="选择 JavaCC 解析实验视角"
        >
          {VIEWS.map((item) => (
            <ViewButton
              key={item.id}
              active={view === item.id}
              onClick={() => setView(item.id)}
            >
              {item.label}
            </ViewButton>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" aria-label="选择解析器输入样本">
          {SAMPLES.map((item) => (
            <ViewButton
              key={item.id}
              active={sample === item.id}
              onClick={() => setSample(item.id)}
            >
              {item.label}
            </ViewButton>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" aria-label="选择解析器故障模式">
          <ViewButton
            active={fault === "none"}
            onClick={() => setFault("none")}
          >
            正常选择
          </ViewButton>
          <ViewButton
            active={fault === "short"}
            onClick={() => setFault("short")}
          >
            前看过短
          </ViewButton>
          <ViewButton
            active={fault === "ambiguous"}
            onClick={() => setFault("ambiguous")}
          >
            规则二义
          </ViewButton>
        </div>
        <div className="min-w-0 rounded-card border border-border bg-background p-3 sm:p-4">
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label={`${current.label}可视化：${current.detail}`}
            className="h-auto w-full"
          >
            <defs>
              <marker
                id="crc-javacc-parser-arrow"
                markerWidth="10"
                markerHeight="10"
                refX="8"
                refY="5"
                orient="auto"
              >
                <path d="M0,0 L10,5 L0,10 z" fill={COLORS.accent} />
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
            <g aria-hidden="true" opacity="0" pointerEvents="none">
              <Stage
                label="token"
                refCallback={(element) => {
                  nodeRefs.current.tokens = element;
                }}
                status="输入与 EOF"
                x={28}
              />
              <Stage
                label="production"
                refCallback={(element) => {
                  nodeRefs.current.production = element;
                }}
                status="规则入口"
                x={174}
              />
              <Stage
                label="LOOKAHEAD"
                refCallback={(element) => {
                  nodeRefs.current.lookahead = element;
                }}
                status="前缀窗口"
                x={320}
              />
              <Stage
                label="expansion"
                refCallback={(element) => {
                  nodeRefs.current.choice = element;
                }}
                status="路径选择"
                x={466}
              />
              <Stage
                label="结果"
                refCallback={(element) => {
                  nodeRefs.current.result = element;
                }}
                status="节点或诊断"
                x={612}
              />
            </g>
            {view === "grammar" ? (
              <GrammarView activeStep={timeline.currentStep} sample={sample} />
            ) : view === "decision" ? (
              <DecisionView fault={fault} sample={sample} />
            ) : (
              <DiagnosticView fault={fault} sample={sample} />
            )}
          </svg>
        </div>
        <div
          className="rounded-card border border-border bg-background p-4"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm font-semibold text-primary">{current.label}</p>
          <p className="mt-1 text-sm leading-6 text-secondary">
            {current.detail}
          </p>
        </div>
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="单步查看 token、production、LOOKAHEAD、expansion 和结果；重置后用相同样本重放，确认窗口与诊断没有被旧状态污染。"
          reset={{
            label: "重置 JavaCC 解析实验",
            ariaLabel: "重置 JavaCC 解析器专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
