"use client";

import { useMemo, useState, type ReactNode } from "react";

const values = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];

type Trace = {
  low: number;
  high: number;
  mid: number;
  relation: "<" | "=" | ">";
};

function Panel({ children }: { children: ReactNode }) {
  return <div className="border border-border bg-elevated p-4 sm:p-5">{children}</div>;
}

function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="mt-2 text-center text-sm text-secondary">{children}</figcaption>;
}

function traceSearch(target: number) {
  const trace: Trace[] = [];
  let low = 0;
  let high = values.length - 1;
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    const relation = values[mid] < target ? "<" : values[mid] > target ? ">" : "=";
    trace.push({ low, high, mid, relation });
    if (relation === "=") break;
    if (relation === "<") low = mid + 1;
    else high = mid - 1;
  }
  return { trace, result: low <= high ? trace[trace.length - 1].mid : -1 };
}

export function PP2BinarySearchChallengeLab() {
  const [target, setTarget] = useState(38);
  const search = useMemo(() => traceSearch(target), [target]);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">target = {target}<input className="mt-2 w-full accent-current" type="range" min="0" max="95" value={target} onChange={(event) => setTarget(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-5 gap-1 sm:grid-cols-10">{values.map((value, index) => <div key={value} className={"border p-2 text-center font-mono text-xs " + (index === search.result ? "border-success text-success" : "border-border text-secondary")}><div>{index}</div><div>{value}</div></div>)}</div>
        <div className="mt-3 grid grid-cols-2 gap-2"><div className="border border-accent p-3 text-accent">comparisons: {search.trace.length}</div><div className={"border p-3 " + (search.result >= 0 ? "border-success text-success" : "border-warning text-warning")}>result: {search.result}</div></div>
      </Panel>
      <Caption>Binary search is short but every boundary choice affects empty, singleton, absent, first, and last-element cases.</Caption>
    </figure>
  );
}

export function PP2SearchContractLab() {
  const [sorted, setSorted] = useState(true);
  const [resultKind, setResultKind] = useState<"exact index" | "insertion point">("exact index");
  const valid = sorted;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="border border-border p-3 text-sm text-secondary"><input className="mr-2 accent-current" type="checkbox" checked={sorted} onChange={(event) => setSorted(event.target.checked)} />input array is nondecreasing</label>
        <label className="mt-3 block text-xs text-secondary">postcondition<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={resultKind} onChange={(event) => setResultKind(event.target.value as typeof resultKind)}><option>exact index</option><option>insertion point</option></select></label>
        <div className={"mt-4 border p-3 text-sm " + (valid ? "border-success text-success" : "border-danger text-danger")}>{valid ? resultKind === "exact index" ? "Return r with a[r] = target, or −1 iff no such index exists." : "Return first r with a[r] ≥ target, or n if all elements are smaller." : "Binary-search monotonicity is unavailable; the contract precondition fails."}</div>
      </Panel>
      <Caption>A proof starts from an exact contract: sortedness, interval convention, duplicate policy, and return semantics cannot stay implicit.</Caption>
    </figure>
  );
}

export function PP2SearchInvariantLab() {
  const [target, setTarget] = useState(23);
  const search = useMemo(() => traceSearch(target), [target]);
  const [step, setStep] = useState(0);
  const safeStep = Math.min(step, search.trace.length - 1);
  const state = search.trace[safeStep];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-xs text-secondary">target = {target}<input className="mt-2 w-full accent-current" type="range" min="0" max="95" value={target} onChange={(event) => { setTarget(Number(event.target.value)); setStep(0); }} /></label>
        <label className="mt-3 block text-xs text-secondary">trace step = {safeStep}<input className="mt-2 w-full accent-current" type="range" min="0" max={search.trace.length - 1} value={safeStep} onChange={(event) => setStep(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-5 gap-1 sm:grid-cols-10">{values.map((value, index) => <div key={value} className={"border p-2 text-center font-mono text-xs " + (index < state.low || index > state.high ? "border-border text-secondary opacity-30" : index === state.mid ? "border-warning text-warning" : "border-accent text-accent")}><div>{index}</div><div>{value}</div></div>)}</div>
        <div className="mt-3 border border-success p-3 text-sm text-success">invariant: if target occurs, at least one occurrence remains inside [{state.low}, {state.high}]</div>
      </Panel>
      <Caption>The active interval is a proof object: every branch discards only values that sortedness proves cannot equal the target.</Caption>
    </figure>
  );
}

export function PP2MidpointOverflowLab() {
  const [low, setLow] = useState(2_000_000_000);
  const high = 2_147_483_640;
  const unsafeSum = low + high;
  const int32Sum = unsafeSum | 0;
  const safeMid = low + Math.floor((high - low) / 2);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">low = {low.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="1000000000" max="2147483600" step="10000000" value={low} onChange={(event) => setLow(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="border border-danger p-4 text-danger"><div className="text-xs">32-bit (low + high) overflow</div><div className="mt-1 break-all font-mono">{int32Sum} / 2</div></div><div className="border border-success p-4 text-success"><div className="text-xs">low + (high − low) / 2</div><div className="mt-1 font-mono">{safeMid.toLocaleString()}</div></div></div>
      </Panel>
      <Caption>Algebraically equal midpoint formulas are not operationally equal under bounded integer arithmetic.</Caption>
    </figure>
  );
}

