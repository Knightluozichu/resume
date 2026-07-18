"use client";

import { useMemo, useState } from "react";

const squarePoints = Array.from({ length: 16 }, (_, index) => ({ x: index, y: index ** 2 }));

export function PccPlotEncodingLab() {
  const [mode, setMode] = useState<"line" | "scatter">("scatter");
  const [colormap, setColormap] = useState(true);
  const maxY = squarePoints.at(-1)?.y ?? 1;
  const polyline = squarePoints.map((point) => `${24 + point.x * 22},${176 - (point.y / maxY) * 148}`).join(" ");

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 border border-border">
          {(["line", "scatter"] as const).map((value) => <button key={value} type="button" onClick={() => setMode(value)} className={`min-h-11 text-sm ${mode === value ? "bg-primary text-bg" : "bg-bg text-primary"}`}>{value}</button>)}
        </div>
        <label className="mt-3 flex min-h-11 items-center gap-3 border border-border bg-bg px-3 text-sm text-primary"><input type="checkbox" checked={colormap} onChange={(event) => setColormap(event.target.checked)} /> encode order with colormap</label>
        <div className="mt-4 overflow-x-auto border border-border bg-bg p-3">
          <svg viewBox="0 0 390 210" role="img" aria-label="Squares dataset plot" className="h-auto min-w-[360px]">
            <line x1="24" y1="176" x2="374" y2="176" stroke="currentColor" className="text-secondary" />
            <line x1="24" y1="18" x2="24" y2="176" stroke="currentColor" className="text-secondary" />
            {mode === "line" && <polyline points={polyline} fill="none" stroke="rgb(6 182 212)" strokeWidth="3" />}
            {squarePoints.map((point, index) => <circle key={point.x} cx={24 + point.x * 22} cy={176 - (point.y / maxY) * 148} r={mode === "scatter" ? 5 : 3} fill={colormap ? `hsl(${210 - index * 8} 75% 52%)` : "rgb(16 185 129)"}><title>x={point.x}, y={point.y}</title></circle>)}
            <text x="340" y="198" fill="currentColor" className="text-[11px] text-secondary">input</text>
            <text x="5" y="14" fill="currentColor" className="text-[11px] text-secondary">square</text>
          </svg>
        </div>
        <p className="mt-3 text-xs leading-5 text-secondary">line强调连续趋势，scatter保留每个sample；colormap把生成顺序编码为颜色。title、axis labels与tick policy补充语义。</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">切换line/scatter与colormap，比较同一数据的视觉编码如何改变读法。</figcaption>
    </figure>
  );
}

function createWalk(seed: number, count: number) {
  let value = seed;
  const nextRandom = () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
  const points = [{ x: 0, y: 0 }];
  for (let index = 1; index < count; index += 1) {
    const xDirection = nextRandom() < 0.5 ? 1 : -1;
    const xDistance = 1 + Math.floor(nextRandom() * 4);
    const yDirection = nextRandom() < 0.5 ? 1 : -1;
    const yDistance = Math.floor(nextRandom() * 4);
    const previous = points[index - 1];
    points.push({ x: previous.x + xDirection * xDistance, y: previous.y + yDirection * yDistance });
  }
  return points;
}

