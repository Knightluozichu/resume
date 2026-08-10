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

function ArrowDefs() {
  return (
    <defs>
      <marker
        id="ch22-arrow"
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill={accent} />
      </marker>
      <linearGradient id="ch22-input-gradient" x1="0" x2="1">
        <stop offset="0" stopColor={accent} stopOpacity="0.12" />
        <stop offset="0.48" stopColor={warning} stopOpacity="0.5" />
        <stop offset="1" stopColor={danger} stopOpacity="0.68" />
      </linearGradient>
      <linearGradient id="ch22-output-gradient" x1="0" x2="1">
        <stop offset="0" stopColor={success} stopOpacity="0.18" />
        <stop offset="0.46" stopColor={accent} stopOpacity="0.48" />
        <stop offset="1" stopColor={warning} stopOpacity="0.76" />
      </linearGradient>
      <linearGradient id="ch22-cube-gradient" x1="0" x2="1">
        <stop offset="0" stopColor={accent} stopOpacity="0.1" />
        <stop offset="0.5" stopColor={success} stopOpacity="0.42" />
        <stop offset="1" stopColor={warning} stopOpacity="0.7" />
      </linearGradient>
    </defs>
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
      strokeWidth={3}
      markerEnd="url(#ch22-arrow)"
    />
  );
}

export function GpuGemsCh22ColorCorrectionPipelineDiagram() {
  const stages = [
    { x: 26, title: "input", detail: "scene pixel", color: accent },
    { x: 174, title: "per-channel", detail: "Levels / Curves", color: warning },
    { x: 322, title: "1D LUT", detail: "R, G, B maps", color: success },
    { x: 470, title: "mix", detail: "dot / 3×3", color: danger },
    { x: 618, title: "output", detail: "graded pixel", color: accent },
  ];

  return (
    <Frame
      ariaLabel="Color Controls 的流程：输入 RGB 像素先做每通道 Levels 或 Curves，再用一维查找纹理，必要时进行通道混合或三乘三矩阵转换，最后输出调色后的像素。"
      caption="先区分逐通道 remap 与通道混合：前者适合 Levels/Curves，后者适合灰度、色相与色彩空间转换。"
    >
      <ArrowDefs />
      <text x={360} y={34} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>
        color correction：pixel → mapping → channel mix
      </text>
      {stages.map((stage, index) => (
        <g key={stage.title}>
          <rect
            x={stage.x}
            y={104}
            width={112}
            height={166}
            rx={16}
            fill={stage.color}
            fillOpacity={0.08}
            stroke={stage.color}
            strokeWidth={2}
          />
          <text
            x={stage.x + 56}
            y={137}
            textAnchor="middle"
            fontSize={14}
            fontWeight={700}
            fill={stage.color}
          >
            {stage.title}
          </text>
          {index === 0 && (
            <>
              <rect
                x={stage.x + 22}
                y={161}
                width={68}
                height={54}
                fill="url(#ch22-input-gradient)"
                stroke={accent}
                strokeWidth={2}
              />
              <circle cx={stage.x + 56} cy={188} r={12} fill={warning} />
            </>
          )}
          {index === 1 && (
            <>
              <path d={`M ${stage.x + 22} 216 C ${stage.x + 38} 202, ${stage.x + 45} 180, ${stage.x + 90} 164`} fill="none" stroke={warning} strokeWidth={4} />
              <line x1={stage.x + 22} y1={216} x2={stage.x + 90} y2={216} stroke={border} strokeWidth={2} />
            </>
          )}
          {index === 2 && (
            <>
              <rect x={stage.x + 22} y={161} width={68} height={54} fill={surface} stroke={success} strokeWidth={2} />
              <path d={`M ${stage.x + 28} 209 C ${stage.x + 43} 195, ${stage.x + 55} 204, ${stage.x + 84} 169`} fill="none" stroke={success} strokeWidth={3} />
              <circle cx={stage.x + 50} cy={198} r={4} fill={warning} />
              <circle cx={stage.x + 70} cy={188} r={4} fill={accent} />
            </>
          )}
          {index === 3 && (
            <>
              <circle cx={stage.x + 56} cy={186} r={29} fill="url(#ch22-cube-gradient)" stroke={danger} strokeWidth={2} />
              <path d={`M ${stage.x + 40} 206 L ${stage.x + 73} 174 M ${stage.x + 40} 174 L ${stage.x + 73} 206`} stroke={danger} strokeWidth={2} />
            </>
          )}
          {index === 4 && (
            <>
              <rect x={stage.x + 22} y={161} width={68} height={54} fill="url(#ch22-output-gradient)" stroke={accent} strokeWidth={2} />
              <circle cx={stage.x + 56} cy={188} r={15} fill={warning} fillOpacity={0.8} />
            </>
          )}
          <text x={stage.x + 56} y={247} textAnchor="middle" fontSize={12} fill={secondary}>{stage.detail}</text>
          {index < stages.length - 1 && <Arrow x1={stage.x + 118} y1={190} x2={stage.x + 140} y2={190} stroke={stage.color} />}
        </g>
      ))}
      <rect x={122} y={320} width={476} height={38} rx={12} fill={accent} fillOpacity={0.08} stroke={accent} />
      <text x={360} y={344} textAnchor="middle" fontSize={13} fill={primary}>artist-authored resource + pixel shader = repeatable real-time look</text>
    </Frame>
  );
}

