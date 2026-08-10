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

export function GpuGemsCh42DeformerPipelineDiagram() {
  const stages = [
    ["vertex", "p, n, t", accent],
    ["deformer f", "controls + time", warning],
    ["Jacobian", "J · t / J · b", danger],
    ["vertex output", "p′ + n′", success],
  ] as const;
  return (
    <Frame
      ariaLabel="GPU deformer 管线图：每个顶点输入位置、法线和切线，顶点程序应用带控制参数的变形函数，Jacobian 变换切线和副切线，最终输出新位置和法线。"
      caption="位置和法线共享同一变形函数，但法线不能直接套用非线性位置公式；Jacobian 是二者之间的局部线性桥梁。"
    >
      <ArrowDefs prefix="ch42-pipeline" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>
        GPU deformer：position + normal in one vertex pass
      </text>
      {stages.map(([title, detail, color], index) => {
        const x = 14 + index * 176;
        return (
          <g key={`ch42-pipeline-${title}`}>
            <Node x={x} y={94} width={148} height={112} title={title} detail={detail} color={color} />
            {index < stages.length - 1 ? <Arrow prefix="ch42-pipeline" x1={x + 148} y1={150} x2={x + 168} y2={150} /> : null}
          </g>
        );
      })}
      <rect x={48} y={258} width={624} height={62} rx={14} fill={surface} stroke={border} />
      <text x={360} y={284} textAnchor="middle" fontSize={14} fontWeight={700} fill={primary}>uniforms：amplitude / frequency / phase / space / time</text>
      <text x={360} y={306} textAnchor="middle" fontSize={12} fill={secondary}>顶点之间无共享写状态；同一输入必须得到同一输出</text>
      <path d="M 88 258 L 88 208 M 264 258 L 264 208 M 440 258 L 440 208 M 616 258 L 616 208" stroke={border} strokeWidth={2} strokeDasharray="6 5" />
    </Frame>
  );
}

export function GpuGemsCh42JacobianNormalDiagram() {
  return (
    <Frame
      ariaLabel="Jacobian 法线计算图：输入法线、切线和副切线，Jacobian 在顶点位置处变换切线和副切线，二者叉积并归一化得到变形法线。"
      caption="用 J 变换切线和副切线，再做叉积，比每个顶点额外变形三个邻近位置更直接，也避免了过小 epsilon 的数值问题。"
    >
      <ArrowDefs prefix="ch42-jacobian" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>
        J(x) · tangent/binormal → deformed normal
      </text>
      <Node x={24} y={104} width={154} height={132} title="surface frame" detail="p, n, t, b" color={accent} />
      <Arrow prefix="ch42-jacobian" x1={178} y1={170} x2={222} y2={170} />
      <rect x={226} y={78} width={178} height={184} rx={16} fill={warning} fillOpacity={0.08} stroke={warning} strokeWidth={2} />
      <text x={315} y={112} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>Jacobian J</text>
      <text x={315} y={146} textAnchor="middle" fontSize={13} fill={secondary}>∂fᵢ / ∂xⱼ</text>
      <text x={315} y={180} textAnchor="middle" fontSize={12} fill={secondary}>local linear approximation</text>
      <text x={315} y={222} textAnchor="middle" fontSize={12} fill={warning}>reuse expressions from f</text>
      <Arrow prefix="ch42-jacobian" x1={404} y1={170} x2={448} y2={170} />
      <Node x={452} y={104} width={118} height={132} title="Jt / Jb" detail="two new vectors" color={danger} />
      <Arrow prefix="ch42-jacobian" x1={570} y1={170} x2={614} y2={170} stroke={success} />
      <Node x={618} y={104} width={86} height={132} title="cross" detail="normalize n′" color={success} />
      <rect x={102} y={294} width={516} height={40} rx={11} fill={surface} stroke={border} />
      <text x={360} y={320} textAnchor="middle" fontSize={12} fill={secondary}>n′ = normalize((J · t) × (J · b))</text>
    </Frame>
  );
}

