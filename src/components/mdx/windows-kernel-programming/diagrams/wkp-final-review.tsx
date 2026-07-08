/**
 * <WkpFinalReviewDiagram>：全书总复习——一个驱动从加载到卸载的全链路图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function WkpFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="全书总复习一个驱动从加载到卸载的全链路图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            一个驱动从加载到卸载——全书知识点串联
          </text>

          {/* 阶段1：加载 */}
          <rect x="40" y="50" width="660" height="42" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="70" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">① 驱动加载（第2章）</text>
          <text x="370" y="86" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">SCM 加载 .sys → DriverEntry → WdfDriverCreate / IoCreateDriver → 注册回调</text>

          <text x="370" y="108" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 阶段2：设备枚举 */}
          <rect x="40" y="116" width="660" height="42" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="136" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">② 设备枚举与 AddDevice（第2/8章）</text>
          <text x="370" y="152" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">PnP 管理器枚举 → AddDevice → 创建设备对象 → 加入设备栈 → IRP_MN_START_DEVICE</text>

          <text x="370" y="174" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 阶段3：I/O 请求 */}
          <rect x="40" y="182" width="660" height="42" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="370" y="202" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">③ I/O 请求处理（第3章）</text>
          <text x="370" y="218" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">用户 ReadFile → I/O 管理器创建 IRP → IoCallDriver 派发 → DispatchRead 处理 → IoCompleteRequest</text>

          <text x="370" y="240" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 阶段4：内存分配 */}
          <rect x="40" y="248" width="320" height="42" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="200" y="268" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">④ 内存分配（第4章）</text>
          <text x="200" y="284" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">ExAllocatePool2 分配池内存</text>

          {/* 阶段5：MDL 直接 I/O */}
          <rect x="380" y="248" width="320" height="42" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="540" y="268" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">⑤ MDL 直接 I/O（第5章）</text>
          <text x="540" y="284" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">MmGetSystemAddressForMdlSafe 零拷贝</text>

          <text x="370" y="306" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 阶段6：中断处理 */}
          <rect x="40" y="314" width="320" height="42" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="200" y="334" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">⑥ 中断处理（第6章）</text>
          <text x="200" y="350" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">硬件中断 → ISR(DIRQL) → DPC(DISPATCH_LEVEL)</text>

          {/* 阶段7：同步保护 */}
          <rect x="380" y="314" width="320" height="42" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="540" y="334" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">⑦ 同步保护（第7章）</text>
          <text x="540" y="350" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">KeAcquireSpinLock 保护共享数据</text>

          <text x="370" y="372" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          {/* 阶段8：电源与卸载 */}
          <rect x="40" y="380" width="320" height="42" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="200" y="400" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">⑧ 电源管理（第8章）</text>
          <text x="200" y="416" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">IRP_MN_SET_POWER → D0/D3 状态转换</text>

          <rect x="380" y="380" width="320" height="42" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="540" y="400" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">⑨ 卸载（第9-10章）</text>
          <text x="540" y="416" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">IRP_MN_REMOVE_DEVICE → DriverUnload → 释放全部资源</text>

          <text x="370" y="448" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：一个驱动从加载到卸载，九大机制全部参与——全书知识在一条生命周期线上贯通
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书总复习——一个驱动从加载、设备枚举、I/O请求、内存分配、MDL直接I/O、中断处理、同步保护、电源管理到卸载的全链路
      </figcaption>
    </figure>
  );
}
