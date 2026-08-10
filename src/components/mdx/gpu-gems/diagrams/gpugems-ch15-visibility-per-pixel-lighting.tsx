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
  return Number(value.toFixed(2));
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
      <marker id="ch15-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill={accent} />
      </marker>
      <linearGradient id="ch15-light-region" x1="0" x2="1">
        <stop offset="0" stopColor={warning} stopOpacity="0.08" />
        <stop offset="1" stopColor={warning} stopOpacity="0.4" />
      </linearGradient>
      <linearGradient id="ch15-scissor" x1="0" x2="1">
        <stop offset="0" stopColor={success} stopOpacity="0.34" />
        <stop offset="1" stopColor={success} stopOpacity="0.08" />
      </linearGradient>
    </defs>
  );
}

function Arrow({ x1, y1, x2, y2, stroke = accent }: { x1: number; y1: number; x2: number; y2: number; stroke?: string }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth="3" markerEnd="url(#ch15-arrow)" />;
}

export function GpuGemsCh15VisibilitySetDiagram() {
  return (
    <Frame ariaLabel="可见性集合关系：V 是相机看见的对象，L 是当前光源看见的对象，I 是 V 与 L 的交集用于 lighting pass，S 是会把阴影投进可见区域的 caster 集合用于 shadow pass。" caption="不要把 I 误用于 shadow pass：屏幕外或相机不可见的 caster 仍可能把阴影投进画面，因此 S 必须单独计算。">
      <ArrowDefs />
      <text x="360" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>visible sets → fewer batches</text>
      <circle cx="232" cy="202" r="112" fill={accent} fillOpacity="0.09" stroke={accent} strokeWidth="3" />
      <circle cx="398" cy="202" r="112" fill={warning} fillOpacity="0.09" stroke={warning} strokeWidth="3" />
      <text x="180" y="116" textAnchor="middle" fontSize="17" fontWeight="700" fill={accent}>V</text>
      <text x="448" y="116" textAnchor="middle" fontSize="17" fontWeight="700" fill={warning}>L</text>
      <text x="315" y="195" textAnchor="middle" fontSize="17" fontWeight="700" fill={success}>I = V ∩ L</text>
      <text x="315" y="220" textAnchor="middle" fontSize="12" fill={secondary}>lighting pass</text>
      <rect x="102" y="340" width="178" height="38" rx="10" fill={danger} fillOpacity="0.1" stroke={danger} />
      <text x="191" y="364" textAnchor="middle" fontSize="13" fill={danger}>S · shadow casters</text>
      <Arrow x1={191} y1={338} x2={249} y2={302} stroke={danger} />
      <rect x="440" y="340" width="178" height="38" rx="10" fill={success} fillOpacity="0.1" stroke={success} />
      <text x="529" y="364" textAnchor="middle" fontSize="13" fill={success}>skip if I = ∅</text>
      <Arrow x1={475} y1={338} x2={407} y2={302} stroke={success} />
      <text x="232" y="254" textAnchor="middle" fontSize="12" fill={secondary}>camera sees</text>
      <text x="398" y="254" textAnchor="middle" fontSize="12" fill={secondary}>light sees</text>
    </Frame>
  );
}

export function GpuGemsCh15BatchCostDiagram() {
  const rows = [
    { label: "ambient", count: 14, color: accent },
    { label: "3 × shadow", count: 42, color: danger },
    { label: "3 × lighting", count: 42, color: warning },
  ];
  return (
    <Frame ariaLabel="per-pixel lighting batch 成本：14 个初始 batch 加上三个灯各自的 shadow 和 lighting pass，未裁剪时总计 98 个 batch。" caption="这里的 14 来自示例场景的 8 个房间材质 batch 与 6 个模型 batch；每盏灯再把对象重复送入 shadow 和 lighting pass。">
      <ArrowDefs />
      <text x="360" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>passes multiply the batch problem</text>
      {rows.map((row, index) => {
        const width = row.count * 4.4;
        const y = 94 + index * 78;
        return <g key={row.label}>
          <text x="86" y={y + 26} textAnchor="end" fontSize="14" fill={primary}>{row.label}</text>
          <rect x="108" y={y} width={width} height="38" rx="8" fill={row.color} fillOpacity="0.18" stroke={row.color} />
          <text x={122 + width} y={y + 25} fontSize="13" fill={row.color}>{row.count} batches</text>
        </g>;
      })}
      <line x1="108" y1="332" x2="570" y2="332" stroke={border} strokeWidth="2" />
      <text x="108" y="362" fontSize="14" fontWeight="700" fill={danger}>14 + 3 × 14 × 2 = 98 batches</text>
      <text x="570" y="362" textAnchor="end" fontSize="12" fill={secondary}>ambient + lights × (shadow + lighting)</text>
    </Frame>
  );
}