export function PP2BoundaryMutationLab() {
  const [mutation, setMutation] = useState<"correct" | "low = mid" | "high = mid" | "high = n">("correct");
  const cases = {
    correct: ["low = mid + 1; high = mid − 1", "strictly smaller interval", "terminates"],
    "low = mid": ["low = mid on a[mid] < target", "[low, high] may repeat when high = low + 1", "can loop forever"],
    "high = mid": ["high = mid on a[mid] > target", "[low, high] may repeat in exact-search convention", "can loop forever"],
    "high = n": ["initial high is n", "first midpoint may be valid, later a[n] can be read", "out-of-bounds"],
  }[mutation];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">boundary update<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={mutation} onChange={(event) => setMutation(event.target.value as typeof mutation)}><option>correct</option><option>low = mid</option><option>high = mid</option><option>high = n</option></select></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className="border border-accent p-3 text-accent">{cases[0]}</div><div className="border border-warning p-3 text-warning">{cases[1]}</div><div className={"border p-3 " + (mutation === "correct" ? "border-success text-success" : "border-danger text-danger")}>{cases[2]}</div></div>
      </Panel>
      <Caption>Off-by-one updates are proved by showing both safety and strict interval shrinkage, not by testing one successful lookup.</Caption>
    </figure>
  );
}

export function PP2VerificationTriangleLab() {
  const [stage, setStage] = useState<"initialization" | "maintenance" | "termination">("maintenance");
  const details = {
    initialization: ["low=0, high=n−1", "all possible target positions begin inside the interval", "invariant established"],
    maintenance: ["compare a[mid] with target", "sortedness justifies discarding one side", "invariant preserved"],
    termination: ["low > high or equality found", "variant high−low+1 cannot decrease forever", "postcondition follows"],
  }[stage];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">proof obligation<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={stage} onChange={(event) => setStage(event.target.value as typeof stage)}><option>initialization</option><option>maintenance</option><option>termination</option></select></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className="border border-accent p-3 text-accent">{details[0]}</div><div className="border border-warning p-3 text-warning">{details[1]}</div><div className="border border-success p-3 text-success">{details[2]}</div></div>
      </Panel>
      <Caption>Loop correctness is decomposed into initialization, maintenance, and termination so each argument stays local and checkable.</Caption>
    </figure>
  );
}

export function PP2VariantLab() {
  const [low, setLow] = useState(2);
  const [high, setHigh] = useState(8);
  const normalizedLow = Math.min(low, high);
  const size = high - normalizedLow + 1;
  const mid = normalizedLow + Math.floor((high - normalizedLow) / 2);
  const leftSize = mid - normalizedLow;
  const rightSize = high - mid;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">low = {normalizedLow}<input className="mt-2 w-full accent-current" type="range" min="0" max={high} value={normalizedLow} onChange={(event) => setLow(Number(event.target.value))} /></label><label className="text-xs text-secondary">high = {high}<input className="mt-2 w-full accent-current" type="range" min={normalizedLow} max="20" value={high} onChange={(event) => setHigh(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center"><div className="border border-accent p-3 text-accent"><div className="text-xs">current variant</div><div className="font-mono text-2xl">{size}</div></div><div className="border border-success p-3 text-success"><div className="text-xs">after discard right</div><div className="font-mono text-2xl">{leftSize}</div></div><div className="border border-success p-3 text-success"><div className="text-xs">after discard left</div><div className="font-mono text-2xl">{rightSize}</div></div></div>
      </Panel>
      <Caption>The nonnegative interval size high − low + 1 strictly decreases on every non-returning iteration, proving termination.</Caption>
    </figure>
  );
}

