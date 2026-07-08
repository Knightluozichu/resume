/**
 * <UhmPerformanceDiagram>：性能优化与帧率保障图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UhmPerformanceDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="性能优化与帧率保障图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            HMI 性能优化三大维度
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            CPU 少算 · GPU 少画 · 内存少存
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="70" y="100" width="180" height="110" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="160" y="124" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">CPU 少算</text>
          <text x="160" y="144" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">子 Canvas 隔离</text>
          <text x="160" y="160" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">脏标记批量更新</text>
          <text x="160" y="176" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">StringBuilder</text>
          <text x="160" y="192" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">减少 GC 分配</text>

          <rect x="270" y="100" width="180" height="110" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="360" y="124" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">GPU 少画</text>
          <text x="360" y="144" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">DrawCall 合并</text>
          <text x="360" y="160" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Sprite Atlas</text>
          <text x="360" y="176" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">减少 Overdraw</text>
          <text x="360" y="192" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">控制透明混合</text>

          <rect x="470" y="100" width="180" height="110" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="560" y="124" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">内存少存</text>
          <text x="560" y="144" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">对象池复用</text>
          <text x="560" y="160" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">资源按需加载</text>
          <text x="560" y="176" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">纹理压缩</text>
          <text x="560" y="192" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">减少 GC 压力</text>

          <rect x="70" y="230" width="580" height="50" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x={VIEW_W / 2} y="252" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">关键指标：1% Low FPS（最差帧率）</text>
          <text x={VIEW_W / 2} y="268" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">不看平均帧率看最差帧——稳定 60fps &gt; 偶尔 120fps</text>

          <text x={VIEW_W / 2} y="308" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            Profiler 工作流：录制 → 定位瓶颈 → 优化 → 验证
          </text>
          <text x={VIEW_W / 2} y="326" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            掉帧 = 仪表卡在旧值 = 用户误读 = 安全风险
          </text>
          <text x={VIEW_W / 2} y="344" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            优化目标：跑得更稳，不是跑得更快
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        HMI 性能优化——CPU/GPU/内存三维度与帧率稳定性保障
      </figcaption>
    </figure>
  );
}
