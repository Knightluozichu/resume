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
        <svg viewBox="0 0 720 420" role="img" aria-label={ariaLabel} className="mx-auto block h-auto w-full max-w-[720px]">
          {children}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

function Arrow({ x1, y1, x2, y2, stroke = accent }: { x1: number; y1: number; x2: number; y2: number; stroke?: string }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth="3" markerEnd="url(#shadow-volume-arrow)" />;
}

function ArrowDefs() {
  return (
    <defs>
      <marker id="shadow-volume-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill={accent} />
      </marker>
    </defs>
  );
}

function Caster({ x, y, size, fill = warning }: { x: number; y: number; size: number; fill?: string }) {
  return <rect x={x - size / 2} y={y - size / 2} width={size} height={size} rx="8" fill={fill} fillOpacity="0.18" stroke={fill} strokeWidth="3" />;
}

export function GpuGemsCh09ShadowPipelineDiagram() {
  const stages = [
    { x: 34, title: "1 基础光照", detail: "ambient + emissive", color: accent },
    { x: 208, title: "2 标记阴影", detail: "volume → stencil", color: warning },
    { x: 382, title: "3 单灯光照", detail: "diffuse + specular", color: success },
    { x: 556, title: "4 累加画面", detail: "additive blend", color: danger },
  ];
  return (
    <Frame ariaLabel="阴影体积渲染管线：先渲染基础光照并写入深度，再构造体积写入模板，最后为每盏灯只在非阴影区域累加光照。" caption="shadow volume 不直接画黑色几何，而是先给像素分类，再让每盏灯只给未被遮挡的像素贡献光照。">
      <ArrowDefs />
      <text x="360" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>先分类像素，再累加每盏灯</text>
      {stages.map((stage, index) => (
        <g key={stage.title}>
          <rect x={stage.x} y="100" width="130" height="184" rx="16" fill={stage.color} fillOpacity="0.07" stroke={stage.color} strokeWidth="2" />
          <text x={stage.x + 65} y="134" textAnchor="middle" fontSize="14" fontWeight="700" fill={stage.color}>{stage.title}</text>
          <circle cx={stage.x + 65} cy="194" r="32" fill={stage.color} fillOpacity="0.16" stroke={stage.color} strokeWidth="3" />
          {index === 0 && <path d={"M " + (stage.x + 44) + " 200 L " + (stage.x + 65) + " 172 L " + (stage.x + 86) + " 200"} fill="none" stroke={stage.color} strokeWidth="4" />}
          {index === 1 && <path d={"M " + (stage.x + 42) + " 212 L " + (stage.x + 88) + " 174 L " + (stage.x + 88) + " 214 Z"} fill={stage.color} fillOpacity="0.55" />}
          {index === 2 && <path d={"M " + (stage.x + 44) + " 208 Q " + (stage.x + 65) + " 166 " + (stage.x + 86) + " 208"} fill="none" stroke={stage.color} strokeWidth="5" />}
          {index === 3 && <path d={"M " + (stage.x + 44) + " 195 L " + (stage.x + 86) + " 195 M " + (stage.x + 65) + " 174 L " + (stage.x + 65) + " 216"} stroke={stage.color} strokeWidth="4" />}
          <text x={stage.x + 65} y="254" textAnchor="middle" fontSize="13" fill={secondary}>{stage.detail}</text>
          {index < 3 && <Arrow x1={stage.x + 138} y1={194} x2={stage.x + 166} y2={194} stroke={stage.color} />}
        </g>
      ))}
      <rect x="148" y="332" width="424" height="46" rx="12" fill={success} fillOpacity="0.1" stroke={success} />
      <text x="360" y="360" textAnchor="middle" fontSize="14" fill={primary}>深度先写好，后续光照 pass 才能少 overdraw</text>
    </Frame>
  );
}

