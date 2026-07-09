"use client";

export function RdiPersistenceDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="Redis持久化RDB与AOF">
      <defs>
        <linearGradient id="rdi-per-rdb" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="rdi-per-aof" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc382d" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="rdi-per-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Redis 持久化 · RDB vs AOF</text>

      {/* RDB */}
      <rect x="20" y="50" width="370" height="250" rx="12" fill="url(#rdi-per-rdb)" opacity="0.95" />
      <text x="205" y="75" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">RDB 快照持久化</text>
      <line x1="40" y1="85" x2="370" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="205" y="108" textAnchor="middle" fontSize="11" fill="#fef3c7">原理：内存数据快照 → 二进制 .rdb 文件</text>
      <text x="205" y="130" textAnchor="middle" fontSize="11" fill="#fde68a">SAVE（阻塞）/ BGSAVE（fork 子进程）</text>
      <text x="205" y="152" textAnchor="middle" fontSize="11" fill="#fde68a">自动触发：save 900 1 / save 300 10</text>
      <text x="205" y="174" textAnchor="middle" fontSize="10" fill="#fcd34d">COW（Copy-On-Write）写时复制</text>
      <text x="205" y="194" textAnchor="middle" fontSize="10" fill="#fcd34d">载入时阻塞，优先级 &gt; AOF</text>
      <text x="205" y="216" textAnchor="middle" fontSize="10" fill="#fef3c7">优点：体积小 · 恢复快 · 适合备份</text>
      <text x="205" y="236" textAnchor="middle" fontSize="10" fill="#fef3c7">缺点：定时快照 · 可能丢数据</text>
      <text x="205" y="260" textAnchor="middle" fontSize="9" fill="#fde68a">struct saveparam { time_t seconds; int changes; }</text>
      <text x="205" y="280" textAnchor="middle" fontSize="9" fill="#fde68a">dirty 计数器 + lastsave 时间戳</text>

      {/* AOF */}
      <rect x="410" y="50" width="370" height="250" rx="12" fill="url(#rdi-per-aof)" opacity="0.95" />
      <text x="595" y="75" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">AOF 追加持久化</text>
      <line x1="430" y1="85" x2="760" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="595" y="108" textAnchor="middle" fontSize="11" fill="#fecaca">原理：写命令追加到 .aof 文件</text>
      <text x="595" y="130" textAnchor="middle" fontSize="11" fill="#fca5a5">命令追加 → 写入 → 同步(fsync)</text>
      <text x="595" y="152" textAnchor="middle" fontSize="11" fill="#fca5a5">always / everysec / no 三种策略</text>
      <text x="595" y="174" textAnchor="middle" fontSize="10" fill="#fda4a4">AOF 重写：BGREWRITEAOF</text>
      <text x="595" y="194" textAnchor="middle" fontSize="10" fill="#fda4a4">原理：遍历数据库生成最简命令</text>
      <text x="595" y="216" textAnchor="middle" fontSize="10" fill="#fecaca">优点：丢数据少(≤1s) · 可读 · 可修复</text>
      <text x="595" y="236" textAnchor="middle" fontSize="10" fill="#fecaca">缺点：体积大 · 恢复慢 · fsync 开销</text>
      <text x="595" y="260" textAnchor="middle" fontSize="9" fill="#fca5a5">aof_buf → aof_fd → 磁盘</text>
      <text x="595" y="280" textAnchor="middle" fontSize="9" fill="#fca5a5">重写期间新命令 → aof_rewrite_buf</text>

      {/* AOF 重写流程 */}
      <text x="400" y="325" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">AOF 重写流程</text>

      <rect x="20" y="340" width="760" height="90" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="60" y="365" fontSize="11" fill="#475569">① fork 子进程</text>
      <path d="M150 360 L185 360" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#rdi-per-arrow)" />
      <text x="225" y="365" fontSize="11" fill="#475569">② 遍历数据库生成命令</text>
      <path d="M360 360 L395 360" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#rdi-per-arrow)" />
      <text x="450" y="365" fontSize="11" fill="#475569">③ 写入临时 AOF 文件</text>
      <path d="M580 360 L615 360" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#rdi-per-arrow)" />
      <text x="660" y="365" fontSize="11" fill="#475569">④ 原子改名替换</text>
      <text x="400" y="395" textAnchor="middle" fontSize="10" fill="#64748b">同时：父进程继续处理命令 → 写入 aof_rewrite_buf 缓冲区</text>
      <text x="400" y="415" textAnchor="middle" fontSize="10" fill="#64748b">子进程完成后 → 父进程追加缓冲区内容 → 写入完成</text>

      {/* 对比表 */}
      <rect x="20" y="445" width="760" height="120" rx="10" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
      <text x="400" y="468" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">RDB vs AOF 对比</text>
      <text x="140" y="492" textAnchor="middle" fontSize="11" fontWeight="700" fill="#d97706">RDB</text>
      <text x="140" y="512" textAnchor="middle" fontSize="10" fill="#475569">二进制快照 · 体积小 · 恢复快</text>
      <text x="140" y="532" textAnchor="middle" fontSize="10" fill="#475569">数据安全性低 · 适合冷备</text>
      <text x="140" y="552" textAnchor="middle" fontSize="10" fill="#475569">fork 开销（大内存慢）</text>
      <text x="400" y="492" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b91c1c">AOF</text>
      <text x="400" y="512" textAnchor="middle" fontSize="10" fill="#475569">文本命令 · 体积大 · 恢复慢</text>
      <text x="400" y="532" textAnchor="middle" fontSize="10" fill="#475569">数据安全性高 · 适合热备</text>
      <text x="400" y="552" textAnchor="middle" fontSize="10" fill="#475569">fsync 开销 · 需重写压缩</text>
      <text x="640" y="492" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6d28d9">混合持久化(4.0+)</text>
      <text x="640" y="512" textAnchor="middle" fontSize="10" fill="#475569">AOF 前半 RDB + 后半增量命令</text>
      <text x="640" y="532" textAnchor="middle" fontSize="10" fill="#475569">兼顾恢复速度和数据安全</text>
      <text x="640" y="552" textAnchor="middle" fontSize="10" fill="#475569">aof-use-rdb-preamble yes</text>
    </svg>
  );
}
