"use client";

import { useMemo, useState, type ReactNode } from "react";

function Panel({ children }: { children: ReactNode }) {
  return <div className="border border-border bg-elevated p-4 sm:p-5">{children}</div>;
}

function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="mt-2 text-center text-sm text-secondary">{children}</figcaption>;
}

function Stat({
  label,
  value,
  tone = "accent",
}: {
  label: string;
  value: string;
  tone?: "accent" | "warning" | "success" | "danger";
}) {
  const classes = {
    accent: "border-accent text-accent",
    warning: "border-warning text-warning",
    success: "border-success text-success",
    danger: "border-danger text-danger",
  }[tone];

  return <div className={`border p-3 text-center ${classes}`}><div className="text-xs">{label}</div><div className="mt-1 break-words font-mono text-lg">{value}</div></div>;
}

export function CAIPrimeEnumerationLab() {
  const [n, setN] = useState(97);
  const divisors = useMemo(() => Array.from({ length: Math.max(0, n - 2) }, (_, index) => index + 2).filter((value) => n % value === 0), [n]);
  const bound = Math.floor(Math.sqrt(n));
  const first = divisors[0] ?? null;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">candidate n = {n}<input className="mt-2 w-full accent-current" type="range" min="2" max="200" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <Stat label="naive trials" value={`${Math.max(0, n - 2)}`} tone="warning" />
          <Stat label="sufficient bound" value={`2…${bound}`} />
          <Stat label="verdict" value={first ? `composite: ${first}×${n / first}` : "prime"} tone={first ? "danger" : "success"} />
        </div>
      </Panel>
      <Caption>Complete enumeration establishes a correct baseline; divisor pairing proves that testing only through the square root remains complete.</Caption>
    </figure>
  );
}

const initialLights = [
  [1, 0, 1, 0],
  [1, 1, 0, 1],
  [0, 1, 1, 0],
  [1, 0, 0, 1],
];

function solveLights(mask: number) {
  const board = initialLights.map((row) => [...row]);
  const pressed = Array.from({ length: 4 }, () => Array(4).fill(false));
  const press = (row: number, col: number) => {
    pressed[row][col] = true;
    for (const [dr, dc] of [[0, 0], [-1, 0], [1, 0], [0, -1], [0, 1]]) {
      const nr = row + dr;
      const nc = col + dc;
      if (nr >= 0 && nr < 4 && nc >= 0 && nc < 4) board[nr][nc] ^= 1;
    }
  };
  for (let col = 0; col < 4; col += 1) if ((mask >> col) & 1) press(0, col);
  for (let row = 1; row < 4; row += 1) {
    for (let col = 0; col < 4; col += 1) if (board[row - 1][col]) press(row, col);
  }
  return { board, pressed, solved: board[3].every((value) => value === 0), count: pressed.flat().filter(Boolean).length };
}

export function CAILightsOutLab() {
  const [mask, setMask] = useState(5);
  const result = useMemo(() => solveLights(mask), [mask]);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">first-row press mask = {mask.toString(2).padStart(4, "0")}<input className="mt-2 w-full accent-current" type="range" min="0" max="15" value={mask} onChange={(event) => setMask(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div><div className="mb-2 text-xs text-secondary">derived press pattern</div><div className="grid grid-cols-4 gap-1">{result.pressed.flatMap((row, r) => row.map((value, c) => <div key={`${r}-${c}`} className={`aspect-square border ${value ? "border-accent bg-accent/30" : "border-border bg-background"}`} />))}</div></div>
          <div><div className="mb-2 text-xs text-secondary">final board</div><div className="grid grid-cols-4 gap-1">{result.board.flatMap((row, r) => row.map((value, c) => <div key={`${r}-${c}`} className={`aspect-square border ${value ? "border-warning bg-warning/30" : "border-success bg-success/10"}`} />))}</div></div>
        </div>
        <div className={`mt-3 border p-3 text-sm ${result.solved ? "border-success text-success" : "border-danger text-danger"}`}>{result.solved ? `solution with ${result.count} presses` : "last row remains lit; try another first-row mask"}</div>
      </Panel>
      <Caption>Once the first-row choices are fixed, every lower-row press is forced; a 2^(rows×cols) search collapses to 2^cols candidates.</Caption>
    </figure>
  );
}

