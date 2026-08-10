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

export function GpuGemsCh41StereogramPipelineDiagram() {
  const stages = [
    ["depth map", "grayscale geometry", accent],
    ["tile pattern", "repeated texture", warning],
    ["strip pass", "depth displacement", danger],
    ["SIS / SIRDS", "hidden 3D", success],
  ] as const;
  return (
    <Frame
      ariaLabel="单图立体图生成流程：深度图和 tile pattern 输入，按垂直 strip 逐条用深度水平位移，再得到可用裸眼融合观看的单图立体图。"
      caption="SIS 不是把左右两张图并排放置，而是让相邻垂直条带携带可重复匹配的视差。"
    >
      <ArrowDefs prefix="ch41-pipeline" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>
        real-time stereogram：depth → displacement → 3D perception
      </text>
      {stages.map(([title, detail, color], index) => {
        const x = 14 + index * 176;
        return (
          <g key={`ch41-pipeline-${title}`}>
            <Node x={x} y={94} width={148} height={112} title={title} detail={detail} color={color} />
            {index < stages.length - 1 ? <Arrow prefix="ch41-pipeline" x1={x + 148} y1={150} x2={x + 168} y2={150} /> : null}
          </g>
        );
      })}
      <rect x={48} y={258} width={624} height={62} rx={14} fill={surface} stroke={border} />
      <text x={360} y={284} textAnchor="middle" fontSize={14} fontWeight={700} fill={primary}>控制旋钮：strip 数、depth factor、invert depth、filtering</text>
      <text x={360} y={306} textAnchor="middle" fontSize={12} fill={secondary}>相同算法可消费静态 depth map，也可消费实时场景的 z-buffer</text>
      <path d="M 88 258 L 88 208 M 264 258 L 264 208 M 440 258 L 440 208 M 616 258 L 616 208" stroke={border} strokeWidth={2} strokeDasharray="6 5" />
    </Frame>
  );
}

export function GpuGemsCh41DepthDisparityDiagram() {
  return (
    <Frame
      ariaLabel="深度与视差关系图：深度值接近零时水平位移小，深度值变大时位移按 depth factor 增加；反转深度会改变前后凸出方向。"
      caption="depth factor 控制视觉深度，不改变原始几何；过大的位移会制造断裂、空洞和难以融合的条带。"
    >
      <ArrowDefs prefix="ch41-depth" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>
        depth value → horizontal disparity
      </text>
      <rect x={28} y={74} width={300} height={238} rx={16} fill={accent} fillOpacity={0.06} stroke={accent} strokeWidth={2} />
      <text x={178} y={106} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>depth map</text>
      <rect x={62} y={132} width={232} height={118} fill={surface} stroke={border} strokeWidth={2} />
      {[0, 1, 2, 3, 4].map((row) => [0, 1, 2, 3, 4].map((col) => {
        const value = (row + col) / 8;
        return <rect key={`ch41-depth-cell-${row}-${col}`} x={72 + col * 43} y={142 + row * 20} width={40} height={18} fill={value > 0.5 ? warning : accent} fillOpacity={0.15 + value * 0.6} />;
      }))}
      <text x={178} y={278} textAnchor="middle" fontSize={12} fill={secondary}>0 = near reference · 1 = full depth</text>
      <Arrow prefix="ch41-depth" x1={328} y1={193} x2={376} y2={193} />
      <rect x={380} y={74} width={312} height={238} rx={16} fill={success} fillOpacity={0.06} stroke={success} strokeWidth={2} />
      <text x={536} y={106} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>displacement</text>
      <line x1={430} y1={154} x2={650} y2={154} stroke={border} strokeWidth={2} />
      <line x1={430} y1={215} x2={650} y2={215} stroke={border} strokeWidth={2} />
      <circle cx={472} cy={154} r={8} fill={accent} /><circle cx={580} cy={215} r={8} fill={warning} />
      <path d="M 472 154 L 512 154" stroke={accent} strokeWidth={3} markerEnd="url(#ch41-depth-arrow)" />
      <path d="M 580 215 L 650 215" stroke={warning} strokeWidth={3} markerEnd="url(#ch41-depth-arrow)" />
      <text x={536} y={140} textAnchor="middle" fontSize={12} fill={secondary}>浅：小位移</text>
      <text x={536} y={246} textAnchor="middle" fontSize={12} fill={secondary}>深：depth factor × 位移</text>
      <text x={536} y={282} textAnchor="middle" fontSize={12} fill={danger}>invert：交换前后深度方向</text>
    </Frame>
  );
}

