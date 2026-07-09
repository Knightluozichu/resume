"use client";

export function IlhHttpMethodsDiagram() {
  return (
    <svg viewBox="0 0 800 480" className="w-full h-auto" role="img" aria-label="HTTP方法对比与特性">
      <defs>
        <linearGradient id="ilh-hm-get" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="ilh-hm-post" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="ilh-hm-put" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="ilh-hm-del" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <linearGradient id="ilh-hm-other" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">HTTP方法特性矩阵</text>

      {/* 表头 */}
      <rect x="20" y="50" width="760" height="35" rx="6" fill="#1e293b" />
      <text x="80" y="73" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">方法</text>
      <text x="220" y="73" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">语义</text>
      <text x="400" y="73" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">请求体</text>
      <text x="520" y="73" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">安全</text>
      <text x="620" y="73" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">幂等</text>
      <text x="720" y="73" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">可缓存</text>

      {/* GET */}
      <rect x="20" y="90" width="760" height="50" rx="6" fill="#d1fae5" stroke="#10b981" strokeWidth="1" />
      <rect x="20" y="90" width="120" height="50" rx="6" fill="url(#ilh-hm-get)" />
      <text x="80" y="120" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">GET</text>
      <text x="220" y="112" textAnchor="middle" fontSize="11" fill="#065f46">获取资源</text>
      <text x="220" y="128" textAnchor="middle" fontSize="10" fill="#059669">查询参数在URL</text>
      <text x="400" y="120" textAnchor="middle" fontSize="11" fill="#065f46">无</text>
      <text x="520" y="120" textAnchor="middle" fontSize="11" fontWeight="600" fill="#059669">是</text>
      <text x="620" y="120" textAnchor="middle" fontSize="11" fontWeight="600" fill="#059669">是</text>
      <text x="720" y="120" textAnchor="middle" fontSize="11" fontWeight="600" fill="#059669">是</text>

      {/* POST */}
      <rect x="20" y="145" width="760" height="50" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <rect x="20" y="145" width="120" height="50" rx="6" fill="url(#ilh-hm-post)" />
      <text x="80" y="175" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">POST</text>
      <text x="220" y="167" textAnchor="middle" fontSize="11" fill="#78350f">传输实体主体</text>
      <text x="220" y="183" textAnchor="middle" fontSize="10" fill="#d97706">创建资源</text>
      <text x="400" y="175" textAnchor="middle" fontSize="11" fill="#78350f">有</text>
      <text x="520" y="175" textAnchor="middle" fontSize="11" fill="#b45309">否</text>
      <text x="620" y="175" textAnchor="middle" fontSize="11" fill="#b45309">否</text>
      <text x="720" y="175" textAnchor="middle" fontSize="11" fill="#b45309">否</text>

      {/* PUT */}
      <rect x="20" y="200" width="760" height="50" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
      <rect x="20" y="200" width="120" height="50" rx="6" fill="url(#ilh-hm-put)" />
      <text x="80" y="230" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">PUT</text>
      <text x="220" y="222" textAnchor="middle" fontSize="11" fill="#1e3a8a">传输文件</text>
      <text x="220" y="238" textAnchor="middle" fontSize="10" fill="#2563eb">覆盖/替换资源</text>
      <text x="400" y="230" textAnchor="middle" fontSize="11" fill="#1e3a8a">有</text>
      <text x="520" y="230" textAnchor="middle" fontSize="11" fill="#b45309">否</text>
      <text x="620" y="230" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1d4ed8">是</text>
      <text x="720" y="230" textAnchor="middle" fontSize="11" fill="#b45309">否</text>

      {/* DELETE */}
      <rect x="20" y="255" width="760" height="50" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="1" />
      <rect x="20" y="255" width="120" height="50" rx="6" fill="url(#ilh-hm-del)" />
      <text x="80" y="285" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">DELETE</text>
      <text x="220" y="277" textAnchor="middle" fontSize="11" fill="#991b1b">删除资源</text>
      <text x="220" y="293" textAnchor="middle" fontSize="10" fill="#ef4444">按URI删除</text>
      <text x="400" y="285" textAnchor="middle" fontSize="11" fill="#991b1b">可有可无</text>
      <text x="520" y="285" textAnchor="middle" fontSize="11" fill="#b45309">否</text>
      <text x="620" y="285" textAnchor="middle" fontSize="11" fontWeight="600" fill="#dc2626">是</text>
      <text x="720" y="285" textAnchor="middle" fontSize="11" fill="#b45309">否</text>

      {/* HEAD / OPTIONS */}
      <rect x="20" y="310" width="760" height="50" rx="6" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1" />
      <rect x="20" y="310" width="120" height="50" rx="6" fill="url(#ilh-hm-other)" />
      <text x="80" y="334" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">HEAD</text>
      <text x="80" y="350" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">OPTIONS</text>
      <text x="220" y="332" textAnchor="middle" fontSize="11" fill="#4c1d95">HEAD: 获取首部</text>
      <text x="220" y="348" textAnchor="middle" fontSize="11" fill="#4c1d95">OPTIONS: 查询支持的方法</text>
      <text x="400" y="340" textAnchor="middle" fontSize="11" fill="#4c1d95">无</text>
      <text x="520" y="340" textAnchor="middle" fontSize="11" fontWeight="600" fill="#6d28d9">是</text>
      <text x="620" y="340" textAnchor="middle" fontSize="11" fontWeight="600" fill="#6d28d9">是</text>
      <text x="720" y="340" textAnchor="middle" fontSize="11" fill="#4c1d95">—</text>

      {/* 概念说明 */}
      <rect x="20" y="380" width="370" height="85" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="205" y="403" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">安全方法</text>
      <text x="205" y="423" textAnchor="middle" fontSize="11" fill="#475569">不会改变服务器资源的操作</text>
      <text x="205" y="440" textAnchor="middle" fontSize="11" fill="#475569">GET / HEAD / OPTIONS = 安全</text>
      <text x="205" y="457" textAnchor="middle" fontSize="11" fill="#64748b">POST / PUT / DELETE = 不安全</text>

      <rect x="410" y="380" width="370" height="85" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="595" y="403" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">幂等性</text>
      <text x="595" y="423" textAnchor="middle" fontSize="11" fill="#475569">同一请求执行N次效果等同于执行1次</text>
      <text x="595" y="440" textAnchor="middle" fontSize="11" fill="#475569">GET / PUT / DELETE / HEAD = 幂等</text>
      <text x="595" y="457" textAnchor="middle" fontSize="11" fill="#64748b">POST = 非幂等（多次提交创建多份资源）</text>
    </svg>
  );
}
