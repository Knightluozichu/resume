/**
 * <AdaeViewSystemDiagram>：View工作原理图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 540;

export function AdaeViewSystemDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="View工作原理图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            View工作原理：三大流程与事件分发
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            performTraversals → measure → layout → draw
          </text>

          {/* 上部：三大流程泳道 */}
          <rect x="30" y="62" width="680" height="248" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="86" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--accent)">绘制三大流程（performTraversals）</text>

          <rect x="50" y="100" width="210" height="196" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.1" />
          <text x="155" y="122" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">measure 测量</text>
          <text x="60" y="146" fontSize="11" fill="var(--text-secondary)">MeasureSpec = 模式 + 尺寸</text>
          <text x="60" y="168" fontSize="11" fill="var(--text-secondary)">EXACTLY / AT_MOST</text>
          <text x="60" y="186" fontSize="11" fill="var(--text-secondary)">UNSPECIFIED</text>
          <text x="60" y="214" fontSize="11" fill="var(--text-secondary)">View.onMeasure</text>
          <text x="60" y="232" fontSize="11" fill="var(--text-secondary)">ViewGroup 遍历子View</text>
          <text x="60" y="258" fontSize="11" fill="var(--text-secondary)">setMeasuredDimension</text>
          <text x="60" y="280" fontSize="11" fill="var(--text-tertiary)">决定 width/height</text>

          <rect x="275" y="100" width="210" height="196" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.1" />
          <text x="380" y="122" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">layout 布局</text>
          <text x="285" y="146" fontSize="11" fill="var(--text-secondary)">layout(l,t,r,b)</text>
          <text x="285" y="168" fontSize="11" fill="var(--text-secondary)">setFrame 定四角</text>
          <text x="285" y="190" fontSize="11" fill="var(--text-secondary)">onLayout 由父决定</text>
          <text x="285" y="208" fontSize="11" fill="var(--text-secondary)">子View 的位置</text>
          <text x="285" y="238" fontSize="11" fill="var(--text-secondary)">ViewGroup.onLayout</text>
          <text x="285" y="256" fontSize="11" fill="var(--text-secondary)">遍历 child.layout</text>
          <text x="285" y="280" fontSize="11" fill="var(--text-tertiary)">决定 left/top/right/bottom</text>

          <rect x="500" y="100" width="210" height="196" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.1" />
          <text x="605" y="122" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">draw 绘制</text>
          <text x="510" y="146" fontSize="11" fill="var(--text-secondary)">draw(Canvas)</text>
          <text x="510" y="168" fontSize="11" fill="var(--text-secondary)">1. 绘背景</text>
          <text x="510" y="186" fontSize="11" fill="var(--text-secondary)">2. onDraw 自己内容</text>
          <text x="510" y="204" fontSize="11" fill="var(--text-secondary)">3. dispatchDraw 子</text>
          <text x="510" y="222" fontSize="11" fill="var(--text-secondary)">4. 绘装饰/滚动条</text>
          <text x="510" y="250" fontSize="11" fill="var(--text-secondary)">invalidate 局部</text>
          <text x="510" y="268" fontSize="11" fill="var(--text-secondary)">requestLayout 重测</text>
          <text x="510" y="290" fontSize="11" fill="var(--text-tertiary)">在 UI 线程合成</text>

          {/* 下部：事件分发 */}
          <rect x="30" y="326" width="680" height="186" rx="12" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="350" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--danger)">触摸事件分发（TouchEvent）</text>

          <rect x="50" y="364" width="200" height="68" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.1" />
          <text x="150" y="386" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">dispatchTouchEvent</text>
          <text x="60" y="406" fontSize="11" fill="var(--text-secondary)">Activity → Window</text>
          <text x="60" y="424" fontSize="11" fill="var(--text-secondary)">→ DecorView → ViewGroup</text>

          <rect x="270" y="364" width="200" height="68" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.1" />
          <text x="370" y="386" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">onInterceptTouchEvent</text>
          <text x="280" y="406" fontSize="11" fill="var(--text-secondary)">ViewGroup 拦截判断</text>
          <text x="280" y="424" fontSize="11" fill="var(--text-secondary)">true → 自己处理；false 传递</text>

          <rect x="490" y="364" width="200" height="68" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.1" />
          <text x="590" y="386" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">onTouchEvent</text>
          <text x="500" y="406" fontSize="11" fill="var(--text-secondary)">消费：return true</text>
          <text x="500" y="424" fontSize="11" fill="var(--text-secondary)">不消费：回传父级</text>

          <text x="370" y="464" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">滑动冲突解决：外部拦截法 / 内部拦截法（parent.requestDisallowInterceptTouchEvent）</text>
          <text x="370" y="486" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">自定义 View：直接继承 View / 继承 ViewGroup / 组合适用最优先</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        View三大流程measure/layout/draw与触摸事件分发dispatchTouchEvent/onInterceptTouchEvent/onTouchEvent
      </figcaption>
    </figure>
  );
}
