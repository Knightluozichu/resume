"use client";

import { useState, type ReactNode } from "react";

function Panel({ children }: { children: ReactNode }) {
  return <div className="border border-border bg-elevated p-4 sm:p-5">{children}</div>;
}

function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="mt-2 text-center text-sm text-secondary">{children}</figcaption>;
}

function Stat({ label, value, tone = "accent" }: { label: string; value: string; tone?: "accent" | "warning" | "success" | "danger" }) {
  const classes = {
    accent: "border-accent text-accent",
    warning: "border-warning text-warning",
    success: "border-success text-success",
    danger: "border-danger text-danger",
  }[tone];
  return <div className={`border p-3 text-center ${classes}`}><div className="text-xs">{label}</div><div className="mt-1 break-words font-mono text-lg">{value}</div></div>;
}

const dfsGraph = [
  [1, 2],
  [0, 3, 4],
  [0, 5],
  [1],
  [1, 5],
  [2, 4],
];

function dfsOrder(start: number) {
  const order: number[] = [];
  const seen = new Set<number>();
  const visit = (node: number) => {
    seen.add(node);
    order.push(node);
    for (const next of dfsGraph[node]) if (!seen.has(next)) visit(next);
  };
  visit(start);
  return order;
}

export function CAIDFSTraceLab() {
  const [start, setStart] = useState(0);
  const [prefix, setPrefix] = useState(3);
  const order = dfsOrder(start);
  const visited = new Set(order.slice(0, prefix));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">start node = {start}<input className="mt-2 w-full accent-current" type="range" min="0" max="5" value={start} onChange={(event) => { setStart(Number(event.target.value)); setPrefix(1); }} /></label><label className="text-sm font-semibold text-primary">trace prefix = {prefix}<input className="mt-2 w-full accent-current" type="range" min="1" max="6" value={prefix} onChange={(event) => setPrefix(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">{Array.from({ length: 6 }, (_, node) => <div key={node} className={`border p-4 text-center font-mono ${visited.has(node) ? "border-success bg-success/10 text-success" : "border-border text-secondary"}`}>{node}</div>)}</div>
        <div className="mt-3 border border-accent p-3 font-mono text-accent">{order.slice(0, prefix).join(" → ")}</div>
      </Panel>
      <Caption>Depth-first search follows one branch until it cannot continue, then returns to the most recent unfinished state.</Caption>
    </figure>
  );
}

function coinSearch(target: number, coins: number[]) {
  let nodes = 0;
  let best = Number.POSITIVE_INFINITY;
  const visit = (remaining: number, index: number, used: number) => {
    nodes += 1;
    if (remaining === 0) {
      best = Math.min(best, used);
      return;
    }
    if (index === coins.length || used >= best) return;
    const coin = coins[index];
    for (let count = Math.floor(remaining / coin); count >= 0; count -= 1) visit(remaining - count * coin, index + 1, used + count);
  };
  visit(target, 0, 0);
  return { nodes, best };
}

export function CAICoinChangeSearchLab() {
  const [target, setTarget] = useState(17);
  const coins = [7, 5, 3, 1];
  const result = coinSearch(target, coins);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">target amount = {target}<input className="mt-2 w-full accent-current" type="range" min="1" max="30" value={target} onChange={(event) => setTarget(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="coin choices" value={coins.join(", ")} /><Stat label="search nodes" value={`${result.nodes}`} tone="warning" /><Stat label="fewest coins" value={`${result.best}`} tone="success" /></div>
      </Panel>
      <Caption>Coin matching forms a decision tree over counts; bounds on remaining value and the best known answer prune branches safely.</Caption>
    </figure>
  );
}

const fillGrid = [
  [0, 0, 1, 1, 1, 0],
  [0, 1, 1, 0, 1, 0],
  [0, 0, 1, 0, 1, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 1, 0, 1, 0, 0],
  [0, 1, 0, 1, 1, 0],
];

function componentAt(start: number) {
  const color = fillGrid[Math.floor(start / 6)][start % 6];
  const seen = new Set<number>([start]);
  const stack = [start];
  while (stack.length) {
    const current = stack.pop()!;
    const row = Math.floor(current / 6);
    const col = current % 6;
    for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
      const nr = row + dr;
      const nc = col + dc;
      const next = nr * 6 + nc;
      if (nr >= 0 && nr < 6 && nc >= 0 && nc < 6 && fillGrid[nr][nc] === color && !seen.has(next)) {
        seen.add(next);
        stack.push(next);
      }
    }
  }
  return seen;
}

export function CAIFloodFillLab() {
  const [start, setStart] = useState(8);
  const component = componentAt(start);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="mx-auto grid max-w-sm grid-cols-6 gap-1">{fillGrid.flatMap((row, r) => row.map((value, c) => { const index = r * 6 + c; return <button key={index} type="button" aria-label={`cell ${r}, ${c}`} onClick={() => setStart(index)} className={`aspect-square border ${component.has(index) ? "border-accent bg-accent/40" : value ? "border-warning bg-warning/20" : "border-border bg-background"}`} />; }))}</div>
        <div className="mt-3 grid grid-cols-3 gap-2"><Stat label="seed cell" value={`${Math.floor(start / 6)},${start % 6}`} /><Stat label="original color" value={`${fillGrid[Math.floor(start / 6)][start % 6]}`} tone="warning" /><Stat label="component size" value={`${component.size}`} tone="success" /></div>
      </Panel>
      <Caption>Paint-bucket fill is graph reachability: cells are vertices, four-neighbor adjacency is the edge relation, and DFS finds one connected component.</Caption>
    </figure>
  );
}

