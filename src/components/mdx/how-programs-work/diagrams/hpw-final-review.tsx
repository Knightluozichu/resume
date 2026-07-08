/**
 * <HpwFinalReviewDiagram>：全书总复习图解（四层知识图谱 + 程序生命周期）。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function HpwFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="程序是怎么跑起来的 全书总复习图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            程序运行时四层知识图谱
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            内存层 → 执行层 → 系统层 → 运行时层，上层依赖下层
          </text>

          {/* 四层堆叠 */}
          {/* 内存层 */}
          <rect x="40" y="66" width="660" height="64" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.4" />
          <text x="60" y="88" fontSize="13" fontWeight="600" fill="var(--success)">内存层</text>
          <text x="60" y="106" fontSize="10" fill="var(--text-secondary)">解决：数据存哪、地址怎么寻址</text>
          <text x="60" y="120" fontSize="10" fill="var(--text-tertiary)">字节编址 · 内存布局 · 虚拟地址 · 指针=地址</text>
          <text x="680" y="100" textAnchor="end" fontSize="10" fill="var(--text-secondary)">第 2-3 章：内存基础 / 指针原理</text>

          {/* 执行层 */}
          <rect x="40" y="138" width="660" height="64" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="60" y="160" fontSize="13" fontWeight="600" fill="var(--warning)">执行层</text>
          <text x="60" y="178" fontSize="10" fill="var(--text-secondary)">解决：CPU 怎么执行、内存怎么分配</text>
          <text x="60" y="192" fontSize="10" fill="var(--text-tertiary)">操作码+操作数 · 寄存器 · 栈帧 · 堆分配</text>
          <text x="680" y="172" textAnchor="end" fontSize="10" fill="var(--text-secondary)">第 4-5 章：机器指令 / 栈与堆</text>

          {/* 系统层 */}
          <rect x="40" y="210" width="660" height="64" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="60" y="232" fontSize="13" fontWeight="600" fill="var(--accent)">系统层</text>
          <text x="60" y="250" fontSize="10" fill="var(--text-secondary)">解决：多程序怎么调度、怎么碰硬件</text>
          <text x="60" y="264" fontSize="10" fill="var(--text-tertiary)">进程/线程 · 上下文切换 · 用户态/内核态 · 系统调用</text>
          <text x="680" y="244" textAnchor="end" fontSize="10" fill="var(--text-secondary)">第 6-7 章：进程调度 / 系统调用</text>

          {/* 运行时层 */}
          <rect x="40" y="282" width="660" height="64" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.4" />
          <text x="60" y="304" fontSize="13" fontWeight="600" fill="var(--danger)">运行时层</text>
          <text x="60" y="322" fontSize="10" fill="var(--text-secondary)">解决：代码怎么共享、内存怎么自动回收</text>
          <text x="60" y="336" fontSize="10" fill="var(--text-tertiary)">共享库 · PLT/GOT · 可达性分析 · 分代回收</text>
          <text x="680" y="316" textAnchor="end" fontSize="10" fill="var(--text-secondary)">第 8-9 章：动态链接 / 垃圾回收</text>

          {/* 程序生命周期时间线 */}
          <text x="60" y="370" fontSize="13" fontWeight="600" fill="var(--text-primary)">程序生命周期（全书主线串联）</text>
          {[
            { x: 50, label: "加载", desc: "动态链接", color: "var(--danger)" },
            { x: 175, label: "执行", desc: "指令/栈帧", color: "var(--warning)" },
            { x: 300, label: "内存", desc: "栈/堆/指针", color: "var(--success)" },
            { x: 425, label: "系统", desc: "调度/调用", color: "var(--accent)" },
            { x: 550, label: "回收", desc: "GC 回收", color: "var(--danger)" },
            { x: 660, label: "退出", desc: "OS 回收", color: "var(--text-secondary)" },
          ].map((s, i) => (
            <g key={s.label}>
              {i < 5 && (
                <path d={`M ${s.x + 70} 396 L ${s.x + 115} 396`} stroke="var(--text-tertiary)" strokeWidth="1.4" fill="none" markerEnd="url(#frArrow)" />
              )}
              <circle cx={s.x + 60} cy="396" r="6" fill={s.color} />
              <text x={s.x + 60} y="418" textAnchor="middle" fontSize="11" fontWeight="600" fill={s.color}>{s.label}</text>
              <text x={s.x + 60} y="432" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">{s.desc}</text>
            </g>
          ))}
          <defs>
            <marker id="frArrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0,0 L0,6 L7,3 z" fill="var(--text-tertiary)" />
            </marker>
          </defs>

          <text x={VIEW_W / 2} y="452" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：原理是地图，写出好代码还要把原理变手感、会用工具验证
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书总复习——四层知识图谱与程序生命周期主线
      </figcaption>
    </figure>
  );
}
