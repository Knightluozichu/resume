"use client";

import { useState } from "react";

export function PaeModelCoderPipelineDiagram() {
  const stages = [
    ["符号流", "abracadabra"],
    ["统计模型", "估计 P(symbol | context)"],
    ["编码器", "把概率区间变成 bits"],
    ["压缩流", "010011..."],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-2 sm:grid-cols-4">
          {stages.map(([title, detail], index) => (
            <div key={title} className="relative border border-border bg-background p-3 text-center">
              <div className="text-xs font-semibold text-accent">{index + 1}. {title}</div>
              <div className="mt-2 min-h-10 text-xs leading-5 text-secondary">{detail}</div>
              {index < stages.length - 1 ? <span className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 bg-elevated px-1 text-accent sm:block">→</span> : null}
            </div>
          ))}
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="border border-success bg-success/10 p-3 text-xs leading-5 text-secondary"><strong className="text-success">模型负责预测：</strong>0 阶频率、k 阶上下文或 PPM 都只产生概率。</div>
          <div className="border border-accent bg-accent/10 p-3 text-xs leading-5 text-secondary"><strong className="text-accent">编码器负责表示：</strong>Huffman、Arithmetic 或 Range 把概率转换成可逆 bitstream。</div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        统计压缩是“模型 + 编码器”的组合；换模型不必重写编码原理，换编码器也不改变上下文统计。
      </figcaption>
    </figure>
  );
}

const huffmanStages = [
  ["a:5", "b:9", "c:12", "d:13", "e:16", "f:45"],
  ["c:12", "d:13", "ab:14", "e:16", "f:45"],
  ["ab:14", "e:16", "cd:25", "f:45"],
  ["cd:25", "abe:30", "f:45"],
  ["f:45", "abcde:55"],
  ["abcdef:100"],
] as const;

export function PaeHuffmanMergeLab() {
  const [stage, setStage] = useState(0);
  const merged = stage === 0 ? "尚未合并" : stage === 5 ? "根节点完成" : `第 ${stage} 次合并已完成`;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">贪心合并步骤：{stage} / 5
          <input className="mt-2 w-full accent-current" type="range" min="0" max="5" value={stage} onChange={(event) => setStage(Number(event.target.value))} />
        </label>
        <div className="mt-4 flex min-h-20 flex-wrap items-center justify-center gap-2">
          {huffmanStages[stage].map((node, index) => (
            <div key={node} className={"border px-3 py-2 text-center font-mono text-sm " + (index < 2 && stage < 5 ? "border-accent bg-accent/10 font-semibold text-accent" : "border-border bg-background text-primary")}>{node}</div>
          ))}
        </div>
        <div className="mt-3 text-center text-xs text-secondary">{merged}。下一步总是取当前权重最小的两个节点。</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Huffman 自底向上合并两个最小频率；高频符号靠近根，低频符号承担更长路径。
      </figcaption>
    </figure>
  );
}

const canonicalRows = [
  { symbol: "f", frequency: 45, length: 1, code: "0" },
  { symbol: "c", frequency: 12, length: 3, code: "100" },
  { symbol: "d", frequency: 13, length: 3, code: "101" },
  { symbol: "e", frequency: 16, length: 3, code: "110" },
  { symbol: "a", frequency: 5, length: 4, code: "1110" },
  { symbol: "b", frequency: 9, length: 4, code: "1111" },
] as const;

