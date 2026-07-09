"use client";

export function UnpIoModelsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="I/O复用模型对比">
      <defs>
        <linearGradient id="unp-io-block" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="unp-io-sel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="unp-io-sig" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="unp-io-async" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="unp-io-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">五种 I/O 模型对比</text>

      {/* 阻塞I/O */}
      <rect x="40" y="55" width="340" height="80" rx="10" fill="url(#unp-io-block)" opacity="0.10" stroke="#dc2626" strokeWidth="1.5" />
      <text x="60" y="78" fontSize="13" fontWeight="700" fill="#b91c1c">1. 阻塞式 I/O（默认）</text>
      <text x="60" y="98" fontSize="11" fill="#475569">应用调用 recvfrom() → 阻塞等待</text>
      <text x="60" y="115" fontSize="11" fill="#475569">→ 数据就绪 → 内核拷贝 → 返回</text>
      <text x="60" y="130" fontSize="10" fill="#94a3b8">全程阻塞，无法同时处理其他连接</text>

      {/* 非阻塞I/O */}
      <rect x="420" y="55" width="340" height="80" rx="10" fill="url(#unp-io-block)" opacity="0.10" stroke="#dc2626" strokeWidth="1.5" />
      <text x="440" y="78" fontSize="13" fontWeight="700" fill="#b91c1c">2. 非阻塞式 I/O</text>
      <text x="440" y="98" fontSize="11" fill="#475569">recvfrom() → 立即返回 EWOULDBLOCK</text>
      <text x="440" y="115" fontSize="11" fill="#475569">→ 轮询检查 → 数据就绪 → 拷贝返回</text>
      <text x="440" y="130" fontSize="10" fill="#94a3b8">CPU 空转轮询，效率低</text>

      {/* I/O复用 */}
      <rect x="40" y="150" width="340" height="80" rx="10" fill="url(#unp-io-sel)" opacity="0.10" stroke="#2563eb" strokeWidth="1.5" />
      <text x="60" y="173" fontSize="13" fontWeight="700" fill="#1e40af">3. I/O 复用（select / poll）</text>
      <text x="60" y="193" fontSize="11" fill="#475569">select() 阻塞等待多个 fd → 就绪</text>
      <text x="60" y="210" fontSize="11" fill="#475569">→ recvfrom() 拷贝数据 → 返回</text>
      <text x="60" y="225" fontSize="10" fill="#94a3b8">单线程管理多连接，但有 fd 限制</text>

      {/* 信号驱动I/O */}
      <rect x="420" y="150" width="340" height="80" rx="10" fill="url(#unp-io-sig)" opacity="0.10" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="440" y="173" fontSize="13" fontWeight="700" fill="#5b21b6">4. 信号驱动式 I/O（SIGIO）</text>
      <text x="440" y="193" fontSize="11" fill="#475569">注册信号处理 → 主线程不阻塞</text>
      <text x="440" y="210" fontSize="11" fill="#475569">→ 内核就绪发 SIGIO → recvfrom()</text>
      <text x="440" y="225" fontSize="10" fill="#94a3b8">异步通知，但拷贝阶段仍阻塞</text>

      {/* 异步I/O */}
      <rect x="230" y="245" width="340" height="80" rx="10" fill="url(#unp-io-async)" opacity="0.10" stroke="#059669" strokeWidth="1.5" />
      <text x="250" y="268" fontSize="13" fontWeight="700" fill="#065f46">5. 异步 I/O（aio_read）</text>
      <text x="250" y="288" fontSize="11" fill="#475569">aio_read() 立即返回 → 内核完成全部</text>
      <text x="250" y="305" fontSize="11" fill="#475569">→ 数据拷贝到用户缓冲 → 信号通知</text>
      <text x="250" y="320" fontSize="10" fill="#94a3b8">真正的异步：等待和拷贝都不阻塞</text>

      {/* select vs poll vs epoll */}
      <rect x="40" y="350" width="720" height="190" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="375" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">select / poll / epoll 对比</text>

      <rect x="60" y="388" width="120" height="28" rx="6" fill="#e2e8f0" />
      <text x="120" y="407" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">特性</text>
      <rect x="180" y="388" width="180" height="28" rx="6" fill="url(#unp-io-sel)" opacity="0.15" />
      <text x="270" y="407" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">select</text>
      <rect x="360" y="388" width="180" height="28" rx="6" fill="url(#unp-io-sig)" opacity="0.15" />
      <text x="450" y="407" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">poll</text>
      <rect x="540" y="388" width="200" height="28" rx="6" fill="url(#unp-io-async)" opacity="0.15" />
      <text x="640" y="407" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">epoll</text>

      <text x="120" y="430" textAnchor="middle" fontSize="10" fill="#475569">fd 上限</text>
      <text x="270" y="430" textAnchor="middle" fontSize="10" fill="#1e40af">FD_SETSIZE(1024)</text>
      <text x="450" y="430" textAnchor="middle" fontSize="10" fill="#5b21b6">无限制</text>
      <text x="640" y="430" textAnchor="middle" fontSize="10" fill="#065f46">无限制</text>

      <text x="120" y="450" textAnchor="middle" fontSize="10" fill="#475569">fd 传递</text>
      <text x="270" y="450" textAnchor="middle" fontSize="10" fill="#1e40af">每次全量拷贝</text>
      <text x="450" y="450" textAnchor="middle" fontSize="10" fill="#5b21b6">每次全量拷贝</text>
      <text x="640" y="450" textAnchor="middle" fontSize="10" fill="#065f46">内核维护，无需拷贝</text>

      <text x="120" y="470" textAnchor="middle" fontSize="10" fill="#475569">就绪检测</text>
      <text x="270" y="470" textAnchor="middle" fontSize="10" fill="#1e40af">O(n) 遍历全部</text>
      <text x="450" y="470" textAnchor="middle" fontSize="10" fill="#5b21b6">O(n) 遍历全部</text>
      <text x="640" y="470" textAnchor="middle" fontSize="10" fill="#065f46">O(1) 回调直接返回</text>

      <text x="120" y="490" textAnchor="middle" fontSize="10" fill="#475569">触发方式</text>
      <text x="270" y="490" textAnchor="middle" fontSize="10" fill="#1e40af">水平触发（LT）</text>
      <text x="450" y="490" textAnchor="middle" fontSize="10" fill="#5b21b6">水平触发（LT）</text>
      <text x="640" y="490" textAnchor="middle" fontSize="10" fill="#065f46">LT + 边沿触发（ET）</text>

      <text x="120" y="510" textAnchor="middle" fontSize="10" fill="#475569">适用场景</text>
      <text x="270" y="510" textAnchor="middle" fontSize="10" fill="#1e40af">连接少、跨平台</text>
      <text x="450" y="510" textAnchor="middle" fontSize="10" fill="#5b21b6">连接中等</text>
      <text x="640" y="510" textAnchor="middle" fontSize="10" fill="#065f46">大量并发连接</text>
    </svg>
  );
}
