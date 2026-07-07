/**
 * <OpcAlgoSelectDiagram>：算法选择（optimized-cpp 算法选择章）。
 *
 * 上半部分：算法复杂度交叉曲线——小数据量时 O(n²) 因常数小反而快，
 * 大数据量时 O(n log n) 更优。两条曲线在交叉点交汇。
 * 下半部分：三条缓存友好原则卡片。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×460、四周留白 ≥32、字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 460;

export function OpcAlgoSelectDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
         aria-label="算法选择示意图。上半部分：算法复杂度交叉曲线——小数据量时 O(n²) 因常数小反而快（红色曲线），大数据量时 O(n log n) 更优（绿色曲线），两条曲线在交叉点交汇。交叉点左侧选简单算法，右侧选复杂度更优算法。下半部分三条缓存友好原则：连续内存优于链表、顺序访问优于随机访问、数据紧凑减少 cache miss。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            算法选择 · 复杂度与缓存
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            数据规模决定最优算法——小数据选常数小的简单算法，大数据选复杂度优的算法
          </text>

          {/* ===== 上半部分：交叉曲线图 ===== */}
          {/* 坐标轴 */}
          <line x1="80" y1="240" x2="400" y2="240" stroke="var(--border)" strokeWidth="1.4" />
          <line x1="80" y1="80" x2="80" y2="240" stroke="var(--border)" strokeWidth="1.4" />
          <text x="240" y="260" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">数据规模 n</text>
          <text x="60" y="160" textAnchor="middle" fontSize="11" fill="var(--text-secondary)" transform="rotate(-90 60 160)">耗时</text>

          {/* O(n²) 曲线（红）—— 先低后高 */}
          <path d="M 80 220 Q 180 210, 240 180 T 400 80" fill="none" stroke="var(--danger)" strokeWidth="2" />
          <text x="380" y="92" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">O(n²)</text>

          {/* O(n log n) 曲线（绿）—— 平缓上升 */}
          <path d="M 80 224 Q 160 218, 240 200 T 400 150" fill="none" stroke="var(--success)" strokeWidth="2" />
          <text x="380" y="162" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">O(n log n)</text>

          {/* 交叉点 */}
          <circle cx="240" cy="190" r="4" fill="var(--accent)" />
          <line x1="240" y1="190" x2="240" y2="240" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.5" />
          <text x="248" y="186" fontSize="11" fill="var(--accent)" fontWeight="700">交叉点</text>
          <text x="120" y="234" fontSize="10" fill="var(--text-secondary)">小 n：简单算法快</text>
          <text x="300" y="234" fontSize="10" fill="var(--text-secondary)">大 n：复杂度优者快</text>

          {/* ===== 右上角说明卡片 ===== */}
          <rect x="440" y="80" width="240" height="160" rx="10" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="560" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">选择原则</text>
          <line x1="460" y1="114" x2="660" y2="114" stroke="var(--border)" strokeWidth="1" />
          <text x="460" y="134" fontSize="11" fill="var(--text-primary)">1. 先看数据规模</text>
          <text x="472" y="150" fontSize="10" fill="var(--text-secondary)">n 小时常数因子决定快慢</text>
          <text x="460" y="172" fontSize="11" fill="var(--text-primary)">2. 再看缓存友好性</text>
          <text x="472" y="188" fontSize="10" fill="var(--text-secondary)">连续内存优于指针跳转</text>
          <text x="460" y="210" fontSize="11" fill="var(--text-primary)">3. 最后看实现常数</text>
          <text x="472" y="226" fontSize="10" fill="var(--text-secondary)">避免不必要的分支与间接</text>

          {/* ===== 下半部分：缓存友好三原则 ===== */}
          {[
            { x: 40, t: "连续内存", d: "vector 优于 list\n缓存行预取生效", c: "var(--accent)" },
            { x: 270, t: "顺序访问", d: "顺序遍历优于随机\n硬件预取器能预测", c: "var(--success)" },
            { x: 500, t: "数据紧凑", d: "减少结构体空洞\n一个缓存行装更多", c: "var(--warning)" },
          ].map((card) => (
            <g key={card.x}>
              <rect x={card.x} y="290" width="180" height="68" rx="8" fill="var(--bg)" stroke={card.c} strokeWidth="1" strokeOpacity="0.5" />
              <rect x={card.x} y="290" width="180" height="24" rx="8" fill={card.c} fillOpacity="0.12" />
              <text x={card.x + 90} y="307" textAnchor="middle" fontSize="12" fontWeight="700" fill={card.c}>{card.t}</text>
              {card.d.split("\n").map((line, li) => (
                <text key={li} x={card.x + 90} y={328 + li * 16} textAnchor="middle" fontSize="11" fill="var(--text-primary)">{line}</text>
              ))}
            </g>
          ))}

          {/* ===== 底部总结 ===== */}
          <rect x="60" y="384" width={VIEW_W - 120} height="52" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="406" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">
            算法选择 = 复杂度 × 常数 × 缓存友好性
          </text>
          <text x={VIEW_W / 2} y="426" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            纸面复杂度相同，缓存友好的实现可能快 10 倍——不要只看大 O
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        算法选择不只看大 O 复杂度：小数据量时常数因子主导，大数据量时复杂度主导。同时，缓存友好的数据布局（连续内存、顺序访问、紧凑结构）能让相同复杂度的算法快上数倍。
      </figcaption>
    </figure>
  );
}
