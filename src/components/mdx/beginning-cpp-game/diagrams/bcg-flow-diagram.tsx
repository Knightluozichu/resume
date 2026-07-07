/**
 * <BcgFlowDiagram>：流程控制结构图（beginning-cpp-game-programming 流程控制章）。
 *
 * 四象限布局对应四种控制结构：
 *   if/else（绿，分支）/ switch（紫，多路选择）/ while（橙，条件循环）/ for（红，计数循环）
 * 每象限左侧画结构骨架（菱形判断 / case 分发 / 循环回环），右侧标注游戏中的应用场景。
 * 中间汇合一条「顺序结构是默认底盘」的提示。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×460、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / 四象限主体 / 底部总结）。
 */

const VIEW_W = 720;
const VIEW_H = 460;

const PAD = 40;
const QUAD_W = (VIEW_W - PAD * 2 - 24) / 2; // 308
const QUAD_H = 132;
const QUAD_TOP = 100;
const QUAD_GAP = 24;
const quadX = (i: number) => PAD + (i % 2) * (QUAD_W + 24);
const quadY = (i: number) => QUAD_TOP + Math.floor(i / 2) * (QUAD_H + QUAD_GAP);

type Quad = {
  id: string;
  name: string;
  color: string;
  skeleton: string;
  scenario: string;
};

const QUADS: readonly Quad[] = [
  { id: "if", name: "if / else", color: "var(--success)", skeleton: "if (条件) { A } else { B }", scenario: "血量 ≤ 0 → 游戏结束" },
  { id: "switch", name: "switch", color: "var(--accent)", skeleton: "switch (v) { case 1: … }", scenario: "菜单选项 1/2/3 分发" },
  { id: "while", name: "while / do-while", color: "var(--warning)", skeleton: "while (运行中) { 更新 }", scenario: "主循环：玩家没退出就一直转" },
  { id: "for", name: "for", color: "var(--danger)", skeleton: "for (i=0; i<n; i++) { }", scenario: "遍历所有敌人逐个更新" },
];

export function BcgFlowDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="流程控制结构图。四象限：左上 if/else（绿色，条件分支，游戏场景：血量小于等于零则游戏结束）；右上 switch（紫色，多路选择，游戏场景：菜单选项分发）；左下 while/do-while（橙色，条件循环，游戏场景：主循环玩家没退出就一直转）；右下 for（红色，计数循环，游戏场景：遍历所有敌人逐个更新）。每个象限左侧画结构骨架，右侧标注应用场景。底部总结：顺序是默认底盘，分支决定走哪条路，循环决定走几次。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            流程控制 · 四种结构
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            顺序是底盘 · 分支决定走哪条路 · 循环决定走几次
          </text>

          {/* ===== 四象限 ===== */}
          {QUADS.map((q, i) => {
            const x = quadX(i);
            const y = quadY(i);
            return (
              <g key={q.id}>
                <rect x={x} y={y} width={QUAD_W} height={QUAD_H} rx="10" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
                {/* 标题 pill */}
                <rect x={x + 12} y={y + 12} width={120} height="26" rx="8" fill={q.color} fillOpacity="0.12" stroke={q.color} strokeWidth="1.2" />
                <text x={x + 72} y={y + 30} textAnchor="middle" fontSize="13" fontWeight="700" fill={q.color}>
                  {q.name}
                </text>

                {/* 结构骨架（代码） */}
                <rect x={x + 12} y={y + 50} width={QUAD_W - 24} height="30" rx="6" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="0.8" />
                <text x={x + QUAD_W / 2} y={y + 69} textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">
                  {q.skeleton}
                </text>

                {/* 游戏场景 */}
                <text x={x + 12} y={y + 100} fontSize="11" fill="var(--text-secondary)">
                  <tspan fontWeight="700" fill="var(--text-primary)">游戏场景：</tspan>
                </text>
                <text x={x + 12} y={y + 118} fontSize="11" fill="var(--text-primary)">
                  {q.scenario}
                </text>
              </g>
            );
          })}

          {/* ===== 底部总结栏 ===== */}
          <rect x="60" y={VIEW_H - 44} width={VIEW_W - 120} height="28" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={VIEW_H - 26} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            所有控制结构都能互相嵌套：循环里套分支，分支里套循环，组成游戏逻辑
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        if/else 做二选一分支，switch 做多路等值分发，while 做条件循环，for 做计数循环。游戏里主循环用 while，菜单用 switch，遍历实体用 for，状态判断用 if。
      </figcaption>
    </figure>
  );
}
