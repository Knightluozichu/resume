/**
 * <AaeDataStructuresComparisonDiagram>：高级数据结构对比图（advanced-algorithm 数据结构章）。
 *
 * 三个并排卡片对比：
 *   - 跳表 Skip List（accent 紫）：多层链表，O(log n) 查找
 *   - B 树 B-Tree（success 绿）：多路搜索树，磁盘友好
 *   - 布隆过滤器 Bloom Filter（warning 黄）：位数组 + 哈希，概率型
 * 每个卡片标注：原理图示、时间复杂度、适用场景、优缺点。
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×520（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 520;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

const CARD_W = 210;
const CARD_X = [32, 254, 476];
const CARD_Y = 72;
const CARD_H = 420;

interface CardDef {
  title: string;
  subtitle: string;
  color: string;
  complexity: string;
  scenario: string;
  pros: string;
  cons: string;
}

const CARDS: readonly CardDef[] = [
  {
    title: "跳表 Skip List",
    subtitle: "多层链表",
    color: accent,
    complexity: "查找 / 插入 / 删除  O(log n)",
    scenario: "有序集合、并发索引、Redis ZSet",
    pros: "实现简单、锁粒度细、天然支持范围查询",
    cons: "多层指针占额外空间、概率性平衡",
  },
  {
    title: "B 树 B-Tree",
    subtitle: "多路搜索树",
    color: success,
    complexity: "查找 / 插入 / 删除  O(log n)",
    scenario: "数据库索引、磁盘存储、文件系统",
    pros: "磁盘友好、高扇出、矮而宽",
    cons: "实现复杂、分裂合并开销大",
  },
  {
    title: "布隆过滤器",
    subtitle: "位数组 + 哈希",
    color: warning,
    complexity: "查找 / 插入  O(k)",
    scenario: "缓存穿透防护、去重、黑名单",
    pros: "空间极省、常数时间、适合海量数据",
    cons: "存在误判、不支持删除、无法取回元素",
  },
];

// 段落起始 Y（卡片内绝对坐标）
const SEC = [
  { label: "时间复杂度", valueKey: "complexity", y: 214 },
  { label: "适用场景", valueKey: "scenario", y: 268 },
  { label: "优点", valueKey: "pros", y: 322 },
  { label: "缺点", valueKey: "cons", y: 376 },
] as const;

export function AaeDataStructuresComparisonDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="高级数据结构对比图。三个并排卡片：跳表（紫色，多层链表，O(log n) 查找）；B 树（绿色，多路搜索树，磁盘友好）；布隆过滤器（黄色，位数组加哈希，概率型）。每个卡片包含原理图示、时间复杂度、适用场景、优缺点。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            高级数据结构 · 三剑客对比
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            跳表用概率换平衡，B 树用宽度换高度，布隆用误差换空间
          </text>

          {/* 三张卡片 */}
          {CARDS.map((card, ci) => {
            const x = CARD_X[ci];
            return (
              <g key={card.title}>
                {/* 卡片背景 */}
                <rect x={x} y={CARD_Y} width={CARD_W} height={CARD_H} rx="12" fill={card.color} fillOpacity="0.05" stroke={card.color} strokeWidth="1.6" strokeOpacity="0.6" />

                {/* 卡片头部 */}
                <rect x={x} y={CARD_Y} width={CARD_W} height={36} rx="12" fill={card.color} fillOpacity="0.14" />
                <rect x={x} y={CARD_Y + 18} width={CARD_W} height={18} fill={card.color} fillOpacity="0.14" />
                <text x={x + CARD_W / 2} y={CARD_Y + 23} textAnchor="middle" fontSize="13.5" fontWeight="700" fill={card.color}>
                  {card.title}
                </text>
                <text x={x + CARD_W / 2} y={CARD_Y + 53} textAnchor="middle" fontSize="11" fill={secondary}>
                  {card.subtitle}
                </text>

                {/* 结构示意标签 */}
                <text x={x + 12} y={CARD_Y + 76} fontSize="10.5" fontWeight="600" fill={secondary} letterSpacing="0.5">
                  结构示意
                </text>

                {/* ===== 原理图示 ===== */}
                {ci === 0 && <SkipListDiagram left={x} color={card.color} />}
                {ci === 1 && <BTreeDiagram left={x} color={card.color} />}
                {ci === 2 && <BloomDiagram left={x} color={card.color} />}

                {/* 分隔线 */}
                <line x1={x + 14} y1={CARD_Y + 138} x2={x + CARD_W - 14} y2={CARD_Y + 138} stroke={border} strokeWidth="1" strokeDasharray="3 3" />

                {/* ===== 四个信息段 ===== */}
                {SEC.map((sec) => (
                  <g key={sec.label}>
                    {/* 段标签小药丸 */}
                    <rect x={x + 12} y={sec.y - 13} width={64} height={18} rx="4" fill={card.color} fillOpacity="0.1" stroke={card.color} strokeWidth="1" strokeOpacity="0.5" />
                    <text x={x + 44} y={sec.y} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={card.color}>
                      {sec.label}
                    </text>
                    {/* 段值 */}
                    <text x={x + 12} y={sec.y + 22} fontSize="11" fill={primary}>
                      {card[sec.valueKey]}
                    </text>
                  </g>
                ))}
              </g>
            );
          })}

          {/* 底部总结 */}
          <line x1={32} y1={494} x2={VIEW_W - 32} y2={494} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={512} textAnchor="middle" fontSize="11.5" fill={secondary}>
            选型看场景：内存有序用跳表，外存索引用 B 树，海量判重用布隆
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        跳表（多层链表，O(log n)，并发友好）、B 树（多路搜索树，磁盘友好）、布隆过滤器（位数组+哈希，O(k)，概率型）三者对比，各有适用场景。
      </figcaption>
    </figure>
  );
}

