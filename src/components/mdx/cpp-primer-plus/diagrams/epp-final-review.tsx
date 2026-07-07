/**
 * <EppFinalMindMap>：全书总复习思维导图（cpp-primer-plus 总复习章）。
 *
 * 中心节点「C++ Primer Plus」向外辐射三大分支：
 *   C++ 基础语法、类与继承、模板与 STL，每分支挂 4 个叶子关键词。
 * 三分支用板块色（紫/绿/橙）区分，叶子用中性卡片。
 * 底部总结「从语法到对象到泛型」的全书主线。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×500、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、中心放射布局。
 */

const VIEW_W = 720;
const VIEW_H = 500;

const CX = VIEW_W / 2;
const CY = 236;

type Branch = {
  name: string;
  color: string;
  angle: number; // 0=右, 90=上, 180=左
  leaves: string[];
};

const BRANCHES: readonly Branch[] = [
  { name: "C++ 基础语法", color: "var(--accent)", angle: 180, leaves: ["变量与类型", "控制流", "函数与引用", "I/O 与命名空间"] },
  { name: "类与继承", color: "var(--success)", angle: 90, leaves: ["类与封装", "构造与 this", "继承与虚函数", "多态与抽象"] },
  { name: "模板与 STL", color: "var(--warning)", angle: 0, leaves: ["函数模板", "类模板", "STL 容器", "泛型算法"] },
];

export function EppFinalMindMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C++ Primer Plus 总复习思维导图。中心节点「C++ Primer Plus」向外辐射三大分支：C++ 基础语法（紫色，含变量与类型、控制流、函数与引用、I/O 与命名空间）、类与继承（绿色，含类与封装、构造与 this、继承与虚函数、多态与抽象）、模板与 STL（橙色，含函数模板、类模板、STL 容器、泛型算法）。底部总结：从语法到对象到泛型，三段递进覆盖 C++ 全貌。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            C++ Primer Plus · 总复习思维导图
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            三段递进：语法怎么写 → 程序怎么组织 → 抽象怎么复用
          </text>

          {/* ===== 分支连线 + 叶子 ===== */}
          {BRANCHES.map((b) => {
            const rad = (b.angle * Math.PI) / 180;
            const bx = CX + Math.cos(rad) * 150;
            const by = CY - Math.sin(rad) * 96;
            return (
              <g key={b.name}>
                <line x1={CX} y1={CY} x2={bx} y2={by} stroke={b.color} strokeWidth="2" strokeOpacity="0.5" />
                {/* 分支节点 */}
                <rect x={bx - 70} y={by - 16} width="140" height="32" rx="16" fill={b.color} fillOpacity="0.14" stroke={b.color} strokeWidth="1.4" />
                <text x={bx} y={by + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill={b.color}>{b.name}</text>

                {/* 叶子 */}
                {b.leaves.map((leaf, i) => {
                  let leafX: number, leafY: number;
                  if (b.angle === 90) {
                    leafX = CX + (i - 1.5) * 130;
                    leafY = by - 44;
                  } else {
                    leafX = b.angle === 180 ? bx - 96 : bx + 96;
                    leafY = by + (i - 1.5) * 28;
                  }
                  return (
                    <g key={leaf}>
                      <line x1={bx} y1={by} x2={leafX} y2={leafY} stroke={b.color} strokeWidth="1" strokeOpacity="0.35" />
                      <rect x={leafX - 56} y={leafY - 12} width="112" height="24" rx="12" fill="var(--bg)" stroke={b.color} strokeWidth="1" />
                      <text x={leafX} y={leafY + 4} textAnchor="middle" fontSize="11" fill="var(--text-primary)">{leaf}</text>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* ===== 中心节点（放最上层）===== */}
          <circle cx={CX} cy={CY} r="52" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.6" />
          <circle cx={CX} cy={CY} r="40" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.2" />
          <text x={CX} y={CY - 4} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">C++ Primer</text>
          <text x={CX} y={CY + 12} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">Plus</text>

          {/* ===== 底部总结栏 ===== */}
          <rect x="60" y={VIEW_H - 56} width={VIEW_W - 120} height="44" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={VIEW_H - 38} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">
            全书主线：从语法到对象到泛型，三段递进覆盖 C++ 全貌
          </text>
          <text x={VIEW_W / 2} y={VIEW_H - 20} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            先掌握基本语法与控制流，再用类与继承组织数据行为，最后用模板与 STL 实现泛型复用
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书三段递进：C++ 基础语法（语法怎么写）、类与继承（程序怎么组织）、模板与 STL（抽象怎么复用）。从过程式到面向对象再到泛型，层层抽象覆盖 C++ 全貌，构成完整的 C++ 学习路径。
      </figcaption>
    </figure>
  );
}