export function GpuGemsCh22LevelsCurvesDiagram() {
  const channels = [
    { label: "R", color: danger, path: "M 104 272 C 142 244, 164 228, 211 194" },
    { label: "G", color: success, path: "M 104 272 C 148 264, 174 216, 211 150" },
    { label: "B", color: accent, path: "M 104 272 C 142 250, 181 246, 211 108" },
  ];
  return (
    <Frame
      ariaLabel="Levels 与 Curves 的对比图：Levels 通过输入黑白点和 gamma 改变动态范围，Curves 用更任意的每通道输入输出映射，最后可烘焙到一维查找纹理。"
      caption="Levels 是参数少、易于直接写进 shader 的 remap；Curves 更自由，通常先由艺术家制作映射，再烘焙为一维纹理。"
    >
      <ArrowDefs />
      <text x={360} y={34} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>Levels 与 Curves：同一条输入轴上的不同控制力</text>
      <rect x={42} y={76} width={280} height={234} rx={16} fill={warning} fillOpacity={0.06} stroke={warning} strokeWidth={2} />
      <text x={182} y={108} textAnchor="middle" fontSize={15} fontWeight={700} fill={warning}>Levels</text>
      <line x1={88} y1={272} x2={278} y2={272} stroke={border} strokeWidth={2} />
      <line x1={88} y1={272} x2={88} y2={134} stroke={border} strokeWidth={2} />
      <path d="M 88 272 L 118 238 L 238 168 L 278 134" fill="none" stroke={warning} strokeWidth={4} />
      <circle cx={118} cy={238} r={6} fill={warning} />
      <circle cx={238} cy={168} r={6} fill={warning} />
      <text x={88} y={294} fontSize={11} fill={secondary}>inBlack</text>
      <text x={236} y={294} fontSize={11} fill={secondary}>inWhite / gamma</text>
      <Arrow x1={348} y1={190} x2={388} y2={190} stroke={accent} />
      <rect x={398} y={76} width={280} height={234} rx={16} fill={accent} fillOpacity={0.06} stroke={accent} strokeWidth={2} />
      <text x={538} y={108} textAnchor="middle" fontSize={15} fontWeight={700} fill={accent}>Curves → 1D LUT</text>
      <line x1={444} y1={272} x2={634} y2={272} stroke={border} strokeWidth={2} />
      <line x1={444} y1={272} x2={444} y2={134} stroke={border} strokeWidth={2} />
      {channels.map((channel) => <path key={channel.label} d={channel.path.replaceAll("M 104", "M 444").replaceAll("272", "272").replaceAll("142", "484").replaceAll("148", "492").replaceAll("164", "516").replaceAll("174", "524").replaceAll("181", "537").replaceAll("216", "216").replaceAll("228", "228").replaceAll("250", "250").replaceAll("246", "246").replaceAll("211", "590").replaceAll("194", "194").replaceAll("150", "150").replaceAll("108", "108")} fill="none" stroke={channel.color} strokeWidth={3} />)}
      <text x={456} y={294} fontSize={11} fill={secondary}>input intensity</text>
      <text x={604} y={294} textAnchor="end" fontSize={11} fill={secondary}>output intensity</text>
      <rect x={120} y={344} width={480} height={30} rx={10} fill={success} fillOpacity={0.1} stroke={success} />
      <text x={360} y={364} textAnchor="middle" fontSize={12} fill={primary}>each channel keeps a one-to-one input → output lookup</text>
    </Frame>
  );
}

