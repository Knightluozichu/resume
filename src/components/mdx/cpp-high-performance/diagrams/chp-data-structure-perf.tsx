/**
 * <ChpDataStructurePerfDiagram>：数据结构性能与内存布局对比（cpp-high-performance 数据结构章）。
 *
 * 四列对比 array / vector / list / map：
 *   每列顶部画内存布局示意（连续格子 / 连续+容量 / 散落节点指针 / 树形节点），
 *   中部列「随机访问 / 插入删除 / 缓存命中」三维性能评分，底部列典型场景。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×460、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / 四列主体 / 底部总结）。
 */

const VIEW_W = 720;
const VIEW_H = 460;

const COL_W = 156;
const COL_GAP = 16;
const COL_MARGIN = 48;
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);
const COL_TOP = 100;

type DS = {
  id: string;
  name: string;
  color: string;
  random: string;
  insert: string;
  cache: string;
  fit: string;
};

const DS_LIST: readonly DS[] = [
  { id: "array", name: "array", color: "var(--success)", random: "O(1) 极快", insert: "末尾 O(1) / 中间 O(n)", cache: "极好", fit: "大小固定的连续数据" },
  { id: "vector", name: "vector", color: "var(--accent)", random: "O(1) 极快", insert: "末尾均摊 O(1)", cache: "极好", fit: "动态增长的连续数据" },
  { id: "list", name: "list", color: "var(--warning)", random: "O(n) 慢", insert: "任意处 O(1)", cache: "差（节点散落）", fit: "频繁中间插删" },
  { id: "map", name: "map", color: "var(--danger)", random: "O(log n)", insert: "O(log n)", cache: "差（红黑树散落）", fit: "按 key 查找" },
];

