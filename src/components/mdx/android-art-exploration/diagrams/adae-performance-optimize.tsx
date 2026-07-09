/**
 * <AdaePerformanceOptimizeDiagram>：性能优化维度图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function AdaePerformanceOptimizeDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Android性能优化维度图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Android 性能优化维度
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            布局 / 内存 / 卡顿 / 耗电 / 稳定性
          </text>

          <rect x="30" y="62" width="210" height="430" rx="12" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="135" y="86" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--warning)">布局优化</text>
          <text x="45" y="112" fontSize="11" fill="var(--text-secondary)">减少层级</text>
          <text x="45" y="130" fontSize="11" fill="var(--text-secondary)">include/merge</text>
          <text x="45" y="148" fontSize="11" fill="var(--text-secondary)">ViewStub 延迟加载</text>
          <text x="45" y="166" fontSize="11" fill="var(--text-secondary)">ConstraintLayout</text>
          <text x="45" y="184" fontSize="11" fill="var(--text-secondary)">过度绘制检测</text>
          <text x="45" y="216" fontSize="11" fill="var(--text-secondary)">GPU 呈现模式分析</text>
          <text x="45" y="234" fontSize="11" fill="var(--text-secondary)">Hierarchy View</text>
          <text x="45" y="252" fontSize="11" fill="var(--text-secondary)">Lint 静态检查</text>
          <text x="45" y="284" fontSize="11" fill="var(--text-tertiary)">目标：单层 ≤ 10</text>
          <text x="45" y="302" fontSize="11" fill="var(--text-tertiary)">过度绘制 ≤ 2x</text>

          <rect x="260" y="62" width="210" height="430" rx="12" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="365" y="86" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--danger)">内存优化</text>
          <text x="275" y="112" fontSize="11" fill="var(--text-secondary)">内存泄漏排查</text>
          <text x="275" y="130" fontSize="11" fill="var(--text-secondary)">  静态持 Context</text>
          <text x="275" y="148" fontSize="11" fill="var(--text-secondary)">  内部类隐式引用</text>
          <text x="275" y="166" fontSize="11" fill="var(--text-secondary)">  未注销广播/监听</text>
          <text x="275" y="196" fontSize="11" fill="var(--text-secondary)">Bitmap 采样 inSampleSize</text>
          <text x="275" y="214" fontSize="11" fill="var(--text-secondary)">缓存 LruCache/磁盘</text>
          <text x="275" y="232" fontSize="11" fill="var(--text-secondary)">OOM 于大图/长列表</text>
          <text x="275" y="264" fontSize="11" fill="var(--text-secondary)">LeakCanary 监控</text>
          <text x="275" y="282" fontSize="11" fill="var(--text-secondary)">Profiler Heap Dump</text>
          <text x="275" y="314" fontSize="11" fill="var(--text-tertiary)">弱/软引用及时释放</text>
          <text x="275" y="332" fontSize="11" fill="var(--text-tertiary)">onTrimMemory 响应</text>

          <rect x="490" y="62" width="220" height="430" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="600" y="86" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--accent)">卡顿 / 耗电 / 稳定</text>
          <text x="505" y="112" fontSize="11" fill="var(--text-secondary)">卡顿：主线程 16ms</text>
          <text x="505" y="130" fontSize="11" fill="var(--text-secondary)">  避免主线程 IO/计算</text>
          <text x="505" y="148" fontSize="11" fill="var(--text-secondary)">  Systrace 定位掉帧</text>
          <text x="505" y="178" fontSize="11" fill="var(--text-secondary)">ANR：5s 输入/10s 广播</text>
          <text x="505" y="196" fontSize="11" fill="var(--text-secondary)">  StrictMode 检测违规</text>
          <text x="505" y="226" fontSize="11" fill="var(--text-secondary)">耗电：后台/定位/唤醒</text>
          <text x="505" y="244" fontSize="11" fill="var(--text-secondary)">  JobScheduler 合并任务</text>
          <text x="505" y="262" fontSize="11" fill="var(--text-secondary)">  WorkManager 约束调度</text>
          <text x="505" y="292" fontSize="11" fill="var(--text-secondary)">稳定性：try-catch 边界</text>
          <text x="505" y="310" fontSize="11" fill="var(--text-secondary)">  Crash 上报/Bugly</text>
          <text x="505" y="342" fontSize="11" fill="var(--text-tertiary)">BlockCanary 卡顿监控</text>
          <text x="505" y="360" fontSize="11" fill="var(--text-tertiary)">电量 Profiler 分析</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Android性能优化五大维度——布局优化（层级/过度绘制）、内存优化（泄漏/Bitmap/OOM）、卡顿ANR、耗电与稳定性
      </figcaption>
    </figure>
  );
}
