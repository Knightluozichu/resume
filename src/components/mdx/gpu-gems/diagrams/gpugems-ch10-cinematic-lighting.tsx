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
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth="3" markerEnd="url(#ch10-arrow)" />;
}

function ArrowDefs() {
  return (
    <defs>
      <marker id="ch10-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill={accent} />
      </marker>
      <linearGradient id="ch10-shadow-gradient" x1="0" x2="1">
        <stop offset="0" stopColor={danger} stopOpacity="0.48" />
        <stop offset="1" stopColor={danger} stopOpacity="0.08" />
      </linearGradient>
      <radialGradient id="ch10-warm-light">
        <stop offset="0" stopColor={warning} stopOpacity="0.42" />
        <stop offset="1" stopColor={warning} stopOpacity="0.02" />
      </radialGradient>
    </defs>
  );
}

export function GpuGemsCh10LightingControlDiagram() {
  const controls = [
    { x: 76, y: 116, title: "selection", detail: "谁被照亮", color: accent },
    { x: 76, y: 274, title: "color", detail: "色相与权重", color: warning },
    { x: 512, y: 116, title: "shaping", detail: "光斑边界", color: success },
    { x: 512, y: 274, title: "shadowing", detail: "暗部与投影", color: danger },
  ];
  return (
    <Frame ariaLabel="uberlight 控制面图：中心光源通过 selection、color、shaping、shadowing 和 texturing 五类控制影响画面。" caption="cinematic lighting 把物理正确性让位给叙事控制：先决定照谁，再决定光的颜色、形状、阴影与纹理。">
      <ArrowDefs />
      <text x="360" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>uberlight：一盏可编程的电影灯</text>
      <circle cx="360" cy="214" r="106" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="3" />
      <circle cx="360" cy="214" r="58" fill={accent} fillOpacity="0.16" stroke={accent} strokeWidth="3" />
      <path d="M 338 232 L 360 180 L 382 232 Z" fill={warning} fillOpacity="0.62" />
      <text x="360" y="208" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>uberlight</text>
      <text x="360" y="230" textAnchor="middle" fontSize="13" fill={secondary}>mood + story</text>
      {controls.map((control) => (
        <g key={control.title}>
          <rect x={control.x} y={control.y} width="132" height="60" rx="12" fill={control.color} fillOpacity="0.08" stroke={control.color} strokeWidth="2" />
          <text x={control.x + 66} y={control.y + 25} textAnchor="middle" fontSize="15" fontWeight="700" fill={control.color}>{control.title}</text>
          <text x={control.x + 66} y={control.y + 46} textAnchor="middle" fontSize="12" fill={secondary}>{control.detail}</text>
        </g>
      ))}
      <rect x="286" y="354" width="148" height="38" rx="10" fill={warning} fillOpacity="0.12" stroke={warning} />
      <text x="360" y="378" textAnchor="middle" fontSize="14" fill={primary}>texturing / cookie</text>
      <Arrow x1={208} y1={146} x2={296} y2={188} stroke={accent} />
      <Arrow x1={208} y1={304} x2={298} y2={240} stroke={warning} />
      <Arrow x1={512} y1={146} x2={424} y2={188} stroke={success} />
      <Arrow x1={512} y1={304} x2={424} y2={240} stroke={danger} />
      <Arrow x1={360} y1={320} x2={360} y2={354} stroke={warning} />
    </Frame>
  );
}

