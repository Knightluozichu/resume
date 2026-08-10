"use client";

import { useState, type ReactNode } from "react";

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

function rounded(value: number) {
  return Number(value.toFixed(3));
}

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
          viewBox="0 0 720 420"
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
  stroke = accent,
}: {
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
      strokeWidth="3"
      markerEnd="url(#waving-grass-arrow)"
    />
  );
}

function ArrowDefs() {
  return (
    <defs>
      <marker
        id="waving-grass-arrow"
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

function Blade({
  x,
  baseY,
  height,
  lean,
  fill = success,
  opacity = 0.78,
}: {
  x: number;
  baseY: number;
  height: number;
  lean: number;
  fill?: string;
  opacity?: number;
}) {
  const topX = rounded(x + lean);
  const midX = rounded(x + lean * 0.38);
  const midY = rounded(baseY - height * 0.48);
  const tipY = rounded(baseY - height);
  return (
    <path
      d={`M ${rounded(x - 7)} ${baseY} Q ${midX - 7} ${midY} ${topX} ${tipY} Q ${midX + 4} ${midY} ${rounded(x + 7)} ${baseY} Z`}
      fill={fill}
      fillOpacity={rounded(opacity)}
      stroke={fill}
      strokeWidth="2"
    />
  );
}

export function GpuGemsCh07GrassObjectDiagram() {
  return (
    <Frame
      ariaLabel="草地对象结构图：左侧是透明 alpha 通道中的多根草叶纹理，右侧是三张互相穿插的四边形，从不同视线组成星形草丛。"
      caption="先把许多草叶打包进一张透明纹理，再用三张相交四边形消除单张平面的方向感。"
    >
      <ArrowDefs />
      <text x="360" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>
        少量多边形，覆盖一整片草地
      </text>
      <rect x="34" y="78" width="250" height="256" rx="18" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="2" />
      <text x="159" y="112" textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>grass texture</text>
      <rect x="68" y="136" width="182" height="144" rx="10" fill="var(--surface)" stroke={border} strokeDasharray="7 6" />
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <Blade
          key={index}
          x={92 + (index % 3) * 54}
          baseY={250 - Math.floor(index / 3) * 12}
          height={62 + (index % 2) * 22}
          lean={(index % 3 - 1) * 14}
          fill={index % 2 === 0 ? success : warning}
        />
      ))}
      <text x="159" y="310" textAnchor="middle" fontSize="13" fill={secondary}>颜色 + alpha，减少透明空白</text>
      <Arrow x1={300} y1={206} x2={350} y2={206} />
      <rect x="370" y="78" width="316" height="256" rx="18" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="2" />
      <text x="528" y="112" textAnchor="middle" fontSize="15" fontWeight="700" fill={success}>grass object</text>
      <g transform="translate(528 214)">
        <rect x="-9" y="-78" width="18" height="156" rx="8" fill={accent} fillOpacity="0.25" stroke={accent} strokeWidth="2" transform="rotate(0)" />
        <rect x="-9" y="-78" width="18" height="156" rx="8" fill={warning} fillOpacity="0.25" stroke={warning} strokeWidth="2" transform="rotate(60)" />
        <rect x="-9" y="-78" width="18" height="156" rx="8" fill={success} fillOpacity="0.25" stroke={success} strokeWidth="2" transform="rotate(120)" />
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <Blade key={index} x={-50 + index * 20} baseY={60} height={72 + (index % 2) * 18} lean={(index % 3 - 1) * 12} fill={index % 2 === 0 ? success : warning} />
        ))}
        <circle cx="0" cy="0" r="8" fill={danger} />
      </g>
      <text x="528" y="310" textAnchor="middle" fontSize="13" fill={secondary}>三张相交 quad · 两面可见</text>
      <rect x="154" y="354" width="412" height="40" rx="12" fill={warning} fillOpacity="0.1" stroke={warning} />
      <text x="360" y="380" textAnchor="middle" fontSize="14" fill={primary}>关闭 back-face culling，坡地上也保持可见与受光</text>
    </Frame>
  );
}

