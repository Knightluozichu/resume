/**
 * <MrsMacrosDeepDiagram>：Rust 宏深入图解。
 *
 * 声明宏（macro_rules!）vs 过程宏（derive/attribute/function-like）对比。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×400，四周留白 >=32，字号 >=11。
 */

const VIEW_W = 720;
const VIEW_H = 400;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function MrsMacrosDeepDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="Rust宏深入图解：声明宏macro_rules与过程宏（derive/attribute/function-like）的对比。" className="mx-auto block h-auto w-full max-w-[720px]">
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>{`
            Rust 宏：编译期代码生成
          `}</text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>{`
            声明宏 · 过程宏 · 零运行时开销
          `}</text>

          {/* 左面板：声明宏 */}
          <rect x={36} y={80} width={310} height={180} rx="10" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.4" />
          <text x={191} y={104} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>{`
            声明宏 macro_rules!
          `}</text>
          <line x1={56} y1={116} x2={326} y2={116} stroke={accent} strokeWidth="1" strokeOpacity="0.4" />
          <text x={56} y={138} fontSize="11" fontWeight="600" fill={primary}>{`语法：模式匹配 + 模板展开`}</text>
          <rect x={56} y={148} width={270} height={48} rx="4" fill={elevated} stroke={border} strokeWidth="0.8" />
          <text x={64} y={166} fontSize="11" fill={primary} fontFamily="monospace">{`
            <tspan x={64} dy="0">macro_rules! vec {{</tspan>
            <tspan x={64} dy="14">  ( $( $x:expr ),* ) => {{ }}</tspan>
          `}</text>
          <text x={56} y={216} fontSize="11" fill={secondary}>{`特点：`}</text>
          <text x={56} y={232} fontSize="11" fill={secondary}>{`· 模式匹配驱动（类似 match）`}</text>
          <text x={56} y={248} fontSize="11" fill={secondary}>{`· 无法操作 AST，只能文本替换级`}</text>

          {/* 右面板：过程宏 */}
          <rect x={374} y={80} width={310} height={180} rx="10" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.4" />
          <text x={529} y={104} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>{`
            过程宏 proc-macro
          `}</text>
          <line x1={394} y1={116} x2={664} y2={116} stroke={success} strokeWidth="1" strokeOpacity="0.4" />
          {/* 三种过程宏 */}
          <rect x={394} y={128} width={86} height={56} rx="6" fill={elevated} stroke={warning} strokeWidth="1" />
          <text x={437} y={148} textAnchor="middle" fontSize="11" fontWeight="700" fill={warning}>{`derive`}</text>
          <text x={437} y={166} textAnchor="middle" fontSize="11" fill={secondary}>{`自动实现 trait`}</text>
          <text x={437} y={178} textAnchor="middle" fontSize="11" fill={secondary} fontFamily="monospace">{`#[derive(X)]`}</text>

          <rect x={486} y={128} width={86} height={56} rx="6" fill={elevated} stroke={accent} strokeWidth="1" />
          <text x={529} y={148} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>{`attribute`}</text>
          <text x={529} y={166} textAnchor="middle" fontSize="11" fill={secondary}>{`修饰代码项`}</text>
          <text x={529} y={178} textAnchor="middle" fontSize="11" fill={secondary} fontFamily="monospace">{`#[my_attr]`}</text>

          <rect x={578} y={128} width={86} height={56} rx="6" fill={elevated} stroke={danger} strokeWidth="1" />
          <text x={621} y={148} textAnchor="middle" fontSize="11" fontWeight="700" fill={danger}>{`function`}</text>
          <text x={621} y={166} textAnchor="middle" fontSize="11" fill={secondary}>{`自定义语法`}</text>
          <text x={621} y={178} textAnchor="middle" fontSize="11" fill={secondary} fontFamily="monospace">{`my_macro!()`}</text>

          <text x={394} y={208} fontSize="11" fill={secondary}>{`特点：`}</text>
          <text x={394} y={224} fontSize="11" fill={secondary}>{`· 直接操作 TokenStream（AST 级）`}</text>
          <text x={394} y={240} fontSize="11" fill={secondary}>{`· 可读取、修改、生成任意代码`}</text>
          <text x={394} y={256} fontSize="11" fill={secondary}>{`· 需独立 crate（proc-macro = true）`}</text>

          {/* 底部：对比总结 */}
          <line x1={32} y1={286} x2={VIEW_W - 32} y2={286} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <rect x={48} y={298} width={624} height={70} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={60} y={318} fontSize="12" fontWeight="700" fill={primary}>{`宏 vs 函数`}</text>
          <text x={60} y={338} fontSize="11" fill={secondary}>{`函数：运行时调用 · 参数类型固定 · 有调用开销`}</text>
          <text x={60} y={354} fontSize="11" fill={secondary}>{`宏：编译期展开 · 可变参数/可变语法 · 零运行时开销 · 可生成重复代码`}</text>

          <text x={VIEW_W / 2} y={388} textAnchor="middle" fontSize="11" fill={secondary}>{`
            声明宏够用就别上过程宏 · 过程宏威力大但编译慢调试难
          `}</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Rust 宏深入：声明宏 macro_rules! 与三种过程宏的对比和使用场景。
      </figcaption>
    </figure>
  );
}
