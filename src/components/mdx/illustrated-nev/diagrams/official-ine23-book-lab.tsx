"use client";

import { useMemo, useState } from "react";

type Props = {
  title: string;
  concepts: readonly string[];
  accent: string;
  view: "energy" | "component" | "evidence";
};

const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

export function OfficialIne23BookLab({ title, concepts, accent, view }: Props) {
  const labels = concepts.length
    ? concepts.slice(0, 6)
    : ["能源", "储存", "转换", "驱动", "车轮"];
  const [stage, setStage] = useState(0);
  const [load, setLoad] = useState(54);
  const [temperature, setTemperature] = useState(32);
  const [fault, setFault] = useState(false);
  const thermalPenalty = Math.max(0, Math.abs(temperature - 28) * 1.2);
  const wheelPower = clamp(load * 0.82 - thermalPenalty - (fault ? 36 : 0));
  const metrics = useMemo(
    () => [
      { label: "能源与接口", value: clamp(96 - (fault ? 62 : 0)) },
      {
        label: "功率与热余量",
        value: clamp(100 - thermalPenalty - load * 0.18),
      },
      { label: "安全与证据", value: clamp(45 + stage * 11 - (fault ? 48 : 0)) },
    ],
    [fault, load, stage, thermalPenalty],
  );

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
          {view === "energy"
            ? "能源到车轮"
            : view === "component"
              ? "部件与工况"
              : "独立安全门禁"}
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
            能量阶段 {stage + 1}/{labels.length}
            <input
              aria-label="能量阶段"
              type="range"
              min={0}
              max={Math.max(labels.length - 1, 0)}
              value={stage}
              onChange={(event) => setStage(Number(event.target.value))}
              style={{ width: "100%", accentColor: accent }}
            />
          </label>
          <label style={{ display: "block", fontSize: 12, marginBottom: 10 }}>
            负载 {load}%
            <input
              aria-label="负载"
              type="range"
              min={10}
              max={96}
              value={load}
              onChange={(event) => setLoad(Number(event.target.value))}
              style={{ width: "100%", accentColor: accent }}
            />
          </label>
          <label style={{ display: "block", fontSize: 12, marginBottom: 10 }}>
            温度 {temperature}°C
            <input
              aria-label="温度"
              type="range"
              min={-20}
              max={75}
              value={temperature}
              onChange={(event) => setTemperature(Number(event.target.value))}
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
            注入传感器、阀门、接触器或冷却故障
          </label>
        </div>
        <div>
          {view === "energy" ? (
            <svg
              viewBox="0 0 640 250"
              role="img"
              aria-label={title + "能源到车轮"}
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
                return (
                  <g key={label + index}>
                    <rect
                      x={x - 19}
                      y="107"
                      width="38"
                      height="38"
                      rx="4"
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
                      y={index % 2 === 0 ? 87 : 176}
                      textAnchor="middle"
                      fill="#3f3f46"
                      fontSize="10"
                    >
                      {label.slice(0, 10)}
                    </text>
                  </g>
                );
              })}
              <text
                x="320"
                y="225"
                textAnchor="middle"
                fill="#52525b"
                fontSize="13"
              >
                能源 → 储存 → 变换 → 执行 → 车轮 · {wheelPower}%
              </text>
            </svg>
          ) : view === "component" ? (
            <svg
              viewBox="0 0 640 250"
              role="img"
              aria-label={title + "部件与工况"}
              style={{
                width: "100%",
                minHeight: 190,
                background: "#fafafa",
                border: "1px solid #e4e4e7",
                borderRadius: 6,
              }}
            >
              {[
                { name: "能源或介质", value: 92 },
                { name: "转换与驱动", value: wheelPower },
                { name: "热与安全余量", value: clamp(100 - thermalPenalty) },
              ].map((item, index) => (
                <g key={item.name}>
                  <text x="44" y={62 + index * 64} fill="#3f3f46" fontSize="12">
                    {item.name}
                  </text>
                  <rect
                    x="160"
                    y={43 + index * 64}
                    width="400"
                    height="26"
                    rx="3"
                    fill="#e4e4e7"
                  />
                  <rect
                    x="160"
                    y={43 + index * 64}
                    width={(400 * item.value) / 100}
                    height="26"
                    rx="3"
                    fill={fault && index === 1 ? "#b91c1c" : accent}
                  />
                </g>
              ))}
              <text
                x="320"
                y="232"
                textAnchor="middle"
                fill="#52525b"
                fontSize="13"
              >
                负载 {load}% · 温度 {temperature}°C · 轮端 {wheelPower}%
              </text>
            </svg>
          ) : (
            <div
              style={{
                minHeight: 190,
                border: "1px solid #e4e4e7",
                borderRadius: 6,
                padding: 12,
                background: "#fafafa",
              }}
            >
              {[
                "2023版与车型年款",
                "能源、介质与连接拓扑",
                "输入输出和损失测点",
                "边界与单故障样本",
                "安全状态与独立复核",
              ].map((item, index) => {
                const passed = !fault && index <= stage;
                return (
                  <div
                    key={item}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "24px 1fr 54px",
                      alignItems: "center",
                      gap: 8,
                      minHeight: 32,
                      borderBottom: index === 4 ? "none" : "1px solid #e4e4e7",
                      fontSize: 12,
                    }}
                  >
                    <span
                      style={{
                        color: passed
                          ? accent
                          : fault && index === stage
                            ? "#b91c1c"
                            : "#71717a",
                      }}
                    >
                      {passed ? "✓" : "○"}
                    </span>
                    <span>{item}</span>
                    <strong
                      style={{
                        color: passed ? accent : "#71717a",
                        textAlign: "right",
                      }}
                    >
                      {passed ? "通过" : "待验"}
                    </strong>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,minmax(0,1fr))",
          gap: 8,
          marginTop: 12,
        }}
      >
        {metrics.map((metric) => (
          <div
            key={metric.label}
            style={{
              borderTop:
                "3px solid " + (metric.value >= 70 ? accent : "#b91c1c"),
              background: "#fafafa",
              padding: 8,
              minWidth: 0,
            }}
          >
            <div style={{ fontSize: 11, color: "#52525b" }}>{metric.label}</div>
            <strong style={{ fontSize: 16 }}>{metric.value}%</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
