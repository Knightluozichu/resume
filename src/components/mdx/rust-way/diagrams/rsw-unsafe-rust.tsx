/**
 * <RswUnsafeRustDiagram>：Safe Rust 与 unsafe 边界。
 *
 * 展示 safe/unsafe 分层、unsafe 块的五大能力及封装契约。
 * Server Component，viewBox 720×400，CSS 变量配色。
 */

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const danger = "var(--danger)";
const warning = "var(--warning)";

const POWERS = [
  "解引用裸指针 *const/*mut",
  "调用 unsafe 函数/方法",
  "访问/修改可变 static",
  "实现 unsafe trait",
  "访问 union 字段",
];

export function RswUnsafeRustDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="unsafe Rust 边界：safe 层由编译器守护，unsafe 块解锁五大能力，封装时须维持不变式。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Safe Rust 与 unsafe 边界
          </text>

          {/* safe 大圈 */}
          <rect x={36} y={52} width={420} height={308} rx="14" fill={success} fillOpacity="0.05" stroke={success} strokeWidth="1.6" strokeOpacity="0.5" />
          <text x={246} y={76} textAnchor="middle" fontSize="14" fontWeight="700" fill={success}>Safe Rust（编译器守护）</text>
          <text x={246} y={94} textAnchor="middle" fontSize="10" fill={secondary}>所有权 · 借用 · 生命周期 · 类型 · 边界检查</text>
          <text x={246} y={112} textAnchor="middle" fontSize="10" fill={secondary}>→ 保证内存安全与线程安全，无需程序员操心</text>

          {/* unsafe 块 */}
          <rect x={100} y={132} width={320} height={180} rx="10" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.6" strokeDasharray="5 3" />
          <text x={260} y={156} textAnchor="middle" fontSize="13" fontWeight="700" fill={danger}>unsafe {`{ ... }`}</text>
          <text x={260} y={174} textAnchor="middle" fontSize="10" fill={secondary}>程序员向编译器承诺：我会手动维护不变式</text>

          {POWERS.map((p, i) => {
            const y = 196 + i * 22;
            return (
              <g key={p}>
                <circle cx={120} cy={y - 4} r="5" fill={danger} />
                <text x={134} y={y} fontSize="10.5" fill={primary}>{p}</text>
              </g>
            );
          })}

          {/* 封装契约 */}
          <rect x={476} y={52} width={208} height={308} rx="14" fill={accent} fillOpacity="0.05" stroke={accent} strokeWidth="1.6" strokeOpacity="0.5" />
          <text x={580} y={76} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>封装契约</text>
          <text x={580} y={96} textAnchor="middle" fontSize="10" fill={secondary}>unsafe 是实现细节</text>
          <text x={580} y={112} textAnchor="middle" fontSize="10" fill={secondary}>不应泄漏到 safe API</text>

          <rect x={496} y={130} width={168} height={50} rx="6" fill={elevated} stroke={border} />
          <text x={580} y={150} textAnchor="middle" fontSize="10" fill={primary}>Vec&lt;T&gt;::push</text>
          <text x={580} y={166} textAnchor="middle" fontSize="9" fill={success}>内部 unsafe，外部 safe</text>

          <rect x={496} y={192} width={168} height={50} rx="6" fill={elevated} stroke={border} />
          <text x={580} y={212} textAnchor="middle" fontSize="10" fill={primary}>Rc / Arc</text>
          <text x={580} y={228} textAnchor="middle" fontSize="9" fill={success}>裸指针 + 引用计数</text>

          <rect x={496} y={254} width={168} height={50} rx="6" fill={elevated} stroke={border} />
          <text x={580} y={274} textAnchor="middle" fontSize="10" fill={primary}>Send / Sync</text>
          <text x={580} y={290} textAnchor="middle" fontSize="9" fill={success}>unsafe impl 标记 trait</text>

          <text x={580} y={326} textAnchor="middle" fontSize="10" fill={warning}>审查重点：不变式是否被</text>
          <text x={580} y={342} textAnchor="middle" fontSize="10" fill={warning}>safe 包装层完整维护</text>

          <text x={360} y={382} textAnchor="middle" fontSize="11" fill={secondary}>
            unsafe 不是关闭安全检查，而是把责任从编译器转移到程序员
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        safe 层由借用检查器守护；unsafe 块解锁裸指针等能力，须用 safe API 封装不变式。
      </figcaption>
    </figure>
  );
}
