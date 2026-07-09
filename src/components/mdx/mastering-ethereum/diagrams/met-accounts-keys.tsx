"use client";

export function MetAccountsKeysDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="以太坊账户与密钥：私钥推导与账户类型对比">
      <defs>
        <linearGradient id="met-ak-key" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#627eea" />
          <stop offset="100%" stopColor="#4c53d4" />
        </linearGradient>
        <linearGradient id="met-ak-eoa" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="met-ak-ca" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="met-ak-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">账户与密钥</text>

      {/* 上半：私钥推导链 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">密钥推导链</text>

      <rect x="40" y="76" width="150" height="64" rx="10" fill="url(#met-ak-key)" opacity="0.95" />
      <text x="115" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">私钥</text>
      <text x="115" y="118" textAnchor="middle" fontSize="9" fill="#dbeafe">256 位随机数</text>
      <text x="115" y="132" textAnchor="middle" fontSize="9" fill="#dbeafe">secp256k1 曲线</text>

      <path d="M192 108 L218 108" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-ak-arrow)" />
      <text x="205" y="100" textAnchor="middle" fontSize="9" fill="#64748b">ECDSA</text>

      <rect x="222" y="76" width="150" height="64" rx="10" fill="url(#met-ak-eoa)" opacity="0.9" />
      <text x="297" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">公钥</text>
      <text x="297" y="118" textAnchor="middle" fontSize="9" fill="#bfdbfe">512 位（x,y）</text>
      <text x="297" y="132" textAnchor="middle" fontSize="9" fill="#bfdbfe">椭圆曲线乘法</text>

      <path d="M374 108 L400 108" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-ak-arrow)" />
      <text x="387" y="100" textAnchor="middle" fontSize="9" fill="#64748b">Keccak-256</text>

      <rect x="404" y="76" width="150" height="64" rx="10" fill="url(#met-ak-ca)" opacity="0.9" />
      <text x="479" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">公钥哈希</text>
      <text x="479" y="118" textAnchor="middle" fontSize="9" fill="#d1fae5">取后 20 字节</text>
      <text x="479" y="132" textAnchor="middle" fontSize="9" fill="#d1fae5">Keccak-256</text>

      <path d="M556 108 L582 108" stroke="#64748b" strokeWidth="2" markerEnd="url(#met-ak-arrow)" />

      <rect x="586" y="76" width="174" height="64" rx="10" fill="url(#met-ak-key)" opacity="0.15" stroke="#627eea" strokeWidth="1.5" />
      <text x="673" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#3730a3">以太坊地址</text>
      <text x="673" y="118" textAnchor="middle" fontSize="9" fill="#475569">0x + 40 位十六进制</text>
      <text x="673" y="132" textAnchor="middle" fontSize="9" fill="#475569">EIP-55 混合大小写校验</text>

      {/* 中部：两种账户类型 */}
      <text x="400" y="170" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">两种账户类型</text>

      <rect x="40" y="184" width="350" height="180" rx="10" fill="url(#met-ak-eoa)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="215" y="208" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">EOA 外部拥有账户</text>
      <text x="60" y="232" fontSize="10" fill="#475569">· 由私钥控制，人类/钱包使用</text>
      <text x="60" y="250" fontSize="10" fill="#475569">· 可主动发起交易</text>
      <text x="60" y="268" fontSize="10" fill="#475569">· 无代码，无存储</text>
      <text x="60" y="286" fontSize="10" fill="#475569">· 状态：nonce + 余额</text>
      <text x="60" y="304" fontSize="10" fill="#475569">· 用 ECDSA 签名授权</text>
      <rect x="60" y="318" width="310" height="34" rx="6" fill="#fff" stroke="#2563eb" strokeWidth="1" />
      <text x="215" y="339" textAnchor="middle" fontSize="9" fill="#1e40af">能力：发送交易 / 转账 / 调用合约</text>

      <rect x="410" y="184" width="350" height="180" rx="10" fill="url(#met-ak-ca)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="585" y="208" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">CA 合约账户</text>
      <text x="430" y="232" fontSize="10" fill="#475569">· 由合约代码控制</text>
      <text x="430" y="250" fontSize="10" fill="#475569">· 不能主动发起交易</text>
      <text x="430" y="268" fontSize="10" fill="#475569">· 含 EVM 字节码 + 存储</text>
      <text x="430" y="286" fontSize="10" fill="#475569">· 状态：余额 + nonce + 存储 + 代码</text>
      <text x="430" y="304" fontSize="10" fill="#475569">· 被交易/其他合约调用时执行</text>
      <rect x="430" y="318" width="310" height="34" rx="6" fill="#fff" stroke="#059669" strokeWidth="1" />
      <text x="585" y="339" textAnchor="middle" fontSize="9" fill="#065f46">能力：执行逻辑 / 读写存储 / 调用合约</text>

      {/* 下部：地址校验与签名 */}
      <text x="400" y="386" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">交易签名与地址校验</text>

      <rect x="40" y="400" width="240" height="80" rx="10" fill="url(#met-ak-key)" opacity="0.1" stroke="#627eea" strokeWidth="1.5" />
      <text x="160" y="422" textAnchor="middle" fontSize="11" fontWeight="700" fill="#3730a3">ECDSA 签名</text>
      <text x="160" y="440" textAnchor="middle" fontSize="9" fill="#475569">私钥对交易哈希签名</text>
      <text x="160" y="456" textAnchor="middle" fontSize="9" fill="#475569">产出 r, s, v 三元组</text>
      <text x="160" y="472" textAnchor="middle" fontSize="9" fill="#475569">链 ID 防重放</text>

      <rect x="300" y="400" width="240" height="80" rx="10" fill="url(#met-ak-eoa)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="420" y="422" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">EIP-55 校验</text>
      <text x="420" y="440" textAnchor="middle" fontSize="9" fill="#475569">大小写编码地址哈希</text>
      <text x="420" y="456" textAnchor="middle" fontSize="9" fill="#475569">检测输入错误</text>
      <text x="420" y="472" textAnchor="middle" fontSize="9" fill="#475569">不改变地址本身</text>

      <rect x="560" y="400" width="200" height="80" rx="10" fill="url(#met-ak-ca)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="660" y="422" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">助记词</text>
      <text x="660" y="440" textAnchor="middle" fontSize="9" fill="#475569">BIP-39 12/24 词</text>
      <text x="660" y="456" textAnchor="middle" fontSize="9" fill="#475569">种子推导 HD 钱包</text>
      <text x="660" y="472" textAnchor="middle" fontSize="9" fill="#475569">人类可读备份</text>

      {/* 底部总结 */}
      <rect x="40" y="500" width="720" height="50" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="520" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">密钥安全要点</text>
      <text x="400" y="538" textAnchor="middle" fontSize="10" fill="#475569">私钥即所有权 · 私钥不可反推 · 助记词即钱包 · EOA 发起交易 CA 被动执行</text>
    </svg>
  );
}
