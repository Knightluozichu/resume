/**
 * <DakWmsViewDiagram>：WMS窗口管理与View绘制流程图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function DakWmsViewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="WMS窗口管理与View绘制流程图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            WMS窗口管理 + View绘制流程
          </text>

          {/* 上半：WMS 窗口管理 */}
          <text x="370" y="54" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">窗口管理层</text>

          {/* App进程 */}
          <rect x="40" y="66" width="200" height="70" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="140" y="88" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">App 进程</text>
          <text x="140" y="106" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Activity → PhoneWindow</text>
          <text x="140" y="120" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">DecorView → ViewRootImpl</text>
          <text x="140" y="132" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">WindowManager.addView</text>

          {/* WMS */}
          <rect x="270" y="66" width="200" height="70" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="88" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">WMS（system_server）</text>
          <text x="370" y="106" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">WindowState 管理窗口</text>
          <text x="370" y="120" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">窗口层级 Z-order 排序</text>
          <text x="370" y="132" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">分配 Surface</text>

          {/* SurfaceFlinger */}
          <rect x="500" y="66" width="200" height="70" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="600" y="88" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">SurfaceFlinger</text>
          <text x="600" y="106" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">合成多个 Surface</text>
          <text x="600" y="120" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">送入 Display 显示</text>
          <text x="600" y="132" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">VSync 同步</text>

          {/* 箭头 */}
          <line x1="240" y1="100" x2="270" y2="100" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#wm-arr)" />
          <text x="255" y="92" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">Binder</text>
          <line x1="470" y1="100" x2="500" y2="100" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#wm-arr)" />
          <text x="485" y="92" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">Surface</text>

          <defs>
            <marker id="wm-arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="var(--text-secondary)" />
            </marker>
            <marker id="draw-arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="var(--danger)" />
            </marker>
          </defs>

          {/* 下半：View绘制流程 */}
          <text x="370" y="170" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">View绘制流程（ViewRootImpl 驱动）</text>

          {/* measure */}
          <rect x="40" y="186" width="200" height="90" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="140" y="208" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">1. measure</text>
          <text x="140" y="228" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">测量 View 大小</text>
          <text x="140" y="244" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">onMeasure(widthSpec, heightSpec)</text>
          <text x="140" y="260" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">MeasureSpec = Mode + Size</text>
          <text x="140" y="274" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">EXACTLY / AT_MOST / UNSPECIFIED</text>

          {/* layout */}
          <rect x="270" y="186" width="200" height="90" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="208" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">2. layout</text>
          <text x="370" y="228" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">确定 View 位置</text>
          <text x="370" y="244" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">onLayout(l, t, r, b)</text>
          <text x="370" y="260" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">设置四边坐标</text>
          <text x="370" y="274" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">父布局摆放子 View</text>

          {/* draw */}
          <rect x="500" y="186" width="200" height="90" rx="8" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="600" y="208" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">3. draw</text>
          <text x="600" y="228" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">绘制到 Surface</text>
          <text x="600" y="244" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">onDraw(canvas)</text>
          <text x="600" y="260" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">背景 → 内容 → 子View → 前景</text>
          <text x="600" y="274" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">DisplayList → GPU 渲染</text>

          {/* 流程箭头 */}
          <line x1="240" y1="230" x2="270" y2="230" stroke="var(--danger)" strokeWidth="1.5" markerEnd="url(#draw-arr)" />
          <line x1="470" y1="230" x2="500" y2="230" stroke="var(--danger)" strokeWidth="1.5" markerEnd="url(#draw-arr)" />

          {/* 底部说明 */}
          <rect x="40" y="300" width="660" height="200" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.2" />
          <text x="370" y="322" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">关键概念</text>

          <text x="60" y="346" fontSize="11" fill="var(--text-secondary)">&bull; Window：每个 Activity 对应一个 Window，Window 是 View 的容器，PhoneWindow 是唯一实现</text>
          <text x="60" y="364" fontSize="11" fill="var(--text-secondary)">&bull; DecorView：Window 的根 View，包含 StatusBar + ActionBar + ContentParent</text>
          <text x="60" y="382" fontSize="11" fill="var(--text-secondary)">&bull; ViewRootImpl：连接 WindowManager 和 DecorView 的桥梁，驱动 measure/layout/draw 三步</text>
          <text x="60" y="400" fontSize="11" fill="var(--text-secondary)">&bull; Surface：每个窗口对应一块 Surface（画布），WMS 分配，App 绘制内容到 Surface</text>
          <text x="60" y="418" fontSize="11" fill="var(--text-secondary)">&bull; VSync：垂直同步信号（16.67ms/帧=60fps），每帧触发一次绘制流程</text>
          <text x="60" y="436" fontSize="11" fill="var(--text-secondary)">&bull; invalidate()：标记 View 需重绘 → 下一帧 VSync 触发 measure+layout+draw</text>
          <text x="60" y="454" fontSize="11" fill="var(--text-secondary)">&bull; requestLayout()：标记 View 需重新布局 → 触发 measure+layout（不一定 draw）</text>
          <text x="60" y="472" fontSize="11" fill="var(--text-secondary)">&bull; Choreographer：编舞者，协调 input/animation/traversal 与 VSync 对齐</text>
          <text x="60" y="490" fontSize="11" fill="var(--text-secondary)">&bull; 硬件加速：RenderThread 使用 DisplayList 在 GPU 上渲染，减轻主线程压力</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        WMS窗口管理——Window/Surface分配、View绘制measure/layout/draw三步、VSync与Choreographer帧同步
      </figcaption>
    </figure>
  );
}
