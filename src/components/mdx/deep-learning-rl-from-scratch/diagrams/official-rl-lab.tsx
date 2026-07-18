"use client";

import { useMemo, useState } from "react";

type Props = {
  title: string;
  concepts: readonly string[];
  accent: string;
  view: "map" | "experiment" | "evidence";
};

const bounded = (value: number) =>
  Math.max(0, Math.min(100, Math.round(value)));

export function OfficialRlLab({ title, concepts, accent, view }: Props) {
  const [state, setState] = useState(0);
  const [gamma, setGamma] = useState(90);
  const [epsilon, setEpsilon] = useState(15);
  const [fault, setFault] = useState(false);
  const visible = concepts.slice(0, 6);
  const metrics = useMemo(() => {
    const value = bounded(
      52 + gamma * 0.35 - epsilon * 0.18 - (fault ? 38 : 0),
    );
    const td = bounded(
      92 - Math.abs(gamma - 88) * 0.5 - state * 3 - (fault ? 48 : 0),
    );
    const policy = bounded(62 + epsilon * 0.8 - (fault ? 31 : 0));
    return [
      { label: "价值", value },
      { label: "TD一致", value: td },
      { label: "覆盖", value: policy },
    ];
  }, [epsilon, fault, gamma, state]);
  const points = metrics
    .map(
      (item, index) =>
        String(70 + index * 220) + "," + String(205 - item.value * 1.45),
    )
    .join(" ");

  return (
    <div
      style={{
        border: "1px solid #d4d4d8",
        borderRadius: 6,
        background: "#fff",
        padding: 14,
        color: "#18181b",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap",
          marginBottom: 12,
        }}
      >
        <strong style={{ fontSize: 14 }}>{title}</strong>
        <span style={{ fontSize: 12, color: "#52525b" }}>
          {view === "map"
            ? "状态-动作-奖励图"
            : view === "experiment"
              ? "单变量更新"
              : "独立证据"}
        </span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <label
            style={{
              display: "block",
              fontSize: 12,
              color: "#52525b",
              marginBottom: 10,
            }}
          >
            证据阶段 {state + 1}/{Math.max(visible.length, 1)}
            <input
              aria-label="证据阶段"
              type="range"
              min={0}
              max={Math.max(visible.length - 1, 0)}
              value={state}
              onChange={(event) => setState(Number(event.target.value))}
              style={{ width: "100%", accentColor: accent }}
            />
          </label>
          <label
            style={{
              display: "block",
              fontSize: 12,
              color: "#52525b",
              marginBottom: 10,
            }}
          >
            折扣 γ={(gamma / 100).toFixed(2)}
            <input
              aria-label="折扣因子"
              type="range"
              min={0}
              max={100}
              value={gamma}
              onChange={(event) => setGamma(Number(event.target.value))}
              style={{ width: "100%", accentColor: "#0f766e" }}
            />
          </label>
          <label
            style={{
              display: "block",
              fontSize: 12,
              color: "#52525b",
              marginBottom: 12,
            }}
          >
            探索 ε={(epsilon / 100).toFixed(2)}
            <input
              aria-label="探索率"
              type="range"
              min={0}
              max={80}
              value={epsilon}
              onChange={(event) => setEpsilon(Number(event.target.value))}
              style={{ width: "100%", accentColor: "#d97706" }}
            />
          </label>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12,
              color: fault ? "#b91c1c" : "#3f3f46",
            }}
          >
            <input
              type="checkbox"
              checked={fault}
              onChange={(event) => setFault(event.target.checked)}
            />
            注入终止/目标错位
          </label>
        </div>
        <div style={{ minWidth: 0 }}>
          {view === "map" ? (
            <svg
              viewBox="0 0 640 250"
              role="img"
              aria-label={title + "强化学习交互图"}
              style={{
                display: "block",
                width: "100%",
                height: "auto",
                minHeight: 190,
                background: "#fafafa",
                border: "1px solid #e4e4e7",
                borderRadius: 6,
              }}
            >
              <path
                d="M90 90 H540 V180 H90 Z"
                fill="none"
                stroke="#d4d4d8"
                strokeWidth="4"
              />
              {visible.slice(0, 4).map((concept, index) => {
                const pos = [
                  [90, 90],
                  [540, 90],
                  [540, 180],
                  [90, 180],
                ][index];
                const enabled = index <= state % 4;
                return (
                  <g key={concept}>
                    <circle
                      cx={pos[0]}
                      cy={pos[1]}
                      r={enabled ? 17 : 12}
                      fill={enabled ? accent : "#fff"}
                      stroke={
                        fault && index === state % 4
                          ? "#b91c1c"
                          : enabled
                            ? accent
                            : "#a1a1aa"
                      }
                      strokeWidth="3"
                    />
                    <text
                      x={pos[0]}
                      y={pos[1] + (index < 2 ? -27 : 34)}
                      textAnchor="middle"
                      fill="#3f3f46"
                      fontSize="11"
                    >
                      {concept.replace(/^.{0,12} /, "").slice(0, 10)}
                    </text>
                  </g>
                );
              })}
              <text
                x="315"
                y="139"
                textAnchor="middle"
                fill="#52525b"
                fontSize="13"
              >
                状态 → 动作 → 奖励 → 更新
              </text>
            </svg>
          ) : (
            <svg
              viewBox="0 0 640 250"
              role="img"
              aria-label={title + "更新证据曲线"}
              style={{
                display: "block",
                width: "100%",
                height: "auto",
                minHeight: 190,
                background: "#fafafa",
                border: "1px solid #e4e4e7",
                borderRadius: 6,
              }}
            >
              {[45, 95, 145, 195].map((y) => (
                <line key={y} x1="45" y1={y} x2="590" y2={y} stroke="#e4e4e7" />
              ))}
              <polyline
                points={points}
                fill="none"
                stroke={fault ? "#b91c1c" : accent}
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {metrics.map((item, index) => (
                <g key={item.label}>
                  <circle
                    cx={70 + index * 220}
                    cy={205 - item.value * 1.45}
                    r="7"
                    fill="#fff"
                    stroke={fault ? "#b91c1c" : accent}
                    strokeWidth="4"
                  />
                  <text
                    x={70 + index * 220}
                    y="229"
                    textAnchor="middle"
                    fill="#52525b"
                    fontSize="11"
                  >
                    {item.label}
                  </text>
                </g>
              ))}
            </svg>
          )}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,minmax(0,1fr))",
              gap: 6,
              marginTop: 8,
            }}
          >
            {metrics.map((item) => (
              <div
                key={item.label}
                style={{
                  borderTop:
                    "3px solid " + (item.value >= 60 ? accent : "#b91c1c"),
                  background: "#fafafa",
                  padding: "8px 4px",
                  textAlign: "center",
                  minWidth: 0,
                }}
              >
                <div style={{ fontSize: 11, color: "#71717a" }}>
                  {item.label}
                </div>
                <div style={{ fontSize: 15, fontWeight: 800 }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: 10,
          padding: "8px 10px",
          borderLeft: "4px solid " + (fault ? "#b91c1c" : accent),
          background: fault ? "#fef2f2" : "#f4f4f5",
          fontSize: 12,
          color: "#3f3f46",
        }}
      >
        {fault
          ? "故障路径：终止或目标已错位，应从环境reset与空缓存重放。"
          : "当前证据：" +
            (visible[state] ?? title) +
            "；先核对转移和目标，再检查更新与独立评价。"}
      </div>
    </div>
  );
}
