/**
 * <UapSignalsDiagram>：信号机制与处理流程图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function UapSignalsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="信号机制与处理流程图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            信号——产生到处理的完整生命周期
          </text>

          {/* 信号产生 */}
          <rect x="30" y="48" width="680" height="100" rx="10" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="68" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">信号产生（三种来源）</text>

          <rect x="50" y="80" width="200" height="56" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="150" y="98" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">硬件异常</text>
          <text x="150" y="114" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">除零 → SIGFPE</text>
          <text x="150" y="126" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">非法地址 → SIGSEGV</text>

          <rect x="270" y="80" width="200" height="56" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="370" y="98" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">软件条件</text>
          <text x="370" y="114" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">alarm超时 → SIGALRM</text>
          <text x="370" y="126" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">管道断裂 → SIGPIPE</text>

          <rect x="490" y="80" width="200" height="56" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="590" y="98" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">kill/sigqueue</text>
          <text x="590" y="114" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">kill(pid, signo)</text>
          <text x="590" y="126" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">raise(signo) 发给自己</text>

          <text x="370" y="162" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 内核处理 */}
          <rect x="30" y="170" width="680" height="120" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="190" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">内核：递送与pending</text>

          <rect x="50" y="202" width="200" height="76" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="150" y="220" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">pending 位图</text>
          <text x="150" y="236" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">信号标记为待处理</text>
          <text x="150" y="250" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">同类信号可排队</text>
          <text x="150" y="264" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">SIG_BLOCK/MASK 阻塞</text>

          <rect x="270" y="202" width="200" height="76" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="370" y="220" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">信号递送时机</text>
          <text x="370" y="236" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">从内核态返回用户态前</text>
          <text x="370" y="250" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">检查 pending &amp; ~mask</text>
          <text x="370" y="264" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">不可递送期间: SIGKILL/SIGSTOP</text>

          <rect x="490" y="202" width="200" height="76" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="590" y="220" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">sigaction 注册</text>
          <text x="590" y="236" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">sa_handler: 处理函数</text>
          <text x="590" y="250" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">sa_mask: 额外屏蔽集</text>
          <text x="590" y="264" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">SA_RESTART: 自动重启</text>

          <text x="370" y="304" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 三种处理方式 */}
          <rect x="30" y="312" width="680" height="100" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="332" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">三种处理方式</text>

          <rect x="50" y="344" width="200" height="56" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="150" y="362" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">默认动作（default）</text>
          <text x="150" y="378" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">SIGTERM → 终止</text>
          <text x="150" y="390" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">SIGCHLD → 忽略</text>

          <rect x="270" y="344" width="200" height="56" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="370" y="362" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">忽略（ignore）</text>
          <text x="370" y="378" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">SIG_IGN 忽略信号</text>
          <text x="370" y="390" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">SIGKILL/SIGSTOP 不可忽略</text>

          <rect x="490" y="344" width="200" height="56" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="590" y="362" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">捕获（catch）</text>
          <text x="590" y="378" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">注册 handler 执行自定义</text>
          <text x="590" y="390" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">SIGKILL/SIGSTOP 不可捕获</text>

          {/* 不可靠信号 vs 可靠信号 */}
          <rect x="30" y="424" width="330" height="58" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="444" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">不可靠信号（1-31）</text>
          <text x="50" y="462" fontSize="10" fill="var(--text-secondary)">不排队：多次发送可能只递送一次</text>
          <text x="50" y="476" fontSize="10" fill="var(--text-secondary)">信号可能丢失（低速系统调用被中断后）</text>

          <rect x="380" y="424" width="330" height="58" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="444" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">可靠信号（SIGRTMIN-SIGRTMAX）</text>
          <text x="400" y="462" fontSize="10" fill="var(--text-secondary)">排队：sigqueue 每次都递送</text>
          <text x="400" y="476" fontSize="10" fill="var(--text-secondary)">顺序：编号小的先递送，同级FIFO</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        信号机制：从产生（硬件/软件/kill）经内核pending/mask到三种处理（默认/忽略/捕获），不可靠信号可能丢失
      </figcaption>
    </figure>
  );
}
