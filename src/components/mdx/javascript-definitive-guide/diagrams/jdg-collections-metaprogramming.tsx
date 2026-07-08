/**
 * <JdgCollectionsMetaprogrammingDiagram>：集合与元编程图解（Map/Set/Proxy/Reflect）。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 * SVG 文本中 > 用 &gt;、} 用 &rbrace;、{ 用 &lbrace;。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function JdgCollectionsMetaprogrammingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="集合与元编程图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <defs>
            <marker id="arrMp" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 Z" fill="var(--accent)" />
            </marker>
          </defs>

          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            集合类型与元编程：Map/Set 与 Proxy/Reflect
          </text>
          <text x={VIEW_W / 2} y="50" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            键值集合 / 有序唯一集 / 代理拦截 / 反射操作
          </text>

          {/* 顶部：集合类型 */}
          <rect x="30" y="68" width="680" height="148" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">集合类型（优于普通对象的场景）</text>

          <rect x="50" y="100" width="200" height="100" rx="6" fill="var(--elevated)" stroke="var(--success)" strokeWidth="1" />
          <text x="150" y="120" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">Map</text>
          <text x="64" y="138" fontSize="10" fill="var(--text-secondary)">任意类型键（含对象）</text>
          <text x="64" y="154" fontSize="10" fill="var(--text-secondary)">保持插入顺序</text>
          <text x="64" y="170" fontSize="10" fill="var(--text-secondary)">size / get / set / has</text>
          <text x="64" y="186" fontSize="10" fill="var(--text-secondary)">可遍历，无原型链干扰</text>

          <rect x="270" y="100" width="200" height="100" rx="6" fill="var(--elevated)" stroke="var(--success)" strokeWidth="1" />
          <text x="370" y="120" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">Set</text>
          <text x="284" y="138" fontSize="10" fill="var(--text-secondary)">唯一值集合</text>
          <text x="284" y="154" fontSize="10" fill="var(--text-secondary)">去重：[...new Set(arr)]</text>
          <text x="284" y="170" fontSize="10" fill="var(--text-secondary)">add / has / delete</text>
          <text x="284" y="186" fontSize="10" fill="var(--text-secondary)">并交差用集合运算</text>

          <rect x="490" y="100" width="200" height="100" rx="6" fill="var(--elevated)" stroke="var(--success)" strokeWidth="1" />
          <text x="590" y="120" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">WeakMap / WeakSet</text>
          <text x="504" y="138" fontSize="10" fill="var(--text-secondary)">键必须是对象</text>
          <text x="504" y="154" fontSize="10" fill="var(--text-secondary)">弱引用，不阻止 GC</text>
          <text x="504" y="170" fontSize="10" fill="var(--text-secondary)">不可遍历，无 size</text>
          <text x="504" y="186" fontSize="10" fill="var(--text-secondary)">用途：私有数据/缓存</text>

          {/* 中部：Proxy */}
          <rect x="30" y="232" width="330" height="120" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="252" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">Proxy 代理（拦截基本操作）</text>
          <text x="50" y="274" fontSize="11" fill="var(--text-secondary)">new Proxy(target, handler)</text>
          <text x="50" y="292" fontSize="11" fill="var(--text-secondary)">get / set 拦截属性读写</text>
          <text x="50" y="310" fontSize="11" fill="var(--text-secondary)">has / deleteProperty / ownKeys</text>
          <text x="50" y="328" fontSize="11" fill="var(--text-secondary)">apply / construct 拦截调用</text>
          <text x="50" y="346" fontSize="11" fill="var(--danger)">可改写对象默认行为，实现响应式/校验</text>

          <rect x="380" y="232" width="330" height="120" rx="10" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="252" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">Reflect 反射（操作转发层）</text>
          <text x="400" y="274" fontSize="11" fill="var(--text-secondary)">Reflect.get(obj, key) / .set</text>
          <text x="400" y="292" fontSize="11" fill="var(--text-secondary)">Reflect.has / .ownKeys / .deleteProperty</text>
          <text x="400" y="310" fontSize="11" fill="var(--text-secondary)">Reflect.apply / .construct</text>
          <text x="400" y="328" fontSize="11" fill="var(--text-secondary)">与 Proxy trap 一一对应</text>
          <text x="400" y="346" fontSize="11" fill="var(--text-secondary)">转发默认行为：Reflect.get(target, key, recv)</text>

          {/* 底部：工程价值 */}
          <rect x="30" y="368" width="680" height="64" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="388" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">元编程的工程价值</text>
          <text x="50" y="410" fontSize="11" fill="var(--text-secondary)">Map 键无类型限制且有序，优于 object 当字典；WeakMap 实现对象关联数据不泄漏内存</text>
          <text x="50" y="424" fontSize="11" fill="var(--text-secondary)">Proxy + Reflect 是 Vue3 响应式、校验库、ORM 的底层机制，拦截并转发默认操作</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Map/Set 提供有序键值与唯一集合；WeakMap 弱引用防泄漏；Proxy 拦截操作配 Reflect 转发实现元编程
      </figcaption>
    </figure>
  );
}
