/**
 * <UapThreadsDiagram>：线程模型与同步原语图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function UapThreadsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="线程模型与同步原语图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            线程——共享与同步机制
          </text>

          {/* 进程内线程共享 */}
          <rect x="30" y="48" width="680" height="150" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="68" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">进程内多线程共享资源</text>

          {/* 线程1 */}
          <rect x="50" y="80" width="150" height="100" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="125" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">线程 1</text>
          <text x="125" y="116" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">独立栈</text>
          <text x="125" y="130" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">独立寄存器</text>
          <text x="125" y="144" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">独立 PC</text>
          <text x="125" y="158" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">独立 thread_id</text>
          <text x="125" y="172" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">errno</text>

          {/* 线程2 */}
          <rect x="540" y="80" width="150" height="100" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="615" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">线程 2</text>
          <text x="615" y="116" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">独立栈</text>
          <text x="615" y="130" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">独立寄存器</text>
          <text x="615" y="144" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">独立 PC</text>
          <text x="615" y="158" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">独立 thread_id</text>
          <text x="615" y="172" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">errno</text>

          {/* 共享区域 */}
          <rect x="220" y="80" width="300" height="100" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="370" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">共享区域</text>
          <text x="370" y="118" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">代码段 / 数据段 / 堆</text>
          <text x="370" y="132" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">文件描述符表</text>
          <text x="370" y="146" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">信号处理函数</text>
          <text x="370" y="160" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">当前工作目录</text>
          <text x="370" y="174" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">全局变量 / 静态变量</text>

          <text x="370" y="216" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">同步原语</text>

          {/* 互斥锁 */}
          <rect x="30" y="230" width="330" height="120" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="250" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">互斥锁（Mutex）</text>

          <text x="50" y="270" fontSize="10" fill="var(--text-secondary)">pthread_mutex_lock / unlock</text>
          <text x="50" y="284" fontSize="10" fill="var(--text-secondary)">保护临界区, 同一时刻仅一个持有</text>
          <text x="50" y="298" fontSize="10" fill="var(--text-secondary)">pthread_mutex_timedlock 超时版本</text>
          <text x="50" y="312" fontSize="10" fill="var(--text-secondary)">类型: NORMAL / ERRORCHECK / RECURSIVE</text>
          <text x="50" y="326" fontSize="10" fill="var(--text-secondary)">忘记 unlock → 死锁</text>
          <text x="50" y="340" fontSize="10" fill="var(--text-secondary)">lock 两次 → 死锁（非RECURSIVE）</text>

          {/* 读写锁 */}
          <rect x="380" y="230" width="330" height="120" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="250" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">读写锁（RWLock）</text>

          <text x="400" y="270" fontSize="10" fill="var(--text-secondary)">pthread_rwlock_rdlock / wrlock</text>
          <text x="400" y="284" fontSize="10" fill="var(--text-secondary)">读共享: 多线程可同时读</text>
          <text x="400" y="298" fontSize="10" fill="var(--text-secondary)">写独占: 写时禁止任何读/写</text>
          <text x="400" y="312" fontSize="10" fill="var(--text-secondary)">读多写少场景优于互斥锁</text>
          <text x="400" y="326" fontSize="10" fill="var(--text-secondary)">写饥饿: 读者持续不断时写者等待</text>
          <text x="400" y="340" fontSize="10" fill="var(--text-secondary)">需关注写者优先策略</text>

          {/* 条件变量 */}
          <rect x="30" y="362" width="330" height="120" rx="10" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="382" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">条件变量（Condition Variable）</text>

          <text x="50" y="402" fontSize="10" fill="var(--text-secondary)">pthread_cond_wait / signal / broadcast</text>
          <text x="50" y="416" fontSize="10" fill="var(--text-secondary)">等待条件成立, 与互斥锁配合</text>
          <text x="50" y="430" fontSize="10" fill="var(--text-secondary)">wait: 原子释放锁+阻塞, 唤醒后重获锁</text>
          <text x="50" y="444" fontSize="10" fill="var(--text-secondary)">signal: 唤醒一个等待线程</text>
          <text x="50" y="458" fontSize="10" fill="var(--text-secondary)">broadcast: 唤醒所有等待线程</text>
          <text x="50" y="472" fontSize="10" fill="var(--text-secondary)">用 while 循环检查条件（防虚假唤醒）</text>

          {/* 线程控制 */}
          <rect x="380" y="362" width="330" height="120" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="382" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">线程控制</text>

          <text x="400" y="402" fontSize="10" fill="var(--text-secondary)">pthread_create(tid, attr, func, arg)</text>
          <text x="400" y="416" fontSize="10" fill="var(--text-secondary)">pthread_exit(retval) 退出</text>
          <text x="400" y="430" fontSize="10" fill="var(--text-secondary)">pthread_join(tid, &amp;retval) 等待</text>
          <text x="400" y="444" fontSize="10" fill="var(--text-secondary)">pthread_detach(tid) 自动回收</text>
          <text x="400" y="458" fontSize="10" fill="var(--text-secondary)">pthread_cancel(tid) 取消</text>
          <text x="400" y="472" fontSize="10" fill="var(--text-secondary)">pthread_once 一次性初始化</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        线程模型：线程间共享代码/数据/堆/fd表但各有独立栈，互斥锁/读写锁/条件变量保证并发安全
      </figcaption>
    </figure>
  );
}