/* ---------- 跳表示意：多层链表，上层稀疏 ---------- */
function SkipListDiagram({ left, color }: { left: number; color: string }) {
  const x0 = left + 20;
  const step = 38;
  const lvY = [CARD_Y + 92, CARD_Y + 110, CARD_Y + 128];
  // 第 0 层 4 节点，第 1 层 3 节点，第 2 层 2 节点
  const nodesL0 = [0, 1, 2, 3];
  const nodesL1 = [0, 1, 2];
  const nodesL2 = [0, 2];
  const cx = (i: number) => x0 + i * step;
  return (
    <g>
      {/* 水平链接 */}
      {lvY.map((y, li) => {
        const nodes = li === 0 ? nodesL0 : li === 1 ? nodesL1 : nodesL2;
        return nodes.slice(0, -1).map((i) => (
          <line key={`h-${li}-${i}`} x1={cx(i) + 6} y1={y} x2={cx(i + 1) - 6} y2={y} stroke={color} strokeWidth="1.4" strokeOpacity="0.7" />
        ));
      })}
      {/* 垂直链接（同一列跨层） */}
      {[0, 1, 2].map((i) => (
        <line key={`v-${i}`} x1={cx(i)} y1={lvY[0]} x2={cx(i)} y2={lvY[2]} stroke={color} strokeWidth="1" strokeOpacity="0.4" strokeDasharray="2 2" />
      ))}
      {/* 节点 */}
      {nodesL0.map((i) => (
        <circle key={`n0-${i}`} cx={cx(i)} cy={lvY[0]} r="6" fill="var(--bg-elevated)" stroke={color} strokeWidth="1.6" />
      ))}
      {nodesL1.map((i) => (
        <circle key={`n1-${i}`} cx={cx(i)} cy={lvY[1]} r="6" fill={color} fillOpacity="0.5" stroke={color} strokeWidth="1.4" />
      ))}
      {nodesL2.map((i) => (
        <circle key={`n2-${i}`} cx={cx(i)} cy={lvY[2]} r="6" fill={color} stroke={color} strokeWidth="1.4" />
      ))}
      {/* 层级标注 */}
      <text x={left + CARD_W - 12} y={lvY[0] + 4} textAnchor="end" fontSize="9.5" fill={secondary}>L0</text>
      <text x={left + CARD_W - 12} y={lvY[2] + 4} textAnchor="end" fontSize="9.5" fill={secondary}>L2</text>
    </g>
  );
}