export function GpuGemsCh10BarnShapeDiagram() {
  return (
    <Frame ariaLabel="omni 与 barn light 形状对比：omni 从光源向四周均匀扩散，barn light 用截断金字塔和 superellipse 横截面限制成窗口光斑，并有 near、far 与 soft edge。" caption="barn light 是一个可被艺术指导的截断体积：宽高、软边、shear 都能把光斑塑造成窗户或门洞。">
      <ArrowDefs />
      <text x="360" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>从 omni 到 barn：把光限制成叙事形状</text>
      <rect x="28" y="64" width="206" height="288" rx="18" fill={accent} fillOpacity="0.05" stroke={border} />
      <text x="131" y="96" textAnchor="middle" fontSize="16" fontWeight="700" fill={accent}>omni light</text>
      <circle cx="131" cy="190" r="22" fill={warning} fillOpacity="0.3" stroke={warning} strokeWidth="3" />
      <path d="M 131 190 L 54 128 M 131 190 L 208 128 M 131 190 L 54 252 M 131 190 L 208 252" stroke={warning} strokeWidth="3" strokeDasharray="7 6" />
      <ellipse cx="131" cy="190" rx="84" ry="76" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="2" />
      <text x="131" y="290" textAnchor="middle" fontSize="13" fill={secondary}>径向衰减</text>
      <text x="131" y="314" textAnchor="middle" fontSize="13" fill={secondary}>没有方向性边界</text>
      <rect x="258" y="64" width="206" height="288" rx="18" fill={success} fillOpacity="0.05" stroke={border} />
      <text x="361" y="96" textAnchor="middle" fontSize="16" fontWeight="700" fill={success}>barn light</text>
      <circle cx="302" cy="208" r="16" fill={warning} fillOpacity="0.28" stroke={warning} strokeWidth="3" />
      <path d="M 302 208 L 330 126 L 432 112 L 432 296 L 330 278 Z" fill={success} fillOpacity="0.12" stroke={success} strokeWidth="3" />
      <path d="M 330 126 Q 380 112 432 112 M 330 278 Q 380 296 432 296" stroke={success} strokeWidth="5" fill="none" />
      <line x1="330" y1="126" x2="330" y2="278" stroke={warning} strokeWidth="3" strokeDasharray="7 5" />
      <text x="381" y="188" textAnchor="middle" fontSize="13" fill={primary}>superellipse</text>
      <text x="381" y="210" textAnchor="middle" fontSize="12" fill={secondary}>width / height</text>
      <text x="381" y="232" textAnchor="middle" fontSize="12" fill={secondary}>soft edge</text>
      <text x="361" y="326" textAnchor="middle" fontSize="13" fill={secondary}>near / far 截断</text>
      <rect x="488" y="64" width="204" height="288" rx="18" fill={warning} fillOpacity="0.05" stroke={border} />
      <text x="590" y="96" textAnchor="middle" fontSize="16" fontWeight="700" fill={warning}>window cheat</text>
      <path d="M 528 150 L 652 150 L 634 284 L 546 284 Z" fill={warning} fillOpacity="0.12" stroke={warning} strokeWidth="3" />
      <path d="M 544 168 L 636 168 L 624 266 L 556 266 Z" fill={surface} stroke={warning} strokeWidth="2" />
      <line x1="590" y1="176" x2="590" y2="258" stroke={warning} strokeWidth="3" strokeDasharray="6 6" />
      <text x="590" y="306" textAnchor="middle" fontSize="13" fill={primary}>shear → 像门窗</text>
      <text x="590" y="328" textAnchor="middle" fontSize="12" fill={secondary}>不必服从真实灯具</text>
    </Frame>
  );
}

