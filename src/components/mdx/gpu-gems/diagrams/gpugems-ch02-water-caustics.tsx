"use client";

import { useState, type ReactNode } from "react";

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

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
      markerEnd="url(#caustic-arrow)"
    />
  );
}

function ArrowDefs() {
  return (
    <defs>
      <marker
        id="caustic-arrow"
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

export function GpuGemsCh02CausticPipelineDiagram() {
  const stages = [
    ["① 地面底图", "先画普通海底", accent],
    ["② 焦散叠加", "细网格写入光照", warning],
    ["③ 水面反射", "最后画波面", success],
  ] as const;
  return (
    <Frame
      ariaLabel="水焦散三遍渲染管线：先绘制海底底图，再用细网格叠加焦散光照，最后绘制带反射的波面。"
      caption="本章的低成本核心：把复杂光线输运压缩成海底上的一次加法叠加。"
    >
      <ArrowDefs />
      <text x="360" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>
        三遍渲染：地面 → 焦散 → 水面
      </text>
      {stages.map(([title, detail, color], index) => {
        const x = 44 + index * 224;
        return (
          <g key={title}>
            <rect x={x} y="104" width="178" height="154" rx="16" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="2" />
            <circle cx={x + 28} cy="132" r="15" fill={color} fillOpacity="0.18" stroke={color} />
            <text x={x + 28} y="138" textAnchor="middle" fontSize="15" fontWeight="700" fill={color}>
              {index + 1}
            </text>
            <text x={x + 89} y="138" textAnchor="middle" fontSize="15" fontWeight="700" fill={primary}>
              {title.slice(2)}
            </text>
            <line x1={x + 20} y1="166" x2={x + 158} y2="166" stroke={border} />
            <text x={x + 89} y="198" textAnchor="middle" fontSize="13" fill={secondary}>
              {detail}
            </text>
            <text x={x + 89} y="226" textAnchor="middle" fontSize="13" fill={primary}>
              {index === 0 ? "GroundMap" : index === 1 ? "LightMap × GroundMap" : "WaterMesh"}
            </text>
          </g>
        );
      })}
      <Arrow x1={226} y1={181} x2={262} y2={181} />
      <Arrow x1={450} y1={181} x2={486} y2={181} />
      <rect x="108" y="308" width="504" height="54" rx="14" fill={danger} fillOpacity="0.1" stroke={danger} />
      <text x="360" y="341" textAnchor="middle" fontSize="16" fontWeight="700" fill={danger}>
        最终颜色 = 海底底色 + 焦散光照
      </text>
    </Frame>
  );
}

export function GpuGemsCh02RayPathDiagram() {
  return (
    <Frame
      ariaLabel="水焦散回溯光线图：从海底顶点垂直投影到波面，沿波面法线反向折射到太阳方向，再用入射方向接近垂直的程度估计亮度。"
      caption="不是追踪全部光子，而是从地面采样点反向寻找最可能贡献焦散的光线。"
    >
      <ArrowDefs />
      <rect x="40" y="56" width="640" height="264" rx="20" fill={accent} fillOpacity="0.05" stroke={border} />
      <text x="72" y="90" fontSize="15" fontWeight="700" fill={primary}>水面上方</text>
      <text x="72" y="300" fontSize="15" fontWeight="700" fill={primary}>海底平面 z = D</text>
      <path d="M 76 178 C 150 128 208 218 282 166 S 420 118 500 170 S 600 216 650 150" fill="none" stroke={success} strokeWidth="5" />
      <text x="522" y="122" fontSize="14" fontWeight="700" fill={success}>波面</text>
      <line x1="76" y1="276" x2="650" y2="276" stroke={warning} strokeWidth="4" />
      <circle cx="332" cy="276" r="8" fill={warning} />
      <line x1="332" y1="276" x2="332" y2="188" stroke={secondary} strokeWidth="3" strokeDasharray="8 7" />
      <text x="342" y="236" fontSize="13" fill={secondary}>垂直投影</text>
      <circle cx="332" cy="156" r="8" fill={success} />
      <line x1="332" y1="156" x2="430" y2="92" stroke={accent} strokeWidth="4" markerEnd="url(#caustic-arrow)" />
      <text x="382" y="110" fontSize="13" fill={accent}>反向折射光线</text>
      <line x1="332" y1="156" x2="250" y2="88" stroke={danger} strokeWidth="3" strokeDasharray="7 6" />
      <text x="180" y="100" fontSize="13" fill={danger}>波面法线</text>
      <path d="M 332 214 A 58 58 0 0 1 365 166" fill="none" stroke={warning} strokeWidth="3" />
      <text x="354" y="205" fontSize="14" fontWeight="700" fill={warning}>n = 1.33</text>
      <rect x="92" y="338" width="536" height="46" rx="12" fill={success} fillOpacity="0.1" stroke={success} />
      <text x="360" y="367" textAnchor="middle" fontSize="14" fill={primary}>
        越接近垂直入射，太阳盘贡献越集中，焦散越亮
      </text>
    </Frame>
  );
}

export function GpuGemsCh02ResolutionDiagram() {
  return (
    <Frame
      ariaLabel="焦散计算分辨率对比：屏幕空间只计算当前可见像素但工作量随视野变化，纹理空间固定渲染目标分辨率并可使用 mipmap 与各向异性过滤。"
      caption="屏幕空间节省不可见像素；纹理空间换来稳定成本和更容易过滤的焦散图。"
    >
      <text x="360" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>
        屏幕空间与纹理空间
      </text>
      <rect x="42" y="74" width="292" height="256" rx="18" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="2" />
      <rect x="386" y="74" width="292" height="256" rx="18" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="2" />
      <text x="188" y="108" textAnchor="middle" fontSize="16" fontWeight="700" fill={accent}>屏幕空间</text>
      <text x="532" y="108" textAnchor="middle" fontSize="16" fontWeight="700" fill={warning}>纹理空间</text>
      <rect x="82" y="134" width="212" height="112" rx="10" fill="var(--surface)" stroke={border} />
      <path d="M 102 220 C 136 160 178 226 214 174 S 264 198 286 150" fill="none" stroke={accent} strokeWidth="4" />
      <text x="188" y="272" textAnchor="middle" fontSize="13" fill={secondary}>只算当前可见像素</text>
      <rect x="426" y="134" width="212" height="112" rx="10" fill="var(--surface)" stroke={border} />
      {[0, 1, 2, 3, 4].map((column) =>
        [0, 1, 2].map((row) => (
          <rect key={`${column}-${row}`} x={444 + column * 36} y={150 + row * 28} width="22" height="16" rx="3" fill={warning} fillOpacity={0.18 + ((column + row) % 3) * 0.17} />
        )),
      )}
      <text x="532" y="272" textAnchor="middle" fontSize="13" fill={secondary}>固定目标，可生成 mipmap</text>
      <rect x="92" y="354" width="536" height="40" rx="10" fill={success} fillOpacity="0.1" stroke={success} />
      <text x="360" y="379" textAnchor="middle" fontSize="14" fill={primary}>选择依据：可见范围、目标分辨率、过滤与带宽预算</text>
    </Frame>
  );
}

export function GpuGemsCh02CausticsLab() {
  const [depth, setDepth] = useState(0.8);
  const [slope, setSlope] = useState(0.24);
  const [resolution, setResolution] = useState(0.65);
  const [showRays, setShowRays] = useState(false);

  const cells = Array.from({ length: 30 }, (_, index) => {
    const column = index % 6;
    const row = Math.floor(index / 6);
    const wave = Math.cos(column * 1.07 + row * 1.55 + slope * 4.8);
    const focus = Math.pow((wave + 1) / 2, 1.2 + slope * 2.4);
    const intensity = Math.max(0.08, Math.min(1, focus * (1.12 - depth * 0.35) * (0.65 + resolution * 0.55)));
    return { column, row, intensity };
  });

  const reset = () => {
    setDepth(0.8);
    setSlope(0.24);
    setResolution(0.65);
    setShowRays(false);
  };

  return (
    <section
      data-visual-kind="gpu-gems-ch02-caustics"
      className="not-prose my-6 rounded-card border border-border bg-elevated p-5"
      aria-label="水焦散参数实验：调节水深、波面坡度和焦散图分辨率，观察光斑集中程度"
    >
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">Caustics Lab</p>
          <h4 className="mt-1 text-[15px] font-semibold text-primary">先预测，再改变一个光线条件</h4>
        </div>
        <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
      </div>
      <div className="grid gap-5 md:grid-cols-[1fr_230px] md:items-center">
        <svg
          viewBox="0 0 510 300"
          role="img"
          aria-label={`当前水深${depth.toFixed(2)}，波面坡度${slope.toFixed(2)}，焦散图分辨率系数${resolution.toFixed(2)}；网格亮度表示海底光斑集中程度。`}
          className="w-full"
        >
          <rect x="24" y="34" width="462" height="224" rx="16" fill="var(--surface)" stroke={border} />
          <path d="M 42 94 C 102 58 146 122 204 84 S 304 58 354 96 S 432 120 468 76" fill="none" stroke={accent} strokeWidth="4" />
          <text x="42" y="66" fontSize="14" fontWeight="700" fill={primary}>波面</text>
          <line x1="42" y1="230" x2="468" y2="230" stroke={warning} strokeWidth="3" />
          {cells.map(({ column, row, intensity }) => (
            <rect
              key={`${column}-${row}`}
              x={54 + column * 68}
              y={136 + row * 28}
              width="52"
              height="20"
              rx="4"
              fill={warning}
              fillOpacity={intensity}
            />
          ))}
          <text x="42" y="278" fontSize="13" fill={secondary}>海底：颜色越亮表示候选光线越集中</text>
          {showRays && (
            <g>
              {[0, 1, 2, 3, 4].map((column) => (
                <line key={column} x1={82 + column * 82} y1="214" x2={110 + column * 72} y2="100" stroke={success} strokeWidth="2" strokeDasharray="6 5" />
              ))}
              <text x="350" y="124" fontSize="13" fontWeight="700" fill={success}>候选反向光线</text>
            </g>
          )}
        </svg>
        <div className="space-y-3">
          <label className="block text-sm text-primary" htmlFor="caustics-depth">
            水深：{depth.toFixed(2)}
          </label>
          <input id="caustics-depth" className="min-h-11 w-full accent-accent" type="range" min="0.2" max="1.8" step="0.1" value={depth} onChange={(event) => setDepth(Number(event.target.value))} aria-label="调整水深" />
          <label className="block text-sm text-primary" htmlFor="caustics-slope">
            波面坡度：{slope.toFixed(2)}
          </label>
          <input id="caustics-slope" className="min-h-11 w-full accent-accent" type="range" min="0.05" max="0.55" step="0.01" value={slope} onChange={(event) => setSlope(Number(event.target.value))} aria-label="调整波面坡度" />
          <label className="block text-sm text-primary" htmlFor="caustics-resolution">
            图分辨率：{resolution.toFixed(2)}
          </label>
          <input id="caustics-resolution" className="min-h-11 w-full accent-accent" type="range" min="0.25" max="1" step="0.05" value={resolution} onChange={(event) => setResolution(Number(event.target.value))} aria-label="调整焦散图分辨率" />
          <button
            type="button"
            aria-pressed={showRays}
            onClick={() => setShowRays((value) => !value)}
            className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
          >
            {showRays ? "隐藏候选光线" : "显示候选光线"}
          </button>
          <button
            type="button"
            aria-label="重置水焦散实验"
            onClick={reset}
            className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
          >
            重置实验
          </button>
          <p className="text-xs text-secondary" role="status">
            观察：坡度增加会让亮斑更集中；水越深，传输衰减越明显。
          </p>
        </div>
      </div>
    </section>
  );
}
