/**
 * <LkeIoSubsystemDiagram>：Linux I/O子系统与设备驱动模型图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function LkeIoSubsystemDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Linux I/O子系统与设备驱动模型图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Linux I/O子系统——三类设备与驱动模型
          </text>

          {/* 三类设备 */}
          <text x="185" y="52" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">字符设备</text>
          <text x="370" y="52" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">块设备</text>
          <text x="555" y="52" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">网络设备</text>

          {/* 字符设备 */}
          <rect x="30" y="62" width="310" height="120" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="45" y="82" fontSize="10" fontWeight="600" fill="var(--warning)">cdev 注册流程</text>
          <text x="45" y="98" fontSize="9" fill="var(--text-secondary)">1. cdev_init(&amp;cdev, &amp;fops)</text>
          <text x="45" y="112" fontSize="9" fill="var(--text-secondary)">2. cdev_add(&amp;cdev, devno, 1)</text>
          <text x="45" y="126" fontSize="9" fill="var(--text-secondary)">3. 用户 open → file.f_op</text>
          <text x="45" y="142" fontSize="9" fill="var(--text-secondary)">4. read/write → fops.read/write</text>
          <text x="45" y="158" fontSize="8" fill="var(--text-tertiary)">无缓冲 / 实时 / 按字节或按帧</text>
          <text x="45" y="172" fontSize="8" fill="var(--text-tertiary)">例：/dev/tty, /dev/input, 串口</text>

          {/* 块设备 */}
          <rect x="215" y="62" width="310" height="120" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="230" y="82" fontSize="10" fontWeight="600" fill="var(--danger)">块I/O栈</text>
          <text x="230" y="98" fontSize="9" fill="var(--text-secondary)">1. 文件系统 submit_bio()</text>
          <text x="230" y="112" fontSize="9" fill="var(--text-secondary)">2. I/O调度器合并/排序</text>
          <text x="230" y="126" fontSize="9" fill="var(--text-secondary)">3. blk-mq 请求队列分发</text>
          <text x="230" y="142" fontSize="9" fill="var(--text-secondary)">4. 驱动 do_request()</text>
          <text x="230" y="158" fontSize="8" fill="var(--text-tertiary)">缓冲 / 可寻址 / 按扇区/块</text>
          <text x="230" y="172" fontSize="8" fill="var(--text-tertiary)">例：磁盘 / SSD / eMMC</text>

          {/* 网络设备 */}
          <rect x="400" y="62" width="310" height="120" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="415" y="82" fontSize="10" fontWeight="600" fill="var(--success)">net_device 收发</text>
          <text x="415" y="98" fontSize="9" fill="var(--text-secondary)">1. 硬件中断 → NAPI poll</text>
          <text x="415" y="112" fontSize="9" fill="var(--text-secondary)">2. 构造 sk_buff</text>
          <text x="415" y="126" fontSize="9" fill="var(--text-secondary)">3. netif_receive_skb()</text>
          <text x="415" y="142" fontSize="9" fill="var(--text-secondary)">4. 协议栈逐层处理</text>
          <text x="415" y="158" fontSize="8" fill="var(--text-tertiary)">无缓冲 / 流式 / 按包</text>
          <text x="415" y="172" fontSize="8" fill="var(--text-tertiary)">例：eth0 / wlan0 / 虚拟网卡</text>

          {/* 设备模型 */}
          <rect x="30" y="194" width="680" height="130" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="214" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">Linux设备模型（sysfs / udev / 驱动绑定）</text>

          <rect x="50" y="226" width="140" height="44" rx="4" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="120" y="243" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--accent)">bus_type</text>
          <text x="120" y="257" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">总线（USB/PCI/...）</text>
          <text x="120" y="267" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">match: dev↔drv</text>

          <rect x="205" y="226" width="140" height="44" rx="4" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="275" y="243" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--accent)">device</text>
          <text x="275" y="257" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">设备实例</text>
          <text x="275" y="267" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">挂到总线</text>

          <rect x="360" y="226" width="140" height="44" rx="4" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="430" y="243" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--accent)">device_driver</text>
          <text x="430" y="257" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">驱动程序</text>
          <text x="430" y="267" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">probe/remove</text>

          <rect x="515" y="226" width="180" height="44" rx="4" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="605" y="243" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--accent)">sysfs / udev</text>
          <text x="605" y="257" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">/sys 导出设备树</text>
          <text x="605" y="267" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">udev 自动创建/dev节点</text>

          <text x="370" y="290" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">绑定流程：总线枚举设备 → match(dev, drv) → driver.probe(dev) → 注册cdev/blk/netdev</text>
          <text x="370" y="305" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">移除：driver.remove(dev) → 注销 → 释放资源</text>
          <text x="370" y="318" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">模块加载：module_init → 注册driver → 触发已有设备probe</text>

          {/* 中断处理 */}
          <rect x="30" y="336" width="680" height="70" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="370" y="354" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">中断处理（上半部/下半部）</text>
          <text x="370" y="370" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">硬中断（IRQ）：request_irq() 注册 → 快速响应 → ACK + 关中断 → 调度下半部</text>
          <text x="370" y="384" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">下半部机制：softirq / tasklet / workqueue（可延迟、可睡眠）</text>
          <text x="370" y="398" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">NAPI 网卡收包：硬中断关闭 → poll 轮询取包 → 队列空后重新开中断</text>

          {/* DMA */}
          <rect x="30" y="416" width="680" height="65" rx="8" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="0.8" strokeOpacity="0.3" />
          <text x="370" y="434" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">DMA与内存一致性</text>
          <text x="370" y="450" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">dma_map_single() → 映射物理地址 → 设备直接读写内存（不经CPU）</text>
          <text x="370" y="464" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">dma_sync_*() 保证CPU与设备看到的内存一致；IOMMU 提供地址隔离</text>
          <text x="370" y="476" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">scatter-gather：用 sg_table 描述不连续物理段</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Linux I/O子系统分字符/块/网络三类设备，设备模型用bus/device/driver三角绑定，中断分上下半部，DMA实现零拷贝
      </figcaption>
    </figure>
  );
}
