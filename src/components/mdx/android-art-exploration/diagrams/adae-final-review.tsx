/**
 * <AdaeFinalReviewDiagram>：全书知识图谱图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 560;

export function AdaeFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Android开发艺术探索全书知识图谱图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Android开发艺术探索——全书知识图谱
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            四大组件 → View → 消息与线程 → 性能优化
          </text>

          {/* 中心：Android核心能力 */}
          <rect x="270" y="240" width="200" height="80" rx="12" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="370" y="270" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">Android 核心能力</text>
          <text x="370" y="290" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">组件 / View / 消息 / 性能</text>
          <text x="370" y="308" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">任玉刚《艺术探索》</text>

          {/* 四角四象限 */}
          <rect x="40" y="80" width="240" height="130" rx="10" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="160" y="104" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">四大组件</text>
          <text x="50" y="128" fontSize="11" fill="var(--text-secondary)">Activity 生命周期/启动模式</text>
          <text x="50" y="146" fontSize="11" fill="var(--text-secondary)">IPC Binder/AIDL/Messenger</text>
          <text x="50" y="164" fontSize="11" fill="var(--text-secondary)">RemoteViews 通知/Widget</text>
          <text x="50" y="182" fontSize="11" fill="var(--text-secondary)">ContentProvider 数据共享</text>
          <text x="50" y="200" fontSize="11" fill="var(--text-tertiary)">第1/2/4章</text>

          <rect x="460" y="80" width="240" height="130" rx="10" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="580" y="104" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">View 体系</text>
          <text x="470" y="128" fontSize="11" fill="var(--text-secondary)">measure/layout/draw</text>
          <text x="470" y="146" fontSize="11" fill="var(--text-secondary)">MeasureSpec 三模式</text>
          <text x="470" y="164" fontSize="11" fill="var(--text-secondary)">事件分发三方法</text>
          <text x="470" y="182" fontSize="11" fill="var(--text-secondary)">Drawable/动画体系</text>
          <text x="470" y="200" fontSize="11" fill="var(--text-tertiary)">第3/5章</text>

          <rect x="40" y="350" width="240" height="130" rx="10" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="160" y="374" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">消息与线程</text>
          <text x="50" y="398" fontSize="11" fill="var(--text-secondary)">Handler/Looper/MessageQueue</text>
          <text x="50" y="416" fontSize="11" fill="var(--text-secondary)">ThreadLocal 线程隔离</text>
          <text x="50" y="434" fontSize="11" fill="var(--text-secondary)">AsyncTask 五步</text>
          <text x="50" y="452" fontSize="11" fill="var(--text-secondary)">线程池/HandlerThread</text>
          <text x="50" y="470" fontSize="11" fill="var(--text-tertiary)">第6/7章</text>

          <rect x="460" y="350" width="240" height="130" rx="10" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="580" y="374" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">性能优化</text>
          <text x="470" y="398" fontSize="11" fill="var(--text-secondary)">布局层级/过度绘制</text>
          <text x="470" y="416" fontSize="11" fill="var(--text-secondary)">内存泄漏/OOM</text>
          <text x="470" y="434" fontSize="11" fill="var(--text-secondary)">卡顿/ANR</text>
          <text x="470" y="452" fontSize="11" fill="var(--text-secondary)">耗电/稳定性</text>
          <text x="470" y="470" fontSize="11" fill="var(--text-tertiary)">第8章</text>

          {/* 连接线 */}
          <line x1="160" y1="210" x2="290" y2="248" stroke="var(--text-tertiary)" strokeWidth="1.2" strokeDasharray="4 3" />
          <line x1="580" y1="210" x2="450" y2="248" stroke="var(--text-tertiary)" strokeWidth="1.2" strokeDasharray="4 3" />
          <line x1="160" y1="350" x2="290" y2="312" stroke="var(--text-tertiary)" strokeWidth="1.2" strokeDasharray="4 3" />
          <line x1="580" y1="350" x2="450" y2="312" stroke="var(--text-tertiary)" strokeWidth="1.2" strokeDasharray="4 3" />

          {/* 底部总结 */}
          <rect x="40" y="500" width="660" height="44" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.1" strokeOpacity="0.4" />
          <text x="370" y="522" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">主线：理解机制 → 用对工具 → 优化性能</text>
          <text x="370" y="538" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">组件是骨架，View 是脸面，消息线程是神经，性能是体检</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Android开发艺术探索全书知识图谱——四大组件、View体系、消息与线程、性能优化四象限交汇
      </figcaption>
    </figure>
  );
}
