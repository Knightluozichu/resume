"use client";

import { useMemo, useState } from "react";

type View = "map" | "experiment" | "evidence";
type Mode = "baseline" | "boundary" | "failure";

interface Props {
  title: string;
  label: string;
  color: string;
  soft: string;
  concepts: readonly string[];
  view: View;
}

export function OfficialDeZeroLab({
  title,
  label,
  color,
  soft,
  concepts,
  view,
}: Props) {
  const [mode, setMode] = useState<Mode>("baseline");
  const [depth, setDepth] = useState(4);
  const [fanout, setFanout] = useState(2);
  const [step, setStep] = useState(0.1);
  const values = useMemo(() => {
    const fault =
      mode === "failure" ? 0.38 : mode === "boundary" ? 0.12 : 0.018;
    const nodes = depth * fanout + 1;
    const gradError = Math.min(0.99, fault + step * depth * 0.04);
    const retained =
      mode === "failure" ? nodes : Math.max(2, Math.round(nodes * 0.35));
    return { fault, nodes, gradError, retained };
  }, [depth, fanout, mode, step]);
  const active =
    view === "map"
      ? depth % 6
      : view === "experiment"
        ? mode === "baseline"
          ? 3
          : mode === "boundary"
            ? 4
            : 2
        : 5;
  const chain = ["输入", "forward", "计算图", "backward", "梯度检验", "重放"];
  const points = chain
    .map(
      (_, index) =>
        String(55 + index * 112) +
        "," +
        String(198 - (((index + 1) * (1 - values.gradError) * 17) % 92)),
    )
    .join(" ");
  const status =
    values.fault > 0.25
      ? "停止并回退"
      : values.fault > 0.08
        ? "边界待核对"
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 16,
          padding: "15px 17px",
          background: "#fafafa",
          borderBottom: "1px solid #e4e4e7",
        }}
      >
        <div>
          <div
            style={{ color, fontSize: 12, fontWeight: 800, letterSpacing: 0 }}
          >
            {label} ·{" "}
            {view === "map"
              ? "对象图"
              : view === "experiment"
                ? "单变量"
                : "验收"}
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
              values.fault > 0.25
                ? "#b91c1c"
                : values.fault > 0.08
                  ? "#a16207"
                  : "#047857",
            fontSize: 13,
            fontWeight: 750,
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
        {(["baseline", "boundary", "failure"] as Mode[]).map((item, index) => (
          <button
            key={item}
            type="button"
            onClick={() => setMode(item)}
            aria-pressed={mode === item}
            style={{
              border: 0,
              borderRight: index < 2 ? "1px solid #e4e4e7" : 0,
              borderRadius: 0,
              padding: "10px 8px",
              background: mode === item ? soft : "#fff",
              color: mode === item ? color : "#52525b",
              fontWeight: mode === item ? 750 : 500,
              cursor: "pointer",
            }}
          >
            {item === "baseline"
              ? "基线"
              : item === "boundary"
                ? "边界"
                : "失败"}
          </button>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(210px, 0.82fr) minmax(300px, 1.55fr)",
          gap: 17,
          padding: 17,
        }}
      >
        <div style={{ display: "grid", gap: 12, alignContent: "start" }}>
          <label style={{ color: "#3f3f46", fontSize: 13 }}>
            图深度 {depth}
            <input
              aria-label="图深度"
              type="range"
              min={1}
              max={8}
              value={depth}
              onChange={(event) => setDepth(Number(event.target.value))}
              style={{ width: "100%", accentColor: color }}
            />
          </label>
          <label style={{ color: "#3f3f46", fontSize: 13 }}>
            分支 {fanout}
            <input
              aria-label="分支"
              type="range"
              min={1}
              max={5}
              value={fanout}
              onChange={(event) => setFanout(Number(event.target.value))}
              style={{ width: "100%", accentColor: "#2563eb" }}
            />
          </label>
          <label style={{ color: "#3f3f46", fontSize: 13 }}>
            扰动 {step.toFixed(2)}
            <input
              aria-label="扰动"
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
              ["节点", values.nodes],
              ["残差", values.gradError],
              ["保留", values.retained],
            ].map(([name, value]) => (
              <div
                key={String(name)}
                style={{
                  border: "1px solid #e4e4e7",
                  borderRadius: 6,
                  padding: "8px 4px",
                  textAlign: "center",
                  background: "#fafafa",
                }}
              >
                <div style={{ color: "#71717a", fontSize: 11 }}>{name}</div>
                <div
                  style={{ color: "#18181b", fontSize: 14, fontWeight: 800 }}
                >
                  {typeof value === "number" && value < 1
                    ? value.toFixed(3)
                    : value}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ minWidth: 0 }}>
          <svg
            viewBox="0 0 680 250"
            role="img"
            aria-label={title + "交互计算图"}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              background: "#fafafa",
              border: "1px solid #e4e4e7",
              borderRadius: 6,
            }}
          >
            <line
              x1="55"
              y1="95"
              x2="615"
              y2="95"
              stroke="#d4d4d8"
              strokeWidth="3"
            />
            {chain.map((item, index) => {
              const x = 55 + index * 112;
              const enabled = index <= active;
              return (
                <g key={item}>
                  {index < 5 ? (
                    <line
                      x1={x + 15}
                      y1="95"
                      x2={x + 97}
                      y2="95"
                      stroke={enabled ? color : "#d4d4d8"}
                      strokeWidth="4"
                    />
                  ) : null}
                  <circle
                    cx={x}
                    cy="95"
                    r={enabled ? 15 : 11}
                    fill={enabled ? color : "#fff"}
                    stroke={enabled ? color : "#a1a1aa"}
                    strokeWidth="3"
                  />
                  <text
                    x={x}
                    y="132"
                    textAnchor="middle"
                    fill="#52525b"
                    fontSize="11"
                  >
                    {item}
                  </text>
                </g>
              );
            })}
            <polyline
              points={points}
              fill="none"
              stroke="#2563eb"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="55"
              y1="218"
              x2="615"
              y2="218"
              stroke="#a1a1aa"
              strokeDasharray="5 5"
            />
          </svg>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 7,
              marginTop: 9,
            }}
          >
            {concepts.slice(0, 4).map((concept, index) => (
              <div
                key={concept}
                style={{
                  borderLeft: "3px solid " + (index % 2 ? "#2563eb" : color),
                  padding: "7px 8px",
                  background: index === active % 4 ? soft : "#fafafa",
                  color: "#3f3f46",
                  fontSize: 12,
                  minHeight: 34,
                }}
              >
                {concept.replace(/^(?:步骤)?[0-9.]+\s*/, "")}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
