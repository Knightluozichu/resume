/**
 * <RswOwnershipBorrowDiagram>：所有权移动与借用规则图解。
 *
 * 展示 move 语义、不可变借用 & 与可变借用 &mut 的互斥规则。
 * Server Component，viewBox 720×400，CSS 变量配色。
 */

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const danger = "var(--danger)";

export function RswOwnershipBorrowDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="所有权移动与借用规则：move 转移所有权，& 不可变借用允许多个，&mut 可变借用唯一。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            所有权移动与借用规则
          </text>

          {/* move 区 */}
          <rect x={36} y={56} width={200} height={150} rx="10" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={136} y={78} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>move（移动）</text>
          <rect x={56} y={92} width={70} height={40} rx="6" fill={elevated} stroke={border} />
          <text x={91} y={116} textAnchor="middle" fontSize="11" fill={primary}>s1</text>
          <line x1={126} y1={112} x2={186} y2={112} stroke={accent} strokeWidth="1.6" markerEnd="url(#rsw-ob-arrow)" />
          <rect x={186} y={92} width={36} height={40} rx="6" fill={elevated} stroke={border} strokeDasharray="3 3" />
          <text x={204} y={116} textAnchor="middle" fontSize="11" fill={secondary}>s1</text>
          <text x={136} y={156} textAnchor="middle" fontSize="10" fill={secondary}>let s2 = s1;</text>
          <text x={136} y={174} textAnchor="middle" fontSize="10" fill={danger}>s1 此后不可用</text>
          <text x={136} y={192} textAnchor="middle" fontSize="10" fill={secondary}>所有权转移给 s2</text>

          {/* 不可变借用区 */}
          <rect x={260} y={56} width={200} height={150} rx="10" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={360} y={78} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>& 不可变借用</text>
          <rect x={330} y={92} width={60} height={36} rx="6" fill={elevated} stroke={border} />
          <text x={360} y={114} textAnchor="middle" fontSize="11" fill={primary}>data</text>
          <line x1={300} y1={150} x2={350} y2={130} stroke={success} strokeWidth="1.2" />
          <line x1={360} y1={150} x2={360} y2={130} stroke={success} strokeWidth="1.2" />
          <line x1={420} y1={150} x2={370} y2={130} stroke={success} strokeWidth="1.2" />
          <text x={290} y={166} textAnchor="middle" fontSize="10" fill={primary}>&r1</text>
          <text x={360} y={166} textAnchor="middle" fontSize="10" fill={primary}>&r2</text>
          <text x={430} y={166} textAnchor="middle" fontSize="10" fill={primary}>&r3</text>
          <text x={360} y={190} textAnchor="middle" fontSize="10" fill={secondary}>多个 & 可共存</text>

          {/* 可变借用区 */}
          <rect x={484} y={56} width={200} height={150} rx="10" fill={danger} fillOpacity="0.08" stroke={danger} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={584} y={78} textAnchor="middle" fontSize="13" fontWeight="700" fill={danger}>&mut 可变借用</text>
          <rect x={554} y={92} width={60} height={36} rx="6" fill={elevated} stroke={border} />
          <text x={584} y={114} textAnchor="middle" fontSize="11" fill={primary}>data</text>
          <line x1={584} y1={150} x2={584} y2={130} stroke={danger} strokeWidth="1.6" markerEnd="url(#rsw-ob-arrow-r)" />
          <text x={584} y={166} textAnchor="middle" fontSize="10" fill={primary}>&mut r</text>
          <text x={584} y={190} textAnchor="middle" fontSize="10" fill={danger}>同时只能一个</text>

          {/* 规则总结条 */}
          <line x1={36} y1={232} x2={684} y2={232} stroke={border} strokeWidth="1" />
          <text x={360} y={256} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>借用检查器三大规则</text>
          <g>
            <circle cx={120} cy={290} r="14" fill={accent} fillOpacity="0.15" stroke={accent} />
            <text x={120} y={294} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>1</text>
            <text x={120} y={322} textAnchor="middle" fontSize="10" fill={secondary}>每个值只有</text>
            <text x={120} y={336} textAnchor="middle" fontSize="10" fill={secondary}>一个所有者</text>
          </g>
          <g>
            <circle cx={360} cy={290} r="14" fill={success} fillOpacity="0.15" stroke={success} />
            <text x={360} y={294} textAnchor="middle" fontSize="11" fontWeight="700" fill={success}>2</text>
            <text x={360} y={322} textAnchor="middle" fontSize="10" fill={secondary}>任意数量 &amp;</text>
            <text x={360} y={336} textAnchor="middle" fontSize="10" fill={secondary}>或一个 &amp;mut</text>
          </g>
          <g>
            <circle cx={600} cy={290} r="14" fill={danger} fillOpacity="0.15" stroke={danger} />
            <text x={600} y={294} textAnchor="middle" fontSize="11" fontWeight="700" fill={danger}>3</text>
            <text x={600} y={322} textAnchor="middle" fontSize="10" fill={secondary}>引用必须始终</text>
            <text x={600} y={336} textAnchor="middle" fontSize="10" fill={secondary}>有效（生命周期）</text>
          </g>
          <text x={360} y={376} textAnchor="middle" fontSize="11" fill={secondary}>
            编译期借用检查器在零运行时开销下消除数据竞争与悬垂引用
          </text>

          <defs>
            <marker id="rsw-ob-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
            <marker id="rsw-ob-arrow-r" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--danger)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        所有权 move 转移、不可变借用共享、可变借用独占——借用检查器在编译期守护内存安全。
      </figcaption>
    </figure>
  );
}
