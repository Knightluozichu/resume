/**
 * <AdaeIpcBinderDiagram>：IPC机制与Binder核心原理图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 540;

export function AdaeIpcBinderDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="IPC机制与Binder核心原理图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            IPC机制与Binder原理
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            一次跨进程调用：客户端代理 → Binder驱动 → 服务端Stub
          </text>

          {/* 左面板：Binder 一次调用流程 */}
          <rect x="30" y="62" width="430" height="450" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="245" y="86" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--accent)">Binder 一次 transact 调用</text>

          {/* 客户端列 */}
          <rect x="50" y="100" width="120" height="380" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.1" />
          <text x="110" y="122" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">客户端进程</text>
          <text x="60" y="148" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">proxy.add(1,2)</text>
          <text x="60" y="170" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">Parcel 打包参数</text>
          <text x="60" y="192" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">transact(code,</text>
          <text x="60" y="210" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  data, reply)</text>
          <text x="110" y="252" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">等待返回</text>
          <text x="60" y="300" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">reply.readInt()</text>
          <text x="60" y="322" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">拿到结果 3</text>

          {/* Binder驱动列 */}
          <rect x="185" y="100" width="120" height="380" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.1" />
          <text x="245" y="122" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Binder 驱动</text>
          <text x="245" y="148" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">/dev/binder</text>
          <text x="245" y="178" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">&darr; 数据拷贝一次</text>
          <text x="245" y="208" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">内核态映射</text>
          <text x="245" y="244" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">&darr; 唤醒服务端线程</text>
          <text x="245" y="290" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">&uarr; 回传结果</text>
          <text x="245" y="330" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">唤醒客户端线程</text>

          {/* 服务端列 */}
          <rect x="320" y="100" width="120" height="380" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.1" />
          <text x="380" y="122" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">服务端进程</text>
          <text x="330" y="148" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">Stub.onTransact</text>
          <text x="330" y="170" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">解包 data</text>
          <text x="330" y="192" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">匹配 code</text>
          <text x="330" y="220" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">执行 add(1,2)</text>
          <text x="330" y="252" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">reply.writeInt(3)</text>

          {/* 右面板：IPC 方式对比 */}
          <rect x="480" y="62" width="230" height="450" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="595" y="86" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--accent)">IPC 方式选型</text>

          <rect x="495" y="100" width="200" height="62" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.1" />
          <text x="595" y="120" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">Binder/AIDL</text>
          <text x="505" y="140" fontSize="11" fill="var(--text-secondary)">面向对象，C/S，最常用</text>
          <text x="505" y="156" fontSize="11" fill="var(--text-secondary)">1次拷贝，性能最优</text>

          <rect x="495" y="172" width="200" height="62" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.1" />
          <text x="595" y="192" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">Messenger</text>
          <text x="505" y="212" fontSize="11" fill="var(--text-secondary)">基于Binder+Handler</text>
          <text x="505" y="228" fontSize="11" fill="var(--text-secondary)">串行处理，线程安全</text>

          <rect x="495" y="244" width="200" height="62" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.1" />
          <text x="595" y="264" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">ContentProvider</text>
          <text x="505" y="284" fontSize="11" fill="var(--text-secondary)">数据源跨进程共享</text>
          <text x="505" y="300" fontSize="11" fill="var(--text-secondary)">CRUD，系统级</text>

          <rect x="495" y="316" width="200" height="62" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.1" />
          <text x="595" y="336" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">Socket</text>
          <text x="505" y="356" fontSize="11" fill="var(--text-secondary)">网络/本地全双工</text>
          <text x="505" y="372" fontSize="11" fill="var(--text-secondary)">适合大量数据/跨设备</text>

          <rect x="495" y="388" width="200" height="62" rx="8" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1.1" strokeOpacity="0.4" />
          <text x="595" y="408" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">文件/SharedPreferences</text>
          <text x="505" y="428" fontSize="11" fill="var(--text-secondary)">并发无保障，需谨慎</text>
          <text x="505" y="444" fontSize="11" fill="var(--text-secondary)">简单配置可选用</text>

          <text x="595" y="478" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">Parcelable 比 Serializable 高效</text>
          <text x="595" y="496" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">Binder连接池复用 Service</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Android IPC核心——Binder一次拷贝原理、AIDL/Messenger/ContentProvider/Socket选型对比
      </figcaption>
    </figure>
  );
}
