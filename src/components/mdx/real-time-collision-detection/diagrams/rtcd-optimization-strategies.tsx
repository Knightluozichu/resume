/**
 * <RtcdOptimizationStrategiesDiagram>：碰撞检测优化策略三支柱图解（SIMD/缓存/并行）。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 430;

export function RtcdOptimizationStrategiesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="碰撞检测优化策略三支柱图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            优化策略三支柱：SIMD · 缓存 · 并行
          </text>

          {/* 1. SIMD */}
          <rect x="20" y="50" width="225" height="280" rx="10" fill="var(--success)" fillOpacity="0.05" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="132" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">SIMD 数据并行</text>
          <text x="132" y="90" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">一条指令处理多组数据</text>

          {/* SIMD 寄存器示意 */}
          <text x="40" y="118" fontSize="10" fill="var(--text-secondary)">标量（逐个处理）：</text>
          {[50, 75, 100, 125].map((y, i) => (
            <rect key={`s${i}`} x="40" y={y} width="30" height="18" rx="3" fill="var(--text-tertiary)" fillOpacity="0.2" stroke="var(--text-tertiary)" strokeWidth="0.8" />
          ))}
          <text x="80" y="93" fontSize="9" fill="var(--text-tertiary)">4 条指令</text>

          <text x="130" y="118" fontSize="10" fill="var(--text-secondary)">SIMD（批量处理）：</text>
          <rect x="130" y="50" width="120" height="93" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="190" y="100" textAnchor="middle" fontSize="9" fill="var(--success)">128-bit 寄存器</text>
          <text x="190" y="114" textAnchor="middle" fontSize="9" fill="var(--success)">4 &times; float32</text>
          <text x="135" y="93" fontSize="9" fill="var(--success)">1 条指令</text>

          <text x="40" y="170" fontSize="10" fill="var(--text-secondary)">应用场景：</text>
          <text x="40" y="188" fontSize="10" fill="var(--success)">· AABB 4 轴同时比较</text>
          <text x="40" y="206" fontSize="10" fill="var(--success)">· 批量球-球距离计算</text>
          <text x="40" y="224" fontSize="10" fill="var(--success)">· 顶点批量变换</text>
          <text x="40" y="250" fontSize="10" fill="var(--text-tertiary)">数据需 SoA 布局对齐</text>
          <text x="40" y="268" fontSize="10" fill="var(--text-tertiary)">16 字节边界对齐</text>
          <text x="40" y="300" fontSize="10" fontWeight="600" fill="var(--success)">提速 3-4 倍</text>

          {/* 2. 缓存 */}
          <rect x="255" y="50" width="225" height="280" rx="10" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="367" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">缓存与数据局部性</text>
          <text x="367" y="90" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">让数据紧凑驻留 L1/L2</text>

          {/* 缓存层级 */}
          <rect x="290" y="108" width="155" height="22" rx="4" fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeWidth="1" />
          <text x="367" y="123" textAnchor="middle" fontSize="9" fill="var(--accent)">L1 ~1ns · 32KB</text>

          <rect x="300" y="134" width="135" height="22" rx="4" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="1" />
          <text x="367" y="149" textAnchor="middle" fontSize="9" fill="var(--accent)">L2 ~4ns · 256KB</text>

          <rect x="310" y="160" width="115" height="22" rx="4" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="367" y="175" textAnchor="middle" fontSize="9" fill="var(--accent)">L3 ~12ns · 8MB</text>

          <rect x="325" y="186" width="85" height="22" rx="4" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="367" y="201" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">RAM ~100ns</text>

          <text x="275" y="232" fontSize="10" fill="var(--text-secondary)">优化手段：</text>
          <text x="275" y="250" fontSize="10" fill="var(--accent)">· AoS → SoA 重排数据</text>
          <text x="275" y="268" fontSize="10" fill="var(--accent)">· 热数据紧凑（剔除冷字段）</text>
          <text x="275" y="286" fontSize="10" fill="var(--accent)">· 顺序访问（预取友好）</text>
          <text x="275" y="304" fontSize="10" fill="var(--accent)">· 分块 tile 处理</text>
          <text x="275" y="324" fontSize="10" fontWeight="600" fill="var(--accent)">命中率决定吞吐</text>

          {/* 3. 并行 */}
          <rect x="490" y="50" width="230" height="280" rx="10" fill="var(--warning)" fillOpacity="0.05" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="605" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">多核并行</text>
          <text x="605" y="90" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">候选对天然可并行</text>

          {/* 核心示意 */}
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={515 + i * 48} y="108" width="40" height="30" rx="4" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1" />
              <text x={535 + i * 48} y="127" textAnchor="middle" fontSize="9" fill="var(--warning)">核{i}</text>
            </g>
          ))}
          <text x="605" y="156" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">各核独立处理候选对</text>

          <text x="510" y="182" fontSize="10" fill="var(--text-secondary)">并行策略：</text>
          <text x="510" y="200" fontSize="10" fill="var(--warning)">· 候选对按核分片</text>
          <text x="510" y="218" fontSize="10" fill="var(--warning)">· 无锁队列分配任务</text>
          <text x="510" y="236" fontSize="10" fill="var(--warning)">· 工作窃取负载均衡</text>
          <text x="510" y="254" fontSize="10" fill="var(--warning)">· 写入分离避免竞争</text>

          <rect x="510" y="268" width="190" height="44" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="605" y="286" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">粗粒度：每核一批 AABB</text>
          <text x="605" y="302" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">细粒度：SIMD 内并行</text>
          <text x="510" y="324" fontSize="10" fontWeight="600" fill="var(--warning)">N 核 → N 倍吞吐</text>

          {/* 底部总结 */}
          <rect x="20" y="346" width="700" height="68" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="368" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            协同：SoA 布局同时满足 SIMD + 缓存，再按核分片并行
          </text>
          <text x={VIEW_W / 2} y="388" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            数据布局是地基——布局对了，SIMD 和缓存自然受益；分片对了，并行才能线性扩展
          </text>
          <text x={VIEW_W / 2} y="406" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            先测量（Profiler）再优化，切忌过早优化
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        优化三支柱——SIMD 批量运算、缓存友好的数据布局、多核并行分片协同
      </figcaption>
    </figure>
  );
}
