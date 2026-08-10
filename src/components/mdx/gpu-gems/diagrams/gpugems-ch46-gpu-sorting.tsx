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
        <svg viewBox="0 0 720 390" role="img" aria-label={ariaLabel} className="mx-auto block h-auto w-full max-w-[720px]">{children}</svg>
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

export function GpuGemsCh46CompareSwapDiagram() {
  return (
    <Frame ariaLabel="排序网络中的 compare-swap：两个相邻 key 进入比较器，小值沿上方通道，大值沿下方通道输出" caption="一个 compare-swap 单元只读两个位置、写回两个确定位置；许多单元可以并行。">
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>排序网络：compare-swap 是 GPU 的基本积木</text>
      <line x1={58} y1={130} x2={268} y2={130} stroke={border} strokeWidth={4} />
      <line x1={58} y1={242} x2={268} y2={242} stroke={border} strokeWidth={4} />
      <circle cx={82} cy={130} r={20} fill={surface} stroke={accent} strokeWidth={2} /><text x={82} y={135} textAnchor="middle" fontSize={12} fill={primary}>a</text>
      <circle cx={82} cy={242} r={20} fill={surface} stroke={accent} strokeWidth={2} /><text x={82} y={247} textAnchor="middle" fontSize={12} fill={primary}>b</text>
      <rect x={268} y={86} width={166} height={200} rx={16} fill={accent} fillOpacity={0.1} stroke={accent} strokeWidth={2} />
      <text x={351} y={126} textAnchor="middle" fontSize={14} fontWeight={700} fill={accent}>compare</text>
      <text x={351} y={156} textAnchor="middle" fontSize={12} fill={secondary}>key a ? key b</text>
      <text x={351} y={207} textAnchor="middle" fontSize={13} fill={success}>min → 上通道</text>
      <text x={351} y={238} textAnchor="middle" fontSize={13} fill={warning}>max → 下通道</text>
      <Arrow x1={106} y1={130} x2={258} y2={130} /><Arrow x1={106} y1={242} x2={258} y2={242} />
      <Arrow x1={444} y1={130} x2={590} y2={130} color={success} /><Arrow x1={444} y1={242} x2={590} y2={242} color={warning} />
      <line x1={590} y1={130} x2={666} y2={130} stroke={success} strokeWidth={4} /><line x1={590} y1={242} x2={666} y2={242} stroke={warning} strokeWidth={4} />
      <text x={628} y={113} textAnchor="middle" fontSize={12} fill={success}>小</text><text x={628} y={270} textAnchor="middle" fontSize={12} fill={warning}>大</text>
      <text x={360} y={346} textAnchor="middle" fontSize={13} fill={secondary}>排序网络不依赖数据分支路径，控制流由 pass 参数提前确定</text>
    </Frame>
  );
}

export function GpuGemsCh46OddEvenBitonicDiagram() {
  return (
    <Frame ariaLabel="odd-even merge 和 bitonic merge 的比较：前者保留接近有序数组的中间结构，后者每个阶段都进行更规则的全量比较" caption="两种网络都适合 GPU，但中间状态和 pass 数量的取舍不同。">
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>两种网络：可铺开，但优化目标不同</text>
      <g transform="translate(46 78)">
        <text x={130} y={0} textAnchor="middle" fontSize={14} fontWeight={700} fill={accent}>odd-even merge</text>
        {Array.from({ length: 5 }, (_, row) => <g key={row}><line x1={28} y1={34 + row * 38} x2={236} y2={34 + row * 38} stroke={border} strokeWidth={2} />{Array.from({ length: 4 }, (_, col) => <circle key={col} cx={50 + col * 56} cy={34 + row * 38} r={8} fill={row === 2 ? accent : surface} stroke={accent} />)}</g>)}
        <text x={130} y={242} textAnchor="middle" fontSize={12} fill={secondary}>中间状态较平滑</text>
      </g>
      <g transform="translate(378 78)">
        <text x={130} y={0} textAnchor="middle" fontSize={14} fontWeight={700} fill={success}>bitonic merge</text>
        {Array.from({ length: 5 }, (_, row) => <g key={row}><line x1={28} y1={34 + row * 38} x2={236} y2={34 + row * 38} stroke={border} strokeWidth={2} />{Array.from({ length: 4 }, (_, col) => <circle key={col} cx={50 + col * 56} cy={34 + row * 38} r={8} fill={row % 2 === 0 ? success : warning} fillOpacity={0.42} stroke={row % 2 === 0 ? success : warning} />)}</g>)}
        <text x={130} y={242} textAnchor="middle" fontSize={12} fill={secondary}>升降序 bitonic 序列</text>
      </g>
      <rect x={98} y={326} width={524} height={32} rx={10} fill={surface} stroke={border} /><text x={360} y={347} textAnchor="middle" fontSize={12} fill={primary}>实时粒度优先 odd-even；吞吐优先 bitonic</text>
    </Frame>
  );
}

