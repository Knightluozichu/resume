/**
 * <GmaMdfFrameworkDiagram>：Machinations 框架核心元素图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 420;

export function GmaMdfFrameworkDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Machinations 框架核心元素图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Machinations 框架：资源流可视化
          </text>

          {/* 源（Source） */}
          <circle cx="90" cy="120" r="28" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1.5" />
          <text x="90" y="116" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">源</text>
          <text x="90" y="130" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Source</text>
          <text x="90" y="168" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">自动产生资源</text>

          {/* 池（Pool） */}
          <rect x="200" y="92" width="80" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="240" y="116" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">池</text>
          <text x="240" y="132" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Pool</text>
          <text x="240" y="168" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">存储资源</text>

          {/* 连接：源 → 池 */}
          <line x1="118" y1="120" x2="200" y2="120" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.5" />
          <polygon points="195,116 205,120 195,124" fill="var(--accent)" fillOpacity="0.5" />
          <text x="159" y="112" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">流</text>

          {/* 转换器（Converter） */}
          <polygon points="380,92 420,120 380,148 340,120" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="380" y="116" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">转换器</text>
          <text x="380" y="130" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Converter</text>
          <text x="380" y="168" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">输入→输出</text>

          {/* 连接：池 → 转换器 */}
          <line x1="280" y1="120" x2="340" y2="120" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.5" />
          <polygon points="335,116 345,120 335,124" fill="var(--accent)" fillOpacity="0.5" />

          {/* 排水（Drain） */}
          <rect x="540" y="92" width="80" height="56" rx="8" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <text x="580" y="116" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">排水</text>
          <text x="580" y="132" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Drain</text>
          <text x="580" y="168" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">消耗资源</text>

          {/* 连接：转换器 → 排水 */}
          <line x1="420" y1="120" x2="540" y2="120" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.5" />
          <polygon points="535,116 545,120 535,124" fill="var(--accent)" fillOpacity="0.5" />

          {/* 闸门（Gate）—— 下方 */}
          <polygon points="360,240 400,240 380,210" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="380" y="234" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">闸门</text>
          <text x="380" y="262" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">Gate——条件分流</text>

          {/* 连接：池 → 闸门 */}
          <line x1="240" y1="148" x2="360" y2="230" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" strokeDasharray="4 3" />

          {/* 触发器（Trigger） */}
          <circle cx="580" cy="240" r="24" fill="none" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="580" y="236" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">触发器</text>
          <text x="580" y="250" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Trigger</text>
          <text x="580" y="282" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">事件激活</text>

          {/* 连接：闸门 → 触发器 */}
          <line x1="400" y1="240" x2="556" y2="240" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" strokeDasharray="4 3" />

          {/* 注册器（Register）—— 状态变量 */}
          <rect x="80" y="320" width="120" height="44" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="140" y="340" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">注册器</text>
          <text x="140" y="356" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Register——状态变量</text>

          {/* 连接线 */}
          <line x1="140" y1="320" x2="200" y2="148" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="3 3" />

          {/* 端点（End Condition） */}
          <rect x="440" y="320" width="140" height="44" rx="8" fill="var(--text-tertiary)" fillOpacity="0.1" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="510" y="340" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">结束条件</text>
          <text x="510" y="356" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">End Condition</text>

          <text x={VIEW_W / 2} y="398" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            源产生 → 池存储 → 转换器变换 → 排水消耗，闸门控制分流
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Machinations 核心元素——源/池/转换器/排水/闸门/触发器/注册器
      </figcaption>
    </figure>
  );
}
