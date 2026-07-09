/**
 * <DakBinderSystemDiagram>：Binder通信体系一次拷贝原理与Proxy-Stub模型图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function DakBinderSystemDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Binder通信体系一次拷贝原理图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Binder IPC——一次拷贝与Proxy-Stub通信模型
          </text>

          {/* 用户空间 / 内核空间 分界线 */}
          <line x1="20" y1="220" x2="720" y2="220" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="6 4" />
          <text x="710" y="214" textAnchor="end" fontSize="10" fill="var(--text-tertiary)">用户空间</text>
          <text x="710" y="234" textAnchor="end" fontSize="10" fill="var(--text-tertiary)">内核空间</text>

          {/* Client 进程（用户空间） */}
          <rect x="40" y="70" width="180" height="120" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="130" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Client 进程</text>
          <rect x="55" y="100" width="150" height="30" rx="4" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="130" y="120" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Proxy（代理对象）</text>
          <text x="130" y="148" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">调用 proxy.method()</text>
          <text x="130" y="164" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">数据打包 Parcel</text>
          <text x="130" y="180" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">ioctl(binder, BC_*)</text>

          {/* Binder 驱动（内核空间） */}
          <rect x="270" y="240" width="200" height="140" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="370" y="262" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">Binder 驱动</text>
          <text x="370" y="284" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">mmap 内存映射</text>
          <rect x="290" y="296" width="160" height="30" rx="4" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="370" y="316" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">一次拷贝（copy_from_user）</text>
          <text x="370" y="348" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">记录 UID/PID（安全）</text>
          <text x="370" y="364" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">线程池调度</text>

          {/* Server 进程（用户空间） */}
          <rect x="520" y="70" width="180" height="120" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="610" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">Server 进程</text>
          <rect x="535" y="100" width="150" height="30" rx="4" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="0.8" />
          <text x="610" y="120" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Stub（桩对象）</text>
          <text x="610" y="148" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">onTransact 收到数据</text>
          <text x="610" y="164" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">解包 Parcel 执行方法</text>
          <text x="610" y="180" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">返回结果</text>

          {/* ServiceManager */}
          <rect x="270" y="70" width="200" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">ServiceManager（handle=0）</text>
          <text x="370" y="110" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">服务注册 / 查询 / 名字 → handle</text>

          {/* 箭头：Client → Binder 驱动 */}
          <line x1="130" y1="190" x2="310" y2="240" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arr-accent)" />
          <text x="190" y="220" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">① 发送请求</text>

          {/* 箭头：Binder 驱动 → Server */}
          <line x1="430" y1="240" x2="610" y2="190" stroke="var(--success)" strokeWidth="1.5" markerEnd="url(#arr-success)" />
          <text x="550" y="220" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">② 投递请求</text>

          {/* 箭头：Server → Binder 驱动（返回） */}
          <line x1="610" y1="190" x2="430" y2="240" stroke="var(--text-secondary)" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#arr-gray)" />
          <text x="550" y="260" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">③ 返回结果</text>

          {/* 箭头：Binder → Client（返回） */}
          <line x1="310" y1="240" x2="130" y2="190" stroke="var(--text-secondary)" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#arr-gray)" />
          <text x="190" y="260" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">④ 唤醒Client</text>

          <defs>
            <marker id="arr-accent" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="var(--accent)" />
            </marker>
            <marker id="arr-success" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="var(--success)" />
            </marker>
            <marker id="arr-gray" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 底部说明 */}
          <text x="370" y="420" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">为什么只需一次拷贝？</text>
          <text x="370" y="442" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">传统 IPC：Client用户空间 → 内核（copy_from_user）→ Server用户空间（copy_to_user）= 两次拷贝</text>
          <text x="370" y="460" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Binder：mmap 让 Server用户空间 与 内核 共享同一块物理内存</text>
          <text x="370" y="478" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">只需 copy_from_user 一次，数据直达 Server 可访问的共享区，省去 copy_to_user</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Binder通信体系——mmap一次拷贝、Proxy-Stub模型、ServiceManager服务注册查询
      </figcaption>
    </figure>
  );
}
