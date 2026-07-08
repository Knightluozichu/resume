/**
 * <CsecPseudoElementsDiagram>：伪元素妙用图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 420;

export function CsecPseudoElementsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="CSS揭秘伪元素妙用图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            伪元素 ::before / ::after 妙用
          </text>

          {/* Tooltip 气泡 */}
          <rect x="180" y="60" width="200" height="60" rx="6" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="280" y="88" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">Tooltip 气泡</text>
          <text x="280" y="106" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">content: "" + border 三角形</text>
          {/* 三角形箭头 */}
          <polygon points="272,120 288,120 280,132" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="280" y="152" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">::after 伪元素画箭头</text>

          {/* 清除浮动 */}
          <rect x="450" y="50" width="240" height="120" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" strokeDasharray="4 2" />
          <text x="570" y="68" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">父容器（浮动子元素）</text>
          <rect x="465" y="78" width="95" height="36" rx="3" fill="var(--warning)" fillOpacity="0.3" stroke="var(--warning)" strokeWidth="1" />
          <text x="512" y="100" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">float: left</text>
          <rect x="575" y="78" width="95" height="36" rx="3" fill="var(--warning)" fillOpacity="0.3" stroke="var(--warning)" strokeWidth="1" />
          <text x="622" y="100" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">float: right</text>
          <line x1="460" y1="128" x2="680" y2="128" stroke="var(--success)" strokeWidth="1.5" strokeDasharray="2 1" />
          <text x="570" y="142" textAnchor="middle" fontSize="9" fill="var(--success)">::after {`{ clear: both }`}</text>
          <text x="570" y="156" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">或 display: flow-root</text>

          {/* 展开动画 */}
          <rect x="50" y="190" width="300" height="50" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="200" y="210" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">展开动画（max-height）</text>
          <text x="200" y="228" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">max-height: 0 → 500px 可过渡</text>

          {/* 展开动画时间轴 */}
          <line x1="50" y1="260" x2="350" y2="260" stroke="var(--text-secondary)" strokeWidth="1" />
          <text x="50" y="276" fontSize="9" fill="var(--text-tertiary)">max-height: 0</text>
          <text x="280" y="276" fontSize="9" fill="var(--text-tertiary)">max-height: 500px</text>
          <circle cx="50" cy="260" r="4" fill="var(--danger)" />
          <circle cx="350" cy="260" r="4" fill="var(--success)" />
          <text x="200" y="295" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">transition: max-height 0.4s ease</text>

          {/* 伪元素特性说明 */}
          <rect x="380" y="190" width="320" height="190" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="400" y="214" fontSize="13" fontWeight="600" fill="var(--text-primary)">伪元素核心特性</text>
          <text x="400" y="238" fontSize="10" fill="var(--text-secondary)">必须设 content 属性才生成</text>
          <text x="400" y="256" fontSize="10" fill="var(--text-secondary)">content: "" （空字符串即可）</text>
          <text x="400" y="274" fontSize="10" fill="var(--text-secondary)">默认 inline，需设 display/position</text>
          <text x="400" y="292" fontSize="10" fill="var(--text-secondary)">不增加 DOM 节点（免费两个层）</text>
          <text x="400" y="310" fontSize="10" fill="var(--text-secondary)">可设背景/边框/定位/动画</text>
          <text x="400" y="336" fontSize="10" fill="var(--accent)">border 三角形原理：</text>
          <text x="400" y="352" fontSize="9" fill="var(--text-tertiary)">width:0 + 四条 border 拼四三角</text>
          <text x="400" y="366" fontSize="9" fill="var(--text-tertiary)">三条 transparent 只留一条可见</text>

          {/* border 三角形示意 */}
          <polygon points="200,310 180,340 220,340" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 1" />
          <text x="200" y="335" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">底边</text>
          <text x="200" y="325" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">↑</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        伪元素妙用——::before/::after 创造免费渲染层，实现 tooltip 箭头、clearfix 和展开动画
      </figcaption>
    </figure>
  );
}
