"use client";

import { useState, useCallback } from "react";

const C = {
  bg: "var(--bg)", elevated: "var(--bg-elevated)", border: "var(--border)",
  primary: "var(--text-primary)", secondary: "var(--text-secondary)",
  accent: "var(--accent)", danger: "var(--danger)", success: "var(--success)", warning: "var(--warning)",
} as const;

type Encoding = "int16" | "int32" | "int64";

const ENCODING_INFO: Record<Encoding, { bits: number; label: string; range: string }> = {
  int16: { bits: 2, label: "int16_t", range: "-32768 ~ 32767" },
  int32: { bits: 4, label: "int32_t", range: "-2^31 ~ 2^31-1" },
  int64: { bits: 8, label: "int64_t", range: "-2^63 ~ 2^63-1" },
};

function encodingFor(values: number[]): Encoding {
  if (values.some((v) => v < -32768 || v > 32767)) {
    if (values.some((v) => v < -2147483648 || v > 2147483647)) return "int64";
    return "int32";
  }
  return "int16";
}

const INITIAL = [10, 20, 30, 40, 50];

export function RdiIntsetLab() {
  const [values, setValues] = useState<number[]>(INITIAL);
  const [log, setLog] = useState<string[]>([
    "初始整数集合：{10, 20, 30, 40, 50}，编码 int16（每元素 2 字节）。",
  ]);

  const enc = encodingFor(values);
  const info = ENCODING_INFO[enc];
  const totalBytes = 8 + values.length * info.bits; // header 8B + 元素

  const addValue = useCallback(() => {
    // 依次添加会触发升级的值
    const candidates = [300, 70000, -40000, 2147483648, 1234567890123];
    for (const v of candidates) {
      if (!values.includes(v) && Math.abs(v) > 32767) {
        const next = [...values, v].sort((a, b) => a - b);
        setValues(next);
        const newEnc = encodingFor(next);
        setLog((prev) => [...prev, `添加 ${v}：超出当前 ${enc} 范围，触发升级到 ${newEnc}（每元素 ${ENCODING_INFO[newEnc].bits} 字节）。`]);
        return;
      }
    }
    // 都加过了，加个小值
    const maxV = Math.max(...values);
    const next = [...values, maxV + 10].sort((a, b) => a - b);
    setValues(next);
    setLog((prev) => [...prev, `添加 ${maxV + 10}：未超出范围，编码不变。`]);
  }, [values, enc]);

  const removeMax = useCallback(() => {
    if (values.length <= 3) return;
    const maxV = Math.max(...values);
    const next = values.filter((v) => v !== maxV);
    setValues(next);
    setLog((prev) => [...prev, `删除 ${maxV}：即使最大的 ${info.label} 元素被删，编码也不降级（只升不降）。`]);
  }, [values, info.label]);

  const reset = useCallback(() => {
    setValues(INITIAL);
    setLog(["初始整数集合：{10, 20, 30, 40, 50}，编码 int16（每元素 2 字节）。"]);
  }, []);

  const viewW = 820;
  const viewH = 340;
  const cellW = 52;
  const cellH = 34;
  const startX = 60;
  const y = 120;

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>⚡ 整数集合升级过程可视化</span>
        <button onClick={reset} className="rounded-control border border-border px-3 py-1 text-xs transition-colors hover:border-accent" style={{ color: C.secondary }}>重置</button>
      </div>
      <div className="p-4">
        <svg viewBox={`0 0 ${viewW} ${viewH}`} className="w-full" role="img" aria-label="整数集合">
          <text x={viewW / 2} y={36} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>
            intset：有序无重复数组 + 类型升级
          </text>
          <text x={viewW / 2} y={56} textAnchor="middle" fontSize={11} fill={C.secondary}>
            当前编码：{info.label}（每元素 {info.bits} 字节，范围 {info.range}）
          </text>

          {/* header 说明 */}
          <text x={startX} y={100} fontSize={11} fill={C.secondary}>
            encoding={enc} · length={values.length} · 总内存 {totalBytes} 字节
          </text>

          {/* 元素格 */}
          {values.map((v, i) => {
            const x = startX + i * (cellW + 6);
            const isBig = Math.abs(v) > 32767;
            return (
              <g key={`${v}-${i}`}>
                <rect
                  x={x} y={y} width={cellW} height={cellH} rx={4}
                  fill={isBig ? C.warning : C.accent}
                  stroke={isBig ? C.warning : C.accent}
                  strokeWidth={1.5}
                  opacity={0.9}
                />
                <text x={x + cellW / 2} y={y + cellH / 2 + 4} textAnchor="middle" fontSize={11} fill={C.bg} fontWeight={600} fontFamily="monospace">
                  {v > 999999 ? `${(v / 1e9).toFixed(1)}G` : v > 99999 ? `${(v / 1e6).toFixed(1)}M` : v}
                </text>
              </g>
            );
          })}

          {/* 字节占用标注 */}
          <text x={startX} y={y + cellH + 22} fontSize={11} fill={C.secondary}>
            每元素 {info.bits} 字节 × {values.length} = {values.length * info.bits} 字节（+ 8 字节头部）
          </text>

          {/* 升级提示 */}
          <text x={viewW / 2} y={y + cellH + 55} textAnchor="middle" fontSize={11} fill={C.secondary}>
            添加超出当前编码范围的元素时，整个数组一次性升级到更宽编码
          </text>
        </svg>

        {/* 操作 */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button
            onClick={addValue}
            className="rounded-control border border-accent px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent/10"
            style={{ color: C.accent, borderColor: C.accent }}
          >
            添加元素（含超范围值触发升级）
          </button>
          <button
            onClick={removeMax}
            disabled={values.length <= 3}
            className="rounded-control border border-warning px-3 py-1.5 text-xs font-medium transition-colors hover:bg-warning/10 disabled:opacity-40"
            style={{ color: C.warning, borderColor: C.warning }}
          >
            删除最大元素（观察不降级）
          </button>
          <button onClick={reset} className="rounded-control border border-border px-3 py-1.5 text-xs transition-colors" style={{ color: C.secondary }}>重置</button>
        </div>

        {/* 说明 */}
        <div className="mt-3 rounded-control border border-border p-3" style={{ background: C.bg }}>
          <div className="text-xs leading-relaxed" style={{ color: C.secondary }}>
            整数集合只支持整数且元素不多时使用（集合键配置 intset-max-entries 内）。升级后<b>不降级</b>：即使超宽元素被删除，编码保持更宽类型——避免频繁升降级的抖动成本。
          </div>
        </div>

        {/* 日志 */}
        <div className="mt-3 rounded-control border border-border p-3" style={{ background: C.bg }}>
          <div className="mb-1 text-xs font-semibold" style={{ color: C.primary }}>操作日志</div>
          <ol className="flex flex-col gap-1 text-xs" style={{ color: C.secondary }}>
            {log.map((line, i) => (
              <li key={i} className="leading-relaxed">
                <span className="mr-1 font-mono" style={{ color: C.accent }}>{i + 1}.</span>
                {line}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}