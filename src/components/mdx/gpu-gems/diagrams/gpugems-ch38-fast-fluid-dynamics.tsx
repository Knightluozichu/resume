"use client";

import { useState, type ReactNode } from "react";

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
  children: ReactNode;
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

function ArrowDefs({ prefix }: { prefix: string }) {
  return (
    <defs>
      <marker
        id={`${prefix}-arrow`}
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill={accent} />
      </marker>
    </defs>
  );
}

function Arrow({
  prefix,
  x1,
  y1,
  x2,
  y2,
  stroke = accent,
}: {
  prefix: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke?: string;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={stroke}
      strokeWidth={3}
      markerEnd={`url(#${prefix}-arrow)`}
    />
  );
}

function Node({
  x,
  y,
  width,
  height,
  title,
  detail,
  color = accent,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  detail: string;
  color?: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={14}
        fill={color}
        fillOpacity={0.08}
        stroke={color}
        strokeWidth={2}
      />
      <text
        x={x + width / 2}
        y={y + 30}
        textAnchor="middle"
        fontSize={15}
        fontWeight={700}
        fill={primary}
      >
        {title}
      </text>
      <text
        x={x + width / 2}
        y={y + 58}
        textAnchor="middle"
        fontSize={12}
        fill={secondary}
      >
        {detail}
      </text>
    </g>
  );
}

export function GpuGemsCh38FluidStepDiagram() {
  const steps = [
    ["add sources", "density + forces", accent],
    ["diffuse", "Jacobi passes", warning],
    ["advect", "backtrace + sample", accent],
    ["project", "divergence-free", success],
  ] as const;

  return (
    <Frame
      ariaLabel="快速流体模拟的时间步流程图：加入源、扩散、半拉格朗日平流、投影到无散速度场，边界条件贯穿每个阶段。"
      caption="每个时间步都消费上一阶段的稳定纹理；边界不是最后补丁，而是每个 pass 的约束。"
    >
      <ArrowDefs prefix="ch38-fluid-step" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>
        stable fluids：一个时间步的 pass 顺序
      </text>
      {steps.map(([title, detail, color], index) => {
        const x = 18 + index * 174;
        return (
          <g key={`ch38-fluid-step-${title}`}>
            <Node x={x} y={92} width={148} height={104} title={title} detail={detail} color={color} />
            {index < steps.length - 1 ? (
              <Arrow prefix="ch38-fluid-step" x1={x + 148} y1={144} x2={x + 168} y2={144} />
            ) : null}
          </g>
        );
      })}
      <rect x={42} y={242} width={636} height={74} rx={15} fill={surface} stroke={border} />
      <text x={360} y={270} textAnchor="middle" fontSize={14} fontWeight={700} fill={primary}>
        boundary pass：墙面速度、障碍物 mask、网格外采样
      </text>
      <text x={360} y={296} textAnchor="middle" fontSize={12} fill={secondary}>
        约束每个阶段的读写，防止密度穿墙或 backtrace 采到无效 texel
      </text>
      <path d="M 95 242 L 95 202 M 270 242 L 270 202 M 444 242 L 444 202 M 618 242 L 618 202" stroke={border} strokeWidth={2} strokeDasharray="6 5" />
    </Frame>
  );
}

