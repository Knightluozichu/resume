"use client";

import { useState, useCallback } from "react";

const C = {
  bg: "var(--bg)", elevated: "var(--bg-elevated)", border: "var(--border)",
  primary: "var(--text-primary)", secondary: "var(--text-secondary)",
  accent: "var(--accent)", danger: "var(--danger)", success: "var(--success)", warning: "var(--warning)",
} as const;

const HT0_SIZE = 4;
const HT1_SIZE = 8;

// 模拟数据：ht0 每个桶的键数量
function initBuckets(size: number): number[] {
  const fixed = [2, 1, 3, 2, 1, 2, 1, 3];
  return Array.from({ length: size }, (_, i) => fixed[i] ?? 1);
}

export function RdiDictRehashLab() {
  const [ht0, setHt0] = useState(() => initBuckets(HT0_SIZE));
  const [ht1, setHt1] = useState(() => new Array(HT1_SIZE).fill(0));
  const [idx, setIdx] = useState(0); // 0..HT0_SIZE, HT0_SIZE = done
  const [log, setLog] = useState<string[]>([
    "初始状态：ht[0] 有 4 个桶，ht[1] 有 8 个桶（rehash 目标）。rehashidx=0 表示搬迁从桶 0 开始。",
  ]);

  const step = useCallback(() => {
    if (idx >= HT0_SIZE) return;
    setIdx((prev) => prev + 1);
    const bucketIdx = idx;
    setHt0((prev) => {
      const next = [...prev];
      const moved = next[bucketIdx];
      next[bucketIdx] = 0;
      setHt1((prev1) => {
        const next1 = [...prev1];
        // 把桶内容按 ht1 槽数重新散列
        if (moved > 0) {
          for (let i = 0; i < moved; i++) {
            const target = (bucketIdx * 7 + i * 3) % HT1_SIZE;
            next1[target] = (next1[target] || 0) + 1;
          }
        }
        return next1;
      });
      setLog((prevLog) => [
        ...prevLog,
        `rehashidx=${bucketIdx}：搬桶 ${bucketIdx}（${moved} 个键），映射到 ht[1] 的 ${moved > 0 ? `${moved} 个桶` : "空桶"}。`,
      ]);
      return next;
    });
  }, [idx]);

  const autoComplete = useCallback(() => {
    for (let i = idx; i < HT0_SIZE; i++) {
      setTimeout(() => step(), (i - idx) * 400);
    }
  }, [idx, step]);

  const reset = useCallback(() => {
    setHt0(initBuckets(HT0_SIZE));
    setHt1(new Array(HT1_SIZE).fill(0));
    setIdx(0);
    setLog(["初始状态：ht[0] 有 4 个桶，ht[1] 有 8 个桶（rehash 目标）。rehashidx=0 表示搬迁从桶 0 开始。"]);
  }, []);

  const viewW = 780;
  const viewH = 420;
  const bucketW = 70;
  const bucketH = 36;
  const gap = 12;
  const topY = 120;
  const bottomY = 300;

  const done = idx >= HT0_SIZE;

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>⚡ 字典渐进 rehash 实验台</span>
        <button onClick={reset} className="rounded-control border border-border px-3 py-1 text-xs transition-colors hover:border-accent" style={{ color: C.secondary }}>重置</button>
      </div>
      <div className="p-4">
        <svg viewBox={`0 0 ${viewW} ${viewH}`} className="w-full" role="img" aria-label="字典渐进 rehash">
          <text x={viewW / 2} y={36} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>
            字典渐进 rehash：ht[0]（4 桶）→ ht[1]（8 桶）
          </text>
          <text x={viewW / 2} y={56} textAnchor="middle" fontSize={11} fill={C.secondary}>
            点击一步步推进搬迁，观察桶内容如何映射到更大的哈希表
          </text>

          {/* 状态栏 */}
          <text x={20} y={82} fontSize={11} fill={C.secondary}>
            rehashidx:{" "}
            <tspan fontWeight={600} fill={done ? C.success : C.accent}>
              {done ? "✅ 完成" : idx}
            </tspan>
            {"  "}负载因子: 0.75
          </text>

          {/* ht[0] - 旧表 */}
          <text x={20} y={topY - 14} fontSize={11} fill={C.secondary} fontWeight={600}>
            ht[0]（旧表，{HT0_SIZE} 桶）{done ? "✅ 已全部搬迁" : `← 正在搬迁桶 ${idx}`}
          </text>
          {ht0.map((count, i) => {
            const x = 20 + i * (bucketW + gap);
            const isMigrating = i === idx && !done;
            const isEmpty = count === 0;
            return (
              <g key={`ht0-${i}`}>
                <rect
                  x={x} y={topY} width={bucketW} height={bucketH} rx={6}
                  fill={isEmpty ? (isMigrating ? C.elevated : C.bg) : (isMigrating ? C.warning : C.accent)}
                  stroke={isMigrating ? C.warning : isEmpty ? C.border : C.accent}
                  strokeWidth={isMigrating ? 2 : 1}
                  opacity={isEmpty ? 0.4 : 1}
                />
                <text x={x + bucketW / 2} y={topY + bucketH / 2 + 4} textAnchor="middle" fontSize={11} fill={isEmpty ? C.secondary : C.bg} fontWeight={600}>
                  {isEmpty ? (isMigrating ? "→" : "空") : `${count} 键`}
                </text>
                <text x={x + bucketW / 2} y={topY + bucketH + 16} textAnchor="middle" fontSize={11} fill={C.secondary} fontFamily="monospace">
                  桶 {i}
                </text>
                {isMigrating && (
                  <text x={x + bucketW / 2} y={topY - 4} textAnchor="middle" fontSize={11} fill={C.warning} fontWeight={600}>⬆ 搬迁中</text>
                )}
              </g>
            );
          })}

          {/* 迁移箭头 */}
          {!done && (
            <text x={viewW / 2} y={bottomY - 50} textAnchor="middle" fontSize={22} fill={C.accent}>
              ↓
            </text>
          )}
          <text x={viewW / 2} y={bottomY - 70} textAnchor="middle" fontSize={11} fill={C.secondary}>
            rehashidx={idx} → 搬桶 {idx} 到 ht[1]
          </text>

          {/* ht[1] - 新表 */}
          <text x={20} y={bottomY - 14} fontSize={11} fill={C.secondary} fontWeight={600}>
            ht[1]（新表，{HT1_SIZE} 桶）{done ? "✅ 新表已就绪，互换角色" : ""}
          </text>
          {ht1.map((count, i) => {
            const x = 20 + i * (80 + 6);
            const hasKeys = count > 0;
            return (
              <g key={`ht1-${i}`}>
                <rect
                  x={x} y={bottomY} width={80} height={bucketH} rx={6}
                  fill={hasKeys ? C.success : C.bg}
                  stroke={hasKeys ? C.success : C.border}
                  strokeWidth={1}
                  opacity={hasKeys ? 1 : 0.4}
                />
                <text x={x + 40} y={bottomY + bucketH / 2 + 4} textAnchor="middle" fontSize={11} fill={hasKeys ? C.bg : C.secondary} fontWeight={600}>
                  {hasKeys ? `${count} 键` : "空"}
                </text>
                <text x={x + 40} y={bottomY + bucketH + 16} textAnchor="middle" fontSize={11} fill={C.secondary} fontFamily="monospace">
                  桶 {i}
                </text>
              </g>
            );
          })}
        </svg>

        {/* 操作按钮 */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button
            onClick={step}
            disabled={done}
            className="rounded-control border border-accent px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent/10 disabled:opacity-40"
            style={{ color: C.accent, borderColor: C.accent }}
          >
            {done ? "✅ 搬迁完成" : `推进 rehash 一步（桶 ${idx} → ht[1]）`}
          </button>
          <button
            onClick={reset}
            className="rounded-control border border-border px-3 py-1.5 text-xs transition-colors hover:border-accent"
            style={{ color: C.secondary }}
          >
            重置
          </button>
        </div>

        {/* 状态面板 */}
        <div className="mt-3 rounded-control border border-border p-3" style={{ background: C.bg }}>
          <div className="mb-1 text-xs font-semibold" style={{ color: C.primary }}>rehash 状态</div>
          <div className="flex flex-wrap gap-4 text-xs" style={{ color: C.secondary }}>
            <span>rehashidx: <span style={{ color: done ? C.success : C.accent, fontWeight: 600 }}>{done ? "完成" : idx}</span></span>
            <span>ht[0] 已搬: <span style={{ color: done ? C.success : C.accent, fontWeight: 600 }}>{idx}/{HT0_SIZE}</span></span>
            <span>ht[1] 占用: <span style={{ color: C.success, fontWeight: 600 }}>{ht1.filter((c) => c > 0).length}/{HT1_SIZE}</span></span>
            <span>负载因子: 0.75（触发 rehash）</span>
          </div>
          {done && (
            <div className="mt-2 rounded-control border p-2 text-xs" style={{ borderColor: C.success, background: C.elevated, color: C.secondary }}>
              <span style={{ color: C.success, fontWeight: 600 }}>rehash 完成：</span>
              ht[0] 所有桶已搬迁至 ht[1]，两者角色互换（ht[0] 变为新表，ht[1] 变为旧表）。
            </div>
          )}
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