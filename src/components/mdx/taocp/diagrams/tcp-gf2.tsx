"use client";

import { useState, type ReactNode } from "react";

function Panel({ children }: { children: ReactNode }) {
  return <div className="border border-border bg-elevated p-4 sm:p-5">{children}</div>;
}

function Figure({ children, caption }: { children: ReactNode; caption: string }) {
  return <figure className="mdx-figure not-prose mx-auto my-6"><Panel>{children}</Panel><figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption></figure>;
}

function Stat({ label, value, tone = "accent" }: { label: string; value: string; tone?: "accent" | "warning" | "success" | "danger" }) {
  const classes = { accent: "border-accent text-accent", warning: "border-warning text-warning", success: "border-success text-success", danger: "border-danger text-danger" }[tone];
  return <div className={`min-w-0 border p-3 text-center ${classes}`}><div className="text-xs">{label}</div><div className="mt-1 break-words font-mono text-sm">{value}</div></div>;
}

export function TcpSearchTreeLab() {
  const [depth, setDepth] = useState(4);
  const [branching, setBranching] = useState(2);
  const completeNodes = (branching ** (depth + 1) - 1) / (branching - 1);
  const leaves = branching ** depth;
  return (
    <Figure caption="A combinatorial search tree turns a partial assignment into a node and each legal next choice into an edge; exponential growth makes pruning evidence essential.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">decision depth = {depth}<input className="mt-2 h-11 w-full accent-current" type="range" min="1" max="10" value={depth} onChange={(event) => setDepth(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">branching factor = {branching}<input className="mt-2 h-11 w-full accent-current" type="range" min="2" max="5" value={branching} onChange={(event) => setBranching(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="leaves" value={leaves.toLocaleString()} /><Stat label="complete nodes" value={completeNodes.toLocaleString()} tone="warning" /><Stat label="state per path" value={depth.toString()} /></div>
    </Figure>
  );
}

function queens(size: number) {
  const output: number[][] = [];
  const visit = (rows: number[], columns: Set<number>, down: Set<number>, up: Set<number>) => {
    const row = rows.length;
    if (row === size) { output.push(rows); return; }
    for (let column = 0; column < size; column += 1) {
      if (columns.has(column) || down.has(row - column) || up.has(row + column)) continue;
      visit([...rows, column], new Set([...columns, column]), new Set([...down, row - column]), new Set([...up, row + column]));
    }
  };
  visit([], new Set(), new Set(), new Set());
  return output;
}

export function TcpNQueensLab() {
  const [size, setSize] = useState(5);
  const [rank, setRank] = useState(0);
  const solutions = queens(size);
  const safeRank = rank % solutions.length;
  const board = solutions[safeRank];
  return (
    <Figure caption="N-queens backtracking maintains occupied columns and diagonals as incremental invariants; an illegal prefix is rejected before it becomes a full board.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">board size = {size}<input className="mt-2 h-11 w-full accent-current" type="range" min="4" max="8" value={size} onChange={(event) => { setSize(Number(event.target.value)); setRank(0); }} /></label><label className="text-sm font-semibold text-primary">solution rank = {safeRank}<input className="mt-2 h-11 w-full accent-current" type="range" min="0" max={solutions.length - 1} value={safeRank} onChange={(event) => setRank(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid aspect-square max-w-[28rem] border border-border" style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}>{Array.from({ length: size * size }, (_, index) => { const row = Math.floor(index / size); const column = index % size; const queen = board[row] === column; return <div key={index} className={`flex aspect-square items-center justify-center border border-border text-sm ${queen ? "bg-success/25 font-bold text-success" : (row + column) % 2 ? "bg-background" : "bg-elevated"}`}>{queen ? "Q" : ""}</div>; })}</div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="solutions" value={solutions.length.toString()} /><Stat label="row-to-column" value={board.join(" ")} tone="success" /></div>
    </Figure>
  );
}

const ITEMS = [{ weight: 2, value: 9 }, { weight: 3, value: 12 }, { weight: 4, value: 14 }, { weight: 5, value: 15 }];

export function TcpBoundPruningLab() {
  const [capacity, setCapacity] = useState(8);
  const [incumbent, setIncumbent] = useState(18);
  let remaining = capacity;
  let upper = 0;
  for (const item of ITEMS) {
    const take = Math.min(remaining, item.weight);
    upper += take * item.value / item.weight;
    remaining -= take;
    if (remaining === 0) break;
  }
  return (
    <Figure caption="Branch-and-bound prunes a partial choice only when a valid optimistic bound cannot beat the incumbent; an underestimated bound can destroy correctness.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">capacity = {capacity}<input className="mt-2 h-11 w-full accent-current" type="range" min="2" max="14" value={capacity} onChange={(event) => setCapacity(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">incumbent value = {incumbent}<input className="mt-2 h-11 w-full accent-current" type="range" min="0" max="45" value={incumbent} onChange={(event) => setIncumbent(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="fractional upper bound" value={upper.toFixed(2)} /><Stat label="incumbent" value={incumbent.toString()} /><Stat label="branch" value={upper <= incumbent ? "prune" : "explore"} tone={upper <= incumbent ? "warning" : "success"} /></div>
    </Figure>
  );
}

export function TcpSymmetryLab() {
  const [bits, setBits] = useState(5);
  const [value, setValue] = useState(7);
  const mask = 2 ** bits - 1;
  const normalized = value & mask;
  const complement = normalized ^ mask;
  const representative = Math.min(normalized, complement);
  return (
    <Figure caption="Symmetry breaking selects one canonical representative from each complement pair, halving a binary search space without deleting equivalence classes.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">bits = {bits}<input className="mt-2 h-11 w-full accent-current" type="range" min="2" max="8" value={bits} onChange={(event) => { setBits(Number(event.target.value)); setValue(0); }} /></label><label className="text-sm font-semibold text-primary">state = {normalized}<input className="mt-2 h-11 w-full accent-current" type="range" min="0" max={mask} value={normalized} onChange={(event) => setValue(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="state" value={normalized.toString(2).padStart(bits, "0")} /><Stat label="complement" value={complement.toString(2).padStart(bits, "0")} /><Stat label="canonical min" value={representative.toString(2).padStart(bits, "0")} tone="success" /></div>
    </Figure>
  );
}

const COVER_ROWS: Record<string, number[]> = { A: [1, 4, 7], B: [1, 4], C: [4, 5, 7], D: [3, 5, 6], E: [2, 3, 6, 7], F: [2, 7] };

export function TcpExactCoverLab() {
  const [selected, setSelected] = useState(["B", "D", "F"]);
  const counts = Array.from({ length: 7 }, (_, index) => selected.filter((row) => COVER_ROWS[row].includes(index + 1)).length);
  const exact = counts.every((count) => count === 1);
  const toggle = (row: string) => setSelected((current) => current.includes(row) ? current.filter((value) => value !== row) : [...current, row]);
  return (
    <Figure caption="Exact cover chooses rows so every primary column is covered exactly once; validity is a column-count invariant, not merely full coverage.">
      <div className="grid grid-cols-6 gap-2">{Object.keys(COVER_ROWS).map((row) => <label key={row} className="flex items-center gap-2 border border-border bg-background p-2 text-sm text-primary"><input type="checkbox" checked={selected.includes(row)} onChange={() => toggle(row)} />{row}</label>)}</div>
      <div className="mt-4 grid grid-cols-7 gap-1">{counts.map((count, index) => <Stat key={index} label={`column ${index + 1}`} value={count.toString()} tone={count === 1 ? "success" : count > 1 ? "danger" : "warning"} />)}</div>
      <div className="mt-4"><Stat label="selected rows" value={`${selected.join(" ") || "none"} · ${exact ? "exact cover" : "incomplete/conflicting"}`} tone={exact ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function TcpDancingLinksLab() {
  const [column, setColumn] = useState(1);
  const rows = Object.entries(COVER_ROWS).filter(([, columns]) => columns.includes(column)).map(([row]) => row);
  const removedColumns = new Set(rows.flatMap((row) => COVER_ROWS[row]));
  const remainingRows = Object.keys(COVER_ROWS).filter((row) => !COVER_ROWS[row].some((value) => removedColumns.has(value)));
  return (
    <Figure caption="Dancing Links covers a column by unlinking its rows and conflicting columns; exact reversible pointer updates make uncover restore the prior matrix in reverse order.">
      <label className="text-sm font-semibold text-primary">cover column = {column}<input className="mt-2 h-11 w-full accent-current" type="range" min="1" max="7" value={column} onChange={(event) => setColumn(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="candidate rows" value={rows.join(" ") || "none"} /><Stat label="touched columns" value={[...removedColumns].sort().join(" ")} tone="warning" /><Stat label="rows unaffected by all candidates" value={remainingRows.join(" ") || "none"} tone="success" /></div>
    </Figure>
  );
}

type Assignment = { x: boolean; y: boolean; z: boolean };
const CLAUSES = [
  { text: "x ∨ y", eval: (a: Assignment) => a.x || a.y },
  { text: "¬x ∨ z", eval: (a: Assignment) => !a.x || a.z },
  { text: "¬y ∨ ¬z", eval: (a: Assignment) => !a.y || !a.z },
];

export function TcpSatEvaluationLab() {
  const [assignment, setAssignment] = useState<Assignment>({ x: true, y: false, z: true });
  const values = CLAUSES.map((clause) => clause.eval(assignment));
  return (
    <Figure caption="A CNF assignment satisfies the formula exactly when every clause has at least one true literal; one false clause is a complete conflict witness.">
      <div className="grid grid-cols-3 gap-3">{(["x", "y", "z"] as const).map((variable) => <label key={variable} className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={assignment[variable]} onChange={(event) => setAssignment({ ...assignment, [variable]: event.target.checked })} />{variable} = {assignment[variable] ? 1 : 0}</label>)}</div>
      <div className="mt-4 grid grid-cols-3 gap-2">{CLAUSES.map((clause, index) => <Stat key={clause.text} label={clause.text} value={values[index] ? "true" : "false"} tone={values[index] ? "success" : "danger"} />)}</div>
      <div className="mt-4"><Stat label="CNF" value={values.every(Boolean) ? "SAT under assignment" : "conflict"} tone={values.every(Boolean) ? "success" : "danger"} /></div>
    </Figure>
  );
}

export function TcpUnitPropagationLab() {
  const [seed, setSeed] = useState<"none" | "x" | "not-x">("x");
  const trail = seed === "x" ? ["x=1 (unit)", "y=1 from ¬x∨y", "z=1 from ¬y∨z"] : seed === "not-x" ? ["x=0 (decision)", "clause x conflicts"] : [];
  return (
    <Figure caption="Unit propagation assigns the only unfalse literal in a clause and records its reason; repeating to a fixed point either simplifies the formula or exposes conflict.">
      <label className="text-sm font-semibold text-primary">initial trail<select className="mt-2 block w-full border border-border bg-background p-2" value={seed} onChange={(event) => setSeed(event.target.value as typeof seed)}><option value="none">none</option><option value="x">unit x</option><option value="not-x">decision ¬x</option></select></label>
      <div className="mt-4 grid gap-2">{trail.length ? trail.map((entry, index) => <Stat key={entry} label={`trail ${index}`} value={entry} tone={entry.includes("conflict") ? "danger" : "success"} />) : <Stat label="trail" value="no propagation yet" />}</div>
    </Figure>
  );
}

export function TcpDpllLab() {
  const [branch, setBranch] = useState<"x0" | "x1" | "y0" | "y1">("x1");
  const variable = branch[0] as "x" | "y";
  const value = branch[1] === "1";
  const possibilities = Array.from({ length: 4 }, (_, mask) => ({ x: variable === "x" ? value : Boolean(mask & 2), y: variable === "y" ? value : Boolean(mask & 2), z: Boolean(mask & 1) }));
  const satisfying = possibilities.filter((assignment) => CLAUSES.every((clause) => clause.eval(assignment)));
  return (
    <Figure caption="DPLL alternates propagation with a decision split; each branch adds one literal, and completeness comes from exploring both polarities unless conflict closes one side.">
      <label className="text-sm font-semibold text-primary">decision branch<select className="mt-2 block w-full border border-border bg-background p-2" value={branch} onChange={(event) => setBranch(event.target.value as typeof branch)}><option value="x0">x=0</option><option value="x1">x=1</option><option value="y0">y=0</option><option value="y1">y=1</option></select></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="decision" value={`${variable}=${Number(value)}`} /><Stat label="tested completions" value={possibilities.length.toString()} /><Stat label="satisfying completions" value={satisfying.length.toString()} tone={satisfying.length ? "success" : "danger"} /></div>
    </Figure>
  );
}

const LITERALS = ["x", "¬y", "z", "w"];

export function TcpWatchedLiteralLab() {
  const [falseMask, setFalseMask] = useState(1);
  const available = LITERALS.map((literal, index) => ({ literal, index })).filter(({ index }) => !(falseMask & (1 << index)));
  const watched = available.slice(0, 2);
  return (
    <Figure caption="Two-watched-literal propagation revisits a clause only when a watched literal becomes false; it then finds a replacement, a unit literal, or conflict.">
      <label className="text-sm font-semibold text-primary">false-literal mask = {falseMask.toString(2).padStart(4, "0")}<input className="mt-2 h-11 w-full accent-current" type="range" min="0" max="15" value={falseMask} onChange={(event) => setFalseMask(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-4 gap-2">{LITERALS.map((literal, index) => <Stat key={literal} label={literal} value={falseMask & (1 << index) ? "false" : watched.some((item) => item.index === index) ? "watched" : "available"} tone={falseMask & (1 << index) ? "danger" : watched.some((item) => item.index === index) ? "success" : "accent"} />)}</div>
      <div className="mt-4"><Stat label="clause status" value={available.length === 0 ? "conflict" : available.length === 1 ? `unit ${available[0].literal}` : "not unit"} tone={available.length === 0 ? "danger" : available.length === 1 ? "warning" : "success"} /></div>
    </Figure>
  );
}

export function TcpImplicationGraphLab() {
  const [conflict, setConflict] = useState(true);
  const edges = conflict ? ["a@1 → c@1", "b@2 → d@2", "c@1,d@2 → e@2", "e@2 → ¬b@2"] : ["a@1 → c@1", "b@2 → d@2"];
  return (
    <Figure caption="An implication graph labels every propagated literal with its decision level and reason clause; a conflict joins opposite literals and enables graph-based analysis.">
      <label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={conflict} onChange={(event) => setConflict(event.target.checked)} />include conflicting implications</label>
      <div className="mt-4 grid gap-2">{edges.map((edge, index) => <Stat key={edge} label={`edge ${index + 1}`} value={edge} tone={edge.includes("¬") ? "danger" : "accent"} />)}</div>
      <div className="mt-4"><Stat label="graph result" value={conflict ? "b and ¬b at level 2" : "no conflict"} tone={conflict ? "danger" : "success"} /></div>
    </Figure>
  );
}

export function TcpClauseLearningLab() {
  const [firstUip, setFirstUip] = useState(true);
  return (
    <Figure caption="Conflict analysis resolves reason clauses until the learned clause has one current-level literal; asserting it after backjump prevents the same conflict region.">
      <label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={firstUip} onChange={(event) => setFirstUip(event.target.checked)} />resolve to first UIP</label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="conflict" value="b ∧ ¬b" tone="danger" /><Stat label="learned clause" value={firstUip ? "¬a ∨ ¬d" : "¬a ∨ ¬b ∨ ¬c"} tone="warning" /><Stat label="backjump level" value={firstUip ? "1" : "0"} tone="success" /></div>
    </Figure>
  );
}

export function TcpBacktrackCertificateLab() {
  const [state, setState] = useState(true);
  const [reversible, setReversible] = useState(false);
  const [pruning, setPruning] = useState(true);
  const [conflict, setConflict] = useState(false);
  const complete = state && reversible && pruning && conflict;
  return (
    <Figure caption="A backtracking certificate records the partial-state invariant, exact undo behavior, sound pruning proof, and conflict or solution witness.">
      <div className="grid gap-3 sm:grid-cols-4"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={state} onChange={(event) => setState(event.target.checked)} />state invariant</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={reversible} onChange={(event) => setReversible(event.target.checked)} />undo exact</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={pruning} onChange={(event) => setPruning(event.target.checked)} />pruning sound</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={conflict} onChange={(event) => setConflict(event.target.checked)} />witness / clause</label></div>
      <div className="mt-4"><Stat label="Volume 4B search certificate" value={complete ? "complete" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function TcpGf2Diagram() {
  return <TcpSearchTreeLab />;
}
