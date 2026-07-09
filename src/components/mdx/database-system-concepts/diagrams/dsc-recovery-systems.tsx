"use client";

export function DscRecoverySystemsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="恢复系统与日志机制">
      <defs>
        <linearGradient id="dsc-rc-log" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>
        <linearGradient id="dsc-rc-ok" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <marker id="dsc-rc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">恢复系统 · 日志与检查点</text>

      {/* 故障分类 */}
      <text x="400" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#e11d48">故障分类</text>
      <rect x="40" y="70" width="230" height="60" rx="8" fill="#fee2e2" stroke="#f43f5e" />
      <text x="155" y="92" textAnchor="middle" fontSize="12" fontWeight="700" fill="#be123c">事务故障</text>
      <text x="155" y="111" textAnchor="middle" fontSize="10" fill="#9f1239">逻辑错误/死锁/中止</text>
      <text x="155" y="125" textAnchor="middle" fontSize="10" fill="#9f1239">回滚单事务（UNDO）</text>

      <rect x="285" y="70" width="230" height="60" rx="8" fill="#fecaca" stroke="#f43f5e" />
      <text x="400" y="92" textAnchor="middle" fontSize="12" fontWeight="700" fill="#be123c">系统故障</text>
      <text x="400" y="111" textAnchor="middle" fontSize="10" fill="#9f1239">掉电/操作系统崩溃</text>
      <text x="400" y="125" textAnchor="middle" fontSize="10" fill="#9f1239">重启重做已提交/回滚未提交</text>

      <rect x="530" y="70" width="230" height="60" rx="8" fill="#fda4af" stroke="#f43f5e" />
      <text x="645" y="92" textAnchor="middle" fontSize="12" fontWeight="700" fill="#be123c">介质故障</text>
      <text x="645" y="111" textAnchor="middle" fontSize="10" fill="#9f1239">磁盘损坏</text>
      <text x="645" y="125" textAnchor="middle" fontSize="10" fill="#9f1239">用备份+日志恢复</text>

      {/* 日志记录 */}
      <rect x="40" y="150" width="370" height="170" rx="10" fill="#fff1f2" stroke="#f43f5e" strokeWidth="1.5" />
      <text x="225" y="173" textAnchor="middle" fontSize="13" fontWeight="700" fill="#be123c">日志记录 Log Records</text>
      <text x="225" y="196" textAnchor="middle" fontSize="11" fill="#881337" fontFamily="monospace">&lt;T, start&gt;</text>
      <text x="225" y="216" textAnchor="middle" fontSize="10" fill="#9f1239">事务 T 开始</text>
      <text x="225" y="236" textAnchor="middle" fontSize="11" fill="#881337" fontFamily="monospace">&lt;T, X, old, new&gt;</text>
      <text x="225" y="256" textAnchor="middle" fontSize="10" fill="#9f1239">T 把 X 从 old 改成 new</text>
      <text x="225" y="276" textAnchor="middle" fontSize="11" fill="#881337" fontFamily="monospace">&lt;T, commit&gt; / &lt;T, abort&gt;</text>
      <text x="225" y="296" textAnchor="middle" fontSize="10" fill="#9f1239">T 提交/中止</text>
      <text x="225" y="314" textAnchor="middle" fontSize="10" fill="#be123c">先写日志 WAL：改数据前日志必须落盘</text>

      {/* REDO/UNDO */}
      <rect x="430" y="150" width="330" height="170" rx="10" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
      <text x="595" y="173" textAnchor="middle" fontSize="13" fontWeight="700" fill="#059669">UNDO / REDO 恢复策略</text>
      <text x="595" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill="#dc2626">UNDO（撤销）</text>
      <text x="595" y="218" textAnchor="middle" fontSize="11" fill="#991b1b">未提交事务的修改回滚到旧值</text>
      <text x="595" y="248" textAnchor="middle" fontSize="12" fontWeight="700" fill="#059669">REDO（重做）</text>
      <text x="595" y="268" textAnchor="middle" fontSize="11" fill="#047857">已提交事务的修改重做为新值</text>
      <text x="595" y="298" textAnchor="middle" fontSize="11" fill="#0e7490">日志含 old+new → UNDO+REDO 均可</text>
      <text x="595" y="314" textAnchor="middle" fontSize="10" fill="#64748b">保证原子性(UNDO)与持久性(REDO)</text>

      {/* 检查点时间线 */}
      <text x="400" y="348" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">检查点 Checkpoint 时间线</text>
      <line x1="60" y1="380" x2="740" y2="380" stroke="#64748b" strokeWidth="2" />
      <text x="50" y="384" textAnchor="end" fontSize="10" fill="#64748b">时间</text>

      <circle cx="120" cy="380" r="6" fill="#f43f5e" />
      <text x="120" y="402" textAnchor="middle" fontSize="10" fill="#be123c">T1 start</text>
      <circle cx="200" cy="380" r="7" fill="#0891b2" />
      <text x="200" y="402" textAnchor="middle" fontSize="10" fill="#0e7490">检查点</text>
      <text x="200" y="416" textAnchor="middle" fontSize="9" fill="#0e7490">刷缓冲+记活跃表</text>
      <circle cx="290" cy="380" r="6" fill="#10b981" />
      <text x="290" y="402" textAnchor="middle" fontSize="10" fill="#059669">T1 commit</text>
      <circle cx="400" cy="380" r="6" fill="#f43f5e" />
      <text x="400" y="402" textAnchor="middle" fontSize="10" fill="#be123c">T2 start</text>
      <circle cx="520" cy="380" r="6" fill="#ef4444" />
      <text x="520" y="402" textAnchor="middle" fontSize="10" fill="#dc2626">崩溃 Crash</text>

      <text x="400" y="436" textAnchor="middle" fontSize="11" fill="#475569">恢复时从检查点扫描日志：检查点前已提交无需 REDO，活跃事务需 UNDO</text>

      {/* ARIES */}
      <rect x="40" y="455" width="720" height="85" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="478" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">ARIES 恢复算法三阶段</text>
      <text x="400" y="500" textAnchor="middle" fontSize="11" fill="#92400e">① 分析：重建活跃事务表与脏页表（从检查点扫日志）</text>
      <text x="400" y="518" textAnchor="middle" fontSize="11" fill="#0e7490">② REDO：从脏页最早修改点重做所有已记录更新（重做日志）</text>
      <text x="400" y="536" textAnchor="middle" fontSize="11" fill="#dc2626">③ UNDO：按日志倒序回滚未提交事务（撤销日志，CLRs 防重复撤销）</text>
    </svg>
  );
}
