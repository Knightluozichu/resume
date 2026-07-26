"use client";

import { useMemo, useState } from "react";

type Props = {
  title: string;
  concepts: readonly string[];
  accent: string;
  view: "state" | "execution" | "evidence";
};

const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

export function OfficialMet2BookLab({ title, concepts, accent, view }: Props) {
  const labels = concepts.length
    ? concepts.slice(0, 6)
    : ["输入", "验证", "执行", "承诺", "最终化"];
  const [stage, setStage] = useState(0);
  const [gasLimit, setGasLimit] = useState(72);
  const [load, setLoad] = useState(48);
  const [fault, setFault] = useState(false);
  function resetExperiment() {
    setStage(0);
    setGasLimit(72);
    setLoad(48);
    setFault(false);
  }

  const gasUsed = Math.min(gasLimit + (fault ? 18 : 0), 18 + load);
  const finalized = !fault && stage >= Math.max(2, labels.length - 2);
  const metrics = useMemo(
    () => [
      { label: "输入与签名", value: clamp(96 - (fault ? 68 : 0)) },
      {
        label: "执行与Gas",
        value: clamp(100 - Math.abs(gasLimit - gasUsed) - (fault ? 24 : 0)),
      },
      {
        label: "状态与最终性",
        value: clamp(42 + stage * 12 + (finalized ? 18 : 0) - (fault ? 54 : 0)),
      },
    ],
    [fault, finalized, gasLimit, gasUsed, stage],
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
          {view === "state"
            ? "状态转换轨迹"
            : view === "execution"
              ? "Gas与执行实验"
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
            执行阶段 {stage + 1}/{labels.length}
            <input
              aria-label="执行阶段"
              type="range"
              min={0}
              max={Math.max(labels.length - 1, 0)}
              value={stage}
              onChange={(event) => setStage(Number(event.target.value))}
              style={{ width: "100%", accentColor: accent }}
            />
          </label>
          <label style={{ display: "block", fontSize: 12, marginBottom: 10 }}>
            Gas上限 {gasLimit}k
            <input
              aria-label="Gas上限"
              type="range"
              min={24}
              max={100}
              value={gasLimit}
              onChange={(event) => setGasLimit(Number(event.target.value))}
              style={{ width: "100%", accentColor: accent }}
            />
          </label>
          <label style={{ display: "block", fontSize: 12, marginBottom: 10 }}>
            状态负载 {load}%
            <input
              aria-label="状态负载"
              type="range"
              min={8}
              max={96}
              value={load}
              onChange={(event) => setLoad(Number(event.target.value))}
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
            注入错误链、签名、状态、数据或证明
          </label>
        </div>
        <div>
          {view === "state" ? (
            <svg
              viewBox="0 0 640 250"
              role="img"
              aria-label={title + "状态转换轨迹"}
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
                      fontSize="11"
                    >
                      {label.slice(0, 10)}
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
                输入 → 验证 → 执行 → 状态承诺 → PoS最终性
              </text>
            </svg>
          ) : view === "execution" ? (
            <svg
              viewBox="0 0 640 250"
              role="img"
              aria-label={title + "Gas与执行实验"}
              style={{
                width: "100%",
                minHeight: 190,
                background: "#fafafa",
                border: "1px solid #e4e4e7",
                borderRadius: 6,
              }}
            >
              {[
                { name: "栈与计算", value: load },
                { name: "内存与数据", value: Math.min(100, load + 14) },
                { name: "存储与状态", value: Math.min(100, load + 28) },
              ].map((item, index) => (
                <g key={item.name}>
                  <text x="48" y={62 + index * 64} fill="#3f3f46" fontSize="12">
                    {item.name}
                  </text>
                  <rect
                    x="155"
                    y={43 + index * 64}
                    width="410"
                    height="26"
                    rx="3"
                    fill="#e4e4e7"
                  />
                  <rect
                    x="155"
                    y={43 + index * 64}
                    width={(410 * item.value) / 100}
                    height="26"
                    rx="3"
                    fill={fault && index === 2 ? "#b91c1c" : accent}
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
                gasUsed {gasUsed}k / gasLimit {gasLimit}k
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
                "官方第二版来源与链ID",
                "原始输入与前状态",
                "解析、签名与执行轨迹",
                "边界与单故障证据",
                "状态根、收据与最终性",
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