export function GpuGemsCh38FieldPackingDiagram() {
  const fields = [
    ["velocity", "R=u · G=v", accent],
    ["density", "dye / smoke", success],
    ["pressure", "Jacobi result", warning],
    ["divergence", "∇ · u", danger],
  ] as const;
  return (
    <Frame
      ariaLabel="流体网格字段布局图：每个网格 cell 对应一个 texel，速度、密度、压力和散度存储在浮点纹理中，输入输出用 A/B ping-pong 表面分离。"
      caption="把每个 cell 当成 texel：shader 对 fragment 的工作就是更新一个网格状态，并写入下一张表面。"
    >
      <ArrowDefs prefix="ch38-field" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>
        fields → floating-point textures → fragments
      </text>
      <rect x={22} y={70} width={258} height={246} rx={16} fill={accent} fillOpacity={0.06} stroke={accent} strokeWidth={2} />
      <text x={151} y={102} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>grid / texture</text>
      <g stroke={border} strokeWidth={1}>
        {[0, 1, 2, 3].map((row) => [0, 1, 2, 3, 4].map((col) => (
          <rect key={`ch38-grid-${row}-${col}`} x={66 + col * 34} y={130 + row * 34} width={32} height={32} fill={surface} />
        )))}
      </g>
      <circle cx={134} cy={198} r={7} fill={success} />
      <path d="M 134 198 L 158 188 M 134 198 L 124 221" stroke={success} strokeWidth={2} markerEnd="url(#ch38-field-arrow)" />
      <text x={151} y={294} textAnchor="middle" fontSize={12} fill={secondary}>cell = texel = fragment</text>
      <Arrow prefix="ch38-field" x1={280} y1={192} x2={324} y2={192} />
      <rect x={328} y={70} width={200} height={246} rx={16} fill={warning} fillOpacity={0.06} stroke={warning} strokeWidth={2} />
      <text x={428} y={102} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>state fields</text>
      {fields.map(([title, detail, color], index) => (
        <g key={`ch38-field-${title}`}>
          <rect x={354} y={120 + index * 42} width={148} height={30} rx={8} fill={color} fillOpacity={0.1} stroke={color} />
          <text x={370} y={140 + index * 42} fontSize={12} fontWeight={700} fill={primary}>{title}</text>
          <text x={493} y={140 + index * 42} textAnchor="end" fontSize={11} fill={secondary}>{detail}</text>
        </g>
      ))}
      <Arrow prefix="ch38-field" x1={528} y1={192} x2={564} y2={192} stroke={success} />
      <rect x={568} y={70} width={130} height={246} rx={16} fill={success} fillOpacity={0.06} stroke={success} strokeWidth={2} />
      <text x={633} y={104} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>ping-pong</text>
      <rect x={585} y={132} width={96} height={50} rx={10} fill={surface} stroke={accent} strokeWidth={2} />
      <text x={633} y={154} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>surface A</text>
      <text x={633} y={172} textAnchor="middle" fontSize={11} fill={secondary}>read</text>
      <rect x={585} y={216} width={96} height={50} rx={10} fill={surface} stroke={success} strokeWidth={2} />
      <text x={633} y={238} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>surface B</text>
      <text x={633} y={256} textAnchor="middle" fontSize={11} fill={secondary}>write</text>
      <path d="M 633 184 L 633 214 M 625 214 L 625 184" stroke={accent} strokeWidth={2} markerEnd="url(#ch38-field-arrow)" />
    </Frame>
  );
}

export function GpuGemsCh38JacobiProjectionDiagram() {
  return (
    <Frame
      ariaLabel="投影流程图：速度先计算散度，Jacobi 迭代在压力 A/B 纹理间交换多轮，最后减去压力梯度，得到近似无散速度。"
      caption="投影把数值上可行但会膨胀的速度场拉回不可压缩约束；Jacobi 的轮数是质量与成本的直接旋钮。"
    >
      <ArrowDefs prefix="ch38-jacobi" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>
        projection：divergence → pressure → gradient
      </text>
      <Node x={20} y={106} width={152} height={104} title="velocity" detail="u = (u, v)" color={accent} />
      <Arrow prefix="ch38-jacobi" x1={172} y1={158} x2={214} y2={158} />
      <Node x={218} y={106} width={152} height={104} title="divergence" detail="∇ · u" color={danger} />
      <Arrow prefix="ch38-jacobi" x1={370} y1={158} x2={412} y2={158} />
      <rect x={416} y={76} width={190} height={168} rx={16} fill={warning} fillOpacity={0.08} stroke={warning} strokeWidth={2} />
      <text x={511} y={110} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>Jacobi pressure</text>
      <text x={511} y={138} textAnchor="middle" fontSize={12} fill={secondary}>p_next = average(neighbors)</text>
      <rect x={442} y={160} width={60} height={42} rx={9} fill={surface} stroke={accent} />
      <text x={472} y={186} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>A</text>
      <path d="M 502 181 L 520 181" stroke={accent} strokeWidth={2} markerEnd="url(#ch38-jacobi-arrow)" />
      <rect x={524} y={160} width={60} height={42} rx={9} fill={surface} stroke={success} />
      <text x={554} y={186} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>B</text>
      <path d="M 554 207 C 554 226 472 226 472 207" fill="none" stroke={accent} strokeWidth={2} markerEnd="url(#ch38-jacobi-arrow)" />
      <text x={511} y={230} textAnchor="middle" fontSize={11} fill={warning}>repeat N passes</text>
      <Arrow prefix="ch38-jacobi" x1={606} y1={158} x2={648} y2={158} stroke={success} />
      <Node x={652} y={106} width={58} height={104} title="u′" detail="∇·u≈0" color={success} />
      <rect x={94} y={286} width={532} height={42} rx={11} fill={surface} stroke={border} />
      <text x={360} y={312} textAnchor="middle" fontSize={12} fill={secondary}>u′ = u − ∇p：减去压力梯度，并在边界处重算邻居关系</text>
    </Frame>
  );
}

