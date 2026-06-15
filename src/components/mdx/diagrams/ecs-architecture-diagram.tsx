/**
 * <EcsArchitectureDiagram>：ECS 架构——Entity、Component、System 三者分离与数据流。
 */

export function EcsArchitectureDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 340"
          role="img"
          aria-label="ECS 架构：Entity 只是 ID、Component 是纯数据结构体、System 是无状态的纯函数逻辑——三者彻底分离"
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
            ECS 架构：彻底分离三大概念
          </text>

          {/* ---- Entity ---- */}
          <rect x="24" y="40" width="170" height="112" rx="8" fill="var(--bg)" stroke="var(--border)" />
          <text x="109" y="62" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">
            Entity（实体）
          </text>

          <rect x="40" y="72" width="138" height="18" rx="3" fill="var(--bg-elevated)" />
          <text x="109" y="85" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
            只是一个 int ID
          </text>

          <rect x="40" y="96" width="138" height="18" rx="3" fill="var(--bg-elevated)" />
          <text x="109" y="109" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
            无数据 · 无方法
          </text>

          <rect x="40" y="120" width="138" height="18" rx="3" fill="var(--bg-elevated)" />
          <text x="109" y="133" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
            等同于「数据库行号」
          </text>

          {/* ---- Component ---- */}
          <rect x="235" y="40" width="170" height="112" rx="8" fill="var(--bg)" stroke="var(--border)" />
          <text x="320" y="62" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">
            Component（组件）
          </text>

          <rect x="251" y="72" width="138" height="18" rx="3" fill="var(--bg-elevated)" />
          <text x="320" y="85" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
            IComponentData 标记结构体
          </text>

          <rect x="251" y="96" width="138" height="18" rx="3" fill="var(--bg-elevated)" />
          <text x="320" y="109" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
            只含非托管字段
          </text>

          <rect x="251" y="120" width="138" height="18" rx="3" fill="var(--bg-elevated)" />
          <text x="320" y="133" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
            struct Translation {"{"} float3; {"}"}
          </text>

          {/* ---- System ---- */}
          <rect x="446" y="40" width="170" height="112" rx="8" fill="var(--bg)" stroke="var(--border)" />
          <text x="531" y="62" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">
            System（系统）
          </text>

          <rect x="462" y="72" width="138" height="18" rx="3" fill="var(--bg-elevated)" />
          <text x="531" y="85" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
            纯函数逻辑 · 无状态
          </text>

          <rect x="462" y="96" width="138" height="18" rx="3" fill="var(--bg-elevated)" />
          <text x="531" y="109" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
            Entities.ForEach 查询
          </text>

          <rect x="462" y="120" width="138" height="18" rx="3" fill="var(--bg-elevated)" />
          <text x="531" y="133" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
            只在满足条件的 Entity 上跑
          </text>

          {/* Data flow arrows */}
          {/* Entity → Component */}
          <line x1="194" y1="96" x2="235" y2="96" stroke="var(--text-secondary)" strokeWidth="1" markerEnd="url(#arrowA)" />
          <text x="214" y="152" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">
            挂载
          </text>

          {/* Component → System */}
          <line x1="405" y1="96" x2="446" y2="96" stroke="var(--text-secondary)" strokeWidth="1" markerEnd="url(#arrowA)" />
          <text x="426" y="152" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">
            查询
          </text>

          {/* ---- Bottom: Key insight ---- */}
          <rect x="40" y="172" width="560" height="60" rx="8" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.5" />

          <text x="320" y="194" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">
            关键洞察：为什么 ECS 能并行？
          </text>

          <text x="320" y="214" textAnchor="middle" fontSize="9" fill="var(--text-primary)">
            Component 是纯数据（无引用、无虚方法）→ 内存连续排布、CPU Cache-Friendly
          </text>
          <text x="320" y="228" textAnchor="middle" fontSize="9" fill="var(--text-primary)">
            System 只吃数据、无副作用 → Job System 安全并行 → Burst 编译到 LLVM
          </text>

          {/* GameObject comparison */}
          <rect x="40" y="248" width="560" height="44" rx="8" fill="var(--bg-elevated)" stroke="var(--border)" />

          <text x="320" y="268" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--text-secondary)">
            GameObject 模式（继承 · 虚调用 · 散乱内存）vs ECS 模式（组合 · 纯数据 · 连续内存）
          </text>
          <text x="320" y="284" textAnchor="middle" fontSize="9" fill="var(--accent)">
            数据布局决定性能上限
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Entity 只是 ID；Component 是纯数据非托管结构体；System 是无状态纯函数只处理满足条件的 Entity。三者彻底分离使数据连续排布、逻辑安全并行。
      </figcaption>
    </figure>
  );
}
