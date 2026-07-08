/**
 * <WkpKernelMemoryDiagram>：内核内存管理——分页池与非分页池图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function WkpKernelMemoryDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="内核内存管理分页池与非分页池图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            内核内存——分页池与非分页池
          </text>

          {/* IRQL 标尺 */}
          <rect x="40" y="48" width="660" height="36" rx="6" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="70" y="70" fontSize="10" fill="var(--text-tertiary)">IRQL:</text>
          <text x="150" y="70" fontSize="10" fill="var(--danger)" fontWeight="600">HIGH_LEVEL</text>
          <text x="280" y="70" fontSize="10" fill="var(--warning)">DIRQL</text>
          <text x="380" y="70" fontSize="10" fill="var(--warning)">DISPATCH_LEVEL</text>
          <text x="520" y="70" fontSize="10" fill="var(--success)">APC_LEVEL</text>
          <text x="620" y="70" fontSize="10" fill="var(--success)">PASSIVE_LEVEL</text>

          {/* 非分页池 */}
          <rect x="40" y="100" width="330" height="220" rx="10" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.4" />
          <text x="205" y="124" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--danger)">非分页池（NonPaged Pool）</text>
          <text x="205" y="142" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">任何 IRQL 均可访问，永不换出</text>
          <line x1="60" y1="152" x2="350" y2="152" stroke="var(--danger)" strokeWidth="0.8" strokeOpacity="0.3" />

          <text x="60" y="172" fontSize="10" fill="var(--text-secondary)" fontWeight="600">分配函数：</text>
          <text x="60" y="188" fontSize="10" fill="var(--text-secondary)">ExAllocatePool2(POOL_FLAG_NON_PAGED, Size, Tag)</text>
          <text x="60" y="204" fontSize="10" fill="var(--text-tertiary)">旧 API: ExAllocatePoolWithTag(NonPagedPool, ...)</text>

          <text x="60" y="226" fontSize="10" fill="var(--text-secondary)" fontWeight="600">适用场景：</text>
          <text x="60" y="242" fontSize="10" fill="var(--text-secondary)">- ISR / DPC 中访问的数据结构</text>
          <text x="60" y="256" fontSize="10" fill="var(--text-secondary)">- 自旋锁保护的全局链表</text>
          <text x="60" y="270" fontSize="10" fill="var(--text-secondary)">- DMA 缓冲区 / 设备扩展(DeviceExtension)</text>
          <text x="60" y="284" fontSize="10" fill="var(--text-secondary)">- IRQL &gt;= DISPATCH_LEVEL 的路径</text>

          <text x="60" y="306" fontSize="10" fill="var(--danger)" fontWeight="600">代价：物理内存被锁定，无法换出</text>

          {/* 分页池 */}
          <rect x="390" y="100" width="330" height="220" rx="10" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.4" />
          <text x="555" y="124" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--success)">分页池（Paged Pool）</text>
          <text x="555" y="142" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">仅 PASSIVE_LEVEL / APC_LEVEL 可访问，可换出</text>
          <line x1="410" y1="152" x2="700" y2="152" stroke="var(--success)" strokeWidth="0.8" strokeOpacity="0.3" />

          <text x="410" y="172" fontSize="10" fill="var(--text-secondary)" fontWeight="600">分配函数：</text>
          <text x="410" y="188" fontSize="10" fill="var(--text-secondary)">ExAllocatePool2(POOL_FLAG_PAGED, Size, Tag)</text>
          <text x="410" y="204" fontSize="10" fill="var(--text-tertiary)">旧 API: ExAllocatePoolWithTag(PagedPool, ...)</text>

          <text x="410" y="226" fontSize="10" fill="var(--text-secondary)" fontWeight="600">适用场景：</text>
          <text x="410" y="242" fontSize="10" fill="var(--text-secondary)">- 仅在 PASSIVE_LEVEL 访问的数据</text>
          <text x="410" y="256" fontSize="10" fill="var(--text-secondary)">- I/O 处理中的临时缓冲区</text>
          <text x="410" y="270" fontSize="10" fill="var(--text-secondary)">- 注册表 / 配置数据缓存</text>
          <text x="410" y="284" fontSize="10" fill="var(--text-secondary)">- 大块、低频访问的内存</text>

          <text x="410" y="306" fontSize="10" fill="var(--success)" fontWeight="600">优势：可换出，减轻物理内存压力</text>

          {/* 释放与标记 */}
          <rect x="40" y="336" width="660" height="50" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="370" y="356" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">分配与释放规范</text>
          <text x="370" y="374" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">ExAllocatePool2 → 使用 → ExFreePoolWithTag / ExFreePool（必须配对，Tag 必须匹配）</text>

          {/* 泄漏与验证 */}
          <rect x="40" y="400" width="660" height="46" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="370" y="420" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">池泄漏与验证</text>
          <text x="370" y="438" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Driver Verifier 开启 Pool Tracking → !pool / !poolused 调试 → 每个分配必须配对释放，否则蓝屏或泄漏</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        内核内存管理——非分页池（任意IRQL可访问、永不换出）与分页池（仅PASSIVE_LEVEL可访问、可换出）的对比与选型
      </figcaption>
    </figure>
  );
}
