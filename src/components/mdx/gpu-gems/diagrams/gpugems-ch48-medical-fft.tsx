"use client";

import { useMemo, useState, type ReactNode } from "react";

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const surface = "var(--surface)";

function Frame({ ariaLabel, caption, children }: { ariaLabel: string; caption: string; children: ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 390" role="img" aria-label={ariaLabel} className="mx-auto block h-auto w-full max-w-[720px]">
          {children}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

function Arrow({ x1, y1, x2, y2, color = accent }: { x1: number; y1: number; x2: number; y2: number; color?: string }) {
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={2.5} />
      <path d={`M ${x2 - 8} ${y2 - 5} L ${x2} ${y2} L ${x2 - 8} ${y2 + 5}`} fill="none" stroke={color} strokeWidth={2.5} />
    </>
  );
}

export function GpuGemsCh48FourierDomainDiagram() {
  const samples = [0.22, 0.54, 0.38, 0.78, 0.32, 0.58, 0.26, 0.48];
  const spectrum = [0.44, 0.2, 0.7, 0.14, 0.1, 0.14, 0.7, 0.2];
  return (
    <Frame ariaLabel="Fourier transform 把医学成像的空间或时间信号映射到频率域，再由逆变换恢复可见图像" caption="从信号域到频率域：FFT 改变表示方式，而不是凭空创造信息。">
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>Fourier transform：同一信号的两种坐标</text>
      <rect x={40} y={70} width={285} height={230} rx={14} fill={surface} stroke={accent} strokeWidth={2} />
      <text x={62} y={100} fontSize={13} fontWeight={700} fill={accent}>信号域 · s(t) / s(x)</text>
      <line x1={70} y1={252} x2={298} y2={252} stroke={border} /><line x1={70} y1={125} x2={70} y2={252} stroke={border} />
      <path d={samples.map((value, index) => `${index === 0 ? "M" : "L"} ${76 + index * 30} ${252 - value * 124}`).join(" ")} fill="none" stroke={accent} strokeWidth={3} />
      {samples.map((value, index) => <circle key={index} cx={76 + index * 30} cy={252 - value * 124} r={4} fill={accent} />)}
      <text x={180} y={278} textAnchor="middle" fontSize={11} fill={secondary}>采样点：RF 回波或空间强度</text>
      <Arrow x1={344} y1={185} x2={380} y2={185} />
      <text x={360} y={165} textAnchor="middle" fontSize={11} fill={secondary}>FFT</text>
      <rect x={395} y={70} width={285} height={230} rx={14} fill={surface} stroke={success} strokeWidth={2} />
      <text x={417} y={100} fontSize={13} fontWeight={700} fill={success}>频率域 · S(f)</text>
      <line x1={425} y1={252} x2={653} y2={252} stroke={border} /><line x1={425} y1={125} x2={425} y2={252} stroke={border} />
      {spectrum.map((value, index) => <rect key={index} x={437 + index * 25} y={252 - value * 124} width={15} height={value * 124} rx={3} fill={index === 2 || index === 6 ? warning : success} fillOpacity={0.8} />)}
      <text x={539} y={278} textAnchor="middle" fontSize={11} fill={secondary}>频率分量：结构与能量的编码</text>
      <text x={360} y={344} textAnchor="middle" fontSize={13} fill={secondary}>医学重建选择合适的频率表示，再用 inverse FFT 回到图像坐标</text>
    </Frame>
  );
}

export function GpuGemsCh48ButterflyDiagram() {
  return (
    <Frame ariaLabel="Cooley-Tukey FFT 的 radix-2 butterfly：每个输出由两个输入和一个复数 twiddle weight 合成，逐级扩大处理块" caption="蝶形把两个输入合成为两个输出；每一层都把可并行的局部工作交给 GPU。">
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>Radix-2 Cooley–Tukey：一个 FFT butterfly</text>
      <text x={66} y={74} fontSize={12} fontWeight={700} fill={secondary}>输入</text><text x={590} y={74} fontSize={12} fontWeight={700} fill={secondary}>输出</text>
      <circle cx={136} cy={132} r={25} fill={surface} stroke={accent} strokeWidth={2} /><text x={136} y={137} textAnchor="middle" fontSize={13} fill={accent}>A</text>
      <circle cx={136} cy={264} r={25} fill={surface} stroke={accent} strokeWidth={2} /><text x={136} y={269} textAnchor="middle" fontSize={13} fill={accent}>B</text>
      <circle cx={584} cy={132} r={25} fill={surface} stroke={success} strokeWidth={2} /><text x={584} y={137} textAnchor="middle" fontSize={13} fill={success}>A + W·B</text>
      <circle cx={584} cy={264} r={25} fill={surface} stroke={success} strokeWidth={2} /><text x={584} y={269} textAnchor="middle" fontSize={13} fill={success}>A − W·B</text>
      <path d="M 161 132 C 290 132, 330 92, 559 132" fill="none" stroke={accent} strokeWidth={2.5} /><path d="M 161 264 C 290 264, 330 172, 559 132" fill="none" stroke={warning} strokeWidth={2.5} />
      <path d="M 161 132 C 290 132, 330 224, 559 264" fill="none" stroke={accent} strokeWidth={2.5} /><path d="M 161 264 C 290 264, 330 304, 559 264" fill="none" stroke={warning} strokeWidth={2.5} />
      <rect x={310} y={156} width={100} height={84} rx={14} fill={surface} stroke={warning} strokeWidth={2} /><text x={360} y={184} textAnchor="middle" fontSize={13} fontWeight={700} fill={warning}>W = e⁻ⁱᵠ</text><text x={360} y={210} textAnchor="middle" fontSize={11} fill={secondary}>twiddle weight</text><text x={360} y={228} textAnchor="middle" fontSize={11} fill={secondary}>复数旋转</text>
      <text x={360} y={322} textAnchor="middle" fontSize={13} fill={secondary}>N 点 DFT：O(N²)；FFT：分层 butterfly，O(N log₂N)</text>
      <text x={360} y={348} textAnchor="middle" fontSize={12} fill={danger}>前提：N 通常取 2 的幂，并先处理 bit-reversal 顺序</text>
    </Frame>
  );
}

export function GpuGemsCh48FftPassPipelineDiagram() {
  const stages = ["bit-reversal", "stage 1", "stage 2", "stage 3", "频率域 output"];
  return (
    <Frame ariaLabel="GPU multipass FFT：输入经过 bit-reversal，再依次执行蝶形 stage，每个 fragment pass 使用 source 和 target draw buffer，最终得到频率域输出" caption="把 FFT stage 变成 multipass fragment program；source/target 交换是数据依赖的边界。">
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>GPU multipass FFT：每一层都是一次可验证的 pass</text>
      {stages.map((stage, index) => { const x = 28 + index * 139; const highlighted = index === 2; return <g key={stage}><rect x={x} y={120} width={112} height={118} rx={14} fill={highlighted ? accent : surface} fillOpacity={highlighted ? 0.15 : 1} stroke={highlighted ? accent : border} strokeWidth={2} /><text x={x + 56} y={160} textAnchor="middle" fontSize={12} fontWeight={700} fill={highlighted ? accent : primary}>{stage}</text><text x={x + 56} y={188} textAnchor="middle" fontSize={11} fill={secondary}>{index === 0 ? "重排 index" : index === 4 ? "写 output" : "butterfly"}</text><text x={x + 56} y={212} textAnchor="middle" fontSize={11} fill={secondary}>{index < 4 ? "source → target" : "draw buffer"}</text>{index < stages.length - 1 && <Arrow x1={x + 116} y1={179} x2={x + 130} y2={179} />}</g>; })}
      <rect x={108} y={282} width={504} height={46} rx={12} fill={surface} stroke={border} /><text x={360} y={311} textAnchor="middle" fontSize={13} fill={secondary}>一个 pbuffer 的多个 draw buffers 可承接各 pass，避免 CPU 往返</text>
      <text x={360} y={356} textAnchor="middle" fontSize={12} fill={warning}>每个 stage 合并两路输入；第一轮 twiddle weight 为 1，可与 scrambler 合并</text>
    </Frame>
  );
}

export function GpuGemsCh48MriReconstructionDiagram() {
  return (
    <Frame ariaLabel="MRI 图像重建：质子密度的空间 Fourier transform 被采样为 k-space，经复数 inverse FFT 恢复空间图像" caption="MRI 的 k-space 不是图像缩略图，而是空间频率采样；逆变换才把它还原到可视空间。">
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>MRI：从 k-space 回到空间图像</text>
      <g transform="translate(42 92)"><rect width={174} height={160} rx={14} fill={surface} stroke={accent} strokeWidth={2} /><text x={87} y={32} textAnchor="middle" fontSize={13} fontWeight={700} fill={accent}>质子密度 ρ(x,y)</text><circle cx={87} cy={92} r={44} fill={accent} fillOpacity={0.14} stroke={accent} strokeWidth={2} /><ellipse cx={87} cy={92} rx={62} ry={18} fill="none" stroke={accent} strokeOpacity={0.6} /><text x={87} y={145} textAnchor="middle" fontSize={11} fill={secondary}>空间域目标</text></g>
      <Arrow x1={228} y1={172} x2={278} y2={172} /><text x={253} y={148} textAnchor="middle" fontSize={11} fill={secondary}>Fourier</text>
      <g transform="translate(292 92)"><rect width={174} height={160} rx={14} fill={surface} stroke={warning} strokeWidth={2} /><text x={87} y={32} textAnchor="middle" fontSize={13} fontWeight={700} fill={warning}>k-space · K(kx,ky)</text>{Array.from({ length: 7 }, (_, row) => <g key={row}>{Array.from({ length: 7 }, (_, col) => <circle key={col} cx={30 + col * 22} cy={64 + row * 14} r={row === 3 && col === 3 ? 6 : 3} fill={row === 3 && col === 3 ? warning : accent} fillOpacity={row === 3 && col === 3 ? 1 : 0.28 + Math.abs(3 - row) / 10} />)}</g>)}<text x={87} y={145} textAnchor="middle" fontSize={11} fill={secondary}>按空间频率逐线采集</text></g>
      <Arrow x1={480} y1={172} x2={530} y2={172} color={success} /><text x={505} y={148} textAnchor="middle" fontSize={11} fill={secondary}>IFFT</text>
      <g transform="translate(544 92)"><rect width={134} height={160} rx={14} fill={surface} stroke={success} strokeWidth={2} /><text x={67} y={32} textAnchor="middle" fontSize={13} fontWeight={700} fill={success}>图像 I(x,y)</text><rect x={31} y={57} width={72} height={72} rx={8} fill={success} fillOpacity={0.18} stroke={success} /><path d="M 38 114 C 56 72, 72 132, 96 78" fill="none" stroke={success} strokeWidth={3} /><text x={67} y={145} textAnchor="middle" fontSize={11} fill={secondary}>显示与诊断</text></g>
      <text x={360} y={310} textAnchor="middle" fontSize={13} fill={secondary}>输入是复数频率样本；GPU FFT 加速“采集数据 → 重建图像”的中间计算</text>
      <text x={360} y={338} textAnchor="middle" fontSize={12} fill={danger}>不做频率校正、共轭处理或零填充检查，逆 FFT 可能得到错位或伪影</text>
    </Frame>
  );
}

export function GpuGemsCh48UltrasoundPpiDiagram() {
  const tiles = ["s(x,t)", "2D FFT", "S(fx,ft)", "(fx,fz)", "IFFT", "image (x,z)"];
  return (
    <Frame ariaLabel="超声 PPI 重建：同时激发换能器得到 s(x,t)，执行二维 FFT，按传播关系把频率映射到 fx 和 fz，再做二维逆 FFT 得到 x-z 图像" caption="超声路径的关键不是一次 FFT，而是二维频率坐标的重映射。">
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>超声 PPI：二维 FFT 后还要做 frequency remapping</text>
      {tiles.map((tile, index) => { const x = 28 + index * 112; const highlight = index === 3; return <g key={tile}><rect x={x} y={132} width={88} height={82} rx={12} fill={highlight ? warning : surface} fillOpacity={highlight ? 0.15 : 1} stroke={highlight ? warning : index === 1 || index === 4 ? accent : border} strokeWidth={2} /><text x={x + 44} y={178} textAnchor="middle" fontSize={12} fontWeight={700} fill={highlight ? warning : index === 1 || index === 4 ? accent : primary}>{tile}</text>{index < tiles.length - 1 && <Arrow x1={x + 91} y1={173} x2={x + 104} y2={173} color={highlight ? warning : accent} />}</g>; })}
      <g transform="translate(66 264)"><circle cx={0} cy={0} r={10} fill={success} /><text x={20} y={5} fontSize={12} fill={secondary}>所有换能器同时发射平面波并记录回波</text></g>
      <g transform="translate(66 304)"><circle cx={0} cy={0} r={10} fill={warning} /><text x={20} y={5} fontSize={12} fill={secondary}>remap 用传播关系把 ft 转成深度频率 fz，再回到成像坐标</text></g>
      <text x={360} y={356} textAnchor="middle" fontSize={12} fill={danger}>只做 2D IFFT 会把错误的频率坐标带回图像，不能替代 remapping</text>
    </Frame>
  );
}

export function GpuGemsCh48FrequencyRemapDiagram() {
  return (
    <Frame ariaLabel="超声频率重映射：原始横向频率 fx 和时间频率 ft 经过传播关系转换为横向频率 fx 与深度频率 fz，随后进入逆 FFT" caption="重映射是物理模型与数值管线之间的接口，插值误差会直接显示为重建伪影。">
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>Frequency remapping：改变频率坐标的解释</text>
      <g transform="translate(68 90)"><rect width={220} height={186} rx={14} fill={surface} stroke={accent} strokeWidth={2} /><text x={110} y={30} textAnchor="middle" fontSize={13} fontWeight={700} fill={accent}>原始频率平面</text><line x1={48} y1={146} x2={176} y2={146} stroke={border} /><line x1={48} y1={146} x2={48} y2={58} stroke={border} /><text x={180} y={162} fontSize={11} fill={secondary}>fx</text><text x={28} y={62} fontSize={11} fill={secondary}>ft</text>{Array.from({ length: 6 }, (_, i) => <circle key={i} cx={72 + i * 20} cy={128 - (i % 3) * 22} r={5} fill={accent} fillOpacity={0.7} />)}</g>
      <Arrow x1={316} y1={182} x2={394} y2={182} color={warning} /><rect x={328} y={112} width={54} height={54} rx={12} fill={surface} stroke={warning} strokeWidth={2} /><text x={355} y={135} textAnchor="middle" fontSize={12} fontWeight={700} fill={warning}>map</text><text x={355} y={153} textAnchor="middle" fontSize={11} fill={secondary}>插值</text>
      <g transform="translate(430 90)"><rect width={220} height={186} rx={14} fill={surface} stroke={success} strokeWidth={2} /><text x={110} y={30} textAnchor="middle" fontSize={13} fontWeight={700} fill={success}>成像频率平面</text><line x1={48} y1={146} x2={176} y2={146} stroke={border} /><line x1={48} y1={146} x2={48} y2={58} stroke={border} /><text x={180} y={162} fontSize={11} fill={secondary}>fx</text><text x={28} y={62} fontSize={11} fill={secondary}>fz</text><path d="M 62 124 C 96 96, 112 74, 142 90 S 178 116, 186 70" fill="none" stroke={success} strokeWidth={3} />{Array.from({ length: 6 }, (_, i) => <circle key={i} cx={72 + i * 20} cy={126 - ((i * 11) % 65)} r={5} fill={success} fillOpacity={0.7} />)}</g>
      <text x={360} y={316} textAnchor="middle" fontSize={13} fill={secondary}>检查点：频率范围、插值空洞、复数相位与边界条件</text>
      <text x={360} y={344} textAnchor="middle" fontSize={12} fill={danger}>重映射不是色彩后处理，而是 IFFT 之前的数值步骤</text>
    </Frame>
  );
}

type Complex = { re: number; im: number };
type FftSnapshot = { label: string; values: Complex[]; butterflies: number };
type SignalSource = "mri" | "ultrasound";

const SIGNALS: Record<SignalSource, number[]> = {
  mri: [0.15, 0.9, 0.25, 0.55, 0.1, 0.45, 0.05, 0.7],
  ultrasound: [0.1, 0.32, 0.82, 0.38, 0.2, 0.64, 0.92, 0.28],
};

function add(a: Complex, b: Complex): Complex { return { re: a.re + b.re, im: a.im + b.im }; }
function subtract(a: Complex, b: Complex): Complex { return { re: a.re - b.re, im: a.im - b.im }; }
function multiply(a: Complex, b: Complex): Complex { return { re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re }; }
function bitReverse(values: Complex[]): Complex[] {
  const result = values.map(() => ({ re: 0, im: 0 }));
  const bits = Math.log2(values.length);
  values.forEach((value, index) => {
    let reversed = 0;
    for (let bit = 0; bit < bits; bit += 1) reversed = (reversed << 1) | ((index >> bit) & 1);
    result[reversed] = value;
  });
  return result;
}

function fftSnapshots(input: number[]): FftSnapshot[] {
  const snapshots: FftSnapshot[] = [{ label: "输入：信号采样", values: input.map((re) => ({ re, im: 0 })), butterflies: 0 }];
  let values = bitReverse(input.map((re) => ({ re, im: 0 })));
  snapshots.push({ label: "bit-reversal：重排输入", values: values.map((value) => ({ ...value })), butterflies: 0 });
  for (let size = 2; size <= input.length; size *= 2) {
    const half = size / 2;
    const angle = -2 * Math.PI / size;
    for (let start = 0; start < input.length; start += size) {
      for (let offset = 0; offset < half; offset += 1) {
        const weight = { re: Math.cos(angle * offset), im: Math.sin(angle * offset) };
        const even = values[start + offset];
        const odd = multiply(weight, values[start + offset + half]);
        values[start + offset] = add(even, odd);
        values[start + offset + half] = subtract(even, odd);
      }
    }
    snapshots.push({ label: `stage ${Math.log2(size)}：${size} 点 butterfly`, values: values.map((value) => ({ ...value })), butterflies: (input.length / 2) * Math.log2(size) });
  }
  return snapshots;
}

export function GpuGemsCh48FftLab() {
  const [source, setSource] = useState<SignalSource>("mri");
  const [stage, setStage] = useState(0);
  const [showSpectrum, setShowSpectrum] = useState(true);
  const snapshots = useMemo(() => fftSnapshots(SIGNALS[source]), [source]);
  const current = snapshots[stage];
  const bars = current.values.map((value) => showSpectrum ? Math.hypot(value.re, value.im) : Math.abs(value.re));
  const maxBar = Math.max(...bars, 0.001);

  function reset() {
    setSource("mri");
    setStage(0);
    setShowSpectrum(true);
  }

  return (
    <section className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated" aria-label="GPU Gems Chapter 48 radix-2 FFT 实验：切换医学信号、推进 bit-reversal 与 butterfly stage，观察实际频率分量" data-visual-kind="gpu-gems-ch48-medical-fft">
      <div className="border-b border-border px-5 py-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-[11px] uppercase tracking-[0.18em] text-secondary">GPU Gems 2 · Chapter 48</p><h3 className="mt-1 text-lg font-semibold text-primary">radix-2 FFT：从采样到频率分量</h3><p className="mt-1 max-w-2xl text-sm text-secondary">推进真实的 8 点 Cooley–Tukey 计算，观察 bit-reversal 和每一层 butterfly 如何改变复数输出。</p></div><span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">▷ 可交互</span></div></div>
      <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_250px]">
        <div className="min-w-0 rounded-card border border-border bg-surface p-3"><svg viewBox="0 0 560 330" className="h-auto w-full" role="img" aria-label={`${current.label}，显示八个复数样本的${showSpectrum ? "幅度频谱" : "实部"}`}>
          <text x={20} y={24} fontSize={13} fontWeight={700} fill={primary}>{current.label}</text>
          <line x1={38} y1={270} x2={534} y2={270} stroke={border} />
          {bars.map((value, index) => { const x = 58 + index * 58; const height = (value / maxBar) * 188; const phase = current.values[index].im; return <g key={index}><rect x={x - 18} y={270 - height} width={36} height={height} rx={5} fill={index % 2 === 0 ? accent : success} fillOpacity={0.78} /><text x={x} y={292} textAnchor="middle" fontSize={11} fill={secondary}>{index}</text><text x={x} y={270 - height - 9} textAnchor="middle" fontSize={11} fill={primary}>{value.toFixed(2)}</text>{stage >= 2 && <circle cx={x} cy={270 - height - 22} r={3} fill={phase >= 0 ? warning : danger} />}</g>; })}
          <text x={286} y={316} textAnchor="middle" fontSize={12} fill={secondary}>{showSpectrum ? "|X[k]|：复数频率分量幅度" : "Re(X[k])：当前 stage 的实部"}</text>
        </svg></div>
        <aside className="space-y-4 rounded-card border border-border bg-surface p-4">
          <div><label htmlFor="ch48-source" className="mb-1 block text-xs font-semibold text-primary">信号语境</label><select id="ch48-source" value={source} onChange={(event) => { setSource(event.target.value as SignalSource); setStage(0); }} className="min-h-[44px] w-full rounded-control border border-border bg-elevated px-3 py-2 text-sm text-primary"><option value="mri">MRI：k-space 采样</option><option value="ultrasound">超声：PPI 回波</option></select></div>
          <div><div className="flex items-center justify-between text-xs"><label htmlFor="ch48-stage" className="font-semibold text-primary">推进 FFT stage</label><span className="font-mono text-accent">{stage}/{snapshots.length - 1}</span></div><input id="ch48-stage" type="range" min={0} max={snapshots.length - 1} value={stage} onChange={(event) => setStage(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" /></div>
          <label className="flex items-start gap-2 text-xs text-secondary"><input type="checkbox" checked={showSpectrum} onChange={(event) => setShowSpectrum(event.target.checked)} className="mt-0.5 accent-[var(--accent)]" /><span><strong className="text-primary">显示幅度频谱</strong><br />关闭后查看实部</span></label>
          <div className="rounded-card border border-border bg-elevated p-3 text-xs"><p className="font-semibold text-primary">本轮证据</p><dl className="mt-2 space-y-2 text-secondary"><div className="flex justify-between gap-3"><dt>当前 stage</dt><dd className="font-mono text-success">{stage < 2 ? "准备" : current.label.replace("：", " ")}</dd></div><div className="flex justify-between gap-3"><dt>累计 butterfly</dt><dd className="font-mono text-warning">{current.butterflies}</dd></div><div className="flex justify-between gap-3"><dt>理论复杂度</dt><dd className="font-mono text-accent">8·log₂8</dd></div></dl></div>
          <button type="button" onClick={reset} className="min-h-[44px] w-full rounded-control border border-border px-3 py-2 text-xs font-semibold text-secondary hover:border-accent hover:text-accent">重置实验</button>
        </aside>
      </div>
      <div className="border-t border-border px-5 py-3 text-xs text-secondary">这是可读的小规模教学实验：每次 stage 都真正执行复数加减乘与 twiddle weight 旋转；医疗重建还需处理采集、插值、噪声和边界条件。</div>
    </section>
  );
}
