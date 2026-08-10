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
        <svg viewBox="0 0 720 420" role="img" aria-label={ariaLabel} className="mx-auto block h-auto w-full max-w-[720px]">
          {children}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

function ArrowDefs() {
  return (
    <defs>
      <marker id="ch14-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill={accent} />
      </marker>
      <linearGradient id="ch14-density" x1="0" x2="1">
        <stop offset="0" stopColor={danger} stopOpacity="0.42" />
        <stop offset="1" stopColor={success} stopOpacity="0.16" />
      </linearGradient>
      <radialGradient id="ch14-light-glow">
        <stop offset="0" stopColor={warning} stopOpacity="0.46" />
        <stop offset="1" stopColor={warning} stopOpacity="0.02" />
      </radialGradient>
    </defs>
  );
}

function Arrow({ x1, y1, x2, y2, stroke = accent }: { x1: number; y1: number; x2: number; y2: number; stroke?: string }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth="3" markerEnd="url(#ch14-arrow)" />;
}

export function GpuGemsCh14PsmPipelineDiagram() {
  const stages = [
    { x: 28, title: "camera space", detail: "near objects large", color: accent },
    { x: 196, title: "post-projective", detail: "perspective reorders", color: warning },
    { x: 364, title: "light camera", detail: "focus receivers", color: success },
    { x: 532, title: "shadow test", detail: "depth + bias + PCF", color: danger },
  ];
  return (
    <Frame ariaLabel="透视阴影图管线：把场景变换到 post-projective space，围绕接收者选择 light camera，生成深度图，再在相机渲染时做深度比较、位置相关 bias 与 PCF。" caption="PSM 的核心不是增加一次采样，而是改变 shadow map 的空间分配：让近处屏幕像素获得更多 texel，再用后续的 light camera 和 bias 处理边界。">
      <ArrowDefs />
      <text x="360" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>perspective shadow map pipeline</text>
      {stages.map((stage, index) => (
        <g key={stage.title}>
          <rect x={stage.x} y="108" width="138" height="166" rx="16" fill={stage.color} fillOpacity="0.07" stroke={stage.color} strokeWidth="2" />
          <text x={stage.x + 69} y="140" textAnchor="middle" fontSize="15" fontWeight="700" fill={stage.color}>{stage.title}</text>
          <circle cx={stage.x + 69} cy="196" r="30" fill={stage.color} fillOpacity="0.16" stroke={stage.color} strokeWidth="3" />
          {index === 0 && <><path d={"M " + (stage.x + 48) + " 218 L " + (stage.x + 69) + " 178 L " + (stage.x + 90) + " 218"} fill="none" stroke={accent} strokeWidth="3" /><circle cx={stage.x + 69} cy="187" r="6" fill={warning} /></>}
          {index === 1 && <><path d={"M " + (stage.x + 47) + " 218 L " + (stage.x + 63) + " 180 L " + (stage.x + 76) + " 218"} fill="none" stroke={warning} strokeWidth="3" /><path d={"M " + (stage.x + 76) + " 218 L " + (stage.x + 86) + " 190 L " + (stage.x + 94) + " 218"} fill="none" stroke={warning} strokeWidth="2" /></>}
          {index === 2 && <><rect x={stage.x + 48} y="180" width="42" height="34" fill={success} fillOpacity="0.14" stroke={success} /><line x1={stage.x + 55} y1="207" x2={stage.x + 83} y2="187" stroke={success} strokeWidth="3" /><circle cx={stage.x + 64} cy="203" r="4" fill={warning} /></>}
          {index === 3 && <><path d={"M " + (stage.x + 48) + " 185 H " + (stage.x + 90) + " M " + (stage.x + 48) + " 205 H " + (stage.x + 90) + " M " + (stage.x + 48) + " 225 H " + (stage.x + 90) + " "} stroke={danger} strokeWidth="3" /><circle cx={stage.x + 69} cy="205" r="5" fill={warning} /></>}
          <text x={stage.x + 69} y="250" textAnchor="middle" fontSize="12" fill={secondary}>{stage.detail}</text>
          {index < stages.length - 1 && <Arrow x1={stage.x + 144} y1={196} x2={stage.x + 160} y2={196} stroke={stage.color} />}
        </g>
      ))}
      <rect x="142" y="318" width="436" height="42" rx="12" fill={success} fillOpacity="0.1" stroke={success} />
      <text x="360" y="344" textAnchor="middle" fontSize="13" fill={primary}>目标：把 screen-space texel 浪费改成按视野重要性分配</text>
    </Frame>
  );
}

