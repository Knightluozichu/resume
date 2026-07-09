"use client";

export function DlgTextToImageDiagram() {
  return (
    <svg viewBox="0 0 800 480" className="w-full h-auto" role="img" aria-label="文本到图像生成架构">
      <defs>
        <linearGradient id="dlg-t2i-text" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dlg-t2i-clip" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dlg-t2i-diff" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="dlg-t2i-image" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="dlg-t2i-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="36" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">文本到图像生成（Text-to-Image）</text>

      {/* 文本输入 */}
      <rect x="40" y="64" width="160" height="56" rx="10" fill="url(#dlg-t2i-text)" opacity="0.9" />
      <text x="120" y="88" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">文本输入</text>
      <text x="120" y="108" textAnchor="middle" fontSize="11" fill="#bfdbfe">"一只猫坐在月亮上"</text>

      <path d="M200 92 L240 92" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlg-t2i-arrow)" />

      {/* 文本编码器 */}
      <rect x="240" y="64" width="160" height="56" rx="10" fill="url(#dlg-t2i-clip)" opacity="0.9" />
      <text x="320" y="88" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">文本编码器</text>
      <text x="320" y="108" textAnchor="middle" fontSize="11" fill="#ede9fe">CLIP / T5 / BERT</text>

      <path d="M400 92 L440 92" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlg-t2i-arrow)" />

      {/* 文本嵌入 */}
      <rect x="440" y="64" width="160" height="56" rx="10" fill="url(#dlg-t2i-clip)" opacity="0.7" />
      <text x="520" y="88" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">文本嵌入</text>
      <text x="520" y="108" textAnchor="middle" fontSize="11" fill="#ede9fe">条件向量 c</text>

      {/* 条件注入扩散模型 */}
      <rect x="40" y="160" width="560" height="120" rx="12" fill="#fef2f2" stroke="#dc2626" strokeWidth="2" />
      <text x="320" y="186" textAnchor="middle" fontSize="14" fontWeight="700" fill="#991b1b">条件扩散模型</text>

      <rect x="70" y="200" width="100" height="44" rx="8" fill="#64748b" opacity="0.3" />
      <text x="120" y="220" textAnchor="middle" fontSize="10" fontWeight="600" fill="#334155">噪声 z_T</text>
      <text x="120" y="236" textAnchor="middle" fontSize="9" fill="#475569">纯随机噪声</text>

      <path d="M170 222 L210 222" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#dlg-t2i-arrow)" />

      <rect x="210" y="200" width="100" height="44" rx="8" fill="url(#dlg-t2i-diff)" opacity="0.5" />
      <text x="260" y="220" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">去噪步骤 1</text>
      <text x="260" y="236" textAnchor="middle" fontSize="9" fill="#fecaca">条件：c</text>

      <path d="M310 222 L350 222" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#dlg-t2i-arrow)" />

      <text x="375" y="228" textAnchor="middle" fontSize="14" fontWeight="700" fill="#475569">...</text>

      <path d="M400 222 L440 222" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#dlg-t2i-arrow)" />

      <rect x="440" y="200" width="100" height="44" rx="8" fill="url(#dlg-t2i-diff)" opacity="0.8" />
      <text x="490" y="220" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">去噪步骤 T</text>
      <text x="490" y="236" textAnchor="middle" fontSize="9" fill="#fecaca">条件：c</text>

      <text x="320" y="268" textAnchor="middle" fontSize="11" fill="#475569">交叉注意力将文本条件注入去噪网络</text>

      {/* 条件注入箭头 */}
      <path d="M520 120 L520 160" stroke="#7c3aed" strokeWidth="2" strokeDasharray="4,3" markerEnd="url(#dlg-t2i-arrow)" />
      <text x="560" y="145" fontSize="10" fill="#7c3aed">条件注入</text>

      {/* 输出图像 */}
      <path d="M600 222 L640 222" stroke="#64748b" strokeWidth="2" markerEnd="url(#dlg-t2i-arrow)" />

      <rect x="640" y="180" width="120" height="80" rx="10" fill="url(#dlg-t2i-image)" opacity="0.9" />
      <text x="700" y="210" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">生成图像</text>
      <text x="700" y="230" textAnchor="middle" fontSize="11" fill="#d1fae5">与文本描述</text>
      <text x="700" y="248" textAnchor="middle" fontSize="11" fill="#d1fae5">语义匹配</text>

      {/* 条件生成方法 */}
      <text x="400" y="316" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">条件生成的主要方法</text>

      <rect x="40" y="332" width="170" height="60" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="125" y="354" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">交叉注意力</text>
      <text x="125" y="372" textAnchor="middle" fontSize="10" fill="#475569">文本向量注入</text>
      <text x="125" y="386" textAnchor="middle" fontSize="10" fill="#475569">U-Net 中间层</text>

      <rect x="230" y="332" width="170" height="60" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="315" y="354" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">AdaBN / 条件归一化</text>
      <text x="315" y="372" textAnchor="middle" fontSize="10" fill="#475569">文本调制 BN 参数</text>
      <text x="315" y="386" textAnchor="middle" fontSize="10" fill="#475569">全局风格控制</text>

      <rect x="420" y="332" width="170" height="60" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="505" y="354" textAnchor="middle" fontSize="11" fontWeight="700" fill="#991b1b">无分类器引导</text>
      <text x="505" y="372" textAnchor="middle" fontSize="10" fill="#475569">Classifier-Free</text>
      <text x="505" y="386" textAnchor="middle" fontSize="10" fill="#475569">Guidance</text>

      <rect x="610" y="332" width="150" height="60" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
      <text x="685" y="354" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">潜在扩散</text>
      <text x="685" y="372" textAnchor="middle" fontSize="10" fill="#475569">在隐空间扩散</text>
      <text x="685" y="386" textAnchor="middle" fontSize="10" fill="#475569">大幅加速（LDM）</text>

      {/* 代表模型 */}
      <text x="400" y="422" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">代表模型</text>

      <rect x="80" y="438" width="150" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="155" y="458" textAnchor="middle" fontSize="12" fontWeight="600" fill="#334155">DALL-E / DALL-E 2</text>

      <rect x="250" y="438" width="150" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="325" y="458" textAnchor="middle" fontSize="12" fontWeight="600" fill="#334155">Stable Diffusion</text>

      <rect x="420" y="438" width="150" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="495" y="458" textAnchor="middle" fontSize="12" fontWeight="600" fill="#334155">Imagen</text>

      <rect x="590" y="438" width="150" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="665" y="458" textAnchor="middle" fontSize="12" fontWeight="600" fill="#334155">Midjourney</text>
    </svg>
  );
}