export function CAIExhaustiveToGreedyMap() {
  const [problem, setProblem] = useState<"stock" | "location" | "pairing">("stock");
  const rows = {
    stock: ["all buy-sell pairs", "minimum price so far", "best profit so far"],
    location: ["every candidate site", "ordered positions", "median"],
    pairing: ["all pair partitions", "sorted weights", "lightest with heaviest"],
  }[problem];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">problem family<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={problem} onChange={(event) => setProblem(event.target.value as typeof problem)}><option value="stock">stock profit</option><option value="location">facility location</option><option value="pairing">capacity pairing</option></select></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center"><Stat label="complete baseline" value={rows[0]} tone="warning" /><div className="text-center text-secondary">→</div><Stat label="sufficient state" value={rows[1]} /><div className="text-center text-secondary">→</div><Stat label="local decision" value={rows[2]} tone="success" /></div>
      </Panel>
      <Caption>A trustworthy greedy rule is usually discovered by studying what exhaustive search repeatedly recomputes and proving that a smaller state is sufficient.</Caption>
    </figure>
  );
}

export function CAIStockProfitLab() {
  const prices = [9, 7, 11, 8, 13, 6, 12, 15];
  const [day, setDay] = useState(prices.length - 1);
  const prefix = prices.slice(0, day + 1);
  let minimum = prefix[0];
  let buy = 0;
  let best = 0;
  let pair: [number, number] = [0, 0];
  prefix.forEach((price, index) => {
    if (price - minimum > best) {
      best = price - minimum;
      pair = [buy, index];
    }
    if (price < minimum) {
      minimum = price;
      buy = index;
    }
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">scan through day {day + 1}<input className="mt-2 w-full accent-current" type="range" min="1" max={prices.length - 1} value={day} onChange={(event) => setDay(Number(event.target.value))} /></label>
        <div className="mt-4 flex h-36 items-end gap-2 border border-border p-3">{prefix.map((price, index) => <div key={index} className={`flex-1 border-t-4 ${index === pair[0] ? "border-success bg-success/20" : index === pair[1] ? "border-accent bg-accent/20" : "border-border bg-background"}`} style={{ height: `${price * 7}px` }}><div className="pt-1 text-center font-mono text-xs text-secondary">{price}</div></div>)}</div>
        <div className="mt-3 grid grid-cols-3 gap-2"><Stat label="min prefix" value={`${minimum}`} tone="success" /><Stat label="best days" value={`${pair[0] + 1}→${pair[1] + 1}`} /><Stat label="profit" value={`${best}`} tone="accent" /></div>
      </Panel>
      <Caption>Enumerating every buy-sell pair reveals the sufficient state: the cheapest valid buy price before the current sell day.</Caption>
    </figure>
  );
}

export function CAILocationMedianLab() {
  const homes = [1, 2, 2, 7, 9];
  const [site, setSite] = useState(5);
  const cost = homes.reduce((sum, home) => sum + Math.abs(home - site), 0);
  const median = homes[Math.floor(homes.length / 2)];
  const medianCost = homes.reduce((sum, home) => sum + Math.abs(home - median), 0);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">candidate logistics station x = {site}<input className="mt-2 w-full accent-current" type="range" min="0" max="10" value={site} onChange={(event) => setSite(Number(event.target.value))} /></label>
        <div className="mt-6 grid grid-cols-11 gap-1">{Array.from({ length: 11 }, (_, position) => <div key={position} className={`relative h-14 border-t-2 ${position === site ? "border-accent" : "border-border"}`}><div className="text-center font-mono text-xs text-secondary">{position}</div>{homes.filter((home) => home === position).map((_, index) => <div key={index} className="mx-auto mt-1 h-2 w-2 bg-warning" />)}{position === site && <div className="absolute bottom-0 left-1/2 h-4 w-1 -translate-x-1/2 bg-accent" />}</div>)}</div>
        <div className="mt-3 grid grid-cols-3 gap-2"><Stat label="sum distance" value={`${cost}`} tone={cost === medianCost ? "success" : "warning"} /><Stat label="median site" value={`${median}`} /><Stat label="minimum cost" value={`${medianCost}`} tone="success" /></div>
      </Panel>
      <Caption>For one-dimensional absolute distance, moving toward the median reduces more distances than it increases; the median is a global optimum.</Caption>
    </figure>
  );
}

