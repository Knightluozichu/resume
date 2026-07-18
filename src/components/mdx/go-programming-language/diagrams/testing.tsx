"use client";

import { useMemo, useState } from "react";

type TestImplementation = "correct" | "drops-space" | "wrong-sign";

const testCases = [
  { name: "ascii", input: "hello world", want: "world hello" },
  { name: "single", input: "go", want: "go" },
  { name: "spaces", input: "a  b", want: "b  a" },
];

function executeCase(input: string, implementation: TestImplementation) {
  if (implementation === "drops-space") return input.trim().split(/\s+/).reverse().join(" ");
  if (implementation === "wrong-sign") return input.split("").reverse().join("");
  const match = input.match(/^(.*?)(\s+)(\S+)$/);
  return match ? `${match[3]}${match[2]}${match[1]}` : input;
}

export function GoplTestCaseLab() {
  const [implementation, setImplementation] = useState<TestImplementation>("drops-space");
  const [externalPackage, setExternalPackage] = useState(true);
  const results = testCases.map((test) => ({ ...test, got: executeCase(test.input, implementation) }));
  const failures = results.filter((result) => result.got !== result.want);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
          <section className="space-y-4 border border-border bg-bg p-4"><label className="block text-sm text-primary">implementation<select value={implementation} onChange={(event) => setImplementation(event.target.value as TestImplementation)} className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary"><option value="correct">correct</option><option value="drops-space">normalizes spaces</option><option value="wrong-sign">reverses characters</option></select></label><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={externalPackage} onChange={(event) => setExternalPackage(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />test package is `word_test`</label></section>
          <section className={`border p-4 ${failures.length ? "border-rose-500/40 bg-rose-500/10" : "border-emerald-500/40 bg-emerald-500/10"}`} aria-live="polite"><div className="space-y-2">{results.map((result) => <div key={result.name} className="grid gap-2 border border-border bg-bg p-3 text-sm sm:grid-cols-[0.6fr_1fr_1fr]"><strong className="text-primary">{result.name} · {result.got === result.want ? "PASS" : "FAIL"}</strong><span className="text-secondary">want {JSON.stringify(result.want)}</span><span className="text-secondary">got {JSON.stringify(result.got)}</span></div>)}</div><p className="mt-4 text-sm leading-7 text-secondary">{externalPackage ? "external test只能使用exported API，验证真实client boundary。" : "same-package white-box test可访问unexported helpers，适合精确internal invariant但更易耦合implementation。"} failure message 同时给 case/input/want/got。</p></section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">table-driven test 把 inputs/want 作为 data；oracle 比较 observable behavior，external test package 检验真正 public API。</figcaption>
    </figure>
  );
}

export function GoplCoverageLab() {
  const [positive, setPositive] = useState(true);
  const [zero, setZero] = useState(false);
  const [negative, setNegative] = useState(false);
  const covered = [true, positive || zero || negative, positive, zero, negative, true];
  const percent = Math.round(covered.filter(Boolean).length / covered.length * 100);
  const lines = ["func Sign(x int) string {", "  if x > 0 {", "    return \"positive\"", "  } else if x == 0 { return \"zero\" }", "  return \"negative\"", "}"];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[0.76fr_1.24fr]">
          <section className="space-y-3 border border-border bg-bg p-4"><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={positive} onChange={(event) => setPositive(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />test positive branch</label><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={zero} onChange={(event) => setZero(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />test zero branch</label><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={negative} onChange={(event) => setNegative(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />test negative branch</label></section>
          <section className="border border-cyan-500/40 bg-cyan-500/10 p-4"><div className="space-y-1 font-mono text-xs">{lines.map((line, index) => <div key={line} className={`border-l-4 px-3 py-2 ${covered[index] ? "border-emerald-500 bg-emerald-500/10 text-primary" : "border-rose-500 bg-rose-500/10 text-secondary"}`}>{String(index + 1).padStart(2, "0")} {line}</div>)}</div><div className="mt-4 border border-border bg-bg p-3"><strong className="text-lg text-primary">statement coverage ≈ {percent}%</strong><p className="mt-2 text-sm leading-7 text-secondary">covered 只说明 statement 在本次 tests 被执行，不证明 assertion 正确、所有 input classes/branches/races 被验证。</p></div></section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">coverage profile 定位未执行区域并引导补案例；它是 evidence map，不是质量目标或 correctness proof。</figcaption>
    </figure>
  );
}

type ProfileKind = "cpu" | "memory" | "block";

export function GoplBenchmarkProfileLab() {
  const [size, setSize] = useState(1024);
  const [reuseBuffer, setReuseBuffer] = useState(false);
  const [profile, setProfile] = useState<ProfileKind>("cpu");
  const nsPerOp = Math.round(size * (reuseBuffer ? 1.3 : 1.8));
  const bytesPerOp = reuseBuffer ? 32 : size * 2;
  const allocsPerOp = reuseBuffer ? 1 : 4;
  const hotspots = useMemo(() => profile === "cpu" ? ["parse 52%", "sort 31%", "other 17%"] : profile === "memory" ? ["make []byte 68%", "strings 22%", "other 10%"] : ["mutex wait 61%", "channel send 24%", "other 15%"], [profile]);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
          <section className="space-y-4 border border-border bg-bg p-4"><label className="block text-sm text-primary">input size: <strong>{size} bytes</strong><input type="range" min="128" max="4096" step="128" value={size} onChange={(event) => setSize(Number(event.target.value))} className="mt-2 block w-full accent-[var(--accent)]" /></label><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={reuseBuffer} onChange={(event) => setReuseBuffer(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />reuse buffer outside timed loop</label><label className="block text-sm text-primary">profile<select value={profile} onChange={(event) => setProfile(event.target.value as ProfileKind)} className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary"><option value="cpu">CPU</option><option value="memory">memory</option><option value="block">block</option></select></label></section>
          <section className="border border-violet-500/40 bg-violet-500/10 p-4"><div className="grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">time</span><strong className="mt-2 block text-sm text-primary">{nsPerOp} ns/op</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">bytes</span><strong className="mt-2 block text-sm text-primary">{bytesPerOp} B/op</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">allocations</span><strong className="mt-2 block text-sm text-primary">{allocsPerOp} allocs/op</strong></div></div><div className="mt-4 space-y-2">{hotspots.map((hotspot) => <div key={hotspot} className="border border-border bg-bg p-3 text-sm text-primary">{hotspot}</div>)}</div><p className="mt-4 text-sm leading-7 text-secondary">benchmark harness 自适应 b.N；setup 不属于被测 operation 时移出 timed loop。profile 用来找 resource hotspot，再用 benchmark验证改动，而不是凭单次 wall clock 下结论。</p></section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Benchmark 报告 ns/op、B/op、allocs/op；CPU/memory/block profiles 解释成本归属；Example 验证可执行用法与输出。</figcaption>
    </figure>
  );
}
