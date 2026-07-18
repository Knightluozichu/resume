"use client";

import { useState } from "react";

type Particle = {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  mass: number;
  count: number;
};

type ScheduledEvent = {
  time: number;
  a: string | null;
  b: string | null;
  countA: number;
  countB: number;
  kind: "pair" | "vertical wall" | "horizontal wall" | "redraw";
};

function timeToHit(first: Particle, second: Particle) {
  if (first.id === second.id) return Number.POSITIVE_INFINITY;
  const dx = second.x - first.x;
  const dy = second.y - first.y;
  const dvx = second.vx - first.vx;
  const dvy = second.vy - first.vy;
  const dvdr = dx * dvx + dy * dvy;
  if (dvdr >= 0) return Number.POSITIVE_INFINITY;
  const dvdv = dvx * dvx + dvy * dvy;
  if (dvdv === 0) return Number.POSITIVE_INFINITY;
  const drdr = dx * dx + dy * dy;
  const sigma = first.radius + second.radius;
  const discriminant = dvdr * dvdr - dvdv * (drdr - sigma * sigma);
  if (discriminant < 0) return Number.POSITIVE_INFINITY;
  const time = -(dvdr + Math.sqrt(discriminant)) / dvdv;
  return time > 0 ? time : Number.POSITIVE_INFINITY;
}

function timeToVerticalWall(particle: Particle) {
  if (particle.vx > 0) return (1 - particle.x - particle.radius) / particle.vx;
  if (particle.vx < 0) return (particle.radius - particle.x) / particle.vx;
  return Number.POSITIVE_INFINITY;
}

function timeToHorizontalWall(particle: Particle) {
  if (particle.vy > 0) return (1 - particle.y - particle.radius) / particle.vy;
  if (particle.vy < 0) return (particle.radius - particle.y) / particle.vy;
  return Number.POSITIVE_INFINITY;
}

function resolvePair(first: Particle, second: Particle) {
  const dx = second.x - first.x;
  const dy = second.y - first.y;
  const dvx = second.vx - first.vx;
  const dvy = second.vy - first.vy;
  const dvdr = dx * dvx + dy * dvy;
  const distance = first.radius + second.radius;
  const magnitude = 2 * first.mass * second.mass * dvdr / ((first.mass + second.mass) * distance);
  const impulseX = magnitude * dx / distance;
  const impulseY = magnitude * dy / distance;
  return {
    first: { ...first, vx: first.vx + impulseX / first.mass, vy: first.vy + impulseY / first.mass, count: first.count + 1 },
    second: { ...second, vx: second.vx - impulseX / second.mass, vy: second.vy - impulseY / second.mass, count: second.count + 1 },
  };
}

function momentum(particles: Particle[]) {
  return particles.reduce((sum, particle) => ({
    x: sum.x + particle.mass * particle.vx,
    y: sum.y + particle.mass * particle.vy,
  }), { x: 0, y: 0 });
}

function kineticEnergy(particles: Particle[]) {
  return particles.reduce((sum, particle) => sum + 0.5 * particle.mass * (particle.vx ** 2 + particle.vy ** 2), 0);
}

function formatTime(value: number) {
  return Number.isFinite(value) ? value.toFixed(3) : "∞";
}

const baseParticles: Particle[] = [
  { id: "A", x: 0.22, y: 0.35, vx: 0.16, vy: 0.04, radius: 0.055, mass: 1, count: 0 },
  { id: "B", x: 0.67, y: 0.47, vx: -0.08, vy: -0.02, radius: 0.065, mass: 1.4, count: 0 },
  { id: "C", x: 0.48, y: 0.78, vx: 0.02, vy: -0.09, radius: 0.045, mass: 0.8, count: 0 },
];

