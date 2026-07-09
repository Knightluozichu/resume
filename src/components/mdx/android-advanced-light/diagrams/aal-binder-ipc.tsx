/**
 * <AalBinderIpcDiagram>：Binder IPC通信原理图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function AalBinderIpcDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Binder IPC通信原理图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Binder IPC 通信架构
          </text>

          {/* Client 进程 */}
          <rect x="30" y="55" width="180" height="200" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <rect x="30" y="55" width="180" height="34" rx="10" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="120" y="77" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">Client 进程</text>
          <rect x="50" y="100" width="140" height="40" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="120" y="125" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">业务代码</text>
          <rect x="50" y="150" width="140" height="40" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="120" y="168" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">Proxy（代理类）</text>
          <text x="120" y="182" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">实现 IInterface</text>
          <text x="120" y="210" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">调用 transact()</text>
          <text x="120" y="226" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">封装 Parcel 参数</text>
          <text x="120" y="244" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">触发 ioctl 系统调用</text>

          {/* ServiceManager 进程 */}
          <rect x="280" y="55" width="180" height="200" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <rect x="280" y="55" width="180" height="34" rx="10" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="77" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">ServiceManager</text>
          <rect x="300" y="100" width="140" height="60" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="370" y="122" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">服务注册表</text>
          <text x="370" y="140" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">name → Binder引用</text>
          <text x="370" y="156" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">（Context Manager）</text>
          <text x="370" y="190" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">addService() 注册</text>
          <text x="370" y="208" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">getService() 查询</text>
          <text x="370" y="226" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">返回 Binder 代理引用</text>
          <text x="370" y="244" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">进程0号，最先启动</text>

          {/* Server 进程 */}
          <rect x="530" y="55" width="180" height="200" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <rect x="530" y="55" width="180" height="34" rx="10" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="620" y="77" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--danger)">Server 进程</text>
          <rect x="550" y="100" width="140" height="40" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="620" y="125" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">业务实现</text>
          <rect x="550" y="150" width="140" height="40" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="620" y="168" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">Stub（存根类）</text>
          <text x="620" y="182" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">onTransact() 分发</text>
          <text x="620" y="210" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">解析 Parcel 参数</text>
          <text x="620" y="226" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">调用真实业务方法</text>
          <text x="620" y="244" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">返回结果写入 reply</text>

          {/* Binder 驱动 */}
          <rect x="30" y="290" width="680" height="80" rx="10" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="370" y="316" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Binder 驱动（内核空间 /dev/binder）</text>
          <text x="370" y="338" textAnchor="middle" fontSize="11" fill="var(--text-secondary)"> mmap 映射：用户空间与内核共享内存 → 只需一次数据拷贝</text>
          <text x="370" y="356" textAnchor="middle" fontSize="11" fill="var(--text-secondary)"> 线程池管理 / 引用计数 / 数据路由 / 死亡通知</text>

          {/* 箭头 */}
          <line x1="210" y1="170" x2="280" y2="170" stroke="var(--text-tertiary)" strokeWidth="1.5" markerEnd="url(#aalBinderArrow)" />
          <line x1="460" y1="170" x2="530" y2="170" stroke="var(--text-tertiary)" strokeWidth="1.5" markerEnd="url(#aalBinderArrow)" />
          <text x="245" y="162" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">查询</text>
          <text x="495" y="162" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">调用</text>

          <line x1="120" y1="255" x2="120" y2="290" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#aalBinderArrow)" />
          <line x1="620" y1="255" x2="620" y2="290" stroke="var(--danger)" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#aalBinderArrow)" />

          {/* 关键特性 */}
          <rect x="30" y="395" width="680" height="80" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="50" y="418" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--success)">一次拷贝（mmap）</text>
          <text x="50" y="436" textAnchor="start" fontSize="11" fill="var(--text-secondary)">传统IPC两次拷贝（用户→内核→用户），Binder通过 mmap 共享内存只需一次</text>
          <text x="50" y="458" textAnchor="start" fontSize="11" fill="var(--text-secondary)">发送方 copy_from_user → 内核缓冲区 → 接收方通过 mmap 直接读取</text>
          <text x="390" y="418" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--success)">安全机制</text>
          <text x="390" y="436" textAnchor="start" fontSize="11" fill="var(--text-secondary)">每个Binder实体在内核有 UID/PID</text>
          <text x="390" y="458" textAnchor="start" fontSize="11" fill="var(--text-secondary)">Server 可校验调用方身份</text>

          <defs>
            <marker id="aalBinderArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="var(--text-tertiary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Binder IPC通信架构——Client、ServiceManager、Server三端协作，mmap实现一次拷贝
      </figcaption>
    </figure>
  );
}
