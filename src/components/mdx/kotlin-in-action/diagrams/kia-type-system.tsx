/**
 * <KiaTypeSystemDiagram>：Kotlin实战 第6章 类型系统与泛型图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 540;

export function KiaTypeSystemDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="类型系统与泛型——空安全、智能转换、泛型型变图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            类型系统与泛型
          </text>

          {/* 左上：空安全 */}
          <rect x="30" y="50" width="330" height="230" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="74" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--accent)">空安全机制</text>

          <rect x="50" y="90" width="140" height="40" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="120" y="108" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">String（非空）</text>
          <text x="120" y="122" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">不可赋null</text>

          <rect x="200" y="90" width="140" height="40" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="270" y="108" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">String?（可空）</text>
          <text x="270" y="122" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">可持有null</text>

          <rect x="50" y="138" width="290" height="30" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="195" y="156" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">?. 安全调用 — null时不执行</text>

          <rect x="50" y="174" width="290" height="30" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="195" y="192" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">?: Elvis — null时返回默认值</text>

          <rect x="50" y="210" width="290" height="30" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="195" y="228" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">!! 非空断言 — null时抛NPE</text>

          <rect x="50" y="246" width="290" height="30" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="195" y="264" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">智能转换 — if (x != null) 后自动非空</text>

          {/* 右上：智能转换 */}
          <rect x="380" y="50" width="330" height="230" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="74" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--accent)">智能转换与类型检查</text>

          <rect x="400" y="90" width="290" height="40" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="545" y="108" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">is 类型检查</text>
          <text x="545" y="122" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">if (e is String) 之后e自动转为String</text>

          <rect x="400" y="138" width="290" height="40" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="545" y="156" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">!is 否定检查</text>
          <text x="545" y="170" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">if (e !is String) return — 提前返回</text>

          <rect x="400" y="186" width="290" height="40" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="545" y="204" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">as 安全转换</text>
          <text x="545" y="218" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">e as? String — 失败返回null而非ClassCastException</text>

          <rect x="400" y="234" width="290" height="36" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="545" y="252" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">when + is 分支自动转换</text>
          <text x="545" y="264" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">when (e) {'{'} is Int -&gt; e + 1; is String -&gt; e.length {'}'}</text>

          {/* 底部：泛型与型变 */}
          <rect x="30" y="300" width="680" height="220" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="324" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-primary)">泛型与型变（Variance）</text>

          <rect x="50" y="340" width="200" height="80" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="150" y="360" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">out 协变（生产者）</text>
          <text x="150" y="378" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Producer&lt;out T&gt;</text>
          <text x="150" y="392" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">只读T，不可消费T</text>
          <text x="150" y="406" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">List&lt;String&gt; 是 List&lt;Any&gt; 子类型</text>

          <rect x="270" y="340" width="200" height="80" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="360" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">in 逆变（消费者）</text>
          <text x="370" y="378" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Consumer&lt;in T&gt;</text>
          <text x="370" y="392" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">只写T，不可生产T</text>
          <text x="370" y="406" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Comparable&lt;Any&gt; 是 Comparable&lt;String&gt; 子类型</text>

          <rect x="490" y="340" width="200" height="80" rx="8" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="590" y="360" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">* 星投影</text>
          <text x="590" y="378" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Array&lt;*&gt;（未知类型参数）</text>
          <text x="590" y="392" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">等价于Array&lt;out Any?&gt;</text>
          <text x="590" y="406" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">类型不确定时使用</text>

          <rect x="50" y="430" width="640" height="36" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="370" y="448" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">reified具体化类型参数</text>
          <text x="370" y="462" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">inline fun &lt;reified T&gt; filterByType(): List&lt;T&gt; — 运行时保留T的类型信息</text>

          <rect x="50" y="474" width="640" height="36" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.2" />
          <text x="370" y="492" textAnchor="middle" fontSize="10" fill="var(--text-primary)">核心理念：Kotlin型变在声明处指定（declaration-site variance），比Java使用处更清晰</text>
          <text x="370" y="506" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">out = 只读协变（生产者PECS的Extends）/ in = 只写逆变（消费者PECS的Super）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        类型系统与泛型——空安全（?. / ?: / !! / 智能转换）、is/as类型检查与转换、out/in型变、星投影、reified具体化
      </figcaption>
    </figure>
  );
}