export function GpuGemsCh10LightingPipelineDiagram() {
  const stages = [
    { x: 24, title: "surface", detail: "法线 / 材质", color: accent },
    { x: 166, title: "light space", detail: "坐标投影", color: warning },
    { x: 308, title: "shape", detail: "barn / distance", color: success },
    { x: 450, title: "shadow", detail: "map / cookie", color: danger },
    { x: 592, title: "output", detail: "A + D + S", color: accent },
  ];
  return (
    <Frame ariaLabel="uberlight 着色流程：表面属性进入光源空间坐标，经过形状与距离衰减、cookie 和 shadow map，最后独立组合 ambient、diffuse、specular。" caption="顶点阶段准备 light space 坐标，片元阶段把多个艺术控制项合并；shadow map 只是提供遮挡信息，阴影如何影响材质仍由 shader 决定。">
      <ArrowDefs />
      <text x="360" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>顶点准备坐标，片元组合光照贡献</text>
      {stages.map((stage, index) => (
        <g key={stage.title}>
          <rect x={stage.x} y="114" width="104" height="146" rx="16" fill={stage.color} fillOpacity="0.08" stroke={stage.color} strokeWidth="2" />
          <text x={stage.x + 52} y="148" textAnchor="middle" fontSize="15" fontWeight="700" fill={stage.color}>{stage.title}</text>
          <circle cx={stage.x + 52} cy="198" r="29" fill={stage.color} fillOpacity="0.16" stroke={stage.color} strokeWidth="3" />
          {index === 0 && <path d={"M " + (stage.x + 36) + " 208 L " + (stage.x + 52) + " 178 L " + (stage.x + 68) + " 208"} fill="none" stroke={stage.color} strokeWidth="4" />}
          {index === 1 && <><line x1={stage.x + 31} y1="214" x2={stage.x + 72} y2="180" stroke={stage.color} strokeWidth="3" /><circle cx={stage.x + 52} cy="198" r="6" fill={stage.color} /></>}
          {index === 2 && <path d={"M " + (stage.x + 30) + " 213 Q " + (stage.x + 52) + " 174 " + (stage.x + 74) + " 213"} fill="none" stroke={stage.color} strokeWidth="5" />}
          {index === 3 && <><rect x={stage.x + 31} y="180" width="42" height="36" fill={stage.color} fillOpacity="0.22" stroke={stage.color} /><path d={"M " + (stage.x + 31) + " 188 L " + (stage.x + 73) + " 208 M " + (stage.x + 73) + " 188 L " + (stage.x + 31) + " 208"} stroke={stage.color} strokeWidth="3" /></>}
          {index === 4 && <><path d={"M " + (stage.x + 30) + " 214 Q " + (stage.x + 52) + " 176 " + (stage.x + 74) + " 214"} fill="none" stroke={stage.color} strokeWidth="4" /><circle cx={stage.x + 52} cy="198" r="6" fill={warning} /></>}
          <text x={stage.x + 52} y="238" textAnchor="middle" fontSize="12" fill={secondary}>{stage.detail}</text>
          {index < stages.length - 1 && <Arrow x1={stage.x + 108} y1={198} x2={stage.x + 136} y2={198} stroke={stage.color} />}
        </g>
      ))}
      <rect x="122" y="310" width="476" height="52" rx="12" fill={warning} fillOpacity="0.1" stroke={warning} />
      <text x="360" y="332" textAnchor="middle" fontSize="14" fill={primary}>阴影里也可保留 diffuse，关闭 specular，或改变 shadow color</text>
      <text x="360" y="352" textAnchor="middle" fontSize="12" fill={secondary}>“被挡住”是输入，不是唯一的视觉结果</text>
    </Frame>
  );
}

