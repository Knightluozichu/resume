/**
 * <JfsAuthSecurityDiagram>：JWT 结构与 OAuth 2.0 授权码流程图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function JfsAuthSecurityDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="JWT 结构与 OAuth 授权码流程图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            认证与安全：JWT 结构 + OAuth 流程
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            认证（你是谁）vs 授权（你能做什么）
          </text>

          {/* JWT 三段 */}
          <text x={VIEW_W / 2} y="76" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">JWT 三段结构（base64.签名）</text>

          <rect x="40" y="88" width="200" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="140" y="110" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">Header</text>
          <text x="140" y="128" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">算法 + 类型</text>

          <text x="248" y="118" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">.</text>

          <rect x="260" y="88" width="220" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="110" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">Payload</text>
          <text x="370" y="128" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">userId/role/exp（非加密！）</text>

          <text x="488" y="118" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">.</text>

          <rect x="500" y="88" width="200" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="600" y="110" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">Signature</text>
          <text x="600" y="128" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">密钥签名（防篡改）</text>

          <text x={VIEW_W / 2} y="162" textAnchor="middle" fontSize="10" fill="var(--danger)">
            Payload 只是 base64 编码，非加密——不放敏感信息；签发后无法主动吊销
          </text>

          {/* OAuth 流程 */}
          <text x={VIEW_W / 2} y="190" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">OAuth 2.0 授权码流程（第三方登录）</text>

          <rect x="40" y="204" width="150" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="115" y="224" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">1. 前端跳转</text>
          <text x="115" y="240" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">用户登录授权</text>

          <text x="200" y="230" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="215" y="204" width="150" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="290" y="224" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">2. 回调带 code</text>
          <text x="290" y="240" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">到后端 redirect_uri</text>

          <text x="375" y="230" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="390" y="204" width="160" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="470" y="224" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">3. code+secret</text>
          <text x="470" y="240" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">换 token（服务端）</text>

          <text x="560" y="230" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="575" y="204" width="125" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="637" y="224" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">4. 取用户</text>
          <text x="637" y="240" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">access_token</text>

          <text x={VIEW_W / 2} y="276" textAnchor="middle" fontSize="10" fill="var(--danger)">
            client_secret 只在服务端——前端是公开环境，secret 泄露会被冒充
          </text>

          {/* CORS / CSRF / XSS */}
          <rect x="40" y="296" width="660" height="120" rx="8" fill="var(--text-tertiary)" fillOpacity="0.05" stroke="var(--border)" strokeWidth="1" />
          <text x="370" y="320" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">Web 安全三大基线</text>

          <rect x="60" y="336" width="195" height="64" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="157" y="358" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">CORS</text>
          <text x="157" y="376" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">浏览器跨域放行机制</text>
          <text x="157" y="390" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">origin 显式列白名单</text>

          <rect x="272" y="336" width="195" height="64" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="369" y="358" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">CSRF</text>
          <text x="369" y="376" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">诱导已登录用户发请求</text>
          <text x="369" y="390" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">SameSite Cookie / Token</text>

          <rect x="484" y="336" width="195" height="64" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="581" y="358" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">XSS</text>
          <text x="581" y="376" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">注入恶意脚本窃数据</text>
          <text x="581" y="390" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">转义 / CSP 防御</text>

          <text x={VIEW_W / 2} y="440" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            无状态认证易扩展但难吊销；生产 CORS 禁用 origin: "*"
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        JWT三段结构与OAuth授权码流程，CORS/CSRF/XSS三大安全基线
      </figcaption>
    </figure>
  );
}
