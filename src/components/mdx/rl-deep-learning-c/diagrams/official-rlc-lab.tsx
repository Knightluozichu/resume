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

export function OfficialRlcLab({ title, concepts, accent, view }: Props) {
  const [stage, setStage] = useState(0);
  const [epsilon, setEpsilon] = useState(24);
  const [rate, setRate] = useState(45);
  const [fault, setFault] = useState(false);
  function resetExperiment() {
    setStage(0);
    setEpsilon(24);
    setRate(45);
    setFault(false);
  }

  const visible = concepts.slice(0, 6);
  const metrics = useMemo(
    () => [
      {
        label: "边界正确",
        value: bounded(94 - epsilon * 0.12 - (fault ? 48 : 0)),
      },
      {
        label: "更新一致",
        value: bounded(58 + rate * 0.45 - stage * 2 - (fault ? 40 : 0)),
      },
      {
        label: "独立重放",
        value: bounded(88 - Math.abs(epsilon - 20) * 0.25 - (fault ? 36 : 0)),
      },
    ],
    [epsilon, fault, rate, stage],
  );
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
          gap: 10,
          flexWrap: "wrap",
          marginBottom: 12,
        }}
      >
        <strong style={{ fontSize: 14 }}>{title}</strong>
        <span style={{ fontSize: 12, color: "#52525b" }}>
          {view === "map"
            ? "环境-更新-网络图"
            : view === "experiment"
              ? "单变量实验"
              : "独立证据"}
        </span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 12,
        }}
      >
        <div>
          <label style={{ display: "block", fontSize: 12, marginBottom: 10 }}>
            证据阶段 {stage + 1}/{Math.max(visible.length, 1)}
            <input
              aria-label="证据阶段"
              type="range"
              min={0}
              max={Math.max(visible.length - 1, 0)}
              value={stage}
              onChange={(e) => setStage(Number(e.target.value))}
              style={{ width: "100%", accentColor: accent }}
            />
          </label>
          <label style={{ display: "block", fontSize: 12, marginBottom: 10 }}>
            探索率 {(epsilon / 100).toFixed(2)}
            <input
              aria-label="探索率"
              type="range"
              min={0}
              max={100}
              value={epsilon}
              onChange={(e) => setEpsilon(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#0f766e" }}
            />
          </label>
          <label style={{ display: "block", fontSize: 12, marginBottom: 12 }}>
            学习率 {(rate / 100).toFixed(2)}
            <input
              aria-label="学习率"
              type="range"
              min={1}
              max={100}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#b45309" }}
            />
          </label>
          <label
            style={{
              display: "flex",
              gap: 8,
              fontSize: 12,
              color: fault ? "#b91c1c" : "#3f3f46",
            }}
          >
            <input
              type="checkbox"
              checked={fault}
              onChange={(e) => setFault(e.target.checked)}
            />
            注入索引/终止故障
          </label>
        </div>
        <div>
          {view === "map" ? (
            <svg
              viewBox="0 0 640 250"
              role="img"
              aria-label={title + "C实现证据图"}
              style={{
                width: "100%",
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
                环境 → Q目标 → 前向 → 反向 → 评价
              </text>
            </svg>
          ) : (
            <svg
              viewBox="0 0 640 250"
              role="img"
              aria-label={title + "证据曲线"}
              style={{
                width: "100%",
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
        }}
      >
        {fault
          ? "故障路径：索引、合法动作或终止状态已错位，应从清零内存重放。"
          : "当前证据：" +
            (visible[stage] ?? title) +
            "；先核对环境和目标，再检查前向、反向与评价。"}
      </div>
    </div>
  );
}
