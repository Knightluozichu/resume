"use client";

import { useMemo, useState } from "react";

type View = "map" | "experiment" | "evidence";

type OfficialNlpLabProps = {
  title: string;
  concepts: readonly string[];
  accent: string;
  view: View;
};

function metric(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function OfficialNlpLab({
  title,
  concepts,
  accent,
  view,
}: OfficialNlpLabProps) {
  const [active, setActive] = useState(0);
  const [windowSize, setWindowSize] = useState(3);
  const [temperature, setTemperature] = useState(70);
  const [fault, setFault] = useState(false);
  function resetExperiment() {
    setActive(0);
    setWindowSize(3);
    setTemperature(70);
    setFault(false);
  }

  const visible = concepts.slice(0, 6);
  const values = useMemo(() => {
    const span = windowSize * 7;
    const confidence = metric(
      91 - Math.abs(temperature - 62) * 0.45 - (fault ? 31 : 0),
    );
    const gradient = metric(84 - active * 4 - (fault ? 43 : 0));
    const alignment = metric(
      55 + span * 0.9 - Math.abs(temperature - 70) * 0.3 - (fault ? 36 : 0),
    );
    return { confidence, gradient, alignment };
  }, [active, fault, temperature, windowSize]);

  const chart = [
    values.confidence,
    values.gradient,
    values.alignment,
    metric((values.confidence + values.alignment) / 2),
  ];
  const points = chart
    .map(
      (value, index) =>
        String(55 + index * 155) + "," + String(205 - value * 1.45),
    )
    .join(" ");

  return (
    <div
      style={{
        border: "1px solid #d4d4d8",
        borderRadius: 6,
        background: "#ffffff",
        padding: 14,
        color: "#18181b",
      }}
    >
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          marginBottom: 12,
        }}
      >
        <strong style={{ fontSize: 14 }}>{title}</strong>
        <span style={{ color: "#52525b", fontSize: 12 }}>
          {view === "map"
            ? "对象与数据流"
            : view === "experiment"
              ? "单变量实验"
              : "证据核对"}
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
            证据阶段 {active + 1}/{Math.max(visible.length, 1)}
            <input
              aria-label="证据阶段"
              type="range"
              min={0}
              max={Math.max(visible.length - 1, 0)}
              value={active}
              onChange={(event) => setActive(Number(event.target.value))}
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
            上下文/截断窗口 {windowSize}
            <input
              aria-label="上下文窗口"
              type="range"
              min={1}
              max={8}
              value={windowSize}
              onChange={(event) => setWindowSize(Number(event.target.value))}
              style={{ width: "100%", accentColor: "#d97706" }}
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
            归一化温度 {(temperature / 100).toFixed(2)}
            <input
              aria-label="归一化温度"
              type="range"
              min={20}
              max={140}
              value={temperature}
              onChange={(event) => setTemperature(Number(event.target.value))}
              style={{ width: "100%", accentColor: "#0f766e" }}
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
            注入轴/状态错位
          </label>
        </div>

        <div style={{ minWidth: 0 }}>
          {view === "map" ? (
            <svg
              viewBox="0 0 640 250"
              role="img"
              aria-label={title + "对象数据流"}
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
              <line
                x1="55"
                y1="115"
                x2="585"
                y2="115"
                stroke="#d4d4d8"
                strokeWidth="4"
              />
              {visible.map((concept, index) => {
                const x = 55 + index * (530 / Math.max(visible.length - 1, 1));
                const enabled = index <= active;
                return (
                  <g key={concept}>
                    <circle
                      cx={x}
                      cy="115"
                      r={enabled ? 16 : 11}
                      fill={enabled ? accent : "#ffffff"}
                      stroke={
                        fault && index === active
                          ? "#b91c1c"
                          : enabled
                            ? accent
                            : "#a1a1aa"
                      }
                      strokeWidth="3"
                    />
                    <text
                      x={x}
                      y={index % 2 ? 160 : 76}
                      textAnchor="middle"
                      fill="#3f3f46"
                      fontSize="11"
                    >
                      {concept.replace(/^.{0,12} /, "").slice(0, 9)}
                    </text>
                  </g>
                );
              })}
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
              {[40, 90, 140, 190].map((y) => (
                <line
                  key={y}
                  x1="45"
                  y1={y}
                  x2="595"
                  y2={y}
                  stroke="#e4e4e7"
                  strokeWidth="1"
                />
              ))}
              <polyline
                points={points}
                fill="none"
                stroke={fault ? "#b91c1c" : accent}
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {chart.map((value, index) => (
                <circle
                  key={index}
                  cx={55 + index * 155}
                  cy={205 - value * 1.45}
                  r="7"
                  fill="#ffffff"
                  stroke={fault ? "#b91c1c" : accent}
                  strokeWidth="4"
                />
              ))}
              {["归一化", "梯度", "对齐", "重放"].map((label, index) => (
                <text
                  key={label}
                  x={55 + index * 155}
                  y="228"
                  textAnchor="middle"
                  fill="#52525b"
                  fontSize="11"
                >
                  {label}
                </text>
              ))}
            </svg>
          )}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 6,
              marginTop: 8,
            }}
          >
            {[
              ["归一化", values.confidence],
              ["梯度", values.gradient],
              ["对齐", values.alignment],
            ].map(([label, value]) => (
              <div
                key={String(label)}
                style={{
                  borderTop:
                    "3px solid " + (Number(value) >= 60 ? accent : "#b91c1c"),
                  background: "#fafafa",
                  padding: "8px 4px",
                  textAlign: "center",
                  minWidth: 0,
                }}
              >
                <div style={{ fontSize: 11, color: "#71717a" }}>{label}</div>
                <div style={{ fontSize: 15, fontWeight: 800 }}>{value}</div>
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
          ? "故障路径：首个中间证据已偏离，应清空词表缓存、梯度与循环状态后从固定输入重放。"
          : "当前证据：" +
            (visible[active] ?? title) +
            "；先核对shape和归一化，再检查梯度、状态与独立评价。"}
      </div>
    </div>
  );
}
