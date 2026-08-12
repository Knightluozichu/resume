"use client";

import { useMemo, useState, type ReactNode } from "react";

type DisplayMode = "calibration" | "measurement";

const COLORS = {
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

const MIP_LEVELS = [
  { alpha: 1, dimension: 512, index: 0, memoryKb: 1024 },
  { alpha: 0.75, dimension: 256, index: 1, memoryKb: 256 },
  { alpha: 0.5, dimension: 128, index: 2, memoryKb: 64 },
  { alpha: 0.25, dimension: 64, index: 3, memoryKb: 16 },
] as const;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function Figure({ children }: { children: ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        {children}
      </div>
    </figure>
  );
}

function Frame({
  children,
  height = 420,
  label,
}: {
  children: ReactNode;
  height?: number;
  label: string;
}) {
  return (
    <svg
      viewBox={`0 0 720 ${height}`}
      role="img"
      aria-label={label}
      className="mx-auto block h-auto w-full max-w-[720px]"
    >
      <rect width="720" height={height} rx="14" fill={COLORS.bg} />
      {children}
    </svg>
  );
}

function Panel({
  height,
  stroke = COLORS.border,
  title,
  width,
  x,
  y,
}: {
  height: number;
  stroke?: string;
  title: string;
  width: number;
  x: number;
  y: number;
}) {
  return (
    <>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="14"
        fill={COLORS.surface}
        stroke={stroke}
        strokeWidth="2"
      />
      <text
        x={x + width / 2}
        y={y + 29}
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={stroke === COLORS.border ? COLORS.text : stroke}
      >
        {title}
      </text>
    </>
  );
}

function Arrow({
  color = COLORS.accent,
  x1,
  x2,
  y1,
  y2,
}: {
  color?: string;
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
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" />
      <polygon points={`${x2},${y2} ${left} ${right}`} fill={color} />
    </>
  );
}

function levelForSample(
  distance: number,
  grazingAngle: number,
  position: number,
) {
  const distanceTerm = Math.log2(Math.max(1, distance / 14));
  const angleTerm = grazingAngle / 72;
  const depthTerm = position * 1.35;
  const terrainVariation =
    Math.sin(position * Math.PI * 5) * 0.24 +
    Math.cos(position * Math.PI * 9) * 0.11;
  return clamp(distanceTerm + angleTerm + depthTerm + terrainVariation, 0, 3.8);
}

function buildMeasurement(distance: number, grazingAngle: number) {
  const samples = Array.from({ length: 48 }, (_, index) =>
    levelForSample(distance, grazingAngle, index / 47),
  );
  const ratios = MIP_LEVELS.map(({ index }) =>
    samples.reduce(
      (count, level) => count + (level <= index + 0.35 ? 1 : 0),
      0,
    ),
  ).map((count) => count / samples.length);
  return { ratios, samples };
}

function firstVisibleLevel(ratios: number[], threshold: number) {
  const found = ratios.findIndex((ratio) => ratio >= threshold / 100);
  return found === -1 ? ratios.length - 1 : found;
}

export function GpuGems2Ch28MipmapChainDiagram() {
  return (
    <Figure>
      <Frame label="Mipmap 内存阶梯：512 方形 RGBA 顶层为 1024KB，随后每层边长减半、面积与内存降为四分之一；最高几层主导可释放内存">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          先问“最高细节层是否真的进入最终画面”
        </text>
        <Panel
          x={28}
          y={70}
          width={432}
          height={278}
          title="512² RGBA mip chain"
        />
        {MIP_LEVELS.map((level, index) => {
          const width = 188 / 2 ** index;
          const x = 72 + index * 86;
          const y = 126 + (188 - width) / 2;
          return (
            <g key={level.index}>
              <rect
                x={x}
                y={y}
                width={width}
                height={width}
                rx="5"
                fill={COLORS.accent}
                fillOpacity={0.16 + (3 - index) * 0.12}
                stroke={COLORS.accent}
                strokeWidth="2"
              />
              <text
                x={x + width / 2}
                y="327"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={COLORS.text}
              >
                L{level.index}
              </text>
            </g>
          );
        })}
        <Panel
          x={486}
          y={70}
          width={206}
          height={278}
          title="每层内存"
          stroke={COLORS.accent}
        />
        {MIP_LEVELS.map((level, index) => (
          <g key={`memory-${level.index}`}>
            <text
              x="514"
              y={130 + index * 48}
              fontSize="13"
              fill={COLORS.secondary}
            >
              L{level.index} · {level.dimension}²
            </text>
            <text
              x="664"
              y={130 + index * 48}
              textAnchor="end"
              fontSize="13"
              fontWeight="700"
              fill={index < 2 ? COLORS.warning : COLORS.text}
            >
              {level.memoryKb} KB
            </text>
          </g>
        ))}
        <text
          x="360"
          y="387"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.warning}
        >
          顶层不需要时，先释放 L0/L1 比微调尾部小层更有价值
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch28MeasurementPipelineDiagram() {
  const stages = [
    ["重放 draw call", "同一 mesh / depth"],
    ["替换 calibration", "alpha 编码 mip"],
    ["remap + alpha test", "只让目标层通过"],
    ["occlusion query", "统计通过 fragments"],
  ] as const;
  return (
    <Figure>
      <Frame label="GPU mip 层测量管线：重放目标物体的绘制，替换 alpha 标定纹理，在像素阶段重映射并执行 alpha test，最后由 occlusion query 返回通过深度测试的片元数">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          让 GPU 把“选了哪层”编码为可计数的通过片元
        </text>
        {stages.map(([title, detail], index) => {
          const x = 25 + index * 174;
          return (
            <g key={title}>
              <Panel
                x={x}
                y={96}
                width={148}
                height={194}
                title={`${index + 1}. ${title}`}
                stroke={index === 3 ? COLORS.success : COLORS.border}
              />
              <rect
                x={x + 34}
                y="153"
                width="80"
                height="62"
                rx="9"
                fill={COLORS.accent}
                fillOpacity={0.12 + index * 0.08}
                stroke={COLORS.accent}
                strokeWidth="2"
              />
              <text
                x={x + 74}
                y="248"
                textAnchor="middle"
                fontSize="12"
                fill={COLORS.secondary}
              >
                {detail}
              </text>
              {index < stages.length - 1 ? (
                <Arrow x1={x + 150} y1={193} x2={x + 171} y2={193} />
              ) : null}
            </g>
          );
        })}
        <text
          x="360"
          y="340"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.warning}
        >
          另跑一次无 alpha test 的 reference query，分母才反映当前可见像素
        </text>
        <text
          x="360"
          y="374"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.secondary}
        >
          color write 可关闭；深度、视图与真实采样状态必须保留
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch28CalibrationDiagram() {
  return (
    <Figure>
      <Frame label="Alpha 标定纹理：四个 mip 层分别写入 1、0.75、0.5、0.25，线性 mip 过滤在层间形成连续 alpha；每轮通过偏移和四倍缩放把目标区间映射到 alpha test 范围">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          一张 calibration texture，四次 remap 分离四个 mip 区间
        </text>
        <Panel
          x={28}
          y={70}
          width={284}
          height={286}
          title="alpha mip ladder"
        />
        {MIP_LEVELS.map((level, index) => (
          <g key={`alpha-${level.index}`}>
            <rect
              x="62"
              y={120 + index * 50}
              width={184 - index * 22}
              height="32"
              rx="5"
              fill={COLORS.accent}
              fillOpacity={level.alpha}
              stroke={COLORS.accent}
            />
            <text
              x="274"
              y={141 + index * 50}
              textAnchor="end"
              fontSize="12"
              fontWeight="700"
              fill={COLORS.text}
            >
              L{level.index} · a={level.alpha.toFixed(2)}
            </text>
          </g>
        ))}
        <Arrow x1={327} y1={213} x2={377} y2={213} />
        <Panel
          x={392}
          y={70}
          width={300}
          height={286}
          title="per-level pixel pass"
          stroke={COLORS.accent}
        />
        <text
          x="542"
          y="132"
          textAnchor="middle"
          fontSize="18"
          fontWeight="700"
          fill={COLORS.accent}
        >
          a′ = clamp(4(a − cₖ))
        </text>
        {[0.75, 0.5, 0.25, 0].map((offset, index) => (
          <g key={`offset-${offset}`}>
            <text
              x="430"
              y={184 + index * 39}
              fontSize="13"
              fill={COLORS.secondary}
            >
              测 L{index}
            </text>
            <text
              x="650"
              y={184 + index * 39}
              textAnchor="end"
              fontSize="13"
              fontWeight="700"
              fill={index === 1 ? COLORS.warning : COLORS.text}
            >
              cₖ = {offset.toFixed(2)}
            </text>
          </g>
        ))}
        <text
          x="360"
          y="393"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.warning}
        >
          RGB 仅供调试；算法判定来自 alpha 与 query count
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch28QueryResultsDiagram() {
  const values = [0, 5, 81, 100];
  return (
    <Figure>
      <Frame label="遮挡查询结果解释：参考查询计数 13000，四个 mip 测量依次为 0%、5%、81%、100%；15% 显著性阈值选择第一个超过阈值的 L2">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          query count 先除 reference，再与 significance threshold 比较
        </text>
        <Panel
          x={28}
          y={70}
          width={664}
          height={278}
          title="reference = 13,000 fragments"
        />
        <line
          x1="215"
          y1="122"
          x2="215"
          y2="314"
          stroke={COLORS.warning}
          strokeDasharray="7 6"
          strokeWidth="2"
        />
        <text x="220" y="333" fontSize="12" fill={COLORS.warning}>
          threshold 15%
        </text>
        {values.map((value, index) => {
          const y = 126 + index * 45;
          return (
            <g key={`query-${index}`}>
              <text
                x="62"
                y={y + 18}
                fontSize="13"
                fontWeight="700"
                fill={COLORS.text}
              >
                L{index}
              </text>
              <rect
                x="104"
                y={y}
                width="520"
                height="25"
                rx="6"
                fill={COLORS.bg}
                stroke={COLORS.border}
              />
              <rect
                x="104"
                y={y}
                width={5.2 * value}
                height="25"
                rx="6"
                fill={index === 2 ? COLORS.success : COLORS.accent}
                fillOpacity={index === 2 ? 0.75 : 0.46}
              />
              <text
                x="658"
                y={y + 18}
                textAnchor="end"
                fontSize="13"
                fontWeight="700"
                fill={index === 2 ? COLORS.success : COLORS.secondary}
              >
                {value}%
              </text>
            </g>
          );
        })}
        <text
          x="360"
          y="389"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.success}
        >
          第一个超过 15% 的层是 L2：L0 与 L1 可从本次预算中移除
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch28EngineScheduleDiagram() {
  const objects = [
    "terrain A",
    "vehicle",
    "avatar",
    "terrain B",
    "building",
    "terrain A",
  ];
  return (
    <Figure>
      <Frame label="引擎分摊调度：每帧从 round-robin 队列取一个对象，为四个 mip 层和一个参考值重放五次 draw call；快速移动对象可由优先队列提前测量">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          不是每帧测全部对象，而是把五次附加 draw 分摊到时间轴
        </text>
        <Panel
          x={28}
          y={70}
          width={664}
          height={278}
          title="one measured object per frame"
        />
        {objects.map((object, index) => {
          const x = 54 + index * 103;
          const active = index === 2;
          return (
            <g key={`${object}-${index}`}>
              <text
                x={x + 40}
                y="126"
                textAnchor="middle"
                fontSize="12"
                fill={COLORS.secondary}
              >
                frame {index + 1}
              </text>
              <rect
                x={x}
                y="148"
                width="80"
                height="68"
                rx="9"
                fill={active ? COLORS.accent : COLORS.surface}
                fillOpacity={active ? 0.25 : 1}
                stroke={active ? COLORS.accent : COLORS.border}
                strokeWidth="2"
              />
              <text
                x={x + 40}
                y="177"
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill={COLORS.text}
              >
                {object}
              </text>
              <text
                x={x + 40}
                y="197"
                textAnchor="middle"
                fontSize="11"
                fill={COLORS.secondary}
              >
                4 levels + ref
              </text>
              {index < objects.length - 1 ? (
                <Arrow x1={x + 82} y1={182} x2={x + 101} y2={182} />
              ) : null}
            </g>
          );
        })}
        <rect
          x="165"
          y="253"
          width="390"
          height="58"
          rx="10"
          fill={COLORS.bg}
          stroke={COLORS.warning}
        />
        <text
          x="360"
          y="278"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.warning}
        >
          velocity / camera change raises priority
        </text>
        <text
          x="360"
          y="298"
          textAnchor="middle"
          fontSize="12"
          fill={COLORS.secondary}
        >
          stable objects remain in the ordinary queue
        </text>
        <text
          x="360"
          y="389"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.success}
        >
          原章四层测量的固定开销：每帧 5 个附加 draw calls
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch28OrientationDiagram() {
  return (
    <Figure>
      <Frame label="同距离不同朝向的 mip 需求：正对相机的崖壁在屏幕上保留较大投影，需要较细 mip；近乎掠射的平地每像素覆盖更多纹理区域，使用更粗层">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          距离相同不代表 mip 需求相同，surface orientation 同样改变 footprint
        </text>
        <Panel
          x={28}
          y={70}
          width={316}
          height={278}
          title="view A · cliff faces camera"
        />
        <Panel
          x={376}
          y={70}
          width={316}
          height={278}
          title="view B · grazing terrain"
        />
        <circle
          cx="80"
          cy="270"
          r="18"
          fill={COLORS.accent}
          fillOpacity="0.3"
          stroke={COLORS.accent}
        />
        <path
          d="M118 289 L188 206 L242 206 L298 289 Z"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="3"
        />
        {[0, 1, 2, 3].map((index) => (
          <line
            key={`cliff-line-${index}`}
            x1={197 + index * 12}
            y1="215"
            x2={197 + index * 12}
            y2="280"
            stroke={COLORS.warning}
            strokeWidth="3"
          />
        ))}
        <Arrow x1={100} y1={264} x2={184} y2={238} />
        <text
          x="186"
          y="326"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.warning}
        >
          cliff can expose L0/L1
        </text>
        <circle
          cx="428"
          cy="270"
          r="18"
          fill={COLORS.accent}
          fillOpacity="0.3"
          stroke={COLORS.accent}
        />
        <path
          d="M466 286 L654 245 L674 286 Z"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="3"
        />
        {[0, 1, 2, 3].map((index) => (
          <line
            key={`flat-line-${index}`}
            x1={500 + index * 36}
            y1={277 - index * 8}
            x2={528 + index * 36}
            y2={271 - index * 8}
            stroke={COLORS.accent}
            strokeWidth="3"
          />
        ))}
        <Arrow x1={448} y1={264} x2={493} y2={276} />
        <text
          x="534"
          y="326"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.accent}
        >
          flat region settles on L2/L3
        </text>
        <text
          x="360"
          y="389"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={COLORS.secondary}
        >
          让真实 sampler 与 render state 作答，比 CPU 猜测专有硬件规则更可靠
        </text>
      </Frame>
    </Figure>
  );
}

function MeasurementScene({
  distance,
  grazingAngle,
  mode,
  queueFrames,
  threshold,
}: {
  distance: number;
  grazingAngle: number;
  mode: DisplayMode;
  queueFrames: number;
  threshold: number;
}) {
  const { ratios, samples } = useMemo(
    () => buildMeasurement(distance, grazingAngle),
    [distance, grazingAngle],
  );
  const visibleLevel = firstVisibleLevel(ratios, threshold);
  const referencePixels = 13000;
  const savedKb = MIP_LEVELS.slice(0, visibleLevel).reduce(
    (sum, level) => sum + level.memoryKb,
    0,
  );
  const totalTopKb = MIP_LEVELS.reduce((sum, level) => sum + level.memoryKb, 0);
  const latencyMs = Math.round((queueFrames / 60) * 1000);

  return (
    <svg
      viewBox="0 0 720 460"
      role="img"
      aria-label={`Mipmap 层测量实验：距离 ${distance}，掠射角 ${grazingAngle} 度，显著性阈值 ${threshold}%，首个可见层 L${visibleLevel}，顶部四层可释放 ${savedKb}KB`}
      className="mx-auto block h-auto w-full"
    >
      <rect width="720" height="460" rx="14" fill={COLORS.bg} />
      <text
        x="360"
        y="28"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.text}
      >
        mip measurement lab · {mode} · threshold {threshold}%
      </text>
      <rect
        x="24"
        y="58"
        width="430"
        height="310"
        rx="13"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="239"
        y="88"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.text}
      >
        {mode === "calibration"
          ? "calibration alpha view"
          : "measurement coverage view"}
      </text>
      <path
        d="M52 315 C118 230 174 277 226 188 C288 83 348 242 426 136 L426 332 L52 332 Z"
        fill={COLORS.bg}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      {samples.map((level, index) => {
        const width = 350 / samples.length;
        const x = 62 + index * width;
        const top = 132 + level * 45 + Math.sin(index * 0.63) * 16;
        const levelIndex = Math.min(3, Math.floor(level));
        const passes = level <= visibleLevel + 0.35;
        return (
          <rect
            key={`terrain-sample-${index}`}
            x={x}
            y={top}
            width={Math.max(3.5, width - 1)}
            height={326 - top}
            fill={
              mode === "calibration"
                ? COLORS.accent
                : passes
                  ? COLORS.success
                  : COLORS.secondary
            }
            fillOpacity={
              mode === "calibration"
                ? MIP_LEVELS[levelIndex].alpha * 0.72
                : passes
                  ? 0.52
                  : 0.18
            }
          />
        );
      })}
      <line
        x1="52"
        y1="332"
        x2="426"
        y2="332"
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="62" y="354" fontSize="11" fill={COLORS.secondary}>
        near / face-on
      </text>
      <text
        x="416"
        y="354"
        textAnchor="end"
        fontSize="11"
        fill={COLORS.secondary}
      >
        far / grazing
      </text>
      <rect
        x="476"
        y="58"
        width="220"
        height="310"
        rx="13"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="586"
        y="88"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.text}
      >
        query / reference
      </text>
      {ratios.map((ratio, index) => {
        const y = 112 + index * 44;
        const selected = index === visibleLevel;
        return (
          <g key={`lab-query-${index}`}>
            <text x="494" y={y + 17} fontSize="12" fill={COLORS.secondary}>
              L{index}
            </text>
            <rect
              x="522"
              y={y}
              width="126"
              height="22"
              rx="5"
              fill={COLORS.bg}
              stroke={selected ? COLORS.success : COLORS.border}
              strokeWidth="2"
            />
            <rect
              x="522"
              y={y}
              width={126 * ratio}
              height="22"
              rx="5"
              fill={selected ? COLORS.success : COLORS.accent}
              fillOpacity={selected ? 0.72 : 0.42}
            />
            <text
              x="679"
              y={y + 17}
              textAnchor="end"
              fontSize="12"
              fontWeight="700"
              fill={selected ? COLORS.success : COLORS.text}
            >
              {Math.round(ratio * referencePixels).toLocaleString()}
            </text>
          </g>
        );
      })}
      <line
        x1={522 + 126 * (threshold / 100)}
        y1="105"
        x2={522 + 126 * (threshold / 100)}
        y2="282"
        stroke={COLORS.warning}
        strokeDasharray="5 4"
        strokeWidth="2"
      />
      <text x="494" y="309" fontSize="12" fill={COLORS.secondary}>
        first visible
      </text>
      <text
        x="678"
        y="309"
        textAnchor="end"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.success}
      >
        L{visibleLevel}
      </text>
      <text x="494" y="337" fontSize="12" fill={COLORS.secondary}>
        saved / top 4
      </text>
      <text
        x="678"
        y="337"
        textAnchor="end"
        fontSize="13"
        fontWeight="700"
        fill={savedKb > 0 ? COLORS.warning : COLORS.secondary}
      >
        {savedKb} / {totalTopKb} KB
      </text>
      <rect
        x="24"
        y="388"
        width="672"
        height="46"
        rx="9"
        fill={COLORS.surface}
        stroke={queueFrames > 8 ? COLORS.warning : COLORS.border}
      />
      <text x="45" y="416" fontSize="12" fill={COLORS.secondary}>
        measure every {queueFrames} frames · about {latencyMs} ms at 60 fps
      </text>
      <text
        x="675"
        y="416"
        textAnchor="end"
        fontSize="12"
        fontWeight="700"
        fill={queueFrames > 8 ? COLORS.warning : COLORS.success}
      >
        {queueFrames > 8 ? "watch resolution pop" : "responsive schedule"}
      </text>
    </svg>
  );
}

