"use client";

import { useMemo, useState } from "react";

const restartSteps = [
  { label: "reset stats", detail: "ships_left、score、level恢复初始值，game_active准备切换。" },
  { label: "reset dynamics", detail: "ship/alien/bullet speed、fleet direction和alien points回到level 1。" },
  { label: "clear + rebuild", detail: "清空aliens与bullets，创建fresh fleet并center ship。" },
  { label: "refresh HUD", detail: "重新prep score、level和ships images，避免显示上一局缓存。" },
  { label: "activate", detail: "隐藏mouse并设game_active=True，下一帧才开始world update。" },
];

export function PccRestartTransactionLab() {
  const [step, setStep] = useState(0);
  const [version, setVersion] = useState(0);
  const current = restartSteps[step];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {restartSteps.map((item, index) => <button key={item.label} type="button" onClick={() => setStep(index)} className={`min-h-14 border px-2 text-xs ${step === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{index + 1}. {item.label}</button>)}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-[2fr_1fr]">
          <div className="min-h-24 border border-cyan-500/40 bg-cyan-500/10 p-4"><strong className="text-sm text-primary">{current.label}</strong><p className="mt-2 text-sm leading-6 text-primary">{current.detail}</p></div>
          <button type="button" onClick={() => { setVersion((value) => value + 1); setStep(0); }} className="min-h-20 border border-primary bg-primary px-4 text-sm text-bg">执行完整 restart<br />transaction #{version + 1}</button>
        </div>
        <p className="mt-3 text-xs leading-5 text-secondary">Play click只有在inactive且point碰到button rect时生效；五步必须作为一个一致的reset边界完成。</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">逐步检查restart的状态清理、动态参数、Groups、HUD与activation顺序。</figcaption>
    </figure>
  );
}

export function PccDifficultyScalingLab() {
  const [level, setLevel] = useState(1);
  const speedup = 1.1;
  const scoreScale = 1.5;
  const shipSpeed = 1.5 * speedup ** (level - 1);
  const alienSpeed = 1.0 * speedup ** (level - 1);
  const bulletSpeed = 2.5 * speedup ** (level - 1);
  const alienPoints = Math.round(50 * scoreScale ** (level - 1));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="block text-sm text-primary">level: {level}<input type="range" min="1" max="8" value={level} onChange={(event) => setLevel(Number(event.target.value))} className="mt-2 w-full" /></label>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["ship speed", shipSpeed.toFixed(2), "border-violet-500/40 bg-violet-500/10"],
            ["alien speed", alienSpeed.toFixed(2), "border-cyan-500/40 bg-cyan-500/10"],
            ["bullet speed", bulletSpeed.toFixed(2), "border-amber-500/40 bg-amber-500/10"],
            ["alien points", String(alienPoints), "border-emerald-500/40 bg-emerald-500/10"],
          ].map(([label, value, color]) => <div key={label} className={`min-h-24 border p-3 ${color}`}><span className="text-xs text-secondary">{label}</span><strong className="mt-3 block text-xl text-primary">{value}</strong></div>)}
        </div>
        <div className="mt-3 grid gap-2 text-xs text-secondary sm:grid-cols-2"><p className="border border-border bg-bg p-3">speed = initial × 1.1^(level - 1)</p><p className="border border-border bg-bg p-3">points = round(initial × 1.5^(level - 1))</p></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">拖动level，比较movement difficulty与reward growth使用不同scale的结果。</figcaption>
    </figure>
  );
}

export function PccScoreboardLayoutLab() {
  const [score, setScore] = useState(12850);
  const [highScore, setHighScore] = useState(25000);
  const [level, setLevel] = useState(3);
  const [ships, setShips] = useState(2);
  const displayedHigh = Math.max(score, highScore);
  const formattedScore = useMemo(() => Math.round(score / 10) * 10, [score]);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="relative h-64 overflow-hidden border border-border bg-bg p-4">
          <div className="absolute right-4 top-4 text-right text-lg text-primary">{formattedScore.toLocaleString("en-US")}</div>
          <div className="absolute left-1/2 top-4 -translate-x-1/2 text-lg text-amber-500">HI {displayedHigh.toLocaleString("en-US")}</div>
          <div className="absolute right-4 top-14 text-sm text-cyan-500">Level {level}</div>
          <div className="absolute left-4 top-4 flex gap-1">{Array.from({ length: ships }, (_, index) => <span key={index} className="text-2xl text-violet-500">▲</span>)}</div>
          <div className="absolute inset-x-4 bottom-4 border-t border-dashed border-border pt-3 text-center text-xs text-secondary">HUD anchors remain stable as values change</div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <button type="button" onClick={() => setScore((value) => value + 350)} className="min-h-11 border border-border bg-bg text-sm text-primary">+350 score</button>
          <button type="button" onClick={() => setHighScore(displayedHigh)} className="min-h-11 border border-border bg-bg text-sm text-primary">commit high score</button>
          <button type="button" onClick={() => setLevel((value) => value + 1)} className="min-h-11 border border-border bg-bg text-sm text-primary">next level</button>
          <button type="button" onClick={() => setShips((value) => Math.max(0, value - 1))} className="min-h-11 border border-border bg-bg text-sm text-primary">ship hit</button>
        </div>
        <p className="mt-3 text-xs leading-5 text-secondary">每次对应state变化后调用prep_*重建text/image；draw阶段只blit已准备的surfaces，避免每帧重复render字体。</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">修改score、high score、level与ship lives，观察HUD锚点和刷新职责。</figcaption>
    </figure>
  );
}
