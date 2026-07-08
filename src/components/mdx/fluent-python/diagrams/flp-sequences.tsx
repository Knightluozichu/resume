/**
 * <FlpSequencesDiagram>：Python 序列类型分类矩阵。
 *
 * 按「容器 vs 扁平」「可变 vs 不可变」两个维度划分内置序列类型。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×400，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 400;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

interface Cell {
  types: string;
  note: string;
  color: string;
}

const COL_X = [200, 460];
const COL_W = 240;
const ROW_Y = [104, 224];
const ROW_H = 104;

const CELLS: readonly Cell[][] = [
  [
    { types: "list, deque", note: "存任意对象引用\n长度可增减", color: accent },
    { types: "tuple, namedtuple", note: "存引用但不可变\n可作字典键", color: success },
  ],
  [
    { types: "bytearray, array.array", note: "存原始字节/数值\n紧凑省内存", color: warning },
    { types: "str, bytes", note: "存字符/字节\n不可变", color: danger },
  ],
];

export function FlpSequencesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Python序列类型分类矩阵：按容器vs扁平、可变vs不可变两个维度划分，包含 list、tuple、str、bytes、array、deque 等。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Python 序列类型分类
          </text>
          <text x={VIEW_W / 2} y={52} textAnchor="middle" fontSize="11" fill={secondary}>
            容器序列存引用 · 扁平序列存值；可变可改 · 不可变只能重建
          </text>

          {/* 列头 */}
          <text x={COL_X[0] + COL_W / 2} y={84} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            可变序列
          </text>
          <text x={COL_X[1] + COL_W / 2} y={84} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>
            不可变序列
          </text>

          {/* 行标签 */}
          <text x={120} y={ROW_Y[0] + ROW_H / 2 - 2} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>
            容器序列
          </text>
          <text x={120} y={ROW_Y[0] + ROW_H / 2 + 16} textAnchor="middle" fontSize="10" fill={secondary}>
            存对象引用
          </text>
          <text x={120} y={ROW_Y[1] + ROW_H / 2 - 2} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>
            扁平序列
          </text>
          <text x={120} y={ROW_Y[1] + ROW_H / 2 + 16} textAnchor="middle" fontSize="10" fill={secondary}>
            存原始值
          </text>

          {/* 单元格 */}
          {CELLS.map((row, ri) =>
            row.map((cell, ci) => {
              const x = COL_X[ci];
              const y = ROW_Y[ri];
              const lines = cell.note.split("\n");
              return (
                <g key={`${ri}-${ci}`}>
                  <rect x={x} y={y} width={COL_W} height={ROW_H} rx="8" fill={cell.color} fillOpacity="0.08" stroke={cell.color} strokeWidth="1.4" strokeOpacity="0.55" />
                  <text x={x + COL_W / 2} y={y + 30} textAnchor="middle" fontSize="13" fontWeight="700" fill={cell.color}>
                    {cell.types}
                  </text>
                  {lines.map((ln, li) => (
                    <text key={li} x={x + COL_W / 2} y={y + 56 + li * 18} textAnchor="middle" fontSize="11" fill={primary}>
                      {ln}
                    </text>
                  ))}
                </g>
              );
            })
          )}

          {/* 底部总结 */}
          <line x1={32} y1={348} x2={VIEW_W - 32} y2={348} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={370} textAnchor="middle" fontSize="11" fill={secondary}>
            选型口诀：异构混装用容器 · 同质紧凑用扁平 · 要改用可变 · 要哈希用不可变
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Python 内置序列按容器/扁平、可变/不可变的分类。
      </figcaption>
    </figure>
  );
}
