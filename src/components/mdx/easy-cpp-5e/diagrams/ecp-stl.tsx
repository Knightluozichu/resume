/**
 * <EcpStlDiagram>：STL 三层架构图（easy-cpp-5e STL 入门章）。
 *
 * 三列对应 STL 三大组件：容器（绿）/ 算法（紫）/ 迭代器（橙）。
 * 迭代器居中作为桥梁，连接容器与算法。
 * 右侧展示常用容器与算法速查。底部总结三层解耦设计。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×440、四周留白 ≥32、字号 ≥11、间距用 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 440;

export function EcpStlDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="STL 三层架构图。三列对应三大组件：容器（绿色，vector/string/map 管理数据集合）、算法（紫色，sort/find/count 操作数据）、迭代器（橙色，begin/end 作为桥梁连接容器和算法）。右侧列出常用容器与算法速查。底部总结三层解耦设计的好处。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            STL 三层架构：容器 · 算法 · 迭代器
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            迭代器是桥梁——一套算法可用于所有容器
          </text>

          {/* ===== 容器（左） ===== */}
          <rect x="40" y="80" width="180" height="200" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.4" />
          <rect x="40" y="80" width="180" height="32" rx="10" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1.2" />
          <text x="130" y="101" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">容器</text>
          <text x="56" y="128" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">vector&lt;int&gt;</text>
          <text x="56" y="146" fontSize="10" fill="var(--text-secondary)">动态数组</text>
          <text x="56" y="166" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">string</text>
          <text x="56" y="184" fontSize="10" fill="var(--text-secondary)">字符串</text>
          <text x="56" y="204" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">map&lt;K,V&gt;</text>
          <text x="56" y="222" fontSize="10" fill="var(--text-secondary)">键值映射</text>
          <text x="56" y="242" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">list / deque</text>
          <text x="56" y="260" fontSize="10" fill="var(--text-secondary)">链表 / 双端队列</text>

          {/* ===== 迭代器（中） ===== */}
          <rect x="270" y="120" width="180" height="120" rx="10" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.4" />
          <rect x="270" y="120" width="180" height="32" rx="10" fill="var(--warning)" fillOpacity="0.14" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="360" y="141" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">迭代器</text>
          <text x="286" y="168" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">v.begin()</text>
          <text x="286" y="184" fontSize="10" fill="var(--text-secondary)">指向首元素</text>
          <text x="286" y="204" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">v.end()</text>
          <text x="286" y="220" fontSize="10" fill="var(--text-secondary)">指向尾后</text>

          {/* 桥梁箭头：容器 → 迭代器 */}
          <line x1="220" y1="180" x2="270" y2="180" stroke="var(--text-secondary)" strokeWidth="1.4" strokeOpacity="0.4" />
          <polygon points="266,176 266,184 274,180" fill="var(--text-secondary)" fillOpacity="0.4" />
          {/* 桥梁箭头：迭代器 → 算法 */}
          <line x1="450" y1="180" x2="500" y2="180" stroke="var(--text-secondary)" strokeWidth="1.4" strokeOpacity="0.4" />
          <polygon points="496,176 496,184 504,180" fill="var(--text-secondary)" fillOpacity="0.4" />

          {/* ===== 算法（右） ===== */}
          <rect x="500" y="80" width="180" height="200" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" />
          <rect x="500" y="80" width="180" height="32" rx="10" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="590" y="101" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">算法</text>
          <text x="516" y="128" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">sort(b, e)</text>
          <text x="516" y="146" fontSize="10" fill="var(--text-secondary)">排序</text>
          <text x="516" y="166" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">find(b, e, v)</text>
          <text x="516" y="184" fontSize="10" fill="var(--text-secondary)">查找</text>
          <text x="516" y="204" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">count(b, e, v)</text>
          <text x="516" y="222" fontSize="10" fill="var(--text-secondary)">计数</text>
          <text x="516" y="242" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">copy / reverse</text>
          <text x="516" y="260" fontSize="10" fill="var(--text-secondary)">复制 / 反转</text>

          {/* ===== 代码示例 ===== */}
          <rect x="40" y="300" width={VIEW_W - 80} height="48" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="56" y="320" fontSize="11" fontWeight="700" fill="var(--text-secondary)">用法示例</text>
          <text x="56" y="338" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">vector&lt;int&gt; v = {`{3,1,4}`};  sort(v.begin(), v.end());  auto it = find(v.begin(), v.end(), 3);</text>

          {/* ===== 底部总结栏 ===== */}
          <rect x="40" y="368" width={VIEW_W - 80} height="52" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="388" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">
            三层解耦：容器管数据 · 算法管处理 · 迭代器做桥梁
          </text>
          <text x={VIEW_W / 2} y="406" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            一套算法可用于所有容器——算法不写成成员函数避免接口膨胀
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        STL 由容器、算法、迭代器三层组成。迭代器解耦容器与算法，使一套算法可用于所有容器。`vector` 动态数组最常用，`sort`、`find` 等算法以迭代器范围为参数。
      </figcaption>
    </figure>
  );
}
