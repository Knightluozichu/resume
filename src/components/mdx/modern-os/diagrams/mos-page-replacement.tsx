/**
 * <MosPageReplacementDiagram>：四种页面置换算法对比 + Clock 环形结构图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 470;

export function MosPageReplacementDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="四种页面置换算法与 Clock 环形结构图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            四种页面置换算法对比与 Clock 环形结构
          </text>

          {/* 左侧：四算法卡片 */}
          <text x="180" y="58" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">置换算法对比</text>

          <rect x="30" y="72" width="300" height="50" rx="6" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="42" y="92" fontSize="11" fontWeight="600" fill="var(--text-secondary)">OPT 最优</text>
          <text x="42" y="110" fontSize="10" fill="var(--text-tertiary)">淘汰未来最久不用的页；需预知未来，仅作基准</text>

          <rect x="30" y="130" width="300" height="50" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="42" y="150" fontSize="11" fontWeight="600" fill="var(--warning)">FIFO 先进先出</text>
          <text x="42" y="168" fontSize="10" fill="var(--text-tertiary)">淘汰最早进入的页；简单但有 Belady 异常</text>

          <rect x="30" y="188" width="300" height="50" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="42" y="208" fontSize="11" fontWeight="600" fill="var(--danger)">LRU 最近最少使用</text>
          <text x="42" y="226" fontSize="10" fill="var(--text-tertiary)">淘汰最久未访问的页；接近 OPT，栈式无 Belady</text>

          <rect x="30" y="246" width="300" height="50" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="42" y="266" fontSize="11" fontWeight="600" fill="var(--success)">Clock 时钟算法</text>
          <text x="42" y="284" fontSize="10" fill="var(--text-tertiary)">LRU 廉价近似；访问位 + 指针扫描，二次机会</text>

          {/* 右侧：Clock 环形结构 */}
          <text x="560" y="58" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Clock 算法环形结构</text>

          <circle cx="560" cy="175" r="95" fill="none" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.4" />

          {/* 页帧节点 */}
          {[
            { angle: 0, label: "A", bit: "1" },
            { angle: 60, label: "B", bit: "0" },
            { angle: 120, label: "C", bit: "1" },
            { angle: 180, label: "D", bit: "0" },
            { angle: 240, label: "E", bit: "1" },
            { angle: 300, label: "F", bit: "1" },
          ].map((node) => {
            const rad = (node.angle * Math.PI) / 180;
            const cx = 560 + 90 * Math.cos(rad);
            const cy = 175 + 90 * Math.sin(rad);
            const color = node.bit === "1" ? "var(--success)" : "var(--danger)";
            return (
              <g key={node.label}>
                <circle cx={cx} cy={cy} r="18" fill={color} fillOpacity="0.18" stroke={color} strokeWidth="1.2" />
                <text x={cx} y={cy - 1} textAnchor="middle" fontSize="11" fontWeight="600" fill={color}>{node.label}</text>
                <text x={cx} y={cy + 11} textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">bit={node.bit}</text>
              </g>
            );
          })}

          {/* 指针 */}
          <text x="560" y="175" textAnchor="middle" fontSize="20" fill="var(--accent)">→</text>
          <text x="560" y="195" textAnchor="middle" fontSize="9" fill="var(--accent)">指针</text>

          <text x="560" y="300" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">bit=1 → 清 0 跳过（二次机会）</text>
          <text x="560" y="316" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">bit=0 → 淘汰该页</text>

          {/* 底部：Belady 异常 + 工作集 */}
          <rect x="30" y="340" width="670" height="110" rx="10" fill="var(--text-primary)" fillOpacity="0.03" stroke="var(--border)" strokeWidth="1" />
          <text x="48" y="362" fontSize="12" fontWeight="600" fill="var(--text-primary)">Belady 异常 vs 栈式算法 &amp; 工作集</text>

          <text x="48" y="384" fontSize="10" fill="var(--warning)">FIFO 非栈式：帧数 3→4 时缺页率可能反升（Belady 异常）</text>
          <text x="48" y="400" fontSize="10" fill="var(--success)">LRU/OPT 栈式：S_n ⊆ S_(n+1)，帧数增缺页率单调不增</text>
          <text x="48" y="416" fontSize="10" fill="var(--danger)">工作集 W(t,Δ)：过去 Δ 次访问的页集，物理帧 &lt; 工作集 → 抖动</text>
          <text x="48" y="432" fontSize="10" fill="var(--text-tertiary)">缓解抖动：降低多道程序度 / PFV 反馈 / 动态估算工作集</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        OPT/FIFO/LRU/Clock 四种页面置换算法对比，Clock 环形结构与 Belady 异常、工作集模型
      </figcaption>
    </figure>
  );
}