export function ChpDataStructurePerfDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="四种数据结构性能对比。array：随机访问 O(1) 极快，末尾插入 O(1) 中间 O(n)，缓存极好，适合大小固定的连续数据；vector：随机访问 O(1) 极快，末尾均摊 O(1)，缓存极好，适合动态增长的连续数据；list：随机访问 O(n) 慢，任意处插入 O(1)，缓存差（节点散落），适合频繁中间插删；map：随机访问 O(log n)，插入 O(log n)，缓存差（红黑树散落），适合按 key 查找。连续布局缓存友好，链式布局缓存差。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            数据结构 · 内存布局与性能对比
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            连续布局缓存友好（array/vector），链式布局缓存差（list/map）
          </text>

          {/* ===== 四列 ===== */}
          {DS_LIST.map((d, ci) => {
            const x = colX(ci);
            const cx = x + COL_W / 2;
            return (
              <g key={d.id}>
                {/* 列头 pill */}
                <rect x={x} y={COL_TOP} width={COL_W} height="28" rx="8" fill={d.color} fillOpacity="0.12" stroke={d.color} strokeWidth="1.2" />
                <text x={cx} y={COL_TOP + 19} textAnchor="middle" fontSize="14" fontWeight="700" fill={d.color}>{d.name}</text>

                {/* 内存布局示意区 */}
                <rect x={x} y={COL_TOP + 40} width={COL_W} height="80" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
                {d.id === "array" && (
                  <>
                    {[0, 1, 2, 3].map((k) => (
                      <rect key={k} x={x + 18 + k * 30} y={COL_TOP + 64} width="28" height="32" rx="3" fill={d.color} fillOpacity="0.25" stroke={d.color} strokeWidth="1.2" />
                    ))}
                    <text x={cx} y={COL_TOP + 112} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">连续定长</text>
                  </>
                )}
                {d.id === "vector" && (
                  <>
                    {[0, 1, 2].map((k) => (
                      <rect key={k} x={x + 24 + k * 30} y={COL_TOP + 64} width="28" height="32" rx="3" fill={d.color} fillOpacity="0.25" stroke={d.color} strokeWidth="1.2" />
                    ))}
                    <rect x={x + 114} y={COL_TOP + 64} width="28" height="32" rx="3" fill="none" stroke={d.color} strokeWidth="1.2" strokeDasharray="3 2" />
                    <text x={cx} y={COL_TOP + 112} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">连续 + 预留容量</text>
                  </>
                )}
                {d.id === "list" && (
                  <>
                    {[0, 1, 2].map((k) => (
                      <g key={k}>
                        <rect x={x + 20 + k * 44} y={COL_TOP + 68} width="24" height="24" rx="3" fill={d.color} fillOpacity="0.25" stroke={d.color} strokeWidth="1.2" />
                        {k < 2 && <line x1={x + 44 + k * 44} y1={COL_TOP + 80} x2={x + 60 + k * 44} y2={COL_TOP + 80} stroke={d.color} strokeWidth="1.2" />}
                      </g>
                    ))}
                    <text x={cx} y={COL_TOP + 112} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">节点散落 + 指针</text>
                  </>
                )}
                {d.id === "map" && (
                  <>
                    <circle cx={cx} cy={COL_TOP + 76} r="9" fill={d.color} fillOpacity="0.25" stroke={d.color} strokeWidth="1.2" />
                    <circle cx={x + 40} cy={COL_TOP + 100} r="8" fill={d.color} fillOpacity="0.25" stroke={d.color} strokeWidth="1.2" />
                    <circle cx={x + COL_W - 40} cy={COL_TOP + 100} r="8" fill={d.color} fillOpacity="0.25" stroke={d.color} strokeWidth="1.2" />
                    <line x1={cx} y1={COL_TOP + 84} x2={x + 40} y2={COL_TOP + 92} stroke={d.color} strokeWidth="1.2" />
                    <line x1={cx} y1={COL_TOP + 84} x2={x + COL_W - 40} y2={COL_TOP + 92} stroke={d.color} strokeWidth="1.2" />
                    <text x={cx} y={COL_TOP + 112} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">红黑树节点</text>
                  </>
                )}

                {/* 性能评分卡 */}
                <rect x={x} y={COL_TOP + 132} width={COL_W} height="116" rx="8" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="0.8" />
                <text x={x + 12} y={COL_TOP + 152} fontSize="11" fill="var(--text-secondary)">
                  <tspan fontWeight="700" fill="var(--text-primary)">随机访问：</tspan>
                </text>
                <text x={x + 12} y={COL_TOP + 168} fontSize="11" fill={d.color}>{d.random}</text>
                <text x={x + 12} y={COL_TOP + 190} fontSize="11" fill="var(--text-secondary)">
                  <tspan fontWeight="700" fill="var(--text-primary)">插删：</tspan>
                  <tspan fill="var(--text-primary)">{d.insert}</tspan>
                </text>
                <text x={x + 12} y={COL_TOP + 212} fontSize="11" fill="var(--text-secondary)">
                  <tspan fontWeight="700" fill="var(--text-primary)">缓存：</tspan>
                  <tspan fill={d.color}>{d.cache}</tspan>
                </text>
                <text x={x + 12} y={COL_TOP + 236} fontSize="11" fill="var(--text-secondary)">
                  <tspan fontWeight="700" fill="var(--text-primary)">适合：</tspan>
                  <tspan fill="var(--text-primary)">{d.fit}</tspan>
                </text>
              </g>
            );
          })}

          {/* ===== 底部总结栏 ===== */}
          <rect x="60" y={VIEW_H - 44} width={VIEW_W - 120} height="28" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={VIEW_H - 26} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            默认选 vector：连续内存 + 末尾 O(1)，缓存命中让「纸面 O(n)」跑赢链表「O(1)」
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        array 与 vector 内存连续、缓存友好，随机访问 O(1)；list 任意处插删 O(1) 但节点散落、缓存差；map 用红黑树按 key 查找 O(log n)。实际工程中，vector 因缓存命中常在「插删」场景也跑赢纸面更优的 list——选数据结构要看真实访存模式而非仅看大 O。
      </figcaption>
    </figure>
  );
}
