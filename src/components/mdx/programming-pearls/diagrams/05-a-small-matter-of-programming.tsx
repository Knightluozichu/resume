"use client";

import { useMemo, useState, type ReactNode } from "react";

function Panel({ children }: { children: ReactNode }) {
  return <div className="border border-border bg-elevated p-4 sm:p-5">{children}</div>;
}

function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="mt-2 text-center text-sm text-secondary">{children}</figcaption>;
}

function exactSearch(values: number[], target: number) {
  let low = 0;
  let high = values.length - 1;
  let comparisons = 0;
  while (low <= high) {
    comparisons += 1;
    const mid = low + Math.floor((high - low) / 2);
    if (values[mid] < target) low = mid + 1;
    else if (values[mid] > target) high = mid - 1;
    else return { index: mid, comparisons };
  }
  return { index: -1, comparisons };
}

export function PP2PseudocodeToCLab() {
  const [line, setLine] = useState(0);
  const rows = [
    ["l := 0; u := n-1", "ptrdiff_t low = 0, high = size - 1;", "Choose an index type that can represent -1 for empty input."],
    ["while l <= u", "while (low <= high)", "The closed interval contains a candidate exactly while it is nonempty."],
    ["m := floor((l+u)/2)", "mid = low + (high-low)/2;", "Preserve the mathematical midpoint without overflowing the sum."],
    ["x[m] < t", "low = mid + 1;", "Sortedness proves the discarded prefix cannot contain the target."],
    ["x[m] > t", "high = mid - 1;", "The update must exclude mid so the interval strictly shrinks."],
    ["otherwise return m", "return static_cast<int>(mid);", "The cast belongs to the public result contract and needs a size bound."],
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">translation step {line + 1}<input className="mt-2 w-full accent-current" type="range" min="0" max={rows.length - 1} value={line} onChange={(event) => setLine(Number(event.target.value))} /></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-accent p-3 font-mono text-xs text-accent">{rows[line][0]}</div><div className="border border-warning p-3 font-mono text-xs text-warning">{rows[line][1]}</div><div className="border border-success p-3 text-xs text-success">{rows[line][2]}</div></div>
      </Panel>
      <Caption>Translation is a chain of explicit representation decisions, not a mechanical change of punctuation.</Caption>
    </figure>
  );
}

export function PP2ProbeHarnessLab() {
  const [size, setSize] = useState(9);
  const [target, setTarget] = useState(40);
  const values = useMemo(() => Array.from({ length: size }, (_, index) => index * 10), [size]);
  const actual = exactSearch(values, target);
  const expected = values.indexOf(target);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">n = {size}<input className="mt-2 w-full accent-current" type="range" min="0" max="16" value={size} onChange={(event) => setSize(Number(event.target.value))} /></label><label className="text-xs text-secondary">target = {target}<input className="mt-2 w-full accent-current" type="range" min="-5" max="165" step="5" value={target} onChange={(event) => setTarget(Number(event.target.value))} /></label></div>
        <div className="mt-4 min-h-16 border border-border p-3 font-mono text-xs text-secondary">{values.length ? values.join("  ") : "empty array"}</div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs"><div className="border border-accent p-3 text-accent">actual {actual.index}</div><div className="border border-warning p-3 text-warning">oracle {expected}</div><div className={"border p-3 " + (actual.index === expected ? "border-success text-success" : "border-danger text-danger")}>{actual.index === expected ? "agree" : "mismatch"}</div></div>
      </Panel>
      <Caption>A probe harness makes the tiny function directly controllable before it is hidden inside a large application.</Caption>
    </figure>
  );
}

