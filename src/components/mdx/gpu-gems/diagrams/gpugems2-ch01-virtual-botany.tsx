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

export function GpuGems2Ch01LayerDiagram() {
  return (
    <Frame
      ariaLabel="自然场景的分层示意：草地、地面杂物、灌木和树木从近到远共同组成场景"
      caption="把复杂自然场景拆成可独立管理、批量绘制的层。"
    >
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>
        不是“画更多”，而是把视觉复杂度拆成层
      </text>
      <rect x={42} y={74} width={636} height={238} rx={24} fill="var(--bg)" stroke={border} />
      <path d="M 42 250 C 190 212 282 270 410 226 C 514 190 590 226 678 206 L 678 312 L 42 312 Z" fill={surface} />
      <g stroke={border} strokeWidth={1.5} strokeDasharray="5 6" opacity={0.8}>
        <line x1={42} y1={128} x2={678} y2={128} />
        <line x1={42} y1={184} x2={678} y2={184} />
        <line x1={42} y1={240} x2={678} y2={240} />
      </g>
      <g stroke={success} strokeWidth={3}>
        {[100, 138, 176, 214, 252, 290, 328, 366, 404, 442, 480, 518, 556, 594, 632].map((x) => (
          <path key={x} d={`M ${x} 252 l -8 -34 M ${x} 252 l 4 -39 M ${x} 252 l 13 -29`} />
        ))}
      </g>
      <g fill={warning} opacity={0.9}>
        {[170, 245, 470, 600].map((x) => (
          <g key={x}>
            <circle cx={x} cy={232} r={7} />
            <circle cx={x + 12} cy={238} r={5} />
          </g>
        ))}
      </g>
      <g stroke={accent} strokeWidth={4} fill="none">
        <path d="M 130 226 C 130 160 144 122 166 92" />
        <path d="M 166 92 C 132 84 118 106 108 128" />
        <path d="M 166 92 C 190 74 216 90 230 118" />
        <path d="M 548 206 C 548 150 560 112 580 90" />
        <path d="M 580 90 C 548 82 534 104 526 126" />
        <path d="M 580 90 C 608 76 630 92 642 116" />
      </g>
      <g fontSize={13} fontWeight={700} fill={primary}>
        <text x={60} y={108}>远景树木：低频轮廓 + LOD</text>
        <text x={60} y={164}>中景灌木：叶簇 billboard</text>
        <text x={60} y={220}>近景草地：高密度批处理</text>
        <text x={60} y={300}>地面杂物：石块、树枝、碎叶</text>
      </g>
      <text x={360} y={356} textAnchor="middle" fontSize={13} fill={secondary}>
        每层拥有自己的距离、密度、材质和更新预算
      </text>
    </Frame>
  );
}

export function GpuGems2Ch01PlantingGridDiagram() {
  const cells = Array.from({ length: 25 }, (_, index) => index);
  return (
    <Frame
      ariaLabel="相机跟随的种植网格：中心区域保持稳定，边缘新网格单元被创建，离开视野的单元被回收"
      caption="相机移动时只重建越过边界的网格单元，避免保存整片世界的每一根草。"
    >
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>
        相机周围的虚拟种植网格
      </text>
      <g transform="translate(64 82)">
        {cells.map((cell) => {
          const row = Math.floor(cell / 5);
          const col = cell % 5;
          const edge = row === 0 || row === 4 || col === 0 || col === 4;
          return (
            <rect
              key={cell}
              x={col * 56}
              y={row * 56}
              width={52}
              height={52}
              rx={8}
              fill={edge ? "var(--accent)" : surface}
              fillOpacity={edge ? 0.14 : 1}
              stroke={edge ? accent : border}
              strokeWidth={edge ? 2 : 1}
            />
          );
        })}
        <circle cx={140} cy={140} r={30} fill="var(--bg)" stroke={warning} strokeWidth={2.5} />
        <text x={140} y={146} textAnchor="middle" fontSize={14} fontWeight={700} fill={warning}>相机</text>
        <text x={140} y={-16} textAnchor="middle" fontSize={13} fill={secondary}>世界空间固定网格</text>
      </g>
      <g transform="translate(390 94)">
        <rect width={278} height={188} rx={18} fill={surface} stroke={border} />
        <text x={22} y={32} fontSize={14} fontWeight={700} fill={primary}>单元生命周期</text>
        <circle cx={34} cy={68} r={7} fill={accent} />
        <text x={54} y={73} fontSize={12} fill={secondary}>离开范围：回收缓冲</text>
        <circle cx={34} cy={106} r={7} fill={warning} />
        <text x={54} y={111} fontSize={12} fill={secondary}>进入范围：收集多边形</text>
        <circle cx={34} cy={144} r={7} fill={success} />
        <text x={54} y={149} fontSize={12} fill={secondary}>完成布植：加入绘制队列</text>
        <text x={22} y={178} fontSize={11} fill={secondary}>队列让每帧 CPU 预算可控</text>
      </g>
      <Arrow x1={350} y1={202} x2={382} y2={202} />
      <text x={360} y={350} textAnchor="middle" fontSize={13} fill={secondary}>
        确定性种子让同一地点每次生成相同的植物分布
      </text>
    </Frame>
  );
}

