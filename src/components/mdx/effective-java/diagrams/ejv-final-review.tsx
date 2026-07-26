/**
 * <EjvFinalReviewDiagram>：全书复习思维导图。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function EjvFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Effective Java全书复习思维导图"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Effective Java 全书复习——90 条最佳实践
          </text>

          {/* 中心节点 */}
          <rect x="290" y="240" width="160" height="40" rx="20" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="370" y="265" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">Effective Java</text>

          {/* 八大分支 - 左上：创建对象 */}
          <line x1="290" y1="250" x2="140" y2="100" stroke="var(--warning)" strokeWidth="1.5" />
          <rect x="30" y="80" width="220" height="50" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="140" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">创建与销毁对象 (第1章)</text>
          <text x="140" y="118" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">静态工厂 / Builder / try-with-resources</text>

          {/* 右上：通用方法 */}
          <line x1="450" y1="250" x2="600" y2="100" stroke="var(--danger)" strokeWidth="1.5" />
          <rect x="490" y="80" width="220" height="50" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="600" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">通用方法 (第2章)</text>
          <text x="600" y="118" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">equals / hashCode / toString / compareTo</text>

          {/* 左中上：类与接口 */}
          <line x1="290" y1="260" x2="140" y2="180" stroke="var(--accent)" strokeWidth="1.5" />
          <rect x="30" y="160" width="220" height="50" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="140" y="180" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">类与接口 (第3章)</text>
          <text x="140" y="198" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">组合优于继承 / 最小可访问性</text>

          {/* 右中上：泛型 */}
          <line x1="450" y1="260" x2="600" y2="180" stroke="var(--success)" strokeWidth="1.5" />
          <rect x="490" y="160" width="220" height="50" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="600" y="180" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">泛型 (第4章)</text>
          <text x="600" y="198" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">PECS / 类型安全 / 无原生态类型</text>

          {/* 左中下：枚举注解 */}
          <line x1="290" y1="270" x2="140" y2="340" stroke="var(--warning)" strokeWidth="1.5" />
          <rect x="30" y="320" width="220" height="50" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="140" y="340" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">枚举与注解 (第5章)</text>
          <text x="140" y="358" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">枚举单例 / EnumSet / 注解替代命名模式</text>

          {/* 右中下：Lambda Stream */}
          <line x1="450" y1="270" x2="600" y2="340" stroke="var(--danger)" strokeWidth="1.5" />
          <rect x="490" y="320" width="220" height="50" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="600" y="340" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">Lambda与Stream (第6章)</text>
          <text x="600" y="358" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">方法引用 / 无副作用 / Stream管道</text>

          {/* 左下：方法 */}
          <line x1="290" y1="280" x2="140" y2="420" stroke="var(--accent)" strokeWidth="1.5" />
          <rect x="30" y="400" width="220" height="50" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="140" y="420" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">方法 (第7章)</text>
          <text x="140" y="438" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">参数校验 / 防御性拷贝 / Optional</text>

          {/* 右下：并发 */}
          <line x1="450" y1="280" x2="600" y2="420" stroke="var(--success)" strokeWidth="1.5" />
          <rect x="490" y="400" width="220" height="50" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="600" y="420" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">并发 (第8章)</text>
          <text x="600" y="438" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">同步 / 线程池 / 并发集合 / 安全发布</text>

          {/* 底部总结 */}
          <text x="370" y="490" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">核心理念: 清晰、正确、可维护 &gt; 聪明、快速、花哨</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Effective Java全书复习思维导图——八大主题 90 条最佳实践的完整知识体系
      </figcaption>
    </figure>
  );
}
