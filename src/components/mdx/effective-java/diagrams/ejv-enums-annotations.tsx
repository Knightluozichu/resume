/**
 * <EjvEnumsAnnotationsDiagram>：枚举与注解图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function EjvEnumsAnnotationsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="枚举与注解图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            枚举与注解——枚举单例与策略模式
          </text>

          {/* 左：枚举单例 */}
          <rect x="30" y="50" width="330" height="200" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="195" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">枚举实现单例</text>
          <text x="45" y="96" fontSize="11" fill="var(--text-secondary)">public enum Singleton &rbrace;</text>
          <text x="45" y="114" fontSize="11" fill="var(--text-secondary)">  INSTANCE;</text>
          <text x="45" y="132" fontSize="11" fill="var(--text-secondary)">  public void doWork() &rbrace;...&rbrace;</text>
          <text x="45" y="150" fontSize="11" fill="var(--text-secondary)">&rbrace;</text>
          <text x="45" y="176" fontSize="11" fill="var(--success)">优势:</text>
          <text x="45" y="194" fontSize="11" fill="var(--success)"> 线程安全（JVM 保证）</text>
          <text x="45" y="212" fontSize="11" fill="var(--success)"> 防序列化攻击</text>
          <text x="45" y="230" fontSize="11" fill="var(--success)"> 防反射攻击</text>

          {/* 右：枚举策略 */}
          <rect x="380" y="50" width="330" height="200" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="545" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">枚举策略模式</text>
          <text x="395" y="96" fontSize="11" fill="var(--text-secondary)">enum Operation &rbrace;</text>
          <text x="395" y="114" fontSize="11" fill="var(--text-secondary)">  PLUS &rbrace; apply(a,b) -&gt; a+b &rbrace;,</text>
          <text x="395" y="132" fontSize="11" fill="var(--text-secondary)">  MINUS &rbrace; apply(a,b) -&gt; a-b &rbrace;,</text>
          <text x="395" y="150" fontSize="11" fill="var(--text-secondary)">  TIMES &rbrace; ... &rbrace;, DIVIDE &rbrace; ... &rbrace;</text>
          <text x="395" y="168" fontSize="11" fill="var(--text-secondary)">  abstract double apply(a, b);</text>
          <text x="395" y="186" fontSize="11" fill="var(--text-secondary)">&rbrace;</text>
          <text x="395" y="212" fontSize="11" fill="var(--accent)">每个枚举常量可带不同行为</text>
          <text x="395" y="230" fontSize="11" fill="var(--accent)">用 switch 需要默认分支抛异常</text>

          {/* 下方左：EnumSet/EnumMap */}
          <rect x="30" y="270" width="330" height="180" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="195" y="294" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">EnumSet / EnumMap</text>
          <text x="45" y="316" fontSize="11" fill="var(--text-secondary)">用位域代替 int 枚举:</text>
          <text x="45" y="334" fontSize="11" fill="var(--danger)"> int flags = STYLE_BOLD | STYLE_ITALIC</text>
          <text x="45" y="352" fontSize="11" fill="var(--danger)"> // 无类型安全，不可遍历</text>
          <text x="45" y="378" fontSize="11" fill="var(--success)">EnumSet&lt;Style&gt; styles =</text>
          <text x="45" y="396" fontSize="11" fill="var(--success)">  EnumSet.of(BOLD, ITALIC);</text>
          <text x="45" y="414" fontSize="11" fill="var(--success)"> // 类型安全，可遍历，性能好</text>
          <text x="45" y="436" fontSize="11" fill="var(--text-secondary)">EnumMap: 以枚举为键的 Map</text>

          {/* 下方右：注解 */}
          <rect x="380" y="270" width="330" height="180" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="545" y="294" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--danger)">注解优于命名模式</text>
          <text x="395" y="316" fontSize="11" fill="var(--text-secondary)">命名模式: testFooBar() 拼写错无报错</text>
          <text x="395" y="334" fontSize="11" fill="var(--text-secondary)">注解: @Test 编译期检查</text>
          <text x="395" y="360" fontSize="11" fill="var(--text-secondary)">@Test void fooBar() &rbrace;...&rbrace;</text>
          <text x="395" y="386" fontSize="11" fill="var(--text-secondary)">标记注解 vs 元注解:</text>
          <text x="395" y="404" fontSize="11" fill="var(--text-secondary)">@Retention, @Target</text>
          <text x="395" y="422" fontSize="11" fill="var(--text-secondary)">@Repeatable (Java 8)</text>
          <text x="395" y="440" fontSize="11" fill="var(--text-secondary)">Override 注解防止覆写拼写错误</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        枚举与注解——枚举实现单例（线程安全）、枚举策略模式（行为绑定常量）、EnumSet 替代位域、注解替代命名模式
      </figcaption>
    </figure>
  );
}
