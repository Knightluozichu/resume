/**
 * <WkpDriverFundamentalsDiagram>：驱动基础——WDM/WDF框架与设备栈图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function WkpDriverFundamentalsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="驱动基础WDM WDF框架与设备栈图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            驱动基础——从用户态到硬件的完整设备栈
          </text>

          {/* 用户态层 */}
          <rect x="60" y="50" width="620" height="60" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="74" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">用户态（Ring 3）</text>
          <text x="370" y="92" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">应用程序 → CreateFile / ReadFile / DeviceIoControl → Win32 API</text>
          <text x="370" y="104" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">用户态通过系统调用陷入内核，I/O管理器接手</text>

          <text x="370" y="128" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr; 系统调用 / NtReadFile / NtDeviceIoControlFile</text>

          {/* I/O管理器 */}
          <rect x="60" y="140" width="620" height="60" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="164" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">I/O 管理器（内核态）</text>
          <text x="370" y="182" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">构建 IRP → 沿设备栈向下派发 → 收集完成状态 → 返回用户态</text>
          <text x="370" y="194" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">IoCreateDevice / IoCallDriver / IoCompleteRequest</text>

          <text x="370" y="218" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr; IoCallDriver 沿设备栈传递 IRP</text>

          {/* 设备栈：三层驱动 */}
          <rect x="60" y="230" width="190" height="100" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="155" y="252" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">过滤驱动（上层）</text>
          <text x="155" y="270" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Upper Filter</text>
          <text x="155" y="288" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">拦截/监控 I/O 请求</text>
          <text x="155" y="306" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">可选层，不影响功能</text>
          <text x="155" y="320" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">IoSkipCurrentIrpStackLocation</text>

          <rect x="275" y="230" width="190" height="100" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="252" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">功能驱动（FDO）</text>
          <text x="370" y="270" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Functional Device Object</text>
          <text x="370" y="288" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">设备的核心逻辑</text>
          <text x="370" y="306" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">DriverEntry / AddDevice</text>
          <text x="370" y="320" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">DispatchRead / DispatchWrite / DispatchDeviceControl</text>

          <rect x="490" y="230" width="190" height="100" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="585" y="252" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">过滤驱动（下层）</text>
          <text x="585" y="270" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Lower Filter</text>
          <text x="585" y="288" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">修改/过滤底层请求</text>
          <text x="585" y="306" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">可选层</text>

          {/* 总线驱动 */}
          <text x="370" y="350" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>
          <rect x="180" y="362" width="380" height="60" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="370" y="386" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">总线驱动（PDO）— Physical Device Object</text>
          <text x="370" y="404" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">枚举设备 / 管理硬件资源 / 与硬件直接通信</text>
          <text x="370" y="416" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">由微软提供（如 PCI / USB 总线驱动）</text>

          {/* 右侧标注：IRQL */}
          <text x="370" y="448" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：设备栈自顶向下传递 IRP，各层各司其职——过滤/功能/总线三层协作
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        驱动基础——WDM/WDF设备栈：用户态应用通过I/O管理器将IRP沿设备栈传递，经过滤驱动、功能驱动、总线驱动最终抵达硬件
      </figcaption>
    </figure>
  );
}
