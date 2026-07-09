/**
 * <KdgFinalReviewDiagram>：全书复习知识图谱图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function KdgFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Kotlin编程权威指南全书复习知识图谱"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            全书知识图谱与选型矩阵
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            语言核心 → 函数式 → OOP → 高级类型 → 并发 → DSL → Android → 测试
          </text>

          <rect x="30" y="62" width="680" height="442" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 中心节点 */}
          <circle cx="370" cy="280" r="50" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="2" />
          <text x="370" y="276" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">Kotlin</text>
          <text x="370" y="292" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">核心语言</text>

          {/* 左上：基础语法 */}
          <rect x="50" y="80" width="140" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="120" y="102" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">基础语法</text>
          <text x="120" y="118" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">val/var 空安全 when</text>
          <line x1="190" y1="120" x2="325" y2="255" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />

          {/* 右上：函数与Lambda */}
          <rect x="550" y="80" width="160" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="630" y="102" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">函数与Lambda</text>
          <text x="630" y="118" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">高阶函数 inline it</text>
          <line x1="555" y1="120" x2="415" y2="255" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />

          {/* 左中：类与对象 */}
          <rect x="50" y="180" width="140" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="120" y="202" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">类与对象</text>
          <text x="120" y="218" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">data sealed 委托</text>
          <line x1="190" y1="205" x2="325" y2="270" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />

          {/* 右中：高级类型 */}
          <rect x="550" y="180" width="160" height="50" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="630" y="202" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">高级类型</text>
          <text x="630" y="218" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">泛型 out/in reified</text>
          <line x1="555" y1="205" x2="415" y2="270" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.4" />

          {/* 左下：协程 */}
          <rect x="50" y="330" width="140" height="50" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="120" y="352" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">协程</text>
          <text x="120" y="368" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">suspend Flow async</text>
          <line x1="190" y1="345" x2="325" y2="295" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.4" />

          {/* 右下：DSL */}
          <rect x="550" y="330" width="160" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="630" y="352" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">DSL构建</text>
          <text x="630" y="368" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">接收者Lambda @DslMarker</text>
          <line x1="555" y1="345" x2="415" y2="295" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />

          {/* 底部左：Android */}
          <rect x="150" y="420" width="160" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="230" y="442" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">Android开发</text>
          <text x="230" y="458" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">扩展 KTX Compose</text>
          <line x1="290" y1="425" x2="340" y2="320" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />

          {/* 底部右：测试 */}
          <rect x="430" y="420" width="160" height="50" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="510" y="442" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">测试实践</text>
          <text x="510" y="458" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">JUnit MockK runTest</text>
          <line x1="450" y1="425" x2="400" y2="320" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.4" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Kotlin编程权威指南全书知识图谱——八大核心领域以Kotlin语言为核心交汇
      </figcaption>
    </figure>
  );
}
