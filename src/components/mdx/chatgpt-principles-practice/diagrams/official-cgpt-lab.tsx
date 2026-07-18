"use client";

import { useMemo, useState } from "react";

type Props = {
  title: string;
  concepts: readonly string[];
  accent: string;
  view: "architecture" | "training" | "evidence";
};

const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

export function OfficialCgptLab({ title, concepts, accent, view }: Props) {
  const [stage, setStage] = useState(0);
  const [tokens, setTokens] = useState(640);
  const [reward, setReward] = useState(45);
  const [fault, setFault] = useState(false);
  const labels = concepts.slice(0, 6);
  const curve = useMemo(
    () =>
      [0, 1, 2, 3, 4, 5].map((index) =>
        clamp(
          24 +
            index * 12 +
            tokens / 70 +
            reward / 8 -
            (fault && index >= stage ? 34 : 0),
        ),
      ),
    [fault, reward, stage, tokens],
  );
  const metrics = [
    { label: "数据可追溯", value: clamp(96 - (fault ? 58 : 0)) },
    {
      label: "策略稳定",
      value: clamp(88 - Math.abs(reward - 45) / 2 - (fault ? 24 : 0)),
    },
    { label: "评测隔离", value: clamp(76 + stage * 4 - (fault ? 51 : 0)) },
  ];

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
          gap: 10,
          flexWrap: "wrap",
          marginBottom: 12,
        }}
      >
        <strong style={{ fontSize: 14 }}>{title}</strong>
        <span style={{ fontSize: 12, color: "#52525b" }}>
          {view === "architecture"
            ? "模型结构"
            : view === "training"
              ? "训练轨迹"
              : "证据门禁"}
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
            证据阶段 {stage + 1}/{Math.max(labels.length, 1)}
            <input
              aria-label="证据阶段"
              type="range"
              min={0}
              max={Math.max(labels.length - 1, 0)}
              value={stage}
              onChange={(event) => setStage(Number(event.target.value))}
              style={{ width: "100%", accentColor: accent }}
            />
          </label>
          <label style={{ display: "block", fontSize: 12, marginBottom: 10 }}>
            词元预算 {tokens}
            <input
              aria-label="词元预算"
              type="range"
              min={160}
              max={1280}
              step={80}
              value={tokens}
              onChange={(event) => setTokens(Number(event.target.value))}
              style={{ width: "100%", accentColor: "#0f766e" }}
            />
          </label>
          <label style={{ display: "block", fontSize: 12, marginBottom: 12 }}>
            奖励权重 {reward}
            <input
              aria-label="奖励权重"
              type="range"
              min={0}
              max={100}
              value={reward}
              onChange={(event) => setReward(Number(event.target.value))}
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
              onChange={(event) => setFault(event.target.checked)}
            />
            注入数据、mask或奖励故障
          </label>
        </div>
        <div>
          {view === "architecture" ? (
            <svg
              viewBox="0 0 640 250"
              role="img"
              aria-label={title + "模型结构"}
              style={{
                width: "100%",
                minHeight: 190,
                background: "#fafafa",
                border: "1px solid #e4e4e7",
                borderRadius: 6,
              }}
            >
              <path
                d="M60 126 H580"
                fill="none"
                stroke="#d4d4d8"
                strokeWidth="4"
              />
              {labels.map((label, index) => {
                const x = 70 + index * (500 / Math.max(labels.length - 1, 1));
                const active = index <= stage;
                return (
                  <g key={label}>
                    <circle
                      cx={x}
                      cy="126"
                      r={active ? 16 : 11}
                      fill={active ? accent : "#fff"}
                      stroke={
                        fault && index === stage
                          ? "#b91c1c"
                          : active
                            ? accent
                            : "#a1a1aa"
                      }
                      strokeWidth="3"
                    />
                    <text
                      x={x}
                      y={index % 2 === 0 ? 88 : 172}
                      textAnchor="middle"
                      fill="#3f3f46"
                      fontSize="10"
                    >
                      {label.slice(0, 8)}
                    </text>
                  </g>
                );
              })}
              <text
                x="320"
                y="224"
                textAnchor="middle"
                fill="#52525b"
                fontSize="13"
              >
                数据 → 词元 → 表示 → 目标 → 训练 → 评测
              </text>
            </svg>
          ) : view === "training" ? (
            <svg
              viewBox="0 0 640 250"
              role="img"
              aria-label={title + "训练轨迹"}
              style={{
                width: "100%",
                minHeight: 190,
                background: "#fafafa",
                border: "1px solid #e4e4e7",
                borderRadius: 6,
              }}
            >
              <polyline
                points={curve
                  .map(
                    (value, index) =>
                      55 + index * 105 + "," + (215 - value * 1.65),
                  )
                  .join(" ")}
                fill="none"
                stroke={fault ? "#b91c1c" : accent}
                strokeWidth="5"
              />
              {curve.map((value, index) => (
                <g key={index}>
                  <circle
                    cx={55 + index * 105}
                    cy={215 - value * 1.65}
                    r="6"
                    fill={fault && index >= stage ? "#b91c1c" : accent}
                  />
                  <text
                    x={55 + index * 105}
                    y="232"
                    textAnchor="middle"
                    fill="#52525b"
                    fontSize="11"
                  >
                    轮次 {index + 1}
                  </text>
                </g>
              ))}
            </svg>
          ) : (
            <svg
              viewBox="0 0 640 250"
              role="img"
              aria-label={title + "证据门禁"}
              style={{
                width: "100%",
                minHeight: 190,
                background: "#fafafa",
                border: "1px solid #e4e4e7",
                borderRadius: 6,
              }}
            >
              {metrics.map((item, index) => (
                <g key={item.label}>
                  <rect
                    x={80 + index * 185}
                    y={205 - item.value * 1.55}
                    width="95"
                    height={item.value * 1.55}
                    fill={item.value >= 60 ? accent : "#b91c1c"}
                    opacity="0.82"
                  />
                  <text
                    x={127 + index * 185}
                    y="226"
                    textAnchor="middle"
                    fill="#52525b"
                    fontSize="11"
                  >
                    {item.label}
                  </text>
                  <text
                    x={127 + index * 185}
                    y={194 - item.value * 1.55}
                    textAnchor="middle"
                    fill="#18181b"
                    fontSize="12"
                  >
                    {item.value}
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
                <strong style={{ fontSize: 13 }}>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