export function GpuGemsCh46BitonicStageDiagram() {
  return (
    <Frame ariaLabel="bitonic sort 的 stage 和 pass：每个 stage 把序列长度扩大一倍，内部 pass 逐步缩短比较距离并合并升降序子序列" caption="第 i 个 stage 有 i 个 pass；比较距离从远到近，最终合成全局有序序列。">
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>bitonic merge：stage × pass 的规则网格</text>
      {Array.from({ length: 3 }, (_, stage) => {
        const x = 76 + stage * 210;
        return <g key={stage}><text x={x + 74} y={78} textAnchor="middle" fontSize={13} fontWeight={700} fill={accent}>stage {stage + 1}</text>{Array.from({ length: stage + 1 }, (_, pass) => <g key={pass}><rect x={x} y={102 + pass * 58} width={148} height={40} rx={8} fill={pass === stage ? success : surface} fillOpacity={pass === stage ? 0.16 : 1} stroke={pass === stage ? success : border} /><text x={x + 18} y={127 + pass * 58} fontSize={12} fill={primary}>pass {pass + 1}</text><text x={x + 112} y={127 + pass * 58} textAnchor="middle" fontSize={12} fill={pass === stage ? success : secondary}>d={2 ** (stage - pass)}</text></g>)}</g>;
      })}
      <Arrow x1={128} y1={298} x2={590} y2={298} color={warning} />
      <text x={360} y={329} textAnchor="middle" fontSize={13} fill={secondary}>CPU 只改变 stage、pass、compare distance；shader 每轮做同一类工作</text>
    </Frame>
  );
}

export function GpuGemsCh46GpuPassDiagram() {
  return (
    <Frame ariaLabel="GPU sort pass：source texture 提供当前 key 和 partner key，fragment compare 后写入 target texture，随后交换双缓冲角色" caption="每个 pass 使用两张纹理隔离读写；全屏 quad 覆盖所有待排序位置。">
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>一个 GPU pass：全屏 quad + 双缓冲</text>
      <g transform="translate(48 100)">
        <rect width={196} height={136} rx={16} fill={surface} stroke={accent} strokeWidth={2} /><text x={98} y={34} textAnchor="middle" fontSize={14} fontWeight={700} fill={accent}>source texture</text><text x={98} y={66} textAnchor="middle" fontSize={12} fill={secondary}>key[i]</text><text x={98} y={92} textAnchor="middle" fontSize={12} fill={secondary}>key[partner(i)]</text><text x={98} y={118} textAnchor="middle" fontSize={11} fill={accent}>只读</text>
      </g>
      <Arrow x1={260} y1={168} x2={336} y2={168} />
      <g transform="translate(344 82)">
        <rect width={184} height={172} rx={16} fill={accent} fillOpacity={0.1} stroke={accent} strokeWidth={2} /><text x={92} y={34} textAnchor="middle" fontSize={14} fontWeight={700} fill={accent}>fragment shader</text><text x={92} y={70} textAnchor="middle" fontSize={12} fill={primary}>compare + direction</text><text x={92} y={100} textAnchor="middle" fontSize={12} fill={secondary}>min / max</text><text x={92} y={130} textAnchor="middle" fontSize={12} fill={secondary}>write result</text>
      </g>
      <Arrow x1={544} y1={168} x2={620} y2={168} color={success} />
      <rect x={622} y={108} width={76} height={120} rx={14} fill={success} fillOpacity={0.12} stroke={success} strokeWidth={2} /><text x={660} y={145} textAnchor="middle" fontSize={13} fontWeight={700} fill={success}>target</text><text x={660} y={174} textAnchor="middle" fontSize={12} fill={primary}>next</text><text x={660} y={201} textAnchor="middle" fontSize={11} fill={success}>交换</text>
      <text x={360} y={324} textAnchor="middle" fontSize={13} fill={secondary}>下一轮把 target 当 source；排序直到所有 stage/pass 完成</text>
    </Frame>
  );
}

