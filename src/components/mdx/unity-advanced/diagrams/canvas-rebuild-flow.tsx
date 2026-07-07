/**
 * <CanvasRebuildFlow>：Canvas重建流程图
 *
 * UGUI性能关键：Canvas重建（Rebuild）是UI性能瓶颈之一。
 * 流程：UI元素变化 → 标记Canvas为dirty → 等待LayoutRebuild/GraphicRebuild →
 *       重新计算布局 → 重新合批 → 生成DrawCall → 渲染
 * 核心优化点：拆分Canvas、关闭不必要的Raycast Target、避免频繁SetActive。
 */

const VIEW_W = 860;
const VIEW_H = 420;

const STEP_W = 130;
const STEP_H = 64;
const STEP_Y = 160;
const STEP_GAP = 28;

type Step = {
  label: string;
  sub: string;
  color: string;
  hot?: boolean;
};

const STEPS: readonly Step[] = [
  { label: "UI变化", sub: "Transform/Image/Text\n属性改变", color: "var(--accent)" },
  { label: "标记Dirty", sub: "LayoutDirty或\nMaterialDirty", color: "var(--warning)", hot: true },
  { label: "等待帧结束", sub: "Canvas.SendWillRenderCanvases", color: "var(--text-secondary)" },
  { label: "重建Layout", sub: "ILayoutElement\n计算位置大小", color: "var(--warning)", hot: true },
  { label: "重建Graphic", sub: "顶点/UV/颜色\n重新生成", color: "var(--danger)", hot: true },
  { label: "重新合批", sub: "深度排序+图集\n合并Batch", color: "var(--danger)", hot: true },
  { label: "DrawCall", sub: "提交GPU渲染", color: "var(--success)" },
];

function stepX(i: number) {
  return 40 + i * (STEP_W + STEP_GAP);
}

export function CanvasRebuildFlow() {
  return (
    <div className="my-8 w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="mx-auto w-full max-w-[860px]"
        style={{ minWidth: 680 }}
        role="img"
        aria-label="Canvas重建流程图"
      >
        <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="var(--bg-elevated)" rx="12" />

        <text x={VIEW_W / 2} y={32} textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="600" fontFamily="system-ui">
          Canvas 重建流程（Rebuild Pipeline）
        </text>
        <text x={VIEW_W / 2} y={54} textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="system-ui">
          一个UI元素变化会导致整个Canvas下所有元素重建——这是UGUI第一大性能坑
        </text>

        {/* 流程步骤 */}
        {STEPS.map((step, i) => {
          const x = stepX(i);
          const isLast = i === STEPS.length - 1;
          return (
            <g key={step.label}>
              <rect x={x} y={STEP_Y} width={STEP_W} height={STEP_H} fill="var(--bg)" stroke={step.color} strokeWidth={step.hot ? 2 : 1.2} rx="7" />
              <rect x={x} y={STEP_Y} width={STEP_W} height={4} fill={step.color} rx="2" />
              {step.hot && (
                <rect x={x + STEP_W - 20} y={STEP_Y + 6} width={14} height={14} fill={step.color} rx="3" />
              )}
              {step.hot && (
                <text x={x + STEP_W - 13} y={STEP_Y + 17} textAnchor="middle" fill="var(--bg)" fontSize="9" fontWeight="700" fontFamily="system-ui">!</text>
              )}
              <text x={x + STEP_W / 2} y={STEP_Y + 26} textAnchor="middle" fill="step.color" fontSize="13" fontWeight="600" fontFamily="system-ui">
                {step.label}
              </text>
              <text x={x + STEP_W / 2} y={STEP_Y + 44} textAnchor="middle" fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui">
                {step.sub.split("\n")[0]}
              </text>
              <text x={x + STEP_W / 2} y={STEP_Y + 56} textAnchor="middle" fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui">
                {step.sub.split("\n")[1]}
              </text>

              {/* 箭头 */}
              {!isLast && (
                <path
                  d={`M ${x + STEP_W + 2} ${STEP_Y + STEP_H / 2} L ${x + STEP_W + STEP_GAP - 4} ${STEP_Y + STEP_H / 2}`}
                  stroke="var(--border)"
                  strokeWidth="2"
                  fill="none"
                  markerEnd="url(#cr-arrow)"
                />
              )}
            </g>
          );
        })}

        {/* 问题区标注 */}
        <g>
          <rect x={stepX(1) - 8} y={STEP_Y - 38} width={STEP_W * 4 + STEP_GAP * 3 + 16} height={26} fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" strokeDasharray="4 3" rx="5" />
          <text x={stepX(1) + (STEP_W * 4 + STEP_GAP * 3) / 2} y={STEP_Y - 20} textAnchor="middle" fill="var(--danger)" fontSize="11" fontWeight="600" fontFamily="system-ui">
            ⚠ 耗时区域：同一Canvas下所有元素都参与计算，哪怕只改了一个Text
          </text>
        </g>

        {/* 优化策略区 */}
        <g>
          <rect x={40} y={270} width={780} height={110} fill="var(--bg)" stroke="var(--border)" strokeWidth="1" rx="8" />
          <text x={60} y={294} fill="var(--success)" fontSize="13" fontWeight="600" fontFamily="system-ui">
            主程优化策略
          </text>

          {[
            { title: "拆分Canvas", desc: "频繁变化的UI（血条/倒计时/飘字）放独立Canvas", x: 60, color: "var(--accent)" },
            { title: "关闭Raycast Target", desc: "纯装饰Image/Text关闭Raycast，减少射线检测", x: 260, color: "var(--accent)" },
            { title: "避免SetActive", desc: "用CanvasGroup.alpha=0或改变Layer替代SetActive", x: 460, color: "var(--warning)" },
            { title: "图集合批", desc: "同Canvas下UI使用同一图集，材质相同才能合批", x: 660, color: "var(--success)" },
          ].map((opt) => (
            <g key={opt.title}>
              <rect x={opt.x} y={306} width={175} height={60} fill={opt.color} fillOpacity="0.06" stroke={opt.color} strokeWidth="0.8" rx="5" />
              <text x={opt.x + 87.5} y={326} textAnchor="middle" fill={opt.color} fontSize="11" fontWeight="600" fontFamily="system-ui">
                {opt.title}
              </text>
              <text x={opt.x + 10} y={346} fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui">
                {opt.desc}
              </text>
            </g>
          ))}
        </g>

        <defs>
          <marker id="cr-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="var(--border)" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
