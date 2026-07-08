/**
 * <MosThreadModelDiagram>：三种线程映射模型（多对一/一对一/多对多）图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function MosThreadModelDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="三种线程映射模型图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            三种线程映射模型：用户线程与内核线程的对应关系
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            上排 = 用户级线程，下排 = 内核线程，箭头表示映射
          </text>

          {/* 列标题 */}
          <text x="130" y="78" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">多对一（M:1）</text>
          <text x="370" y="78" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">一对一（1:1）</text>
          <text x="610" y="78" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">多对多（M:N）</text>

          {/* 多对一：4 个用户线程 → 1 个内核线程 */}
          {[0, 1, 2, 3].map((i) => (
            <circle key={`m1-u-${i}`} cx={70 + i * 40} cy="115" r="11" fill="var(--warning)" fillOpacity="0.25" stroke="var(--warning)" strokeWidth="1.2" />
          ))}
          <circle cx="130" cy="200" r="16" fill="var(--danger)" fillOpacity="0.25" stroke="var(--danger)" strokeWidth="1.4" />
          <text x="130" y="205" textAnchor="middle" fontSize="9" fill="var(--danger)">K</text>
          <text x="130" y="235" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">1 个内核线程</text>
          {[0, 1, 2, 3].map((i) => (
            <line key={`m1-l-${i}`} x1={70 + i * 40} y1="126" x2="130" y2="184" stroke="var(--text-tertiary)" strokeWidth="0.8" strokeOpacity="0.5" />
          ))}
          <text x="130" y="262" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">阻塞全进程</text>
          <text x="130" y="278" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">无法多核并行</text>

          {/* 一对一：3 个用户线程 → 3 个内核线程 */}
          {[0, 1, 2].map((i) => (
            <g key={`1-1-${i}`}>
              <circle cx={310 + i * 60} cy="115" r="11" fill="var(--accent)" fillOpacity="0.25" stroke="var(--accent)" strokeWidth="1.2" />
              <line x1={310 + i * 60} y1="126" x2={310 + i * 60} y2="184" stroke="var(--text-tertiary)" strokeWidth="0.8" strokeOpacity="0.5" />
              <circle cx={310 + i * 60} cy="200" r="16" fill="var(--danger)" fillOpacity="0.25" stroke="var(--danger)" strokeWidth="1.4" />
              <text x={310 + i * 60} y="205" textAnchor="middle" fontSize="9" fill="var(--danger)">K</text>
            </g>
          ))}
          <text x="370" y="235" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">3 个内核线程</text>
          <text x="370" y="262" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">阻塞不影响其他</text>
          <text x="370" y="278" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能多核并行</text>

          {/* 多对多：5 个用户线程 → 2 个内核线程 */}
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={`mn-u-${i}`} cx={530 + i * 32} cy="115" r="10" fill="var(--success)" fillOpacity="0.25" stroke="var(--success)" strokeWidth="1.2" />
          ))}
          <circle cx="570" cy="200" r="16" fill="var(--danger)" fillOpacity="0.25" stroke="var(--danger)" strokeWidth="1.4" />
          <text x="570" y="205" textAnchor="middle" fontSize="9" fill="var(--danger)">K</text>
          <circle cx="650" cy="200" r="16" fill="var(--danger)" fillOpacity="0.25" stroke="var(--danger)" strokeWidth="1.4" />
          <text x="650" y="205" textAnchor="middle" fontSize="9" fill="var(--danger)">K</text>
          <text x="610" y="235" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">2 个内核线程</text>
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={`mn-l-${i}`} x1={530 + i * 32} y1="125" x2={i < 3 ? 570 : 650} y2="184" stroke="var(--text-tertiary)" strokeWidth="0.8" strokeOpacity="0.5" />
          ))}
          <text x="610" y="262" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">兼顾快速切换+并行</text>
          <text x="610" y="278" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">实现复杂（Go 调度器）</text>

          {/* 底部：进程 vs 线程对比 */}
          <rect x="40" y="310" width="660" height="130" rx="10" fill="var(--text-primary)" fillOpacity="0.03" stroke="var(--border)" strokeWidth="1" />
          <text x="60" y="334" fontSize="13" fontWeight="600" fill="var(--text-primary)">进程 vs 线程：共享什么、隔离什么</text>

          <text x="60" y="358" fontSize="11" fill="var(--warning)">进程隔离：各自地址空间、页表、文件表 → 崩溃不影响其他，通信靠 IPC（开销大）</text>
          <text x="60" y="378" fontSize="11" fill="var(--success)">线程共享：代码段、数据段、堆、文件描述符表 → 通信读写共享变量（快但要加锁）</text>
          <text x="60" y="398" fontSize="11" fill="var(--accent)">线程独占：栈、寄存器（PC/SP）、线程局部存储（TLS）</text>
          <text x="60" y="420" fontSize="11" fill="var(--text-tertiary)">切换便宜的本质：共享页表 → 不换基址 → 不全刷 TLB；创建便宜的本质：不复制页表</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        多对一/一对一/多对多三种线程映射模型，以及进程与线程的共享与隔离对比
      </figcaption>
    </figure>
  );
}
