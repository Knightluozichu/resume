"use client";

export function HdgUrlResourceDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="URL与资源定位">
      <defs>
        <linearGradient id="hdg-url-scheme" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="hdg-url-host" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="hdg-url-path" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="hdg-url-query" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="hdg-url-frag" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="hdg-url-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">URL 与资源定位</text>

      {/* URL 分解图 */}
      <text x="400" y="58" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">URL 语法分解</text>

      <rect x="60" y="72" width="100" height="36" rx="6" fill="url(#hdg-url-scheme)" opacity="0.9" />
      <text x="110" y="95" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">https</text>

      <text x="172" y="95" fontSize="14" fill="#64748b">://</text>

      <rect x="200" y="72" width="180" height="36" rx="6" fill="url(#hdg-url-host)" opacity="0.9" />
      <text x="290" y="95" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">www.example.com:443</text>

      <rect x="390" y="72" width="180" height="36" rx="6" fill="url(#hdg-url-path)" opacity="0.9" />
      <text x="480" y="95" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">/api/v1/users</text>

      <rect x="580" y="72" width="100" height="36" rx="6" fill="url(#hdg-url-query)" opacity="0.9" />
      <text x="630" y="95" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">?page=1</text>

      <rect x="690" y="72" width="80" height="36" rx="6" fill="url(#hdg-url-frag)" opacity="0.9" />
      <text x="730" y="95" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">#section</text>

      {/* 标注 */}
      <text x="110" y="126" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e40af">scheme（方案）</text>
      <text x="110" y="140" textAnchor="middle" fontSize="9" fill="#64748b">协议：http/https/ftp</text>

      <text x="290" y="126" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0e7490">host:port（主机:端口）</text>
      <text x="290" y="140" textAnchor="middle" fontSize="9" fill="#64748b">服务器地址 + 端口</text>

      <text x="480" y="126" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">path（路径）</text>
      <text x="480" y="140" textAnchor="middle" fontSize="9" fill="#64748b">服务器资源定位</text>

      <text x="630" y="126" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400e">query（查询）</text>
      <text x="630" y="140" textAnchor="middle" fontSize="9" fill="#64748b">参数键值对</text>

      <text x="730" y="126" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5b21b6">fragment（片段）</text>
      <text x="730" y="140" textAnchor="middle" fontSize="9" fill="#64748b">客户端锚点</text>

      {/* URL 类型对比 */}
      <text x="400" y="172" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">绝对 URL vs 相对 URL</text>

      <rect x="20" y="184" width="370" height="120" rx="8" fill="url(#hdg-url-scheme)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="35" y="206" fontSize="12" fontWeight="700" fill="#1e40af">绝对 URL（Absolute）</text>
      <text x="35" y="226" fontSize="10" fill="#475569">包含完整信息，可独立定位资源</text>
      <rect x="35" y="234" width="340" height="22" rx="4" fill="#e0e7ff" />
      <text x="45" y="249" fontSize="10" fontFamily="monospace" fill="#3730a3">https://example.com/docs/guide.html</text>
      <text x="35" y="272" fontSize="10" fill="#475569">scheme + host + path 全部存在</text>
      <text x="35" y="288" fontSize="10" fill="#475569">任何位置都能直接使用</text>

      <rect x="410" y="184" width="370" height="120" rx="8" fill="url(#hdg-url-path)" opacity="0.08" stroke="#10b981" strokeWidth="1.5" />
      <text x="425" y="206" fontSize="12" fontWeight="700" fill="#065f46">相对 URL（Relative）</text>
      <text x="425" y="226" fontSize="10" fill="#475569">需参照基础 URL 才能定位</text>
      <rect x="425" y="234" width="100" height="22" rx="4" fill="#d1fae5" />
      <text x="435" y="249" fontSize="10" fontFamily="monospace" fill="#065f46">guide.html</text>
      <rect x="535" y="234" width="120" height="22" rx="4" fill="#d1fae5" />
      <text x="545" y="249" fontSize="10" fontFamily="monospace" fill="#065f46">../images/x.png</text>
      <text x="425" y="272" fontSize="10" fill="#475569">省略 scheme 和 host，继承基础 URL</text>
      <text x="425" y="288" fontSize="10" fill="#475569">./ 同级  ../ 上级  / 根路径</text>

      {/* URL 编码 */}
      <text x="400" y="332" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">URL 编码（百分号编码）</text>

      <rect x="20" y="344" width="760" height="80" rx="8" fill="#fefce8" stroke="#facc15" strokeWidth="1.5" />
      <text x="40" y="366" fontSize="11" fontWeight="700" fill="#854d0e">规则：非 ASCII 字符和不安全字符用 %XX 十六进制编码</text>

      <rect x="40" y="376" width="220" height="36" rx="6" fill="#fff" stroke="#fde047" strokeWidth="1" />
      <text x="50" y="391" fontSize="10" fill="#475569">空格</text>
      <text x="120" y="391" fontSize="10" fill="#64748b">→</text>
      <text x="140" y="391" fontSize="10" fontFamily="monospace" fontWeight="700" fill="#dc2626">%20</text>
      <text x="50" y="406" fontSize="9" fill="#94a3b8">或 + （query 中）</text>

      <rect x="280" y="376" width="220" height="36" rx="6" fill="#fff" stroke="#fde047" strokeWidth="1" />
      <text x="290" y="391" fontSize="10" fill="#475569">中文"中"</text>
      <text x="360" y="391" fontSize="10" fill="#64748b">→</text>
      <text x="380" y="391" fontSize="10" fontFamily="monospace" fontWeight="700" fill="#dc2626">%E4%B8%AD</text>
      <text x="290" y="406" fontSize="9" fill="#94a3b8">UTF-8 三字节编码</text>

      <rect x="520" y="376" width="240" height="36" rx="6" fill="#fff" stroke="#fde047" strokeWidth="1" />
      <text x="530" y="391" fontSize="10" fill="#475569">&amp; 符号</text>
      <text x="590" y="391" fontSize="10" fill="#64748b">→</text>
      <text x="610" y="391" fontSize="10" fontFamily="monospace" fontWeight="700" fill="#dc2626">%26</text>
      <text x="530" y="406" fontSize="9" fill="#94a3b8">query 中需编码避免歧义</text>

      {/* 资源解析流程 */}
      <rect x="20" y="438" width="760" height="70" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="462" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">资源解析流程</text>
      <text x="400" y="484" textAnchor="middle" fontSize="11" fill="#475569">URL 解析 → DNS 查询主机 IP → 建立连接 → 发送请求路径 → 服务器定位资源 → 返回响应</text>
      <text x="400" y="500" textAnchor="middle" fontSize="10" fill="#64748b">路径映射：文件系统路径 / 数据库查询 / 动态脚本执行 / 重定向到其他 URL</text>
    </svg>
  );
}
