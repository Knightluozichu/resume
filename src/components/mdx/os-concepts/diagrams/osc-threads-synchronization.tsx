/**
 * <OscThreadsSynchronizationDiagram>：线程与同步——临界区保护与同步工具谱系。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 470;

export function OscThreadsSynchronizationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="线程同步与临界区保护图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            线程同步：临界区问题与同步工具谱系
          </text>

          {/* 左侧：临界区结构 */}
          <text x="170" y="58" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">临界区问题的结构</text>

          <rect x="40" y="72" width="260" height="32" rx="5" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="170" y="92" textAnchor="middle" fontSize="10" fill="var(--warning)">1. entry section（进入区：请求锁）</text>

          <rect x="40" y="112" width="260" height="32" rx="5" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="170" y="132" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">2. critical section（临界区：访问共享）</text>

          <rect x="40" y="152" width="260" height="32" rx="5" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="170" y="172" textAnchor="middle" fontSize="10" fill="var(--success)">3. exit section（退出区：释放锁）</text>

          <rect x="40" y="192" width="260" height="32" rx="5" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--border)" strokeWidth="1" />
          <text x="170" y="212" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">4. remainder section（剩余区）</text>

          <text x="170" y="248" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">临界区三准则</text>
          <text x="170" y="266" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">互斥：至多一个进程在临界区</text>
          <text x="170" y="280" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">前进：空闲时必须决定谁来进</text>
          <text x="170" y="294" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">有限等待：不能无限被插队</text>

          {/* 右侧：同步工具谱系 */}
          <text x="530" y="58" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">同步工具谱系</text>

          <rect x="400" y="72" width="260" height="48" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="530" y="92" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">自旋锁 Spinlock</text>
          <text x="530" y="108" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">忙等待 / 单核无效 / 多核快</text>

          <text x="530" y="130" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="400" y="138" width="260" height="48" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="530" y="158" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">互斥锁 Mutex</text>
          <text x="530" y="174" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">阻塞睡眠 / 唤醒切换 / 通用</text>

          <text x="530" y="196" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="400" y="204" width="260" height="48" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="530" y="224" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">信号量 Semaphore</text>
          <text x="530" y="240" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">计数器 / P 操作等待 / V 操作唤醒</text>

          <text x="530" y="262" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="400" y="270" width="260" height="48" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="530" y="290" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">管程 Monitor</text>
          <text x="530" y="306" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">语言级封装 / 条件变量 / 自动解锁</text>

          {/* 底部：经典问题 */}
          <rect x="30" y="332" width="680" height="120" rx="10" fill="var(--text-primary)" fillOpacity="0.03" stroke="var(--border)" strokeWidth="1" />
          <text x="50" y="354" fontSize="13" fontWeight="600" fill="var(--text-primary)">经典同步问题</text>

          <text x="50" y="378" fontSize="10" fontWeight="600" fill="var(--warning)">有限缓冲问题</text>
          <text x="50" y="394" fontSize="9" fill="var(--text-tertiary)">empty / full 信号量 + mutex 互斥</text>
          <text x="50" y="408" fontSize="9" fill="var(--text-tertiary)">生产者等空位，消费者等数据</text>

          <text x="270" y="378" fontSize="10" fontWeight="600" fill="var(--accent)">读者-写者</text>
          <text x="270" y="394" fontSize="9" fill="var(--text-tertiary)">读者可并发 / 写者独占</text>
          <text x="270" y="408" fontSize="9" fill="var(--text-tertiary)">readcount + mutex + rw_mutex</text>

          <text x="490" y="378" fontSize="10" fontWeight="600" fill="var(--danger)">哲学家就餐</text>
          <text x="490" y="394" fontSize="9" fill="var(--text-tertiary)">5 哲学家 5 叉叉死锁</text>
          <text x="490" y="408" fontSize="9" fill="var(--text-tertiary)">解法：限人数 / 非对称 / 号码牌</text>

          <text x={VIEW_W / 2} y="438" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            自旋锁适合短临界区（多核），互斥锁适合长临界区，信号量可计数，管程封装最强
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        线程同步工具谱系——自旋锁、互斥锁、信号量、管程的演进与经典同步问题
      </figcaption>
    </figure>
  );
}
