"use client";

import { useState, useCallback } from "react";

const C = {
  bg: "var(--bg)", elevated: "var(--bg-elevated)", border: "var(--border)",
  primary: "var(--text-primary)", secondary: "var(--text-secondary)",
  accent: "var(--accent)", danger: "var(--danger)", success: "var(--success)", warning: "var(--warning)",
} as const;

type CacheEntry = { key: string; freq: number; lastAccess: number; age: number };

const POOL = ["user:1", "session:42", "cart:7", "token:abc", "cache:data", "temp:x", "rate:limit", "config:app"];

export function RdiEvictionLab() {
  const [cache, setCache] = useState<CacheEntry[]>([]);
  const [maxSize, setMaxSize] = useState(5);
  const [strategy, setStrategy] = useState<"lru" | "lfu">("lru");
  const [tick, setTick] = useState(0);
  const [log, setLog] = useState<string[]>([
    "内存淘汰：maxmemory 策略包含 LRU（最近最少使用）与 LFU（最不常使用）。",
  ]);

  const access = useCallback(() => {
    setTick((p) => p + 1);
    const t = tick + 1;
    const key = POOL[(t - 1) % POOL.length];
    const idx = cache.findIndex((e) => e.key === key);
    if (idx >= 0) {
      const next = [...cache];
      next[idx] = { ...next[idx], lastAccess: t, freq: next[idx].freq + 1, age: t };
      setCache(next);
      setLog((prev) => [...prev, `GET "${key}"：命中，${strategy === "lru" ? "更新访问时间" : "频率+1"}。`]);
    } else {
      let victim: string | null = null;
      if (cache.length >= maxSize) {
        if (strategy === "lru") {
          const oldest = cache.reduce((a, b) => a.lastAccess < b.lastAccess ? a : b);
          victim = oldest.key;
          setCache((prev) => prev.filter((e) => e.key !== victim));
        } else {
          const leastFreq = cache.reduce((a, b) => a.freq < b.freq ? a : b);
          victim = leastFreq.key;
          setCache((prev) => prev.filter((e) => e.key !== victim));
        }
      }
      setCache((prev) => [...prev, { key, freq: 1, lastAccess: t, age: t }]);
      setLog((prev) => [...prev, `SET "${key}"：${victim ? `淘汰 "${victim}" 后 ` : ""}插入缓存（${cache.length}/${maxSize}）。`]);
    }
  }, [cache, maxSize, strategy, tick]);

  const reset = useCallback(() => {
    setCache([]);
    setTick(0);
    setLog(["内存淘汰：maxmemory 策略包含 LRU（最近最少使用）与 LFU（最不常使用）。"]);
  }, []);

  const viewW = 820;
  const viewH = 340;
  const cellW = 90;
  const cellH = 44;
  const startX = 40;
  const y = 110;

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>⚡ 内存淘汰策略：LRU / LFU</span>
        <button onClick={reset} className="rounded-control border border-border px-3 py-1 text-xs transition-colors hover:border-accent" style={{ color: C.secondary }}>重置</button>
      </div>
      <div className="p-4">
        <svg viewBox={`0 0 ${viewW} ${viewH}`} className="w-full" role="img" aria-label="内存淘汰策略">
          <text x={viewW / 2} y={36} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>
            {strategy === "lru" ? "LRU：淘汰最久未访问的键" : "LFU：淘汰访问频率最低的键"}
          </text>
          <text x={viewW / 2} y={56} textAnchor="middle" fontSize={11} fill={C.secondary}>
            maxmemory={maxSize} · 当前 {cache.length} 键 · 操作次数：{tick}
          </text>

          {/* 缓存槽 */}
          {Array.from({ length: maxSize }).map((_, i) => {
            const entry = cache[i];
            const x = startX + i * (cellW + 8);
            return (
              <g key={i}>
                <rect
                  x={x} y={y} width={cellW} height={cellH} rx={6}
                  fill={entry ? C.accent : C.bg}
                  stroke={entry ? C.accent : C.border}
                  strokeWidth={entry ? 1.5 : 1}
                  opacity={entry ? 0.85 : 0.4}
                />
                {entry ? (
                  <>
                    <text x={x + cellW / 2} y={y + 18} textAnchor="middle" fontSize={11} fontWeight={600} fill={C.bg}>
                      {entry.key}
                    </text>
                    <text x={x + cellW / 2} y={y + 34} textAnchor="middle" fontSize={11} fill="rgba(255,255,255,0.8)">
                      {strategy === "lru" ? `t=${entry.lastAccess}` : `freq=${entry.freq}`}
                    </text>
                  </>
                ) : (
                  <text x={x + cellW / 2} y={y + cellH / 2 + 4} textAnchor="middle" fontSize={11} fill={C.secondary}>空</text>
                )}
              </g>
            );
          })}
        </svg>

        {/* 操作 */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <select
            value={strategy}
            onChange={(e) => setStrategy(e.target.value as "lru" | "lfu")}
            className="rounded-control border border-border px-2 py-1.5 text-xs"
            style={{ background: C.bg, color: C.primary }}
          >
            <option value="lru">LRU（最近最少使用）</option>
            <option value="lfu">LFU（最不常使用）</option>
          </select>
          <select
            value={maxSize}
            onChange={(e) => setMaxSize(Number(e.target.value))}
            className="rounded-control border border-border px-2 py-1.5 text-xs"
            style={{ background: C.bg, color: C.primary }}
          >
            <option value="3">maxmemory=3</option>
            <option value="5">maxmemory=5</option>
            <option value="7">maxmemory=7</option>
          </select>
          <button
            onClick={access}
            className="rounded-control border border-accent px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent/10"
            style={{ color: C.accent, borderColor: C.accent }}
          >
            GET/SET 键
          </button>
          <button onClick={reset} className="rounded-control border border-border px-3 py-1.5 text-xs transition-colors" style={{ color: C.secondary }}>重置</button>
        </div>

        {/* 说明 */}
        <div className="mt-3 rounded-control border border-border p-3" style={{ background: C.bg }}>
          <div className="text-xs leading-relaxed" style={{ color: C.secondary }}>
            Redis 的近似 LRU 通过采样淘汰（eviction-pool）替代全量排序，性能远优于严格 LRU。LFU 使用莫里斯计数器（概率计数器）近似记录访问频率，节省内存。maxmemory-policy 还支持 volatile-TTL / allkeys-random / noeviction 等策略。
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