export function GpuGemsCh38BoundaryDiagram() {
  return (
    <Frame
      ariaLabel="障碍物边界图：流体网格中的墙体 mask 阻止速度穿墙，外部采样被 clamp，密度边界决定染料是否贴墙或离开计算域。"
      caption="边界条件定义了模拟世界的形状；没有 mask 和 clamp，数值稳定也救不了穿墙、漏染料的结果。"
    >
      <ArrowDefs prefix="ch38-boundary" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>
        boundary condition：把墙体写进每个邻域采样
      </text>
      <rect x={38} y={78} width={286} height={236} rx={16} fill={accent} fillOpacity={0.06} stroke={accent} strokeWidth={2} />
      <text x={181} y={110} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>fluid grid</text>
      <g stroke={border} strokeWidth={1}>
        {[0, 1, 2, 3, 4].map((row) => [0, 1, 2, 3, 4].map((col) => (
          <rect key={`ch38-boundary-${row}-${col}`} x={74 + col * 42} y={132 + row * 32} width={40} height={30} fill={row === 2 && col > 1 ? danger : surface} fillOpacity={row === 2 && col > 1 ? 0.25 : 1} />
        )))}
      </g>
      <text x={244} y={248} textAnchor="middle" fontSize={12} fontWeight={700} fill={danger}>obstacle mask</text>
      <path d="M 115 214 L 165 214" stroke={success} strokeWidth={3} markerEnd="url(#ch38-boundary-arrow)" />
      <path d="M 200 214 L 184 214" stroke={danger} strokeWidth={3} markerEnd="url(#ch38-boundary-arrow)" />
      <text x={181} y={294} textAnchor="middle" fontSize={12} fill={secondary}>no-slip：速度在墙处归零或反射</text>
      <Arrow prefix="ch38-boundary" x1={324} y1={196} x2={370} y2={196} />
      <rect x={374} y={78} width={304} height={236} rx={16} fill={warning} fillOpacity={0.06} stroke={warning} strokeWidth={2} />
      <text x={526} y={110} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>采样规则</text>
      <Node x={398} y={132} width={112} height={76} title="outside" detail="clamp UV" color={warning} />
      <Node x={532} y={132} width={122} height={76} title="density" detail="贴合边界" color={success} />
      <text x={526} y={246} textAnchor="middle" fontSize={12} fill={secondary}>每个 pass 都读取 mask，避免邻居把量带过墙</text>
      <text x={526} y={274} textAnchor="middle" fontSize={11} fill={warning}>先定义边界，再调 solver 迭代数</text>
    </Frame>
  );
}

