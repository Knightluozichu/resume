/**
 * <DsaTreesDiagram>：BST→AVL→B树演进图解（dsa-trees 章）。
 *
 * 左侧：BST 退化问题 + AVL 旋转修复。
 * 右侧：AVL 四种旋转 + B 树结构。
 *
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

export function DsaTreesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="树结构演进图解。左侧 BST 退化：有序插入退化为链表 O(n)。AVL 旋转修复：LL/RR/LR/RL 四种旋转保持平衡。右侧 B 树：m 阶多路搜索树，每节点多关键字，高度 O(log_m n)，专为磁盘 I/O 优化。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>BST → AVL → B 树：自平衡演进</text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill={secondary}>从退化到自平衡到磁盘优化</text>

          <line x1="340" y1="74" x2="340" y2="400" stroke={border} strokeWidth="1" strokeDasharray="4 4" />

          {/* ===== 左侧：BST 退化 + AVL ===== */}
          <text x="180" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>BST 退化 vs AVL 平衡</text>

          {/* 退化 BST（链表） */}
          <text x="64" y="112" fontSize="11" fontWeight="600" fill={danger}>退化 BST（有序插入）</text>
          {[1,2,3,4,5].map((v, i) => (
            <g key={v}>
              <circle cx="80" cy={128 + i * 22} r="11" fill={danger} fillOpacity="0.1" stroke={danger} strokeWidth="1.2" />
              <text x="80" y={132 + i * 22} textAnchor="middle" fontSize="11" fill={danger}>{v}</text>
              {i < 4 && <line x1="80" y1={139 + i * 22} x2="80" y2={145 + i * 22} stroke={danger} strokeWidth="1" />}
            </g>
          ))}
          <text x="120" y="172" fontSize="11" fill={danger}>高度=n → O(n)</text>

          {/* AVL 平衡树 */}
          <text x="200" y="112" fontSize="11" fontWeight="600" fill={success}>AVL 树（自平衡）</text>
          <circle cx="250" cy="128" r="12" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1.5" />
          <text x="250" y="132" textAnchor="middle" fontSize="11" fill={success}>3</text>
          <circle cx="220" cy="158" r="11" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1.5" />
          <text x="220" y="162" textAnchor="middle" fontSize="11" fill={success}>1</text>
          <circle cx="280" cy="158" r="11" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1.5" />
          <text x="280" y="162" textAnchor="middle" fontSize="11" fill={success}>4</text>
          <circle cx="240" cy="188" r="10" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1.5" />
          <text x="240" y="192" textAnchor="middle" fontSize="11" fill={success}>2</text>
          <circle cx="300" cy="188" r="10" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1.5" />
          <text x="300" y="192" textAnchor="middle" fontSize="11" fill={success}>5</text>
          <line x1="244" y1="136" x2="226" y2="152" stroke={border} strokeWidth="1.2" />
          <line x1="256" y1="136" x2="274" y2="152" stroke={border} strokeWidth="1.2" />
          <line x1="224" y1="166" x2="236" y2="182" stroke={border} strokeWidth="1.2" />
          <line x1="284" y1="166" x2="296" y2="182" stroke={border} strokeWidth="1.2" />
          <text x="250" y="214" textAnchor="middle" fontSize="11" fill={success}>高度=log n → O(log n)</text>

          {/* 四种旋转 */}
          <rect x="48" y="228" width="272" height="100" rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1" strokeOpacity="0.4" />
          <text x="64" y="248" fontSize="12" fontWeight="700" fill={warning}>AVL 四种旋转</text>
          <text x="64" y="268" fontSize="11" fill={primary}>LL：左左→右旋　RR：右右→左旋</text>
          <text x="64" y="286" fontSize="11" fill={primary}>LR：左右→先左旋再右旋</text>
          <text x="64" y="304" fontSize="11" fill={primary}>RL：右左→先右旋再左旋</text>
          <text x="64" y="320" fontSize="11" fill={secondary}>每次旋转 O(1)，保证 |BF|≤1</text>

          {/* ===== 右侧：B 树 ===== */}
          <text x="530" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>B 树（磁盘优化）</text>

          {/* B 树结构 */}
          {/* 根节点（多关键字） */}
          <rect x="440" y="108" width="180" height="32" rx="4" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.5" />
          <text x="480" y="128" textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>30</text>
          <text x="540" y="128" textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>60</text>
          <line x1="500" y1="108" x2="500" y2="140" stroke={border} strokeWidth="1" />
          <line x1="560" y1="108" x2="560" y2="140" stroke={border} strokeWidth="1" />

          {/* 子节点 */}
          <rect x="364" y="160" width="100" height="32" rx="4" fill="var(--bg)" stroke={success} strokeWidth="1.2" />
          <text x="390" y="180" textAnchor="middle" fontSize="11" fill={primary}>10|20</text>

          <rect x="476" y="160" width="100" height="32" rx="4" fill="var(--bg)" stroke={success} strokeWidth="1.2" />
          <text x="502" y="180" textAnchor="middle" fontSize="11" fill={primary}>40|50</text>

          <rect x="588" y="160" width="84" height="32" rx="4" fill="var(--bg)" stroke={success} strokeWidth="1.2" />
          <text x="610" y="180" textAnchor="middle" fontSize="11" fill={primary}>70|80</text>

          <line x1="470" y1="140" x2="414" y2="160" stroke={border} strokeWidth="1" />
          <line x1="530" y1="140" x2="526" y2="160" stroke={border} strokeWidth="1" />
          <line x1="590" y1="140" x2="630" y2="160" stroke={border} strokeWidth="1" />

          <text x="530" y="214" textAnchor="middle" fontSize="11" fill={accent}>每节点多关键字 · 高度 O(log_m n)</text>

          {/* B 树优势 */}
          <rect x="360" y="228" width="312" height="100" rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1" strokeOpacity="0.4" />
          <text x="376" y="248" fontSize="12" fontWeight="700" fill={accent}>B 树优势</text>
          <text x="376" y="268" fontSize="11" fill={primary}>· 节点填满磁盘块 → 一次 I/O 多关键字</text>
          <text x="376" y="286" fontSize="11" fill={primary}>· 高度 O(log_m n) → 极少 I/O 次数</text>
          <text x="376" y="304" fontSize="11" fill={primary}>· m=256, 10亿数据 → 仅 4 次 I/O</text>
          <text x="376" y="320" fontSize="11" fill={secondary}>· 数据库索引的核心结构</text>

          {/* 底部 */}
          <rect x="48" y="348" width="624" height="44" rx="8" fill={accent} fillOpacity="0.04" stroke={accent} strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="368" textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>C++ STL: std::map/set 通常用红黑树（弱平衡，修改少旋转）</text>
          <text x={VIEW_W / 2} y="384" textAnchor="middle" fontSize="11" fill={secondary}>查找密集→AVL　修改密集→红黑树　磁盘存储→B/B+树</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        BST 退化为链表时 O(n)，AVL 通过四种旋转保持平衡保证 O(log n)。B 树用多关键字节点减少磁盘 I/O，是数据库索引核心。C++ map/set 用红黑树（修改密集场景旋转少）。
      </figcaption>
    </figure>
  );
}