export function GpuGemsCh09SilhouetteVolumeDiagram() {
  return (
    <Frame ariaLabel="阴影体积几何图：点光源照向方形遮挡物，只有正面与背面相邻的轮廓边被挤出，形成侧面四边形，并由近光源端和远端封闭。" caption="阴影体积只需要挤出轮廓边；光源看到的正背面交界，就是决定阴影侧面的 silhouette edge。">
      <ArrowDefs />
      <text x="360" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>从 silhouette edge 挤出 shadow volume</text>
      <rect x="34" y="78" width="652" height="254" rx="18" fill={accent} fillOpacity="0.04" stroke={border} />
      <circle cx="112" cy="202" r="22" fill={warning} fillOpacity="0.22" stroke={warning} strokeWidth="3" />
      <text x="112" y="246" textAnchor="middle" fontSize="14" fill={warning}>point light</text>
      <Caster x={284} y={202} size={112} />
      <text x="284" y="286" textAnchor="middle" fontSize="14" fill={primary}>caster</text>
      <line x1="112" y1="202" x2="228" y2="146" stroke={secondary} strokeWidth="2" strokeDasharray="6 6" />
      <line x1="112" y1="202" x2="228" y2="258" stroke={secondary} strokeWidth="2" strokeDasharray="6 6" />
      <path d="M 228 146 L 424 94 L 424 310 L 228 258 Z" fill={danger} fillOpacity="0.16" stroke={danger} strokeWidth="3" />
      <line x1="228" y1="146" x2="228" y2="258" stroke={success} strokeWidth="8" />
      <text x="326" y="164" textAnchor="middle" fontSize="14" fontWeight="700" fill={danger}>shadow volume side</text>
      <text x="326" y="190" textAnchor="middle" fontSize="13" fill={secondary}>挤出到远处或有限光照范围</text>
      <rect x="448" y="128" width="178" height="52" rx="10" fill={accent} fillOpacity="0.1" stroke={accent} />
      <text x="537" y="150" textAnchor="middle" fontSize="13" fill={accent}>light cap</text>
      <text x="537" y="170" textAnchor="middle" fontSize="12" fill={secondary}>靠近光源的一端</text>
      <rect x="448" y="238" width="178" height="52" rx="10" fill={warning} fillOpacity="0.1" stroke={warning} />
      <text x="537" y="260" textAnchor="middle" fontSize="13" fill={warning}>dark cap</text>
      <text x="537" y="280" textAnchor="middle" fontSize="12" fill={secondary}>背面向无穷远</text>
    </Frame>
  );
}

export function GpuGemsCh09StencilParityDiagram() {
  return (
    <Frame ariaLabel="模板计数图：从可见像素沿负视线发射射线，进入与离开阴影体积时改变计数；计数为零表示未遮挡，非零表示阴影。" caption="stencil buffer 把每个像素的空间交点计数变成硬件计数：进入与离开相等就亮，不相等就暗。">
      <ArrowDefs />
      <text x="360" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>用进入数 − 离开数判断像素是否在体积内</text>
      <rect x="34" y="78" width="314" height="254" rx="18" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="2" />
      <text x="191" y="112" textAnchor="middle" fontSize="15" fontWeight="700" fill={success}>亮像素：计数归零</text>
      <line x1="74" y1="204" x2="306" y2="204" stroke={border} strokeWidth="3" />
      <Arrow x1={278} y1={204} x2={86} y2={204} stroke={success} />
      <circle cx="148" cy="204" r="10" fill={success} />
      <circle cx="228" cy="204" r="10" fill={success} />
      <text x="148" y="178" textAnchor="middle" fontSize="13" fill={success}>front −1</text>
      <text x="228" y="178" textAnchor="middle" fontSize="13" fill={success}>back +1</text>
      <text x="191" y="254" textAnchor="middle" fontSize="14" fill={primary}>−1 + 1 = 0</text>
      <text x="191" y="284" textAnchor="middle" fontSize="13" fill={secondary}>射线穿过一进一出</text>
      <rect x="372" y="78" width="314" height="254" rx="18" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="2" />
      <text x="529" y="112" textAnchor="middle" fontSize="15" fontWeight="700" fill={danger}>暗像素：计数非零</text>
      <line x1="412" y1="204" x2="644" y2="204" stroke={border} strokeWidth="3" />
      <Arrow x1={616} y1={204} x2={424} y2={204} stroke={danger} />
      <circle cx="478" cy="204" r="10" fill={danger} />
      <circle cx="544" cy="204" r="10" fill={danger} />
      <circle cx="606" cy="204" r="10" fill={danger} />
      <text x="478" y="178" textAnchor="middle" fontSize="13" fill={danger}>front −1</text>
      <text x="544" y="178" textAnchor="middle" fontSize="13" fill={danger}>back +1</text>
      <text x="606" y="178" textAnchor="middle" fontSize="13" fill={danger}>front −1</text>
      <text x="529" y="254" textAnchor="middle" fontSize="14" fill={primary}>−1 + 1 − 1 = −1</text>
      <text x="529" y="284" textAnchor="middle" fontSize="13" fill={secondary}>射线在体积内结束</text>
    </Frame>
  );
}

