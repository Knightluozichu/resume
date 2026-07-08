/**
 * <UapMemoryManagementDiagram>：Unity 内存管理与 GC 优化图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UapMemoryManagementDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Unity 内存管理与 GC 优化图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">GC 卡顿与零 GC 方案</text>
          <rect x="40" y="60" width="300" height="130" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="190" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">反面：每帧 new</text>
          <text x="190" y="112" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Update 里 new List / 数组</text>
          <text x="190" y="130" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">string 拼接产生垃圾</text>
          <text x="190" y="148" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">闭包捕获生成隐藏类</text>
          <text x="190" y="170" textAnchor="middle" fontSize="10" fill="var(--warning)">&rarr; 托管堆碎片化</text>
          <text x="190" y="185" textAnchor="middle" fontSize="10" fill="var(--warning)">&rarr; GC 暂停 30-50ms 掉帧</text>
          <rect x="380" y="60" width="300" height="130" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="530" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">正面：零 GC 四件套</text>
          <text x="530" y="112" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">对象池 Get/Release 复用</text>
          <text x="530" y="130" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">struct 替代 class（栈分配）</text>
          <text x="530" y="148" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">List 预设 Capacity 并复用</text>
          <text x="530" y="170" textAnchor="middle" fontSize="10" fill="var(--success)">&rarr; 每帧 GC Alloc = 0B</text>
          <text x="530" y="185" textAnchor="middle" fontSize="10" fill="var(--success)">&rarr; 帧率稳定不掉帧</text>
          <rect x="40" y="215" width="640" height="44" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="241" textAnchor="middle" fontSize="12" fill="var(--text-primary)">核心目标：运行时零 GC，每帧 GC Alloc = 0B</text>
          <text x="360" y="290" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">对象池生命周期</text>
          <rect x="120" y="305" width="100" height="34" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="170" y="327" textAnchor="middle" fontSize="10" fill="var(--success)">Get() 激活</text>
          <text x="235" y="327" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <rect x="260" y="305" width="100" height="34" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="310" y="327" textAnchor="middle" fontSize="10" fill="var(--accent)">使用中</text>
          <text x="375" y="327" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <rect x="400" y="305" width="100" height="34" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="450" y="327" textAnchor="middle" fontSize="10" fill="var(--warning)">Release() 回池</text>
          <text x="515" y="327" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <rect x="540" y="305" width="60" height="34" rx="6" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="570" y="327" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">复用</text>
          <text x="360" y="370" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">不 Instantiate/Destroy，Get/Release 替代，消除 GC</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        内存管理与 GC 优化——零 GC 是底线，对象池是主力
      </figcaption>
    </figure>
  );
}