export function GpuGemsCh46PackingDiagram() {
  return (
    <Frame ariaLabel="key/index packing：一个 RGBA texel 打包两个 key/index 对，最后一级邻居比较可以在同一个 fragment 内完成并减少一次 fetch" caption="把 key 和 index 作为一体移动，既保持排序对象关联，也降低最后一级比较的取样次数。">
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>key/index packing：排序键不能和对象索引分离</text>
      <g transform="translate(52 92)">
        <text x={116} y={0} textAnchor="middle" fontSize={13} fontWeight={700} fill={secondary}>两个逻辑 item</text>
        <rect x={0} y={24} width={104} height={82} rx={12} fill={accent} fillOpacity={0.12} stroke={accent} /><text x={52} y={55} textAnchor="middle" fontSize={12} fill={primary}>key 0.42</text><text x={52} y={82} textAnchor="middle" fontSize={12} fill={secondary}>index 17</text>
        <rect x={128} y={24} width={104} height={82} rx={12} fill={success} fillOpacity={0.12} stroke={success} /><text x={180} y={55} textAnchor="middle" fontSize={12} fill={primary}>key 0.77</text><text x={180} y={82} textAnchor="middle" fontSize={12} fill={secondary}>index 04</text>
      </g>
      <Arrow x1={300} y1={158} x2={380} y2={158} />
      <g transform="translate(390 92)">
        <text x={118} y={0} textAnchor="middle" fontSize={13} fontWeight={700} fill={secondary}>一个 RGBA texel</text>
        {[["R", "key 0.42", accent], ["G", "index 17", accent], ["B", "key 0.77", success], ["A", "index 04", success]].map(([channel, label, color], index) => <g key={channel}><rect x={(index % 2) * 118} y={24 + Math.floor(index / 2) * 48} width={108} height={38} rx={7} fill={color} fillOpacity={0.12} stroke={color} /><text x={(index % 2) * 118 + 16} y={48 + Math.floor(index / 2) * 48} fontSize={11} fontWeight={700} fill={color}>{channel}</text><text x={(index % 2) * 118 + 66} y={48 + Math.floor(index / 2) * 48} textAnchor="middle" fontSize={11} fill={primary}>{label}</text></g>)}
      </g>
      <rect x={108} y={284} width={504} height={50} rx={13} fill={surface} stroke={border} /><text x={360} y={315} textAnchor="middle" fontSize={13} fill={secondary}>最后一级只比较邻居：同一 fragment 内完成，省掉第二次 texture fetch</text>
    </Frame>
  );
}

type Item = { key: number; index: number };
type Algorithm = "bitonic" | "odd-even";
type Snapshot = { items: Item[]; comparisons: number; label: string; pairs: Array<[number, number]> };

const INITIAL_ITEMS: Item[] = [
  { key: 0.62, index: 0 }, { key: 0.18, index: 1 }, { key: 0.91, index: 2 }, { key: 0.34, index: 3 },
  { key: 0.77, index: 4 }, { key: 0.08, index: 5 }, { key: 0.53, index: 6 }, { key: 0.45, index: 7 },
  { key: 0.29, index: 8 }, { key: 0.86, index: 9 }, { key: 0.11, index: 10 }, { key: 0.70, index: 11 },
  { key: 0.39, index: 12 }, { key: 0.99, index: 13 }, { key: 0.24, index: 14 }, { key: 0.57, index: 15 },
];

