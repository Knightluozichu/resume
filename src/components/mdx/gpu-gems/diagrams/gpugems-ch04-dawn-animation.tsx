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
      markerEnd="url(#dawn-animation-arrow)"
    />
  );
}

function ArrowDefs() {
  return (
    <defs>
      <marker
        id="dawn-animation-arrow"
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

export function GpuGemsCh04AnimationDecisionDiagram() {
  return (
    <Frame
      ariaLabel="Dawn 动画计算位置选择图：GPU 适合常规每帧变形和重复绘制，CPU 适合需要遍历变形后网格的轮廓阴影或顶点受限场景，最终按对象和应用决定。"
      caption="把网格变形放到 GPU 是默认方向，但阴影轮廓和多次重复绘制会改变成本模型。"
    >
      <ArrowDefs />
      <text x="360" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>
        网格变形放 CPU 还是 GPU？
      </text>
      <rect x="46" y="94" width="258" height="224" rx="20" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="2" />
      <rect x="416" y="94" width="258" height="224" rx="20" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="2" />
      <text x="175" y="128" textAnchor="middle" fontSize="17" fontWeight="700" fill={accent}>GPU 顶点阶段</text>
      <text x="545" y="128" textAnchor="middle" fontSize="17" fontWeight="700" fill={warning}>CPU 变形</text>
      <path d="M 94 184 L 148 156 L 202 184 L 148 212 Z" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="2" />
      <path d="M 518 184 L 572 156 L 626 184 L 572 212 Z" fill={warning} fillOpacity="0.2" stroke={warning} strokeWidth="2" />
      <Arrow x1={148} y1={222} x2={148} y2={266} stroke={accent} />
      <Arrow x1={572} y1={222} x2={572} y2={266} stroke={warning} />
      <text x="175" y="252" textAnchor="middle" fontSize="13" fill={secondary}>重复绘制、卸载 CPU</text>
      <text x="545" y="252" textAnchor="middle" fontSize="13" fill={secondary}>需遍历网格、避免顶点瓶颈</text>
      <text x="175" y="286" textAnchor="middle" fontSize="13" fill={primary}>蒙皮 + morph target</text>
      <text x="545" y="286" textAnchor="middle" fontSize="13" fill={primary}>轮廓边、阴影体、特殊 pass</text>
      <rect x="140" y="350" width="440" height="44" rx="12" fill={success} fillOpacity="0.1" stroke={success} />
      <text x="360" y="378" textAnchor="middle" fontSize="14" fill={primary}>按应用、对象与绘制次数测量，而不是凭口号选择</text>
    </Frame>
  );
}

export function GpuGemsCh04MorphTargetDiagram() {
  return (
    <Frame
      ariaLabel="Dawn morph target 图：中性头部加上开心、皱眉和眉毛等差分向量，通过权重叠加得到表情；最多保持五个活跃目标以适应顶点输入寄存器。"
      caption="把表情存成相对中性姿态的差分向量，运行时按权重叠加；目标数量多不等于同时激活得多。"
    >
      <ArrowDefs />
      <text x="360" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>
        Neutral + 加权差分 = 表情
      </text>
      <g>
        <circle cx="112" cy="186" r="56" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="3" />
        <path d="M 84 186 Q 112 168 140 186" fill="none" stroke={primary} strokeWidth="4" />
        <path d="M 88 214 Q 112 204 136 214" fill="none" stroke={primary} strokeWidth="3" />
        <text x="112" y="278" textAnchor="middle" fontSize="15" fontWeight="700" fill={primary}>中性头部</text>
        <text x="112" y="302" textAnchor="middle" fontSize="13" fill={secondary}>position + normal</text>
      </g>
      <Arrow x1={174} y1={186} x2={242} y2={186} />
      <g>
        <rect x="244" y="102" width="166" height="188" rx="18" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="2" />
        <text x="327" y="132" textAnchor="middle" fontSize="15" fontWeight="700" fill={warning}>活跃差分</text>
        {["happy × 0.8", "brow × 1.0", "smirk × 0.4", "ear × 0.2"].map((label, index) => (
          <g key={label}>
            <rect x="268" y={152 + index * 28} width="118" height="18" rx="5" fill={warning} fillOpacity={0.12 + index * 0.05} />
            <text x="327" y={166 + index * 28} textAnchor="middle" fontSize="12" fill={primary}>{label}</text>
          </g>
        ))}
        <text x="327" y="282" textAnchor="middle" fontSize="12" fill={secondary}>最多五个同时有效</text>
      </g>
      <Arrow x1={418} y1={186} x2={486} y2={186} />
      <g>
        <circle cx="562" cy="186" r="56" fill={success} fillOpacity="0.13" stroke={success} strokeWidth="3" />
        <path d="M 534 178 Q 552 164 570 178 M 574 178 Q 592 164 610 178" fill="none" stroke={primary} strokeWidth="4" />
        <path d="M 536 210 Q 562 230 588 210" fill="none" stroke={primary} strokeWidth="4" />
        <text x="562" y="278" textAnchor="middle" fontSize="15" fontWeight="700" fill={primary}>目标表情</text>
        <text x="562" y="302" textAnchor="middle" fontSize="13" fill={secondary}>position + normal + occlusion</text>
      </g>
      <rect x="176" y="350" width="368" height="44" rx="12" fill={danger} fillOpacity="0.1" stroke={danger} />
      <text x="360" y="378" textAnchor="middle" fontSize="14" fill={primary}>每个目标存差分，`.w` 通道还能承载遮蔽差分</text>
    </Frame>
  );
}

export function GpuGemsCh04SkinningDiagram() {
  const bones = [
    ["肩", 132, accent],
    ["肘", 282, warning],
    ["腕", 432, success],
  ] as const;
  return (
    <Frame
      ariaLabel="四骨骼蒙皮图：一个网格顶点由肩、肘、腕等骨骼矩阵按权重变换后相加，权重和为一；同样的变换还要作用于法线和切线。"
      caption="蒙皮不是选一根骨骼，而是让多个关节矩阵按权重共同决定顶点位置。"
    >
      <ArrowDefs />
      <text x="360" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill={primary}>
        四骨骼加权蒙皮
      </text>
      <line x1="110" y1="204" x2="480" y2="204" stroke={border} strokeWidth="8" strokeLinecap="round" />
      {bones.map(([label, x, color]) => (
        <g key={label}>
          <circle cx={x} cy="204" r="24" fill={color} fillOpacity="0.18" stroke={color} strokeWidth="3" />
          <circle cx={x} cy="204" r="7" fill={color} />
          <text x={x} y="154" textAnchor="middle" fontSize="15" fontWeight="700" fill={primary}>{label}骨骼</text>
          <text x={x} y="258" textAnchor="middle" fontSize="13" fill={secondary}>{label === "肩" ? "0.25" : label === "肘" ? "0.50" : "0.25"}</text>
          <Arrow x1={x} y1={174} x2={x} y2={174} stroke={color} />
        </g>
      ))}
      <circle cx="560" cy="204" r="13" fill={danger} />
      <Arrow x1={480} y1={204} x2={544} y2={204} stroke={danger} />
      <text x="560" y="154" textAnchor="middle" fontSize="15" fontWeight="700" fill={primary}>顶点</text>
      <text x="560" y="258" textAnchor="middle" fontSize="13" fill={secondary}>Σ weight = 1</text>
      <rect x="90" y="304" width="540" height="76" rx="16" fill={success} fillOpacity="0.1" stroke={success} />
      <text x="360" y="333" textAnchor="middle" fontSize="14" fontWeight="700" fill={primary}>p′ = Σ wᵢ · (Mᵢ · p)</text>
      <text x="360" y="359" textAnchor="middle" fontSize="13" fill={secondary}>位置、法线、双切线必须保持同一姿态，否则光照会滑脱</text>
    </Frame>
  );
}

export function GpuGemsCh04AnimationLab() {
  const [smile, setSmile] = useState(0.65);
  const [brow, setBrow] = useState(0.3);
  const [boneMix, setBoneMix] = useState(0.5);
  const [showWeights, setShowWeights] = useState(false);

  const mouthLift = -8 - smile * 20;
  const browLift = 12 - brow * 20;
  const elbowY = 188 + boneMix * 38;
  const reset = () => {
    setSmile(0.65);
    setBrow(0.3);
    setBoneMix(0.5);
    setShowWeights(false);
  };

  return (
    <section
      data-visual-kind="gpu-gems-ch04-dawn-animation"
      className="not-prose my-6 rounded-card border border-border bg-elevated p-5"
      aria-label="Dawn 动画参数实验：调整笑容、眉毛和肘部骨骼混合，观察 morph target 与蒙皮的结果"
    >
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">Dawn Animation Lab</p>
          <h4 className="mt-1 text-[15px] font-semibold text-primary">先猜：表情差分和骨骼权重谁在改变什么？</h4>
        </div>
        <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
      </div>
      <div className="grid gap-5 md:grid-cols-[1fr_230px] md:items-center">
        <svg
          viewBox="0 0 510 320"
          role="img"
          aria-label={`笑容差分${smile.toFixed(2)}，眉毛差分${brow.toFixed(2)}，肘部骨骼混合${boneMix.toFixed(2)}。`}
          className="w-full"
        >
          <rect x="24" y="24" width="462" height="268" rx="18" fill="var(--surface)" stroke={border} />
          <circle cx="178" cy="146" r="84" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="3" />
          <path d={`M 130 ${122 + browLift} Q 154 ${108 + browLift} 176 ${122 + browLift} M 184 ${122 + browLift} Q 206 ${108 + browLift} 228 ${122 + browLift}`} fill="none" stroke={primary} strokeWidth="5" strokeLinecap="round" />
          <circle cx="155" cy="142" r="6" fill={primary} />
          <circle cx="204" cy="142" r="6" fill={primary} />
          <path d={`M 138 194 Q 178 ${194 + mouthLift} 218 194`} fill="none" stroke={danger} strokeWidth="5" strokeLinecap="round" />
          <text x="178" y="266" textAnchor="middle" fontSize="14" fontWeight="700" fill={primary}>morph target 表情</text>
          <line x1="312" y1="86" x2="312" y2="242" stroke={border} strokeWidth="8" strokeLinecap="round" />
          <circle cx="312" cy="86" r="20" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="3" />
          <circle cx="312" cy={elbowY} r="20" fill={warning} fillOpacity="0.2" stroke={warning} strokeWidth="3" />
          <circle cx="312" cy="242" r="20" fill={success} fillOpacity="0.2" stroke={success} strokeWidth="3" />
          <line x1="312" y1="86" x2="312" y2={elbowY} stroke={accent} strokeWidth="4" />
          <line x1="312" y1={elbowY} x2="312" y2="242" stroke={success} strokeWidth="4" />
          <text x="360" y="88" fontSize="14" fill={primary}>肩</text>
          <text x="360" y={elbowY + 5} fontSize="14" fill={warning}>肘</text>
          <text x="360" y="247" fontSize="14" fill={success}>腕</text>
          {showWeights && (
            <g>
              <rect x="350" y="126" width="112" height="52" rx="10" fill={warning} fillOpacity="0.1" stroke={warning} />
              <text x="406" y="148" textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>weights</text>
              <text x="406" y="168" textAnchor="middle" fontSize="12" fill={secondary}>{(1 - boneMix).toFixed(2)} / {boneMix.toFixed(2)}</text>
            </g>
          )}
          <text x="48" y="54" fontSize="14" fontWeight="700" fill={primary}>同一顶点流水线</text>
          <text x="48" y="282" fontSize="13" fill={secondary}>左：差分叠加；右：矩阵加权</text>
        </svg>
        <div className="space-y-3">
          <label className="block text-sm text-primary" htmlFor="dawn-smile">
            笑容差分：{smile.toFixed(2)}
          </label>
          <input id="dawn-smile" className="min-h-11 w-full accent-accent" type="range" min="0" max="1" step="0.05" value={smile} onChange={(event) => setSmile(Number(event.target.value))} aria-label="调整笑容差分" />
          <label className="block text-sm text-primary" htmlFor="dawn-brow">
            眉毛差分：{brow.toFixed(2)}
          </label>
          <input id="dawn-brow" className="min-h-11 w-full accent-accent" type="range" min="0" max="1" step="0.05" value={brow} onChange={(event) => setBrow(Number(event.target.value))} aria-label="调整眉毛差分" />
          <label className="block text-sm text-primary" htmlFor="dawn-bone-mix">
            肘部骨骼混合：{boneMix.toFixed(2)}
          </label>
          <input id="dawn-bone-mix" className="min-h-11 w-full accent-accent" type="range" min="0" max="1" step="0.05" value={boneMix} onChange={(event) => setBoneMix(Number(event.target.value))} aria-label="调整肘部骨骼混合" />
          <button
            type="button"
            aria-pressed={showWeights}
            onClick={() => setShowWeights((value) => !value)}
            className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
          >
            {showWeights ? "隐藏权重" : "显示权重"}
          </button>
          <button
            type="button"
            aria-label="重置 Dawn 动画实验"
            onClick={reset}
            className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
          >
            重置实验
          </button>
          <p className="text-xs text-secondary" role="status">
            观察：表情滑杆只叠加形状差分；骨骼滑杆只改变关节矩阵的权重分配。
          </p>
        </div>
      </div>
    </section>
  );
}
