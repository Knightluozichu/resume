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

function Arrow({ x1, y1, x2, y2, stroke = accent }: { x1: number; y1: number; x2: number; y2: number; stroke?: string }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth="3" markerEnd="url(#ch12-arrow)" />;
}

function ArrowDefs() {
  return (
    <defs>
      <marker id="ch12-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill={accent} />
      </marker>
      <linearGradient id="ch12-shadow-fade" x1="0" x2="1">
        <stop offset="0" stopColor={danger} stopOpacity="0.52" />
        <stop offset="1" stopColor={danger} stopOpacity="0.08" />
      </linearGradient>
      <radialGradient id="ch12-light-glow">
        <stop offset="0" stopColor={warning} stopOpacity="0.42" />
        <stop offset="1" stopColor={warning} stopOpacity="0.02" />
      </radialGradient>
    </defs>
  );
}

export function GpuGemsCh12CubeMapDiagram() {
  const faces = [
    { x: 70, y: 120, label: "+x", color: accent },
    { x: 190, y: 120, label: "-x", color: success },
    { x: 310, y: 120, label: "+y", color: warning },
    { x: 430, y: 120, label: "-y", color: danger },
    { x: 250, y: 264, label: "+z", color: accent },
    { x: 370, y: 264, label: "-z", color: success },
  ];
  return (
    <Frame ariaLabel="点光源全方向 cubemap：以光源为中心，六个 90 度视锥覆盖正负 x、y、z 六个方向，每个面记录该方向的遮挡距离。" caption="cubemap 不是只存一张正面深度图，而是以点光源为中心覆盖六个方向；采样方向就是从接收点指向光源的向量。">
      <ArrowDefs />
      <text x="360" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>一个点光源，六个方向的 shadow map</text>
      <circle cx="360" cy="208" r="46" fill="url(#ch12-light-glow)" stroke={warning} strokeWidth="3" />
      <circle cx="360" cy="208" r="12" fill={warning} />
      <text x="360" y="214" textAnchor="middle" fontSize="14" fontWeight="700" fill={primary}>L</text>
      {faces.map((face) => (
        <g key={face.label}>
          <rect x={face.x} y={face.y} width="100" height="70" rx="12" fill={face.color} fillOpacity="0.08" stroke={face.color} strokeWidth="2" />
          <text x={face.x + 50} y={face.y + 30} textAnchor="middle" fontSize="17" fontWeight="700" fill={face.color}>{face.label}</text>
          <text x={face.x + 50} y={face.y + 52} textAnchor="middle" fontSize="12" fill={secondary}>90° face</text>
          <line x1="360" y1="208" x2={face.x + 50} y2={face.y + 35} stroke={face.color} strokeWidth="2" strokeDasharray="6 6" />
        </g>
      ))}
      <rect x="176" y="372" width="368" height="32" rx="9" fill={warning} fillOpacity="0.1" stroke={warning} />
      <text x="360" y="393" textAnchor="middle" fontSize="13" fill={primary}>sample direction → 选择 face → 比较 squared distance</text>
    </Frame>
  );
}

