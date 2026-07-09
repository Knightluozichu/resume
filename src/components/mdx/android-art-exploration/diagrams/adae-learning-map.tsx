/**
 * <AdaeLearningMapDiagram>：Android开发艺术探索 全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 580;

export function AdaeLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Android开发艺术探索全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Android开发艺术探索——全书学习地图
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            Activity → IPC → View → RemoteViews → Drawable → Handler → 线程 → 性能 → 复习
          </text>

          <rect x="30" y="62" width="680" height="502" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 第一排：学习地图 与 Activity生命周期 */}
          <rect x="50" y="80" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="205" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">全书学习地图</text>
          <text x="205" y="120" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第0章 知识体系总览</text>
          <text x="205" y="132" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">四大组件/View/性能路径</text>

          <rect x="380" y="80" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="535" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">Activity生命周期与启动模式</text>
          <text x="535" y="120" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第1章 生命周期/launchMode</text>
          <text x="535" y="132" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Intent/任务栈</text>

          <text x="205" y="156" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="156" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二排：IPC机制与Binder 与 View工作原理 */}
          <rect x="50" y="170" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="205" y="192" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">IPC机制与Binder</text>
          <text x="205" y="210" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第2章 Binder/AIDL/Messenger</text>
          <text x="205" y="222" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">ContentProvider/Socket</text>

          <rect x="380" y="170" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="192" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">View工作原理</text>
          <text x="535" y="210" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第3章 measure/layout/draw</text>
          <text x="535" y="222" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">MeasureSpec/事件分发</text>

          <text x="205" y="246" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="246" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第三排：RemoteViews与通知 与 Drawable与动画 */}
          <rect x="50" y="260" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="205" y="282" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">RemoteViews与通知</text>
          <text x="205" y="300" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第4章 通知/桌面Widget</text>
          <text x="205" y="312" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">跨进程UI更新</text>

          <rect x="380" y="260" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="535" y="282" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">Drawable与动画</text>
          <text x="535" y="300" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第5章 Drawable种类/动画</text>
          <text x="535" y="312" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">View动画/属性动画</text>

          <text x="205" y="336" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="336" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第四排：Handler消息机制 与 线程与AsyncTask */}
          <rect x="50" y="350" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="205" y="372" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">Handler消息机制</text>
          <text x="205" y="390" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第6章 Message/Looper</text>
          <text x="205" y="402" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">MessageQueue/ThreadLocal</text>

          <rect x="380" y="350" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="535" y="372" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">线程与AsyncTask</text>
          <text x="535" y="390" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第7章 AsyncTask/线程池</text>
          <text x="535" y="402" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">HandlerThread/IntentService</text>

          <text x="205" y="426" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="426" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第五排：性能优化 与 全书复习 */}
          <rect x="50" y="440" width="310" height="56" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="205" y="462" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">性能优化</text>
          <text x="205" y="480" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第8章 布局/内存/ANR</text>
          <text x="205" y="492" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">过度绘制/Lint/内存泄漏</text>

          <rect x="380" y="440" width="310" height="56" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="535" y="462" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">全书复习</text>
          <text x="535" y="480" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第9章 知识图谱/选型矩阵</text>
          <text x="535" y="492" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">组件→View→消息→性能</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Android开发艺术探索全书学习地图——Activity、IPC、View、RemoteViews、Drawable、Handler、线程、性能优化八阶段递进路径
      </figcaption>
    </figure>
  );
}
