/**
 * <ApoCpuPowerDiagram>：CPU与功耗优化全景图。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function ApoCpuPowerDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="CPU与功耗优化全景图"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            CPU 与功耗优化——线程调度/后台任务/省电策略
          </text>

          {/* 上半部分：CPU 优化 */}
          <rect x="30" y="50" width="680" height="210" rx="10" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="72" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">CPU 优化</text>

          <rect x="50" y="85" width="200" height="75" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="150" y="105" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">主线程禁止耗时操作</text>
          <text x="150" y="122" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">IO/DB/网络 → 异步线程</text>
          <text x="150" y="136" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">协程 Dispatchers.IO</text>
          <text x="150" y="150" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">StrictMode 检测违规</text>

          <rect x="270" y="85" width="200" height="75" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="370" y="105" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">线程池管理</text>
          <text x="370" y="122" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">固定大小线程池</text>
          <text x="370" y="136" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">避免无限制 new Thread</text>
          <text x="370" y="150" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">CPU 密集 vs IO 密集</text>

          <rect x="490" y="85" width="200" height="75" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="590" y="105" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">锁竞争优化</text>
          <text x="590" y="122" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">减小锁粒度</text>
          <text x="590" y="136" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">读写锁替代互斥锁</text>
          <text x="590" y="150" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">无锁 CAS / Atomic</text>

          <rect x="50" y="175" width="640" height="30" rx="5" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="370" y="194" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">CPU 核心数 = Runtime.availableProcessors()，线程数 &gt; 核心数时产生上下文切换开销</text>

          <text x="370" y="230" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">CPU Profiler Flame Chart 定位热点 &rarr; 异步化 &rarr; 算法优化 &rarr; 减少锁竞争</text>

          {/* 下半部分：功耗优化 */}
          <rect x="30" y="280" width="680" height="210" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="302" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">功耗优化</text>

          <rect x="50" y="315" width="200" height="75" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.8" />
          <text x="150" y="335" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">Doze 模式</text>
          <text x="150" y="352" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">息屏后进入低功耗</text>
          <text x="150" y="366" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">延迟到维护窗口执行</text>
          <text x="150" y="380" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">高优先级用 setAndAllowWhileIdle</text>

          <rect x="270" y="315" width="200" height="75" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.8" />
          <text x="370" y="335" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">JobScheduler</text>
          <text x="370" y="352" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">批量处理后台任务</text>
          <text x="370" y="366" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">按网络/充电条件延迟</text>
          <text x="370" y="380" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">系统合并唤醒减少耗电</text>

          <rect x="490" y="315" width="200" height="75" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.8" />
          <text x="590" y="335" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">WakeLock 管理</text>
          <text x="590" y="352" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">PARTIAL_WAKE_LOCK 最小化</text>
          <text x="590" y="366" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">用完即 release</text>
          <text x="590" y="380" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">超时自动释放</text>

          <rect x="50" y="405" width="640" height="30" rx="5" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="370" y="424" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">主要耗电源：CPU（唤醒频率）&gt; 网络（无线模块）&gt; 屏幕 &gt; GPS &gt; 传感器</text>

          <text x="370" y="460" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">Battery Historian 分析耗电 &rarr; 批量化 &rarr; 延迟化 &rarr; 去除不必要唤醒</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        CPU与功耗优化全景——主线程异步化、线程池管理、锁竞争优化、Doze模式、JobScheduler批量、WakeLock管理
      </figcaption>
    </figure>
  );
}
