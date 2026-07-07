/**
 * <KrcFinalMindMap>：全书总复习思维导图。
 *
 * 以 C 语言核心为根节点，向五个分支辐射：
 *   - 类型与运算符（accent）
 *   - 控制流与函数（success）
 *   - 指针与数组（warning）
 *   - 结构体（accent）
 *   - 输入输出与系统接口（success）
 * 每个分支下列出 2-3 个核心知识点。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×500，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 500;

const CENTER_X = VIEW_W / 2;
const CENTER_Y = 250;

interface Branch {
  title: string;
  color: string;
  items: string[];
  angle: number; // 弧度
}

const BRANCHES: readonly Branch[] = [
  { title: "类型与运算符", color: "var(--accent)", angle: -Math.PI * 0.8, items: ["基本类型与 sizeof", "运算符优先级", "隐式类型转换"] },
  { title: "控制流与函数", color: "var(--success)", angle: -Math.PI * 0.4, items: ["if/switch/循环", "函数参数值传递", "作用域与外部变量"] },
  { title: "指针与数组", color: "var(--warning)", angle: 0, items: ["指针算术 a[i]=*(a+i)", "字符串与字符指针", "指针数组与多级指针"] },
  { title: "结构体", color: "var(--accent)", angle: Math.PI * 0.5, items: ["内存对齐与 padding", "联合与位域", "typedef 别名"] },
  { title: "I/O 与系统接口", color: "var(--success)", angle: Math.PI * 0.85, items: ["标准流与 FILE*", "格式化 I/O", "fd 与系统调用"] },
];

const BRANCH_DIST = 200;
const ITEM_DIST = 250;

export function KrcFinalMindMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C 程序设计语言总复习思维导图。以 C 语言核心为中心，向五个分支辐射：类型与运算符、控制流与函数、指针与数组、结构体、I/O与系统接口，每个分支列出核心知识点。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            C 程序设计语言 · 总复习思维导图
          </text>

          {/* 中心节点 */}
          <ellipse cx={CENTER_X} cy={CENTER_Y} rx="70" ry="36" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x={CENTER_X} y={CENTER_Y - 4} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">C 语言</text>
          <text x={CENTER_X} y={CENTER_Y + 16} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">核心思维</text>

          {/* 分支连接线 + 节点 */}
          {BRANCHES.map((b, i) => {
            const bx = CENTER_X + Math.cos(b.angle) * BRANCH_DIST;
            const by = CENTER_Y + Math.sin(b.angle) * BRANCH_DIST;
            // 曲线连接
            const cx1 = CENTER_X + Math.cos(b.angle) * 80;
            const cy1 = CENTER_Y + Math.sin(b.angle) * 80;
            return (
              <g key={b.title}>
                {/* 连接线 */}
                <path
                  d={`M ${cx1} ${cy1} Q ${bx - Math.cos(b.angle) * 40} ${by - Math.sin(b.angle) * 40} ${bx - Math.cos(b.angle) * 36} ${by - Math.sin(b.angle) * 36}`}
                  fill="none"
                  stroke={b.color}
                  strokeWidth="1.6"
                  strokeOpacity="0.5"
                />

                {/* 分支标题节点 */}
                <rect
                  x={bx - 64}
                  y={by - 16}
                  width={128}
                  height={32}
                  rx="16"
                  fill={b.color}
                  fillOpacity="0.1"
                  stroke={b.color}
                  strokeWidth="1.4"
                />
                <text x={bx} y={by + 5} textAnchor="middle" fontSize="12" fontWeight="700" fill={b.color}>
                  {b.title}
                </text>

                {/* 子项 */}
                {b.items.map((item, ii) => {
                  const spread = 26;
                  const iy = by + 28 + ii * spread;
                  const ix = bx + (b.angle > -Math.PI / 2 && b.angle < Math.PI / 2 ? 0 : 0);
                  return (
                    <g key={item}>
                      <line x1={bx} y1={by + 16} x2={ix - 50} y2={iy} stroke={b.color} strokeWidth="1" strokeOpacity="0.3" />
                      <text x={ix - 46} y={iy + 4} fontSize="11" fill="var(--text-secondary)">• {item}</text>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* 底部总结 */}
          <line x1={32} y1={456} x2={VIEW_W - 32} y2={456} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={480} textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            类型奠基 → 控制流组织逻辑 → 指针操作内存 → 结构体聚合数据 → I/O 连接系统
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        C 程序设计语言总复习思维导图：五大分支（类型运算符、控制流函数、指针数组、结构体、IO与系统接口）辐射全书核心知识点。
      </figcaption>
    </figure>
  );
}