export function GpuGemsCh15ShadowHullDiagram() {
  return (
    <Frame ariaLabel="光源在视锥外时的 shadow hull：用光源点与 view frustum 构造凸包，保留光源同侧的 frustum planes，并为 silhouette edges 添加经过光源的平面，以捕获屏幕外 caster 的阴影。" caption="当 light 在 frustum 外，不能只取相机可见对象；由 light 与 frustum 形成的 convex hull 才能包住投影进画面的外部 caster。">
      <ArrowDefs />
      <text x="360" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>shadow set：light + frustum 的 convex hull</text>
      <path d="M 92 306 L 192 132 L 368 132 L 430 306 Z" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="3" />
      <text x="261" y="120" textAnchor="middle" fontSize="13" fill={accent}>view frustum</text>
      <circle cx="580" cy="250" r="22" fill={warning} stroke={warning} strokeWidth="3" />
      <text x="580" y="294" textAnchor="middle" fontSize="13" fill={warning}>light outside</text>
      <path d="M 580 250 L 92 306 L 192 132 L 368 132 L 430 306 Z" fill="url(#ch15-light-region)" stroke={warning} strokeWidth="3" strokeDasharray="8 6" />
      <line x1="580" y1="250" x2="192" y2="132" stroke={danger} strokeWidth="3" />
      <line x1="580" y1="250" x2="430" y2="306" stroke={danger} strokeWidth="3" />
      <rect x="268" y="210" width="42" height="54" rx="6" fill={danger} fillOpacity="0.2" stroke={danger} strokeWidth="3" />
      <text x="289" y="282" textAnchor="middle" fontSize="12" fill={danger}>caster</text>
      <Arrow x1={330} y1={236} x2={390} y2={230} stroke={danger} />
      <text x="455" y="180" fontSize="12" fill={secondary}>silhouette edge → plane</text>
      <rect x="132" y="344" width="456" height="38" rx="10" fill={success} fillOpacity="0.1" stroke={success} />
      <text x="360" y="368" textAnchor="middle" fontSize="13" fill={primary}>S = objects whose extruded shadow intersects this volume</text>
    </Frame>
  );
}