function fibCalls(n: number): number {
  return n < 2 ? 1 : 1 + fibCalls(n - 1) + fibCalls(n - 2);
}

export function CAIMemoizationLab() {
  const [n, setN] = useState(10);
  const naive = fibCalls(n);
  const unique = n + 1;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">Fibonacci state n = {n}<input className="mt-2 w-full accent-current" type="range" min="2" max="20" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="naive calls" value={naive.toLocaleString()} tone="danger" /><Stat label="unique states" value={`${unique}`} tone="success" /><Stat label="reused work" value={`${naive - unique}`} tone="warning" /></div>
      </Panel>
      <Caption>Memoization collapses a recursion tree into a state graph by evaluating each distinct subproblem once.</Caption>
    </figure>
  );
}

const ticBase = ["X", "O", "X", "", "O", "", "", "X", ""];

function winner(board: string[]) {
  const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  for (const [a, b, c] of lines) if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  return board.every(Boolean) ? "draw" : null;
}

function minimax(board: string[], turn: "X" | "O"): number {
  const result = winner(board);
  if (result === "O") return 1;
  if (result === "X") return -1;
  if (result === "draw") return 0;
  const scores = board.flatMap((cell, index) => {
    if (cell) return [];
    const next = [...board];
    next[index] = turn;
    return [minimax(next, turn === "X" ? "O" : "X")];
  });
  return turn === "O" ? Math.max(...scores) : Math.min(...scores);
}

export function CAITicTacToeLab() {
  const legal = ticBase.map((cell, index) => cell ? -1 : index).filter((index) => index >= 0);
  const [move, setMove] = useState(legal[0]);
  const board = [...ticBase];
  board[move] = "O";
  const score = minimax(board, "X");

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="mx-auto grid max-w-xs grid-cols-3 gap-1">{board.map((cell, index) => <button key={index} type="button" disabled={ticBase[index] !== ""} onClick={() => setMove(index)} className={`aspect-square border text-2xl font-semibold ${index === move ? "border-accent text-accent" : "border-border text-primary"}`}>{cell || "·"}</button>)}</div>
        <div className={`mt-3 border p-3 text-center ${score > 0 ? "border-success text-success" : score === 0 ? "border-accent text-accent" : "border-danger text-danger"}`}>with perfect play: {score > 0 ? "O can force a win" : score === 0 ? "draw" : "X can force a win"}</div>
      </Panel>
      <Caption>Minimax treats the opponent as optimal: one side maximizes the outcome while the other minimizes it.</Caption>
    </figure>
  );
}

const sudoku = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

function sudokuCandidates(index: number) {
  const row = Math.floor(index / 9);
  const col = index % 9;
  if (sudoku[row][col]) return [sudoku[row][col]];
  const used = new Set<number>([...sudoku[row], ...sudoku.map((line) => line[col])]);
  const br = Math.floor(row / 3) * 3;
  const bc = Math.floor(col / 3) * 3;
  for (let r = br; r < br + 3; r += 1) for (let c = bc; c < bc + 3; c += 1) used.add(sudoku[r][c]);
  return Array.from({ length: 9 }, (_, n) => n + 1).filter((n) => !used.has(n));
}

export function CAISudokuConstraintLab() {
  const [cell, setCell] = useState(2);
  const candidates = sudokuCandidates(cell);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="mx-auto grid max-w-sm grid-cols-9">{sudoku.flatMap((row, r) => row.map((value, c) => { const index = r * 9 + c; return <button key={index} type="button" onClick={() => setCell(index)} className={`aspect-square border text-xs ${index === cell ? "border-accent bg-accent/20 text-accent" : "border-border text-secondary"}`}>{value || "·"}</button>; }))}</div>
        <div className="mt-3 border border-success p-3 text-center text-success">candidates: <span className="font-mono">{candidates.join(", ")}</span></div>
      </Panel>
      <Caption>Sudoku search becomes practical when row, column, and box constraints reduce domains and the smallest-domain cell branches first.</Caption>
    </figure>
  );
}

const puzzleGoal = [1, 2, 3, 4, 5, 6, 7, 8, 0];

function manhattan(board: number[]) {
  return board.reduce((sum, value, index) => {
    if (value === 0) return sum;
    const goal = value - 1;
    return sum + Math.abs(Math.floor(index / 3) - Math.floor(goal / 3)) + Math.abs(index % 3 - goal % 3);
  }, 0);
}

