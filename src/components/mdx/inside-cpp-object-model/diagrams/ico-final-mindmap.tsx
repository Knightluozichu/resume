/**
 * <IcoFinalMindMap>：全书总复习思维导图（总复习章）。
 *
 * 中心节点「C++ 对象模型」向外辐射五大分支：
 *   - 对象布局（accent 紫）：数据成员 / 对齐 padding / 空类 1B
 *   - 构造语义（success 绿）：构造序列 / 成员初始化 / vptr 两次设置
 *   - 函数模型（warning 暖）：this / 非虚 / 虚 / 静态
 *   - 运行时多态（accent 紫）：虚表 / 虚调用 / RTTI
 *   - 继承与生命（success 绿）：多重继承 this 调整 / 虚继承 / 生命周期
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×520（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 520;

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

interface Branch {
  title: string;
  color: string;
  items: string[];
  // 分支锚点（中心节点外侧）
  ax: number;
  ay: number;
  // 分支节点框
  bx: number;
  by: number;
  bw: number;
  // 文本对齐
  anchor: "start" | "end";
}

const CX = 360;
const CY = 270;

const BRANCHES: readonly Branch[] = [
  {
    title: "对象布局",
    color: "var(--accent)",
    items: ["数据成员内联", "对齐与 padding", "空类 1B / 静态不计入"],
    ax: CX - 110,
    ay: CY - 60,
    bx: 56,
    by: 96,
    bw: 168,
    anchor: "start",
  },
  {
    title: "构造语义",
    color: "var(--success)",
    items: ["构造序列五步", "成员按声明顺序初始化", "vptr 两次设置"],
    ax: CX + 110,
    ay: CY - 60,
    bx: 496,
    by: 96,
    bw: 168,
    anchor: "start",
  },
  {
    title: "函数模型",
    color: "var(--warning)",
    items: ["this 隐式首参", "非虚编译期直调", "虚经 vptr 间接"],
    ax: CX + 120,
    ay: CY + 40,
    bx: 496,
    by: 250,
    bw: 168,
    anchor: "start",
  },
  {
    title: "运行时多态",
    color: "var(--accent)",
    items: ["虚表函数指针表", "虚调用按槽解引用", "RTTI 挂 type_info"],
    ax: CX - 120,
    ay: CY + 40,
    bx: 56,
    by: 250,
    bw: 168,
    anchor: "start",
  },
  {
    title: "继承与生命",
    color: "var(--success)",
    items: ["多重继承 this 偏移", "虚继承共享基类", "生命周期五阶段"],
    ax: CX,
    ay: CY + 90,
    bx: 276,
    by: 408,
    bw: 168,
    anchor: "start",
  },
];

export function IcoFinalMindMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="深度探索 C++ 对象模型总复习思维导图。中心节点 C++ 对象模型向外辐射五大分支：对象布局（数据成员内联、对齐 padding、空类 1B）、构造语义（构造序列五步、成员按声明顺序初始化、vptr 两次设置）、函数模型（this 隐式首参、非虚编译期直调、虚经 vptr 间接）、运行时多态（虚表函数指针表、虚调用按槽解引用、RTTI 挂 type_info）、继承与生命（多重继承 this 偏移、虚继承共享基类、生命周期五阶段）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            《深度探索 C++ 对象模型》总复习
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            一张图串起对象布局、构造语义、函数模型、运行时多态、继承与生命
          </text>

          {/* 连接线（先画，置于底层） */}
          {BRANCHES.map((b) => (
            <path
              key={`line-${b.title}`}
              d={`M ${CX} ${CY} Q ${b.ax} ${b.ay} ${b.bx + (b.bx < CX ? b.bw : 0)} ${b.by + 28}`}
              fill="none"
              stroke={b.color}
              strokeWidth="1.6"
              strokeOpacity="0.6"
            />
          ))}

          {/* 中心节点 */}
          <ellipse cx={CX} cy={CY} rx="108" ry="46" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.8" />
          <text x={CX} y={CY - 4} textAnchor="middle" fontSize="14" fontWeight="700" fill={primary}>C++ 对象模型</text>
          <text x={CX} y={CY + 16} textAnchor="middle" fontSize="10.5" fill={secondary}>布局 · 构造 · 多态 · 生命</text>

          {/* 分支节点 */}
          {BRANCHES.map((b) => (
            <g key={b.title}>
              <rect x={b.bx} y={b.by} width={b.bw} height={28} rx="6" fill={b.color} fillOpacity="0.12" stroke={b.color} strokeWidth="1.5" />
              <text x={b.bx + b.bw / 2} y={b.by + 19} textAnchor="middle" fontSize="12" fontWeight="700" fill={b.color}>
                {b.title}
              </text>
              {b.items.map((it, ii) => (
                <text
                  key={ii}
                  x={b.bx + 10}
                  y={b.by + 48 + ii * 20}
                  fontSize="11"
                  fill={secondary}
                  textAnchor={b.anchor}
                >
                  · {it}
                </text>
              ))}
            </g>
          ))}

          {/* 底部总结 */}
          <line x1={32} y1={478} x2={VIEW_W - 32} y2={478} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={500} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>
            一条主线：对象在内存里长什么样 → 怎么造出来 → 怎么调用 → 怎么多态 → 怎么消亡
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        五大分支汇总全书：对象布局、构造语义、函数模型、运行时多态、继承与生命周期，构成 C++ 对象从内存到行为到消亡的完整图景。
      </figcaption>
    </figure>
  );
}
