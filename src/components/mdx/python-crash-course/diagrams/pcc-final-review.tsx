"use client";

import { useMemo, useState } from "react";

const projects = [
  { name: "Alien Invasion", chapters: "12–14", input: "keyboard/mouse + frame clock", core: "Ship/Bullet/Alien Groups + game stats", output: "responsive frame + score/HUD", failures: "stuck event, leaked bullet, repeated hit, stale HUD", evidence: "FPS, Group counts, transition tests" },
  { name: "Data Visualization", chapters: "15–17", input: "generated, CSV/GeoJSON, API", core: "parse → validate → normalize → encode", output: "PNG/HTML charts", failures: "schema drift, missing row, rate limit, misleading axis", evidence: "record counts, ranges, seed, artifact checks" },
  { name: "Learning Log", chapters: "18–20", input: "HTTP request + forms + session", core: "URL/view/ORM/template + owner policy", output: "responsive deployed app", failures: "schema drift, CSRF, IDOR, static/boot failure", evidence: "tests, migrations, security matrix, health" },
];

export function PccThreeProjectIntegrationLab() {
  const [selected, setSelected] = useState(0);
  const item = projects[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 border border-border">{projects.map((project, index) => <button key={project.name} type="button" onClick={() => setSelected(index)} className={`min-h-12 px-2 text-xs sm:text-sm ${selected === index ? "bg-primary text-bg" : "bg-bg text-primary"}`}>{project.name}</button>)}</div><div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-cyan-500/40 bg-cyan-500/10 p-3"><span className="text-xs text-secondary">input · ch {item.chapters}</span><p className="mt-2 text-sm text-primary">{item.input}</p></div><div className="border border-violet-500/40 bg-violet-500/10 p-3"><span className="text-xs text-secondary">state pipeline</span><p className="mt-2 text-sm text-primary">{item.core}</p></div><div className="border border-emerald-500/40 bg-emerald-500/10 p-3"><span className="text-xs text-secondary">output</span><p className="mt-2 text-sm text-primary">{item.output}</p></div></div><div className="mt-3 grid gap-3 sm:grid-cols-2"><p className="border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-primary">failure classes: {item.failures}</p><p className="border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-primary">evidence: {item.evidence}</p></div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换三大项目，比较input、state pipeline、output、failure与verification evidence。</figcaption></figure>
  );
}

const debugCases = [
  { symptom: "Ship按一下才移动，按住不连续", producer: "KEYDOWN/KEYUP edge events", contract: "movement flags persist between frames", consumer: "Ship.update each frame", chapters: "7, 9, 12" },
  { symptom: "地震地图位置错误但没有exception", producer: "GeoJSON coordinates", contract: "[longitude, latitude] + range/sample validation", consumer: "scatter_geo location", chapters: "6, 10, 16" },
  { symptom: "API图为空，status为200", producer: "response JSON", contract: "items schema + normalize + valid-empty distinction", consumer: "Plotly records", chapters: "10, 15, 17" },
  { symptom: "Alice能编辑Bob的Entry", producer: "entry_id URL parameter", contract: "query scoped by topic__owner=request.user", consumer: "ModelForm update", chapters: "11, 18, 19" },
  { symptom: "部署后HTML正常但CSS 404", producer: "static finders/build", contract: "collectstatic artifact + production route", consumer: "browser CSS request", chapters: "18, 20" },
];

export function PccCrossChapterDebugLab() {
  const [selected, setSelected] = useState(2);
  const item = debugCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><label className="block text-sm text-primary">failure symptom<select value={selected} onChange={(event) => setSelected(Number(event.target.value))} className="mt-2 min-h-11 w-full border border-border bg-bg px-3">{debugCases.map((entry, index) => <option key={entry.symptom} value={index}>{entry.symptom}</option>)}</select></label><div className="mt-4 grid gap-2 sm:grid-cols-4">{[["producer", item.producer], ["contract", item.contract], ["consumer", item.consumer], ["review chapters", item.chapters]].map(([label, value], index) => <div key={label} className={`min-h-28 border p-3 ${index === 1 ? "border-amber-500/40 bg-amber-500/10" : "border-border bg-bg"}`}><span className="text-xs text-secondary">{index + 1}. {label}</span><p className="mt-2 text-xs leading-5 text-primary">{value}</p></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">从症状追踪producer → contract → consumer，并回退到跨章最小知识集合。</figcaption></figure>
  );
}

export function PccCapstoneAcceptanceLab() {
  const [tests, setTests] = useState(true);
  const [failures, setFailures] = useState(false);
  const [security, setSecurity] = useState(false);
  const [artifacts, setArtifacts] = useState(true);
  const [operations, setOperations] = useState(false);
  const checks = [tests, failures, security, artifacts, operations];
  const score = useMemo(() => checks.filter(Boolean).length, [tests, failures, security, artifacts, operations]);
  const rows: Array<[boolean, (value: boolean) => void, string]> = [[tests, setTests, "automated behavior tests"], [failures, setFailures, "boundary/failure scenarios"], [security, setSecurity, "identity and ownership matrix"], [artifacts, setArtifacts, "chart/build/runtime artifacts"], [operations, setOperations, "logs, health and rollback evidence"]];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="grid gap-4 border border-border bg-elevated p-4 sm:p-5 lg:grid-cols-[0.9fr_1.1fr]"><div className="space-y-2">{rows.map(([value, setter, label]) => <label key={label} className="flex min-h-11 items-center gap-3 border border-border bg-bg px-3 text-sm text-primary"><input type="checkbox" checked={value} onChange={(event) => setter(event.target.checked)} />{label}</label>)}</div><div className={`border p-4 ${score === 5 ? "border-emerald-500/40 bg-emerald-500/10" : "border-amber-500/40 bg-amber-500/10"}`}><strong className="text-xl text-primary">capstone acceptance {score}/5</strong><div className="mt-4 h-3 border border-border bg-bg"><div className="h-full bg-emerald-500 transition-all" style={{ width: `${score * 20}%` }} /></div><p className="mt-4 text-sm leading-6 text-primary">{score === 5 ? "可交付：正常、失败、安全、artifact与operation证据完整。" : "未闭环：通过happy path不代表项目已经达到可交付标准。"}</p></div></div><figcaption className="mt-2 text-center text-sm text-secondary">打开capstone五类验收证据，判断20章知识是否真正转化为可交付能力。</figcaption></figure>
  );
}
