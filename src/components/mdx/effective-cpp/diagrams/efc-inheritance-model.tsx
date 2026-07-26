/**
 * <EfcInheritanceModelDiagram>：继承模型（继承与多态章）。
 *
 * 左侧展示三种函数的继承语义：
 *   - 纯虚函数（pure virtual）：只声明接口，派生类必须实现
 *   - 虚函数（virtual）：声明接口 + 提供默认实现，派生类可覆盖
 *   - 非虚函数（non-virtual）：接口 + 强制实现，派生类不应重新定义
 * 右侧展示 NVI（Non-Virtual Interface）模式：public 非虚函数调用 private 虚函数
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×480（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 480;

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const border = "var(--border)";

interface FuncType {
  name: string;
  syntax: string;
  meaning: string;
  derived: string;
  color: string;
}

const FUNC_TYPES: readonly FuncType[] = [
  {
    name: "纯虚函数",
    syntax: "virtual void f() = 0;",
    meaning: "只声明接口，不含实现",
    derived: "派生类必须实现",
    color: warning,
  },
  {
    name: "虚函数",
    syntax: "virtual void f() {}",
    meaning: "声明接口 + 默认实现",
    derived: "派生类可覆盖",
    color: accent,
  },
  {
    name: "非虚函数",
    syntax: "void f() {}",
    meaning: "接口 + 强制实现",
    derived: "派生类不应重定义",
    color: success,
  },
];

export function EfcInheritanceModelDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="继承模型图。左侧展示三种函数的继承语义：纯虚函数只声明接口派生类必须实现、虚函数声明接口加默认实现派生类可覆盖、非虚函数接口加强制实现派生类不应重定义。右侧展示 NVI 非虚接口模式：public 非虚函数调用 private 虚函数。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="efc-im-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={secondary} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            继承模型：接口继承 vs 实现继承
          </text>

          {/* ===== 左侧：三种函数 ===== */}
          <text x={180} y={58} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>
            三种函数的继承语义
          </text>

          {FUNC_TYPES.map((ft, i) => {
            const y = 74 + i * 92;
            return (
              <g key={ft.name}>
                <rect x={40} y={y} width={300} height={78} rx="10" fill={ft.color} fillOpacity="0.06" stroke={ft.color} strokeWidth="1.6" />
                <rect x={40} y={y} width={4} height={78} rx="2" fill={ft.color} />
                <text x={56} y={y + 22} fontSize="13" fontWeight="700" fill={ft.color}>{ft.name}</text>
                <text x={56} y={y + 42} fontSize="11" fill={primary} fontFamily="monospace">{ft.syntax}</text>
                <text x={56} y={y + 60} fontSize="11" fill={secondary}>{ft.meaning}</text>
                <text x={56} y={y + 74} fontSize="11" fill={secondary}>→ {ft.derived}</text>
              </g>
            );
          })}

          {/* ===== 右侧：NVI 模式 ===== */}
          <text x={540} y={58} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            NVI 非虚接口模式（条款 35）
          </text>

          {/* public 非虚函数 */}
          <rect x={400} y={78} width={280} height={60} rx="8" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.6" />
          <text x={540} y={100} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent} fontFamily="monospace">public: void doWork()</text>
          <text x={540} y={118} textAnchor="middle" fontSize="11" fill={secondary}>非虚：前置条件检查</text>

          {/* 箭头向下 */}
          <line x1={540} y1={138} x2={540} y2={162} stroke={secondary} strokeWidth="1.8" markerEnd="url(#efc-im-arrow)" />
          <text x={560} y={154} fontSize="11" fill={secondary}>调用</text>

          {/* private 虚函数 */}
          <rect x={400} y={168} width={280} height={60} rx="8" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1.6" />
          <text x={540} y={190} textAnchor="middle" fontSize="12" fontWeight="700" fill={warning} fontFamily="monospace">private: virtual doWorkImpl()</text>
          <text x={540} y={208} textAnchor="middle" fontSize="11" fill={secondary}>虚：真正的多态入口</text>

          {/* 箭头向下 */}
          <line x1={540} y1={228} x2={540} y2={252} stroke={secondary} strokeWidth="1.8" markerEnd="url(#efc-im-arrow)" />
          <text x={560} y={244} fontSize="11" fill={secondary}>调用后</text>

          {/* 后置条件 */}
          <rect x={400} y={258} width={280} height={60} rx="8" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.6" />
          <text x={540} y={280} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent} fontFamily="monospace">后置条件 / 清理</text>
          <text x={540} y={298} textAnchor="middle" fontSize="11" fill={secondary}>非虚：保证不变式</text>

          {/* NVI 优势 */}
          <rect x={400} y={332} width={280} height={58} rx="8" fill={success} fillOpacity="0.05" stroke={success} strokeWidth="1.2" />
          <text x={540} y={352} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={success}>
            NVI 优势
          </text>
          <text x={540} y={370} textAnchor="middle" fontSize="11" fill={secondary}>统一前后置检查，分离接口与实现</text>
          <text x={540} y={384} textAnchor="middle" fontSize="11" fill={secondary}>派生类只重写实现，不改接口</text>

          {/* ===== 底部总结 ===== */}
          <line x1={32} y1={412} x2={VIEW_W - 32} y2={412} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={436} textAnchor="middle" fontSize="11.5" fill={secondary}>
            public 继承 = is-a；纯虚 = 只继承接口，虚 = 接口+默认实现，非虚 = 接口+强制实现
          </text>
          <text x={VIEW_W / 2} y={456} textAnchor="middle" fontSize="11" fill={secondary}>
            条款 32-40：is-a 关系、避免名称遮蔽、绝不重定义 non-virtual 与缺省参数值
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        继承模型：左侧三种函数语义（纯虚=只继承接口、虚=接口+默认实现、非虚=接口+强制实现），右侧 NVI 模式（public 非虚函数包裹 private 虚函数）。
      </figcaption>
    </figure>
  );
}
