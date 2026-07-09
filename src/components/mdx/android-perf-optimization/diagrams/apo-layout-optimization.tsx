/**
 * <ApoLayoutOptimizationDiagram>：布局优化对比图。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function ApoLayoutOptimizationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="布局优化对比图"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            布局优化——层级扁平化与过度绘制
          </text>

          {/* 左侧：优化前 */}
          <rect x="30" y="50" width="330" height="440" rx="10" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="195" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--danger)">优化前：7层嵌套</text>

          <rect x="60" y="90" width="270" height="34" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="195" y="111" textAnchor="middle" fontSize="10" fill="var(--danger)">LinearLayout (vertical)</text>

          <rect x="80" y="134" width="230" height="30" rx="5" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="195" y="153" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">LinearLayout (horizontal)</text>

          <rect x="100" y="174" width="190" height="28" rx="5" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="195" y="192" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">RelativeLayout</text>

          <rect x="120" y="212" width="150" height="26" rx="5" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="195" y="229" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">FrameLayout</text>

          <rect x="140" y="248" width="110" height="24" rx="5" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="195" y="264" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">ImageView</text>

          <rect x="80" y="285" width="230" height="26" rx="5" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="195" y="302" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">TextView (背景与父重叠)</text>

          <text x="195" y="335" textAnchor="middle" fontSize="11" fill="var(--danger)" fontWeight="600">问题：</text>
          <text x="60" y="355" textAnchor="start" fontSize="10" fill="var(--text-secondary)">- 7层嵌套，measure/layout 递归 2^7</text>
          <text x="60" y="372" textAnchor="start" fontSize="10" fill="var(--text-secondary)">- 背景重叠导致过度绘制</text>
          <text x="60" y="389" textAnchor="start" fontSize="10" fill="var(--text-secondary)">- 无需加载的 View 占内存</text>
          <text x="60" y="406" textAnchor="start" fontSize="10" fill="var(--text-secondary)">- 嵌套权重 weight 二次 measure</text>
          <text x="60" y="423" textAnchor="start" fontSize="10" fill="var(--text-secondary)">- 滑动卡顿：每帧 22ms+</text>
          <text x="60" y="445" textAnchor="start" fontSize="10" fill="var(--text-secondary)">- 过度绘制：4次红色区域</text>

          {/* 右侧：优化后 */}
          <rect x="380" y="50" width="330" height="440" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="545" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">优化后：3层扁平</text>

          <rect x="410" y="90" width="270" height="34" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="545" y="111" textAnchor="middle" fontSize="10" fill="var(--success)">ConstraintLayout</text>

          <rect x="430" y="134" width="120" height="30" rx="5" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.8" />
          <text x="490" y="153" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">ImageView</text>

          <rect x="560" y="134" width="120" height="30" rx="5" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.8" />
          <text x="620" y="153" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">TextView</text>

          <rect x="430" y="174" width="250" height="24" rx="5" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="0.8" strokeDasharray="3 2" />
          <text x="555" y="190" textAnchor="middle" fontSize="9" fill="var(--warning)">ViewStub (懒加载)</text>

          <text x="545" y="225" textAnchor="middle" fontSize="11" fill="var(--success)" fontWeight="600">改进：</text>
          <text x="410" y="245" textAnchor="start" fontSize="10" fill="var(--text-secondary)">- 3层扁平，measure/layout 快 3 倍</text>
          <text x="410" y="262" textAnchor="start" fontSize="10" fill="var(--text-secondary)">- 移除多余背景，过度绘制 降到 1 次</text>
          <text x="410" y="279" textAnchor="start" fontSize="10" fill="var(--text-secondary)">- ViewStub 延迟加载节省内存</text>
          <text x="410" y="296" textAnchor="start" fontSize="10" fill="var(--text-secondary)">- include+merge 复用布局</text>
          <text x="410" y="313" textAnchor="start" fontSize="10" fill="var(--text-secondary)">- 滑动流畅：每帧 8ms</text>
          <text x="410" y="330" textAnchor="start" fontSize="10" fill="var(--text-secondary)">- 过度绘制：原色/蓝色</text>

          <text x="545" y="370" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">性能提升</text>
          <text x="545" y="395" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--success)">63%</text>
          <text x="545" y="415" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">布局 measure+layout 耗时</text>

          {/* 中间箭头 */}
          <text x="370" y="260" textAnchor="middle" fontSize="28" fill="var(--accent)">&rarr;</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        布局优化对比——7层嵌套 LinearLayout 优化为 3层 ConstraintLayout，measure/layout 耗时降低 63%，过度绘制从 4 次降到 1 次
      </figcaption>
    </figure>
  );
}
