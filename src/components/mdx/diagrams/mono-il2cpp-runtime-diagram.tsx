/**
 * <MonoIl2cppRuntimeDiagram>：Mono vs IL2CPP 运行时——内存模型、编译方式、GC 机制对比。
 */

export function MonoIl2cppRuntimeDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 340"
          role="img"
          aria-label="Mono vs IL2CPP 运行时对比：Mono 使用 JIT 编译与 Boehm GC；IL2CPP 使用 AOT 编译，可选增量 GC"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text
            x="320"
            y="24"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Mono vs IL2CPP 运行时
          </text>

          {/* Mono (left side) */}
          <rect x="20" y="40" width="280" height="280" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="160" y="62" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            Mono
          </text>

          {/* Mono: C# source → JIT */}
          <rect x="40" y="74" width="240" height="36" rx="6" fill="var(--bg-elevated)" stroke="var(--border)" />
          <text x="160" y="96" textAnchor="middle" fontSize="10" fill="var(--text-primary)">
            C#/IL → 运行时 JIT 编译
          </text>

          {/* Arrow down */}
          <line x1="160" y1="110" x2="160" y2="122" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#arrow)" />

          {/* Mono: Boehm GC */}
          <rect x="40" y="124" width="240" height="52" rx="6" fill="var(--bg)" stroke="var(--danger)" strokeWidth="1.5" />
          <text x="160" y="146" textAnchor="middle" fontSize="10" fill="var(--text-primary)">
            Boehm GC（保守式）
          </text>
          <text x="160" y="164" textAnchor="middle" fontSize="9" fill="var(--danger)">
            Stop-The-World · 不可预测暂停
          </text>

          {/* Arrow down */}
          <line x1="160" y1="176" x2="160" y2="188" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#arrow)" />

          {/* Mono: managed heap */}
          <rect x="40" y="190" width="240" height="52" rx="6" fill="var(--bg-elevated)" stroke="var(--border)" />
          <text x="160" y="212" textAnchor="middle" fontSize="10" fill="var(--text-primary)">
            托管堆（Managed Heap）
          </text>
          <text x="160" y="230" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
            对象分配频繁触发 GC 扫描
          </text>

          {/* Mono: platform */}
          <text x="160" y="272" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
            兼容好 · 启动快 · 移动端已废弃
          </text>

          {/* IL2CPP (right side) */}
          <rect x="340" y="40" width="280" height="280" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="480" y="62" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">
            IL2CPP
          </text>

          {/* IL2CPP: AOT */}
          <rect x="360" y="74" width="240" height="36" rx="6" fill="var(--bg-elevated)" stroke="var(--success)" strokeWidth="1.5" />
          <text x="480" y="96" textAnchor="middle" fontSize="10" fill="var(--text-primary)">
            IL → C++ → AOT 静态编译
          </text>

          {/* Arrow down */}
          <line x1="480" y1="110" x2="480" y2="122" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#arrow)" />

          {/* IL2CPP: Incremental GC */}
          <rect x="360" y="124" width="240" height="52" rx="6" fill="var(--bg)" stroke="var(--success)" strokeWidth="1.5" />
          <text x="480" y="146" textAnchor="middle" fontSize="10" fill="var(--text-primary)">
            增量 GC（可选）
          </text>
          <text x="480" y="164" textAnchor="middle" fontSize="9" fill="var(--success)">
            分步执行 · 可预测暂停
          </text>

          {/* Arrow down */}
          <line x1="480" y1="176" x2="480" y2="188" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#arrow)" />

          {/* IL2CPP: heap */}
          <rect x="360" y="190" width="240" height="52" rx="6" fill="var(--bg-elevated)" stroke="var(--border)" />
          <text x="480" y="212" textAnchor="middle" fontSize="10" fill="var(--text-primary)">
            本机堆（Native Heap）
          </text>
          <text x="480" y="230" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
            C++ 对象 · 手动/GC 混合管理
          </text>

          {/* IL2CPP: platform */}
          <text x="480" y="272" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
            iOS 必须 · 性能更好 · 内存更紧
          </text>

          {/* VS divider */}
          <text x="320" y="180" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-secondary)">
            VS
          </text>

          {/* Bottom note */}
          <rect x="80" y="330" width="480" height="1" fill="var(--border)" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Mono 运行时 JIT 编译 + Boehm GC，暂停不可预测；IL2CPP AOT 编译为 C++，GC 可选增量模式，内存更紧但性能更优。iOS 强制 IL2CPP。
      </figcaption>
    </figure>
  );
}
