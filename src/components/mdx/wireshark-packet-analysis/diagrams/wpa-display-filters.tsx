"use client";

export function WpaDisplayFiltersDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="显示过滤器表达式结构">
      <defs>
        <linearGradient id="wpa-df-expr" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="wpa-df-op" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="wpa-df-func" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="wpa-df-ex" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">显示过滤器表达式结构</text>

      {/* 表达式拆解 */}
      <text x="400" y="56" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">表达式组成：字段名 + 比较运算符 + 值</text>

      <rect x="20" y="70" width="760" height="56" rx="8" fill="url(#wpa-df-expr)" opacity="0.10" stroke="#2563eb" strokeWidth="1.5" />
      <text x="50" y="96" fontSize="13" fontWeight="700" fill="#1e40af" fontFamily="monospace">ip.addr</text>
      <text x="130" y="96" fontSize="14" fontWeight="700" fill="#64748b">==</text>
      <text x="170" y="96" fontSize="13" fill="#1e40af" fontFamily="monospace">192.168.1.10</text>
      <text x="320" y="96" fontSize="14" fontWeight="700" fill="#64748b">&amp;&amp;</text>
      <text x="360" y="96" fontSize="13" fontWeight="700" fill="#1e40af" fontFamily="monospace">tcp.port</text>
      <text x="440" y="96" fontSize="14" fontWeight="700" fill="#64748b">==</text>
      <text x="480" y="96" fontSize="13" fill="#1e40af" fontFamily="monospace">443</text>
      <text x="540" y="96" fontSize="14" fontWeight="700" fill="#64748b">&amp;&amp;</text>
      <text x="580" y="96" fontSize="13" fontWeight="700" fill="#1e40af" fontFamily="monospace">http</text>
      <text x="50" y="116" fontSize="10" fill="#94a3b8">字段名        运算符    值            逻辑与       字段名        运算符    值        逻辑与    协议过滤</text>

      {/* 运算符表 */}
      <rect x="20" y="140" width="370" height="200" rx="10" fill="url(#wpa-df-op)" opacity="0.10" stroke="#0891b2" strokeWidth="1.5" />
      <text x="205" y="164" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0e7490">比较运算符</text>
      <text x="40" y="188" fontSize="11" fontWeight="600" fill="#0e7490" fontFamily="monospace">==</text>
      <text x="90" y="188" fontSize="10" fill="#475569">等于（eq）</text>
      <text x="40" y="208" fontSize="11" fontWeight="600" fill="#0e7490" fontFamily="monospace">!=</text>
      <text x="90" y="208" fontSize="10" fill="#475569">不等于（ne）</text>
      <text x="40" y="228" fontSize="11" fontWeight="600" fill="#0e7490" fontFamily="monospace">&gt;</text>
      <text x="90" y="228" fontSize="10" fill="#475569">大于（gt）</text>
      <text x="40" y="248" fontSize="11" fontWeight="600" fill="#0e7490" fontFamily="monospace">&lt;</text>
      <text x="90" y="248" fontSize="10" fill="#475569">小于（lt）</text>
      <text x="40" y="268" fontSize="11" fontWeight="600" fill="#0e7490" fontFamily="monospace">&gt;=</text>
      <text x="90" y="268" fontSize="10" fill="#475569">大于等于（ge）</text>
      <text x="40" y="288" fontSize="11" fontWeight="600" fill="#0e7490" fontFamily="monospace">&lt;=</text>
      <text x="90" y="288" fontSize="10" fill="#475569">小于等于（le）</text>
      <text x="40" y="312" fontSize="11" fontWeight="600" fill="#0e7490" fontFamily="monospace">contains</text>
      <text x="140" y="312" fontSize="10" fill="#475569">包含子串</text>
      <text x="40" y="332" fontSize="11" fontWeight="600" fill="#0e7490" fontFamily="monospace">matches</text>
      <text x="140" y="332" fontSize="10" fill="#475569">正则匹配</text>

      {/* 逻辑运算符 */}
      <rect x="410" y="140" width="370" height="200" rx="10" fill="url(#wpa-df-func)" opacity="0.10" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="595" y="164" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">逻辑运算符与函数</text>
      <text x="430" y="188" fontSize="11" fontWeight="600" fill="#5b21b6" fontFamily="monospace">&amp;&amp;  (and)</text>
      <text x="540" y="188" fontSize="10" fill="#475569">逻辑与</text>
      <text x="430" y="208" fontSize="11" fontWeight="600" fill="#5b21b6" fontFamily="monospace">||  (or)</text>
      <text x="540" y="208" fontSize="10" fill="#475569">逻辑或</text>
      <text x="430" y="228" fontSize="11" fontWeight="600" fill="#5b21b6" fontFamily="monospace">!   (not)</text>
      <text x="540" y="228" fontSize="10" fill="#475569">逻辑非</text>
      <text x="430" y="252" fontSize="11" fontWeight="600" fill="#5b21b6" fontFamily="monospace">ip.src == x &amp;&amp; ip.dst == y</text>
      <text x="430" y="270" fontSize="10" fill="#94a3b8">组合条件</text>
      <text x="430" y="292" fontSize="11" fontWeight="600" fill="#5b21b6" fontFamily="monospace">tcp.flags.syn == 1</text>
      <text x="430" y="310" fontSize="10" fill="#94a3b8">TCP 标志位过滤</text>
      <text x="430" y="332" fontSize="11" fontWeight="600" fill="#5b21b6" fontFamily="monospace">http.response.code == 404</text>

      {/* 常用示例 */}
      <rect x="20" y="354" width="760" height="230" rx="10" fill="url(#wpa-df-ex)" opacity="0.08" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="378" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">常用显示过滤器示例</text>

      <text x="40" y="402" fontSize="10" fill="#64748b" fontFamily="monospace">ip.addr == 10.0.0.1</text>
      <text x="280" y="402" fontSize="10" fill="#94a3b8">源或目的 IP 为 10.0.0.1</text>
      <text x="40" y="422" fontSize="10" fill="#64748b" fontFamily="monospace">tcp.port == 80 || tcp.port == 443</text>
      <text x="280" y="422" fontSize="10" fill="#94a3b8">HTTP 或 HTTPS 流量</text>
      <text x="40" y="442" fontSize="10" fill="#64748b" fontFamily="monospace">http.request.method == "POST"</text>
      <text x="280" y="442" fontSize="10" fill="#94a3b8">所有 HTTP POST 请求</text>
      <text x="40" y="462" fontSize="10" fill="#64748b" fontFamily="monospace">dns.qry.name contains "google"</text>
      <text x="280" y="462" fontSize="10" fill="#94a3b8">DNS 查询含 google 的请求</text>
      <text x="40" y="482" fontSize="10" fill="#64748b" fontFamily="monospace">tcp.analysis.flags</text>
      <text x="280" y="482" fontSize="10" fill="#94a3b8">TCP 异常（重传/乱序/重复）</text>
      <text x="40" y="502" fontSize="10" fill="#64748b" fontFamily="monospace">tcp.flags.reset == 1</text>
      <text x="280" y="502" fontSize="10" fill="#94a3b8">TCP RST 重置包</text>
      <text x="40" y="522" fontSize="10" fill="#64748b" fontFamily="monospace">http.content_type contains "json"</text>
      <text x="280" y="522" fontSize="10" fill="#94a3b8">JSON 格式响应</text>
      <text x="40" y="542" fontSize="10" fill="#64748b" fontFamily="monospace">tls.handshake.type == 1</text>
      <text x="280" y="542" fontSize="10" fill="#94a3b8">TLS Client Hello</text>
      <text x="40" y="562" fontSize="10" fill="#64748b" fontFamily="monospace">frame.time_delta &gt; 1</text>
      <text x="280" y="562" fontSize="10" fill="#94a3b8">间隔超过 1 秒的包</text>
      <text x="40" y="580" fontSize="10" fill="#92400e">提示：过滤器栏变绿=语法正确，变红=语法错误</text>
    </svg>
  );
}
