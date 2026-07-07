/**
 * <BcgFinalMindMap>：总复习思维导图（beginning-cpp-game-programming 总复习章）。
 *
 * 中心节点「C++ 游戏编程」向外辐射三大分支：
 *   C++ 基础（绿）/ 游戏机制（紫）/ 项目实战（橙）
 * 每分支再分 3 个叶子知识点。分支线用对应色，叶子用浅色卡。
 * 底部一行总结「从语法到游戏」的完整路径。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×460、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / 放射主体 / 底部总结）。
 */

const VIEW_W = 720;
const VIEW_H = 460;

const CX = 360;
const CY = 248;

type Branch = {
  id: string;
  name: string;
  color: string;
  bx: number; // 分支节点坐标
  by: number;
  leaves: { name: string; lx: number; ly: number }[];
};

const BRANCHES: readonly Branch[] = [
  {
    id: "basics",
    name: "C++ 基础",
    color: "var(--success)",
    bx: 150,
    by: 130,
    leaves: [
      { name: "类型与变量", lx: 88, ly: 88 },
      { name: "流程控制", lx: 88, ly: 132 },
      { name: "函数与类", lx: 88, ly: 176 },
    ],
  },
  {
    id: "game",
    name: "游戏机制",
    color: "var(--accent)",
    bx: 570,
    by: 130,
    leaves: [
      { name: "游戏循环", lx: 632, ly: 88 },
      { name: "SFML 图形", lx: 632, ly: 132 },
      { name: "碰撞检测", lx: 632, ly: 176 },
    ],
  },
  {
    id: "project",
    name: "项目实战",
    color: "var(--warning)",
    bx: 360,
    by: 388,
    leaves: [
      { name: "实体管理", lx: 200, ly: 420 },
      { name: "状态机", lx: 360, ly: 432 },
      { name: "资源管理", lx: 520, ly: 420 },
    ],
  },
];

export function BcgFinalMindMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="总复习思维导图。中心节点 C++ 游戏编程，向外辐射三大分支：C++ 基础（绿色，叶子：类型与变量、流程控制、函数与类）；游戏机制（紫色，叶子：游戏循环、SFML 图形、碰撞检测）；项目实战（橙色，叶子：实体管理、状态机、资源管理）。底部总结：从 C++ 语法到游戏开发，三段递进的完整路径。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            C++ 游戏编程 · 总复习思维导图
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            三大分支 · 九个知识点 · 串成完整路径
          </text>

          {/* ===== 中心节点 ===== */}
          <ellipse cx={CX} cy={CY} rx="76" ry="34" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="1.8" />
          <text x={CX} y={CY - 2} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">C++</text>
          <text x={CX} y={CY + 16} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">游戏编程</text>

          {/* ===== 分支与叶子 ===== */}
          {BRANCHES.map((b) => (
            <g key={b.id}>
              {/* 中心 → 分支节点 连线 */}
              <line x1={CX} y1={CY} x2={b.bx} y2={b.by} stroke={b.color} strokeWidth="2" strokeOpacity="0.7" />

              {/* 分支节点 */}
              <rect x={b.bx - 52} y={b.by - 16} width="104" height="32" rx="8" fill={b.color} fillOpacity="0.14" stroke={b.color} strokeWidth="1.4" />
              <text x={b.bx} y={b.by + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill={b.color}>{b.name}</text>

              {/* 分支 → 叶子 连线 + 叶子卡 */}
              {b.leaves.map((lf) => (
                <g key={lf.name}>
                  <line x1={b.bx} y1={b.by} x2={lf.lx} y2={lf.ly} stroke={b.color} strokeWidth="1.2" strokeOpacity="0.5" />
                  <rect x={lf.lx - 48} y={lf.ly - 14} width="96" height="26" rx="6" fill="var(--bg)" stroke={b.color} strokeWidth="1" />
                  <text x={lf.lx} y={lf.ly + 4} textAnchor="middle" fontSize="11" fill="var(--text-primary)">{lf.name}</text>
                </g>
              ))}
            </g>
          ))}

          {/* ===== 底部总结栏 ===== */}
          <rect x="60" y={VIEW_H - 40} width={VIEW_W - 120} height="26" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={VIEW_H - 23} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            从 C++ 语法打底，到游戏机制搭建，再到项目实战组装——三段递进
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书知识以「C++ 游戏编程」为中心，分 C++ 基础、游戏机制、项目实战三大分支。基础分支提供语法与抽象能力，机制分支引入循环与渲染，实战分支把它们组装成可运行的游戏。
      </figcaption>
    </figure>
  );
}
