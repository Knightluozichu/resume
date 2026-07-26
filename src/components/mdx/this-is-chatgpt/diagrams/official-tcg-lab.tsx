"use client";

import { useMemo, useState } from "react";

type Props = { title: string; concepts: readonly string[]; accent: string; view: "map" | "probability" | "evidence" };
const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

export function OfficialTcgLab({ title, concepts, accent, view }: Props) {
  const [stage, setStage] = useState(0);
  const [temperature, setTemperature] = useState(80);
  const [context, setContext] = useState(6);
  const [fault, setFault] = useState(false);
  function resetExperiment() {
    setStage(0);
    setTemperature(80);
    setContext(6);
    setFault(false);
  }

  const labels = concepts.slice(0, 6);
  const probabilities = useMemo(() => {
    const logits = [2.4, 1.8, 1.15, 0.45, -0.2];
    const t = Math.max(temperature / 100, 0.08);
    const values = logits.map((value) => Math.exp(value / t));
    const total = values.reduce((sum, value) => sum + value, 0);
    return values.map((value) => value / total);
  }, [temperature]);
  const metrics = [
    { label: "上下文可追踪", value: clamp(91 - Math.abs(context - 8) * 1.2 - (fault ? 46 : 0)) },
    { label: "分布归一", value: clamp(98 - (fault ? 58 : 0)) },
    { label: "结果有证据", value: clamp(74 + stage * 4 - (fault ? 42 : 0)) },
  ];
  return <div style={{ border: "1px solid #d4d4d8", borderRadius: 6, background: "#fff", padding: 14, color: "#18181b" }}>
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
      <strong style={{ fontSize: 14 }}>{title}</strong><span style={{ fontSize: 12, color: "#52525b" }}>{view === "map" ? "生成证据链" : view === "probability" ? "token概率" : "边界审计"}</span>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
      <div>
        <label style={{ display: "block", fontSize: 12, marginBottom: 10 }}>证据阶段 {stage + 1}/{Math.max(labels.length, 1)}<input aria-label="证据阶段" type="range" min={0} max={Math.max(labels.length - 1, 0)} value={stage} onChange={(event) => setStage(Number(event.target.value))} style={{ width: "100%", accentColor: accent }} /></label>
        <label style={{ display: "block", fontSize: 12, marginBottom: 10 }}>温度 {(temperature / 100).toFixed(2)}<input aria-label="温度" type="range" min={8} max={160} value={temperature} onChange={(event) => setTemperature(Number(event.target.value))} style={{ width: "100%", accentColor: "#b45309" }} /></label>
        <label style={{ display: "block", fontSize: 12, marginBottom: 12 }}>上下文token {context}<input aria-label="上下文token" type="range" min={1} max={20} value={context} onChange={(event) => setContext(Number(event.target.value))} style={{ width: "100%", accentColor: "#0f766e" }} /></label>
        <label style={{ display: "flex", gap: 8, fontSize: 12, color: fault ? "#b91c1c" : "#3f3f46" }}><input type="checkbox" checked={fault} onChange={(event) => setFault(event.target.checked)} />注入版本/工具证据故障</label>
      </div>
      <div>
        {view === "map" ? <svg viewBox="0 0 640 250" role="img" aria-label={title + "生成证据链"} style={{ width: "100%", minHeight: 190, background: "#fafafa", border: "1px solid #e4e4e7", borderRadius: 6 }}>
          <path d="M65 126 H575" fill="none" stroke="#d4d4d8" strokeWidth="4" />
          {labels.slice(0, 5).map((label, index) => { const x = 80 + index * 120; const active = index <= stage; return <g key={label}><circle cx={x} cy="126" r={active ? 17 : 12} fill={active ? accent : "#fff"} stroke={fault && index === stage ? "#b91c1c" : active ? accent : "#a1a1aa"} strokeWidth="3" /><text x={x} y={index % 2 === 0 ? 87 : 173} textAnchor="middle" fill="#3f3f46" fontSize="11">{label.slice(0, 9)}</text></g>; })}
          <text x="320" y="222" textAnchor="middle" fill="#52525b" fontSize="13">语料 → 权重 → 分布 → 采样 → 验证</text>
        </svg> : view === "probability" ? <svg viewBox="0 0 640 250" role="img" aria-label={title + "token概率"} style={{ width: "100%", minHeight: 190, background: "#fafafa", border: "1px solid #e4e4e7", borderRadius: 6 }}>
          {probabilities.map((probability, index) => <g key={index}><rect x={60 + index * 112} y={205 - probability * 310} width="66" height={probability * 310} fill={fault && index === 0 ? "#b91c1c" : accent} opacity="0.82" /><text x={93 + index * 112} y="225" textAnchor="middle" fill="#52525b" fontSize="11">token {index + 1}</text><text x={93 + index * 112} y={194 - probability * 310} textAnchor="middle" fill="#18181b" fontSize="11">{(probability * 100).toFixed(1)}%</text></g>)}
        </svg> : <svg viewBox="0 0 640 250" role="img" aria-label={title + "边界审计"} style={{ width: "100%", minHeight: 190, background: "#fafafa", border: "1px solid #e4e4e7", borderRadius: 6 }}>
          {metrics.map((item, index) => <g key={item.label}><rect x={80 + index * 185} y={205 - item.value * 1.55} width="95" height={item.value * 1.55} fill={item.value >= 60 ? accent : "#b91c1c"} opacity="0.82" /><text x={127 + index * 185} y="226" textAnchor="middle" fill="#52525b" fontSize="11">{item.label}</text><text x={127 + index * 185} y={194 - item.value * 1.55} textAnchor="middle" fill="#18181b" fontSize="12">{item.value}</text></g>)}
        </svg>}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 6, marginTop: 8 }}>{metrics.map((item) => <div key={item.label} style={{ borderTop: "3px solid " + (item.value >= 60 ? accent : "#b91c1c"), background: "#fafafa", padding: "8px 4px", textAlign: "center" }}><div style={{ fontSize: 11, color: "#71717a" }}>{item.label}</div><strong style={{ fontSize: 13 }}>{item.value}</strong></div>)}</div>
      </div>
    </div>
  </div>;
}
