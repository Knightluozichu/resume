"use client";

import { useState } from "react";

const resultCases = [
  { label: "passing", arrange: "city='santiago', country='chile'", act: "city_country(...) → 'Santiago, Chile'", assert: "actual == expected", report: "1 passed", meaning: "当前example满足已写contract" },
  { label: "failing", arrange: "expected='Santiago, Chile'", act: "actual='Santiago Chile'", assert: "strings differ at comma", report: "AssertionError + diff", meaning: "failure report定位expected/actual差异" },
  { label: "error", arrange: "module import", act: "ImportError before test body", assert: "not reached", report: "error during collection", meaning: "测试未执行，先修discovery/import" },
];

export function PccPytestResultLab() {
  const [selected, setSelected] = useState(0);
  const item = resultCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 border border-border">{resultCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-11 border-border text-sm ${index < 2 ? "border-r" : ""} ${selected === index ? "bg-primary text-bg" : "bg-bg text-primary hover:bg-elevated"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-2 sm:grid-cols-4">{[["arrange", item.arrange], ["act", item.act], ["assert", item.assert], ["pytest report", item.report]].map(([label, value], index) => <div key={String(label)} className={`min-h-28 border p-3 ${index === 3 ? "border-cyan-500/40 bg-cyan-500/10" : "border-border bg-bg"}`}><span className="text-xs text-secondary">{String(label)}</span><p className="mt-2 text-xs leading-6 text-primary">{String(value)}</p></div>)}</div><p className="mt-3 border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-primary">{item.meaning}</p></div><figcaption className="mt-2 text-center text-sm text-secondary">pass、assertion failure和collection error是三种不同状态，读取报告后采取不同动作。</figcaption></figure>
  );
}

const regressionCases = [
  { label: "initial behavior", change: "city_country(city, country)", test: "expects 'Santiago, Chile'", result: "pass", decision: "baseline contract locked" },
  { label: "new requirement", change: "add population parameter", test: "old test + new population test", result: "new test fails first", decision: "failure proves test observes missing behavior" },
  { label: "implementation", change: "optional population formatting", test: "both tests run", result: "2 passed", decision: "old behavior remains compatible" },
  { label: "regression", change: "comma accidentally removed", test: "old test fails", result: "diff catches old contract break", decision: "fix code unless requirement intentionally changed" },
];

export function PccRegressionExpansionLab() {
  const [selected, setSelected] = useState(1);
  const item = regressionCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><label className="block text-sm text-primary">change stage<select value={selected} onChange={(event) => setSelected(Number(event.target.value))} className="mt-2 min-h-11 w-full border border-border bg-bg px-3 text-sm text-primary">{regressionCases.map((entry, index) => <option key={entry.label} value={index}>{entry.label}</option>)}</select></label><div className="mt-4 grid gap-3 sm:grid-cols-4"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">change</span><p className="mt-2 text-sm leading-6 text-primary">{item.change}</p></div><div className="border border-violet-500/40 bg-violet-500/10 p-3"><span className="text-xs text-secondary">test set</span><p className="mt-2 text-sm leading-6 text-primary">{item.test}</p></div><div className="border border-cyan-500/40 bg-cyan-500/10 p-3"><span className="text-xs text-secondary">result</span><strong className="mt-2 block text-sm text-primary">{item.result}</strong></div><div className="border border-emerald-500/40 bg-emerald-500/10 p-3"><span className="text-xs text-secondary">decision</span><p className="mt-2 text-sm leading-6 text-primary">{item.decision}</p></div></div></div><figcaption className="mt-2 text-center text-sm text-secondary">新增行为先写会失败的test，再实现并重跑旧tests，才构成regression protection。</figcaption></figure>
  );
}

const fixtureCases = [
  { label: "fresh survey", setup: "AnonymousSurvey('language?')", testA: "store one response", testB: "store three responses", isolation: "each test receives a new empty responses list" },
  { label: "fresh employee", setup: "Employee('Ada','Lovelace',65000)", testA: "give default raise", testB: "give custom raise", isolation: "salary resets to 65000 for every test" },
  { label: "shared fixture mistake", setup: "module-level mutable instance", testA: "mutates state", testB: "observes leaked state", isolation: "order-dependent failure; replace with fixture" },
];

export function PccFixtureLifecycleLab() {
  const [selected, setSelected] = useState(0);
  const item = fixtureCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 border border-border">{fixtureCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border-border px-2 text-xs sm:text-sm ${index < 2 ? "border-r" : ""} ${selected === index ? "bg-primary text-bg" : "bg-bg text-primary hover:bg-elevated"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">fixture setup</span><code className="mt-2 block break-all text-sm text-primary">{item.setup}</code></div><div className="border border-violet-500/40 bg-violet-500/10 p-3"><span className="text-xs text-secondary">consumers</span><p className="mt-2 text-sm leading-6 text-primary">A: {item.testA}<br />B: {item.testB}</p></div><div className="border border-emerald-500/40 bg-emerald-500/10 p-3"><span className="text-xs text-secondary">isolation proof</span><p className="mt-2 text-sm leading-6 text-primary">{item.isolation}</p></div></div></div><figcaption className="mt-2 text-center text-sm text-secondary">fixture消除重复setup，但默认应为每个test创建fresh state，避免顺序依赖。</figcaption></figure>
  );
}