export function GpuGemsCh22LutWorkflowDiagram() {
  return (
    <Frame
      ariaLabel="一维查找纹理的制作与采样流程：艺术家在灰度渐变上应用 Curves 调整并保存成 1x256 纹理，shader 用输入 R、G、B 分别查找输出通道。"
      caption="1×256 的 RGB ramp 把复杂的曲线编辑变成稳定的运行时查表；shader 只需要三次一维采样。"
    >
      <ArrowDefs />
      <text x={360} y={34} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>1D lookup texture：把艺术工具的曲线带进 shader</text>
      <rect x={34} y={104} width={166} height={178} rx={16} fill={accent} fillOpacity={0.07} stroke={accent} strokeWidth={2} />
      <text x={117} y={137} textAnchor="middle" fontSize={14} fontWeight={700} fill={accent}>artist ramp</text>
      <rect x={62} y={164} width={110} height={46} fill="url(#ch22-input-gradient)" stroke={accent} strokeWidth={2} />
      <text x={117} y={236} textAnchor="middle" fontSize={12} fill={secondary}>black → white</text>
      <text x={117} y={258} textAnchor="middle" fontSize={11} fill={secondary}>apply .acv / Curves</text>
      <Arrow x1={220} y1={194} x2={272} y2={194} stroke={accent} />
      <rect x={286} y={104} width={168} height={178} rx={16} fill={success} fillOpacity={0.07} stroke={success} strokeWidth={2} />
      <text x={370} y={137} textAnchor="middle" fontSize={14} fontWeight={700} fill={success}>1×256 RGB map</text>
      <rect x={314} y={164} width={112} height={46} fill="url(#ch22-output-gradient)" stroke={success} strokeWidth={2} />
      <line x1={326} y1={224} x2={326} y2={246} stroke={danger} strokeWidth={3} />
      <line x1={370} y1={218} x2={370} y2={246} stroke={success} strokeWidth={3} />
      <line x1={414} y1={212} x2={414} y2={246} stroke={accent} strokeWidth={3} />
      <text x={370} y={267} textAnchor="middle" fontSize={11} fill={secondary}>R / G / B ramps</text>
      <Arrow x1={474} y1={194} x2={526} y2={194} stroke={success} />
      <rect x={540} y={104} width={148} height={178} rx={16} fill={warning} fillOpacity={0.07} stroke={warning} strokeWidth={2} />
      <text x={614} y={137} textAnchor="middle" fontSize={14} fontWeight={700} fill={warning}>pixel shader</text>
      <circle cx={586} cy={188} r={13} fill={danger} /><circle cx={614} cy={188} r={13} fill={success} /><circle cx={642} cy={188} r={13} fill={accent} />
      <text x={614} y={232} textAnchor="middle" fontSize={11} fill={secondary}>tex1D per channel</text>
      <text x={614} y={254} textAnchor="middle" fontSize={11} fill={secondary}>→ graded RGB</text>
      <rect x={112} y={330} width={496} height={38} rx={12} fill={accent} fillOpacity={0.08} stroke={accent} />
      <text x={360} y={354} textAnchor="middle" fontSize={13} fill={primary}>the lookup resource preserves artist intent without reproducing spline math</text>
    </Frame>
  );
}