export function Algs4SimulationStrategyMap() {
  const [timeQuantum, setTimeQuantum] = useState(0.1);
  const horizon = 10;
  const particles = 30;
  const timeChecks = Math.ceil(horizon / timeQuantum) * particles * particles;
  const eventChecks = 120 * particles;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">time-driven dt = {timeQuantum.toFixed(2)}<input className="mt-2 w-full accent-current" type="range" min="0.02" max="0.5" step="0.02" value={timeQuantum} onChange={(event) => setTimeQuantum(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="border border-warning p-4"><div className="font-semibold text-warning">time-driven</div><div className="mt-2 font-mono text-2xl text-primary">{timeChecks.toLocaleString()}</div><div className="text-xs text-secondary">pair checks across fixed ticks</div></div><div className="border border-success p-4"><div className="font-semibold text-success">event-driven</div><div className="mt-2 font-mono text-2xl text-primary">{eventChecks.toLocaleString()}</div><div className="text-xs text-secondary">illustrative repredictions for actual events</div></div></div>
        <div className="mt-3 text-[10px] text-secondary">Counts illustrate scaling, not a universal runtime formula; event density and spatial indexing determine real cost.</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Fixed dt can miss collisions or spend work on empty time；event-driven simulation jumps directly to the next predicted event.
      </figcaption>
    </figure>
  );
}

export function Algs4HardDiscMotionLab() {
  const [time, setTime] = useState(0);
  const positions = baseParticles.map((particle) => ({
    ...particle,
    x: particle.x + particle.vx * time,
    y: particle.y + particle.vy * time,
  }));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">free-flight time = {time.toFixed(2)}<input className="mt-2 w-full accent-current" type="range" min="0" max="1.4" step="0.02" value={time} onChange={(event) => setTime(Number(event.target.value))} /></label>
        <div className="relative mt-4 aspect-square max-h-80 w-full border-2 border-border bg-background">{positions.map((particle, index) => <div key={particle.id} className={"absolute grid -translate-x-1/2 translate-y-1/2 place-items-center rounded-full border-2 text-xs font-semibold " + (index === 0 ? "border-accent bg-accent/20 text-accent" : index === 1 ? "border-warning bg-warning/20 text-warning" : "border-success bg-success/20 text-success")} style={{ left: `${particle.x * 100}%`, bottom: `${particle.y * 100}%`, width: `${particle.radius * 200}%`, aspectRatio: "1" }}>{particle.id}</div>)}</div>
        <div className="mt-3 font-mono text-xs text-secondary">r(t + dt) = r(t) + v dt · velocities remain constant between events</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Hard-disc model confines non-overlapping discs in a unit box；without forces, trajectories are straight between elastic collisions.
      </figcaption>
    </figure>
  );
}

export function Algs4WallCollisionLab() {
  const [direction, setDirection] = useState<"right" | "left" | "up" | "down">("right");
  const particle: Particle = {
    id: "P",
    x: 0.35,
    y: 0.62,
    vx: direction === "right" ? 0.18 : direction === "left" ? -0.18 : 0,
    vy: direction === "up" ? 0.14 : direction === "down" ? -0.14 : 0,
    radius: 0.06,
    mass: 1,
    count: 0,
  };
  const vertical = timeToVerticalWall(particle);
  const horizontal = timeToHorizontalWall(particle);
  const next = Math.min(vertical, horizontal);
  const nextX = particle.x + particle.vx * next;
  const nextY = particle.y + particle.vy * next;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">velocity direction<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={direction} onChange={(event) => setDirection(event.target.value as typeof direction)}><option>right</option><option>left</option><option>up</option><option>down</option></select></label>
        <div className="relative mt-4 h-48 border-2 border-border bg-background"><div className="absolute grid aspect-square w-12 -translate-x-1/2 translate-y-1/2 place-items-center rounded-full border-2 border-accent bg-accent/20 text-accent" style={{ left: `${nextX * 100}%`, bottom: `${nextY * 100}%` }}>P</div></div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs"><div className="border border-accent p-3 text-accent">vertical wall dt<div className="font-mono">{formatTime(vertical)}</div></div><div className="border border-warning p-3 text-warning">horizontal wall dt<div className="font-mono">{formatTime(horizontal)}</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Wall time solves center position = radius or 1 − radius；vertical wall flips vx，horizontal wall flips vy.
      </figcaption>
    </figure>
  );
}

