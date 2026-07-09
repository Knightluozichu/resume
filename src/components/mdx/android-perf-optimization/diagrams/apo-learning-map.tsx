/**
 * <ApoLearningMapDiagram>：Android应用性能优化 全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 580;

export function ApoLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Android应用性能优化全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Android应用性能优化——全书学习地图
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            工具 → 布局 → 内存 → CPU/功耗 → 渲染 → 网络 → 存储 → 稳定性 → 复习
          </text>

          <rect x="30" y="62" width="680" height="502" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 第一排：学习地图 与 性能分析工具 */}
          <rect x="50" y="80" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="205" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">全书学习地图</text>
          <text x="205" y="120" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第0章 知识体系总览</text>
          <text x="205" y="132" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">八大维度/递进路径</text>

          <rect x="380" y="80" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">性能分析工具</text>
          <text x="535" y="120" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第1章 Profiler/Perfetto</text>
          <text x="535" y="132" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">CPU/内存/渲染分析</text>

          <text x="205" y="156" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="156" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二排：布局优化 与 内存优化 */}
          <rect x="50" y="170" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="205" y="192" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">布局优化</text>
          <text x="205" y="210" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第2章 层级/过度绘制</text>
          <text x="205" y="222" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">ConstraintLayout/ViewStub</text>

          <rect x="380" y="170" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="535" y="192" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">内存优化</text>
          <text x="535" y="210" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第3章 泄漏/GC/Bitmap</text>
          <text x="535" y="222" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">LeakCanary/LRU缓存</text>

          <text x="205" y="246" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="246" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第三排：CPU与功耗优化 与 渲染与UI优化 */}
          <rect x="50" y="260" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="205" y="282" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">CPU与功耗优化</text>
          <text x="205" y="300" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第4章 线程调度/功耗</text>
          <text x="205" y="312" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Doze/JobScheduler</text>

          <rect x="380" y="260" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="282" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">渲染与UI优化</text>
          <text x="535" y="300" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第5章 16ms/VSync</text>
          <text x="535" y="312" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Choreographer/硬件加速</text>

          <text x="205" y="336" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="336" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第四排：网络优化 与 存储优化 */}
          <rect x="50" y="350" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="205" y="372" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">网络优化</text>
          <text x="205" y="390" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第6章 连接/缓存/压缩</text>
          <text x="205" y="402" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">OkHttp/HTTP2/弱网</text>

          <rect x="380" y="350" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="535" y="372" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">存储优化</text>
          <text x="535" y="390" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第7章 SP/SQLite/Room</text>
          <text x="535" y="402" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">DataStore/MMKV</text>

          <text x="205" y="426" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="426" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第五排：稳定性与监控 与 全书复习 */}
          <rect x="50" y="440" width="310" height="56" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="205" y="462" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">稳定性与监控</text>
          <text x="205" y="480" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第8章 ANR/Crash/OOM</text>
          <text x="205" y="492" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Crashlytics/线上监控</text>

          <rect x="380" y="440" width="310" height="56" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="535" y="462" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">全书复习</text>
          <text x="535" y="480" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第9章 知识图谱/选型矩阵</text>
          <text x="535" y="492" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">工具→布局→内存→渲染</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Android应用性能优化全书学习地图——工具、布局、内存、CPU功耗、渲染、网络、存储、稳定性八阶段递进路径
      </figcaption>
    </figure>
  );
}
