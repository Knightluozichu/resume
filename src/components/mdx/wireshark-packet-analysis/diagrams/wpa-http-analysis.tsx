"use client";

export function WpaHttpAnalysisDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="HTTP流量分析流程">
      <defs>
        <linearGradient id="wpa-ha-req" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="wpa-ha-res" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="wpa-ha-tls" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="wpa-ha-tool" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="wpa-ha-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">{`HTTP 流量分析`}</text>

      {/* HTTP 请求/响应结构 */}
      <text x="200" y="56" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">{`HTTP 请求报文`}</text>

      <rect x="20" y="70" width="360" height="180" rx="8" fill="url(#wpa-ha-req)" opacity="0.08" stroke="#2563eb" strokeWidth="1.5" />
      <text x="40" y="94" fontSize="10" fill="#1e40af" fontFamily="monospace">{`GET /api/users?id=1 HTTP/1.1`}</text>
      <text x="40" y="108" fontSize="9" fill="#94a3b8">{`↑ 请求行：方法 + URI + 版本`}</text>
      <text x="40" y="128" fontSize="10" fill="#1e40af" fontFamily="monospace">{`Host: api.example.com`}</text>
      <text x="40" y="142" fontSize="10" fill="#1e40af" fontFamily="monospace">{`User-Agent: Mozilla/5.0`}</text>
      <text x="40" y="156" fontSize="10" fill="#1e40af" fontFamily="monospace">{`Accept: application/json`}</text>
      <text x="40" y="170" fontSize="10" fill="#1e40af" fontFamily="monospace">{`Authorization: Bearer abc123`}</text>
      <text x="40" y="184" fontSize="9" fill="#94a3b8">{`↑ 请求头（键值对）`}</text>
      <text x="40" y="204" fontSize="10" fill="#1e40af" fontFamily="monospace">{`(空行 CRLF)`}</text>
      <text x="40" y="224" fontSize="10" fill="#1e40af" fontFamily="monospace">{`[请求体 - GET 通常为空]`}</text>
      <text x="40" y="238" fontSize="9" fill="#94a3b8">{`↑ 请求体`}</text>

      <text x="600" y="56" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">{`HTTP 响应报文`}</text>

      <rect x="420" y="70" width="360" height="180" rx="8" fill="url(#wpa-ha-res)" opacity="0.08" stroke="#0891b2" strokeWidth="1.5" />
      <text x="440" y="94" fontSize="10" fill="#0e7490" fontFamily="monospace">{`HTTP/1.1 200 OK`}</text>
      <text x="440" y="108" fontSize="9" fill="#94a3b8">{`↑ 状态行：版本 + 状态码 + 短语`}</text>
      <text x="440" y="128" fontSize="10" fill="#0e7490" fontFamily="monospace">{`Content-Type: application/json`}</text>
      <text x="440" y="142" fontSize="10" fill="#0e7490" fontFamily="monospace">{`Content-Length: 127`}</text>
      <text x="440" y="156" fontSize="10" fill="#0e7490" fontFamily="monospace">{`Cache-Control: max-age=3600`}</text>
      <text x="440" y="170" fontSize="10" fill="#0e7490" fontFamily="monospace">{`Set-Cookie: session=xyz`}</text>
      <text x="440" y="184" fontSize="9" fill="#94a3b8">{`↑ 响应头`}</text>
      <text x="440" y="204" fontSize="10" fill="#0e7490" fontFamily="monospace">{`(空行 CRLF)`}</text>
      <text x="440" y="224" fontSize="10" fill="#0e7490" fontFamily="monospace">{`{"id":1,"name":"test"}`}</text>
      <text x="440" y="238" fontSize="9" fill="#94a3b8">{`↑ 响应体`}</text>

      {/* Wireshark 中的 HTTP 分析 */}
      <text x="400" y="276" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">{`Wireshark HTTP 分析流程`}</text>

      <rect x="20" y="290" width="760" height="44" rx="8" fill="url(#wpa-ha-tool)" opacity="0.10" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="40" y="316" fontSize="11" fontWeight="600" fill="#92400e">{`1. 过滤 HTTP 请求`}</text>
      <text x="200" y="316" fontSize="10" fill="#475569" fontFamily="monospace">{`http.request`}</text>
      <text x="400" y="316" fontSize="10" fill="#94a3b8">{`→ 只看请求包，快速定位客户端发了什么`}</text>

      <path d="M400 334 L400 338" stroke="#64748b" strokeWidth="2" markerEnd="url(#wpa-ha-arrow)" />

      <rect x="20" y="342" width="760" height="44" rx="8" fill="url(#wpa-ha-tool)" opacity="0.10" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="40" y="368" fontSize="11" fontWeight="600" fill="#92400e">{`2. 过滤特定状态码`}</text>
      <text x="200" y="368" fontSize="10" fill="#475569" fontFamily="monospace">{`http.response.code &gt;= 400`}</text>
      <text x="450" y="368" fontSize="10" fill="#94a3b8">{`→ 4xx/5xx 错误排查`}</text>

      <path d="M400 386 L400 390" stroke="#64748b" strokeWidth="2" markerEnd="url(#wpa-ha-arrow)" />

      <rect x="20" y="394" width="760" height="44" rx="8" fill="url(#wpa-ha-tool)" opacity="0.10" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="40" y="420" fontSize="11" fontWeight="600" fill="#92400e">{`3. 跟踪 HTTP 流`}</text>
      <text x="200" y="420" fontSize="10" fill="#475569">{`Analyze → Follow → HTTP Stream`}</text>
      <text x="450" y="420" fontSize="10" fill="#94a3b8">{`→ 查看完整请求+响应对话`}</text>

      <path d="M400 438 L400 442" stroke="#64748b" strokeWidth="2" markerEnd="url(#wpa-ha-arrow)" />

      <rect x="20" y="446" width="760" height="44" rx="8" fill="url(#wpa-ha-tool)" opacity="0.10" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="40" y="472" fontSize="11" fontWeight="600" fill="#92400e">{`4. 时间分析`}</text>
      <text x="200" y="472" fontSize="10" fill="#475569" fontFamily="monospace">{`http.time &gt; 2`}</text>
      <text x="350" y="472" fontSize="10" fill="#94a3b8">{`→ 响应时间超过 2 秒的慢请求`}</text>

      {/* HTTPS/TLS 解密 */}
      <rect x="20" y="500" width="370" height="84" rx="8" fill="url(#wpa-ha-tls)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="205" y="522" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">{`HTTPS 解密`}</text>
      <text x="40" y="542" fontSize="10" fill="#475569">{`SSLKEYLOGFILE 环境变量导出密钥`}</text>
      <text x="40" y="558" fontSize="10" fill="#475569">{`Wireshark → Preferences → TLS → 导入`}</text>
      <text x="40" y="574" fontSize="10" fill="#475569">{`解密后可看到 TLS 内的 HTTP 明文`}</text>

      <rect x="410" y="500" width="370" height="84" rx="8" fill="url(#wpa-ha-tls)" opacity="0.08" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="595" y="522" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">{`常用 HTTP 过滤器`}</text>
      <text x="430" y="542" fontSize="9" fill="#475569" fontFamily="monospace">{`http.request.method == "POST"`}</text>
      <text x="430" y="558" fontSize="9" fill="#475569" fontFamily="monospace">{`http.host contains "google"`}</text>
      <text x="430" y="574" fontSize="9" fill="#475569" fontFamily="monospace">{`http.content_type contains "json"`}</text>
    </svg>
  );
}