export function GpuGemsCh12TwoPhaseDiagram() {
  const stages = [
    { x: 30, title: "1 创建", detail: "六个 cubemap face", color: accent },
    { x: 186, title: "2 写入", detail: "distance² from light", color: warning },
    { x: 342, title: "3 投影", detail: "receiver → direction", color: success },
    { x: 498, title: "4 比较", detail: "distance² vs map", color: danger },
  ];
  return (
    <Frame ariaLabel="全方向阴影两阶段流程：从光源位置向六个 cubemap 面渲染遮挡物平方距离，再在正常相机阶段用接收点到光源的平方距离采样并比较。" caption="创建阶段只关心光源看到的最近距离；投影阶段把接收点方向送入同一 cubemap，再比较两个 squared distance。">
      <ArrowDefs />
      <text x="360" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>create shadow map → project and compare</text>
      {stages.map((stage, index) => (
        <g key={stage.title}>
          <rect x={stage.x} y="106" width="126" height="154" rx="16" fill={stage.color} fillOpacity="0.07" stroke={stage.color} strokeWidth="2" />
          <text x={stage.x + 63} y="140" textAnchor="middle" fontSize="15" fontWeight="700" fill={stage.color}>{stage.title}</text>
          <circle cx={stage.x + 63} cy="196" r="30" fill={stage.color} fillOpacity="0.16" stroke={stage.color} strokeWidth="3" />
          {index === 0 && <><path d={"M " + (stage.x + 48) + " 210 L " + (stage.x + 63) + " 178 L " + (stage.x + 78) + " 210"} fill="none" stroke={stage.color} strokeWidth="4" /><circle cx={stage.x + 63} cy="196" r="5" fill={warning} /></>}
          {index === 1 && <><rect x={stage.x + 47} y="180" width="32" height="32" fill={stage.color} fillOpacity="0.18" stroke={stage.color} /><text x={stage.x + 63} y="201" textAnchor="middle" fontSize="13" fill={stage.color}>d²</text></>}
          {index === 2 && <><circle cx={stage.x + 63} cy="196" r="8" fill={warning} /><line x1={stage.x + 42} y1="211" x2={stage.x + 84} y2="179" stroke={stage.color} strokeWidth="3" /></>}
          {index === 3 && <><path d={"M " + (stage.x + 44) + " 186 L " + (stage.x + 82) + " 186 M " + (stage.x + 44) + " 204 L " + (stage.x + 82) + " 204"} stroke={stage.color} strokeWidth="4" /><circle cx={stage.x + 63} cy="195" r="5" fill={stage.color} /></>}
          <text x={stage.x + 63} y="236" textAnchor="middle" fontSize="12" fill={secondary}>{stage.detail}</text>
          {index < stages.length - 1 && <Arrow x1={stage.x + 132} y1={196} x2={stage.x + 154} y2={196} stroke={stage.color} />}
        </g>
      ))}
      <rect x="128" y="314" width="464" height="48" rx="12" fill={success} fillOpacity="0.1" stroke={success} />
      <text x="360" y="336" textAnchor="middle" fontSize="14" fill={primary}>depth-only pass 先写可见表面</text>
      <text x="360" y="354" textAnchor="middle" fontSize="12" fill={secondary}>后续每盏灯只给 visible pixels 做 lighting × shadow</text>
    </Frame>
  );
}

export function GpuGemsCh12DistancePackingDiagram() {
  return (
    <Frame ariaLabel="平方距离存储对比：浮点纹理直接写入 distance squared，精度高但硬件支持和速度有限；32 位 RGBA 纹理把距离打包到颜色通道，兼容性好但需要 pack 与 unpack。" caption="写入 squared distance 是一次点积，避免平方根；存储格式则在精度、硬件支持、显存和 shader 指令之间取舍。">
      <ArrowDefs />
      <text x="360" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>distance²：一次点积，两个阶段复用</text>
      <rect x="28" y="68" width="306" height="274" rx="18" fill={accent} fillOpacity="0.05" stroke={border} />
      <text x="181" y="104" textAnchor="middle" fontSize="16" fontWeight="700" fill={accent}>floating-point cube</text>
      <text x="181" y="128" textAnchor="middle" fontSize="13" fill={secondary}>直接存 d²，采样后比较</text>
      <circle cx="181" cy="202" r="42" fill={accent} fillOpacity="0.13" stroke={accent} strokeWidth="3" />
      <text x="181" y="208" textAnchor="middle" fontSize="18" fontWeight="700" fill={accent}>d²</text>
      <Arrow x1={181} y1={252} x2={181} y2={278} stroke={accent} />
      <text x="181" y="306" textAnchor="middle" fontSize="13" fill={primary}>高精度</text>
      <text x="181" y="326" textAnchor="middle" fontSize="12" fill={secondary}>格式支持有限 / 访问可能更慢</text>
      <rect x="386" y="68" width="306" height="274" rx="18" fill={warning} fillOpacity="0.05" stroke={border} />
      <text x="539" y="104" textAnchor="middle" fontSize="16" fontWeight="700" fill={warning}>RGBA8 cube</text>
      <text x="539" y="128" textAnchor="middle" fontSize="13" fill={secondary}>pack → sample → unpack</text>
      <rect x="455" y="170" width="42" height="64" fill={danger} fillOpacity="0.22" stroke={danger} strokeWidth="2" />
      <rect x="497" y="170" width="42" height="64" fill={success} fillOpacity="0.22" stroke={success} strokeWidth="2" />
      <rect x="539" y="170" width="42" height="64" fill={accent} fillOpacity="0.22" stroke={accent} strokeWidth="2" />
      <rect x="581" y="170" width="42" height="64" fill={warning} fillOpacity="0.22" stroke={warning} strokeWidth="2" />
      <text x="476" y="208" textAnchor="middle" fontSize="14" fill={danger}>R</text>
      <text x="518" y="208" textAnchor="middle" fontSize="14" fill={success}>G</text>
      <text x="560" y="208" textAnchor="middle" fontSize="14" fill={accent}>B</text>
      <text x="602" y="208" textAnchor="middle" fontSize="14" fill={warning}>A</text>
      <text x="539" y="276" textAnchor="middle" fontSize="13" fill={primary}>兼容性高</text>
      <text x="539" y="298" textAnchor="middle" fontSize="12" fill={secondary}>需要 pack / unpack 与精度管理</text>
      <text x="539" y="326" textAnchor="middle" fontSize="12" fill={secondary}>单张 cubemap 仍要考虑 6 面显存</text>
    </Frame>
  );
}

