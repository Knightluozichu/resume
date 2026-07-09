"use client";

export function IsnPerformanceTuningDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="性能调优：网络优化与监控">
      <defs>
        <linearGradient id="isn-pt-tcp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="isn-pt-zero" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="isn-pt-pool" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="isn-pt-mon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="isn-pt-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">性能调优：网络优化与监控</text>

      {/* 性能瓶颈定位 */}
      <rect x="30" y="45" width="740" height="80" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="68" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">性能瓶颈定位与优化三原则</text>
      <text x="400" y="90" textAnchor="middle" fontSize="11" fill="#475569">CPU(CPU100%) · 内存(GC/OOM) · 网络(带宽满) · 连接(TIME_WAIT) · IO(磁盘等待)</text>
      <text x="400" y="110" textAnchor="middle" fontSize="10" fill="#ef4444">原则: ①先测量再优化 ②优化瓶颈点 ③一次只改一个变量</text>

      {/* TCP参数调优 */}
      <rect x="30" y="140" width="370" height="130" rx="10" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
      <text x="215" y="165" textAnchor="middle" fontSize="13" fontWeight="700" fill="#2563eb">TCP参数调优</text>
      <text x="50" y="190" textAnchor="start" fontSize="10" fill="#475569" fontFamily="monospace">tcp_tw_reuse=1 → 复用TIME_WAIT</text>
      <text x="50" y="208" textAnchor="start" fontSize="10" fill="#475569" fontFamily="monospace">tcp_keepalive_time=600 → 保活探测</text>
      <text x="50" y="226" textAnchor="start" fontSize="10" fill="#475569" fontFamily="monospace">tcp_rmem/wmem → 缓冲区大小</text>
      <text x="50" y="244" textAnchor="start" fontSize="10" fill="#475569" fontFamily="monospace">tcp_max_syn_backlog → SYN队列</text>
      <text x="50" y="262" textAnchor="start" fontSize="10" fill="#ef4444">注意: tcp_tw_recycle已废弃(NAT丢包)</text>

      {/* 零拷贝 */}
      <rect x="400" y="140" width="370" height="130" rx="10" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1.5" />
      <text x="585" y="165" textAnchor="middle" fontSize="13" fontWeight="700" fill="#059669">零拷贝技术</text>
      <text x="420" y="190" textAnchor="start" fontSize="11" fill="#ef4444">传统read+write: 4次拷贝 + 4次切换</text>
      <text x="420" y="208" textAnchor="start" fontSize="11" fill="#475569">  磁盘→内核→用户→Socket→网卡</text>
      <text x="420" y="228" textAnchor="start" fontSize="11" fill="#059669">sendfile: 2次拷贝 + 2次切换</text>
      <text x="420" y="246" textAnchor="start" fontSize="11" fill="#059669">  磁盘→内核缓冲区→网卡(DMA直传)</text>
      <text x="420" y="262" textAnchor="start" fontSize="10" fill="#64748b">Nginx默认开启sendfile处理静态文件</text>

      {/* 连接池 */}
      <rect x="30" y="285" width="370" height="120" rx="10" fill="#fffbeb" stroke="#fde68a" strokeWidth="1.5" />
      <text x="215" y="310" textAnchor="middle" fontSize="13" fontWeight="700" fill="#d97706">连接池复用</text>
      <text x="215" y="335" textAnchor="middle" fontSize="11" fill="#475569">无池: 每次建连接(握手)+断开(挥手)</text>
      <text x="215" y="355" textAnchor="middle" fontSize="11" fill="#059669">有池: 取连接→用→归还(不断开)</text>
      <text x="50" y="380" textAnchor="start" fontSize="10" fill="#64748b">参数: 最小空闲/最大连接/空闲超时/连接超时</text>
      <text x="50" y="395" textAnchor="start" fontSize="10" fill="#64748b">HikariCP/OkHttp/Redis连接池</text>

      {/* 全链路追踪 */}
      <rect x="400" y="285" width="370" height="120" rx="10" fill="#f5f3ff" stroke="#ddd6fe" strokeWidth="1.5" />
      <text x="585" y="310" textAnchor="middle" fontSize="13" fontWeight="700" fill="#6d28d9">全链路追踪</text>
      <text x="420" y="335" textAnchor="start" fontSize="11" fill="#475569">TraceID关联整个调用链</text>
      <text x="420" y="355" textAnchor="start" fontSize="11" fill="#475569">每个服务节点记录Span(耗时/状态)</text>
      <text x="420" y="375" textAnchor="start" fontSize="10" fill="#64748b">指标: Prometheus+Grafana → "有问题"</text>
      <text x="420" y="390" textAnchor="start" fontSize="10" fill="#64748b">追踪: Jaeger/Zipkin → "在哪"</text>
      <text x="420" y="405" textAnchor="start" fontSize="10" fill="#64748b">日志: ELK/Loki → "为什么"</text>

      {/* 性能优化链路 */}
      <rect x="30" y="420" width="740" height="140" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="400" y="445" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">性能优化演进链路</text>

      <rect x="50" y="460" width="100" height="40" rx="6" fill="url(#isn-pt-tcp)" opacity="0.9" />
      <text x="100" y="485" textAnchor="middle" fontSize="10" fill="#fff">短连接</text>
      <path d="M150 480 L170 480" stroke="#64748b" strokeWidth="2" markerEnd="url(#isn-pt-arrow)" />

      <rect x="170" y="460" width="100" height="40" rx="6" fill="url(#isn-pt-tcp)" opacity="0.9" />
      <text x="220" y="485" textAnchor="middle" fontSize="10" fill="#fff">长连接</text>
      <path d="M270 480 L290 480" stroke="#64748b" strokeWidth="2" markerEnd="url(#isn-pt-arrow)" />

      <rect x="290" y="460" width="100" height="40" rx="6" fill="url(#isn-pt-pool)" opacity="0.9" />
      <text x="340" y="485" textAnchor="middle" fontSize="10" fill="#fff">连接池</text>
      <path d="M390 480 L410 480" stroke="#64748b" strokeWidth="2" markerEnd="url(#isn-pt-arrow)" />

      <rect x="410" y="460" width="100" height="40" rx="6" fill="url(#isn-pt-zero)" opacity="0.9" />
      <text x="460" y="485" textAnchor="middle" fontSize="10" fill="#fff">零拷贝</text>
      <path d="M510 480 L530 480" stroke="#64748b" strokeWidth="2" markerEnd="url(#isn-pt-arrow)" />

      <rect x="530" y="460" width="100" height="40" rx="6" fill="url(#isn-pt-mon)" opacity="0.9" />
      <text x="580" y="485" textAnchor="middle" fontSize="10" fill="#fff">多路复用</text>
      <path d="M630 480 L650 480" stroke="#64748b" strokeWidth="2" markerEnd="url(#isn-pt-arrow)" />

      <rect x="650" y="460" width="100" height="40" rx="6" fill="url(#isn-pt-mon)" opacity="0.9" />
      <text x="700" y="485" textAnchor="middle" fontSize="10" fill="#fff">全链路监控</text>

      <text x="400" y="525" textAnchor="middle" fontSize="11" fill="#475569">迭代过程: 测量 → 定位瓶颈 → 优化 → 验证 → 重复</text>
      <text x="400" y="548" textAnchor="middle" fontSize="10" fill="#64748b">可观测性三支柱: 指标监控(有啥问题) + 链路追踪(在哪) + 日志聚合(为什么)</text>
    </svg>
  );
}
