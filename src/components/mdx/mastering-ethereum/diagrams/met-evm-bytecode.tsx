"use client";

export function MetEvmBytecodeDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="EVM与字节码：虚拟机架构与执行模型">
      <defs>
        <linearGradient id="met-ev-vm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="met-ev-exec" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#627eea" />
          <stop offset="100%" stopColor="#4c53d4" />
        </linearGradient>
        <linearGradient id="met-ev-state" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="met-ev-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">EVM 与字节码</text>

      {/* EVM 架构 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">EVM 架构（准图灵完备虚拟机）</text>

      <rect x="40" y="76" width="720" height="180" rx="10" fill="url(#met-ev-vm)" opacity="0.06" stroke="#0891b2" strokeWidth="2" />
      <text x="400" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0e7490">以太坊虚拟机（EVM）</text>

      {/* 栈 */}
      <rect x="60" y="108" width="160" height="132" rx="8" fill="#fff" stroke="#0891b2" strokeWidth="1.5" />
      <text x="140" y="128" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0e7490">计算栈</text>
      <text x="140" y="146" textAnchor="middle" fontSize="9" fill="#475569">1024 深度上限</text>
      <text x="140" y="162" textAnchor="middle" fontSize="9" fill="#475569">256 位字</text>
      <text x="140" y="178" textAnchor="middle" fontSize="9" fill="#475569">后进先出 LIFO</text>
      <rect x="80" y="190" width="120" height="16" rx="3" fill="url(#met-ev-vm)" opacity="0.3" />
      <rect x="80" y="208" width="120" height="16" rx="3" fill="url(#met-ev-vm)" opacity="0.2" />
      <text x="140" y="234" textAnchor="middle" fontSize="8" fill="#64748b">操作数运算区</text>

      {/* 内存 */}
      <rect x="240" y="108" width="160" height="132" rx="8" fill="#fff" stroke="#627eea" strokeWidth="1.5" />
      <text x="320" y="128" textAnchor="middle" fontSize="11" fontWeight="700" fill="#3730a3">内存 Memory</text>
      <text x="320" y="146" textAnchor="middle" fontSize="9" fill="#475569">临时字节数组</text>
      <text x="320" y="162" textAnchor="middle" fontSize="9" fill="#475569">易失性，按执行存在</text>
      <text x="320" y="178" textAnchor="middle" fontSize="9" fill="#475569">256 字节一页扩展</text>
      <rect x="260" y="190" width="120" height="16" rx="3" fill="url(#met-ev-exec)" opacity="0.3" />
      <rect x="260" y="208" width="120" height="16" rx="3" fill="url(#met-ev-exec)" opacity="0.2" />
      <text x="320" y="234" textAnchor="middle" fontSize="8" fill="#64748b">函数局部数据</text>

      {/* 存储 */}
      <rect x="420" y="108" width="160" height="132" rx="8" fill="#fff" stroke="#059669" strokeWidth="1.5" />
      <text x="500" y="128" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">存储 Storage</text>
      <text x="500" y="146" textAnchor="middle" fontSize="9" fill="#475569">持久化键值对</text>
      <text x="500" y="162" textAnchor="middle" fontSize="9" fill="#475569">256 位 key / value</text>
      <text x="500" y="178" textAnchor="middle" fontSize="9" fill="#475569">非易失，Gas 昂贵</text>
      <rect x="440" y="190" width="120" height="16" rx="3" fill="url(#met-ev-state)" opacity="0.3" />
      <rect x="440" y="208" width="120" height="16" rx="3" fill="url(#met-ev-state)" opacity="0.2" />
      <text x="500" y="234" textAnchor="middle" fontSize="8" fill="#64748b">合约状态</text>

      {/* 字节码 */}
      <rect x="600" y="108" width="140" height="132" rx="8" fill="#fff" stroke="#ea580c" strokeWidth="1.5" />
      <text x="670" y="128" textAnchor="middle" fontSize="11" fontWeight="700" fill="#9a3412">字节码</text>
      <text x="670" y="146" textAnchor="middle" fontSize="9" fill="#475569">不可变合约代码</text>
      <text x="670" y="162" textAnchor="middle" fontSize="9" fill="#475569">操作码序列</text>
      <text x="670" y="178" textAnchor="middle" fontSize="9" fill="#475569">部署后只读</text>
      <rect x="620" y="190" width="100" height="16" rx="3" fill="url(#met-ev-vm)" opacity="0.25" />
      <rect x="620" y="208" width="100" height="16" rx="3" fill="url(#met-ev-vm)" opacity="0.15" />
      <text x="670" y="234" textAnchor="middle" fontSize="8" fill="#64748b">EVM 指令</text>

      {/* 编译流程 */}
      <text x="400" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">合约编译与部署流程</text>

      <rect x="40" y="296" width="130" height="56" rx="8" fill="url(#met-ev-exec)" opacity="0.15" stroke="#627eea" strokeWidth="1.5" />
      <text x="105" y="318" textAnchor="middle" fontSize="10" fontWeight="700" fill="#3730a3">Solidity</text>
      <text x="105" y="336" textAnchor="middle" fontSize="9" fill="#475569">高级源码</text>

      <path d="M170 324 L194 324" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-ev-arrow)" />

      <rect x="198" y="296" width="130" height="56" rx="8" fill="url(#met-ev-vm)" opacity="0.15" stroke="#0891b2" strokeWidth="1.5" />
      <text x="263" y="318" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0e7490">solc 编译</text>
      <text x="263" y="336" textAnchor="middle" fontSize="9" fill="#475569">语法分析优化</text>

      <path d="M328 324 L352 324" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-ev-arrow)" />

      <rect x="356" y="296" width="130" height="56" rx="8" fill="url(#met-ev-vm)" opacity="0.2" stroke="#0891b2" strokeWidth="1.5" />
      <text x="421" y="318" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0e7490">字节码</text>
      <text x="421" y="336" textAnchor="middle" fontSize="9" fill="#475569">EVM 操作码</text>

      <path d="M486 324 L510 324" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-ev-arrow)" />

      <rect x="514" y="296" width="130" height="56" rx="8" fill="url(#met-ev-state)" opacity="0.15" stroke="#059669" strokeWidth="1.5" />
      <text x="579" y="318" textAnchor="middle" fontSize="10" fontWeight="700" fill="#065f46">部署交易</text>
      <text x="579" y="336" textAnchor="middle" fontSize="9" fill="#475569">上链不可变</text>

      <path d="M644 324 L668 324" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-ev-arrow)" />

      <rect x="672" y="296" width="88" height="56" rx="8" fill="url(#met-ev-state)" opacity="0.25" stroke="#059669" strokeWidth="1.5" />
      <text x="716" y="318" textAnchor="middle" fontSize="10" fontWeight="700" fill="#065f46">合约</text>
      <text x="716" y="336" textAnchor="middle" fontSize="9" fill="#475569">CA 地址</text>

      {/* 执行模型与 Gas */}
      <text x="400" y="380" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">执行循环与 Gas 计量</text>

      <rect x="40" y="394" width="350" height="80" rx="8" fill="url(#met-ev-vm)" opacity="0.08" stroke="#0891b2" strokeWidth="1.5" />
      <text x="215" y="414" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0e7490">EVM 执行循环</text>
      <text x="60" y="434" fontSize="9" fill="#475569">1. PC 指针取下一条操作码</text>
      <text x="60" y="450" fontSize="9" fill="#475569">2. 解码并执行（栈/内存/存储）</text>
      <text x="60" y="466" fontSize="9" fill="#475569">3. 扣除对应 Gas，PC 前进</text>

      <rect x="410" y="394" width="350" height="80" rx="8" fill="url(#met-ev-exec)" opacity="0.08" stroke="#627eea" strokeWidth="1.5" />
      <text x="585" y="414" textAnchor="middle" fontSize="11" fontWeight="700" fill="#3730a3">Gas 计量原则</text>
      <text x="430" y="434" fontSize="9" fill="#475569">· 操作码各有固定 Gas 成本</text>
      <text x="430" y="450" fontSize="9" fill="#475569">· 存储写入最贵（SSTORE）</text>
      <text x="430" y="466" fontSize="9" fill="#475569">· Gas 不足则 Out of Gas 回滚</text>

      {/* 底部总结 */}
      <rect x="40" y="492" width="720" height="68" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="512" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">EVM 关键特性</text>
      <text x="400" y="530" textAnchor="middle" fontSize="10" fill="#475569">沙盒隔离 · 确定性执行 · 256 位字长 · 准图灵完备（Gas 限制停机）</text>
      <text x="400" y="548" textAnchor="middle" fontSize="10" fill="#475569">栈 / 内存（易失） / 存储（持久）三层数据 · 字节码不可变</text>
    </svg>
  );
}
