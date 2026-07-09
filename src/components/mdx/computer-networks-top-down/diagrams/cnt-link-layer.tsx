"use client";

export function CntLinkLayerDiagram() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="链路层与局域网架构图">
      <defs>
        <linearGradient id="cnt-ll-sw" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="cnt-ll-csma" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="cnt-ll-vlan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="cnt-ll-crc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="cnt-ll-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">链路层：以太网、交换机与VLAN</text>

      {/* CSMA/CD工作流程 */}
      <text x="400" y="56" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">CSMA/CD 多路访问协议</text>

      <rect x="30" y="70" width="130" height="50" rx="8" fill="url(#cnt-ll-csma)" opacity="0.85" />
      <text x="95" y="93" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">① 载波侦听</text>
      <text x="95" y="110" textAnchor="middle" fontSize="10" fill="#fef3c7">先听信道</text>

      <rect x="190" y="70" width="130" height="50" rx="8" fill="url(#cnt-ll-csma)" opacity="0.85" />
      <text x="255" y="93" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">② 空闲发送</text>
      <text x="255" y="110" textAnchor="middle" fontSize="10" fill="#fef3c7">开始传输</text>

      <rect x="350" y="70" width="130" height="50" rx="8" fill="url(#cnt-ll-csma)" opacity="0.85" />
      <text x="415" y="93" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">③ 碰撞检测</text>
      <text x="415" y="110" textAnchor="middle" fontSize="10" fill="#fef3c7">边发边听</text>

      <rect x="510" y="70" width="130" height="50" rx="8" fill="url(#cnt-ll-csma)" opacity="0.85" />
      <text x="575" y="93" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">④ 停止退避</text>
      <text x="575" y="110" textAnchor="middle" fontSize="10" fill="#fef3c7">二进制指数退避</text>

      <rect x="670" y="70" width="100" height="50" rx="8" fill="url(#cnt-ll-csma)" opacity="0.85" />
      <text x="720" y="93" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">⑤ 重传</text>
      <text x="720" y="110" textAnchor="middle" fontSize="10" fill="#fef3c7">概率p重试</text>

      <path d="M160 95 L190 95" stroke="#64748b" strokeWidth="2" markerEnd="url(#cnt-ll-arrow)" />
      <path d="M320 95 L350 95" stroke="#64748b" strokeWidth="2" markerEnd="url(#cnt-ll-arrow)" />
      <path d="M480 95 L510 95" stroke="#64748b" strokeWidth="2" markerEnd="url(#cnt-ll-arrow)" />
      <path d="M640 95 L670 95" stroke="#64748b" strokeWidth="2" markerEnd="url(#cnt-ll-arrow)" />

      {/* 交换机自学习 */}
      <text x="400" y="158" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">交换机自学习与帧转发</text>

      <rect x="300" y="170" width="200" height="60" rx="8" fill="url(#cnt-ll-sw)" opacity="0.9" />
      <text x="400" y="195" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">交换机</text>
      <text x="400" y="215" textAnchor="middle" fontSize="10" fill="#bfdbfe">MAC地址表自学习</text>

      <rect x="50" y="180" width="80" height="40" rx="6" fill="url(#cnt-ll-sw)" opacity="0.7" />
      <text x="90" y="198" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">主机A</text>
      <text x="90" y="212" textAnchor="middle" fontSize="9" fill="#bfdbfe">AA:01</text>

      <rect x="50" y="230" width="80" height="40" rx="6" fill="url(#cnt-ll-sw)" opacity="0.7" />
      <text x="90" y="248" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">主机B</text>
      <text x="90" y="262" textAnchor="middle" fontSize="9" fill="#bfdbfe">AA:02</text>

      <rect x="670" y="180" width="80" height="40" rx="6" fill="url(#cnt-ll-sw)" opacity="0.7" />
      <text x="710" y="198" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">主机C</text>
      <text x="710" y="212" textAnchor="middle" fontSize="9" fill="#bfdbfe">AA:03</text>

      <rect x="670" y="230" width="80" height="40" rx="6" fill="url(#cnt-ll-sw)" opacity="0.7" />
      <text x="710" y="248" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">主机D</text>
      <text x="710" y="262" textAnchor="middle" fontSize="9" fill="#bfdbfe">AA:04</text>

      <path d="M130 200 L300 195" stroke="#64748b" strokeWidth="1.5" />
      <path d="M130 250 L300 210" stroke="#64748b" strokeWidth="1.5" />
      <path d="M500 195 L670 200" stroke="#64748b" strokeWidth="1.5" />
      <path d="M500 210 L670 250" stroke="#64748b" strokeWidth="1.5" />

      {/* MAC表 */}
      <rect x="280" y="245" width="240" height="55" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="400" y="262" textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">MAC地址表</text>
      <text x="290" y="277" fontSize="9" fill="#475569">AA:01 → 端口1 · AA:02 → 端口2</text>
      <text x="290" y="291" fontSize="9" fill="#475569">AA:03 → 端口3 · AA:04 → 端口4</text>

      {/* VLAN */}
      <text x="400" y="328" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">VLAN虚拟局域网（802.1Q）</text>

      <rect x="30" y="340" width="340" height="70" rx="8" fill="url(#cnt-ll-vlan)" opacity="0.1" stroke="#10b981" strokeWidth="1.5" />
      <text x="200" y="362" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">VLAN 10（工程部）</text>
      <text x="50" y="382" fontSize="10" fill="#065f46">端口1-4：广播帧只在此VLAN内传播</text>
      <text x="50" y="398" fontSize="10" fill="#065f46">隔离广播域，提高安全性</text>

      <rect x="430" y="340" width="340" height="70" rx="8" fill="url(#cnt-ll-csma)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="600" y="362" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">VLAN 20（市场部）</text>
      <text x="450" y="382" fontSize="10" fill="#92400e">端口5-8：独立广播域</text>
      <text x="450" y="398" fontSize="10" fill="#92400e">跨交换机Trunk：802.1Q标签</text>

      {/* 以太网帧格式 */}
      <rect x="30" y="425" width="740" height="60" rx="8" fill="url(#cnt-ll-crc)" opacity="0.08" stroke="#8b5cf6" strokeWidth="1" />
      <text x="400" y="447" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">以太网帧格式</text>
      <text x="400" y="468" textAnchor="middle" fontSize="10" fill="#475569">前导码(8B) | 目的MAC(6B) | 源MAC(6B) | 类型(2B) | 数据(46-1500B) | CRC(4B)</text>
      <text x="400" y="480" textAnchor="middle" fontSize="9" fill="#64748b">CRC-32差错检测 · 最小帧64B（冲突检测） · MTU=1500B</text>
    </svg>
  );
}
