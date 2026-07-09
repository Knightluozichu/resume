"use client";

export function MbtP2pNetworkDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="P2P网络协议：节点类型与消息传播">
      <defs>
        <linearGradient id="mbt-p2p-full" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="mbt-p2p-miner" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7931a" />
          <stop offset="100%" stopColor="#e87b00" />
        </linearGradient>
        <linearGradient id="mbt-p2p-spv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="mbt-p2p-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">P2P 网络协议</text>

      {/* 网络拓扑 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">去中心化网络拓扑</text>

      {/* 全节点 */}
      <circle cx="200" cy="130" r="32" fill="url(#mbt-p2p-full)" opacity="0.15" stroke="#2563eb" strokeWidth="2" />
      <text x="200" y="128" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e40af">全节点</text>
      <text x="200" y="142" textAnchor="middle" fontSize="8" fill="#475569">完整账本</text>

      {/* 矿工节点 */}
      <circle cx="400" cy="100" r="32" fill="url(#mbt-p2p-miner)" opacity="0.15" stroke="#f7931a" strokeWidth="2" />
      <text x="400" y="98" textAnchor="middle" fontSize="10" fontWeight="700" fill="#9a3412">矿工节点</text>
      <text x="400" y="112" textAnchor="middle" fontSize="8" fill="#475569">出块+验证</text>

      {/* 全节点2 */}
      <circle cx="600" cy="130" r="32" fill="url(#mbt-p2p-full)" opacity="0.15" stroke="#2563eb" strokeWidth="2" />
      <text x="600" y="128" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e40af">全节点</text>
      <text x="600" y="142" textAnchor="middle" fontSize="8" fill="#475569">完整账本</text>

      {/* SPV 轻节点 */}
      <circle cx="150" cy="240" r="28" fill="url(#mbt-p2p-spv)" opacity="0.15" stroke="#059669" strokeWidth="2" />
      <text x="150" y="238" textAnchor="middle" fontSize="9" fontWeight="700" fill="#065f46">SPV</text>
      <text x="150" y="252" textAnchor="middle" fontSize="8" fill="#475569">轻节点</text>

      {/* SPV 轻节点2 */}
      <circle cx="400" cy="250" r="28" fill="url(#mbt-p2p-spv)" opacity="0.15" stroke="#059669" strokeWidth="2" />
      <text x="400" y="248" textAnchor="middle" fontSize="9" fontWeight="700" fill="#065f46">SPV</text>
      <text x="400" y="262" textAnchor="middle" fontSize="8" fill="#475569">轻节点</text>

      {/* SPV 轻节点3 */}
      <circle cx="650" cy="240" r="28" fill="url(#mbt-p2p-spv)" opacity="0.15" stroke="#059669" strokeWidth="2" />
      <text x="650" y="238" textAnchor="middle" fontSize="9" fontWeight="700" fill="#065f46">SPV</text>
      <text x="650" y="252" textAnchor="middle" fontSize="8" fill="#475569">轻节点</text>

      {/* 连接线 */}
      <line x1="232" y1="130" x2="368" y2="100" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="432" y1="100" x2="568" y2="130" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="232" y1="135" x2="568" y2="135" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="180" y1="160" x2="160" y2="216" stroke="#94a3b8" strokeWidth="1" />
      <line x1="400" y1="132" x2="400" y2="224" stroke="#94a3b8" strokeWidth="1" />
      <line x1="620" y1="160" x2="640" y2="216" stroke="#94a3b8" strokeWidth="1" />

      {/* 节点类型说明 */}
      <text x="400" y="300" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">节点类型对比</text>

      <rect x="30" y="314" width="240" height="80" rx="8" fill="url(#mbt-p2p-full)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="150" y="336" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">全节点 (Full Node)</text>
      <text x="150" y="356" textAnchor="middle" fontSize="9" fill="#475569">存储完整区块链（~500GB）</text>
      <text x="150" y="372" textAnchor="middle" fontSize="9" fill="#475569">独立验证所有交易和区块</text>
      <text x="150" y="388" textAnchor="middle" fontSize="9" fill="#64748b">不依赖第三方信任</text>

      <rect x="286" y="314" width="240" height="80" rx="8" fill="url(#mbt-p2p-miner)" opacity="0.08" stroke="#f7931a" strokeWidth="1.5" />
      <text x="406" y="336" textAnchor="middle" fontSize="12" fontWeight="700" fill="#9a3412">矿工节点 (Miner)</text>
      <text x="406" y="356" textAnchor="middle" fontSize="9" fill="#475569">全节点 + 挖矿功能</text>
      <text x="406" y="372" textAnchor="middle" fontSize="9" fill="#475569">收集交易并竞争出块</text>
      <text x="406" y="388" textAnchor="middle" fontSize="9" fill="#64748b">获得区块奖励和手续费</text>

      <rect x="542" y="314" width="228" height="80" rx="8" fill="url(#mbt-p2p-spv)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="656" y="336" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">SPV 轻节点 (Light)</text>
      <text x="656" y="356" textAnchor="middle" fontSize="9" fill="#475569">只存区块头（~50MB）</text>
      <text x="656" y="372" textAnchor="middle" fontSize="9" fill="#475569">用 Merkle 证明验证交易</text>
      <text x="656" y="388" textAnchor="middle" fontSize="9" fill="#64748b">手机钱包常用此模式</text>

      {/* 关键协议消息 */}
      <text x="400" y="420" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">关键 P2P 消息</text>

      <rect x="30" y="434" width="150" height="56" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="105" y="456" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">version</text>
      <text x="105" y="474" textAnchor="middle" fontSize="9" fill="#64748b">握手与版本协商</text>

      <rect x="194" y="434" width="150" height="56" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="269" y="456" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">inv</text>
      <text x="269" y="474" textAnchor="middle" fontSize="9" fill="#64748b">通告交易/区块</text>

      <rect x="358" y="434" width="150" height="56" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="433" y="456" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">getdata</text>
      <text x="433" y="474" textAnchor="middle" fontSize="9" fill="#64748b">请求数据内容</text>

      <rect x="522" y="434" width="130" height="56" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="587" y="456" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">tx / block</text>
      <text x="587" y="474" textAnchor="middle" fontSize="9" fill="#64748b">传输数据</text>

      <rect x="664" y="434" width="106" height="56" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="717" y="456" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">addr</text>
      <text x="717" y="474" textAnchor="middle" fontSize="9" fill="#64748b">节点发现</text>

      {/* 底部总结 */}
      <rect x="30" y="500" width="740" height="28" rx="8" fill="url(#mbt-p2p-full)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="400" y="518" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">P2P 网络 = 对等节点 Gossip 传播 + 全节点独立验证 + SPV 轻量查询 = 无中心服务器的弹性网络</text>
    </svg>
  );
}