function copyItems(items: Item[]) {
  return items.map((item) => ({ ...item }));
}

function buildBitonicHistory(): Snapshot[] {
  let items = copyItems(INITIAL_ITEMS);
  const history: Snapshot[] = [{ items: copyItems(items), comparisons: 0, label: "初始输入", pairs: [] }];
  let comparisons = 0;
  for (let size = 2; size <= items.length; size *= 2) {
    for (let distance = size / 2; distance >= 1; distance /= 2) {
      const pairs: Array<[number, number]> = [];
      const next = copyItems(items);
      for (let i = 0; i < items.length; i += 1) {
        const partner = i ^ distance;
        if (partner > i) {
          pairs.push([i, partner]);
          const ascending = (i & size) === 0;
          const shouldSwap = ascending ? next[i].key > next[partner].key : next[i].key < next[partner].key;
          if (shouldSwap) [next[i], next[partner]] = [next[partner], next[i]];
          comparisons += 1;
        }
      }
      items = next;
      history.push({ items: copyItems(items), comparisons, label: `bitonic size=${size} · distance=${distance}`, pairs });
    }
  }
  return history;
}

function buildOddEvenHistory(): Snapshot[] {
  let items = copyItems(INITIAL_ITEMS);
  const history: Snapshot[] = [{ items: copyItems(items), comparisons: 0, label: "初始输入", pairs: [] }];
  let comparisons = 0;
  for (let phase = 0; phase < items.length; phase += 1) {
    const pairs: Array<[number, number]> = [];
    const next = copyItems(items);
    for (let i = phase % 2; i < items.length - 1; i += 2) {
      pairs.push([i, i + 1]);
      if (next[i].key > next[i + 1].key) [next[i], next[i + 1]] = [next[i + 1], next[i]];
      comparisons += 1;
    }
    items = next;
    history.push({ items: copyItems(items), comparisons, label: `odd-even phase=${phase + 1}`, pairs });
  }
  return history;
}