export function GpuGemsCh10OptimizationDiagram() {
  return (
    <Frame ariaLabel="uberlight 优化图：左侧每个片元计算解析形状与距离函数，右侧把这些函数预烘焙到 lookup texture，静态场景可缓存并复用。" caption="把昂贵的解析函数换成纹理查表，能减少片元计算；镜头和对象不动时，还可以缓存 shaping map。">
      <ArrowDefs />
      <text x="360" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>同一条衰减曲线：解析计算 vs lookup texture</text>
      <rect x="28" y="64" width="306" height="286" rx="18" fill={danger} fillOpacity="0.05" stroke={border} />
      <text x="181" y="96" textAnchor="middle" fontSize="16" fontWeight="700" fill={danger}>analytic</text>
      <text x="181" y="118" textAnchor="middle" fontSize="12" fill={secondary}>每个片元重复函数</text>
      <line x1="70" y1="294" x2="294" y2="294" stroke={border} strokeWidth="2" />
      <line x1="70" y1="150" x2="70" y2="294" stroke={border} strokeWidth="2" />
      <path d="M 72 160 C 124 164 132 188 164 214 C 196 240 224 270 292 292" fill="none" stroke={danger} strokeWidth="4" />
      <circle cx="108" cy="170" r="5" fill={danger} /><circle cx="156" cy="208" r="5" fill={danger} /><circle cx="214" cy="260" r="5" fill={danger} /><circle cx="274" cy="287" r="5" fill={danger} />
      <text x="181" y="326" textAnchor="middle" fontSize="13" fill={secondary}>shape + distance + cookie</text>
      <rect x="386" y="64" width="306" height="286" rx="18" fill={success} fillOpacity="0.05" stroke={border} />
      <text x="539" y="96" textAnchor="middle" fontSize="16" fontWeight="700" fill={success}>lookup map</text>
      <text x="539" y="118" textAnchor="middle" fontSize="12" fill={secondary}>预计算后一次采样</text>
      <line x1="428" y1="294" x2="652" y2="294" stroke={border} strokeWidth="2" />
      <line x1="428" y1="150" x2="428" y2="294" stroke={border} strokeWidth="2" />
      <path d="M 430 160 C 482 164 490 188 522 214 C 554 240 582 270 650 292" fill="none" stroke={success} strokeWidth="4" />
      <rect x="454" y="174" width="26" height="24" fill={success} fillOpacity="0.25" stroke={success} /><rect x="484" y="190" width="26" height="24" fill={success} fillOpacity="0.25" stroke={success} /><rect x="514" y="208" width="26" height="24" fill={success} fillOpacity="0.25" stroke={success} /><rect x="544" y="232" width="26" height="24" fill={success} fillOpacity="0.25" stroke={success} /><rect x="574" y="254" width="26" height="24" fill={success} fillOpacity="0.25" stroke={success} />
      <text x="539" y="326" textAnchor="middle" fontSize="13" fill={secondary}>静态镜头可缓存并复用</text>
      <Arrow x1={344} y1={207} x2={378} y2={207} stroke={warning} />
      <text x="360" y="188" textAnchor="middle" fontSize="12" fill={warning}>pre-bake</text>
    </Frame>
  );
}

