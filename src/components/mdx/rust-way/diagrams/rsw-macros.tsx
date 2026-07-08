/**
 * <RswMacrosDiagram>：声明宏与过程宏的展开流程。
 *
 * 展示 macro_rules! 模式匹配展开、三类过程宏（derive/attribute/function-like）。
 * Server Component，viewBox 720×400，CSS 变量配色。
 */

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

export function RswMacrosDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="宏系统：声明宏 macro_rules! 模式匹配展开，过程宏在编译期操作语法树。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            宏：编译期代码生成
          </text>

          {/* 声明宏 */}
          <rect x={36} y={56} width={320} height={170} rx="10" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={196} y={78} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>macro_rules!（声明宏）</text>
          <rect x={56} y={92} width={130} height={32} rx="6" fill={elevated} stroke={border} />
          <text x={121} y={112} textAnchor="middle" fontSize="9" fill={primary}>vec![1, 2, 3]</text>
          <line x1={186} y1={108} x2={216} y2={108} stroke={accent} strokeWidth="1.4" markerEnd="url(#rsw-mc-a)" />
          <text x={201} y={100} textAnchor="middle" fontSize="8" fill={secondary}>匹配</text>
          <rect x={216} y={92} width={120} height={32} rx="6" fill={accent} fillOpacity="0.12" stroke={accent} strokeDasharray="3 2" />
          <text x={276} y={112} textAnchor="middle" fontSize="9" fill={accent}>( $($x:expr),* )</text>
          <text x={196} y={142} textAnchor="middle" fontSize="10" fill={secondary}>模式匹配 token 树 → 替换输出</text>
          <text x={196} y={160} textAnchor="middle" fontSize="10" fill={secondary}>展开为：let mut v = Vec::new();</text>
          <text x={196} y={176} textAnchor="middle" fontSize="10" fill={secondary}>v.push(1); v.push(2); v.push(3);</text>
          <text x={196} y={200} textAnchor="middle" fontSize="10" fill={accent}>优点：标准库内置 · 简单易写</text>
          <text x={196} y={216} textAnchor="middle" fontSize="10" fill={warning}>局限：模式匹配受限 · 难调试</text>

          {/* 过程宏 */}
          <rect x={374} y={56} width={310} height={170} rx="10" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={529} y={78} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>过程宏（操作语法树）</text>
          <rect x={394} y={94} width={270} height={32} rx="6" fill={elevated} stroke={border} />
          <text x={529} y={114} textAnchor="middle" fontSize="9" fill={primary}>TokenStream → TokenStream</text>
          <text x={529} y={140} textAnchor="middle" fontSize="10" fill={secondary}>接收源码 token 流，编译期生成代码</text>

          <rect x={394} y={150} width={84} height={62} rx="6" fill={success} fillOpacity="0.12" stroke={success} />
          <text x={436} y={170} textAnchor="middle" fontSize="10" fontWeight="700" fill={success}>derive</text>
          <text x={436} y={186} textAnchor="middle" fontSize="8" fill={secondary}>#[derive(Debug)]</text>
          <text x={436} y={200} textAnchor="middle" fontSize="8" fill={secondary}>为类型追加 impl</text>

          <rect x={487} y={150} width={84} height={62} rx="6" fill={warning} fillOpacity="0.12" stroke={warning} />
          <text x={529} y={170} textAnchor="middle" fontSize="10" fontWeight="700" fill={warning}>attribute</text>
          <text x={529} y={186} textAnchor="middle" fontSize="8" fill={secondary}>#[my_attr]</text>
          <text x={529} y={200} textAnchor="middle" fontSize="8" fill={secondary}>改造被标注项</text>

          <rect x={580} y={150} width={84} height={62} rx="6" fill={danger} fillOpacity="0.12" stroke={danger} />
          <text x={622} y={170} textAnchor="middle" fontSize="10" fontWeight="700" fill={danger}>func-like</text>
          <text x={622} y={186} textAnchor="middle" fontSize="8" fill={secondary}>sql!{...}</text>
          <text x={622} y={200} textAnchor="middle" fontSize="8" fill={secondary}>自定义语法</text>

          {/* 对比总结 */}
          <line x1={36} y1={246} x2={684} y2={246} stroke={border} strokeWidth="1" />
          <text x={360} y={268} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>宏 vs 函数 vs 泛型</text>
          <g>
            <rect x={56} y={284} width={200} height={92} rx="8" fill={elevated} stroke={border} />
            <text x={156} y={304} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>宏 macro!</text>
            <text x={156} y={322} textAnchor="middle" fontSize="9" fill={secondary}>编译期展开 · 可变参数</text>
            <text x={156} y={338} textAnchor="middle" fontSize="9" fill={secondary}>生成新代码 · 不看类型</text>
            <text x={156} y={360} textAnchor="middle" fontSize="9" fill={secondary}>代价：调试难、可读性降</text>
          </g>
          <g>
            <rect x={270} y={284} width={180} height={92} rx="8" fill={elevated} stroke={border} />
            <text x={360} y={304} textAnchor="middle" fontSize="11" fontWeight="700" fill={success}>函数 fn</text>
            <text x={360} y={322} textAnchor="middle" fontSize="9" fill={secondary}>运行期调用 · 固定签名</text>
            <text x={360} y={338} textAnchor="middle" fontSize="9" fill={secondary}>类型检查完整 · 可调试</text>
            <text x={360} y={360} textAnchor="middle" fontSize="9" fill={secondary}>代价：不能生成新代码</text>
          </g>
          <g>
            <rect x={464} y={284} width={200} height={92} rx="8" fill={elevated} stroke={border} />
            <text x={564} y={304} textAnchor="middle" fontSize="11" fontWeight="700" fill={warning}>泛型 &lt;T&gt;</text>
            <text x={564} y={322} textAnchor="middle" fontSize="9" fill={secondary}>编译期单态化 · 类型安全</text>
            <text x={564} y={338} textAnchor="middle" fontSize="9" fill={secondary}>同一逻辑多类型复用</text>
            <text x={564} y={360} textAnchor="middle" fontSize="9" fill={secondary}>代价：代码体积膨胀</text>
          </g>
          <text x={360} y={392} textAnchor="middle" fontSize="11" fill={secondary}>
            原则：能用函数就不用宏——宏是消除样板代码的最后手段
          </text>

          <defs>
            <marker id="rsw-mc-a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        声明宏靠模式匹配展开 token 树，过程宏直接操作语法树——两者都在编译期生成代码。
      </figcaption>
    </figure>
  );
}
