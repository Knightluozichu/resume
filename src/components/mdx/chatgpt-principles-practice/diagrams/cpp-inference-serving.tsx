"use client";

export function CppInferenceServingDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="推理与服务化 KV缓存量化连续批处理">
      <defs>
        <linearGradient id="cpp-is-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="cpp-is-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="cpp-is-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="cpp-is-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="cpp-is-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="32" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">推理与服务化 · 让大模型跑得快又稳</text>

      {/* 两大瓶颈 */}
      <text x="400" y="60" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">两大推理瓶颈</text>

      <rect x="60" y="72" width="330" height="56" rx="8" fill="url(#cpp-is-blue)" opacity="0.9" />
      <text x="225" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">计算瓶颈 Compute Bound</text>
      <text x="225" y="116" textAnchor="middle" fontSize="10" fill="#bfdbfe">Prefill 阶段 · 算力受限 · 提高算力利用率</text>

      <rect x="410" y="72" width="330" height="56" rx="8" fill="url(#cpp-is-purple)" opacity="0.9" />
      <text x="575" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">访存瓶颈 Memory Bound</text>
      <text x="575" y="116" textAnchor="middle" fontSize="10" fill="#ede9fe">Decode 阶段 · 显存带宽受限 · 逐 token 生成</text>

      <path d="M400 128 L400 136" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-is-arrow)" />

      {/* 六大优化技术 */}
      <text x="400" y="164" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">六大核心优化技术</text>

      <rect x="40" y="176" width="225" height="100" rx="10" fill="url(#cpp-is-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="152" y="200" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">KV Cache</text>
      <text x="152" y="222" textAnchor="middle" fontSize="10" fill="#475569">缓存历史 Key/Value</text>
      <text x="152" y="240" textAnchor="middle" fontSize="10" fill="#475569">避免重复计算注意力</text>
      <text x="152" y="262" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f59e0b">推理加速头号功臣</text>

      <rect x="287" y="176" width="225" height="100" rx="10" fill="url(#cpp-is-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="200" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">连续批处理</text>
      <text x="400" y="222" textAnchor="middle" fontSize="10" fill="#475569">Continuous Batching</text>
      <text x="400" y="240" textAnchor="middle" fontSize="10" fill="#475569">请求动态进出批次</text>
      <text x="400" y="262" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f59e0b">吞吐量倍增</text>

      <rect x="534" y="176" width="226" height="100" rx="10" fill="url(#cpp-is-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="647" y="200" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">量化 Quantization</text>
      <text x="647" y="222" textAnchor="middle" fontSize="10" fill="#475569">FP16 → INT8/INT4</text>
      <text x="647" y="240" textAnchor="middle" fontSize="10" fill="#475569">显存占用减半再减半</text>
      <text x="647" y="262" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f59e0b">GPTQ / AWQ / GGUF</text>

      <rect x="40" y="292" width="225" height="100" rx="10" fill="url(#cpp-is-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="152" y="316" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">PagedAttention</text>
      <text x="152" y="338" textAnchor="middle" fontSize="10" fill="#475569">分页管理 KV 缓存</text>
      <text x="152" y="356" textAnchor="middle" fontSize="10" fill="#475569">像操作系统管理内存</text>
      <text x="152" y="378" textAnchor="middle" fontSize="10" fontWeight="600" fill="#059669">vLLM 的核心</text>

      <rect x="287" y="292" width="225" height="100" rx="10" fill="url(#cpp-is-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="400" y="316" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">投机解码</text>
      <text x="400" y="338" textAnchor="middle" fontSize="10" fill="#475569">Speculative Decoding</text>
      <text x="400" y="356" textAnchor="middle" fontSize="10" fill="#475569">小模型草拟 大模型校验</text>
      <text x="400" y="378" textAnchor="middle" fontSize="10" fontWeight="600" fill="#059669">降低延迟</text>

      <rect x="534" y="292" width="226" height="100" rx="10" fill="url(#cpp-is-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="647" y="316" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">模型蒸馏</text>
      <text x="647" y="338" textAnchor="middle" fontSize="10" fill="#475569">Distillation</text>
      <text x="647" y="356" textAnchor="middle" fontSize="10" fill="#475569">大模型教小模型</text>
      <text x="647" y="378" textAnchor="middle" fontSize="10" fontWeight="600" fill="#059669">轻量部署</text>

      <path d="M400 392 L400 400" stroke="#64748b" strokeWidth="2" markerEnd="url(#cpp-is-arrow)" />

      {/* 服务化 */}
      <text x="400" y="428" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">服务化部署层</text>

      <rect x="60" y="440" width="680" height="56" rx="8" fill="url(#cpp-is-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="400" y="464" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">REST / SSE 流式 / gRPC · 负载均衡 · 限流降级 · 鉴权 · 监控告警</text>
      <text x="400" y="484" textAnchor="middle" fontSize="10" fill="#475569">推理框架：vLLM / TGI / TensorRT-LLM / llama.cpp，按场景选型</text>

      {/* 底部 */}
      <rect x="60" y="512" width="680" height="36" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="535" textAnchor="middle" fontSize="11" fill="#475569">核心矛盾：延迟 vs 吞吐 vs 成本 · 优化目标：单位算力下服务更多用户更快的请求</text>
    </svg>
  );
}