export function GpuGemsCh41StripPropagationDiagram() {
  return (
    <Frame
      ariaLabel="垂直条带传播图：先绘制并保存第零条带，之后每个条带读取上一条 result map，根据当前条带的深度水平偏移采样，再写回下一条。"
      caption="每个新条带都依赖上一条已经完成的结果，因此用 ping-pong 或 copy-to-texture 明确传播边界。"
    >
      <ArrowDefs prefix="ch41-strip" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>
        strip propagation：reference → displace → write
      </text>
      <rect x={26} y={80} width={148} height={222} rx={16} fill={accent} fillOpacity={0.07} stroke={accent} strokeWidth={2} />
      <text x={100} y={112} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>strip 0</text>
      <rect x={60} y={140} width={80} height={112} fill={surface} stroke={accent} strokeWidth={2} />
      {[0, 1, 2, 3, 4].map((row) => <rect key={`ch41-strip0-${row}`} x={70} y={148 + row * 20} width={60} height={15} fill={accent} fillOpacity={0.16 + row * 0.12} />)}
      <text x={100} y={278} textAnchor="middle" fontSize={12} fill={secondary}>tile pattern seed</text>
      <Arrow prefix="ch41-strip" x1={174} y1={191} x2={216} y2={191} />
      <rect x={220} y={80} width={280} height={222} rx={16} fill={warning} fillOpacity={0.07} stroke={warning} strokeWidth={2} />
      <text x={360} y={112} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>fragment pass i</text>
      <text x={360} y={146} textAnchor="middle" fontSize={12} fill={secondary}>depth[i] × depthFactor × stripWidth</text>
      <path d="M 262 184 L 340 184" stroke={warning} strokeWidth={3} markerEnd="url(#ch41-strip-arrow)" />
      <text x={360} y={214} textAnchor="middle" fontSize={12} fill={secondary}>从 previous result map 取样</text>
      <text x={360} y={246} textAnchor="middle" fontSize={12} fill={warning}>uv.x = current − width + displacement</text>
      <text x={360} y={278} textAnchor="middle" fontSize={12} fill={secondary}>写入下一条 result strip</text>
      <Arrow prefix="ch41-strip" x1={500} y1={191} x2={542} y2={191} stroke={success} />
      <rect x={546} y={80} width={148} height={222} rx={16} fill={success} fillOpacity={0.07} stroke={success} strokeWidth={2} />
      <text x={620} y={112} textAnchor="middle" fontSize={15} fontWeight={700} fill={primary}>strip i+1</text>
      <rect x={580} y={140} width={80} height={112} fill={surface} stroke={success} strokeWidth={2} />
      {[0, 1, 2, 3, 4].map((row) => <rect key={`ch41-strip1-${row}`} x={590 + (row % 2) * 8} y={148 + row * 20} width={60} height={15} fill={success} fillOpacity={0.2 + row * 0.1} />)}
      <text x={620} y={278} textAnchor="middle" fontSize={12} fill={secondary}>继续传播</text>
    </Frame>
  );
}

export function GpuGemsCh41AnimatedStereogramDiagram() {
  return (
    <Frame
      ariaLabel="动态单图立体图流程：先渲染普通三维场景，读取 z-buffer 作为深度图，再让 fragment pass 生成 stereogram，场景或相机变化时逐帧更新。"
      caption="动画版本只替换深度来源：同一条 strip 算法可以消费静态深度图，也可以消费每帧生成的 z-buffer。"
    >
      <ArrowDefs prefix="ch41-animated" />
      <text x={360} y={28} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>
        animated SIS：3D scene → z-buffer → stereogram
      </text>
      <Node x={22} y={100} width={154} height={140} title="3D scene" detail="mesh + camera" color={accent} />
      <Arrow prefix="ch41-animated" x1={176} y1={170} x2={218} y2={170} />
      <Node x={222} y={100} width={154} height={140} title="z-buffer" detail="depth map / frame" color={warning} />
      <Arrow prefix="ch41-animated" x1={376} y1={170} x2={418} y2={170} />
      <Node x={422} y={100} width={154} height={140} title="fragment" detail="strip displacement" color={danger} />
      <Arrow prefix="ch41-animated" x1={576} y1={170} x2={618} y2={170} stroke={success} />
      <Node x={622} y={100} width={82} height={140} title="ASIS" detail="update" color={success} />
      <path d="M 662 248 C 662 292 110 292 110 248" fill="none" stroke={accent} strokeWidth={2} markerEnd="url(#ch41-animated-arrow)" />
      <text x={360} y={284} textAnchor="middle" fontSize={12} fill={secondary}>相机 / mesh 改变 → 新深度 → 下一帧重新传播</text>
      <rect x={96} y={326} width={528} height={32} rx={10} fill={surface} stroke={border} />
      <text x={360} y={347} textAnchor="middle" fontSize={12} fill={secondary}>先用静态图找到 eye-crossing 距离，再开启动画避免视觉跟丢</text>
    </Frame>
  );
}

