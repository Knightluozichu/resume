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

type View = "contract" | "architecture" | "probe";
type Construct = "literal" | "variable" | "call";
type Fault = "none" | "unsupported" | "mismatch";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "contract",
    label: "语言合同",
    detail: "把构造、允许条件和拒绝条件放进一张可执行卡片。",
  },
  {
    id: "architecture",
    label: "cbc 构成",
    detail: "沿扫描、解析、AST、语义、IR 和后端观察责任交接。",
  },
  {
    id: "probe",
    label: "构造探针",
    detail: "注入不支持或参数不匹配输入，复核诊断和下游产物。",
  },
];

const CONSTRUCTS: readonly {
  id: Construct;
  label: string;
  example: string;
  contract: string;
}[] = [
  {
    id: "literal",
    label: "常量表达式",
    example: "return 2 + 5;",
    contract: "值与运算符组成可求值结构",
  },
  {
    id: "variable",
    label: "局部变量",
    example: "int n = 7; return n;",
    contract: "名称、声明和使用保持绑定",
  },
  {
    id: "call",
    label: "函数调用",
    example: "return add(2, 5);",
    contract: "参数与返回信息匹配",
  },
];

const STEPS: readonly TeachingStep[] = [
  {
    label: "contract",
    caption: "先列出 C♭ 构造允许什么，以及拒绝时应报告哪一条规则。",
  },
  {
    label: "parse",
    caption: "观察 token 如何形成 AST，确认结构阶段交付可消费的树。",
  },
  {
    label: "semantic",
    caption: "检查名称、类型、参数和返回信息，判断责任是否停在语义层。",
  },
  {
    label: "emit",
    caption: "只有合同通过后才进入 IR 和后端，比较下游产物是否与构造一致。",
  },
  {
    label: "replay",
    caption: "清理旧状态，用相同输入重放并比较阶段、诊断和退出码。",
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const ARCHITECTURE_NODES = [
  { label: "扫描", detail: "字符 → token", color: COLORS.primary },
  { label: "解析", detail: "token → AST", color: COLORS.accent },
  { label: "语义", detail: "名称与类型", color: COLORS.warning },
  { label: "IR", detail: "结构 → 降低", color: COLORS.warning },
  { label: "后端", detail: "汇编 / 目标", color: COLORS.success },
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
  active,
  label,
  refCallback,
  status,
  x,
  y,
}: {
  active: boolean;
  label: string;
  refCallback?: (element: SVGGElement | null) => void;
  status: string;
  x: number;
  y: number;
}) {
  return (
    <g ref={refCallback} opacity={active ? 1 : 0.36}>
      <rect
        x={x}
        y={y}
        width="132"
        height="80"
        rx="12"
        fill={COLORS.elevated}
        stroke={active ? COLORS.accent : COLORS.border}
        strokeWidth="2"
      />
      <text
        x={x + 16}
        y={y + 27}
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        {label}
      </text>
      <text x={x + 16} y={y + 56} fontSize="13" fill={COLORS.secondary}>
        {status}
      </text>
    </g>
  );
}

function ContractView({
  activeStep,
  construct,
  fault,
}: {
  activeStep: number;
  construct: Construct;
  fault: Fault;
}) {
  const selected =
    CONSTRUCTS.find((item) => item.id === construct) ?? CONSTRUCTS[0];
  const state =
    fault === "unsupported"
      ? "不支持输入：合同应拒绝并保留源位置"
      : fault === "mismatch"
        ? "参数不匹配：检查调用信息而不是后端"
        : `${selected.label}：合同条目可继续交接`;
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        语言合同：构造先写允许与拒绝
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        先选构造，再让 cbc 用同一张卡片解释通过、拒绝和下一步产物。
      </text>
      {CONSTRUCTS.map((item, index) => {
        const active = item.id === construct && activeStep >= 0;
        const x = 28 + index * 234;
        return (
          <g key={item.id}>
            <rect
              x={x}
              y="104"
              width="208"
              height="154"
              rx="12"
              fill={active ? COLORS.accent : COLORS.elevated}
              fillOpacity={active ? 0.14 : 1}
              stroke={active ? COLORS.accent : COLORS.border}
              strokeWidth={active ? 2.5 : 1.5}
            />
            <text
              x={x + 18}
              y="136"
              fontSize="14"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {item.label}
            </text>
            <text x={x + 18} y="174" fontSize="13" fill={COLORS.secondary}>
              {item.example}
            </text>
            <text x={x + 18} y="216" fontSize="13" fill={COLORS.secondary}>
              {item.contract}
            </text>
          </g>
        );
      })}
      <rect
        x="28"
        y="288"
        width="704"
        height="52"
        rx="12"
        fill={COLORS.elevated}
        stroke={fault === "none" ? COLORS.success : COLORS.warning}
        strokeWidth="2"
      />
      <text
        x="52"
        y="321"
        fontSize="14"
        fontWeight="700"
        fill={fault === "none" ? COLORS.success : COLORS.warning}
      >
        当前合同状态：{state}
      </text>
      <text x="28" y="378" fontSize="13" fill={COLORS.accent}>
        先预测：把变量改成函数调用后，哪一项合同信息需要新增？
      </text>
    </g>
  );
}

