"use client";

export function LcpProductionDeploymentDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="生产部署与优化 流式缓存监控可观测性">
      <defs>
        <linearGradient id="lcp-pd-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="lcp-pd-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="lcp-pd-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="lcp-pd-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="lcp-pd-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="lcp-pd-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">生产部署与优化</text>

      {/* 上部：生产架构 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">生产架构总览</text>

      <rect x="30" y="76" width="140" height="60" rx="8" fill="url(#lcp-pd-blue)" opacity="0.95" />
      <text x="100" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">客户端</text>
      <text x="100" y="120" textAnchor="middle" fontSize="9" fill="#bfdbfe">Web/App/SDK</text>

      <path d="M170 106 L210 106" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-pd-arrow)" />

      <rect x="215" y="76" width="140" height="60" rx="8" fill="url(#lcp-pd-purple)" opacity="0.95" />
      <text x="285" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">API 网关</text>
      <text x="285" y="120" textAnchor="middle" fontSize="9" fill="#ede9fe">鉴权/限流/路由</text>

      <path d="M355 106 L395 106" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-pd-arrow)" />

      <rect x="400" y="76" width="140" height="60" rx="8" fill="url(#lcp-pd-amber)" opacity="0.95" />
      <text x="470" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">LangChain</text>
      <text x="470" y="120" textAnchor="middle" fontSize="9" fill="#fef3c7">Chain/Agent 服务</text>

      <path d="M540 106 L580 106" stroke="#64748b" strokeWidth="2" markerEnd="url(#lcp-pd-arrow)" />

      <rect x="585" y="76" width="180" height="60" rx="8" fill="url(#lcp-pd-green)" opacity="0.95" />
      <text x="675" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">LLM Provider</text>
      <text x="675" y="120" textAnchor="middle" fontSize="9" fill="#d1fae5">OpenAI/本地模型</text>

      {/* 中部：六大优化维度 */}
      <text x="400" y="166" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">六大生产优化维度</text>

      <rect x="30" y="180" width="240" height="110" rx="8" fill="url(#lcp-pd-blue)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="150" y="204" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">流式输出 Streaming</text>
      <text x="150" y="224" textAnchor="middle" fontSize="9" fill="#475569">stream / astream 方法</text>
      <text x="150" y="240" textAnchor="middle" fontSize="9" fill="#475569">逐 Token 返回，降低首字延迟</text>
      <text x="150" y="256" textAnchor="middle" fontSize="9" fill="#475569">SSE / WebSocket 推送</text>
      <text x="150" y="272" textAnchor="middle" fontSize="9" fill="#475569">astream_events 事件流</text>

      <rect x="285" y="180" width="240" height="110" rx="8" fill="url(#lcp-pd-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="405" y="204" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">缓存 Cache</text>
      <text x="405" y="224" textAnchor="middle" fontSize="9" fill="#475569">InMemoryCache / RedisCache</text>
      <text x="405" y="240" textAnchor="middle" fontSize="9" fill="#475569">set_llm_cache 全局缓存</text>
      <text x="405" y="256" textAnchor="middle" fontSize="9" fill="#475569">语义缓存相似命中</text>
      <text x="405" y="272" textAnchor="middle" fontSize="9" fill="#475569">降低重复请求成本</text>

      <rect x="540" y="180" width="230" height="110" rx="8" fill="url(#lcp-pd-amber)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="655" y="204" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">异步 Async</text>
      <text x="655" y="224" textAnchor="middle" fontSize="9" fill="#475569">ainvoke / abatch / astream</text>
      <text x="655" y="240" textAnchor="middle" fontSize="9" fill="#475569">asyncio 并发处理</text>
      <text x="655" y="256" textAnchor="middle" fontSize="9" fill="#475569">提升吞吐量</text>
      <text x="655" y="272" textAnchor="middle" fontSize="9" fill="#475569">FastAPI 集成</text>

      <rect x="30" y="300" width="240" height="110" rx="8" fill="url(#lcp-pd-green)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="150" y="324" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065f46">可观测性 Tracing</text>
      <text x="150" y="344" textAnchor="middle" fontSize="9" fill="#475569">LangSmith 全链路追踪</text>
      <text x="150" y="360" textAnchor="middle" fontSize="9" fill="#475569">每步输入输出记录</text>
      <text x="150" y="376" textAnchor="middle" fontSize="9" fill="#475569">延迟/Token/成本分析</text>
      <text x="150" y="392" textAnchor="middle" fontSize="9" fill="#475569">回调 Callbacks 扩展</text>

      <rect x="285" y="300" width="240" height="110" rx="8" fill="url(#lcp-pd-red)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="405" y="324" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b91c1c">容错 Fallbacks</text>
      <text x="405" y="344" textAnchor="middle" fontSize="9" fill="#475569">with_fallbacks 备用模型</text>
      <text x="405" y="360" textAnchor="middle" fontSize="9" fill="#475569">重试 retry_if_exception</text>
      <text x="405" y="376" textAnchor="middle" fontSize="9" fill="#475569">超时 timeout 控制</text>
      <text x="405" y="392" textAnchor="middle" fontSize="9" fill="#475569">熔断降级策略</text>

      <rect x="540" y="300" width="230" height="110" rx="8" fill="url(#lcp-pd-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="655" y="324" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b21b6">安全 Safety</text>
      <text x="655" y="344" textAnchor="middle" fontSize="9" fill="#475569">输入校验 Guardrails</text>
      <text x="655" y="360" textAnchor="middle" fontSize="9" fill="#475569">输出过滤敏感信息</text>
      <text x="655" y="376" textAnchor="middle" fontSize="9" fill="#475569">PII 脱敏处理</text>
      <text x="655" y="392" textAnchor="middle" fontSize="9" fill="#475569">速率限制 Rate Limit</text>

      {/* 底部：部署方案 */}
      <text x="400" y="434" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">部署方案</text>

      <rect x="30" y="448" width="240" height="56" rx="8" fill="url(#lcp-pd-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="150" y="470" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e40af">FastAPI + Uvicorn</text>
      <text x="150" y="490" textAnchor="middle" fontSize="9" fill="#475569">REST API / SSE 流式</text>

      <rect x="285" y="448" width="240" height="56" rx="8" fill="url(#lcp-pd-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="405" y="470" textAnchor="middle" fontSize="10" fontWeight="700" fill="#065f46">LangServe</text>
      <text x="405" y="490" textAnchor="middle" fontSize="9" fill="#475569">一键部署 Runnable 为 API</text>

      <rect x="540" y="448" width="230" height="56" rx="8" fill="url(#lcp-pd-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="655" y="470" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">LangGraph Cloud</text>
      <text x="655" y="490" textAnchor="middle" fontSize="9" fill="#475569">托管部署 + 自动扩缩</text>

      <rect x="30" y="518" width="740" height="32" rx="8" fill="url(#lcp-pd-red)" opacity="0.06" stroke="#dc2626" strokeWidth="2" />
      <text x="400" y="538" textAnchor="middle" fontSize="10" fill="#475569">核心目标：低延迟（流式）+ 低成本（缓存）+ 高可用（容错）+ 可监控（追踪）+ 安全（过滤）</text>
    </svg>
  );
}
