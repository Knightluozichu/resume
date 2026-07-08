/**
 * <HpwGarbageCollectionDiagram>：垃圾回收图解（可达性分析 + 三算法 + 分代）。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function HpwGarbageCollectionDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="垃圾回收图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            垃圾回收：自动回收不可达的堆对象
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            从 GC Roots 出发沿引用链遍历，到不了的就是垃圾
          </text>

          {/* 左侧：可达性分析 */}
          <rect x="40" y="68" width="340" height="300" rx="8" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="210" y="90" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">可达性分析</text>

          {/* GC Roots */}
          <rect x="60" y="104" width="100" height="40" rx="5" fill="var(--success)" fillOpacity="0.18" stroke="var(--success)" strokeWidth="1.4" />
          <text x="110" y="122" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">GC Roots</text>
          <text x="110" y="136" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">栈/全局/寄存器</text>

          {/* 可达对象 A */}
          <rect x="190" y="104" width="70" height="40" rx="5" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1.2" />
          <text x="225" y="128" textAnchor="middle" fontSize="11" fill="var(--success)">对象 A</text>
          <path d="M 160 124 L 188 124" stroke="var(--success)" strokeWidth="1.4" fill="none" markerEnd="url(#gcArrow)" />

          {/* 可达对象 B（A 引用 B） */}
          <rect x="290" y="104" width="70" height="40" rx="5" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1.2" />
          <text x="325" y="128" textAnchor="middle" fontSize="11" fill="var(--success)">对象 B</text>
          <path d="M 260 124 L 288 124" stroke="var(--success)" strokeWidth="1.4" fill="none" markerEnd="url(#gcArrow)" />

          <text x="210" y="166" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">从 Root 可达 → 存活（保留）</text>

          {/* 不可达对象 C、D（循环引用但不可达） */}
          <rect x="190" y="190" width="70" height="40" rx="5" fill="var(--danger)" fillOpacity="0.14" stroke="var(--danger)" strokeWidth="1.2" strokeDasharray="4 3" />
          <text x="225" y="214" textAnchor="middle" fontSize="11" fill="var(--danger)">对象 C</text>
          <rect x="290" y="190" width="70" height="40" rx="5" fill="var(--danger)" fillOpacity="0.14" stroke="var(--danger)" strokeWidth="1.2" strokeDasharray="4 3" />
          <text x="325" y="214" textAnchor="middle" fontSize="11" fill="var(--danger)">对象 D</text>
          <path d="M 260 210 L 288 210" stroke="var(--danger)" strokeWidth="1.2" fill="none" strokeDasharray="3 2" markerEnd="url(#gcArrowD)" />
          <path d="M 290 200 L 262 200" stroke="var(--danger)" strokeWidth="1.2" fill="none" strokeDasharray="3 2" markerEnd="url(#gcArrowD)" />

          <text x="210" y="252" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">Root 到不了 → 垃圾（回收）</text>
          <text x="210" y="270" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">C、D 互相引用但都不可达 → 仍被回收</text>
          <text x="210" y="288" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">（引用计数会泄漏，可达性分析不会）</text>

          {/* 泄漏说明 */}
          <rect x="60" y="306" width="300" height="50" rx="5" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="210" y="324" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">GC 语言也会泄漏</text>
          <text x="210" y="340" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">对象放进长生命周期容器没移除 → 一直可达</text>
          <text x="210" y="352" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">泄漏 = 该断的引用没断</text>

          <defs>
            <marker id="gcArrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0,0 L0,6 L7,3 z" fill="var(--success)" />
            </marker>
            <marker id="gcArrowD" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0,0 L0,6 L7,3 z" fill="var(--danger)" />
            </marker>
          </defs>

          {/* 右侧：三算法 + 分代 */}
          <rect x="400" y="68" width="300" height="300" rx="8" fill="var(--warning)" fillOpacity="0.05" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="550" y="90" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">三种经典算法</text>

          {[
            { y: 108, name: "标记-清除 Mark-Sweep", desc: "标记可达 → 清除未标记", con: "简单，但产生碎片", color: "var(--accent)" },
            { y: 160, name: "复制 Copying", desc: "存活对象从 From 复制到 To", con: "无碎片，浪费一半空间", color: "var(--success)" },
            { y: 212, name: "标记-整理 Mark-Compact", desc: "标记后存活对象向一端移动", con: "无碎片，移动开销大", color: "var(--danger)" },
          ].map((a) => (
            <g key={a.name}>
              <rect x="420" y={a.y} width="260" height="44" rx="5" fill="var(--bg-secondary)" stroke={a.color} strokeWidth="1" />
              <text x="432" y={a.y + 17} fontSize="11" fontWeight="600" fill={a.color}>{a.name}</text>
              <text x="432" y={a.y + 32} fontSize="10" fill="var(--text-secondary)">{a.desc} · {a.con}</text>
            </g>
          ))}

          {/* 分代 */}
          <rect x="420" y="270" width="260" height="84" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="550" y="290" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">分代回收</text>
          <text x="432" y="308" fontSize="10" fill="var(--text-secondary)">新生代（存活率低）→ 复制算法，Minor GC 快</text>
          <text x="432" y="324" fontSize="10" fill="var(--text-secondary)">老年代（存活率高）→ 标记-清除/整理</text>
          <text x="432" y="342" fontSize="10" fill="var(--text-tertiary)">基于「多数对象朝生夕死」，大部分 GC 只扫新生代</text>

          <text x={VIEW_W / 2} y="396" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            GC 代价：运行时开销 + STW 停顿 + 回收时机不确定
          </text>
          <text x={VIEW_W / 2} y="418" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            用一点性能和停顿，换来「不泄漏、不悬空」的内存安全
          </text>
          <text x={VIEW_W / 2} y="440" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：循环引用但不可达仍被回收，这是可达性分析优于引用计数之处
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        垃圾回收——可达性分析、三种经典算法与分代回收
      </figcaption>
    </figure>
  );
}
