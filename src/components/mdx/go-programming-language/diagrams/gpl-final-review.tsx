"use client";

import { useState } from "react";

const serviceStages = [
  {
    label: "数据边界",
    chapters: "Ch1-4",
    input: "HTTP / JSON / config",
    contract: "named types + slice/map ownership + explicit shape",
    output: "validated Request and immutable Config",
    evidence: "table tests cover zero, empty, invalid UTF-8 and unknown fields",
  },
  {
    label: "抽象边界",
    chapters: "Ch5-7",
    input: "Request + context",
    contract: "function error policy + method set + consumer interface",
    output: "Loader result or classified error",
    evidence: "fake Loader proves success, timeout and typed-nil paths",
  },
  {
    label: "并发边界",
    chapters: "Ch8-9",
    input: "bounded jobs",
    contract: "one close owner + cancellation + protected shared invariant",
    output: "exactly one Result per accepted job",
    evidence: "race, cancellation and backpressure tests all pass",
  },
  {
    label: "工程边界",
    chapters: "Ch10-11",
    input: "package graph + observable behavior",
    contract: "internal ownership + deterministic oracle + measured baseline",
    output: "reproducible binary and test report",
    evidence: "go list/build/test/race/bench outputs are archived",
  },
  {
    label: "运行时边界",
    chapters: "Ch12-13",
    input: "runtime type or foreign memory",
    contract: "narrow adapter + limits + lifetime owner + safe fallback",
    output: "typed domain value",
    evidence: "nil/cycle/checkptr/cgo boundary tests pass",
  },
];