export function PP2AssertionLayerLab() {
  const [location, setLocation] = useState<"entry" | "loop" | "return">("loop");
  const [sorted, setSorted] = useState(true);
  const detail = {
    entry: ["precondition", "is_sorted(x[0..n)) and n fits the index type", sorted],
    loop: ["invariant", "0 <= low and high < n; any target occurrence remains in [low, high]", sorted],
    return: ["postcondition", "result is -1 iff absent, otherwise x[result] equals target", sorted],
  }[location];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">assertion site<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={location} onChange={(event) => setLocation(event.target.value as typeof location)}><option>entry</option><option>loop</option><option>return</option></select></label>
        <label className="mt-3 block border border-border p-3 text-xs text-secondary"><input className="mr-2 accent-current" type="checkbox" checked={sorted} onChange={(event) => setSorted(event.target.checked)} />input satisfies sortedness</label>
        <div className="mt-3 grid gap-2 sm:grid-cols-[0.35fr_1fr]"><div className={"border p-3 text-sm " + (detail[2] ? "border-success text-success" : "border-danger text-danger")}>{detail[0]}</div><div className="border border-accent p-3 font-mono text-xs text-accent">{detail[1]}</div></div>
      </Panel>
      <Caption>Assertions turn proof obligations into executable tripwires at module entry, loop boundaries, and exits.</Caption>
    </figure>
  );
}

export function PP2AutomatedTestMatrixLab() {
  const [maxSize, setMaxSize] = useState(10);
  const sizes = maxSize + 1;
  const successful = (maxSize * (maxSize + 1)) / 2;
  const interiorMisses = (maxSize * Math.max(0, maxSize - 1)) / 2;
  const exteriorMisses = sizes * 2;
  const total = successful + interiorMisses + exteriorMisses;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">enumerate sizes 0 through {maxSize}<input className="mt-2 w-full accent-current" type="range" min="0" max="64" value={maxSize} onChange={(event) => setMaxSize(Number(event.target.value))} /></label>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 text-center"><div className="border border-accent p-3 text-accent"><div className="text-xs">sizes</div><div className="font-mono text-xl">{sizes}</div></div><div className="border border-success p-3 text-success"><div className="text-xs">hits</div><div className="font-mono text-xl">{successful}</div></div><div className="border border-warning p-3 text-warning"><div className="text-xs">between misses</div><div className="font-mono text-xl">{interiorMisses}</div></div><div className="border border-primary p-3 text-primary"><div className="text-xs">total checks</div><div className="font-mono text-xl">{total}</div></div></div>
      </Panel>
      <Caption>Small exhaustive domains cover empty, singleton, powers of two, and neighbors of powers of two without hand-written repetition.</Caption>
    </figure>
  );
}

export function PP2MutationKillLab() {
  const [mutation, setMutation] = useState<"correct" | "skip singleton" | "no progress" | "open high">("skip singleton");
  const detail = {
    correct: ["none", "all generated cases pass", "survives because behavior matches the contract"],
    "skip singleton": ["while (low < high)", "n=1, target=x[0]", "killed by singleton success"],
    "no progress": ["low = mid", "n=2, target=x[1]", "killed by bounded-step timeout"],
    "open high": ["high = n", "n=0 or target above maximum", "killed by bounds assertion or sanitizer"],
  }[mutation];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">injected mutation<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={mutation} onChange={(event) => setMutation(event.target.value as typeof mutation)}><option>correct</option><option>skip singleton</option><option>no progress</option><option>open high</option></select></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className="border border-accent p-3 font-mono text-xs text-accent">{detail[0]}</div><div className="border border-warning p-3 text-xs text-warning">{detail[1]}</div><div className={"border p-3 text-xs " + (mutation === "correct" ? "border-success text-success" : "border-danger text-danger")}>{detail[2]}</div></div>
      </Panel>
      <Caption>A test suite earns trust by rejecting plausible wrong programs, not merely by accepting the intended one.</Caption>
    </figure>
  );
}

