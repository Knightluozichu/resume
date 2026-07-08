/**
 * <LkdKernelSyncDiagram>：内核同步机制——锁对比与RCU图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function LkdKernelSyncDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="内核同步机制对比图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            内核同步机制——自旋锁 vs 信号量 vs RCU
          </text>

          {/* 自旋锁 */}
          <rect x="30" y="46" width="210" height="180" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="135" y="66" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">自旋锁 spinlock</text>
          <text x="40" y="84" fontSize="9" fill="var(--text-secondary)">获取失败: CPU忙等(spin)</text>
          <text x="40" y="98" fontSize="9" fill="var(--text-secondary)">不睡眠 / 不让出CPU</text>
          <text x="40" y="112" fontSize="9" fill="var(--text-secondary)">同时禁用抢占</text>
          <text x="40" y="126" fontSize="9" fill="var(--text-secondary)">中断上下文可用</text>
          <text x="40" y="144" fontSize="9" fontWeight="600" fill="var(--danger)">适用:</text>
          <text x="40" y="158" fontSize="9" fill="var(--text-tertiary)">临界区极短(微秒级)</text>
          <text x="40" y="172" fontSize="9" fill="var(--text-tertiary)">多CPU争用</text>
          <text x="40" y="186" fontSize="9" fill="var(--text-tertiary)">不睡眠场景</text>
          <text x="40" y="204" fontSize="9" fontWeight="600" fill="var(--danger)">禁止:</text>
          <text x="40" y="218" fontSize="9" fill="var(--text-tertiary)">持锁时调用睡眠函数</text>

          {/* 信号量 */}
          <rect x="265" y="46" width="210" height="180" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="66" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">信号量 / mutex</text>
          <text x="275" y="84" fontSize="9" fill="var(--text-secondary)">获取失败: 进程睡眠</text>
          <text x="275" y="98" fontSize="9" fill="var(--text-secondary)">让出CPU / 被唤醒后重试</text>
          <text x="275" y="112" fontSize="9" fill="var(--text-secondary)">进程上下文</text>
          <text x="275" y="126" fontSize="9" fill="var(--text-secondary)">中断上下文不可用</text>
          <text x="275" y="144" fontSize="9" fontWeight="600" fill="var(--warning)">适用:</text>
          <text x="275" y="158" fontSize="9" fill="var(--text-tertiary)">临界区较长(毫秒级)</text>
          <text x="275" y="172" fontSize="9" fill="var(--text-tertiary)">需要睡眠的场景</text>
          <text x="275" y="186" fontSize="9" fill="var(--text-tertiary)">可阻塞的I/O操作</text>
          <text x="275" y="204" fontSize="9" fontWeight="600" fill="var(--warning)">禁止:</text>
          <text x="275" y="218" fontSize="9" fill="var(--text-tertiary)">在中断上下文使用</text>

          {/* RCU */}
          <rect x="500" y="46" width="210" height="180" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="605" y="66" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">RCU</text>
          <text x="510" y="84" fontSize="9" fill="var(--text-secondary)">读端: 零开销(不加锁)</text>
          <text x="510" y="98" fontSize="9" fill="var(--text-secondary)">仅禁用抢占+内存屏障</text>
          <text x="510" y="112" fontSize="9" fill="var(--text-secondary)">写端: 拷贝→修改→替换</text>
          <text x="510" y="126" fontSize="9" fill="var(--text-secondary)">延迟回收旧数据</text>
          <text x="510" y="144" fontSize="9" fontWeight="600" fill="var(--success)">适用:</text>
          <text x="510" y="158" fontSize="9" fill="var(--text-tertiary)">读多写少</text>
          <text x="510" y="172" fontSize="9" fill="var(--text-tertiary)">路由表/dentry缓存</text>
          <text x="510" y="186" fontSize="9" fill="var(--text-tertiary)">指针数据结构</text>
          <text x="510" y="204" fontSize="9" fontWeight="600" fill="var(--success)">禁止:</text>
          <text x="510" y="218" fontSize="9" fill="var(--text-tertiary)">频繁写入场景</text>

          {/* RCU 写端流程 */}
          <rect x="30" y="240" width="680" height="100" rx="8" fill="var(--success)" fillOpacity="0.05" stroke="var(--success)" strokeWidth="1" />
          <text x="370" y="260" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">RCU 写端流程（Read-Copy-Update）</text>

          <rect x="50" y="270" width="130" height="50" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="115" y="290" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">1. Copy</text>
          <text x="115" y="306" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">复制旧数据</text>
          <text x="115" y="316" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">读者仍在读旧数据</text>

          <rect x="200" y="270" width="130" height="50" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="265" y="290" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">2. Update</text>
          <text x="265" y="306" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">修改副本</text>
          <text x="265" y="316" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">不影响读者</text>

          <rect x="350" y="270" width="130" height="50" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="415" y="290" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">3. Replace</text>
          <text x="415" y="306" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">原子替换指针</text>
          <text x="415" y="316" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">新读者看新数据</text>

          <rect x="500" y="270" width="190" height="50" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="595" y="290" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">4. Reclaim</text>
          <text x="595" y="306" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">synchronize_rcu等待宽限期</text>
          <text x="595" y="316" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">旧读者退出后释放旧数据</text>

          <line x1="180" y1="295" x2="198" y2="295" stroke="var(--text-tertiary)" strokeWidth="1" markerEnd="url(#arr4)" />
          <line x1="330" y1="295" x2="348" y2="295" stroke="var(--text-tertiary)" strokeWidth="1" markerEnd="url(#arr4)" />
          <line x1="480" y1="295" x2="498" y2="295" stroke="var(--text-tertiary)" strokeWidth="1" markerEnd="url(#arr4)" />

          {/* 死锁场景 */}
          <rect x="30" y="354" width="680" height="86" rx="6" fill="var(--danger)" fillOpacity="0.05" stroke="var(--danger)" strokeWidth="1" />
          <text x="370" y="374" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">常见死锁场景与避免</text>
          <text x="50" y="392" fontSize="9" fill="var(--text-secondary)">AB-BA死锁: 线程1持A求B, 线程2持B求A → 避免: 全局锁排序</text>
          <text x="50" y="406" fontSize="9" fill="var(--text-secondary)">中断死锁: 进程持锁L→被中断→ISR求L → 避免: spin_lock_irqsave禁中断</text>
          <text x="50" y="420" fontSize="9" fill="var(--text-secondary)">持锁睡眠: 持自旋锁调用睡眠函数 → 避免: 持自旋锁绝不睡眠</text>
          <text x="50" y="434" fontSize="9" fill="var(--text-tertiary)">开发期用 lockdep 检测锁依赖图, 发现潜在死锁</text>

          {/* 底部 */}
          <rect x="30" y="452" width="680" height="34" rx="6" fill="var(--text-primary)" fillOpacity="0.05" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.2" />
          <text x="370" y="474" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">取舍核心: 短临界区→自旋锁(CPU换延迟) / 长临界区→信号量(调度换CPU) / 读多写少→RCU(空间换时间)</text>

          <defs>
            <marker id="arr4" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--text-tertiary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        内核同步机制对比——自旋锁忙等适合短临界区、信号量睡眠适合长临界区、RCU零开销读端适合读多写少
      </figcaption>
    </figure>
  );
}
