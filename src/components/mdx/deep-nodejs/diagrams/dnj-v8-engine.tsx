/**
 * <DnjV8EngineDiagram>：V8 引擎原理图解（JIT 管线 / 隐藏类 / GC）。
 * 纯静态展示，无交互。Server Component。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function DnjV8EngineDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="V8引擎JIT管线与GC图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            V8 引擎：JIT 编译管线 + 隐藏类 + 垃圾回收
          </text>

          {/* JIT 管线 */}
          <text x={VIEW_W / 2} y="52" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">JIT 编译管线（解释执行 + 热点优化）</text>

          <rect x="30" y="64" width="110" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="85" y="86" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">JS 源码</text>
          <text x="85" y="100" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">source.js</text>

          <text x="148" y="92" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="160" y="64" width="110" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="215" y="86" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">Parser</text>
          <text x="215" y="100" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">词法+语法分析</text>

          <text x="278" y="92" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="290" y="64" width="110" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="345" y="86" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">Ignition</text>
          <text x="345" y="100" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">解释器/字节码</text>

          <text x="408" y="92" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="420" y="64" width="110" height="50" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="475" y="86" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">TurboFan</text>
          <text x="475" y="100" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">优化编译器</text>

          <text x="538" y="92" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="550" y="64" width="160" height="50" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" strokeDasharray="4 3" />
          <text x="630" y="86" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">机器码执行</text>
          <text x="630" y="100" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">热点函数 &gt; 解释执行 2-10x</text>

          {/* 反优化标注 */}
          <path d="M 475 114 Q 475 130 345 130 Q 345 130 345 114" fill="none" stroke="var(--danger)" strokeWidth="1" strokeDasharray="3 2" markerEnd="url(#arr2)" opacity="0.5" />
          <text x="410" y="142" textAnchor="middle" fontSize="9" fill="var(--danger)">类型反馈失效 → 反优化（Deopt）</text>

          {/* 隐藏类 */}
          <text x={VIEW_W / 2} y="166" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">隐藏类（Hidden Class / Map）与内联缓存</text>

          <rect x="50" y="178" width="200" height="90" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="150" y="198" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">对象 a</text>
          <text x="150" y="216" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">&#123; x: 1 &#125;</text>
          <text x="150" y="234" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">→ Map0</text>
          <text x="150" y="252" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">→ 添加 y → Map1（迁移）</text>

          <rect x="270" y="178" width="200" height="90" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="198" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">对象 b</text>
          <text x="370" y="216" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">&#123; x: 2 &#125;</text>
          <text x="370" y="234" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">→ Map0（复用）</text>
          <text x="370" y="252" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">→ 添加 y → Map1（同链）</text>

          <rect x="490" y="178" width="200" height="90" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="590" y="198" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">内联缓存（IC）</text>
          <text x="590" y="216" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">a.x 命中 Map0</text>
          <text x="590" y="234" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">b.x 命中 Map0</text>
          <text x="590" y="252" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">单态 → 多态 → 超态</text>

          {/* 垃圾回收 */}
          <text x={VIEW_W / 2} y="292" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">Orinoco 垃圾回收（分代 + 增量 + 并发）</text>

          <rect x="50" y="304" width="150" height="70" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="125" y="324" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">新生代</text>
          <text x="125" y="340" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Scavenge 算法</text>
          <text x="125" y="354" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">From/To 半区复制</text>
          <text x="125" y="368" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">短命对象快速回收</text>

          <rect x="220" y="304" width="150" height="70" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="295" y="324" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">老生代</text>
          <text x="295" y="340" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">标记-清除-整理</text>
          <text x="295" y="354" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Mark-Sweep-Compact</text>
          <text x="295" y="368" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">存活对象多/碎片整理</text>

          <rect x="390" y="304" width="150" height="70" rx="8" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="465" y="324" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">增量标记</text>
          <text x="465" y="340" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">拆分标记阶段</text>
          <text x="465" y="354" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">写屏障三色标记</text>
          <text x="465" y="368" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">减少停顿时间</text>

          <rect x="560" y="304" width="150" height="70" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="635" y="324" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">并发回收</text>
          <text x="635" y="340" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">辅助线程并行</text>
          <text x="635" y="354" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">主线程不暂停</text>
          <text x="635" y="368" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Orinoco 并发标记</text>

          <text x="125" y="396" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">&darr; 晋升</text>
          <text x="125" y="410" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">经历 Scavenge 存活</text>

          {/* 内存限制 */}
          <rect x="50" y="426" width="660" height="36" rx="6" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="448" textAnchor="middle" fontSize="10" fill="var(--danger)">
            关键约束：Node.js 默认堆上限 ~1.4GB（64 位），--max-old-space-size 调整；Buffer 在 V8 堆外分配
          </text>

          <defs>
            <marker id="arr2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--danger)" opacity="0.5" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        V8 引擎原理——Ignition 解释器 + TurboFan 优化编译器 + 隐藏类 + 分代 GC
      </figcaption>
    </figure>
  );
}
