/**
 * <WkpIrpIoManagerDiagram>：IRP与I/O管理器——IRP生命周期图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function WkpIrpIoManagerDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="IRP与I/O管理器IRP生命周期图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            IRP 生命周期——从创建到完成的全流程
          </text>

          {/* IRP 结构示意 */}
          <rect x="40" y="48" width="660" height="68" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="370" y="70" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">IRP 结构体（I/O Request Packet）</text>
          <rect x="60" y="80" width="140" height="28" rx="4" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="130" y="98" textAnchor="middle" fontSize="10" fill="var(--warning)">IRP 头部（Irp-&gt;IoStatus）</text>
          <rect x="210" y="80" width="140" height="28" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="280" y="98" textAnchor="middle" fontSize="10" fill="var(--success)">I/O 栈位置 #0</text>
          <rect x="360" y="80" width="140" height="28" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="430" y="98" textAnchor="middle" fontSize="10" fill="var(--success)">I/O 栈位置 #1</text>
          <rect x="510" y="80" width="140" height="28" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="580" y="98" textAnchor="middle" fontSize="10" fill="var(--success)">I/O 栈位置 #2</text>
          <text x="370" y="112" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">每层设备栈对应一个栈位置（IoGetCurrentIrpStackLocation）</text>

          {/* 四阶段流程 */}
          <text x="120" y="144" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--warning)">① 创建</text>
          <text x="330" y="144" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--accent)">② 派发</text>
          <text x="540" y="144" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--danger)">③ 处理</text>
          <text x="670" y="144" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--success)">④ 完成</text>

          {/* 阶段1：创建 */}
          <rect x="30" y="158" width="170" height="110" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="115" y="180" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">I/O 管理器创建 IRP</text>
          <text x="115" y="198" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">IoCreateDevice → 分配</text>
          <text x="115" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">填充 MajorFunction</text>
          <text x="115" y="230" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">设置 I/O 栈位置</text>
          <text x="115" y="246" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">关联用户缓冲区</text>
          <text x="115" y="262" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">IRP_MJ_READ / WRITE</text>

          {/* 箭头 */}
          <text x="215" y="216" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&rarr;</text>

          {/* 阶段2：派发 */}
          <rect x="235" y="158" width="170" height="110" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="320" y="180" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">派发到驱动</text>
          <text x="320" y="198" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">IoCallDriver(pDevObj, Irp)</text>
          <text x="320" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">查找 DispatchXxx</text>
          <text x="320" y="230" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">切换到栈位置</text>
          <text x="320" y="246" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">驱动接收控制权</text>
          <text x="320" y="262" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">DriverObject-&gt;MajorFunction[ MJ ]</text>

          {/* 箭头 */}
          <text x="420" y="216" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&rarr;</text>

          {/* 阶段3：处理 */}
          <rect x="445" y="158" width="170" height="110" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="530" y="180" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">驱动处理</text>
          <text x="530" y="198" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">同步 / 异步处理</text>
          <text x="530" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">可向下传递（IoCallDriver）</text>
          <text x="530" y="230" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">可挂起（IoMarkIrpPending）</text>
          <text x="530" y="246" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">可取消（IoSetCancelRoutine）</text>
          <text x="530" y="262" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">返回 STATUS_PENDING</text>

          {/* 箭头 */}
          <text x="630" y="216" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&rarr;</text>

          {/* 阶段4：完成 */}
          <rect x="640" y="158" width="80" height="110" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="680" y="180" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">完成</text>
          <text x="680" y="198" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">IoCompleteRequest</text>
          <text x="680" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">设置 IoStatus</text>
          <text x="680" y="230" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">触发完成例程</text>
          <text x="680" y="246" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">向上逐层返回</text>
          <text x="680" y="262" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">IO_NO_INCREMENT</text>

          {/* 完成例程向上回调 */}
          <rect x="40" y="292" width="660" height="50" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="312" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">完成回调（自底向上）</text>
          <text x="370" y="330" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">IoSetCompletionRoutine 注册 → IRP 完成后沿栈向上逐层调用 → I/O 管理器释放 IRP → 唤醒等待的用户线程</text>

          {/* 取消机制 */}
          <rect x="40" y="356" width="660" height="46" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="370" y="376" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">取消机制</text>
          <text x="370" y="394" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">用户 CancelIo / 超时 → IoCancelIrp → CancelRoutine → IRP 标记为已取消 → 驱动需检查并完成</text>

          <text x="370" y="432" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：IRP 是内核 I/O 的统一货币——创建、派发、处理、完成四阶段贯穿所有设备操作
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        IRP生命周期——I/O管理器创建IRP、沿设备栈派发、驱动处理、IoCompleteRequest完成并向上回调
      </figcaption>
    </figure>
  );
}
