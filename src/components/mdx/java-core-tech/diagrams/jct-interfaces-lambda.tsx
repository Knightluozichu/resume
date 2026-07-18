/**
 * <JctInterfacesLambdaDiagram>：接口与Lambda图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function JctInterfacesLambdaDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="接口与Lambda图解"
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
            接口与Lambda——从抽象契约到函数式编程
          </text>

          {/* 接口定义 */}
          <rect
            x="30"
            y="48"
            width="340"
            height="180"
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.06"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text
            x="200"
            y="70"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--accent)"
          >
            接口（Interface）
          </text>
          <text x="45" y="90" fontSize="10" fill="var(--text-secondary)">
            public interface Comparable&lt;T&gt; &#123;
          </text>
          <text x="45" y="106" fontSize="10" fill="var(--text-secondary)">
            {" "}
            int compareTo(T other); // 抽象方法
          </text>
          <text x="45" y="122" fontSize="10" fill="var(--text-secondary)">
            &#125;
          </text>
          <text x="45" y="142" fontSize="10" fill="var(--text-secondary)">
            default 方法（Java 8+）:
          </text>
          <text x="45" y="158" fontSize="10" fill="var(--text-secondary)">
            {" "}
            default String getName() &#123;
          </text>
          <text x="45" y="174" fontSize="10" fill="var(--text-secondary)">
            {" "}
            return this.getClass().getSimpleName();
          </text>
          <text x="45" y="190" fontSize="10" fill="var(--text-secondary)">
            {" "}
            &#125;
          </text>
          <text x="45" y="210" fontSize="10" fill="var(--text-secondary)">
            static 方法: 接口内提供工具方法
          </text>
          <text x="45" y="224" fontSize="10" fill="var(--text-secondary)">
            private 方法（Java 9+）: 内部复用
          </text>

          {/* Lambda表达式 */}
          <rect
            x="390"
            y="48"
            width="320"
            height="180"
            rx="10"
            fill="var(--danger)"
            fillOpacity="0.06"
            stroke="var(--danger)"
            strokeWidth="1.5"
          />
          <text
            x="550"
            y="70"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--danger)"
          >
            Lambda表达式
          </text>
          <text x="405" y="90" fontSize="10" fill="var(--text-secondary)">
            函数式接口 = 只有一个抽象方法
          </text>
          <text x="405" y="110" fontSize="10" fill="var(--text-secondary)">
            @FunctionalInterface
          </text>
          <text x="405" y="126" fontSize="10" fill="var(--text-secondary)">
            interface Runnable &#123; void run(); &#125;
          </text>
          <text x="405" y="148" fontSize="10" fill="var(--text-secondary)">
            匿名内部类:
          </text>
          <text x="405" y="164" fontSize="10" fill="var(--text-secondary)">
            {" "}
            new Runnable() &#123; public void run()&#123;...&#125; &#125;
          </text>
          <text x="405" y="186" fontSize="10" fill="var(--text-secondary)">
            Lambda 简写:
          </text>
          <text x="405" y="202" fontSize="10" fill="var(--text-secondary)">
            {" "}
            () -&gt; &#123; System.out.println(&quot;hi&quot;); &#125;
          </text>
          <text x="405" y="218" fontSize="10" fill="var(--text-secondary)">
            方法引用: String::length
          </text>

          {/* 常用函数式接口 */}
          <text
            x={VIEW_W / 2}
            y="258"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            常用函数式接口（java.util.function）
          </text>

          <rect
            x="30"
            y="272"
            width="170"
            height="70"
            rx="8"
            fill="var(--warning)"
            fillOpacity="0.08"
            stroke="var(--warning)"
            strokeWidth="1.2"
          />
          <text
            x="115"
            y="290"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--warning)"
          >
            Supplier&lt;T&gt;
          </text>
          <text
            x="115"
            y="306"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            T get()
          </text>
          <text
            x="115"
            y="320"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            无参, 返回T
          </text>
          <text
            x="115"
            y="334"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            () -&gt; new Object()
          </text>

          <rect
            x="210"
            y="272"
            width="170"
            height="70"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.08"
            stroke="var(--accent)"
            strokeWidth="1.2"
          />
          <text
            x="295"
            y="290"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            Consumer&lt;T&gt;
          </text>
          <text
            x="295"
            y="306"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            void accept(T)
          </text>
          <text
            x="295"
            y="320"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            接收T, 无返回
          </text>
          <text
            x="295"
            y="334"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            s -&gt; print(s)
          </text>

          <rect
            x="390"
            y="272"
            width="170"
            height="70"
            rx="8"
            fill="var(--danger)"
            fillOpacity="0.08"
            stroke="var(--danger)"
            strokeWidth="1.2"
          />
          <text
            x="475"
            y="290"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--danger)"
          >
            Function&lt;T,R&gt;
          </text>
          <text
            x="475"
            y="306"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            R apply(T)
          </text>
          <text
            x="475"
            y="320"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            接收T, 返回R
          </text>
          <text
            x="475"
            y="334"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            s -&gt; s.length()
          </text>

          <rect
            x="570"
            y="272"
            width="140"
            height="70"
            rx="8"
            fill="var(--success)"
            fillOpacity="0.08"
            stroke="var(--success)"
            strokeWidth="1.2"
          />
          <text
            x="640"
            y="290"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            Predicate&lt;T&gt;
          </text>
          <text
            x="640"
            y="306"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            boolean test(T)
          </text>
          <text
            x="640"
            y="320"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            接收T, 返回bool
          </text>
          <text
            x="640"
            y="334"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            s -&gt; s.isEmpty()
          </text>

          {/* 接口 vs 抽象类 */}
          <rect
            x="30"
            y="362"
            width="340"
            height="120"
            rx="8"
            fill="var(--text-primary)"
            fillOpacity="0.04"
            stroke="var(--text-primary)"
            strokeWidth="1"
            strokeOpacity="0.3"
          />
          <text
            x="200"
            y="382"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            接口 vs 抽象类
          </text>
          <text x="45" y="400" fontSize="10" fill="var(--text-secondary)">
            接口: 多实现, 无字段(仅常量)
          </text>
          <text x="45" y="416" fontSize="10" fill="var(--text-secondary)">
            {" "}
            default/static/private 方法
          </text>
          <text x="45" y="432" fontSize="10" fill="var(--text-secondary)">
            抽象类: 单继承, 可有字段和构造器
          </text>
          <text x="45" y="448" fontSize="10" fill="var(--text-secondary)">
            {" "}
            可有具体方法和抽象方法
          </text>
          <text x="45" y="466" fontSize="10" fill="var(--text-secondary)">
            选用: 定义行为规范用接口
          </text>
          <text x="45" y="478" fontSize="10" fill="var(--text-secondary)">
            {" "}
            共享代码用抽象类
          </text>

          {/* Stream + Lambda */}
          <rect
            x="390"
            y="362"
            width="320"
            height="120"
            rx="8"
            fill="var(--danger)"
            fillOpacity="0.06"
            stroke="var(--danger)"
            strokeWidth="1"
          />
          <text
            x="550"
            y="382"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--danger)"
          >
            Stream + Lambda
          </text>
          <text x="405" y="400" fontSize="10" fill="var(--text-secondary)">
            list.stream()
          </text>
          <text x="405" y="416" fontSize="10" fill="var(--text-secondary)">
            {" "}
            .filter(s -&gt; s.length() &gt; 3)
          </text>
          <text x="405" y="432" fontSize="10" fill="var(--text-secondary)">
            {" "}
            .map(String::toUpperCase)
          </text>
          <text x="405" y="448" fontSize="10" fill="var(--text-secondary)">
            {" "}
            .sorted()
          </text>
          <text x="405" y="464" fontSize="10" fill="var(--text-secondary)">
            {" "}
            .collect(Collectors.toList());
          </text>
          <text x="405" y="478" fontSize="10" fill="var(--text-secondary)">
            声明式 + 链式 + 惰性求值
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        接口与Lambda——接口定义契约、default方法、函数式接口、Lambda简写与Stream链式操作
      </figcaption>
    </figure>
  );
}
