"use client";

import { useMemo, useState } from "react";
type Props = { title: string; concepts: readonly string[]; accent: string; view: "graph" | "run" | "fault" };
const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

export function OfficialLcpLab({ title, concepts, accent, view }: Props) {
  const [stage, setStage] = useState(0);
  const [concurrency, setConcurrency] = useState(3);
  const [contextBudget, setContextBudget] = useState(900);
  const [fault, setFault] = useState(false);
  function resetExperiment() {
    setStage(0);
    setConcurrency(3);
    setContextBudget(900);
    setFault(false);
  }

  const labels = concepts.slice(0, 6);
  const timings = useMemo(() => [36, 58, 82, 44, 65].map((value, index) => clamp(value / Math.max(concurrency, 1) + index * 8 + (fault && index === stage ? 45 : 0))), [concurrency, fault, stage]);
  const metrics = [
    { label: "schema通过", value: clamp(97 - (fault ? 62 : 0)) },
    { label: "上下文余量", value: clamp((contextBudget - 180) / 9 - (fault ? 12 : 0)) },
    { label: "trace完整", value: clamp(73 + stage * 5 - (fault ? 46 : 0)) },
  ];
  return <div style={{ border: "1px solid #d4d4d8", borderRadius: 6, background: "#fff", padding: 14, color: "#18181b" }}>
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", marginBottom: 12 }}><strong style={{ fontSize: 14 }}>{title}</strong><span style={{ fontSize: 12, color: "#52525b" }}>{view === "graph" ? "Runnable图" : view === "run" ? "执行时序" : "故障诊断"}</span></div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
      <div>
        <label style={{ display: "block", fontSize: 12, marginBottom: 10 }}>节点阶段 {stage + 1}/{Math.max(labels.length, 1)}<input aria-label="节点阶段" type="range" min={0} max={Math.max(labels.length - 1, 0)} value={stage} onChange={(event) => setStage(Number(event.target.value))} style={{ width: "100%", accentColor: accent }} /></label>
        <label style={{ display: "block", fontSize: 12, marginBottom: 10 }}>并发度 {concurrency}<input aria-label="并发度" type="range" min={1} max={8} value={concurrency} onChange={(event) => setConcurrency(Number(event.target.value))} style={{ width: "100%", accentColor: "#b45309" }} /></label>
        <label style={{ display: "block", fontSize: 12, marginBottom: 12 }}>上下文预算 {contextBudget}<input aria-label="上下文预算" type="range" min={200} max={1600} step={50} value={contextBudget} onChange={(event) => setContextBudget(Number(event.target.value))} style={{ width: "100%", accentColor: "#0f766e" }} /></label>
        <label style={{ display: "flex", gap: 8, fontSize: 12, color: fault ? "#b91c1c" : "#3f3f46" }}><input type="checkbox" checked={fault} onChange={(event) => setFault(event.target.checked)} />注入节点、工具或版本故障</label>
      </div>
      <div>
        {view === "graph" ? <svg viewBox="0 0 640 250" role="img" aria-label={title + "Runnable图"} style={{ width: "100%", minHeight: 190, background: "#fafafa", border: "1px solid #e4e4e7", borderRadius: 6 }}>
          <path d="M65 126 H575" fill="none" stroke="#d4d4d8" strokeWidth="4" />
          {labels.slice(0, 5).map((label, index) => { const x = 80 + index * 120; const active = index <= stage; return <g key={label}><circle cx={x} cy="126" r={active ? 17 : 12} fill={active ? accent : "#fff"} stroke={fault && index === stage ? "#b91c1c" : active ? accent : "#a1a1aa"} strokeWidth="3" /><text x={x} y={index % 2 === 0 ? 87 : 173} textAnchor="middle" fill="#3f3f46" fontSize="11">{label.slice(0, 9)}</text></g>; })}
          <text x="320" y="222" textAnchor="middle" fill="#52525b" fontSize="13">输入 → Runnable → 工具/模型 → 解析 → trace</text>
        </svg> : view === "run" ? <svg viewBox="0 0 640 250" role="img" aria-label={title + "执行时序"} style={{ width: "100%", minHeight: 190, background: "#fafafa", border: "1px solid #e4e4e7", borderRadius: 6 }}>
          {timings.map((timing, index) => <g key={index}><rect x={60 + index * 112} y={205 - timing * 1.55} width="66" height={timing * 1.55} fill={fault && index === stage ? "#b91c1c" : accent} opacity="0.82" /><text x={93 + index * 112} y="225" textAnchor="middle" fill="#52525b" fontSize="11">节点 {index + 1}</text><text x={93 + index * 112} y={194 - timing * 1.55} textAnchor="middle" fill="#18181b" fontSize="11">{timing}ms</text></g>)}
        </svg> : <svg viewBox="0 0 640 250" role="img" aria-label={title + "故障诊断"} style={{ width: "100%", minHeight: 190, background: "#fafafa", border: "1px solid #e4e4e7", borderRadius: 6 }}>
          {metrics.map((item, index) => <g key={item.label}><rect x={80 + index * 185} y={205 - item.value * 1.55} width="95" height={item.value * 1.55} fill={item.value >= 60 ? accent : "#b91c1c"} opacity="0.82" /><text x={127 + index * 185} y="226" textAnchor="middle" fill="#52525b" fontSize="11">{item.label}</text><text x={127 + index * 185} y={194 - item.value * 1.55} textAnchor="middle" fill="#18181b" fontSize="12">{item.value}</text></g>)}
        </svg>}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 6, marginTop: 8 }}>{metrics.map((item) => <div key={item.label} style={{ borderTop: "3px solid " + (item.value >= 60 ? accent : "#b91c1c"), background: "#fafafa", padding: "8px 4px", textAlign: "center" }}><div style={{ fontSize: 11, color: "#71717a" }}>{item.label}</div><strong style={{ fontSize: 13 }}>{item.value}</strong></div>)}</div>
      </div>
    </div>
  </div>;
}
