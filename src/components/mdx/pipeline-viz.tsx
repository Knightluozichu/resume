"use client";

import {
  useEffect,
  useId,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

/**
 * <PipelineViz>：OpenGL 渲染管线分步数据流可视化（chapter-spec「概念型(A)」章节主 Demo）。
 *
 * 比通用 <Stepper> 专业之处：不是「换张图片/换段文字」，而是同一个三角形的几何数据
 * 在五个阶段里**逐步演变形态**——
 *   ① 顶点着色器：3 个裸顶点（点）
 *   ② 图元装配：顶点连成三角形（边）
 *   ③ 光栅化：三角形覆盖判定，铺成像素网格（被覆盖格高亮）
 *   ④ 片段着色器：每个被覆盖像素上色（顶点色重心插值）
 *   ⑤ 测试与混合：深度测试 + 混合写入帧缓冲（最终图像）
 * 所有阶段画在同一套数学坐标系里（SVG viewBox），读者能直观看到「点→三角形→像素格→
 * 上色像素→最终图像」是同一份数据被一步步加工。
 *
 * 非 WebGL：纯 SVG（Canvas2D 也可，但 SVG 几何声明式、a11y 友好、零像素脏活）。
 *
 * 懒加载：本组件不含 WebGL，已是叶子 client 壳，被注入后不会把整页变 client（RSC 边界保持）。
 * 体积主要是这点 SVG/JSX，无需 next/dynamic 二次切分；若作者只在个别章节用，
 * 也可在用例里 `dynamic(() => import(...), { ssr: false })` 进一步延后——见 mdx-components 注释。
 *
 * 教学动效铁律（DESIGN §动效原则 2，与 <Stepper> 同范式但独立实现，不改 Stepper）：
 *  - 可单步：上一步 / 下一步逐阶段推进
 *  - 可暂停：自动播放时显「暂停」；默认即手动暂停态
 *  - 可拖进度：底部 range 直接跳到任意阶段
 *  - 当前阶段高亮 + 阶段名 + 简短说明
 *
 * reduced-motion（DESIGN §动效原则 4，教学动效默认暂停态加载）：
 *  - 自动播放被禁用（即使传了 autoPlay 也不自动跑），用户仍可手动单步/拖进度
 *  - 阶段间无额外过渡（SVG 直接切到该阶段形态）
 * 通过 matchMedia 显式判定（autoPlay 是定时器逻辑，不能只靠 CSS token 降级）。
 *
 * 颜色/间距/圆角/动效全部走 DESIGN token（硬规则 5）；SVG 几何坐标是纯数学量，非魔法色值。
 */

/** 单个阶段的描述 */
export type PipelineStage = {
  /** 阶段名（如「顶点着色器」） */
  name: string;
  /** 一句话说明，告诉读者这一步对数据做了什么 */
  blurb: string;
};

type PipelineVizProps = {
  /** 自定义阶段文案；默认即标准五阶段。长度须为 5（与内置可视化一一对应） */
  stages?: PipelineStage[];
  /** 三角形三个顶点的颜色（重心插值用），默认 accent 紫 / 语义绿 / 语义黄 */
  vertexColors?: [string, string, string];
  /** 自动播放（默认 false，手动）；reduced-motion 下强制不自动播 */
  autoPlay?: boolean;
  /** 自动播放每阶段停留（ms），默认 2000（教学慢速） */
  interval?: number;
};

/** 标准五阶段文案（OpenGL 渲染管线主干，读者视角的「人话」说明） */
const DEFAULT_STAGES: PipelineStage[] = [
  {
    name: "顶点着色器",
    blurb:
      "GPU 拿到 3 个顶点，逐个算出它们在裁剪空间的位置（这里只是 3 个孤立的点）。",
  },
  {
    name: "图元装配",
    blurb:
      "按绘制指令把这 3 个顶点连成 1 个三角形——图元（primitive）就此成形。",
  },
  {
    name: "光栅化",
    blurb:
      "三角形落到像素网格上，逐格判定「是否被覆盖」，覆盖到的格子生成片段（fragment）。",
  },
  {
    name: "片段着色器",
    blurb:
      "每个被覆盖的片段跑一次着色器算颜色，这里按到三顶点的距离做重心插值上色。",
  },
  {
    name: "测试与混合",
    blurb:
      "通过深度测试、按 alpha 混合后，最终颜色写入帧缓冲——这就是屏幕上看到的三角形。",
  },
];

/** 三角形顶点（SVG 用户坐标，viewBox 0..120），所有阶段共用同一份几何 */
const VERTS: ReadonlyArray<readonly [number, number]> = [
  [60, 18], // 顶
  [22, 96], // 左下
  [98, 96], // 右下
];

const DEFAULT_VERTEX_COLORS: [string, string, string] = [
  "var(--accent)", // 紫
  "var(--success)", // 绿
  "var(--warning)", // 黄
];

/** 光栅网格分辨率（每边格数）；纯几何量 */
const GRID = 12;

export function PipelineViz({
  stages = DEFAULT_STAGES,
  vertexColors = DEFAULT_VERTEX_COLORS,
  autoPlay = false,
  interval = 2000,
}: PipelineVizProps) {
  const baseId = useId();
  const reduced = usePrefersReducedMotion();
  // reduced-motion 下，即使作者要求 autoPlay 也以暂停态加载
  const [playing, setPlaying] = useState(autoPlay && !reduced);
  const [index, setIndex] = useState(0);

  const count = stages.length;
  const last = count - 1;

  const go = (next: number) => {
    setIndex(Math.min(last, Math.max(0, next)));
  };

  // 自动播放：仅在「正在播 + 未到末阶段」时排一个定时器推进，到末步自动停（不循环）。
  // 不在 effect 体内同步 setState 之外的级联（契合 React Compiler 规则）。
  const ticking = playing && !reduced && count > 1 && index < last;
  useEffect(() => {
    if (!ticking) return;
    const t = setTimeout(() => setIndex((i) => i + 1), interval);
    return () => clearTimeout(t);
  }, [ticking, index, interval]);

  // 被三角形覆盖的网格单元（重心坐标判定），算一次缓存——光栅化/片段/混合阶段共用
  const cells = useMemo(() => computeCoveredCells(), []);

  if (count === 0) return null;

  const current = stages[index];
  const titleId = `${baseId}-title`;
  const descId = `${baseId}-desc`;

  return (
    <section
      aria-label="渲染管线分步可视化"
      className="not-prose mdx-pipeline-viz my-6 rounded-card border border-border bg-elevated p-6"
    >
      {/* 顶部：⚡标签 + 阶段计数 */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
          <span aria-hidden="true">⚡</span>
          渲染管线
        </span>
        <span className="font-mono text-xs tabular-nums text-secondary">
          {index + 1} / {count}
        </span>
      </div>

      {/* 阶段流水条：当前阶段高亮，前序阶段标记为已过 */}
      <ol className="mb-4 flex flex-wrap items-center gap-1">
        {stages.map((s, i) => (
          <li key={s.name} className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => {
                setPlaying(false);
                go(i);
              }}
              aria-label={`跳到阶段 ${i + 1}：${s.name}`}
              aria-current={i === index ? "step" : undefined}
              className={`rounded-control border px-2 py-1 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                i === index
                  ? "border-accent text-accent"
                  : i < index
                    ? "border-border text-primary"
                    : "border-border text-secondary hover:text-primary"
              }`}
            >
              {s.name}
            </button>
            {i < last && (
              <span aria-hidden="true" className="px-0.5 text-secondary">
                →
              </span>
            )}
          </li>
        ))}
      </ol>

      {/* 数据形态可视化：同一三角形随阶段演变 */}
      <div
        role="group"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="rounded-control border border-border bg-bg p-4"
      >
        <StageSvg
          stage={index}
          verts={VERTS}
          cells={cells}
          vertexColors={vertexColors}
        />
      </div>

      {/* 当前阶段名 + 说明 */}
      <div className="mt-4">
        <h4 id={titleId} className="mb-1 text-base font-semibold text-accent">
          {current.name}
        </h4>
        <p id={descId} className="text-sm text-secondary">
          {current.blurb}
        </p>
      </div>

      {/* 进度条：拖动 = 拖进度（直接跳阶段） */}
      {count > 1 && (
        <input
          type="range"
          min={0}
          max={last}
          step={1}
          value={index}
          aria-label="管线进度"
          aria-valuetext={`阶段 ${index + 1}：${current.name}`}
          onChange={(e) => {
            setPlaying(false);
            go(Number(e.target.value));
          }}
          className="mdx-range mt-4 h-1 w-full cursor-pointer appearance-none rounded-control bg-border accent-accent"
        />
      )}

      {/* 控制栏：上一步 / 暂停-播放 / 下一步 */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => {
            setPlaying(false);
            go(index - 1);
          }}
          disabled={index === 0}
          aria-label="上一阶段"
          className="rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          上一步
        </button>

        {/* 暂停/播放：reduced-motion 下隐藏（自动播放无意义）。
            ticking=false（含播到末阶段）时显「播放」，点击从头重播。 */}
        {!reduced && count > 1 && (
          <button
            type="button"
            onClick={() => {
              if (ticking) {
                setPlaying(false);
              } else {
                if (index >= last) setIndex(0);
                setPlaying(true);
              }
            }}
            aria-label={ticking ? "暂停自动播放" : "自动播放"}
            className="rounded-control border border-border px-3 py-2 text-xs text-accent transition-colors duration-(--duration-hover) ease-standard hover:border-accent"
          >
            {ticking ? "暂停" : "播放"}
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            setPlaying(false);
            go(index + 1);
          }}
          disabled={index === last}
          aria-label="下一阶段"
          className="rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          下一步
        </button>
      </div>
    </section>
  );
}

/** 被三角形覆盖的网格单元：重心坐标全 ≥0 判定，附带单元中心的重心权重（供片段上色） */
type Cell = {
  /** 网格列、行索引 */
  col: number;
  row: number;
  /** 单元中心的重心坐标（w0,w1,w2），对应 VERTS 三顶点 */
  bary: [number, number, number];
};

function computeCoveredCells(): Cell[] {
  const span = 120 / GRID; // 每格边长（用户坐标）
  const [a, b, c] = VERTS;
  const out: Cell[] = [];
  for (let row = 0; row < GRID; row++) {
    for (let col = 0; col < GRID; col++) {
      const px = (col + 0.5) * span;
      const py = (row + 0.5) * span;
      const bary = barycentric(px, py, a, b, c);
      // 容差 0：中心落在三角形内（含边）算覆盖
      if (bary[0] >= 0 && bary[1] >= 0 && bary[2] >= 0) {
        out.push({ col, row, bary });
      }
    }
  }
  return out;
}

/** 点 (px,py) 相对三角形 abc 的重心坐标 */
function barycentric(
  px: number,
  py: number,
  a: readonly [number, number],
  b: readonly [number, number],
  c: readonly [number, number],
): [number, number, number] {
  const v0x = b[0] - a[0];
  const v0y = b[1] - a[1];
  const v1x = c[0] - a[0];
  const v1y = c[1] - a[1];
  const v2x = px - a[0];
  const v2y = py - a[1];
  const den = v0x * v1y - v1x * v0y;
  if (den === 0) return [-1, -1, -1];
  const v = (v2x * v1y - v1x * v2y) / den;
  const w = (v0x * v2y - v2x * v0y) / den;
  const u = 1 - v - w;
  return [u, v, w]; // u→a, v→b, w→c
}

/** 把重心权重混成一个 CSS color-mix（用 token 色），避免硬编码十六进制 */
function mixVertexColor(
  bary: [number, number, number],
  colors: [string, string, string],
): string {
  const [u, v, w] = bary;
  const total = u + v + w || 1;
  const pu = Math.round((u / total) * 100);
  const pv = Math.round((v / total) * 100);
  // 两步 color-mix：先按 (u : v) 混前两色，再按结果与第三色混
  const uv = `color-mix(in srgb, ${colors[0]} ${pu}%, ${colors[1]} ${pv}%)`;
  return `color-mix(in srgb, ${uv} ${100 - w * 100}%, ${colors[2]} ${Math.round(w * 100)}%)`;
}

type StageSvgProps = {
  stage: number;
  verts: ReadonlyArray<readonly [number, number]>;
  cells: Cell[];
  vertexColors: [string, string, string];
};

/**
 * 五阶段共用一套 SVG 坐标系（viewBox 0 0 120 120）；按 stage 决定画什么形态。
 * stage 间无补间动画（SVG 直接呈现该阶段），符合 reduced-motion 默认与「单步看清」诉求；
 * 动效靠阶段切换本身 + CSS 过渡（描边/填充透明度），不依赖逐帧 JS 动画。
 */
function StageSvg({ stage, verts, cells, vertexColors }: StageSvgProps) {
  const span = 120 / GRID;
  const trianglePoints = verts.map(([x, y]) => `${x},${y}`).join(" ");

  // 各阶段开关
  const showGrid = stage >= 2; // 光栅化起出现像素网格
  const showEdges = stage >= 1; // 图元装配起出现三角形边
  const showCoverage = stage === 2; // 光栅化：覆盖格用中性高亮
  const showShaded = stage >= 3; // 片段着色器起：覆盖格上色
  const blended = stage >= 4; // 测试与混合：填充三角形 + 整体到位
  const showVerts = stage <= 3; // 前四阶段标出顶点；最终图像隐去辅助点

  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label={STAGE_ARIA[stage] ?? "渲染管线阶段"}
      className="mx-auto block aspect-square w-full max-w-xs"
    >
      {/* 像素网格（光栅化起） */}
      {showGrid && (
        <g aria-hidden="true">
          {Array.from({ length: GRID + 1 }, (_, i) => (
            <line
              key={`v${i}`}
              x1={i * span}
              y1={0}
              x2={i * span}
              y2={120}
              stroke="var(--border)"
              strokeWidth={0.5}
            />
          ))}
          {Array.from({ length: GRID + 1 }, (_, i) => (
            <line
              key={`h${i}`}
              x1={0}
              y1={i * span}
              x2={120}
              y2={i * span}
              stroke="var(--border)"
              strokeWidth={0.5}
            />
          ))}
        </g>
      )}

      {/* 被覆盖的像素格 */}
      {(showCoverage || showShaded) && (
        <g aria-hidden="true">
          {cells.map((cell) => {
            const fill = showShaded
              ? mixVertexColor(cell.bary, vertexColors)
              : "var(--accent-glow)";
            return (
              <rect
                key={`${cell.col}-${cell.row}`}
                x={cell.col * span}
                y={cell.row * span}
                width={span}
                height={span}
                fill={fill}
                // 混合阶段把网格感淡化，呈现「连成一片的最终图像」
                opacity={blended ? 1 : showShaded ? 0.92 : 0.7}
              />
            );
          })}
        </g>
      )}

      {/* 三角形：边（图元装配起）+ 填充（混合阶段，画一个半透明实心三角示意写入） */}
      {showEdges && (
        <polygon
          points={trianglePoints}
          fill={blended ? "var(--accent-glow)" : "none"}
          stroke="var(--accent)"
          strokeWidth={blended ? 1 : 1.5}
          strokeLinejoin="round"
          opacity={blended ? 0.9 : 1}
        />
      )}

      {/* 顶点（着色器阶段是孤立点；装配后仍标出以示同一份数据） */}
      {showVerts &&
        verts.map(([x, y], i) => (
          <g key={i}>
            <circle
              cx={x}
              cy={y}
              r={stage === 0 ? 4 : 3}
              fill={vertexColors[i]}
              stroke="var(--bg)"
              strokeWidth={1}
            />
          </g>
        ))}
    </svg>
  );
}

/** 每阶段 SVG 的无障碍描述（屏幕阅读器读到的是「数据形态」而非装饰） */
const STAGE_ARIA = [
  "三个孤立的顶点",
  "三个顶点连成一个三角形轮廓",
  "三角形落在像素网格上，被覆盖的格子高亮",
  "每个被覆盖的格子按顶点颜色插值上色",
  "深度测试与混合后写入帧缓冲的最终三角形图像",
];

/**
 * 监听 prefers-reduced-motion（SSR 安全：server 与首渲染按「不减弱」，挂载后校正）。
 * 用 useSyncExternalStore 订阅 matchMedia——无需在 effect 内同步 setState，
 * 契合 React Compiler「不在 effect 体内级联 setState」规则（与 stepper.tsx 同范式）。
 */
function subscribeReducedMotion(callback: () => void): () => void {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false, // server snapshot：不减弱
  );
}
