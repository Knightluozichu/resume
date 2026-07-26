/**
 * <AaeStringAlgorithmsDiagram>：字符串算法对比图（advanced-algorithm 字符串章）。
 *
 * 三个并排区域对比：
 *   - KMP 算法（accent 紫）：展示模式串 "ABABD" 的 next/失败指针数组 [0,0,1,2,0] 与失配回退
 *   - Trie 树（success 绿）：展示单词树 root → 分支 → leaf，含 cat / car / dog
 *   - 后缀数组（warning 暖）：展示字符串 "banana" 的后缀排序 SA=[5,3,1,0,4,2]
 * 每个区域标注时间复杂度与适用场景。
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×460（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 460;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

const CARD_W = 210;
const CARD_X = [32, 254, 476];
const CARD_Y = 72;
const CARD_H = 348;

// KMP 模式串
const PATTERN = ["A", "B", "A", "B", "D"];
const NEXT = [0, 0, 1, 2, 0];

// Trie 节点
interface TNode {
  ch: string;
  x: number;
  y: number;
  leaf: boolean;
}
const TRIE_NODES: TNode[] = [
  { ch: "root", x: 359, y: 124, leaf: false },
  { ch: "c", x: 327, y: 158, leaf: false },
  { ch: "d", x: 397, y: 158, leaf: false },
  { ch: "a", x: 327, y: 192, leaf: false },
  { ch: "o", x: 397, y: 192, leaf: false },
  { ch: "t", x: 305, y: 228, leaf: true },
  { ch: "r", x: 349, y: 228, leaf: true },
  { ch: "g", x: 397, y: 228, leaf: true },
];
const TRIE_EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [3, 5],
  [3, 6],
  [2, 4],
  [4, 7],
];

// 后缀数组 banana
const SA: { idx: number; suf: string }[] = [
  { idx: 5, suf: "a" },
  { idx: 3, suf: "ana" },
  { idx: 1, suf: "anana" },
  { idx: 0, suf: "banana" },
  { idx: 4, suf: "na" },
  { idx: 2, suf: "nana" },
];

interface ColDef {
  title: string;
  subtitle: string;
  color: string;
  complexity: string;
  scenario: string;
}

const COLS: readonly ColDef[] = [
  { title: "KMP 算法", subtitle: "失配指针", color: accent, complexity: "O(n + m)", scenario: "单模式匹配 · 避免回溯" },
  { title: "Trie 树", subtitle: "前缀树", color: success, complexity: "O(L) 插入 / 查找", scenario: "前缀检索 · 自动补全" },
  { title: "后缀数组", subtitle: "SA", color: warning, complexity: "O(n log n) 构建", scenario: "多模式匹配 · LCP · 全文索引" },
];

export function AaeStringAlgorithmsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="字符串算法对比图。三个并排区域：KMP 算法（紫色）展示模式串 ABABD 的 next 数组 0,0,1,2,0 与失配回退；Trie 树（绿色）展示 cat、car、dog 的前缀树；后缀数组（暖色）展示 banana 的后缀排序 SA=5,3,1,0,4,2。每个区域标注时间复杂度与适用场景。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            字符串算法 · 三大利器
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            KMP 用失配指针消回溯，Trie 用前缀共享，后缀数组用排序换索引
          </text>

          {/* 三列 */}
          {COLS.map((col, ci) => {
            const x = CARD_X[ci];
            return (
              <g key={col.title}>
                {/* 列背景 */}
                <rect x={x} y={CARD_Y} width={CARD_W} height={CARD_H} rx="12" fill={col.color} fillOpacity="0.05" stroke={col.color} strokeWidth="1.6" strokeOpacity="0.5" />
                {/* 列头部 */}
                <rect x={x} y={CARD_Y} width={CARD_W} height={34} rx="12" fill={col.color} fillOpacity="0.14" />
                <rect x={x} y={CARD_Y + 16} width={CARD_W} height={18} fill={col.color} fillOpacity="0.14" />
                <text x={x + CARD_W / 2} y={CARD_Y + 22} textAnchor="middle" fontSize="13" fontWeight="700" fill={col.color}>
                  {col.title}
                </text>
                <text x={x + CARD_W / 2} y={CARD_Y + 52} textAnchor="middle" fontSize="11" fill={secondary}>
                  {col.subtitle}
                </text>

                {/* ===== KMP 图示 ===== */}
                {ci === 0 && (
                  <g>
                    <text x={x + CARD_W / 2} y={CARD_Y + 78} textAnchor="middle" fontSize="11" fill={secondary}>
                      pattern
                    </text>
                    {PATTERN.map((c, i) => {
                      const cx = x + 70 + i * 28;
                      return (
                        <g key={`kmp-c-${i}`}>
                          <rect x={cx} y={CARD_Y + 86} width="26" height="26" rx="4" fill={elevated} stroke={col.color} strokeWidth="1.5" />
                          <text x={cx + 13} y={CARD_Y + 104} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary} fontFamily="monospace">
                            {c}
                          </text>
                        </g>
                      );
                    })}
                    {/* next 数组 */}
                    <text x={x + CARD_W / 2} y={CARD_Y + 134} textAnchor="middle" fontSize="11" fill={secondary}>
                      next[] 失败指针
                    </text>
                    {NEXT.map((v, i) => {
                      const cx = x + 70 + i * 28;
                      return (
                        <g key={`kmp-n-${i}`}>
                          <rect x={cx} y={CARD_Y + 140} width="26" height="22" rx="4" fill={col.color} fillOpacity="0.12" stroke={col.color} strokeWidth="1" strokeOpacity="0.5" />
                          <text x={cx + 13} y={CARD_Y + 155} textAnchor="middle" fontSize="12" fontWeight="700" fill={col.color} fontFamily="monospace">
                            {v}
                          </text>
                        </g>
                      );
                    })}
                    {/* 失配回退说明 */}
                    <text x={x + CARD_W / 2} y={CARD_Y + 184} textAnchor="middle" fontSize="11" fill={primary}>
                      失配时 j = next[j]
                    </text>
                    <text x={x + CARD_W / 2} y={CARD_Y + 200} textAnchor="middle" fontSize="11" fill={secondary}>
                      无需回溯文本指针
                    </text>
                  </g>
                )}

                {/* ===== Trie 图示 ===== */}
                {ci === 1 && (
                  <g>
                    {TRIE_EDGES.map(([a, b], i) => (
                      <line
                        key={`trie-e-${i}`}
                        x1={TRIE_NODES[a].x}
                        y1={TRIE_NODES[a].y}
                        x2={TRIE_NODES[b].x}
                        y2={TRIE_NODES[b].y}
                        stroke={col.color}
                        strokeWidth="1.5"
                        strokeOpacity="0.6"
                      />
                    ))}
                    {TRIE_NODES.map((n, i) => (
                      <g key={`trie-n-${i}`}>
                        <circle
                          cx={n.x}
                          cy={n.y}
                          r={n.ch === "root" ? 11 : 10}
                          fill={n.leaf ? col.color : elevated}
                          fillOpacity={n.leaf ? 0.85 : 1}
                          stroke={col.color}
                          strokeWidth="1.6"
                        />
                        <text
                          x={n.x}
                          y={n.y + 4}
                          textAnchor="middle"
                          fontSize={n.ch === "root" ? 9 : 11}
                          fontWeight="700"
                          fill={n.leaf ? elevated : primary}
                          fontFamily="monospace"
                        >
                          {n.ch === "root" ? "∅" : n.ch}
                        </text>
                      </g>
                    ))}
                    <text x={x + CARD_W / 2} y={CARD_Y + 260} textAnchor="middle" fontSize="11" fill={secondary} fontFamily="monospace">
                      cat · car · dog
                    </text>
                  </g>
                )}

                {/* ===== 后缀数组图示 ===== */}
                {ci === 2 && (
                  <g>
                    <text x={x + CARD_W / 2} y={CARD_Y + 78} textAnchor="middle" fontSize="11" fill={secondary}>
                      text = banana
                    </text>
                    {/* SA 行 */}
                    {SA.map((r, i) => {
                      const ry = CARD_Y + 98 + i * 22;
                      return (
                        <g key={`sa-${i}`}>
                          <rect x={x + 24} y={ry - 13} width="26" height="18" rx="3" fill={col.color} fillOpacity="0.14" stroke={col.color} strokeWidth="1" strokeOpacity="0.5" />
                          <text x={x + 37} y={ry} textAnchor="middle" fontSize="11" fontWeight="700" fill={col.color} fontFamily="monospace">
                            {r.idx}
                          </text>
                          <text x={x + 58} y={ry} fontSize="11" fill={primary} fontFamily="monospace">
                            {r.suf}
                          </text>
                        </g>
                      );
                    })}
                    <text x={x + CARD_W / 2} y={CARD_Y + 244} textAnchor="middle" fontSize="11" fill={col.color} fontFamily="monospace">
                      SA = [5,3,1,0,4,2]
                    </text>
                  </g>
                )}

                {/* 分隔线 */}
                <line x1={x + 14} y1={CARD_Y + 268} x2={x + CARD_W - 14} y2={CARD_Y + 268} stroke={border} strokeWidth="1" strokeDasharray="3 3" />

                {/* 复杂度 */}
                <rect x={x + 12} y={CARD_Y + 280} width={64} height={18} rx="4" fill={col.color} fillOpacity="0.1" stroke={col.color} strokeWidth="1" strokeOpacity="0.5" />
                <text x={x + 44} y={CARD_Y + 293} textAnchor="middle" fontSize="11" fontWeight="700" fill={col.color}>
                  复杂度
                </text>
                <text x={x + 12} y={CARD_Y + 316} fontSize="11.5" fontWeight="600" fill={primary} fontFamily="monospace">
                  {col.complexity}
                </text>

                {/* 适用场景 */}
                <rect x={x + 12} y={CARD_Y + 326} width={64} height={18} rx="4" fill={col.color} fillOpacity="0.1" stroke={col.color} strokeWidth="1" strokeOpacity="0.5" />
                <text x={x + 44} y={CARD_Y + 339} textAnchor="middle" fontSize="11" fontWeight="700" fill={col.color}>
                  场景
                </text>
                <text x={x + 12} y={CARD_Y + 362} fontSize="11" fill={primary}>
                  {col.scenario}
                </text>
              </g>
            );
          })}

          {/* 底部总结 */}
          <line x1={32} y1={436} x2={VIEW_W - 32} y2={436} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={454} textAnchor="middle" fontSize="11.5" fill={secondary}>
            单串匹配用 KMP，前缀共享用 Trie，全串索引用后缀数组
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        KMP（next 数组 [0,0,1,2,0]，O(n+m) 单模式匹配）、Trie（cat/car/dog 前缀树，O(L) 前缀检索）、后缀数组（banana 的 SA=[5,3,1,0,4,2]，O(n log n) 构建，多模式与 LCP）三者对比。
      </figcaption>
    </figure>
  );
}
