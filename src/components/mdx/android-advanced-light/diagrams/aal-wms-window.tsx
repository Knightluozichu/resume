/**
 * <AalWmsWindowDiagram>：WMS与窗口管理层级图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function AalWmsWindowDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="WMS与窗口管理层级图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            WMS 与窗口管理层级
          </text>

          {/* Window Token 层级 */}
          <rect x="40" y="50" width="660" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="80" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">WMS（Window Manager Service）</text>

          {/* 三种 Window 类型 */}
          <rect x="40" y="120" width="210" height="130" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="145" y="142" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">Application Window</text>
          <text x="145" y="162" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Activity窗口</text>
          <text x="145" y="180" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">层级 1~99</text>
          <text x="145" y="202" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">PhoneWindow / DecorView</text>
          <text x="145" y="220" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">与 Activity 一一对应</text>
          <text x="145" y="238" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">通过 WindowManager 添加</text>

          <rect x="265" y="120" width="210" height="130" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="142" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">System Window</text>
          <text x="370" y="162" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">系统窗口</text>
          <text x="370" y="180" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">层级 1000~1999</text>
          <text x="370" y="202" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">StatusBar / NavigationBar</text>
          <text x="370" y="220" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">输入法窗口 / Toast</text>
          <text x="370" y="238" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">需 SYSTEM_ALERT_WINDOW 权限</text>

          <rect x="490" y="120" width="210" height="130" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="595" y="142" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">Sub Window</text>
          <text x="595" y="162" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">子窗口</text>
          <text x="595" y="180" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">层级 1000~1999</text>
          <text x="595" y="202" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">PopupWindow / Dialog</text>
          <text x="595" y="220" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">依附于父窗口</text>
          <text x="595" y="238" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">坐标随父窗口变化</text>

          {/* 核心数据结构 */}
          <rect x="40" y="270" width="320" height="100" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="60" y="292" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--accent)">WindowState（窗口状态）</text>
          <text x="60" y="312" textAnchor="start" fontSize="10" fill="var(--text-secondary)">WMS中每个窗口的抽象</text>
          <text x="60" y="328" textAnchor="start" fontSize="10" fill="var(--text-secondary)">持有 Surface / 位置 / 大小</text>
          <text x="60" y="344" textAnchor="start" fontSize="10" fill="var(--text-secondary)">管理窗口动画 / 焦点 / 可见性</text>
          <text x="60" y="360" textAnchor="start" fontSize="10" fill="var(--text-secondary)">维护 z-order 排序</text>

          <rect x="380" y="270" width="320" height="100" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="400" y="292" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--success)">Surface（绘图表面）</text>
          <text x="400" y="312" textAnchor="start" fontSize="10" fill="var(--text-secondary)">由 SurfaceFlinger 管理的缓冲区</text>
          <text x="400" y="328" textAnchor="start" fontSize="10" fill="var(--text-secondary)">每个 Window 拥有一个 Surface</text>
          <text x="400" y="344" textAnchor="start" fontSize="10" fill="var(--text-secondary)">ViewRootImpl 通过 Surface 绘制</text>
          <text x="400" y="360" textAnchor="start" fontSize="10" fill="var(--text-secondary)">Canvas / OpenGL ES 渲染到 Surface</text>

          {/* 绘制流程 */}
          <rect x="40" y="390" width="660" height="90" rx="8" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="412" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">窗口绘制流程</text>
          <text x="370" y="432" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">ViewRootImpl.performTraversals() → measure → layout → draw</text>
          <text x="370" y="450" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">draw → Surface.lockCanvas() → Canvas 绘制 → Surface.unlockCanvasAndPost()</text>
          <text x="370" y="468" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">→ SurfaceFlinger 合成多个 Surface → 显示到屏幕</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        WMS与窗口管理层级——三种窗口类型、WindowState、Surface与绘制流程
      </figcaption>
    </figure>
  );
}
