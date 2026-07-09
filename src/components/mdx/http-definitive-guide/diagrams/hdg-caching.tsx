"use client";

export function HdgCachingDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="HTTP缓存体系">
      <defs>
        <linearGradient id="hdg-cache-hit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="hdg-cache-miss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="hdg-cache-client" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="hdg-cache-server" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="hdg-cache-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">HTTP 缓存体系</text>

      {/* 缓存命中/未命中流程 */}
      <text x="400" y="56" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">缓存命中与未命中</text>

      {/* 客户端 */}
      <rect x="20" y="68" width="80" height="200" rx="8" fill="url(#hdg-cache-client)" opacity="0.9" />
      <text x="60" y="160" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">客户端</text>
      <text x="60" y="178" textAnchor="middle" fontSize="10" fill="#bfdbfe">浏览器</text>

      {/* 缓存 */}
      <rect x="180" y="68" width="120" height="200" rx="8" fill="url(#hdg-cache-miss)" opacity="0.85" />
      <text x="240" y="100" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">缓存层</text>
      <text x="240" y="120" textAnchor="middle" fontSize="10" fill="#fef3c7">代理/CDN</text>

      <rect x="190" y="136" width="100" height="56" rx="6" fill="#fff" stroke="#fcd34d" strokeWidth="1.5" />
      <text x="240" y="156" textAnchor="middle" fontSize="10" fontWeight="700" fill="#059669">命中（Hit）</text>
      <text x="240" y="172" textAnchor="middle" fontSize="9" fill="#475569">直接返回副本</text>
      <text x="240" y="184" textAnchor="middle" fontSize="9" fill="#475569">低延迟</text>

      <rect x="190" y="200" width="100" height="56" rx="6" fill="#fff" stroke="#fcd34d" strokeWidth="1.5" />
      <text x="240" y="220" textAnchor="middle" fontSize="10" fontWeight="700" fill="#d97706">未命中（Miss）</text>
      <text x="240" y="236" textAnchor="middle" fontSize="9" fill="#475569">向源服务器请求</text>
      <text x="240" y="248" textAnchor="middle" fontSize="9" fill="#475569">存副本后返回</text>

      {/* 服务器 */}
      <rect x="380" y="68" width="80" height="200" rx="8" fill="url(#hdg-cache-server)" opacity="0.9" />
      <text x="420" y="160" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">源服务器</text>
      <text x="420" y="178" textAnchor="middle" fontSize="10" fill="#ddd6fe">原始资源</text>

      {/* 箭头 */}
      <path d="M105 108 L175 108" stroke="#10b981" strokeWidth="2" markerEnd="url(#hdg-cache-arrow)" />
      <text x="140" y="100" textAnchor="middle" fontSize="9" fill="#059669">请求</text>

      <path d="M175 128 L105 128" stroke="#10b981" strokeWidth="2" strokeDasharray="4,3" markerEnd="url(#hdg-cache-arrow)" />
      <text x="140" y="146" textAnchor="middle" fontSize="9" fill="#059669">命中返回</text>

      <path d="M305 218 L375 218" stroke="#d97706" strokeWidth="2" markerEnd="url(#hdg-cache-arrow)" />
      <text x="340" y="210" textAnchor="middle" fontSize="9" fill="#92400e">未命中请求</text>

      <path d="M375 248 L305 248" stroke="#d97706" strokeWidth="2" strokeDasharray="4,3" markerEnd="url(#hdg-cache-arrow)" />
      <text x="340" y="266" textAnchor="middle" fontSize="9" fill="#92400e">返回并缓存</text>

      {/* 缓存验证流程 */}
      <text x="620" y="56" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">缓存验证（条件请求）</text>

      <rect x="500" y="68" width="280" height="200" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      <rect x="515" y="82" width="250" height="30" rx="4" fill="#dbeafe" />
      <text x="640" y="101" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">1. 缓存副本过期（max-age 到期）</text>

      <path d="M640 115 L640 125" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-cache-arrow)" />

      <rect x="515" y="128" width="250" height="48" rx="4" fill="#fef3c7" />
      <text x="525" y="146" fontSize="10" fontWeight="600" fill="#92400e">2. 条件 GET 验证</text>
      <text x="525" y="162" fontSize="9" fontFamily="monospace" fill="#475569">If-Modified-Since: 日期</text>
      <text x="525" y="174" fontSize="9" fontFamily="monospace" fill="#475569">If-None-Match: ETag值</text>

      <path d="M640 179 L640 189" stroke="#64748b" strokeWidth="2" markerEnd="url(#hdg-cache-arrow)" />

      <rect x="515" y="192" width="120" height="32" rx="4" fill="#d1fae5" stroke="#6ee7b7" strokeWidth="1" />
      <text x="575" y="212" textAnchor="middle" fontSize="9" fontWeight="600" fill="#065f46">304 Not Modified</text>

      <rect x="650" y="192" width="120" height="32" rx="4" fill="#fee2e2" stroke="#fca5a5" strokeWidth="1" />
      <text x="710" y="212" textAnchor="middle" fontSize="9" fontWeight="600" fill="#991b1b">200 OK + 新内容</text>

      <text x="575" y="238" textAnchor="middle" fontSize="9" fill="#059669">未修改：用缓存</text>
      <text x="710" y="238" textAnchor="middle" fontSize="9" fill="#991b1b">已修改：用新副本</text>

      {/* Cache-Control 指令 */}
      <text x="400" y="300" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">Cache-Control 核心指令</text>

      <rect x="20" y="312" width="185" height="90" rx="6" fill="url(#hdg-cache-hit)" opacity="0.08" stroke="#10b981" strokeWidth="1.5" />
      <text x="35" y="334" fontSize="11" fontWeight="700" fill="#065f46">max-age=N</text>
      <text x="35" y="352" fontSize="10" fill="#475569">缓存新鲜期 N 秒</text>
      <text x="35" y="368" fontSize="10" fill="#475569">在此期间直接用缓存</text>
      <text x="35" y="388" fontSize="9" fill="#64748b">max-age=3600 = 1小时</text>

      <rect x="215" y="312" width="185" height="90" rx="6" fill="url(#hdg-cache-miss)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="230" y="334" fontSize="11" fontWeight="700" fill="#92400e">no-cache</text>
      <text x="230" y="352" fontSize="10" fill="#475569">不能直接用缓存</text>
      <text x="230" y="368" fontSize="10" fill="#475569">必须先向源验证</text>
      <text x="230" y="388" fontSize="9" fill="#64748b">每次都条件请求</text>

      <rect x="410" y="312" width="185" height="90" rx="6" fill="url(#hdg-cache-miss)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="425" y="334" fontSize="11" fontWeight="700" fill="#92400e">no-store</text>
      <text x="425" y="352" fontSize="10" fill="#475569">禁止缓存存储</text>
      <text x="425" y="368" fontSize="10" fill="#475569">敏感数据专用</text>
      <text x="425" y="388" fontSize="9" fill="#64748b">完全不写缓存</text>

      <rect x="605" y="312" width="175" height="90" rx="6" fill="url(#hdg-cache-hit)" opacity="0.08" stroke="#10b981" strokeWidth="1.5" />
      <text x="620" y="334" fontSize="11" fontWeight="700" fill="#065f46">public / private</text>
      <text x="620" y="352" fontSize="10" fill="#475569">public: 可被共享缓存</text>
      <text x="620" y="368" fontSize="10" fill="#475569">private: 仅浏览器缓存</text>
      <text x="620" y="388" fontSize="9" fill="#64748b">控制缓存可见范围</text>

      {/* 缓存层次 */}
      <rect x="20" y="418" width="760" height="128" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="442" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">缓存层次与新鲜度模型</text>

      <rect x="40" y="454" width="140" height="44" rx="6" fill="url(#hdg-cache-client)" opacity="0.15" stroke="#2563eb" strokeWidth="1" />
      <text x="110" y="474" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e40af">浏览器缓存</text>
      <text x="110" y="490" textAnchor="middle" fontSize="9" fill="#475569">离用户最近</text>

      <rect x="200" y="454" width="140" height="44" rx="6" fill="url(#hdg-cache-miss)" opacity="0.15" stroke="#f59e0b" strokeWidth="1" />
      <text x="270" y="474" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e">代理缓存</text>
      <text x="270" y="490" textAnchor="middle" fontSize="9" fill="#475569">企业/ISP 级</text>

      <rect x="360" y="454" width="140" height="44" rx="6" fill="url(#hdg-cache-hit)" opacity="0.15" stroke="#10b981" strokeWidth="1" />
      <text x="430" y="474" textAnchor="middle" fontSize="10" fontWeight="700" fill="#065f46">CDN 边缘缓存</text>
      <text x="430" y="490" textAnchor="middle" fontSize="9" fill="#475569">全球分布式</text>

      <rect x="520" y="454" width="140" height="44" rx="6" fill="url(#hdg-cache-server)" opacity="0.15" stroke="#8b5cf6" strokeWidth="1" />
      <text x="590" y="474" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5b21b6">源服务器</text>
      <text x="590" y="490" textAnchor="middle" fontSize="9" fill="#475569">原始资源</text>

      <text x="400" y="520" textAnchor="middle" fontSize="10" fill="#475569">新鲜度 = max-age 定义的有效期 | 过期后通过条件请求验证 | 命中率越高延迟越低</text>
      <text x="400" y="536" textAnchor="middle" fontSize="10" fill="#64748b">文档新鲜度（LM-Factor）= (Age / (Date - Last-Modified)) ，启发式过期计算</text>
    </svg>
  );
}
