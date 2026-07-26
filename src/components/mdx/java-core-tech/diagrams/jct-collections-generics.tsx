/**
 * <JctCollectionsGenericsDiagram>：集合与泛型图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function JctCollectionsGenericsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="集合与泛型图解"
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
            集合框架与泛型——类型安全的数据容器
          </text>

          {/* 集合继承体系 */}
          <rect
            x="30"
            y="48"
            width="340"
            height="220"
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
            集合继承体系
          </text>

          <rect
            x="120"
            y="84"
            width="160"
            height="36"
            rx="6"
            fill="var(--text-primary)"
            fillOpacity="0.08"
            stroke="var(--text-primary)"
            strokeWidth="1.2"
          />
          <text
            x="200"
            y="100"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Collection&lt;E&gt;
          </text>
          <text
            x="200"
            y="114"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            Iterable 子接口
          </text>

          <text
            x="100"
            y="134"
            textAnchor="middle"
            fontSize="14"
            fill="var(--text-tertiary)"
          >
            &darr;
          </text>
          <text
            x="200"
            y="134"
            textAnchor="middle"
            fontSize="14"
            fill="var(--text-tertiary)"
          >
            &darr;
          </text>
          <text
            x="300"
            y="134"
            textAnchor="middle"
            fontSize="14"
            fill="var(--text-tertiary)"
          >
            &darr;
          </text>

          <rect
            x="45"
            y="142"
            width="100"
            height="44"
            rx="6"
            fill="var(--warning)"
            fillOpacity="0.08"
            stroke="var(--warning)"
            strokeWidth="1"
          />
          <text
            x="95"
            y="158"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--warning)"
          >
            List
          </text>
          <text
            x="95"
            y="172"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            有序可重复
          </text>
          <text
            x="95"
            y="182"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            ArrayList
          </text>

          <rect
            x="155"
            y="142"
            width="100"
            height="44"
            rx="6"
            fill="var(--success)"
            fillOpacity="0.08"
            stroke="var(--success)"
            strokeWidth="1"
          />
          <text
            x="205"
            y="158"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            Set
          </text>
          <text
            x="205"
            y="172"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            无序不重复
          </text>
          <text
            x="205"
            y="182"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            HashSet
          </text>

          <rect
            x="265"
            y="142"
            width="100"
            height="44"
            rx="6"
            fill="var(--danger)"
            fillOpacity="0.08"
            stroke="var(--danger)"
            strokeWidth="1"
          />
          <text
            x="315"
            y="158"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--danger)"
          >
            Queue
          </text>
          <text
            x="315"
            y="172"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            FIFO队列
          </text>
          <text
            x="315"
            y="182"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            ArrayDeque
          </text>

          <rect
            x="100"
            y="200"
            width="200"
            height="50"
            rx="6"
            fill="var(--text-primary)"
            fillOpacity="0.08"
            stroke="var(--text-primary)"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
          <text
            x="200"
            y="218"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Map&lt;K,V&gt;（独立体系）
          </text>
          <text
            x="200"
            y="232"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            HashMap / TreeMap / LinkedHashMap
          </text>
          <text
            x="200"
            y="244"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            键唯一, 值可重复
          </text>

          {/* 泛型 */}
          <rect
            x="390"
            y="48"
            width="320"
            height="220"
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
            泛型（Generics）
          </text>
          <text x="405" y="90" fontSize="11" fill="var(--text-secondary)">
            编译期类型安全, 避免运行时转换
          </text>
          <text x="405" y="112" fontSize="11" fill="var(--text-secondary)">
            ArrayList&lt;String&gt; list = new ArrayList&lt;&gt;();
          </text>
          <text x="405" y="128" fontSize="11" fill="var(--text-secondary)">
            list.add(&quot;hi&quot;); // 只能存String
          </text>
          <text x="405" y="148" fontSize="11" fill="var(--text-secondary)">
            泛型方法:
          </text>
          <text x="405" y="164" fontSize="11" fill="var(--text-secondary)">
            {" "}
            &lt;T&gt; T getFirst(List&lt;T&gt; list)
          </text>
          <text x="405" y="184" fontSize="11" fill="var(--text-secondary)">
            通配符:
          </text>
          <text x="405" y="200" fontSize="11" fill="var(--text-secondary)">
            {" "}
            ? extends T 上界(只读)
          </text>
          <text x="405" y="216" fontSize="11" fill="var(--text-secondary)">
            {" "}
            ? super T 下界(只写)
          </text>
          <text x="405" y="236" fontSize="11" fill="var(--text-secondary)">
            类型擦除: 运行时泛型信息被擦除
          </text>
          <text x="405" y="252" fontSize="11" fill="var(--text-secondary)">
            {" "}
            List&lt;String&gt; 和 List&lt;Integer&gt;
          </text>
          <text x="405" y="262" fontSize="11" fill="var(--text-secondary)">
            {" "}
            运行时都是 List
          </text>

          {/* 性能对比 */}
          <text
            x={VIEW_W / 2}
            y="298"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            常用集合时间复杂度
          </text>

          <rect
            x="30"
            y="312"
            width="220"
            height="68"
            rx="8"
            fill="var(--warning)"
            fillOpacity="0.06"
            stroke="var(--warning)"
            strokeWidth="1.2"
          />
          <text
            x="140"
            y="330"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--warning)"
          >
            ArrayList
          </text>
          <text x="45" y="348" fontSize="11" fill="var(--text-secondary)">
            get: O(1) add: O(1)末尾
          </text>
          <text x="45" y="362" fontSize="11" fill="var(--text-secondary)">
            insert/remove: O(n)
          </text>
          <text x="45" y="376" fontSize="11" fill="var(--text-secondary)">
            底层: 动态数组
          </text>

          <rect
            x="260"
            y="312"
            width="220"
            height="68"
            rx="8"
            fill="var(--success)"
            fillOpacity="0.06"
            stroke="var(--success)"
            strokeWidth="1.2"
          />
          <text
            x="370"
            y="330"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            HashMap
          </text>
          <text x="275" y="348" fontSize="11" fill="var(--text-secondary)">
            put/get/remove: O(1)平均
          </text>
          <text x="275" y="362" fontSize="11" fill="var(--text-secondary)">
            最坏 O(log n) 红黑树
          </text>
          <text x="275" y="376" fontSize="11" fill="var(--text-secondary)">
            底层: 哈希表+链表/树
          </text>

          <rect
            x="490"
            y="312"
            width="220"
            height="68"
            rx="8"
            fill="var(--danger)"
            fillOpacity="0.06"
            stroke="var(--danger)"
            strokeWidth="1.2"
          />
          <text
            x="600"
            y="330"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--danger)"
          >
            LinkedList
          </text>
          <text x="505" y="348" fontSize="11" fill="var(--text-secondary)">
            get: O(n) add首尾: O(1)
          </text>
          <text x="505" y="362" fontSize="11" fill="var(--text-secondary)">
            insert/remove: O(1)已知节点
          </text>
          <text x="505" y="376" fontSize="11" fill="var(--text-secondary)">
            底层: 双向链表
          </text>

          {/* 迭代器 */}
          <rect
            x="30"
            y="398"
            width="680"
            height="86"
            rx="8"
            fill="var(--text-primary)"
            fillOpacity="0.04"
            stroke="var(--text-primary)"
            strokeWidth="1"
            strokeOpacity="0.3"
          />
          <text
            x="370"
            y="418"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            迭代器与 fail-fast
          </text>
          <text x="45" y="436" fontSize="11" fill="var(--text-secondary)">
            Iterator&lt;E&gt; it = list.iterator();
          </text>
          <text x="45" y="452" fontSize="11" fill="var(--text-secondary)">
            while (it.hasNext()) &#123; E e = it.next(); it.remove(); &#125;
          </text>
          <text x="45" y="470" fontSize="11" fill="var(--text-secondary)">
            for-each 本质 = Iterator. 并发修改时
            ConcurrentModificationException（fail-fast）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        集合与泛型——Collection三大子接口与Map独立体系、泛型类型擦除、各实现类时间复杂度
      </figcaption>
    </figure>
  );
}