export function PccRandomWalkLab() {
  const [seed, setSeed] = useState(7);
  const [count, setCount] = useState(120);
  const [showAxes, setShowAxes] = useState(false);
  const points = useMemo(() => createWalk(seed, count), [seed, count]);
  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);
  const minX = Math.min(...xs); const maxX = Math.max(...xs);
  const minY = Math.min(...ys); const maxY = Math.max(...ys);
  const scaleX = (x: number) => 14 + ((x - minX) / Math.max(1, maxX - minX)) * 352;
  const scaleY = (y: number) => 190 - ((y - minY) / Math.max(1, maxY - minY)) * 170;
  const polyline = points.map((point) => `${scaleX(point.x)},${scaleY(point.y)}`).join(" ");
  const first = points[0]; const last = points.at(-1) ?? first;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="text-sm text-primary">points<select value={count} onChange={(event) => setCount(Number(event.target.value))} className="mt-2 min-h-11 w-full border border-border bg-bg px-3">{[60, 120, 240].map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
          <button type="button" onClick={() => setSeed((value) => value + 1)} className="min-h-11 self-end border border-primary bg-primary text-sm text-bg">new walk (seed {seed + 1})</button>
          <label className="flex min-h-11 items-center gap-2 self-end border border-border bg-bg px-3 text-sm text-primary"><input type="checkbox" checked={showAxes} onChange={(event) => setShowAxes(event.target.checked)} /> show axes</label>
        </div>
        <div className="mt-4 overflow-x-auto border border-border bg-bg p-3">
          <svg viewBox="0 0 380 205" role="img" aria-label="Seeded random walk" className="h-auto min-w-[360px]">
            {showAxes && <><line x1="190" y1="10" x2="190" y2="195" stroke="currentColor" className="text-secondary" strokeDasharray="4 4" /><line x1="10" y1="102" x2="370" y2="102" stroke="currentColor" className="text-secondary" strokeDasharray="4 4" /></>}
            <polyline points={polyline} fill="none" stroke="rgb(6 182 212)" strokeWidth="2" opacity="0.75" />
            <circle cx={scaleX(first.x)} cy={scaleY(first.y)} r="6" fill="rgb(16 185 129)" />
            <circle cx={scaleX(last.x)} cy={scaleY(last.y)} r="6" fill="rgb(244 63 94)" />
          </svg>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4"><span className="border border-border bg-bg p-2 text-primary">seed {seed}</span><span className="border border-border bg-bg p-2 text-primary">start ({first.x}, {first.y})</span><span className="border border-border bg-bg p-2 text-primary">end ({last.x}, {last.y})</span><span className="border border-border bg-bg p-2 text-primary">extent {maxX - minX} × {maxY - minY}</span></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">改变seed与point count，观察随机路径、起终点、axis visibility和extent。</figcaption>
    </figure>
  );
}

function diceCounts(sidesA: number, sidesB: number) {
  const counts = Array.from({ length: sidesA + sidesB + 1 }, () => 0);
  for (let a = 1; a <= sidesA; a += 1) for (let b = 1; b <= sidesB; b += 1) counts[a + b] += 1;
  return counts.map((count, sum) => ({ sum, count })).filter((item) => item.count > 0);
}

export function PccDiceDistributionLab() {
  const [sidesB, setSidesB] = useState(6);
  const [rolls, setRolls] = useState(1000);
  const distribution = useMemo(() => diceCounts(6, sidesB), [sidesB]);
  const combinations = 6 * sidesB;
  const maxCount = Math.max(...distribution.map((item) => item.count));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm text-primary">Die B sides<select value={sidesB} onChange={(event) => setSidesB(Number(event.target.value))} className="ml-3 min-h-11 border border-border bg-bg px-3">{[6, 8, 10].map((value) => <option key={value} value={value}>D{value}</option>)}</select></label>
          <label className="text-sm text-primary">rolls: {rolls}<input type="range" min="100" max="5000" step="100" value={rolls} onChange={(event) => setRolls(Number(event.target.value))} className="mt-2 w-full" /></label>
        </div>
        <div className="mt-4 flex h-56 items-end gap-1 overflow-x-auto border border-border bg-bg p-3">
          {distribution.map((item) => {
            const expected = (item.count / combinations) * rolls;
            return <div key={item.sum} className="flex min-w-6 flex-1 flex-col items-center justify-end gap-1"><span className="text-[10px] text-secondary">{Math.round(expected)}</span><div className="w-full bg-amber-400/80" style={{ height: `${(item.count / maxCount) * 150}px` }} title={`sum ${item.sum}: ${item.count}/${combinations}`} /><span className="text-[10px] text-primary">{item.sum}</span></div>;
          })}
        </div>
        <p className="mt-3 text-xs leading-5 text-secondary">bar height表示exact probability，顶部数字是给定rolls下的expected frequency。D6+D6的7最常见；换成D6+D8后support与峰值形状改变。</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">改变第二颗骰子与实验次数，比较sum的支持范围、理论概率和期望频数。</figcaption>
    </figure>
  );
}
