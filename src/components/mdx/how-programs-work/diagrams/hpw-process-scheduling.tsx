/**
 * <HpwProcessSchedulingDiagram>：进程调度图解（状态转换 + 上下文切换 + 并发假象）。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function HpwProcessSchedulingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="进程调度图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            进程调度：单核 CPU 快速切换制造并发假象
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            进程 = 资源分配单位，线程 = CPU 调度单位
          </text>

          {/* 左侧：进程三状态转换图 */}
          <text x="60" y="78" fontSize="13" fontWeight="600" fill="var(--accent)">进程状态转换</text>

          {/* 就绪 */}
          <rect x="60" y="92" width="140" height="56" rx="8" fill="var(--warning)" fillOpacity="0.14" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="130" y="116" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">就绪 Ready</text>
          <text x="130" y="134" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">具备条件，等 CPU</text>

          {/* 运行 */}
          <rect x="250" y="92" width="140" height="56" rx="8" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1.4" />
          <text x="320" y="116" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">运行 Running</text>
          <text x="320" y="134" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">正在 CPU 执行</text>

          {/* 阻塞 */}
          <rect x="440" y="92" width="140" height="56" rx="8" fill="var(--danger)" fillOpacity="0.14" stroke="var(--danger)" strokeWidth="1.4" />
          <text x="510" y="116" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">阻塞 Blocked</text>
          <text x="510" y="134" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">等 I/O / 锁</text>

          {/* 转换箭头与标签 */}
          <text x="225" y="108" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">调度</text>
          <text x="225" y="140" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">选中</text>
          <path d="M 200 110 L 245 110" stroke="var(--text-secondary)" strokeWidth="1.4" fill="none" markerEnd="url(#psArrow)" />
          <path d="M 245 132 L 200 132" stroke="var(--text-secondary)" strokeWidth="1.4" fill="none" markerEnd="url(#psArrow)" />
          <text x="225" y="148" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">时间片用完</text>

          <text x="395" y="108" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">等 I/O</text>
          <path d="M 390 120 L 435 120" stroke="var(--text-secondary)" strokeWidth="1.4" fill="none" markerEnd="url(#psArrow)" />

          <path d="M 510 148 Q 510 200 320 200 Q 130 200 130 150" stroke="var(--text-secondary)" strokeWidth="1.4" fill="none" strokeDasharray="4 3" markerEnd="url(#psArrow)" />
          <text x="320" y="216" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">I/O 完成 / 拿到锁 → 回到就绪</text>

          <defs>
            <marker id="psArrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0,0 L0,6 L7,3 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 中部：上下文切换 */}
          <rect x="50" y="240" width="320" height="160" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="210" y="262" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">上下文切换</text>
          <text x="70" y="284" fontSize="11" fill="var(--text-secondary)">① 保存当前进程的寄存器/PC/栈指针到 PCB</text>
          <text x="70" y="304" fontSize="11" fill="var(--text-secondary)">② 加载下一进程的上下文到 CPU</text>
          <text x="70" y="324" fontSize="11" fill="var(--text-secondary)">③ 切换页表（进程间）</text>
          <text x="70" y="348" fontSize="10" fill="var(--text-tertiary)">开销：寄存器恢复 + 缓存失效 + 页表切换</text>
          <text x="70" y="376" fontSize="10" fontWeight="600" fill="var(--danger)">线程并非越多越快：切换开销会压过实际工作</text>

          {/* 右部：调度算法 */}
          <rect x="390" y="240" width="300" height="160" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="540" y="262" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">常见调度算法</text>
          {[
            { y: 284, name: "FCFS 先来先服务", desc: "简单，短任务被长任务拖住" },
            { y: 306, name: "Round Robin 时间片轮转", desc: "公平，分时系统基础" },
            { y: 328, name: "优先级调度", desc: "可能饿死低优先级（需老化）" },
            { y: 350, name: "MLFQ 多级反馈队列", desc: "现代 OS 多用其变体" },
          ].map((a) => (
            <g key={a.name}>
              <text x="406" y={a.y} fontSize="11" fontWeight="600" fill="var(--warning)">{a.name}</text>
              <text x="406" y={a.y + 13} fontSize="10" fill="var(--text-tertiary)">{a.desc}</text>
            </g>
          ))}
          <text x="540" y="390" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">时间片太大退化 FCFS，太小切换开销高</text>

          <text x={VIEW_W / 2} y="428" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            并发（交替推进）vs 并行（多核同时执行）
          </text>
          <text x={VIEW_W / 2} y="448" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：竞态条件靠锁/原子操作解决，提速靠减少锁竞争 + 提高缓存命中
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        进程调度——状态转换、上下文切换与调度算法
      </figcaption>
    </figure>
  );
}
