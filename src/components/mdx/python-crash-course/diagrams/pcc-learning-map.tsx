"use client";

import { useState } from "react";

const stages = [
  { name: "Python foundations", chapters: ["1 Getting Started", "2 Variables and Simple Data Types", "3 Introducing Lists", "4 Working with Lists"], evidence: "interpreter evidence、value binding、collection mutation与iteration" },
  { name: "Program structure", chapters: ["5 if Statements", "6 Dictionaries", "7 User Input and while Loops", "8 Functions", "9 Classes", "10 Files and Exceptions", "11 Testing Your Code"], evidence: "decision、state loop、function/class contracts、I/O failure与pytest regression" },
  { name: "Alien Invasion", chapters: ["12 A Ship That Fires Bullets", "13 Aliens!", "14 Scoring"], evidence: "Pygame loop、Sprite lifecycle、collision、game state与HUD" },
  { name: "Data visualization", chapters: ["15 Generating Data", "16 Downloading Data", "17 Working with APIs"], evidence: "generated/file/API data经过validate、normalize、encode与export" },
  { name: "Web application", chapters: ["18 Getting Started with Django", "19 User Accounts", "20 Styling and Deploying an App"], evidence: "model-request-template、auth/owner isolation与production release gates" },
];

export function PccOfficialChapterMapLab() {
  const [stage, setStage] = useState(0);
  const item = stages[stage];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">{stages.map((entry, index) => <button key={entry.name} type="button" onClick={() => setStage(index)} className={`min-h-14 border px-2 text-xs ${stage === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{index + 1}. {entry.name}</button>)}</div>
        <div className="mt-4 grid gap-3 lg:grid-cols-[0.75fr_1.25fr]"><div className="border border-violet-500/40 bg-violet-500/10 p-4"><strong className="text-lg text-primary">{item.name}</strong><p className="mt-3 text-sm leading-6 text-primary">evidence: {item.evidence}</p></div><div className="grid gap-2 sm:grid-cols-2">{item.chapters.map((chapter) => <div key={chapter} className="min-h-16 border border-border bg-bg p-3 text-sm text-primary">{chapter}</div>)}</div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">第三版官方20章按foundation、program、game、data和web五阶段展开；每章保留独立入口。</figcaption>
    </figure>
  );
}

const dependencyCases = [
  { current: "1–4 Foundations", requires: "interpreter + basic syntax", unlocks: "typed collections and predictable iteration", fallback: "环境、binding、index/slice与copy/alias" },
  { current: "5–11 Program structure", requires: "values + collections", unlocks: "testable modules and persistent state", fallback: "branch order、loop termination、argument binding、object invariant" },
  { current: "12–14 Alien Invasion", requires: "classes + tests + state loops", unlocks: "realtime project architecture", fallback: "event state、Group lifecycle、collision transition、HUD invalidation" },
  { current: "15–17 Data projects", requires: "files + exceptions + collections", unlocks: "validated data products", fallback: "schema、parse、normalization、encoding与artifact" },
  { current: "18–20 Web project", requires: "classes + I/O + tests", unlocks: "multi-user deployed application", fallback: "migration、request dispatch、owner scope、release gate" },
];

export function PccChapterDependencyLab() {
  const [selected, setSelected] = useState(2);
  const item = dependencyCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="block text-sm text-primary">dependency checkpoint<select value={selected} onChange={(event) => setSelected(Number(event.target.value))} className="mt-2 min-h-11 w-full border border-border bg-bg px-3">{dependencyCases.map((entry, index) => <option key={entry.current} value={index}>{entry.current}</option>)}</select></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-cyan-500/40 bg-cyan-500/10 p-3"><span className="text-xs text-secondary">requires</span><p className="mt-2 text-sm text-primary">{item.requires}</p></div><div className="border border-violet-500/40 bg-violet-500/10 p-3"><span className="text-xs text-secondary">current</span><strong className="mt-2 block text-sm text-primary">{item.current}</strong></div><div className="border border-emerald-500/40 bg-emerald-500/10 p-3"><span className="text-xs text-secondary">unlocks</span><p className="mt-2 text-sm text-primary">{item.unlocks}</p></div></div>
        <p className="mt-3 border border-amber-500/40 bg-amber-500/10 p-3 text-sm leading-6 text-primary">失败回退：{item.fallback}</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">选择阶段，查看前置能力、产出和遇到问题时应回退的最小章节contract。</figcaption>
    </figure>
  );
}

export function PccLearningEvidenceGateLab() {
  const [outline, setOutline] = useState(true);
  const [explanation, setExplanation] = useState(true);
  const [practice, setPractice] = useState(false);
  const [review, setReview] = useState(false);
  const [evidence, setEvidence] = useState(false);
  const gates = [outline, explanation, practice, review, evidence];
  const passed = gates.filter(Boolean).length;
  const rows: Array<[boolean, (value: boolean) => void, string]> = [
    [outline, setOutline, "official outline covered"],
    [explanation, setExplanation, "can explain state and failure"],
    [practice, setPractice, "exercise implemented"],
    [review, setReview, "review questions passed"],
    [evidence, setEvidence, "test/build/artifact evidence"],
  ];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="grid gap-4 border border-border bg-elevated p-4 sm:p-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-2">{rows.map(([value, setter, label]) => <label key={label} className="flex min-h-11 items-center gap-3 border border-border bg-bg px-3 text-sm text-primary"><input type="checkbox" checked={value} onChange={(event) => setter(event.target.checked)} />{label}</label>)}</div>
        <div className={`border p-4 ${passed === gates.length ? "border-emerald-500/40 bg-emerald-500/10" : "border-amber-500/40 bg-amber-500/10"}`}><strong className="text-lg text-primary">chapter gate {passed}/{gates.length}</strong><p className="mt-3 text-sm leading-6 text-primary">{passed === gates.length ? "可进入下一章；理解、实现与验证证据完整。" : "尚未完成；页面阅读进度不能代替练习、review和运行证据。"}</p><div className="mt-4 grid grid-cols-5 gap-2">{gates.map((value, index) => <span key={index} className={`border p-2 text-center text-xs ${value ? "border-emerald-500/40 bg-bg text-primary" : "border-border bg-bg text-secondary"}`}>{index + 1}<br />{value ? "pass" : "open"}</span>)}</div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">逐项打开章节门禁：目录、解释、实现、复习和可重复证据同时完成才推进。</figcaption>
    </figure>
  );
}
