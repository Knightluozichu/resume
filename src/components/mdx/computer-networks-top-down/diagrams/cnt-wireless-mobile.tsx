"use client";

export function CntWirelessMobileDiagram() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="无线网络与移动性管理图">
      <defs>
        <linearGradient id="cnt-wm-wifi" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="cnt-wm-cell" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="cnt-wm-mob" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="cnt-wm-hide" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <marker id="cnt-wm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">无线网络：WiFi CSMA/CA与移动性管理</text>

      {/* CSMA/CA流程 */}
      <text x="400" y="56" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">WiFi CSMA/CA 与 RTS/CTS</text>

      <rect x="30" y="70" width="120" height="50" rx="8" fill="url(#cnt-wm-wifi)" opacity="0.85" />
      <text x="90" y="93" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">① 侦听DIFS</text>
      <text x="90" y="110" textAnchor="middle" fontSize="9" fill="#bfdbfe">信道空闲?</text>

      <rect x="170" y="70" width="120" height="50" rx="8" fill="url(#cnt-wm-wifi)" opacity="0.85" />
      <text x="230" y="93" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">② 发RTS</text>
      <text x="230" y="110" textAnchor="middle" fontSize="9" fill="#bfdbfe">请求发送</text>

      <rect x="310" y="70" width="120" height="50" rx="8" fill="url(#cnt-wm-wifi)" opacity="0.85" />
      <text x="370" y="93" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">③ 收CTS</text>
      <text x="370" y="110" textAnchor="middle" fontSize="9" fill="#bfdbfe">AP广播CTS</text>

      <rect x="450" y="70" width="120" height="50" rx="8" fill="url(#cnt-wm-wifi)" opacity="0.85" />
      <text x="510" y="93" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">④ 发数据</text>
      <text x="510" y="110" textAnchor="middle" fontSize="9" fill="#bfdbfe">无碰撞传输</text>

      <rect x="590" y="70" width="120" height="50" rx="8" fill="url(#cnt-wm-wifi)" opacity="0.85" />
      <text x="650" y="93" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">⑤ 收ACK</text>
      <text x="650" y="110" textAnchor="middle" fontSize="9" fill="#bfdbfe">SIFS后确认</text>

      <path d="M150 95 L170 95" stroke="#64748b" strokeWidth="2" markerEnd="url(#cnt-wm-arrow)" />
      <path d="M290 95 L310 95" stroke="#64748b" strokeWidth="2" markerEnd="url(#cnt-wm-arrow)" />
      <path d="M430 95 L450 95" stroke="#64748b" strokeWidth="2" markerEnd="url(#cnt-wm-arrow)" />
      <path d="M570 95 L590 95" stroke="#64748b" strokeWidth="2" markerEnd="url(#cnt-wm-arrow)" />

      {/* 隐藏终端 */}
      <text x="400" y="158" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">隐藏终端问题与RTS/CTS解决</text>

      <rect x="50" y="175" width="80" height="50" rx="8" fill="url(#cnt-wm-hide)" opacity="0.85" />
      <text x="90" y="198" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">A</text>
      <text x="90" y="215" textAnchor="middle" fontSize="9" fill="#fecaca">听不到C</text>

      <rect x="360" y="175" width="80" height="50" rx="8" fill="url(#cnt-wm-wifi)" opacity="0.85" />
      <text x="400" y="198" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">B(AP)</text>
      <text x="400" y="215" textAnchor="middle" fontSize="9" fill="#bfdbfe">接收方</text>

      <rect x="670" y="175" width="80" height="50" rx="8" fill="url(#cnt-wm-hide)" opacity="0.85" />
      <text x="710" y="198" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">C</text>
      <text x="710" y="215" textAnchor="middle" fontSize="9" fill="#fecaca">听不到A</text>

      <path d="M130 195 L360 195" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" markerEnd="url(#cnt-wm-arrow)" />
      <text x="245" y="188" textAnchor="middle" fontSize="10" fill="#dc2626">A→B 数据</text>
      <path d="M670 195 L440 195" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" markerEnd="url(#cnt-wm-arrow)" />
      <text x="555" y="188" textAnchor="middle" fontSize="10" fill="#dc2626">C→B 数据（碰撞!）</text>

      <text x="400" y="248" textAnchor="middle" fontSize="11" fill="#475569">RTS/CTS解决：A发RTS→B广播CTS→C听到CTS保持沉默→A无碰撞发送</text>

      {/* 蜂窝网络 */}
      <text x="200" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">蜂窝网络演进</text>

      <rect x="30" y="295" width="100" height="45" rx="6" fill="url(#cnt-wm-cell)" opacity="0.6" />
      <text x="80" y="315" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">2G</text>
      <text x="80" y="330" textAnchor="middle" fontSize="9" fill="#cffafe">GSM ~100K</text>

      <rect x="140" y="295" width="100" height="45" rx="6" fill="url(#cnt-wm-cell)" opacity="0.7" />
      <text x="190" y="315" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">3G</text>
      <text x="190" y="330" textAnchor="middle" fontSize="9" fill="#cffafe">UMTS ~10M</text>

      <rect x="250" y="295" width="100" height="45" rx="6" fill="url(#cnt-wm-cell)" opacity="0.85" />
      <text x="300" y="315" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">4G LTE</text>
      <text x="300" y="330" textAnchor="middle" fontSize="9" fill="#cffafe">~100M 全IP</text>

      <rect x="360" y="295" width="100" height="45" rx="6" fill="url(#cnt-wm-cell)" opacity="0.95" />
      <text x="410" y="315" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">5G NR</text>
      <text x="410" y="330" textAnchor="middle" fontSize="9" fill="#cffafe">~10G 毫米波</text>

      {/* 移动IP */}
      <text x="600" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">移动IP路由</text>

      <rect x="480" y="295" width="110" height="50" rx="8" fill="url(#cnt-wm-mob)" opacity="0.85" />
      <text x="535" y="315" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">归属代理HA</text>
      <text x="535" y="332" textAnchor="middle" fontSize="9" fill="#fef3c7">永久地址</text>

      <rect x="620" y="295" width="110" height="50" rx="8" fill="url(#cnt-wm-mob)" opacity="0.65" />
      <text x="675" y="315" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">外地代理FA</text>
      <text x="675" y="332" textAnchor="middle" fontSize="9" fill="#fef3c7">转交地址</text>

      <path d="M590 320 L620 320" stroke="#64748b" strokeWidth="2" markerEnd="url(#cnt-wm-arrow)" />
      <text x="605" y="312" textAnchor="middle" fontSize="9" fill="#64748b">隧道</text>

      {/* 移动性管理 */}
      <rect x="30" y="360" width="740" height="120" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="382" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">移动性管理与切换</text>

      <rect x="50" y="395" width="200" height="35" rx="6" fill="url(#cnt-wm-mob)" opacity="0.15" stroke="#f59e0b" strokeWidth="1" />
      <text x="150" y="417" textAnchor="middle" fontSize="10" fill="#92400e">永久地址(归属网络) → HA跟踪位置</text>

      <rect x="270" y="395" width="200" height="35" rx="6" fill="url(#cnt-wm-mob)" opacity="0.15" stroke="#f59e0b" strokeWidth="1" />
      <text x="370" y="417" textAnchor="middle" fontSize="10" fill="#92400e">转交地址(外地网络) → FA临时接收</text>

      <rect x="490" y="395" width="260" height="35" rx="6" fill="url(#cnt-wm-mob)" opacity="0.15" stroke="#f59e0b" strokeWidth="1" />
      <text x="620" y="417" textAnchor="middle" fontSize="10" fill="#92400e">对端→HA→隧道→FA→移动节点（间接路由）</text>

      <text x="400" y="455" textAnchor="middle" fontSize="11" fill="#475569">切换(Handoff)：移动节点从旧AP→新AP，HA更新转交地址</text>
      <text x="400" y="472" textAnchor="middle" fontSize="10" fill="#64748b">三角路由问题：间接路由绕远 → 直接路由解决（对端直接隧道到当前位置）</text>
    </svg>
  );
}
