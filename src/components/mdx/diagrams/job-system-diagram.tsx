/**
 * <JobSystemDiagram>：Unity Job System——IJob 与 IJobParallelFor 结构、调度与并行执行。
 */

export function JobSystemDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 360"
          role="img"
          aria-label="Job System：IJob 做一次工作、IJobParallelFor 把数组切片分给多个 Worker 并行执行"
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
            Unity Job System
          </text>

          {/* ---- IJob single ---- */}
          <text x="160" y="52" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">
            IJob（单次作业）
          </text>

          <rect x="24" y="62" width="272" height="80" rx="8" fill="var(--bg)" stroke="var(--border)" />

          {/* Job struct */}
          <rect x="36" y="72" width="120" height="24" rx="4" fill="var(--bg-elevated)" stroke="var(--accent)" />
          <text x="96" y="88" textAnchor="middle" fontSize="9" fill="var(--accent)">
            struct MyJob : IJob
          </text>

          <rect x="164" y="72" width="120" height="24" rx="4" fill="var(--bg-elevated)" stroke="var(--border)" />
          <text x="224" y="88" textAnchor="middle" fontSize="9" fill="var(--text-primary)">
            public float data;
          </text>

          {/* Execute */}
          <rect x="36" y="102" width="248" height="18" rx="3" fill="var(--bg-elevated)" stroke="var(--border)" />
          <text x="160" y="115" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
            void Execute() {"{"} data *= 2; {"}"}
          </text>

          <text x="160" y="138" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">
            schedule → 一个 Worker 执行一次
          </text>

          {/* Job scheduling arrow */}
          <line x1="160" y1="144" x2="160" y2="158" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrowA)" />

          <rect x="96" y="160" width="128" height="20" rx="4" fill="var(--accent)" opacity="0.2" stroke="var(--accent)" strokeWidth="1" />
          <text x="160" y="174" textAnchor="middle" fontSize="8" fill="var(--accent)">
            Worker 1 → Execute()
          </text>

          {/* ---- IJobParallelFor ---- */}
          <text x="480" y="52" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">
            IJobParallelFor（并行作业）
          </text>

          <rect x="344" y="62" width="272" height="80" rx="8" fill="var(--bg)" stroke="var(--border)" />

          {/* Job struct */}
          <rect x="356" y="72" width="140" height="24" rx="4" fill="var(--bg-elevated)" stroke="var(--success)" />
          <text x="426" y="88" textAnchor="middle" fontSize="9" fill="var(--success)">
            struct ParallelJob : IJobFor
          </text>

          <rect x="504" y="72" width="100" height="24" rx="4" fill="var(--bg-elevated)" stroke="var(--border)" />
          <text x="554" y="88" textAnchor="middle" fontSize="9" fill="var(--text-primary)">
            NativeArray
          </text>

          {/* Execute */}
          <rect x="356" y="102" width="248" height="18" rx="3" fill="var(--bg-elevated)" stroke="var(--border)" />
          <text x="480" y="115" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
            Execute(int i) {"{"} arr[i] *= 2; {"}"}
          </text>

          <text x="480" y="138" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">
            schedule(arr.Length, 64) → 分片并行
          </text>

          {/* Worker rows */}
          <line x1="480" y1="144" x2="480" y2="158" stroke="var(--success)" strokeWidth="1.5" markerEnd="url(#arrowB)" />

          <rect x="356" y="160" width="84" height="20" rx="4" fill="var(--success)" opacity="0.2" stroke="var(--success)" strokeWidth="1" />
          <text x="398" y="174" textAnchor="middle" fontSize="8" fill="var(--success)">
            W1: [0..63]
          </text>
          <rect x="448" y="160" width="84" height="20" rx="4" fill="var(--success)" opacity="0.2" stroke="var(--success)" strokeWidth="1" />
          <text x="490" y="174" textAnchor="middle" fontSize="8" fill="var(--success)">
            W2: [64..127]
          </text>
          <rect x="540" y="160" width="76" height="20" rx="4" fill="var(--success)" opacity="0.2" stroke="var(--success)" strokeWidth="1" />
          <text x="578" y="174" textAnchor="middle" fontSize="8" fill="var(--success)">
            W3: [128..]
          </text>

          {/* ---- Bottom: Safety ---- */}
          <text x="320" y="210" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">
            Safety System（安全系统）
          </text>

          <rect x="40" y="220" width="560" height="48" rx="8" fill="var(--bg)" stroke="var(--border)" />

          {/* NativeContainer rules */}
          <rect x="60" y="228" width="160" height="14" rx="3" fill="var(--bg-elevated)" />
          <text x="140" y="238" textAnchor="middle" fontSize="8" fill="var(--warning)">
            NativeArray 追踪依赖
          </text>

          <rect x="240" y="228" width="160" height="14" rx="3" fill="var(--bg-elevated)" />
          <text x="320" y="238" textAnchor="middle" fontSize="8" fill="var(--danger)">
            同一容器同一时刻不能并行写
          </text>

          <rect x="420" y="228" width="160" height="14" rx="3" fill="var(--bg-elevated)" />
          <text x="500" y="238" textAnchor="middle" fontSize="8" fill="var(--accent)">
            编译期 / 运行时双重检查
          </text>

          <text x="320" y="262" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">
            NativeArray / NativeList / NativeHashMap → 管理生命周期 · Dispose 释放
          </text>

          {/* Bottom summary */}
          <text x="320" y="294" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            JobHandle.Complete() 等待完成，主线程取回结果
          </text>

          <text x="320" y="316" textAnchor="middle" fontSize="10" fill="var(--accent)">
            核心思路：数据 + 纯函数 = 安全并行，无锁无竞争
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        IJob 单个 Worker 执行一次；IJobParallelFor 将数组切片分发给多个 Worker 并行。Safety System 在编译/运行时阻止数据竞争。
      </figcaption>
    </figure>
  );
}