/* ---------- B 树示意：根 + 三孩子 ---------- */
function BTreeDiagram({ left, color }: { left: number; color: string }) {
  const cx = left + CARD_W / 2;
  const rootY = CARD_Y + 96;
  const childY = CARD_Y + 130;
  const childXs = [cx - 70, cx, cx + 70];
  return (
    <g>
      {/* 根节点 */}
      <rect x={cx - 26} y={rootY - 13} width="52" height="22" rx="4" fill={color} fillOpacity="0.18" stroke={color} strokeWidth="1.6" />
      <text x={cx} y={rootY + 2} textAnchor="middle" fontSize="11" fontWeight="700" fill={color} fontFamily="monospace">10│20</text>
      {/* 连线 */}
      {childXs.map((x, i) => (
        <line key={`b-link-${i}`} x1={cx} y1={rootY + 9} x2={x} y2={childY - 11} stroke={color} strokeWidth="1.4" strokeOpacity="0.6" />
      ))}
      {/* 孩子节点 */}
      {childXs.map((x, i) => (
        <g key={`b-child-${i}`}>
          <rect x={x - 22} y={childY - 11} width="44" height="20" rx="4" fill="var(--bg-elevated)" stroke={color} strokeWidth="1.4" />
          <text x={x} y={childY + 3} textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">
            {i === 0 ? "≤10" : i === 1 ? "11-20" : "≥21"}
          </text>
        </g>
      ))}
    </g>
  );
}

/* ---------- 布隆过滤器示意：位数组 + 哈希映射 ---------- */
function BloomDiagram({ left, color }: { left: number; color: string }) {
  const cells = 10;
  const cellW = 14;
  const startX = left + 20;
  const bitY = CARD_Y + 130;
  const filled = new Set([2, 5, 7]);
  // 两个元素及其哈希落点
  const elems = [
    { ch: "a", x: left + 70, cells: [2, 5] },
    { ch: "b", x: left + 140, cells: [5, 7] },
  ];
  return (
    <g>
      {/* 元素 → 位数组 的哈希箭头 */}
      {elems.map((e) =>
        e.cells.map((c) => (
          <line
            key={`bl-${e.ch}-${c}`}
            x1={e.x}
            y1={CARD_Y + 96}
            x2={startX + c * cellW + cellW / 2}
            y2={bitY - 2}
            stroke={color}
            strokeWidth="1"
            strokeOpacity="0.45"
            strokeDasharray="3 2"
          />
        ))
      )}
      {/* 元素胶囊 */}
      {elems.map((e) => (
        <g key={`be-${e.ch}`}>
          <circle cx={e.x} cy={CARD_Y + 90} r="9" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.4" />
          <text x={e.x} y={CARD_Y + 94} textAnchor="middle" fontSize="11" fontWeight="700" fill={color} fontFamily="monospace">{e.ch}</text>
        </g>
      ))}
      {/* 位数组 */}
      {Array.from({ length: cells }).map((_, i) => (
        <rect
          key={`bit-${i}`}
          x={startX + i * cellW}
          y={bitY}
          width={cellW}
          height={cellW}
          rx="2"
          fill={filled.has(i) ? color : "var(--bg-elevated)"}
          fillOpacity={filled.has(i) ? 0.7 : 1}
          stroke={color}
          strokeWidth="1.2"
          strokeOpacity={filled.has(i) ? 0.9 : 0.4}
        />
      ))}
      <text x={left + 12} y={bitY + 30} fontSize="9.5" fill={secondary}>k 个哈希 → 位数组</text>
    </g>
  );
}