export function PaeCanonicalHuffmanDiagram() {
  const [selected, setSelected] = useState(3);
  const row = canonicalRows[selected];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <input className="w-full accent-current" type="range" min="0" max={canonicalRows.length - 1} value={selected} onChange={(event) => setSelected(Number(event.target.value))} aria-label="选择 Canonical Huffman 符号" />
        <div className="mt-4 overflow-x-auto">
          <div className="grid min-w-[32rem] grid-cols-5 border-b border-border pb-2 text-center text-xs font-semibold text-secondary"><span>次序</span><span>symbol</span><span>count</span><span>length</span><span>canonical code</span></div>
          {canonicalRows.map((item, index) => (
            <div key={item.symbol} className={"grid min-w-[32rem] grid-cols-5 border-b border-border/60 py-2 text-center text-xs " + (index === selected ? "bg-accent/10 text-accent" : "text-primary")}><span>{index}</span><span>{item.symbol}</span><span>{item.frequency}</span><span>{item.length}</span><span className="font-mono font-semibold">{item.code}</span></div>
          ))}
        </div>
        <div className="mt-3 border border-accent bg-accent/10 p-3 text-xs leading-5 text-secondary">选中 <strong className="text-accent">{row.symbol}</strong>：只凭长度 {row.length}、同长度内次序和每层首码，就能重建 <span className="font-mono text-primary">{row.code}</span>，无需传输原树指针。</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Canonical Huffman 保留每个符号的码长，按“长度、符号”排序后连续分配整数码，码表更紧凑且解码表易构造。
      </figcaption>
    </figure>
  );
}

const arithmeticSteps = [
  { symbol: "start", low: 0, high: 1, note: "初始区间 [0,1)" },
  { symbol: "a", low: 0, high: 0.5, note: "a 占前 1/2" },
  { symbol: "b", low: 0.25, high: 0.375, note: "在 a 区间内选择 b 的 1/4" },
  { symbol: "a", low: 0.25, high: 0.3125, note: "再次选择 a 的前 1/2" },
  { symbol: "c", low: 0.296875, high: 0.3125, note: "最终区间 [19/64,20/64)" },
] as const;

export function PaeArithmeticIntervalLab() {
  const [step, setStep] = useState(0);
  const current = arithmeticSteps[step];
  const width = current.high - current.low;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">编码序列 abac：步骤 {step} / 4
          <input className="mt-2 w-full accent-current" type="range" min="0" max="4" value={step} onChange={(event) => setStep(Number(event.target.value))} />
        </label>
        <div className="mt-5 h-16 border border-border bg-background p-2">
          <div className="relative h-full bg-border/30">
            <div className="absolute inset-y-0 border-x-2 border-accent bg-accent/30" style={{ left: `${current.low * 100}%`, width: `${Math.max(width * 100, 1.5)}%` }} />
            <span className="absolute bottom-1 left-2 text-[10px] text-secondary">0</span><span className="absolute bottom-1 right-2 text-[10px] text-secondary">1</span>
          </div>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3"><div className="border border-border bg-background p-3 text-xs text-secondary">low<div className="mt-1 font-mono text-primary">{current.low}</div></div><div className="border border-border bg-background p-3 text-xs text-secondary">high<div className="mt-1 font-mono text-primary">{current.high}</div></div><div className="border border-success bg-success/10 p-3 text-xs text-secondary">width<div className="mt-1 font-mono font-semibold text-success">{width}</div></div></div>
        <p className="mb-0 mt-3 text-xs leading-5 text-secondary">{current.note}；最终任选其中一个二进制小数即可代表整个序列。</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Arithmetic Coding 不为单个符号凑整位，而让整条消息对应一个嵌套区间；区间宽度等于各符号条件概率之积。
      </figcaption>
    </figure>
  );
}

const rangeSteps = [
  { symbol: "start", before: "[0,16)", chosen: "[0,16)", emit: "-", after: "[0,16)" },
  { symbol: "a", before: "[0,16)", chosen: "[0,8)", emit: "0", after: "[0,16)" },
  { symbol: "b", before: "[0,16)", chosen: "[8,12)", emit: "10", after: "[0,16)" },
  { symbol: "a", before: "[0,16)", chosen: "[0,8)", emit: "0", after: "[0,16)" },
  { symbol: "c", before: "[0,16)", chosen: "[12,16)", emit: "11", after: "[0,16)" },
] as const;