export function GpuGemsCh38FluidLab() {
  const [phase, setPhase] = useState<"advection" | "projection">("advection");
  const [resolution, setResolution] = useState(256);
  const [iterations, setIterations] = useState(16);
  const [viscosity, setViscosity] = useState(0.12);
  const [sourceStrength, setSourceStrength] = useState(0.7);
  const [obstacle, setObstacle] = useState(true);
  const [keepGpuResident, setKeepGpuResident] = useState(true);

  const cells = resolution * resolution;
  const jacobiPasses = Math.max(1, Math.round(iterations / 4));
  const passes = 2 + jacobiPasses + (phase === "projection" ? 2 : 1) + (obstacle ? 1 : 0);
  const bandwidthCost = (cells / 65536) * passes;
  const readbackPenalty = keepGpuResident ? 0 : 1.8;
  const dissipation = Math.max(0.04, 0.18 - viscosity * 0.4 + (phase === "advection" ? 0.02 : 0));
  const stability = Math.min(99, 72 + Math.round(Math.min(iterations, 32) * 0.8) + (obstacle ? 7 : -8));
  const verdict = !obstacle
    ? "边界关闭：适合观察 solver，但障碍物附近的速度和染料可能穿透。"
    : !keepGpuResident
      ? "警告：readback 会加入同步成本；只有 CPU 确实要读取场数据时才这样做。"
      : phase === "projection" && iterations < 12
        ? "投影轮数偏低：画面仍可稳定，但散度残差会更明显。"
        : "可发布实验配置：字段留在 GPU，边界启用；继续用 profiler 校准真实 pass 成本。";

  const reset = () => {
    setPhase("advection");
    setResolution(256);
    setIterations(16);
    setViscosity(0.12);
    setSourceStrength(0.7);
    setObstacle(true);
    setKeepGpuResident(true);
  };

  return (
    <section
      data-visual-kind="gpu-gems-ch38-fast-fluid-dynamics"
      className="not-prose my-6 rounded-card border border-border bg-elevated p-5"
      aria-label="快速流体模拟交互实验：切换平流与投影阶段，调整网格分辨率、Jacobi 迭代、黏性、源强、障碍物和 GPU 驻留"
    >
      <div className="mb-4">
        <p className="mb-1 text-xs uppercase tracking-[0.18em] text-secondary">stable fluids lab</p>
        <h3 className="m-0 text-lg font-semibold text-primary">观察 pass 预算如何改变流体质量</h3>
        <p className="mt-2 text-sm leading-6 text-secondary">这是一个可解释的示意模型：调节 solver 阶段和网格预算，比较 Jacobi pass、带宽压力、稳定性与染料衰减。数字用于建立工程直觉，不替代 GPU profiler。</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-control border border-border bg-surface p-3">
          <svg viewBox="0 0 440 356" role="img" aria-label={`当前阶段 ${phase}，${resolution} 乘 ${resolution} 网格，${iterations} 次 Jacobi 迭代，${passes} 个 pass，稳定性 ${stability}，估算带宽压力 ${bandwidthCost.toFixed(1)}`} className="h-auto w-full">
            <defs>
              <marker id="ch38-lab-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill={accent} /></marker>
            </defs>
            <text x={220} y={22} textAnchor="middle" fontSize={16} fontWeight={700} fill={primary}>source → {phase} → display</text>
            <rect x={18} y={52} width={112} height={58} rx={11} fill={accent} fillOpacity={0.1} stroke={accent} />
            <text x={74} y={76} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>source</text>
            <text x={74} y={96} textAnchor="middle" fontSize={11} fill={secondary}>{sourceStrength.toFixed(2)} strength</text>
            <line x1={130} y1={81} x2={158} y2={81} stroke={accent} strokeWidth={3} markerEnd="url(#ch38-lab-arrow)" />
            <rect x={162} y={52} width={118} height={58} rx={11} fill={warning} fillOpacity={0.1} stroke={warning} />
            <text x={221} y={76} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>{phase}</text>
            <text x={221} y={96} textAnchor="middle" fontSize={11} fill={secondary}>{passes} passes</text>
            <line x1={280} y1={81} x2={308} y2={81} stroke={success} strokeWidth={3} markerEnd="url(#ch38-lab-arrow)" />
            <rect x={312} y={52} width={110} height={58} rx={11} fill={success} fillOpacity={0.1} stroke={success} />
            <text x={367} y={76} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>display</text>
            <text x={367} y={96} textAnchor="middle" fontSize={11} fill={secondary}>{obstacle ? "masked" : "open"}</text>
            <rect x={32} y={138} width={376} height={116} rx={15} fill={surface} stroke={border} />
            <text x={220} y={164} textAnchor="middle" fontSize={14} fontWeight={700} fill={primary}>field snapshot</text>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((cell) => {
              const column = cell % 4;
              const row = Math.floor(cell / 4);
              const active = (cell + (phase === "projection" ? 1 : 0)) % 4;
              return <rect key={`ch38-lab-cell-${cell}`} x={104 + column * 58} y={181 + row * 31} width={48} height={24} rx={5} fill={cell % 4 === active ? success : accent} fillOpacity={0.15 + sourceStrength * 0.25} stroke={cell % 4 === active ? success : accent} />;
            })}
            <text x={220} y={238} textAnchor="middle" fontSize={11} fill={secondary}>velocity + density remain GPU resident</text>
            <text x={220} y={286} textAnchor="middle" fontSize={14} fontWeight={700} fill={primary}>stability {stability}% · dissipation {dissipation.toFixed(2)}</text>
            <text x={220} y={314} textAnchor="middle" fontSize={12} fill={secondary}>bandwidth pressure {bandwidthCost.toFixed(1)} · {keepGpuResident ? "no readback" : "CPU readback"}</text>
          </svg>
        </div>
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <button type="button" className="min-h-11 rounded-control border border-border bg-surface px-3 py-2 text-left text-sm text-primary transition hover:border-accent" onClick={() => setPhase((value) => value === "advection" ? "projection" : "advection")}>
              切换阶段：{phase === "advection" ? "平流" : "投影"}
              <span className="mt-1 block text-xs text-secondary">观察不同 pass 的职责</span>
            </button>
            <button type="button" className="min-h-11 rounded-control border border-border bg-surface px-3 py-2 text-left text-sm text-primary transition hover:border-accent" onClick={reset}>重置实验</button>
          </div>
          <label className="block text-sm text-primary">网格分辨率：{resolution} × {resolution}
            <select className="mt-2 min-h-11 w-full rounded-control border border-border bg-surface px-3 text-primary" value={resolution} onChange={(event) => setResolution(Number(event.target.value))}>
              <option value={128}>128 × 128</option>
              <option value={256}>256 × 256</option>
              <option value={512}>512 × 512</option>
            </select>
          </label>
          <label className="block text-sm text-primary">Jacobi 迭代：{iterations}
            <input className="mt-2 w-full accent-[var(--accent)]" type="range" min={4} max={40} step={4} value={iterations} onChange={(event) => setIterations(Number(event.target.value))} />
          </label>
          <label className="block text-sm text-primary">黏性：{viscosity.toFixed(2)}
            <input className="mt-2 w-full accent-[var(--accent)]" type="range" min={0} max={0.4} step={0.02} value={viscosity} onChange={(event) => setViscosity(Number(event.target.value))} />
          </label>
          <label className="block text-sm text-primary">源强：{sourceStrength.toFixed(2)}
            <input className="mt-2 w-full accent-[var(--accent)]" type="range" min={0.1} max={1} step={0.1} value={sourceStrength} onChange={(event) => setSourceStrength(Number(event.target.value))} />
          </label>
          <label className="flex min-h-11 items-center gap-2 text-sm text-primary"><input type="checkbox" checked={obstacle} onChange={(event) => setObstacle(event.target.checked)} />启用障碍物 mask</label>
          <label className="flex min-h-11 items-center gap-2 text-sm text-primary"><input type="checkbox" checked={keepGpuResident} onChange={(event) => setKeepGpuResident(event.target.checked)} />字段保持 GPU resident</label>
          <p className="rounded-control border border-border bg-surface p-3 text-sm leading-6 text-secondary" aria-live="polite">{verdict}</p>
        </div>
      </div>
    </section>
  );
}
