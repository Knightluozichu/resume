"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "@/components/mdx/anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";

const C = {
  accent: "var(--accent)",
  bg: "var(--bg)",
  border: "var(--border)",
  danger: "var(--danger)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  surface: "var(--surface)",
  text: "var(--text-primary)",
  warning: "var(--warning)",
} as const;

const T = TEACHING_BEAT_MS;

function Figure({ children }: { children: ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        {children}
      </div>
    </figure>
  );
}

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg
      viewBox="0 0 760 440"
      role="img"
      aria-label={label}
      className="mx-auto block h-auto w-full max-w-[760px]"
    >
      <rect width="760" height="440" rx="16" fill={C.bg} />
      {children}
    </svg>
  );
}

function Arrow({
  color = C.accent,
  dashed = false,
  x1,
  x2,
  y1,
  y2,
}: {
  color?: string;
  dashed?: boolean;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 8;
  const left = `${x2 - size * Math.cos(angle - Math.PI / 6)},${y2 - size * Math.sin(angle - Math.PI / 6)}`;
  const right = `${x2 - size * Math.cos(angle + Math.PI / 6)},${y2 - size * Math.sin(angle + Math.PI / 6)}`;
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth="3"
        strokeDasharray={dashed ? "7 6" : undefined}
      />
      <polygon points={`${x2},${y2} ${left} ${right}`} fill={color} />
    </g>
  );
}

function Metric({
  label,
  tone = C.accent,
  value,
}: {
  label: string;
  tone?: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border py-2 last:border-b-0">
      <span className="text-sm text-secondary">{label}</span>
      <span className="font-mono text-sm font-semibold" style={{ color: tone }}>
        {value}
      </span>
    </div>
  );
}

