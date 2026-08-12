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

function Panel({
  detail,
  height = 112,
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
        y={y + 32}
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

export function GpuGems2Ch32LocalityDiagram() {
  const sequential = [0, 1, 2, 3, 4, 5, 6, 7];
  const random = [5, 1, 7, 2, 6, 0, 4, 3];
  return (
    <Figure>
      <Frame label="GPU 与 CPU 的内存访问局部性对比：顺序读取让 GPU 纹理系统持续填充相邻数据，随机读取和 pointer chasing 会带来更高的等待">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          locality：连续访问更接近 GPU 的强项
        </text>
        <text x="36" y="92" fontSize="15" fontWeight="700" fill={C.accent}>
          sequential
        </text>
        <text x="36" y="116" fontSize="12" fill={C.secondary}>
          相邻 texels 连续抵达，吞吐容易拉满
        </text>
        {sequential.map((value, index) => {
          const x = 110 + index * 72;
          return (
            <g key={`seq-${value}`}>
              <rect
                x={x}
                y="143"
                width="50"
                height="48"
                rx="8"
                fill={C.accent}
                fillOpacity="0.18"
                stroke={C.accent}
              />
              <text
                x={x + 25}
                y="173"
                textAnchor="middle"
                fontSize="12"
                fill={C.text}
              >
                {value}
              </text>
              {index < sequential.length - 1 && (
                <Arrow
                  x1={x + 53}
                  y1={167}
                  x2={x + 69}
                  y2={167}
                  color={C.accent}
                />
              )}
            </g>
          );
        })}
        <text x="36" y="246" fontSize="15" fontWeight="700" fill={C.danger}>
          random / pointer chasing
        </text>
        <text x="36" y="270" fontSize="12" fill={C.secondary}>
          地址跳跃，读取之间更难被并行工作覆盖
        </text>
        {random.map((value, index) => {
          const x = 110 + index * 72;
          return (
            <g key={`random-${index}-${value}`}>
              <rect
                x={x}
                y="297"
                width="50"
                height="48"
                rx="8"
                fill={C.danger}
                fillOpacity="0.16"
                stroke={C.danger}
              />
              <text
                x={x + 25}
                y="327"
                textAnchor="middle"
                fontSize="12"
                fill={C.text}
              >
                {value}
              </text>
              {index < random.length - 1 && (
                <Arrow
                  x1={x + 53}
                  y1={321}
                  x2={x + 69}
                  y2={321}
                  color={C.danger}
                  dashed
                />
              )}
            </g>
          );
        })}
        <text
          x="380"
          y="395"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          纹理 cache 偏向二维局部读取，不等于 CPU 的大而通用的 read/write cache
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch32ArithmeticIntensityDiagram() {
  return (
    <Figure>
      <Frame label="算术强度与纹理延迟图：读取之后加入足够算术可以覆盖等待，高算术强度更可能从 GPU 计算吞吐中获益">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          arithmetic intensity：用计算覆盖 memory latency
        </text>
        <Panel
          x={38}
          y={90}
          width={205}
          height={190}
          title="texture fetch"
          detail="发出读取请求"
          stroke={C.warning}
        />
        <Panel
          x={278}
          y={90}
          width={205}
          height={190}
          title="next fragment"
          detail="先做别的工作"
          stroke={C.secondary}
        />
        <Panel
          x={518}
          y={90}
          width={205}
          height={190}
          title="resume"
          detail="数据返回后继续"
          stroke={C.success}
        />
        <Arrow x1={246} y1={185} x2={274} y2={185} color={C.warning} />
        <Arrow x1={486} y1={185} x2={514} y2={185} color={C.success} />
        <path
          d="M 142 302 C 142 356, 618 356, 618 302"
          fill="none"
          stroke={C.accent}
          strokeWidth="3"
        />
        <Arrow x1={618} y1={302} x2={618} y2={302} color={C.accent} />
        <text x="380" y="332" textAnchor="middle" fontSize="13" fill={C.accent}>
          更多 arithmetic instructions → 更有机会隐藏读取等待
        </text>
        <rect
          x="168"
          y="381"
          width="424"
          height="30"
          rx="9"
          fill={C.surface}
          stroke={C.border}
        />
        <text x="380" y="401" textAnchor="middle" fontSize="12" fill={C.text}>
          AI = arithmetic operations / memory operations
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch32TransferAmortizationDiagram() {
  const bars = [
    ["one vector add", 146, C.danger],
    ["many simulation steps", 430, C.success],
  ] as const;
  return (
    <Figure>
      <Frame label="下载与读回成本的摊销图：一次性的向 GPU 下载与从 GPU 读回可能超过简单向量加法的收益，多次迭代可以摊薄这两次传输">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          download + compute + readback：传输成本必须进入总账
        </text>
        <text x="52" y="92" fontSize="13" fontWeight="700" fill={C.secondary}>
          端到端时间线
        </text>
        <rect
          x="52"
          y="116"
          width="150"
          height="54"
          rx="10"
          fill={C.warning}
          fillOpacity="0.18"
          stroke={C.warning}
        />
        <text x="127" y="149" textAnchor="middle" fontSize="13" fill={C.text}>
          download
        </text>
        <Arrow x1={207} y1={143} x2={246} y2={143} color={C.warning} />
        <rect
          x="252"
          y="116"
          width="258"
          height="54"
          rx="10"
          fill={C.accent}
          fillOpacity="0.18"
          stroke={C.accent}
        />
        <text x="381" y="149" textAnchor="middle" fontSize="13" fill={C.text}>
          GPU compute × iterations
        </text>
        <Arrow x1={515} y1={143} x2={554} y2={143} color={C.success} />
        <rect
          x="560"
          y="116"
          width="150"
          height="54"
          rx="10"
          fill={C.success}
          fillOpacity="0.18"
          stroke={C.success}
        />
        <text x="635" y="149" textAnchor="middle" fontSize="13" fill={C.text}>
          readback
        </text>
        <text x="52" y="226" fontSize="13" fontWeight="700" fill={C.secondary}>
          同样的传输，计算次数不同
        </text>
        {bars.map(([label, width, tone], index) => {
          const y = 252 + index * 64;
          return (
            <g key={label}>
              <text x="52" y={y + 21} fontSize="12" fill={C.secondary}>
                {label}
              </text>
              <rect
                x="218"
                y={y}
                width={width}
                height="30"
                rx="7"
                fill={tone}
                fillOpacity="0.72"
              />
              <text
                x={230 + width}
                y={y + 21}
                fontSize="12"
                fontWeight="700"
                fill={tone}
              >
                {index === 0 ? "传输占比高" : "传输被多次计算摊薄"}
              </text>
            </g>
          );
        })}
        <text
          x="380"
          y="407"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          与 CPU 比较时，不能只比较 shader 时间
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch32PrecisionDiagram() {
  const rows = [
    ["NVIDIA fp16", "10", "2,048", "143.875", C.danger],
    ["ATI fp24", "16", "131,072", "143.98242", C.warning],
    ["NVIDIA fp32", "23", "16,777,216", "143.98375", C.success],
  ] as const;
  return (
    <Figure>
      <Frame label="GPU 浮点格式对比：fp16、fp24 和 fp32 的 mantissa 位数不同，能连续精确表示的整数范围和 143.98375329 的近似结果也不同">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          precision 不是颜色细节：它也决定地址和数值能否可信
        </text>
        <rect
          x="42"
          y="72"
          width="676"
          height="42"
          rx="10"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="126"
          y="98"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={C.secondary}
        >
          format
        </text>
        <text
          x="268"
          y="98"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={C.secondary}
        >
          mantissa bits
        </text>
        <text
          x="430"
          y="98"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={C.secondary}
        >
          last exact integer
        </text>
        <text
          x="615"
          y="98"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={C.secondary}
        >
          143.98375329 →
        </text>
        {rows.map(([format, bits, integer, result, tone], index) => {
          const y = 130 + index * 70;
          return (
            <g key={format}>
              <rect
                x="42"
                y={y}
                width="676"
                height="56"
                rx="9"
                fill={index % 2 ? C.bg : C.surface}
                stroke={C.border}
              />
              <circle cx="76" cy={y + 28} r="8" fill={tone} />
              <text
                x="95"
                y={y + 33}
                fontSize="12"
                fontWeight="700"
                fill={tone}
              >
                {format}
              </text>
              <text
                x="268"
                y={y + 33}
                textAnchor="middle"
                fontSize="12"
                fill={C.text}
              >
                {bits}
              </text>
              <text
                x="430"
                y={y + 33}
                textAnchor="middle"
                fontSize="12"
                fill={C.text}
              >
                {integer}
              </text>
              <text
                x="615"
                y={y + 33}
                textAnchor="middle"
                fontSize="12"
                fill={tone}
              >
                {result}
              </text>
            </g>
          );
        })}
        <rect
          x="122"
          y="359"
          width="516"
          height="44"
          rx="11"
          fill={C.warning}
          fillOpacity="0.14"
          stroke={C.warning}
        />
        <text
          x="380"
          y="386"
          textAnchor="middle"
          fontSize="12"
          fill={C.warning}
        >
          地址用浮点数计算时，跳过的整数可能表现成 off-by-one bug
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch32ScatterStrategiesDiagram() {
  return (
    <Figure>
      <Frame label="scatter 绕行策略：固定连接可以把 scatter 改写为 gather，动态地址可以输出地址数据对后排序，也可以用 vertex point rendering 直接指定输出位置">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          scatter 的三条绕行路线
        </text>
        <Panel
          x={28}
          y={88}
          width={220}
          height={238}
          title="固定地址"
          detail="convert to gather"
          stroke={C.accent}
        />
        <Panel
          x={270}
          y={88}
          width={220}
          height={238}
          title="动态地址"
          detail="address sorting"
          stroke={C.warning}
        />
        <Panel
          x={512}
          y={88}
          width={220}
          height={238}
          title="少量写入"
          detail="render points"
          stroke={C.success}
        />
        <text x="138" y="165" textAnchor="middle" fontSize="12" fill={C.text}>
          spring force
        </text>
        <Arrow x1={138} y1={179} x2={138} y2={205} color={C.accent} />
        <text
          x="138"
          y="228"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          buffer forces
        </text>
        <Arrow x1={138} y1={242} x2={138} y2={268} color={C.accent} />
        <text x="138" y="291" textAnchor="middle" fontSize="12" fill={C.accent}>
          mass gathers neighbors
        </text>
        <text x="380" y="165" textAnchor="middle" fontSize="12" fill={C.text}>
          value + address
        </text>
        <Arrow x1={380} y1={179} x2={380} y2={205} color={C.warning} />
        <text
          x="380"
          y="228"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          sort address pairs
        </text>
        <Arrow x1={380} y1={242} x2={380} y2={268} color={C.warning} />
        <text
          x="380"
          y="291"
          textAnchor="middle"
          fontSize="12"
          fill={C.warning}
        >
          binary search + gather
        </text>
        <text x="622" y="165" textAnchor="middle" fontSize="12" fill={C.text}>
          vertex reads address
        </text>
        <Arrow x1={622} y1={179} x2={622} y2={205} color={C.success} />
        <text
          x="622"
          y="228"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          point destination
        </text>
        <Arrow x1={622} y1={242} x2={622} y2={268} color={C.success} />
        <text
          x="622"
          y="291"
          textAnchor="middle"
          fontSize="12"
          fill={C.success}
        >
          watch collisions
        </text>
        <text
          x="380"
          y="384"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          选择依据：地址是否固定、散射量大小、碰撞是否可接受
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch32DecisionTreeDiagram() {
  return (
    <Figure>
      <Frame label="GPU 迁移决策树：先判断 locality 和 arithmetic intensity，再核对下载读回，最后在 gather 转换、地址排序和点渲染之间选择 scatter 绕行方案">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          从 CPU 任务到 GPU 策略的验收顺序
        </text>
        <Panel
          x={270}
          y={74}
          width={220}
          height={78}
          title="访问连续吗？"
          detail="locality"
          stroke={C.accent}
        />
        <Arrow x1={380} y1={154} x2={380} y2={184} color={C.accent} />
        <Panel
          x={270}
          y={188}
          width={220}
          height={78}
          title="计算够多吗？"
          detail="arithmetic intensity"
          stroke={C.warning}
        />
        <Arrow x1={380} y1={268} x2={380} y2={298} color={C.warning} />
        <Panel
          x={270}
          y={302}
          width={220}
          height={78}
          title="能摊薄传输吗？"
          detail="download / readback"
          stroke={C.success}
        />
        <path
          d="M 270 113 C 160 113, 102 150, 102 190"
          fill="none"
          stroke={C.danger}
          strokeWidth="2"
        />
        <Arrow x1={102} y1={190} x2={102} y2={190} color={C.danger} />
        <text x="102" y="216" textAnchor="middle" fontSize="12" fill={C.danger}>
          否：留在 CPU 或改布局
        </text>
        <path
          d="M 490 227 C 596 227, 658 190, 658 152"
          fill="none"
          stroke={C.danger}
          strokeWidth="2"
        />
        <Arrow x1={658} y1={152} x2={658} y2={152} color={C.danger} />
        <text x="658" y="128" textAnchor="middle" fontSize="12" fill={C.danger}>
          否：收益会被带宽吞掉
        </text>
        <text
          x="380"
          y="420"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          通过三关后，才进入 scatter 的具体实现选择
        </text>
      </Frame>
    </Figure>
  );
}

type Workload = "vector" | "histogram" | "spring";

export function GpuGems2Ch32StrategyLab() {
  const [workload, setWorkload] = useState<Workload>("histogram");
  const [work, setWork] = useState(2);
  const [locality, setLocality] = useState(70);
  const [precision, setPrecision] = useState<"fp16" | "fp24" | "fp32">("fp32");
  const result = useMemo(() => {
    const elements = 1024 * (work + 1);
    const arithmetic =
      workload === "vector"
        ? elements * 2
        : workload === "histogram"
          ? elements * 12
          : elements * 28;
    const reads =
      workload === "vector"
        ? elements * 2
        : workload === "histogram"
          ? elements * 3
          : elements * 5;
    const transactions = Math.ceil(reads * (1.2 - locality / 125));
    const transferWords = elements * (workload === "spring" ? 2 : 3);
    const iterations =
      workload === "spring" ? work + 2 : workload === "histogram" ? 1 : 1;
    const safeInteger =
      precision === "fp16" ? 2048 : precision === "fp24" ? 131072 : 16777216;
    const strategy =
      workload === "vector"
        ? "sequential map"
        : workload === "histogram"
          ? "address sort + gather"
          : "convert scatter to gather";
    return {
      arithmetic,
      elements,
      iterations,
      safeInteger,
      strategy,
      transactions,
      transferWords,
    };
  }, [locality, precision, work, workload]);

  return (
    <Figure>
      <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <p className="mb-3 text-sm font-semibold text-primary">
            Strategy Lab · compare the bottleneck shape
          </p>
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="workload"
          >
            {(["vector", "histogram", "spring"] as Workload[]).map((mode) => (
              <button
                key={mode}
                type="button"
                className="rounded-full border px-3 py-1.5 text-sm font-semibold transition"
                style={{
                  background: workload === mode ? C.accent : C.surface,
                  borderColor: workload === mode ? C.accent : C.border,
                  color: workload === mode ? C.bg : C.text,
                }}
                onClick={() => setWorkload(mode)}
              >
                {mode}
              </button>
            ))}
            <button
              type="button"
              className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-semibold text-secondary transition hover:border-accent hover:text-primary"
              onClick={() => {
                setWorkload("histogram");
                setWork(2);
                setLocality(70);
                setPrecision("fp32");
              }}
            >
              reset
            </button>
          </div>
          <label className="mt-5 block text-sm text-secondary">
            work size: {result.elements} elements
            <input
              aria-label="work size"
              className="mt-2 block w-full accent-[var(--accent)]"
              type="range"
              min="0"
              max="4"
              step="1"
              value={work}
              onChange={(event) => setWork(Number(event.target.value))}
            />
          </label>
          <label className="mt-4 block text-sm text-secondary">
            locality: {locality}%
            <input
              aria-label="locality"
              className="mt-2 block w-full accent-[var(--accent)]"
              type="range"
              min="0"
              max="100"
              step="10"
              value={locality}
              onChange={(event) => setLocality(Number(event.target.value))}
            />
          </label>
          <label className="mt-4 block text-sm text-secondary">
            precision
            <select
              aria-label="precision"
              className="mt-2 block w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-primary"
              value={precision}
              onChange={(event) =>
                setPrecision(event.target.value as typeof precision)
              }
            >
              <option value="fp16">fp16</option>
              <option value="fp24">fp24</option>
              <option value="fp32">fp32</option>
            </select>
          </label>
          <div className="mt-5 rounded-xl border border-border bg-surface p-4">
            <p className="text-sm font-semibold text-primary">
              What this workload exposes
            </p>
            <p className="mt-2 text-sm leading-6 text-secondary">
              {workload === "vector" &&
                "顺序读写、低算术强度的向量加法，容易被传输成本主导。"}
              {workload === "histogram" &&
                "动态写入地址的 histogram，需要先把 scatter 改成 address sort + gather。"}
              {workload === "spring" &&
                "固定连接的 spring-mass 可以先写 force，再让 mass pass gather 邻居贡献。"}
            </p>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="mb-2 text-sm font-semibold text-primary">
            Derived metrics
          </p>
          <Metric
            label="arithmetic operations"
            value={`${result.arithmetic}`}
            tone={C.accent}
          />
          <Metric
            label="texture reads"
            value={`${result.transactions}`}
            tone={C.warning}
          />
          <Metric
            label="transfer words"
            value={`${result.transferWords}`}
            tone={C.danger}
          />
          <Metric
            label="iterations"
            value={`${result.iterations}`}
            tone={C.success}
          />
          <Metric
            label="safe integer ceiling"
            value={`${result.safeInteger}`}
            tone={C.secondary}
          />
          <p className="mt-4 text-sm font-semibold text-primary">
            recommended mapping
          </p>
          <p className="mt-1 text-sm leading-6 text-secondary">
            {result.strategy}
          </p>
          <p className="mt-4 text-xs leading-5 text-secondary">
            这些是由控件直接推导的工作量与表示范围，不是合成性能分数；最终仍需在目标设备上
            profile。
          </p>
        </div>
      </div>
    </Figure>
  );
}