export function GoplEndToEndServiceReviewLab() {
  const [selected, setSelected] = useState(2);
  const stage = serviceStages[selected];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 border border-border sm:grid-cols-5" role="group" aria-label="全书服务链阶段">
          {serviceStages.map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setSelected(index)}
              className={`min-h-12 border-border px-2 text-xs sm:text-sm ${index < serviceStages.length - 1 ? "border-r" : ""} ${selected === index ? "bg-primary text-bg" : "bg-bg text-primary hover:bg-elevated"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="mt-5 grid gap-3 lg:grid-cols-[0.72fr_1.28fr]">
          <section className="border border-cyan-500/40 bg-cyan-500/10 p-4">
            <span className="text-xs text-secondary">{stage.chapters}</span>
            <strong className="mt-2 block text-lg text-primary">{stage.label}</strong>
            <p className="mt-3 text-sm leading-7 text-secondary">input: {stage.input}</p>
          </section>
          <section className="grid gap-3 sm:grid-cols-3">
            <div className="border border-border bg-bg p-3">
              <span className="text-xs text-secondary">contract</span>
              <strong className="mt-2 block text-sm leading-6 text-primary">{stage.contract}</strong>
            </div>
            <div className="border border-border bg-bg p-3">
              <span className="text-xs text-secondary">output</span>
              <strong className="mt-2 block text-sm leading-6 text-primary">{stage.output}</strong>
            </div>
            <div className="border border-emerald-500/40 bg-emerald-500/10 p-3">
              <span className="text-xs text-secondary">proof</span>
              <strong className="mt-2 block text-sm leading-6 text-primary">{stage.evidence}</strong>
            </div>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        用一个有边界的抓取服务串联官方 13 章：每一段都交付 contract、output 和可复查证据。
      </figcaption>
    </figure>
  );
}

const failures = [
  {
    label: "typed nil",
    symptom: "err != nil, but the wrapped pointer is nil",
    root: "interface dynamic type is *LoadError while dynamic value is nil",
    chapters: "Ch6 method set -> Ch7 dynamic pair -> Ch11 regression",
    check: "return literal nil on success and test both constructor paths",
  },
  {
    label: "goroutine leak",
    symptom: "request returned, upstream sender remains blocked",
    root: "consumer exited without cancellation or drain; close owner is unclear",
    chapters: "Ch5 closure -> Ch8 lifecycle/select -> Ch11 cancel test",
    check: "cancel context, wait for done, repeat under timeout and race",
  },
  {
    label: "slice race",
    symptom: "parallel requests corrupt a shared byte buffer",
    root: "copied slice headers still alias one backing array",
    chapters: "Ch4 alias -> Ch9 happens-before/Mutex -> Ch11 race",
    check: "transfer ownership or copy, then run go test -race -count=100",
  },
  {
    label: "reflection panic",
    symptom: "decoder panics on nil pointer, cycle or unsettable value",
    root: "Kind dispatch skipped validity, addressability and recursion limits",
    chapters: "Ch4 shape -> Ch7 interface -> Ch12 reflection -> Ch11 fuzz",
    check: "guard IsValid/CanSet, bound depth and fuzz hostile shapes",
  },
  {
    label: "cgo lifetime",
    symptom: "foreign code retains a Go pointer after the call",
    root: "allocation and retention owner were never made explicit",
    chapters: "Ch13 cgo/unsafe -> Ch10 build tags -> Ch11 boundary test",
    check: "copy into C-owned memory, pair allocation/free and test failure paths",
  },
];

export function GoplFailureEvidenceReviewLab() {
  const [selected, setSelected] = useState(0);
  const failure = failures[selected];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[0.72fr_1.28fr]">
          <section className="border border-border bg-bg p-4">
            <label className="block text-sm text-primary">
              failure signature
              <select
                value={selected}
                onChange={(event) => setSelected(Number(event.target.value))}
                className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary"
              >
                {failures.map((item, index) => <option key={item.label} value={index}>{item.label}</option>)}
              </select>
            </label>
            <p className="mt-4 text-sm leading-7 text-secondary">symptom: {failure.symptom}</p>
          </section>
          <section className="grid gap-3 sm:grid-cols-3">
            <div className="border border-rose-500/40 bg-rose-500/10 p-3">
              <span className="text-xs text-secondary">root cause</span>
              <strong className="mt-2 block text-sm leading-6 text-primary">{failure.root}</strong>
            </div>
            <div className="border border-violet-500/40 bg-violet-500/10 p-3">
              <span className="text-xs text-secondary">chapter rollback</span>
              <strong className="mt-2 block text-sm leading-6 text-primary">{failure.chapters}</strong>
            </div>
            <div className="border border-emerald-500/40 bg-emerald-500/10 p-3">
              <span className="text-xs text-secondary">verification</span>
              <strong className="mt-2 block text-sm leading-6 text-primary">{failure.check}</strong>
            </div>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        从故障表象回退到最小前置章节，再用第 11 章的自动化证据锁住修复。
      </figcaption>
    </figure>
  );
}

const releaseGates = [
  "package graph is reproducible",
  "behavior and failure tests pass",
  "race and cancellation paths pass",
  "benchmark/profile support the change",
  "reflection/unsafe/cgo boundaries are isolated",
];

export function GoplReleaseReadinessReviewLab() {
  const [checked, setChecked] = useState([true, true, false, false, false]);
  const passed = checked.filter(Boolean).length;

  function toggle(index: number) {
    setChecked((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value));
  }

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[1.12fr_0.88fr]">
          <section className="space-y-3 border border-border bg-bg p-4">
            {releaseGates.map((gate, index) => (
              <label key={gate} className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary">
                <input type="checkbox" checked={checked[index]} onChange={() => toggle(index)} className="h-4 w-4 accent-[var(--accent)]" />
                {gate}
              </label>
            ))}
          </section>
          <section className={`border p-4 ${passed === releaseGates.length ? "border-emerald-500/40 bg-emerald-500/10" : "border-amber-500/40 bg-amber-500/10"}`}>
            <span className="text-xs text-secondary">release decision</span>
            <strong className="mt-2 block text-xl text-primary">{passed}/{releaseGates.length} {passed === releaseGates.length ? "ready" : "blocked"}</strong>
            <div className="mt-5 grid grid-cols-5 gap-2">
              {checked.map((value, index) => <div key={releaseGates[index]} className={`min-h-20 border p-2 text-center text-xs ${value ? "border-emerald-500/40 bg-bg text-primary" : "border-border bg-bg text-secondary"}`}>0{index + 1}<span className="mt-2 block">{value ? "pass" : "open"}</span></div>)}
            </div>
            <p className="mt-4 text-sm leading-7 text-secondary">页面读完不等于可发布。五类证据必须来自同一提交和同一工具链。</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        发布门禁把语言知识转换为工程结论：能构建、行为正确、并发可证、性能有据、边界受控。
      </figcaption>
    </figure>
  );
}
