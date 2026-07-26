/**
 * <BcgFunctionMechanismDiagram>：函数机制图（beginning-cpp-game-programming 函数章）。
 *
 * 四列布局对应四个机制：
 *   值传递（绿）/ 引用传递（紫）/ 默认参数（橙）/ 函数重载（红）
 * 每列顶部彩色标题，中部画「调用方 → 函数」的数据流向（值传复制副本，引用传共享同一份），
 * 底部一行代码示例 + 游戏用途说明。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×460、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / 四列主体 / 底部总结）。
 */

const VIEW_W = 720;
const VIEW_H = 460;

const COL_W = 156;
const COL_GAP = 16;
const COL_MARGIN = 40;
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

const COL_TOP = 96;
const CODE_Y = 300;
const USE_Y = 340;

type Mech = {
  id: string;
  name: string;
  color: string;
  code: string;
  use: string;
  flow: "copy" | "alias" | "default" | "overload";
};

const MECHS: readonly Mech[] = [
  { id: "value", name: "值传递", color: "var(--success)", code: "f(int x)", use: "传分数、传坐标副本", flow: "copy" },
  { id: "ref", name: "引用传递", color: "var(--accent)", code: "f(int& x)", use: "让函数改原变量", flow: "alias" },
  { id: "default", name: "默认参数", color: "var(--warning)", code: "f(int n = 10)", use: "不传参就用默认值", flow: "default" },
  { id: "overload", name: "函数重载", color: "var(--danger)", code: "f(int) / f(string)", use: "同名函数按参数区分", flow: "overload" },
];

export function BcgFunctionMechanismDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
         aria-label="函数机制图。四列：值传递（绿色，复制副本传给函数，代码 f(int x)，用途传分数坐标副本）；引用传递（紫色，共享同一份变量，代码 f(int& x)，用途让函数改原变量）；默认参数（橙色，不传参时用默认值，代码 f(int n=10)，用途简化调用）；函数重载（红色，同名按参数类型区分，代码 f(int) 与 f(string)，用途同名函数多用途）。每列画调用方到函数的数据流向。底部总结：值传递安全但改不了原值，引用传递高效但需谨慎，默认参数和重载提升表达力。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="bcg-fn-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0 0 L8 4 L0 8 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            函数机制 · 四种特性
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            参数怎么传 · 怎么省 · 怎么同名复用
          </text>

          {/* ===== 四列 ===== */}
          {MECHS.map((m, ci) => {
            const x = colX(ci);
            const cx = x + COL_W / 2;
            return (
              <g key={m.id}>
                {/* 列头 pill */}
                <rect x={x} y={COL_TOP} width={COL_W} height="28" rx="8" fill={m.color} fillOpacity="0.12" stroke={m.color} strokeWidth="1.2" />
                <text x={cx} y={COL_TOP + 19} textAnchor="middle" fontSize="14" fontWeight="700" fill={m.color}>
                  {m.name}
                </text>

                {/* 数据流可视化区 */}
                <rect x={x} y={COL_TOP + 40} width={COL_W} height="120" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />

                {/* 调用方盒子 */}
                <rect x={x + 24} y={COL_TOP + 54} width={108} height="24" rx="5" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="0.8" />
                <text x={cx} y={COL_TOP + 70} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">调用方</text>

                {/* 流向图：值传递画两个盒子（副本），引用画一个共享盒子 */}
                {m.flow === "copy" && (
                  <>
                    <line x1={cx} y1={COL_TOP + 78} x2={cx} y2={COL_TOP + 96} stroke="var(--success)" strokeWidth="1.6" markerEnd="url(#bcg-fn-arrow)" />
                    <rect x={x + 24} y={COL_TOP + 98} width={108} height="24" rx="5" fill="var(--bg-elevated)" stroke="var(--success)" strokeWidth="1" />
                    <text x={cx} y={COL_TOP + 114} textAnchor="middle" fontSize="11" fill="var(--text-primary)">函数收到副本</text>
                    <text x={cx} y={COL_TOP + 138} textAnchor="middle" fontSize="11" fill="var(--success)">原值不变</text>
                  </>
                )}
                {m.flow === "alias" && (
                  <>
                    <line x1={cx} y1={COL_TOP + 78} x2={cx} y2={COL_TOP + 96} stroke="var(--accent)" strokeWidth="1.6" markerEnd="url(#bcg-fn-arrow)" />
                    <rect x={x + 24} y={COL_TOP + 98} width={108} height="24" rx="5" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
                    <text x={cx} y={COL_TOP + 114} textAnchor="middle" fontSize="11" fill="var(--text-primary)">同一份变量</text>
                    <text x={cx} y={COL_TOP + 138} textAnchor="middle" fontSize="11" fill="var(--accent)">改它 = 改原值</text>
                  </>
                )}
                {m.flow === "default" && (
                  <>
                    <text x={cx} y={COL_TOP + 96} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">传参？</text>
                    <line x1={cx - 28} y1={COL_TOP + 104} x2={cx - 28} y2={COL_TOP + 120} stroke="var(--success)" strokeWidth="1.4" markerEnd="url(#bcg-fn-arrow)" />
                    <text x={cx - 28} y={COL_TOP + 134} textAnchor="middle" fontSize="11" fill="var(--success)">用实参</text>
                    <line x1={cx + 28} y1={COL_TOP + 104} x2={cx + 28} y2={COL_TOP + 120} stroke="var(--warning)" strokeWidth="1.4" markerEnd="url(#bcg-fn-arrow)" />
                    <text x={cx + 28} y={COL_TOP + 134} textAnchor="middle" fontSize="11" fill="var(--warning)">用默认</text>
                  </>
                )}
                {m.flow === "overload" && (
                  <>
                    <rect x={x + 16} y={COL_TOP + 92} width={56} height="22" rx="5" fill="var(--bg-elevated)" stroke="var(--danger)" strokeWidth="1" />
                    <text x={x + 44} y={COL_TOP + 107} textAnchor="middle" fontSize="11" fill="var(--text-primary)">f(int)</text>
                    <rect x={x + 84} y={COL_TOP + 92} width={56} height="22" rx="5" fill="var(--bg-elevated)" stroke="var(--danger)" strokeWidth="1" />
                    <text x={x + 112} y={COL_TOP + 107} textAnchor="middle" fontSize="11" fill="var(--text-primary)">f(str)</text>
                    <text x={cx} y={COL_TOP + 134} textAnchor="middle" fontSize="11" fill="var(--danger)">编译器按参数选</text>
                  </>
                )}

                {/* 代码示例 */}
                <rect x={x} y={CODE_Y} width={COL_W} height="26" rx="6" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="0.8" />
                <text x={cx} y={CODE_Y + 17} textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">
                  {m.code}
                </text>

                {/* 用途 */}
                <text x={cx} y={USE_Y} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
                  {m.use}
                </text>
              </g>
            );
          })}

          {/* ===== 底部总结栏 ===== */}
          <rect x="60" y={VIEW_H - 44} width={VIEW_W - 120} height="28" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={VIEW_H - 26} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            值传递安全 · 引用传递高效 · 默认参数省事 · 重载同名多义
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        值传递把实参复制一份给形参，函数内改动不影响原值；引用传递让形参成为实参的别名，函数可直接修改原变量。默认参数让调用更简洁，函数重载让同名函数按参数列表区分语义。
      </figcaption>
    </figure>
  );
}
