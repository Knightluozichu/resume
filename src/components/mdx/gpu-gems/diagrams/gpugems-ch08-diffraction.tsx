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
      markerEnd="url(#diffraction-arrow)"
    />
  );
}

function ArrowDefs() {
  return (
    <defs>
      <marker
        id="diffraction-arrow"
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

function wavePath({
  x,
  y,
  width,
  amplitude,
  phase,
  invert = false,
}: {
  x: number;
  y: number;
  width: number;
  amplitude: number;
  phase: number;
  invert?: boolean;
}) {
  const points = Array.from({ length: 25 }, (_, index) => {
    const px = x + (width * index) / 24;
    const py = y + Math.sin((index / 24) * Math.PI * 4 + phase) * amplitude * (invert ? -1 : 1);
    return `${rounded(px)} ${rounded(py)}`;
  });
  return `M ${points.join(" L ")}`;
}

export function GpuGemsCh08WaveInterferenceDiagram() {
  return (
    <Frame
      ariaLabel="波干涉图：上方两列同相波峰叠加成更大振幅，下方两列反相波峰与波谷相消成接近零的振幅。"
      caption="衍射不是把亮度简单相加：同相增强，反相抵消，观察到的颜色来自许多波长的干涉结果。"
    >
      <ArrowDefs />
      <text x="360" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>
        先看一个波：相位决定增强还是抵消
      </text>
      <rect x="34" y="68" width="652" height="142" rx="18" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="2" />
      <text x="72" y="102" fontSize="15" fontWeight="700" fill={success}>同相：波峰遇到波峰</text>
      <path d={wavePath({ x: 72, y: 144, width: 420, amplitude: 20, phase: 0 })} fill="none" stroke={accent} strokeWidth="3" />
      <path d={wavePath({ x: 72, y: 144, width: 420, amplitude: 20, phase: 0 })} fill="none" stroke={warning} strokeWidth="3" strokeDasharray="8 6" opacity="0.72" />
      <path d={wavePath({ x: 72, y: 144, width: 420, amplitude: 40, phase: 0 })} fill="none" stroke={success} strokeWidth="4" />
      <text x="548" y="151" fontSize="14" fill={success}>振幅更大</text>
      <rect x="34" y="232" width="652" height="142" rx="18" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="2" />
      <text x="72" y="266" fontSize="15" fontWeight="700" fill={danger}>反相：波峰遇到波谷</text>
      <path d={wavePath({ x: 72, y: 308, width: 420, amplitude: 20, phase: 0 })} fill="none" stroke={accent} strokeWidth="3" />
      <path d={wavePath({ x: 72, y: 308, width: 420, amplitude: 20, phase: Math.PI })} fill="none" stroke={warning} strokeWidth="3" strokeDasharray="8 6" opacity="0.72" />
      <path d={wavePath({ x: 72, y: 308, width: 420, amplitude: 0, phase: 0 })} fill="none" stroke={danger} strokeWidth="4" />
      <text x="548" y="315" fontSize="14" fill={danger}>接近抵消</text>
    </Frame>
  );
}

export function GpuGemsCh08GratingGeometryDiagram() {
  return (
    <Frame
      ariaLabel="衍射光栅几何图：平行窄反射带间距为 d，入射光与观察方向形成 halfway vector，局部 tangent 投影得到 u，u 与 d 决定哪些波长同相。"
      caption="把微观条纹压缩成局部切线方向与间距 d；shader 只需从光线几何得到 u，就能挑出增强的波长。"
    >
      <ArrowDefs />
      <text x="360" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>
        从光栅几何得到可计算的 u
      </text>
      <rect x="42" y="82" width="270" height="246" rx="18" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="2" />
      <text x="177" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>diffraction grating</text>
      {[0, 1, 2, 3, 4, 5, 6].map((index) => (
        <line key={index} x1={86 + index * 27} y1="168" x2={86 + index * 27} y2="284" stroke={index % 2 === 0 ? accent : warning} strokeWidth="7" />
      ))}
      <Arrow x1={86} y1={148} x2={135} y2={120} stroke={warning} />
      <Arrow x1={248} y1={120} x2={292} y2={148} stroke={success} />
      <text x="76" y="306" fontSize="13" fill={warning}>入射方向</text>
      <text x="214" y="306" fontSize="13" fill={success}>观察方向</text>
      <text x="177" y="350" textAnchor="middle" fontSize="13" fill={secondary}>相邻反射带相隔 d</text>
      <Arrow x1={350} y1={200} x2={398} y2={200} />
      <rect x="418" y="82" width="260" height="246" rx="18" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="2" />
      <text x="548" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={success}>vertex program</text>
      <text x="448" y="160" fontSize="14" fill={primary}>H = L + V</text>
      <text x="448" y="196" fontSize="14" fill={primary}>u = dot(T, H) × d</text>
      <text x="448" y="232" fontSize="14" fill={primary}>λ = |u|d / n</text>
      <text x="448" y="268" fontSize="14" fill={primary}>C(λ) → RGB</text>
      <rect x="448" y="290" width="200" height="24" rx="8" fill={warning} fillOpacity="0.12" stroke={warning} />
      <text x="548" y="307" textAnchor="middle" fontSize="13" fill={warning}>T 是顶点必须提供的切线</text>
    </Frame>
  );
}

export function GpuGemsCh08RainbowSumDiagram() {
  const colors = [accent, warning, success, danger, accent, warning, success];
  return (
    <Frame
      ariaLabel="彩虹波长求和图：固定展开 n 等于 1 到 7 的有限样本，每个样本通过彩虹映射产生颜色，累加后与各向异性高光相加。"
      caption="原书把可见波长求和近似成固定 8 项以内的循环，并用三个 bump 函数拼出彩虹映射。"
    >
      <ArrowDefs />
      <text x="360" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>
        有限样本 → 彩虹映射 → 最终颜色
      </text>
      <rect x="36" y="82" width="250" height="244" rx="18" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="2" />
      <text x="161" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={accent}>n = 1 … 7</text>
      {colors.map((color, index) => (
        <g key={index}>
          <rect x="78" y={140 + index * 22} width={40 + index * 13} height="12" rx="5" fill={color} fillOpacity="0.75" />
          <text x="210" y={151 + index * 22} fontSize="13" fill={secondary}>λ{index + 1}</text>
        </g>
      ))}
      <Arrow x1={304} y1={204} x2={352} y2={204} />
      <rect x="372" y="82" width="312" height="244" rx="18" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="2" />
      <text x="528" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={success}>C(λ) + anis</text>
      <path d="M 424 240 C 448 174 472 174 496 240 S 544 306 568 240 S 616 174 640 240" fill="none" stroke={accent} strokeWidth="8" />
      <circle cx="528" cy="240" r="30" fill={warning} fillOpacity="0.18" stroke={warning} strokeWidth="3" />
      <text x="528" y="245" textAnchor="middle" fontSize="13" fill={primary}>颜色总和</text>
      <text x="528" y="154" textAnchor="middle" fontSize="13" fill={secondary}>u = 0 时叠加各向异性高光</text>
      <rect x="164" y="354" width="392" height="40" rx="12" fill={warning} fillOpacity="0.1" stroke={warning} />
      <text x="360" y="380" textAnchor="middle" fontSize="14" fill={primary}>固定循环换取可展开、可实时的 shader 成本</text>
    </Frame>
  );
}

export function GpuGemsCh08DiffractionLab() {
  const [spacing, setSpacing] = useState(0.62);
  const [viewU, setViewU] = useState(0.28);
  const [roughness, setRoughness] = useState(0.42);
  const [samples, setSamples] = useState(6);
  const [showAnisotropic, setShowAnisotropic] = useState(true);
  const [errorMode, setErrorMode] = useState(false);

  const highlight = rounded(Math.exp(-Math.pow((viewU * spacing) / Math.max(0.08, roughness), 2)));
  const ringCount = Math.max(3, Math.min(8, samples));
  const ringColors = [accent, warning, success, danger, accent, warning, success, danger];
  const reset = () => {
    setSpacing(0.62);
    setViewU(0.28);
    setRoughness(0.42);
    setSamples(6);
    setShowAnisotropic(true);
    setErrorMode(false);
  };

  return (
    <section
      data-visual-kind="gpu-gems-ch08-diffraction"
      className="not-prose my-6 rounded-card border border-border bg-elevated p-5"
      aria-label="衍射实验：调整光栅间距、视角投影、粗糙度和采样数量，观察彩色衍射与各向异性高光"
    >
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">Diffraction Lab</p>
          <h4 className="mt-1 text-[15px] font-semibold text-primary">先猜：把条纹间距调大，彩色亮带会变宽还是变窄？</h4>
        </div>
        <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
      </div>
      <div className="grid gap-5 md:grid-cols-[1fr_240px] md:items-center">
        <svg
          viewBox="0 0 510 330"
          role="img"
          aria-label={`衍射盘预览：光栅间距${spacing.toFixed(2)}，u${viewU.toFixed(2)}，粗糙度${roughness.toFixed(2)}，${samples}个波长样本，${showAnisotropic ? "显示" : "隐藏"}各向异性高光，${errorMode ? "错误彩虹映射" : "正常彩虹映射"}。`}
          className="w-full"
        >
          <rect x="12" y="18" width="486" height="294" rx="18" fill="var(--surface)" stroke={border} />
          <text x="28" y="44" fontSize="14" fontWeight="700" fill={primary}>微结构表面预览</text>
          <text x="390" y="44" textAnchor="middle" fontSize="13" fill={errorMode ? danger : success}>{errorMode ? "错误：只看单一波长" : `样本 ${samples} 项`}</text>
          <circle cx="180" cy="174" r="92" fill="var(--bg)" stroke={border} strokeWidth="3" />
          {Array.from({ length: ringCount }, (_, index) => {
            const radius = 24 + index * (62 / Math.max(1, ringCount - 1));
            const color = errorMode ? accent : ringColors[index];
            return <circle key={index} cx="180" cy="174" r={rounded(radius)} fill="none" stroke={color} strokeOpacity={rounded(0.36 + highlight * 0.42)} strokeWidth={rounded(5 + spacing * 3)} />;
          })}
          {showAnisotropic && <circle cx="180" cy="174" r={rounded(18 + roughness * 10)} fill={warning} fillOpacity={rounded(0.2 + highlight * 0.52)} stroke={warning} strokeWidth="3" />}
          <line x1="88" y1="174" x2="272" y2="174" stroke={accent} strokeOpacity="0.22" strokeDasharray="6 6" />
          <text x="180" y="292" textAnchor="middle" fontSize="13" fill={secondary}>u = {viewU.toFixed(2)} · d = {spacing.toFixed(2)} · highlight = {highlight.toFixed(2)}</text>
          <rect x="326" y="88" width="142" height="164" rx="14" fill={accent} fillOpacity="0.06" stroke={accent} />
          <text x="397" y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill={accent}>波长样本</text>
          {Array.from({ length: ringCount }, (_, index) => (
            <g key={index}>
              <rect x="344" y={132 + index * 17} width={rounded(34 + (index + 1) * 9)} height="9" rx="4" fill={errorMode ? accent : ringColors[index]} fillOpacity={0.78} />
              <text x="447" y={141 + index * 17} fontSize="12" fill={secondary}>n={index + 1}</text>
            </g>
          ))}
          <text x="397" y="238" textAnchor="middle" fontSize="12" fill={secondary}>C(|u|d/n)</text>
        </svg>
        <div className="space-y-3">
          <label className="block text-sm text-primary" htmlFor="diffraction-spacing">条纹间距 d：{spacing.toFixed(2)}</label>
          <input id="diffraction-spacing" className="min-h-11 w-full accent-accent" type="range" min="0.15" max="1" step="0.05" value={spacing} onChange={(event) => setSpacing(Number(event.target.value))} aria-label="调整衍射条纹间距" />
          <label className="block text-sm text-primary" htmlFor="diffraction-u">视角投影 u：{viewU.toFixed(2)}</label>
          <input id="diffraction-u" className="min-h-11 w-full accent-accent" type="range" min="-1" max="1" step="0.05" value={viewU} onChange={(event) => setViewU(Number(event.target.value))} aria-label="调整衍射视角投影" />
          <label className="block text-sm text-primary" htmlFor="diffraction-roughness">高光粗糙度：{roughness.toFixed(2)}</label>
          <input id="diffraction-roughness" className="min-h-11 w-full accent-accent" type="range" min="0.1" max="1" step="0.05" value={roughness} onChange={(event) => setRoughness(Number(event.target.value))} aria-label="调整各向异性高光粗糙度" />
          <label className="block text-sm text-primary" htmlFor="diffraction-samples">波长样本：{samples}</label>
          <input id="diffraction-samples" className="min-h-11 w-full accent-accent" type="range" min="3" max="8" step="1" value={samples} onChange={(event) => setSamples(Number(event.target.value))} aria-label="调整衍射波长样本数量" />
          <button type="button" aria-pressed={showAnisotropic} onClick={() => setShowAnisotropic((value) => !value)} className={`min-h-11 w-full rounded-control border px-3 py-2 text-sm ${showAnisotropic ? "border-success text-primary" : "border-border text-secondary"}`}>{showAnisotropic ? "隐藏各向异性高光" : "显示各向异性高光"}</button>
          <button type="button" aria-pressed={errorMode} onClick={() => setErrorMode((value) => !value)} className={`min-h-11 w-full rounded-control border px-3 py-2 text-sm ${errorMode ? "border-danger text-primary" : "border-border text-secondary"}`}>{errorMode ? "关闭单波长误区" : "注入单波长误区"}</button>
          <button type="button" aria-label="重置衍射实验" onClick={reset} className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-accent hover:text-primary">重置实验</button>
          <p className="text-xs text-secondary" role="status">观察：固定样本数是可展开 shader 的近似；高光是 u 接近零时的另一条贡献。</p>
        </div>
      </div>
    </section>
  );
}
