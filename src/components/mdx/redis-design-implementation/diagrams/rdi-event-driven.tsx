"use client";

export function RdiEventDrivenDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="Redis事件驱动模型">
      <defs>
        <linearGradient id="rdi-ev-grad1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="rdi-ev-grad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="rdi-ev-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Redis 事件驱动模型</text>

      {/* 文件事件 */}
      <rect x="20" y="50" width="370" height="210" rx="12" fill="url(#rdi-ev-grad1)" opacity="0.95" />
      <text x="205" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">文件事件（File Event）</text>
      <line x1="40" y1="85" x2="370" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="205" y="108" textAnchor="middle" fontSize="11" fill="#d1fae5">I/O 多路复用监听套接字</text>
      <text x="205" y="128" textAnchor="middle" fontSize="11" fill="#a7f3d0">AE_READABLE / AE_WRITABLE</text>
      <text x="205" y="150" textAnchor="middle" fontSize="10" fill="#6ee7b7">epoll(Linux) / kqueue(BSD) / select</text>
      <text x="205" y="170" textAnchor="middle" fontSize="10" fill="#6ee7b7">事件分派器 → 事件处理器</text>
      <text x="205" y="195" textAnchor="middle" fontSize="10" fill="#a7f3d0">连接应答处理器 (acceptTcpHandler)</text>
      <text x="205" y="213" textAnchor="middle" fontSize="10" fill="#a7f3d0">命令请求处理器 (readQueryFromClient)</text>
      <text x="205" y="231" textAnchor="middle" fontSize="10" fill="#a7f3d0">命令回复处理器 (sendReplyToClient)</text>
      <text x="205" y="252" textAnchor="middle" fontSize="9" fill="#d1fae5">单线程反应堆（Reactor）模式</text>

      {/* 时间事件 */}
      <rect x="410" y="50" width="370" height="210" rx="12" fill="url(#rdi-ev-grad2)" opacity="0.95" />
      <text x="595" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">时间事件（Time Event）</text>
      <line x1="430" y1="85" x2="760" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="595" y="108" textAnchor="middle" fontSize="11" fill="#fef3c7">定时任务：when + timeProc 回调</text>
      <text x="595" y="128" textAnchor="middle" fontSize="11" fill="#fde68a">单链表 / 无序链表组织</text>
      <text x="595" y="150" textAnchor="middle" fontSize="10" fill="#fcd34d">serverCron 每秒执行 Hz 次</text>
      <text x="595" y="170" textAnchor="middle" fontSize="10" fill="#fcd34d">更新统计 / 过期清理 / 持久化</text>
      <text x="595" y="195" textAnchor="middle" fontSize="10" fill="#fde68a">复制健康检查 / 集群心跳</text>
      <text x="595" y="213" textAnchor="middle" fontSize="10" fill="#fde68a">哨兵故障检测 / 关闭异步客户端</text>
      <text x="595" y="231" textAnchor="middle" fontSize="10" fill="#fde68a">ResizeHT / BGSAVE 触发</text>
      <text x="595" y="252" textAnchor="middle" fontSize="9" fill="#fef3c7">返回 AE_NOMORE 则不再触发</text>

      {/* 事件循环 */}
      <text x="400" y="285" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">事件循环调度（aeProcessEvents）</text>

      <rect x="20" y="300" width="760" height="130" rx="10" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <rect x="50" y="315" width="140" height="50" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
      <text x="120" y="345" textAnchor="middle" fontSize="11" fontWeight="700" fill="#059669">① 计算最近时间事件</text>

      <path d="M190 340 L225 340" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#rdi-ev-arrow)" />

      <rect x="235" y="315" width="150" height="50" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="310" y="345" textAnchor="middle" fontSize="11" fontWeight="700" fill="#d97706">② 阻塞等待 I/O</text>

      <path d="M385 340 L420 340" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#rdi-ev-arrow)" />

      <rect x="430" y="315" width="150" height="50" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
      <text x="505" y="345" textAnchor="middle" fontSize="11" fontWeight="700" fill="#059669">③ 处理文件事件</text>

      <path d="M580 340 L615 340" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#rdi-ev-arrow)" />

      <rect x="625" y="315" width="130" height="50" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="690" y="345" textAnchor="middle" fontSize="11" fontWeight="700" fill="#d97706">④ 处理时间事件</text>

      <text x="400" y="395" textAnchor="middle" fontSize="11" fill="#475569">阻塞时间 = max(0, 最近时间事件到达时间 - 当前时间)</text>
      <text x="400" y="415" textAnchor="middle" fontSize="10" fill="#64748b">优先处理已就绪的文件事件，再处理到期的时间事件 → 循环往复</text>

      {/* 关键特性 */}
      <rect x="20" y="445" width="240" height="120" rx="10" fill="#fee2e2" stroke="#dc382d" strokeWidth="1.5" />
      <text x="140" y="470" textAnchor="middle" fontSize="12" fontWeight="700" fill="#b91c1c">单线程模型</text>
      <text x="140" y="492" textAnchor="middle" fontSize="10" fill="#991b1b">命令执行单线程</text>
      <text x="140" y="512" textAnchor="middle" fontSize="10" fill="#991b1b">无锁 · 无竞态</text>
      <text x="140" y="532" textAnchor="middle" fontSize="10" fill="#991b1b">I/O 多路复用并发</text>
      <text x="140" y="552" textAnchor="middle" fontSize="9" fill="#dc382d">避免上下文切换开销</text>

      <rect x="280" y="445" width="240" height="120" rx="10" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="400" y="470" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490">性能关键</text>
      <text x="400" y="492" textAnchor="middle" fontSize="10" fill="#155e75">纯内存操作（微秒级）</text>
      <text x="400" y="512" textAnchor="middle" fontSize="10" fill="#155e75">高效数据结构</text>
      <text x="400" y="532" textAnchor="middle" fontSize="10" fill="#155e75">epoll O(1) 就绪通知</text>
      <text x="400" y="552" textAnchor="middle" fontSize="9" fill="#0891b2">单核也能 10万+ QPS</text>

      <rect x="540" y="445" width="240" height="120" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="660" y="470" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6d28d9">注意</text>
      <text x="660" y="492" textAnchor="middle" fontSize="10" fill="#5b21b6">禁止 KEYS / SORT 大数据</text>
      <text x="660" y="512" textAnchor="middle" fontSize="10" fill="#5b21b6">单条命令阻塞全部客户端</text>
      <text x="660" y="532" textAnchor="middle" fontSize="10" fill="#5b21b6">4.0+ 后台任务用子进程</text>
      <text x="660" y="552" textAnchor="middle" fontSize="9" fill="#8b5cf6">6.0+ I/O 多线程（可选）</text>
    </svg>
  );
}
