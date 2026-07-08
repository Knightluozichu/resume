/**
 * <WkpWdmWdfDiagram>：WDM与WDF对比——驱动框架选型图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function WkpWdmWdfDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="WDM与WDF对比驱动框架选型图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            WDM vs WDF——驱动框架选型对比
          </text>

          {/* WDM 列 */}
          <rect x="40" y="50" width="320" height="350" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.4" />
          <text x="200" y="76" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--danger)">WDM（Windows Driver Model）</text>
          <text x="200" y="94" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">面向过程，手动管理一切</text>
          <line x1="60" y1="104" x2="340" y2="104" stroke="var(--danger)" strokeWidth="0.8" strokeOpacity="0.3" />

          <text x="60" y="124" fontSize="10" fill="var(--text-secondary)" fontWeight="600">特征：</text>
          <text x="60" y="140" fontSize="10" fill="var(--text-secondary)">- 直接操作 IRP 与设备对象</text>
          <text x="60" y="156" fontSize="10" fill="var(--text-secondary)">- 手动处理 PnP / 电源 IRP</text>
          <text x="60" y="172" fontSize="10" fill="var(--text-secondary)">- 手动注册所有派遣函数</text>
          <text x="60" y="188" fontSize="10" fill="var(--text-secondary)">- 无框架状态机，全凭驱动维护</text>

          <text x="60" y="212" fontSize="10" fill="var(--text-secondary)" fontWeight="600">入口：</text>
          <text x="60" y="228" fontSize="9" fill="var(--text-tertiary)">DriverEntry → IoCreateDevice → </text>
          <text x="60" y="242" fontSize="9" fill="var(--text-tertiary)">IoCreateSymbolicLink → 注册回调</text>

          <text x="60" y="264" fontSize="10" fill="var(--danger)" fontWeight="600">缺点：</text>
          <text x="60" y="280" fontSize="10" fill="var(--text-secondary)">- 代码量大（PnP/电源占 60%）</text>
          <text x="60" y="296" fontSize="10" fill="var(--text-secondary)">- 容易出错（竞态/泄漏/蓝屏）</text>
          <text x="60" y="312" fontSize="10" fill="var(--text-secondary)">- 跨版本兼容性需自行处理</text>

          <text x="60" y="338" fontSize="10" fill="var(--success)" fontWeight="600">优点：</text>
          <text x="60" y="354" fontSize="10" fill="var(--text-secondary)">- 最大灵活性与控制力</text>
          <text x="60" y="370" fontSize="10" fill="var(--text-secondary)">- 适合底层/特殊硬件驱动</text>
          <text x="60" y="386" fontSize="10" fill="var(--text-secondary)">- 资料丰富，MSDN 文档完备</text>

          {/* WDF 列 */}
          <rect x="380" y="50" width="320" height="350" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.4" />
          <text x="540" y="76" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--success)">WDF（Windows Driver Framework）</text>
          <text x="540" y="94" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">面向对象，框架代管状态机</text>
          <line x1="400" y1="104" x2="680" y2="104" stroke="var(--success)" strokeWidth="0.8" strokeOpacity="0.3" />

          <text x="400" y="124" fontSize="10" fill="var(--text-secondary)" fontWeight="600">特征：</text>
          <text x="400" y="140" fontSize="10" fill="var(--text-secondary)">- 对象模型（WDFDRIVER/WDFDEVICE）</text>
          <text x="400" y="156" fontSize="10" fill="var(--text-secondary)">- 框架自动处理 PnP/电源状态机</text>
          <text x="400" y="172" fontSize="10" fill="var(--text-secondary)">- 事件回调取代 IRP 派遣</text>
          <text x="400" y="188" fontSize="10" fill="var(--text-secondary)">- 自动引用计数与资源清理</text>

          <text x="400" y="212" fontSize="10" fill="var(--text-secondary)" fontWeight="600">入口：</text>
          <text x="400" y="228" fontSize="9" fill="var(--text-tertiary)">WdfDriverCreate → WdfDeviceCreate →</text>
          <text x="400" y="242" fontSize="9" fill="var(--text-tertiary)">注册 EvtDevicePrepareHardware 等</text>

          <text x="400" y="264" fontSize="10" fill="var(--success)" fontWeight="600">优点：</text>
          <text x="400" y="280" fontSize="10" fill="var(--text-secondary)">- 代码量减少 50%+</text>
          <text x="400" y="296" fontSize="10" fill="var(--text-secondary)">- 框架处理 PnP/电源/并发</text>
          <text x="400" y="312" fontSize="10" fill="var(--text-secondary)">- 内建验证器（WDF Verifier）</text>

          <text x="400" y="338" fontSize="10" fill="var(--danger)" fontWeight="600">代价：</text>
          <text x="400" y="354" fontSize="10" fill="var(--text-secondary)">- 灵活性受限（框架抽象）</text>
          <text x="400" y="370" fontSize="10" fill="var(--text-secondary)">- 学习曲线（对象/回调模型）</text>
          <text x="400" y="386" fontSize="10" fill="var(--text-secondary)">- 分 KMDF（内核）和 UMDF（用户）</text>

          {/* 底部对比总结 */}
          <rect x="40" y="414" width="660" height="36" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="370" y="436" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            选型：新驱动首选 WDF（KMDF/UMDF）；需精细控制或遗留兼容选 WDM
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        WDM vs WDF对比——WDM面向过程手动管理PnP/电源，WDF面向对象框架代管状态机，新驱动首选WDF
      </figcaption>
    </figure>
  );
}