export function PP2CounterexampleLab() {
  const [bug, setBug] = useState<"empty input" | "last element" | "absent between" | "duplicates">("empty input");
  const detail = {
    "empty input": ["[]", "target 4", "initial high must be −1 and no element may be read"],
    "last element": ["[1,3,5,7]", "target 7", "inclusive high and right update must keep index 3"],
    "absent between": ["[1,3,5,7]", "target 4", "must terminate with −1 after interval becomes empty"],
    duplicates: ["[1,3,3,3,5]", "target 3", "exact search may return any occurrence unless first/last is specified"],
  }[bug];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">minimal counterexample<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={bug} onChange={(event) => setBug(event.target.value as typeof bug)}><option>empty input</option><option>last element</option><option>absent between</option><option>duplicates</option></select></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className="border border-accent p-3 font-mono text-accent">{detail[0]}</div><div className="border border-warning p-3 text-warning">{detail[1]}</div><div className="border border-success p-3 text-success">{detail[2]}</div></div>
      </Panel>
      <Caption>Small counterexamples expose boundary errors faster than large random arrays because every state transition can be inspected.</Caption>
    </figure>
  );
}

export function PP2ProofCodeMap() {
  const [line, setLine] = useState(0);
  const rows = [
    ["low = 0; high = n − 1", "initialize candidate interval"],
    ["while (low <= high)", "continue exactly while candidates remain"],
    ["mid = low + (high-low)/2", "choose a valid candidate without overflow"],
    ["a[mid] < t → low = mid + 1", "discard values proved too small"],
    ["a[mid] > t → high = mid − 1", "discard values proved too large"],
    ["return −1", "empty interval proves absence"],
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">program line = {line + 1}<input className="mt-2 w-full accent-current" type="range" min="0" max={rows.length - 1} value={line} onChange={(event) => setLine(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="border border-accent p-4 font-mono text-accent">{rows[line][0]}</div><div className="border border-success p-4 text-success">{rows[line][1]}</div></div>
      </Panel>
      <Caption>Each executable line corresponds to a proof obligation; comments should record the reason, not restate the syntax.</Caption>
    </figure>
  );
}

export function PP2VerificationRolesLab() {
  const [role, setRole] = useState<"design" | "documentation" | "testing" | "maintenance">("design");
  const detail = {
    design: ["derive code from invariants", "prevent bugs before execution"],
    documentation: ["state contracts and loop meaning", "make review local"],
    testing: ["generate boundary and mutation cases", "challenge assumptions not covered by proof model"],
    maintenance: ["re-prove changed branch and invariant", "limit regression blast radius"],
  }[role];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">role of verification<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={role} onChange={(event) => setRole(event.target.value as typeof role)}><option>design</option><option>documentation</option><option>testing</option><option>maintenance</option></select></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="border border-accent p-4 text-accent">{detail[0]}</div><div className="border border-success p-4 text-success">{detail[1]}</div></div>
      </Panel>
      <Caption>Verification is useful even without an automated prover: it guides design, records intent, sharpens tests, and constrains maintenance.</Caption>
    </figure>
  );
}

export function PP2CorrectnessCertificateLab() {
  const [mutation, setMutation] = useState<"valid" | "unsorted" | "no shrink" | "wrong absence">("valid");
  const checks = {
    precondition: mutation !== "unsorted",
    invariant: true,
    variant: mutation !== "no shrink",
    postcondition: mutation !== "wrong absence",
  };
  const accepted = Object.values(checks).every(Boolean);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">proof audit<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={mutation} onChange={(event) => setMutation(event.target.value as typeof mutation)}><option>valid</option><option>unsorted</option><option>no shrink</option><option>wrong absence</option></select></label>
        <div className="mt-4 grid grid-cols-4 gap-2">{Object.entries(checks).map(([name, ok]) => <div key={name} className={"border p-3 text-center text-[11px] " + (ok ? "border-success text-success" : "border-danger text-danger")}><div>{name}</div><div className="font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
        <div className={"mt-3 border p-3 text-sm " + (accepted ? "border-success text-success" : "border-danger text-danger")}>{accepted ? "Partial correctness and termination combine into total correctness for the stated contract." : "A required proof obligation is missing; tests cannot repair the specification gap."}</div>
      </Panel>
      <Caption>A correctness certificate binds precondition, invariant preservation, decreasing variant, and postcondition to the exact implementation.</Caption>
    </figure>
  );
}
