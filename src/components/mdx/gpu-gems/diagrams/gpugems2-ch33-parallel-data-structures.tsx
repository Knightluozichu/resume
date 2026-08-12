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
  height = 120,
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
        y={y + 72}
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

export function GpuGems2Ch33StreamProgramDiagram() {
  const elements = ["p0", "p1", "p2", "p3"];
  return (
    <Figure>
      <Frame label="stream program 数据依赖图：输入 stream 的每个元素进入同一个 kernel，独立地产生输出 stream 的对应元素，禁止 kernel 任意写入其他位置">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          stream program = input stream → kernel → output stream
        </text>
        <text x="42" y="96" fontSize="14" fontWeight="700" fill={C.secondary}>
          input stream
        </text>
        <text x="292" y="96" fontSize="14" fontWeight="700" fill={C.warning}>
          same kernel
        </text>
        <text x="588" y="96" fontSize="14" fontWeight="700" fill={C.success}>
          output stream
        </text>
        {elements.map((element, index) => {
          const y = 130 + index * 54;
          return (
            <g key={element}>
              <rect
                x="38"
                y={y}
                width="126"
                height="36"
                rx="8"
                fill={C.accent}
                fillOpacity="0.18"
                stroke={C.accent}
              />
              <text
                x="101"
                y={y + 24}
                textAnchor="middle"
                fontSize="12"
                fill={C.text}
              >
                {element}
              </text>
              <Arrow
                x1={174}
                y1={y + 18}
                x2={280}
                y2={y + 18}
                color={C.accent}
              />
              <rect
                x="286"
                y={y}
                width="188"
                height="36"
                rx="8"
                fill={C.warning}
                fillOpacity="0.18"
                stroke={C.warning}
              />
              <text
                x="380"
                y={y + 24}
                textAnchor="middle"
                fontSize="12"
                fill={C.text}
              >
                loopBody({element})
              </text>
              <Arrow
                x1={484}
                y1={y + 18}
                x2={590}
                y2={y + 18}
                color={C.success}
              />
              <rect
                x="596"
                y={y}
                width="126"
                height="36"
                rx="8"
                fill={C.success}
                fillOpacity="0.18"
                stroke={C.success}
              />
              <text
                x="659"
                y={y + 24}
                textAnchor="middle"
                fontSize="12"
                fill={C.text}
              >
                q{index}
              </text>
            </g>
          );
        })}
        <rect
          x="126"
          y="371"
          width="508"
          height="42"
          rx="11"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="380"
          y="397"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          parallelism 来自：一个元素不能改变同一 stream 中另一个元素的结果
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch33MemoryHierarchyDiagram() {
  const streams = [
    ["vertex", "input vertices", C.accent],
    ["texture", "random reads", C.warning],
    ["fragment", "rasterizer output", C.secondary],
    ["frame buffer", "fixed writes", C.success],
  ] as const;
  return (
    <Figure>
      <Frame label="GPU 内存层次图：CPU memory 通过总线进入 GPU memory，GPU 内部由 registers、texture reads、fragment streams 和 frame-buffer writes 组成多个受限 stream 类型">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          GPU memory model：不是一块可任意读写的统一内存
        </text>
        <Panel
          x={30}
          y={86}
          width={184}
          height={142}
          title="CPU memory"
          detail="host address space"
          stroke={C.secondary}
        />
        <Arrow x1={220} y1={157} x2={274} y2={157} color={C.warning} />
        <text
          x="247"
          y="136"
          textAnchor="middle"
          fontSize="11"
          fill={C.warning}
        >
          copy
        </text>
        <Panel
          x={280}
          y={86}
          width={184}
          height={142}
          title="GPU memory"
          detail="device address space"
          stroke={C.accent}
        />
        <Arrow x1={470} y1={157} x2={524} y2={157} color={C.accent} />
        <Panel
          x={530}
          y={86}
          width={200}
          height={142}
          title="GPU processors"
          detail="registers + kernels"
          stroke={C.success}
        />
        <text x="38" y="280" fontSize="14" fontWeight="700" fill={C.secondary}>
          visible stream types
        </text>
        {streams.map(([name, detail, tone], index) => {
          const x = 38 + index * 178;
          return (
            <g key={name}>
              <rect
                x={x}
                y="307"
                width="158"
                height="58"
                rx="10"
                fill={tone}
                fillOpacity="0.16"
                stroke={tone}
              />
              <text
                x={x + 79}
                y="332"
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill={tone}
              >
                {name}
              </text>
              <text
                x={x + 79}
                y="352"
                textAnchor="middle"
                fontSize="11"
                fill={C.secondary}
              >
                {detail}
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
          访问规则是并行性的边界：读取可间接，写入位置通常预先决定
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch33ArrayPackingDiagram() {
  const cells = Array.from({ length: 16 }, (_, index) => index);
  return (
    <Figure>
      <Frame label="一维数组打包到二维纹理：一维索引按行映射到 4 乘 4 的二维地址，floor 和 frac 负责把逻辑索引转换为纹理坐标">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          1D array → 2D texture：把地址布局变成可更新的表面
        </text>
        <text x="42" y="90" fontSize="14" fontWeight="700" fill={C.secondary}>
          logical 1D array
        </text>
        <g>
          {cells.map((value, index) => {
            const x = 42 + index * 42;
            return (
              <g key={value}>
                <rect
                  x={x}
                  y="112"
                  width="32"
                  height="36"
                  rx="6"
                  fill={value === 6 ? C.warning : C.accent}
                  fillOpacity="0.18"
                  stroke={value === 6 ? C.warning : C.accent}
                />
                <text
                  x={x + 16}
                  y="135"
                  textAnchor="middle"
                  fontSize="11"
                  fill={C.text}
                >
                  {value}
                </text>
              </g>
            );
          })}
        </g>
        <Arrow x1={372} y1={167} x2={372} y2={207} color={C.warning} />
        <text
          x="380"
          y="191"
          textAnchor="middle"
          fontSize="12"
          fill={C.warning}
        >
          address translation
        </text>
        <text x="42" y="241" fontSize="14" fontWeight="700" fill={C.secondary}>
          packed 2D texture
        </text>
        {cells.map((value) => {
          const row = Math.floor(value / 4);
          const column = value % 4;
          const x = 42 + column * 72;
          const y = 264 + row * 38;
          return (
            <g key={`grid-${value}`}>
              <rect
                x={x}
                y={y}
                width="56"
                height="28"
                rx="6"
                fill={value === 6 ? C.warning : C.success}
                fillOpacity="0.18"
                stroke={value === 6 ? C.warning : C.success}
              />
              <text
                x={x + 28}
                y={y + 19}
                textAnchor="middle"
                fontSize="11"
                fill={C.text}
              >
                {value}
              </text>
            </g>
          );
        })}
        <rect
          x="398"
          y="258"
          width="302"
          height="122"
          rx="12"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="549"
          y="288"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={C.text}
        >
          translation contract
        </text>
        <text
          x="549"
          y="319"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          row = floor(i / width)
        </text>
        <text
          x="549"
          y="345"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          column = i modulo width
        </text>
        <text
          x="380"
          y="417"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          2D texture 既提供可更新的 frame-buffer 形状，也带来一次地址翻译
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch33StructureStreamsDiagram() {
  return (
    <Figure>
      <Frame label="数据结构布局对比：stream of structures 把 a 和 b 交错在一起，难以按固定 fragment 输出更新；structure of streams 为每个成员建立独立 stream，共享相同索引">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          stream of structures vs structure of streams
        </text>
        <Panel
          x={34}
          y={82}
          width={306}
          height={250}
          title="stream of structures"
          detail="AoS：记录交错"
          stroke={C.danger}
        />
        <Panel
          x={420}
          y={82}
          width={306}
          height={250}
          title="structure of streams"
          detail="SoA：成员分流"
          stroke={C.success}
        />
        {Array.from({ length: 4 }).map((_, index) => {
          const y = 132 + index * 42;
          return (
            <g key={`aos-${index}`}>
              <rect
                x="66"
                y={y}
                width="116"
                height="30"
                rx="6"
                fill={C.accent}
                fillOpacity="0.18"
                stroke={C.accent}
              />
              <text
                x="124"
                y={y + 20}
                textAnchor="middle"
                fontSize="11"
                fill={C.text}
              >
                a{index}
              </text>
              <rect
                x="188"
                y={y}
                width="116"
                height="30"
                rx="6"
                fill={C.warning}
                fillOpacity="0.18"
                stroke={C.warning}
              />
              <text
                x="246"
                y={y + 20}
                textAnchor="middle"
                fontSize="11"
                fill={C.text}
              >
                b{index}
              </text>
            </g>
          );
        })}
        {Array.from({ length: 4 }).map((_, index) => {
          const y = 132 + index * 42;
          return (
            <g key={`soa-${index}`}>
              <rect
                x="452"
                y={y}
                width="112"
                height="30"
                rx="6"
                fill={C.accent}
                fillOpacity="0.18"
                stroke={C.accent}
              />
              <text
                x="508"
                y={y + 20}
                textAnchor="middle"
                fontSize="11"
                fill={C.text}
              >
                a{index}
              </text>
              <rect
                x="584"
                y={y}
                width="112"
                height="30"
                rx="6"
                fill={C.warning}
                fillOpacity="0.18"
                stroke={C.warning}
              />
              <text
                x="640"
                y={y + 20}
                textAnchor="middle"
                fontSize="11"
                fill={C.text}
              >
                b{index}
              </text>
            </g>
          );
        })}
        <path
          d="M 340 205 C 366 205, 394 205, 416 205"
          fill="none"
          stroke={C.success}
          strokeWidth="3"
        />
        <Arrow x1={416} y1={205} x2={416} y2={205} color={C.success} />
        <text
          x="380"
          y="372"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          同一索引保持对应关系，成员数量还必须不超过 fragment 输出能力
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch33SparseIndirectionDiagram() {
  return (
    <Figure>
      <Frame label="静态稀疏结构的多级间接访问：规则网格指向列表起点，列表再指向顶点数据；固定结构可以用若干 pointer streams 表达不规则数据">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          static sparse data：用 pointer streams 保存稀疏关系
        </text>
        <Panel
          x={30}
          y={106}
          width={190}
          height={180}
          title="regular grid"
          detail="cell → list pointer"
          stroke={C.accent}
        />
        <Panel
          x={286}
          y={106}
          width={190}
          height={180}
          title="triangle list"
          detail="list → vertex pointer"
          stroke={C.warning}
        />
        <Panel
          x={542}
          y={106}
          width={190}
          height={180}
          title="vertex texture"
          detail="actual payload"
          stroke={C.success}
        />
        <Arrow x1={224} y1={196} x2={282} y2={196} color={C.accent} />
        <Arrow x1={480} y1={196} x2={538} y2={196} color={C.warning} />
        {Array.from({ length: 3 }).map((_, index) => (
          <g key={`pointer-${index}`}>
            <circle
              cx={92 + index * 44}
              cy="205"
              r="12"
              fill={C.accent}
              fillOpacity="0.22"
              stroke={C.accent}
            />
            <text
              x={92 + index * 44}
              y="209"
              textAnchor="middle"
              fontSize="11"
              fill={C.text}
            >
              p{index}
            </text>
          </g>
        ))}
        {Array.from({ length: 3 }).map((_, index) => (
          <g key={`list-${index}`}>
            <rect
              x={328 + index * 45}
              y="185"
              width="30"
              height="40"
              rx="6"
              fill={C.warning}
              fillOpacity="0.22"
              stroke={C.warning}
            />
            <text
              x={343 + index * 45}
              y="209"
              textAnchor="middle"
              fontSize="11"
              fill={C.text}
            >
              l{index}
            </text>
          </g>
        ))}
        {Array.from({ length: 3 }).map((_, index) => (
          <g key={`vertex-${index}`}>
            <rect
              x={584 + index * 45}
              y="185"
              width="30"
              height="40"
              rx="6"
              fill={C.success}
              fillOpacity="0.22"
              stroke={C.success}
            />
            <text
              x={599 + index * 45}
              y="209"
              textAnchor="middle"
              fontSize="11"
              fill={C.text}
            >
              v{index}
            </text>
          </g>
        ))}
        <rect
          x="137"
          y="335"
          width="486"
          height="54"
          rx="11"
          fill={C.surface}
          stroke={C.border}
        />
        <text x="380" y="358" textAnchor="middle" fontSize="13" fill={C.text}>
          dependent texture read = value becomes next address
        </text>
        <text
          x="380"
          y="378"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          结构固定时，访问模式可以按 block 统一，避免完全随机的更新
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch33DynamicTilesDiagram() {
  return (
    <Figure>
      <Frame label="动态稀疏 tile 图：GPU 只计算 active tiles，生成压缩的 bit-vector request，CPU 负责分配和释放 tile，再把新的 active set 送回 GPU">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          dynamic sparse data：GPU 算重活，CPU 管理 tile 生命周期
        </text>
        <Panel
          x={28}
          y={101}
          width={188}
          height={188}
          title="CPU manager"
          detail="allocate / free tiles"
          stroke={C.warning}
        />
        <Panel
          x={286}
          y={101}
          width={188}
          height={188}
          title="active tiles"
          detail="GPU computes only these"
          stroke={C.accent}
        />
        <Panel
          x={544}
          y={101}
          width={188}
          height={188}
          title="request image"
          detail="compressed bit vector"
          stroke={C.success}
        />
        <Arrow x1={220} y1={169} x2={282} y2={169} color={C.warning} />
        <Arrow x1={480} y1={217} x2={540} y2={217} color={C.success} />
        <path
          d="M 638 301 C 638 359, 122 359, 122 301"
          fill="none"
          stroke={C.accent}
          strokeWidth="3"
        />
        <Arrow x1={122} y1={301} x2={122} y2={301} color={C.accent} />
        <text x="380" y="340" textAnchor="middle" fontSize="13" fill={C.accent}>
          decode request → new vertex / texture stream
        </text>
        {Array.from({ length: 4 }).map((_, index) => (
          <rect
            key={`tile-${index}`}
            x={324 + (index % 2) * 52}
            y={146 + Math.floor(index / 2) * 52}
            width="38"
            height="38"
            rx="6"
            fill={index === 1 ? C.surface : C.accent}
            fillOpacity={index === 1 ? 1 : 0.25}
            stroke={C.accent}
          />
        ))}
        {Array.from({ length: 8 }).map((_, index) => (
          <rect
            key={`bit-${index}`}
            x={574 + index * 17}
            y="190"
            width="12"
            height="30"
            rx="3"
            fill={index === 2 || index === 5 ? C.success : C.border}
          />
        ))}
        <text
          x="380"
          y="408"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          少量压缩通信把内存管理边界移到 CPU，数据本身仍尽量驻留 GPU
        </text>
      </Frame>
    </Figure>
  );
}

type StructureMode = "array" | "structure" | "sparse";

export function GpuGems2Ch33DataStructureLab() {
  const [mode, setMode] = useState<StructureMode>("sparse");
  const [activeRatio, setActiveRatio] = useState(35);
  const [indirection, setIndirection] = useState(2);
  const result = useMemo(() => {
    const elements = 1024 * (mode === "array" ? 1 : 2);
    const active =
      mode === "sparse"
        ? Math.max(1, Math.round((elements * activeRatio) / 100))
        : elements;
    const addressOps =
      mode === "array"
        ? elements * 2
        : mode === "structure"
          ? elements * 3
          : active * (indirection + 2);
    const streams =
      mode === "array" ? 1 : mode === "structure" ? 2 : indirection + 1;
    const passes = mode === "sparse" ? 2 + Math.ceil(indirection / 2) : 1;
    const memoryUnits =
      mode === "sparse" ? active + active * indirection : elements * streams;
    const rule =
      mode === "array"
        ? "2D packing + address translation"
        : mode === "structure"
          ? "structure of streams"
          : "active tiles + CPU manager";
    return { active, addressOps, elements, memoryUnits, passes, rule, streams };
  }, [activeRatio, indirection, mode]);

  return (
    <Figure>
      <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <p className="mb-3 text-sm font-semibold text-primary">
            Data Structure Lab · choose the representation
          </p>
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="data structure mode"
          >
            {(["array", "structure", "sparse"] as StructureMode[]).map(
              (choice) => (
                <button
                  key={choice}
                  type="button"
                  className="rounded-full border px-3 py-1.5 text-sm font-semibold transition"
                  style={{
                    background: mode === choice ? C.accent : C.surface,
                    borderColor: mode === choice ? C.accent : C.border,
                    color: mode === choice ? C.bg : C.text,
                  }}
                  onClick={() => setMode(choice)}
                >
                  {choice}
                </button>
              ),
            )}
            <button
              type="button"
              className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-semibold text-secondary transition hover:border-accent hover:text-primary"
              onClick={() => {
                setMode("sparse");
                setActiveRatio(35);
                setIndirection(2);
              }}
            >
              reset
            </button>
          </div>
          <label className="mt-5 block text-sm text-secondary">
            active ratio: {activeRatio}%
            <input
              aria-label="active ratio"
              className="mt-2 block w-full accent-[var(--accent)]"
              type="range"
              min="5"
              max="100"
              step="5"
              value={activeRatio}
              onChange={(event) => setActiveRatio(Number(event.target.value))}
            />
          </label>
          <label className="mt-4 block text-sm text-secondary">
            indirection levels: {indirection}
            <input
              aria-label="indirection levels"
              className="mt-2 block w-full accent-[var(--accent)]"
              type="range"
              min="1"
              max="4"
              step="1"
              value={indirection}
              onChange={(event) => setIndirection(Number(event.target.value))}
            />
          </label>
          <div className="mt-5 rounded-xl border border-border bg-surface p-4">
            <p className="text-sm font-semibold text-primary">
              What this layout exposes
            </p>
            <p className="mt-2 text-sm leading-6 text-secondary">
              {mode === "array" &&
                "一维逻辑地址被打包到二维 texture；所有元素都存在，重点是翻译索引。"}
              {mode === "structure" &&
                "每个成员拥有独立 stream；相同索引维持同一条记录的对应关系。"}
              {mode === "sparse" &&
                "只处理 active elements；indirection 增加读取链，但减少稀疏数据的存储范围。"}
            </p>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="mb-2 text-sm font-semibold text-primary">
            Derived metrics
          </p>
          <Metric label="logical elements" value={`${result.elements}`} />
          <Metric
            label="active elements"
            value={`${result.active}`}
            tone={C.success}
          />
          <Metric
            label="address operations"
            value={`${result.addressOps}`}
            tone={C.warning}
          />
          <Metric
            label="stream count"
            value={`${result.streams}`}
            tone={C.accent}
          />
          <Metric
            label="passes"
            value={`${result.passes}`}
            tone={C.secondary}
          />
          <Metric
            label="memory units"
            value={`${result.memoryUnits}`}
            tone={C.danger}
          />
          <p className="mt-4 text-sm font-semibold text-primary">
            recommended representation
          </p>
          <p className="mt-1 text-sm leading-6 text-secondary">{result.rule}</p>
          <p className="mt-4 text-xs leading-5 text-secondary">
            指标由布局、active ratio 和 indirection 直接推导，不是合成评分；真实
            GPU 还需测 cache、带宽与同步。
          </p>
        </div>
      </div>
    </Figure>
  );
}