export function GpuGemsCh09OptimizationDiagram() {
  const items = [
    { x: 34, title: "方向光", color: success, detail: "uncapped", note: "省 light / dark cap" },
    { x: 258, title: "点光源", color: warning, detail: "finite volume", note: "限制到光照半径" },
    { x: 482, title: "屏幕范围", color: accent, detail: "XY + Z bounds", note: "少画无效片元" },
  ];
  return (
    <Frame ariaLabel="阴影体积优化图：方向光可以省略 caps 做 uncapped 渲染，点光源可用有限范围限制挤出，再用屏幕 XY 裁剪和 z-bounds 减少填充率。" caption="shadow volume 的主要瓶颈是填充率；先利用光源类型和范围缩小需要标记的像素，再考虑更复杂的几何优化。">
      <ArrowDefs />
      <text x="360" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>把无效的体积像素挡在门外</text>
      {items.map((item, index) => (
        <g key={item.title}>
          <rect x={item.x} y="82" width="204" height="244" rx="18" fill={item.color} fillOpacity="0.07" stroke={item.color} strokeWidth="2" />
          <text x={item.x + 102} y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={item.color}>{item.title}</text>
          <circle cx={item.x + 102} cy="202" r={index === 0 ? 62 : index === 1 ? 54 : 44} fill={item.color} fillOpacity="0.08" stroke={item.color} strokeWidth="3" strokeDasharray={index === 2 ? "8 6" : undefined} />
          {index === 0 && <path d={"M " + (item.x + 52) + " 230 L " + (item.x + 152) + " 174 L " + (item.x + 152) + " 230 Z"} fill={item.color} fillOpacity="0.32" />}
          {index === 1 && <><Caster x={item.x + 102} y={202} size={42} fill={item.color} /><line x1={item.x + 54} y1={202} x2={item.x + 150} y2={202} stroke={item.color} strokeWidth="3" strokeDasharray="6 6" /></>}
          {index === 2 && <><rect x={item.x + 62} y="156" width="80" height="92" fill={item.color} fillOpacity="0.2" stroke={item.color} strokeWidth="3" /><line x1={item.x + 62} y1="202" x2={item.x + 142} y2="202" stroke={item.color} strokeWidth="3" /></>}
          <text x={item.x + 102} y="278" textAnchor="middle" fontSize="14" fontWeight="700" fill={item.color}>{item.detail}</text>
          <text x={item.x + 102} y="302" textAnchor="middle" fontSize="13" fill={secondary}>{item.note}</text>
        </g>
      ))}
      <rect x="156" y="354" width="408" height="40" rx="12" fill={danger} fillOpacity="0.1" stroke={danger} />
      <text x="360" y="380" textAnchor="middle" fontSize="14" fill={primary}>优化目标：降低 fill rate，而不是改变阴影判定</text>
    </Frame>
  );
}

