/**
 * <RtcdFinalReviewDiagram>：实时碰撞检测全书总复习管线图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function RtcdFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="实时碰撞检测全书总复习管线图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            碰撞检测完整管线：从候选到响应的全流程
          </text>

          {/* 输入：N 个物体 */}
          <rect x="20" y="56" width="120" height="60" rx="8" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="80" y="80" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">N 个物体</text>
          <text x="80" y="96" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">包围体已构建</text>
          <text x="80" y="110" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">O(n&sup2;) 暴力</text>

          {/* 箭头 */}
          <text x="150" y="90" fontSize="20" fill="var(--text-tertiary)">&rarr;</text>

          {/* Broad Phase */}
          <rect x="170" y="50" width="170" height="72" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.4" />
          <text x="255" y="72" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">Broad Phase</text>
          <text x="255" y="88" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">粗粒度剔除</text>
          <text x="255" y="104" textAnchor="middle" fontSize="9" fill="var(--success)">Sweep &amp; Prune / 空间分割</text>
          <text x="255" y="116" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">O(n log n) 或 O(n)</text>

          {/* 箭头 */}
          <text x="350" y="90" fontSize="20" fill="var(--text-tertiary)">&rarr;</text>

          {/* Narrow Phase */}
          <rect x="370" y="50" width="170" height="72" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="455" y="72" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">Narrow Phase</text>
          <text x="455" y="88" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">精确检测</text>
          <text x="455" y="104" textAnchor="middle" fontSize="9" fill="var(--warning)">GJK / SAT</text>
          <text x="455" y="116" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">凸体：O(1) 迭代</text>

          {/* 箭头 */}
          <text x="550" y="90" fontSize="20" fill="var(--text-tertiary)">&rarr;</text>

          {/* 响应 */}
          <rect x="570" y="50" width="150" height="72" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="645" y="72" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">碰撞响应</text>
          <text x="645" y="88" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">接触点 / 法向</text>
          <text x="645" y="104" textAnchor="middle" fontSize="9" fill="var(--accent)">冲量解算 / 穿透修正</text>
          <text x="645" y="116" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">交给物理引擎</text>

          {/* CCD 旁路 */}
          <rect x="370" y="150" width="170" height="56" rx="8" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="455" y="172" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">CCD 连续检测</text>
          <text x="455" y="188" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">高速物体旁路：跳过离散</text>
          <text x="455" y="200" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">扫掠体求 t_hit</text>

          <line x1="455" y1="122" x2="455" y2="150" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 2" />
          <polygon points="455,150 451,144 459,144" fill="var(--text-tertiary)" />

          {/* 优化层 */}
          <rect x="20" y="226" width="700" height="120" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="40" y="248" fontSize="12" fontWeight="600" fill="var(--accent)">横切优化层（贯穿整个管线）</text>

          <rect x="40" y="260" width="200" height="70" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="140" y="280" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">数据布局</text>
          <text x="140" y="296" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">SoA 排列 · 紧凑热数据</text>
          <text x="140" y="310" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">16B 对齐 · 预取友好</text>
          <text x="140" y="324" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">缓存命中率提升</text>

          <rect x="260" y="260" width="200" height="70" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="360" y="280" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">SIMD 指令</text>
          <text x="360" y="296" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">SSE/AVX 批量运算</text>
          <text x="360" y="310" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">4-8 路 AABB 同时比较</text>
          <text x="360" y="324" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">单核吞吐 3-4 倍</text>

          <rect x="480" y="260" width="220" height="70" rx="6" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1" />
          <text x="590" y="280" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">多核并行</text>
          <text x="590" y="296" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">候选对分片 · 工作窃取</text>
          <text x="590" y="310" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">无锁队列 · 写入分离</text>
          <text x="590" y="324" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">N 核近线性扩展</text>

          {/* 关键洞察 */}
          <text x={VIEW_W / 2} y="372" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">
            核心思想：粗筛减量 → 精算确认 → 优化提速
          </text>
          <text x={VIEW_W / 2} y="392" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            Broad Phase 把 O(n&sup2;) 降到 O(n log n)；Narrow Phase 只处理真实候选对
          </text>
          <text x={VIEW_W / 2} y="412" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            CCD 旁路保护高速物体；三支柱优化贯穿全管线
          </text>
          <text x={VIEW_W / 2} y="432" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            先正确再快速——Profiler 驱动优化，切忌过早优化
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        实时碰撞检测完整管线——粗粒度减量、细粒度确认、CCD 旁路、三支柱优化贯穿全程
      </figcaption>
    </figure>
  );
}
