"use client";

import { useMemo, useState } from "react";

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const surface = "var(--surface)";

function Frame({
  ariaLabel,
  caption,
  children,
}: {
  ariaLabel: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 720 390"
          role="img"
          aria-label={ariaLabel}
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {children}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color = accent,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
}) {
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={2.5} />
      <path
        d={`M ${x2 - 8} ${y2 - 5} L ${x2} ${y2} L ${x2 - 8} ${y2 + 5}`}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
      />
    </>
  );
}

export function GpuGems2Ch02NestedGridDiagram() {
  return (
    <Frame
      ariaLabel="几何 clipmap 的嵌套网格：中心是完整的细网格，外围是逐级变粗的环形网格"
      caption="每一层只保留相机周围的窗口；细层覆盖中心，粗层用环补足远处。"
    >
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>
        Nested regular grids：用环覆盖更大的地形范围
      </text>
      <g transform="translate(74 72)">
        <rect x={0} y={0} width={270} height={270} fill={accent} fillOpacity={0.06} stroke={accent} strokeWidth={2} />
        <rect x={42} y={42} width={186} height={186} fill={warning} fillOpacity={0.09} stroke={warning} strokeWidth={2} />
        <rect x={84} y={84} width={102} height={102} fill={success} fillOpacity={0.12} stroke={success} strokeWidth={2.5} />
        <rect x={117} y={117} width={36} height={36} rx={18} fill="var(--bg)" stroke={danger} strokeWidth={2.5} />
        <text x={135} y={140} textAnchor="middle" fontSize={11} fontWeight={700} fill={danger}>视点</text>
        <g stroke={border} strokeWidth={1} opacity={0.7}>
          {[27, 54, 81, 108, 135, 162, 189, 216, 243].map((offset) => <line key={`v-${offset}`} x1={offset} y1={0} x2={offset} y2={270} />)}
          {[27, 54, 81, 108, 135, 162, 189, 216, 243].map((offset) => <line key={`h-${offset}`} x1={0} y1={offset} x2={270} y2={offset} />)}
        </g>
      </g>
      <g transform="translate(410 92)">
        <rect width={248} height={178} rx={18} fill={surface} stroke={border} />
        <text x={20} y={34} fontSize={14} fontWeight={700} fill={primary}>层级分工</text>
        <circle cx={30} cy={70} r={7} fill={success} />
        <text x={50} y={75} fontSize={12} fill={secondary}>细层：近处完整方格</text>
        <circle cx={30} cy={106} r={7} fill={warning} />
        <text x={50} y={111} fontSize={12} fill={secondary}>中层：环形补充范围</text>
        <circle cx={30} cy={142} r={7} fill={accent} />
        <text x={50} y={147} fontSize={12} fill={secondary}>粗层：低频远景地形</text>
        <text x={20} y={172} fontSize={11} fill={secondary}>目标：屏幕空间三角形近似均匀</text>
      </g>
      <Arrow x1={350} y1={206} x2={402} y2={206} />
      <text x={360} y={350} textAnchor="middle" fontSize={13} fill={secondary}>
        规则网格让缓存、索引和增量更新保持简单
      </text>
    </Frame>
  );
}

export function GpuGems2Ch02ToroidalUpdateDiagram() {
  const cells = Array.from({ length: 36 }, (_, index) => index);
  return (
    <Frame
      ariaLabel="toroidal 地址示意：窗口向右移动后，左边离开的列在右边绕回并接收新的高程样本"
      caption="窗口不搬运整张纹理，只更新越过边界的窄条，并用环绕地址复用存储。"
    >
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>
        Viewer 移动：只更新越界的条带
      </text>
      <g transform="translate(70 84)">
        {cells.map((cell) => {
          const row = Math.floor(cell / 6);
          const col = cell % 6;
          const updated = col === 0 || col === 5;
          return (
            <rect
              key={cell}
              x={col * 42}
              y={row * 42}
              width={38}
              height={38}
              rx={5}
              fill={updated ? accent : surface}
              fillOpacity={updated ? 0.2 : 1}
              stroke={updated ? accent : border}
              strokeWidth={updated ? 2 : 1}
            />
          );
        })}
        <text x={105} y={-18} textAnchor="middle" fontSize={13} fill={secondary}>clipmap window</text>
        <text x={-30} y={112} textAnchor="middle" fontSize={12} fill={accent} transform="rotate(-90 -30 112)">旧列离开</text>
        <text x={252} y={112} textAnchor="middle" fontSize={12} fill={accent} transform="rotate(90 252 112)">新列绕回</text>
      </g>
      <g transform="translate(390 90)">
        <rect width={276} height={178} rx={18} fill={surface} stroke={border} />
        <text x={20} y={34} fontSize={14} fontWeight={700} fill={primary}>地址规则</text>
        <text x={20} y={72} fontSize={12} fill={secondary}>logicalX mod n → textureX</text>
        <text x={20} y={106} fontSize={12} fill={secondary}>logicalY mod n → textureY</text>
        <text x={20} y={140} fontSize={12} fill={secondary}>只上传新出现的高程条带</text>
        <text x={20} y={168} fontSize={11} fill={secondary}>平滑移动时，更新面积远小于整层</text>
      </g>
      <text x={360} y={350} textAnchor="middle" fontSize={13} fill={secondary}>
        环绕地址解决的是“窗口在哪里”，不是改变地形数据的世界坐标
      </text>
    </Frame>
  );
}

