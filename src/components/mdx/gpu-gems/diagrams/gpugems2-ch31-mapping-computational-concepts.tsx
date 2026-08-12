"use client";

import { useMemo, useState, type ReactNode } from "react";

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

function Box({
  detail,
  height = 124,
  stroke = C.border,
  title,
  width,
  x,
  y,
}: {
  detail: string;
  height?: number;
  stroke?: string;
  title: string;
  width: number;
  x: number;
  y: number;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="14"
        fill={C.surface}
        stroke={stroke}
        strokeWidth="2"
      />
      <text
        x={x + width / 2}
        y={y + 33}
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={stroke === C.border ? C.text : stroke}
      >
        {title}
      </text>
      <text
        x={x + width / 2}
        y={y + 70}
        textAnchor="middle"
        fontSize="12"
        fill={C.secondary}
      >
        {detail}
      </text>
    </g>
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
  value,
  tone = C.accent,
}: {
  label: string;
  value: string;
  tone?: string;
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

export function GpuGems2Ch31MappingOverviewDiagram() {
  return (
    <Figure>
      <Frame label="GPU 通用计算映射总览：CPU 数组变成 GPU texture stream，fragment program 扮演 kernel，输出写入 render target，并可作为下一 pass 的输入">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          把 CPU 的数据与循环，翻译成 GPU 的 stream 与 kernel
        </text>
        <Box
          x={24}
          y={134}
          width={156}
          title="CPU array"
          detail="元素与索引"
          stroke={C.secondary}
        />
        <Box
          x={211}
          y={134}
          width={156}
          title="GPU texture"
          detail="读入 stream"
          stroke={C.accent}
        />
        <Box
          x={398}
          y={134}
          width={156}
          title="fragment kernel"
          detail="并行 inner loop"
          stroke={C.warning}
        />
        <Box
          x={585}
          y={134}
          width={151}
          title="render target"
          detail="输出 stream"
          stroke={C.success}
        />
        <Arrow x1={181} y1={196} x2={207} y2={196} />
        <Arrow x1={368} y1={196} x2={394} y2={196} color={C.warning} />
        <Arrow x1={555} y1={196} x2={581} y2={196} color={C.success} />
        <path
          d="M 660 270 C 660 356, 118 356, 118 270"
          fill="none"
          stroke={C.accent}
          strokeWidth="3"
        />
        <Arrow x1={118} y1={270} x2={118} y2={270} color={C.accent} />
        <text x="380" y="334" textAnchor="middle" fontSize="13" fill={C.accent}>
          render-to-texture：下一步从上一步的输出开始
        </text>
        <text
          x="380"
          y="390"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          纹理坐标 ≈ 计算域索引　｜　顶点坐标 ≈ 计算输出范围
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch31ArithmeticIntensityDiagram() {
  const bars = [
    { label: "words transferred", low: 112, high: 112, tone: C.warning },
    { label: "operations", low: 48, high: 190, tone: C.accent },
  ];
  return (
    <Figure>
      <Frame label="算术强度对比：两个任务传输相同数量的数据，但高算术强度任务执行更多运算，更能利用 GPU 的计算吞吐">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          arithmetic intensity = operations / words transferred
        </text>
        <text
          x="190"
          y="88"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.warning}
        >
          memory-bound
        </text>
        <text
          x="570"
          y="88"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.accent}
        >
          compute-rich
        </text>
        {[190, 570].map((x) => (
          <g key={x}>
            <line
              x1={x - 116}
              y1="338"
              x2={x + 116}
              y2="338"
              stroke={C.border}
              strokeWidth="2"
            />
            <line
              x1={x - 116}
              y1="125"
              x2={x - 116}
              y2="338"
              stroke={C.border}
              strokeWidth="2"
            />
            <text x={x - 116} y="365" fontSize="11" fill={C.secondary}>
              0
            </text>
            <text
              x={x + 116}
              y="365"
              textAnchor="end"
              fontSize="11"
              fill={C.secondary}
            >
              relative amount
            </text>
          </g>
        ))}
        {bars.map((bar, index) => (
          <g key={bar.label}>
            <text x="34" y={195 + index * 72} fontSize="12" fill={C.secondary}>
              {bar.label}
            </text>
            <rect
              x="74"
              y={214 + index * 72}
              width={bar.low}
              height="28"
              rx="6"
              fill={bar.tone}
              fillOpacity="0.7"
            />
            <rect
              x="454"
              y={214 + index * 72}
              width={bar.high}
              height="28"
              rx="6"
              fill={bar.tone}
              fillOpacity="0.7"
            />
            <text
              x={82 + bar.low}
              y={233 + index * 72}
              fontSize="11"
              fontWeight="700"
              fill={C.text}
            >
              {index === 0 ? "same" : "small"}
            </text>
            <text
              x={462 + bar.high}
              y={233 + index * 72}
              fontSize="11"
              fontWeight="700"
              fill={C.text}
            >
              {index === 0 ? "same" : "large"}
            </text>
          </g>
        ))}
        <rect
          x="122"
          y="382"
          width="136"
          height="28"
          rx="8"
          fill={C.warning}
          fillOpacity="0.16"
          stroke={C.warning}
        />
        <text
          x="190"
          y="401"
          textAnchor="middle"
          fontSize="12"
          fill={C.warning}
        >
          AI ≈ 48 / 112
        </text>
        <rect
          x="502"
          y="382"
          width="136"
          height="28"
          rx="8"
          fill={C.accent}
          fillOpacity="0.16"
          stroke={C.accent}
        />
        <text x="570" y="401" textAnchor="middle" fontSize="12" fill={C.accent}>
          AI ≈ 190 / 112
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch31GatherScatterDiagram() {
  const cells = [0, 1, 2, 3, 4, 5];
  return (
    <Figure>
      <Frame label="GPU stream communication 对比：gather 由当前元素读取其他位置，scatter 由当前元素写入其他位置；fragment processors 更自然地支持 gather">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          stream communication：先分清谁在读，谁在写
        </text>
        <text x="42" y="96" fontSize="15" fontWeight="700" fill={C.accent}>
          gather
        </text>
        <text x="42" y="119" fontSize="12" fill={C.secondary}>
          当前 kernel 读取邻居，输出地址固定
        </text>
        {cells.map((cell) => (
          <g key={`g-${cell}`}>
            <rect
              x={104 + cell * 82}
              y="151"
              width="56"
              height="44"
              rx="8"
              fill={C.surface}
              stroke={cell === 2 || cell === 3 ? C.warning : C.border}
              strokeWidth="2"
            />
            <text
              x={132 + cell * 82}
              y="178"
              textAnchor="middle"
              fontSize="12"
              fill={C.text}
            >
              s{cell}
            </text>
          </g>
        ))}
        <Arrow x1={296} y1={221} x2={296} y2={201} color={C.warning} />
        <Arrow x1={378} y1={221} x2={378} y2={201} color={C.warning} />
        <text
          x="337"
          y="250"
          textAnchor="middle"
          fontSize="12"
          fill={C.warning}
        >
          one output reads several cells
        </text>
        <line x1="40" y1="278" x2="720" y2="278" stroke={C.border} />
        <text x="42" y="315" fontSize="15" fontWeight="700" fill={C.danger}>
          scatter
        </text>
        <text x="42" y="338" fontSize="12" fill={C.secondary}>
          当前 kernel 把值分发到其他位置，写入地址要变化
        </text>
        <rect
          x="102"
          y="363"
          width="60"
          height="42"
          rx="8"
          fill={C.surface}
          stroke={C.danger}
          strokeWidth="2"
        />
        <text x="132" y="389" textAnchor="middle" fontSize="12" fill={C.text}>
          s2
        </text>
        {cells.map((cell) => (
          <g key={`s-${cell}`}>
            <rect
              x={244 + cell * 72}
              y="363"
              width="50"
              height="42"
              rx="8"
              fill={C.surface}
              stroke={cell === 1 || cell === 4 ? C.danger : C.border}
              strokeWidth="2"
            />
            <text
              x={269 + cell * 72}
              y="389"
              textAnchor="middle"
              fontSize="12"
              fill={C.text}
            >
              o{cell}
            </text>
          </g>
        ))}
        <Arrow x1={164} y1={384} x2={244} y2={384} color={C.danger} />
        <Arrow x1={164} y1={384} x2={532} y2={384} color={C.danger} dashed />
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch31FeedbackDiagram() {
  return (
    <Figure>
      <Frame label="render-to-texture 反馈图：两个 buffer 交替作为输入与输出，每个 kernel pass 完成后交换角色，避免同一 buffer 同时读写">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          feedback = 完成一个 pass，再交换 input / output
        </text>
        <Box
          x={55}
          y={136}
          width={190}
          height={132}
          title="buffer A"
          detail="read: pass 0"
          stroke={C.accent}
        />
        <Box
          x={515}
          y={136}
          width={190}
          height={132}
          title="buffer B"
          detail="write: pass 0"
          stroke={C.warning}
        />
        <rect
          x="302"
          y="159"
          width="156"
          height="86"
          rx="14"
          fill={C.surface}
          stroke={C.success}
          strokeWidth="2"
        />
        <text
          x="380"
          y="195"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={C.success}
        >
          kernel
        </text>
        <text
          x="380"
          y="221"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          entire stream → next stream
        </text>
        <Arrow x1={248} y1={202} x2={298} y2={202} color={C.accent} />
        <Arrow x1={462} y1={202} x2={511} y2={202} color={C.warning} />
        <path
          d="M 610 286 C 610 351, 150 351, 150 286"
          fill="none"
          stroke={C.success}
          strokeWidth="3"
        />
        <Arrow x1={150} y1={286} x2={150} y2={286} color={C.success} />
        <text
          x="380"
          y="333"
          textAnchor="middle"
          fontSize="13"
          fill={C.success}
        >
          swap roles: B becomes read, A becomes write
        </text>
        <text
          x="380"
          y="386"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          规则：一个 buffer 不可同时作为 kernel input 与 output
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch31ReductionDiagram() {
  const stages = [
    { count: 8, label: "n", x: 58, tone: C.secondary },
    { count: 4, label: "n / 2", x: 226, tone: C.accent },
    { count: 2, label: "n / 4", x: 394, tone: C.warning },
    { count: 1, label: "result", x: 562, tone: C.success },
  ];
  return (
    <Figure>
      <Frame label="并行归约图：通过多次 render-to-texture pass，把 n 个值逐步合并成 n/2、n/4，直到单一结果；总 pass 数为 O(log n)">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          parallel reduction：每个 pass 缩小 computational range
        </text>
        {stages.map((stage, stageIndex) => (
          <g key={stage.label}>
            <text
              x={stage.x + 68}
              y="95"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={stage.tone}
            >
              {stage.label}
            </text>
            {Array.from({ length: stage.count }).map((_, index) => {
              const spacing = stage.count === 1 ? 0 : 116 / (stage.count - 1);
              const x = stage.x + 10 + index * spacing;
              return (
                <rect
                  key={`${stage.label}-${index}`}
                  x={x}
                  y="151"
                  width="18"
                  height="72"
                  rx="6"
                  fill={stage.tone}
                  fillOpacity="0.22"
                  stroke={stage.tone}
                />
              );
            })}
            <text
              x={stage.x + 68}
              y="265"
              textAnchor="middle"
              fontSize="11"
              fill={C.secondary}
            >
              read 2+ → write 1
            </text>
            {stageIndex < stages.length - 1 && (
              <Arrow
                x1={stage.x + 142}
                y1={187}
                x2={stages[stageIndex + 1].x - 12}
                y2={187}
                color={C.accent}
              />
            )}
          </g>
        ))}
        <rect
          x="160"
          y="326"
          width="440"
          height="50"
          rx="12"
          fill={C.surface}
          stroke={C.border}
        />
        <text x="380" y="347" textAnchor="middle" fontSize="13" fill={C.text}>
          pass 1　　 pass 2　　 pass 3　　 …
        </text>
        <text
          x="380"
          y="367"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          n 个输入 → 1 个结果，通常需要 O(log n) 个 pass
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch31AnalogiesDiagram() {
  const rows = [
    ["array", "texture / vertex array", C.accent],
    ["inner loop", "fragment program / kernel", C.warning],
    ["function call", "draw geometry", C.success],
    ["array index", "texture coordinates", C.accent],
    ["output range", "vertex coordinates", C.warning],
    ["feedback", "render-to-texture", C.success],
  ] as const;
  return (
    <Figure>
      <Frame label="CPU 与 GPU 概念映射表：array 对应 texture，inner loop 对应 fragment program，函数调用对应 draw geometry，索引对应 texture coordinates，反馈对应 render-to-texture">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          CPU 概念 ↔ GPU 图形概念
        </text>
        <rect
          x="62"
          y="70"
          width="636"
          height="42"
          rx="10"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="220"
          y="97"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={C.secondary}
        >
          CPU 思维
        </text>
        <text
          x="540"
          y="97"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={C.secondary}
        >
          GPU 映射
        </text>
        {rows.map(([cpu, gpu, tone], index) => {
          const y = 127 + index * 47;
          return (
            <g key={cpu}>
              <rect
                x="62"
                y={y}
                width="636"
                height="38"
                rx="8"
                fill={index % 2 ? C.bg : C.surface}
                stroke={C.border}
              />
              <text
                x="220"
                y={y + 25}
                textAnchor="middle"
                fontSize="13"
                fill={C.text}
              >
                {cpu}
              </text>
              <Arrow x1={340} y1={y + 19} x2={404} y2={y + 19} color={tone} />
              <text
                x="540"
                y={y + 25}
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill={tone}
              >
                {gpu}
              </text>
            </g>
          );
        })}
        <text
          x="380"
          y="424"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          映射的目的，是暴露数据形状与阶段边界，而不是隐藏 API 成本
        </text>
      </Frame>
    </Figure>
  );
}

type Operation = "map" | "gather" | "reduce";

export function GpuGems2Ch31MappingLab() {
  const [operation, setOperation] = useState<Operation>("map");
  const [lengthStep, setLengthStep] = useState(1);
  const [locality, setLocality] = useState(70);
  const result = useMemo(() => {
    const elements = 32 + lengthStep * 16;
    const reads =
      operation === "map"
        ? elements
        : operation === "gather"
          ? elements * 2
          : elements * 2 - 1;
    const writes = operation === "reduce" ? Math.ceil(elements / 2) : elements;
    const passes = operation === "reduce" ? Math.ceil(Math.log2(elements)) : 1;
    const transactions = Math.ceil(
      reads *
        (operation === "gather"
          ? 1.28 - locality / 160
          : 0.82 - locality / 500),
    );
    const range = operation === "reduce" ? writes : elements;
    return { elements, passes, range, reads, transactions, writes };
  }, [lengthStep, locality, operation]);

  return (
    <Figure>
      <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <p className="mb-3 text-sm font-semibold text-primary">
            Mapping Lab · change one concept at a time
          </p>
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="operation mode"
          >
            {(["gather", "map", "reduce"] as Operation[]).map((mode) => (
              <button
                key={mode}
                type="button"
                className="rounded-full border px-3 py-1.5 text-sm font-semibold transition"
                style={{
                  background: operation === mode ? C.accent : C.surface,
                  borderColor: operation === mode ? C.accent : C.border,
                  color: operation === mode ? C.bg : C.text,
                }}
                onClick={() => setOperation(mode)}
              >
                {mode}
              </button>
            ))}
            <button
              type="button"
              className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-semibold text-secondary transition hover:border-accent hover:text-primary"
              onClick={() => {
                setOperation("map");
                setLengthStep(1);
                setLocality(70);
              }}
            >
              reset
            </button>
          </div>
          <label className="mt-5 block text-sm text-secondary">
            stream length: {result.elements} elements
            <input
              aria-label="stream length"
              className="mt-2 block w-full accent-[var(--accent)]"
              type="range"
              min="0"
              max="3"
              step="1"
              value={lengthStep}
              onChange={(event) => setLengthStep(Number(event.target.value))}
            />
          </label>
          <label className="mt-4 block text-sm text-secondary">
            locality: {locality}%
            <input
              aria-label="memory locality"
              className="mt-2 block w-full accent-[var(--accent)]"
              type="range"
              min="0"
              max="100"
              step="10"
              value={locality}
              onChange={(event) => setLocality(Number(event.target.value))}
            />
          </label>
          <div className="mt-5 rounded-xl border border-border bg-surface p-4">
            <p className="text-sm font-semibold text-primary">
              What the model is doing
            </p>
            <p className="mt-2 text-sm leading-6 text-secondary">
              {operation === "map" &&
                "每个元素独立执行一次 kernel；输出范围与输入 stream 等长。"}
              {operation === "gather" &&
                "每个元素读取当前位置与一个邻居；locality 只影响读事务估算，不改变结果数量。"}
              {operation === "reduce" &&
                "每个元素与另一个元素合并；每个 pass 缩小输出范围，直到只剩一个结果。"}
            </p>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="mb-2 text-sm font-semibold text-primary">
            Derived metrics
          </p>
          <Metric label="input elements" value={`${result.elements}`} />
          <Metric
            label="texture reads"
            value={`${result.reads}`}
            tone={C.warning}
          />
          <Metric
            label="output range"
            value={`${result.range}`}
            tone={C.success}
          />
          <Metric label="writes" value={`${result.writes}`} tone={C.accent} />
          <Metric
            label="kernel passes"
            value={`${result.passes}`}
            tone={C.secondary}
          />
          <Metric
            label="read transactions"
            value={`${result.transactions}`}
            tone={C.danger}
          />
          <p className="mt-4 text-xs leading-5 text-secondary">
            事务数是由 reads 与 locality
            推导出的比较指标，不是硬件计时或性能分数；真实应用仍需 profile。
          </p>
        </div>
      </div>
    </Figure>
  );
}