export function GpuGemsCh07AnimationStrategyDiagram() {
  return (
    <Frame
      ariaLabel="三种草地动画策略对比：按簇动画需要较多 draw call，按顶点动画 draw call 少但可能产生纹理拉伸，按草地对象动画在局部变化与几何稳定之间折中。"
      caption="原书的黄金折中是按 grass object 动画：少量 draw call、局部混沌，而且不拉伸单个草丛。"
    >
      <ArrowDefs />
      <text x="360" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>
        风动画：CPU 成本、局部变化与形变的三方取舍
      </text>
      {[{ x: 34, title: "按簇", color: warning, detail: "CPU 算平移向量", note: "draw call 多" }, { x: 258, title: "按顶点", color: danger, detail: "shader 按位置计算", note: "可能拉伸" }, { x: 482, title: "按对象", color: success, detail: "用对象中心计算", note: "局部混沌 + 稳定" }].map((panel) => (
        <g key={panel.title}>
          <rect x={panel.x} y="78" width="204" height="250" rx="18" fill={panel.color} fillOpacity="0.07" stroke={panel.color} strokeWidth="2" />
          <text x={panel.x + 102} y="112" textAnchor="middle" fontSize="15" fontWeight="700" fill={panel.color}>{panel.title}动画</text>
          {[0, 1, 2, 3, 4].map((index) => {
            const sharedLean = panel.title === "按簇" ? 22 : panel.title === "按顶点" ? 8 + index * 7 : 9 + (index % 3) * 13;
            return <Blade key={index} x={panel.x + 40 + index * 30} baseY={248} height={80 + (index % 2) * 20} lean={sharedLean} fill={panel.color} />;
          })}
          <Arrow x1={panel.x + 102} y1={178} x2={panel.x + 102 + (panel.title === "按顶点" ? 42 : 22)} y2={150} stroke={panel.color} />
          <text x={panel.x + 102} y="278" textAnchor="middle" fontSize="13" fill={secondary}>{panel.detail}</text>
          <text x={panel.x + 102} y="302" textAnchor="middle" fontSize="13" fontWeight="700" fill={panel.color}>{panel.note}</text>
        </g>
      ))}
      <rect x="156" y="354" width="408" height="40" rx="12" fill={success} fillOpacity="0.1" stroke={success} />
      <text x="360" y="380" textAnchor="middle" fontSize="14" fill={primary}>对象中心进入 vertex format：每个草丛有自己的风相位</text>
    </Frame>
  );
}

export function GpuGemsCh07VertexWindDiagram() {
  return (
    <Frame
      ariaLabel="顶点着色器风动画图：草叶底部保持不动，只有纹理坐标 v 接近顶部的顶点接收基于时间、风向和位置的正弦平移。"
      caption="用纹理坐标识别顶部顶点：根部稳住，叶尖受风；对象中心决定局部相位。"
    >
      <ArrowDefs />
      <text x="360" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>
        vertex shader 只让叶尖随风
      </text>
      <rect x="42" y="78" width="250" height="256" rx="18" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="2" />
      <text x="167" y="112" textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>输入属性</text>
      <text x="72" y="154" fontSize="14" fill={primary}>TexCoords.y = 0.0</text>
      <text x="72" y="190" fontSize="14" fill={primary}>vObjectPosition</text>
      <text x="72" y="226" fontSize="14" fill={primary}>time · windDirection</text>
      <text x="72" y="262" fontSize="14" fill={primary}>windStrength</text>
      <rect x="72" y="286" width="190" height="28" rx="8" fill={warning} fillOpacity="0.13" stroke={warning} />
      <text x="167" y="306" textAnchor="middle" fontSize="13" fill={warning}>CalcTranslation()</text>
      <Arrow x1={308} y1={206} x2={360} y2={206} />
      <rect x="378" y="78" width="300" height="256" rx="18" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="2" />
      <text x="528" y="112" textAnchor="middle" fontSize="15" fontWeight="700" fill={success}>输出草叶</text>
      <line x1="452" y1="282" x2="604" y2="282" stroke={border} strokeWidth="3" />
      <Blade x={530} baseY={282} height={132} lean={46} fill={success} />
      <circle cx="530" cy="282" r="8" fill={warning} />
      <text x="450" y="304" fontSize="13" fill={secondary}>根部固定</text>
      <text x="560" y="158" fontSize="13" fill={success}>v 接近 1：移动</text>
      <Arrow x1={596} y1={174} x2={572} y2={214} stroke={success} />
      <text x="528" y="330" textAnchor="middle" fontSize="13" fill={secondary}>sin(position + time) × 风强度</text>
    </Frame>
  );
}

