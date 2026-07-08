/**
 * <CapMemoryHierarchyDiagram>：存储器层次结构图解（金字塔/局部性/映射方式）。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 470;

export function CapMemoryHierarchyDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="存储器层次结构图解：金字塔、局部性、映射方式"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            存储器层次结构
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            金字塔分层 · 局部性原理 · 映射方式 · 缓存友好编程
          </text>

          {/* 金字塔（梯形堆叠） */}
          <text x="200" y="74" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">速度↓ 容量↑ 延迟递增</text>
          <polygon points="120,84 280,84 270,104 130,104" fill="var(--success)" fillOpacity="0.30" stroke="var(--success)" strokeWidth="1.2" />
          <text x="200" y="98" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">寄存器 ~1ns</text>
          <polygon points="130,104 270,104 258,124 142,124" fill="var(--success)" fillOpacity="0.24" stroke="var(--success)" strokeWidth="1.2" />
          <text x="200" y="118" textAnchor="middle" fontSize="10" fill="var(--success)">L1 缓存 ~1ns</text>
          <polygon points="142,124 258,124 244,144 156,144" fill="var(--warning)" fillOpacity="0.24" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="200" y="138" textAnchor="middle" fontSize="10" fill="var(--warning)">L2 缓存 ~4ns</text>
          <polygon points="156,144 244,144 228,164 172,164" fill="var(--warning)" fillOpacity="0.20" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="200" y="158" textAnchor="middle" fontSize="10" fill="var(--warning)">L3 缓存 ~12ns</text>
          <polygon points="172,164 228,164 210,184 190,184" fill="var(--accent)" fillOpacity="0.22" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="200" y="178" textAnchor="middle" fontSize="10" fill="var(--accent)">主存 ~100ns</text>
          <polygon points="190,184 210,184 196,204 204,204" fill="var(--danger)" fillOpacity="0.22" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="200" y="198" textAnchor="middle" fontSize="9" fill="var(--danger)">SSD/HDD</text>
          <text x="200" y="222" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">每层是下一层的缓存</text>
          <text x="200" y="238" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">靠局部性命中顶层</text>
          <text x="200" y="254" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">L1 命中率 95%+ →</text>
          <text x="200" y="268" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">等效延迟接近 1ns</text>

          {/* 局部性原理 */}
          <rect x="330" y="64" width="380" height="120" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="520" y="86" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">局部性原理</text>
          <text x="520" y="108" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">时间局部性</text>
          <text x="520" y="124" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">近期访问的短期内再被访问（循环变量）</text>
          <text x="520" y="146" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">空间局部性</text>
          <text x="520" y="162" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">相邻地址很可能被访问（数组顺序遍历）</text>
          <text x="520" y="180" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">缓存按 64B 行加载，一次 miss 后续相邻全命中</text>

          {/* 映射方式 */}
          <rect x="330" y="196" width="380" height="120" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="520" y="218" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">缓存映射方式</text>
          <rect x="350" y="230" width="110" height="24" rx="4" fill="var(--danger)" fillOpacity="0.18" stroke="var(--danger)" strokeWidth="1" />
          <text x="405" y="246" textAnchor="middle" fontSize="10" fill="var(--danger)">直接映射(E=1)</text>
          <rect x="470" y="230" width="110" height="24" rx="4" fill="var(--success)" fillOpacity="0.20" stroke="var(--success)" strokeWidth="1" />
          <text x="525" y="246" textAnchor="middle" fontSize="10" fill="var(--success)">组相联(E路)</text>
          <rect x="590" y="230" width="110" height="24" rx="4" fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeWidth="1" />
          <text x="645" y="246" textAnchor="middle" fontSize="10" fill="var(--accent)">全相联</text>
          <text x="405" y="272" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">简单·冲突miss多</text>
          <text x="525" y="272" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">L1常用8路·折中</text>
          <text x="645" y="272" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">命中高·硬件贵</text>
          <text x="520" y="294" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">地址 = tag + set index + block offset</text>
          <text x="520" y="310" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">3C miss：compulsory / capacity / conflict</text>

          {/* 缓存友好编程 */}
          <rect x="30" y="332" width="680" height="100" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="354" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">缓存友好编程：拉开数量级差距</text>
          <text x={VIEW_W / 2} y="374" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">矩阵乘法 C=A×B 循环顺序不同性能差 10 倍</text>
          <text x={VIEW_W / 2} y="392" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">原则：①顺序访问（空间局部性）②内层访问连续内存 ③分块适配缓存 ④少指针追逐</text>
          <text x={VIEW_W / 2} y="410" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">缓存效应常让 O(n log n) 比 O(n²) 还慢——性能优化必须实测</text>
          <text x={VIEW_W / 2} y="456" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：算法复杂度忽略缓存效应，缓存友好常胜过低复杂度
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        存储器层次结构——金字塔、局部性原理、映射方式与缓存友好编程
      </figcaption>
    </figure>
  );
}