export function GpuGemsCh14VirtualCameraDiagram() {
  return (
    <Frame ariaLabel="virtual camera 问题：真实相机前方的视锥覆盖不到相机后方的潜在 shadow caster，向后滑动虚拟相机会产生大面积 unused shadow-map space 并降低有效分辨率。" caption="virtual camera 能把相机后的 caster 收进视锥，却会把近处对象压小、浪费纹理空间；滑动距离突然变化时，阴影质量也会跳变。">
      <ArrowDefs />
      <text x="360" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>virtual camera：补覆盖，丢分辨率</text>
      <path d="M 92 304 L 232 132 L 382 304 Z" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="3" />
      <line x1="92" y1="304" x2="232" y2="132" stroke={accent} strokeWidth="2" />
      <line x1="382" y1="304" x2="232" y2="132" stroke={accent} strokeWidth="2" />
      <circle cx="232" cy="132" r="10" fill={warning} />
      <text x="232" y="112" textAnchor="middle" fontSize="13" fill={warning}>real camera</text>
      <rect x="175" y="176" width="42" height="68" rx="6" fill={success} fillOpacity="0.2" stroke={success} strokeWidth="3" />
      <text x="196" y="264" textAnchor="middle" fontSize="12" fill={success}>receiver</text>
      <rect x="252" y="80" width="40" height="52" rx="6" fill={danger} fillOpacity="0.2" stroke={danger} strokeWidth="3" />
      <text x="272" y="67" textAnchor="middle" fontSize="12" fill={danger}>behind caster</text>
      <path d="M 434 304 L 550 106 L 672 304 Z" fill={warning} fillOpacity="0.04" stroke={warning} strokeWidth="3" strokeDasharray="7 6" />
      <line x1="494" y1="304" x2="550" y2="106" stroke={warning} strokeWidth="2" />
      <line x1="606" y1="304" x2="550" y2="106" stroke={warning} strokeWidth="2" />
      <circle cx="550" cy="106" r="10" fill={warning} />
      <text x="550" y="86" textAnchor="middle" fontSize="13" fill={warning}>virtual shift</text>
      <rect x="476" y="146" width="144" height="122" rx="10" fill={danger} fillOpacity="0.08" stroke={danger} strokeDasharray="5 5" />
      <text x="548" y="182" textAnchor="middle" fontSize="13" fill={danger}>unused map area</text>
      <text x="548" y="206" textAnchor="middle" fontSize="12" fill={secondary}>near objects become smaller</text>
      <Arrow x1={390} y1={216} x2={440} y2={216} stroke={warning} />
      <rect x="148" y="344" width="424" height="38" rx="10" fill={danger} fillOpacity="0.1" stroke={danger} />
      <text x="360" y="368" textAnchor="middle" fontSize="13" fill={primary}>special inverse projection：让 near/far 处理匹配后投影空间</text>
    </Frame>
  );
}