function ArchitectureView({
  activeStep,
  construct,
}: {
  activeStep: number;
  construct: Construct;
}) {
  const selected =
    CONSTRUCTS.find((item) => item.id === construct) ?? CONSTRUCTS[0];
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        cbc 构成：每层交付下一层能消费的结构
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        高亮只是当前观察点；完整编译需要所有交接都满足合同。
      </text>
      {ARCHITECTURE_NODES.map((node, index) => {
        const x = 28 + index * 144;
        const active = activeStep >= Math.min(index, 4);
        return (
          <g key={node.label}>
            <rect
              x={x}
              y="110"
              width="116"
              height="84"
              rx="12"
              fill={node.color}
              fillOpacity={active ? 0.14 : 0.04}
              stroke={active ? node.color : COLORS.border}
              strokeWidth={active ? 2.5 : 1.5}
            />
            <text
              x={x + 58}
              y="146"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill={active ? node.color : COLORS.primary}
            >
              {node.label}
            </text>
            <text
              x={x + 58}
              y="174"
              textAnchor="middle"
              fontSize="11"
              fill={COLORS.secondary}
            >
              {node.detail}
            </text>
            {index < ARCHITECTURE_NODES.length - 1 && (
              <line
                x1={x + 116}
                y1="152"
                x2={x + 140}
                y2="152"
                stroke={COLORS.accent}
                strokeWidth="3"
                markerEnd="url(#crc-cflat-cbc-arrow)"
              />
            )}
          </g>
        );
      })}
      <rect
        x="28"
        y="244"
        width="704"
        height="92"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="278" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        当前构造：{selected.label}
      </text>
      <text x="52" y="310" fontSize="13" fill={COLORS.secondary}>
        如果 AST
        交付结构，语义层再补名称、类型、参数和返回信息；后端不替前面的层猜合同。
      </text>
      <text x="28" y="378" fontSize="13" fill={COLORS.accent}>
        动手试：推进到语义阶段，指出当前构造交给下一层的最小结构证据。
      </text>
    </g>
  );
}

function ProbeView({
  construct,
  fault,
}: {
  construct: Construct;
  fault: Fault;
}) {
  const selected =
    CONSTRUCTS.find((item) => item.id === construct) ?? CONSTRUCTS[0];
  const stage =
    fault === "unsupported"
      ? "解析或语义"
      : fault === "mismatch"
        ? "语义检查"
        : "后端可继续";
  const result =
    fault === "unsupported"
      ? "拒绝构造，保留源位置，不生成伪下游产物"
      : fault === "mismatch"
        ? "参数诊断稳定，检查调用节点与函数信息"
        : "结构和合同通过，可继续比较 IR 与目标代码";
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        构造探针：错误应停在合适的责任层
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        不支持输入和参数不匹配都不是“后端问题”；先看合同与阶段证据。
      </text>
      <rect
        x="28"
        y="100"
        width="328"
        height="214"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="134" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        输入与预期
      </text>
      <text x="52" y="174" fontSize="13" fill={COLORS.secondary}>
        构造：{selected.label}
      </text>
      <text x="52" y="206" fontSize="13" fill={COLORS.secondary}>
        示例：{selected.example}
      </text>
      <text x="52" y="238" fontSize="13" fill={COLORS.secondary}>
        预期责任层：{stage}
      </text>
      <text x="52" y="278" fontSize="13" fill={COLORS.accent}>
        记录：诊断、阶段、产物状态
      </text>
      <rect
        x="382"
        y="100"
        width="350"
        height="214"
        rx="12"
        fill={COLORS.elevated}
        stroke={fault === "none" ? COLORS.success : COLORS.warning}
        strokeWidth="2"
      />
      <text
        x="406"
        y="134"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        当前验收
      </text>
      <text
        x="406"
        y="180"
        fontSize="13"
        fill={fault === "none" ? COLORS.success : COLORS.warning}
      >
        {result}
      </text>
      <text x="406" y="232" fontSize="13" fill={COLORS.secondary}>
        清理旧目录后，以相同 cbc 提交、工具版本和 ABI 重放。
      </text>
      <text x="406" y="276" fontSize="13" fill={COLORS.secondary}>
        比较源位置、阶段和退出码，而不是只看最后文件。
      </text>
      <text x="28" y="378" fontSize="13" fill={COLORS.accent}>
        先猜一猜：如果语义诊断稳定，为什么还不能声称后端正确？
      </text>
    </g>
  );
}

