"use client";

export function IsnHighAvailabilityDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="高可用架构：冗余模式与VIP漂移">
      <defs>
        <linearGradient id="isn-ha-master" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="isn-ha-backup" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id="isn-ha-vip" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="isn-ha-active" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <marker id="isn-ha-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">高可用架构：冗余与故障转移</text>

      {/* 可用性等级 */}
      <rect x="30" y="45" width="740" height="55" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="400" y="65" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">可用性等级</text>
      <text x="400" y="85" textAnchor="middle" fontSize="11" fill="#475569">2个9(99%/3.65天) → 3个9(99.9%/8.76h) → 4个9(99.99%/52.6min) → 5个9(99.999%/5.26min)</text>

      {/* 三种冗余模式 */}
      <text x="400" y="125" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">三种冗余模式</text>

      {/* 主备 */}
      <rect x="30" y="140" width="230" height="90" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="145" y="162" textAnchor="middle" fontSize="13" fontWeight="700" fill="#2563eb">主备（Active-Standby）</text>
      <rect x="50" y="172" width="80" height="45" rx="6" fill="url(#isn-ha-master)" opacity="0.95" />
      <text x="90" y="199" textAnchor="middle" fontSize="11" fill="#fff">主 ✓活跃</text>
      <rect x="150" y="172" width="80" height="45" rx="6" fill="url(#isn-ha-backup)" opacity="0.8" />
      <text x="190" y="199" textAnchor="middle" fontSize="11" fill="#fff">备 ✗待命</text>
      <text x="145" y="227" textAnchor="middle" fontSize="10" fill="#64748b">利用率50% · 切换秒级</text>

      {/* 双活 */}
      <rect x="285" y="140" width="230" height="90" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="400" y="162" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0891b2">双活（Active-Active）</text>
      <rect x="305" y="172" width="80" height="45" rx="6" fill="url(#isn-ha-active)" opacity="0.95" />
      <text x="345" y="199" textAnchor="middle" fontSize="11" fill="#fff">A ✓活跃</text>
      <rect x="405" y="172" width="80" height="45" rx="6" fill="url(#isn-ha-active)" opacity="0.95" />
      <text x="445" y="199" textAnchor="middle" fontSize="11" fill="#fff">B ✓活跃</text>
      <text x="400" y="227" textAnchor="middle" fontSize="10" fill="#64748b">利用率100% · 无需切换</text>

      {/* 多活 */}
      <rect x="540" y="140" width="230" height="90" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="655" y="162" textAnchor="middle" fontSize="13" fontWeight="700" fill="#8b5cf6">多活（Multi-Active）</text>
      <rect x="555" y="172" width="60" height="45" rx="6" fill="url(#isn-ha-active)" opacity="0.95" />
      <text x="585" y="199" textAnchor="middle" fontSize="10" fill="#fff">北京✓</text>
      <rect x="625" y="172" width="60" height="45" rx="6" fill="url(#isn-ha-active)" opacity="0.95" />
      <text x="655" y="199" textAnchor="middle" fontSize="10" fill="#fff">上海✓</text>
      <rect x="695" y="172" width="60" height="45" rx="6" fill="url(#isn-ha-active)" opacity="0.95" />
      <text x="725" y="199" textAnchor="middle" fontSize="10" fill="#fff">广州✓</text>
      <text x="655" y="227" textAnchor="middle" fontSize="10" fill="#64748b">利用率100% · 机房级容灾</text>

      {/* VIP漂移与VRRP */}
      <rect x="30" y="250" width="740" height="170" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="400" y="275" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">VIP漂移与VRRP故障转移</text>

      {/* VIP */}
      <rect x="320" y="285" width="160" height="35" rx="6" fill="url(#isn-ha-vip)" opacity="0.95" />
      <text x="400" y="307" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">VIP: 192.168.1.100</text>

      {/* Master */}
      <rect x="80" y="330" width="250" height="75" rx="8" fill="url(#isn-ha-master)" opacity="0.95" />
      <text x="205" y="353" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Master节点</text>
      <text x="205" y="373" textAnchor="middle" fontSize="11" fill="#bfdbfe">优先级200 · 持有VIP</text>
      <text x="205" y="393" textAnchor="middle" fontSize="10" fill="#60a5fa">每1秒发VRRP广告包</text>

      {/* Backup */}
      <rect x="470" y="330" width="250" height="75" rx="8" fill="url(#isn-ha-backup)" opacity="0.85" />
      <text x="595" y="353" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Backup节点</text>
      <text x="595" y="373" textAnchor="middle" fontSize="11" fill="#e2e8f0">优先级100 · 待命</text>
      <text x="595" y="393" textAnchor="middle" fontSize="10" fill="#cbd5e1">3秒未收到广告包 → 抢占VIP</text>

      {/* 箭头 */}
      <path d="M330 320 L205 330" stroke="#64748b" strokeWidth="2" markerEnd="url(#isn-ha-arrow)" />
      <path d="M470 320 L595 330" stroke="#64748b" strokeWidth="2" strokeDasharray="4,4" />

      {/* 脑裂防御 */}
      <rect x="30" y="440" width="740" height="120" rx="10" fill="#fef2f2" stroke="#fecaca" strokeWidth="1.5" />
      <text x="400" y="465" textAnchor="middle" fontSize="14" fontWeight="700" fill="#dc2626">脑裂问题与防御</text>
      <text x="400" y="490" textAnchor="middle" fontSize="11" fill="#991b1b">脑裂：网络分区导致两台都认为对方挂了 → 同时抢占VIP → 数据冲突</text>
      <text x="60" y="515" textAnchor="start" fontSize="11" fill="#475569">防御①仲裁节点(Quorum)</text>
      <text x="60" y="533" textAnchor="start" fontSize="10" fill="#64748b">  奇数节点投票，多数派才能成为Master</text>
      <text x="310" y="515" textAnchor="start" fontSize="11" fill="#475569">防御②Fencing(共享存储锁)</text>
      <text x="310" y="533" textAnchor="start" fontSize="10" fill="#64748b">  抢占共享锁，抢不到的强制关机</text>
      <text x="560" y="515" textAnchor="start" fontSize="11" fill="#475569">防御③多条心跳线</text>
      <text x="560" y="533" textAnchor="start" fontSize="10" fill="#64748b">  主网+备用网+串口线</text>
      <text x="400" y="552" textAnchor="middle" fontSize="10" fill="#dc2626">生产环境组合使用：多心跳线 + 仲裁节点</text>
    </svg>
  );
}