export function GpuGemsCh14LightCameraDiagram() {
  const points = [{ x: 286, y: 174 }, { x: 338, y: 220 }, { x: 384, y: 154 }, { x: 414, y: 246 }, { x: 454, y: 188 }];
  return (
    <Frame ariaLabel="light camera 的 unit cube clipping：只用接收者 bounding volumes 估计需要看到的区域，用包围体定义视野和 near/far 范围，再沿最小锥方向选择 light camera。" caption="不必把完整 unit cube 塞进一张纹理；用粗略 bounding volumes 聚焦真实 receiver，能减少无用区域，并让 texel 更有效地落在目标上。">
      <ArrowDefs />
      <text x="360" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>light camera：先圈 receiver，再选方向</text>
      <path d="M 88 322 L 230 106 L 522 106 L 632 322 Z" fill={accent} fillOpacity="0.04" stroke={border} strokeWidth="2" strokeDasharray="7 6" />
      <text x="360" y="94" textAnchor="middle" fontSize="13" fill={secondary}>post-projective unit cube</text>
      <path d="M 208 286 L 292 150 L 474 150 L 528 286 Z" fill={success} fillOpacity="0.13" stroke={success} strokeWidth="3" />
      <text x="368" y="278" textAnchor="middle" fontSize="13" fill={success}>receiver bounds</text>
      {points.map((point, index) => <circle key={"p-" + index} cx={point.x} cy={point.y} r="7" fill={warning} stroke={warning} strokeWidth="2" />)}
      <circle cx="146" cy="276" r="30" fill="url(#ch14-light-glow)" stroke={warning} strokeWidth="3" />
      <circle cx="146" cy="276" r="9" fill={warning} />
      <text x="146" y="326" textAnchor="middle" fontSize="13" fill={warning}>light</text>
      <path d="M 146 276 L 378 198" fill="none" stroke={warning} strokeWidth="3" markerEnd="url(#ch14-arrow)" />
      <path d="M 146 276 L 286 150 M 146 276 L 474 150" fill="none" stroke={warning} strokeWidth="2" strokeDasharray="6 6" />
      <text x="152" y="226" fontSize="12" fill={warning}>minimal cone axis</text>
      <rect x="178" y="344" width="364" height="38" rx="10" fill={success} fillOpacity="0.1" stroke={success} />
      <text x="360" y="368" textAnchor="middle" fontSize="13" fill={primary}>bounding volume 可粗略，但要覆盖所有 caster 与 receiver</text>
    </Frame>
  );
}

export function GpuGemsCh14BiasAndFilteringDiagram() {
  return (
    <Frame ariaLabel="PSM 质量补丁：世界空间 bias 经过双投影转换后随 texel 位置变化，PCF 用邻近深度比较平均硬边，地面等不需自阴影的对象可把 color shadow mask 单独 blur。" caption="PSM 不会自动消除所有伪影：bias 要随位置变化，PCF 只能缓解而不能抹掉严重 aliasing，blur 应作用于 color mask 而不是 depth。">
      <ArrowDefs />
      <text x="360" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>quality fixes：bias ≠ constant，blur ≠ depth</text>
      <rect x="28" y="82" width="206" height="236" rx="16" fill={accent} fillOpacity="0.06" stroke={border} />
      <text x="131" y="114" textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>world-space bias</text>
      <line x1="62" y1="270" x2="202" y2="150" stroke={accent} strokeWidth="3" />
      <circle cx="82" cy="253" r="6" fill={success} /><circle cx="168" cy="180" r="6" fill={danger} />
      <line x1="82" y1="253" x2="82" y2="224" stroke={success} strokeWidth="4" /><line x1="168" y1="180" x2="168" y2="128" stroke={danger} strokeWidth="4" />
      <text x="131" y="294" textAnchor="middle" fontSize="12" fill={secondary}>near small · far large</text>
      <rect x="257" y="82" width="206" height="236" rx="16" fill={warning} fillOpacity="0.06" stroke={border} />
      <text x="360" y="114" textAnchor="middle" fontSize="15" fontWeight="700" fill={warning}>PCF offsets</text>
      <rect x="318" y="156" width="84" height="84" fill={surface} stroke={warning} strokeWidth="2" />
      {[0, 1, 2, 3].map((index) => <circle key={"sample-" + index} cx={index % 2 === 0 ? 336 : 384} cy={index < 2 ? 174 : 222} r="8" fill={index === 0 ? danger : success} />)}
      <text x="360" y="274" textAnchor="middle" fontSize="12" fill={secondary}>compare → average → softer edge</text>
      <rect x="486" y="82" width="206" height="236" rx="16" fill={success} fillOpacity="0.06" stroke={border} />
      <text x="589" y="114" textAnchor="middle" fontSize="15" fontWeight="700" fill={success}>color-mask blur</text>
      <rect x="524" y="154" width="130" height="68" rx="8" fill="url(#ch14-density)" />
      <line x1="540" y1="188" x2="638" y2="188" stroke={primary} strokeWidth="3" opacity="0.5" />
      <text x="589" y="250" textAnchor="middle" fontSize="12" fill={secondary}>只给 ground / wall 等对象</text>
      <text x="589" y="272" textAnchor="middle" fontSize="12" fill={secondary}>保留其他物体的 depth + PCF</text>
    </Frame>
  );
}

