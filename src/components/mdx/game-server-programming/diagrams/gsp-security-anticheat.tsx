/**
 * <GspSecurityAnticheatDiagram>：安全与反作弊图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function GspSecurityAnticheatDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="安全与反作弊多层防御图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            游戏安全与反作弊多层防御
          </text>

          {/* 传输安全 */}
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">
            传输安全层
          </text>
          <rect x="50" y="66" width="200" height="56" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="150" y="86" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">协议加密</text>
          <text x="150" y="102" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">AES 对称加密</text>
          <text x="150" y="116" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">RSA 密钥交换</text>

          <rect x="270" y="66" width="200" height="56" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="86" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">防重放攻击</text>
          <text x="370" y="102" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">时间戳 + 序列号</text>
          <text x="370" y="116" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Nonce 去重</text>

          <rect x="490" y="66" width="200" height="56" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="590" y="86" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">数据完整性</text>
          <text x="590" y="102" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">HMAC 签名校验</text>
          <text x="590" y="116" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">防篡改</text>

          {/* 权限安全 */}
          <text x={VIEW_W / 2} y="152" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">
            权限安全层
          </text>
          <rect x="50" y="160" width="200" height="56" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="150" y="180" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">登录鉴权</text>
          <text x="150" y="196" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Token + 过期</text>
          <text x="150" y="210" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">设备指纹绑定</text>

          <rect x="270" y="160" width="200" height="56" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="180" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">权限校验</text>
          <text x="370" y="196" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">操作频率限制</text>
          <text x="370" y="210" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">GM 指令白名单</text>

          <rect x="490" y="160" width="200" height="56" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="590" y="180" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">风控引擎</text>
          <text x="590" y="196" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">异常行为检测</text>
          <text x="590" y="210" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">IP/设备封禁</text>

          {/* 逻辑反作弊 */}
          <text x={VIEW_W / 2} y="246" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">
            逻辑反作弊层（服务端权威）
          </text>
          <rect x="50" y="254" width="200" height="56" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="150" y="274" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">移动校验</text>
          <text x="150" y="290" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">速度上限检测</text>
          <text x="150" y="304" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">穿墙/飞天检测</text>

          <rect x="270" y="254" width="200" height="56" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="370" y="274" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">战斗校验</text>
          <text x="370" y="290" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">伤害公式验证</text>
          <text x="370" y="304" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">CD/消耗校验</text>

          <rect x="490" y="254" width="200" height="56" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="590" y="274" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">经济校验</text>
          <text x="590" y="290" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">交易审计</text>
          <text x="590" y="304" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">金币异常监控</text>

          {/* 核心原则 */}
          <rect x="50" y="330" width="640" height="92" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="352" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            核心原则：服务端权威（Server-Authoritative）
          </text>
          <text x={VIEW_W / 2} y="372" textAnchor="middle" fontSize="11" fill="var(--text-primary)">
            客户端只负责输入和渲染，所有关键逻辑由服务端计算
          </text>
          <text x={VIEW_W / 2} y="390" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            客户端发的是「请求」而非「指令」——服务端验证后才执行
          </text>
          <text x={VIEW_W / 2} y="408" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            永远不要信任客户端——加密防窃听，校验防篡改，权威防作弊
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        游戏安全与反作弊多层防御——传输加密、权限风控、逻辑校验三层体系，服务端权威是基石
      </figcaption>
    </figure>
  );
}