export function GpuGems2Ch02TransitionDiagram() {
  return (
    <Frame
      ariaLabel="分辨率过渡示意：细层外圈与粗层内圈在 transition region 中混合，避免裂缝和 popping"
      caption="在层级边缘逐渐混合高程和法线，让相邻分辨率看起来像一张连续地形。"
    >
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>
        Transition region：把换层藏在边缘渐变里
      </text>
      <path d="M 90 286 L 90 116 L 590 116 L 590 286" fill="none" stroke={warning} strokeWidth={18} opacity={0.24} />
      <path d="M 154 286 L 154 156 L 526 156 L 526 286" fill="none" stroke={success} strokeWidth={18} opacity={0.26} />
      <path d="M 238 286 L 238 198 L 442 198 L 442 286" fill="none" stroke={accent} strokeWidth={18} opacity={0.28} />
      <g fontSize={13} fontWeight={700} fill={primary}>
        <text x={98} y={96}>粗层 ring</text>
        <text x={250} y={138}>中层 ring</text>
        <text x={300} y={182}>细层</text>
      </g>
      <line x1={108} y1={322} x2={612} y2={322} stroke={border} strokeWidth={2} />
      <path d="M 108 322 l 16 -6 v 12 z" fill={border} />
      <path d="M 612 322 l -16 -6 v 12 z" fill={border} />
      <text x={360} y={348} textAnchor="middle" fontSize={13} fill={secondary}>
        viewer 靠近边界时 alpha 从 0 平滑走到 1
      </text>
      <rect x={54} y={52} width={152} height={42} rx={10} fill={surface} stroke={border} />
      <text x={70} y={78} fontSize={12} fill={secondary}>高程：vertex shader morph</text>
      <rect x={514} y={52} width={152} height={42} rx={10} fill={surface} stroke={border} />
      <text x={530} y={78} fontSize={12} fill={secondary}>法线：pixel shader blend</text>
    </Frame>
  );
}

export function GpuGems2Ch02GpuPipelineDiagram() {
  return (
    <Frame
      ariaLabel="GPU geometry clipmap 流水线：高程纹理进入 vertex shader，生成位置和过渡参数，normal map 进入 pixel shader 完成光照"
      caption="把高程、法线和过渡都表达成纹理与 shader 输入，CPU 只负责窗口和数据更新。"
    >
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>
        Elevation texture → vertex shader → normal map → pixel shader
      </text>
      <g transform="translate(48 112)">
        <rect width={136} height={112} rx={16} fill={surface} stroke={accent} strokeWidth={2} />
        <text x={68} y={32} textAnchor="middle" fontSize={14} fontWeight={700} fill={accent}>高程纹理</text>
        <text x={68} y={62} textAnchor="middle" fontSize={12} fill={secondary}>R32F / 每点 z</text>
        <text x={68} y={88} textAnchor="middle" fontSize={11} fill={secondary}>coarse → fine</text>
      </g>
      <Arrow x1={190} y1={168} x2={244} y2={168} />
      <g transform="translate(250 96)">
        <rect width={166} height={144} rx={16} fill={surface} stroke={warning} strokeWidth={2} />
        <text x={83} y={32} textAnchor="middle" fontSize={14} fontWeight={700} fill={warning}>Vertex shader</text>
        <text x={18} y={66} fontSize={12} fill={secondary}>读 z 与 z_coarser</text>
        <text x={18} y={94} fontSize={12} fill={secondary}>算 morph alpha</text>
        <text x={18} y={122} fontSize={12} fill={secondary}>输出位置 + uv</text>
      </g>
      <Arrow x1={422} y1={168} x2={476} y2={168} />
      <g transform="translate(482 112)">
        <rect width={136} height={112} rx={16} fill={surface} stroke={success} strokeWidth={2} />
        <text x={68} y={32} textAnchor="middle" fontSize={14} fontWeight={700} fill={success}>法线纹理</text>
        <text x={68} y={62} textAnchor="middle" fontSize={12} fill={secondary}>fine + coarse</text>
        <text x={68} y={88} textAnchor="middle" fontSize={11} fill={secondary}>renormalize</text>
      </g>
      <text x={360} y={292} textAnchor="middle" fontSize={13} fill={primary}>pixel shader：混合跨层法线，并按高度查颜色</text>
      <text x={360} y={350} textAnchor="middle" fontSize={13} fill={secondary}>
        常量网格和索引缓冲复用，变化主要发生在纹理数据
      </text>
    </Frame>
  );
}

