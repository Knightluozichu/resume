/**
 * <DsaSortingDiagram>：四大排序算法对比图解（dsa-sorting 章）。
 *
 * 左上：插入排序——逐元素插入前缀。
 * 右上：归并排序——分治合并。
 * 左下：快速排序——基准分区。
 * 右下：堆排序——建堆取顶。
 * 底部：复杂度对比表。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 460;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

export function DsaSortingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="四大排序算法对比。插入排序：逐元素插入前缀 O(n²)/O(n)最好。归并排序：分治合并 O(n log n) 稳定。快速排序：基准分区平均 O(n log n) 最坏 O(n²)。堆排序：建堆取顶 O(n log n) 原地。底部复杂度表：插入 O(n²)/O(n²)/O(n) 不稳定；归并 O(n log n) 稳定；快排 O(n log n)/O(n²) 不稳定；堆排 O(n log n) 不稳定。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>四大排序算法：原理与复杂度</text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill={secondary}>插入 → 归并 → 快排 → 堆排，从 O(n²) 到 O(n log n)</text>

          <line x1="360" y1="74" x2="360" y2="330" stroke={border} strokeWidth="1" strokeDasharray="4 4" />
          <line x1="40" y1="200" x2="680" y2="200" stroke={border} strokeWidth="1" strokeDasharray="4 4" />

          {/* ===== 左上：插入排序 ===== */}
          <text x="180" y="88" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>插入排序</text>
          <text x="180" y="106" textAnchor="middle" fontSize="10" fill={secondary}>逐元素插入已排序前缀</text>

          {/* 第1行：[3] 1 4 1→插入 */}
          {[3, 1, 4, 1, 5].map((v, i) => (
            <g key={`ins1-${i}`}>
              <rect x={60 + i * 32} y="118" width="28" height="24" rx="3" fill={i === 0 ? accent : "var(--bg)"} fillOpacity={i === 0 ? 0.12 : 0} stroke={i === 0 ? accent : border} strokeWidth="1" />
              <text x={74 + i * 32} y="134" textAnchor="middle" fontSize="11" fill={i === 0 ? accent : primary}>{v}</text>
            </g>
          ))}
          {/* 第2行：[1,3] 4 1 5 */}
          {[1, 3, 4, 1, 5].map((v, i) => (
            <g key={`ins2-${i}`}>
              <rect x={60 + i * 32} y="150" width="28" height="24" rx="3" fill={i < 2 ? success : "var(--bg)"} fillOpacity={i < 2 ? 0.08 : 0} stroke={i < 2 ? success : border} strokeWidth="1" />
              <text x={74 + i * 32} y="166" textAnchor="middle" fontSize="11" fill={i < 2 ? success : primary}>{v}</text>
            </g>
          ))}
          <text x="180" y="190" textAnchor="middle" fontSize="10" fill={secondary}>最好 O(n)，最坏 O(n²)，稳定</text>

          {/* ===== 右上：归并排序 ===== */}
          <text x="540" y="88" textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>归并排序</text>
          <text x="540" y="106" textAnchor="middle" fontSize="10" fill={secondary}>分治：切半 → 排序 → 合并</text>

          {/* 树形分治结构 */}
          <rect x="480" y="118" width="120" height="22" rx="3" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1" />
          <text x="540" y="133" textAnchor="middle" fontSize="10" fill={success}>[5 2 8 1]</text>

          <rect x="430" y="148" width="56" height="22" rx="3" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" />
          <text x="458" y="163" textAnchor="middle" fontSize="10" fill={success}>[5 2]</text>
          <rect x="594" y="148" width="56" height="22" rx="3" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" />
          <text x="622" y="163" textAnchor="middle" fontSize="10" fill={success}>[8 1]</text>
          <line x1="500" y1="140" x2="458" y2="148" stroke={border} strokeWidth="1" />
          <line x1="580" y1="140" x2="622" y2="148" stroke={border} strokeWidth="1" />

          <text x="458" y="182" textAnchor="middle" fontSize="10" fill={secondary}>[2 5]</text>
          <text x="622" y="182" textAnchor="middle" fontSize="10" fill={secondary}>[1 8]</text>

          <rect x="480" y="190" width="120" height="0" rx="0" fill="none" />
          <text x="540" y="192" textAnchor="middle" fontSize="10" fill={success} fontWeight="600">→ [1 2 5 8]</text>
          <text x="540" y="210" textAnchor="middle" fontSize="10" fill={secondary}>保证 O(n log n)，稳定，空间 O(n)</text>

          {/* ===== 左下：快速排序 ===== */}
          <text x="180" y="226" textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>快速排序</text>
          <text x="180" y="244" textAnchor="middle" fontSize="10" fill={secondary}>选基准 → 分区 → 递归</text>

          {/* pivot=3, 分区：<3 | 3 | >3 */}
          {[2, 1, 3, 5, 4].map((v, i) => {
            const color = v < 3 ? warning : v === 3 ? accent : danger;
            return (
              <g key={`qs-${i}`}>
                <rect x={60 + i * 32} y="256" width="28" height="24" rx="3" fill={color} fillOpacity="0.08" stroke={color} strokeWidth="1" />
                <text x={74 + i * 32} y="272" textAnchor="middle" fontSize="11" fill={color}>{v}</text>
              </g>
            );
          })}
          <text x="74" y="296" textAnchor="middle" fontSize="9" fill={warning}>{"<3"}</text>
          <text x="106" y="296" textAnchor="middle" fontSize="9" fill={accent}>pivot</text>
          <text x="138" y="296" textAnchor="middle" fontSize="9" fill={danger}>{">3"}</text>
          <text x="180" y="316" textAnchor="middle" fontSize="10" fill={secondary}>平均 O(n log n)，最坏 O(n²)，不稳定</text>

          {/* ===== 右下：堆排序 ===== */}
          <text x="540" y="226" textAnchor="middle" fontSize="13" fontWeight="700" fill={danger}>堆排序</text>
          <text x="540" y="244" textAnchor="middle" fontSize="10" fill={secondary}>建最大堆 → 取顶放末尾</text>

          {/* 堆树结构 */}
          <circle cx="540" cy="260" r="12" fill={danger} fillOpacity="0.1" stroke={danger} strokeWidth="1.5" />
          <text x="540" y="264" textAnchor="middle" fontSize="10" fill={danger}>8</text>
          <circle cx="510" cy="288" r="10" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1" />
          <text x="510" y="291" textAnchor="middle" fontSize="9" fill={danger}>5</text>
          <circle cx="570" cy="288" r="10" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1" />
          <text x="570" y="291" textAnchor="middle" fontSize="9" fill={danger}>3</text>
          <circle cx="494" cy="312" r="9" fill={danger} fillOpacity="0.04" stroke={danger} strokeWidth="1" />
          <text x="494" y="315" textAnchor="middle" fontSize="9" fill={danger}>2</text>
          <circle cx="526" cy="312" r="9" fill={danger} fillOpacity="0.04" stroke={danger} strokeWidth="1" />
          <text x="526" y="315" textAnchor="middle" fontSize="9" fill={danger}>1</text>
          <line x1="535" y1="270" x2="514" y2="280" stroke={border} strokeWidth="1" />
          <line x1="545" y1="270" x2="566" y2="280" stroke={border} strokeWidth="1" />
          <line x1="505" y1="296" x2="496" y2="305" stroke={border} strokeWidth="1" />
          <line x1="515" y1="296" x2="524" y2="305" stroke={border} strokeWidth="1" />
          <text x="540" y="336" textAnchor="middle" fontSize="10" fill={secondary}>O(n log n) 原地，不稳定</text>

          {/* ===== 底部：复杂度表 ===== */}
          <rect x="40" y="350" width={VIEW_W - 80} height="92" rx="10" fill={accent} fillOpacity="0.04" stroke={accent} strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="372" textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>复杂度对比</text>

          {/* 表头 */}
          <text x="70" y="392" fontSize="11" fontWeight="700" fill={secondary}>算法</text>
          <text x="180" y="392" fontSize="11" fontWeight="700" fill={secondary}>最好</text>
          <text x="280" y="392" fontSize="11" fontWeight="700" fill={secondary}>平均</text>
          <text x="380" y="392" fontSize="11" fontWeight="700" fill={secondary}>最坏</text>
          <text x="480" y="392" fontSize="11" fontWeight="700" fill={secondary}>空间</text>
          <text x="580" y="392" fontSize="11" fontWeight="700" fill={secondary}>稳定</text>

          {[
            { name: "插入", best: "O(n)", avg: "O(n²)", worst: "O(n²)", space: "O(1)", stable: "是", color: accent },
            { name: "归并", best: "O(nlogn)", avg: "O(nlogn)", worst: "O(nlogn)", space: "O(n)", stable: "是", color: success },
            { name: "快排", best: "O(nlogn)", avg: "O(nlogn)", worst: "O(n²)", space: "O(logn)", stable: "否", color: warning },
            { name: "堆排", best: "O(nlogn)", avg: "O(nlogn)", worst: "O(nlogn)", space: "O(1)", stable: "否", color: danger },
          ].map((r, i) => (
            <g key={r.name}>
              <text x="70" y={408 + i * 12} fontSize="10" fill={r.color} fontWeight="600">{r.name}</text>
              <text x="180" y={408 + i * 12} fontSize="10" fill={primary}>{r.best}</text>
              <text x="280" y={408 + i * 12} fontSize="10" fill={primary}>{r.avg}</text>
              <text x="380" y={408 + i * 12} fontSize="10" fill={primary}>{r.worst}</text>
              <text x="480" y={408 + i * 12} fontSize="10" fill={primary}>{r.space}</text>
              <text x="580" y={408 + i * 12} fontSize="10" fill={primary}>{r.stable}</text>
            </g>
          ))}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        插入排序在小数组上最优（O(n)最好情况），归并排序保证 O(n log n) 且稳定但需额外空间，快排平均最快但最坏 O(n²)，堆排原地 O(n log n) 但缓存不友好。C++ std::sort 用内省排序融合三者优势。
      </figcaption>
    </figure>
  );
}
