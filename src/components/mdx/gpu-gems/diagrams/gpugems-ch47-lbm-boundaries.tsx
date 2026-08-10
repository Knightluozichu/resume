"use client";

import { useMemo, useState, type ReactNode } from "react";

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const surface = "var(--surface)";

function Frame({ ariaLabel, caption, children }: { ariaLabel: string; caption: string; children: ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 390" role="img" aria-label={ariaLabel} className="mx-auto block h-auto w-full max-w-[720px]">{children}</svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

function Arrow({ x1, y1, x2, y2, color = accent }: { x1: number; y1: number; x2: number; y2: number; color?: string }) {
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={2.5} />
      <path d={`M ${x2 - 8} ${y2 - 5} L ${x2} ${y2} L ${x2 - 8} ${y2 + 5}`} fill="none" stroke={color} strokeWidth={2.5} />
    </>
  );
}

export function GpuGemsCh47D2Q9Diagram() {
  const directions = [[0, 0, "0"], [1, 0, "E"], [0, -1, "N"], [-1, 0, "W"], [0, 1, "S"], [1, -1, "NE"], [-1, -1, "NW"], [-1, 1, "SW"], [1, 1, "SE"]];
  return (
    <Frame ariaLabel="D2Q9 LBM 节点：一个中心分布和八个沿水平、垂直、对角方向移动的 packet distribution" caption="D2Q9 每个二维节点保存 9 个分布；D3Q19 则把方向扩展到三维。">
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>D2Q9：一个节点的九个 packet distribution</text>
      <circle cx={360} cy={200} r={34} fill={accent} fillOpacity={0.15} stroke={accent} strokeWidth={2.5} /><text x={360} y={206} textAnchor="middle" fontSize={13} fontWeight={700} fill={accent}>f₀</text>
      {directions.slice(1).map(([dx, dy, label]) => { const x = 360 + Number(dx) * 112; const y = 200 + Number(dy) * 82; return <g key={label}><line x1={360 + Number(dx) * 38} y1={200 + Number(dy) * 28} x2={x - Number(dx) * 25} y2={y - Number(dy) * 20} stroke={border} strokeWidth={2} /><circle cx={x} cy={y} r={25} fill={surface} stroke={success} strokeWidth={2} /><text x={x} y={y + 5} textAnchor="middle" fontSize={12} fontWeight={700} fill={success}>{label}</text></g>; })}
      <rect x={76} y={304} width={568} height={46} rx={12} fill={surface} stroke={border} /><text x={360} y={333} textAnchor="middle" fontSize={13} fill={secondary}>每个方向的分布沿 e_qi 传播；中心项留在当前节点</text>
    </Frame>
  );
}

export function GpuGemsCh47LbmPipelineDiagram() {
  const stages = ["distribution textures", "density + velocity", "equilibrium fᵉᑫ", "collision + streaming", "boundary / outflow"];
  return (
    <Frame ariaLabel="GPU LBM 数据流：分布纹理生成密度和速度，再生成平衡分布，执行 collision streaming，处理边界后回写下一步分布纹理" caption="所有变量按方向分组为纹理；每个 texel 的 fragment program 更新一个格点属性。">
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>GPU LBM：每一步都是纹理到纹理的数据流</text>
      {stages.map((stage, index) => { const x = 32 + index * 138; return <g key={stage}><rect x={x} y={126} width={112} height={108} rx={14} fill={index === 3 ? accent : surface} fillOpacity={index === 3 ? 0.14 : 1} stroke={index === 3 ? accent : border} strokeWidth={2} /><text x={x + 56} y={164} textAnchor="middle" fontSize={12} fontWeight={700} fill={index === 3 ? accent : primary}>{stage}</text><text x={x + 56} y={192} textAnchor="middle" fontSize={11} fill={secondary}>{index === 0 ? "D2Q9 / D3Q19" : index === 1 ? "ρ, u" : index === 2 ? "f_eq" : index === 3 ? "f → f'" : "下一轮输入"}</text>{index < stages.length - 1 && <Arrow x1={x + 116} y1={180} x2={x + 132} y2={180} />}</g>; })}
      <text x={360} y={300} textAnchor="middle" fontSize={13} fontWeight={700} fill={success}>GPU 优化目标</text><text x={360} y={326} textAnchor="middle" fontSize={12} fill={secondary}>减少 pass、合并纹理访问、让边界和 advection 留在显存</text>
    </Frame>
  );
}

export function GpuGemsCh47VoxelPeelingDiagram() {
  return (
    <Frame ariaLabel="GPU depth peeling voxelization：从三个正交视图分层剥离边界几何，将覆盖的像素层转换为体素位置和属性数组" caption="CPU voxelization 会产生传输瓶颈；GPU 从三个正交方向做 peeling，得到覆盖边界的体素节点。">
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>复杂边界：从三视图 depth peeling 到体素节点</text>
      <g transform="translate(48 88)">
        <rect width={150} height={150} rx={14} fill={surface} stroke={accent} /><text x={75} y={30} textAnchor="middle" fontSize={13} fontWeight={700} fill={accent}>X view</text>{Array.from({ length: 4 }, (_, i) => <rect key={i} x={28 + i * 22} y={58 + (i % 2) * 24} width={16} height={16} fill={accent} fillOpacity={0.18} stroke={accent} />)}<text x={75} y={130} textAnchor="middle" fontSize={11} fill={secondary}>slice layers</text>
      </g>
      <g transform="translate(228 88)">
        <rect width={150} height={150} rx={14} fill={surface} stroke={success} /><text x={75} y={30} textAnchor="middle" fontSize={13} fontWeight={700} fill={success}>Y / Z views</text>{Array.from({ length: 5 }, (_, i) => <circle key={i} cx={40 + (i % 3) * 36} cy={68 + Math.floor(i / 3) * 38} r={8} fill={success} fillOpacity={0.2} stroke={success} />)}<text x={75} y={130} textAnchor="middle" fontSize={11} fill={secondary}>avoid missed voxels</text>
      </g>
      <Arrow x1={396} y1={162} x2={476} y2={162} />
      <g transform="translate(486 88)"><rect width={174} height={150} rx={14} fill={surface} stroke={warning} strokeWidth={2} /><text x={87} y={30} textAnchor="middle" fontSize={13} fontWeight={700} fill={warning}>voxel array</text><text x={87} y={66} textAnchor="middle" fontSize={12} fill={primary}>position</text><text x={87} y={92} textAnchor="middle" fontSize={12} fill={primary}>wall velocity</text><text x={87} y={118} textAnchor="middle" fontSize={12} fill={primary}>plane coefficients</text></g>
      <text x={360} y={304} textAnchor="middle" fontSize={13} fill={secondary}>fragment 不能 scatter，因此把体素转成 vertex array 再按位置覆盖输出</text>
    </Frame>
  );
}

export function GpuGemsCh47BoundaryBounceDiagram() {
  return (
    <Frame ariaLabel="LBM 曲壁边界：液体节点的分布沿边界链接撞回相反方向，使用体素位置、壁面速度和边界平面系数修正分布" caption="边界链接的两侧分布方向相反且共线；bounce-back 和壁面速度共同决定反射后的 packet。">
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>边界条件：沿 lattice link 处理反射和壁面速度</text>
      <path d="M 86 278 C 180 178, 260 188, 352 122 C 430 68, 540 106, 634 62" fill="none" stroke={warning} strokeWidth={5} />
      <text x={548} y={96} fontSize={13} fontWeight={700} fill={warning}>固体边界</text>
      <circle cx={260} cy={198} r={28} fill={accent} fillOpacity={0.14} stroke={accent} strokeWidth={2} /><text x={260} y={203} textAnchor="middle" fontSize={13} fill={accent}>fluid</text>
      <Arrow x1={288} y1={182} x2={390} y2={140} color={accent} /><Arrow x1={390} y1={172} x2={290} y2={224} color={success} />
      <text x={420} y={135} fontSize={12} fill={accent}>f_qi 进入边界</text><text x={420} y={201} fontSize={12} fill={success}>f_opposite 反射</text>
      <rect x={80} y={302} width={566} height={48} rx={12} fill={surface} stroke={border} /><text x={363} y={332} textAnchor="middle" fontSize={13} fill={secondary}>需要 pos、壁面速度 u_w、平面系数 (A, B, C, D)</text>
    </Frame>
  );
}

export function GpuGemsCh47ParticleAdvectionDiagram() {
  return (
    <Frame ariaLabel="粒子可视化：从入口注入彩色粒子，按当前速度场进行 advection，越界或零速度粒子被回收到入口并继续渲染" caption="粒子不是 LBM 状态本身，而是帮助读者观察速度场形状的可视化层。">
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>可视化：粒子沿速度场 advect，并在出口回收</text>
      <rect x={84} y={78} width={552} height={188} rx={14} fill={surface} stroke={border} />
      <path d="M 108 216 C 190 92, 274 92, 356 190 S 500 282, 612 118" fill="none" stroke={accent} strokeWidth={2.5} strokeDasharray="7 8" />
      {Array.from({ length: 10 }, (_, i) => { const x = 112 + i * 50; const y = 214 - Math.sin(i * 0.75) * 62; return <g key={i}><circle cx={x} cy={y} r={6} fill={i % 2 === 0 ? warning : success} /><Arrow x1={x + 8} y1={y - 5} x2={x + 28} y2={y - 14} color={i % 2 === 0 ? warning : success} /></g>; })}
      <text x={104} y={101} fontSize={13} fontWeight={700} fill={success}>入口：注入</text><text x={540} y={250} fontSize={13} fontWeight={700} fill={warning}>出口：回收</text>
      <text x={360} y={316} textAnchor="middle" fontSize={13} fill={secondary}>粒子位置存纹理，由 fragment program 更新；整个循环可留在 GPU</text>
    </Frame>
  );
}

type Boundary = "circle" | "bar";
type Cell = { rho: number; ux: number; uy: number; obstacle: boolean };

const GRID_W = 18;
const GRID_H = 10;
const VX = [0, 1, 0, -1, 0, 1, -1, -1, 1];
const VY = [0, 0, -1, 0, 1, -1, -1, 1, 1];
const WEIGHTS = [4 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 36, 1 / 36, 1 / 36, 1 / 36];
const OPPOSITE = [0, 3, 4, 1, 2, 7, 8, 5, 6];

function isObstacle(boundary: Boundary, x: number, y: number) {
  if (boundary === "bar") return x === 9 && y >= 2 && y <= 7;
  const dx = x - 10;
  const dy = y - 5;
  return dx * dx + dy * dy <= 5;
}

function equilibrium(rho: number, ux: number, uy: number) {
  const speed2 = ux * ux + uy * uy;
  return WEIGHTS.map((weight, q) => {
    const dot = VX[q] * ux + VY[q] * uy;
    return weight * rho * (1 + 3 * dot + 4.5 * dot * dot - 1.5 * speed2);
  });
}

function simulate(boundary: Boundary, relaxation: number, steps: number): Cell[] {
  const cellCount = GRID_W * GRID_H;
  let distributions = Array.from({ length: cellCount }, (_, index) => {
    const x = index % GRID_W;
    const y = Math.floor(index / GRID_W);
    return isObstacle(boundary, x, y) ? Array.from({ length: 9 }, () => 0) : equilibrium(1, 0.08, 0);
  });
  for (let step = 0; step < steps; step += 1) {
    const post = Array.from({ length: cellCount }, () => Array.from({ length: 9 }, () => 0));
    for (let index = 0; index < cellCount; index += 1) {
      const x = index % GRID_W;
      const y = Math.floor(index / GRID_W);
      if (isObstacle(boundary, x, y)) continue;
      const rho = distributions[index].reduce((sum, value) => sum + value, 0);
      const ux = distributions[index].reduce((sum, value, q) => sum + value * VX[q], 0) / Math.max(rho, 0.0001);
      const uy = distributions[index].reduce((sum, value, q) => sum + value * VY[q], 0) / Math.max(rho, 0.0001);
      const eq = equilibrium(rho, ux, uy);
      post[index] = distributions[index].map((value, q) => value + relaxation * (eq[q] - value));
    }
    const next = Array.from({ length: cellCount }, () => Array.from({ length: 9 }, () => 0));
    for (let index = 0; index < cellCount; index += 1) {
      const x = index % GRID_W;
      const y = Math.floor(index / GRID_W);
      if (isObstacle(boundary, x, y)) continue;
      for (let q = 0; q < 9; q += 1) {
        const nx = x + VX[q];
        const ny = y + VY[q];
        if (nx < 0 || nx >= GRID_W || ny < 0 || ny >= GRID_H || isObstacle(boundary, nx, ny)) next[index][OPPOSITE[q]] += post[index][q];
        else next[ny * GRID_W + nx][q] += post[index][q];
      }
    }
    for (let y = 1; y < GRID_H - 1; y += 1) {
      const inlet = y * GRID_W;
      if (!isObstacle(boundary, 0, y)) next[inlet] = equilibrium(1, 0.08, 0);
    }
    distributions = next;
  }
  return distributions.map((values, index) => {
    const x = index % GRID_W;
    const y = Math.floor(index / GRID_W);
    const obstacle = isObstacle(boundary, x, y);
    const rho = values.reduce((sum, value) => sum + value, 0);
    return { rho, ux: obstacle ? 0 : values.reduce((sum, value, q) => sum + value * VX[q], 0) / Math.max(rho, 0.0001), uy: obstacle ? 0 : values.reduce((sum, value, q) => sum + value * VY[q], 0) / Math.max(rho, 0.0001), obstacle };
  });
}

export function GpuGemsCh47LbmFlowLab() {
  const [boundary, setBoundary] = useState<Boundary>("circle");
  const [relaxation, setRelaxation] = useState(1.1);
  const [steps, setSteps] = useState(8);
  const [showParticles, setShowParticles] = useState(true);
  const field = useMemo(() => simulate(boundary, relaxation, steps), [boundary, relaxation, steps]);
  const maxSpeed = Math.max(...field.map((cell) => Math.hypot(cell.ux, cell.uy)), 0.001);
  const particles = Array.from({ length: 16 }, (_, index) => {
    const y = 1 + (index % 8);
    const x = 1 + ((index * 3 + steps) % 12);
    const cell = field[y * GRID_W + x];
    return { x: 28 + x * 28 + cell.ux * 80, y: 48 + y * 25 - cell.uy * 80, color: index % 2 === 0 ? warning : success };
  });

  function reset() {
    setBoundary("circle");
    setRelaxation(1.1);
    setSteps(8);
    setShowParticles(true);
  }

  return (
    <section className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated" aria-label="GPU Gems Chapter 47 LBM 流体实验：切换障碍物边界，调整 relaxation 和时间步，观察速度场与粒子轨迹" data-visual-kind="gpu-gems-ch47-lbm-flow">
      <div className="border-b border-border px-5 py-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-[11px] uppercase tracking-[0.18em] text-secondary">GPU Gems 2 · Chapter 47</p><h3 className="mt-1 text-lg font-semibold text-primary">D2Q9 LBM：障碍物改变速度场，粒子显示涡流</h3><p className="mt-1 max-w-2xl text-sm text-secondary">切换圆形或条形边界，推进小型格点模拟，观察 collision、streaming 和 bounce-back 产生的速度变化。</p></div><span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">▷ 可交互</span></div></div>
      <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_250px]">
        <div className="min-w-0 rounded-card border border-border bg-surface p-3"><svg viewBox="0 0 560 330" className="h-auto w-full" role="img" aria-label={`D2Q9 模拟 ${steps} 步，障碍物类型 ${boundary === "circle" ? "圆形" : "条形"}，速度场和粒子视图`}>
          <text x={20} y={24} fontSize={13} fontWeight={700} fill={primary}>速度场 · step {steps}</text>
          {field.map((cell, index) => { const x = index % GRID_W; const y = Math.floor(index / GRID_W); const px = 28 + x * 28; const py = 48 + y * 25; const speed = Math.hypot(cell.ux, cell.uy); return <g key={index}><rect x={px - 12} y={py - 10} width={24} height={20} rx={4} fill={cell.obstacle ? "var(--text-secondary)" : accent} fillOpacity={cell.obstacle ? 0.65 : 0.08 + (speed / maxSpeed) * 0.5} stroke={cell.obstacle ? secondary : border} /><line x1={px} y1={py} x2={px + cell.ux * 170} y2={py - cell.uy * 170} stroke={cell.obstacle ? secondary : success} strokeWidth={1.5} opacity={cell.obstacle ? 0 : 0.72} /></g>; })}
          {showParticles && particles.map((particle, index) => <circle key={index} cx={particle.x} cy={particle.y} r={4} fill={particle.color} />)}
          <text x={28} y={316} fontSize={12} fill={secondary}>左侧入口 → 障碍物 bounce-back → 右侧出口</text>
        </svg></div>
        <aside className="space-y-4 rounded-card border border-border bg-surface p-4">
          <div><label htmlFor="ch47-boundary" className="mb-1 block text-xs font-semibold text-primary">障碍物边界</label><select id="ch47-boundary" value={boundary} onChange={(event) => { setBoundary(event.target.value as Boundary); setSteps(0); }} className="min-h-[44px] w-full rounded-control border border-border bg-elevated px-3 py-2 text-sm text-primary"><option value="circle">圆形：产生绕流</option><option value="bar">条形：产生分离</option></select></div>
          <div><div className="flex items-center justify-between text-xs"><label htmlFor="ch47-relaxation" className="font-semibold text-primary">relaxation ω</label><span className="font-mono text-accent">{relaxation.toFixed(1)}</span></div><input id="ch47-relaxation" type="range" min={0.6} max={1.8} step={0.1} value={relaxation} onChange={(event) => setRelaxation(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" /></div>
          <div><div className="flex items-center justify-between text-xs"><label htmlFor="ch47-steps" className="font-semibold text-primary">模拟步数</label><span className="font-mono text-accent">{steps}</span></div><input id="ch47-steps" type="range" min={0} max={20} value={steps} onChange={(event) => setSteps(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" /></div>
          <label className="flex items-start gap-2 text-xs text-secondary"><input type="checkbox" checked={showParticles} onChange={(event) => setShowParticles(event.target.checked)} className="mt-0.5 accent-[var(--accent)]" /><span><strong className="text-primary">显示粒子</strong><br />按当前速度场 advect</span></label>
          <div className="rounded-card border border-border bg-elevated p-3 text-xs"><p className="font-semibold text-primary">本轮证据</p><dl className="mt-2 space-y-2 text-secondary"><div className="flex justify-between gap-3"><dt>最大速度</dt><dd className="font-mono text-success">{maxSpeed.toFixed(3)}</dd></div><div className="flex justify-between gap-3"><dt>节点数</dt><dd className="font-mono text-accent">{GRID_W * GRID_H}</dd></div><div className="flex justify-between gap-3"><dt>分布数 / 节点</dt><dd className="font-mono text-warning">9</dd></div></dl></div>
          <button type="button" onClick={reset} className="min-h-[44px] w-full rounded-control border border-border px-3 py-2 text-xs font-semibold text-secondary hover:border-accent hover:text-accent">重置实验</button>
        </aside>
      </div>
      <div className="border-t border-border px-5 py-3 text-xs text-secondary">这是教学用小网格：每一步都实际执行 equilibrium、collision、streaming 和边界反射，数值规模刻意保持可读。</div>
    </section>
  );
}
