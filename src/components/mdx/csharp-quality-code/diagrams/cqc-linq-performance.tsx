/**
 * <CqcLinqPerformanceDiagram>：LINQ 延迟执行 vs 立即执行与链式流水线。
 *
 * 上半部分展示 LINQ 链式调用的延迟执行流水线：
 *   Where → Select → OrderBy → Take
 * 每一步只记录操作，不执行，直到 ToList() 触发遍历。
 * 下半部分对比「多次遍历」与「一次遍历」的性能差异。
 * 右侧标注延迟执行与立即执行的方法分类。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

export function CqcLinqPerformanceDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="LINQ 延迟执行与立即执行。上半部分展示链式调用流水线 Where Select OrderBy Take，延迟到 ToList 才遍历。下半部分对比多次遍历与一次遍历。右侧分类延迟执行与立即执行方法。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            LINQ 性能 · 延迟执行与流水线
          </text>

          {/* ===== 上半：延迟执行流水线 ===== */}
          <text x="360" y="56" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">延迟执行：链式调用只记录不执行</text>

          {/* 流水线节点 */}
          {[
            { x: 36, label: "source", sub: "IEnumerable", color: "var(--text-secondary)", w: 100 },
            { x: 146, label: "Where", sub: "过滤", color: "var(--accent)", w: 90 },
            { x: 246, label: "Select", sub: "映射", color: "var(--accent)", w: 90 },
            { x: 346, label: "OrderBy", sub: "排序", color: "var(--warning)", w: 100 },
            { x: 456, label: "Take(10)", sub: "截取", color: "var(--accent)", w: 100 },
            { x: 566, label: "ToList()", sub: "立即执行", color: "var(--success)", w: 120 },
          ].map((n, i) => (
            <g key={n.label}>
              <rect x={n.x} y="70" width={n.w} height="48" rx="8" fill="var(--bg)" stroke={n.color} strokeWidth="1.4" />
              <text x={n.x + n.w / 2} y="90" textAnchor="middle" fontSize="12" fontWeight="700" fill={n.color}>{n.label}</text>
              <text x={n.x + n.w / 2} y="106" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{n.sub}</text>
              {i < 5 && (
                <g>
                  <line x1={n.x + n.w} y1="94" x2={n.x + n.w + 6} y2="94" stroke="var(--text-secondary)" strokeWidth="1.4" strokeOpacity="0.6" />
                  <polygon points={`${n.x + n.w + 6},94 ${n.x + n.w + 2},90 ${n.x + n.w + 2},98`} fill="var(--text-secondary)" fillOpacity="0.6" />
                </g>
              )}
            </g>
          ))}

          {/* 触发标注 */}
          <rect x="36" y="128" width="650" height="26" rx="6" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            前 5 步只构建查询树，不遍历数据；<tspan fontWeight="700" fill="var(--success)">ToList()</tspan> 触发一次遍历，流水线依次执行
          </text>

          {/* ===== 下半：多次遍历 vs 一次遍历 ===== */}
          <text x="360" y="176" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">陷阱：延迟执行导致多次遍历</text>

          {/* 多次遍历行 */}
          <rect x="40" y="190" width="100" height="34" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.3" />
          <text x="90" y="212" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">多次遍历</text>

          <rect x="150" y="190" width="160" height="34" rx="4" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="230" y="212" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">var q = src.Where(...)</text>

          <rect x="316" y="190" width="120" height="34" rx="4" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="376" y="212" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">q.Count() 遍历1</text>

          <rect x="442" y="190" width="140" height="34" rx="4" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="512" y="212" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">q.Sum() 遍历2</text>

          <rect x="588" y="190" width="96" height="34" rx="4" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="636" y="212" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">2 倍开销</text>

          {/* 一次遍历行 */}
          <rect x="40" y="234" width="100" height="34" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.3" />
          <text x="90" y="256" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">一次遍历</text>

          <rect x="150" y="234" width="160" height="34" rx="4" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="230" y="256" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">var list = q.ToList()</text>

          <rect x="316" y="234" width="120" height="34" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="376" y="256" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">list.Count O(1)</text>

          <rect x="442" y="234" width="140" height="34" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="512" y="256" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">list.Sum() 遍历1</text>

          <rect x="588" y="234" width="96" height="34" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="636" y="256" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">1 倍开销</text>

          {/* ===== 底部：分类表 ===== */}
          <rect x="36" y="282" width={VIEW_W - 72} height="118" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.35" />

          <text x="52" y="304" fontSize="12" fontWeight="700" fill="var(--accent)">延迟执行（不立即遍历）</text>
          <text x="52" y="324" fontSize="11" fill="var(--text-secondary)">Where / Select / OrderBy / Skip / Take / GroupBy / SelectMany</text>
          <text x="52" y="342" fontSize="11" fill="var(--text-secondary)">特征：返回 IEnumerable，多次枚举多次执行</text>

          <text x="52" y="366" fontSize="12" fontWeight="700" fill="var(--success)">立即执行（一次遍历出结果）</text>
          <text x="52" y="386" fontSize="11" fill="var(--text-secondary)">ToList / ToArray / Count / Sum / First / Any / ToDictionary</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        LINQ 延迟执行方法只构建查询树不遍历，立即执行方法触发一次遍历。对延迟查询多次调用 Count/Sum 会多次遍历，应先 ToList 物化。
      </figcaption>
    </figure>
  );
}
