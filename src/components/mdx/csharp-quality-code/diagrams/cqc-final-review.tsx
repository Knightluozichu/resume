/**
 * <CqcFinalReviewDiagram>：总复习 · 全书知识图谱。
 *
 * 以四象限布局回顾全书四大质量维度，
 * 每个象限列出核心知识点与关键建议编号。
 * 中心圆点出全书核心：可维护性优先于性能。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

export function CqcFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="总复习知识图谱。四象限回顾全书：语法质量（可空引用与空安全）、设计质量（异常实践与异步模式）、性能质量（集合选择、LINQ 性能与内存分配）、工程质量（线程安全与 API 设计）。中心圆点出全书核心：可维护性优先于性能。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            总复习 · 全书知识图谱
          </text>

          {/* ===== 四象限分割线 ===== */}
          <line x1="360" y1="48" x2="360" y2="400" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <line x1="36" y1="224" x2="684" y2="224" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />

          {/* ===== 左上：语法质量 ===== */}
          <rect x="44" y="56" width="300" height="160" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="194" y="78" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">语法质量</text>
          <text x="60" y="100" fontSize="11" fontWeight="600" fill="var(--text-primary)">可空引用</text>
          <text x="60" y="116" fontSize="10.5" fill="var(--text-secondary)">开启 Nullable，编译器查 null 流向</text>
          <text x="60" y="134" fontSize="10.5" fill="var(--text-secondary)">用 ?. 和 ?? 守卫，不在关键路径用 !</text>
          <text x="60" y="156" fontSize="11" fontWeight="600" fill="var(--text-primary)">类型安全</text>
          <text x="60" y="172" fontSize="10.5" fill="var(--text-secondary)">用 var 配合明确类型的方法签名</text>
          <text x="60" y="190" fontSize="10.5" fill="var(--text-secondary)">优先泛型而非 object，避免装箱</text>
          <text x="60" y="208" fontSize="10.5" fill="var(--text-secondary)">readonly vs const 按版本兼容选择</text>

          {/* ===== 右上：设计质量 ===== */}
          <rect x="376" y="56" width="300" height="160" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="526" y="78" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">设计质量</text>
          <text x="392" y="100" fontSize="11" fontWeight="600" fill="var(--text-primary)">异常实践</text>
          <text x="392" y="116" fontSize="10.5" fill="var(--text-secondary)">抛具体异常，不吞异常，finally 释放</text>
          <text x="392" y="134" fontSize="10.5" fill="var(--text-secondary)">业务异常自定义，系统异常用框架类型</text>
          <text x="392" y="156" fontSize="11" fontWeight="600" fill="var(--text-primary)">异步模式</text>
          <text x="392" y="172" fontSize="10.5" fill="var(--text-secondary)">async/await 一路到顶，不 .Result 阻塞</text>
          <text x="392" y="190" fontSize="10.5" fill="var(--text-secondary)">库代码 ConfigureAwait(false)</text>
          <text x="392" y="208" fontSize="10.5" fill="var(--text-secondary)">CPU 密集用 Task.Run，IO 密集纯 await</text>

          {/* ===== 左下：性能质量 ===== */}
          <rect x="44" y="232" width="300" height="160" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="194" y="254" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">性能质量</text>
          <text x="60" y="276" fontSize="11" fontWeight="600" fill="var(--text-primary)">集合选择</text>
          <text x="60" y="292" fontSize="10.5" fill="var(--text-secondary)">查找用 Dictionary，顺序用 List</text>
          <text x="60" y="310" fontSize="10.5" fill="var(--text-secondary)">频繁增删用 LinkedList，并发用 Concurrent</text>
          <text x="60" y="332" fontSize="11" fontWeight="600" fill="var(--text-primary)">LINQ 与内存</text>
          <text x="60" y="348" fontSize="10.5" fill="var(--text-secondary)">延迟执行多次遍历陷阱，ToList 物化</text>
          <text x="60" y="366" fontSize="10.5" fill="var(--text-secondary)">Span 零拷贝，泛型消除装箱</text>
          <text x="60" y="384" fontSize="10.5" fill="var(--text-secondary)">StringBuilder 拼接，ObjectPool 复用</text>

          {/* ===== 右下：工程质量 ===== */}
          <rect x="376" y="232" width="300" height="160" rx="10" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="526" y="254" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--danger)">工程质量</text>
          <text x="392" y="276" fontSize="11" fontWeight="600" fill="var(--text-primary)">线程安全</text>
          <text x="392" y="292" fontSize="10.5" fill="var(--text-secondary)">竞态条件源于读-改-写非原子</text>
          <text x="392" y="310" fontSize="10.5" fill="var(--text-secondary)">优先并发集合，其次 lock，最后 CAS</text>
          <text x="392" y="332" fontSize="11" fontWeight="600" fill="var(--text-primary)">API 设计</text>
          <text x="392" y="348" fontSize="10.5" fill="var(--text-secondary)">命名自描述，参数 ≤3，错误明确</text>
          <text x="392" y="366" fontSize="10.5" fill="var(--text-secondary)">演进只加不删，兼容是契约</text>
          <text x="392" y="384" fontSize="10.5" fill="var(--text-secondary)">文档注释补语义，单元测试保行为</text>

          {/* ===== 中心圆 ===== */}
          <circle cx="360" cy="224" r="34" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="2" />
          <text x="360" y="220" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">全书</text>
          <text x="360" y="234" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">核心</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书四象限回顾：语法质量保正确，设计质量保健壮，性能质量保高效，工程质量保可维护。可维护性优先于性能，先正确再优化。
      </figcaption>
    </figure>
  );
}