export function GpuGemsCh09ShadowVolumeLab() {
  const [lightType, setLightType] = useState<"point" | "directional">("point");
  const [countMode, setCountMode] = useState<"zfail" | "zpass">("zfail");
  const [lightRadius, setLightRadius] = useState(0.72);
  const [casterSize, setCasterSize] = useState(0.42);
  const [clip, setClip] = useState(0.68);
  const [showVolume, setShowVolume] = useState(true);
  const [debugFaces, setDebugFaces] = useState(false);

  const lightX = lightType === "point" ? 110 + lightRadius * 40 : 82;
  const lightY = lightType === "point" ? 132 : 96;
  const size = 40 + casterSize * 42;
  const casterX = 246;
  const casterY = 218;
  const rayTop = rounded(casterY - size / 2);
  const rayBottom = rounded(casterY + size / 2);
  const farX = rounded(438 + (1 - clip) * 50);
  const shadowOpacity = rounded(showVolume ? 0.22 + clip * 0.28 : 0.06);
  const stencilValue = countMode === "zfail" ? (showVolume ? 2 : 0) : showVolume ? 1 : 0;
  const reset = () => {
    setLightType("point");
    setCountMode("zfail");
    setLightRadius(0.72);
    setCasterSize(0.42);
    setClip(0.68);
    setShowVolume(true);
    setDebugFaces(false);
  };

  const label = "阴影体积预览：" + (lightType === "point" ? "点光源" : "方向光") + "，" + countMode + " 计数，遮挡物" + casterSize.toFixed(2) + "，裁剪" + clip.toFixed(2) + "，stencil 值" + stencilValue + "，" + (showVolume ? "显示" : "隐藏") + "体积，" + (debugFaces ? "调试面" : "正常面") + "。";
  return (
    <section data-visual-kind="gpu-gems-ch09-shadow-volume" className="not-prose my-6 rounded-card border border-border bg-elevated p-5" aria-label="阴影体积实验：切换点光源与方向光、z-fail 与 z-pass，调整遮挡物大小和裁剪范围，观察模板计数与填充范围">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">Shadow Volume Lab</p>
          <h4 className="mt-1 text-[15px] font-semibold text-primary">先猜：把光源改成方向光，哪些 cap 可以消失？</h4>
        </div>
        <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
      </div>
      <div className="grid gap-5 md:grid-cols-[1fr_240px] md:items-center">
        <svg viewBox="0 0 510 330" role="img" aria-label={label} className="w-full">
          <rect x="12" y="18" width="486" height="294" rx="18" fill="var(--surface)" stroke={border} />
          <text x="28" y="44" fontSize="14" fontWeight="700" fill={primary}>模板阴影视口</text>
          <text x="394" y="44" textAnchor="middle" fontSize="13" fill={stencilValue === 0 ? success : danger}>{stencilValue === 0 ? "亮：计数为零" : "暗：stencil " + stencilValue}</text>
          <line x1="32" y1="274" x2="478" y2="274" stroke={border} strokeWidth="3" />
          {showVolume && <path d={"M " + rounded(casterX - size / 2) + " " + rayTop + " L " + farX + " " + rounded(rayTop - 32) + " L " + farX + " " + rounded(rayBottom + 32) + " L " + rounded(casterX - size / 2) + " " + rayBottom + " Z"} fill={danger} fillOpacity={shadowOpacity} stroke={danger} strokeWidth="3" strokeDasharray="8 6" />}
          <Caster x={casterX} y={casterY} size={size} fill={warning} />
          <circle cx={lightX} cy={lightY} r="12" fill={warning} fillOpacity="0.22" stroke={warning} strokeWidth="3" />
          <text x={lightX} y={rounded(lightY - 22)} textAnchor="middle" fontSize="12" fill={warning}>{lightType === "point" ? "L" : "∞"}</text>
          {lightType === "point" ? <><line x1={lightX} y1={lightY} x2={rounded(casterX - size / 2)} y2={rayTop} stroke={secondary} strokeWidth="2" strokeDasharray="6 6" /><line x1={lightX} y1={lightY} x2={rounded(casterX - size / 2)} y2={rayBottom} stroke={secondary} strokeWidth="2" strokeDasharray="6 6" /></> : <Arrow x1={78} y1={lightY} x2={178} y2={lightY} stroke={warning} />}
          {debugFaces && <><line x1={rounded(casterX - size / 2)} y1={rayTop} x2={rounded(casterX + size / 2)} y2={rayTop} stroke={success} strokeWidth="5" /><line x1={rounded(casterX - size / 2)} y1={rayBottom} x2={rounded(casterX + size / 2)} y2={rayBottom} stroke={danger} strokeWidth="5" /></>}
          <text x="246" y="304" textAnchor="middle" fontSize="12" fill={secondary}>front/back stencil 操作 · shadow side 填充范围</text>
        </svg>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <button type="button" aria-pressed={lightType === "point"} onClick={() => setLightType("point")} className={"min-h-11 rounded-control border px-2 py-2 text-xs " + (lightType === "point" ? "border-warning text-primary" : "border-border text-secondary")}>point light</button>
            <button type="button" aria-pressed={lightType === "directional"} onClick={() => setLightType("directional")} className={"min-h-11 rounded-control border px-2 py-2 text-xs " + (lightType === "directional" ? "border-success text-primary" : "border-border text-secondary")}>directional</button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button type="button" aria-pressed={countMode === "zfail"} onClick={() => setCountMode("zfail")} className={"min-h-11 rounded-control border px-2 py-2 text-xs " + (countMode === "zfail" ? "border-accent text-primary" : "border-border text-secondary")}>z-fail</button>
            <button type="button" aria-pressed={countMode === "zpass"} onClick={() => setCountMode("zpass")} className={"min-h-11 rounded-control border px-2 py-2 text-xs " + (countMode === "zpass" ? "border-success text-primary" : "border-border text-secondary")}>z-pass</button>
          </div>
          <label className="block text-sm text-primary" htmlFor="shadow-light-radius">光照半径：{lightRadius.toFixed(2)}</label>
          <input id="shadow-light-radius" className="min-h-11 w-full accent-accent" type="range" min="0.2" max="1" step="0.05" value={lightRadius} onChange={(event) => setLightRadius(Number(event.target.value))} aria-label="调整点光源半径" />
          <label className="block text-sm text-primary" htmlFor="shadow-caster-size">遮挡物大小：{casterSize.toFixed(2)}</label>
          <input id="shadow-caster-size" className="min-h-11 w-full accent-accent" type="range" min="0.1" max="0.9" step="0.05" value={casterSize} onChange={(event) => setCasterSize(Number(event.target.value))} aria-label="调整阴影遮挡物大小" />
          <label className="block text-sm text-primary" htmlFor="shadow-clip">裁剪范围：{clip.toFixed(2)}</label>
          <input id="shadow-clip" className="min-h-11 w-full accent-accent" type="range" min="0.25" max="1" step="0.05" value={clip} onChange={(event) => setClip(Number(event.target.value))} aria-label="调整阴影体积裁剪范围" />
          <button type="button" aria-pressed={showVolume} onClick={() => setShowVolume((value) => !value)} className={"min-h-11 w-full rounded-control border px-3 py-2 text-sm " + (showVolume ? "border-danger text-primary" : "border-border text-secondary")}>{showVolume ? "隐藏 shadow volume" : "显示 shadow volume"}</button>
          <button type="button" aria-pressed={debugFaces} onClick={() => setDebugFaces((value) => !value)} className={"min-h-11 w-full rounded-control border px-3 py-2 text-sm " + (debugFaces ? "border-warning text-primary" : "border-border text-secondary")}>{debugFaces ? "关闭 front/back 调试" : "调试 front/back 面"}</button>
          <button type="button" aria-label="重置阴影体积实验" onClick={reset} className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-accent hover:text-primary">重置实验</button>
          <p className="text-xs text-secondary" role="status">观察：方向光可省 caps；缩小裁剪范围能减少体积覆盖的片元。</p>
        </div>
      </div>
    </section>
  );
}