export function GpuGemsCh07WavingGrassLab() {
  const [windStrength, setWindStrength] = useState(0.55);
  const [windDirection, setWindDirection] = useState(0.35);
  const [time, setTime] = useState(0.35);
  const [density, setDensity] = useState(0.7);
  const [strategy, setStrategy] = useState<"cluster" | "vertex" | "object">("object");
  const [errorMode, setErrorMode] = useState(false);

  const bladeCount = 5 + Math.round(density * 4);
  const blades = Array.from({ length: bladeCount }, (_, index) => {
    const phase = errorMode ? 0 : strategy === "cluster" ? Math.floor(index / 3) * 0.4 : strategy === "vertex" ? index * 1.2 : index * 0.74;
    const lean = rounded(Math.sin(time * 6 + phase + windDirection * 2) * (18 + windStrength * 42));
    return {
      x: rounded(42 + index * (410 / Math.max(1, bladeCount - 1))),
      lean,
      height: 76 + (index % 3) * 18,
    };
  });

  const reset = () => {
    setWindStrength(0.55);
    setWindDirection(0.35);
    setTime(0.35);
    setDensity(0.7);
    setStrategy("object");
    setErrorMode(false);
  };

  return (
    <section
      data-visual-kind="gpu-gems-ch07-waving-grass"
      className="not-prose my-6 rounded-card border border-border bg-elevated p-5"
      aria-label="摆动草地实验：调整风强度、风向、时间、草密度，切换三种动画策略并注入同步簇误区"
    >
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">Waving Grass Lab</p>
          <h4 className="mt-1 text-[15px] font-semibold text-primary">观察：同样的风，局部相位会不会改变“自然感”？</h4>
        </div>
        <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
      </div>
      <div className="grid gap-5 md:grid-cols-[1fr_240px] md:items-center">
        <svg
          viewBox="0 0 510 330"
          role="img"
          aria-label={`摆动草地预览：风强度${windStrength.toFixed(2)}，风向${windDirection.toFixed(2)}，时间${time.toFixed(2)}，密度${density.toFixed(2)}，策略${strategy}，${errorMode ? "同步簇误区" : "局部相位"}。`}
          className="w-full"
        >
          <rect x="12" y="18" width="486" height="294" rx="18" fill="var(--surface)" stroke={border} />
          <text x="28" y="44" fontSize="14" fontWeight="700" fill={primary}>草地视口</text>
          <text x="390" y="44" textAnchor="middle" fontSize="13" fill={errorMode ? danger : success}>{errorMode ? "错误：所有草簇同相" : `${strategy}：局部变化`}</text>
          <line x1="32" y1="252" x2="478" y2="252" stroke={border} strokeWidth="3" />
          {blades.map((blade, index) => (
            <g key={index}>
              <Blade x={blade.x} baseY={252} height={blade.height} lean={blade.lean} fill={index % 2 === 0 ? success : warning} opacity={0.62 + (index % 3) * 0.08} />
              <circle cx={blade.x} cy="252" r="3" fill={accent} />
            </g>
          ))}
          <Arrow x1={84} y1={86} x2={142 + windDirection * 42} y2={86 - windStrength * 18} stroke={accent} />
          <text x="38" y="108" fontSize="13" fill={secondary}>wind vector</text>
          <text x="28" y="294" fontSize="12" fill={secondary}>底部固定；叶尖按策略共享或独享风相位</text>
        </svg>
        <div className="space-y-3">
          <label className="block text-sm text-primary" htmlFor="grass-wind-strength">风强度：{windStrength.toFixed(2)}</label>
          <input id="grass-wind-strength" className="min-h-11 w-full accent-accent" type="range" min="0" max="1" step="0.05" value={windStrength} onChange={(event) => setWindStrength(Number(event.target.value))} aria-label="调整草地风强度" />
          <label className="block text-sm text-primary" htmlFor="grass-wind-direction">风向：{windDirection.toFixed(2)}</label>
          <input id="grass-wind-direction" className="min-h-11 w-full accent-accent" type="range" min="-1" max="1" step="0.05" value={windDirection} onChange={(event) => setWindDirection(Number(event.target.value))} aria-label="调整草地风向" />
          <label className="block text-sm text-primary" htmlFor="grass-time">时间：{time.toFixed(2)}</label>
          <input id="grass-time" className="min-h-11 w-full accent-accent" type="range" min="0" max="1" step="0.05" value={time} onChange={(event) => setTime(Number(event.target.value))} aria-label="调整草地动画时间" />
          <label className="block text-sm text-primary" htmlFor="grass-density">草密度：{density.toFixed(2)}</label>
          <input id="grass-density" className="min-h-11 w-full accent-accent" type="range" min="0" max="1" step="0.1" value={density} onChange={(event) => setDensity(Number(event.target.value))} aria-label="调整草地密度" />
          <div className="grid grid-cols-3 gap-2">
            {(["cluster", "vertex", "object"] as const).map((value) => (
              <button key={value} type="button" aria-pressed={strategy === value} onClick={() => setStrategy(value)} className={`min-h-11 rounded-control border px-2 py-2 text-xs ${strategy === value ? "border-success text-primary" : "border-border text-secondary"}`}>{value}</button>
            ))}
          </div>
          <button type="button" aria-pressed={errorMode} onClick={() => setErrorMode((value) => !value)} className={`min-h-11 w-full rounded-control border px-3 py-2 text-sm ${errorMode ? "border-danger text-primary" : "border-border text-secondary"}`}>{errorMode ? "关闭同步簇误区" : "注入同步簇误区"}</button>
          <button type="button" aria-label="重置摆动草地实验" onClick={reset} className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-accent hover:text-primary">重置实验</button>
          <p className="text-xs text-secondary" role="status">提示：按对象策略把对象中心写进顶点属性，换来少量 draw call 与局部变化。</p>
        </div>
      </div>
    </section>
  );
}
