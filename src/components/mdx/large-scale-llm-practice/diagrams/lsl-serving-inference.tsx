"use client";

export function LslServingInferenceDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="服务化与推理优化 vLLM 量化 KV缓存 推理加速">
      <defs>
        <linearGradient id="lsl-si-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="lsl-si-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="lsl-si-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="lsl-si-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="lsl-si-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">服务化与推理优化</text>

      {/* 推理优化技术栈 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">推理优化技术栈</text>

      <rect x="20" y="74" width="130" height="56" rx="8" fill="url(#lsl-si-blue)" opacity="0.9" />
      <text x="85" y="98" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">KV 缓存</text>
      <text x="85" y="116" textAnchor="middle" fontSize="9" fill="#bfdbfe">避免重复计算</text>

      <path d="M150 102 L168 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#lsl-si-arrow)" />

      <rect x="173" y="74" width="130" height="56" rx="8" fill="url(#lsl-si-purple)" opacity="0.9" />
      <text x="238" y="98" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">PagedAttention</text>
      <text x="238" y="116" textAnchor="middle" fontSize="9" fill="#ede9fe">分页管理显存</text>

      <path d="M303 102 L321 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#lsl-si-arrow)" />

      <rect x="326" y="74" width="130" height="56" rx="8" fill="url(#lsl-si-amber)" opacity="0.9" />
      <text x="391" y="98" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">连续批处理</text>
      <text x="391" y="116" textAnchor="middle" fontSize="9" fill="#fef3c7">动态组批</text>

      <path d="M456 102 L474 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#lsl-si-arrow)" />

      <rect x="479" y="74" width="130" height="56" rx="8" fill="url(#lsl-si-green)" opacity="0.9" />
      <text x="544" y="98" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">量化压缩</text>
      <text x="544" y="116" textAnchor="middle" fontSize="9" fill="#d1fae5">INT8 / INT4</text>

      <path d="M609 102 L627 102" stroke="#64748b" strokeWidth="2" markerEnd="url(#lsl-si-arrow)" />

      <rect x="632" y="74" width="148" height="56" rx="8" fill="url(#lsl-si-blue)" opacity="0.9" />
      <text x="706" y="98" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">投机解码</text>
      <text x="706" y="116" textAnchor="middle" fontSize="9" fill="#bfdbfe">小模型草稿</text>

      {/* 关键优化详解 */}
      <text x="400" y="160" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">关键优化技术详解</text>

      <rect x="20" y="174" width="250" height="120" rx="8" fill="url(#lsl-si-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="145" y="196" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">KV 缓存</text>
      <text x="145" y="216" textAnchor="middle" fontSize="9" fill="#475569">缓存自注意力的 Key/Value</text>
      <text x="145" y="232" textAnchor="middle" fontSize="9" fill="#475569">生成时无需重算历史 Token</text>
      <text x="145" y="248" textAnchor="middle" fontSize="9" fill="#475569">显存：2 * n_layers * n_heads</text>
      <text x="145" y="264" textAnchor="middle" fontSize="9" fill="#475569">  * d_head * seqlen * batch</text>
      <text x="145" y="282" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">加速：O(n^2) → O(n) per step</text>

      <rect x="275" y="174" width="250" height="120" rx="8" fill="url(#lsl-si-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="196" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">PagedAttention（vLLM）</text>
      <text x="400" y="216" textAnchor="middle" fontSize="9" fill="#475569">借鉴 OS 虚拟内存分页机制</text>
      <text x="400" y="232" textAnchor="middle" fontSize="9" fill="#475569">KV 缓存按块分配非连续存储</text>
      <text x="400" y="248" textAnchor="middle" fontSize="9" fill="#475569">消除显存碎片化</text>
      <text x="400" y="264" textAnchor="middle" fontSize="9" fill="#475569">支持 Copy-on-Write 共享前缀</text>
      <text x="400" y="282" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">吞吐提升 2-4x</text>

      <rect x="530" y="174" width="250" height="120" rx="8" fill="url(#lsl-si-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="655" y="196" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">连续批处理</text>
      <text x="655" y="216" textAnchor="middle" fontSize="9" fill="#475569">请求动态加入/退出批次</text>
      <text x="655" y="232" textAnchor="middle" fontSize="9" fill="#475569">不同长度请求并行处理</text>
      <text x="655" y="248" textAnchor="middle" fontSize="9" fill="#475569">Iteration 级调度</text>
      <text x="655" y="264" textAnchor="middle" fontSize="9" fill="#475569">GPU 利用率最大化</text>
      <text x="655" y="282" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">吞吐提升 3-8x</text>

      {/* 量化策略 */}
      <text x="400" y="318" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">量化策略对比</text>

      <rect x="20" y="332" width="180" height="80" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="110" y="354" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">FP16 基线</text>
      <text x="110" y="374" textAnchor="middle" fontSize="9" fill="#475569">16 bit / 无损</text>
      <text x="110" y="390" textAnchor="middle" fontSize="9" fill="#475569">显存 1x</text>
      <text x="110" y="406" textAnchor="middle" fontSize="9" fontWeight="600" fill="#475569">基准</text>

      <rect x="210" y="332" width="180" height="80" rx="8" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="300" y="354" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">INT8 量化</text>
      <text x="300" y="374" textAnchor="middle" fontSize="9" fill="#475569">8 bit / 近似无损</text>
      <text x="300" y="390" textAnchor="middle" fontSize="9" fill="#475569">显存 0.5x</text>
      <text x="300" y="406" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">性价比最优</text>

      <rect x="400" y="332" width="180" height="80" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="490" y="354" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">INT4 量化</text>
      <text x="490" y="374" textAnchor="middle" fontSize="9" fill="#475569">4 bit / 轻微掉点</text>
      <text x="490" y="390" textAnchor="middle" fontSize="9" fill="#475569">显存 0.25x</text>
      <text x="490" y="406" textAnchor="middle" fontSize="9" fontWeight="600" fill="#92400e">极致压缩</text>

      <rect x="590" y="332" width="190" height="80" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="685" y="354" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">AWQ / GPTQ</text>
      <text x="685" y="374" textAnchor="middle" fontSize="9" fill="#475569">激活感知量化</text>
      <text x="685" y="390" textAnchor="middle" fontSize="9" fill="#475569">保护重要通道</text>
      <text x="685" y="406" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">精度最优</text>

      {/* 推理框架 */}
      <text x="400" y="436" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">主流推理框架</text>

      <rect x="20" y="450" width="180" height="56" rx="8" fill="url(#lsl-si-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="110" y="472" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">vLLM</text>
      <text x="110" y="492" textAnchor="middle" fontSize="9" fill="#475569">PagedAttention 高吞吐</text>

      <rect x="210" y="450" width="180" height="56" rx="8" fill="url(#lsl-si-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="300" y="472" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">TGI</text>
      <text x="300" y="492" textAnchor="middle" fontSize="9" fill="#475569">HF 生产级部署</text>

      <rect x="400" y="450" width="180" height="56" rx="8" fill="url(#lsl-si-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="490" y="472" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">TensorRT-LLM</text>
      <text x="490" y="492" textAnchor="middle" fontSize="9" fill="#475569">NVIDIA 极致优化</text>

      <rect x="590" y="450" width="190" height="56" rx="8" fill="url(#lsl-si-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="685" y="472" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">llama.cpp</text>
      <text x="685" y="492" textAnchor="middle" fontSize="9" fill="#475569">CPU/边缘部署</text>

      {/* 关键指标 */}
      <text x="400" y="530" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">服务关键指标</text>

      <rect x="30" y="544" width="180" height="28" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
      <text x="120" y="562" textAnchor="middle" fontSize="9" fill="#475569">TTFT 首 Token 延迟</text>

      <rect x="210" y="544" width="180" height="28" rx="6" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1" />
      <text x="300" y="562" textAnchor="middle" fontSize="9" fill="#475569">TPOT 每 Token 延迟</text>

      <rect x="400" y="544" width="180" height="28" rx="6" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1" />
      <text x="490" y="562" textAnchor="middle" fontSize="9" fill="#475569">吞吐量 tokens/s</text>

      <rect x="590" y="544" width="190" height="28" rx="6" fill="#f0fdf4" stroke="#059669" strokeWidth="1" />
      <text x="685" y="562" textAnchor="middle" fontSize="9" fill="#475569">显存利用率</text>
    </svg>
  );
}
