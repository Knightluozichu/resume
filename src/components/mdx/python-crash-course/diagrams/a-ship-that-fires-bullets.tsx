"use client";

import { useMemo, useState } from "react";

const loopStages = [
  { id: "events", label: "events", detail: "读取QUIT、KEYDOWN和KEYUP，更新输入状态。", color: "border-cyan-500/50 bg-cyan-500/10" },
  { id: "ship", label: "ship update", detail: "依据movement flags移动float位置，再同步rect。", color: "border-emerald-500/50 bg-emerald-500/10" },
  { id: "bullets", label: "bullets update", detail: "Group统一推进所有bullet，并清理越界对象。", color: "border-amber-500/50 bg-amber-500/10" },
  { id: "draw", label: "draw + flip", detail: "清屏、绘制ship与bullets，最后交换display buffer。", color: "border-violet-500/50 bg-violet-500/10" },
  { id: "tick", label: "Clock.tick", detail: "限制目标FPS，避免loop无上限占用CPU。", color: "border-rose-500/50 bg-rose-500/10" },
];

export function PccGameLoopLab() {
  const [stage, setStage] = useState(0);
  const [fps, setFps] = useState(60);
  const budget = (1000 / fps).toFixed(1);
  const selected = loopStages[stage];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <label className="text-sm text-primary">目标帧率
            <select value={fps} onChange={(event) => setFps(Number(event.target.value))} className="ml-3 min-h-11 border border-border bg-bg px-3 text-primary">
              {[30, 60, 120].map((value) => <option key={value} value={value}>{value} FPS</option>)}
            </select>
          </label>
          <p className="m-0 border border-border bg-bg px-3 py-2 text-sm text-primary">每帧预算 <strong>{budget} ms</strong></p>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {loopStages.map((item, index) => (
            <button key={item.id} type="button" onClick={() => setStage(index)} className={`min-h-14 border px-2 text-xs sm:text-sm ${stage === index ? item.color : "border-border bg-bg text-secondary hover:text-primary"}`}>
              {index + 1}. {item.label}
            </button>
          ))}
        </div>
        <div className={`mt-4 min-h-24 border p-4 ${selected.color}`}>
          <strong className="text-sm text-primary">当前阶段：{selected.label}</strong>
          <p className="mt-2 text-sm leading-6 text-primary">{selected.detail}</p>
        </div>
        <p className="mt-3 text-xs leading-5 text-secondary">一帧完成后回到events。tick只限制loop频率，不会替你修复一次update耗时超过预算的问题。</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">逐步检查event → update → draw → tick，理解游戏主循环每帧的职责与时间预算。</figcaption>
    </figure>
  );
}

export function PccShipMovementLab() {
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(true);
  const [position, setPosition] = useState(50);
  const direction = left === right ? 0 : left ? -1 : 1;
  const nextPosition = Math.max(0, Math.min(100, position + direction * 8));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <button type="button" aria-pressed={left} onClick={() => setLeft((value) => !value)} className={`min-h-12 border text-sm ${left ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>← moving_left: {String(left)}</button>
          <button type="button" aria-pressed={right} onClick={() => setRight((value) => !value)} className={`min-h-12 border text-sm ${right ? "border-emerald-500 bg-emerald-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>moving_right: {String(right)} →</button>
        </div>
        <div className="mt-4 border border-border bg-bg p-4">
          <div className="relative h-20 overflow-hidden border-x border-b border-border bg-elevated">
            <div className="absolute bottom-2 h-10 w-10 -translate-x-1/2 border border-violet-500 bg-violet-500/20 text-center text-2xl leading-10 text-primary" style={{ left: `${position}%` }}>▲</div>
          </div>
          <div className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
            <span className="border border-border p-2 text-secondary">current x: {position}</span>
            <span className="border border-border p-2 text-secondary">direction: {direction}</span>
            <span className="border border-border p-2 text-secondary">clamped next: {nextPosition}</span>
          </div>
          <button type="button" onClick={() => setPosition(nextPosition)} className="mt-3 min-h-11 w-full border border-primary bg-primary px-4 text-sm text-bg">执行一帧 update()</button>
        </div>
        <p className="mt-3 text-xs leading-5 text-secondary">KEYDOWN/KEYUP只修改flag；每一帧的update读取flag。左右同时按下时净方向为0，边界clamp阻止ship离开screen。</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">点击左右状态并推进帧，比较一次keypress与持续movement flag的差异。</figcaption>
    </figure>
  );
}

type Bullet = { id: number; y: number };

export function PccBulletLifecycleLab() {
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [nextId, setNextId] = useState(1);
  const limit = 3;
  const canFire = bullets.length < limit;
  const ordered = useMemo(() => [...bullets].sort((a, b) => a.y - b.y), [bullets]);

  const fire = () => {
    if (!canFire) return;
    setBullets((items) => [...items, { id: nextId, y: 88 }]);
    setNextId((value) => value + 1);
  };

  const advance = () => setBullets((items) => items.map((bullet) => ({ ...bullet, y: bullet.y - 32 })).filter((bullet) => bullet.y >= 0));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-[1fr_2fr]">
          <div>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={fire} disabled={!canFire} className="min-h-11 border border-primary bg-primary px-3 text-sm text-bg disabled:cursor-not-allowed disabled:opacity-40">发射 Bullet</button>
              <button type="button" onClick={advance} className="min-h-11 border border-border bg-bg px-3 text-sm text-primary">推进一帧</button>
            </div>
            <button type="button" onClick={() => setBullets([])} className="mt-2 min-h-11 w-full border border-border bg-bg px-3 text-sm text-secondary">重置 Group</button>
            <div className="mt-3 border border-border bg-bg p-3 text-sm leading-6 text-primary">
              Group size: {bullets.length}/{limit}<br />
              fire guard: {canFire ? "允许创建" : "达到上限"}<br />
              cleanup: y &lt; 0 后移除
            </div>
          </div>
          <div className="relative h-72 overflow-hidden border border-border bg-bg">
            <div className="absolute inset-x-0 top-0 border-b border-dashed border-rose-500/60 py-1 text-center text-xs text-rose-500">off-screen cleanup boundary</div>
            {ordered.map((bullet) => <div key={bullet.id} className="absolute left-1/2 h-5 w-1 -translate-x-1/2 bg-amber-400" style={{ top: `${bullet.y}%` }}><span className="ml-3 whitespace-nowrap text-xs text-secondary">#{bullet.id}</span></div>)}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-3xl text-violet-500">▲</div>
          </div>
        </div>
        <p className="mt-3 text-xs leading-5 text-secondary">Group持有active bullets。发射时检查数量，update后清理越界对象；漏掉cleanup会让不可见对象持续占用内存和update时间。</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">操作发射、推进与重置，观察bullet从spawn到Group cleanup的完整生命周期。</figcaption>
    </figure>
  );
}
