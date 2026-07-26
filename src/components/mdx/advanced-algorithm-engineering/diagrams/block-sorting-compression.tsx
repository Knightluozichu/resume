"use client";

import { useMemo, useState } from "react";

const bwtSource = "abracadabra$";
const rotations = Array.from({ length: bwtSource.length }, (_, index) => bwtSource.slice(index) + bwtSource.slice(0, index));
const sortedRotations = [...rotations].sort((left, right) => left < right ? -1 : left > right ? 1 : 0);

export function PaeBwtForwardTransformLab() {
  const [sorted, setSorted] = useState(true);
  const [selected, setSelected] = useState(3);
  const rows = sorted ? sortedRotations : rotations;
  const lastColumn = rows.map((row) => row.at(-1)).join("");
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="flex gap-2" role="group" aria-label="选择旋转矩阵状态"><button type="button" onClick={() => setSorted(false)} className={"min-h-11 border px-3 text-sm font-semibold " + (!sorted ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>cyclic rotations</button><button type="button" onClick={() => setSorted(true)} className={"min-h-11 border px-3 text-sm font-semibold " + (sorted ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>sorted rows</button></div>
        <input className="mt-4 w-full accent-current" type="range" min="0" max={rows.length - 1} value={selected} onChange={(event) => setSelected(Number(event.target.value))} aria-label="选择 BWT 矩阵行" />
        <div className="mt-3 grid gap-1 sm:grid-cols-2">{rows.map((row, index) => <div key={row} className={"grid grid-cols-[2rem_1fr_2rem] border px-2 py-1 font-mono text-xs " + (index === selected ? "border-accent bg-accent/10 text-accent" : "border-border bg-background text-secondary")}><span>{index}</span><span>{row.slice(0, -1)}</span><strong className="text-center text-primary">{row.at(-1)}</strong></div>)}</div>
        <div className="mt-3 border border-success bg-success/10 p-3 text-xs text-secondary">last column：<span className="font-mono font-semibold text-success">{lastColumn}</span>{sorted ? "；去掉 $ 后得到 L̂=ardrcaaaabb，$ 位于 r=3。" : "；尚未排序时没有局部同质性保证。"}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        BWT 对所有 cyclic rotations 做字典序排序，输出 sorted matrix 的最后一列与 sentinel 位置；它只置换字符，不直接缩短数据。
      </figcaption>
    </figure>
  );
}

const bwtL = "ard$rcaaaabb";
const bwtF = [...bwtL].sort((left, right) => left < right ? -1 : left > right ? 1 : 0).join("");
const lf = (() => {
  const starts = new Map<string, number>();
  for (let index = 0; index < bwtF.length; index += 1) if (!starts.has(bwtF[index])) starts.set(bwtF[index], index);
  const seen = new Map<string, number>();
  return [...bwtL].map((symbol) => {
    const rank = seen.get(symbol) ?? 0;
    seen.set(symbol, rank + 1);
    return (starts.get(symbol) ?? 0) + rank;
  });
})();

export function PaeLfMappingLab() {
  const [index, setIndex] = useState(0);
  const symbol = bwtL[index];
  const occurrence = bwtL.slice(0, index + 1).split(symbol).length - 1;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">选择 L[i]：i={index}<input className="mt-2 w-full accent-current" type="range" min="0" max={bwtL.length - 1} value={index} onChange={(event) => setIndex(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_1fr]"><div className="border border-border bg-background p-3"><div className="text-xs text-secondary">L</div><div className="mt-2 flex flex-wrap gap-1">{[...bwtL].map((char, position) => <span key={position} className={"min-w-7 border p-1 text-center font-mono text-xs " + (position === index ? "border-accent bg-accent/10 text-accent" : "border-border text-primary")}>{char}</span>)}</div></div><div className="self-center text-accent">LF →</div><div className="border border-border bg-background p-3"><div className="text-xs text-secondary">F</div><div className="mt-2 flex flex-wrap gap-1">{[...bwtF].map((char, position) => <span key={position} className={"min-w-7 border p-1 text-center font-mono text-xs " + (position === lf[index] ? "border-success bg-success/10 text-success" : "border-border text-primary")}>{char}</span>)}</div></div></div>
        <p className="mb-0 mt-3 text-xs leading-5 text-secondary">L 中第 {occurrence} 个 <strong className="text-accent">{symbol}</strong> 映射到 F 中第 {occurrence} 个相同字符，故 LF[{index}]={lf[index]}。</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        LF mapping 保持同字符 occurrence 的相对次序；沿 LF 反复跳转即可从右向左恢复原串。
      </figcaption>
    </figure>
  );
}

const mtfInput = "bananacocco";
const mtfInitial = ["a", "b", "c", "n", "o"];

function mtfTrace() {
  const list = [...mtfInitial];
  const trace: Array<{ symbol: string; index: number; before: string; after: string; output: string }> = [];
  let output = "";
  for (const symbol of mtfInput) {
    const before = list.join("");
    const index = list.indexOf(symbol);
    output += String(index);
    list.splice(index, 1);
    list.unshift(symbol);
    trace.push({ symbol, index, before, after: list.join(""), output });
  }
  return trace;
}

const mtfSteps = mtfTrace();

export function PaeMoveToFrontLab() {
  const [step, setStep] = useState(0);
  const current = mtfSteps[step];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">MTF 处理 bananacocco：{step + 1} / {mtfSteps.length}<input className="mt-2 w-full accent-current" type="range" min="0" max={mtfSteps.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-4">{[["symbol", current.symbol], ["list before", current.before], ["emit index", String(current.index)], ["move front", current.after]].map(([label, value], index) => <div key={label} className={"border p-3 text-center text-xs text-secondary " + (index === 2 ? "border-accent bg-accent/10" : "border-border bg-background")}><div>{label}</div><div className={"mt-2 font-mono text-sm font-semibold " + (index === 2 ? "text-accent" : "text-primary")}>{value}</div></div>)}</div>
        <div className="mt-3 font-mono text-sm text-success">output prefix: {current.output}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        最近出现的符号被移到表首；局部重复会连续产生0或小整数，把不同字符的同质区统一成低值整数流。
      </figcaption>
    </figure>
  );
}

export function PaeWheelerRleZeroLab() {
  const [length, setLength] = useState(5);
  const increased = length + 1;
  const binary = increased.toString(2);
  const code = binary.slice(1);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">0-run length ℓ={length}<input className="mt-2 w-full accent-current" type="range" min="1" max="31" value={length} onChange={(event) => setLength(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-4">{[["run", "0".repeat(Math.min(length, 12)) + (length > 12 ? "…" : "")], ["ℓ+1", String(increased)], ["binary", binary], ["drop leading 1", code]].map(([label, value], index) => <div key={label} className={"border p-3 text-center text-xs text-secondary " + (index === 3 ? "border-success bg-success/10" : "border-border bg-background")}><div>{label}</div><div className={"mt-2 break-all font-mono text-sm font-semibold " + (index === 3 ? "text-success" : "text-primary")}>{value}</div></div>)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        bzip 的 RLE0 只编码 MTF 输出中的0-runs；Wheeler code 写 binary(ℓ+1) 去掉必为1的首位，并保留0/1作为专用字母。
      </figcaption>
    </figure>
  );
}

export function PaeBzipPipelineDiagram() {
  const stages = [
    ["BWT", "global context sort", "L locally homogeneous"],
    ["MTF", "recent symbol → index", "many 0 / small ints"],
    ["RLE0", "encode only zero runs", "RUN-A / RUN-B stream"],
    ["entropy coder", "Huffman-like codes", "compressed bits"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="grid gap-2 border border-border bg-elevated p-4 sm:grid-cols-4 sm:p-5">{stages.map(([name, action, result], index) => <div key={name} className="relative border border-border bg-background p-3 text-center"><div className="text-sm font-semibold text-accent">{index + 1}. {name}</div><div className="mt-2 text-xs text-secondary">{action}</div><div className="mt-3 border-t border-border pt-2 text-xs text-success">{result}</div>{index < stages.length - 1 ? <span className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 bg-elevated px-1 text-accent sm:block">→</span> : null}</div>)}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        bzip 的每一步为下一步制造结构；BWT 本身不压缩，最终统计 coder 才把变换后的 alphabet 写成 bitstream。
      </figcaption>
    </figure>
  );
}

export function PaeCompressionBoostingDiagram() {
  const contexts = [
    ["context ab", "preceders: a a r", "H0(Lab)"],
    ["context ra", "preceders: b b", "H0(Lra)"],
    ["context ac", "preceders: r", "H0(Lac)=0"],
    ["other", "context-specific runs", "sum blocks"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5"><div className="text-sm font-semibold text-primary">BWT 的 L 按相同 k-context 自动形成连续 blocks</div><div className="mt-4 grid gap-2 sm:grid-cols-4">{contexts.map(([context, symbols, cost]) => <div key={context} className="border border-border bg-background p-3 text-xs text-secondary"><strong className="text-accent">{context}</strong><div className="mt-2">{symbols}</div><div className="mt-2 font-mono text-success">{cost}</div></div>)}</div><div className="mt-3 border border-success bg-success/10 p-3 text-xs leading-5 text-secondary">分别用0阶 coder 压缩每个 block，其加权熵之和就是高阶经验熵 Hk；动态规划还可在不知道 k 时选择更优 partition。</div></div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Compression boosting 借 BWT 把同一右上下文的前驱聚在一起，用多个0阶压缩问题模拟一个k阶模型。
      </figcaption>
    </figure>
  );
}

const fmSteps = [
  { suffix: "b", first: 6, last: 7, note: "F 中所有以 b 开头的 rows" },
  { suffix: "ab", first: 2, last: 3, note: "用 Rank(a,5)=1 与 Rank(a,7)=3 向左扩展" },
] as const;

export function PaeFmBackwardSearchLab() {
  const [step, setStep] = useState(0);
  const current = fmSteps[step];
  const matches = useMemo(() => current.last - current.first + 1, [current]);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="flex gap-2" role="group" aria-label="FM backward search 步骤">{fmSteps.map((item, index) => <button key={item.suffix} type="button" onClick={() => setStep(index)} className={"min-h-11 border px-4 text-sm font-semibold " + (step === index ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>suffix {item.suffix}</button>)}</div>
        <div className="mt-4 grid gap-2 sm:grid-cols-4">{[["pattern suffix", current.suffix], ["first", String(current.first)], ["last", String(current.last)], ["occurrences", String(matches)]].map(([label, value], index) => <div key={label} className={"border p-3 text-center text-xs text-secondary " + (index === 3 ? "border-success bg-success/10" : "border-border bg-background")}><div>{label}</div><div className={"mt-2 font-mono text-sm font-semibold " + (index === 3 ? "text-success" : "text-primary")}>{value}</div></div>)}</div>
        <p className="mb-0 mt-3 text-xs leading-5 text-secondary">{current.note}；只访问压缩的 L、累计计数 C 与 Rank，不必解压原文。</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        FM-index 从 pattern 末字符开始，每次用 LF/Rank 向左扩展 row interval；最终区间长度就是 Count(P)。
      </figcaption>
    </figure>
  );
}
