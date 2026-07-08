/**
 * <Gep1RenderPipelineDiagram>：渲染管线阶段与绘制排序图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 430;

export function Gep1RenderPipelineDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="渲染管线阶段与绘制排序图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            渲染管线：从场景数据到屏幕像素
          </text>

          {/* CPU 侧 */}
          <rect x="30" y="54" width="680" height="120" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="50" y="74" fontSize="12" fontWeight="700" fill="var(--success)">CPU 侧：可见性准备 + 绘制排序</text>

          {/* 阶段块 */}
          {[
            { x: 40, label: "剔除", sub: "视锥/遮挡", c: "var(--success)" },
            { x: 180, label: "排序", sub: "按材质/距离", c: "var(--success)" },
            { x: 320, label: "合批", sub: "减少 Draw Call", c: "var(--success)" },
            { x: 460, label: "提交", sub: "填充命令缓冲", c: "var(--success)" },
            { x: 600, label: "翻转", sub: "提交到 GPU", c: "var(--success)" },
          ].map((s, i) => (
            <g key={i}>
              <rect x={s.x} y="86" width="120" height="50" rx="8" fill={s.c} fillOpacity="0.16" stroke={s.c} strokeWidth="1.2" />
              <text x={s.x + 60} y="108" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">{s.label}</text>
              <text x={s.x + 60} y="124" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">{s.sub}</text>
              {i < 4 && <text x={s.x + 130} y="114" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>}
            </g>
          ))}
          <text x="50" y="158" fontSize="10" fill="var(--text-secondary)">目标：把 3D 场景里「看得见的」几何体，按最优顺序打包成 Draw Call</text>

          {/* 连接 */}
          <text x={VIEW_W / 2} y="190" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x={VIEW_W / 2} y="206" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">命令缓冲 Command Buffer</text>

          {/* GPU 侧 */}
          <rect x="30" y="214" width="680" height="170" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="50" y="234" fontSize="12" fontWeight="700" fill="var(--accent)">GPU 侧：图形管线（固定 + 可编程）</text>

          {[
            { x: 40, label: "顶点输入", sub: "VBO/属性", prog: false },
            { x: 180, label: "顶点着色", sub: "MVP 变换", prog: true },
            { x: 320, label: "图元装配", sub: "三角形", prog: false },
            { x: 460, label: "光栅化", sub: "像素生成", prog: false },
            { x: 600, label: "片段着色", sub: "颜色计算", prog: true },
          ].map((s, i) => (
            <g key={i}>
              <rect x={s.x} y="246" width="120" height="50" rx="8" fill={s.prog ? "var(--warning)" : "var(--accent)"} fillOpacity={s.prog ? 0.18 : 0.12} stroke={s.prog ? "var(--warning)" : "var(--accent)"} strokeWidth="1.2" />
              <text x={s.x + 60} y="268" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">{s.label}</text>
              <text x={s.x + 60} y="284" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">{s.sub}</text>
              {i < 4 && <text x={s.x + 130} y="274" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>}
            </g>
          ))}

          {/* 逐像素操作 */}
          <rect x="40" y="310" width="660" height="60" rx="8" fill="var(--text-tertiary)" fillOpacity="0.1" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="4 3" />
          <text x="370" y="330" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">逐像素后处理</text>
          <text x="370" y="348" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">深度测试 → 模板测试 → 混合 → 帧缓冲写入</text>
          <text x="370" y="362" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">不可编程阶段，但可配置状态</text>

          {/* 绘制排序策略 */}
          <rect x="30" y="394" width="680" height="30" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="414" textAnchor="middle" fontSize="10" fill="var(--text-primary)">
            绘制排序：不透明从前到后（早Z剔除）→ 天空盒 → 透明从后到前（正确混合）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        渲染管线——CPU 侧负责剔除排序合批、GPU 侧执行顶点到片段的可编程流水线
      </figcaption>
    </figure>
  );
}