type Level = { size: number; color: string; label: string };

export function GpuGems2Ch02GeometryClipmapLab() {
  const [viewer, setViewer] = useState(48);
  const [levels, setLevels] = useState(3);
  const [transition, setTransition] = useState(24);
  const [synthesis, setSynthesis] = useState(true);

  const levelData = useMemo<Level[]>(
    () => [
      { size: 92, color: success, label: "fine" },
      { size: 152, color: warning, label: "mid" },
      { size: 212, color: accent, label: "coarse" },
    ].slice(0, levels),
    [levels],
  );
  const shift = (viewer - 50) * 1.12;

  function reset() {
    setViewer(48);
    setLevels(3);
    setTransition(24);
    setSynthesis(true);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
      aria-label="GPU Gems 2 Chapter 2 几何 clipmap 实验：移动视点、切换层数、调整过渡宽度和运行时合成"
      data-visual-kind="gpu-gems2-ch02-geometry-clipmap"
    >
      <div className="border-b border-border px-5 py-4">
        <p className="text-sm font-semibold text-primary">Geometry clipmap 实验</p>
        <p className="mt-1 text-sm text-secondary">
          观察视点移动时，细层、粗层和 transition region 如何共同覆盖地形。
        </p>
      </div>
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_220px]">
        <div className="overflow-hidden rounded-card border border-border bg-[var(--bg)] p-3">
          <svg viewBox="0 0 540 330" role="img" aria-label="嵌套几何 clipmap 预览" className="block h-auto w-full">
            <path d="M 18 278 C 126 236 208 282 310 246 C 398 214 464 246 522 216 L 522 310 L 18 310 Z" fill={surface} />
            <g transform={`translate(${270 + shift} 150)`}>
              {levelData.slice().reverse().map((level) => (
                <rect key={level.label} x={-level.size / 2} y={-level.size / 2} width={level.size} height={level.size} fill={level.color} fillOpacity={0.08} stroke={level.color} strokeWidth={2} />
              ))}
              <circle r={13} fill="var(--bg)" stroke={danger} strokeWidth={2.5} />
              <text y={4} textAnchor="middle" fontSize={11} fontWeight={700} fill={danger}>view</text>
            </g>
            <g transform="translate(24 24)">
              <rect width={218} height={34} rx={10} fill={surface} stroke={border} />
              <text x={14} y={22} fontSize={12} fill={primary}>视点：{viewer}% · 更新条带：{viewer < 50 ? "左侧" : "右侧"}</text>
            </g>
            <g transform="translate(322 24)">
              <rect width={194} height={34} rx={10} fill={surface} stroke={border} />
              <text x={14} y={22} fontSize={12} fill={primary}>{synthesis ? "GPU runtime synthesis" : "预存高程数据"}</text>
            </g>
            <text x={270} y={320} textAnchor="middle" fontSize={12} fill={secondary}>边缘彩色带 = transition region，越宽换层越柔和</text>
          </svg>
        </div>
        <div className="space-y-4">
          <label className="block text-sm text-secondary">
            视点位置：{viewer}%
            <input className="mt-2 block h-11 w-full accent-[var(--accent)]" type="range" min="0" max="100" value={viewer} onChange={(event) => setViewer(Number(event.target.value))} />
          </label>
          <label className="block text-sm text-secondary">
            clipmap 层数：{levels}
            <input className="mt-2 block h-11 w-full accent-[var(--accent)]" type="range" min="2" max="3" value={levels} onChange={(event) => setLevels(Number(event.target.value))} />
          </label>
          <label className="block text-sm text-secondary">
            过渡宽度：{transition}%
            <input className="mt-2 block h-11 w-full accent-[var(--accent)]" type="range" min="8" max="48" step="4" value={transition} onChange={(event) => setTransition(Number(event.target.value))} />
          </label>
          <label className="flex min-h-11 items-center gap-2 text-sm text-secondary">
            <input type="checkbox" checked={synthesis} onChange={(event) => setSynthesis(event.target.checked)} />
            在 GPU 上合成 residual detail
          </label>
          <button type="button" className="min-h-11 w-full rounded-md border border-border px-3 py-2 text-sm font-semibold text-primary transition hover:border-[var(--accent)]" onClick={reset}>
            重置
          </button>
          <p className="text-xs leading-5 text-secondary" aria-live="polite">
            {levels} 层规则网格共享常量索引；视点移动只让一侧条带进入更新队列。
          </p>
        </div>
      </div>
    </section>
  );
}