export function GpuGems2Ch01BillboardDiagram() {
  return (
    <Frame
      ariaLabel="草叶 billboard 的顶点扩展：每个实例携带一个地面位置和四个角点偏移，顶点着色器使用相机右向量和上向量展开四边形"
      caption="顶点缓冲只存种植点，顶点着色器按角点和相机基向量展开 billboard。"
    >
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>
        一个种植点，四个角点，单次批量绘制
      </text>
      <g transform="translate(74 92)">
        <circle cx={124} cy={176} r={8} fill={warning} />
        <line x1={124} y1={176} x2={124} y2={74} stroke={success} strokeWidth={3} />
        <line x1={124} y1={176} x2={248} y2={176} stroke={accent} strokeWidth={3} />
        <text x={124} y={214} textAnchor="middle" fontSize={13} fill={secondary}>同一个世界位置</text>
        <text x={124} y={60} textAnchor="middle" fontSize={12} fill={success}>CameraUp</text>
        <text x={260} y={182} fontSize={12} fill={accent}>CameraRight</text>
        <rect x={70} y={92} width={108} height={168} rx={12} fill={accent} fillOpacity={0.12} stroke={accent} strokeWidth={2} />
        <path d="M 70 92 l -14 -12 M 178 92 l 14 -12 M 70 260 l -14 12 M 178 260 l 14 12" stroke={border} strokeWidth={1.5} />
        <text x={124} y={278} textAnchor="middle" fontSize={12} fill={primary}>屏幕朝向的草簇</text>
      </g>
      <g transform="translate(410 90)">
        <rect width={248} height={198} rx={18} fill={surface} stroke={border} />
        <text x={20} y={32} fontSize={14} fontWeight={700} fill={primary}>每个顶点携带</text>
        <text x={24} y={70} fontSize={12} fill={secondary}>position：种植位置</text>
        <text x={24} y={104} fontSize={12} fill={secondary}>corner：−1 / 0 / +1</text>
        <text x={24} y={138} fontSize={12} fill={secondary}>scale：宽高变化</text>
        <text x={24} y={172} fontSize={12} fill={secondary}>uv：图集子区域</text>
      </g>
      <text x={360} y={350} textAnchor="middle" fontSize={13} fill={secondary}>
        省下的不是草叶，而是 draw call、索引和重复顶点变换
      </text>
    </Frame>
  );
}

export function GpuGems2Ch01ShadowDiagram() {
  return (
    <Frame
      ariaLabel="shadow-feeler 示意：从种植点向太阳发射多条射线，根据命中比例在阳光色与环境色之间混合"
      caption="阴影只需要回答“是否被挡住”，不必为每根草求精确的最近交点。"
    >
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>
        用少量 shadow-feeler 换取可信的明暗线索
      </text>
      <circle cx={574} cy={92} r={34} fill={warning} fillOpacity={0.18} stroke={warning} strokeWidth={2.5} />
      <text x={574} y={98} textAnchor="middle" fontSize={14} fontWeight={700} fill={warning}>太阳</text>
      <path d="M 80 288 C 190 260 250 292 350 254 C 444 218 548 250 680 216 L 680 326 L 80 326 Z" fill={surface} />
      <path d="M 390 256 C 394 174 400 142 410 112 M 410 112 C 428 136 446 148 460 166" fill="none" stroke={accent} strokeWidth={8} />
      <path d="M 410 112 C 386 124 374 146 366 170" fill="none" stroke={accent} strokeWidth={8} />
      <circle cx={270} cy={250} r={7} fill={success} />
      <circle cx={520} cy={236} r={7} fill={success} />
      <g stroke={success} strokeWidth={2.5} strokeDasharray="6 5">
        <line x1={270} y1={250} x2={574} y2={92} />
        <line x1={520} y1={236} x2={574} y2={92} />
      </g>
      <g stroke={danger} strokeWidth={2.5} strokeDasharray="6 5">
        <line x1={396} y1={252} x2={574} y2={92} />
        <line x1={404} y1={258} x2={574} y2={92} />
      </g>
      <g fontSize={12} fill={secondary}>
        <text x={180} y={232}>无遮挡：偏向阳光色</text>
        <text x={438} y={300}>被树冠挡住：偏向环境色</text>
      </g>
      <rect x={100} y={72} width={182} height={54} rx={12} fill={surface} stroke={border} />
      <text x={116} y={96} fontSize={12} fontWeight={700} fill={primary}>3 或 5 条射线</text>
      <text x={116} y={116} fontSize={11} fill={secondary}>命中比例 → 阴影软度</text>
      <text x={360} y={366} textAnchor="middle" fontSize={13} fill={secondary}>
        这是稳定的近似：视觉目标优先于逐叶精确求交
      </text>
    </Frame>
  );
}

