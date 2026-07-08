/**
 * <EjvLambdasStreamsDiagram>：Lambda 与 Stream 图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function EjvLambdasStreamsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Lambda与Stream图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Lambda与Stream——函数式编程与流式处理
          </text>

          {/* Lambda vs 匿名类 */}
          <rect x="30" y="50" width="680" height="130" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">Lambda vs 匿名内部类</text>

          <rect x="50" y="88" width="310" height="80" rx="6" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" />
          <text x="65" y="108" fontSize="11" fill="var(--text-secondary)">匿名类:</text>
          <text x="65" y="126" fontSize="11" fill="var(--text-secondary)">Collections.sort(words,</text>
          <text x="65" y="144" fontSize="11" fill="var(--text-secondary)">  new Comparator&lt;String&gt;() &rbrace;</text>
          <text x="65" y="162" fontSize="11" fill="var(--text-secondary)">    public int compare(...) &rbrace;...&rbrace; &rbrace;);</text>

          <rect x="380" y="88" width="310" height="80" rx="6" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" />
          <text x="395" y="108" fontSize="11" fill="var(--text-secondary)">Lambda:</text>
          <text x="395" y="126" fontSize="11" fill="var(--success)">words.sort((s1, s2) -&gt;</text>
          <text x="395" y="144" fontSize="11" fill="var(--success)">  Integer.compare(s1.length(),</text>
          <text x="395" y="162" fontSize="11" fill="var(--success)">    s2.length()));</text>

          {/* Stream 管道 */}
          <rect x="30" y="200" width="680" height="120" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="224" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">Stream 管道流水线</text>
          <text x="370" y="248" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">list.stream().filter(...).map(...).sorted().collect(toList())</text>
          <text x="50" y="276" fontSize="11" fill="var(--accent)">源 stream()</text>
          <text x="180" y="276" fontSize="11" fill="var(--warning)">&rarr; filter 中间操作</text>
          <text x="360" y="276" fontSize="11" fill="var(--danger)">&rarr; map 中间操作</text>
          <text x="520" y="276" fontSize="11" fill="var(--success)">&rarr; collect 终端操作</text>
          <text x="50" y="300" fontSize="11" fill="var(--text-secondary)">中间操作: filter/map/flatMap/sorted/limit</text>
          <text x="370" y="300" fontSize="11" fill="var(--text-secondary)">终端操作: collect/count/forEach/reduce</text>

          {/* 最佳实践 */}
          <rect x="30" y="340" width="330" height="120" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="195" y="364" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">最佳实践</text>
          <text x="45" y="386" fontSize="11" fill="var(--text-secondary)">1. 方法引用优于 Lambda</text>
          <text x="45" y="404" fontSize="11" fill="var(--text-secondary)">  service::execute 优于 () -&gt; service.execute()</text>
          <text x="45" y="422" fontSize="11" fill="var(--text-secondary)">2. 无副作用: 不修改可变状态</text>
          <text x="45" y="440" fontSize="11" fill="var(--text-secondary)">3. collect 优于 reduce 做聚合</text>

          {/* 何时不用 Stream */}
          <rect x="380" y="340" width="330" height="120" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="545" y="364" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--danger)">何时不用 Stream</text>
          <text x="395" y="386" fontSize="11" fill="var(--text-secondary)">1. 需要从 lambda 返回值/抛异常</text>
          <text x="395" y="404" fontSize="11" fill="var(--text-secondary)">2. 需要修改局部变量</text>
          <text x="395" y="422" fontSize="11" fill="var(--text-secondary)">3. 需要可读性高的控制流</text>
          <text x="395" y="440" fontSize="11" fill="var(--text-secondary)">4. 需要共享可变状态</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Lambda与Stream——Lambda替代匿名类、Stream管道流式处理（中间操作+终端操作）、方法引用优于Lambda、collect优于reduce聚合
      </figcaption>
    </figure>
  );
}
