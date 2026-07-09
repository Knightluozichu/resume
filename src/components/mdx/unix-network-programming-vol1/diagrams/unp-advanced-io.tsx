"use client";

export function UnpAdvancedIoDiagram() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="高级I/O与信号驱动">
      <defs>
        <linearGradient id="unp-aio-recv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="unp-aio-sig" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="unp-aio-scatter" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <marker id="unp-aio-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">高级 I/O 与信号驱动编程</text>

      {/* scatter-gather I/O */}
      <rect x="40" y="50" width="720" height="160" rx="10" fill="url(#unp-aio-scatter)" opacity="0.08" stroke="#0891b2" strokeWidth="1.5" />
      <text x="400" y="73" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0e7490">Scatter-Gather I/O（分散-聚集读写）</text>

      <text x="60" y="96" fontSize="12" fontWeight="600" fill="#0e7490">readv(fd, iov, iovcnt)</text>
      <text x="60" y="114" fontSize="10" fill="#475569">一次系统调用将数据分散读到多个缓冲区</text>

      <rect x="60" y="125" width="60" height="25" rx="4" fill="url(#unp-aio-scatter)" opacity="0.2" />
      <text x="90" y="142" textAnchor="middle" fontSize="9" fill="#0e7490">iov[0]</text>
      <rect x="130" y="125" width="60" height="25" rx="4" fill="url(#unp-aio-scatter)" opacity="0.2" />
      <text x="160" y="142" textAnchor="middle" fontSize="9" fill="#0e7490">iov[1]</text>
      <rect x="200" y="125" width="60" height="25" rx="4" fill="url(#unp-aio-scatter)" opacity="0.2" />
      <text x="230" y="142" textAnchor="middle" fontSize="9" fill="#0e7490">iov[2]</text>

      <path d="M280 137 L320 137" stroke="#0e7490" strokeWidth="2" markerEnd="url(#unp-aio-arrow)" />
      <text x="300" y="130" textAnchor="middle" fontSize="9" fill="#0e7490">readv</text>

      <rect x="320" y="125" width="200" height="25" rx="4" fill="url(#unp-aio-scatter)" opacity="0.15" />
      <text x="420" y="142" textAnchor="middle" fontSize="10" fill="#0e7490">内核缓冲区 → 一次拷贝分散到 iov[0..2]</text>

      <text x="60" y="172" fontSize="12" fontWeight="600" fill="#0e7490">writev(fd, iov, iovcnt)</text>
      <text x="60" y="190" fontSize="10" fill="#475569">一次系统调用将多个缓冲区数据聚集写入</text>
      <text x="550" y="190" fontSize="10" fill="#94a3b8">优势：减少系统调用次数</text>

      {/* 信号驱动 I/O */}
      <rect x="40" y="225" width="340" height="150" rx="10" fill="url(#unp-aio-sig)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="60" y="248" fontSize="13" fontWeight="700" fill="#5b21b6">信号驱动 I/O（SIGIO）</text>

      <rect x="60" y="260" width="300" height="28" rx="6" fill="url(#unp-aio-sig)" opacity="0.15" />
      <text x="210" y="279" textAnchor="middle" fontSize="10" fill="#5b21b6">1. fcntl(O_ASYNC) + fcntl(O_SETOWN)</text>

      <path d="M210 288 L210 298" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-aio-arrow)" />

      <rect x="60" y="300" width="300" height="28" rx="6" fill="url(#unp-aio-sig)" opacity="0.15" />
      <text x="210" y="319" textAnchor="middle" fontSize="10" fill="#5b21b6">2. sigaction(SIGIO, handler)</text>

      <path d="M210 328 L210 338" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-aio-arrow)" />

      <rect x="60" y="340" width="300" height="28" rx="6" fill="url(#unp-aio-sig)" opacity="0.15" />
      <text x="210" y="359" textAnchor="middle" fontSize="10" fill="#5b21b6">3. 数据就绪 → 内核发 SIGIO → handler</text>

      {/* recvmsg / sendmsg */}
      <rect x="420" y="225" width="340" height="150" rx="10" fill="url(#unp-aio-recv)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="440" y="248" fontSize="13" fontWeight="700" fill="#1e40af">recvmsg / sendmsg（全能函数）</text>

      <text x="440" y="270" fontSize="10" fill="#475569">msghdr 结构包含：</text>
      <text x="445" y="287" fontSize="10" fill="#475569" fontFamily="monospace">msg_name    → 对端地址</text>
      <text x="445" y="303" fontSize="10" fill="#475569" fontFamily="monospace">msg_iov     → 数据缓冲区数组</text>
      <text x="445" y="319" fontSize="10" fill="#475569" fontFamily="monospace">msg_control → 辅助数据（fd传递）</text>
      <text x="445" y="335" fontSize="10" fill="#475569" fontFamily="monospace">msg_flags   → 操作标志</text>
      <text x="440" y="358" fontSize="10" fill="#1e40af">支持 scatter-gather + 辅助数据</text>

      {/* 辅助数据传递 fd */}
      <rect x="40" y="390" width="720" height="130" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="413" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">Unix 域套接字传递文件描述符（SCM_RIGHTS）</text>

      <rect x="60" y="425" width="300" height="36" rx="8" fill="url(#unp-aio-recv)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="210" y="448" textAnchor="middle" fontSize="11" fill="#1e40af">发送端：sendmsg + SCM_RIGHTS</text>

      <path d="M360 443 L440 443" stroke="#64748b" strokeWidth="2" markerEnd="url(#unp-aio-arrow)" />
      <text x="400" y="436" textAnchor="middle" fontSize="9" fill="#64748b">内核传递 fd</text>

      <rect x="440" y="425" width="300" height="36" rx="8" fill="url(#unp-aio-sig)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="590" y="448" textAnchor="middle" fontSize="11" fill="#5b21b6">接收端：recvmsg 取出 fd</text>

      <text x="60" y="485" fontSize="10" fill="#475569">发送进程将一个打开的 fd 放入辅助数据，内核在接收进程中创建新的 fd 指向同一文件表项</text>
      <text x="60" y="505" fontSize="10" fill="#94a3b8">用途：权限传递、服务进程委托、Unix 域套接字连接复用</text>
    </svg>
  );
}