export function GpuGemsCh42WaveDeformerDiagram() {
  return (
    <Frame
      ariaLabel="径向波变形图：平面顶点按 xz 平面的径向距离计算正弦位移，振幅、频率和相位控制波形，Jacobian 随位置改变切线方向。"
      caption="wave deformer 的位置函数和导数都来自同一个径向表达式；phase 可以动画，frequency 和 amplitude 是 uniform 控制。"
    >
      <ArrowDefs prefix="ch42-wave" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>
        radial wave：f(x, y, z) → y′
      </text>
      <rect x={28} y={78} width={286} height={236} rx={16} fill={accent} fillOpacity={0.06} stroke={accent} strokeWidth={2} />
      <text x={171} y={110} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>input plane</text>
      <path d="M 62 250 C 100 222 128 264 166 236 C 202 208 232 248 292 220" fill="none" stroke={border} strokeWidth={2} />
      <circle cx={171} cy={218} r={6} fill={accent} />
      <line x1={171} y1={218} x2={230} y2={218} stroke={accent} strokeWidth={2} markerEnd="url(#ch42-wave-arrow)" />
      <text x={171} y={278} textAnchor="middle" fontSize={12} fill={secondary}>r = sqrt(x² + z²)</text>
      <Arrow prefix="ch42-wave" x1={314} y1={194} x2={360} y2={194} />
      <rect x={364} y={78} width={328} height={236} rx={16} fill={warning} fillOpacity={0.06} stroke={warning} strokeWidth={2} />
      <text x={528} y={110} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>deformed surface</text>
      <path d="M 398 238 C 430 174 464 286 500 200 C 534 132 572 260 604 176 C 634 122 660 220 678 176" fill="none" stroke={success} strokeWidth={3} />
      <text x={528} y={270} textAnchor="middle" fontSize={12} fill={secondary}>y′ = y + amplitude · sin(frequency · r + phase)</text>
      <text x={528} y={294} textAnchor="middle" fontSize={12} fill={warning}>J 也随 r 改变，不能用固定矩阵 M</text>
    </Frame>
  );
}

export function GpuGemsCh42NormalMethodsDiagram() {
  return (
    <Frame
      ariaLabel="变形法线两种方法对比图：有限差分为每个顶点额外变形两个邻近点再叉积，Jacobian 直接变换切线和副切线后叉积；后者通常更省指令且避免 epsilon 数值问题。"
      caption="有限差分容易理解但需要额外位置计算；Jacobian 需要可微函数，却能复用导数表达式并减少额外顶点工作。"
    >
      <ArrowDefs prefix="ch42-methods" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>
        normals：finite difference vs. Jacobian
      </text>
      <rect x={26} y={74} width={318} height={238} rx={16} fill={warning} fillOpacity={0.06} stroke={warning} strokeWidth={2} />
      <text x={185} y={106} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>finite difference</text>
      <circle cx={185} cy={188} r={9} fill={accent} />
      <circle cx={135} cy={218} r={7} fill={warning} /><circle cx={235} cy={218} r={7} fill={warning} />
      <line x1={185} y1={188} x2={135} y2={218} stroke={warning} strokeWidth={2} /><line x1={185} y1={188} x2={235} y2={218} stroke={warning} strokeWidth={2} />
      <path d="M 135 218 L 235 218" stroke={success} strokeWidth={3} markerEnd="url(#ch42-methods-arrow)" />
      <text x={185} y={260} textAnchor="middle" fontSize={12} fill={secondary}>deform p, p + εt, p + εb</text>
      <text x={185} y={286} textAnchor="middle" fontSize={12} fill={warning}>成本约为三组位置变形</text>
      <Arrow prefix="ch42-methods" x1={344} y1={192} x2={388} y2={192} />
      <rect x={392} y={74} width={302} height={238} rx={16} fill={success} fillOpacity={0.06} stroke={success} strokeWidth={2} />
      <text x={543} y={106} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>Jacobian</text>
      <rect x={430} y={142} width={226} height={48} rx={10} fill={surface} stroke={success} />
      <text x={543} y={172} textAnchor="middle" fontSize={13} fill={primary}>J · t , J · b → cross</text>
      <text x={543} y={224} textAnchor="middle" fontSize={12} fill={secondary}>reuse analytic derivatives</text>
      <text x={543} y={252} textAnchor="middle" fontSize={12} fill={success}>no epsilon / fewer extra points</text>
      <text x={543} y={286} textAnchor="middle" fontSize={12} fill={danger}>requires differentiable f</text>
    </Frame>
  );
}