export function PaeRangeRenormalizationLab() {
  const [step, setStep] = useState(1);
  const current = rangeSteps[step];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">16 状态 Range Coding：读取 {current.symbol}
          <input className="mt-2 w-full accent-current" type="range" min="1" max="4" value={step} onChange={(event) => setStep(Number(event.target.value))} />
        </label>
        <div className="mt-4 grid gap-2 sm:grid-cols-4">
          {[['输入区间', current.before], ['选中子区间', current.chosen], ['可输出位', current.emit], ['放大后', current.after]].map(([label, value], index) => <div key={label} className={"border p-3 text-center text-xs text-secondary " + (index === 2 ? "border-accent bg-accent/10" : "border-border bg-background")}><div>{label}</div><div className={"mt-2 font-mono text-sm font-semibold " + (index === 2 ? "text-accent" : "text-primary")}>{value}</div></div>)}
        </div>
        <p className="mb-0 mt-3 text-xs leading-5 text-secondary">当整个子区间落入下半或上半区，输出共同首位并把区间放大回机器字范围；跨中点的窄区间需记录 underflow，稍后补发互补位。</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Range Coding 用整数端点和持续重归一化实现算术编码，避免无限精度小数并允许边读边输出。
      </figcaption>
    </figure>
  );
}

const ppmCases = {
  c: [
    ["order 2", "ra → c", "命中，P=1/2"],
  ],
  d: [
    ["order 2", "ra → esc", "c 已知但不是 d"],
    ["order 1", "a → d", "排除 c 后 P=1/6"],
  ],
  e: [
    ["order 2", "ra → esc", "未见 e"],
    ["order 1", "a → esc", "继续后退"],
    ["order 0", "∅ → esc", "仍是新符号"],
    ["order -1", "uniform unseen", "在未见字符中均匀选择"],
  ],
} as const;

export function PaePpmContextLab() {
  const [next, setNext] = useState<keyof typeof ppmCases>("d");

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="text-sm font-semibold text-primary">前缀 abracadabra，K=2；选择下一个符号</div>
        <div className="mt-3 flex gap-2" role="group" aria-label="选择 PPM 下一个字符">
          {(["c", "d", "e"] as const).map((symbol) => <button key={symbol} type="button" onClick={() => setNext(symbol)} className={"min-h-10 min-w-12 border px-4 text-sm font-semibold " + (next === symbol ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{symbol}</button>)}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-4">
          {ppmCases[next].map(([order, prediction, note], index) => <div key={order} className={"relative border p-3 text-xs " + (index === ppmCases[next].length - 1 ? "border-success bg-success/10" : "border-border bg-background")}><div className="font-semibold text-accent">{order}</div><div className="mt-2 font-mono text-primary">{prediction}</div><div className="mt-2 leading-5 text-secondary">{note}</div>{index < ppmCases[next].length - 1 ? <div className="mt-2 text-accent">escape ↓</div> : null}</div>)}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        PPM 从最长上下文开始；预测失败就编码 escape 并退到更短上下文，最终以 order -1 覆盖全字母表。
      </figcaption>
    </figure>
  );
}

export function PaeCoderTradeoffMap() {
  const rows = [
    ["Canonical Huffman", "整数位/符号", "快，可查表", "码字边界可重启", "静态 token 频率"],
    ["Arithmetic", "整段接近熵", "精度与依赖较重", "必须从块首解", "极偏概率、动态模型"],
    ["Range Coding", "接近 Arithmetic", "整数运算、流式", "按块重启", "工程化算术编码"],
    ["PPM + Range", "利用高阶上下文", "模型内存较大", "需同步上下文", "自然语言与重复序列"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <div className="min-w-[46rem]">
          <div className="grid grid-cols-5 border-b border-border pb-2 text-center text-xs font-semibold text-secondary"><span>方案</span><span>粒度</span><span>吞吐</span><span>随机访问</span><span>适合模型</span></div>
          {rows.map((row) => <div key={row[0]} className="grid grid-cols-5 border-b border-border/60 py-3 text-center text-xs leading-5 text-secondary"><strong className="text-primary">{row[0]}</strong><span>{row[1]}</span><span>{row[2]}</span><span>{row[3]}</span><span>{row[4]}</span></div>)}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        编码方案不能只按压缩率排序；块边界、模型开销、解码吞吐和随机访问共同决定端到端选择。
      </figcaption>
    </figure>
  );
}
