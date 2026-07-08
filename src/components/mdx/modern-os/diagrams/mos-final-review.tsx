/**
 * <MosFinalReviewDiagram>：一个程序从启动到退出的九大机制时间线图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 470;

export function MosFinalReviewDiagram() {
  const stages = [
    { x: 50, label: "fork()", chapter: "第2章", color: "var(--warning)", note: "分配 PCB" },
    { x: 120, label: "exec()", chapter: "第4章", color: "var(--warning)", note: "建地址空间" },
    { x: 190, label: "运行", chapter: "第4章", color: "var(--accent)", note: "MMU 翻译" },
    { x: 260, label: "缺页", chapter: "第5章", color: "var(--accent)", note: "LRU 置换" },
    { x: 330, label: "线程", chapter: "第3章", color: "var(--success)", note: "派生调度" },
    { x: 400, label: "open()", chapter: "第6章", color: "var(--danger)", note: "定位 inode" },
    { x: 470, label: "read()", chapter: "第7章", color: "var(--danger)", note: "SCAN 寻道" },
    { x: 540, label: "加锁", chapter: "第8章", color: "var(--warning)", note: "防死锁" },
    { x: 610, label: "权限", chapter: "第9章", color: "var(--success)", note: "ACL 检查" },
    { x: 680, label: "exit()", chapter: "总复习", color: "var(--accent)", note: "回收闭环" },
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="一个程序一生九大机制时间线图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            一个程序的一生：九大机制接力时间线
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            fork/exec → 运行 → 缺页置换 → 线程调度 → I/O → 死锁防护 → 权限检查 → exit 回收
          </text>

          {/* 时间线主轴 */}
          <line x1="40" y1="160" x2="700" y2="160" stroke="var(--text-tertiary)" strokeWidth="1.5" />

          {/* 阶段节点 */}
          {stages.map((s, i) => (
            <g key={i}>
              <circle cx={s.x} cy="160" r="8" fill={s.color} fillOpacity="0.3" stroke={s.color} strokeWidth="1.4" />
              <text x={s.x} y="140" textAnchor="middle" fontSize="10" fontWeight="600" fill={s.color}>{s.label}</text>
              <text x={s.x} y="126" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">{s.chapter}</text>
              <text x={s.x} y="180" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">{s.note}</text>
              <line x1={s.x} y1="168" x2={s.x} y2="186" stroke={s.color} strokeWidth="0.8" strokeOpacity="0.5" />
            </g>
          ))}

          {/* 起止标记 */}
          <text x="40" y="210" fontSize="10" fill="var(--warning)">启动</text>
          <text x="660" y="210" fontSize="10" fill="var(--accent)">退出</text>

          {/* 机制分组带 */}
          <rect x="40" y="230" width="200" height="40" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="140" y="254" textAnchor="middle" fontSize="10" fill="var(--warning)">进程与线程（第2-3章）</text>

          <rect x="250" y="230" width="160" height="40" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="330" y="254" textAnchor="middle" fontSize="10" fill="var(--accent)">内存管理（第4-5章）</text>

          <rect x="420" y="230" width="160" height="40" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="500" y="254" textAnchor="middle" fontSize="10" fill="var(--danger)">文件与 I/O（第6-7章）</text>

          <rect x="590" y="230" width="110" height="40" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.8" />
          <text x="645" y="254" textAnchor="middle" fontSize="10" fill="var(--success)">死锁安全（第8-9章）</text>

          {/* 底部：机制耦合 */}
          <rect x="40" y="290" width="660" height="160" rx="10" fill="var(--text-primary)" fillOpacity="0.03" stroke="var(--border)" strokeWidth="1" />
          <text x="60" y="312" fontSize="13" fontWeight="600" fill="var(--text-primary)">机制耦合：每个机制的边界是另一个机制的入口</text>

          <text x="60" y="334" fontSize="10" fill="var(--accent)">mmap：虚拟内存 × 文件系统 — 访问映射区缺页从文件读入</text>
          <text x="60" y="354" fontSize="10" fill="var(--warning)">优先级反转：调度 × 锁 — H 等 L 的锁，M 抢占 L，优先级继承解</text>
          <text x="60" y="374" fontSize="10" fill="var(--danger)">按需调页 × 保护 — 缺页时检查权限位，越权触发保护异常</text>
          <text x="60" y="394" fontSize="10" fill="var(--success)">线程模型 × I/O — 用户级线程阻塞 I/O 全进程阻塞（致命短板）</text>

          <text x="60" y="424" fontSize="11" fontWeight="600" fill="var(--text-primary)">资源管理闭环</text>
          <text x="60" y="442" fontSize="10" fill="var(--text-tertiary)">创建分配 → 运行调度/翻译/读写 → 并发防死锁/查权限 → exit 回收，九机制全部参与</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        一个程序从 fork 到 exit 的九大机制接力时间线与机制耦合关系
      </figcaption>
    </figure>
  );
}