export function GpuGemsCh12OmniShadowLab() {
  const [storage, setStorage] = useState<"float" | "rgba">("float");
  const [shadowMode, setShadowMode] = useState<"hard" | "soft">("soft");
  const [resolution, setResolution] = useState(0.62);
  const [bias, setBias] = useState(0.28);
  const [filterRadius, setFilterRadius] = useState(0.42);
  const [showFaces, setShowFaces] = useState(true);

  const lightX = 126;
  const lightY = 126;
  const casterX = 270;
  const casterY = 184;
  const receiverY = 274;
  const shadowStart = rounded(320 + bias * 18);
  const shadowEnd = rounded(shadowStart + 104 + filterRadius * 42);
  const shadowOpacity = rounded(0.16 + (1 - resolution) * 0.22);
  const sampleCount = shadowMode === "hard" ? 1 : 4;
  const reset = () => {
    setStorage("float");
    setShadowMode("soft");
    setResolution(0.62);
    setBias(0.28);
    setFilterRadius(0.42);
    setShowFaces(true);
  };
  const label = "全方向阴影实验：使用 " + (storage === "float" ? "浮点" : "RGBA 打包") + " cubemap，" + (shadowMode === "soft" ? "软阴影四次采样" : "硬阴影单次比较") + "，分辨率比例 " + resolution.toFixed(2) + "，bias " + bias.toFixed(2) + "，过滤半径 " + filterRadius.toFixed(2) + "，" + (showFaces ? "显示" : "隐藏") + "六面方向。";

  return (
    <section data-visual-kind="gpu-gems-ch12-omnidirectional-shadow" className="not-prose my-6 rounded-card border border-border bg-elevated p-5" aria-label="全方向阴影实验：切换浮点或 RGBA cubemap、硬阴影或软阴影，调整分辨率、bias 和过滤半径，观察点光源的六面投影与接收阴影">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">Omnidirectional Shadow Lab</p>
          <h4 className="mt-1 text-[15px] font-semibold text-primary">先猜：只把光源绕物体转一圈，为什么一张平面 shadow map 不够？</h4>
        </div>
        <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
      </div>
      <div className="grid gap-5 md:grid-cols-[1fr_248px] md:items-center">
        <svg viewBox="0 0 560 390" role="img" aria-label={label} className="w-full">
          <ArrowDefs />
          <rect x="12" y="18" width="536" height="354" rx="18" fill={surface} stroke={border} />
          <text x="32" y="46" fontSize="14" fontWeight="700" fill={primary}>point light → dynamic receiver</text>
          <text x="512" y="46" textAnchor="end" fontSize="12" fill={storage === "float" ? accent : warning}>{storage === "float" ? "d² float cubemap" : "packed RGBA cubemap"}</text>
          <rect x="42" y={receiverY} width="466" height="42" rx="8" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="2" />
          <text x="54" y={receiverY + 26} fontSize="12" fill={secondary}>receiver surface</text>
          <circle cx={lightX} cy={lightY} r="26" fill="url(#ch12-light-glow)" stroke={warning} strokeWidth="3" />
          <circle cx={lightX} cy={lightY} r="9" fill={warning} />
          <text x={lightX} y="90" textAnchor="middle" fontSize="12" fill={warning}>point light</text>
          <rect x={casterX - 24} y={casterY - 34} width="48" height="68" rx="7" fill={accent} fillOpacity="0.22" stroke={accent} strokeWidth="3" />
          <text x={casterX} y={casterY + 56} textAnchor="middle" fontSize="12" fill={accent}>caster</text>
          <line x1={lightX + 22} y1={lightY + 18} x2={casterX - 24} y2={casterY - 22} stroke={warning} strokeWidth="2" strokeDasharray="6 6" />
          <path d={"M " + (casterX + 24) + " " + (casterY - 30) + " L " + shadowStart + " " + (receiverY + 6) + " L " + shadowEnd + " " + (receiverY + 6) + " L " + (casterX + 24) + " " + (casterY + 30) + " Z"} fill="url(#ch12-shadow-fade)" fillOpacity={shadowOpacity} stroke={danger} strokeWidth="2" strokeDasharray={shadowMode === "soft" ? "5 5" : undefined} />
          <text x={rounded((shadowStart + shadowEnd) / 2)} y={receiverY + 28} textAnchor="middle" fontSize="12" fill={danger}>{shadowMode === "soft" ? sampleCount + " samples / soft edge" : "single compare / hard edge"}</text>
          {showFaces && <g transform="translate(408 80)">
            <rect x="0" y="0" width="74" height="56" rx="8" fill={accent} fillOpacity="0.08" stroke={accent} />
            <rect x="82" y="0" width="74" height="56" rx="8" fill={success} fillOpacity="0.08" stroke={success} />
            <rect x="0" y="64" width="74" height="56" rx="8" fill={warning} fillOpacity="0.08" stroke={warning} />
            <rect x="82" y="64" width="74" height="56" rx="8" fill={danger} fillOpacity="0.08" stroke={danger} />
            <rect x="41" y="128" width="74" height="56" rx="8" fill={accent} fillOpacity="0.08" stroke={accent} />
            <rect x="123" y="128" width="74" height="56" rx="8" fill={success} fillOpacity="0.08" stroke={success} />
            <text x="37" y="34" textAnchor="middle" fontSize="12" fill={accent}>+x</text>
            <text x="119" y="34" textAnchor="middle" fontSize="12" fill={success}>-x</text>
            <text x="37" y="98" textAnchor="middle" fontSize="12" fill={warning}>+y</text>
            <text x="119" y="98" textAnchor="middle" fontSize="12" fill={danger}>-y</text>
            <text x="78" y="162" textAnchor="middle" fontSize="12" fill={accent}>+z</text>
            <text x="160" y="162" textAnchor="middle" fontSize="12" fill={success}>-z</text>
          </g>}
          <text x="54" y="344" fontSize="12" fill={secondary}>compare: current distance² − bias vs cubemap sample</text>
        </svg>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <button type="button" aria-pressed={storage === "float"} onClick={() => setStorage("float")} className={"min-h-11 rounded-control border px-2 py-2 text-xs " + (storage === "float" ? "border-accent text-primary" : "border-border text-secondary")}>float d²</button>
            <button type="button" aria-pressed={storage === "rgba"} onClick={() => setStorage("rgba")} className={"min-h-11 rounded-control border px-2 py-2 text-xs " + (storage === "rgba" ? "border-warning text-primary" : "border-border text-secondary")}>RGBA pack</button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button type="button" aria-pressed={shadowMode === "hard"} onClick={() => setShadowMode("hard")} className={"min-h-11 rounded-control border px-2 py-2 text-xs " + (shadowMode === "hard" ? "border-danger text-primary" : "border-border text-secondary")}>hard</button>
            <button type="button" aria-pressed={shadowMode === "soft"} onClick={() => setShadowMode("soft")} className={"min-h-11 rounded-control border px-2 py-2 text-xs " + (shadowMode === "soft" ? "border-success text-primary" : "border-border text-secondary")}>soft</button>
          </div>
          <label className="block text-sm text-primary" htmlFor="ch12-resolution">cubemap resolution：{resolution.toFixed(2)}</label>
          <input id="ch12-resolution" className="min-h-11 w-full accent-accent" type="range" min="0.25" max="1" step="0.05" value={resolution} onChange={(event) => setResolution(Number(event.target.value))} aria-label="调整 cubemap 分辨率比例" />
          <label className="block text-sm text-primary" htmlFor="ch12-bias">depth bias：{bias.toFixed(2)}</label>
          <input id="ch12-bias" className="min-h-11 w-full accent-accent" type="range" min="0" max="1" step="0.05" value={bias} onChange={(event) => setBias(Number(event.target.value))} aria-label="调整全方向阴影 depth bias" />
          <label className="block text-sm text-primary" htmlFor="ch12-filter-radius">soft filter radius：{filterRadius.toFixed(2)}</label>
          <input id="ch12-filter-radius" className="min-h-11 w-full accent-accent" type="range" min="0.1" max="1" step="0.05" value={filterRadius} onChange={(event) => setFilterRadius(Number(event.target.value))} aria-label="调整软阴影过滤半径" />
          <button type="button" aria-pressed={showFaces} onClick={() => setShowFaces((value) => !value)} className={"min-h-11 w-full rounded-control border px-3 py-2 text-sm " + (showFaces ? "border-accent text-primary" : "border-border text-secondary")}>{showFaces ? "隐藏六面 cubemap" : "显示六面 cubemap"}</button>
          <button type="button" aria-label="重置全方向阴影实验" onClick={reset} className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-accent hover:text-primary">重置实验</button>
          <p className="text-xs text-secondary" role="status">观察：降低 bias 可能出现 acne；增大 filter radius 会变软但增加 fetch，RGBA pack 需要额外解码。</p>
        </div>
      </div>
    </section>
  );
}