export function GpuGemsCh22ColorSpaceConversionDiagram() {
  return (
    <Frame
      ariaLabel="多通道色彩转换图：输入 RGB 可以通过 Rec 709 加权点积变成灰度，也可以通过三乘三矩阵变换到另一种色彩空间；更一般的 RGB 到 RGB 映射可以用三维查找表。"
      caption="通道混合不能只靠三个独立的一维 map：灰度用加权点积，色彩空间转换通常用三乘三矩阵，完整映射才考虑三维查找表。"
    >
      <ArrowDefs />
      <text x={360} y={34} textAnchor="middle" fontSize={18} fontWeight={700} fill={primary}>multichannel correction：dot product、3×3 matrix 或 3D map</text>
      <rect x={34} y={106} width={164} height={164} rx={16} fill={accent} fillOpacity={0.07} stroke={accent} strokeWidth={2} />
      <text x={116} y={138} textAnchor="middle" fontSize={15} fontWeight={700} fill={accent}>input RGB</text>
      <circle cx={92} cy={194} r={20} fill={danger} fillOpacity={0.72} /><circle cx={116} cy={194} r={20} fill={success} fillOpacity={0.72} /><circle cx={140} cy={194} r={20} fill={accent} fillOpacity={0.72} />
      <text x={116} y={244} textAnchor="middle" fontSize={12} fill={secondary}>one pixel, three values</text>
      <Arrow x1={222} y1={188} x2={272} y2={188} stroke={accent} />
      <rect x={286} y={82} width={154} height={92} rx={14} fill={warning} fillOpacity={0.07} stroke={warning} strokeWidth={2} />
      <text x={363} y={112} textAnchor="middle" fontSize={14} fontWeight={700} fill={warning}>grayscale</text>
      <text x={363} y={139} textAnchor="middle" fontSize={12} fill={secondary}>dot(0.222, 0.707, 0.071)</text>
      <text x={363} y={158} textAnchor="middle" fontSize={11} fill={secondary}>Rec 709 weights</text>
      <rect x={286} y={198} width={154} height={92} rx={14} fill={success} fillOpacity={0.07} stroke={success} strokeWidth={2} />
      <text x={363} y={228} textAnchor="middle" fontSize={14} fontWeight={700} fill={success}>color space</text>
      <text x={363} y={255} textAnchor="middle" fontSize={12} fill={secondary}>new = M × RGB</text>
      <text x={363} y={274} textAnchor="middle" fontSize={11} fill={secondary}>3×3 matrix</text>
      <Arrow x1={464} y1={132} x2={514} y2={132} stroke={warning} />
      <Arrow x1={464} y1={246} x2={514} y2={246} stroke={success} />
      <rect x={528} y={106} width={160} height={164} rx={16} fill={danger} fillOpacity={0.07} stroke={danger} strokeWidth={2} />
      <text x={608} y={138} textAnchor="middle" fontSize={15} fontWeight={700} fill={danger}>output</text>
      <rect x={562} y={164} width={92} height={42} fill="url(#ch22-output-gradient)" stroke={danger} strokeWidth={2} />
      <text x={608} y={238} textAnchor="middle" fontSize={11} fill={secondary}>3D map is general</text>
      <text x={608} y={256} textAnchor="middle" fontSize={11} fill={secondary}>but costly to author</text>
      <rect x={110} y={334} width={500} height={34} rx={11} fill={accent} fillOpacity={0.08} stroke={accent} />
      <text x={360} y={356} textAnchor="middle" fontSize={13} fill={primary}>choose the smallest representation that preserves the required channel relationship</text>
    </Frame>
  );
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function GpuGemsCh22ColorControlLab() {
  const [red, setRed] = useState(0.72);
  const [green, setGreen] = useState(0.48);
  const [blue, setBlue] = useState(0.28);
  const [blackPoint, setBlackPoint] = useState(0.08);
  const [whitePoint, setWhitePoint] = useState(0.88);
  const [gamma, setGamma] = useState(1.1);
  const [saturation, setSaturation] = useState(0.72);
  const [grayscale, setGrayscale] = useState(false);

  const reset = () => {
    setRed(0.72);
    setGreen(0.48);
    setBlue(0.28);
    setBlackPoint(0.08);
    setWhitePoint(0.88);
    setGamma(1.1);
    setSaturation(0.72);
    setGrayscale(false);
  };

  const remap = (value: number) =>
    clamp01(Math.pow(clamp01((value - blackPoint) / Math.max(0.1, whitePoint - blackPoint)), gamma));
  const input = [red, green, blue];
  const mapped = input.map(remap);
  const luminance = mapped[0] * 0.222 + mapped[1] * 0.707 + mapped[2] * 0.071;
  const output = grayscale
    ? [luminance, luminance, luminance]
    : mapped.map((value) => clamp01(luminance + (value - luminance) * saturation));
  const contrast = rounded(Math.max(...output) - Math.min(...output));
  const label = `Color Controls 实验：输入 RGB ${input.map((value) => value.toFixed(2)).join("、")}，Levels black ${blackPoint.toFixed(2)}，white ${whitePoint.toFixed(2)}，gamma ${gamma.toFixed(2)}，saturation ${saturation.toFixed(2)}，输出对比度 ${contrast.toFixed(2)}。`;

  return (
    <section
      data-visual-kind="gpu-gems-ch22-color-controls"
      className="not-prose my-6 rounded-card border border-border bg-elevated p-5"
      aria-label="Color Controls 交互实验：调整 RGB 输入、Levels 黑白点、gamma、saturation 和灰度模式，观察像素映射结果"
    >
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">Color Controls Lab</p>
          <h4 className="mt-1 text-[15px] font-semibold text-primary">先预测：gamma 与 saturation 改变的是同一件事吗？</h4>
        </div>
        <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
      </div>
      <div className="grid gap-5 md:grid-cols-[1fr_260px] md:items-center">
        <svg viewBox="0 0 560 360" role="img" aria-label={label} className="w-full">
          <ArrowDefs />
          <rect x={12} y={18} width={536} height={324} rx={18} fill={surface} stroke={border} />
          <text x={32} y={46} fontSize={14} fontWeight={700} fill={primary}>per-pixel Levels + channel mix</text>
          <text x={526} y={46} textAnchor="end" fontSize={12} fill={accent}>contrast {contrast.toFixed(2)}</text>
          {input.map((value, index) => {
            const y = 86 + index * 46;
            const colors = [danger, success, accent];
            const channelNames = ["R", "G", "B"];
            return (
              <g key={channelNames[index]}>
                <text x={34} y={y + 17} fontSize={13} fontWeight={700} fill={colors[index]}>{channelNames[index]}</text>
                <rect x={64} y={y} width={174} height={24} rx={8} fill={border} fillOpacity={0.35} />
                <rect x={64} y={y} width={174 * value} height={24} rx={8} fill={colors[index]} fillOpacity={0.62} />
                <Arrow x1={258} y1={y + 12} x2={302} y2={y + 12} stroke={colors[index]} />
                <rect x={322} y={y} width={174} height={24} rx={8} fill={border} fillOpacity={0.35} />
                <rect x={322} y={y} width={174 * output[index]} height={24} rx={8} fill={colors[index]} fillOpacity={0.82} />
                <text x={510} y={y + 17} fontSize={11} fill={secondary}>{output[index].toFixed(2)}</text>
              </g>
            );
          })}
          <text x={64} y={248} fontSize={11} fill={secondary}>input sample</text>
          <text x={322} y={248} fontSize={11} fill={secondary}>mapped output</text>
          <rect x={64} y={278} width={432} height={30} rx={10} fill={grayscale ? success : accent} fillOpacity={0.12} stroke={grayscale ? success : accent} />
          <text x={280} y={298} textAnchor="middle" fontSize={12} fill={primary}>{grayscale ? "grayscale = weighted luminance" : "channel mix = luminance + saturation × offset"}</text>
        </svg>
        <div className="space-y-3">
          <label className="block text-sm text-primary" htmlFor="ch22-red">input red：{red.toFixed(2)}</label>
          <input id="ch22-red" className="min-h-11 w-full accent-accent" type="range" min="0" max="1" step="0.02" value={red} onChange={(event) => setRed(Number(event.target.value))} aria-label="调整输入 red" />
          <label className="block text-sm text-primary" htmlFor="ch22-green">input green：{green.toFixed(2)}</label>
          <input id="ch22-green" className="min-h-11 w-full accent-accent" type="range" min="0" max="1" step="0.02" value={green} onChange={(event) => setGreen(Number(event.target.value))} aria-label="调整输入 green" />
          <label className="block text-sm text-primary" htmlFor="ch22-blue">input blue：{blue.toFixed(2)}</label>
          <input id="ch22-blue" className="min-h-11 w-full accent-accent" type="range" min="0" max="1" step="0.02" value={blue} onChange={(event) => setBlue(Number(event.target.value))} aria-label="调整输入 blue" />
          <label className="block text-sm text-primary" htmlFor="ch22-black">inBlack：{blackPoint.toFixed(2)}</label>
          <input id="ch22-black" className="min-h-11 w-full accent-accent" type="range" min="0" max="0.5" step="0.02" value={blackPoint} onChange={(event) => setBlackPoint(Number(event.target.value))} aria-label="调整 Levels input black point" />
          <label className="block text-sm text-primary" htmlFor="ch22-white">inWhite：{whitePoint.toFixed(2)}</label>
          <input id="ch22-white" className="min-h-11 w-full accent-accent" type="range" min="0.5" max="1" step="0.02" value={whitePoint} onChange={(event) => setWhitePoint(Number(event.target.value))} aria-label="调整 Levels input white point" />
          <label className="block text-sm text-primary" htmlFor="ch22-gamma">gamma：{gamma.toFixed(2)}</label>
          <input id="ch22-gamma" className="min-h-11 w-full accent-accent" type="range" min="0.5" max="2" step="0.05" value={gamma} onChange={(event) => setGamma(Number(event.target.value))} aria-label="调整 gamma" />
          <label className="block text-sm text-primary" htmlFor="ch22-saturation">saturation：{saturation.toFixed(2)}</label>
          <input id="ch22-saturation" className="min-h-11 w-full accent-accent" type="range" min="0" max="1.5" step="0.05" value={saturation} onChange={(event) => setSaturation(Number(event.target.value))} aria-label="调整 saturation" />
          <label className="flex min-h-11 items-center gap-2 text-sm text-primary" htmlFor="ch22-grayscale"><input id="ch22-grayscale" className="h-4 w-4 accent-accent" type="checkbox" checked={grayscale} onChange={(event) => setGrayscale(event.target.checked)} />切换 grayscale dot product</label>
          <button type="button" aria-label="重置 Color Controls 实验" onClick={reset} className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-accent hover:text-primary">重置实验</button>
          <p className="text-xs text-secondary" role="status">观察：Levels 先压缩输入动态范围，gamma 改变曲线形状；saturation 只改变通道偏离 luminance 的幅度，grayscale 则把三个输出合成同一亮度。</p>
        </div>
      </div>
    </section>
  );
}
