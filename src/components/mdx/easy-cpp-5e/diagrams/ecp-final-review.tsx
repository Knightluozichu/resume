/**
 * <EcpFinalMindMap>：总复习思维导图（easy-cpp-5e 总复习章）。
 *
 * 中心节点「Easy C++」向外辐射三大分支：
 *   C++ 入门（绿）/ 类与对象（紫）/ STL 与进阶（橙）
 * 每分支再分 3 个叶子知识点。分支线用对应色，叶子用浅色卡。
 * 底部一行总结全书学习路径。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×460、四周留白 ≥32、字号 ≥11、间距用 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 460;

const CX = 360;
const CY = 248;

type Branch = {
  id: string;
  name: string;
  color: string;
  bx: number;
  by: number;
  leaves: { name: string; lx: number; ly: number }[];
};

const BRANCHES: readonly Branch[] = [
  {
    id: "basics",
    name: "C++ 入门",
    color: "var(--success)",
    bx: 150,
    by: 130,
    leaves: [
      { name: "变量与类型", lx: 88, ly: 88 },
      { name: "控制流", lx: 88, ly: 132 },
      { name: "第一个程序", lx: 88, ly: 176 },
    ],
  },
  {
    id: "oop",
    name: "类与对象",
    color: "var(--accent)",
    bx: 570,
    by: 130,
    leaves: [
      { name: "函数与引用", lx: 632, ly: 88 },
      { name: "类与封装", lx: 632, ly: 132 },
      { name: "继承与多态", lx: 632, ly: 176 },
    ],
  },
  {
    id: "stl",
    name: "STL 与进阶",
    color: "var(--warning)",
    bx: 360,
    by: 388,
    leaves: [
      { name: "模板入门", lx: 200, ly: 420 },
      { name: "容器与算法", lx: 360, ly: 432 },
      { name: "vector / string", lx: 520, ly: 420 },
    ],
  },
];

export function EcpFinalMindMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Easy C++ 总复习思维导图。中心节点 Easy C++，向外辐射三大分支：C++ 入门（绿色，叶子：变量与类型、控制流、第一个程序）；类与对象（紫色，叶子：函数与引用、类与封装、继承与多态）；STL 与进阶（橙色，叶子：模板入门、容器与算法、vector/string）。底部总结：从 C++ 语法到标准库的完整路径。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Easy C++ · 总复习思维导图
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            三大分支 · 九个知识点 · 串成完整路径
          </text>

          {/* ===== 中心节点 ===== */}
          <ellipse cx={CX} cy={CY} rx="76" ry="34" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="1.8" />
          <text x={CX} y={CY - 2} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">Easy</text>
          <text x={CX} y={CY + 16} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">C++</text>

          {/* ===== 分支与叶子 ===== */}
          {BRANCHES.map((b) => (
            <g key={b.id}>
              {/* 中心 → 分支节点 连线 */}
              <line x1={CX} y1={CY} x2={b.bx} y2={b.by} stroke={b.color} strokeWidth="2" strokeOpacity="0.7" />

              {/* 分支节点 */}
              <rect x={b.bx - 56} y={b.by - 16} width="112" height="32" rx="8" fill={b.color} fillOpacity="0.14" stroke={b.color} strokeWidth="1.4" />
              <text x={b.bx} y={b.by + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill={b.color}>{b.name}</text>

              {/* 分支 → 叶子 连线 + 叶子卡 */}
              {b.leaves.map((lf) => (
                <g key={lf.name}>
                  <line x1={b.bx} y1={b.by} x2={lf.lx} y2={lf.ly} stroke={b.color} strokeWidth="1.2" strokeOpacity="0.5" />
                  <rect x={lf.lx - 52} y={lf.ly - 14} width="104" height="26" rx="6" fill="var(--bg)" stroke={b.color} strokeWidth="1" />
                  <text x={lf.lx} y={lf.ly + 4} textAnchor="middle" fontSize="11" fill="var(--text-primary)">{lf.name}</text>
                </g>
              ))}
            </g>
          ))}

          {/* ===== 底部总结栏 ===== */}
          <rect x="60" y={VIEW_H - 40} width={VIEW_W - 120} height="26" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={VIEW_H - 23} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            从 C++ 语法打底，到面向对象组织结构，再到 STL 提效——三段递进
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书知识以「Easy C++」为中心，分 C++ 入门、类与对象、STL 与进阶三大分支。入门分支提供语法基础，OOP 分支引入封装与多态，STL 分支接触泛型与标准库工具。
      </figcaption>
    </figure>
  );
}