type Layer = "grass" | "clutter" | "tree";

type Plant = {
  x: number;
  y: number;
  height: number;
  layer: Layer;
  phase: number;
};

const PLANTS: Plant[] = [
  { x: 13, y: 26, height: 18, layer: "grass", phase: 0.2 },
  { x: 20, y: 39, height: 25, layer: "grass", phase: 1.1 },
  { x: 28, y: 30, height: 20, layer: "grass", phase: 2.0 },
  { x: 36, y: 44, height: 30, layer: "grass", phase: 2.8 },
  { x: 45, y: 34, height: 23, layer: "grass", phase: 3.7 },
  { x: 53, y: 48, height: 28, layer: "grass", phase: 4.6 },
  { x: 61, y: 31, height: 21, layer: "grass", phase: 5.1 },
  { x: 70, y: 42, height: 27, layer: "grass", phase: 5.8 },
  { x: 78, y: 28, height: 19, layer: "grass", phase: 0.8 },
  { x: 86, y: 46, height: 29, layer: "grass", phase: 1.7 },
  { x: 18, y: 55, height: 24, layer: "clutter", phase: 2.3 },
  { x: 32, y: 62, height: 17, layer: "clutter", phase: 3.0 },
  { x: 49, y: 57, height: 22, layer: "clutter", phase: 4.1 },
  { x: 66, y: 63, height: 18, layer: "clutter", phase: 5.2 },
  { x: 82, y: 58, height: 25, layer: "clutter", phase: 0.4 },
  { x: 26, y: 72, height: 58, layer: "tree", phase: 1.2 },
  { x: 58, y: 76, height: 78, layer: "tree", phase: 2.7 },
  { x: 80, y: 76, height: 48, layer: "tree", phase: 4.8 },
];

function PlantMark({ plant, wind, shadow }: { plant: Plant; wind: number; shadow: boolean }) {
  const px = 34 + plant.x * 5.15;
  const ground = 272 - plant.y * 1.1;
  const sway = wind * Math.sin(plant.phase) * (plant.layer === "tree" ? 3 : 8);
  const color = plant.layer === "tree" ? accent : plant.layer === "clutter" ? warning : success;
  const dimmed = shadow && plant.x > 42 && plant.x < 72;
  const opacity = dimmed ? 0.42 : 0.92;
  if (plant.layer === "tree") {
    return (
      <g opacity={opacity}>
        <line x1={px} y1={ground} x2={px + sway * 0.25} y2={ground - plant.height * 0.45} stroke={warning} strokeWidth={5} />
        <circle cx={px + sway * 0.25} cy={ground - plant.height * 0.62} r={plant.height * 0.23} fill={color} fillOpacity={0.16} stroke={color} strokeWidth={2.5} />
        <circle cx={px - 13 + sway * 0.25} cy={ground - plant.height * 0.55} r={plant.height * 0.15} fill={color} fillOpacity={0.18} stroke={color} strokeWidth={2} />
        <circle cx={px + 14 + sway * 0.25} cy={ground - plant.height * 0.5} r={plant.height * 0.16} fill={color} fillOpacity={0.18} stroke={color} strokeWidth={2} />
      </g>
    );
  }
  if (plant.layer === "clutter") {
    return (
      <g opacity={opacity}>
        <line x1={px - 6} y1={ground} x2={px + 8 + sway} y2={ground - 8} stroke={color} strokeWidth={4} strokeLinecap="round" />
        <circle cx={px + 10} cy={ground - 5} r={5} fill={color} fillOpacity={0.24} stroke={color} strokeWidth={1.5} />
      </g>
    );
  }
  return (
    <g opacity={opacity} stroke={color} strokeWidth={2} strokeLinecap="round">
      <line x1={px} y1={ground} x2={px - 6 + sway} y2={ground - plant.height} />
      <line x1={px} y1={ground} x2={px + 1 + sway} y2={ground - plant.height * 0.86} />
      <line x1={px} y1={ground} x2={px + 8 + sway} y2={ground - plant.height * 0.72} />
    </g>
  );
}

