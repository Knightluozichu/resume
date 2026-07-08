/**
 * <MosProcessManagementDiagram>：进程三态模型 + 四种调度算法对比图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 470;

export function MosProcessManagementDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="进程三态模型与调度算法对比图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            进程三态模型与四种调度算法
          </text>

          {/* 左侧：三态转换图 */}
          <text x="170" y="56" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">进程三态转换</text>

          <rect x="100" y="80" width="140" height="46" rx="8" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1.2" />
          <text x="170" y="108" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">运行 Running</text>

          <rect x="40" y="180" width="120" height="46" rx="8" fill="var(--warning)" fillOpacity="0.14" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="100" y="208" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">就绪 Ready</text>

          <rect x="180" y="180" width="120" height="46" rx="8" fill="var(--danger)" fillOpacity="0.14" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="240" y="208" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">阻塞 Blocked</text>

          {/* 转换箭头 */}
          <text x="80" y="155" fontSize="10" fill="var(--text-secondary)">调度选中</text>
          <text x="200" y="155" fontSize="10" fill="var(--text-secondary)">时间片/抢占</text>
          <text x="60" y="245" fontSize="10" fill="var(--text-secondary)">事件完成</text>
          <text x="210" y="155" fontSize="10" fill="var(--text-secondary)">I/O 等待</text>

          {/* 右侧：四种调度算法 */}
          <text x="540" y="56" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">调度算法权衡矩阵</text>

          <rect x="360" y="76" width="340" height="48" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="372" y="95" fontSize="11" fontWeight="600" fill="var(--warning)">FCFS 先来先服务</text>
          <text x="372" y="112" fontSize="10" fill="var(--text-secondary)">公平/无饥饿；护航效应长作业拖短作业</text>

          <rect x="360" y="132" width="340" height="48" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="372" y="151" fontSize="11" fontWeight="600" fill="var(--accent)">SJF 短作业优先</text>
          <text x="372" y="168" fontSize="10" fill="var(--text-secondary)">平均等待最优；长作业饥饿/需预知时长</text>

          <rect x="360" y="188" width="340" height="48" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="372" y="207" fontSize="11" fontWeight="600" fill="var(--danger)">RR 时间片轮转</text>
          <text x="372" y="224" fontSize="10" fill="var(--text-secondary)">响应稳定/公平；片太小切换开销主导</text>

          <rect x="360" y="244" width="340" height="48" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="372" y="263" fontSize="11" fontWeight="600" fill="var(--success)">MLFQ 多级反馈队列</text>
          <text x="372" y="280" fontSize="10" fill="var(--text-secondary)">自适应 I/O 留高 CPU 沉底；需 aging 防饿</text>

          {/* 下方：上下文切换代价 */}
          <rect x="40" y="320" width="660" height="120" rx="10" fill="var(--text-primary)" fillOpacity="0.03" stroke="var(--border)" strokeWidth="1" />
          <text x="60" y="344" fontSize="13" fontWeight="600" fill="var(--text-primary)">上下文切换代价</text>

          <text x="60" y="368" fontSize="11" fill="var(--text-secondary)">直接开销：保存/恢复寄存器 + 刷新 TLB + 换页表基址寄存器</text>
          <text x="60" y="386" fontSize="11" fill="var(--text-secondary)">间接开销：L1/L2/TLB 缓存被新进程访问模式污染 → cache miss 飙升</text>
          <text x="60" y="408" fontSize="11" fill="var(--accent)">线程切换比进程切换便宜：共享页表 → 不换基址 → 不全刷 TLB</text>
          <text x="60" y="426" fontSize="11" fill="var(--text-tertiary)">经验：切换开销占时间片 1% 以下（片 10-100ms，切换 &lt; 1ms）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        进程三态模型（运行/就绪/阻塞）与 FCFS/SJF/RR/MLFQ 四种调度算法的权衡对比
      </figcaption>
    </figure>
  );
}
