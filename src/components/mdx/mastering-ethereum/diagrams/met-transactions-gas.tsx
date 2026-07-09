"use client";

export function MetTransactionsGasDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="以太坊交易与Gas机制：交易生命周期与费用结构">
      <defs>
        <linearGradient id="met-tx-eth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#627eea" />
          <stop offset="100%" stopColor="#4c53d4" />
        </linearGradient>
        <linearGradient id="met-tx-gas" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>
        <linearGradient id="met-tx-state" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="met-tx-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">交易与 Gas 机制</text>

      {/* 上半：交易结构 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">交易结构</text>

      <rect x="40" y="76" width="360" height="130" rx="10" fill="url(#met-tx-eth)" opacity="0.08" stroke="#627eea" strokeWidth="1.5" />
      <text x="220" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#3730a3">交易字段</text>
      <text x="60" y="118" fontSize="10" fill="#475569">· from：发送方地址（EOA）</text>
      <text x="60" y="134" fontSize="10" fill="#475569">· to：接收方地址（EOA 或 CA）</text>
      <text x="60" y="150" fontSize="10" fill="#475569">· value：转账金额（wei）</text>
      <text x="60" y="166" fontSize="10" fill="#475569">· data / input：合约调用数据</text>
      <text x="60" y="182" fontSize="10" fill="#475569">· nonce：发送方交易序号</text>
      <text x="60" y="198" fontSize="10" fill="#475569">· signature：r, s, v 签名</text>

      <rect x="420" y="76" width="340" height="130" rx="10" fill="url(#met-tx-gas)" opacity="0.08" stroke="#ea580c" strokeWidth="1.5" />
      <text x="590" y="98" textAnchor="middle" fontSize="12" fontWeight="700" fill="#9a3412">Gas 参数（EIP-1559）</text>
      <text x="440" y="118" fontSize="10" fill="#475569">· gasLimit：允许最大 Gas 量</text>
      <text x="440" y="134" fontSize="10" fill="#475569">· maxFeePerGas：愿意支付上限</text>
      <text x="440" y="150" fontSize="10" fill="#475569">· maxPriorityFeePerGas：给矿工小费</text>
      <text x="440" y="166" fontSize="10" fill="#475569">· baseFee：协议基础费（销毁）</text>
      <text x="440" y="182" fontSize="10" fill="#475569">· type：交易类型（0/1/2）</text>
      <text x="440" y="198" fontSize="10" fill="#475569">· accessList：预访问地址（降费）</text>

      {/* 中部：Gas 费用拆解 */}
      <text x="400" y="230" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">Gas 费用拆解（EIP-1559）</text>

      <rect x="40" y="244" width="720" height="50" rx="8" fill="url(#met-tx-gas)" opacity="0.12" stroke="#ea580c" strokeWidth="1.5" />
      <text x="80" y="266" fontSize="11" fontWeight="700" fill="#9a3412">用户支付</text>
      <text x="80" y="282" fontSize="9" fill="#475569">maxFeePerGas × gasUsed</text>
      <text x="400" y="270" textAnchor="middle" fontSize="16" fill="#64748b">=</text>
      <rect x="440" y="250" width="140" height="36" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="1" />
      <text x="510" y="266" textAnchor="middle" fontSize="10" fontWeight="700" fill="#991b1b">基础费</text>
      <text x="510" y="280" textAnchor="middle" fontSize="8" fill="#475569">baseFee（销毁）</text>
      <text x="588" y="270" textAnchor="middle" fontSize="14" fill="#64748b">+</text>
      <rect x="600" y="250" width="140" height="36" rx="6" fill="#fff7ed" stroke="#ea580c" strokeWidth="1" />
      <text x="670" y="266" textAnchor="middle" fontSize="10" fontWeight="700" fill="#9a3412">小费</text>
      <text x="670" y="280" textAnchor="middle" fontSize="8" fill="#475569">priorityFee（给验证者）</text>

      {/* 下半：交易生命周期 */}
      <text x="400" y="318" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">交易生命周期</text>

      <rect x="40" y="332" width="120" height="56" rx="8" fill="url(#met-tx-eth)" opacity="0.15" stroke="#627eea" strokeWidth="1.5" />
      <text x="100" y="354" textAnchor="middle" fontSize="10" fontWeight="700" fill="#3730a3">构造</text>
      <text x="100" y="372" textAnchor="middle" fontSize="9" fill="#475569">填写字段</text>

      <path d="M160 360 L182 360" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-tx-arrow)" />

      <rect x="186" y="332" width="120" height="56" rx="8" fill="url(#met-tx-eth)" opacity="0.15" stroke="#627eea" strokeWidth="1.5" />
      <text x="246" y="354" textAnchor="middle" fontSize="10" fontWeight="700" fill="#3730a3">签名</text>
      <text x="246" y="372" textAnchor="middle" fontSize="9" fill="#475569">ECDSA 授权</text>

      <path d="M306 360 L328 360" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-tx-arrow)" />

      <rect x="332" y="332" width="120" height="56" rx="8" fill="url(#met-tx-gas)" opacity="0.15" stroke="#ea580c" strokeWidth="1.5" />
      <text x="392" y="354" textAnchor="middle" fontSize="10" fontWeight="700" fill="#9a3412">广播</text>
      <text x="392" y="372" textAnchor="middle" fontSize="9" fill="#475569">提交内存池</text>

      <path d="M452 360 L474 360" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-tx-arrow)" />

      <rect x="478" y="332" width="120" height="56" rx="8" fill="url(#met-tx-state)" opacity="0.15" stroke="#059669" strokeWidth="1.5" />
      <text x="538" y="354" textAnchor="middle" fontSize="10" fontWeight="700" fill="#065f46">执行</text>
      <text x="538" y="372" textAnchor="middle" fontSize="9" fill="#475569">EVM 计量 Gas</text>

      <path d="M598 360 L620 360" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-tx-arrow)" />

      <rect x="624" y="332" width="136" height="56" rx="8" fill="url(#met-tx-state)" opacity="0.25" stroke="#059669" strokeWidth="1.5" />
      <text x="692" y="354" textAnchor="middle" fontSize="10" fontWeight="700" fill="#065f46">确认</text>
      <text x="692" y="372" textAnchor="middle" fontSize="9" fill="#475569">状态更新上链</text>

      {/* 三种交易类型 */}
      <text x="400" y="416" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">三种交易类型</text>

      <rect x="40" y="430" width="230" height="70" rx="8" fill="url(#met-tx-eth)" opacity="0.08" stroke="#627eea" strokeWidth="1.5" />
      <text x="155" y="452" textAnchor="middle" fontSize="11" fontWeight="700" fill="#3730a3">普通转账</text>
      <text x="155" y="470" textAnchor="middle" fontSize="9" fill="#475569">EOA → EOA，value 转账</text>
      <text x="155" y="486" textAnchor="middle" fontSize="9" fill="#475569">21000 Gas 固定</text>

      <rect x="285" y="430" width="230" height="70" rx="8" fill="url(#met-tx-state)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="400" y="452" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">合约调用</text>
      <text x="400" y="470" textAnchor="middle" fontSize="9" fill="#475569">EOA → CA，含 data 字段</text>
      <text x="400" y="486" textAnchor="middle" fontSize="9" fill="#475569">Gas 按操作码计量</text>

      <rect x="530" y="430" width="230" height="70" rx="8" fill="url(#met-tx-gas)" opacity="0.08" stroke="#ea580c" strokeWidth="1.5" />
      <text x="645" y="452" textAnchor="middle" fontSize="11" fontWeight="700" fill="#9a3412">合约部署</text>
      <text x="645" y="470" textAnchor="middle" fontSize="9" fill="#475569">to 为空，data 为字节码</text>
      <text x="645" y="486" textAnchor="middle" fontSize="9" fill="#475569">部署后生成合约地址</text>

      {/* 底部总结 */}
      <rect x="40" y="516" width="720" height="44" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="536" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">Gas 核心机制</text>
      <text x="400" y="552" textAnchor="middle" fontSize="10" fill="#475569">Gas = 计算计量 · 基础费销毁抗通胀 · 小费激励验证者 · gasLimit 不足则回滚</text>
    </svg>
  );
}
