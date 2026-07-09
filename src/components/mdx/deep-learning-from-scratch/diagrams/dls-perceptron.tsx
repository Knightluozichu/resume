"use client";

export function DlsPerceptronDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="感知机与多层感知机结构">
      <defs>
        <linearGradient id="dls-pc-single" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dls-pc-multi" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dls-pc-gate" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="dls-pc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">感知机：从单层到多层</text>

      {/* 左侧：单层感知机 */}
      <text x="190" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">单层感知机</text>

      <circle cx="100" cy="120" r="22" fill="url(#dls-pc-single)" opacity="0.9" />
      <text x="100" y="124" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">x1</text>

      <circle cx="100" cy="200" r="22" fill="url(#dls-pc-single)" opacity="0.9" />
      <text x="100" y="204" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">x2</text>

      <line x1="122" y1="120" x2="262" y2="155" stroke="#64748b" strokeWidth="2" markerEnd="url(#dls-pc-arrow)" />
      <text x="180" y="132" fontSize="10" fill="#475569">w1</text>
      <line x1="122" y1="200" x2="262" y2="165" stroke="#64748b" strokeWidth="2" markerEnd="url(#dls-pc-arrow)" />
      <text x="180" y="196" fontSize="10" fill="#475569">w2</text>

      <circle cx="290" cy="160" r="28" fill="url(#dls-pc-gate)" opacity="0.95" />
      <text x="290" y="156" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">Σ</text>
      <text x="290" y="170" textAnchor="middle" fontSize="9" fill="#fff">w·x+b</text>

      <line x1="318" y1="160" x2="358" y2="160" stroke="#64748b" strokeWidth="2" markerEnd="url(#dls-pc-arrow)" />

      <rect x="360" y="140" width="50" height="40" rx="6" fill="url(#dls-pc-single)" opacity="0.9" />
      <text x="385" y="164" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">step</text>

      <line x1="410" y1="160" x2="448" y2="160" stroke="#64748b" strokeWidth="2" markerEnd="url(#dls-pc-arrow)" />

      <circle cx="475" cy="160" r="22" fill="#059669" opacity="0.9" />
      <text x="475" y="164" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">y</text>

      <rect x="60" y="210" width="460" height="40" rx="8" fill="#2563eb" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="290" y="234" textAnchor="middle" fontSize="11" fill="#1e40af">线性分类器：f(x) = step(w1·x1 + w2·x2 + b)</text>

      <text x="290" y="276" textAnchor="middle" fontSize="11" fill="#475569">可实现：与门 / 或门 / 与非门</text>
      <text x="290" y="296" textAnchor="middle" fontSize="11" fill="#92400e">无法实现：异或门（线性不可分）</text>

      {/* 右侧：多层感知机 */}
      <text x="620" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">多层感知机（XOR）</text>

      <circle cx="560" cy="110" r="18" fill="url(#dls-pc-multi)" opacity="0.9" />
      <text x="560" y="114" textAnchor="middle" fontSize="11" fill="#fff">x1</text>
      <circle cx="560" cy="210" r="18" fill="url(#dls-pc-multi)" opacity="0.9" />
      <text x="560" y="214" textAnchor="middle" fontSize="11" fill="#fff">x2</text>

      <circle cx="660" cy="130" r="20" fill="url(#dls-pc-gate)" opacity="0.9" />
      <text x="660" y="127" textAnchor="middle" fontSize="9" fill="#fff">NAND</text>
      <text x="660" y="140" textAnchor="middle" fontSize="9" fill="#fff">s1</text>

      <circle cx="660" cy="190" r="20" fill="url(#dls-pc-gate)" opacity="0.9" />
      <text x="660" y="187" textAnchor="middle" fontSize="9" fill="#fff">OR</text>
      <text x="660" y="200" textAnchor="middle" fontSize="9" fill="#fff">s2</text>

      <circle cx="760" cy="160" r="20" fill="url(#dls-pc-gate)" opacity="0.9" />
      <text x="760" y="157" textAnchor="middle" fontSize="9" fill="#fff">AND</text>
      <text x="760" y="170" textAnchor="middle" fontSize="9" fill="#fff">y</text>

      <line x1="578" y1="110" x2="640" y2="125" stroke="#64748b" strokeWidth="1.5" />
      <line x1="578" y1="210" x2="640" y2="138" stroke="#64748b" strokeWidth="1.5" />
      <line x1="578" y1="110" x2="640" y2="183" stroke="#64748b" strokeWidth="1.5" />
      <line x1="578" y1="210" x2="640" y2="196" stroke="#64748b" strokeWidth="1.5" />
      <line x1="680" y1="130" x2="740" y2="155" stroke="#64748b" strokeWidth="1.5" />
      <line x1="680" y1="190" x2="740" y2="165" stroke="#64748b" strokeWidth="1.5" />

      <rect x="540" y="250" width="240" height="50" rx="8" fill="#7c3aed" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="660" y="272" textAnchor="middle" fontSize="11" fill="#5b21b6">两层感知机实现 XOR</text>
      <text x="660" y="290" textAnchor="middle" fontSize="10" fill="#475569">XOR = AND(NAND(x), OR(x))</text>

      {/* 底部总结 */}
      <rect x="60" y="360" width="700" height="60" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="410" y="384" textAnchor="middle" fontSize="12" fontWeight="600" fill="#334155">从感知机到神经网络</text>
      <text x="410" y="404" textAnchor="middle" fontSize="11" fill="#475569">单层感知机 = 线性分类器 · 多层感知机 = 非线性分类器 · 神经网络 = 多层感知机 + 可学习权重 + 连续激活函数</text>

      <rect x="60" y="440" width="700" height="50" rx="10" fill="url(#dls-pc-multi)" opacity="0.95" />
      <text x="410" y="470" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">关键递进：阶跃函数 → sigmoid → ReLU，权重从手工设置到自动学习</text>
    </svg>
  );
}
