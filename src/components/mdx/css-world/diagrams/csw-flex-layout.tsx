/**
 * <CswFlexLayoutDiagram>：Flex 布局图解。
 * 展示主轴/交叉轴方向与 flex 属性分配空间。纯静态，Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function CswFlexLayoutDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Flex 布局图解：主轴交叉轴与 flex 属性"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Flex 布局：主轴 / 交叉轴与 flex 属性
          </text>

          {/* Flex 容器 */}
          <rect x="40" y="50" width="660" height="140" rx="8" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="56" y="68" fontSize="10" fill="var(--accent)">display:flex; flex-direction:row;（主轴 = 水平 →）</text>

          {/* 主轴箭头 */}
          <line x1="60" y1="80" x2="680" y2="80" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrowAccent)" />
          <text x="370" y="76" textAnchor="middle" fontSize="9" fill="var(--accent)">主轴 main axis（justify-content 方向）</text>

          {/* flex 项目 */}
          <rect x="70" y="96" width="120" height="70" rx="6" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1.2" />
          <text x="130" y="124" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">flex:1</text>
          <text x="130" y="140" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">flex-grow:1</text>
          <text x="130" y="154" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">basis:auto</text>

          <rect x="210" y="96" width="180" height="70" rx="6" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="300" y="124" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">flex:2</text>
          <text x="300" y="140" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">flex-grow:2</text>
          <text x="300" y="154" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">占 2 份空间</text>

          <rect x="410" y="96" width="120" height="70" rx="6" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="470" y="124" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">flex:0 0 120</text>
          <text x="470" y="140" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">不伸缩</text>
          <text x="470" y="154" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">固定 120px</text>

          <rect x="550" y="96" width="120" height="70" rx="6" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="610" y="124" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-tertiary)">flex:1</text>
          <text x="610" y="140" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">flex-grow:1</text>
          <text x="610" y="154" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">与首项等分</text>

          {/* 交叉轴 */}
          <line x1="690" y1="56" x2="690" y2="186" stroke="var(--warning)" strokeWidth="1.5" markerEnd="url(#arrowWarning)" />
          <text x="700" y="125" fontSize="9" fill="var(--warning)">交叉轴</text>
          <text x="700" y="138" fontSize="9" fill="var(--warning)">cross</text>

          {/* 箭头定义 */}
          <defs>
            <marker id="arrowAccent" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="var(--accent)" />
            </marker>
            <marker id="arrowWarning" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="var(--warning)" />
            </marker>
          </defs>

          {/* justify-content 对照 */}
          <text x="370" y="218" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">justify-content（主轴对齐）</text>

          <rect x="40" y="230" width="320" height="32" rx="4" fill="var(--success)" fillOpacity="0.06" stroke="var(--border)" strokeWidth="0.5" />
          <text x="56" y="250" fontSize="10" fill="var(--success)">flex-start</text>
          <rect x="140" y="236" width="40" height="20" rx="2" fill="var(--success)" fillOpacity="0.5" />
          <rect x="184" y="236" width="40" height="20" rx="2" fill="var(--success)" fillOpacity="0.5" />
          <text x="270" y="250" fontSize="8" fill="var(--text-tertiary)">|■■        |</text>

          <rect x="40" y="266" width="320" height="32" rx="4" fill="var(--accent)" fillOpacity="0.06" stroke="var(--border)" strokeWidth="0.5" />
          <text x="56" y="286" fontSize="10" fill="var(--accent)">center</text>
          <rect x="150" y="272" width="40" height="20" rx="2" fill="var(--accent)" fillOpacity="0.5" />
          <rect x="194" y="272" width="40" height="20" rx="2" fill="var(--accent)" fillOpacity="0.5" />
          <text x="270" y="286" fontSize="8" fill="var(--text-tertiary)">|  ■■      |</text>

          <rect x="40" y="302" width="320" height="32" rx="4" fill="var(--warning)" fillOpacity="0.06" stroke="var(--border)" strokeWidth="0.5" />
          <text x="56" y="322" fontSize="10" fill="var(--warning)">space-between</text>
          <rect x="60" y="308" width="40" height="20" rx="2" fill="var(--warning)" fillOpacity="0.5" />
          <rect x="300" y="308" width="40" height="20" rx="2" fill="var(--warning)" fillOpacity="0.5" />
          <text x="200" y="322" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">|■    ■|</text>

          {/* align-items 对照 */}
          <text x="530" y="218" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">align-items（交叉轴对齐）</text>

          <rect x="400" y="230" width="320" height="32" rx="4" fill="var(--success)" fillOpacity="0.06" stroke="var(--border)" strokeWidth="0.5" />
          <text x="416" y="250" fontSize="10" fill="var(--success)">stretch（默认撑满）</text>

          <rect x="400" y="266" width="320" height="32" rx="4" fill="var(--accent)" fillOpacity="0.06" stroke="var(--border)" strokeWidth="0.5" />
          <text x="416" y="286" fontSize="10" fill="var(--accent)">flex-start（顶对齐）</text>

          <rect x="400" y="302" width="320" height="32" rx="4" fill="var(--warning)" fillOpacity="0.06" stroke="var(--border)" strokeWidth="0.5" />
          <text x="416" y="322" fontSize="10" fill="var(--warning)">center（垂直居中）</text>

          {/* flex 三合一说明 */}
          <rect x="40" y="348" width="660" height="92" rx="8" fill="var(--danger)" fillOpacity="0.05" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="370" y="370" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">flex 简写 = flex-grow flex-shrink flex-basis</text>
          <text x="370" y="390" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">flex:1 → 1 1 0%（可放大可缩小，基准 0）</text>
          <text x="370" y="406" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">flex:auto → 1 1 auto（基准取 content 尺寸）</text>
          <text x="370" y="422" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">flex:none → 0 0 auto（固定不伸缩）</text>
          <text x="370" y="438" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">flex-grow 按比例分配剩余空间；flex-shrink 空间不足时按权重收缩</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Flex 布局——主轴交叉轴方向、flex 三属性与 justify/align 对齐对照
      </figcaption>
    </figure>
  );
}
