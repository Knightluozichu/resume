/**
 * <ObjectPoolDiagram>：对象池——Get/Use/Return 循环 vs 每帧 Instantiate/Destroy 对比。
 */

export function ObjectPoolDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 340"
          role="img"
          aria-label="对象池：Get → Use → Return → Reuse 循环 vs Instantiate/Destroy 每帧创建销毁对比"
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
            对象池（Object Pooling）
          </text>

          {/* Left: Without pooling */}
          <text x="120" y="52" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">
            ✗ 无对象池
          </text>

          <rect x="16" y="62" width="208" height="190" rx="8" fill="var(--bg)" stroke="var(--danger)" strokeWidth="1" />

          {/* Instantiate */}
          <rect x="32" y="72" width="176" height="28" rx="4" fill="var(--bg-elevated)" stroke="var(--border)" />
          <text x="120" y="90" textAnchor="middle" fontSize="9" fill="var(--text-primary)">
            Instantiate()
          </text>

          <line x1="120" y1="100" x2="120" y2="112" stroke="var(--danger)" strokeWidth="1.5" markerEnd="url(#arrowDanger)" />

          {/* Use */}
          <rect x="32" y="114" width="176" height="24" rx="4" fill="var(--bg-elevated)" stroke="var(--border)" />
          <text x="120" y="130" textAnchor="middle" fontSize="9" fill="var(--text-primary)">
            使用
          </text>

          <line x1="120" y1="138" x2="120" y2="150" stroke="var(--danger)" strokeWidth="1.5" markerEnd="url(#arrowDanger)" />

          {/* Destroy */}
          <rect x="32" y="152" width="176" height="28" rx="4" fill="var(--bg-elevated)" stroke="var(--border)" />
          <text x="120" y="170" textAnchor="middle" fontSize="9" fill="var(--text-primary)">
            Destroy()
          </text>

          {/* Repeat label */}
          <text x="120" y="200" textAnchor="middle" fontSize="8" fill="var(--danger)">
            每帧创建/销毁 — GC 压力大
          </text>

          <path d="M 200 186 C 230 186, 230 86, 200 86" fill="none" stroke="var(--danger)" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#arrowDanger)" />
          <text x="228" y="140" textAnchor="middle" fontSize="8" fill="var(--danger)">
            重复
          </text>

          {/* Right: With pooling */}
          <text x="480" y="52" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">
            ✓ 对象池
          </text>

          <rect x="364" y="62" width="232" height="190" rx="8" fill="var(--bg)" stroke="var(--success)" strokeWidth="1" />

          {/* Pool initialize */}
          <rect x="380" y="72" width="200" height="28" rx="4" fill="var(--bg-elevated)" stroke="var(--success)" strokeWidth="1" />
          <text x="480" y="90" textAnchor="middle" fontSize="9" fill="var(--success)">
            预热：预创建 N 个对象
          </text>

          <line x1="480" y1="100" x2="480" y2="112" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#arrow)" />

          {/* Pool lifecycle: Get → Use → Return → Reuse loop */}
          <rect x="388" y="114" width="48" height="24" rx="4" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="1" />
          <text x="412" y="130" textAnchor="middle" fontSize="8" fill="var(--accent)">
            Get
          </text>

          <text x="444" y="126" fontSize="9" fill="var(--text-secondary)">
            →
          </text>

          <rect x="450" y="114" width="48" height="24" rx="4" fill="var(--bg-elevated)" stroke="var(--border)" />
          <text x="474" y="130" textAnchor="middle" fontSize="8" fill="var(--text-primary)">
            使用
          </text>

          <text x="506" y="126" fontSize="9" fill="var(--text-secondary)">
            →
          </text>

          <rect x="514" y="114" width="66" height="24" rx="4" fill="var(--bg-elevated)" stroke="var(--border)" />
          <text x="547" y="130" textAnchor="middle" fontSize="8" fill="var(--text-primary)">
            Return
          </text>

          {/* Return arrow back to pool */}
          <path d="M 547 138 C 547 170, 412 170, 412 138" fill="none" stroke="var(--success)" strokeWidth="1.5" markerEnd="url(#arrowSuccess)" />

          {/* Pool stats */}
          <rect x="388" y="182" width="192" height="28" rx="4" fill="var(--bg-elevated)" stroke="var(--border)" />
          <text x="484" y="200" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">
            池中空闲: 3/10 · 活跃: 7 · 自动扩容
          </text>

          <text x="480" y="230" textAnchor="middle" fontSize="8" fill="var(--success)">
            零 new · 零 GC.Alloc · 帧率稳定
          </text>

          {/* Bottom: Comparison bar */}
          <rect x="120" y="268" width="400" height="1" fill="var(--border)" />

          <text x="320" y="292" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            预热 运行时无分配 · Get/Return 均 O(1) · 适合 弹幕/粒子/敌人/UI 项
          </text>
          <text x="320" y="312" textAnchor="middle" fontSize="10" fill="var(--accent)">
            对象池不是万能：大场景永久对象、唯一 UI 控件不需要池 —— 只为"重复创建/销毁"而生
          </text>

          {/* Arrow markers */}
          <defs>
            <marker id="arrowDanger" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--danger)" />
            </marker>
            <marker id="arrowSuccess" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--success)" />
            </marker>
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        无池：每帧 Instantiate + Destroy 产生大量 GC.Alloc；有池：一次预热后 Get → Use → Return 循环，零运行时分配。
      </figcaption>
    </figure>
  );
}
