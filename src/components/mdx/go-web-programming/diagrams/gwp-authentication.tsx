/**
 * <GwpAuthenticationDiagram>: Web 认证流程对比。
 *
 * 展示 Session-Cookie 认证与 JWT 认证两种模式的完整流程，
 * 包括登录、令牌签发、后续请求验证。
 * 纯静态 SVG，Server Component。viewBox 720x400。
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

export function GwpAuthenticationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="Web 认证流程对比图。左侧展示 Session-Cookie 认证流程，右侧展示 JWT 认证流程。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            认证流程对比：Session-Cookie vs JWT
          </text>

          {/* 分隔线 */}
          <line x1={360} y1={48} x2={360} y2={380} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* === 左侧：Session-Cookie === */}
          <text x={180} y={56} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>Session-Cookie</text>

          <rect x={30} y={70} width={150} height={40} rx="6" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1" />
          <text x={105} y={86} textAnchor="middle" fontSize="10" fontWeight="600" fill={accent}>1. POST /login</text>
          <text x={105} y={100} textAnchor="middle" fontSize="9" fill={secondary}>用户名+密码</text>

          <line x1={105} y1={110} x2={105} y2={122} stroke={accent} strokeWidth="1" markerEnd="url(#gwp-auth-a1)" />

          <rect x={30} y={126} width={150} height={40} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={105} y={142} textAnchor="middle" fontSize="10" fontWeight="600" fill={primary}>2. 服务器创建</text>
          <text x={105} y={156} textAnchor="middle" fontSize="9" fill={secondary}>Session + Set-Cookie</text>

          <line x1={105} y1={166} x2={105} y2={178} stroke={accent} strokeWidth="1" markerEnd="url(#gwp-auth-a1)" />

          <rect x={30} y={182} width={150} height={40} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={105} y={198} textAnchor="middle" fontSize="10" fontWeight="600" fill={primary}>3. 浏览器存储</text>
          <text x={105} y={212} textAnchor="middle" fontSize="9" fontFamily="monospace" fill={secondary}>Cookie: session=abc</text>

          <line x1={105} y1={222} x2={105} y2={234} stroke={accent} strokeWidth="1" markerEnd="url(#gwp-auth-a1)" />

          <rect x={30} y={238} width={150} height={40} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={105} y={254} textAnchor="middle" fontSize="10" fontWeight="600" fill={primary}>4. 后续请求带</text>
          <text x={105} y={268} textAnchor="middle" fontSize="9" fill={secondary}>Cookie 自动携带</text>

          <line x1={105} y1={278} x2={105} y2={290} stroke={accent} strokeWidth="1" markerEnd="url(#gwp-auth-a1)" />

          <rect x={30} y={294} width={150} height={40} rx="6" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1" />
          <text x={105} y={310} textAnchor="middle" fontSize="10" fontWeight="600" fill={success}>5. 查 Session</text>
          <text x={105} y={324} textAnchor="middle" fontSize="9" fill={secondary}>有状态：服务器存</text>

          <text x={105} y={356} textAnchor="middle" fontSize="9" fill={danger}>需 Session 存储</text>
          <text x={105} y={370} textAnchor="middle" fontSize="9" fill={danger}>扩展需共享 Session</text>

          {/* === 右侧：JWT === */}
          <text x={540} y={56} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>JWT (JSON Web Token)</text>

          <rect x={390} y={70} width={150} height={40} rx="6" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1" />
          <text x={465} y={86} textAnchor="middle" fontSize="10" fontWeight="600" fill={success}>1. POST /login</text>
          <text x={465} y={100} textAnchor="middle" fontSize="9" fill={secondary}>用户名+密码</text>

          <line x1={465} y1={110} x2={465} y2={122} stroke={success} strokeWidth="1" markerEnd="url(#gwp-auth-a2)" />

          <rect x={390} y={126} width={150} height={40} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={465} y={142} textAnchor="middle" fontSize="10" fontWeight="600" fill={primary}>2. 服务器签发</text>
          <text x={465} y={156} textAnchor="middle" fontSize="9" fontFamily="monospace" fill={secondary}>Header.Payload.Sig</text>

          <line x1={465} y1={166} x2={465} y2={178} stroke={success} strokeWidth="1" markerEnd="url(#gwp-auth-a2)" />

          <rect x={390} y={182} width={150} height={40} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={465} y={198} textAnchor="middle" fontSize="10" fontWeight="600" fill={primary}>3. 客户端存储</text>
          <text x={465} y={212} textAnchor="middle" fontSize="9" fontFamily="monospace" fill={secondary}>localStorage</text>

          <line x1={465} y1={222} x2={465} y2={234} stroke={success} strokeWidth="1" markerEnd="url(#gwp-auth-a2)" />

          <rect x={390} y={238} width={150} height={40} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={465} y={254} textAnchor="middle" fontSize="10" fontWeight="600" fill={primary}>4. 后续请求</text>
          <text x={465} y={268} textAnchor="middle" fontSize="9" fontFamily="monospace" fill={secondary}>Authorization: Bearer</text>

          <line x1={465} y1={278} x2={465} y2={290} stroke={success} strokeWidth="1" markerEnd="url(#gwp-auth-a2)" />

          <rect x={390} y={294} width={150} height={40} rx="6" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1" />
          <text x={465} y={310} textAnchor="middle" fontSize="10" fontWeight="600" fill={success}>5. 验签+解析</text>
          <text x={465} y={324} textAnchor="middle" fontSize="9" fill={secondary}>无状态：验签即可</text>

          <text x={465} y={356} textAnchor="middle" fontSize="9" fill={success}>无状态，易扩展</text>
          <text x={465} y={370} textAnchor="middle" fontSize="9" fill={warning}>需处理过期/吊销</text>

          {/* 密码安全提示 */}
          <rect x={195} y={340} width={330} height={36} rx="5" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1" />
          <text x={360} y={356} textAnchor="middle" fontSize="10" fill={warning}>密码存储：bcrypt / argon2 — 永不明文、永不 MD5</text>
          <text x={360} y={370} textAnchor="middle" fontSize="10" fill={warning}>HTTPS 必须开启 — 防中间人窃取令牌</text>

          <defs>
            <marker id="gwp-auth-a1" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
            <marker id="gwp-auth-a2" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Session-Cookie 有状态（服务器存），JWT 无状态（令牌自包含）。
      </figcaption>
    </figure>
  );
}
