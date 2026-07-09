"use client";

export function UnpDaemonIpcDiagram() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="守护进程与IPC机制">
      <defs>
        <linearGradient id="unp-dipc-daemon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="unp-dipc-ipc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="unp-dipc-proc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="unp-dipc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">守护进程与 IPC 进程间通信</text>

      {/* 守护进程化步骤 */}
      <rect x="40" y="50" width="720" height="130" rx="10" fill="url(#unp-dipc-daemon)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="400" y="73" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">守护进程化（daemon_init）七步</text>

      <rect x="60" y="85" width="90" height="30" rx="6" fill="url(#unp-dipc-daemon)" opacity="0.15" />
      <text x="105" y="104" textAnchor="middle" fontSize="10" fill="#1e40af">1. fork()</text>

      <path d="M150 100 L165 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-dipc-arrow)" />

      <rect x="165" y="85" width="90" height="30" rx="6" fill="url(#unp-dipc-daemon)" opacity="0.15" />
      <text x="210" y="104" textAnchor="middle" fontSize="10" fill="#1e40af">2. setsid()</text>

      <path d="M255 100 L270 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-dipc-arrow)" />

      <rect x="270" y="85" width="90" height="30" rx="6" fill="url(#unp-dipc-daemon)" opacity="0.15" />
      <text x="315" y="104" textAnchor="middle" fontSize="10" fill="#1e40af">3. fork() 再</text>

      <path d="M360 100 L375 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-dipc-arrow)" />

      <rect x="375" y="85" width="90" height="30" rx="6" fill="url(#unp-dipc-daemon)" opacity="0.15" />
      <text x="420" y="104" textAnchor="middle" fontSize="10" fill="#1e40af">4. chdir(/)</text>

      <path d="M465 100 L480 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-dipc-arrow)" />

      <rect x="480" y="85" width="90" height="30" rx="6" fill="url(#unp-dipc-daemon)" opacity="0.15" />
      <text x="525" y="104" textAnchor="middle" fontSize="10" fill="#1e40af">5. umask(0)</text>

      <path d="M570 100 L585 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-dipc-arrow)" />

      <rect x="585" y="85" width="90" height="30" rx="6" fill="url(#unp-dipc-daemon)" opacity="0.15" />
      <text x="630" y="104" textAnchor="middle" fontSize="10" fill="#1e40af">6. close(fd)</text>

      <path d="M675 100 L680 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-dipc-arrow)" />

      <text x="60" y="135" fontSize="10" fill="#475569">7. open dev/null → stdin/stdout/stderr</text>
      <text x="60" y="155" fontSize="10" fill="#94a3b8">目标：脱离终端、成为会话组长、关闭所有终端 fd、重定向标准 I/O 到 /dev/null</text>

      {/* IPC 四大机制 */}
      <text x="400" y="210" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">四种 IPC 机制对比</text>

      <rect x="40" y="225" width="340" height="130" rx="10" fill="url(#unp-dipc-ipc)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="60" y="248" fontSize="12" fontWeight="700" fill="#5b21b6">管道（Pipe）与 FIFO</text>
      <text x="60" y="268" fontSize="10" fill="#475569">管道：父子进程间单向字节流</text>
      <text x="60" y="284" fontSize="10" fill="#475569">FIFO：命名管道，任意进程可用</text>
      <text x="60" y="300" fontSize="10" fill="#475569" fontFamily="monospace">pipe(fd[2]) / mkfifo(path)</text>
      <text x="60" y="320" fontSize="10" fill="#475569">特点：半双工、字节流、自带同步</text>
      <text x="60" y="340" fontSize="9" fill="#94a3b8">read 空管道阻塞；write 断端 SIGPIPE</text>

      <rect x="420" y="225" width="340" height="130" rx="10" fill="url(#unp-dipc-ipc)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="440" y="248" fontSize="12" fontWeight="700" fill="#5b21b6">消息队列与信号</text>
      <text x="440" y="268" fontSize="10" fill="#475569">消息队列：Posix / System V</text>
      <text x="440" y="284" fontSize="10" fill="#475569">信号：异步通知（kill / sigaction）</text>
      <text x="440" y="300" fontSize="10" fill="#475569" fontFamily="monospace">mq_open / kill / sigaction</text>
      <text x="440" y="320" fontSize="10" fill="#475569">特点：消息有边界、信号可携带信息</text>
      <text x="440" y="340" fontSize="9" fill="#94a3b8">SIGCHLD / SIGINT / SIGTERM 常用</text>

      <rect x="40" y="365" width="340" height="130" rx="10" fill="url(#unp-dipc-proc)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="60" y="388" fontSize="12" fontWeight="700" fill="#065f46">共享内存与信号量</text>
      <text x="60" y="408" fontSize="10" fill="#475569">共享内存：最快 IPC（零拷贝）</text>
      <text x="60" y="424" fontSize="10" fill="#475569">信号量：同步共享内存访问</text>
      <text x="60" y="440" fontSize="10" fill="#475569" fontFamily="monospace">shm_open / sem_open / mmap</text>
      <text x="60" y="460" fontSize="10" fill="#475569">特点：需信号量保护、最高性能</text>
      <text x="60" y="480" fontSize="9" fill="#94a3b8">PV 操作：wait(P) / post(V)</text>

      <rect x="420" y="365" width="340" height="130" rx="10" fill="url(#unp-dipc-proc)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="440" y="388" fontSize="12" fontWeight="700" fill="#065f46">Unix 域套接字</text>
      <text x="440" y="408" fontSize="10" fill="#475569">本地进程间双向通信</text>
      <text x="440" y="424" fontSize="10" fill="#475569">地址：文件系统路径名</text>
      <text x="440" y="440" fontSize="10" fill="#475569" fontFamily="monospace">socket(AF_LOCAL, ...)</text>
      <text x="440" y="460" fontSize="10" fill="#475569">特点：全双工、可靠、可传 fd</text>
      <text x="440" y="480" fontSize="9" fill="#94a3b8">SCM_RIGHTS：通过辅助数据传递 fd</text>
    </svg>
  );
}
