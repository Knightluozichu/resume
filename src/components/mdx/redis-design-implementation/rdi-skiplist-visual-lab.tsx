"use client";

import { useState, useCallback } from "react";

const C = {
  bg: "var(--bg)", elevated: "var(--bg-elevated)", border: "var(--border)",
  primary: "var(--text-primary)", secondary: "var(--text-secondary)",
  accent: "var(--accent)", danger: "var(--danger)", success: "var(--success)", warning: "var(--warning)",
} as const;

type ListNode = { value: number; level: number };

const INITIAL: ListNode[] = [
  { value: 12, level: 1 }, { value: 18, level: 3 }, { value: 25, level: 1 },
  { value: 32, level: 2 }, { value: 42, level: 4 }, { value: 55, level: 1 },
  { value: 67, level: 2 }, { value: 78, level: 1 }, { value: 85, level: 3 },
];

const MAX_LEVEL = 4;
const MAX_NODES = 14;

function randomLevel() {
  let lvl = 1;
  while (lvl < MAX_LEVEL && Math.random() < 0.5) lvl++;
  return lvl;
}

export function RdiSkiplistVisualLab() {
  const [nodes, setNodes] = useState<ListNode[]>(INITIAL);
  const [searchVal, setSearchVal] = useState<number | null>(null);
  const [searchPath, setSearchPath] = useState<number[]>([]);
  const [log, setLog] = useState<string[]>(["初始跳表：4 层索引，9 个节点。随机层数由幂次概率决定（p=0.5）。"]);

  const insert = useCallback(() => {
    if (nodes.length >= MAX_NODES) return;
    const maxExisting = Math.max(...nodes.map((n) => n.value));
    const newVal = maxExisting + Math.ceil(Math.random() * 10) + 3;
    const level = randomLevel();
    const next = [...nodes, { value: newVal, level }].sort((a, b) => a.value - b.value);
    setNodes(next);
    setSearchVal(null);
    setSearchPath([]);
    setLog((prev) => [...prev, `插入 ${newVal}（层数 ${level}，概率 ${level <= 2 ? "高" : "低"}）`]);
  }, [nodes]);

  const search = useCallback(() => {
    if (searchVal === null) return;
    const path: number[] = [];
    for (let lvl = MAX_LEVEL; lvl >= 1; lvl--) {
      for (const n of nodes) {
        if (n.level >= lvl) path.push(n.value);
        if (n.value > searchVal) break;
      }
    }
    const found = nodes.some((n) => n.value === searchVal);
    setSearchPath(path);
    setLog((prev) => [...prev, `搜索 ${searchVal}：${found ? "✅ 找到" : "❌ 未找到"}，经过 ${path.length} 次比较`]);
  }, [searchVal, nodes]);

  const reset = useCallback(() => {
    setNodes(INITIAL);
    setSearchVal(null);
    setSearchPath([]);
    setLog(["初始跳表：4 层索引，9 个节点。随机层数由幂次概率决定（p=0.5）。"]);
  }, []);

  const viewW = 820;
  const viewH = 420;
  const colW = 54;
  const rowH = 52;
  const startX = 40;
  const startY = 100;

  const levelColors = [C.success, C.accent, C.warning, C.danger];

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>⚡ 跳表多层索引可视化</span>
        <button onClick={reset} className="rounded-control border border-border px-3 py-1 text-xs transition-colors hover:border-accent" style={{ color: C.secondary }}>重置</button>
      </div>
      <div className="p-4">
        <svg viewBox={`0 0 ${viewW} ${viewH}`} className="w-full" role="img" aria-label="跳表多层索引">
          <text x={viewW / 2} y={36} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>
            跳表（Skip List）多层索引结构
          </text>
          <text x={viewW / 2} y={56} textAnchor="middle" fontSize={11} fill={C.secondary}>
            每列是一个节点，向右延伸的横线表示该层上的链接；从顶层向下搜索，跨过多余节点
          </text>

          {/* 层标签 */}
          {Array.from({ length: MAX_LEVEL }).map((_, lvl) => (
            <text
              key={`lvl-${lvl}`}
              x={startX - 30}
              y={startY + (MAX_LEVEL - 1 - lvl) * rowH + 6}
              fontSize={12}
              fill={levelColors[lvl]}
              fontWeight={600}
            >
              L{lvl + 1}
            </text>
          ))}

          {/* 节点 + 连接线 */}
          {nodes.map((n, ni) => {
            const x = startX + ni * colW;
            // 每层连接线
            const links = Array.from({ length: MAX_LEVEL }).map((_, lvl) => {
              const nodeLevel = n.level;
              if (lvl >= nodeLevel) return null;
              // 找同层下一个节点
              let nextSameLevel = -1;
              for (let j = ni + 1; j < nodes.length; j++) {
                if (nodes[j].level > lvl) { nextSameLevel = j; break; }
              }
              if (nextSameLevel < 0) return null;
              const x2 = startX + nextSameLevel * colW;
              const y = startY + (MAX_LEVEL - 1 - lvl) * rowH + 6;
              const isInPath = searchPath.includes(n.value) && searchPath.includes(nodes[nextSameLevel].value);
              return { x1: x + colW / 2, x2: x2 + colW / 2, y, level: lvl, isInPath };
            }).filter(Boolean);

            return (
              <g key={n.value}>
                {/* 连接线 */}
                {links.map((link) =>
                  link && (
                    <line
                      key={`link-${n.value}-${link.level}`}
                      x1={link.x1}
                      y1={link.y}
                      x2={link.x2}
                      y2={link.y}
                      stroke={link.isInPath ? C.danger : levelColors[link.level]}
                      strokeWidth={link.isInPath ? 2 : 1.2}
                      opacity={link.isInPath ? 1 : 0.5}
                    />
                  )
                )}
                {/* 节点值 */}
                {Array.from({ length: MAX_LEVEL }).map((_, lvl) => {
                  const y = startY + (MAX_LEVEL - 1 - lvl) * rowH + 6;
                  const isInPath = searchPath.includes(n.value) && searchVal !== null;
                  if (lvl >= n.level) return null;
                  return (
                    <circle
                      key={`dot-${n.value}-${lvl}`}
                      cx={x + colW / 2}
                      cy={y}
                      r={5}
                      fill={isInPath ? C.danger : levelColors[lvl]}
                      opacity={isInPath ? 1 : 0.6}
                    />
                  );
                })}
                {/* 值标签 */}
                <text
                  x={x + colW / 2}
                  y={startY + MAX_LEVEL * rowH - 8}
                  textAnchor="middle"
                  fontSize={11}
                  fill={n.value === searchVal ? C.danger : C.primary}
                  fontWeight={n.value === searchVal ? 700 : 400}
                >
                  {n.value}
                </text>
                {/* 层数标签 */}
                <text
                  x={x + colW / 2}
                  y={startY + MAX_LEVEL * rowH + 10}
                  textAnchor="middle"
                  fontSize={11}
                  fill={C.secondary}
                >
                  L{n.level}
                </text>
              </g>
            );
          })}
        </svg>

        {/* 操作 */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={searchVal ?? ""}
              onChange={(e) => setSearchVal(e.target.value ? Number(e.target.value) : null)}
              placeholder="输入搜索值"
              className="w-28 rounded-control border border-border px-2 py-1.5 text-xs"
              style={{ background: C.bg, color: C.primary }}
            />
            <button
              onClick={search}
              className="rounded-control border border-accent px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent/10"
              style={{ color: C.accent, borderColor: C.accent }}
            >
              搜索
            </button>
          </div>
          <button
            onClick={insert}
            disabled={nodes.length >= MAX_NODES}
            className="rounded-control border border-success px-3 py-1.5 text-xs font-medium transition-colors hover:bg-success/10 disabled:opacity-40"
            style={{ color: C.success, borderColor: C.success }}
          >
            插入新节点（随机层数）
          </button>
          <button onClick={reset} className="rounded-control border border-border px-3 py-1.5 text-xs transition-colors" style={{ color: C.secondary }}>重置</button>
        </div>

        {/* 状态 */}
        <div className="mt-3 rounded-control border border-border p-3" style={{ background: C.bg }}>
          <div className="flex flex-wrap gap-4 text-xs" style={{ color: C.secondary }}>
            <span>节点数: <span style={{ color: C.primary, fontWeight: 600 }}>{nodes.length}/{MAX_NODES}</span></span>
            <span>层数: <span style={{ color: C.accent, fontWeight: 600 }}>4</span></span>
            <span>搜索复杂度: <span style={{ color: C.primary, fontWeight: 600 }}>O(log N)</span></span>
            <span>随机层数期望: <span style={{ color: C.primary, fontWeight: 600 }}>1.33</span></span>
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