/**
 * <KiaLambdaMembersDiagram>：Kotlin实战 第5章 Lambda编程图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 540;

export function KiaLambdaMembersDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Lambda编程——高阶函数、Lambda语法、集合操作图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Lambda编程
          </text>

          {/* 左上：Lambda语法 */}
          <rect x="30" y="50" width="330" height="220" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="74" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--accent)">Lambda语法约定</text>

          <rect x="50" y="90" width="290" height="34" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="195" y="108" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">完整语法：{`{ x: Int -> x * 2 }`}</text>

          <rect x="50" y="130" width="290" height="34" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="195" y="148" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">类型推断：{`{ x -> x * 2 }`}</text>

          <rect x="50" y="170" width="290" height="34" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="195" y="188" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">it隐式参数：{`{ it * 2 }`}</text>

          <rect x="50" y="210" width="290" height="50" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="195" y="228" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">末尾Lambda约定</text>
          <text x="195" y="244" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">list.filter {`{ it > 0 }`}（省略括号）</text>
          <text x="195" y="256" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">让DSL式API成为可能</text>

          {/* 右上：集合函数式操作 */}
          <rect x="380" y="50" width="330" height="220" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="74" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--accent)">集合函数式操作链</text>

          <rect x="400" y="90" width="290" height="26" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="545" y="107" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">map——变换：{`{ it * 2 }`} -&gt; [2,4,6]</text>

          <rect x="400" y="122" width="290" height="26" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="545" y="139" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">filter——过滤：{`{ it > 1 }`} -&gt; [2,3]</text>

          <rect x="400" y="154" width="290" height="26" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="545" y="171" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">reduce——聚合：{`{ a, b -> a + b }`} -&gt; 6</text>

          <rect x="400" y="186" width="290" height="26" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="545" y="203" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">groupBy——分组：按key分组Map</text>

          <rect x="400" y="218" width="290" height="26" rx="6" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="545" y="235" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">flatMap——扁平映射：嵌套-&gt;平铺</text>

          <rect x="400" y="250" width="290" height="16" rx="6" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.2" />
          <text x="545" y="262" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">链式：filter -&gt; map -&gt; sortedBy -&gt; forEach</text>

          {/* 底部：inline内联函数原理 */}
          <rect x="30" y="290" width="680" height="230" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="314" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-primary)">inline内联函数与标准库函数</text>

          <rect x="50" y="330" width="310" height="80" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="205" y="350" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">普通高阶函数（有闭包开销）</text>
          <text x="205" y="370" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Lambda编译为Function匿名类对象</text>
          <text x="205" y="385" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">每次调用创建对象，有GC压力</text>
          <text x="205" y="400" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">不支持非局部返回</text>

          <rect x="380" y="330" width="310" height="80" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="535" y="350" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">inline内联函数（消除开销）</text>
          <text x="535" y="370" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Lambda体直接展开到调用处</text>
          <text x="535" y="385" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">无对象创建，无GC压力</text>
          <text x="535" y="400" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">支持非局部返回 + reified类型参数</text>

          {/* 标准库作用域函数 */}
          <text x={VIEW_W / 2} y="430" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">标准库作用域函数（均为inline）</text>

          <rect x="50" y="440" width="120" height="60" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="110" y="460" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">let</text>
          <text x="110" y="476" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">it / 返回Lambda结果</text>
          <text x="110" y="490" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">null安全作用域</text>

          <rect x="180" y="440" width="120" height="60" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="240" y="460" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">run</text>
          <text x="240" y="476" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">this / 返回Lambda结果</text>
          <text x="240" y="490" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">对象配置</text>

          <rect x="310" y="440" width="120" height="60" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="370" y="460" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">apply</text>
          <text x="370" y="476" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">this / 返回对象本身</text>
          <text x="370" y="490" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">构建器模式</text>

          <rect x="440" y="440" width="120" height="60" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="500" y="460" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">also</text>
          <text x="500" y="476" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">it / 返回对象本身</text>
          <text x="500" y="490" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">副作用链式调用</text>

          <rect x="570" y="440" width="120" height="60" rx="6" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="630" y="460" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">with</text>
          <text x="630" y="476" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">this / 返回Lambda结果</text>
          <text x="630" y="490" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">分组操作</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Lambda编程——Lambda语法约定（it/末尾Lambda）、集合函数式操作链（map/filter/reduce）、inline内联函数原理与标准库作用域函数
      </figcaption>
    </figure>
  );
}
