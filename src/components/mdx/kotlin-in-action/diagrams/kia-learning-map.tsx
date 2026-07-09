/**
 * <KiaLearningMapDiagram>：Kotlin实战 全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 580;

export function KiaLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Kotlin实战全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Kotlin实战——全书学习地图
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            简介 → 基础 → 函数 → OOP → Lambda → 类型系统 → DSL → 协程 → 复习
          </text>

          <rect x="30" y="62" width="680" height="502" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 第一排：学习地图 与 Kotlin简介 */}
          <rect x="50" y="80" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="205" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">全书学习地图</text>
          <text x="205" y="120" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第0章 知识体系总览</text>
          <text x="205" y="132" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">语言核心/类型系统/并发路径</text>

          <rect x="380" y="80" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="535" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">Kotlin简介</text>
          <text x="535" y="120" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第1章 为什么用Kotlin</text>
          <text x="535" y="132" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Java互操作/设计哲学</text>

          <text x="205" y="156" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="156" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二排：Kotlin基础 与 函数定义与调用 */}
          <rect x="50" y="170" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="205" y="192" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Kotlin基础</text>
          <text x="205" y="210" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第2章 变量/类型/控制流</text>
          <text x="205" y="222" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">字符串模板/when表达式</text>

          <rect x="380" y="170" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="192" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">函数定义与调用</text>
          <text x="535" y="210" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第3章 默认参数/命名参数</text>
          <text x="535" y="222" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">扩展函数/顶层属性</text>

          <text x="205" y="246" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="246" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第三排：类对象接口 与 Lambda编程 */}
          <rect x="50" y="260" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="205" y="282" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">类、对象与接口</text>
          <text x="205" y="300" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第4章 继承/接口/数据类</text>
          <text x="205" y="312" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">object/委托/密封类</text>

          <rect x="380" y="260" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="535" y="282" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">Lambda编程</text>
          <text x="535" y="300" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第5章 高阶函数/Lambda</text>
          <text x="535" y="312" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">集合操作/inline内联</text>

          <text x="205" y="336" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="336" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第四排：类型系统与泛型 与 DSL与领域建模 */}
          <rect x="50" y="350" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="205" y="372" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">类型系统与泛型</text>
          <text x="205" y="390" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第6章 空安全/智能转换</text>
          <text x="205" y="402" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">泛型/型变/reified</text>

          <rect x="380" y="350" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="535" y="372" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">DSL与领域建模</text>
          <text x="535" y="390" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第7章 类型安全构建器</text>
          <text x="535" y="402" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">带接收者Lambda/@DslMarker</text>

          <text x="205" y="426" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="426" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第五排：并发与协程 与 全书复习 */}
          <rect x="50" y="440" width="310" height="56" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="205" y="462" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">并发与协程</text>
          <text x="205" y="480" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第8章 suspend/launch/async</text>
          <text x="205" y="492" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Flow/结构化并发</text>

          <rect x="380" y="440" width="310" height="56" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="535" y="462" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">全书复习</text>
          <text x="535" y="480" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第9章 知识图谱/选型矩阵</text>
          <text x="535" y="492" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">语言核心→类型→并发→DSL</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Kotlin实战全书学习地图——简介、基础、函数、OOP、Lambda、类型系统、DSL、协程八阶段递进路径
      </figcaption>
    </figure>
  );
}
