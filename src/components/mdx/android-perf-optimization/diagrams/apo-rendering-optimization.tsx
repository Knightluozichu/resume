/**
 * <ApoRenderingOptimizationDiagram>：渲染与UI优化流程图。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function ApoRenderingOptimizationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="渲染与UI优化流程图"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            渲染管线——从 VSync 到屏幕像素
          </text>

          {/* VSync 时序 */}
          <rect x="30" y="50" width="680" height="100" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="50" y="72" fontSize="12" fontWeight="600" fill="var(--accent)">VSync 信号驱动（每 16.6ms 一次）</text>

          <rect x="50" y="85" width="130" height="50" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="115" y="105" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">Input</text>
          <text x="115" y="120" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">输入事件处理</text>

          <rect x="190" y="85" width="130" height="50" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="255" y="105" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">Animation</text>
          <text x="255" y="120" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">动画计算</text>

          <rect x="330" y="85" width="130" height="50" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="395" y="105" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">Measure</text>
          <text x="395" y="120" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">测量 View 树</text>

          <rect x="470" y="85" width="130" height="50" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="535" y="105" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">Layout</text>
          <text x="535" y="120" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">确定位置</text>

          <rect x="610" y="85" width="90" height="50" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="655" y="105" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">Draw</text>
          <text x="655" y="120" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">绘制命令</text>

          {/* 16ms 基准线 */}
          <text x="50" y="168" fontSize="10" fill="var(--success)" fontWeight="600">16ms 基准线</text>
          <rect x="150" y="158" width="500" height="3" fill="var(--success)" fillOpacity="0.5" />

          {/* 三重缓冲 */}
          <rect x="30" y="180" width="680" height="120" rx="8" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="50" y="202" fontSize="12" fontWeight="600" fill="var(--warning)">三重缓冲（Triple Buffering）</text>

          <rect x="60" y="215" width="180" height="70" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="150" y="235" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">Buffer A</text>
          <text x="150" y="250" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">CPU+GPU 渲染中</text>
          <text x="150" y="265" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">当前帧</text>

          <rect x="280" y="215" width="180" height="70" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="370" y="235" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">Buffer B</text>
          <text x="370" y="250" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">SurfaceFlinger 合成</text>
          <text x="370" y="265" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">上一帧</text>

          <rect x="500" y="215" width="180" height="70" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="590" y="235" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">Buffer C</text>
          <text x="590" y="250" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">显示中</text>
          <text x="590" y="265" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">上上帧</text>

          {/* 优化策略 */}
          <rect x="30" y="315" width="680" height="170" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.2" />
          <text x="370" y="338" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">渲染优化策略</text>

          <rect x="50" y="350" width="200" height="55" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="150" y="370" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">硬件加速</text>
          <text x="150" y="386" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">RenderThread GPU 绘制</text>
          <text x="150" y="398" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">硬件层提升动画性能</text>

          <rect x="270" y="350" width="200" height="55" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.8" />
          <text x="370" y="370" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">Choreographer</text>
          <text x="370" y="386" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">VSync 对齐渲染</text>
          <text x="370" y="398" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">postFrameCallback 监控</text>

          <rect x="490" y="350" width="200" height="55" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="590" y="370" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">减少 invalidate</text>
          <text x="590" y="386" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">局部刷新避免全树</text>
          <text x="590" y="398" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">RecyclerView 预取</text>

          <rect x="50" y="420" width="640" height="45" rx="6" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="370" y="440" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">优化原则：减少每帧工作量（层级浅+绘制少）+ 减少 invalidate 范围 + GPU 替代 CPU 绘制 + 预取/异步</text>
          <text x="370" y="456" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">监控：GPU Profile Rendering 柱状图 + Choreographer.FrameCallback 帧时间 + Perfetto gfx 轨道</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        渲染管线流程——VSync驱动、Input/Animation/Measure/Layout/Draw五阶段、三重缓冲、硬件加速/Choreographer/局部刷新优化策略
      </figcaption>
    </figure>
  );
}
