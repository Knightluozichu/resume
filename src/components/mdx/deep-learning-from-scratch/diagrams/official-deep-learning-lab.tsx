"use client";

import { useMemo, useState } from "react";

type View = "map" | "experiment" | "evidence";
type Mode = "baseline" | "boundary" | "failure";

interface OfficialDeepLearningLabProps {
  title: string;
  label: string;
  color: string;
  soft: string;
  chain: readonly string[];
  concepts: readonly string[];
  view: View;
}

const modes: Array<{ id: Mode; label: string }> = [
  { id: "baseline", label: "基线" },
  { id: "boundary", label: "边界" },
  { id: "failure", label: "失败" },
];

export function OfficialDeepLearningLab({
  title,
  label,
  color,
  soft,
  chain,
  concepts,
  view,
}: OfficialDeepLearningLabProps) {
  const [mode, setMode] = useState<Mode>("baseline");
  const [batch, setBatch] = useState(8);
  const [depth, setDepth] = useState(3);
  const [step, setStep] = useState(0.1);
  function resetExperiment() {
    setMode("baseline");
    setBatch(8);
    setDepth(3);
    setStep(0.1);
  }

  const modeIndex = modes.findIndex((item) => item.id === mode);
  const values = useMemo(() => {
    const instability =
      mode === "failure" ? 0.34 : mode === "boundary" ? 0.12 : 0.025;
    const forward = Math.max(0.06, 0.92 - depth * 0.045 - instability);
    const gradient = Math.min(0.99, instability + step * 0.42 + depth * 0.012);
    const generalization = Math.max(
      0.03,
      forward - gradient * 0.31 + Math.log2(batch) * 0.018,
    );
    return { forward, gradient, generalization, instability };
  }, [batch, depth, mode, step]);
  const active =
    view === "map"
      ? depth % chain.length
      : view === "experiment"
        ? modeIndex + 2
        : 5;
  const status =
    values.instability > 0.25
      ? "停止并重放"
      : values.instability > 0.08
        ? "检查边界"
        : "证据一致";

  return (
    <div
      style={{
        border: "1px solid #d4d4d8",
        borderRadius: 8,
        background: "#fff",
        overflow: "hidden",
        margin: "20px 0",
      }}
    >
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 16,
          alignItems: "flex-start",
          padding: "16px 18px",
          borderBottom: "1px solid #e4e4e7",
          background: "#fafafa",
        }}
      >
        <div>
          <div
            style={{ color, fontSize: 12, fontWeight: 800, letterSpacing: 0 }}
          >
            {label} ·{" "}
            {view === "map" ? "结构" : view === "experiment" ? "实验" : "证据"}
          </div>
          <div
            style={{
              color: "#18181b",
              fontSize: 16,
              fontWeight: 750,
              marginTop: 4,
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            color:
              values.instability > 0.25
                ? "#b91c1c"
                : values.instability > 0.08
                  ? "#a16207"
                  : "#047857",
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          {status}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          borderBottom: "1px solid #e4e4e7",
        }}
      >
        {modes.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setMode(item.id)}
            aria-pressed={mode === item.id}
            style={{
              border: 0,
              borderRight: item.id !== "failure" ? "1px solid #e4e4e7" : 0,
              borderRadius: 0,
              padding: "10px 8px",
              background: mode === item.id ? soft : "#fff",
              color: mode === item.id ? color : "#52525b",
              fontWeight: mode === item.id ? 750 : 500,
              cursor: "pointer",
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(220px, 0.9fr) minmax(280px, 1.6fr)",
          gap: 18,
          padding: 18,
        }}
      >
        <div style={{ display: "grid", gap: 14, alignContent: "start" }}>
          <label style={{ color: "#3f3f46", fontSize: 13 }}>
            批量 {batch}
            <input
              aria-label="批量"
              type="range"
              min={1}
              max={32}
              value={batch}
              onChange={(event) => setBatch(Number(event.target.value))}
              style={{ width: "100%", accentColor: color }}
            />
          </label>
          <label style={{ color: "#3f3f46", fontSize: 13 }}>
            深度 {depth}
            <input
              aria-label="深度"
              type="range"
              min={1}
              max={8}
              value={depth}
              onChange={(event) => setDepth(Number(event.target.value))}
              style={{ width: "100%", accentColor: "#2563eb" }}
            />
          </label>
          <label style={{ color: "#3f3f46", fontSize: 13 }}>
            步长 {step.toFixed(2)}
            <input
              aria-label="步长"
              type="range"
              min={1}
              max={80}
              value={Math.round(step * 100)}
              onChange={(event) => setStep(Number(event.target.value) / 100)}
              style={{ width: "100%", accentColor: "#d97706" }}
            />
          </label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 6,
            }}
          >
            {[
              ["前向", values.forward],
              ["梯度", values.gradient],
              ["泛化", values.generalization],
            ].map(([name, value]) => (
              <div
                key={String(name)}
                style={{
                  border: "1px solid #e4e4e7",
                  borderRadius: 6,
                  padding: "8px 6px",
                  textAlign: "center",
                  background: "#fafafa",
                }}
              >
                <div style={{ color: "#71717a", fontSize: 11 }}>{name}</div>
                <div
                  style={{
                    color: "#18181b",
                    fontSize: 15,
                    fontWeight: 800,
                    marginTop: 2,
                  }}
                >
                  {Number(value).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ minWidth: 0 }}>
          <svg
            viewBox="0 0 680 250"
            role="img"
            aria-label={title + "交互证据图"}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              background: "#fafafa",
              border: "1px solid #e4e4e7",
              borderRadius: 6,
            }}
          >
            <defs>
              <linearGradient
                id={label.replace(/[^a-zA-Z0-9]/g, "") + "signal"}
                x1="0"
                x2="1"
              >
                <stop offset="0" stopColor={color} />
                <stop offset="1" stopColor="#2563eb" />
              </linearGradient>
            </defs>
            <line
              x1="62"
              y1="103"
              x2="620"
              y2="103"
              stroke="#d4d4d8"
              strokeWidth="3"
            />
            {chain.map((item, index) => {
              const x = 62 + index * 112;
              const isActive = index <= active;
              return (
                <g key={item}>
                  {index < chain.length - 1 ? (
                    <line
                      x1={x + 18}
                      y1="103"
                      x2={x + 94}
                      y2="103"
                      stroke={isActive ? color : "#d4d4d8"}
                      strokeWidth="4"
                    />
                  ) : null}
                  <circle
                    cx={x}
                    cy="103"
                    r={isActive ? 16 : 12}
                    fill={isActive ? color : "#fff"}
                    stroke={isActive ? color : "#a1a1aa"}
                    strokeWidth="3"
                  />
                  <text
                    x={x}
                    y="73"
                    textAnchor="middle"
                    fill="#3f3f46"
                    fontSize="12"
                    fontWeight={isActive ? 750 : 500}
                  >
                    {index + 1}
                  </text>
                  <text
                    x={x}
                    y="139"
                    textAnchor="middle"
                    fill="#52525b"
                    fontSize="11"
                  >
                    {item.slice(0, 7)}
                  </text>
                </g>
              );
            })}
            <path
              d={`M62 202 C 160 ${186 - values.forward * 70}, 260 ${208 - values.gradient * 85}, 360 ${184 - values.generalization * 60} S 545 ${175 - values.instability * 90}, 620 ${190 - values.forward * 80}`}
              fill="none"
              stroke={`url(#${label.replace(/[^a-zA-Z0-9]/g, "")}signal)`}
              strokeWidth="5"
              strokeLinecap="round"
            />
            <line
              x1="62"
              y1="218"
              x2="620"
              y2="218"
              stroke="#a1a1aa"
              strokeDasharray="5 5"
            />
          </svg>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 8,
              marginTop: 10,
            }}
          >
            {concepts.slice(0, 4).map((concept, index) => (
              <div
                key={concept}
                style={{
                  borderLeft: `3px solid ${index % 2 ? "#2563eb" : color}`,
                  padding: "7px 9px",
                  background: index === modeIndex ? soft : "#fafafa",
                  color: "#3f3f46",
                  fontSize: 12,
                  minHeight: 34,
                }}
              >
                {concept.replace(/^\d+(?:\.\d+)*\s*/, "")}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
