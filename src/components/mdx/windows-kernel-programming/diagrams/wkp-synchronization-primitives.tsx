/**
 * <WkpSynchronizationPrimitivesDiagram>：同步原语——自旋锁与事件等图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function WkpSynchronizationPrimitivesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="同步原语自旋锁与事件等图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            内核同步原语——按 IRQL 选型
          </text>

          {/* IRQL 分层 */}
          <rect x="40" y="48" width="660" height="30" rx="6" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="60" y="68" fontSize="10" fill="var(--text-tertiary)">IRQL 层级：</text>
          <text x="170" y="68" fontSize="10" fill="var(--danger)" fontWeight="600">DIRQL / DISPATCH_LEVEL</text>
          <text x="400" y="68" fontSize="10" fill="var(--warning)">APC_LEVEL</text>
          <text x="510" y="68" fontSize="10" fill="var(--success)">PASSIVE_LEVEL</text>

          {/* 自旋锁 */}
          <rect x="40" y="94" width="220" height="180" rx="10" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.4" />
          <text x="150" y="118" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--danger)">自旋锁（SpinLock）</text>
          <text x="150" y="134" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">DISPATCH_LEVEL 可用</text>
          <line x1="60" y1="142" x2="240" y2="142" stroke="var(--danger)" strokeWidth="0.6" strokeOpacity="0.3" />
          <text x="60" y="158" fontSize="10" fill="var(--text-secondary)">KeAcquireSpinLock / KeReleaseSpinLock</text>
          <text x="60" y="174" fontSize="10" fill="var(--text-secondary)">提升至 DISPATCH_LEVEL 并自旋</text>
          <text x="60" y="190" fontSize="10" fill="var(--text-secondary)">极短临界区，忙等待</text>
          <text x="60" y="206" fontSize="10" fill="var(--text-secondary)">多核间互斥访问共享数据</text>
          <text x="60" y="226" fontSize="9" fill="var(--danger)" fontWeight="600">约束：</text>
          <text x="60" y="240" fontSize="9" fill="var(--text-tertiary)">不可分页、不可等待</text>
          <text x="60" y="254" fontSize="9" fill="var(--text-tertiary)">持锁时间必须极短</text>
          <text x="60" y="268" fontSize="9" fill="var(--text-tertiary)">必须保存/恢复 IRQL</text>

          {/* 执行体互斥体 */}
          <rect x="280" y="94" width="200" height="180" rx="10" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="380" y="118" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">执行体互斥体</text>
          <text x="380" y="134" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">PASSIVE_LEVEL 可用</text>
          <line x1="300" y1="142" x2="460" y2="142" stroke="var(--warning)" strokeWidth="0.6" strokeOpacity="0.3" />
          <text x="300" y="158" fontSize="10" fill="var(--text-secondary)">ExAcquireFastMutex / Release</text>
          <text x="300" y="174" fontSize="10" fill="var(--text-secondary)">阻塞等待，不自旋</text>
          <text x="300" y="190" fontSize="10" fill="var(--text-secondary)">较长临界区适用</text>
          <text x="300" y="206" fontSize="10" fill="var(--text-secondary)">递归获取不支持的变种</text>
          <text x="300" y="226" fontSize="9" fill="var(--warning)" fontWeight="600">约束：</text>
          <text x="300" y="240" fontSize="9" fill="var(--text-tertiary)">仅 PASSIVE_LEVEL</text>
          <text x="300" y="254" fontSize="9" fill="var(--text-tertiary)">可分页（注意）</text>
          <text x="300" y="268" fontSize="9" fill="var(--text-tertiary)">开销比自旋锁大</text>

          {/* 事件/信号量 */}
          <rect x="500" y="94" width="200" height="180" rx="10" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.4" />
          <text x="600" y="118" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">事件/信号量</text>
          <text x="600" y="134" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">PASSIVE_LEVEL 可用</text>
          <line x1="520" y1="142" x2="680" y2="142" stroke="var(--success)" strokeWidth="0.6" strokeOpacity="0.3" />
          <text x="520" y="158" fontSize="10" fill="var(--text-secondary)">KeWaitForSingleObject</text>
          <text x="520" y="174" fontSize="10" fill="var(--text-secondary)">KeSetEvent / KeResetEvent</text>
          <text x="520" y="190" fontSize="10" fill="var(--text-secondary)">通知/同步事件</text>
          <text x="520" y="206" fontSize="10" fill="var(--text-secondary)">生产者-消费者协调</text>
          <text x="520" y="226" fontSize="9" fill="var(--success)" fontWeight="600">事件类型：</text>
          <text x="520" y="240" fontSize="9" fill="var(--text-tertiary)">NotificationEvent（手动复位）</text>
          <text x="520" y="254" fontSize="9" fill="var(--text-tertiary)">SynchronizationEvent（自动）</text>
          <text x="520" y="268" fontSize="9" fill="var(--text-tertiary)">可设超时</text>

          {/* 选型决策树 */}
          <rect x="40" y="290" width="660" height="90" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="370" y="312" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">同步原语选型决策</text>
          <text x="370" y="330" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">IRQL &gt;= DISPATCH_LEVEL？ → 自旋锁（必须极短）</text>
          <text x="370" y="346" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">PASSIVE_LEVEL + 短临界区？ → 快速互斥体（FastMutex）</text>
          <text x="370" y="362" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">需要跨线程等待/通知？ → 事件/信号量（KeWaitForSingleObject）</text>
          <text x="370" y="376" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">规则：IRQL 决定可选范围，持锁时长决定具体选型</text>

          {/* 死锁防范 */}
          <rect x="40" y="396" width="660" height="50" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="370" y="416" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">死锁防范</text>
          <text x="370" y="434" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">统一锁序 → 持锁时绝不再等待低 IRQL 资源 → 最高 IRQL 锁先释放 → Driver Verifier 检测死锁</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        同步原语——自旋锁（DISPATCH_LEVEL自旋）、执行体互斥体（PASSIVE_LEVEL阻塞）、事件信号量（跨线程通知）按IRQL选型
      </figcaption>
    </figure>
  );
}
