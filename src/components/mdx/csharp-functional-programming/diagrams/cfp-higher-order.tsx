/**
 * <CfpHigherOrderDiagram>：高阶函数数据流。
 *
 * 上半：高阶函数的定义——接受函数参数 / 返回函数。
 * 下半：Map / Filter / Reduce 三大高阶函数的数据流可视化。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×420，四周留白 >=32，字号 >=11。
 */

import type { ReactElement } from "react";

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

// 数据流元素
const INPUT = [1, 2, 3, 4, 5];
const BOX_W = 44;
const BOX_H = 40;
const BOX_GAP = 8;

function dataRow(y: number, values: number[], color: string, label: string) {
  const totalW = values.length * BOX_W + (values.length - 1) * BOX_GAP;
  const startX = (VIEW_W - totalW) / 2;
  return { startX, y, values, color, label };
}

const rowInput = dataRow(120, INPUT, secondary, "输入");
const rowFilter = dataRow(200, [3, 4, 5], success, "Filter(x => x > 2)");
const rowMap = dataRow(280, [6, 8, 10], accent, "Map(x => x * 2)");
const rowReduce = { y: 360, value: 24, color: warning, label: "Reduce((a,b) => a+b)" };

export function CfpHigherOrderDiagram() {
  const renderBoxes = (row: ReturnType<typeof dataRow>) => {
    const items: ReactElement[] = [];
    row.values.forEach((v, i) => {
      const x = row.startX + i * (BOX_W + BOX_GAP);
      items.push(
        <g key={`${row.label}-${i}`}>
          <rect x={x} y={row.y} width={BOX_W} height={BOX_H} rx="6" fill={elevated} stroke={row.color} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={x + BOX_W / 2} y={row.y + BOX_H / 2 + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary} fontFamily="monospace">
            {v}
          </text>
        </g>
      );
    });
    return items;
  };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="高阶函数数据流。Filter 过滤大于2的元素得到 3,4,5，Map 映射为两倍得到 6,8,10，Reduce 求和得到 24。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            高阶函数：Map / Filter / Reduce
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            接受函数参数 · 返回新集合 · 不修改原数据
          </text>

          {/* 行标签 */}
          <text x={40} y={rowInput.y + BOX_H / 2 + 5} fontSize="11" fontWeight="600" fill={secondary}>输入</text>
          <text x={40} y={rowFilter.y + BOX_H / 2 + 5} fontSize="11" fontWeight="600" fill={success}>Filter</text>
          <text x={40} y={rowMap.y + BOX_H / 2 + 5} fontSize="11" fontWeight="600" fill={accent}>Map</text>
          <text x={40} y={rowReduce.y + 5} fontSize="11" fontWeight="600" fill={warning}>Reduce</text>

          {/* Filter 行 */}
          {renderBoxes(rowInput)}
          {/* 箭头：input -> filter */}
          <line x1={VIEW_W / 2} y1={rowInput.y + BOX_H + 2} x2={VIEW_W / 2} y2={rowFilter.y - 4} stroke={success} strokeWidth="1.4" markerEnd="url(#cfp-ho-arrow)" />
          <text x={VIEW_W / 2 + 8} y={rowInput.y + BOX_H + 16} fontSize="10" fill={success} fontFamily="monospace">x =&gt; x &gt; 2</text>

          {renderBoxes(rowFilter)}
          {/* 箭头：filter -> map */}
          <line x1={VIEW_W / 2} y1={rowFilter.y + BOX_H + 2} x2={VIEW_W / 2} y2={rowMap.y - 4} stroke={accent} strokeWidth="1.4" markerEnd="url(#cfp-ho-arrow)" />
          <text x={VIEW_W / 2 + 8} y={rowFilter.y + BOX_H + 16} fontSize="10" fill={accent} fontFamily="monospace">x =&gt; x * 2</text>

          {renderBoxes(rowMap)}
          {/* 箭头：map -> reduce */}
          <line x1={VIEW_W / 2} y1={rowMap.y + BOX_H + 2} x2={VIEW_W / 2} y2={rowReduce.y - 12} stroke={warning} strokeWidth="1.4" markerEnd="url(#cfp-ho-arrow)" />
          <text x={VIEW_W / 2 + 8} y={rowMap.y + BOX_H + 16} fontSize="10" fill={warning} fontFamily="monospace">(a, b) =&gt; a + b</text>

          {/* Reduce 结果 */}
          <rect x={VIEW_W / 2 - 30} y={rowReduce.y - 8} width={60} height={36} rx="6" fill={warning} fillOpacity="0.12" stroke={warning} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={VIEW_W / 2} y={rowReduce.y + 16} textAnchor="middle" fontSize="16" fontWeight="700" fill={warning} fontFamily="monospace">
            {rowReduce.value}
          </text>

          {/* 底部总结 */}
          <line x1={32} y1={388} x2={VIEW_W - 32} y2={388} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={406} textAnchor="middle" fontSize="11" fill={secondary}>
            Filter 过滤 · Map 映射 · Reduce 聚合 · 每步接受函数参数 · 返回新数据
          </text>

          <defs>
            <marker id="cfp-ho-arrow" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        高阶函数 Map/Filter/Reduce 的数据流：接受函数参数，返回新集合。
      </figcaption>
    </figure>
  );
}