const enemies = [
  { name: "A", turns: 2, damage: 8 },
  { name: "B", turns: 5, damage: 9 },
  { name: "C", turns: 3, damage: 4 },
];

function battleDamage(order: typeof enemies) {
  let total = 0;
  let aliveDamage = order.reduce((sum, enemy) => sum + enemy.damage, 0);
  for (const enemy of order) {
    total += enemy.turns * aliveDamage;
    aliveDamage -= enemy.damage;
  }
  return total;
}

export function CAITurnOrderLab() {
  const [rule, setRule] = useState<"name" | "ratio">("name");
  const order = [...enemies].sort((a, b) => rule === "name" ? a.name.localeCompare(b.name) : a.turns / a.damage - b.turns / b.damage);
  const damage = battleDamage(order);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">attack order<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={rule} onChange={(event) => setRule(event.target.value as typeof rule)}><option value="name">input order</option><option value="ratio">turns / damage ascending</option></select></label>
        <div className="mt-4 grid grid-cols-3 gap-2">{order.map((enemy, index) => <div key={enemy.name} className="border border-border p-3 text-center"><div className="font-mono text-lg text-accent">{index + 1}. {enemy.name}</div><div className="mt-1 text-xs text-secondary">{enemy.turns} turns · {enemy.damage} damage</div><div className="mt-1 font-mono text-xs text-warning">ratio {(enemy.turns / enemy.damage).toFixed(2)}</div></div>)}</div>
        <div className="mt-3 border border-success p-3 text-center text-success">total incoming damage = <span className="font-mono text-xl">{damage}</span></div>
      </Panel>
      <Caption>Comparing two adjacent enemies yields a ratio rule: defeat A before B when turns(A)×damage(B) is no greater than turns(B)×damage(A).</Caption>
    </figure>
  );
}

function pairPackages(weights: number[], capacity: number) {
  const sorted = [...weights].sort((a, b) => a - b);
  const groups: number[][] = [];
  let left = 0;
  let right = sorted.length - 1;
  while (left <= right) {
    if (left === right) {
      groups.push([sorted[right]]);
      break;
    }
    if (sorted[left] + sorted[right] <= capacity) groups.push([sorted[left++], sorted[right--]]);
    else groups.push([sorted[right--]]);
  }
  return groups;
}

export function CAIPackagePairingLab() {
  const [capacity, setCapacity] = useState(10);
  const weights = [2, 3, 4, 5, 6, 7, 8];
  const groups = pairPackages(weights, capacity);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">package capacity = {capacity}<input className="mt-2 w-full accent-current" type="range" min="8" max="14" value={capacity} onChange={(event) => setCapacity(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{groups.map((group, index) => <div key={`${group.join("-")}-${index}`} className="border border-accent p-3 text-center text-accent"><div className="text-xs">parcel {index + 1}</div><div className="mt-1 font-mono text-lg">{group.join(" + ")}</div><div className="text-xs text-secondary">load {group.reduce((a, b) => a + b, 0)} / {capacity}</div></div>)}</div>
      </Panel>
      <Caption>When each parcel holds at most two items, assigning the heaviest item and pairing it with the lightest feasible item is exchange-safe.</Caption>
    </figure>
  );
}