export function GpuGemsCh42DeformerLab() {
  const [method, setMethod] = useState<"jacobian" | "finite">("jacobian");
  const [deformer, setDeformer] = useState<"wave" | "twist" | "bulge">("wave");
  const [amplitude, setAmplitude] = useState(0.45);
  const [frequency, setFrequency] = useState(2.2);
  const [phase, setPhase] = useState(0.4);
  const [vertices, setVertices] = useState(12000);
  const [smoothSurface, setSmoothSurface] = useState(true);

  const instructionCost = method === "jacobian" ? 1.05 + frequency * 0.16 : 2.8 + frequency * 0.26;
  const normalQuality = Math.min(99, Math.round(72 + (smoothSurface ? 10 : -7) + amplitude * 12 - (method === "finite" ? 2 : 0)));
  const frameCost = (vertices / 10000) * instructionCost;
  const determinantRisk = amplitude > 0.78 && deformer !== "wave";
  const verdict = determinantRisk
    ? "警告：强变形可能让 Jacobian 接近奇异，法线会变得不可靠；先检查 det(J) 和局部折叠。"
    : !smoothSurface
      ? "限制：折面不满足平滑曲面假设，Jacobian 法线未必等于 CPU 重新计算的 faceted normal。"
      : method === "finite"
        ? "近似路径：实现简单，但每个顶点要额外变形邻近点；调小 epsilon 会遇到数值精度问题。"
        : "推荐路径：可微 deformer 用 Jacobian 直接变换切线和副切线，成本更接近一次顶点变形。";

  const reset = () => {
    setMethod("jacobian");
    setDeformer("wave");
    setAmplitude(0.45);
    setFrequency(2.2);
    setPhase(0.4);
    setVertices(12000);
    setSmoothSurface(true);
  };

  return (
    <section
      data-visual-kind="gpu-gems-ch42-deformers"
      className="not-prose my-6 rounded-card border border-border bg-elevated p-5"
      aria-label="GPU deformer 交互实验：切换 wave、twist、bulge 和 Jacobian 或有限差分法线，调整振幅、频率、相位、顶点数量与平滑曲面假设"
    >
      <div className="mb-4">
        <p className="mb-1 text-xs uppercase tracking-[0.18em] text-secondary">deformer lab</p>
        <h3 className="m-0 text-lg font-semibold text-primary">让位置函数和法线函数一起变形</h3>
        <p className="mt-2 text-sm leading-6 text-secondary">这是一个可解释的示意模型：观察 wave、twist、bulge 的控制参数，以及 Jacobian 与有限差分在法线质量、指令成本和奇异风险上的差异。数字用于工程直觉，不替代真实 mesh 与 GPU profiler。</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-control border border-border bg-surface p-3">
          <svg viewBox="0 0 440 356" role="img" aria-label={`当前 ${deformer} deformer，${method === "jacobian" ? "Jacobian" : "有限差分"} 法线，振幅 ${amplitude.toFixed(2)}，频率 ${frequency.toFixed(1)}，${vertices} 个顶点，法线质量 ${normalQuality}，估算成本 ${frameCost.toFixed(1)}`} className="h-auto w-full">
            <defs>
              <marker id="ch42-lab-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill={accent} /></marker>
            </defs>
            <text x={220} y={22} textAnchor="middle" fontSize={16} fontWeight={700} fill={primary}>vertex → {deformer} → {method}</text>
            <rect x={18} y={52} width={116} height={58} rx={11} fill={accent} fillOpacity={0.1} stroke={accent} />
            <text x={76} y={76} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>vertex</text>
            <text x={76} y={96} textAnchor="middle" fontSize={11} fill={secondary}>{vertices} verts</text>
            <line x1={134} y1={81} x2={162} y2={81} stroke={accent} strokeWidth={3} markerEnd="url(#ch42-lab-arrow)" />
            <rect x={166} y={52} width={112} height={58} rx={11} fill={warning} fillOpacity={0.1} stroke={warning} />
            <text x={222} y={76} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>{deformer}</text>
            <text x={222} y={96} textAnchor="middle" fontSize={11} fill={secondary}>f(p, controls)</text>
            <line x1={278} y1={81} x2={306} y2={81} stroke={success} strokeWidth={3} markerEnd="url(#ch42-lab-arrow)" />
            <rect x={310} y={52} width={112} height={58} rx={11} fill={success} fillOpacity={0.1} stroke={success} />
            <text x={366} y={76} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>{method}</text>
            <text x={366} y={96} textAnchor="middle" fontSize={11} fill={secondary}>normal n′</text>
            <rect x={32} y={138} width={376} height={116} rx={15} fill={surface} stroke={border} />
            <text x={220} y={164} textAnchor="middle" fontSize={14} fontWeight={700} fill={primary}>deformed surface preview</text>
            <path d={deformer === "wave" ? "M 64 224 C 98 180 130 252 164 204 C 198 158 232 238 266 194 C 300 154 334 228 376 182" : deformer === "twist" ? "M 84 226 C 126 208 154 178 198 196 C 242 214 276 184 356 174" : "M 64 218 C 112 218 132 160 220 178 C 306 196 330 218 376 218"} fill="none" stroke={success} strokeWidth={3} />
            {[0, 1, 2, 3, 4, 5].map((index) => <line key={`ch42-lab-normal-${index}`} x1={92 + index * 49} y1={208 - (index % 2) * 16} x2={92 + index * 49 + (method === "jacobian" ? 8 : 14)} y2={178 - (index % 2) * 16} stroke={method === "jacobian" ? accent : warning} strokeWidth={2} markerEnd="url(#ch42-lab-arrow)" />)}
            <text x={220} y={244} textAnchor="middle" fontSize={11} fill={secondary}>{smoothSurface ? "smooth-surface assumption" : "faceted mesh"} · phase {phase.toFixed(2)}</text>
            <text x={220} y={286} textAnchor="middle" fontSize={14} fontWeight={700} fill={primary}>normal quality {normalQuality}% · amplitude {amplitude.toFixed(2)}</text>
            <text x={220} y={314} textAnchor="middle" fontSize={12} fill={secondary}>frequency {frequency.toFixed(1)} · instruction cost {frameCost.toFixed(1)}</text>
          </svg>
        </div>
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <button type="button" className="min-h-11 rounded-control border border-border bg-surface px-3 py-2 text-left text-sm text-primary transition hover:border-accent" onClick={() => setMethod((value) => value === "jacobian" ? "finite" : "jacobian")}>
              切换法线方法：{method === "jacobian" ? "Jacobian" : "有限差分"}
              <span className="mt-1 block text-xs text-secondary">比较成本与稳定性</span>
            </button>
            <button type="button" className="min-h-11 rounded-control border border-border bg-surface px-3 py-2 text-left text-sm text-primary transition hover:border-accent" onClick={reset}>重置实验</button>
          </div>
          <label className="block text-sm text-primary">deformer
            <select className="mt-2 min-h-11 w-full rounded-control border border-border bg-surface px-3 text-primary" value={deformer} onChange={(event) => setDeformer(event.target.value as "wave" | "twist" | "bulge")}>
              <option value="wave">radial wave</option>
              <option value="twist">twist</option>
              <option value="bulge">bulge</option>
            </select>
          </label>
          <label className="block text-sm text-primary">amplitude：{amplitude.toFixed(2)}
            <input className="mt-2 w-full accent-[var(--accent)]" type="range" min={0.1} max={1} step={0.05} value={amplitude} onChange={(event) => setAmplitude(Number(event.target.value))} />
          </label>
          <label className="block text-sm text-primary">frequency：{frequency.toFixed(1)}
            <input className="mt-2 w-full accent-[var(--accent)]" type="range" min={0.5} max={5} step={0.1} value={frequency} onChange={(event) => setFrequency(Number(event.target.value))} />
          </label>
          <label className="block text-sm text-primary">phase：{phase.toFixed(2)}
            <input className="mt-2 w-full accent-[var(--accent)]" type="range" min={0} max={6.28} step={0.1} value={phase} onChange={(event) => setPhase(Number(event.target.value))} />
          </label>
          <label className="block text-sm text-primary">顶点数：{vertices.toLocaleString()}
            <input className="mt-2 w-full accent-[var(--accent)]" type="range" min={2000} max={24000} step={2000} value={vertices} onChange={(event) => setVertices(Number(event.target.value))} />
          </label>
          <label className="flex min-h-11 items-center gap-2 text-sm text-primary"><input type="checkbox" checked={smoothSurface} onChange={(event) => setSmoothSurface(event.target.checked)} />满足平滑曲面假设</label>
          <p className="rounded-control border border-border bg-surface p-3 text-sm leading-6 text-secondary" aria-live="polite">{verdict}</p>
        </div>
      </div>
    </section>
  );
}
