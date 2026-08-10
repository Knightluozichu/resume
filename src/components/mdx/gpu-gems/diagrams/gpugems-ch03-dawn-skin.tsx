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
      markerEnd="url(#dawn-arrow)"
    />
  );
}

function ArrowDefs() {
  return (
    <defs>
      <marker
        id="dawn-arrow"
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

export function GpuGemsCh03SkinLayerDiagram() {
  return (
    <Frame
      ariaLabel="皮肤分层图：表皮、真皮和皮下组织让光线进入、散射并从邻近位置离开，实时着色器用颜色与轮廓光近似这一现象。"
      caption="皮肤不像单层塑料：光进入表面后会在多层组织中散射，再从附近位置透出。"
    >
      <ArrowDefs />
      <text x="360" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>
        皮肤的光：进入、散射、透出
      </text>
      <rect x="98" y="88" width="524" height="246" rx="22" fill={accent} fillOpacity="0.05" stroke={border} />
      <rect x="132" y="122" width="456" height="42" rx="12" fill={warning} fillOpacity="0.22" stroke={warning} />
      <rect x="132" y="164" width="456" height="76" rx="12" fill={danger} fillOpacity="0.16" stroke={danger} />
      <rect x="132" y="240" width="456" height="60" rx="12" fill={success} fillOpacity="0.15" stroke={success} />
      <text x="360" y="149" textAnchor="middle" fontSize="15" fontWeight="700" fill={primary}>表皮：表面颜色与微细法线</text>
      <text x="360" y="208" textAnchor="middle" fontSize="15" fontWeight="700" fill={primary}>真皮：色彩变化与散射的主要近似</text>
      <text x="360" y="276" textAnchor="middle" fontSize="15" fontWeight="700" fill={primary}>皮下组织：更宽、更软的透光贡献</text>
      <Arrow x1={188} y1={72} x2={248} y2={124} stroke={accent} />
      <text x="118" y="68" fontSize="14" fontWeight="700" fill={accent}>入射光</text>
      <path d="M 232 164 C 274 214 330 222 376 194 S 466 178 508 244" fill="none" stroke={warning} strokeWidth="4" strokeDasharray="8 7" />
      <Arrow x1={504} y1={244} x2={552} y2={210} stroke={success} />
      <text x="520" y="178" fontSize="14" fontWeight="700" fill={success}>邻近位置透出</text>
      <rect x="170" y="352" width="380" height="42" rx="12" fill={danger} fillOpacity="0.1" stroke={danger} />
      <text x="360" y="379" textAnchor="middle" fontSize="14" fill={primary}>实时近似：颜色 + 遮蔽 + 轮廓方向的环境光</text>
    </Frame>
  );
}

export function GpuGemsCh03EnvironmentLightingDiagram() {
  const panels = [
    ["DiffuseCubeMap", "按表面法线取余弦加权环境光", accent],
    ["SpecularCubeMap", "按反射方向取粗糙度模糊高光", warning],
    ["HilightCubeMap", "按视线方向取背后的亮环境", success],
  ] as const;
  return (
    <Frame
      ariaLabel="Dawn 环境光图：HDR 全景被预计算为漫反射、镜面反射和背光高光立方体贴图，着色器分别按法线、反射向量和视线方向采样。"
      caption="把真实环境的亮度与颜色先编码进三类立方体贴图，运行时只需按方向查表。"
    >
      <ArrowDefs />
      <text x="360" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>
        HDR 环境 → 三类方向查表
      </text>
      <rect x="48" y="112" width="154" height="154" rx="18" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="2" />
      <circle cx="125" cy="176" r="42" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="3" />
      <path d="M 86 214 C 108 190 142 190 166 214" fill="none" stroke={accent} strokeWidth="3" />
      <text x="125" y="286" textAnchor="middle" fontSize="15" fontWeight="700" fill={primary}>HDR 全景</text>
      <text x="125" y="308" textAnchor="middle" fontSize="13" fill={secondary}>亮度与颜色</text>
      {panels.map(([title, detail, color], index) => {
        const x = 270 + index * 142;
        return (
          <g key={title}>
            <Arrow x1={202} y1={188} x2={x - 14} y2={188} stroke={color} />
            <rect x={x} y="104" width="122" height="172" rx="16" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="2" />
            <path d={`M ${x + 28} 142 L ${x + 94} 142 L ${x + 94} 208 L ${x + 28} 208 Z`} fill={color} fillOpacity="0.18" stroke={color} strokeWidth="2" />
            <path d={`M ${x + 28} 142 L ${x + 54} 122 L ${x + 120} 122 L ${x + 94} 142`} fill={color} fillOpacity="0.08" stroke={color} />
            <text x={x + 61} y="232" textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>{title.replace("CubeMap", "")}</text>
            <text x={x + 61} y="298" textAnchor="middle" fontSize="11" fill={secondary}>{detail}</text>
          </g>
        );
      })}
      <rect x="94" y="350" width="532" height="44" rx="12" fill={danger} fillOpacity="0.1" stroke={danger} />
      <text x="360" y="378" textAnchor="middle" fontSize="14" fill={primary}>优点：大范围亮度；缺点：环境贴图本身不包含 Dawn 的动态遮挡</text>
    </Frame>
  );
}

export function GpuGemsCh03ShaderDataflowDiagram() {
  const stages = [
    ["CPU 输入", "法线、切线、UV、骨骼权重", accent],
    ["顶点着色器", "法线空间、眼向量、轮廓项", warning],
    ["片段着色器", "法线贴图 + 立方体贴图", success],
    ["一次输出", "柔和皮肤与轮廓高光", danger],
  ] as const;
  return (
    <Frame
      ariaLabel="Dawn 皮肤着色器数据流：CPU 输入顶点属性，顶点着色器计算世界空间眼向量、切线到世界矩阵和轮廓项，片段着色器采样法线与环境立方体贴图，最后一次输出皮肤颜色。"
      caption="关键不是堆更多 pass，而是把昂贵且可插值的量放到顶点阶段，把细节留给片段阶段。"
    >
      <ArrowDefs />
      <text x="360" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>
        一次皮肤着色：顶点准备，片段合成
      </text>
      {stages.map(([title, detail, color], index) => {
        const x = 36 + index * 174;
        return (
          <g key={title}>
            <rect x={x} y="116" width="142" height="148" rx="16" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="2" />
            <circle cx={x + 24} cy="142" r="12" fill={color} fillOpacity="0.2" stroke={color} />
            <text x={x + 24} y="147" textAnchor="middle" fontSize="13" fontWeight="700" fill={color}>{index + 1}</text>
            <text x={x + 71} y="148" textAnchor="middle" fontSize="15" fontWeight="700" fill={primary}>{title}</text>
            <line x1={x + 18} y1="176" x2={x + 124} y2="176" stroke={border} />
            <text x={x + 71} y="210" textAnchor="middle" fontSize="13" fill={secondary}>{detail}</text>
            <text x={x + 71} y="236" textAnchor="middle" fontSize="13" fill={primary}>{index === 0 ? "a2vConnector" : index === 1 ? "v2fConnector" : index === 2 ? "nDotV / diffuse" : "RGBA + haze"}</text>
          </g>
        );
      })}
      <Arrow x1={178} y1={190} x2={208} y2={190} />
      <Arrow x1={352} y1={190} x2={382} y2={190} />
      <Arrow x1={526} y1={190} x2={556} y2={190} />
      <rect x="122" y="326" width="476" height="60" rx="14" fill={success} fillOpacity="0.1" stroke={success} />
      <text x="360" y="352" textAnchor="middle" fontSize="14" fontWeight="700" fill={primary}>WorldTanMatrix + SkinSilhouetteVec</text>
      <text x="360" y="374" textAnchor="middle" fontSize="13" fill={secondary}>把切线空间细节与环境光照接到同一坐标系</text>
    </Frame>
  );
}

export function GpuGemsCh03SkinShadingLab() {
  const [roughness, setRoughness] = useState(0.35);
  const [rim, setRim] = useState(0.45);
  const [occlusion, setOcclusion] = useState(0.72);
  const [showBump, setShowBump] = useState(false);

  const softLight = Math.max(0.18, 0.88 - occlusion * 0.42);
  const rimWidth = 24 + rim * 42;
  const highlightOpacity = 0.16 + (1 - roughness) * 0.52;
  const reset = () => {
    setRoughness(0.35);
    setRim(0.45);
    setOcclusion(0.72);
    setShowBump(false);
  };

  return (
    <section
      data-visual-kind="gpu-gems-ch03-dawn-skin"
      className="not-prose my-6 rounded-card border border-border bg-elevated p-5"
      aria-label="Dawn 皮肤着色实验：调整粗糙度、轮廓光和遮蔽项，观察皮肤柔和度与边缘光变化"
    >
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">Dawn Skin Lab</p>
          <h4 className="mt-1 text-[15px] font-semibold text-primary">先猜：高光变亮会让皮肤更真实吗？</h4>
        </div>
        <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
      </div>
      <div className="grid gap-5 md:grid-cols-[1fr_230px] md:items-center">
        <svg
          viewBox="0 0 510 320"
          role="img"
          aria-label={`当前粗糙度${roughness.toFixed(2)}、轮廓光${rim.toFixed(2)}、遮蔽项${occlusion.toFixed(2)}；高光强度${highlightOpacity.toFixed(2)}。`}
          className="w-full"
        >
          <defs>
            <radialGradient id="dawn-skin-fill" cx="62%" cy="34%" r="70%">
              <stop offset="0%" stopColor={warning} stopOpacity="0.74" />
              <stop offset="65%" stopColor={danger} stopOpacity={softLight} />
              <stop offset="100%" stopColor={accent} stopOpacity="0.18" />
            </radialGradient>
          </defs>
          <rect x="24" y="24" width="462" height="268" rx="18" fill="var(--surface)" stroke={border} />
          <ellipse cx="252" cy="150" rx="105" ry="118" fill="url(#dawn-skin-fill)" stroke={danger} strokeWidth="3" />
          <path d="M 210 134 Q 232 120 250 134 M 270 134 Q 288 120 310 134" fill="none" stroke={primary} strokeWidth="4" strokeLinecap="round" />
          <path d="M 253 136 Q 238 178 254 190 Q 270 178 257 136" fill="none" stroke={secondary} strokeWidth="3" />
          <path d="M 218 220 Q 253 242 288 220" fill="none" stroke={primary} strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="314" cy="93" rx={rimWidth} ry="18" fill={warning} fillOpacity={highlightOpacity} />
          <path d="M 158 188 Q 150 146 172 105" fill="none" stroke={success} strokeWidth={5 + rim * 4} strokeOpacity={0.2 + rim * 0.55} />
          {showBump && (
            <g stroke={accent} strokeWidth="2" strokeOpacity="0.65">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <line key={index} x1={180 + index * 22} y1={92 + (index % 2) * 36} x2={188 + index * 22} y2={96 + (index % 2) * 36} />
              ))}
              <text x="362" y="256" fontSize="13" fontWeight="700" fill={accent}>切线空间细节</text>
            </g>
          )}
          <text x="48" y="56" fontSize="14" fontWeight="700" fill={primary}>简化的皮肤响应</text>
          <text x="48" y="278" fontSize="13" fill={secondary}>柔和漫反射 + 边缘透光 + 受控高光</text>
        </svg>
        <div className="space-y-3">
          <label className="block text-sm text-primary" htmlFor="dawn-roughness">
            粗糙度：{roughness.toFixed(2)}
          </label>
          <input id="dawn-roughness" className="min-h-11 w-full accent-accent" type="range" min="0.05" max="0.9" step="0.05" value={roughness} onChange={(event) => setRoughness(Number(event.target.value))} aria-label="调整皮肤粗糙度" />
          <label className="block text-sm text-primary" htmlFor="dawn-rim">
            轮廓光：{rim.toFixed(2)}
          </label>
          <input id="dawn-rim" className="min-h-11 w-full accent-accent" type="range" min="0" max="1" step="0.05" value={rim} onChange={(event) => setRim(Number(event.target.value))} aria-label="调整轮廓光" />
          <label className="block text-sm text-primary" htmlFor="dawn-occlusion">
            遮蔽项：{occlusion.toFixed(2)}
          </label>
          <input id="dawn-occlusion" className="min-h-11 w-full accent-accent" type="range" min="0.1" max="1" step="0.05" value={occlusion} onChange={(event) => setOcclusion(Number(event.target.value))} aria-label="调整遮蔽项" />
          <button
            type="button"
            aria-pressed={showBump}
            onClick={() => setShowBump((value) => !value)}
            className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
          >
            {showBump ? "隐藏法线细节" : "显示法线细节"}
          </button>
          <button
            type="button"
            aria-label="重置 Dawn 皮肤着色实验"
            onClick={reset}
            className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
          >
            重置实验
          </button>
          <p className="text-xs text-secondary" role="status">
            观察：粗糙度只控制高光扩散；遮蔽项降低环境光，轮廓项负责边缘的柔和感。
          </p>
        </div>
      </div>
    </section>
  );
}
