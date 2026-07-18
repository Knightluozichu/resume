"use client";

import { useMemo, useState } from "react";

type Props = {
  title: string;
  concepts: readonly string[];
  accent: string;
  view: "pipeline" | "state" | "evidence";
};

const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

export function OfficialBdpBookLab({ title, concepts, accent, view }: Props) {
  const labels = concepts.length
    ? concepts.slice(0, 6)
    : ["输入", "验证", "提交"];
  const [stage, setStage] = useState(0);
  const [peers, setPeers] = useState(5);
  const [budget, setBudget] = useState(72);
  const [fault, setFault] = useState(false);
  const metrics = useMemo(
    () => [
      { label: "版本与来源", value: clamp(96 - (fault ? 42 : 0)) },
      { label: "状态可重放", value: clamp(58 + peers * 5 - (fault ? 55 : 0)) },
      { label: "边界与失败", value: clamp(48 + budget / 2 - (fault ? 36 : 0)) },
    ],
    [budget, fault, peers],
  );
  const quorum = Math.floor((peers * 2) / 3) + 1;

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
          {view === "pipeline"
            ? "请求到确认"
            : view === "state"
              ? "资源与节点实验"
              : "独立证据门禁"}
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
            处理阶段 {stage + 1}/{labels.length}
            <input
              aria-label="处理阶段"
              type="range"
              min={0}
              max={Math.max(labels.length - 1, 0)}
              value={stage}
              onChange={(event) => setStage(Number(event.target.value))}
              style={{ width: "100%", accentColor: accent }}
            />
          </label>
          <label style={{ display: "block", fontSize: 12, marginBottom: 10 }}>
            验证节点 {peers}
            <input
              aria-label="验证节点"
              type="range"
              min={3}
              max={12}
              value={peers}
              onChange={(event) => setPeers(Number(event.target.value))}
              style={{ width: "100%", accentColor: accent }}
            />
          </label>
          <label style={{ display: "block", fontSize: 12, marginBottom: 10 }}>
            资源预算 {budget}%
            <input
              aria-label="资源预算"
              type="range"
              min={20}
              max={100}
              value={budget}
              onChange={(event) => setBudget(Number(event.target.value))}
              style={{ width: "100%", accentColor: accent }}
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
            注入签名、网络或状态故障
          </label>
        </div>
        <div>
          {view === "pipeline" ? (
            <svg
              viewBox="0 0 640 250"
              role="img"
              aria-label={title + "请求到确认"}
              style={{
                width: "100%",
                minHeight: 190,
                background: "#fafafa",
                border: "1px solid #e4e4e7",
                borderRadius: 6,
              }}
            >
              <path
                d="M58 126 H582"
                fill="none"
                stroke="#d4d4d8"
                strokeWidth="4"
              />
              {labels.map((label, index) => {
                const x = 70 + index * (500 / Math.max(labels.length - 1, 1));
                const active = index <= stage;
                const broken = fault && index === stage;
                return (
                  <g key={label + index}>
                    <rect
                      x={x - 18}
                      y="108"
                      width="36"
                      height="36"
                      rx="4"
                      fill={active ? accent : "#fff"}
                      stroke={broken ? "#b91c1c" : active ? accent : "#a1a1aa"}
                      strokeWidth="3"
                    />
                    <text
                      x={x}
                      y={index % 2 === 0 ? 88 : 174}
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
                构造 → 验证 → 执行 → 回执 → 确认 → 复核
              </text>
            </svg>
          ) : view === "state" ? (
            <svg
              viewBox="0 0 640 250"
              role="img"
              aria-label={title + "资源与节点实验"}
              style={{
                width: "100%",
                minHeight: 190,
                background: "#fafafa",
                border: "1px solid #e4e4e7",
                borderRadius: 6,
              }}
            >
              {Array.from({ length: peers }, (_, index) => {
                const x = 62 + (index % 6) * 100;
                const y = 70 + Math.floor(index / 6) * 78;
                const valid = !fault || index !== stage % peers;
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r={14 + budget / 12}
                    fill={valid ? accent : "#b91c1c"}
                    opacity={index < quorum ? 0.94 : 0.38}
                  />
                );
              })}
              <text
                x="320"
                y="224"
                textAnchor="middle"
                fill="#52525b"
                fontSize="13"
              >
                门槛 {quorum}/{peers} · 预算 {budget}% · 故障 {fault ? 1 : 0}
              </text>
            </svg>
          ) : (
            <svg
              viewBox="0 0 640 250"
              role="img"
              aria-label={title + "独立证据门禁"}
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
              marginTop: 10,
              padding: 10,
              borderLeft: "3px solid " + (fault ? "#b91c1c" : accent),
              background: fault ? "#fef2f2" : "#f4f4f5",
              fontSize: 12,
              lineHeight: 1.65,
            }}
          >
            {fault
              ? "门禁失败：停在首个异常阶段，核对版本、网络、签名、执行、回执和状态。"
              : "门禁通过：当前轨迹具备来源、版本、输入输出、边界和失败证据。"}
          </div>
        </div>
      </div>
    </div>
  );
}