export function Algs4PairCollisionPredictionLab() {
  const [secondVy, setSecondVy] = useState(-0.02);
  const first = baseParticles[0];
  const second = { ...baseParticles[1], vy: secondVy };
  const dx = second.x - first.x;
  const dy = second.y - first.y;
  const dvx = second.vx - first.vx;
  const dvy = second.vy - first.vy;
  const dvdr = dx * dvx + dy * dvy;
  const dvdv = dvx * dvx + dvy * dvy;
  const drdr = dx * dx + dy * dy;
  const sigma = first.radius + second.radius;
  const discriminant = dvdr * dvdr - dvdv * (drdr - sigma * sigma);
  const time = timeToHit(first, second);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">particle B vy = {secondVy.toFixed(3)}<input className="mt-2 w-full accent-current" type="range" min="-0.18" max="0.18" step="0.01" value={secondVy} onChange={(event) => setSecondVy(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className={"border p-3 text-xs " + (dvdr < 0 ? "border-success text-success" : "border-danger text-danger")}>relative approach<div className="font-mono">dv·dr = {dvdr.toFixed(4)}</div></div><div className={"border p-3 text-xs " + (discriminant >= 0 ? "border-success text-success" : "border-danger text-danger")}>quadratic D<div className="font-mono">{discriminant.toFixed(5)}</div></div><div className="border border-accent p-3 text-xs text-accent">collision dt<div className="font-mono">{formatTime(time)}</div></div></div>
        <div className="mt-4 h-3 border border-border bg-background"><div className="h-full bg-warning" style={{ width: Number.isFinite(time) ? `${Math.min(100, time * 25)}%` : "0%" }} /></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Pair collision exists only when particles approach and the quadratic discriminant is nonnegative；the earliest positive root is scheduled.
      </figcaption>
    </figure>
  );
}

const queueEvents: ScheduledEvent[] = [
  { time: 0.8, a: "C", b: null, countA: 0, countB: -1, kind: "vertical wall" },
  { time: 1.3, a: "A", b: "B", countA: 0, countB: 0, kind: "pair" },
  { time: 1.9, a: null, b: null, countA: -1, countB: -1, kind: "redraw" },
  { time: 2.4, a: "A", b: "C", countA: 0, countB: 0, kind: "pair" },
];

export function Algs4FutureEventQueueLab() {
  const [processed, setProcessed] = useState(0);
  const queue = queueEvents.slice(processed);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">delete-min count = {processed}<input className="mt-2 w-full accent-current" type="range" min="0" max={queueEvents.length - 1} value={processed} onChange={(event) => setProcessed(Number(event.target.value))} /></label>
        <div className="mt-4 space-y-2">{queue.map((event, index) => <div key={`${event.time}-${event.kind}`} className={"grid grid-cols-[4rem_1fr_7rem] items-center border p-3 text-xs " + (index === 0 ? "border-warning bg-warning/10 text-warning" : "border-border text-secondary")}><span className="font-mono">t={event.time}</span><span>{event.a ?? "∅"} / {event.b ?? "∅"}</span><span className="text-right">{event.kind}</span></div>)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        MinPQ stores absolute future times；delete-min establishes nondecreasing simulation clock before any state mutation.
      </figcaption>
    </figure>
  );
}

export function Algs4InvalidatedEventLab() {
  const [interveningCollision, setInterveningCollision] = useState(true);
  const snapshot = { countA: 2, countB: 5 };
  const current = { countA: interveningCollision ? 3 : 2, countB: 5 };
  const valid = snapshot.countA === current.countA && snapshot.countB === current.countB;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="flex items-center gap-3 text-sm font-semibold text-primary"><input type="checkbox" checked={interveningCollision} onChange={(event) => setInterveningCollision(event.target.checked)} />A collides before scheduled A/B event</label>
        <div className="mt-4 grid grid-cols-2 gap-3"><div className="border border-accent p-3 text-xs text-accent">event snapshot<div className="font-mono">A:{snapshot.countA} · B:{snapshot.countB}</div></div><div className="border border-warning p-3 text-xs text-warning">current counts<div className="font-mono">A:{current.countA} · B:{current.countB}</div></div></div>
        <div className={"mt-3 border p-3 text-sm " + (valid ? "border-success text-success" : "border-danger text-danger")}>{valid ? "event valid: process" : "event invalidated: discard lazily"}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Collision count is a version stamp；any intervening collision changes trajectory and invalidates events involving that particle.
      </figcaption>
    </figure>
  );
}

