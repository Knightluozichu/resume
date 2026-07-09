"use client";

export function LlmInferenceDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="推理优化与部署 KV缓存量化批处理推理加速技术">
      <defs>
        <linearGradient id="llm-inf-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="llm-inf-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="llm-inf-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="llm-inf-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="llm-inf-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">推理优化与部署</text>

      {/* 推理瓶颈分析 */}
      <text x="400" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">推理瓶颈与优化方向</text>

      <rect x="30" y="76" width="160" height="50" rx="8" fill="url(#llm-inf-blue)" opacity="0.9" />
      <text x="110" y="98" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">内存瓶颈</text>
      <text x="110" y="116" textAnchor="middle" fontSize="9" fill="#bfdbfe">KV缓存占显存</text>

      <rect x="200" y="76" width="160" height="50" rx="8" fill="url(#llm-inf-purple)" opacity="0.9" />
      <text x="280" y="98" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">计算瓶颈</text>
      <text x="280" y="116" textAnchor="middle" fontSize="9" fill="#ede9fe">自回归逐token</text>

      <rect x="370" y="76" width="160" height="50" rx="8" fill="url(#llm-inf-amber)" opacity="0.9" />
      <text x="450" y="98" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">延迟瓶颈</text>
      <text x="450" y="116" textAnchor="middle" fontSize="9" fill="#fef3c7">首字/生成延迟</text>

      <rect x="540" y="76" width="160" height="50" rx="8" fill="url(#llm-inf-green)" opacity="0.9" />
      <text x="620" y="98" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">吞吐瓶颈</text>
      <text x="620" y="116" textAnchor="middle" fontSize="9" fill="#d1fae5">并发处理能力</text>

      {/* 四大优化技术 */}
      <text x="400" y="156" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">四大核心优化技术</text>

      {/* KV Cache */}
      <rect x="30" y="170" width="180" height="140" rx="10" fill="url(#llm-inf-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="120" y="192" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">KV Cache 缓存</text>
      <text x="120" y="214" textAnchor="middle" fontSize="10" fill="#475569">缓存历史 K/V 矩阵</text>
      <text x="120" y="232" textAnchor="middle" fontSize="10" fill="#475569">避免重复计算</text>
      <text x="120" y="250" textAnchor="middle" fontSize="10" fill="#475569">Prefill + Decode 两阶段</text>
      <text x="120" y="268" textAnchor="middle" fontSize="10" fill="#475569">PagedAttention 分页管理</text>
      <text x="120" y="286" textAnchor="middle" fontSize="10" fill="#475569">减少显存碎片</text>
      <text x="120" y="302" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">降低计算延迟</text>

      {/* 量化 */}
      <rect x="220" y="170" width="180" height="140" rx="10" fill="url(#llm-inf-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="310" y="192" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">量化压缩</text>
      <text x="310" y="214" textAnchor="middle" fontSize="10" fill="#475569">FP16 → INT8 / INT4</text>
      <text x="310" y="232" textAnchor="middle" fontSize="10" fill="#475569">减少模型体积</text>
      <text x="310" y="250" textAnchor="middle" fontSize="10" fill="#475569">降低显存占用</text>
      <text x="310" y="268" textAnchor="middle" fontSize="10" fill="#475569">GPTQ / AWQ / GGUF</text>
      <text x="310" y="286" textAnchor="middle" fontSize="10" fill="#475569">PTQ 后训练量化</text>
      <text x="310" y="302" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">降显存提吞吐</text>

      {/* 批处理 */}
      <rect x="410" y="170" width="180" height="140" rx="10" fill="url(#llm-inf-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="500" y="192" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">连续批处理</text>
      <text x="500" y="214" textAnchor="middle" fontSize="10" fill="#475569">动态拼批请求</text>
      <text x="500" y="232" textAnchor="middle" fontSize="10" fill="#475569">不同长度序列并行</text>
      <text x="500" y="250" textAnchor="middle" fontSize="10" fill="#475569">Inflight Batching</text>
      <text x="500" y="268" textAnchor="middle" fontSize="10" fill="#475569">提升 GPU 利用率</text>
      <text x="500" y="286" textAnchor="middle" fontSize="10" fill="#475569">vLLM / TGI 框架</text>
      <text x="500" y="302" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f59e0b">最大化吞吐</text>

      {/* 投机解码 */}
      <rect x="600" y="170" width="170" height="140" rx="10" fill="url(#llm-inf-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="685" y="192" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">投机解码</text>
      <text x="685" y="214" textAnchor="middle" fontSize="10" fill="#475569">小模型快速起草</text>
      <text x="685" y="232" textAnchor="middle" fontSize="10" fill="#475569">大模型并行验证</text>
      <text x="685" y="250" textAnchor="middle" fontSize="10" fill="#475569">一次生成多个 token</text>
      <text x="685" y="268" textAnchor="middle" fontSize="10" fill="#475569">Medusa 头并行</text>
      <text x="685" y="286" textAnchor="middle" fontSize="10" fill="#475569">Eagle / Lookahead</text>
      <text x="685" y="302" textAnchor="middle" fontSize="10" fontWeight="600" fill="#059669">加速2-3倍</text>

      {/* 部署架构 */}
      <text x="400" y="340" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">部署架构</text>

      <rect x="30" y="354" width="120" height="50" rx="8" fill="url(#llm-inf-blue)" opacity="0.15" stroke="#2563eb" strokeWidth="1.5" />
      <text x="90" y="376" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">API 网关</text>
      <text x="90" y="392" textAnchor="middle" fontSize="9" fill="#475569">路由/限流</text>

      <path d="M150 379 L168 379" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-inf-arrow)" />

      <rect x="172" y="354" width="120" height="50" rx="8" fill="url(#llm-inf-purple)" opacity="0.15" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="232" y="376" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">负载均衡</text>
      <text x="232" y="392" textAnchor="middle" fontSize="9" fill="#475569">多副本分发</text>

      <path d="M292 379 L310 379" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-inf-arrow)" />

      <rect x="314" y="354" width="120" height="50" rx="8" fill="url(#llm-inf-amber)" opacity="0.15" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="374" y="376" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">推理引擎</text>
      <text x="374" y="392" textAnchor="middle" fontSize="9" fill="#475569">vLLM/TensorRT</text>

      <path d="M434 379 L452 379" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-inf-arrow)" />

      <rect x="456" y="354" width="120" height="50" rx="8" fill="url(#llm-inf-green)" opacity="0.15" stroke="#059669" strokeWidth="1.5" />
      <text x="516" y="376" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">模型存储</text>
      <text x="516" y="392" textAnchor="middle" fontSize="9" fill="#475569">量化模型</text>

      <path d="M576 379 L594 379" stroke="#64748b" strokeWidth="2" markerEnd="url(#llm-inf-arrow)" />

      <rect x="598" y="354" width="172" height="50" rx="8" fill="url(#llm-inf-blue)" opacity="0.15" stroke="#2563eb" strokeWidth="1.5" />
      <text x="684" y="376" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">监控告警</text>
      <text x="684" y="392" textAnchor="middle" fontSize="9" fill="#475569">延迟/吞吐/错误率</text>

      {/* 关键指标 */}
      <text x="400" y="432" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">关键推理指标</text>

      <rect x="40" y="446" width="170" height="56" rx="8" fill="url(#llm-inf-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="125" y="466" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">TTFT 首字延迟</text>
      <text x="125" y="486" textAnchor="middle" fontSize="10" fill="#475569">用户等待首字时间</text>

      <rect x="225" y="446" width="170" height="56" rx="8" fill="url(#llm-inf-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="310" y="466" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6">TPS 生成速度</text>
      <text x="310" y="486" textAnchor="middle" fontSize="10" fill="#475569">每秒生成 token 数</text>

      <rect x="410" y="446" width="170" height="56" rx="8" fill="url(#llm-inf-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="495" y="466" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">吞吐量</text>
      <text x="495" y="486" textAnchor="middle" fontSize="10" fill="#475569">并发请求处理能力</text>

      <rect x="595" y="446" width="170" height="56" rx="8" fill="url(#llm-inf-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="680" y="466" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">显存利用率</text>
      <text x="680" y="486" textAnchor="middle" fontSize="10" fill="#475569">GPU 显存使用效率</text>

      {/* 底部总结 */}
      <rect x="40" y="520" width="720" height="36" rx="8" fill="url(#llm-inf-green)" opacity="0.08" stroke="#059669" strokeWidth="2" />
      <text x="400" y="542" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">核心：KV缓存省计算，量化降显存，批处理提吞吐，投机解码加生成——四管齐下让大模型跑得快</text>
    </svg>
  );
}
