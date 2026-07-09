"use client";

export function DavWmsDeepDiagram() {
  return (
    <svg viewBox="0 0 800 520" className="w-full h-auto" role="img" aria-label="WMS深度解析架构图">
      <defs>
        <linearGradient id="dav-wm-wms" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dav-wm-draw" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <marker id="dav-wm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">WMS深度解析 · 窗口管理与绘制</text>

      {/* WMS window hierarchy */}
      <rect x="30" y="50" width="360" height="250" rx="12" fill="url(#dav-wm-wms)" opacity="0.92" />
      <text x="210" y="74" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">WindowManagerService</text>
      <rect x="45" y="88" width="330" height="30" rx="6" fill="#fff" opacity="0.18" />
      <text x="210" y="108" textAnchor="middle" fontSize="11" fill="#ede9fe">RootWindowContainer</text>
      <rect x="60" y="124" width="300" height="30" rx="6" fill="#fff" opacity="0.15" />
      <text x="210" y="144" textAnchor="middle" fontSize="11" fill="#ddd6fe">→ DisplayContent（显示器）</text>
      <rect x="75" y="160" width="270" height="30" rx="6" fill="#fff" opacity="0.12" />
      <text x="210" y="180" textAnchor="middle" fontSize="11" fill="#c4b5fd">　→ WindowToken（窗口组）</text>
      <rect x="90" y="196" width="240" height="30" rx="6" fill="#fff" opacity="0.1" />
      <text x="210" y="216" textAnchor="middle" fontSize="11" fill="#a78bfa">　　→ WindowState（窗口）</text>
      <text x="210" y="250" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">Z-order排序（底→顶）</text>
      <text x="210" y="268" textAnchor="middle" fontSize="10" fill="#ddd6fe">壁纸 → 应用 → 系统 → 输入法 → 状态栏</text>
      <text x="210" y="286" textAnchor="middle" fontSize="10" fill="#ddd6fe">assignLayersLocked分配层级</text>

      {/* View drawing */}
      <rect x="410" y="50" width="360" height="250" rx="12" fill="url(#dav-wm-draw)" opacity="0.92" />
      <text x="590" y="74" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">View绘制三步 · ViewRootImpl</text>
      <rect x="425" y="88" width="330" height="36" rx="6" fill="#fff" opacity="0.18" />
      <text x="590" y="111" textAnchor="middle" fontSize="11" fill="#cffafe">① measure → onMeasure（测量尺寸）</text>
      <rect x="425" y="130" width="330" height="36" rx="6" fill="#fff" opacity="0.15" />
      <text x="590" y="153" textAnchor="middle" fontSize="11" fill="#cffafe">② layout → onLayout（放置位置）</text>
      <rect x="425" y="172" width="330" height="36" rx="6" fill="#fff" opacity="0.12" />
      <text x="590" y="195" textAnchor="middle" fontSize="11" fill="#cffafe">③ draw → onDraw（绘制内容）</text>
      <text x="590" y="224" textAnchor="middle" fontSize="10" fill="#a5f3fc">硬件加速: DisplayList → RenderThread</text>
      <text x="590" y="242" textAnchor="middle" fontSize="10" fill="#a5f3fc">软件渲染: Canvas直接绘制Surface</text>
      <text x="590" y="266" textAnchor="middle" fontSize="10" fill="#67e8f9">MeasureSpec: EXACTLY/AT_MOST/UNSPECIFIED</text>
      <text x="590" y="286" textAnchor="middle" fontSize="10" fill="#67e8f9">从DecorView递归向下</text>

      {/* VSync / Choreographer */}
      <rect x="30" y="320" width="360" height="80" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="210" y="344" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">VSync &amp; Choreographer</text>
      <text x="210" y="366" textAnchor="middle" fontSize="10" fill="#78350f">scheduleTraversals → SyncBarrier → VSync回调</text>
      <text x="210" y="384" textAnchor="middle" fontSize="10" fill="#78350f">doFrame: INPUT→ANIMATION→TRAVERSAL→COMMIT</text>

      {/* Input system */}
      <rect x="410" y="320" width="360" height="80" rx="10" fill="#fef2f2" stroke="#f87171" strokeWidth="1.5" />
      <text x="590" y="344" textAnchor="middle" fontSize="13" fontWeight="700" fill="#991b1b">输入系统 &amp; ANR</text>
      <text x="590" y="366" textAnchor="middle" fontSize="10" fill="#7f1d1d">InputReader→InputDispatcher→焦点窗口App</text>
      <text x="590" y="384" textAnchor="middle" fontSize="10" fill="#7f1d1d">5秒未finished() → Input ANR</text>

      {/* Window add flow */}
      <rect x="30" y="420" width="740" height="80" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="444" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">窗口添加流程</text>
      <text x="400" y="466" textAnchor="middle" fontSize="10" fill="#475569">ActivityThread.handleResumeActivity → WindowManager.addView → ViewRootImpl.setView</text>
      <text x="400" y="484" textAnchor="middle" fontSize="10" fill="#475569">→ requestLayout + mWindowSession.addToDisplay(Binder) → WMS.addWindow → 创建WindowState + SurfaceControl</text>
    </svg>
  );
}
