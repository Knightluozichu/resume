/**
 * <Poeaa24Ch14WebPresentationMatrix>：Web 表示模式职责分配矩阵（POEAA 第14章概览）。
 *
 * 展示 7 个模式在请求处理中的职责分配：
 *   MVC / Page Controller / Front Controller / Template View / Transform View / Two Step View / Application Controller
 *
 * 纯静态展示，无交互。Server Component。
 */

import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 440;

const PATTERNS = [
  { name: "MVC", role: "分离 M/V/C 职责", color: T.accent },
  { name: "Page Controller", role: "每页一个处理器", color: "#3FB97F" },
  { name: "Front Controller", role: "单一入口分发", color: "#3FB97F" },
  { name: "Template View", role: "模板 + 占位符", color: "#E5B567" },
  { name: "Transform View", role: "模型 → 视图转换", color: "#E5B567" },
  { name: "Two Step View", role: "内容 + 布局分离", color: "#E5B567" },
  { name: "App Controller", role: "跨页面流程控制", color: T.accent },
] as const;

export function Poeaa24Ch14WebPresentationMatrix() {
  const startX = 48;
  const startY = 80;
  const rowH = 40;
  const nameW = 160;
  const descW = 200;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Web 表示模式职责分配矩阵。7 个模式按职责分为三组：控制器组（MVC、Page Controller、Front Controller、Application Controller）负责请求路由和流程控制；视图组（Template View、Transform View、Two Step View）负责渲染输出。每个模式标注核心职责和适用场景。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle x={VIEW_W / 2} y={36} text="Web 表示模式：职责分配" />

          {/* 分组标签 */}
          <text x={startX} y={72} fontSize="11" fontWeight="600" fill={T.accent}>控制器（请求 → 逻辑）</text>
          <text x={startX + 380} y={72} fontSize="11" fontWeight="600" fill="#E5B567">视图（逻辑 → 输出）</text>

          {/* 模式列表 */}
          {PATTERNS.map((p, i) => {
            const y = startY + i * rowH;
            const isView = i >= 3 && i <= 5;
            const x = isView ? startX + 380 : startX;
            const localI = isView ? i - 3 : i;
            const localY = startY + localI * rowH;
            return (
              <g key={p.name}>
                <rect x={x} y={localY} width={300} height={34} rx="6" fill={p.color} fillOpacity="0.06" stroke={p.color} strokeWidth="1" />
                <text x={x + 12} y={localY + 22} fontSize="11" fontWeight="700" fill={p.color}>{p.name}</text>
                <text x={x + 150} y={localY + 22} fontSize="11" fill={T.secondary}>{p.role}</text>
              </g>
            );
          })}

          {/* 连接线：控制器 → 视图 */}
          <defs>
            <marker id="ch14-arr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0 0 L6 3.5 L0 7 z" fill={T.secondary} />
            </marker>
          </defs>
          <line x1={startX + 300} y1={startY + 60} x2={startX + 380} y2={startY + 60} stroke={T.secondary} strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#ch14-arr)" />
          <text x={startX + 340} y={startY + 52} textAnchor="middle" fontSize="11" fill={T.secondary}>选择视图</text>

          {/* 底部：请求流 */}
          <line x1={startX} y1={startY + 4 * rowH + 20} x2={672} y2={startY + 4 * rowH + 20} stroke={T.border} strokeWidth="0.8" />
          <text x={VIEW_W / 2} y={startY + 4 * rowH + 44} textAnchor="middle" fontSize="11" fontWeight="600" fill={T.primary}>
            请求流：HTTP → Front/Page Controller → MVC 分发 → 视图渲染 → HTTP 响应
          </text>

          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="控制器决定做什么，视图决定怎么展示——两者通过 Model 解耦" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Web 表示模式族包含 7 个模式。控制器组（MVC、Page/Front Controller、Application Controller）
        负责请求路由和流程控制；视图组（Template/Transform/Two Step View）负责渲染输出。
      </figcaption>
    </figure>
  );
}
