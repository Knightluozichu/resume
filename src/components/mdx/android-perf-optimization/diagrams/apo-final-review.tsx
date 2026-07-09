/**
 * <ApoFinalReviewDiagram>：全书复习知识图谱。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function ApoFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="全书复习知识图谱"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Android应用性能优化——全书知识图谱
          </text>

          {/* 中心节点 */}
          <circle cx="370" cy="260" r="55" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="2" />
          <text x="370" y="255" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">性能优化</text>
          <text x="370" y="270" textAnchor="middle" fontSize="10" fill="var(--accent)">测量→定位</text>
          <text x="370" y="282" textAnchor="middle" fontSize="10" fill="var(--accent)">→优化→验证</text>

          {/* 八大分支辐射 */}
          {/* 上 */}
          <rect x="310" y="70" width="120" height="44" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="370" y="90" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">分析工具</text>
          <text x="370" y="105" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Profiler/Perfetto</text>
          <line x1="370" y1="114" x2="370" y2="205" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />

          {/* 右上 */}
          <rect x="520" y="100" width="160" height="44" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="600" y="120" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">渲染优化</text>
          <text x="600" y="135" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">16ms/VSync/硬件加速</text>
          <line x1="520" y1="130" x2="425" y2="240" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />

          {/* 右 */}
          <rect x="560" y="238" width="140" height="44" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="630" y="258" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">网络优化</text>
          <text x="630" y="273" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">缓存/压缩/弱网</text>
          <line x1="560" y1="260" x2="425" y2="260" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />

          {/* 右下 */}
          <rect x="520" y="376" width="160" height="44" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="600" y="396" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">存储优化</text>
          <text x="600" y="411" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Room/MMKV/DataStore</text>
          <line x1="520" y1="390" x2="425" y2="280" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />

          {/* 下 */}
          <rect x="310" y="406" width="120" height="44" rx="6" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1" />
          <text x="370" y="426" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">稳定性</text>
          <text x="370" y="441" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">ANR/Crash/OOM</text>
          <line x1="370" y1="406" x2="370" y2="315" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />

          {/* 左下 */}
          <rect x="60" y="376" width="160" height="44" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="140" y="396" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">CPU/功耗</text>
          <text x="140" y="411" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">线程/Doze/WakeLock</text>
          <line x1="220" y1="390" x2="315" y2="280" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.4" />

          {/* 左 */}
          <rect x="40" y="238" width="140" height="44" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="110" y="258" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">内存优化</text>
          <text x="110" y="273" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">泄漏/GC/Bitmap</text>
          <line x1="180" y1="260" x2="315" y2="260" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.4" />

          {/* 左上 */}
          <rect x="60" y="100" width="160" height="44" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="140" y="120" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">布局优化</text>
          <text x="140" y="135" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">层级/过度绘制/ViewStub</text>
          <line x1="220" y1="130" x2="315" y2="240" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />

          {/* 底部：优化矩阵 */}
          <rect x="30" y="470" width="680" height="35" rx="6" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="0.8" strokeOpacity="0.2" />
          <text x="370" y="492" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">优化优先级：启动速度 &gt; 滑动流畅度 &gt; 内存稳定 &gt; 功耗 &gt; 包体积 | 核心原则：先测量再优化，每次优化后验证</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书知识图谱——以「测量→定位→优化→验证」为核心，辐射工具/布局/内存/CPU/渲染/网络/存储/稳定性八大维度
      </figcaption>
    </figure>
  );
}
