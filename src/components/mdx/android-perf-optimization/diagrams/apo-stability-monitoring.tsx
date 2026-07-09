/**
 * <ApoStabilityMonitoringDiagram>：稳定性与监控全景图。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function ApoStabilityMonitoringDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="稳定性与监控全景图"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            稳定性与监控——ANR/Crash/OOM 防护与线上监控
          </text>

          {/* 三大稳定性问题 */}
          <rect x="30" y="50" width="680" height="170" rx="8" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="72" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">三大稳定性问题</text>

          <rect x="50" y="85" width="200" height="120" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="150" y="105" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">ANR</text>
          <text x="150" y="122" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">主线程阻塞 5s+</text>
          <text x="60" y="140" fontSize="9" fill="var(--text-secondary)">原因：</text>
          <text x="60" y="154" fontSize="9" fill="var(--text-secondary)">- 主线程 IO/DB/网络</text>
          <text x="60" y="168" fontSize="9" fill="var(--text-secondary)">- 锁竞争死锁</text>
          <text x="60" y="182" fontSize="9" fill="var(--text-secondary)">- Binder 调用阻塞</text>
          <text x="60" y="196" fontSize="9" fill="var(--text-secondary)">阈值：5s(Act)/10s(Svc)</text>

          <rect x="270" y="85" width="200" height="120" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="370" y="105" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">Crash</text>
          <text x="370" y="122" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">未捕获异常</text>
          <text x="280" y="140" fontSize="9" fill="var(--text-secondary)">分类：</text>
          <text x="280" y="154" fontSize="9" fill="var(--text-secondary)">- Java Crash（可捕获）</text>
          <text x="280" y="168" fontSize="9" fill="var(--text-secondary)">- Native Crash（SIGSEGV）</text>
          <text x="280" y="182" fontSize="9" fill="var(--text-secondary)">- ANR Crash（系统杀进程）</text>
          <text x="280" y="196" fontSize="9" fill="var(--text-secondary)">处理：UncaughtHandler</text>

          <rect x="490" y="85" width="200" height="120" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="590" y="105" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">OOM</text>
          <text x="590" y="122" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">内存溢出</text>
          <text x="500" y="140" fontSize="9" fill="var(--text-secondary)">原因：</text>
          <text x="500" y="154" fontSize="9" fill="var(--text-secondary)">- Bitmap 过大未压缩</text>
          <text x="500" y="168" fontSize="9" fill="var(--text-secondary)">- 内存泄漏导致堆满</text>
          <text x="500" y="182" fontSize="9" fill="var(--text-secondary)">- 短时间大量对象</text>
          <text x="500" y="196" fontSize="9" fill="var(--text-secondary)">预防：onTrimMemory</text>

          {/* 防护策略 */}
          <rect x="30" y="235" width="330" height="140" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="257" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">防护策略</text>

          <rect x="50" y="270" width="290" height="28" rx="5" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="195" y="288" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">主线程禁止耗时操作（StrictMode）</text>

          <rect x="50" y="304" width="290" height="28" rx="5" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="195" y="322" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">全局 UncaughtExceptionHandler</text>

          <rect x="50" y="338" width="290" height="28" rx="5" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="195" y="356" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">onTrimMemory 主动释放内存</text>

          {/* 线上监控 */}
          <rect x="380" y="235" width="330" height="140" rx="8" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="257" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">线上监控体系</text>

          <rect x="400" y="270" width="290" height="28" rx="5" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.8" />
          <text x="545" y="288" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Crashlytics——崩溃收集与堆栈</text>

          <rect x="400" y="304" width="290" height="28" rx="5" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.8" />
          <text x="545" y="322" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Firebase Performance——性能监控</text>

          <rect x="400" y="338" width="290" height="28" rx="5" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.8" />
          <text x="545" y="356" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">自定义监控——帧率/内存/启动时间</text>

          {/* 监控闭环 */}
          <rect x="30" y="395" width="680" height="95" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.2" />
          <text x="370" y="418" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">稳定性监控闭环</text>

          <text x="100" y="445" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">采集</text>
          <text x="200" y="445" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="300" y="445" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">上报</text>
          <text x="400" y="445" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="500" y="445" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">分析</text>
          <text x="600" y="445" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="680" y="445" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">修复</text>

          <text x="370" y="472" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">崩溃日志 + 性能指标 &rarr; 堆栈分析 + 聚类归因 &rarr; 热修复 + 版本迭代</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        稳定性与监控全景——ANR/Crash/OOM三大问题防护、Crashlytics/Firebase线上监控、采集→上报→分析→修复闭环
      </figcaption>
    </figure>
  );
}
