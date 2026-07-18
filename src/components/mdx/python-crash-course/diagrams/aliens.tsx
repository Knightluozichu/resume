"use client";

import { useMemo, useState } from "react";

export function PccFleetLayoutLab() {
  const [width, setWidth] = useState(760);
  const [height, setHeight] = useState(420);
  const alienSize = 42;
  const shipHeight = 52;
  const horizontalSpace = width - 2 * alienSize;
  const columns = Math.max(1, Math.floor(horizontalSpace / (2 * alienSize)));
  const verticalSpace = height - 3 * alienSize - shipHeight;
  const rows = Math.max(1, Math.floor(verticalSpace / (2 * alienSize)));
  const aliens = useMemo(() => Array.from({ length: rows * columns }, (_, index) => index), [rows, columns]);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm text-primary">screen width: {width}px<input type="range" min="500" max="1000" step="20" value={width} onChange={(event) => setWidth(Number(event.target.value))} className="mt-2 w-full" /></label>
          <label className="text-sm text-primary">screen height: {height}px<input type="range" min="320" max="680" step="20" value={height} onChange={(event) => setHeight(Number(event.target.value))} className="mt-2 w-full" /></label>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-[2fr_1fr]">
          <div className="border border-border bg-bg p-3">
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
              {aliens.map((index) => <div key={index} className="flex aspect-square items-center justify-center border border-cyan-500/50 bg-cyan-500/10 text-xs text-primary">A</div>)}
            </div>
            <div className="mx-auto mt-4 h-7 w-12 border border-violet-500 bg-violet-500/15 text-center text-sm leading-7 text-primary">ship</div>
          </div>
          <div className="border border-border bg-bg p-3 text-sm leading-7 text-primary">
            available x = {horizontalSpace}<br />
            columns = {columns}<br />
            available y = {verticalSpace}<br />
            rows = {rows}<br />
            fleet size = <strong>{aliens.length}</strong>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">调整screen尺寸，观察alien width与spacing如何决定fleet的columns、rows和总数量。</figcaption>
    </figure>
  );
}

export function PccFleetMotionLab() {
  const [x, setX] = useState(35);
  const [y, setY] = useState(18);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [edgeEvents, setEdgeEvents] = useState(0);
  const nextX = x + direction * 14;
  const hitsEdge = nextX <= 4 || nextX >= 72;

  const advance = () => {
    if (hitsEdge) {
      setY((value) => Math.min(78, value + 10));
      setDirection((value) => (value === 1 ? -1 : 1));
      setEdgeEvents((value) => value + 1);
      return;
    }
    setX(nextX);
  };

  const reset = () => { setX(35); setY(18); setDirection(1); setEdgeEvents(0); };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="relative h-64 overflow-hidden border border-border bg-bg">
          <div className="absolute inset-y-0 left-0 w-1 bg-rose-500/50" />
          <div className="absolute inset-y-0 right-0 w-1 bg-rose-500/50" />
          <div className="absolute grid w-1/4 grid-cols-3 gap-1 transition-all" style={{ left: `${x}%`, top: `${y}%` }}>
            {Array.from({ length: 6 }, (_, index) => <div key={index} className="aspect-square border border-cyan-500 bg-cyan-500/15 text-center text-xs leading-6 text-primary">A</div>)}
          </div>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-4">
          <span className="border border-border bg-bg p-2 text-sm text-primary">direction: {direction}</span>
          <span className="border border-border bg-bg p-2 text-sm text-primary">fleet x: {x}</span>
          <span className="border border-border bg-bg p-2 text-sm text-primary">fleet y: {y}</span>
          <span className="border border-border bg-bg p-2 text-sm text-primary">edge events: {edgeEvents}</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button type="button" onClick={advance} className="min-h-11 border border-primary bg-primary text-sm text-bg">推进一次 fleet update</button>
          <button type="button" onClick={reset} className="min-h-11 border border-border bg-bg text-sm text-secondary">重置</button>
        </div>
        <p className="mt-3 text-xs leading-5 text-secondary">只要任一alien将触碰edge，整队先drop，再翻转fleet_direction；本次不再水平推进，避免穿出boundary。</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">逐帧推进，观察edge detection如何产生一次全fleet的drop-and-reverse transition。</figcaption>
    </figure>
  );
}

const collisionCases = [
  { label: "bullet hits alien", detector: "groupcollide(bullets, aliens, True, True)", state: "remove both sprites", follow: "fleet empty → create_fleet()" },
  { label: "alien hits ship", detector: "spritecollideany(ship, aliens)", state: "ships_left -= 1", follow: "clear groups → center ship → pause" },
  { label: "alien reaches bottom", detector: "alien.rect.bottom >= screen.bottom", state: "same as ship hit", follow: "shared _ship_hit() transition" },
  { label: "no ships remain", detector: "ships_left == 0", state: "game_active = False", follow: "mouse visible; wait for restart" },
];

export function PccCollisionStateLab() {
  const [selected, setSelected] = useState(0);
  const [lives, setLives] = useState(3);
  const [active, setActive] = useState(true);
  const item = collisionCases[selected];

  const apply = () => {
    if (selected !== 1 && selected !== 2) return;
    setLives((value) => {
      const next = Math.max(0, value - 1);
      if (next === 0) setActive(false);
      return next;
    });
  };

  const reset = () => { setLives(3); setActive(true); };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 border border-border sm:grid-cols-4">
          {collisionCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-14 border-border px-2 text-xs ${index < 3 ? "sm:border-r" : ""} ${selected === index ? "bg-primary text-bg" : "bg-bg text-secondary hover:text-primary"}`}>{entry.label}</button>)}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="border border-cyan-500/40 bg-cyan-500/10 p-3"><span className="text-xs text-secondary">detector</span><code className="mt-2 block break-words text-xs leading-5 text-primary">{item.detector}</code></div>
          <div className="border border-amber-500/40 bg-amber-500/10 p-3"><span className="text-xs text-secondary">state transition</span><p className="mt-2 text-sm text-primary">{item.state}</p></div>
          <div className="border border-emerald-500/40 bg-emerald-500/10 p-3"><span className="text-xs text-secondary">follow-up</span><p className="mt-2 text-sm text-primary">{item.follow}</p></div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3 border border-border bg-bg p-3 text-sm text-primary">
          <strong>ships_left: {lives}</strong><span>game_active: {String(active)}</span>
          <button type="button" onClick={apply} disabled={selected !== 1 && selected !== 2} className="min-h-10 border border-primary bg-primary px-3 text-bg disabled:opacity-40">应用碰撞</button>
          <button type="button" onClick={reset} className="min-h-10 border border-border px-3 text-secondary">重置</button>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">选择collision类别，追踪detector、对象删除、lives与game_active的完整状态转换。</figcaption>
    </figure>
  );
}
