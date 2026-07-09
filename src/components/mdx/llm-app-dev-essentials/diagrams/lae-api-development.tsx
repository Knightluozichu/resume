"use client";

export function LaeApiDevelopmentDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="API调用与开发请求流式参数与错误处理">
      <defs>
        <linearGradient id="lae-ad-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="lae-ad-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="lae-ad-amber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="lae-ad-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="lae-ad-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">API调用与开发：请求到响应全流程</text>

      {/* 上半：请求-响应流程 */}
      <text x="400" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">API调用流程</text>

      <rect x="20" y="76" width="140" height="66" rx="8" fill="url(#lae-ad-blue)" opacity="0.9" />
      <text x="90" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">客户端</text>
      <text x="90" y="118" textAnchor="middle" fontSize="10" fill="#bfdbfe">构造请求</text>
      <text x="90" y="132" textAnchor="middle" fontSize="10" fill="#bfdbfe">API Key认证</text>

      <path d="M160 109 L180 109" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-ad-arrow)" />

      <rect x="185" y="76" width="150" height="66" rx="8" fill="url(#lae-ad-purple)" opacity="0.9" />
      <text x="260" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">API网关</text>
      <text x="260" y="118" textAnchor="middle" fontSize="10" fill="#ede9fe">鉴权/限流</text>
      <text x="260" y="132" textAnchor="middle" fontSize="10" fill="#ede9fe">路由分发</text>

      <path d="M335 109 L355 109" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-ad-arrow)" />

      <rect x="360" y="76" width="150" height="66" rx="8" fill="url(#lae-ad-amber)" opacity="0.9" />
      <text x="435" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">LLM推理</text>
      <text x="435" y="118" textAnchor="middle" fontSize="10" fill="#fef3c7">Token化处理</text>
      <text x="435" y="132" textAnchor="middle" fontSize="10" fill="#fef3c7">模型生成</text>

      <path d="M510 109 L530 109" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-ad-arrow)" />

      <rect x="535" y="76" width="120" height="66" rx="8" fill="url(#lae-ad-green)" opacity="0.9" />
      <text x="595" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">响应</text>
      <text x="595" y="118" textAnchor="middle" fontSize="10" fill="#d1fae5">JSON/SSE</text>
      <text x="595" y="132" textAnchor="middle" fontSize="10" fill="#d1fae5">返回结果</text>

      <path d="M655 109 L675 109" stroke="#64748b" strokeWidth="2" markerEnd="url(#lae-ad-arrow)" />

      <rect x="680" y="76" width="100" height="66" rx="8" fill="url(#lae-ad-blue)" opacity="0.9" />
      <text x="730" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">客户端</text>
      <text x="730" y="118" textAnchor="middle" fontSize="10" fill="#bfdbfe">解析响应</text>
      <text x="730" y="132" textAnchor="middle" fontSize="10" fill="#bfdbfe">展示结果</text>

      {/* 中部：核心参数 */}
      <text x="400" y="172" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">核心请求参数</text>

      <rect x="30" y="186" width="175" height="100" rx="8" fill="url(#lae-ad-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="117" y="208" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e40af">model</text>
      <text x="117" y="228" textAnchor="middle" fontSize="10" fill="#475569">选择模型</text>
      <text x="117" y="244" textAnchor="middle" fontSize="10" fill="#475569">gpt-4 / claude</text>
      <text x="117" y="260" textAnchor="middle" fontSize="10" fill="#475569">决定能力/成本</text>
      <text x="117" y="278" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">必填参数</text>

      <rect x="215" y="186" width="175" height="100" rx="8" fill="url(#lae-ad-purple)" opacity="0.1" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="302" y="208" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">messages</text>
      <text x="302" y="228" textAnchor="middle" fontSize="10" fill="#475569">消息列表</text>
      <text x="302" y="244" textAnchor="middle" fontSize="10" fill="#475569">system/user/assistant</text>
      <text x="302" y="260" textAnchor="middle" fontSize="10" fill="#475569">多轮对话历史</text>
      <text x="302" y="278" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7c3aed">必填参数</text>

      <rect x="400" y="186" width="175" height="100" rx="8" fill="url(#lae-ad-amber)" opacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="487" y="208" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">temperature</text>
      <text x="487" y="228" textAnchor="middle" fontSize="10" fill="#475569">0.0 - 2.0</text>
      <text x="487" y="244" textAnchor="middle" fontSize="10" fill="#475569">低=确定性输出</text>
      <text x="487" y="260" textAnchor="middle" fontSize="10" fill="#475569">高=创造性输出</text>
      <text x="487" y="278" textAnchor="middle" fontSize="10" fontWeight="600" fill="#f59e0b">可选参数</text>

      <rect x="585" y="186" width="175" height="100" rx="8" fill="url(#lae-ad-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="672" y="208" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">max_tokens</text>
      <text x="672" y="228" textAnchor="middle" fontSize="10" fill="#475569">最大生成长度</text>
      <text x="672" y="244" textAnchor="middle" fontSize="10" fill="#475569">控制成本</text>
      <text x="672" y="260" textAnchor="middle" fontSize="10" fill="#475569">防止超长输出</text>
      <text x="672" y="278" textAnchor="middle" fontSize="10" fontWeight="600" fill="#059669">可选参数</text>

      {/* 下半：流式 vs 非流式 */}
      <text x="400" y="316" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">流式 vs 非流式响应</text>

      <rect x="30" y="330" width="350" height="90" rx="8" fill="url(#lae-ad-blue)" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
      <text x="205" y="352" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">非流式 (一次性返回)</text>
      <text x="205" y="374" textAnchor="middle" fontSize="10" fill="#475569">等待全部生成后返回完整结果</text>
      <text x="205" y="390" textAnchor="middle" fontSize="10" fill="#475569">优点：解析简单 / 缺点：首字延迟高</text>
      <text x="205" y="408" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563eb">适合：后台任务 / 批处理</text>

      <rect x="420" y="330" width="350" height="90" rx="8" fill="url(#lae-ad-green)" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
      <text x="595" y="352" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065f46">流式 (逐Token返回 SSE)</text>
      <text x="595" y="374" textAnchor="middle" fontSize="10" fill="#475569">每生成一个Token就推送</text>
      <text x="595" y="390" textAnchor="middle" fontSize="10" fill="#475569">优点：首字延迟低 / 缺点：解析复杂</text>
      <text x="595" y="408" textAnchor="middle" fontSize="10" fontWeight="600" fill="#059669">适合：聊天界面 / 实时交互</text>

      {/* 错误处理 */}
      <text x="400" y="446" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">错误处理与重试</text>

      <rect x="30" y="460" width="175" height="56" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="117" y="480" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">4xx 客户端错误</text>
      <text x="117" y="500" textAnchor="middle" fontSize="10" fill="#475569">参数错误/鉴权失败</text>

      <rect x="215" y="460" width="175" height="56" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="302" y="480" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">5xx 服务端错误</text>
      <text x="302" y="500" textAnchor="middle" fontSize="10" fill="#475569">模型过载/超时</text>

      <rect x="400" y="460" width="175" height="56" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="487" y="480" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e">速率限制 429</text>
      <text x="487" y="500" textAnchor="middle" fontSize="10" fill="#475569">指数退避重试</text>

      <rect x="585" y="460" width="175" height="56" rx="8" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5" />
      <text x="672" y="480" textAnchor="middle" fontSize="11" fontWeight="600" fill="#065f46">超时处理</text>
      <text x="672" y="500" textAnchor="middle" fontSize="10" fill="#475569">设置timeout + 降级</text>

      {/* 底部总结 */}
      <rect x="30" y="530" width="740" height="32" rx="8" fill="url(#lae-ad-purple)" opacity="0.08" stroke="#7c3aed" strokeWidth="2" />
      <text x="400" y="550" textAnchor="middle" fontSize="11" fill="#475569">核心：认证 → 构造请求 → 调用API → 处理响应 → 错误重试 → 流式优化体验</text>
    </svg>
  );
}
