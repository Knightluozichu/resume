/**
 * <WjProcessThreadWinDiagram>：Windows 进程与线程体系图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function WjProcessThreadWinDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Windows 进程与线程体系图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Windows 进程与线程模型
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            进程 = 容器（地址空间+资源），线程 = 执行单元（栈+寄存器）
          </text>

          {/* 进程结构 */}
          <rect x="30" y="68" width="330" height="180" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="195" y="90" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">进程（Process）</text>
          <line x1="50" y1="100" x2="340" y2="100" stroke="var(--warning)" strokeWidth="0.6" strokeOpacity="0.3" />
          <text x="50" y="118" fontSize="10" fill="var(--text-secondary)">EPROCESS（内核进程对象）</text>
          <text x="50" y="134" fontSize="10" fill="var(--text-secondary)">虚拟地址空间（0~4GB / 0~128TB）</text>
          <text x="50" y="150" fontSize="10" fill="var(--text-secondary)">PEB（进程环境块）</text>
          <text x="50" y="166" fontSize="10" fill="var(--text-secondary)">句柄表（Handle Table）</text>
          <text x="50" y="182" fontSize="10" fill="var(--text-secondary)">加载的 DLL 模块链表</text>
          <text x="50" y="198" fontSize="10" fill="var(--text-secondary)">令牌（Token，安全上下文）</text>
          <text x="50" y="214" fontSize="10" fill="var(--text-secondary)">优先级类（IDLE/NORMAL/HIGH/REALTIME）</text>
          <text x="50" y="232" fontSize="10" fill="var(--text-tertiary)">创建：CreateProcess → 映射EXE → 主线程启动</text>

          {/* 线程结构 */}
          <rect x="380" y="68" width="330" height="180" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="545" y="90" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">线程（Thread）</text>
          <line x1="400" y1="100" x2="700" y2="100" stroke="var(--accent)" strokeWidth="0.6" strokeOpacity="0.3" />
          <text x="400" y="118" fontSize="10" fill="var(--text-secondary)">ETHREAD（内核线程对象）</text>
          <text x="400" y="134" fontSize="10" fill="var(--text-secondary)">TEB / TIB（线程环境块）</text>
          <text x="400" y="150" fontSize="10" fill="var(--text-secondary)">用户态栈（默认 1MB）</text>
          <text x="400" y="166" fontSize="10" fill="var(--text-secondary)">内核态栈（12KB~24KB）</text>
          <text x="400" y="182" fontSize="10" fill="var(--text-secondary)">寄存器现场（CONTEXT）</text>
          <text x="400" y="198" fontSize="10" fill="var(--text-secondary)">线程局部存储（TLS）</text>
          <text x="400" y="214" fontSize="10" fill="var(--text-secondary)">优先级（0~31，调度优先）</text>
          <text x="400" y="232" fontSize="10" fill="var(--text-tertiary)">创建：CreateThread → 分配栈 → 调度执行</text>

          {/* 同步机制 */}
          <rect x="30" y="268" width="680" height="130" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="370" y="290" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--danger)">同步机制四大家族</text>
          <line x1="50" y1="300" x2="690" y2="300" stroke="var(--danger)" strokeWidth="0.6" strokeOpacity="0.3" />

          <rect x="50" y="310" width="150" height="76" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="125" y="328" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">互斥量 Mutex</text>
          <text x="125" y="344" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">跨进程，可递归</text>
          <text x="125" y="358" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">拥有者概念</text>
          <text x="125" y="372" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">CreateMutex</text>
          <text x="125" y="382" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">ReleaseMutex</text>

          <rect x="215" y="310" width="150" height="76" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="290" y="328" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">信号量 Semaphore</text>
          <text x="290" y="344" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">计数器，N 个许可</text>
          <text x="290" y="358" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">资源池控制</text>
          <text x="290" y="372" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">CreateSemaphore</text>
          <text x="290" y="382" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">WaitForSingleObject</text>

          <rect x="380" y="310" width="150" height="76" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="455" y="328" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">事件 Event</text>
          <text x="455" y="344" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">手动/自动重置</text>
          <text x="455" y="358" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">通知/等待</text>
          <text x="455" y="372" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">CreateEvent</text>
          <text x="455" y="382" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">SetEvent / ResetEvent</text>

          <rect x="545" y="310" width="135" height="76" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="612" y="328" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">临界区 CRITICAL_SECTION</text>
          <text x="612" y="344" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">进程内，轻量</text>
          <text x="612" y="358" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">用户态自旋</text>
          <text x="612" y="372" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">InitializeCriticalSection</text>
          <text x="612" y="382" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">EnterCriticalSection</text>

          <text x={VIEW_W / 2} y="422" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            进程是资源容器，线程是 CPU 调度实体；一个进程至少有一个主线程
          </text>
          <text x={VIEW_W / 2} y="442" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：内核对象 + 等待函数（WaitFor*）= Windows 同步基石
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Windows 进程与线程模型——进程资源容器、线程执行单元与四大同步机制
      </figcaption>
    </figure>
  );
}
