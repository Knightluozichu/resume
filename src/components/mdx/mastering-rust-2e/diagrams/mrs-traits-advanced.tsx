/**
 * <MrsTraitsAdvancedDiagram>：Rust Trait 进阶图解。
 *
 * 关联类型、泛型 trait、trait 约束、trait 对象（静态 vs 动态分发）。
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

export function MrsTraitsAdvancedDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="Rust Trait进阶图解：关联类型、泛型trait、trait约束、静态分发vs动态分发。" className="mx-auto block h-auto w-full max-w-[720px]">
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>{`
            Rust Trait 进阶：抽象的多层武器
          `}</text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>{`
            关联类型 · 泛型约束 · 静态/动态分发
          `}</text>

          {/* 上半区：四种 trait 能力卡片 */}
          {/* 关联类型 */}
          <rect x={36} y={76} width={150} height={100} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" />
          <text x={111} y={98} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>{`关联类型`}</text>
          <text x={48} y={118} fontSize="11" fill={primary} fontFamily="monospace">{`type Item;`}</text>
          <text x={48} y={138} fontSize="11" fill={secondary}>{`一个 impl 一组类型`}</text>
          <text x={48} y={156} fontSize="11" fill={secondary}>{`比泛型参数更清晰`}</text>

          {/* 泛型 trait */}
          <rect x={202} y={76} width={150} height={100} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" />
          <text x={277} y={98} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>{`泛型 Trait`}</text>
          <text x={214} y={118} fontSize="11" fill={primary} fontFamily="monospace">{`From&lt;T&gt;`}</text>
          <text x={214} y={138} fontSize="11" fill={secondary}>{`可多次 impl`}</text>
          <text x={214} y={156} fontSize="11" fill={secondary}>{`不同 T 不同实现`}</text>

          {/* Trait 约束 */}
          <rect x={368} y={76} width={150} height={100} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" />
          <text x={443} y={98} textAnchor="middle" fontSize="12" fontWeight="700" fill={warning}>{`Trait 约束`}</text>
          <text x={380} y={118} fontSize="11" fill={primary} fontFamily="monospace">{`T: Ord + Clone`}</text>
          <text x={380} y={138} fontSize="11" fill={secondary}>{`限定泛型能力`}</text>
          <text x={380} y={156} fontSize="11" fill={secondary}>{`编译期检查`}</text>

          {/* 默认实现 */}
          <rect x={534} y={76} width={150} height={100} rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.2" />
          <text x={609} y={98} textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>{`默认实现`}</text>
          <text x={546} y={118} fontSize="11" fill={primary} fontFamily="monospace">{`fn x() {{ .. }}`}</text>
          <text x={546} y={138} fontSize="11" fill={secondary}>{`trait 方法可默认`}</text>
          <text x={546} y={156} fontSize="11" fill={secondary}>{`impl 可覆盖`}</text>

          {/* 分隔线 */}
          <line x1={32} y1={196} x2={VIEW_W - 32} y2={196} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 下半区：静态分发 vs 动态分发 */}
          <rect x={48} y={212} width={296} height={130} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" />
          <text x={196} y={234} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>{`
            静态分发（单态化）
          `}</text>
          <text x={64} y={256} fontSize="11" fill={primary} fontFamily="monospace">{`fn func&lt;T: Trait&gt;(x: T)`}</text>
          <text x={64} y={276} fontSize="11" fill={secondary}>{`· 编译期生成具体类型代码`}</text>
          <text x={64} y={294} fontSize="11" fill={secondary}>{`· 零运行时开销（内联优化）`}</text>
          <text x={64} y={312} fontSize="11" fill={secondary}>{`· 代码膨胀（每种类型一份）`}</text>
          <text x={64} y={330} fontSize="11" fill={secondary}>{`· 适合：性能敏感路径`}</text>

          <rect x={376} y={212} width={296} height={130} rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.2" />
          <text x={524} y={234} textAnchor="middle" fontSize="13" fontWeight="700" fill={danger}>{`
            动态分发（trait 对象）
          `}</text>
          <text x={392} y={256} fontSize="11" fill={primary} fontFamily="monospace">{`fn func(x: &amp;dyn Trait)`}</text>
          <text x={392} y={276} fontSize="11" fill={secondary}>{`· 运行时通过 vtable 查找方法`}</text>
          <text x={392} y={294} fontSize="11" fill={secondary}>{`· 有间接调用开销（无法内联）`}</text>
          <text x={392} y={312} fontSize="11" fill={secondary}>{`· 代码不膨胀（一份代码）`}</text>
          <text x={392} y={330} fontSize="11" fill={secondary}>{`· 适合：异构集合、插件系统`}</text>

          {/* 底部总结 */}
          <text x={VIEW_W / 2} y={366} textAnchor="middle" fontSize="11" fill={secondary}>{`
            关联类型优于泛型参数 · 静态分发优先 · 动态分发兜底 · Trait 是 Rust 的接口抽象
          `}</text>
          <text x={VIEW_W / 2} y={384} textAnchor="middle" fontSize="11" fill={secondary}>{`
            trait object = 胖指针（数据指针 + vtable 指针）
          `}</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Rust Trait 进阶：关联类型、泛型约束与静态/动态分发的对比。
      </figcaption>
    </figure>
  );
}
