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

export function OfficialPrmlLab({ title, concepts, accent, view }: Props) {
  const [stage, setStage] = useState(0);
  const [noise, setNoise] = useState(28);
  const [budget, setBudget] = useState(64);
  const [fault, setFault] = useState(false);
  function resetExperiment() {
    setStage(0);
    setNoise(28);
    setBudget(64);
    setFault(false);
  }

  const visible = concepts.slice(0, 6);
  const metrics = useMemo(() => {
    const normalized = bounded(
      94 - Math.abs(noise - 30) * 0.45 - (fault ? 47 : 0),
    );
    const posterior = bounded(
      45 + budget * 0.58 - stage * 2 - (fault ? 35 : 0),
    );
    const predictive = bounded(
      86 - Math.abs(noise - 36) * 0.35 + budget * 0.1 - (fault ? 39 : 0),
    );
    return [
      { label: "归一化", value: normalized },
      { label: "后验一致", value: posterior },
      { label: "预测校准", value: predictive },
    ];
  }, [budget, fault, noise, stage]);
  const points = metrics
    .map(
      (item, index) =>
        String(75 + index * 220) + "," + String(205 - item.value * 1.45),
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
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
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
            ? "联合-推断-决策图"
            : view === "experiment"
              ? "单变量实验"
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
            推断阶段 {stage + 1}/{Math.max(visible.length, 1)}
            <input
              aria-label="推断阶段"
              type="range"
              min={0}
              max={Math.max(visible.length - 1, 0)}
              value={stage}
              onChange={(event) => setStage(Number(event.target.value))}
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
            观测噪声 {(noise / 100).toFixed(2)}
            <input
              aria-label="观测噪声"
              type="range"
              min={0}
              max={100}
              value={noise}
              onChange={(event) => setNoise(Number(event.target.value))}
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
            推断预算 {budget}
            <input
              aria-label="推断预算"
              type="range"
              min={8}
              max={100}
              value={budget}
              onChange={(event) => setBudget(Number(event.target.value))}
              style={{ width: "100%", accentColor: "#b45309" }}
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
            注入条件化/归一化故障
          </label>
        </div>
        <div style={{ minWidth: 0 }}>
          {view === "map" ? (
            <svg
              viewBox="0 0 640 250"
              role="img"
              aria-label={title + "概率证据图"}
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
                d="M70 125 H570"
                fill="none"
                stroke="#d4d4d8"
                strokeWidth="4"
              />
              {visible.slice(0, 5).map((concept, index) => {
                const x = 80 + index * 120;
                const enabled = index <= stage;
                return (
                  <g key={concept}>
                    <circle
                      cx={x}
                      cy="125"
                      r={enabled ? 17 : 12}
                      fill={enabled ? accent : "#fff"}
                      stroke={
                        fault && index === stage
                          ? "#b91c1c"
                          : enabled
                            ? accent
                            : "#a1a1aa"
                      }
                      strokeWidth="3"
                    />
                    <text
                      x={x}
                      y={index % 2 === 0 ? 88 : 171}
                      textAnchor="middle"
                      fill="#3f3f46"
                      fontSize="11"
                    >
                      {concept.slice(0, 9)}
                    </text>
                  </g>
                );
              })}
              <text
                x="320"
                y="220"
                textAnchor="middle"
                fill="#52525b"
                fontSize="13"
              >
                联合 → 学习 → 推断 → 预测 → 决策
              </text>
            </svg>
          ) : (
            <svg
              viewBox="0 0 640 250"
              role="img"
              aria-label={title + "推断证据曲线"}
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
                <line key={y} x1="45" y1={y} x2="595" y2={y} stroke="#e4e4e7" />
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
                    cx={75 + index * 220}
                    cy={205 - item.value * 1.45}
                    r="7"
                    fill="#fff"
                    stroke={fault ? "#b91c1c" : accent}
                    strokeWidth="4"
                  />
                  <text
                    x={75 + index * 220}
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
          ? "故障路径：条件集合、归一化或状态版本已错位，应从联合分布与空状态重放。"
          : "当前证据：" +
            (visible[stage] ?? title) +
            "；先核对联合和目标，再检查推断、预测与决策。"}
      </div>
    </div>
  );
}
