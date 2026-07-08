/**
 * <WkpPnpPowerDiagram>：即插即用与电源管理——PnP/Power IRP流图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function WkpPnpPowerDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="即插即用与电源管理PnP Power IRP流图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            即插即用与电源管理——设备状态与 IRP 流
          </text>

          {/* PnP 设备状态机 */}
          <text x="185" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">PnP 设备状态机</text>
          <rect x="40" y="68" width="290" height="340" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="65" y="84" width="240" height="36" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="185" y="106" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">Added（已添加）</text>

          <text x="185" y="132" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr; IRP_MN_START_DEVICE</text>

          <rect x="65" y="142" width="240" height="36" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="185" y="164" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">Started（已启动）</text>

          <text x="185" y="188" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">&darr; IRP_MN_QUERY_STOP  &uarr; IRP_MN_CANCEL_STOP</text>

          <rect x="65" y="198" width="240" height="36" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="185" y="220" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">Stop Pending（停止挂起）</text>

          <text x="185" y="244" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">&darr; IRP_MN_STOP_DEVICE</text>

          <rect x="65" y="254" width="240" height="36" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="185" y="276" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">Stopped（已停止）</text>

          <text x="185" y="300" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">&darr; IRP_MN_QUERY_REMOVE  &uarr; IRP_MN_CANCEL_REMOVE</text>

          <rect x="65" y="310" width="240" height="36" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="185" y="332" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">Remove Pending（移除挂起）</text>

          <text x="185" y="356" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">&darr; IRP_MN_REMOVE_DEVICE</text>

          <rect x="65" y="366" width="240" height="36" rx="6" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="185" y="388" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">Removed（已移除）</text>

          {/* 电源状态 */}
          <text x="555" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--warning)">电源状态转换</text>
          <rect x="410" y="68" width="290" height="340" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />

          <text x="555" y="92" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-secondary)">设备电源状态（DeviceState）</text>
          <rect x="435" y="102" width="240" height="30" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="555" y="122" textAnchor="middle" fontSize="10" fill="var(--success)">D0（全工作）</text>
          <text x="555" y="146" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">&darr; IRP_MN_SET_POWER (D1/D2/D3)</text>
          <rect x="435" y="156" width="240" height="30" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="555" y="176" textAnchor="middle" fontSize="10" fill="var(--warning)">D1/D2（低功耗）</text>
          <text x="555" y="200" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">&darr;</text>
          <rect x="435" y="210" width="240" height="30" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="555" y="230" textAnchor="middle" fontSize="10" fill="var(--danger)">D3（关闭）</text>

          <text x="555" y="262" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-secondary)">系统电源状态（SystemState）</text>
          <rect x="435" y="272" width="240" height="24" rx="4" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="0.8" />
          <text x="555" y="288" textAnchor="middle" fontSize="9" fill="var(--success)">S0（工作） → S1/S2/S3（睡眠）</text>
          <rect x="435" y="300" width="240" height="24" rx="4" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="555" y="316" textAnchor="middle" fontSize="9" fill="var(--danger)">S4（休眠） → S5（关机）</text>

          <rect x="435" y="332" width="240" height="50" rx="6" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="555" y="350" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">电源 IRP 处理</text>
          <text x="555" y="366" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">IRP_MN_QUERY_POWER / SET_POWER</text>
          <text x="555" y="378" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">PoCallDriver / PoStartNextPowerIrp</text>

          <text x="555" y="402" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">系统状态映射到设备状态</text>

          {/* 底部总结 */}
          <text x="370" y="432" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：PnP 管设备「在不在」，电源管理管设备「醒不醒」——两者通过 IRP 在设备栈中传递
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        即插即用与电源管理——PnP设备状态机（Added/Started/Stopped/Removed）与电源状态转换（D0-D3/S0-S5）通过IRP在设备栈传递
      </figcaption>
    </figure>
  );
}
