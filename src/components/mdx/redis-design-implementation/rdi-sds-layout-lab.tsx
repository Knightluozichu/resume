"use client";

import { useState, useCallback } from "react";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

const LEN_COLOR = "#3b82f6"; // 蓝：len 字段
const FREE_COLOR = "#22c55e"; // 绿：free 字段
const DATA_COLOR = "#f59e0b"; // 橙：buf 中的内容字节
const FREE_BUF_COLOR = "#9ca3af"; // 灰：buf 中的预分配空间
const NUL_COLOR = "#ef4444"; // 红：结尾 \0

const CELL_W = 20;
const CELL_H = 30;
const FIELD_X = 60; // 字段名列宽

function toHex(str: string): string[] {
  return [...str].map((ch) => ch.charCodeAt(0).toString(16).padStart(2, "0"));
}

export function RdiSdsLayoutLab() {
  const [content, setContent] = useState("Redis");
  const [capacity, setCapacity] = useState(16);
  const [log, setLog] = useState<string[]>([
    '初始状态：sdshdr { len=5, free=11 }，buf 分配 16 字节 + 结尾 \\0。',
  ]);
  const [expandMsg, setExpandMsg] = useState<string | null>(null);

  const len = content.length;
  const free = capacity - len;

  const reset = useCallback(() => {
    setContent("Redis");
    setCapacity(16);
    setExpandMsg(null);
    setLog(["初始状态：sdshdr { len=5, free=11 }，buf 分配 16 字节 + 结尾 \\0。"]);
  }, []);

  const append = (text: string) => {
    if (expandMsg) setExpandMsg(null);
    if (text.length <= free) {
      setContent(content + text);
      setLog((prev) => [
        ...prev,
        `append("${text}")：free=${free} ≥ ${text.length}，直接写入，无需分配内存。`,
      ]);
      return;
    }
    // 触发扩容：SDS 预分配策略（<1MB 翻倍，否则 +1MB）
    const newLen = len + text.length;
    const newCap = newLen < 1024 * 1024 ? newLen * 2 : newLen + 1024 * 1024;
    setCapacity(newCap);
    setContent(content + text);
    setExpandMsg(
      `free=${free} 不足追加 ${text.length} 字节，触发扩容：新长度 ${newLen} < 1MB，按策略预分配为 ${newLen}×2=${newCap} 字节。`,
    );
    setLog((prev) => [
      ...prev,
      `append("${text}")：free=${free} 不足，扩容 newLen=${newLen} → capacity=${newCap}（<1MB 翻倍策略）。`,
    ]);
  };

  const trim = (n: number) => {
    if (expandMsg) setExpandMsg(null);
    if (n >= content.length) return;
    setContent(content.slice(0, -n));
    setLog((prev) => [
      ...prev,
      `sdstrim/sdsclear：删除 ${n} 字节，capacity=${capacity} 不变，free 增加 ${n}（惰性释放，不归还内存）。`,
    ]);
  };

  const hex = toHex(content);
  // buf 显示：len 内容格 + free 格（上限 26 格）+ \0 格
  const showContent = Math.min(len, 26);
  const showFree = Math.min(free, 26 - showContent);
  const showCap = showContent + showFree;

  // SVG 尺寸
  const row1Y = 108;
  const row2Y = 196;
  const totalBytes = showCap + 1; // + \0
  const gridW = totalBytes * CELL_W + FIELD_X + 40;
  const viewW = Math.max(760, gridW);
  const viewH = 310;

  const fieldLabel = (x: number, y: number, text: string, color: string) => (
    <g key={`fl-${x}-${y}`}>
      <text x={x} y={y - 8} fontSize={11} fontWeight={600} fill={color}>
        {text}
      </text>
    </g>
  );

  const byteCells = (
    y: number,
    offsetStart: number,
    count: number,
    getColor: (i: number) => string,
    getText: (i: number) => string,
    keyPrefix: string,
  ) => (
    <g key={keyPrefix}>
      {Array.from({ length: count }).map((_, i) => {
        const x = FIELD_X + i * CELL_W;
        const color = getColor(i);
        return (
          <g key={`${keyPrefix}-${i}`}>
            <rect
              x={x}
              y={y}
              width={CELL_W - 1}
              height={CELL_H}
              rx={2}
              fill={color}
              opacity={0.16}
              stroke={color}
              strokeWidth={1.2}
            />
            <text
              x={x + (CELL_W - 1) / 2}
              y={y + CELL_H / 2 + 4}
              textAnchor="middle"
              fontSize={11}
              fill={C.primary}
              fontFamily="monospace"
            >
              {getText(i)}
            </text>
            <text
              x={x + (CELL_W - 1) / 2}
              y={y + CELL_H + 12}
              textAnchor="middle"
              fontSize={11}
              fill={C.secondary}
              fontFamily="monospace"
            >
              {offsetStart + i}
            </text>
          </g>
        );
      })}
    </g>
  );

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>
          ⚡ SDS 字节级内存布局实验台
        </span>
        <button
          onClick={reset}
          className="rounded-control border border-border px-3 py-1 text-xs transition-colors hover:border-accent"
          style={{ color: C.secondary }}
        >
          重置
        </button>
      </div>

      <div className="p-4">
        <svg viewBox={`0 0 ${viewW} ${viewH}`} className="w-full" role="img" aria-label="SDS 内存布局与扩容实验台">
          {/* 标题 */}
          <text x={viewW / 2} y={36} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>
            struct sdshdr 内存布局（32 位 header + buf）
          </text>
          <text x={viewW / 2} y={56} textAnchor="middle" fontSize={11} fill={C.secondary}>
            len 记录已用 · free 记录剩余 · buf 承载数据与结尾 \0；点下方按钮观察追加、扩容与惰性释放
          </text>

          {/* 行1：len + free 字段（header） */}
          <text x={4} y={row1Y - 8} fontSize={11} fill={C.secondary}>
            头部
          </text>
          {fieldLabel(FIELD_X, row1Y, "len = " + len, LEN_COLOR)}
          {byteCells(row1Y, 0, 4, () => LEN_COLOR, () => "0", "hdr-len")}
          {fieldLabel(FIELD_X + 4 * CELL_W + 8, row1Y, "free = " + free, FREE_COLOR)}
          {byteCells(row1Y + 0, 4, 4, () => FREE_COLOR, () => "0", "hdr-free")}

          {/* 行2：buf[] 数组（内容 + 预分配 + \0） */}
          <text x={4} y={row2Y - 8} fontSize={11} fill={C.secondary}>
            buf[]
          </text>
          <text x={FIELD_X} y={row2Y - 8} fontSize={11} fill={DATA_COLOR}>
            数据（{showContent} 字节）
          </text>
          {byteCells(
            row2Y,
            0,
            showContent,
            () => DATA_COLOR,
            (i) => (i < hex.length ? hex[i] : "·"),
            "buf-data",
          )}
          {showFree > 0 && (
            <>
              <text x={FIELD_X + showContent * CELL_W} y={row2Y - 8} fontSize={11} fill={FREE_BUF_COLOR}>
                预分配（{showFree} 字节）
              </text>
              {byteCells(
                row2Y,
                showContent,
                showFree,
                () => FREE_BUF_COLOR,
                () => "·",
                "buf-free",
              )}
            </>
          )}
          {/* \0 结尾 */}
          <text x={FIELD_X + showCap * CELL_W} y={row2Y - 8} fontSize={11} fill={NUL_COLOR}>
            \0
          </text>
          {byteCells(row2Y, showCap, 1, () => NUL_COLOR, () => "\\0", "buf-nul")}

          {/* 字节内容 vs ASCII 对照行 */}
          {showContent > 0 && (
            <text x={FIELD_X} y={row2Y + CELL_H + 32} fontSize={11} fill={C.secondary} fontFamily="monospace">
              内容 ASCII：[ {[...content].slice(0, showContent).map((ch) => ` ${ch} `).join("")} ]
            </text>
          )}
        </svg>

        {/* 操作按钮 */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button
            onClick={() => append("Redis")}
            className="rounded-control border border-accent px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent/10"
            style={{ color: C.accent }}
          >
            append("Redis")
          </button>
          <button
            onClick={() => append("abcdefg")}
            className="rounded-control border border-warning px-3 py-1.5 text-xs font-medium transition-colors hover:bg-warning/10"
            style={{ color: C.warning }}
          >
            append("abcdefg") · 触发扩容
          </button>
          <button
            onClick={() => trim(3)}
            className="rounded-control border border-danger px-3 py-1.5 text-xs font-medium transition-colors hover:bg-danger/10"
            style={{ color: C.danger }}
          >
            sdsclear 删 3 字节 · 惰性释放
          </button>
          <button
            onClick={reset}
            className="rounded-control border border-border px-3 py-1.5 text-xs transition-colors hover:border-accent"
            style={{ color: C.secondary }}
          >
            重置初始 "Redis"
          </button>
        </div>

        {/* 状态与扩容提示 */}
        <div className="mt-3 rounded-control border border-border p-3" style={{ background: C.bg }}>
          <div className="flex flex-wrap gap-4 text-xs" style={{ color: C.secondary }}>
            <span>
              len=<span style={{ color: LEN_COLOR, fontWeight: 600 }}>{len}</span>
            </span>
            <span>
              free=<span style={{ color: FREE_COLOR, fontWeight: 600 }}>{free}</span>
            </span>
            <span>
              capacity=<span style={{ color: C.primary, fontWeight: 600 }}>{capacity}</span>
            </span>
            <span>O(1) 取长：直接读 len，无需扫描</span>
          </div>
          {expandMsg && (
            <div className="mt-2 rounded-control border p-2.5 text-xs leading-relaxed" style={{ borderColor: C.warning, background: C.elevated, color: C.secondary }}>
              <span style={{ color: C.warning, fontWeight: 600 }}>扩容事件：</span>
              {expandMsg}
            </div>
          )}
        </div>

        {/* 二进制安全演示 */}
        <div className="mt-3 rounded-control border border-border p-3" style={{ background: C.bg }}>
          <div className="mb-1 text-xs font-semibold" style={{ color: C.primary }}>
            二进制安全：len 记录长度，内容里的任意字节都不会被截断
          </div>
          <div className="flex flex-col gap-2 text-xs leading-relaxed" style={{ color: C.secondary }}>
            <div>
              <span className="font-mono" style={{ color: DATA_COLOR }}>
                {JSON.stringify(content)}
              </span>{" "}
              —— SDS 按 len 读出完整内容，即使字节序列里出现 \0 也原样保留（图片、序列化对象均可安全存储）。
            </div>
            <div>
              <span className="font-mono" style={{ color: NUL_COLOR }}>
                C 字符串
              </span>{" "}
              以 \0 为终止符：遇到第一个 \0 就停止，二进制数据会被拦腰截断——这是 SDS 存在的根本原因之一。
            </div>
          </div>
        </div>

        {/* 操作日志 */}
        <div className="mt-3 rounded-control border border-border p-3" style={{ background: C.bg }}>
          <div className="mb-1 text-xs font-semibold" style={{ color: C.primary }}>
            操作日志
          </div>
          <ol className="flex flex-col gap-1 text-xs" style={{ color: C.secondary }}>
            {log.map((line, i) => (
              <li key={i} className="leading-relaxed">
                <span className="mr-1 font-mono" style={{ color: C.accent }}>
                  {i + 1}.
                </span>
                {line}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
