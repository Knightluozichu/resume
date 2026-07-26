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

export function OfficialGenerativeLab({
  title,
  concepts,
  accent,
  view,
}: Props) {
  const [stage, setStage] = useState(0);
  const [noise, setNoise] = useState(35);
  const [capacity, setCapacity] = useState(60);
  const [fault, setFault] = useState(false);
  function resetExperiment() {
    setStage(0);
    setNoise(35);
    setCapacity(60);
    setFault(false);
  }

  const visible = concepts.slice(0, 6);
  const metrics = useMemo(() => {
    const likelihood = bounded(
      82 - Math.abs(noise - 32) * 0.7 + capacity * 0.12 - (fault ? 42 : 0),
    );
    const objective = bounded(
      58 + capacity * 0.45 - stage * 2 - (fault ? 38 : 0),
    );
    const sample = bounded(
      72 - Math.abs(noise - 40) * 0.45 + capacity * 0.18 - (fault ? 34 : 0),
    );
    return [
      { label: "密度一致", value: likelihood },
      { label: "目标一致", value: objective },
      { label: "采样一致", value: sample },
    ];
  }, [capacity, fault, noise, stage]);
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
            ? "分布-目标-采样图"
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
            证据阶段 {stage + 1}/{Math.max(visible.length, 1)}
            <input
              aria-label="证据阶段"
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
            噪声强度 {(noise / 100).toFixed(2)}
            <input
              aria-label="噪声强度"
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
            模型容量 {capacity}
            <input
              aria-label="模型容量"
              type="range"
              min={10}
              max={100}
              value={capacity}
              onChange={(event) => setCapacity(Number(event.target.value))}
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
            注入shape/时间步错位
          </label>
        </div>
        <div style={{ minWidth: 0 }}>
          {view === "map" ? (
            <svg
              viewBox="0 0 640 250"
              role="img"
              aria-label={title + "生成模型证据图"}
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
                d="M80 125 H560"
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
                      {concept.replace(/^.{0,12} /, "").slice(0, 9)}
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
                数据 → 分布 → 目标 → 更新 → 采样
              </text>
            </svg>
          ) : (
            <svg
              viewBox="0 0 640 250"
              role="img"
              aria-label={title + "证据曲线"}
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
          ? "故障路径：shape、参数版本或时间步已错位，应从原始输入与空状态重放。"
          : "当前证据：" +
            (visible[stage] ?? title) +
            "；先核对分布和目标，再检查更新与独立采样。"}
      </div>
    </div>
  );
}