export function Algs4CollisionResolutionLab() {
  const [massRatio, setMassRatio] = useState(2);
  const massA = 1;
  const massB = massRatio;
  const beforeA = 0.2;
  const beforeB = -0.08;
  const afterA = ((massA - massB) * beforeA + 2 * massB * beforeB) / (massA + massB);
  const afterB = (2 * massA * beforeA + (massB - massA) * beforeB) / (massA + massB);
  const momentumBefore = massA * beforeA + massB * beforeB;
  const momentumAfter = massA * afterA + massB * afterB;
  const energyBefore = 0.5 * massA * beforeA ** 2 + 0.5 * massB * beforeB ** 2;
  const energyAfter = 0.5 * massA * afterA ** 2 + 0.5 * massB * afterB ** 2;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">mass B / mass A = {massRatio.toFixed(1)}<input className="mt-2 w-full accent-current" type="range" min="0.5" max="4" step="0.1" value={massRatio} onChange={(event) => setMassRatio(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-2 gap-3"><div className="border border-border p-3 text-xs"><div className="text-secondary">before velocities</div><div className="font-mono text-primary">A {beforeA.toFixed(3)} · B {beforeB.toFixed(3)}</div></div><div className="border border-accent p-3 text-xs"><div className="text-secondary">after velocities</div><div className="font-mono text-accent">A {afterA.toFixed(3)} · B {afterB.toFixed(3)}</div></div></div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs"><div className="border border-success p-3 text-success">momentum drift<div className="font-mono">{Math.abs(momentumAfter - momentumBefore).toExponential(2)}</div></div><div className="border border-success p-3 text-success">energy drift<div className="font-mono">{Math.abs(energyAfter - energyBefore).toExponential(2)}</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Perfectly elastic response changes normal velocity components while conserving pair momentum and kinetic energy.
      </figcaption>
    </figure>
  );
}

const loopSteps = [
  { title: "delete minimum event", detail: "take smallest absolute time from MinPQ" },
  { title: "validate snapshots", detail: "discard if either collision count changed" },
  { title: "advance all particles", detail: "move every disc by event.time − clock" },
  { title: "resolve event", detail: "pair bounce, wall reflection, or redraw" },
  { title: "predict affected events", detail: "recompute futures involving a or b only" },
];

export function Algs4SimulationLoopLab() {
  const [step, setStep] = useState(0);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">main-loop phase {step + 1} / {loopSteps.length}<input className="mt-2 w-full accent-current" type="range" min="0" max={loopSteps.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-2">{loopSteps.map((item, index) => <div key={item.title} className={"grid grid-cols-[2rem_1fr] border p-3 " + (index === step ? "border-warning bg-warning/10" : index < step ? "border-success" : "border-border")}><div className={"grid h-6 w-6 place-items-center border text-xs " + (index === step ? "border-warning text-warning" : index < step ? "border-success text-success" : "border-border text-secondary")}>{index + 1}</div><div><div className="text-sm font-semibold text-primary">{item.title}</div><div className="text-xs text-secondary">{item.detail}</div></div></div>)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        State changes only at valid event times；reprediction after response repairs the speculative future locally.
      </figcaption>
    </figure>
  );
}

export function Algs4ConservationInvariantLab() {
  const first = { ...baseParticles[0], x: 0.42, y: 0.5, vx: 0.15, vy: 0 };
  const second = { ...baseParticles[1], x: 0.54, y: 0.5, vx: -0.05, vy: 0 };
  const before = [first, second];
  const resolved = resolvePair(first, second);
  const after = [resolved.first, resolved.second];
  const beforeMomentum = momentum(before);
  const afterMomentum = momentum(after);
  const momentumDrift = Math.hypot(afterMomentum.x - beforeMomentum.x, afterMomentum.y - beforeMomentum.y);
  const energyDrift = Math.abs(kineticEnergy(after) - kineticEnergy(before));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-3"><div className="border border-success p-4 text-success"><div className="text-xs">momentum drift</div><div className="font-mono text-xl">{momentumDrift.toExponential(2)}</div></div><div className="border border-success p-4 text-success"><div className="text-xs">kinetic-energy drift</div><div className="font-mono text-xl">{energyDrift.toExponential(2)}</div></div><div className="border border-accent p-4 text-accent"><div className="text-xs">collision counts</div><div className="font-mono text-xl">{resolved.first.count} / {resolved.second.count}</div></div></div>
        <div className="mt-3 text-xs text-secondary">Wall collisions conserve kinetic energy but exchange momentum with the container; pair momentum is the local certificate.</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Conservation checks catch wrong impulse signs or mass factors even when particles visually separate after collision.
      </figcaption>
    </figure>
  );
}