export function GpuGems2Ch01BotanyLab() {
  const [layer, setLayer] = useState<Layer>("grass");
  const [density, setDensity] = useState(70);
  const [wind, setWind] = useState(0.6);
  const [shadow, setShadow] = useState(true);
  const visiblePlants = useMemo(
    () => PLANTS.filter((plant) => plant.layer === layer && (plant.x * 7 + plant.y * 3) % 100 < density),
    [density, layer],
  );
  const label = layer === "grass" ? "草地 billboard" : layer === "clutter" ? "地面杂物" : "树木 LOD";

  function reset() {
    setLayer("grass");
    setDensity(70);
    setWind(0.6);
    setShadow(true);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
      aria-label="GPU Gems 2 Chapter 1 虚拟植物场景实验：切换植物层、密度、风摆和近似阴影"
      data-visual-kind="gpu-gems2-ch01-virtual-botany"
    >
      <div className="border-b border-border px-5 py-4">
        <p className="text-sm font-semibold text-primary">虚拟植物层实验</p>
        <p className="mt-1 text-sm text-secondary">
          当前显示：{label}。同一组确定性种植点可以换层、换密度，却不会随刷新漂移。
        </p>
      </div>
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_220px]">
        <div className="overflow-hidden rounded-card border border-border bg-[var(--bg)] p-3">
          <svg viewBox="0 0 540 330" role="img" aria-label={`${label}的确定性布植预览`} className="block h-auto w-full">
            <path d="M 20 270 C 132 244 228 284 326 252 C 408 226 468 244 520 226 L 520 310 L 20 310 Z" fill={surface} />
            <g stroke={border} strokeWidth={1} strokeDasharray="4 5" opacity={0.7}>
              {[0, 1, 2, 3, 4, 5, 6].map((row) => <line key={`h-${row}`} x1={24} y1={74 + row * 34} x2={516} y2={74 + row * 34} />)}
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col) => <line key={`v-${col}`} x1={34 + col * 60} y1={62} x2={34 + col * 60} y2={278} />)}
            </g>
            {visiblePlants.map((plant) => <PlantMark key={`${plant.layer}-${plant.x}-${plant.y}`} plant={plant} wind={wind} shadow={shadow} />)}
            <g transform="translate(24 24)">
              <rect width="174" height="30" rx="10" fill={surface} stroke={border} />
              <circle cx={18} cy={15} r={5} fill={shadow ? danger : success} />
              <text x={32} y={20} fontSize={12} fill={primary}>{shadow ? "近似阴影已开启" : "只看基础光照"}</text>
            </g>
            <text x={270} y={320} textAnchor="middle" fontSize={12} fill={secondary}>相机向前移动 → 边缘单元进入队列并重新布植</text>
          </svg>
        </div>
        <div className="space-y-4">
          <label className="block text-sm text-secondary">
            植物层
            <select className="mt-1 block h-11 w-full rounded-md border border-border bg-[var(--bg)] px-3 py-2 text-sm text-primary" value={layer} onChange={(event) => setLayer(event.target.value as Layer)}>
              <option value="grass">草地 billboard</option>
              <option value="clutter">地面杂物</option>
              <option value="tree">树木 LOD</option>
            </select>
          </label>
          <label className="block text-sm text-secondary">
            布植密度：{density}%
            <input className="mt-2 block h-11 w-full accent-[var(--accent)]" type="range" min="20" max="100" step="5" value={density} onChange={(event) => setDensity(Number(event.target.value))} />
          </label>
          <label className="block text-sm text-secondary">
            风摆幅度：{Math.round(wind * 100)}%
            <input className="mt-2 block h-11 w-full accent-[var(--accent)]" type="range" min="0" max="1" step="0.1" value={wind} onChange={(event) => setWind(Number(event.target.value))} />
          </label>
          <label className="flex min-h-11 items-center gap-2 text-sm text-secondary">
            <input type="checkbox" checked={shadow} onChange={(event) => setShadow(event.target.checked)} />
            用 shadow-feeler 调暗被遮挡区域
          </label>
          <button type="button" className="w-full rounded-md border border-border px-3 py-2 text-sm font-semibold text-primary transition hover:border-[var(--accent)]" onClick={reset}>
            重置
          </button>
          <p className="text-xs leading-5 text-secondary" aria-live="polite">
            当前批次含 {visiblePlants.length} 个可见样本。密度变化只改变确定性样本的截取范围，不会调用随机数。
          </p>
        </div>
      </div>
    </section>
  );
}
