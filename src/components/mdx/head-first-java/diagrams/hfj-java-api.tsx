/**
 * <HfjJavaApiDiagram>：核心API与集合框架图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function HfjJavaApiDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="核心API与集合框架图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            核心API与集合框架——ArrayList 与 HashMap
          </text>

          {/* ArrayList */}
          <rect x="30" y="48" width="330" height="220" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="195" y="70" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">ArrayList&lt;E&gt;——有序可重复列表</text>
          <text x="45" y="90" fontSize="10" fill="var(--text-secondary)">ArrayList&lt;String&gt; list = new ArrayList&lt;&gt;();</text>
          <text x="45" y="110" fontSize="10" fill="var(--text-secondary)">list.add("Java");     // [Java]</text>
          <text x="45" y="126" fontSize="10" fill="var(--text-secondary)">list.add("Python");   // [Java, Python]</text>
          <text x="45" y="142" fontSize="10" fill="var(--text-secondary)">list.add(0, "C++");   // [C++, Java, Python]</text>
          <text x="45" y="158" fontSize="10" fill="var(--text-secondary)">list.get(1);          // &rarr; "Java"</text>
          <text x="45" y="174" fontSize="10" fill="var(--text-secondary)">list.size();          // &rarr; 3</text>
          <text x="45" y="190" fontSize="10" fill="var(--text-secondary)">list.remove("C++");   // [Java, Python]</text>
          <text x="45" y="206" fontSize="10" fill="var(--text-secondary)">list.contains("Java"); // &rarr; true</text>
          <text x="45" y="226" fontSize="10" fill="var(--text-secondary)">底层: 动态数组, 查询快 O(1)</text>
          <text x="45" y="242" fontSize="10" fill="var(--text-secondary)">中间插入/删除慢 O(n)</text>
          <text x="45" y="258" fontSize="10" fill="var(--text-secondary)">自动扩容: 容量不足时增长 1.5 倍</text>

          {/* HashMap */}
          <rect x="380" y="48" width="330" height="220" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.5" />
          <text x="545" y="70" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--success)">HashMap&lt;K,V&gt;——键值映射</text>
          <text x="395" y="90" fontSize="10" fill="var(--text-secondary)">HashMap&lt;String,Integer&gt; map = new HashMap&lt;&gt;();</text>
          <text x="395" y="110" fontSize="10" fill="var(--text-secondary)">map.put("Java", 1995);    // &#123;Java=1995&#125;</text>
          <text x="395" y="126" fontSize="10" fill="var(--text-secondary)">map.put("Python", 1991);  // &#123;Java=1995, Python=1991&#125;</text>
          <text x="395" y="142" fontSize="10" fill="var(--text-secondary)">map.get("Java");          // &rarr; 1995</text>
          <text x="395" y="158" fontSize="10" fill="var(--text-secondary)">map.containsKey("Java");  // &rarr; true</text>
          <text x="395" y="174" fontSize="10" fill="var(--text-secondary)">map.size();               // &rarr; 2</text>
          <text x="395" y="190" fontSize="10" fill="var(--text-secondary)">map.remove("Python");     // &#123;Java=1995&#125;</text>
          <text x="395" y="206" fontSize="10" fill="var(--text-secondary)">map.put("Java", 1996);    // 覆盖旧值</text>
          <text x="395" y="226" fontSize="10" fill="var(--text-secondary)">底层: 哈希表 + 链表/红黑树</text>
          <text x="395" y="242" fontSize="10" fill="var(--text-secondary)">增删查快 O(1), 键唯一无序</text>
          <text x="395" y="258" fontSize="10" fill="var(--text-secondary)">键可为 null, 一个 Entry 最多一个</text>

          {/* 集合继承体系 */}
          <text x={VIEW_W / 2} y="298" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-primary)">
            集合继承体系
          </text>

          <rect x="280" y="312" width="180" height="40" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" />
          <text x="370" y="332" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">Iterable&lt;E&gt;</text>
          <text x="370" y="346" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">可迭代接口</text>

          <text x="200" y="372" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>
          <text x="540" y="372" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="100" y="382" width="200" height="40" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="200" y="402" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">Collection&lt;E&gt;</text>
          <text x="200" y="416" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">List / Set / Queue 的父接口</text>

          <rect x="440" y="382" width="200" height="40" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="540" y="402" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">Map&lt;K,V&gt;</text>
          <text x="540" y="416" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">独立体系, 不是 Collection</text>

          <text x="130" y="442" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>
          <text x="270" y="442" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>
          <text x="540" y="442" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="55" y="452" width="140" height="34" rx="6" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" />
          <text x="125" y="468" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">List</text>
          <text x="125" y="481" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">ArrayList, LinkedList</text>

          <rect x="205" y="452" width="140" height="34" rx="6" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" />
          <text x="275" y="468" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">Set</text>
          <text x="275" y="481" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">HashSet, TreeSet</text>

          <rect x="470" y="452" width="140" height="34" rx="6" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" />
          <text x="540" y="468" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">Map 实现</text>
          <text x="540" y="481" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">HashMap, TreeMap</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        核心API与集合框架——ArrayList有序列表、HashMap键值映射、Collection与Map两大继承体系
      </figcaption>
    </figure>
  );
}
