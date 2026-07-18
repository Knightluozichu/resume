"use client";

import { useMemo, useState } from "react";

type Props = {
  title: string;
  concepts: readonly string[];
  accent: string;
  view: "transaction" | "proof" | "evidence";
};

const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

export function OfficialMbt3BookLab({ title, concepts, accent, view }: Props) {
  const labels = concepts.length
    ? concepts.slice(0, 6)
    : ["构造", "验证", "确认"];
  const [stage, setStage] = useState(0);
  const [inputs, setInputs] = useState(2);
  const [feeRate, setFeeRate] = useState(8);
  const [fault, setFault] = useState(false);
  const virtualBytes = 68 * inputs + 2 * 31 + 11;
  const fee = virtualBytes * feeRate;
  const confirmations = Math.max(0, Math.min(6, stage + 1 - (fault ? 2 : 0)));
  const metrics = useMemo(
    () => [
      { label: "序列化与引用", value: clamp(98 - (fault ? 64 : 0)) },
      { label: "脚本与价值", value: clamp(78 + inputs * 5 - (fault ? 48 : 0)) },
      {
        label: "链与独立复核",
        value: clamp(62 + confirmations * 6 - (fault ? 38 : 0)),
      },
    ],
    [confirmations, fault, inputs],
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
          {view === "transaction"
            ? "交易到确认"
            : view === "proof"
              ? "费用与证明实验"
              : "独立发布门禁"}
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
            输入数量 {inputs}
            <input
              aria-label="输入数量"
              type="range"
              min={1}
              max={6}
              value={inputs}
              onChange={(event) => setInputs(Number(event.target.value))}
              style={{ width: "100%", accentColor: accent }}
            />
          </label>
          <label style={{ display: "block", fontSize: 12, marginBottom: 10 }}>
            费率 {feeRate} sat/vB
            <input
              aria-label="费率"
              type="range"
              min={1}
              max={30}
              value={feeRate}
              onChange={(event) => setFeeRate(Number(event.target.value))}
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
            注入网络、签名、脚本或链接故障
          </label>
        </div>
        <div>
          {view === "transaction" ? (
            <svg
              viewBox="0 0 640 250"
              role="img"
              aria-label={title + "交易到确认"}
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
                选币 → 序列化 → 签名 → 传播 → 入块 → 确认
              </text>
            </svg>
          ) : view === "proof" ? (
            <svg
              viewBox="0 0 640 250"
              role="img"
              aria-label={title + "费用与证明实验"}
              style={{
                width: "100%",
                minHeight: 190,
                background: "#fafafa",
                border: "1px solid #e4e4e7",
                borderRadius: 6,
              }}
            >
              {Array.from({ length: inputs + 2 }, (_, index) => {
                const x = 82 + (index % 4) * 150;
                const y = 62 + Math.floor(index / 4) * 82;
                return (
                  <rect
                    key={index}
                    x={x - 25}
                    y={y - 16}
                    width="50"
                    height="32"
                    rx="4"
                    fill={
                      fault && index === stage % (inputs + 2)
                        ? "#b91c1c"
                        : accent
                    }
                    opacity={index <= inputs ? 0.92 : 0.46}
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
                {virtualBytes} vB · {feeRate} sat/vB · 费用 {fee} sat · 确认{" "}
                {confirmations}
              </text>
            </svg>
          ) : (
            <svg
              viewBox="0 0 640 250"
              role="img"
              aria-label={title + "独立发布门禁"}
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
              ? "门禁失败：停在首个异常对象，核对网络、字节序、UTXO、脚本、签名、PoW和确认。"
              : "门禁通过：当前轨迹具备来源、版本、原始对象、边界和失败证据。"}
          </div>
        </div>
      </div>
    </div>
  );
}
