/**
 * <YdkLearningMapDiagram>：《你不知道的JavaScript》全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。SVG 文本中 > 用 &gt;、} 用 &rbrace;、{ 用 &lbrace;。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function YdkLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="你不知道的JavaScript 全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            《你不知道的JavaScript》全书学习地图
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            类型与语法 → 作用域与闭包 → this 与原型 → 异步与性能 → 总复习
          </text>

          <rect x="30" y="70" width="680" height="372" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 第一排：类型与语法 + 全书学习地图 */}
          <rect x="50" y="86" width="310" height="58" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="205" y="108" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">类型与语法</text>
          <text x="205" y="126" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">类型转换的隐式规则（== 与 ===）</text>
          <text x="205" y="138" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">语法与原生函数（包装类型）</text>

          <rect x="380" y="86" width="310" height="58" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="108" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">全书学习地图</text>
          <text x="535" y="126" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">YDKJS 四大支柱总览</text>
          <text x="535" y="138" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">从语法表层到运行时机制</text>

          <text x="205" y="166" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="166" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二排：作用域与闭包 */}
          <rect x="50" y="180" width="310" height="58" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="205" y="202" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">作用域与闭包</text>
          <text x="205" y="220" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">词法作用域与闭包深度</text>
          <text x="205" y="232" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">提升机制（函数优先 / TDZ）</text>

          <rect x="380" y="180" width="310" height="58" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="535" y="202" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">核心追问</text>
          <text x="535" y="220" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">变量在哪可见？为何不释放？</text>
          <text x="535" y="232" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">提升如何让代码在编译期重排</text>

          <text x="205" y="260" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="260" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第三排：this 与原型 */}
          <rect x="50" y="274" width="310" height="58" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="205" y="296" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">this 与原型</text>
          <text x="205" y="314" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">this 绑定四规则（默认/隐式/显式/new）</text>
          <text x="205" y="326" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">[[Prototype]] 与原型链终结</text>

          <rect x="380" y="274" width="310" height="58" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="296" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">对象归属</text>
          <text x="535" y="314" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">this 在调用时指向谁？</text>
          <text x="535" y="326" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">行为如何沿原型链复用与终结</text>

          <text x="205" y="354" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="354" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第四排：异步与性能 + 总复习 */}
          <rect x="50" y="368" width="310" height="58" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="205" y="390" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">异步与性能</text>
          <text x="205" y="408" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">生成器与迭代器协议</text>
          <text x="205" y="420" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Promise 队列与并发模式</text>

          <rect x="380" y="368" width="310" height="58" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="535" y="390" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">全书总复习</text>
          <text x="535" y="408" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">四支柱知识图谱串联</text>
          <text x="535" y="420" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">JS 机制工程判断力</text>

          <text x={VIEW_W / 2} y="448" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：从「会写语法」到「懂机制」的四支柱进阶
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        你不知道的JavaScript全书学习地图——类型语法、作用域闭包、this原型、异步性能四支柱递进路径
      </figcaption>
    </figure>
  );
}