export function PP2TimingExperimentLab() {
  const [algorithm, setAlgorithm] = useState<"binary" | "linear">("binary");
  const [size, setSize] = useState(10_000);
  const [repetitions, setRepetitions] = useState(100);
  const operations = algorithm === "binary" ? Math.ceil(Math.log2(Math.max(1, size))) : Math.ceil(size / 2);
  const modeledNs = operations * (algorithm === "binary" ? 12 : 1.4);
  const totalSearches = size * repetitions;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">algorithm<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={algorithm} onChange={(event) => setAlgorithm(event.target.value as typeof algorithm)}><option>binary</option><option>linear</option></select></label>
        <div className="mt-3 grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">n = {size.toLocaleString()}<input className="mt-2 w-full accent-current" type="range" min="100" max="100000" step="100" value={size} onChange={(event) => setSize(Number(event.target.value))} /></label><label className="text-xs text-secondary">repetitions = {repetitions}<input className="mt-2 w-full accent-current" type="range" min="1" max="1000" value={repetitions} onChange={(event) => setRepetitions(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs"><div className="border border-accent p-3 text-accent">searches<br /><span className="font-mono">{totalSearches.toLocaleString()}</span></div><div className="border border-warning p-3 text-warning">modeled comparisons<br /><span className="font-mono">{operations}</span></div><div className="border border-success p-3 text-success">modeled ns/search<br /><span className="font-mono">{modeledNs.toFixed(1)}</span></div></div>
      </Panel>
      <Caption>The displayed time is an explicit cost model; a real benchmark must report measured raw ticks and normalized cost separately.</Caption>
    </figure>
  );
}

export function PP2BenchmarkValidityLab() {
  const [correctness, setCorrectness] = useState(true);
  const [rawTicks, setRawTicks] = useState(true);
  const [repeat, setRepeat] = useState(true);
  const [sizes, setSizes] = useState(true);
  const checks = [correctness, rawTicks, repeat, sizes];
  const score = checks.filter(Boolean).length;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-2 sm:grid-cols-2">{[["assert every result", correctness, setCorrectness], ["print raw clock ticks", rawTicks, setRawTicks], ["repeat above timer noise", repeat, setRepeat], ["measure multiple input sizes", sizes, setSizes]].map(([label, checked, setChecked]) => <label key={String(label)} className="border border-border p-3 text-xs text-secondary"><input className="mr-2 accent-current" type="checkbox" checked={checked as boolean} onChange={(event) => (setChecked as (value: boolean) => void)(event.target.checked)} />{String(label)}</label>)}</div>
        <div className={"mt-3 border p-3 text-sm " + (score === 4 ? "border-success text-success" : "border-warning text-warning")}>benchmark validity: {score}/4 {score === 4 ? "ready to interpret" : "missing evidence"}</div>
      </Panel>
      <Caption>Timing scaffolding must preserve correctness and expose enough raw evidence to detect timer granularity or optimizer artifacts.</Caption>
    </figure>
  );
}

export function PP2CompleteProgramLab() {
  const [mode, setMode] = useState<"probe" | "test" | "time">("test");
  const stages = {
    probe: ["manual inputs", "print trace and result", "fast local understanding"],
    test: ["generated boundary matrix", "assert against oracle", "repeatable correctness evidence"],
    time: ["algorithm, n, repetitions", "assert then measure", "raw ticks plus ns/search"],
  }[mode];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">scaffolding mode<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={mode} onChange={(event) => setMode(event.target.value as typeof mode)}><option>probe</option><option>test</option><option>time</option></select></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">{stages.map((stage, index) => <div key={stage} className={"border p-3 text-xs " + (index === 0 ? "border-accent text-accent" : index === 1 ? "border-warning text-warning" : "border-success text-success")}>{stage}</div>)}</div>
        <div className="mt-3 border border-border p-3 font-mono text-xs text-secondary">search function stays unchanged; only the driver and evidence channel vary</div>
      </Panel>
      <Caption>One complete program can expose probe, exhaustive-test, and timing modes while keeping the algorithm under test identical.</Caption>
    </figure>
  );
}

