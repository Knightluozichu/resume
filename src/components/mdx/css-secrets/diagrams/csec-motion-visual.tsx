/**
 * <CsecMotionVisualDiagram>：动效与视觉图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 420;

export function CsecMotionVisualDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="CSS揭秘动效与视觉图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            动效与视觉：合成层、视差、Loading
          </text>

          {/* 性能模型 */}
          <rect x="40" y="50" width="340" height="160" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="60" y="74" fontSize="13" fontWeight="600" fill="var(--text-primary)">动画性能模型</text>

          {/* 好：transform */}
          <rect x="60" y="88" width="140" height="30" rx="4" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="130" y="108" textAnchor="middle" fontSize="10" fill="var(--success)">transform / opacity</text>
          <text x="215" y="108" fontSize="9" fill="var(--success)">只合成（GPU）</text>

          {/* 差：width/top */}
          <rect x="60" y="128" width="140" height="30" rx="4" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="1" />
          <text x="130" y="148" textAnchor="middle" fontSize="10" fill="var(--danger)">width / top / margin</text>
          <text x="215" y="148" fontSize="9" fill="var(--danger)">触发重排重绘</text>

          {/* 渲染管线 */}
          <text x="60" y="178" fontSize="10" fill="var(--text-secondary)">渲染管线：</text>
          <text x="140" y="178" fontSize="9" fill="var(--text-tertiary)">Style → Layout → Paint → Composite</text>
          <text x="60" y="194" fontSize="9" fill="var(--success)">transform 只走最后一步</text>
          <text x="60" y="206" fontSize="9" fill="var(--danger)">width 走前三步全部</text>

          {/* 视差滚动 */}
          <rect x="400" y="50" width="300" height="160" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="420" y="74" fontSize="13" fontWeight="600" fill="var(--text-primary)">视差滚动</text>
          {/* 远景层 */}
          <rect x="430" y="88" width="240" height="30" rx="3" fill="var(--accent)" fillOpacity="0.2" stroke="var(--accent)" strokeWidth="0.5" />
          <text x="550" y="108" textAnchor="middle" fontSize="9" fill="var(--accent)">远景层（慢速 translateZ(-1px)）</text>
          {/* 中景层 */}
          <rect x="445" y="126" width="210" height="30" rx="3" fill="var(--warning)" fillOpacity="0.2" stroke="var(--warning)" strokeWidth="0.5" />
          <text x="550" y="146" textAnchor="middle" fontSize="9" fill="var(--warning)">中景层（中速 translateZ(0)）</text>
          {/* 前景层 */}
          <rect x="465" y="164" width="170" height="30" rx="3" fill="var(--success)" fillOpacity="0.2" stroke="var(--success)" strokeWidth="0.5" />
          <text x="550" y="184" textAnchor="middle" fontSize="9" fill="var(--success)">前景层（快速）</text>
          <text x="550" y="204" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">perspective + translateZ 创建深度</text>

          {/* Loading 动画 */}
          <rect x="40" y="230" width="340" height="165" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="60" y="254" fontSize="13" fontWeight="600" fill="var(--text-primary)">CSS Loading 动画</text>

          {/* Spinner */}
          <circle cx="100" cy="300" r="25" fill="none" stroke="var(--text-tertiary)" strokeWidth="3" strokeOpacity="0.2" />
          <path d="M 100,275 A 25,25 0 0,1 122,288" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
          <text x="100" y="345" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">spinner</text>
          <text x="100" y="360" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">rotate 360deg infinite</text>

          {/* 骨架屏 */}
          <rect x="160" y="280" width="100" height="10" rx="3" fill="var(--accent)" fillOpacity="0.3" />
          <rect x="160" y="298" width="80" height="8" rx="3" fill="var(--accent)" fillOpacity="0.2" />
          <rect x="160" y="314" width="90" height="8" rx="3" fill="var(--accent)" fillOpacity="0.2" />
          <text x="210" y="345" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">骨架屏 shimmer</text>
          <text x="210" y="360" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">background-position 流动</text>

          {/* will-change 说明 */}
          <rect x="400" y="230" width="300" height="165" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="420" y="254" fontSize="13" fontWeight="600" fill="var(--text-primary)">will-change 使用原则</text>
          <text x="420" y="278" fontSize="10" fill="var(--success)">正确用法：</text>
          <text x="420" y="294" fontSize="9" fill="var(--text-tertiary)">即将动画时加、结束后移除</text>
          <text x="420" y="308" fontSize="9" fill="var(--text-tertiary)">持续动画（spinner）可保留</text>
          <text x="420" y="330" fontSize="10" fill="var(--danger)">滥用危害：</text>
          <text x="420" y="346" fontSize="9" fill="var(--text-tertiary)">每个 will-change 创建合成层</text>
          <text x="420" y="360" fontSize="9" fill="var(--text-tertiary)">过多合成层增加内存和 GPU 开销</text>
          <text x="420" y="378" fontSize="9" fill="var(--text-tertiary)">不要在所有元素上预设</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        动效与视觉——transform/opacity 只合成不重排、perspective 视差、CSS loading 动画
      </figcaption>
    </figure>
  );
}
