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

function euclidTrace(a: number, b: number) {
  const rows: Array<{ a: number; b: number; remainder: number }> = [];
  let left = Math.max(a, b);
  let right = Math.min(a, b);
  while (right !== 0) {
    const remainder = left % right;
    rows.push({ a: left, b: right, remainder });
    left = right;
    right = remainder;
  }
  return { gcd: left, rows };
}

export function TcpAlgorithmContractLab() {
  const [input, setInput] = useState(true);
  const [output, setOutput] = useState(true);
  const [definite, setDefinite] = useState(false);
  const [finite, setFinite] = useState(true);
  const [effective, setEffective] = useState(false);
  const complete = input && output && definite && finite && effective;
  return (
    <Figure caption="An algorithm contract requires stated inputs and outputs, unambiguous effective steps, and finite termination; code syntax alone does not supply those properties.">
      <div className="grid gap-2 sm:grid-cols-5">{[["input", input, setInput], ["output", output, setOutput], ["definite", definite, setDefinite], ["finite", finite, setFinite], ["effective", effective, setEffective]].map(([label, checked, setter]) => <label key={String(label)} className="flex items-center gap-2 border border-border bg-background p-3 text-sm font-semibold text-primary"><input type="checkbox" checked={checked as boolean} onChange={(event) => (setter as (value: boolean) => void)(event.target.checked)} />{String(label)}</label>)}</div>
      <div className="mt-4"><Stat label="algorithm specification" value={complete ? "complete" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}

export function TcpEuclidTraceLab() {
  const [a, setA] = useState(119);
  const [b, setB] = useState(544);
  const result = euclidTrace(a, b);
  return (
    <Figure caption="Euclid's algorithm repeatedly replaces (a,b) by (b,a mod b); the second component strictly decreases until the remainder is zero.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">a = {a}<input className="mt-2 w-full accent-current" type="range" min="1" max="999" value={a} onChange={(event) => setA(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">b = {b}<input className="mt-2 w-full accent-current" type="range" min="1" max="999" value={b} onChange={(event) => setB(Number(event.target.value))} /></label></div>
      <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[28rem] border-collapse text-sm"><thead><tr><th className="border-b border-border p-2 text-left">step</th><th className="border-b border-border p-2 text-left">a</th><th className="border-b border-border p-2 text-left">b</th><th className="border-b border-border p-2 text-left">a mod b</th></tr></thead><tbody>{result.rows.map((row, index) => <tr key={index}><td className="border-b border-border/60 p-2 font-mono">{index}</td><td className="border-b border-border/60 p-2 font-mono">{row.a}</td><td className="border-b border-border/60 p-2 font-mono">{row.b}</td><td className="border-b border-border/60 p-2 font-mono">{row.remainder}</td></tr>)}</tbody></table></div>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="gcd" value={result.gcd.toString()} tone="success" /><Stat label="remainder steps" value={result.rows.length.toString()} /></div>
    </Figure>
  );
}

export function TcpInductionLab() {
  const [n, setN] = useState(8);
  const direct = Array.from({ length: n }, (_, index) => index + 1).reduce((sum, value) => sum + value, 0);
  const formula = n * (n + 1) / 2;
  const previous = (n - 1) * n / 2;
  return (
    <Figure caption="Induction separates the base case from a reusable step: assuming the formula at n−1, adding n produces the formula at n.">
      <label className="text-sm font-semibold text-primary">n = {n}<input className="mt-2 w-full accent-current" type="range" min="1" max="32" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4"><Stat label="S(n−1)" value={previous.toString()} /><Stat label="new term" value={n.toString()} /><Stat label="direct S(n)" value={direct.toString()} /><Stat label="n(n+1)/2" value={formula.toString()} tone="success" /></div>
    </Figure>
  );
}

export function TcpSummationCostLab() {
  const [n, setN] = useState(16);
  const costs = Array.from({ length: n }, (_, index) => index + 1);
  const maximum = costs.at(-1)!;
  return (
    <Figure caption="A triangular nested loop executes 1+2+…+n inner operations; the bar area makes the quadratic total visible without hiding the exact count.">
      <label className="text-sm font-semibold text-primary">outer iterations n = {n}<input className="mt-2 w-full accent-current" type="range" min="2" max="32" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
      <div className="mt-4 flex h-40 items-end gap-1 border border-border bg-background p-2">{costs.map((cost) => <div key={cost} className="min-w-0 flex-1 bg-accent/70" style={{ height: `${(cost / maximum) * 100}%` }} title={`iteration ${cost}: ${cost} operations`} />)}</div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="exact operations" value={(n * (n + 1) / 2).toString()} /><Stat label="leading term" value="n²/2" /><Stat label="class" value="Theta(n²)" tone="success" /></div>
    </Figure>
  );
}

export function TcpAsymptoticLab() {
  const [n, setN] = useState(32);
  const linear = 40 * n;
  const quadratic = n * n;
  return (
    <Figure caption="Constants can dominate small inputs, while growth rate determines the eventual crossover; both exact cost and asymptotic class belong in the analysis.">
      <label className="text-sm font-semibold text-primary">n = {n}<input className="mt-2 w-full accent-current" type="range" min="1" max="128" value={n} onChange={(event) => setN(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="40n" value={linear.toString()} tone={linear < quadratic ? "success" : "warning"} /><Stat label="n²" value={quadratic.toString()} tone={quadratic < linear ? "success" : "warning"} /></div>
      <div className="mt-3"><Stat label="currently cheaper" value={linear < quadratic ? "40n" : quadratic < linear ? "n²" : "tie"} tone="success" /></div>
    </Figure>
  );
}

function mixBytes(value: number) {
  let current = Math.abs(value) % 2 ** 30;
  const bytes = Array.from({ length: 5 }, () => 0);
  for (let index = 4; index >= 0; index -= 1) {
    bytes[index] = current % 64;
    current = Math.floor(current / 64);
  }
  return bytes;
}

export function TcpMixWordLab() {
  const [value, setValue] = useState(1234567);
  const bytes = mixBytes(value);
  return (
    <Figure caption="A canonical MIX word has a sign and five bytes; viewing the same magnitude as base-64 bytes exposes the representation used by field operations.">
      <label className="text-sm font-semibold text-primary">signed value = {value}<input className="mt-2 w-full accent-current" type="range" min="-2000000" max="2000000" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-6 gap-1"><div className="border border-warning bg-warning/10 p-3 text-center font-mono text-warning">{value < 0 ? "−" : "+"}</div>{bytes.map((byte, index) => <div key={index} className="border border-border bg-background p-3 text-center font-mono text-primary">{byte.toString().padStart(2, "0")}</div>)}</div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="sign" value={value < 0 ? "negative" : "positive"} /><Stat label="bytes" value="5 × 6 bits" /><Stat label="magnitude bits" value="30" tone="success" /></div>
    </Figure>
  );
}

export function TcpMixInstructionLab() {
  const [opcode, setOpcode] = useState("ADD");
  const [address, setAddress] = useState(2000);
  const fields = [Math.floor(address / 64), address % 64, 0, 5, opcode === "LDA" ? 8 : opcode === "STA" ? 24 : 1];
  return (
    <Figure caption="A MIX instruction packs a signed address, index selector, field specification, and opcode into one word, tying algorithm steps to measurable machine actions.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">operation<select className="mt-2 block w-full border border-border bg-background p-2" value={opcode} onChange={(event) => setOpcode(event.target.value)}><option>LDA</option><option>ADD</option><option>STA</option></select></label><label className="text-sm font-semibold text-primary">address = {address}<input className="mt-2 w-full accent-current" type="range" min="0" max="3999" value={address} onChange={(event) => setAddress(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-5 gap-1">{fields.map((field, index) => <div key={index} className="border border-border bg-background p-3 text-center font-mono text-primary">{field}</div>)}</div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="address" value={address.toString()} /><Stat label="field" value="0:5" /><Stat label="operation" value={opcode} tone="success" /></div>
    </Figure>
  );
}

export function TcpSubroutineLab() {
  const [calls, setCalls] = useState(3);
  const frames = Array.from({ length: calls }, (_, index) => ({ returnTo: 120 + index * 17, argument: index + 2 }));
  return (
    <Figure caption="A subroutine call must preserve a return point and agreed state; nested calls make the control-link discipline visible as a stack of frames.">
      <label className="text-sm font-semibold text-primary">nested calls = {calls}<input className="mt-2 w-full accent-current" type="range" min="1" max="6" value={calls} onChange={(event) => setCalls(Number(event.target.value))} /></label>
      <div className="mt-4 flex flex-col-reverse gap-2">{frames.map((frame, index) => <div key={index} className={`border bg-background p-3 text-sm ${index === frames.length - 1 ? "border-success text-success" : "border-border text-primary"}`}>frame {index} · return={frame.returnTo} · argument={frame.argument}</div>)}</div>
      <div className="mt-4"><Stat label="next return" value={frames.at(-1)!.returnTo.toString()} tone="success" /></div>
    </Figure>
  );
}

export function TcpCoroutineLab() {
  const [turn, setTurn] = useState(0);
  const producerState = Math.floor(turn / 2) + (turn % 2);
  const consumerState = Math.floor(turn / 2);
  return (
    <Figure caption="Coroutines transfer control symmetrically while preserving both continuations; producer and consumer advance on alternating resumptions.">
      <button type="button" className="w-full border border-accent bg-accent/10 p-3 font-semibold text-accent" onClick={() => setTurn((value) => (value + 1) % 9)}>resume next coroutine</button>
      <div className="mt-4 grid grid-cols-2 gap-2"><Stat label="producer continuation" value={`yield ${producerState}`} tone={turn % 2 === 0 ? "success" : "accent"} /><Stat label="consumer continuation" value={`take ${consumerState}`} tone={turn % 2 === 1 ? "success" : "accent"} /></div>
      <div className="mt-3"><Stat label="control owner" value={turn % 2 === 0 ? "producer" : "consumer"} tone="warning" /></div>
    </Figure>
  );
}

export function TcpInterpreterLab() {
  const [step, setStep] = useState(0);
  const program = ["PUSH 3", "PUSH 4", "ADD", "PUSH 2", "MUL"];
  const execute = (count: number) => {
    const stack: number[] = [];
    for (const instruction of program.slice(0, count)) {
      const [op, literal] = instruction.split(" ");
      if (op === "PUSH") stack.push(Number(literal));
      else { const right = stack.pop()!; const left = stack.pop()!; stack.push(op === "ADD" ? left + right : left * right); }
    }
    return stack;
  };
  const stack = execute(step);
  return (
    <Figure caption="An interpretive routine fetches and dispatches an encoded operation; the explicit value stack separates guest-program state from host control.">
      <label className="text-sm font-semibold text-primary">executed instructions = {step}<input className="mt-2 w-full accent-current" type="range" min="0" max={program.length} value={step} onChange={(event) => setStep(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-5 gap-1">{program.map((instruction, index) => <div key={instruction} className={`border p-2 text-center font-mono text-xs ${index < step ? "border-success bg-success/15 text-success" : "border-border bg-background text-secondary"}`}>{instruction}</div>)}</div>
      <div className="mt-4"><Stat label="value stack" value={stack.length ? stack.join(", ") : "empty"} tone={step === program.length ? "success" : "accent"} /></div>
    </Figure>
  );
}

export function TcpIoBufferLab() {
  const [block, setBlock] = useState(8);
  const records = 100;
  const transfers = Math.ceil(records / block);
  return (
    <Figure caption="Input/output cost is paid per transfer as well as per record; buffering trades memory for fewer device operations and changes the dominant term.">
      <label className="text-sm font-semibold text-primary">records per block = {block}<input className="mt-2 w-full accent-current" type="range" min="1" max="32" value={block} onChange={(event) => setBlock(Number(event.target.value))} /></label>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="records" value={records.toString()} /><Stat label="buffer slots" value={block.toString()} /><Stat label="device transfers" value={transfers.toString()} tone="success" /></div>
    </Figure>
  );
}

export function TcpCostModelLab() {
  const [memoryCost, setMemoryCost] = useState(3);
  const [branches, setBranches] = useState(12);
  const arithmetic = 30;
  const memory = 18;
  const total = arithmetic + memory * memoryCost + branches * 2;
  return (
    <Figure caption="A weighted operation model keeps counts and assumptions separate: changing memory cost alters the estimate without changing the algorithm trace.">
      <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-primary">memory weight = {memoryCost}<input className="mt-2 w-full accent-current" type="range" min="1" max="10" value={memoryCost} onChange={(event) => setMemoryCost(Number(event.target.value))} /></label><label className="text-sm font-semibold text-primary">branches = {branches}<input className="mt-2 w-full accent-current" type="range" min="0" max="30" value={branches} onChange={(event) => setBranches(Number(event.target.value))} /></label></div>
      <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="arithmetic" value={arithmetic.toString()} /><Stat label="memory contribution" value={(memory * memoryCost).toString()} /><Stat label="weighted total" value={total.toString()} tone="success" /></div>
    </Figure>
  );
}

export function TcpBasicConceptsCertificateLab() {
  const [spec, setSpec] = useState(true);
  const [proof, setProof] = useState(false);
  const [machine, setMachine] = useState(true);
  const [test, setTest] = useState(false);
  const complete = spec && proof && machine && test;
  return (
    <Figure caption="A Basic Concepts unit closes only when specification, proof, machine-cost model, and executable checks support the same claim.">
      <div className="grid gap-3 sm:grid-cols-4"><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={spec} onChange={(event) => setSpec(event.target.checked)} />specification</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={proof} onChange={(event) => setProof(event.target.checked)} />proof</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={machine} onChange={(event) => setMachine(event.target.checked)} />machine model</label><label className="flex items-center gap-2 text-sm font-semibold text-primary"><input type="checkbox" checked={test} onChange={(event) => setTest(event.target.checked)} />test</label></div>
      <div className="mt-4"><Stat label="chapter certificate" value={complete ? "complete" : "incomplete"} tone={complete ? "success" : "warning"} /></div>
    </Figure>
  );
}
