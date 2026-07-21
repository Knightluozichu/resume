/**
 * <Poeaa24Ch04MvcTriangle>：MVC 三角交互图（POEAA 第4章）。
 *
 * 展示 Model / View / Controller 三者间的数据流和通知方向：
 *   - 用户操作 → Controller → 修改 Model
 *   - Model 变化 → 通知 View 刷新
 *   - View 展示 Model 状态
 * 右侧标注请求处理的完整路径。
 *
 * 纯静态展示，无交互。Server Component。
 */

import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 420;

// MVC 三角形节点位置
const CX = 240; // 中心 x
const MODEL = { x: CX, y: 100 }; // 顶部
const VIEW = { x: CX - 130, y: 280 }; // 左下
const CTRL = { x: CX + 130, y: 280 }; // 右下
const R = 48; // 节点半径区域

export function Poeaa24Ch04MvcTriangle() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="MVC 三角交互图。Model 在顶部，View 在左下，Controller 在右下。用户操作发给 Controller，Controller 修改 Model，Model 变化通知 View 刷新，View 从 Model 读取状态展示给用户。右侧展示请求处理完整路径：HTTP 请求到 Controller，Controller 调用 Model 业务逻辑，选择 View 渲染响应。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle x={VIEW_W / 2} y={36} text="MVC：职责分离的三角协作" />

          {/* 连接线 + 箭头 */}
          <defs>
            <marker id="ch04-arr-a" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0 0 L7 4 L0 8 z" fill={T.accent} />
            </marker>
            <marker id="ch04-arr-g" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0 0 L7 4 L0 8 z" fill="#3FB97F" />
            </marker>
            <marker id="ch04-arr-w" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0 0 L7 4 L0 8 z" fill="#E5B567" />
            </marker>
          </defs>

          {/* Controller → Model（修改） */}
          <line x1={CTRL.x - 20} y1={CTRL.y - R + 8} x2={MODEL.x + 30} y2={MODEL.y + R - 4} stroke={T.accent} strokeWidth="1.8" markerEnd="url(#ch04-arr-a)" />
          <text x={CX + 80} y={190} fontSize="11" fontWeight="600" fill={T.accent} textAnchor="middle">修改状态</text>

          {/* Model → View（通知） */}
          <line x1={MODEL.x - 30} y1={MODEL.y + R - 4} x2={VIEW.x + 20} y2={VIEW.y - R + 8} stroke="#3FB97F" strokeWidth="1.8" markerEnd="url(#ch04-arr-g)" />
          <text x={CX - 80} y={190} fontSize="11" fontWeight="600" fill="#3FB97F" textAnchor="middle">通知变化</text>

          {/* View → Model（读取） */}
          <line x1={VIEW.x + 36} y1={VIEW.y - R + 16} x2={MODEL.x - 16} y2={MODEL.y + R + 2} stroke="#E5B567" strokeWidth="1.2" strokeDasharray="5 3" markerEnd="url(#ch04-arr-w)" />
          <text x={CX - 44} y={220} fontSize="10" fill="#E5B567" textAnchor="middle">读取状态</text>

          {/* 用户 → Controller */}
          <text x={CTRL.x + 60} y={CTRL.y - 20} fontSize="11" fill={T.secondary}>用户操作</text>
          <line x1={CTRL.x + 56} y1={CTRL.y - 12} x2={CTRL.x + R - 8} y2={CTRL.y - 4} stroke={T.secondary} strokeWidth="1.2" markerEnd="url(#ch04-arr-a)" />

          {/* Model 节点 */}
          <rect x={MODEL.x - R} y={MODEL.y - 28} width={R * 2} height={56} rx="10" fill={T.elevated} stroke="#3FB97F" strokeWidth="2" />
          <text x={MODEL.x} y={MODEL.y - 4} textAnchor="middle" fontSize="14" fontWeight="700" fill="#3FB97F">Model</text>
          <text x={MODEL.x} y={MODEL.y + 16} textAnchor="middle" fontSize="10" fill={T.secondary}>业务数据 + 规则</text>

          {/* View 节点 */}
          <rect x={VIEW.x - R} y={VIEW.y - 28} width={R * 2} height={56} rx="10" fill={T.elevated} stroke="#E5B567" strokeWidth="2" />
          <text x={VIEW.x} y={VIEW.y - 4} textAnchor="middle" fontSize="14" fontWeight="700" fill="#E5B567">View</text>
          <text x={VIEW.x} y={VIEW.y + 16} textAnchor="middle" fontSize="10" fill={T.secondary}>展示 + 渲染</text>

          {/* Controller 节点 */}
          <rect x={CTRL.x - R} y={CTRL.y - 28} width={R * 2} height={56} rx="10" fill={T.elevated} stroke={T.accent} strokeWidth="2" />
          <text x={CTRL.x} y={CTRL.y - 4} textAnchor="middle" fontSize="14" fontWeight="700" fill={T.accent}>Controller</text>
          <text x={CTRL.x} y={CTRL.y + 16} textAnchor="middle" fontSize="10" fill={T.secondary}>解析输入 + 协调</text>

          {/* 右侧：请求处理路径 */}
          <rect x={440} y={72} width={248} height={260} rx="10" fill={T.elevated} stroke={T.border} strokeWidth="1" />
          <text x={564} y={96} textAnchor="middle" fontSize="13" fontWeight="700" fill={T.primary}>请求处理路径</text>
          <line x1={440} y1={108} x2={688} y2={108} stroke={T.border} strokeWidth="1" />

          {["1. HTTP 请求到达", "2. Controller 解析参数", "3. 调用 Model 业务逻辑", "4. Model 返回结果", "5. 选择 View 模板", "6. View 渲染 HTML", "7. 响应返回客户端"].map((step, i) => (
            <text key={step} x={460} y={132 + i * 28} fontSize="11" fill={i < 3 ? T.accent : i < 5 ? "#3FB97F" : "#E5B567"}>
              {step}
            </text>
          ))}

          {/* 底部职责总结 */}
          <line x1={32} y1={348} x2={688} y2={348} stroke={T.border} strokeWidth="1" />
          <text x={160} y={372} textAnchor="middle" fontSize="11" fontWeight="600" fill="#3FB97F">Model：不知道谁在展示</text>
          <text x={380} y={372} textAnchor="middle" fontSize="11" fontWeight="600" fill="#E5B567">View：不知道数据从哪来</text>
          <text x={590} y={372} textAnchor="middle" fontSize="11" fontWeight="600" fill={T.accent}>Controller：不知道如何渲染</text>

          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="分离的价值：Model 可独立测试，View 可独立替换，Controller 可独立路由" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        MVC 把请求处理切成三个职责：Controller 解析输入并协调，Model 封装业务数据和规则，
        View 负责渲染展示。三者通过明确接口通信，各自可独立演化。
      </figcaption>
    </figure>
  );
}