export function GpuGemsCh46SortingLab() {
  const [algorithm, setAlgorithm] = useState<Algorithm>("bitonic");
  const [progress, setProgress] = useState(0);
  const [packed, setPacked] = useState(false);
  const history = useMemo(() => algorithm === "bitonic" ? buildBitonicHistory() : buildOddEvenHistory(), [algorithm]);
  const currentIndex = Math.min(progress, history.length - 1);
  const current = history[currentIndex];
  const maxKey = 1;
  const fragments = packed ? Math.ceil(current.items.length / 2) : current.items.length;

  function reset() {
    setAlgorithm("bitonic");
    setProgress(0);
    setPacked(false);
  }

  return (
    <section className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated" aria-label="GPU Gems Chapter 46 排序网络实验：切换 bitonic 和 odd-even 算法，推进 pass 并观察 key/index 排序和 packing" data-visual-kind="gpu-gems-ch46-gpu-sorting">
      <div className="border-b border-border px-5 py-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">GPU Gems 2 · Chapter 46</p>
            <h3 className="mt-1 text-lg font-semibold text-primary">排序网络：逐 pass 看 key 和 index 如何交换</h3>
            <p className="mt-1 max-w-2xl text-sm text-secondary">选择 bitonic 或 odd-even，推进比较 pass，观察真实 key/index 数组、比较次数和 packing 后的 fragment 数。</p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">▷ 可交互</span>
        </div>
      </div>
      <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_250px]">
        <div className="min-w-0 rounded-card border border-border bg-surface p-3">
          <svg viewBox="0 0 720 390" className="h-auto w-full" role="img" aria-label={`${algorithm === "bitonic" ? "bitonic" : "odd-even"} 排序第 ${currentIndex} 个 pass，当前比较次数 ${current.comparisons}`}>
            <text x={20} y={26} fontSize={13} fontWeight={700} fill={primary}>当前序列 · {current.label}</text>
            {current.items.map((item, index) => {
              const height = Math.max(8, item.key * 122);
              const active = current.pairs.some(([a, b]) => a === index || b === index);
              return <g key={`${item.index}-${index}`}><rect x={22 + index * 42} y={174 - height} width={27} height={height} rx={5} fill={active ? warning : accent} fillOpacity={active ? 0.78 : 0.56} stroke={active ? warning : accent} /><text x={35 + index * 42} y={194} textAnchor="middle" fontSize={11} fill={primary}>{item.index}</text><text x={35 + index * 42} y={174 - height - 7} textAnchor="middle" fontSize={11} fill={secondary}>{item.key.toFixed(2)}</text></g>;
            })}
            <line x1={18} y1={174} x2={696} y2={174} stroke={border} />
            <text x={20} y={230} fontSize={13} fontWeight={700} fill={primary}>比较伙伴</text>
            {current.pairs.slice(0, 8).map(([a, b], index) => <g key={`${a}-${b}`}><line x1={35 + a * 42} y1={250} x2={35 + b * 42} y2={250} stroke={index % 2 === 0 ? accent : success} strokeWidth={3} /><text x={(70 + (a + b) * 21)} y={274} textAnchor="middle" fontSize={11} fill={secondary}>{a} ↔ {b}</text></g>)}
            <rect x={20} y={304} width={676} height={52} rx={12} fill="var(--bg)" stroke={border} />
            <text x={38} y={335} fontSize={12} fill={secondary}>pass {currentIndex}/{history.length - 1} · comparisons {current.comparisons} · fragment groups {fragments} · {packed ? "2 个 key/index 对 / texel" : "1 个 key/index 对 / fragment"}</text>
          </svg>
        </div>
        <aside className="space-y-4 rounded-card border border-border bg-surface p-4">
          <div>
            <label htmlFor="ch46-algorithm" className="mb-1 block text-xs font-semibold text-primary">排序网络</label>
            <select id="ch46-algorithm" value={algorithm} onChange={(event) => { setAlgorithm(event.target.value as Algorithm); setProgress(0); }} className="min-h-[44px] w-full rounded-control border border-border bg-elevated px-3 py-2 text-sm text-primary">
              <option value="bitonic">bitonic merge · 吞吐优先</option>
              <option value="odd-even">odd-even · 状态较平滑</option>
            </select>
          </div>
          <div>
            <div className="flex items-center justify-between text-xs"><label htmlFor="ch46-progress" className="font-semibold text-primary">推进 pass</label><span className="font-mono text-accent">{currentIndex}/{history.length - 1}</span></div>
            <input id="ch46-progress" type="range" min={0} max={history.length - 1} value={currentIndex} onChange={(event) => setProgress(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" />
          </div>
          <label className="flex items-start gap-2 text-xs text-secondary"><input type="checkbox" checked={packed} onChange={(event) => setPacked(event.target.checked)} className="mt-0.5 accent-[var(--accent)]" /><span><strong className="text-primary">key/index packing</strong><br />两个逻辑 item 共用一个 fragment</span></label>
          <div className="rounded-card border border-border bg-elevated p-3 text-xs"><p className="font-semibold text-primary">本轮证据</p><dl className="mt-2 space-y-2 text-secondary"><div className="flex justify-between gap-3"><dt>是否有序</dt><dd className={`font-mono ${current.items.every((item, index, all) => index === 0 || all[index - 1].key <= item.key) ? "text-success" : "text-warning"}`}>{current.items.every((item, index, all) => index === 0 || all[index - 1].key <= item.key) ? "是" : "未完成"}</dd></div><div className="flex justify-between gap-3"><dt>comparisons</dt><dd className="font-mono text-accent">{current.comparisons}</dd></div><div className="flex justify-between gap-3"><dt>fragment groups</dt><dd className="font-mono text-warning">{fragments}</dd></div></dl></div>
          <button type="button" onClick={reset} className="min-h-[44px] w-full rounded-control border border-border px-3 py-2 text-xs font-semibold text-secondary hover:border-accent hover:text-accent">重置实验</button>
        </aside>
      </div>
      <div className="border-t border-border px-5 py-3 text-xs text-secondary">排序键和 index 始终成对移动；真正使用粒子系统时，index 会继续指向位置、颜色或生命周期等 payload。</div>
    </section>
  );
}
