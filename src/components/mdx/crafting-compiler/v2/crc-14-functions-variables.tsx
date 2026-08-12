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

type View = "contract" | "frame" | "trace";
type Sample = "parameter" | "local" | "global";
type Fault = "none" | "saved" | "stack";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "contract",
    label: "调用合同",
    detail: "把调用者参数、call、被调用者帧和返回值放到一条 ABI 链上。",
  },
  {
    id: "frame",
    label: "栈帧布局",
    detail: "比较参数正偏移、局部负偏移、全局符号与保存寄存器。",
  },
  {
    id: "trace",
    label: "边界回放",
    detail: "逐点检查序言、嵌套调用、尾声、ESP/EBP 与返回值。",
  },
] as const;

const SAMPLES: readonly {
  id: Sample;
  label: string;
  code: string;
  location: string;
  lifetime: string;
  signal: string;
}[] = [
  {
    id: "parameter",
    label: "参数",
    code: "sum(arg0, arg1)",
    location: "[ebp+8] / [ebp+12]",
    lifetime: "一次调用",
    signal: "压栈顺序",
  },
  {
    id: "local",
    label: "局部",
    code: "int local",
    location: "[ebp-4]",
    lifetime: "当前帧",
    signal: "空间预留",
  },
  {
    id: "global",
    label: "全局",
    code: "counter",
    location: "counter@GOT / symbol",
    lifetime: "整个程序",
    signal: "符号/重定位",
  },
] as const;

const STEPS: readonly TeachingStep[] = [
  { label: "source", caption: "读取调用点和变量类别。" },
  { label: "contract", caption: "冻结 ABI 参数与保存责任。" },
  { label: "prologue", caption: "建立帧并分配局部空间。" },
  { label: "call", caption: "回放嵌套调用与返回值。" },
  { label: "return", caption: "恢复 ESP/EBP 并重建验收。" },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const CONCEPTS = [
  "第14章 函数和变量",
  "14.1 程序调用约定",
  "14.2 Linux/x86下的函数调用",
  "14.3 Linux/x86下函数调用的细节",
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
  status,
  x,
  refCallback,
}: {
  label: string;
  status: string;
  x: number;
  refCallback?: (element: SVGGElement | null) => void;
}) {
  return (
    <g ref={refCallback}>
      <rect
        x={x}
        y="108"
        width="132"
        height="76"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x={x + 16}
        y="136"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        {label}
      </text>
      <text x={x + 16} y="164" fontSize="13" fill={COLORS.secondary}>
        {status}
      </text>
    </g>
  );
}

function ContractView({
  activeStep,
  fault,
  sample,
}: {
  activeStep: number;
  fault: Fault;
  sample: Sample;
}) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const savedFault = fault === "saved";
  const stackFault = fault === "stack";
  const stages = [
    ["caller", "参数 + 返回地址", COLORS.accent],
    ["call", "call / callee", COLORS.warning],
    ["frame", "EBP + 局部槽", COLORS.success],
    ["return", "EAX + ESP", savedFault ? COLORS.danger : COLORS.accent],
  ] as const;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        caller arguments → call → callee frame → return value
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        同一调用合同把变量位置、寄存器保存和返回边界连成一条证据链。
      </text>
      {stages.map(([label, detail, color], index) => {
        const x = 28 + index * 176;
        const active = activeStep >= Math.min(index + 1, 4);
        return (
          <g key={label} opacity={active ? 1 : 0.45}>
            <rect
              x={x}
              y="92"
              width="156"
              height="118"
              rx="12"
              fill={color}
              fillOpacity={active ? 0.14 : 0.05}
              stroke={active ? color : COLORS.border}
              strokeWidth="2"
            />
            <circle
              cx={x + 24}
              cy="122"
              r="8"
              fill={active ? color : COLORS.border}
            />
            <text
              x={x + 42}
              y="128"
              fontSize="14"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {label}
            </text>
            <text x={x + 16} y="166" fontSize="13" fill={COLORS.secondary}>
              {detail}
            </text>
            {index < stages.length - 1 && (
              <line
                x1={x + 156}
                y1="150"
                x2={x + 172}
                y2="150"
                stroke={COLORS.accent}
                strokeWidth="3"
                markerEnd="url(#crc-functions-arrow)"
              />
            )}
          </g>
        );
      })}
      <rect
        x="28"
        y="236"
        width="704"
        height="78"
        rx="12"
        fill={savedFault || stackFault ? COLORS.warning : COLORS.success}
        fillOpacity="0.12"
        stroke={savedFault || stackFault ? COLORS.warning : COLORS.success}
        strokeWidth="2"
      />
      <text x="50" y="266" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        {savedFault
          ? "保存集合故障：EBX 返回后不再是调用前的值"
          : stackFault
            ? "栈不平衡：ret 后 ESP 比调用前少 4 字节"
            : `${selected.code} · ${selected.location} · ${selected.signal}`}
      </text>
      <text
        x="50"
        y="292"
        fontSize="13"
        fill={savedFault || stackFault ? COLORS.warning : COLORS.success}
      >
        {savedFault || stackFault
          ? "停止在调用边界，先比较 ESP/EBP 与保存寄存器，再修正序言或尾声。"
          : `调用合同通过：变量生命周期 = ${selected.lifetime}，返回值在 EAX。`}
      </text>
      <text x="28" y="358" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        不变量：参数偏移 + 保存集合 + 返回值 + 调用前后 ESP
      </text>
      <text x="28" y="384" fontSize="13" fill={COLORS.accent}>
        任何一项不一致都要保留静态指令和运行时快照。
      </text>
    </g>
  );
}