export function CAIGreedyProofLab() {
  const [step, setStep] = useState(0);
  const steps = [
    ["candidate", "define the greedy choice precisely"],
    ["comparison", "take an arbitrary optimal solution"],
    ["exchange", "replace its first conflicting choice with the greedy choice"],
    ["preservation", "prove feasibility and objective value do not worsen"],
    ["induction", "repeat on the remaining subproblem"],
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">exchange proof: {step + 1} / {steps.length}<input className="mt-2 w-full accent-current" type="range" min="0" max={steps.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-5 gap-1">{steps.map(([name], index) => <div key={name} className={`border p-2 text-center text-[11px] ${index === step ? "border-accent bg-accent/10 text-accent" : index < step ? "border-success text-success" : "border-border text-secondary"}`}>{name}</div>)}</div>
        <div className="mt-3 border border-accent p-4 text-sm text-accent">{steps[step][1]}</div>
      </Panel>
      <Caption>An exchange argument turns a local preference into a global theorem by transforming some optimal solution without making it worse.</Caption>
    </figure>
  );
}

function greedyCoins(amount: number, coins: number[]) {
  const result: number[] = [];
  let remaining = amount;
  for (const coin of [...coins].sort((a, b) => b - a)) {
    while (remaining >= coin) {
      result.push(coin);
      remaining -= coin;
    }
  }
  return result;
}

export function CAICounterexampleLab() {
  const [amount, setAmount] = useState(6);
  const coins = [1, 3, 4];
  const greedy = greedyCoins(amount, coins);
  const dp = Array(amount + 1).fill(Number.POSITIVE_INFINITY);
  dp[0] = 0;
  for (let value = 1; value <= amount; value += 1) for (const coin of coins) if (coin <= value) dp[value] = Math.min(dp[value], dp[value - coin] + 1);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">target amount = {amount}<input className="mt-2 w-full accent-current" type="range" min="1" max="15" value={amount} onChange={(event) => setAmount(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-2 gap-3"><div className={`border p-4 ${greedy.length === dp[amount] ? "border-success text-success" : "border-danger text-danger"}`}><div className="text-xs">largest coin first</div><div className="mt-2 font-mono text-lg">{greedy.join(" + ")}</div><div className="text-xs">{greedy.length} coins</div></div><div className="border border-success p-4 text-success"><div className="text-xs">optimal count</div><div className="mt-2 font-mono text-lg">{dp[amount]}</div><div className="text-xs">found by complete DP baseline</div></div></div>
      </Panel>
      <Caption>Coin values 1, 3, 4 and target 6 give a compact counterexample: 4+1+1 loses to 3+3, so “take the largest” is not universally valid.</Caption>
    </figure>
  );
}

export function CAIStrategySelectorLab() {
  const [choicesIndependent, setChoicesIndependent] = useState(false);
  const [exchangeProof, setExchangeProof] = useState(false);
  const [smallSearch, setSmallSearch] = useState(true);
  const recommendation = exchangeProof ? "use greedy with the proof" : smallSearch ? "keep exhaustive search as oracle" : choicesIndependent ? "look for direct decomposition" : "use DP/search; greedy is unproven";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-2 sm:grid-cols-3"><label className="border border-border p-3 text-sm text-secondary"><input className="mr-2 accent-current" type="checkbox" checked={choicesIndependent} onChange={(event) => setChoicesIndependent(event.target.checked)} />choices decompose</label><label className="border border-border p-3 text-sm text-secondary"><input className="mr-2 accent-current" type="checkbox" checked={exchangeProof} onChange={(event) => setExchangeProof(event.target.checked)} />exchange proof exists</label><label className="border border-border p-3 text-sm text-secondary"><input className="mr-2 accent-current" type="checkbox" checked={smallSearch} onChange={(event) => setSmallSearch(event.target.checked)} />small oracle is feasible</label></div>
        <div className="mt-4 border border-accent p-4 text-center text-accent">{recommendation}</div>
      </Panel>
      <Caption>Strategy choice is evidence-driven: exhaustive search supplies an oracle, while greedy requires a structural proof that local choices preserve an optimum.</Caption>
    </figure>
  );
}
