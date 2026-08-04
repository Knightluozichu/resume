"use client";

import { useState, useCallback } from "react";

const C = {
  bg: "var(--bg)", elevated: "var(--bg-elevated)", border: "var(--border)",
  primary: "var(--text-primary)", secondary: "var(--text-secondary)",
  accent: "var(--accent)", danger: "var(--danger)", success: "var(--success)", warning: "var(--warning)",
} as const;

type ObjType = "string" | "list" | "hash" | "set" | "zset";
type Encoding = "embstr" | "raw" | "int" | "quicklist" | "ziplist" | "hashtable" | "intset" | "skiplist";

const MATRIX: { type: ObjType; label: string; encodings: { enc: Encoding; when: string; color: string }[] }[] = [
  { type: "string", label: "STRING", encodings: [
    { enc: "int", when: "整数值（≤ 2^64）", color: C.accent },
    { enc: "embstr", when: "短字符串（≤ 44 字节）", color: C.success },
    { enc: "raw", when: "长字符串", color: C.warning },
  ]},
  { type: "list", label: "LIST", encodings: [
    { enc: "quicklist", when: "所有列表（3.2+）", color: C.accent },
  ]},
  { type: "hash", label: "HASH", encodings: [
    { enc: "ziplist", when: "字段少且值短", color: C.success },
    { enc: "hashtable", when: "字段多或值长", color: C.warning },
  ]},
  { type: "set", label: "SET", encodings: [
    { enc: "intset", when: "全部整数且量小", color: C.success },
    { enc: "hashtable", when: "含非整数或量大", color: C.warning },
  ]},
  { type: "zset", label: "ZSET", encodings: [
    { enc: "ziplist", when: "元素少且分数短", color: C.success },
    { enc: "skiplist", when: "元素多或分数长", color: C.warning },
  ]},
];

export function RdiObjectLab() {
  const [activeType, setActiveType] = useState<ObjType>("string");
  const [simulate, setSimulate] = useState(0);
  const [log, setLog] = useState<string[]>([
    "对象系统：redisObject = type + encoding + refcount + ptr。编码随数据规模自动切换，命令按 type 检查合法性。",
  ]);

  const runSimulation = useCallback(() => {
    setSimulate((p) => p + 1);
    const s = simulate + 1;
    if (activeType === "string") {
      setLog((prev) => [...prev, `模拟 ${s}：SET "counter" 100 → 编码 int；SET "name" "hello" → embstr；SET 超长文本 → raw。`]);
    } else if (activeType === "hash") {
      setLog((prev) => [...prev, `模拟 ${s}：HSET 少量短字段 → ziplist；字段超 128 或值超 64 字节 → 自动转 hashtable。`]);
    } else if (activeType === "zset") {
      setLog((prev) => [...prev, `模拟 ${s}：ZADD 少量元素 → ziplist；超 128 元素或长分数 → 转 skiplist。`]);
    } else {
      setLog((prev) => [...prev, `模拟 ${s}：${activeType === "list" ? "LPUSH 列表 → quicklist（3.2+ 统一编码）" : activeType === "set" ? "SADD 整数集合 → intset；混入字符串 → hashtable" : ""}。`]);
    }
  }, [activeType, simulate]);

  const reset = useCallback(() => {
    setSimulate(0);
    setLog(["对象系统：redisObject = type + encoding + refcount + ptr。编码随数据规模自动切换，命令按 type 检查合法性。"]);
  }, []);

  const viewW = 820;
  const viewH = 380;
  const colW = 140;
  const rowH = 48;
  const startX = 20;
  const startY = 90;

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>⚡ 对象系统：类型 × 编码矩阵</span>
        <button onClick={reset} className="rounded-control border border-border px-3 py-1 text-xs transition-colors hover:border-accent" style={{ color: C.secondary }}>重置</button>
      </div>
      <div className="p-4">
        <svg viewBox={`0 0 ${viewW} ${viewH}`} className="w-full" role="img" aria-label="对象系统类型编码矩阵">
          <text x={viewW / 2} y={36} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>
            五种对象类型 × 动态编码
          </text>
          <text x={viewW / 2} y={56} textAnchor="middle" fontSize={11} fill={C.secondary}>
            点击类型行查看其编码切换规则
          </text>

          {/* 矩阵表头 */}
          <text x={startX} y={startY - 10} fontSize={11} fill={C.secondary}>类型</text>
          <text x={startX + colW} y={startY - 10} fontSize={11} fill={C.secondary}>编码形态</text>

          {MATRIX.map((row, ri) => {
            const isActive = activeType === row.type;
            const rowY = startY + ri * rowH;
            return (
              <g key={row.type} onClick={() => setActiveType(row.type)} className="cursor-pointer">
                <rect
                  x={startX} y={rowY} width={colW - 6} height={rowH - 8} rx={6}
                  fill={isActive ? C.accent : C.bg}
                  stroke={isActive ? C.accent : C.border}
                  strokeWidth={isActive ? 2 : 1}
                />
                <text
                  x={startX + (colW - 6) / 2} y={rowY + (rowH - 8) / 2 + 4}
                  textAnchor="middle" fontSize={12} fontWeight={600}
                  fill={isActive ? C.bg : C.primary}
                >
                  {row.label}
                </text>
                {/* 编码单元格 */}
                {row.encodings.map((enc, ei) => {
                  const ex = startX + colW + ei * 200;
                  return (
                    <g key={`${row.type}-${enc.enc}`}>
                      <rect
                        x={ex} y={rowY} width={190} height={rowH - 8} rx={6}
                        fill={isActive ? enc.color : C.bg}
                        stroke={enc.color}
                        strokeWidth={isActive ? 1.5 : 1}
                        opacity={isActive ? 0.15 : 0.08}
                      />
                      <text x={ex + 8} y={rowY + 18} fontSize={11} fontWeight={600} fill={C.primary}>
                        {enc.enc}
                      </text>
                      <text x={ex + 8} y={rowY + 34} fontSize={11} fill={C.secondary}>
                        {enc.when}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* 活跃类型说明 */}
          <text x={viewW / 2} y={startY + MATRIX.length * rowH + 28} textAnchor="middle" fontSize={11} fill={C.secondary}>
            活跃类型：{activeType.toUpperCase()}——编码切换对客户端透明，OBJECT ENCODING 可查看
          </text>
        </svg>

        {/* 操作 */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button
            onClick={runSimulation}
            className="rounded-control border border-accent px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent/10"
            style={{ color: C.accent, borderColor: C.accent }}
          >
            模拟数据增长（观察编码切换）
          </button>
          <button onClick={reset} className="rounded-control border border-border px-3 py-1.5 text-xs transition-colors" style={{ color: C.secondary }}>重置</button>
        </div>

        {/* 说明 */}
        <div className="mt-3 rounded-control border border-border p-3" style={{ background: C.bg }}>
          <div className="text-xs leading-relaxed" style={{ color: C.secondary }}>
            redisObject 含 type（五种类型）、encoding（当前实现）、refcount（引用计数，小整数全局共享）、ptr。命令执行前先做类型检查，错误类型返回 WRONGTYPE。
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