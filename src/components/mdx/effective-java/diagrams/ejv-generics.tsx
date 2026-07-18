/**
 * <EjvGenericsDiagram>：泛型与 PECS 通配符图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function EjvGenericsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="泛型与PECS通配符图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text
            x={VIEW_W / 2}
            y="28"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            泛型——PECS 原则与类型安全
          </text>

          {/* PECS 原则 */}
          <rect
            x="30"
            y="50"
            width="680"
            height="170"
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.06"
            stroke="var(--accent)"
            strokeWidth="1.2"
          />
          <text
            x="370"
            y="74"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--accent)"
          >
            PECS: Producer Extends, Consumer Super
          </text>

          {/* Producer Extends */}
          <rect
            x="50"
            y="90"
            width="310"
            height="115"
            rx="8"
            fill="var(--success)"
            fillOpacity="0.08"
            stroke="var(--success)"
            strokeWidth="1"
          />
          <text
            x="205"
            y="112"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--success)"
          >
            ? extends T (生产者)
          </text>
          <text x="65" y="134" fontSize="11" fill="var(--text-secondary)">
            从集合读取数据 =&gt; extends
          </text>
          <text x="65" y="152" fontSize="11" fill="var(--text-secondary)">
            List&lt;? extends Number&gt; list
          </text>
          <text x="65" y="170" fontSize="11" fill="var(--text-secondary)">
            Number n = list.get(0); // OK
          </text>
          <text x="65" y="188" fontSize="11" fill="var(--danger)">
            list.add(42); // 编译错误!
          </text>

          {/* Consumer Super */}
          <rect
            x="380"
            y="90"
            width="310"
            height="115"
            rx="8"
            fill="var(--warning)"
            fillOpacity="0.08"
            stroke="var(--warning)"
            strokeWidth="1"
          />
          <text
            x="535"
            y="112"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--warning)"
          >
            ? super T (消费者)
          </text>
          <text x="395" y="134" fontSize="11" fill="var(--text-secondary)">
            向集合写入数据 =&gt; super
          </text>
          <text x="395" y="152" fontSize="11" fill="var(--text-secondary)">
            List&lt;? super Integer&gt; list
          </text>
          <text x="395" y="170" fontSize="11" fill="var(--text-secondary)">
            list.add(42); // OK
          </text>
          <text x="395" y="188" fontSize="11" fill="var(--danger)">
            Integer n = list.get(0); // 错误!
          </text>

          {/* 类型安全对比 */}
          <rect
            x="30"
            y="240"
            width="330"
            height="220"
            rx="10"
            fill="var(--danger)"
            fillOpacity="0.06"
            stroke="var(--danger)"
            strokeWidth="1.2"
          />
          <text
            x="195"
            y="264"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--danger)"
          >
            原生态类型的危害
          </text>
          <text x="45" y="288" fontSize="11" fill="var(--text-secondary)">
            List list = new ArrayList();
          </text>
          <text x="45" y="306" fontSize="11" fill="var(--text-secondary)">
            list.add(&quot;hello&quot;);
          </text>
          <text x="45" y="324" fontSize="11" fill="var(--text-secondary)">
            Integer n = (Integer) list.get(0);
          </text>
          <text x="45" y="342" fontSize="11" fill="var(--danger)">
            &#47;&#47; 运行时 ClassCastException!
          </text>
          <text x="45" y="370" fontSize="11" fill="var(--text-secondary)">
            错误推迟到运行时
          </text>
          <text x="45" y="388" fontSize="11" fill="var(--text-secondary)">
            无法在编译期发现
          </text>
          <text x="45" y="416" fontSize="11" fill="var(--text-secondary)">
            Set vs Set&lt;Object&gt; vs Set&lt;?&gt;
          </text>
          <text x="45" y="434" fontSize="11" fill="var(--text-secondary)">
            Set: 丢失类型，不安全
          </text>
          <text x="45" y="452" fontSize="11" fill="var(--text-secondary)">
            Set&lt;?&gt;: 安全，但不能 add
          </text>

          {/* 泛型方法 */}
          <rect
            x="380"
            y="240"
            width="330"
            height="220"
            rx="10"
            fill="var(--success)"
            fillOpacity="0.06"
            stroke="var(--success)"
            strokeWidth="1.2"
          />
          <text
            x="545"
            y="264"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--success)"
          >
            泛型方法最佳实践
          </text>
          <text x="395" y="288" fontSize="11" fill="var(--text-secondary)">
            public static &lt;T&gt; T
          </text>
          <text x="395" y="306" fontSize="11" fill="var(--text-secondary)">
            {" "}
            max(List&lt;? extends T&gt; list,
          </text>
          <text x="395" y="324" fontSize="11" fill="var(--text-secondary)">
            {" "}
            Comparator&lt;? super T&gt; cmp) &rbrace;
          </text>
          <text x="395" y="352" fontSize="11" fill="var(--text-secondary)">
            类型参数命名:
          </text>
          <text x="395" y="370" fontSize="11" fill="var(--text-secondary)">
            {" "}
            T = Type, E = Element
          </text>
          <text x="395" y="388" fontSize="11" fill="var(--text-secondary)">
            {" "}
            K = Key, V = Value
          </text>
          <text x="395" y="406" fontSize="11" fill="var(--text-secondary)">
            {" "}
            R = Return, T1/T2 = 多类型
          </text>
          <text x="395" y="434" fontSize="11" fill="var(--success)">
            编译期类型安全
          </text>
          <text x="395" y="452" fontSize="11" fill="var(--success)">
            消除强制转换
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        泛型 PECS 原则——生产者用 ? extends T 读取，消费者用 ? super T
        写入，原生态类型丧失编译期类型安全
      </figcaption>
    </figure>
  );
}
