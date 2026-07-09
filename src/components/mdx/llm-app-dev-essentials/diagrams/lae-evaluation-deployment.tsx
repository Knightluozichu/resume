"use client";

export function LaeEvaluationDeploymentDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="评估与部署指标服务与监控">
      <defs>
        <linearGradient id="lae-ed-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="lae-ed-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="lae-ed-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="lae-ed-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="lae-ed-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">评估与部署：从模型验证到上线服务</text>

      {/* 上半：评估维度 */}
      <text x="400" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">大模型评估四大维度</text>

      <rect x="30" y="76" width="175" height="100" rx="8" fill="url(#lae-ed-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="117" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">质量评估</text>
      <text x="117" y="120" textAnchor="middle" fontSize="10" fill="#475569">准确率/相关性</text>
      <text x="117" y="136" textAnchor="middle" fontSize="10" fill="#475569">忠实性/无幻觉</text>
      <text x="117" y="152" textAnchor="middle" fontSize="10" fill="#475569">流畅性/连贯性</text>
      <text x="117" y="168" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">回答好不好</text>

      <rect x="215" y="76" width="175" height="100" rx="8" fill="url(#lae-ed-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="302" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">安全评估</text>
      <text x="302" y="120" textAnchor="middle" fontSize="10" fill="#475569">毒性/偏见检测</text>
      <text x="302" y="136" textAnchor="middle" fontSize="10" fill="#475569">越狱攻击防护</text>
      <text x="302" y="152" textAnchor="middle" fontSize="10" fill="#475569">隐私泄露检查</text>
      <text x="302" y="168" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">安不安全</text>

      <rect x="400" y="76" width="175" height="100" rx="8" fill="url(#lae-ed-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="487" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">性能评估</text>
      <text x="487" y="120" textAnchor="middle" fontSize="10" fill="#475569">延迟(TTFT/TPS)</text>
      <text x="487" y="136" textAnchor="middle" fontSize="10" fill="#475569">吞吐量(QPS)</text>
      <text x="487" y="152" textAnchor="middle" fontSize="10" fill="#475569">资源利用率</text>
      <text x="487" y="168" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f59e0b">快不快</text>

      <rect x="585" y="76" width="175" height="100" rx="8" fill="url(#lae-ed-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="672" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">成本评估</text>
      <text x="672" y="120" textAnchor="middle" fontSize="10" fill="#475569">Token消耗</text>
      <text x="672" y="136" textAnchor="middle" fontSize="10" fill="#475569">API调用费用</text>
      <text x="672" y="152" textAnchor="middle" fontSize="10" fill="#475569">单位请求成本</text>
      <text x="672" y="168" textAnchor="middle" fontSize="10" fontWeight="600" fill="#059669">贵不贵</text>

      {/* 中部：评估方法 */}
      <text x="400" y="202" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">评估方法体系</text>

      <rect x="30" y="216" width="175" height="90" rx="8" fill="url(#lae-ed-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="117" y="238" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">基准测试</text>
      <text x="117" y="258" textAnchor="middle" fontSize="10" fill="#475569">MMLU/HumanEval</text>
      <text x="117" y="274" textAnchor="middle" fontSize="10" fill="#475569">标准化数据集</text>
      <text x="117" y="290" textAnchor="middle" fontSize="10" fill="#475569">可复现对比</text>
      <text x="117" y="300" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb">客观量化</text>

      <rect x="215" y="216" width="175" height="90" rx="8" fill="url(#lae-ed-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="302" y="238" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">人工评估</text>
      <text x="302" y="258" textAnchor="middle" fontSize="10" fill="#475569">专家打分</text>
      <text x="302" y="274" textAnchor="middle" fontSize="10" fill="#475569">盲测对比</text>
      <text x="302" y="290" textAnchor="middle" fontSize="10" fill="#475569">偏好排序</text>
      <text x="302" y="300" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7c3aed">最可靠</text>

      <rect x="400" y="216" width="175" height="90" rx="8" fill="url(#lae-ed-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="487" y="238" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">LLM-as-Judge</text>
      <text x="487" y="258" textAnchor="middle" fontSize="10" fill="#475569">用大模型评估</text>
      <text x="487" y="274" textAnchor="middle" fontSize="10" fill="#475569">大规模自动化</text>
      <text x="487" y="290" textAnchor="middle" fontSize="10" fill="#475569">成本低速度快</text>
      <text x="487" y="300" textAnchor="middle" fontSize="9" fontWeight="600" fill="#f59e0b">可扩展</text>

      <rect x="585" y="216" width="175" height="90" rx="8" fill="url(#lae-ed-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="672" y="238" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">在线A/B测试</text>
      <text x="672" y="258" textAnchor="middle" fontSize="10" fill="#475569">真实用户流量</text>
      <text x="672" y="274" textAnchor="middle" fontSize="10" fill="#475569">金丝雀发布</text>
      <text x="672" y="290" textAnchor="middle" fontSize="10" fill="#475569">业务指标驱动</text>
      <text x="672" y="300" textAnchor="middle" fontSize="9" fontWeight="600" fill="#059669">最贴近真实</text>

      {/* 下半：部署架构 */}
      <text x="400" y="334" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">部署架构与服务化</text>

      <rect x="20" y="348" width="140" height="66" rx="8" fill="url(#lae-ed-blue)" opacity="0.9" />
      <text x="90" y="372" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">负载均衡</text>
      <text x="90" y="390" textAnchor="middle" fontSize="10" fill="#bfdbfe">请求分发</text>
      <text x="90" y="404" textAnchor="middle" fontSize="10" fill="#bfdbfe">流量控制</text>

      <path d="M160 381 L180 381" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-ed-arrow)" />

      <rect x="185" y="348" width="140" height="66" rx="8" fill="url(#lae-ed-purple)" opacity="0.9" />
      <text x="255" y="372" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">API网关</text>
      <text x="255" y="390" textAnchor="middle" fontSize="10" fill="#ede9fe">鉴权/限流</text>
      <text x="255" y="404" textAnchor="middle" fontSize="10" fill="#ede9fe">请求路由</text>

      <path d="M325 381 L345 381" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-ed-arrow)" />

      <rect x="350" y="348" width="140" height="66" rx="8" fill="url(#lae-ed-amber)" opacity="0.9" />
      <text x="420" y="372" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">推理服务</text>
      <text x="420" y="390" textAnchor="middle" fontSize="10" fill="#fef3c7">vLLM/TGI</text>
      <text x="420" y="404" textAnchor="middle" fontSize="10" fill="#fef3c7">GPU集群</text>

      <path d="M490 381 L510 381" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-ed-arrow)" />

      <rect x="515" y="348" width="120" height="66" rx="8" fill="url(#lae-ed-green)" opacity="0.9" />
      <text x="575" y="372" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">缓存层</text>
      <text x="575" y="390" textAnchor="middle" fontSize="10" fill="#d1fae5">语义缓存</text>
      <text x="575" y="404" textAnchor="middle" fontSize="10" fill="#d1fae5">降低延迟</text>

      <path d="M635 381 L655 381" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-ed-arrow)" />

      <rect x="660" y="348" width="120" height="66" rx="8" fill="url(#lae-ed-blue)" opacity="0.9" />
      <text x="720" y="372" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">监控告警</text>
      <text x="720" y="390" textAnchor="middle" fontSize="10" fill="#bfdbfe">指标采集</text>
      <text x="720" y="404" textAnchor="middle" fontSize="10" fill="#bfdbfe">异常通知</text>

      {/* 关键指标 */}
      <rect x="30" y="430" width="740" height="56" rx="8" fill="url(#lae-ed-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="452" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">核心监控指标</text>
      <text x="400" y="472" textAnchor="middle" fontSize="11" fill="#475569">TTFT(首字延迟) / TPS(每秒Token) / QPS(吞吐) / 错误率 / GPU利用率 / 成本/请求</text>

      {/* 底部总结 */}
      <rect x="30" y="500" width="740" height="56" rx="8" fill="url(#lae-ed-green)" opacity="0.08" stroke="#059669" strokeWidth="2" />
      <text x="400" y="522" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">部署核心原则</text>
      <text x="400" y="542" textAnchor="middle" fontSize="11" fill="#475569">离线评估(质量+安全) → 在线评估(A/B测试) → 渐进上线(金丝雀) → 持续监控 → 迭代优化</text>
    </svg>
  );
}