export function CAISlidingPuzzleLab() {
  const boards = [[1, 2, 3, 4, 5, 6, 0, 7, 8], [1, 3, 6, 5, 0, 2, 4, 7, 8], [7, 2, 4, 5, 0, 6, 8, 3, 1]];
  const [level, setLevel] = useState(0);
  const board = boards[level];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">puzzle state difficulty<input className="mt-2 w-full accent-current" type="range" min="0" max="2" value={level} onChange={(event) => setLevel(Number(event.target.value))} /></label>
        <div className="mx-auto mt-4 grid max-w-xs grid-cols-3 gap-1">{board.map((value, index) => <div key={index} className={`aspect-square border p-4 text-center font-mono text-xl ${value ? "border-accent text-accent" : "border-border bg-background"}`}>{value || ""}</div>)}</div>
        <div className="mt-3 grid grid-cols-2 gap-2"><Stat label="Manhattan lower bound" value={`${manhattan(board)}`} tone="success" /><Stat label="goal distance" value={board.every((value, index) => value === puzzleGoal[index]) ? "0" : "search"} /></div>
      </Panel>
      <Caption>For sliding puzzles, Manhattan distance never overestimates remaining moves, so it can guide search without losing optimality.</Caption>
    </figure>
  );
}

export function CAIIterativeDeepeningLab() {
  const [limit, setLimit] = useState(4);
  const branching = 3;
  const perDepth = Array.from({ length: limit + 1 }, (_, depth) => branching ** depth);
  const total = perDepth.reduce((sum, value) => sum + value, 0);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">current depth limit = {limit}<input className="mt-2 w-full accent-current" type="range" min="0" max="8" value={limit} onChange={(event) => setLimit(Number(event.target.value))} /></label>
        <div className="mt-4 flex h-32 items-end gap-2 border border-border p-3">{perDepth.map((value, depth) => <div key={depth} className="flex-1 bg-accent/40 text-center text-[10px] text-accent" style={{ height: `${Math.max(8, value / perDepth[perDepth.length - 1] * 100)}%` }}><span>{depth}</span></div>)}</div>
        <div className="mt-3 grid grid-cols-3 gap-2"><Stat label="branching factor" value={`${branching}`} /><Stat label="last layer" value={perDepth[perDepth.length - 1].toLocaleString()} tone="warning" /><Stat label="nodes this pass" value={total.toLocaleString()} tone="success" /></div>
      </Panel>
      <Caption>Iterative deepening repeats shallow work, but in an exponential tree most nodes lie on the final layer, so the repetition is bounded by a constant factor.</Caption>
    </figure>
  );
}

const mineNumbers = [
  [0, 1, 1, 1, 0],
  [0, 1, -1, 2, 1],
  [1, 2, 2, -1, 1],
  [-1, 1, 1, 1, 1],
  [1, 1, 0, 0, 0],
];

export function CAIMinesweeperSearchLab() {
  const [showMines, setShowMines] = useState(false);
  const hidden = new Set(["1-2", "2-3", "3-0"]);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="block border border-border p-3 text-sm text-secondary"><input className="mr-2 accent-current" type="checkbox" checked={showMines} onChange={(event) => setShowMines(event.target.checked)} />show one consistent assignment</label>
        <div className="mx-auto mt-4 grid max-w-xs grid-cols-5 gap-1">{mineNumbers.flatMap((row, r) => row.map((value, c) => { const key = `${r}-${c}`; const isMine = hidden.has(key); return <div key={key} className={`aspect-square border p-3 text-center font-mono ${isMine && showMines ? "border-danger bg-danger/20 text-danger" : isMine ? "border-warning bg-warning/20 text-warning" : "border-border text-secondary"}`}>{isMine ? showMines ? "×" : "?" : value}</div>; }))}</div>
        <div className="mt-3 text-sm text-secondary">Each revealed number is a local cardinality constraint; search assigns hidden cells and backtracks as soon as any count is impossible.</div>
      </Panel>
      <Caption>Minesweeper combines constraint propagation with bounded search; iterative deepening can cap how many uncertain assumptions are explored.</Caption>
    </figure>
  );
}

export function CAIModernAIMap() {
  const [mode, setMode] = useState<"search" | "supervised" | "reinforcement" | "generative">("search");
  const rows = {
    search: ["explicit state", "legal transitions", "goal or utility", "proof / explored nodes"],
    supervised: ["labeled examples", "model parameters", "prediction loss", "held-out evaluation"],
    reinforcement: ["observations", "policy actions", "long-term reward", "return and safety"],
    generative: ["token context", "next-token distribution", "likelihood / preference", "task and factual eval"],
  }[mode];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">AI paradigm<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={mode} onChange={(event) => setMode(event.target.value as typeof mode)}><option value="search">search</option><option value="supervised">supervised learning</option><option value="reinforcement">reinforcement learning</option><option value="generative">generative model</option></select></label>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4"><Stat label="input" value={rows[0]} /><Stat label="choice" value={rows[1]} tone="warning" /><Stat label="objective" value={rows[2]} tone="success" /><Stat label="evidence" value={rows[3]} /></div>
      </Panel>
      <Caption>Modern AI extends explicit search with learned representations and policies, but every system still needs a state, choices, an objective, and evaluation evidence.</Caption>
    </figure>
  );
}