export function GpuGemsCh15ScissorDiagram() {
  return (
    <Frame ariaLabel="scissor rectangle 优化：用 light radius 投影得到的 naive rectangle 可能很大，再与 I 集合中受影响对象的屏幕 bounding box 相交得到 tight scissor rectangle，减少 fill rate。" caption="光的半径不是屏幕影响区域；把实际受影响对象投影后求并集，再和光的投影范围取交集，才能得到紧的 scissor。">
      <ArrowDefs />
      <text x="360" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>visibility → screen-space scissor</text>
      <rect x="44" y="84" width="282" height="238" rx="14" fill={danger} fillOpacity="0.04" stroke={danger} strokeWidth="3" strokeDasharray="7 6" />
      <text x="185" y="110" textAnchor="middle" fontSize="14" fill={danger}>naive light-radius box</text>
      <ellipse cx="184" cy="210" rx="122" ry="84" fill={warning} fillOpacity="0.1" stroke={warning} strokeWidth="2" />
      <rect x="118" y="166" width="86" height="56" rx="7" fill={success} fillOpacity="0.3" stroke={success} strokeWidth="3" />
      <rect x="215" y="232" width="54" height="42" rx="7" fill={success} fillOpacity="0.3" stroke={success} strokeWidth="3" />
      <text x="184" y="294" textAnchor="middle" fontSize="12" fill={secondary}>large radius, small affected area</text>
      <Arrow x1={350} y1={204} x2={384} y2={204} stroke={accent} />
      <rect x="404" y="126" width="246" height="154" rx="14" fill="url(#ch15-scissor)" stroke={success} strokeWidth="3" />
      <text x="527" y="152" textAnchor="middle" fontSize="14" fill={success}>tight scissor / z-scissor</text>
      <rect x="460" y="178" width="86" height="56" rx="7" fill={success} fillOpacity="0.32" stroke={success} strokeWidth="3" />
      <rect x="557" y="202" width="54" height="42" rx="7" fill={success} fillOpacity="0.32" stroke={success} strokeWidth="3" />
      <text x="527" y="262" textAnchor="middle" fontSize="12" fill={secondary}>project I objects → union bounds</text>
      <rect x="132" y="344" width="456" height="38" rx="10" fill={success} fillOpacity="0.1" stroke={success} />
      <text x="360" y="368" textAnchor="middle" fontSize="13" fill={primary}>less screen area → less fill-rate work</text>
    </Frame>
  );
}

