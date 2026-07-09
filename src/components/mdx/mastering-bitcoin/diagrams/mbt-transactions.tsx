"use client";

export function MbtTransactionsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="交易结构：UTXO模型与交易输入输出">
      <defs>
        <linearGradient id="mbt-tx-in" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="mbt-tx-out" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="mbt-tx-fee" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7931a" />
          <stop offset="100%" stopColor="#e87b00" />
        </linearGradient>
        <marker id="mbt-tx-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">交易结构与 UTXO 模型</text>

      {/* 交易结构总览 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">一笔交易的结构</text>

      <rect x="200" y="76" width="400" height="160" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
      <text x="400" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0f172a">交易 (Transaction)</text>

      <rect x="216" y="108" width="180" height="50" rx="6" fill="url(#mbt-tx-in)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="306" y="128" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">输入 (Inputs)</text>
      <text x="306" y="146" textAnchor="middle" fontSize="9" fill="#475569">引用前一笔 UTXO</text>

      <rect x="404" y="108" width="180" height="50" rx="6" fill="url(#mbt-tx-out)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="494" y="128" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">输出 (Outputs)</text>
      <text x="494" y="146" textAnchor="middle" fontSize="9" fill="#475569">创建新的 UTXO</text>

      <rect x="216" y="166" width="368" height="56" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="186" textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">其他字段</text>
      <text x="400" y="204" textAnchor="middle" fontSize="9" fill="#64748b">版本号 / 锁定时间 / 见证数据</text>

      {/* UTXO 流转 */}
      <text x="400" y="262" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">UTXO 消费与创建</text>

      <rect x="30" y="276" width="150" height="80" rx="8" fill="url(#mbt-tx-in)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="105" y="300" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">输入 UTXO</text>
      <text x="105" y="318" textAnchor="middle" fontSize="9" fill="#475569">txid + vout</text>
      <text x="105" y="334" textAnchor="middle" fontSize="9" fill="#475569">解锁脚本</text>
      <text x="105" y="350" textAnchor="middle" fontSize="9" fill="#64748b">价值：0.5 BTC</text>

      <path d="M184 316 L218 316" stroke="#64748b" strokeWidth="2" markerEnd="url(#mbt-tx-arrow)" />

      <rect x="222" y="276" width="150" height="80" rx="8" fill="#f8fafc" stroke="#334155" strokeWidth="1.5" />
      <text x="297" y="300" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">交易处理</text>
      <text x="297" y="318" textAnchor="middle" fontSize="9" fill="#475569">验证脚本</text>
      <text x="297" y="334" textAnchor="middle" fontSize="9" fill="#475569">检查 UTXO 未花</text>
      <text x="297" y="350" textAnchor="middle" fontSize="9" fill="#64748b">输入 = 输出 + 费</text>

      <path d="M376 300 L410 300" stroke="#64748b" strokeWidth="2" markerEnd="url(#mbt-tx-arrow)" />

      <rect x="414" y="276" width="130" height="80" rx="8" fill="url(#mbt-tx-out)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="479" y="300" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">输出 1</text>
      <text x="479" y="318" textAnchor="middle" fontSize="9" fill="#475569">锁定脚本</text>
      <text x="479" y="334" textAnchor="middle" fontSize="9" fill="#475569">新 UTXO</text>
      <text x="479" y="350" textAnchor="middle" fontSize="9" fill="#64748b">0.4 BTC</text>

      <path d="M484 356 L484 380" stroke="#64748b" strokeWidth="2" markerEnd="url(#mbt-tx-arrow)" transform="rotate(-30 484 356)" />

      <rect x="568" y="276" width="120" height="80" rx="8" fill="url(#mbt-tx-fee)" opacity="0.1" stroke="#f7931a" strokeWidth="1.5" />
      <text x="628" y="300" textAnchor="middle" fontSize="11" fontWeight="700" fill="#9a3412">找零/手续费</text>
      <text x="628" y="318" textAnchor="middle" fontSize="9" fill="#475569">输出 2</text>
      <text x="628" y="334" textAnchor="middle" fontSize="9" fill="#475569">找零 0.09</text>
      <text x="628" y="350" textAnchor="middle" fontSize="9" fill="#64748b">手续费 0.01</text>

      {/* 脚本类型 */}
      <text x="400" y="386" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">常见脚本类型</text>

      <rect x="30" y="400" width="230" height="64" rx="8" fill="url(#mbt-tx-in)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="145" y="422" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">P2PKH（支付到公钥哈希）</text>
      <text x="145" y="440" textAnchor="middle" fontSize="9" fill="#475569">OP_DUP OP_HASH160 &lt;pubKeyHash&gt;</text>
      <text x="145" y="456" textAnchor="middle" fontSize="9" fill="#64748b">最常见，1 开头地址</text>

      <rect x="276" y="400" width="230" height="64" rx="8" fill="url(#mbt-tx-out)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="391" y="422" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">P2SH（支付到脚本哈希）</text>
      <text x="391" y="440" textAnchor="middle" fontSize="9" fill="#475569">OP_HASH160 &lt;scriptHash&gt; OP_EQUAL</text>
      <text x="391" y="456" textAnchor="middle" fontSize="9" fill="#64748b">多签场景，3 开头地址</text>

      <rect x="522" y="400" width="248" height="64" rx="8" fill="url(#mbt-tx-fee)" opacity="0.08" stroke="#f7931a" strokeWidth="1.5" />
      <text x="646" y="422" textAnchor="middle" fontSize="11" fontWeight="600" fill="#9a3412">P2WPKH（隔离见证）</text>
      <text x="646" y="440" textAnchor="middle" fontSize="9" fill="#475569">见证数据移出脚本</text>
      <text x="646" y="456" textAnchor="middle" fontSize="9" fill="#64748b">bc1 开头，更低手续费</text>

      {/* 关键特性 */}
      <text x="400" y="492" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">UTXO 模型关键特性</text>

      <rect x="30" y="506" width="240" height="40" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="150" y="530" textAnchor="middle" fontSize="10" fill="#475569">UTXO 一次性消费，不可部分花</text>

      <rect x="286" y="506" width="240" height="40" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="406" y="530" textAnchor="middle" fontSize="10" fill="#475569">输入总额 = 输出总额 + 手续费</text>

      <rect x="542" y="506" width="228" height="40" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="656" y="530" textAnchor="middle" fontSize="10" fill="#475569">脚本定义花费条件，非账户余额</text>
    </svg>
  );
}
