"use client";

import { useMemo, useState } from "react";

type Props = {
  title: string;
  concepts: readonly string[];
  accent: string;
  view: "ledger" | "consensus" | "evidence";
};

const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

export function OfficialBpBookLab({ title, concepts, accent, view }: Props) {
  const labels = concepts.length
    ? concepts.slice(0, 6)
    : ["输入", "验证", "提交"];
  const [stage, setStage] = useState(0);
  const [nodes, setNodes] = useState(7);
  const [confirmations, setConfirmations] = useState(3);
  const [fault, setFault] = useState(false);
  function resetExperiment() {
    setStage(0);
    setNodes(7);
    setConfirmations(3);
    setFault(false);
  }

  const metrics = useMemo(
    () => [
      { label: "链接完整", value: clamp(96 - (fault ? 64 : 0)) },
      {
        label: "规则一致",
        value: clamp(82 + confirmations * 3 - (fault ? 52 : 0)),
      },
      { label: "独立复核", value: clamp(70 + nodes * 2 - (fault ? 38 : 0)) },
    ],
    [confirmations, fault, nodes],
  );
  const quorum = Math.floor((nodes * 2) / 3) + 1;

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
          {view === "ledger"
            ? "状态链重放"
            : view === "consensus"
              ? "共识条件实验"
              : "发布证据门禁"}
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
            重放阶段 {stage + 1}/{labels.length}
            <input
              aria-label="重放阶段"
              type="range"
              min={0}
              max={Math.max(labels.length - 1, 0)}
              value={stage}
              onChange={(event) => setStage(Number(event.target.value))}
              style={{ width: "100%", accentColor: accent }}
            />
          </label>
          <label style={{ display: "block", fontSize: 12, marginBottom: 10 }}>
            验证节点 {nodes}
            <input
              aria-label="验证节点"
              type="range"
              min={4}
              max={16}
              value={nodes}
              onChange={(event) => setNodes(Number(event.target.value))}
              style={{ width: "100%", accentColor: accent }}
            />
          </label>
          <label style={{ display: "block", fontSize: 12, marginBottom: 10 }}>
            确认阈值 {confirmations}
            <input
              aria-label="确认阈值"
              type="range"
              min={1}
              max={8}
              value={confirmations}
              onChange={(event) => setConfirmations(Number(event.target.value))}
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
            注入签名、链接或共识故障
          </label>
        </div>
        <div>
          {view === "ledger" ? (
            <svg
              viewBox="0 0 640 250"
              role="img"
              aria-label={title + "状态链重放"}
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
                输入 → 验证 → 传播 → 排序 → 执行 → 提交
              </text>
            </svg>
          ) : view === "consensus" ? (
            <svg
              viewBox="0 0 640 250"
              role="img"
              aria-label={title + "共识条件实验"}
              style={{
                width: "100%",
                minHeight: 190,
                background: "#fafafa",
                border: "1px solid #e4e4e7",
                borderRadius: 6,
              }}
            >
              {Array.from({ length: nodes }, (_, index) => {
                const columns = 8;
                const x = 58 + (index % columns) * 72;
                const y = 56 + Math.floor(index / columns) * 70;
                const honest = !fault || index !== stage % nodes;
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="18"
                    fill={honest ? accent : "#b91c1c"}
                    opacity={index < quorum ? 0.95 : 0.38}
                  />
                );
              })}
              <text
                x="320"
                y="218"
                textAnchor="middle"
                fill="#52525b"
                fontSize="13"
              >
                门槛 {quorum}/{nodes} · 确认 {confirmations} · 故障{" "}
                {fault ? 1 : 0}
              </text>
            </svg>
          ) : (
            <svg
              viewBox="0 0 640 250"
              role="img"
              aria-label={title + "发布证据门禁"}
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
              ? "门禁失败：回到首个异常阶段，核对签名、前块摘要、消息、共识和状态提交。"
              : "门禁通过：当前轨迹具备来源、输入输出、拒绝路径和边界证据。"}
          </div>
        </div>
      </div>
    </div>
  );
}