export function GpuGemsCh15VisibilityLab() {
  const [visibleObjects, setVisibleObjects] = useState(12);
  const [lightObjects, setLightObjects] = useState(9);
  const [frustumObjects, setFrustumObjects] = useState(16);
  const [shadowCasters, setShadowCasters] = useState(11);
  const [lightInside, setLightInside] = useState(true);
  const [scissor, setScissor] = useState(true);

  const reset = () => {
    setVisibleObjects(12);
    setLightObjects(9);
    setFrustumObjects(16);
    setShadowCasters(11);
    setLightInside(true);
    setScissor(true);
  };
  const illumination = Math.min(visibleObjects, lightObjects);
  const shadowSet = lightInside ? Math.min(frustumObjects, lightObjects) : Math.min(shadowCasters, lightObjects);
  const batchCount = 14 + shadowSet + illumination;
  const screenArea = rounded(Math.max(0.18, (illumination / 18) * (scissor ? 0.54 : 1)));
  const label = "visibility 实验：V " + visibleObjects + "，L " + lightObjects + "，F " + frustumObjects + "，shadow candidates " + shadowCasters + "，I " + illumination + "，S " + shadowSet + "，预计本灯额外 batch " + (shadowSet + illumination) + "，屏幕影响面积 " + screenArea.toFixed(2) + "。";

  return (
    <section data-visual-kind="gpu-gems-ch15-visibility-per-pixel-lighting" className="not-prose my-6 rounded-card border border-border bg-elevated p-5" aria-label="per-pixel lighting 可见性实验：调整 camera visible set、light set、frustum set 和 shadow candidates，切换 light 是否在视锥内与 scissor，观察 I、S、batch 和屏幕影响面积">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">Visibility Set Lab</p>
          <h4 className="mt-1 text-[15px] font-semibold text-primary">先猜：为什么 I 小了，S 不能直接跟着变小？</h4>
        </div>
        <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
      </div>
      <div className="grid gap-5 md:grid-cols-[1fr_248px] md:items-center">
        <svg viewBox="0 0 560 390" role="img" aria-label={label} className="w-full">
          <ArrowDefs />
          <rect x="12" y="18" width="536" height="354" rx="18" fill={surface} stroke={border} />
          <text x="32" y="46" fontSize="14" fontWeight="700" fill={primary}>camera × light × shadow visibility</text>
          <text x="526" y="46" textAnchor="end" fontSize="12" fill={success}>I={illumination} · S={shadowSet}</text>
          <path d="M 70 278 L 150 112 L 430 112 L 500 278 Z" fill={accent} fillOpacity="0.04" stroke={accent} strokeWidth="2" />
          <text x="285" y="98" textAnchor="middle" fontSize="12" fill={accent}>view frustum</text>
          <ellipse cx="286" cy="218" rx="150" ry="68" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="2" />
          <text x="286" y="218" textAnchor="middle" fontSize="13" fill={warning}>light influence</text>
          {Array.from({ length: 18 }, (_, index) => {
            const row = Math.floor(index / 6);
            const col = index % 6;
            const x = 132 + col * 56;
            const y = 154 + row * 46;
            const inV = index < visibleObjects;
            const inL = index < lightObjects;
            const inI = inV && inL;
            const inS = index < shadowSet;
            return <g key={"object-" + index}>
              <rect x={x} y={y} width="30" height="22" rx="5" fill={inI ? success : inS ? danger : inL ? warning : border} fillOpacity={inI || inS ? 0.42 : 0.16} stroke={inI ? success : inS ? danger : border} strokeWidth="2" />
              {inS && <line x1={x + 7} y1={y + 17} x2={x + 23} y2={y + 5} stroke={danger} strokeWidth="2" />}
            </g>;
          })}
          <rect x="68" y="318" width="424" height="26" rx="8" fill={scissor ? "url(#ch15-scissor)" : border} fillOpacity={scissor ? 0.78 : 0.26} />
          <text x="280" y="336" textAnchor="middle" fontSize="12" fill={primary}>{scissor ? "tight scissor · screen area " + screenArea.toFixed(2) : "no scissor · full light influence"}</text>
          <text x="68" y="368" fontSize="12" fill={secondary}>estimated batches: ambient 14 + S {shadowSet} + I {illumination} = {batchCount}</text>
        </svg>
        <div className="space-y-3">
          <label className="block text-sm text-primary" htmlFor="ch15-visible">camera visible V：{visibleObjects}</label>
          <input id="ch15-visible" className="min-h-11 w-full accent-accent" type="range" min="2" max="18" step="1" value={visibleObjects} onChange={(event) => setVisibleObjects(Number(event.target.value))} aria-label="调整相机 visible set 数量" />
          <label className="block text-sm text-primary" htmlFor="ch15-light">light visible L：{lightObjects}</label>
          <input id="ch15-light" className="min-h-11 w-full accent-accent" type="range" min="2" max="18" step="1" value={lightObjects} onChange={(event) => setLightObjects(Number(event.target.value))} aria-label="调整光源 visible set 数量" />
          <label className="block text-sm text-primary" htmlFor="ch15-frustum">frustum F：{frustumObjects}</label>
          <input id="ch15-frustum" className="min-h-11 w-full accent-accent" type="range" min="2" max="18" step="1" value={frustumObjects} onChange={(event) => setFrustumObjects(Number(event.target.value))} aria-label="调整视锥对象集合数量" />
          <label className="block text-sm text-primary" htmlFor="ch15-shadow">shadow candidates：{shadowCasters}</label>
          <input id="ch15-shadow" className="min-h-11 w-full accent-accent" type="range" min="2" max="18" step="1" value={shadowCasters} onChange={(event) => setShadowCasters(Number(event.target.value))} aria-label="调整 shadow candidate 数量" />
          <button type="button" aria-pressed={lightInside} onClick={() => setLightInside((value) => !value)} className={"min-h-11 w-full rounded-control border px-3 py-2 text-sm " + (lightInside ? "border-success text-primary" : "border-warning text-primary")}>{lightInside ? "light 在 frustum 内：S = F ∩ L" : "light 在 frustum 外：S = hull ∩ L"}</button>
          <button type="button" aria-pressed={scissor} onClick={() => setScissor((value) => !value)} className={"min-h-11 w-full rounded-control border px-3 py-2 text-sm " + (scissor ? "border-accent text-primary" : "border-border text-secondary")}>{scissor ? "关闭 tight scissor" : "启用 tight scissor"}</button>
          <button type="button" aria-label="重置可见性集合实验" onClick={reset} className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-accent hover:text-primary">重置实验</button>
          <p className="text-xs text-secondary" role="status">观察：I 只决定 lighting pass；S 还要覆盖屏幕外 caster。减少 I 可降低 batch，scissor 则进一步降低 fill rate。</p>
        </div>
      </div>
    </section>
  );
}
