/**
 * <JfsFinalReviewDiagram>：全栈请求生命周期闭环图解（总复习）。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function JfsFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="全栈请求生命周期闭环图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            全栈请求生命周期闭环
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            一次「用户下单」从前端到数据层再返回的完整链路
          </text>

          {/* 环形布局：5 个阶段节点 */}
          {/* 顶部：前端 */}
          <rect x="270" y="64" width="200" height="60" rx="10" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1.4" />
          <text x="370" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">① 前端</text>
          <text x="370" y="106" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">React 事件 + 状态管理</text>
          <text x="370" y="118" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第 2-3 章</text>

          {/* 右上箭头到后端 */}
          <path d="M 470 94 Q 540 94 580 150" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.4" />
          <text x="545" y="108" textAnchor="middle" fontSize="12" fill="var(--text-tertiary)">fetch</text>
          <polygon points="580,150 574,140 586,142" fill="var(--text-tertiary)" />

          {/* 右侧：后端 */}
          <rect x="560" y="158" width="150" height="60" rx="10" fill="var(--warning)" fillOpacity="0.14" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="635" y="182" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">② 后端</text>
          <text x="635" y="200" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Node + 中间件</text>
          <text x="635" y="212" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第 4-5 章</text>

          {/* 右下箭头到数据层 */}
          <path d="M 635 218 Q 635 280 570 320" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.4" />
          <polygon points="570,320 578,312 580,324" fill="var(--text-tertiary)" />

          {/* 底部：数据层 */}
          <rect x="420" y="328" width="200" height="60" rx="10" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="520" y="352" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">③ 数据层</text>
          <text x="520" y="370" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">MongoDB + GraphQL</text>
          <text x="520" y="382" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第 6-7 章</text>

          {/* 左下箭头到工程化 */}
          <path d="M 420 358 Q 340 358 300 320" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.4" />
          <polygon points="300,320 308,314 310,326" fill="var(--text-tertiary)" />

          {/* 左侧：工程化 */}
          <rect x="140" y="262" width="160" height="60" rx="10" fill="var(--danger)" fillOpacity="0.14" stroke="var(--danger)" strokeWidth="1.4" />
          <text x="220" y="286" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">④ 工程化</text>
          <text x="220" y="304" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">认证 + 测试 + 部署</text>
          <text x="220" y="316" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第 8-9 章</text>

          {/* 左上箭头回到前端 */}
          <path d="M 220 262 Q 220 150 270 118" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.4" />
          <text x="180" y="200" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">响应返回</text>
          <polygon points="270,118 262,124 264,112" fill="var(--text-tertiary)" />

          {/* 中心总复习 */}
          <circle cx="370" cy="220" r="46" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.4" />
          <text x="370" y="214" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">⑤ 总复习</text>
          <text x="370" y="232" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">全链路复盘</text>
          <text x="370" y="246" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第 10 章</text>

          {/* 底部洞察 */}
          <rect x="40" y="404" width="660" height="40" rx="8" fill="var(--text-tertiary)" fillOpacity="0.05" stroke="var(--border)" strokeWidth="1" />
          <text x="370" y="422" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            逐层排查：前端重渲染 → 网络 N+1 → 后端阻塞 → 数据库索引 → 部署资源
          </text>
          <text x="370" y="436" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            先量化每环耗时再针对性优化，一环断则全链断
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全栈请求生命周期闭环——前端、后端、数据层、工程化四环加总复习核心
      </figcaption>
    </figure>
  );
}
