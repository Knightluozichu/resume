/**
 * <LkeFinalReviewDiagram>：Linux内核精髓全书复习——跨章知识串联图。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function LkeFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Linux内核精髓全书复习跨章知识串联图"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            全书知识串联——一次read()系统调用经过的所有子系统
          </text>

          {/* 中心路径 */}
          <rect x="30" y="44" width="680" height="30" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="370" y="64" textAnchor="middle" fontSize="11" fill="var(--text-primary)">用户程序：read(fd, buf, 4096)</text>

          {/* 7个节点 */}
          {/* 1. syscall入口 */}
          <rect x="30" y="84" width="200" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="130" y="103" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">1. 系统调用入口</text>
          <text x="130" y="118" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">int 0x80 / syscall指令</text>
          <text x="130" y="129" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">第1-2章</text>

          {/* 2. VFS */}
          <rect x="250" y="84" width="200" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="350" y="103" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">2. VFS层</text>
          <text x="350" y="118" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">file.f_op→read_iter</text>
          <text x="350" y="129" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">第5章</text>

          {/* 3. Page Cache */}
          <rect x="470" y="84" width="200" height="50" rx="8" fill="var(--success)" fillOpacity="0.18" stroke="var(--success)" strokeWidth="1.5" />
          <text x="570" y="103" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">3. Page Cache</text>
          <text x="570" y="118" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">命中？拷贝返回</text>
          <text x="570" y="129" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">第5章</text>

          {/* 箭头1→2→3 */}
          <line x1="230" y1="109" x2="250" y2="109" stroke="var(--text-tertiary)" strokeWidth="1" markerEnd="url(#ar)" />
          <line x1="450" y1="109" x2="470" y2="109" stroke="var(--text-tertiary)" strokeWidth="1" markerEnd="url(#ar)" />
          <defs>
            <marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--text-tertiary)" />
            </marker>
          </defs>

          {/* 4. 内存分配 */}
          <rect x="30" y="150" width="200" height="50" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="130" y="169" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">4. 内存分配</text>
          <text x="130" y="184" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">alloc_pages→Buddy</text>
          <text x="130" y="195" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">第4章</text>

          {/* 5. 块I/O */}
          <rect x="250" y="150" width="200" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="350" y="169" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">5. 块I/O栈</text>
          <text x="350" y="184" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">submit_bio→调度器</text>
          <text x="350" y="195" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">第6章</text>

          {/* 6. 驱动+中断 */}
          <rect x="470" y="150" width="200" height="50" rx="8" fill="var(--warning)" fillOpacity="0.18" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="570" y="169" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">6. 驱动+中断</text>
          <text x="570" y="184" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">DMA→IRQ→softirq</text>
          <text x="570" y="195" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">第6章</text>

          <line x1="230" y1="175" x2="250" y2="175" stroke="var(--text-tertiary)" strokeWidth="1" markerEnd="url(#ar)" />
          <line x1="450" y1="175" x2="470" y2="175" stroke="var(--text-tertiary)" strokeWidth="1" markerEnd="url(#ar)" />

          {/* 7. 同步保护 */}
          <rect x="250" y="216" width="200" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="350" y="235" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">7. 同步保护</text>
          <text x="350" y="250" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">自旋锁/RCU/原子量</text>
          <text x="350" y="261" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">第7章</text>

          <line x1="570" y1="200" x2="570" y2="241" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 2" />
          <line x1="570" y1="241" x2="450" y2="241" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 2" markerEnd="url(#ar)" />

          {/* 数据返回路径 */}
          <rect x="30" y="284" width="640" height="30" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.8" strokeDasharray="4 2" />
          <text x="350" y="304" textAnchor="middle" fontSize="10" fill="var(--success)">返回路径：softirq完成 → 唤醒等待进程 → copy_to_user → read()返回</text>

          {/* 知识关联 */}
          <rect x="30" y="326" width="680" height="158" rx="8" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="0.8" strokeOpacity="0.3" />
          <text x="370" y="344" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">跨章知识关联</text>
          <text x="45" y="362" fontSize="9" fill="var(--text-secondary)">进程（第3章）↔ 同步（第7章）：task_struct 持有等待队列，sleep/wakeup 经由同步原语</text>
          <text x="45" y="378" fontSize="9" fill="var(--text-secondary)">内存（第4章）↔ 文件（第5章）：Page Cache 的物理页由 Buddy 分配，mmap 共享页映射</text>
          <text x="45" y="394" fontSize="9" fill="var(--text-secondary)">文件（第5章）↔ I/O（第6章）：VFS 的 submit_bio 下沉到块设备层，经I/O调度到驱动</text>
          <text x="45" y="410" fontSize="9" fill="var(--text-secondary)">I/O（第6章）↔ 同步（第7章）：中断上下文只能用自旋锁，进程上下文可用互斥锁</text>
          <text x="45" y="426" fontSize="9" fill="var(--text-secondary)">网络（第8章）↔ I/O（第6章）：sk_buff 缓冲区从 Slab 分配，NAPI 复用中断/轮询机制</text>
          <text x="45" y="442" fontSize="9" fill="var(--text-secondary)">调试（第9章）：eBPF/perf 可追踪任意子系统，ftrace 可绘制函数调用图</text>
          <text x="45" y="458" fontSize="9" fill="var(--text-secondary)">架构（第2章）：syscall 是所有子系统的统一入口，中断是所有异步事件的统一入口</text>
          <text x="45" y="474" fontSize="8" fill="var(--text-tertiary)">核心洞察：内核不是孤立子系统的堆叠，而是一张紧密耦合的数据流网络</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        一次read()经过7个内核子系统，串联全书所有知识点；内核是紧密耦合的数据流网络而非孤立模块
      </figcaption>
    </figure>
  );
}
