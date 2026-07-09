/**
 * <AalPerformanceAdvancedDiagram>：高级性能优化全景图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function AalPerformanceAdvancedDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Android高级性能优化全景图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Android 高级性能优化全景
          </text>

          {/* 启动优化 */}
          <rect x="30" y="50" width="220" height="140" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <rect x="30" y="50" width="220" height="32" rx="10" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="140" y="72" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">启动优化</text>
          <text x="45" y="96" textAnchor="start" fontSize="10" fill="var(--text-secondary)">冷启动 / 温启动 / 热启动</text>
          <text x="45" y="114" textAnchor="start" fontSize="10" fill="var(--text-secondary)">异步初始化（TaskScheduler）</text>
          <text x="45" y="132" textAnchor="start" fontSize="10" fill="var(--text-secondary)">延迟初始化（按需加载）</text>
          <text x="45" y="150" textAnchor="start" fontSize="10" fill="var(--text-secondary)">多阶段初始化</text>
          <text x="45" y="168" textAnchor="start" fontSize="10" fill="var(--text-secondary)">避免I/O阻塞主线程</text>
          <text x="45" y="186" textAnchor="start" fontSize="10" fill="var(--text-secondary)">SplashScreen优化</text>

          {/* 内存优化 */}
          <rect x="260" y="50" width="220" height="140" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <rect x="260" y="50" width="220" height="32" rx="10" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="370" y="72" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">内存优化</text>
          <text x="275" y="96" textAnchor="start" fontSize="10" fill="var(--text-secondary)">内存泄漏检测（LeakCanary）</text>
          <text x="275" y="114" textAnchor="start" fontSize="10" fill="var(--text-secondary)">大图加载（Bitmap采样压缩）</text>
          <text x="275" y="132" textAnchor="start" fontSize="10" fill="var(--text-secondary)">LRU缓存策略</text>
          <text x="275" y="150" textAnchor="start" fontSize="10" fill="var(--text-secondary)">onTrimMemory 响应</text>
          <text x="275" y="168" textAnchor="start" fontSize="10" fill="var(--text-secondary)">避免静态引用泄漏</text>
          <text x="275" y="186" textAnchor="start" fontSize="10" fill="var(--text-secondary)">弱引用/软引用使用</text>

          {/* 渲染优化 */}
          <rect x="490" y="50" width="220" height="140" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <rect x="490" y="50" width="220" height="32" rx="10" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="600" y="72" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">渲染优化</text>
          <text x="505" y="96" textAnchor="start" fontSize="10" fill="var(--text-secondary)">过度绘制检测（GPU呈现）</text>
          <text x="505" y="114" textAnchor="start" fontSize="10" fill="var(--text-secondary)">减少布局层级（ConstraintLayout）</text>
          <text x="505" y="132" textAnchor="start" fontSize="10" fill="var(--text-secondary)">merge/include 标签复用</text>
          <text x="505" y="150" textAnchor="start" fontSize="10" fill="var(--text-secondary)">ViewStub 懒加载</text>
          <text x="505" y="168" textAnchor="start" fontSize="10" fill="var(--text-secondary)">硬件加速层（Layer）</text>
          <text x="505" y="186" textAnchor="start" fontSize="10" fill="var(--text-secondary)">16ms / 60fps 帧率保障</text>

          {/* ANR / 卡顿 */}
          <rect x="30" y="210" width="220" height="140" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <rect x="30" y="210" width="220" height="32" rx="10" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="140" y="232" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">ANR与卡顿</text>
          <text x="45" y="256" textAnchor="start" fontSize="10" fill="var(--text-secondary)">ANR：主线程5s无响应</text>
          <text x="45" y="274" textAnchor="start" fontSize="10" fill="var(--text-secondary)">ANR：BroadcastReceiver 10s</text>
          <text x="45" y="292" textAnchor="start" fontSize="10" fill="var(--text-secondary)">ANR：Service 20s</text>
          <text x="45" y="310" textAnchor="start" fontSize="10" fill="var(--text-secondary)">卡顿：主线程耗时操作</text>
          <text x="45" y="328" textAnchor="start" fontSize="10" fill="var(--text-secondary)">BlockCanary 监控卡顿</text>
          <text x="45" y="346" textAnchor="start" fontSize="10" fill="var(--text-secondary)">Choreographer 帧率监控</text>

          {/* 电量优化 */}
          <rect x="260" y="210" width="220" height="140" rx="10" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.3" />
          <rect x="260" y="210" width="220" height="32" rx="10" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="370" y="232" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">电量优化</text>
          <text x="275" y="256" textAnchor="start" fontSize="10" fill="var(--text-secondary)">WakeLock 及时释放</text>
          <text x="275" y="274" textAnchor="start" fontSize="10" fill="var(--text-secondary)">JobScheduler 批处理任务</text>
          <text x="275" y="292" textAnchor="start" fontSize="10" fill="var(--text-secondary)">WorkManager 后台任务</text>
          <text x="275" y="310" textAnchor="start" fontSize="10" fill="var(--text-secondary)">GPS 精度按需调整</text>
          <text x="275" y="328" textAnchor="start" fontSize="10" fill="var(--text-secondary)">网络请求批量合并</text>
          <text x="275" y="346" textAnchor="start" fontSize="10" fill="var(--text-secondary)">传感器按需注册/注销</text>

          {/* 稳定性优化 */}
          <rect x="490" y="210" width="220" height="140" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <rect x="490" y="210" width="220" height="32" rx="10" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="600" y="232" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">稳定性优化</text>
          <text x="505" y="256" textAnchor="start" fontSize="10" fill="var(--text-secondary)">Crash捕获（UncaughtHandler）</text>
          <text x="505" y="274" textAnchor="start" fontSize="10" fill="var(--text-secondary)">Native Crash（tombstone）</text>
          <text x="505" y="292" textAnchor="start" fontSize="10" fill="var(--text-secondary)">ANR 日志分析（traces.txt）</text>
          <text x="505" y="310" textAnchor="start" fontSize="10" fill="var(--text-secondary)">Bugly / Firebase 监控</text>
          <text x="505" y="328" textAnchor="start" fontSize="10" fill="var(--text-secondary)">灰度发布与热修复</text>
          <text x="505" y="346" textAnchor="start" fontSize="10" fill="var(--text-secondary)">ProGuard 混淆与反混淆</text>

          {/* 性能分析工具 */}
          <rect x="30" y="370" width="680" height="110" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.2" />
          <text x="370" y="394" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">性能分析工具链</text>
          <text x="50" y="416" textAnchor="start" fontSize="10" fill="var(--text-secondary)">Android Profiler — CPU / 内存 / 网络实时分析</text>
          <text x="50" y="434" textAnchor="start" fontSize="10" fill="var(--text-secondary)">Systrace / Perfetto — 系统级帧/调度/CPU trace</text>
          <text x="50" y="452" textAnchor="start" fontSize="10" fill="var(--text-secondary)">MAT（Memory Analyzer Tool）— Hprof 堆内存分析</text>
          <text x="390" y="416" textAnchor="start" fontSize="10" fill="var(--text-secondary)">LeakCanary — 内存泄漏自动检测</text>
          <text x="390" y="434" textAnchor="start" fontSize="10" fill="var(--text-secondary)">BlockCanary — 主线程卡顿监控</text>
          <text x="390" y="452" textAnchor="start" fontSize="10" fill="var(--text-secondary)">Layout Inspector — 布局层级检查</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Android高级性能优化全景——启动、内存、渲染、ANR卡顿、电量、稳定性六大维度
      </figcaption>
    </figure>
  );
}
