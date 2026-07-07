/**
 * <EppFunctionsRefDiagram>：C++ 函数四特性图（cpp-primer-plus 函数与引用章）。
 *
 * 2×2 网格展示函数的四个关键特性：
 *   定义结构 / 引用参数 / 默认参数 / 函数重载
 * 每格含语法骨架与一句话要点，引用与重载用板块色强调「避免拷贝」与「同名不同参」。
 * 底部总结栏点出函数是「参数→返回值」的封装单元。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×470、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / 2×2 网格 / 底部总结）。
 */

const VIEW_W = 720;
const VIEW_H = 470;

const CARD_W = 320;
const CARD_H = 150;
const CARD_GAP = 16;
const CARD_MARGIN = 32;
const cardX = (i: number) => CARD_MARGIN + i * (CARD_W + CARD_GAP);
const cardY = (i: number) => 108 + i * (CARD_H + CARD_GAP);

type Feature = {
  name: string;
  color: string;
  syntax: string;
  point: string;
};

const FEATURES: readonly Feature[] = [
  { name: "函数定义", color: "var(--accent)", syntax: "retType name(params) { body }", point: "返回类型 + 名字 + 形参列表 + 函数体，return 把结果交回调用者" },
  { name: "引用参数", color: "var(--success)", syntax: "void f(int& x) { x = 0; }", point: "形参是实参别名，修改形参即改实参，避免大对象拷贝" },
  { name: "默认参数", color: "var(--warning)", syntax: "void f(int a, int b = 1);", point: "右起连续给默认值，调用时可省略对应实参" },
  { name: "函数重载", color: "var(--danger)", syntax: "void f(int); void f(double);", point: "同名不同参（类型/个数），编译器按签名匹配" },
];

export function EppFunctionsRefDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C++ 函数四特性图。2×2 网格：函数定义（返回类型+名字+形参+函数体，return 交回结果）；引用参数（形参是实参别名，避免大对象拷贝）；默认参数（右起连续给默认值，调用可省略）；函数重载（同名不同参，编译器按签名匹配）。底部总结：函数是参数到返回值的封装单元。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            C++ 函数四特性
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            定义结构 / 引用参数 / 默认参数 / 函数重载，构成函数复用的全部手段
          </text>

          {/* ===== 2×2 网格 ===== */}
          {FEATURES.map((f, i) => {
            const x = cardX(i % 2);
            const y = cardY(Math.floor(i / 2));
            return (
              <g key={f.name}>
                <rect x={x} y={y} width={CARD_W} height={CARD_H} rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
                <rect x={x} y={y} width={CARD_W} height="28" rx="8" fill={f.color} fillOpacity="0.12" stroke={f.color} strokeWidth="1.2" />
                <text x={x + 16} y={y + 19} fontSize="14" fontWeight="700" fill={f.color}>{f.name}</text>
                <text x={x + 16} y={y + 56} fontSize="12" fontFamily="monospace" fill="var(--text-primary)">{f.syntax}</text>
                <line x1={x + 16} y1={y + 72} x2={x + CARD_W - 16} y2={y + 72} stroke="var(--border)" strokeWidth="1" />
                <text x={x + 16} y={y + 94} fontSize="12" fill="var(--text-primary)">{f.point}</text>
              </g>
            );
          })}

          {/* ===== 底部总结栏 ===== */}
          <rect x="60" y={VIEW_H - 44} width={VIEW_W - 120} height="28" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={VIEW_H - 26} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            函数 = 参数到返回值的封装：引用避免拷贝、默认参数简化调用、重载让同名各司其职
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        C++ 函数有四个关键特性：定义结构（返回类型+形参+函数体）、引用参数（别名避免拷贝）、默认参数（右起连续赋值）、函数重载（同名按签名匹配）。引用参数是大对象传参的首选，重载让同一操作对多种类型复用名字。
      </figcaption>
    </figure>
  );
}
