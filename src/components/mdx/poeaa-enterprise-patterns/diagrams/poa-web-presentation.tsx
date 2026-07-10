"use client";

export function PoaWebPresentationDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="Web表现模式架构图">
      <defs>
        <linearGradient id="poa-wp-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="poa-wp-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="poa-wp-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="poa-wp-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <marker id="poa-wp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Web 表现模式</text>

      {/* MVC 架构 */}
      <text x="200" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">MVC 模式</text>

      <rect x="40" y="78" width="140" height="56" rx="8" fill="url(#poa-wp-1)" opacity="0.9" />
      <text x="110" y="102" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">模型 Model</text>
      <text x="110" y="120" textAnchor="middle" fontSize="9" fill="#e0f2fe">领域逻辑与数据</text>

      <rect x="220" y="78" width="140" height="56" rx="8" fill="url(#poa-wp-2)" opacity="0.9" />
      <text x="290" y="102" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">视图 View</text>
      <text x="290" y="120" textAnchor="middle" fontSize="9" fill="#f3e8ff">渲染输出 HTML</text>

      <rect x="130" y="156" width="140" height="56" rx="8" fill="url(#poa-wp-3)" opacity="0.9" />
      <text x="200" y="180" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">控制器 Controller</text>
      <text x="200" y="198" textAnchor="middle" fontSize="9" fill="#dcfce7">协调输入输出</text>

      <path d="M180 134 L160 156" stroke="#64748b" strokeWidth="2" markerEnd="url(#poa-wp-arrow)" />
      <path d="M220 134 L240 156" stroke="#64748b" strokeWidth="2" markerEnd="url(#poa-wp-arrow)" />

      <text x="200" y="232" textAnchor="middle" fontSize="9" fill="#64748b">控制器接收请求 → 操作模型 → 选择视图渲染</text>

      {/* 控制器模式 */}
      <text x="590" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">控制器模式</text>

      <rect x="410" y="78" width="360" height="56" rx="8" fill="url(#poa-wp-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="430" y="100" fontSize="12" fontWeight="700" fill="#15803d">页面控制器 Page Controller</text>
      <text x="430" y="120" fontSize="10" fill="#475569">每个页面一个控制器，处理该页请求</text>

      <rect x="410" y="142" width="360" height="56" rx="8" fill="url(#poa-wp-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="430" y="164" fontSize="12" fontWeight="700" fill="#15803d">前端控制器 Front Controller</text>
      <text x="430" y="184" fontSize="10" fill="#475569">单一入口处理所有请求，统一流程</text>

      <rect x="410" y="206" width="360" height="56" rx="8" fill="url(#poa-wp-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="430" y="228" fontSize="12" fontWeight="700" fill="#a16207">应用控制器 Application Controller</text>
      <text x="430" y="248" fontSize="10" fill="#475569">根据 URL 映射到对应处理器，集中路由</text>

      {/* 视图模式 */}
      <text x="400" y="284" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">视图模式</text>

      <rect x="30" y="298" width="240" height="70" rx="8" fill="url(#poa-wp-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="50" y="320" fontSize="12" fontWeight="700" fill="#7e22ce">模板视图 Template View</text>
      <text x="50" y="340" fontSize="10" fill="#475569">在 HTML 中嵌入标记</text>
      <text x="50" y="356" fontSize="10" fill="#475569">JSP / ERB / Razor 风格</text>

      <rect x="280" y="298" width="240" height="70" rx="8" fill="url(#poa-wp-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="300" y="320" fontSize="12" fontWeight="700" fill="#7e22ce">转换视图 Transform View</text>
      <text x="300" y="340" fontSize="10" fill="#475569">将领域数据转换为 HTML</text>
      <text x="300" y="356" fontSize="10" fill="#475569">XSLT 风格转换</text>

      <rect x="530" y="298" width="240" height="70" rx="8" fill="url(#poa-wp-2)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="550" y="320" fontSize="12" fontWeight="700" fill="#7e22ce">两步视图 Two Step View</text>
      <text x="550" y="340" fontSize="10" fill="#475569">先生成逻辑屏幕，再转 HTML</text>
      <text x="550" y="356" fontSize="10" fill="#475569">支持多主题/多设备渲染</text>

      {/* 辅助模式 */}
      <text x="400" y="396" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">辅助模式</text>

      <rect x="30" y="410" width="240" height="56" rx="8" fill="url(#poa-wp-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="50" y="432" fontSize="12" fontWeight="700" fill="#0369a1">视图助手 View Helper</text>
      <text x="50" y="452" fontSize="10" fill="#475569">辅助类处理视图中的逻辑</text>

      <rect x="280" y="410" width="240" height="56" rx="8" fill="url(#poa-wp-3)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="300" y="432" fontSize="12" fontWeight="700" fill="#15803d">过滤器 Intercepting Filter</text>
      <text x="300" y="452" fontSize="10" fill="#475569">请求前后链式处理（认证/日志）</text>

      <rect x="530" y="410" width="240" height="56" rx="8" fill="url(#poa-wp-4)" opacity="0.1" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="550" y="432" fontSize="12" fontWeight="700" fill="#a16207">命令 Command</text>
      <text x="550" y="452" fontSize="10" fill="#475569">封装请求为对象，支持撤销/队列</text>

      {/* 请求处理流程 */}
      <text x="400" y="496" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">请求处理流程</text>

      <rect x="20" y="510" width="120" height="36" rx="6" fill="url(#poa-wp-3)" opacity="0.15" stroke="#16a34a" strokeWidth="1.5" />
      <text x="80" y="532" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">前端控制器</text>

      <path d="M142 528 L168 528" stroke="#64748b" strokeWidth="2" markerEnd="url(#poa-wp-arrow)" />

      <rect x="172" y="510" width="120" height="36" rx="6" fill="url(#poa-wp-1)" opacity="0.15" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="232" y="532" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0369a1">过滤器链</text>

      <path d="M294 528 L320 528" stroke="#64748b" strokeWidth="2" markerEnd="url(#poa-wp-arrow)" />

      <rect x="324" y="510" width="120" height="36" rx="6" fill="url(#poa-wp-4)" opacity="0.15" stroke="#ca8a04" strokeWidth="1.5" />
      <text x="384" y="532" textAnchor="middle" fontSize="9" fontWeight="600" fill="#a16207">应用控制器</text>

      <path d="M446 528 L472 528" stroke="#64748b" strokeWidth="2" markerEnd="url(#poa-wp-arrow)" />

      <rect x="476" y="510" width="120" height="36" rx="6" fill="url(#poa-wp-2)" opacity="0.15" stroke="#9333ea" strokeWidth="1.5" />
      <text x="536" y="532" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7e22ce">模板视图</text>

      <path d="M598 528 L624 528" stroke="#64748b" strokeWidth="2" markerEnd="url(#poa-wp-arrow)" />

      <rect x="628" y="510" width="120" height="36" rx="6" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="688" y="532" textAnchor="middle" fontSize="9" fontWeight="600" fill="#475569">HTML 响应</text>

      <rect x="20" y="556" width="760" height="20" rx="8" fill="url(#poa-wp-3)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="400" y="570" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">核心：控制器路由分发 → 模型处理业务 → 视图渲染输出</text>
    </svg>
  );
}
