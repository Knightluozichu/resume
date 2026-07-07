/**
 * <AaeAlgorithmEngineeringMap>：全书学习地图（advanced-algorithm 入门章）。
 *
 * 四大板块横向排布，展示「算法工程基础 → 高级数据结构 → 图与字符串算法 → 概率与分布式算法」的进阶关系：
 *   - 第 1 列「算法工程基础」（accent 紫）：复杂度分析、工程权衡、基准测试、性能调优
 *   - 第 2 列「高级数据结构」（success 绿）：跳表、B树、布隆过滤器、倒排索引
 *   - 第 3 列「图与字符串算法」（warning 黄）：Dijkstra / A*、KMP、Trie、后缀数组
 *   - 第 4 列「概率与分布式算法」（accent 紫）：近似算法、随机算法、并行算法、分布式共识
 * 列间用箭头连接表示进阶关系。
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×460（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 460;

const COL_W = 152;
const COL_GAP = 16;
const COL_MARGIN = 32;
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

const ITEM_H = 58;
const ITEM_GAP = 12;
const ITEM_START_Y = 112;
const itemY = (i: number) => ITEM_START_Y + i * (ITEM_H + ITEM_GAP);

interface Column {
  title: string;
  subtitle: string;
  color: string;
  items: string[];
}

const COLUMNS: readonly Column[] = [
  {
    title: "算法工程基础",
    subtitle: "Engineering",
    color: "var(--accent)",
    items: ["复杂度分析", "工程权衡", "基准测试", "性能调优"],
  },
  {
    title: "高级数据结构",
    subtitle: "Data Structures",
    color: "var(--success)",
    items: ["跳表 Skip List", "B 树 B-Tree", "布隆过滤器", "倒排索引"],
  },
  {
    title: "图与字符串算法",
    subtitle: "Graph & String",
    color: "var(--warning)",
    items: ["Dijkstra / A*", "KMP", "Trie", "后缀数组"],
  },
  {
    title: "概率与分布式",
    subtitle: "Prob & Distributed",
    color: "var(--accent)",
    items: ["近似算法", "随机算法", "并行算法", "分布式共识"],
  },
];

export function AaeAlgorithmEngineeringMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="高级算法与算法工程全书地图。四列纵向排列：第 1 列算法工程基础（紫色）包含复杂度分析、工程权衡、基准测试、性能调优；第 2 列高级数据结构（绿色）包含跳表、B 树、布隆过滤器、倒排索引；第 3 列图与字符串算法（黄色）包含 Dijkstra/A*、KMP、Trie、后缀数组；第 4 列概率与分布式算法（紫色）包含近似算法、随机算法、并行算法、分布式共识。列间用箭头连接表示进阶关系。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="aae-map-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            高级算法与算法工程 · 全书地图
          </text>
          <text x={VIEW_W / 2} y={58} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            从工程基础出发，经数据结构与图论，抵达概率与分布式——四块拼图
          </text>

          {/* 四列 */}
          {COLUMNS.map((col, ci) => {
            const cx = colX(ci);
            return (
              <g key={col.title}>
                {/* 列标题区 */}
                <rect x={cx} y={78} width={COL_W} height={28} rx="6" fill={col.color} fillOpacity="0.12" stroke={col.color} strokeWidth="1.5" />
                <text x={cx + COL_W / 2} y={97} textAnchor="middle" fontSize="12" fontWeight="700" fill={col.color}>
                  {col.title}
                </text>

                {/* 列内条目 */}
                {col.items.map((item, ii) => {
                  const y = itemY(ii);
                  return (
                    <g key={item}>
                      <rect x={cx} y={y} width={COL_W} height={ITEM_H} rx="8" fill={col.color} fillOpacity="0.06" stroke={col.color} strokeWidth="1.4" strokeOpacity="0.5" />
                      <text x={cx + COL_W / 2} y={y + ITEM_H / 2 + 5} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">
                        {item}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* 列间进阶箭头 */}
          {[0, 1, 2].map((i) => (
            <line
              key={`arrow-${i}`}
              x1={colX(i) + COL_W + 4}
              y1={itemY(1) + ITEM_H / 2}
              x2={colX(i + 1) - 4}
              y2={itemY(1) + ITEM_H / 2}
              stroke="var(--text-secondary)"
              strokeWidth="1.6"
              markerEnd="url(#aae-map-arrow)"
            />
          ))}

          {/* 底部总结 */}
          <line x1={32} y1={410} x2={VIEW_W - 32} y2={410} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={434} textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            工程奠基，数据结构筑基，图论字符串拓展，概率分布式延伸
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书四大板块：算法工程基础（复杂度分析、工程权衡、基准测试、性能调优）奠基，高级数据结构（跳表、B 树、布隆过滤器、倒排索引）筑基，图与字符串算法（Dijkstra/A*、KMP、Trie、后缀数组）拓展，概率与分布式（近似、随机、并行、共识）延伸。
      </figcaption>
    </figure>
  );
}