function FrameView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const stackFault = fault === "stack";
  const rows = [
    ["[ebp+12]", "arg1", "参数", "caller"],
    ["[ebp+8]", "arg0", "参数", "caller"],
    ["[ebp+4]", "return address", "控制", "call"],
    ["[ebp]", "saved ebp", "保存", "序言"],
    ["[ebp-4]", selected.id === "local" ? "local" : "temp", "局部", "callee"],
  ] as const;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        栈帧布局：正偏移、负偏移与符号地址
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        EBP 是解释偏移的基准；全局变量不属于当前帧，要用符号或重定位证据。
      </text>
      <rect
        x="28"
        y="86"
        width="704"
        height="48"
        rx="10"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="48" y="117" fontSize="13" fontWeight="700" fill={COLORS.primary}>
        EBP 基准
      </text>
      <text
        x="196"
        y="117"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        槽位
      </text>
      <text
        x="344"
        y="117"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        类别
      </text>
      <text
        x="520"
        y="117"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        责任
      </text>
      {rows.map(([offset, name, category, owner], index) => {
        const y = 146 + index * 44;
        const error = stackFault && index === rows.length - 1;
        return (
          <g key={offset}>
            <rect
              x="28"
              y={y}
              width="704"
              height="34"
              rx="7"
              fill={error ? COLORS.warning : COLORS.elevated}
              fillOpacity={error ? 0.14 : 1}
              stroke={error ? COLORS.warning : COLORS.border}
              strokeWidth="1.5"
            />
            <text
              x="48"
              y={y + 23}
              fontSize="13"
              fontWeight="700"
              fill={error ? COLORS.warning : COLORS.primary}
            >
              {offset}
            </text>
            <text x="196" y={y + 23} fontSize="13" fill={COLORS.secondary}>
              {error ? "local @ esp-8" : name}
            </text>
            <text x="344" y={y + 23} fontSize="13" fill={COLORS.secondary}>
              {category}
            </text>
            <text
              x="520"
              y={y + 23}
              fontSize="13"
              fill={error ? COLORS.warning : COLORS.secondary}
            >
              {error ? "ESP 偏移未恢复" : owner}
            </text>
          </g>
        );
      })}
      <rect
        x="28"
        y="374"
        width="704"
        height="20"
        rx="7"
        fill={COLORS.accent}
        fillOpacity="0.12"
      />
      <text
        x="48"
        y="389"
        fontSize="13"
        fill={stackFault ? COLORS.warning : COLORS.accent}
      >
        {stackFault
          ? "修复：让局部空间与尾声恢复数量相等，再重新核对 [ebp-4]。"
          : `当前样本：${selected.label} · ${selected.location} · 生命周期 ${selected.lifetime}`}
      </text>
    </g>
  );
}

