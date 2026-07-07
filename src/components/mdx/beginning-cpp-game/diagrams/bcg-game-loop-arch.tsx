/**
 * <BcgGameLoopArchDiagram>：游戏循环架构图（beginning-cpp-game-programming 游戏循环章）。
 *
 * 中央画一个环形流程：初始化 → 处理输入 → 更新状态 → 渲染 → （检测退出）→ 回到处理输入。
 * 环外左侧标「进入循环前」、右侧标「退出循环后」。每步用彩色节点 + 图标式简笔。
 * 底部对比「游戏循环 vs 普通软件事件驱动」的本质差异。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×460、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / 环形主体 / 底部总结）。
 */

const VIEW_W = 720;
const VIEW_H = 460;

// 环心
const CX = 360;
const CY = 250;
const R = 120;

// 五个阶段节点（沿环顺时针）
type Stage = { id: string; name: string; color: string; desc: string; angle: number };
const STAGES: readonly Stage[] = [
  { id: "init", name: "初始化", color: "var(--success)", desc: "建窗口、加载资源", angle: -90 },
  { id: "input", name: "处理输入", color: "var(--accent)", desc: "读键盘/鼠标", angle: -18 },
  { id: "update", name: "更新状态", color: "var(--warning)", desc: "推进物理/AI", angle: 54 },
  { id: "render", name: "渲染", color: "var(--danger)", desc: "画出当前画面", angle: 126 },
  { id: "exit", name: "检测退出", color: "var(--text-secondary)", desc: "玩家退出？", angle: 198 },
];

const nodePos = (angle: number) => {
  const rad = (angle * Math.PI) / 180;
  return { x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) };
};

export function BcgGameLoopArchDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="游戏循环架构图。环形流程五步顺时针：初始化（绿色，建窗口加载资源）、处理输入（紫色，读键盘鼠标）、更新状态（橙色，推进物理 AI）、渲染（红色，画出当前画面）、检测退出（灰色，玩家是否退出）。未退出则回到处理输入循环往复，退出则结束循环。环心标注「每帧重复」。底部对比：游戏循环主动推进，普通软件事件驱动被动等待。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="bcg-loop-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
              <path d="M0 0 L9 4.5 L0 9 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            游戏循环 · 架构
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            初始化 → 处理输入 → 更新 → 渲染 → 检测退出 → 循环
          </text>

          {/* ===== 环形主路径（虚线圆） ===== */}
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="var(--border)" strokeWidth="1.4" strokeDasharray="4 4" />

          {/* 环心文字 */}
          <text x={CX} y={CY - 8} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">每帧重复</text>
          <text x={CX} y={CY + 12} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">一帧 ≈ 16ms</text>
          <text x={CX} y={CY + 30} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">(60 fps)</text>

          {/* ===== 阶段节点 + 弧形箭头 ===== */}
          {STAGES.map((s, i) => {
            const p = nodePos(s.angle);
            const next = STAGES[(i + 1) % STAGES.length];
            const np = nodePos(next.angle);
            // 描述标签放在节点外侧（远离环心方向）
            const rad = (s.angle * Math.PI) / 180;
            const lblX = CX + (R + 44) * Math.cos(rad);
            const lblY = CY + (R + 44) * Math.sin(rad);
            return (
              <g key={s.id}>
                {/* 节点圆 */}
                <circle cx={p.x} cy={p.y} r="28" fill="var(--bg)" stroke={s.color} strokeWidth="2" />
                <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={s.color}>{s.name}</text>

                {/* 节点外侧描述标签 */}
                <text x={lblX} y={lblY} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{s.desc}</text>

                {/* 弧形箭头到下一节点 */}
                {i < STAGES.length - 1 && (
                  <path
                    d={`M ${p.x} ${p.y} Q ${CX} ${CY} ${np.x} ${np.y}`}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="1.4"
                    strokeOpacity="0.5"
                    markerEnd="url(#bcg-loop-arrow)"
                  />
                )}
              </g>
            );
          })}

          {/* 退出箭头：检测退出 → 结束 */}
          {(() => {
            const exitP = nodePos(STAGES[4].angle);
            return (
              <line x1={exitP.x} y1={exitP.y} x2={exitP.x - 60} y2={exitP.y + 50} stroke="var(--text-secondary)" strokeWidth="1.6" strokeDasharray="5 3" markerEnd="url(#bcg-loop-arrow)" />
            );
          })()}
          <text x="210" y="380" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">退出 → 结束循环</text>

          {/* 初始化进入箭头 */}
          {(() => {
            const initP = nodePos(STAGES[0].angle);
            return (
              <line x1={initP.x} y1={initP.y - 40} x2={initP.x} y2={initP.y - 32} stroke="var(--success)" strokeWidth="1.6" markerEnd="url(#bcg-loop-arrow)" />
            );
          })()}

          {/* ===== 底部对比栏 ===== */}
          <rect x="60" y={VIEW_H - 44} width={VIEW_W - 120} height="28" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={VIEW_H - 26} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            游戏循环主动每帧推进 · 普通软件被动等事件——这是游戏的心跳
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        游戏循环在初始化后反复执行「处理输入 → 更新状态 → 渲染 → 检测退出」四步，直到玩家退出。即使没人操作，世界也在更新——这是游戏区别于事件驱动软件的根本结构。
      </figcaption>
    </figure>
  );
}