/** 第2章专属实验：把 C♭ 语言合同与 cbc 分层连接成构造探针。 */
export function CrcCflatCbcLab() {
  const [view, setView] = useState<View>("contract");
  const [construct, setConstruct] = useState<Construct>("literal");
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
    setView("contract");
    setConstruct("literal");
    setFault("none");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label="第2章 C♭和cbc专属语言合同、cbc构成与构造探针实验；2.1 C♭语言的概要；2.2 C♭编译器cbc的构成"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="crc-unit-02"
      data-visual-kind="crc-cflat-cbc-contract-probe"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 CrcCflatCbcLab · 语言合同与编译器分层
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让每个 C♭ 构造都找到自己的责任模块
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：换一种构造或注入故障后，哪一层会最先改变诊断与产物？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div
          className="flex flex-wrap gap-2"
          aria-label="选择 C♭和cbc 实验视角"
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
        <div className="flex flex-wrap gap-2" aria-label="选择 C♭ 构造探针">
          {CONSTRUCTS.map((item) => (
            <ViewButton
              key={item.id}
              active={construct === item.id}
              onClick={() => setConstruct(item.id)}
            >
              {item.label}
            </ViewButton>
          ))}
        </div>
        <div
          className="flex flex-wrap gap-2"
          aria-label="选择 C♭和cbc 故障模式"
        >
          <ViewButton
            active={fault === "none"}
            onClick={() => setFault("none")}
          >
            正常合同
          </ViewButton>
          <ViewButton
            active={fault === "unsupported"}
            onClick={() => setFault("unsupported")}
          >
            不支持构造
          </ViewButton>
          <ViewButton
            active={fault === "mismatch"}
            onClick={() => setFault("mismatch")}
          >
            参数不匹配
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
                id="crc-cflat-cbc-arrow"
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
                active
                label="合同"
                refCallback={(element) => {
                  nodeRefs.current.contract = element;
                }}
                status="构造与边界"
                x={28}
                y={104}
              />
              <Stage
                active
                label="解析"
                refCallback={(element) => {
                  nodeRefs.current.parse = element;
                }}
                status="token 与 AST"
                x={174}
                y={104}
              />
              <Stage
                active
                label="语义"
                refCallback={(element) => {
                  nodeRefs.current.semantic = element;
                }}
                status="名称与类型"
                x={320}
                y={104}
              />
              <Stage
                active
                label="生成"
                refCallback={(element) => {
                  nodeRefs.current.emit = element;
                }}
                status="IR 与后端"
                x={466}
                y={104}
              />
              <Stage
                active
                label="回放"
                refCallback={(element) => {
                  nodeRefs.current.replay = element;
                }}
                status="诊断与退出码"
                x={612}
                y={104}
              />
            </g>
            {view === "contract" ? (
              <ContractView
                activeStep={timeline.currentStep}
                construct={construct}
                fault={fault}
              />
            ) : view === "architecture" ? (
              <ArchitectureView
                activeStep={timeline.currentStep}
                construct={construct}
              />
            ) : (
              <ProbeView construct={construct} fault={fault} />
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
          caption="单步查看合同、解析、语义、生成与回放；重置后用相同构造重放，确认错误没有被上一次状态遮住。"
          reset={{
            label: "重置 C♭和cbc 实验",
            ariaLabel: "重置 C♭和cbc 专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
