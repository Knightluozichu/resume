"use client";

export function AupTextualityDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="文本性与数据格式设计原则图">
      <defs>
        <linearGradient id="aup-tx-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="aup-tx-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="aup-tx-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="aup-tx-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <marker id="aup-tx-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">文本性与数据格式</text>

      {/* 文本 vs 二进制对比 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">文本格式 vs 二进制格式</text>

      <rect x="30" y="76" width="360" height="160" rx="10" fill="url(#aup-tx-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="50" y="100" fontSize="13" fontWeight="700" fill="#0369a1">文本格式 Text Format</text>
      <text x="50" y="120" fontSize="10" fill="#475569">优点：人可读、可 diff、可 grep</text>
      <text x="50" y="136" fontSize="10" fill="#475569">优点：可手动编辑、版本友好</text>
      <text x="50" y="152" fontSize="10" fill="#475569">优点：工具生态丰富（awk/sed/jq）</text>
      <text x="50" y="168" fontSize="10" fill="#475569">缺点：体积更大、解析较慢</text>
      <text x="50" y="184" fontSize="10" fill="#475569">典型：JSON / YAML / XML / CSV</text>
      <text x="50" y="200" fontSize="10" fill="#475569">典型：/etc 配置 / HTTP 头</text>
      <rect x="50" y="210" width="120" height="16" rx="4" fill="#0ea5e9" opacity="0.2" />
      <text x="110" y="222" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">UNIX 默认偏好</text>

      <rect x="410" y="76" width="360" height="160" rx="10" fill="url(#aup-tx-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="430" y="100" fontSize="13" fontWeight="700" fill="#7e22ce">二进制格式 Binary Format</text>
      <text x="430" y="120" fontSize="10" fill="#475569">优点：紧凑高效、解析快</text>
      <text x="430" y="136" fontSize="10" fill="#475569">优点：可表达任意数据结构</text>
      <text x="430" y="152" fontSize="10" fill="#475569">缺点：不可读、需专用工具</text>
      <text x="430" y="168" fontSize="10" fill="#475569">缺点：版本兼容难维护</text>
      <text x="430" y="184" fontSize="10" fill="#475569">典型：Protocol Buffers / MessagePack</text>
      <text x="430" y="200" fontSize="10" fill="#475569">典型：ELF / 图像格式 / 数据库</text>
      <rect x="430" y="210" width="120" height="16" rx="4" fill="#9333ea" opacity="0.2" />
      <text x="490" y="222" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7e22ce">性能敏感场景</text>

      {/* 设计原则 */}
      <text x="400" y="262" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">数据格式设计原则</text>

      <rect x="30" y="276" width="180" height="120" rx="8" fill="url(#aup-tx-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="120" y="300" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">透明性</text>
      <text x="120" y="320" textAnchor="middle" fontSize="9" fill="#475569">数据结构可见</text>
      <text x="120" y="336" textAnchor="middle" fontSize="9" fill="#475569">无隐藏魔法</text>
      <text x="120" y="352" textAnchor="middle" fontSize="9" fill="#475569">cat 即可查看</text>
      <text x="120" y="368" textAnchor="middle" fontSize="9" fill="#475569">grep 即可搜索</text>

      <rect x="230" y="276" width="180" height="120" rx="8" fill="url(#aup-tx-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="320" y="300" textAnchor="middle" fontSize="11" fontWeight="700" fill="#a16207">韧性</text>
      <text x="320" y="320" textAnchor="middle" fontSize="9" fill="#475569">容错能力强</text>
      <text x="320" y="336" textAnchor="middle" fontSize="9" fill="#475569">损坏不全局崩溃</text>
      <text x="320" y="352" textAnchor="middle" fontSize="9" fill="#475569">可部分恢复</text>
      <text x="320" y="368" textAnchor="middle" fontSize="9" fill="#475569">无前缀依赖</text>

      <rect x="430" y="276" width="180" height="120" rx="8" fill="url(#aup-tx-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="520" y="300" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">简洁性</text>
      <text x="520" y="320" textAnchor="middle" fontSize="9" fill="#475569">语法最少化</text>
      <text x="520" y="336" textAnchor="middle" fontSize="9" fill="#475569">一行一记录</text>
      <text x="520" y="352" textAnchor="middle" fontSize="9" fill="#475569">字段分隔清晰</text>
      <text x="520" y="368" textAnchor="middle" fontSize="9" fill="#475569">无冗余标记</text>

      <rect x="630" y="276" width="140" height="120" rx="8" fill="url(#aup-tx-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="700" y="300" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">可扩展</text>
      <text x="700" y="320" textAnchor="middle" fontSize="9" fill="#475569">向前兼容</text>
      <text x="700" y="336" textAnchor="middle" fontSize="9" fill="#475569">可加新字段</text>
      <text x="700" y="352" textAnchor="middle" fontSize="9" fill="#475569">老版本不崩溃</text>
      <text x="700" y="368" textAnchor="middle" fontSize="9" fill="#475569">版本协商</text>

      {/* 文本流管道处理流程 */}
      <text x="400" y="420" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">文本流管道处理流程</text>

      <rect x="30" y="434" width="140" height="40" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="100" y="458" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">JSON 数据源</text>

      <path d="M170 454 L194 454" stroke="#64748b" strokeWidth="2" markerEnd="url(#aup-tx-arrow)" />

      <rect x="198" y="434" width="140" height="40" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="268" y="458" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">jq 过滤字段</text>

      <path d="M338 454 L362 454" stroke="#64748b" strokeWidth="2" markerEnd="url(#aup-tx-arrow)" />

      <rect x="366" y="434" width="140" height="40" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="436" y="458" textAnchor="middle" fontSize="10" fontWeight="600" fill="#a16207">sort 排序</text>

      <path d="M506 454 L530 454" stroke="#64748b" strokeWidth="2" markerEnd="url(#aup-tx-arrow)" />

      <rect x="534" y="434" width="140" height="40" rx="8" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="604" y="458" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7e22ce">awk 汇总</text>

      <path d="M674 454 L698 454" stroke="#64748b" strokeWidth="2" markerEnd="url(#aup-tx-arrow)" />

      <rect x="702" y="434" width="68" height="40" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="736" y="458" textAnchor="middle" fontSize="10" fontWeight="600" fill="#b91c1c">输出</text>

      {/* 底部总结 */}
      <rect x="30" y="494" width="740" height="36" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="516" textAnchor="middle" fontSize="10" fill="#475569">jq .items | sort_by(.name) | awk '...' ——文本流让数据在工具间自由流动</text>

      <rect x="30" y="542" width="740" height="28" rx="8" fill="url(#aup-tx-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="560" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">核心：文本优先 → 透明可组合 → 简洁可扩展——让数据成为一等公民</text>
    </svg>
  );
}
