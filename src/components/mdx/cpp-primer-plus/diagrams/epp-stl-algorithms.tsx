/**
 * <EppStlAlgorithmsDiagram>：STL 三件套架构图（cpp-primer-plus STL 与算法章）。
 *
 * 经典三角布局：左上容器、右上算法、底部迭代器居中连接两者。
 *   容器（vector/list/deque/map/set）管数据存储；
 *   算法（sort/find/copy/for_each）管数据处理；
 *   迭代器是两者的桥梁，算法通过迭代器访问容器而互不耦合。
 * 底部总结栏点出「容器 + 算法 + 迭代器 = 解耦复用」。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×460、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / 三角主体 / 底部总结）。
 */

const VIEW_W = 720;
const VIEW_H = 460;

export function EppStlAlgorithmsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="STL 三件套架构图。左上容器：顺序容器 vector/list/deque，关联容器 map/set，管数据存储。右上算法：sort/find/copy/for_each，管数据处理。底部迭代器居中，是容器与算法的桥梁，算法通过迭代器访问容器而互不耦合。底部总结：容器 + 算法 + 迭代器 = 解耦复用。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            STL 三件套架构
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            容器管存储、算法管处理、迭代器做桥梁，三者解耦复用
          </text>

          {/* ===== 容器卡 ===== */}
          <rect x="32" y="100" width="300" height="160" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <rect x="32" y="100" width="300" height="28" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="48" y="119" fontSize="13" fontWeight="700" fill="var(--accent)">容器 Containers</text>
          <text x="48" y="150" fontSize="11" fontWeight="700" fill="var(--text-secondary)">顺序容器</text>
          <text x="48" y="170" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">vector / list / deque</text>
          <line x1="48" y1="182" x2="316" y2="182" stroke="var(--border)" strokeWidth="1" />
          <text x="48" y="202" fontSize="11" fontWeight="700" fill="var(--text-secondary)">关联容器</text>
          <text x="48" y="222" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">map / set / unordered_map</text>
          <text x="48" y="246" fontSize="11" fill="var(--text-secondary)">管数据怎么存</text>

          {/* ===== 算法卡 ===== */}
          <rect x="388" y="100" width="300" height="160" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <rect x="388" y="100" width="300" height="28" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="404" y="119" fontSize="13" fontWeight="700" fill="var(--success)">算法 Algorithms</text>
          <text x="404" y="150" fontSize="11" fontWeight="700" fill="var(--text-secondary)">非修改式</text>
          <text x="404" y="170" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">find / for_each / count</text>
          <line x1="404" y1="182" x2="672" y2="182" stroke="var(--border)" strokeWidth="1" />
          <text x="404" y="202" fontSize="11" fontWeight="700" fill="var(--text-secondary)">修改式 / 排序</text>
          <text x="404" y="222" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">sort / copy / accumulate</text>
          <text x="404" y="246" fontSize="11" fill="var(--text-secondary)">管数据怎么处理</text>

          {/* ===== 连接线到迭代器 ===== */}
          <line x1="182" y1="260" x2="300" y2="300" stroke="var(--accent)" strokeWidth="1.4" strokeOpacity="0.5" />
          <line x1="538" y1="260" x2="420" y2="300" stroke="var(--success)" strokeWidth="1.4" strokeOpacity="0.5" />

          {/* ===== 迭代器卡（居中）===== */}
          <rect x="180" y="300" width="360" height="92" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="360" y="324" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--warning)">迭代器 Iterators</text>
          <text x="360" y="346" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">begin() / end() / it++</text>
          <text x="360" y="368" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">算法通过迭代器访问容器，二者互不耦合</text>
          <text x="360" y="384" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">同一算法可作用于任意提供迭代器的容器</text>

          {/* ===== 底部总结栏 ===== */}
          <rect x="60" y={VIEW_H - 40} width={VIEW_W - 120} height="28" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={VIEW_H - 22} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            容器 + 算法 + 迭代器 = 解耦复用：写一次算法适用于所有容器
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        STL 由三件套构成：容器（vector/list/map 等）管数据存储，算法（sort/find/copy 等）管数据处理，迭代器是两者的桥梁。算法不直接操作容器，而是通过迭代器访问元素，使同一算法能作用于任意容器，实现解耦复用。
      </figcaption>
    </figure>
  );
}
