/**
 * <CswTextDecorationDiagram>：文本装饰与换行图解。
 * 展示 text-decoration、white-space 各值与换行行为。纯静态，Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function CswTextDecorationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="文本装饰与换行图解：text-decoration 与 white-space"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            文本装饰与换行：text-decoration 与 white-space
          </text>

          {/* 上半：text-decoration 各线 */}
          <rect x="40" y="48" width="660" height="130" rx="10" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="370" y="70" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">text-decoration 的三种线</text>

          <text x="120" y="100" textAnchor="middle" fontSize="12" fill="var(--text-primary)">overline 上划线</text>
          <line x1="60" y1="108" x2="180" y2="108" stroke="var(--danger)" strokeWidth="2" />
          <text x="120" y="126" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">text-decoration:overline</text>

          <text x="370" y="100" textAnchor="middle" fontSize="12" fill="var(--text-primary)">line-through 删除线</text>
          <line x1="310" y1="104" x2="430" y2="104" stroke="var(--warning)" strokeWidth="2" />
          <text x="370" y="126" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">text-decoration:line-through</text>

          <text x="620" y="100" textAnchor="middle" fontSize="12" fill="var(--text-primary)">underline 下划线</text>
          <line x1="560" y1="112" x2="680" y2="112" stroke="var(--success)" strokeWidth="2" />
          <text x="620" y="126" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">text-decoration:underline</text>

          <text x="370" y="158" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">现代写法：text-decoration: &lt;线&gt; &lt;样式&gt; &lt;颜色&gt;；可叠加多条</text>

          {/* 下半：white-space 各值行为 */}
          <text x="370" y="196" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">white-space 取值与换行 / 空白处理</text>

          {/* 表头 */}
          <rect x="40" y="210" width="660" height="28" rx="4" fill="var(--accent)" fillOpacity="0.15" />
          <text x="130" y="228" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">取值</text>
          <text x="330" y="228" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">换行</text>
          <text x="530" y="228" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">空白 / 换行符</text>

          {/* normal */}
          <rect x="40" y="240" width="660" height="30" rx="3" fill="var(--success)" fillOpacity="0.06" stroke="var(--border)" strokeWidth="0.5" />
          <text x="130" y="260" textAnchor="middle" fontSize="11" fill="var(--success)">normal</text>
          <text x="330" y="260" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">空格处自动换行</text>
          <text x="530" y="260" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">合并空白，忽略换行符</text>

          {/* nowrap */}
          <rect x="40" y="272" width="660" height="30" rx="3" fill="var(--danger)" fillOpacity="0.06" stroke="var(--border)" strokeWidth="0.5" />
          <text x="130" y="292" textAnchor="middle" fontSize="11" fill="var(--danger)">nowrap</text>
          <text x="330" y="292" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">不换行（一行排完）</text>
          <text x="530" y="292" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">合并空白，忽略换行符</text>

          {/* pre */}
          <rect x="40" y="304" width="660" height="30" rx="3" fill="var(--warning)" fillOpacity="0.06" stroke="var(--border)" strokeWidth="0.5" />
          <text x="130" y="324" textAnchor="middle" fontSize="11" fill="var(--warning)">pre</text>
          <text x="330" y="324" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">不换行（除非有换行符）</text>
          <text x="530" y="324" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">保留空白与换行符</text>

          {/* pre-wrap */}
          <rect x="40" y="336" width="660" height="30" rx="3" fill="var(--accent)" fillOpacity="0.06" stroke="var(--border)" strokeWidth="0.5" />
          <text x="130" y="356" textAnchor="middle" fontSize="11" fill="var(--accent)">pre-wrap</text>
          <text x="330" y="356" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">空格处可换行</text>
          <text x="530" y="356" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">保留空白与换行符</text>

          {/* pre-line */}
          <rect x="40" y="368" width="660" height="30" rx="3" fill="var(--text-tertiary)" fillOpacity="0.10" stroke="var(--border)" strokeWidth="0.5" />
          <text x="130" y="388" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">pre-line</text>
          <text x="330" y="388" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">空格处可换行</text>
          <text x="530" y="388" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">合并空白，保留换行符</text>

          {/* 换行控制 */}
          <rect x="40" y="410" width="660" height="36" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" />
          <text x="370" y="432" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            换行控制：word-break（break-all 整字 / keep-all 不拆词）、overflow-wrap:break-word（长 URL 兜底断行）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        文本装饰与换行——text-decoration 三种线、white-space 五值对照表
      </figcaption>
    </figure>
  );
}