export function GpuGemsCh14PerspectiveShadowLab() {
  const [nearPlane, setNearPlane] = useState(0.42);
  const [lightAngle, setLightAngle] = useState(0.54);
  const [clipping, setClipping] = useState(true);
  const [biasMode, setBiasMode] = useState<"constant" | "world">("world");
  const [pcfSamples, setPcfSamples] = useState(4);

  const reset = () => {
    setNearPlane(0.42);
    setLightAngle(0.54);
    setClipping(true);
    setBiasMode("world");
    setPcfSamples(4);
  };
  const density = rounded(Math.max(0.1, Math.min(1, (0.34 + nearPlane * 0.5) * (clipping ? 1.22 : 0.72) * (0.72 + lightAngle * 0.4))));
  const aliasing = rounded(Math.max(0.08, 1 - density + (biasMode === "constant" ? 0.18 : 0) - (pcfSamples / 32)));
  const softness = rounded(0.12 + pcfSamples * 0.035);
  const label = "PSM 交互实验：near plane " + nearPlane.toFixed(2) + "，light angle " + lightAngle.toFixed(2) + "，" + (clipping ? "启用" : "关闭") + " unit cube clipping，" + (biasMode === "world" ? "world-space" : "constant") + " bias，PCF " + pcfSamples + " samples，aliasing " + aliasing.toFixed(2) + "。";
  const gridSize = 8;
  const gridX = 70;
  const gridY = 102;
  const cell = 34;

  return (
    <section data-visual-kind="gpu-gems-ch14-perspective-shadow-maps" className="not-prose my-6 rounded-card border border-border bg-elevated p-5" aria-label="透视阴影图实验：调整 near plane、light angle、unit cube clipping、bias 模式和 PCF 采样，观察 texel density 与 aliasing 的变化">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">Perspective Shadow Map Lab</p>
          <h4 className="mt-1 text-[15px] font-semibold text-primary">先猜：把 light camera 聚焦到 receiver，为什么能减少 aliasing？</h4>
        </div>
        <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
      </div>
      <div className="grid gap-5 md:grid-cols-[1fr_248px] md:items-center">
        <svg viewBox="0 0 560 390" role="img" aria-label={label} className="w-full">
          <ArrowDefs />
          <rect x="12" y="18" width="536" height="354" rx="18" fill={surface} stroke={border} />
          <text x="32" y="46" fontSize="14" fontWeight="700" fill={primary}>post-projective unit cube</text>
          <text x="526" y="46" textAnchor="end" fontSize="12" fill={aliasing < 0.3 ? success : danger}>aliasing {aliasing.toFixed(2)}</text>
          <path d="M 42 300 L 166 72 L 458 72 L 514 300 Z" fill={accent} fillOpacity="0.04" stroke={border} strokeWidth="2" strokeDasharray="6 6" />
          <path d="M 128 274 L 202 134 L 390 134 L 438 274 Z" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="3" />
          <text x="282" y="260" textAnchor="middle" fontSize="13" fill={success}>receiver focus</text>
          <circle cx="96" cy="254" r="22" fill="url(#ch14-light-glow)" stroke={warning} strokeWidth="3" />
          <circle cx="96" cy="254" r="7" fill={warning} />
          <text x="96" y="291" textAnchor="middle" fontSize="12" fill={warning}>light</text>
          <path d="M 96 254 L 296 204" stroke={warning} strokeWidth="3" markerEnd="url(#ch14-arrow)" />
          <g opacity={clipping ? 1 : 0.34}>
            {Array.from({ length: gridSize * gridSize }, (_, index) => {
              const row = Math.floor(index / gridSize);
              const col = index % gridSize;
              const isReceiver = row > 2 && row < 6 && col > 1 && col < 7;
              return <rect key={"cell-" + index} x={gridX + col * cell} y={gridY + row * cell} width={cell - 2} height={cell - 2} rx="2" fill={isReceiver ? success : (row + col) % 3 === 0 ? danger : accent} fillOpacity={isReceiver ? 0.34 : 0.1} stroke={isReceiver ? success : border} strokeWidth="1" />;
            })}
          </g>
          <text x="352" y="358" fontSize="12" fill={secondary}>{clipping ? "clipped receiver bounds → more useful texels" : "full cube → more unused texels"}</text>
        </svg>
        <div className="space-y-3">
          <label className="block text-sm text-primary" htmlFor="ch14-near">near plane：{nearPlane.toFixed(2)}</label>
          <input id="ch14-near" className="min-h-11 w-full accent-accent" type="range" min="0.12" max="0.9" step="0.02" value={nearPlane} onChange={(event) => setNearPlane(Number(event.target.value))} aria-label="调整 light camera near plane" />
          <label className="block text-sm text-primary" htmlFor="ch14-angle">light angle：{lightAngle.toFixed(2)}</label>
          <input id="ch14-angle" className="min-h-11 w-full accent-accent" type="range" min="0.1" max="1" step="0.02" value={lightAngle} onChange={(event) => setLightAngle(Number(event.target.value))} aria-label="调整光源相对相机的角度" />
          <button type="button" aria-pressed={clipping} onClick={() => setClipping((value) => !value)} className={"min-h-11 w-full rounded-control border px-3 py-2 text-sm " + (clipping ? "border-success text-primary" : "border-border text-secondary")}>{clipping ? "关闭 unit cube clipping" : "启用 unit cube clipping"}</button>
          <div className="grid grid-cols-2 gap-2">
            <button type="button" aria-pressed={biasMode === "constant"} onClick={() => setBiasMode("constant")} className={"min-h-11 rounded-control border px-2 py-2 text-xs " + (biasMode === "constant" ? "border-danger text-primary" : "border-border text-secondary")}>constant bias</button>
            <button type="button" aria-pressed={biasMode === "world"} onClick={() => setBiasMode("world")} className={"min-h-11 rounded-control border px-2 py-2 text-xs " + (biasMode === "world" ? "border-success text-primary" : "border-border text-secondary")}>world-space bias</button>
          </div>
          <label className="block text-sm text-primary" htmlFor="ch14-pcf">PCF samples：{pcfSamples}</label>
          <input id="ch14-pcf" className="min-h-11 w-full accent-accent" type="range" min="1" max="8" step="1" value={pcfSamples} onChange={(event) => setPcfSamples(Number(event.target.value))} aria-label="调整 PCF 采样数量" />
          <button type="button" aria-label="重置透视阴影图实验" onClick={reset} className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-accent hover:text-primary">重置实验</button>
          <p className="text-xs text-secondary" role="status">观察：clipping 提高目标区域 texel density；world-space bias 减少近处 acne 和远处漏光的统一取舍；PCF 只能缓解，不会消除严重 aliasing。</p>
        </div>
      </div>
    </section>
  );
}