export function GpuGems2Ch28MeasurementLab() {
  const [mode, setMode] = useState<DisplayMode>("measurement");
  const [distance, setDistance] = useState(30);
  const [grazingAngle, setGrazingAngle] = useState(24);
  const [threshold, setThreshold] = useState(15);
  const [queueFrames, setQueueFrames] = useState(4);

  function reset() {
    setMode("measurement");
    setDistance(30);
    setGrazingAngle(24);
    setThreshold(15);
    setQueueFrames(4);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
      aria-label="GPU Gems 2 Chapter 28 Mipmap 层测量实验"
      data-visual-kind="gpu-gems2-ch28-mipmap-level-measurement"
      data-unit-id="gpg-v2-28"
    >
      <div className="border-b border-border px-5 py-4">
        <p className="text-sm font-semibold text-primary">
          Mipmap-Level Measurement 实验
        </p>
        <p className="mt-1 text-sm text-secondary">
          先预测：距离和掠射角同时增大时，首个可见层会向更细还是更粗移动？把阈值提高又会释放哪些顶层？
        </p>
      </div>
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_250px]">
        <div className="overflow-hidden rounded-card border border-border bg-[var(--bg)] p-3">
          <MeasurementScene
            distance={distance}
            grazingAngle={grazingAngle}
            mode={mode}
            queueFrames={queueFrames}
            threshold={threshold}
          />
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2" aria-label="选择实验视图">
            {(["calibration", "measurement"] as DisplayMode[]).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={mode === value}
                onClick={() => setMode(value)}
                className="min-h-11 rounded-md border border-border px-2 py-2 text-xs font-semibold text-primary transition hover:border-[var(--accent)]"
              >
                {value}
              </button>
            ))}
          </div>
          <label className="block text-sm text-secondary">
            camera distance：{distance}
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="8"
              max="72"
              step="2"
              value={distance}
              onChange={(event) => setDistance(Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-secondary">
            grazing angle：{grazingAngle}°
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="0"
              max="72"
              step="3"
              value={grazingAngle}
              onChange={(event) => setGrazingAngle(Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-secondary">
            significance threshold：{threshold}%
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="0"
              max="30"
              step="5"
              value={threshold}
              onChange={(event) => setThreshold(Number(event.target.value))}
            />
          </label>
          <label className="block text-sm text-secondary">
            measurement cadence：{queueFrames} frames
            <input
              className="mt-2 block h-11 w-full accent-[var(--accent)]"
              type="range"
              min="1"
              max="12"
              step="1"
              value={queueFrames}
              onChange={(event) => setQueueFrames(Number(event.target.value))}
            />
          </label>
          <p
            className="rounded-md border border-border bg-[var(--bg)] p-3 text-xs leading-5 text-secondary"
            aria-live="polite"
          >
            {queueFrames > 8
              ? "故障观察：测量间隔过长时，相机快速接近表面可能先看到纹理分辨率跳变，再等到队列纠正。"
              : threshold >= 25
                ? "高阈值只保留占画面比例显著的细层，节省更多内存，但局部崖壁可能先变软。"
                : "查询比例以 reference fragments 为分母；距离、朝向和真实采样状态共同决定可见层。"}
          </p>
          <button
            type="button"
            onClick={reset}
            className="min-h-11 w-full rounded-md border border-border px-3 py-2 text-sm font-semibold text-primary transition hover:border-[var(--accent)]"
          >
            重置
          </button>
        </div>
      </div>
    </section>
  );
}
