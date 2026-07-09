"use client";

export function CppPretrainingDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="预训练与规模化 数据处理自回归训练缩放律">
      <defs>
        <linearGradient id="cpp-pt-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="cpp-pt-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="cpp-pt-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="cpp-pt-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="cpp-pt-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="32" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">预训练与规模化</text>

      {/* 数据管线 */}
      <text x="400" y="60" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">数据管线</text>

      <rect x="30" y="72" width="170" height="56" rx="8" fill="url(#cpp-pt-blue)" opacity="0.9" />
      <text x="115" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">语料收集</text>
      <text x="115" y="114" textAnchor="middle" fontSize="9" fill="#bfdbfe">网页/书籍/代码</text>

      <path d="M200 100 L218 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-pt-arrow)" />

      <rect x="222" y="72" width="170" height="56" rx="8" fill="url(#cpp-pt-blue)" opacity="0.9" />
      <text x="307" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">清洗去重</text>
      <text x="307" y="114" textAnchor="middle" fontSize="9" fill="#bfdbfe">过滤/去重/脱敏</text>

      <path d="M392 100 L410 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-pt-arrow)" />

      <rect x="414" y="72" width="170" height="56" rx="8" fill="url(#cpp-pt-blue)" opacity="0.9" />
      <text x="499" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">分词 Tokenizer</text>
      <text x="499" y="114" textAnchor="middle" fontSize="9" fill="#bfdbfe">BPE 词表</text>

      <path d="M584 100 L602 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-pt-arrow)" />

      <rect x="606" y="72" width="164" height="56" rx="8" fill="url(#cpp-pt-blue)" opacity="0.9" />
      <text x="688" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">训练样本</text>
      <text x="688" y="114" textAnchor="middle" fontSize="9" fill="#bfdbfe">滑动窗口切分</text>

      <path d="M688 128 L688 156" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-pt-arrow)" />

      {/* 自回归预训练 */}
      <rect x="60" y="160" width="680" height="80" rx="10" fill="url(#cpp-pt-purple)" opacity="0.9" />
      <text x="400" y="186" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">自回归预训练 Next-Token Prediction</text>
      <text x="400" y="208" textAnchor="middle" fontSize="11" fill="#ede9fe">给定前 t 个 token，预测第 t+1 个 token</text>
      <text x="400" y="226" textAnchor="middle" fontSize="11" fill="#ede9fe">损失函数：交叉熵 · 目标：最大化序列似然 P(x1...xn)</text>

      <path d="M400 240 L400 248" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-pt-arrow)" />

      {/* 缩放律 */}
      <text x="400" y="276" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">缩放律 Scaling Laws · 三要素协同</text>

      <rect x="60" y="290" width="200" height="90" rx="10" fill="url(#cpp-pt-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="160" y="314" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">参数量 N</text>
      <text x="160" y="336" textAnchor="middle" fontSize="10" fill="#475569">模型规模</text>
      <text x="160" y="354" textAnchor="middle" fontSize="10" fill="#475569">层数 / 宽度 / 头数</text>
      <text x="160" y="372" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f59e0b">GPT-3：1750 亿</text>

      <rect x="300" y="290" width="200" height="90" rx="10" fill="url(#cpp-pt-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="314" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">数据量 D</text>
      <text x="400" y="336" textAnchor="middle" fontSize="10" fill="#475569">训练 token 数</text>
      <text x="400" y="354" textAnchor="middle" fontSize="10" fill="#475569">高质量语料规模</text>
      <text x="400" y="372" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f59e0b">千亿至万亿级</text>

      <rect x="540" y="290" width="200" height="90" rx="10" fill="url(#cpp-pt-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="640" y="314" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">算力 C</text>
      <text x="640" y="336" textAnchor="middle" fontSize="10" fill="#475569">浮点运算量</text>
      <text x="640" y="354" textAnchor="middle" fontSize="10" fill="#475569">GPU 集群规模</text>
      <text x="640" y="372" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f59e0b">数千卡 × 数月</text>

      <path d="M400 380 L400 388" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-pt-arrow)" />

      {/* 涌现能力 */}
      <rect x="60" y="392" width="680" height="70" rx="10" fill="url(#cpp-pt-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="400" y="416" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">涌现能力 Emergent Abilities</text>
      <text x="400" y="438" textAnchor="middle" fontSize="11" fill="#475569">规模突破阈值后出现：上下文学习 / 少样本推理 / 思维链 / 指令遵循</text>
      <text x="400" y="456" textAnchor="middle" fontSize="10" fill="#065f46">关键洞察：损失随规模幂律下降，能力随规模阶梯式跃迁</text>

      {/* 底部 */}
      <rect x="60" y="488" width="680" height="56" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="510" textAnchor="middle" fontSize="11" fontWeight="600" fill="#475569">Chinchilla 最优：算力固定时，参数量与数据量应按比例同步增长（约 20 token/参数）</text>
      <text x="400" y="530" textAnchor="middle" fontSize="11" fill="#475569">预训练产出「基座模型」，具备通用语言能力，但对齐前不能直接服务用户</text>
    </svg>
  );
}
