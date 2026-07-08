/**
 * <PopNetworkAutomationDiagram>：requests 请求-响应流程与健壮性要点。
 *
 * 上半：requests.get → 服务器 → Response → 解析的请求-响应流程。
 * 下半：超时、重试、会话三个健壮性要点。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×400，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 400;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

const FLOW = [
  { x: 36, w: 160, color: accent, title: "发起请求", body: "requests.get(url,\n  timeout=10)" },
  { x: 220, w: 140, color: secondary, title: "服务器", body: "处理并返回\nHTTP 响应" },
  { x: 380, w: 140, color: success, title: "Response 对象", body: "r.status_code\nr.text / r.json()" },
  { x: 540, w: 144, color: warning, title: "解析使用", body: "取数据\n进入业务逻辑" },
];

const TIPS = [
  { x: 48, w: 200, color: danger, title: "超时 timeout", body: "必设！避免请求挂死\nconnect/read 双超时" },
  { x: 260, w: 200, color: danger, title: "重试 retry", body: "urllib3 Retry 处理\n5xx/连接错误自动重试" },
  { x: 472, w: 200, color: accent, title: "会话 Session", body: "复用 TCP 连接\n带 Cookie/认证" },
];

export function PopNetworkAutomationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="requests请求-响应流程：发起请求到服务器返回Response对象再解析；健壮性三要点超时、重试、会话。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            requests：HTTP 请求-响应流程
          </text>
          <text x={VIEW_W / 2} y={52} textAnchor="middle" fontSize="11" fill={secondary}>
            网络自动化的基石——调用 API、抓取页面、对接服务都用它
          </text>

          {/* 请求-响应流程 */}
          <text x={48} y={80} fontSize="12" fontWeight="700" fill={secondary}>
            请求-响应流程
          </text>
          {FLOW.map((f, i) => {
            const lines = f.body.split("\n");
            return (
              <g key={f.title}>
                <rect x={f.x} y={88} width={f.w} height={72} rx="8" fill={f.color} fillOpacity={f.color === secondary ? "0.06" : "0.10"} stroke={f.color} strokeWidth="1.4" strokeOpacity="0.55" />
                <text x={f.x + f.w / 2} y={110} textAnchor="middle" fontSize="12" fontWeight="700" fill={f.color === secondary ? primary : f.color}>
                  {f.title}
                </text>
                {lines.map((ln, li) => (
                  <text key={li} x={f.x + f.w / 2} y={130 + li * 16} textAnchor="middle" fontSize="10" fill={primary}>
                    {ln}
                  </text>
                ))}
                {i < FLOW.length - 1 && (
                  <line x1={f.x + f.w + 2} y1={124} x2={FLOW[i + 1].x - 6} y2={124} stroke={accent} strokeWidth="1.6" markerEnd="url(#pop-na-arrow)" />
                )}
              </g>
            );
          })}

          {/* 健壮性三要点 */}
          <text x={48} y={196} fontSize="12" fontWeight="700" fill={secondary}>
            健壮性三要点（生产必配）
          </text>
          <line x1={32} y1={190} x2={VIEW_W - 32} y2={190} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          {TIPS.map((t) => {
            const lines = t.body.split("\n");
            return (
              <g key={t.title}>
                <rect x={t.x} y={208} width={t.w} height={92} rx="8" fill={elevated} stroke={t.color} strokeWidth="1.4" strokeOpacity="0.5" />
                <text x={t.x + t.w / 2} y={234} textAnchor="middle" fontSize="13" fontWeight="700" fill={t.color}>
                  {t.title}
                </text>
                {lines.map((ln, li) => (
                  <text key={li} x={t.x + t.w / 2} y={258 + li * 18} textAnchor="middle" fontSize="11" fill={primary}>
                    {ln}
                  </text>
                ))}
              </g>
            );
          })}

          <defs>
            <marker id="pop-na-arrow" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* 底部总结 */}
          <line x1={32} y1={320} x2={VIEW_W - 32} y2={320} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={342} textAnchor="middle" fontSize="11" fill={secondary}>
            永远设 timeout，避免请求挂死拖垮脚本；重试和会话让批量调用更稳更快
          </text>
          <text x={VIEW_W / 2} y={362} textAnchor="middle" fontSize="11" fill={secondary}>
            r.raise_for_status() 让 4xx/5xx 抛异常，便于统一错误处理
          </text>
          <text x={VIEW_W / 2} y={382} textAnchor="middle" fontSize="11" fill={secondary}>
            JSON API 用 r.json()；HTML 用 r.text 交给 BeautifulSoup 解析
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        requests 的请求-响应流程与健壮性要点。
      </figcaption>
    </figure>
  );
}
