/**
 * <WkpInterruptDpcDiagram>：中断与DPC——ISR与DPC分层处理图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function WkpInterruptDpcDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="中断与DPC的ISR与DPC分层处理图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            中断与 DPC——两层中断处理的分层模型
          </text>

          {/* IRQL 时间轴 */}
          <rect x="40" y="46" width="660" height="36" rx="6" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="60" y="68" fontSize="10" fill="var(--text-tertiary)">IRQL:</text>
          <text x="120" y="68" fontSize="10" fill="var(--danger)" fontWeight="600">DIRQL（设备中断）</text>
          <text x="290" y="68" fontSize="10" fill="var(--warning)">DISPATCH_LEVEL（DPC）</text>
          <text x="470" y="68" fontSize="10" fill="var(--success)">PASSIVE_LEVEL（普通线程）</text>

          {/* 硬件中断触发 */}
          <rect x="40" y="96" width="660" height="40" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="370" y="120" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">硬件设备产生中断 → CPU 提升至 DIRQL → 内核查找 ISR 向量</text>

          {/* ISR */}
          <rect x="40" y="150" width="320" height="120" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="200" y="174" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">ISR（中断服务例程）</text>
          <text x="200" y="192" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">运行于 DIRQL，最高优先级</text>
          <line x1="60" y1="200" x2="340" y2="200" stroke="var(--warning)" strokeWidth="0.6" strokeOpacity="0.3" />
          <text x="60" y="216" fontSize="10" fill="var(--text-secondary)">- 读取/清除中断状态寄存器</text>
          <text x="60" y="230" fontSize="10" fill="var(--text-secondary)">- 禁止设备再次中断</text>
          <text x="60" y="244" fontSize="10" fill="var(--text-secondary)">- 收集数据到设备扩展</text>
          <text x="60" y="258" fontSize="10" fill="var(--text-secondary)">- IoRequestDpc 排队 DPC</text>
          <text x="60" y="266" fontSize="9" fill="var(--text-tertiary)">极短！不可分页、不可等待</text>

          {/* 箭头：ISR 到 DPC */}
          <text x="380" y="210" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>
          <text x="380" y="226" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">IoRequestDpc</text>

          {/* DPC */}
          <rect x="400" y="150" width="300" height="120" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.4" />
          <text x="550" y="174" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">DPC（延迟过程调用）</text>
          <text x="550" y="192" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">运行于 DISPATCH_LEVEL</text>
          <line x1="420" y1="200" x2="680" y2="200" stroke="var(--success)" strokeWidth="0.6" strokeOpacity="0.3" />
          <text x="420" y="216" fontSize="10" fill="var(--text-secondary)">- 完成大部分中断处理工作</text>
          <text x="420" y="230" fontSize="10" fill="var(--text-secondary)">- 访问设备扩展、处理数据</text>
          <text x="420" y="244" fontSize="10" fill="var(--text-secondary)">- 完成 IRP（IoCompleteRequest）</text>
          <text x="420" y="258" fontSize="10" fill="var(--text-secondary)">- 重新启用设备中断</text>
          <text x="420" y="266" fontSize="9" fill="var(--text-tertiary)">不可分页，但可被更高 IRQL 抢占</text>

          {/* DPC 调度机制 */}
          <rect x="40" y="286" width="660" height="56" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="370" y="308" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">DPC 调度机制</text>
          <text x="370" y="326" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">IoRequestDpc → DPC 入队 → IRQL 从 DIRQL 降至 DISPATCH_LEVEL 时 → 内核自动取出 DPC 执行</text>

          {/* 约束对比 */}
          <rect x="40" y="356" width="320" height="60" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="200" y="376" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">ISR 约束</text>
          <text x="200" y="392" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">不可获取自旋锁（不同 IRQL）</text>
          <text x="200" y="406" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">不可分配分页池 / 不可等待</text>

          <rect x="380" y="356" width="320" height="60" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="540" y="376" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">DPC 约束</text>
          <text x="540" y="392" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">可获取自旋锁（ DISPATCH_LEVEL ）</text>
          <text x="540" y="406" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">不可分配分页池 / 不可等待</text>

          <text x="370" y="440" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：ISR 极短只「灭火」，DPC 做「善后」——两层分离保证高吞吐与低中断延迟
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        中断与DPC——硬件中断触发ISR（DIRQL）快速处理、IoRequestDpc排队DPC在DISPATCH_LEVEL完成善后，两层分离保证低延迟
      </figcaption>
    </figure>
  );
}