export function GpuGemsCh41StereogramLab() {
  const [strips, setStrips] = useState(16);
  const [depthFactor, setDepthFactor] = useState(0.62);
  const [invertDepth, setInvertDepth] = useState(false);
  const [filtering, setFiltering] = useState(true);
  const [animated, setAnimated] = useState(false);
  const [tileMode, setTileMode] = useState<"dots" | "color">("dots");

  const displacement = strips * depthFactor * (invertDepth ? -1 : 1);
  const continuity = Math.min(99, Math.round(66 + strips * 0.9 + (filtering ? 9 : -9) - Math.max(0, depthFactor - 0.72) * 40));
  const cost = strips * (animated ? 1.25 : 1) * (filtering ? 1.1 : 0.92);
  const verdict = !filtering
    ? "注意：关闭 filtering 会让深度值出现台阶，条带边界和断层更明显。"
    : depthFactor > 0.78
      ? "深度较强：立体感更明显，但可能超过舒适融合范围并产生空洞或匹配错误。"
      : animated
        ? "动画模式：每帧从 z-buffer 更新深度；先固定眼睛融合距离，再观察相机运动。"
        : "静态预览：适合先找到正确的交叉观看距离，再调高条带数或开启动画。";

  const reset = () => {
    setStrips(16);
    setDepthFactor(0.62);
    setInvertDepth(false);
    setFiltering(true);
    setAnimated(false);
    setTileMode("dots");
  };

  return (
    <section
      data-visual-kind="gpu-gems-ch41-real-time-stereograms"
      className="not-prose my-6 rounded-card border border-border bg-elevated p-5"
      aria-label="实时立体图交互实验：调整垂直条带数、深度因子、深度反转、过滤、动画深度和 tile pattern"
    >
      <div className="mb-4">
        <p className="mb-1 text-xs uppercase tracking-[0.18em] text-secondary">stereogram lab</p>
        <h3 className="m-0 text-lg font-semibold text-primary">把深度预算变成可观看的视差</h3>
        <p className="mt-2 text-sm leading-6 text-secondary">这是一个可解释的示意模型：调节条带数、depth factor、filtering 和动态深度，观察 strip propagation 的连续性、生成成本和观看舒适度。它不替代真正的 Magic Eye 图像或医疗/视觉评估。</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-control border border-border bg-surface p-3">
          <svg viewBox="0 0 440 356" role="img" aria-label={`当前 ${strips} 条带，depth factor ${depthFactor.toFixed(2)}，${invertDepth ? "反转深度" : "正常深度"}，${animated ? "动态 z-buffer" : "静态深度图"}，连续性 ${continuity}，估算成本 ${cost.toFixed(0)}`} className="h-auto w-full">
            <defs>
              <marker id="ch41-lab-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill={accent} /></marker>
            </defs>
            <text x={220} y={22} textAnchor="middle" fontSize={16} fontWeight={700} fill={primary}>{animated ? "z-buffer" : "depth map"} → strips → SIS</text>
            <rect x={18} y={52} width={116} height={58} rx={11} fill={accent} fillOpacity={0.1} stroke={accent} />
            <text x={76} y={76} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>{animated ? "z-buffer" : "depth"}</text>
            <text x={76} y={96} textAnchor="middle" fontSize={11} fill={secondary}>{invertDepth ? "inverted" : "normal"}</text>
            <line x1={134} y1={81} x2={162} y2={81} stroke={accent} strokeWidth={3} markerEnd="url(#ch41-lab-arrow)" />
            <rect x={166} y={52} width={112} height={58} rx={11} fill={warning} fillOpacity={0.1} stroke={warning} />
            <text x={222} y={76} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>propagate</text>
            <text x={222} y={96} textAnchor="middle" fontSize={11} fill={secondary}>{strips} strips</text>
            <line x1={278} y1={81} x2={306} y2={81} stroke={success} strokeWidth={3} markerEnd="url(#ch41-lab-arrow)" />
            <rect x={310} y={52} width={112} height={58} rx={11} fill={success} fillOpacity={0.1} stroke={success} />
            <text x={366} y={76} textAnchor="middle" fontSize={13} fontWeight={700} fill={primary}>stereogram</text>
            <text x={366} y={96} textAnchor="middle" fontSize={11} fill={secondary}>{tileMode === "dots" ? "random dots" : "color tile"}</text>
            <rect x={32} y={138} width={376} height={116} rx={15} fill={surface} stroke={border} />
            <text x={220} y={164} textAnchor="middle" fontSize={14} fontWeight={700} fill={primary}>strip preview</text>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((strip) => {
              const x = 65 + strip * 26;
              const offset = Math.round((strip % 4) * depthFactor * 6 * (invertDepth ? -1 : 1));
              return <rect key={`ch41-lab-strip-${strip}`} x={x + offset} y={184 + (strip % 2) * 18} width={17} height={42} rx={4} fill={strip % 3 === 0 ? success : tileMode === "dots" ? accent : warning} fillOpacity={filtering ? 0.42 : 0.72} stroke={strip % 3 === 0 ? success : accent} />;
            })}
            <path d="M 62 176 L 375 176" stroke={warning} strokeWidth={2} markerEnd="url(#ch41-lab-arrow)" />
            <text x={220} y={244} textAnchor="middle" fontSize={11} fill={secondary}>{filtering ? "filtered depth · smoother strip matching" : "nearest depth · visible depth stairs"}</text>
            <text x={220} y={286} textAnchor="middle" fontSize={14} fontWeight={700} fill={primary}>continuity {continuity}% · factor {depthFactor.toFixed(2)}</text>
            <text x={220} y={314} textAnchor="middle" fontSize={12} fill={secondary}>displacement {displacement.toFixed(1)} · cost {cost.toFixed(0)}</text>
          </svg>
        </div>
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <button type="button" className="min-h-11 rounded-control border border-border bg-surface px-3 py-2 text-left text-sm text-primary transition hover:border-accent" onClick={() => setInvertDepth((value) => !value)}>
              {invertDepth ? "恢复正常深度" : "反转深度"}
              <span className="mt-1 block text-xs text-secondary">观察前后凸出方向</span>
            </button>
            <button type="button" className="min-h-11 rounded-control border border-border bg-surface px-3 py-2 text-left text-sm text-primary transition hover:border-accent" onClick={reset}>重置实验</button>
          </div>
          <label className="block text-sm text-primary">条带数：{strips}
            <input className="mt-2 w-full accent-[var(--accent)]" type="range" min={8} max={24} step={2} value={strips} onChange={(event) => setStrips(Number(event.target.value))} />
          </label>
          <label className="block text-sm text-primary">depth factor：{depthFactor.toFixed(2)}
            <input className="mt-2 w-full accent-[var(--accent)]" type="range" min={0.1} max={1} step={0.05} value={depthFactor} onChange={(event) => setDepthFactor(Number(event.target.value))} />
          </label>
          <label className="block text-sm text-primary">tile pattern
            <select className="mt-2 min-h-11 w-full rounded-control border border-border bg-surface px-3 text-primary" value={tileMode} onChange={(event) => setTileMode(event.target.value as "dots" | "color")}>
              <option value="dots">random dots</option>
              <option value="color">color tile</option>
            </select>
          </label>
          <label className="flex min-h-11 items-center gap-2 text-sm text-primary"><input type="checkbox" checked={filtering} onChange={(event) => setFiltering(event.target.checked)} />启用深度 filtering</label>
          <label className="flex min-h-11 items-center gap-2 text-sm text-primary"><input type="checkbox" checked={animated} onChange={(event) => setAnimated(event.target.checked)} />从动态 z-buffer 更新</label>
          <p className="rounded-control border border-border bg-surface p-3 text-sm leading-6 text-secondary" aria-live="polite">{verdict}</p>
        </div>
      </div>
    </section>
  );
}