export function GpuGemsCh10CinematicLightingLab() {
  const [lightMode, setLightMode] = useState<"omni" | "barn">("barn");
  const [lightIntensity, setLightIntensity] = useState(0.72);
  const [shapeSoftness, setShapeSoftness] = useState(0.52);
  const [shadowDensity, setShadowDensity] = useState(0.58);
  const [cookieDensity, setCookieDensity] = useState(0.34);
  const [shear, setShear] = useState(0.18);
  const [showSpecular, setShowSpecular] = useState(true);
  const [useLookup, setUseLookup] = useState(false);

  const shapeWidth = lightMode === "barn" ? 116 + (1 - shapeSoftness) * 42 : 198;
  const shapeHeight = lightMode === "barn" ? 86 + (1 - shapeSoftness) * 28 : 156;
  const lightX = 142;
  const lightY = 116;
  const subjectX = 350;
  const subjectY = 214;
  const shadowX = 454 + shear * 40;
  const glowOpacity = rounded(0.1 + lightIntensity * 0.28);
  const shadowOpacity = rounded(0.1 + shadowDensity * 0.48);
  const cookieOpacity = rounded(cookieDensity * 0.42);
  const specularOpacity = showSpecular ? rounded(0.22 + lightIntensity * 0.34) : 0;
  const reset = () => {
    setLightMode("barn");
    setLightIntensity(0.72);
    setShapeSoftness(0.52);
    setShadowDensity(0.58);
    setCookieDensity(0.34);
    setShear(0.18);
    setShowSpecular(true);
    setUseLookup(false);
  };
  const label = "电影光照实验：当前为 " + lightMode + " 光，强度 " + lightIntensity.toFixed(2) + "，软边 " + shapeSoftness.toFixed(2) + "，阴影密度 " + shadowDensity.toFixed(2) + "，cookie 密度 " + cookieDensity.toFixed(2) + "，" + (showSpecular ? "保留" : "关闭") + "高光，使用" + (useLookup ? "lookup texture" : "解析函数") + "。";

  return (
    <section data-visual-kind="gpu-gems-ch10-cinematic-lighting" className="not-prose my-6 rounded-card border border-border bg-elevated p-5" aria-label="电影光照实验：切换 omni 与 barn 光，调整光强、软边、阴影、cookie 和 shear，观察同一套 uberlight 控制如何改变画面">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">Cinematic Lighting Lab</p>
          <h4 className="mt-1 text-[15px] font-semibold text-primary">先预测：硬化 barn 的 soft edge，会先改变边界还是中心亮度？</h4>
        </div>
        <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
      </div>
      <div className="grid gap-5 md:grid-cols-[1fr_248px] md:items-center">
        <svg viewBox="0 0 560 390" role="img" aria-label={label} className="w-full">
          <ArrowDefs />
          <rect x="12" y="18" width="536" height="354" rx="18" fill={surface} stroke={border} />
          <text x="32" y="46" fontSize="14" fontWeight="700" fill={primary}>screen space preview</text>
          <text x="512" y="46" textAnchor="end" fontSize="12" fill={useLookup ? success : warning}>{useLookup ? "cached lookup" : "analytic shaping"}</text>
          {lightMode === "omni" ? (
            <ellipse cx={lightX} cy={lightY} rx={shapeWidth} ry={shapeHeight} fill="url(#ch10-warm-light)" stroke={warning} strokeWidth="3" strokeDasharray="8 6" />
          ) : (
            <path d={"M " + lightX + " " + lightY + " L " + rounded(subjectX - shapeWidth) + " " + rounded(subjectY - shapeHeight) + " L " + rounded(subjectX + shapeWidth) + " " + rounded(subjectY - shapeHeight * 0.72) + " L " + rounded(subjectX + shapeWidth) + " " + rounded(subjectY + shapeHeight * 0.72) + " L " + rounded(subjectX - shapeWidth) + " " + rounded(subjectY + shapeHeight) + " Z"} fill="url(#ch10-warm-light)" stroke={warning} strokeWidth="3" strokeDasharray="8 6" />
          )}
          <circle cx={lightX} cy={lightY} r="17" fill={warning} fillOpacity="0.4" stroke={warning} strokeWidth="3" />
          <text x={lightX} y={rounded(lightY - 26)} textAnchor="middle" fontSize="13" fill={warning}>L</text>
          <circle cx={subjectX} cy={subjectY} r="64" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="3" />
          <path d={"M " + (subjectX - 34) + " " + (subjectY + 12) + " Q " + subjectX + " " + (subjectY - 34) + " " + (subjectX + 34) + " " + (subjectY + 12) + " Q " + subjectX + " " + (subjectY + 42) + " " + (subjectX - 34) + " " + (subjectY + 12)} fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="2" />
          <circle cx={subjectX - 19} cy={subjectY + 4} r="5" fill={primary} /><circle cx={subjectX + 19} cy={subjectY + 4} r="5" fill={primary} />
          <path d={"M " + (subjectX - 13) + " " + (subjectY + 28) + " Q " + subjectX + " " + (subjectY + 38) + " " + (subjectX + 13) + " " + (subjectY + 28)} fill="none" stroke={primary} strokeWidth="3" />
          <circle cx={subjectX - 30} cy={subjectY - 16} r="14" fill={warning} fillOpacity={glowOpacity} />
          {showSpecular && <circle cx={subjectX - 23} cy={subjectY - 25} r="8" fill={primary} fillOpacity={specularOpacity} />}
          <path d={"M " + (subjectX + 48) + " " + (subjectY - 56) + " L " + shadowX + " " + (subjectY - 36) + " L " + rounded(shadowX + 12) + " " + (subjectY + 76) + " L " + (subjectX + 36) + " " + (subjectY + 55) + " Z"} fill="url(#ch10-shadow-gradient)" fillOpacity={shadowOpacity} stroke={danger} strokeWidth="2" />
          {cookieDensity > 0.05 && <><circle cx="258" cy="146" r="7" fill={warning} fillOpacity={cookieOpacity} /><circle cx="281" cy="166" r="5" fill={warning} fillOpacity={cookieOpacity} /><circle cx="302" cy="138" r="4" fill={warning} fillOpacity={cookieOpacity} /><circle cx="322" cy="158" r="6" fill={warning} fillOpacity={cookieOpacity} /></>}
          <text x="350" y="318" textAnchor="middle" fontSize="13" fill={secondary}>subject：ambient + diffuse{showSpecular ? " + specular" : ""}</text>
          <text x="350" y="342" textAnchor="middle" fontSize="12" fill={secondary}>shadow 可改变密度 / 色相，不必简单变黑</text>
        </svg>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <button type="button" aria-pressed={lightMode === "omni"} onClick={() => setLightMode("omni")} className={"min-h-11 rounded-control border px-2 py-2 text-xs " + (lightMode === "omni" ? "border-warning text-primary" : "border-border text-secondary")}>omni</button>
            <button type="button" aria-pressed={lightMode === "barn"} onClick={() => setLightMode("barn")} className={"min-h-11 rounded-control border px-2 py-2 text-xs " + (lightMode === "barn" ? "border-success text-primary" : "border-border text-secondary")}>barn</button>
          </div>
          <label className="block text-sm text-primary" htmlFor="ch10-intensity">光强：{lightIntensity.toFixed(2)}</label>
          <input id="ch10-intensity" className="min-h-11 w-full accent-accent" type="range" min="0.15" max="1" step="0.05" value={lightIntensity} onChange={(event) => setLightIntensity(Number(event.target.value))} aria-label="调整电影光照强度" />
          <label className="block text-sm text-primary" htmlFor="ch10-softness">soft edge：{shapeSoftness.toFixed(2)}</label>
          <input id="ch10-softness" className="min-h-11 w-full accent-accent" type="range" min="0" max="1" step="0.05" value={shapeSoftness} onChange={(event) => setShapeSoftness(Number(event.target.value))} aria-label="调整 barn 光软边程度" />
          <label className="block text-sm text-primary" htmlFor="ch10-shadow-density">shadow density：{shadowDensity.toFixed(2)}</label>
          <input id="ch10-shadow-density" className="min-h-11 w-full accent-accent" type="range" min="0" max="1" step="0.05" value={shadowDensity} onChange={(event) => setShadowDensity(Number(event.target.value))} aria-label="调整阴影密度" />
          <label className="block text-sm text-primary" htmlFor="ch10-cookie-density">cookie：{cookieDensity.toFixed(2)}</label>
          <input id="ch10-cookie-density" className="min-h-11 w-full accent-accent" type="range" min="0" max="1" step="0.05" value={cookieDensity} onChange={(event) => setCookieDensity(Number(event.target.value))} aria-label="调整投影纹理 cookie 密度" />
          <label className="block text-sm text-primary" htmlFor="ch10-shear">window shear：{shear.toFixed(2)}</label>
          <input id="ch10-shear" className="min-h-11 w-full accent-accent" type="range" min="-1" max="1" step="0.1" value={shear} onChange={(event) => setShear(Number(event.target.value))} aria-label="调整窗口形状 shear" />
          <button type="button" aria-pressed={showSpecular} onClick={() => setShowSpecular((value) => !value)} className={"min-h-11 w-full rounded-control border px-3 py-2 text-sm " + (showSpecular ? "border-accent text-primary" : "border-border text-secondary")}>{showSpecular ? "关闭 specular" : "打开 specular"}</button>
          <button type="button" aria-pressed={useLookup} onClick={() => setUseLookup((value) => !value)} className={"min-h-11 w-full rounded-control border px-3 py-2 text-sm " + (useLookup ? "border-success text-primary" : "border-border text-secondary")}>{useLookup ? "使用 analytic shaping" : "切到 lookup texture"}</button>
          <button type="button" aria-label="重置电影光照实验" onClick={reset} className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-accent hover:text-primary">重置实验</button>
          <p className="text-xs text-secondary" role="status">观察：soft edge 主要改变边界，shadow density 改变暗部强度，lookup 只改变计算路径。</p>
        </div>
      </div>
    </section>
  );
}
