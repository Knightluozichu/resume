/**
 * <BurstCompilerDiagram>：Burst Compiler——IL → LLVM 优化 → 生成 SIMD 指令，对比 Mono/IL2CPP。
 */

export function BurstCompilerDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 340"
          role="img"
          aria-label="Burst Compiler：C# IL 被 Burst 编译为 LLVM IR 并生成高度优化的 SIMD 原生代码，速度可达 Mono 的 100 倍"
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
            Burst Compiler：从 IL 到极致机器码
          </text>

          {/* Compilation pipeline */}
          <rect x="40" y="40" width="560" height="64" rx="8" fill="var(--bg)" stroke="var(--border)" />

          {/* Three stages */}
          <rect x="56" y="52" width="120" height="40" rx="5" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="116" y="68" textAnchor="middle" fontSize="10" fill="var(--text-primary)">
            C# 代码
          </text>
          <text x="116" y="82" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">
            带 [BurstCompile]
          </text>

          <text x="190" y="76" textAnchor="middle" fontSize="14" fill="var(--accent)">→</text>

          <rect x="212" y="52" width="120" height="40" rx="5" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="272" y="68" textAnchor="middle" fontSize="10" fill="var(--text-primary)">
            IL → LLVM
          </text>
          <text x="272" y="82" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">
            调用 Burst 工具链
          </text>

          <text x="346" y="76" textAnchor="middle" fontSize="14" fill="var(--accent)">→</text>

          <rect x="368" y="52" width="120" height="40" rx="5" fill="var(--accent)" opacity="0.15" stroke="var(--accent)" strokeWidth="2" />
          <text x="428" y="68" textAnchor="middle" fontSize="10" fill="var(--accent)">
            SIMD 原生码
          </text>
          <text x="428" y="82" textAnchor="middle" fontSize="8" fill="var(--accent)">
            向量化 · 内联
          </text>

          <text x="502" y="76" textAnchor="middle" fontSize="14" fill="var(--text-secondary)">✨</text>

          {/* ---- Code comparison ---- */}
          <text x="320" y="128" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">
            代码对照：向量运算 × Burst
          </text>

          {/* Without Burst */}
          <rect x="24" y="140" width="280" height="90" rx="8" fill="var(--bg)" stroke="var(--danger)" strokeWidth="1" opacity="0.7" />
          <text x="164" y="158" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">
            无 Burst（Mono/IL2CPP JIT）
          </text>
          <rect x="40" y="164" width="248" height="52" rx="4" fill="var(--bg-elevated)" stroke="var(--border)" />
          <text x="52" y="180" fontSize="9" fill="var(--text-secondary)" fontFamily="monospace">
            float3 a, b, c;
          </text>
          <text x="52" y="194" fontSize="9" fill="var(--text-secondary)" fontFamily="monospace">
            c.x = a.x + b.x;
          </text>
          <text x="52" y="208" fontSize="9" fill="var(--text-secondary)" fontFamily="monospace">
            c.y = a.y + b.y; c.z = a.z + b.z;
          </text>

          {/* With Burst */}
          <rect x="336" y="140" width="280" height="90" rx="8" fill="var(--bg)" stroke="var(--success)" strokeWidth="1.5" />
          <text x="476" y="158" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">
            Burst 编译后（同一段 C#）
          </text>
          <rect x="352" y="164" width="248" height="52" rx="4" fill="var(--bg-elevated)" stroke="var(--success)" strokeWidth="1" />
          <text x="364" y="180" fontSize="9" fill="var(--success)" fontFamily="monospace">
            → SSE/NEON SIMD 指令
          </text>
          <text x="364" y="194" fontSize="9" fill="var(--success)" fontFamily="monospace">
            → addps (4 个 float 一次算)
          </text>
          <text x="364" y="208" fontSize="9" fill="var(--success)" fontFamily="monospace">
            → 循环展开 · 常量折叠 · 内联
          </text>

          {/* Performance bar */}
          <text x="320" y="256" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">
            实测性能对比（向量运算 100 万次）
          </text>

          {/* Bar graph */}
          {/* Mono */}
          <rect x="80" y="268" width="80" height="16" rx="3" fill="var(--danger)" opacity="0.5" />
          <text x="80" y="296" textAnchor="middle" fontSize="8" fill="var(--danger)">
            Mono
          </text>
          <text x="80" y="308" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">
            1.0×
          </text>

          {/* IL2CPP */}
          <rect x="190" y="268" width="140" height="16" rx="3" fill="var(--warning)" opacity="0.5" />
          <text x="260" y="296" textAnchor="middle" fontSize="8" fill="var(--warning)">
            IL2CPP (AOT)
          </text>
          <text x="260" y="308" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">
            ~1.5–2×
          </text>

          {/* Burst */}
          <rect x="360" y="268" width="200" height="16" rx="3" fill="var(--success)" opacity="0.6" />
          <text x="460" y="296" textAnchor="middle" fontSize="8" fill="var(--success)">
            Burst (LLVM)
          </text>
          <text x="460" y="308" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--success)">
            10–100×
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Burst 将 C# IL 编译到 LLVM IR 并生成 SIMD 机器码：自动向量化、内联、循环展开，向量运算可比 Mono 快 10–100 倍。代码是同一段 C#，只需加 [BurstCompile]。
      </figcaption>
    </figure>
  );
}