export function PP2DebuggingLoopLab() {
  const [symptom, setSymptom] = useState<"wrong index" | "hang" | "bounds failure" | "timing anomaly">("hang");
  const detail = {
    "wrong index": ["reduce to smallest failing array", "inspect duplicate and absence contract", "fix code and strengthen the postcondition assertion"],
    hang: ["cap iterations and capture low/high/mid", "check strict variant decrease", "fix the update and retain a progress assertion"],
    "bounds failure": ["record n and active interval", "check interval convention and empty input", "fix initialization and add bounds assertions"],
    "timing anomaly": ["print raw ticks and result checksum", "check timer resolution and dead-code elimination", "increase work and preserve observable results"],
  }[symptom];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">observed symptom<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={symptom} onChange={(event) => setSymptom(event.target.value as typeof symptom)}><option>wrong index</option><option>hang</option><option>bounds failure</option><option>timing anomaly</option></select></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">{detail.map((item, index) => <div key={item} className={"border p-3 text-xs " + (index === 0 ? "border-accent text-accent" : index === 1 ? "border-warning text-warning" : "border-success text-success")}>{item}</div>)}</div>
      </Panel>
      <Caption>Debugging progresses from reproducible observation to a falsifiable hypothesis, a narrow experiment, and a permanent assertion.</Caption>
    </figure>
  );
}

export function PP2OracleLab() {
  const [size, setSize] = useState(12);
  const [target, setTarget] = useState(17);
  const values = useMemo(() => Array.from({ length: size }, (_, index) => 2 * index), [size]);
  const binary = exactSearch(values, target);
  const linear = values.findIndex((value) => value === target);
  const valid = binary.index === linear;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs text-secondary">generated n = {size}<input className="mt-2 w-full accent-current" type="range" min="0" max="40" value={size} onChange={(event) => setSize(Number(event.target.value))} /></label><label className="text-xs text-secondary">target = {target}<input className="mt-2 w-full accent-current" type="range" min="-2" max="82" value={target} onChange={(event) => setTarget(Number(event.target.value))} /></label></div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs"><div className="border border-accent p-3 text-accent">binary {binary.index}</div><div className="border border-warning p-3 text-warning">linear {linear}</div><div className={"border p-3 " + (valid ? "border-success text-success" : "border-danger text-danger")}>{valid ? "property holds" : "counterexample"}</div></div>
      </Panel>
      <Caption>A simple independent oracle is often more trustworthy than duplicating the optimized implementation inside expected-value code.</Caption>
    </figure>
  );
}

export function PP2TrustCertificateLab() {
  const [fault, setFault] = useState<"none" | "untested empty" | "disabled assert" | "one timing sample">("none");
  const checks = {
    translated: true,
    probed: fault !== "untested empty",
    asserted: fault !== "disabled assert",
    automated: fault !== "untested empty",
    timed: fault !== "one timing sample",
  };
  const accepted = Object.values(checks).every(Boolean);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">evidence audit<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={fault} onChange={(event) => setFault(event.target.value as typeof fault)}><option>none</option><option>untested empty</option><option>disabled assert</option><option>one timing sample</option></select></label>
        <div className="mt-4 grid grid-cols-5 gap-1">{Object.entries(checks).map(([name, ok]) => <div key={name} className={"border p-2 text-center text-[10px] " + (ok ? "border-success text-success" : "border-danger text-danger")}><div>{name}</div><div className="font-mono">{ok ? "pass" : "fail"}</div></div>)}</div>
        <div className={"mt-3 border p-3 text-sm " + (accepted ? "border-success text-success" : "border-danger text-danger")}>{accepted ? "The small function has a reviewable chain of trust." : "A missing evidence layer blocks integration."}</div>
      </Panel>
      <Caption>Trust comes from a connected evidence chain: faithful translation, direct access, assertions, generated tests, and valid timing.</Caption>
    </figure>
  );
}
