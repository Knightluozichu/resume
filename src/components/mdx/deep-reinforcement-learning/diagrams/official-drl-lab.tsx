"use client";

import { useMemo, useState } from "react";

type Props = {
  title: string;
  concepts: readonly string[];
  accent: string;
  view: "map" | "trace" | "audit";
};

const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

export function OfficialDrlLab({ title, concepts, accent, view }: Props) {
  const [step, setStep] = useState(0);
  const [gamma, setGamma] = useState(90);
  const [noise, setNoise] = useState(18);
  const [fault, setFault] = useState(false);
  function resetExperiment() {
    setStep(0);
    setGamma(90);
    setNoise(18);
    setFault(false);
  }

  const visible = concepts.slice(0, 6);
  const values = useMemo(() => {
    const horizon = step + 1;
    const discounted = Array.from({ length: 6 }, (_, index) =>
      Math.pow(gamma / 100, index) * (42 + index * 8 - noise * 0.35),
    );
    return {
      discounted,
      state: clamp(96 - noise * 0.22 - (fault ? 54 : 0)),
      target: clamp(70 + gamma * 0.24 - horizon * 1.5 - (fault ? 42 : 0)),
      replay: clamp(93 - Math.abs(noise - 15) * 0.4 - (fault ? 38 : 0)),
    };
  }, [fault, gamma, noise, step]);
  const metrics = [
    { label: "状态合同", value: values.state },
    { label: "目标一致", value: values.target },
    { label: "独立重放", value: values.replay },
  ];
  const tracePoints = values.discounted
    .map((value, index) => String(55 + index * 100) + "," + String(190 - value * 1.35))
    .join(" ");
  return (
    <div style={{ border: "1px solid #d4d4d8", borderRadius: 6, background: "#fff", padding: 14, color: "#18181b" }}>
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
        <strong style={{ fontSize: 14 }}>{title}</strong>
        <span style={{ fontSize: 12, color: "#52525b" }}>{view === "map" ? "对象与版本图" : view === "trace" ? "折扣轨迹" : "证据审计"}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
        <div>
          <label style={{ display: "block", fontSize: 12, marginBottom: 10 }}>
            证据阶段 {step + 1}/{Math.max(visible.length, 1)}
            <input aria-label="证据阶段" type="range" min={0} max={Math.max(visible.length - 1, 0)} value={step} onChange={(event) => setStep(Number(event.target.value))} style={{ width: "100%", accentColor: accent }} />
          </label>
          <label style={{ display: "block", fontSize: 12, marginBottom: 10 }}>
            折扣率 {(gamma / 100).toFixed(2)}
            <input aria-label="折扣率" type="range" min={0} max={100} value={gamma} onChange={(event) => setGamma(Number(event.target.value))} style={{ width: "100%", accentColor: "#0f766e" }} />
          </label>
          <label style={{ display: "block", fontSize: 12, marginBottom: 12 }}>
            采样噪声 {noise}
            <input aria-label="采样噪声" type="range" min={0} max={60} value={noise} onChange={(event) => setNoise(Number(event.target.value))} style={{ width: "100%", accentColor: "#b45309" }} />
          </label>
          <label style={{ display: "flex", gap: 8, fontSize: 12, color: fault ? "#b91c1c" : "#3f3f46" }}>
            <input type="checkbox" checked={fault} onChange={(event) => setFault(event.target.checked)} />
            注入终止/策略版本故障
          </label>
        </div>
        <div>
          {view === "map" ? (
            <svg viewBox="0 0 640 250" role="img" aria-label={title + "对象与版本图"} style={{ width: "100%", minHeight: 190, background: "#fafafa", border: "1px solid #e4e4e7", borderRadius: 6 }}>
              <path d="M65 126 H575" fill="none" stroke="#d4d4d8" strokeWidth="4" />
              {visible.slice(0, 5).map((concept, index) => {
                const x = 80 + index * 120;
                const active = index <= step;
                return <g key={concept}>
                  <circle cx={x} cy="126" r={active ? 17 : 12} fill={active ? accent : "#fff"} stroke={fault && index === step ? "#b91c1c" : active ? accent : "#a1a1aa"} strokeWidth="3" />
                  <text x={x} y={index % 2 === 0 ? 87 : 173} textAnchor="middle" fill="#3f3f46" fontSize="11">{concept.slice(0, 10)}</text>
                </g>;
              })}
              <text x="320" y="222" textAnchor="middle" fill="#52525b" fontSize="13">环境 → 转移 → 目标 → 更新 → 冻结评价</text>
            </svg>
          ) : view === "trace" ? (
            <svg viewBox="0 0 640 250" role="img" aria-label={title + "折扣轨迹"} style={{ width: "100%", minHeight: 190, background: "#fafafa", border: "1px solid #e4e4e7", borderRadius: 6 }}>
              {[50, 100, 150, 200].map((y) => <line key={y} x1="40" y1={y} x2="600" y2={y} stroke="#e4e4e7" />)}
              <polyline points={tracePoints} fill="none" stroke={fault ? "#b91c1c" : accent} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              {values.discounted.map((value, index) => <circle key={index} cx={55 + index * 100} cy={190 - value * 1.35} r="6" fill="#fff" stroke={fault ? "#b91c1c" : accent} strokeWidth="3" />)}
              <text x="320" y="232" textAnchor="middle" fill="#52525b" fontSize="12">时间步与折扣贡献</text>
            </svg>
          ) : (
            <svg viewBox="0 0 640 250" role="img" aria-label={title + "证据审计"} style={{ width: "100%", minHeight: 190, background: "#fafafa", border: "1px solid #e4e4e7", borderRadius: 6 }}>
              {metrics.map((item, index) => <g key={item.label}>
                <rect x={80 + index * 185} y={205 - item.value * 1.55} width="95" height={item.value * 1.55} fill={item.value >= 60 ? accent : "#b91c1c"} opacity="0.82" />
                <text x={127 + index * 185} y="226" textAnchor="middle" fill="#52525b" fontSize="11">{item.label}</text>
                <text x={127 + index * 185} y={194 - item.value * 1.55} textAnchor="middle" fill="#18181b" fontSize="12">{item.value}</text>
              </g>)}
            </svg>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 6, marginTop: 8 }}>
            {metrics.map((item) => <div key={item.label} style={{ borderTop: "3px solid " + (item.value >= 60 ? accent : "#b91c1c"), background: "#fafafa", padding: "8px 4px", textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "#71717a" }}>{item.label}</div>
              <strong style={{ fontSize: 13 }}>{item.value}</strong>
            </div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
