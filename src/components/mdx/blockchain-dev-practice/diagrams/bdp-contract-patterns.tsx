"use client";

export function BdpContractPatternsDiagram() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="智能合约设计模式分类与关系">
      <defs>
        <linearGradient id="bdp-cp-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="bdp-cp-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="bdp-cp-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="bdp-cp-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="bdp-cp-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="bdp-cp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">合约设计模式</text>

      {/* 四大模式类别 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">四大模式类别</text>

      {/* 权限控制 */}
      <rect x="30" y="76" width="180" height="150" rx="10" fill="url(#bdp-cp-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="120" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">权限控制</text>
      <text x="120" y="122" textAnchor="middle" fontSize="10" fill="#475569">Ownable</text>
      <text x="120" y="140" textAnchor="middle" fontSize="10" fill="#475569">AccessControl</text>
      <text x="120" y="158" textAnchor="middle" fontSize="10" fill="#475569">多签钱包</text>
      <text x="120" y="176" textAnchor="middle" fontSize="10" fill="#475569">角色位运算</text>
      <text x="120" y="208" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">管理谁能调用</text>

      {/* 生命周期 */}
      <rect x="225" y="76" width="180" height="150" rx="10" fill="url(#bdp-cp-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="315" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">生命周期</text>
      <text x="315" y="122" textAnchor="middle" fontSize="10" fill="#475569">Pausable</text>
      <text x="315" y="140" textAnchor="middle" fontSize="10" fill="#475569">状态机</text>
      <text x="315" y="158" textAnchor="middle" fontSize="10" fill="#475569">初始化器</text>
      <text x="315" y="176" textAnchor="middle" fontSize="10" fill="#475569">自毁 destroy</text>
      <text x="315" y="208" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c3aed">管理何时可用</text>

      {/* 升级模式 */}
      <rect x="420" y="76" width="180" height="150" rx="10" fill="url(#bdp-cp-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="510" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">升级模式</text>
      <text x="510" y="122" textAnchor="middle" fontSize="10" fill="#475569">代理 Proxy</text>
      <text x="510" y="140" textAnchor="middle" fontSize="10" fill="#475569">透明代理</text>
      <text x="510" y="158" textAnchor="middle" fontSize="10" fill="#475569">UUPS</text>
      <text x="510" y="176" textAnchor="middle" fontSize="10" fill="#475569">EIP-1967 存储</text>
      <text x="510" y="208" textAnchor="middle" fontSize="9" fontWeight="600" fill="#f59e0b">管理如何迭代</text>

      {/* 工厂与数据 */}
      <rect x="615" y="76" width="155" height="150" rx="10" fill="url(#bdp-cp-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="692" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">工厂与数据</text>
      <text x="692" y="122" textAnchor="middle" fontSize="10" fill="#475569">Factory 工厂</text>
      <text x="692" y="140" textAnchor="middle" fontSize="10" fill="#475569">映射注册表</text>
      <text x="692" y="158" textAnchor="middle" fontSize="10" fill="#475569">ERC20/721</text>
      <text x="692" y="176" textAnchor="middle" fontSize="10" fill="#475569">提款 Pull</text>
      <text x="692" y="208" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">管理如何组织</text>

      {/* 代理模式数据流 */}
      <text x="400" y="254" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">代理模式：delegatecall 数据流</text>

      <rect x="40" y="268" width="200" height="70" rx="8" fill="url(#bdp-cp-amber)" opacity="0.9" />
      <text x="140" y="292" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">用户</text>
      <text x="140" y="312" textAnchor="middle" fontSize="10" fill="#fef3c7">调用 Proxy 合约</text>

      <path d="M242 303 L258 303" stroke="#64748b" strokeWidth="2" markerEnd="url(#bdp-cp-arrow)" />

      <rect x="262" y="268" width="240" height="70" rx="8" fill="url(#bdp-cp-amber)" opacity="0.9" />
      <text x="382" y="292" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Proxy 代理合约</text>
      <text x="382" y="312" textAnchor="middle" fontSize="10" fill="#fef3c7">fallback → delegatecall</text>
      <text x="382" y="328" textAnchor="middle" fontSize="10" fill="#fef3c7">存储状态保留在此</text>

      <path d="M504 303 L520 303" stroke="#64748b" strokeWidth="2" markerEnd="url(#bdp-cp-arrow)" />

      <rect x="524" y="268" width="236" height="70" rx="8" fill="url(#bdp-cp-green)" opacity="0.9" />
      <text x="642" y="292" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Logic 逻辑合约</text>
      <text x="642" y="312" textAnchor="middle" fontSize="10" fill="#d1fae5">可替换升级</text>
      <text x="642" y="328" textAnchor="middle" fontSize="10" fill="#d1fae5">读写 Proxy 的存储</text>

      {/* 安全反模式 */}
      <text x="400" y="364" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">常见安全反模式</text>

      <rect x="30" y="378" width="240" height="60" rx="8" fill="url(#bdp-cp-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="150" y="400" textAnchor="middle" fontSize="11" fontWeight="600" fill="#991b1b">重入攻击</text>
      <text x="150" y="420" textAnchor="middle" fontSize="10" fill="#475569">先转账后改状态</text>
      <text x="150" y="434" textAnchor="middle" fontSize="9" fill="#475569">对策：检查-生效-交互</text>

      <rect x="285" y="378" width="240" height="60" rx="8" fill="url(#bdp-cp-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="405" y="400" textAnchor="middle" fontSize="11" fontWeight="600" fill="#991b1b">整数溢出</text>
      <text x="405" y="420" textAnchor="middle" fontSize="10" fill="#475569">0.8 前无内建检查</text>
      <text x="405" y="434" textAnchor="middle" fontSize="9" fill="#475569">对策：SafeMath / 0.8+</text>

      <rect x="540" y="378" width="230" height="60" rx="8" fill="url(#bdp-cp-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="655" y="400" textAnchor="middle" fontSize="11" fontWeight="600" fill="#991b1b">推送支付失败</text>
      <text x="655" y="420" textAnchor="middle" fontSize="10" fill="#475569">外部调用阻塞</text>
      <text x="655" y="434" textAnchor="middle" fontSize="9" fill="#475569">对策：Pull 提款模式</text>

      {/* 底部总结 */}
      <rect x="30" y="452" width="740" height="68" rx="8" fill="url(#bdp-cp-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="2" />
      <text x="400" y="474" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">设计原则</text>
      <text x="400" y="494" textAnchor="middle" fontSize="10" fill="#475569">最小权限 / 单一职责 / 检查-生效-交互 / 失败安全回滚</text>
      <text x="400" y="510" textAnchor="middle" fontSize="10" fill="#475569">模块化复用 OpenZeppelin 基础库，避免重复造轮子引入漏洞</text>
    </svg>
  );
}
