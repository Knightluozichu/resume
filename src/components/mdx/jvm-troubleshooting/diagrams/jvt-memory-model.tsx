/**
 * <JvtMemoryModelDiagram>：JVM 内存模型与对象布局图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function JvtMemoryModelDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="JVM内存模型与对象布局图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            JVM 内存模型与对象布局
          </text>

          {/* 堆分代结构 */}
          <text x="40" y="54" fontSize="13" fontWeight="600" fill="var(--warning)">堆分代结构（弱代假说）</text>
          <rect x="40" y="62" width="660" height="120" rx="8" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" />

          {/* 新生代 */}
          <rect x="60" y="76" width="430" height="92" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="275" y="94" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">新生代 Young（默认 1/3 堆）</text>

          <rect x="76" y="104" width="290" height="56" rx="4" fill="var(--accent)" fillOpacity="0.16" stroke="var(--accent)" strokeWidth="1" />
          <text x="221" y="124" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">Eden（8份）</text>
          <text x="221" y="142" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">新对象分配区</text>

          <rect x="372" y="104" width="52" height="56" rx="4" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="398" y="124" textAnchor="middle" fontSize="11" fill="var(--accent)">S0</text>
          <text x="398" y="142" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">1份</text>

          <rect x="428" y="104" width="52" height="56" rx="4" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="454" y="124" textAnchor="middle" fontSize="11" fill="var(--accent)">S1</text>
          <text x="454" y="142" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">1份</text>

          {/* 老年代 */}
          <rect x="500" y="76" width="180" height="92" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="590" y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">老年代 Old</text>
          <text x="590" y="120" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">默认 2/3 堆</text>
          <text x="590" y="138" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">晋升对象/大对象</text>
          <text x="590" y="156" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">标记整理/清除</text>

          {/* 对象内存布局 */}
          <text x="40" y="214" fontSize="13" fontWeight="600" fill="var(--success)">对象内存布局（64位 JVM，指针压缩）</text>
          <rect x="40" y="222" width="660" height="80" rx="8" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" />

          <rect x="60" y="236" width="160" height="52" rx="4" fill="var(--success)" fillOpacity="0.16" stroke="var(--success)" strokeWidth="1" />
          <text x="140" y="256" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">对象头 Header</text>
          <text x="140" y="274" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">MarkWord 8B + Klass 4B</text>

          <rect x="228" y="236" width="240" height="52" rx="4" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="348" y="256" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">实例数据 Instance Data</text>
          <text x="348" y="274" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">字段值（字段重排序）</text>

          <rect x="476" y="236" width="120" height="52" rx="4" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" />
          <text x="536" y="256" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">对齐 Padding</text>
          <text x="536" y="274" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">8字节整数倍</text>

          {/* OOM 报错信息对照 */}
          <text x="40" y="334" fontSize="13" fontWeight="600" fill="var(--danger)">OOM 报错信息对照表</text>

          <rect x="40" y="344" width="320" height="44" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="200" y="362" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">Java heap space</text>
          <text x="200" y="380" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">堆溢出：泄漏/大对象/堆太小</text>

          <rect x="370" y="344" width="320" height="44" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="530" y="362" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">Metaspace</text>
          <text x="530" y="380" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">元空间溢出：动态生成类过多</text>

          <rect x="40" y="396" width="320" height="44" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="200" y="414" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">StackOverflowError</text>
          <text x="200" y="432" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">栈溢出：递归过深/线程过多</text>

          <rect x="370" y="396" width="320" height="44" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="530" y="414" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">GC overhead limit exceeded</text>
          <text x="530" y="432" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">98%时间GC且只回收2%</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        JVM 堆分代结构（Eden:S0:S1=8:1:1）、对象内存布局（头/数据/对齐）与各区域 OOM 报错对照
      </figcaption>
    </figure>
  );
}
