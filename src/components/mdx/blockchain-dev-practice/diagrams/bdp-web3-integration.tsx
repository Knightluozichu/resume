"use client";

export function BdpWeb3IntegrationDiagram() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="Web3 集成：前端到智能合约的数据通路">
      <defs>
        <linearGradient id="bdp-wi-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="bdp-wi-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="bdp-wi-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="bdp-wi-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="bdp-wi-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Web3 集成数据通路</text>

      {/* 前端层 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">前端层</text>
      <rect x="60" y="74" width="200" height="64" rx="10" fill="url(#bdp-wi-blue)" opacity="0.9" />
      <text x="160" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">React 组件</text>
      <text x="160" y="118" textAnchor="middle" fontSize="10" fill="#bfdbfe">useReadContract / useWriteContract</text>

      <rect x="280" y="74" width="240" height="64" rx="10" fill="url(#bdp-wi-purple)" opacity="0.9" />
      <text x="400" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">ethers.js / viem</text>
      <text x="400" y="118" textAnchor="middle" fontSize="10" fill="#ede9fe">ABI 编码 / 解码 / 合约实例</text>

      <rect x="540" y="74" width="200" height="64" rx="10" fill="url(#bdp-wi-amber)" opacity="0.9" />
      <text x="640" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">MetaMask 钱包</text>
      <text x="640" y="118" textAnchor="middle" fontSize="10" fill="#fef3c7">签名 / 注入 provider</text>

      <path d="M400 140 L400 148" stroke="#64748b" strokeWidth="2" markerEnd="url(#bdp-wi-arrow)" />

      {/* 通信层 */}
      <text x="400" y="168" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">通信层</text>
      <rect x="120" y="180" width="260" height="60" rx="10" fill="url(#bdp-wi-green)" opacity="0.9" />
      <text x="250" y="204" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">读操作 call</text>
      <text x="250" y="224" textAnchor="middle" fontSize="10" fill="#d1fae5">不打包交易 / 免 Gas / 即时返回</text>

      <rect x="420" y="180" width="260" height="60" rx="10" fill="url(#bdp-wi-green)" opacity="0.9" />
      <text x="550" y="204" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">写操作 transact</text>
      <text x="550" y="224" textAnchor="middle" fontSize="10" fill="#d1fae5">需签名 / 上链 / 等待区块确认</text>

      <path d="M400 242 L400 250" stroke="#64748b" strokeWidth="2" markerEnd="url(#bdp-wi-arrow)" />

      {/* 网络层 */}
      <text x="400" y="270" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">网络层</text>
      <rect x="180" y="282" width="200" height="64" rx="10" fill="url(#bdp-wi-blue)" opacity="0.9" />
      <text x="280" y="306" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">RPC 节点</text>
      <text x="280" y="326" textAnchor="middle" fontSize="10" fill="#bfdbfe">Infura / Alchemy / 自建</text>

      <rect x="420" y="282" width="200" height="64" rx="10" fill="url(#bdp-wi-purple)" opacity="0.9" />
      <text x="520" y="306" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">JSON-RPC</text>
      <text x="520" y="326" textAnchor="middle" fontSize="10" fill="#ede9fe">eth_call / eth_sendRawTransaction</text>

      <path d="M400 348 L400 356" stroke="#64748b" strokeWidth="2" markerEnd="url(#bdp-wi-arrow)" />

      {/* 链上层 */}
      <text x="400" y="376" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">链上层</text>
      <rect x="120" y="388" width="560" height="64" rx="10" fill="url(#bdp-wi-amber)" opacity="0.9" />
      <text x="400" y="412" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">智能合约 / EVM</text>
      <text x="400" y="432" textAnchor="middle" fontSize="10" fill="#fef3c7">状态变更持久化 / 事件日志供前端订阅</text>

      {/* 底部：事件与状态同步 */}
      <rect x="40" y="466" width="360" height="60" rx="8" fill="url(#bdp-wi-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="220" y="488" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">事件监听</text>
      <text x="220" y="506" textAnchor="middle" fontSize="10" fill="#475569">contract.on 主题过滤</text>
      <text x="220" y="520" textAnchor="middle" fontSize="10" fill="#475569">链上变化实时推送前端</text>

      <rect x="410" y="466" width="350" height="60" rx="8" fill="url(#bdp-wi-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="585" y="488" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">错误与重试</text>
      <text x="585" y="506" textAnchor="middle" fontSize="10" fill="#475569">revert reason 解码</text>
      <text x="585" y="520" textAnchor="middle" fontSize="10" fill="#475569">交易丢包与 nonce 管理</text>
    </svg>
  );
}
