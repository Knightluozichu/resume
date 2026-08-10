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
        <svg viewBox="0 0 720 400" role="img" aria-label={ariaLabel} className="mx-auto block h-auto w-full max-w-[720px]">
          {children}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

function ArrowDefs({ prefix }: { prefix: string }) {
  return (
    <defs>
      <marker id={`${prefix}-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill={accent} />
      </marker>
      <linearGradient id={`${prefix}-hdr`} x1="0" x2="1">
        <stop offset="0" stopColor={accent} stopOpacity="0.18" />
        <stop offset="0.5" stopColor={warning} stopOpacity="0.52" />
        <stop offset="1" stopColor={danger} stopOpacity="0.84" />
      </linearGradient>
      <linearGradient id={`${prefix}-linear`} x1="0" x2="1">
        <stop offset="0" stopColor={success} stopOpacity="0.22" />
        <stop offset="1" stopColor={accent} stopOpacity="0.72" />
      </linearGradient>
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
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={3} markerEnd={`url(#${prefix}-arrow)`} />;
}

export function GpuGemsCh26HdrComparisonDiagram() {
  return (
    <Frame
      ariaLabel="HDR 对比图：8-bit 0 到 1 存储会截断火焰高光，OpenEXR 保留超过 1 的亮度，之后再按显示设备压缩。"
      caption="先保存 HDR，再为显示做量化：原章用火焰高光说明提前夹到零到一会让后续变暗和模糊失去自然过渡。"
    >
      <ArrowDefs prefix="ch26-hdr" />
      <text x={360} y={30} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>保存范围决定后续还能恢复什么</text>
      <rect x={34} y={64} width={286} height={238} rx={16} fill={danger} fillOpacity={0.06} stroke={danger} strokeWidth={2} />
      <text x={177} y={96} textAnchor="middle" fontSize={15} fontWeight={700} fill={danger}>8-bit display file</text>
      <line x1={64} y1={246} x2={290} y2={246} stroke={border} strokeWidth={2} />
      <path d="M 68 232 C 124 224, 158 192, 190 130 C 208 96, 236 88, 286 88" fill="none" stroke={danger} strokeWidth={5} />
      <line x1={64} y1={112} x2={290} y2={112} stroke={warning} strokeDasharray="7 5" strokeWidth={2} />
      <text x={286} y={106} textAnchor="end" fontSize={11} fill={warning}>white = 1.0</text>
      <text x={177} y={274} textAnchor="middle" fontSize={12} fill={secondary}>bright values above 1 become white</text>
      <Arrow prefix="ch26-hdr" x1={342} y1={184} x2={376} y2={184} />
      <rect x={400} y={64} width={286} height={238} rx={16} fill={success} fillOpacity={0.06} stroke={success} strokeWidth={2} />
      <text x={543} y={96} textAnchor="middle" fontSize={15} fontWeight={700} fill={success}>OpenEXR HDR</text>
      <line x1={430} y1={246} x2={656} y2={246} stroke={border} strokeWidth={2} />
      <path d="M 434 232 C 490 224, 524 192, 556 130 C 574 96, 602 88, 650 88" fill="none" stroke="url(#ch26-hdr)" strokeWidth={5} />
      <line x1={430} y1={112} x2={656} y2={112} stroke={warning} strokeDasharray="7 5" strokeWidth={2} />
      <text x={652} y={106} textAnchor="end" fontSize={11} fill={warning}>display white = 1.0</text>
      <text x={543} y={274} textAnchor="middle" fontSize={12} fill={secondary}>values above 1 remain for processing</text>
      <rect x={174} y={334} width={372} height={30} rx={10} fill={accent} fillOpacity={0.1} stroke={accent} />
      <text x={360} y={354} textAnchor="middle" fontSize={12} fill={primary}>process HDR → tone map or gamma-correct → display</text>
    </Frame>
  );
}

export function GpuGemsCh26HalfFloatDiagram() {
  const parts = [
    { label: "sign", width: 52, color: danger },
    { label: "exponent", width: 178, color: warning },
    { label: "mantissa", width: 312, color: accent },
  ];
  let x = 74;
  return (
    <Frame
      ariaLabel="half 浮点格式图：16 位由 1 位 sign、5 位 exponent、10 位 mantissa 组成，并保留特殊值编码。"
      caption="half 的价值不是把每个整数都存得更细，而是用指数把有限的 16 位预算铺到很宽的亮度范围。"
    >
      <ArrowDefs prefix="ch26-half" />
      <text x={360} y={30} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>half：16 bits 里的动态范围预算</text>
      <text x={74} y={78} fontSize={13} fontWeight={700} fill={secondary}>IEEE-like layout</text>
      {parts.map((part) => {
        const currentX = x;
        x += part.width;
        return (
          <g key={part.label}>
            <rect x={currentX} y={94} width={part.width} height={74} rx={8} fill={part.color} fillOpacity={0.14} stroke={part.color} strokeWidth={2} />
            <text x={currentX + part.width / 2} y={127} textAnchor="middle" fontSize={15} fontWeight={700} fill={part.color}>{part.label}</text>
            <text x={currentX + part.width / 2} y={151} textAnchor="middle" fontSize={12} fill={secondary}>{part.width === 52 ? "1 bit" : part.width === 178 ? "5 bits" : "10 bits"}</text>
          </g>
        );
      })}
      <line x1={74} y1={198} x2={646} y2={198} stroke={border} strokeWidth={2} />
      <text x={74} y={228} fontSize={13} fontWeight={700} fill={success}>range</text>
      <rect x={74} y={246} width={572} height={26} rx={10} fill={surface} stroke={border} />
      <rect x={84} y={253} width={544} height={12} rx={6} fill="url(#ch26-half-linear)" />
      <text x={84} y={304} fontSize={12} fill={secondary}>minimum positive ≈ 5.96 × 10⁻⁸</text>
      <text x={636} y={304} textAnchor="end" fontSize={12} fill={secondary}>maximum ≈ 65504.0</text>
      <rect x={126} y={334} width={468} height={30} rx={10} fill={warning} fillOpacity={0.1} stroke={warning} />
      <text x={360} y={354} textAnchor="middle" fontSize={12} fill={primary}>reserved exponents also represent zero, infinity, NaN</text>
    </Frame>
  );
}

export function GpuGemsCh26FileStructureDiagram() {
  const headers = ["displayWindow", "dataWindow", "channels", "compression", "lineOrder"];
  const channels = [
    { name: "R", type: "half", color: danger },
    { name: "G", type: "half", color: success },
    { name: "B", type: "half", color: accent },
    { name: "Z", type: "float", color: warning },
  ];
  return (
    <Frame
      ariaLabel="OpenEXR 文件结构图：header 描述窗口、通道、压缩和扫描线顺序，pixels 按独立通道保存，RGBA 可以是 half，Z 可以是 float。"
      caption="header 是跨程序读取的契约；pixels 是按通道组织的数据，通道可以有不同数据类型，额外属性还能记录色彩和相机元数据。"
    >
      <ArrowDefs prefix="ch26-file" />
      <text x={360} y={30} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>OpenEXR = header contract + channel pixels</text>
      <rect x={40} y={62} width={640} height={112} rx={16} fill={warning} fillOpacity={0.06} stroke={warning} strokeWidth={2} />
      <text x={68} y={92} fontSize={15} fontWeight={700} fill={warning}>header</text>
      {headers.map((header, index) => (
        <g key={header}>
          <rect x={66 + index * 118} y={112} width={102} height={38} rx={7} fill={surface} stroke={border} />
          <text x={117 + index * 118} y={136} textAnchor="middle" fontSize={11} fill={primary}>{header}</text>
        </g>
      ))}
      <Arrow prefix="ch26-file" x1={360} y1={190} x2={360} y2={224} stroke={warning} />
      <rect x={40} y={240} width={640} height={112} rx={16} fill={accent} fillOpacity={0.06} stroke={accent} strokeWidth={2} />
      <text x={68} y={270} fontSize={15} fontWeight={700} fill={accent}>pixels: independent channels</text>
      {channels.map((channel, index) => (
        <g key={channel.name}>
          <rect x={66 + index * 145} y={290} width={122} height={42} rx={8} fill={channel.color} fillOpacity={0.13} stroke={channel.color} />
          <text x={88 + index * 145} y={316} fontSize={15} fontWeight={700} fill={channel.color}>{channel.name}</text>
          <text x={178 + index * 145} y={316} textAnchor="end" fontSize={12} fill={primary}>{channel.type}</text>
        </g>
      ))}
    </Frame>
  );
}

export function GpuGemsCh26LinearDisplayDiagram() {
  const stages = [
    { x: 28, title: "scene", detail: "relative luminance", color: success },
    { x: 178, title: "OpenEXR", detail: "linear half", color: accent },
    { x: 328, title: "over / blur", detail: "linear processing", color: warning },
    { x: 478, title: "display", detail: "inverse gamma", color: danger },
    { x: 628, title: "monitor", detail: "limited range", color: accent },
  ];
  return (
    <Frame
      ariaLabel="线性显示流程图：场景亮度以 linear 值存入 OpenEXR，在 linear 空间做 over 和 blur，最后按显示器 gamma 转换。"
      caption="linear 的操作定义是数值与相对场景亮度成比例；gamma correction 是显示边界上的转换，不应提前混进合成和抗锯齿。"
    >
      <ArrowDefs prefix="ch26-linear" />
      <text x={360} y={30} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>linear pixels：先正确计算光，再适配显示器</text>
      {stages.map((stage, index) => (
        <g key={stage.title}>
          <rect x={stage.x} y={96} width={88} height={148} rx={15} fill={stage.color} fillOpacity={0.08} stroke={stage.color} strokeWidth={2} />
          <text x={stage.x + 44} y={130} textAnchor="middle" fontSize={13} fontWeight={700} fill={stage.color}>{stage.title}</text>
          {index === 0 && <><circle cx={stage.x + 44} cy={181} r={24} fill="url(#ch26-linear)" /><circle cx={stage.x + 58} cy={168} r={7} fill={warning} /></>}
          {index === 1 && <><rect x={stage.x + 22} y={158} width={44} height={44} rx={7} fill={accent} fillOpacity={0.2} stroke={accent} /><text x={stage.x + 44} y={186} textAnchor="middle" fontSize={14} fontWeight={700} fill={primary}>½</text></>}
          {index === 2 && <><path d={`M ${stage.x + 20} 202 C ${stage.x + 34} 166, ${stage.x + 48} 188, ${stage.x + 68} 150`} fill="none" stroke={warning} strokeWidth={4} /><text x={stage.x + 44} y={220} textAnchor="middle" fontSize={11} fill={secondary}>over</text></>}
          {index === 3 && <><path d={`M ${stage.x + 20} 200 C ${stage.x + 34} 172, ${stage.x + 50} 166, ${stage.x + 68} 156`} fill="none" stroke={danger} strokeWidth={4} /><text x={stage.x + 44} y={220} textAnchor="middle" fontSize={11} fill={secondary}>gamma⁻¹</text></>}
          {index === 4 && <><rect x={stage.x + 23} y={158} width={42} height={42} rx={6} fill={surface} stroke={border} /><circle cx={stage.x + 44} cy={179} r={15} fill={warning} fillOpacity={0.62} /></>}
          <text x={stage.x + 44} y={270} textAnchor="middle" fontSize={11} fill={secondary}>{stage.detail}</text>
          {index < stages.length - 1 && <Arrow prefix="ch26-linear" x1={stage.x + 94} y1={180} x2={stage.x + 136} y2={180} stroke={stage.color} />}
        </g>
      ))}
      <rect x={112} y={326} width={496} height={30} rx={10} fill={success} fillOpacity={0.1} stroke={success} />
      <text x={360} y={346} textAnchor="middle" fontSize={12} fill={primary}>double light → two stops brighter · divide by two → one stop darker</text>
    </Frame>
  );
}

export function GpuGemsCh26OpenExrLab() {
  const [exposure, setExposure] = useState(0.2);
  const [format, setFormat] = useState("openexr");
  const [operation, setOperation] = useState("blur");

  const reset = () => {
    setExposure(0.2);
    setFormat("openexr");
    setOperation("blur");
  };

  const scenePeak = rounded(2.4 + exposure * 2.2);
  const preservedPeak = format === "openexr" ? scenePeak : Math.min(1, scenePeak);
  const operationQuality = format === "openexr" ? (operation === "blur" ? 0.94 : 0.9) : operation === "blur" ? 0.48 : 0.61;
  const clipped = format === "openexr" ? 0 : rounded(Math.max(0, scenePeak - 1) / Math.max(scenePeak, 1));
  const label = `OpenEXR 实验：格式 ${format === "openexr" ? "OpenEXR half" : "8-bit display"}，曝光 ${exposure.toFixed(2)}，操作 ${operation}，场景峰值 ${scenePeak.toFixed(2)}，保存峰值 ${preservedPeak.toFixed(2)}，裁剪 ${clipped.toFixed(2)}，质量 ${operationQuality.toFixed(2)}。`;

  return (
    <section data-visual-kind="gpu-gems-ch26-openexr-image-file-format" className="not-prose my-6 rounded-card border border-border bg-elevated p-5" aria-label="OpenEXR 交互实验：比较 HDR 文件与 8-bit 文件在曝光和图像处理后的信息保留">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">OpenEXR Lab</p>
          <h4 className="mt-1 text-[15px] font-semibold text-primary">先预测：高光在处理前被夹到 1，会怎样影响 blur？</h4>
        </div>
        <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
      </div>
      <div className="grid gap-5 md:grid-cols-[1fr_260px] md:items-center">
        <svg viewBox="0 0 560 360" role="img" aria-label={label} className="w-full">
          <ArrowDefs prefix="ch26-lab" />
          <rect x={12} y={18} width={536} height={324} rx={18} fill={surface} stroke={border} />
          <text x={32} y={46} fontSize={14} fontWeight={700} fill={primary}>scene luminance → saved pixels → processed result</text>
          <text x={526} y={46} textAnchor="end" fontSize={12} fill={format === "openexr" ? success : danger}>{format === "openexr" ? "OpenEXR half" : "8-bit display"}</text>
          <line x1={56} y1={234} x2={504} y2={234} stroke={border} strokeWidth={2} />
          <line x1={56} y1={104} x2={504} y2={104} stroke={warning} strokeDasharray="7 5" strokeWidth={2} />
          <text x={500} y={98} textAnchor="end" fontSize={11} fill={warning}>display white = 1.0</text>
          {Array.from({ length: 12 }, (_, index) => {
            const value = rounded(Math.max(0.12, Math.min(1, 0.2 + index * 0.06 + exposure * 0.08)));
            const highlight = index > 8;
            const result = operation === "blur" ? rounded(Math.min(1, value * (highlight ? 0.86 : 0.98) + (highlight ? 0.08 : 0))) : rounded(Math.min(1, value * 0.92));
            return <g key={`lab-bar-${index}`}><rect x={66 + index * 36} y={234 - value * 92} width={22} height={value * 92} rx={4} fill={highlight ? danger : accent} fillOpacity={0.5 + value * 0.35} /><rect x={66 + index * 36} y={234 - result * 58} width={22} height={result * 58} rx={4} fill={success} fillOpacity={0.52} /></g>;
          })}
          <text x={66} y={268} fontSize={11} fill={secondary}>saved peak {preservedPeak.toFixed(2)} · clipped {clipped.toFixed(2)} · {operation}</text>
          <rect x={66} y={286} width={428} height={22} rx={7} fill={border} fillOpacity={0.32} />
          <rect x={66} y={286} width={428 * operationQuality} height={22} rx={7} fill={success} fillOpacity={0.58} />
          <text x={76} y={302} fontSize={11} fill={primary}>processing quality {operationQuality.toFixed(2)}</text>
        </svg>
        <div className="space-y-3">
          <label className="block text-sm text-primary" htmlFor="ch26-format">存储格式</label>
          <select id="ch26-format" className="min-h-11 w-full rounded-control border border-border bg-elevated px-3 py-2 text-sm text-primary" value={format} onChange={(event) => setFormat(event.target.value)} aria-label="选择存储格式">
            <option value="openexr">OpenEXR half</option>
            <option value="ldr">8-bit display</option>
          </select>
          <label className="block text-sm text-primary" htmlFor="ch26-operation">处理操作</label>
          <select id="ch26-operation" className="min-h-11 w-full rounded-control border border-border bg-elevated px-3 py-2 text-sm text-primary" value={operation} onChange={(event) => setOperation(event.target.value)} aria-label="选择图像处理操作">
            <option value="blur">depth-of-field blur</option>
            <option value="composite">linear composite</option>
          </select>
          <label className="block text-sm text-primary" htmlFor="ch26-exposure">曝光变化：{exposure.toFixed(2)}</label>
          <input id="ch26-exposure" className="min-h-11 w-full accent-accent" type="range" min="-1" max="1" step="0.1" value={exposure} onChange={(event) => setExposure(Number(event.target.value))} aria-label="调整曝光变化" />
          <button type="button" className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-primary hover:border-accent" onClick={reset}>重置实验</button>
          <p className="text-xs leading-5 text-secondary">预测：切换到 8-bit 后，提高曝光会增加 clipped；OpenEXR 保留高光，blur 才能把亮点自然扩散。</p>
        </div>
      </div>
    </section>
  );
}