export function Algs4EventWorkLab() {
  const [particles, setParticles] = useState(100);
  const [events, setEvents] = useState(500);
  const initialPredictions = particles * particles;
  const repredictions = 2 * particles * events;
  const queueCost = events * Math.log2(Math.max(2, particles * particles));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">particles N = {particles}<input className="mt-2 w-full accent-current" type="range" min="10" max="500" step="10" value={particles} onChange={(event) => setParticles(Number(event.target.value))} /></label><label className="text-xs text-secondary">processed events E = {events}<input className="mt-2 w-full accent-current" type="range" min="50" max="2000" step="50" value={events} onChange={(event) => setEvents(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3 text-xs"><div className="border border-border p-3 text-secondary">initial pair predictions<div className="font-mono text-primary">{initialPredictions.toLocaleString()}</div></div><div className="border border-warning p-3 text-warning">local repredictions<div className="font-mono">{repredictions.toLocaleString()}</div></div><div className="border border-accent p-3 text-accent">PQ comparison scale<div className="font-mono">{Math.round(queueCost).toLocaleString()}</div></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Baseline predict scans all N particles for each affected particle；cell methods can reduce candidate neighbors but add boundary events.
      </figcaption>
    </figure>
  );
}

type EventCertificateMode = "valid" | "time reversal" | "stale accepted" | "energy leak";

export function Algs4EventCertificateLab() {
  const [mode, setMode] = useState<EventCertificateMode>("valid");
  const times = mode === "time reversal" ? [0.8, 1.3, 1.1] : [0.8, 1.3, 1.9];
  const nondecreasing = times.every((time, index) => index === 0 || time >= times[index - 1]);
  const snapshot = 2;
  const current = mode === "stale accepted" ? 3 : 2;
  const staleRejected = snapshot === current || mode !== "stale accepted";
  const first = { ...baseParticles[0], x: 0.42, y: 0.5, vx: 0.15, vy: 0 };
  const second = { ...baseParticles[1], x: 0.54, y: 0.5, vx: -0.05, vy: 0 };
  const resolved = resolvePair(first, second);
  const after = mode === "energy leak" ? [{ ...resolved.first, vx: resolved.first.vx * 0.8 }, resolved.second] : [resolved.first, resolved.second];
  const conservation = Math.abs(kineticEnergy([first, second]) - kineticEnergy(after)) < 1e-10;
  const accepted = nondecreasing && staleRejected && conservation;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">candidate trace<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={mode} onChange={(event) => setMode(event.target.value as EventCertificateMode)}><option>valid</option><option>time reversal</option><option>stale accepted</option><option>energy leak</option></select></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className={"border p-3 text-xs " + (nondecreasing ? "border-success text-success" : "border-danger text-danger")}>clock monotonicity<div className="font-mono">{nondecreasing ? "pass" : "fail"}</div></div><div className={"border p-3 text-xs " + (staleRejected ? "border-success text-success" : "border-danger text-danger")}>event validity<div className="font-mono">{staleRejected ? "pass" : "fail"}</div></div><div className={"border p-3 text-xs " + (conservation ? "border-success text-success" : "border-danger text-danger")}>elastic energy<div className="font-mono">{conservation ? "pass" : "fail"}</div></div></div>
        <div className={"mt-3 border p-3 text-sm " + (accepted ? "border-success text-success" : "border-danger text-danger")}>{accepted ? "trace certificate accepted" : "trace certificate rejected"}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Independent trace certificate checks clock order、version snapshots、contact geometry and conservation instead of trusting the animation.
      </figcaption>
    </figure>
  );
}
