"use client";

export function HpmOsTuningDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="操作系统与硬件调优">
      <defs>
        <linearGradient id="hpm-os-cpu" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e11d48" />
          <stop offset="100%" stopColor="#be123c" />
        </linearGradient>
        <linearGradient id="hpm-os-mem" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <marker id="hpm-os-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">OS 与硬件调优 · 资源视角</text>

      {/* CPU */}
      <rect x="40" y="55" width="175" height="150" rx="8" fill="url(#hpm-os-cpu)" />
      <text x="127" y="78" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">CPU</text>
      <text x="127" y="100" textAnchor="middle" fontSize="10" fill="#fecdd3">关注：利用率与负载</text>
      <text x="127" y="120" textAnchor="middle" fontSize="10" fill="#fecdd3">user% 高 = 计算密集</text>
      <text x="127" y="138" textAnchor="middle" fontSize="10" fill="#fecdd3">iowait% 高 = IO 瓶颈</text>
      <text x="127" y="156" textAnchor="middle" fontSize="10" fill="#fecdd3">多核 vs 高主频</text>
      <text x="127" y="174" textAnchor="middle" fontSize="10" fill="#fda4af">OLTP 多核更优</text>
      <text x="127" y="192" textAnchor="middle" fontSize="10" fill="#fda4af">CPU 亲和性绑核</text>

      {/* 内存 */}
      <rect x="230" y="55" width="175" height="150" rx="8" fill="url(#hpm-os-mem)" />
      <text x="317" y="78" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">内存 Memory</text>
      <text x="317" y="100" textAnchor="middle" fontSize="10" fill="#cffafe">关注：缓冲池命中率</text>
      <text x="317" y="120" textAnchor="middle" fontSize="10" fill="#cffafe">InnoDB Buffer Pool</text>
      <text x="317" y="138" textAnchor="middle" fontSize="10" fill="#cffafe">越大越好（物理内存70-80%）</text>
      <text x="317" y="156" textAnchor="middle" fontSize="10" fill="#a5f3fc">命中率应 &gt; 99%</text>
      <text x="317" y="174" textAnchor="middle" fontSize="10" fill="#67e8f9">避免 swap 交换</text>
      <text x="317" y="192" textAnchor="middle" fontSize="10" fill="#67e8f9">swappiness 调低</text>

      {/* 磁盘 */}
      <rect x="420" y="55" width="175" height="150" rx="8" fill="url(#hpm-os-cpu)" opacity="0.92" />
      <text x="507" y="78" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">磁盘 Disk</text>
      <text x="507" y="100" textAnchor="middle" fontSize="10" fill="#fecdd3">关注：IOPS 与延迟</text>
      <text x="507" y="120" textAnchor="middle" fontSize="10" fill="#fecdd3">机械盘：吞吐高延迟大</text>
      <text x="507" y="138" textAnchor="middle" fontSize="10" fill="#fecdd3">SSD：随机 IO 友好</text>
      <text x="507" y="156" textAnchor="middle" fontSize="10" fill="#fda4af">NVMe 数据库首选</text>
      <text x="507" y="174" textAnchor="middle" fontSize="10" fill="#fda4af">RAID10 写性能+冗余</text>
      <text x="507" y="192" textAnchor="middle" fontSize="10" fill="#fda4af">IO 调度器 deadline</text>

      {/* 网络 */}
      <rect x="610" y="55" width="150" height="150" rx="8" fill="url(#hpm-os-mem)" opacity="0.92" />
      <text x="685" y="78" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">网络 Network</text>
      <text x="685" y="100" textAnchor="middle" fontSize="10" fill="#cffafe">关注：带宽与延迟</text>
      <text x="685" y="120" textAnchor="middle" fontSize="10" fill="#cffafe">复制延迟受带宽影响</text>
      <text x="685" y="138" textAnchor="middle" fontSize="10" fill="#cffafe">TCP 缓冲区调优</text>
      <text x="685" y="156" textAnchor="middle" fontSize="10" fill="#a5f3fc">MTU / jumbo frame</text>
      <text x="685" y="174" textAnchor="middle" fontSize="10" fill="#67e8f9">连接复用/连接池</text>
      <text x="685" y="192" textAnchor="middle" fontSize="10" fill="#67e8f9">减少握手开销</text>

      {/* InnoDB 关键参数 */}
      <text x="400" y="230" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">InnoDB 关键参数</text>
      <rect x="40" y="242" width="720" height="120" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="60" y="265" fontSize="11" fontWeight="700" fill="#92400e">innodb_buffer_pool_size</text>
      <text x="280" y="265" fontSize="11" fill="#78350f">最大最重要参数，缓冲数据和索引，设为物理内存 70-80%</text>
      <text x="60" y="287" fontSize="11" fontWeight="700" fill="#92400e">innodb_log_file_size</text>
      <text x="280" y="287" fontSize="11" fill="#78350f">Redo log 大小，影响写入与崩溃恢复时间</text>
      <text x="60" y="309" fontSize="11" fontWeight="700" fill="#92400e">innodb_flush_log_at_trx_commit</text>
      <text x="280" y="309" fontSize="11" fill="#78350f">1 最安全；0/2 性能好但可能丢数据</text>
      <text x="60" y="331" fontSize="11" fontWeight="700" fill="#92400e">innodb_flush_method</text>
      <text x="280" y="331" fontSize="11" fill="#78350f">O_DIRECT 绕过 OS 缓冲，避免双缓冲</text>
      <text x="60" y="353" fontSize="11" fontWeight="700" fill="#92400e">sync_binlog</text>
      <text x="280" y="353" fontSize="11" fill="#78350f">1 每次提交刷盘最安全；0 交由 OS 性能好</text>

      {/* 调优原则 */}
      <rect x="40" y="375" width="350" height="165" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="215" y="398" textAnchor="middle" fontSize="13" fontWeight="700" fill="#dc2626">调优原则</text>
      <text x="60" y="420" fontSize="11" fill="#991b1b">① 先定位瓶颈再调优，不盲目改参数</text>
      <text x="60" y="440" fontSize="11" fill="#991b1b">② 一次只改一个参数，测量对比</text>
      <text x="60" y="460" fontSize="11" fill="#991b1b">③ 缓冲池命中率是最关键指标</text>
      <text x="60" y="480" fontSize="11" fill="#991b1b">④ 内存换性能，SSD 换 IO</text>
      <text x="60" y="500" fontSize="11" fill="#991b1b">⑤ 安全性与性能需权衡（刷盘策略）</text>
      <text x="60" y="524" fontSize="11" fill="#dc2626">默认配置通常保守，按负载定制</text>

      {/* 常见瓶颈 */}
      <rect x="410" y="375" width="350" height="165" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
      <text x="585" y="398" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">瓶颈定位速查</text>
      <text x="430" y="420" fontSize="11" fill="#475569">iowait 高 → 磁盘 IO 瓶颈</text>
      <text x="430" y="440" fontSize="11" fill="#475569">user% 高 + 慢 → 查询/索引问题</text>
      <text x="430" y="460" fontSize="11" fill="#475569">load 高 CPU 低 → IO 等待</text>
      <text x="430" y="480" fontSize="11" fill="#475569">内存 swap → 缓冲池不足</text>
      <text x="430" y="500" fontSize="11" fill="#475569">上下文切换高 → 线程过多</text>
      <text x="430" y="524" fontSize="11" fill="#0e7490">工具：top/iostat/vmstat/perf</text>
    </svg>
  );
}