function TraceView({ fault }: { fault: Fault }) {
  const savedFault = fault === "saved";
  const stackFault = fault === "stack";
  const events = [
    ["caller", "ESP=0x1000", "压入参数与返回地址", COLORS.accent],
    ["prologue", "EBP=ESP", "保存 EBP，分配局部槽", COLORS.warning],
    [
      "nested call",
      "ESP=0x0fd0",
      "保存寄存器并调用 helper",
      savedFault ? COLORS.danger : COLORS.success,
    ],
    [
      "epilogue",
      stackFault ? "ESP=0x0ffc" : "ESP=0x1000",
      "恢复寄存器、leave、ret",
      stackFault ? COLORS.warning : COLORS.success,
    ],
  ] as const;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        调用边界回放：序言 → 嵌套调用 → 尾声
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        每个事件同时记录 ESP、保存集合、返回值和下一条控制流位置。
      </text>
      {events.map(([label, register, detail, color], index) => {
        const x = 28 + index * 176;
        return (
          <g key={label}>
            <rect
              x={x}
              y="94"
              width="156"
              height="142"
              rx="12"
              fill={color}
              fillOpacity="0.12"
              stroke={color}
              strokeWidth="2"
            />
            <text
              x={x + 16}
              y="126"
              fontSize="14"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {label}
            </text>
            <text x={x + 16} y="162" fontSize="13" fill={color}>
              {register}
            </text>
            <text x={x + 16} y="198" fontSize="13" fill={COLORS.secondary}>
              {detail}
            </text>
            {index < events.length - 1 && (
              <line
                x1={x + 156}
                y1="166"
                x2={x + 172}
                y2="166"
                stroke={COLORS.accent}
                strokeWidth="3"
                markerEnd="url(#crc-functions-arrow)"
              />
            )}
          </g>
        );
      })}
      <rect
        x="28"
        y="266"
        width="704"
        height="68"
        rx="12"
        fill={savedFault || stackFault ? COLORS.warning : COLORS.success}
        fillOpacity="0.12"
        stroke={savedFault || stackFault ? COLORS.warning : COLORS.success}
        strokeWidth="2"
      />
      <text x="50" y="296" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        {savedFault
          ? "返回值可能正确，但保存寄存器快照不一致"
          : stackFault
            ? "返回地址可达，但调用后 ESP 未回到边界"
            : "调用前后 ESP 一致，保存集合恢复，EAX 返回值可接受"}
      </text>
      <text
        x="50"
        y="320"
        fontSize="13"
        fill={savedFault || stackFault ? COLORS.warning : COLORS.success}
      >
        {savedFault || stackFault
          ? "用 gdb 快照确认错误发生在序言、嵌套调用还是尾声。"
          : "继续执行清理重建，并比较两次 objdump 结果。"}
      </text>
      <text x="28" y="374" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        objdump -drwC call.o → gdb --batch -x frame.gdb ./call
      </text>
      <text x="28" y="397" fontSize="13" fill={COLORS.accent}>
        静态指令与运行时 ESP/EBP 必须描述同一个调用帧。
      </text>
    </g>
  );
}

/** 第14章专属实验：回放 IA-32 调用约定、栈帧与返回边界。 */
export function Crc14FunctionsVariablesLab() {
  const [view, setView] = useState<View>("contract");
  const [sample, setSample] = useState<Sample>("parameter");
  const [fault, setFault] = useState<Fault>("none");
  const stageRefs = useRef<Record<string, SVGGElement | null>>({});
  const current = useMemo(
    () => VIEWS.find((item) => item.id === view) ?? VIEWS[0],
    [view],
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
            opacity: [0.35, 1],
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
    setSample("parameter");
    setFault("none");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label={`第14章 函数和变量专属 IA-32 调用约定实验；${CONCEPTS.join("；")}`}
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="crc-unit-14"
      data-visual-kind="crc-functions-variables-call-frame-replay"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 Crc14FunctionsVariablesLab · IA-32 调用约定台
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让一次函数返回也能证明调用边界
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：返回值正确但下一次调用失败时，应该先查 EAX、保存集合还是
            ESP？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择函数调用实验视角">
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
        <div className="flex flex-wrap gap-2" aria-label="选择函数变量样本">
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
        <div className="flex flex-wrap gap-2" aria-label="选择函数调用故障模式">
          <ViewButton
            active={fault === "none"}
            onClick={() => setFault("none")}
          >
            正常调用
          </ViewButton>
          <ViewButton
            active={fault === "saved"}
            onClick={() => setFault("saved")}
          >
            保存寄存器破坏
          </ViewButton>
          <ViewButton
            active={fault === "stack"}
            onClick={() => setFault("stack")}
          >
            ESP 不平衡
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
                id="crc-functions-arrow"
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
                label="source"
                status="C♭ 调用点"
                x={28}
                refCallback={(element) => {
                  stageRefs.current.source = element;
                }}
              />
              <Stage
                label="contract"
                status="IA-32 ABI"
                x={174}
                refCallback={(element) => {
                  stageRefs.current.contract = element;
                }}
              />
              <Stage
                label="prologue"
                status="序言/保存"
                x={320}
                refCallback={(element) => {
                  stageRefs.current.prologue = element;
                }}
              />
              <Stage
                label="call"
                status="call/参数"
                x={466}
                refCallback={(element) => {
                  stageRefs.current.call = element;
                }}
              />
              <Stage
                label="return"
                status="返回/ESP"
                x={612}
                refCallback={(element) => {
                  stageRefs.current.return = element;
                }}
              />
            </g>
            {view === "contract" ? (
              <ContractView
                activeStep={timeline.currentStep}
                fault={fault}
                sample={sample}
              />
            ) : view === "frame" ? (
              <FrameView fault={fault} sample={sample} />
            ) : (
              <TraceView fault={fault} />
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
          caption="单步查看 source、contract、prologue、call 和 return；重置后用同一输入重放，确认 IA-32 调用边界没有漂移。"
          reset={{
            label: "重置函数调用实验",
            ariaLabel: "重置函数和变量专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