export function GpuGems2Ch35VectorPackingDiagram() {
  return (
    <Figure>
      <Frame label="GPU 向量化图：四个独立标量操作被打包成一个 float4，右侧展示四个通道同周期完成；数据布局需要让一起消费的值落在同一 texel">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          先把“算四次”变成“一次算四个通道”
        </text>
        <text x="44" y="80" fontSize="14" fontWeight="700" fill={C.warning}>
          scalar：四次独立指令
        </text>
        {Array.from({ length: 4 }, (_, index) => (
          <g key={`scalar-${index}`}>
            <rect
              x="44"
              y={105 + index * 46}
              width="210"
              height="30"
              rx="7"
              fill={C.warning}
              fillOpacity="0.16"
              stroke={C.warning}
            />
            <text
              x="149"
              y={125 + index * 46}
              textAnchor="middle"
              fontSize="12"
              fill={C.text}
            >
              value[{index}] × gain
            </text>
          </g>
        ))}
        <Arrow x1={278} y1={199} x2={350} y2={199} color={C.accent} />
        <text x="314" y="177" textAnchor="middle" fontSize="12" fill={C.accent}>
          pack
        </text>
        <text x="410" y="80" fontSize="14" fontWeight="700" fill={C.success}>
          vector：一个 float4
        </text>
        <rect
          x="410"
          y="118"
          width="292"
          height="62"
          rx="10"
          fill={C.success}
          fillOpacity="0.16"
          stroke={C.success}
        />
        {Array.from({ length: 4 }, (_, index) => (
          <g key={`vector-${index}`}>
            <rect
              x={425 + index * 67}
              y="132"
              width="54"
              height="34"
              rx="6"
              fill={C.success}
              fillOpacity="0.28"
              stroke={C.success}
            />
            <text
              x={452 + index * 67}
              y="154"
              textAnchor="middle"
              fontSize="12"
              fill={C.text}
            >
              c{index}
            </text>
          </g>
        ))}
        <text
          x="556"
          y="214"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          同一条 vector 指令覆盖四个 lane
        </text>
        <rect
          x="44"
          y="291"
          width="658"
          height="94"
          rx="12"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="373"
          y="322"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.accent}
        >
          数据布局也是并行化的一部分
        </text>
        <text
          x="373"
          y="349"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          让一起使用的标量进入同一个 RGBA texel，或把相邻 texel 压进一个四通道值
        </text>
        <text
          x="373"
          y="371"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          但要把 packing / unpacking 的额外成本纳入测量
        </text>
        <text
          x="380"
          y="415"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          理论上少处理 fragment，不代表端到端必然更快
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch35FrequencyPipelineDiagram() {
  const bars = [
    ["CPU / uniform", 92, C.secondary, "1 次"],
    ["vertex program", 168, C.accent, "每 vertex"],
    ["rasterizer", 246, C.success, "插值"],
    ["fragment program", 344, C.warning, "每 fragment"],
  ] as const;
  return (
    <Figure>
      <Frame label="计算频率图：同一表达式放在 CPU、vertex、rasterizer 或 fragment 阶段，执行次数从一次增加到每个 fragment；把不变量移向低频阶段可减少重复工作">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          同一个值，放在哪一层算？
        </text>
        <text
          x="380"
          y="57"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          GPU 管线可以看作并行的嵌套循环；越靠后，通常覆盖的数据越多
        </text>
        {bars.map(([name, width, tone, frequency], index) => {
          const y = 94 + index * 66;
          return (
            <g key={name}>
              <text
                x="44"
                y={y + 26}
                fontSize="13"
                fontWeight="700"
                fill={tone}
              >
                {name}
              </text>
              <rect
                x="194"
                y={y}
                width={width}
                height="38"
                rx="8"
                fill={tone}
                fillOpacity="0.22"
                stroke={tone}
              />
              <text x={212 + width} y={y + 25} fontSize="12" fill={C.secondary}>
                {frequency}
              </text>
              {index < bars.length - 1 && (
                <Arrow
                  x1={194 + width / 2}
                  y1={y + 45}
                  x2={194 + width / 2}
                  y2={y + 58}
                  color={C.border}
                />
              )}
            </g>
          );
        })}
        <rect
          x="44"
          y="366"
          width="658"
          height="42"
          rx="10"
          fill={C.surface}
          stroke={C.success}
        />
        <text
          x="373"
          y="392"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={C.success}
        >
          经验：能在线性插值的地方，不要让每个 fragment 重算；全局常量更应变成
          uniform
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch35LookupTableDiagram() {
  return (
    <Figure>
      <Frame label="查表取舍图：左侧把复杂函数在线计算，右侧用纹理查表；查表减少算术但增加一次读取，只有计算受限且访问具有缓存局部性时才有收益">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          lookup table 是“存储换计算”，不是免费加速
        </text>
        <rect
          x="40"
          y="88"
          width="292"
          height="236"
          rx="13"
          fill={C.surface}
          stroke={C.warning}
        />
        <text
          x="186"
          y="121"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.warning}
        >
          在线计算
        </text>
        <text
          x="186"
          y="149"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          多条算术指令 · 无额外读纹理
        </text>
        <path
          d="M 82 252 C 126 184, 205 302, 288 171"
          fill="none"
          stroke={C.warning}
          strokeWidth="4"
        />
        <circle cx="99" cy="233" r="7" fill={C.warning} />
        <circle cx="187" cy="254" r="7" fill={C.warning} />
        <circle cx="269" cy="193" r="7" fill={C.warning} />
        <text
          x="186"
          y="293"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          compute-limited 时可能合算
        </text>
        <Arrow x1={356} y1={206} x2={405} y2={206} color={C.accent} />
        <text x="380" y="183" textAnchor="middle" fontSize="12" fill={C.accent}>
          replace
        </text>
        <rect
          x="428"
          y="88"
          width="292"
          height="236"
          rx="13"
          fill={C.surface}
          stroke={C.success}
        />
        <text
          x="574"
          y="121"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.success}
        >
          texture lookup
        </text>
        <text
          x="574"
          y="149"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          一次读取 · 需要 cache coherence
        </text>
        <g>
          {Array.from({ length: 20 }, (_, index) => {
            const row = Math.floor(index / 5);
            const col = index % 5;
            return (
              <rect
                key={`lookup-${index}`}
                x={466 + col * 38}
                y={177 + row * 26}
                width="29"
                height="19"
                rx="4"
                fill={col < 3 ? C.success : C.border}
                fillOpacity={col < 3 ? 0.4 : 0.28}
                stroke={col < 3 ? C.success : C.border}
              />
            );
          })}
        </g>
        <text
          x="574"
          y="302"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          coherent access 才能避免 cache thrash
        </text>
        <rect
          x="112"
          y="354"
          width="536"
          height="50"
          rx="10"
          fill={C.danger}
          fillOpacity="0.1"
          stroke={C.danger}
        />
        <text
          x="380"
          y="385"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={C.danger}
        >
          额外 texture read 可能把 compute bottleneck 换成 bandwidth bottleneck
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch35SwizzleDiagram() {
  const source = ["x", "y", "z", "w"];
  const result = ["x", "y", "y", "z"];
  return (
    <Figure>
      <Frame label="swizzle 与 write mask 图：swizzle 可重排、复制或省略四通道寄存器成员，write mask 只更新目标的指定通道，减少不必要的构造和写回">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          四通道寄存器里的“重新接线”
        </text>
        <text x="54" y="88" fontSize="14" fontWeight="700" fill={C.secondary}>
          register f
        </text>
        {source.map((item, index) => (
          <g key={`source-${item}`}>
            <rect
              x={52 + index * 68}
              y="112"
              width="54"
              height="40"
              rx="7"
              fill={C.accent}
              fillOpacity="0.2"
              stroke={C.accent}
            />
            <text
              x={79 + index * 68}
              y="137"
              textAnchor="middle"
              fontSize="13"
              fill={C.text}
            >
              {item}
            </text>
          </g>
        ))}
        <text x="380" y="136" textAnchor="middle" fontSize="25" fill={C.accent}>
          →
        </text>
        <text x="505" y="88" fontSize="14" fontWeight="700" fill={C.success}>
          f.xyyz
        </text>
        {result.map((item, index) => (
          <g key={`result-${index}`}>
            <rect
              x={503 + index * 54}
              y="112"
              width="42"
              height="40"
              rx="7"
              fill={C.success}
              fillOpacity="0.2"
              stroke={C.success}
            />
            <text
              x={524 + index * 54}
              y="137"
              textAnchor="middle"
              fontSize="13"
              fill={C.text}
            >
              {item}
            </text>
          </g>
        ))}
        <path
          d="M 79 172 C 96 216, 106 216, 133 172"
          fill="none"
          stroke={C.accent}
          strokeWidth="2"
        />
        <path
          d="M 147 172 C 169 232, 238 232, 201 172"
          fill="none"
          stroke={C.accent}
          strokeWidth="2"
        />
        <path
          d="M 215 172 C 239 216, 302 216, 269 172"
          fill="none"
          stroke={C.accent}
          strokeWidth="2"
        />
        <path
          d="M 283 172 C 311 232, 354 232, 337 172"
          fill="none"
          stroke={C.accent}
          strokeWidth="2"
        />
        <rect
          x="52"
          y="276"
          width="292"
          height="90"
          rx="12"
          fill={C.surface}
          stroke={C.warning}
        />
        <text
          x="198"
          y="307"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.warning}
        >
          swizzle
        </text>
        <text
          x="198"
          y="333"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          重排、复制、删去成员
        </text>
        <rect
          x="416"
          y="276"
          width="292"
          height="90"
          rx="12"
          fill={C.surface}
          stroke={C.success}
        />
        <text
          x="562"
          y="307"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.success}
        >
          write mask · out.xz
        </text>
        <text
          x="562"
          y="333"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          只让 x、z 通道被修改
        </text>
        <text
          x="380"
          y="407"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          先组织好向量，再用 swizzle 取视图；不要逐通道构造临时值
        </text>
      </Frame>
    </Figure>
  );
}

const TIMELINE_STEPS: readonly TeachingStep[] = [
  { label: "measure", caption: "先建立能工作的基线并记录时间" },
  { label: "pack", caption: "用向量或布局重排暴露并行性" },
  { label: "hoist", caption: "把不变量移到更低频的阶段" },
  { label: "verify", caption: "每次改动独立 benchmark，保留可回退证据" },
];

const TIMELINE_LABELS: Record<string, string> = Object.fromEntries(
  TIMELINE_STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function GpuGems2Ch35OptimizationTimelineDiagram() {
  const measureRef = useRef<SVGGElement>(null);
  const packRef = useRef<SVGGElement>(null);
  const hoistRef = useRef<SVGGElement>(null);
  const verifyRef = useRef<SVGGElement>(null);

  const timeline = useTeachingTimeline({
    steps: TIMELINE_STEPS,
    build: (tl) => {
      tl.add(measureRef.current!, { opacity: [0.5, 1], duration: T * 0.5 }, 0);
      tl.label("measure", 0);
      tl.add(packRef.current!, { opacity: [0.5, 1], duration: T * 0.5 }, T);
      tl.label("pack", T);
      tl.add(
        hoistRef.current!,
        { opacity: [0.5, 1], duration: T * 0.5 },
        T * 2,
      );
      tl.label("hoist", T * 2);
      tl.add(
        verifyRef.current!,
        { opacity: [0.5, 1], duration: T * 0.5 },
        T * 3,
      );
      tl.label("verify", T * 3);
    },
  });

  const phases = [
    ["① measure", C.secondary],
    ["② pack", C.accent],
    ["③ hoist", C.success],
    ["④ verify", C.warning],
  ] as const;

  return (
    <Figure>
      <svg
        viewBox="0 0 760 440"
        role="img"
        aria-label="GPU 优化教学时间线：测量基线、暴露向量并行、把不变量上移、逐次 benchmark 验证。支持播放、暂停、单步和拖动。"
        className="mx-auto block h-auto w-full max-w-[760px]"
      >
        <rect width="760" height="440" rx="16" fill={C.bg} />
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          优化不是一次重写，而是一条可回退的证据链
        </text>
        <text
          x="380"
          y="57"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          每一步都要保留“改了什么、测了什么、是否值得保留”
        </text>
        <g ref={measureRef} style={{ opacity: 0.5 }}>
          <rect
            x="48"
            y="92"
            width="664"
            height="52"
            rx="10"
            fill={C.secondary}
            fillOpacity="0.12"
            stroke={C.secondary}
          />
          <text
            x="70"
            y="124"
            fontSize="13"
            fontWeight="700"
            fill={C.secondary}
          >
            ① measure
          </text>
          <text x="230" y="124" fontSize="12" fill={C.text}>
            先写通，再记录端到端时间、读写量与阶段负载
          </text>
        </g>
        <g ref={packRef} style={{ opacity: 0.5 }}>
          <rect
            x="48"
            y="160"
            width="664"
            height="52"
            rx="10"
            fill={C.accent}
            fillOpacity="0.12"
            stroke={C.accent}
          />
          <text x="70" y="192" fontSize="13" fontWeight="700" fill={C.accent}>
            ② pack
          </text>
          <text x="230" y="192" fontSize="12" fill={C.text}>
            用 float4、邻域布局或 swizzle 让并行性显形
          </text>
        </g>
        <g ref={hoistRef} style={{ opacity: 0.5 }}>
          <rect
            x="48"
            y="228"
            width="664"
            height="52"
            rx="10"
            fill={C.success}
            fillOpacity="0.12"
            stroke={C.success}
          />
          <text x="70" y="260" fontSize="13" fontWeight="700" fill={C.success}>
            ③ hoist
          </text>
          <text x="230" y="260" fontSize="12" fill={C.text}>
            把 uniform、线性变化和稳定函数移向 CPU / vertex / table
          </text>
        </g>
        <g ref={verifyRef} style={{ opacity: 0.5 }}>
          <rect
            x="48"
            y="296"
            width="664"
            height="52"
            rx="10"
            fill={C.warning}
            fillOpacity="0.12"
            stroke={C.warning}
          />
          <text x="70" y="328" fontSize="13" fontWeight="700" fill={C.warning}>
            ④ verify
          </text>
          <text x="230" y="328" fontSize="12" fill={C.text}>
            单独 benchmark；若瓶颈没动，立刻回退而不是堆更多技巧
          </text>
        </g>
        <line
          x1="48"
          y1="379"
          x2="712"
          y2="379"
          stroke={C.border}
          strokeWidth="2"
        />
        {phases.map(([label, tone], index) => (
          <g key={label}>
            <circle cx={94 + index * 190} cy="379" r="8" fill={tone} />
            <text
              x={94 + index * 190}
              y="409"
              textAnchor="middle"
              fontSize="12"
              fill={C.secondary}
            >
              {label}
            </text>
          </g>
        ))}
      </svg>
      <TimelineControls
        timeline={timeline}
        labelText={TIMELINE_LABELS}
        caption="优化的最小闭环：每次只改变一个主要条件，并为收益与回退都留下测量记录。"
      />
    </Figure>
  );
}

type OptimizationShape = "scalar" | "packed" | "table";
type ComputeStage = "fragment" | "vertex" | "cpu";

export function GpuGems2Ch35OptimizationLab() {
  const [shape, setShape] = useState<OptimizationShape>("scalar");
  const [stage, setStage] = useState<ComputeStage>("fragment");
  const [coherence, setCoherence] = useState(70);
  const [fragments, setFragments] = useState(4);

  const result = useMemo(() => {
    const fragmentCount = 256 * fragments;
    const vectorWidth = shape === "packed" ? 4 : 1;
    const arithmeticUnits = Math.ceil(fragmentCount / vectorWidth);
    const stageMultiplier =
      stage === "fragment"
        ? fragmentCount
        : stage === "vertex"
          ? Math.ceil(fragmentCount / 16)
          : 1;
    const tableReads = shape === "table" ? stageMultiplier : 0;
    const packingWords = shape === "packed" ? Math.ceil(fragmentCount / 4) : 0;
    const cacheRisk =
      shape === "table" && coherence < 50
        ? "lookup 可能受 cache thrash 影响"
        : "访问局部性尚可，仍需 profile";
    const recommendation =
      shape === "scalar"
        ? "先检查是否能用 float4 或布局重排暴露数据级并行"
        : shape === "packed"
          ? "比较 packing / unpacking 与减少 fragment 的收益"
          : "只有查表节省的计算足够多且访问相干时才保留";
    return {
      arithmeticUnits,
      cacheRisk,
      packingWords,
      recommendation,
      stageMultiplier,
      tableReads,
    };
  }, [coherence, fragments, shape, stage]);

  const reset = () => {
    setShape("scalar");
    setStage("fragment");
    setCoherence(70);
    setFragments(4);
  };

  return (
    <Figure>
      <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <p className="mb-3 text-sm font-semibold text-primary">
            Optimization Lab · change one bottleneck at a time
          </p>
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="data layout"
          >
            {(["scalar", "packed", "table"] as OptimizationShape[]).map(
              (mode) => (
                <button
                  key={mode}
                  type="button"
                  className="rounded-full border px-3 py-1.5 text-sm font-semibold transition"
                  style={{
                    background: shape === mode ? C.accent : C.surface,
                    borderColor: shape === mode ? C.accent : C.border,
                    color: shape === mode ? C.bg : C.text,
                  }}
                  onClick={() => setShape(mode)}
                >
                  {mode}
                </button>
              ),
            )}
            <button
              type="button"
              className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-semibold text-secondary transition hover:border-accent hover:text-primary"
              onClick={reset}
            >
              reset
            </button>
          </div>
          <label className="mt-5 block text-sm text-secondary">
            compute stage
            <select
              aria-label="compute stage"
              className="mt-2 block w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-primary"
              value={stage}
              onChange={(event) => setStage(event.target.value as ComputeStage)}
            >
              <option value="fragment">fragment · per fragment</option>
              <option value="vertex">vertex · interpolated</option>
              <option value="cpu">CPU / uniform · once</option>
            </select>
          </label>
          <label className="mt-4 block text-sm text-secondary">
            lookup coherence: {coherence}%
            <input
              aria-label="lookup coherence"
              className="mt-2 block w-full accent-[var(--accent)]"
              type="range"
              min="10"
              max="100"
              step="10"
              value={coherence}
              onChange={(event) => setCoherence(Number(event.target.value))}
            />
          </label>
          <label className="mt-4 block text-sm text-secondary">
            fragment groups: {fragments}
            <input
              aria-label="fragment groups"
              className="mt-2 block w-full accent-[var(--accent)]"
              type="range"
              min="1"
              max="8"
              step="1"
              value={fragments}
              onChange={(event) => setFragments(Number(event.target.value))}
            />
          </label>
          <div className="mt-5 rounded-xl border border-border bg-surface p-4">
            <p className="text-sm font-semibold text-primary">
              What this layout exposes
            </p>
            <p className="mt-2 text-sm leading-6 text-secondary">
              {shape === "scalar" &&
                "每个 fragment 都做独立标量工作：先确认算术是否能合并，别急着加入查表。"}
              {shape === "packed" &&
                "四通道布局减少需要处理的逻辑单元，但需要把 packing 和 unpacking 纳入端到端时间。"}
              {shape === "table" &&
                "查表把计算换成读取：coherence 低时，缓存风险可能抵消省下的算术。"}
            </p>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="mb-2 text-sm font-semibold text-primary">
            Derived metrics
          </p>
          <Metric
            label="stage executions"
            value={`${result.stageMultiplier}`}
            tone={C.accent}
          />
          <Metric
            label="vector arithmetic units"
            value={`${result.arithmeticUnits}`}
            tone={C.success}
          />
          <Metric
            label="table reads"
            value={`${result.tableReads}`}
            tone={C.warning}
          />
          <Metric
            label="packing words"
            value={`${result.packingWords}`}
            tone={C.secondary}
          />
          <p className="mt-4 text-sm font-semibold text-primary">
            next experiment
          </p>
          <p className="mt-1 text-sm leading-6 text-secondary">
            {result.recommendation}
          </p>
          <p className="mt-4 text-xs leading-5 text-secondary">
            {result.cacheRisk}
            。这些指标描述工作量、频率和布局证据，不是合成性能分数。
          </p>
        </div>
      </div>
    </Figure>
  );
}
