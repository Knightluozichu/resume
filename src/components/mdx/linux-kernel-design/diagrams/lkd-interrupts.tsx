/**
 * <LkdInterruptsDiagram>：中断处理——上下半部与IDT图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function LkdInterruptsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="中断处理上下半部与IDT图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            中断处理流程——上半部与下半部
          </text>

          {/* 硬件中断路径 */}
          <rect x="30" y="46" width="200" height="80" rx="6" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="130" y="68" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-tertiary)">硬件设备</text>
          <text x="130" y="84" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">磁盘/网卡/键盘</text>
          <text x="130" y="100" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">产生中断信号</text>
          <text x="130" y="116" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">→ 中断控制器(APIC)</text>

          {/* IDT */}
          <rect x="260" y="46" width="200" height="80" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="360" y="68" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">IDT 中断向量表</text>
          <text x="360" y="84" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">256个门描述符</text>
          <text x="360" y="100" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">向量号索引</text>
          <text x="360" y="116" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">→ entry_INT 入口</text>

          {/* 箭头 */}
          <line x1="230" y1="86" x2="258" y2="86" stroke="var(--text-tertiary)" strokeWidth="1.2" markerEnd="url(#arr3)" />

          {/* 上半部 */}
          <rect x="490" y="46" width="220" height="80" rx="6" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="1.5" />
          <text x="600" y="66" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">上半部（Top Half）</text>
          <text x="600" y="84" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">硬件中断上下文</text>
          <text x="600" y="100" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">ACK设备 / 拷数据 / 调度下半部</text>
          <text x="600" y="116" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">禁止中断 / 不能睡眠 / 极短</text>

          <line x1="460" y1="86" x2="488" y2="86" stroke="var(--text-tertiary)" strokeWidth="1.2" markerEnd="url(#arr3)" />

          {/* 分界 */}
          <line x1="30" y1="140" x2="710" y2="140" stroke="var(--danger)" strokeWidth="1" strokeDasharray="4,3" />
          <text x="370" y="136" textAnchor="middle" fontSize="9" fill="var(--danger)">--- 调度下半部（开中断环境）---</text>

          {/* 下半部三种机制 */}
          <text x="370" y="160" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">下半部（Bottom Half）三种机制</text>

          {/* softirq */}
          <rect x="30" y="172" width="210" height="130" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="135" y="192" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">softirq</text>
          <text x="40" y="210" fontSize="9" fill="var(--text-secondary)">- 静态编译注册</text>
          <text x="40" y="224" fontSize="9" fill="var(--text-secondary)">- 可多CPU并行执行</text>
          <text x="40" y="238" fontSize="9" fill="var(--text-secondary)">- 不能睡眠</text>
          <text x="40" y="252" fontSize="9" fill="var(--text-secondary)">- 性能最高</text>
          <text x="40" y="270" fontSize="9" fontWeight="600" fill="var(--accent)">适用场景:</text>
          <text x="40" y="284" fontSize="9" fill="var(--text-tertiary)">网络收包 NET_RX</text>
          <text x="40" y="296" fontSize="9" fill="var(--text-tertiary)">块设备完成</text>

          {/* tasklet */}
          <rect x="265" y="172" width="210" height="130" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="192" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">tasklet</text>
          <text x="275" y="210" fontSize="9" fill="var(--text-secondary)">- 基于softirq实现</text>
          <text x="275" y="224" fontSize="9" fill="var(--text-secondary)">- 可动态注册</text>
          <text x="275" y="238" fontSize="9" fill="var(--text-secondary)">- 同类串行(不并行)</text>
          <text x="275" y="252" fontSize="9" fill="var(--text-secondary)">- 不能睡眠</text>
          <text x="275" y="270" fontSize="9" fontWeight="600" fill="var(--warning)">适用场景:</text>
          <text x="275" y="284" fontSize="9" fill="var(--text-tertiary)">大部分驱动下半部</text>
          <text x="275" y="296" fontSize="9" fill="var(--text-tertiary)">比softirq简单安全</text>

          {/* workqueue */}
          <rect x="500" y="172" width="210" height="130" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="605" y="192" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">workqueue</text>
          <text x="510" y="210" fontSize="9" fill="var(--text-secondary)">- 基于内核线程</text>
          <text x="510" y="224" fontSize="9" fill="var(--text-secondary)">- 进程上下文</text>
          <text x="510" y="238" fontSize="9" fill="var(--text-secondary)">- 可以睡眠!</text>
          <text x="510" y="252" fontSize="9" fill="var(--text-secondary)">- 可动态创建</text>
          <text x="510" y="270" fontSize="9" fontWeight="600" fill="var(--success)">适用场景:</text>
          <text x="510" y="284" fontSize="9" fill="var(--text-tertiary)">需要睡眠的操作</text>
          <text x="510" y="296" fontSize="9" fill="var(--text-tertiary)">磁盘I/O/耗时工作</text>

          {/* ISR 限制 */}
          <rect x="30" y="318" width="680" height="80" rx="6" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" />
          <text x="370" y="338" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">ISR（中断处理函数）编程限制</text>
          <text x="50" y="356" fontSize="9" fill="var(--text-secondary)">1. 不能睡眠/阻塞（无进程上下文, 死锁/panic）</text>
          <text x="50" y="370" fontSize="9" fill="var(--text-secondary)">2. 不能访问用户空间（copy_to_user/copy_from_user）</text>
          <text x="50" y="384" fontSize="9" fill="var(--text-secondary)">3. 执行极短（禁中断期间, 丢失中断风险）</text>
          <text x="390" y="356" fontSize="9" fill="var(--text-secondary)">4. 不能持锁过久（阻塞其他CPU）</text>
          <text x="390" y="370" fontSize="9" fill="var(--text-secondary)">5. 注意可重入（多CPU同时执行）</text>
          <text x="390" y="384" fontSize="9" fill="var(--text-tertiary)">违反: panic / 死锁 / 数据损坏</text>

          {/* 底部 */}
          <rect x="30" y="412" width="680" height="68" rx="6" fill="var(--text-primary)" fillOpacity="0.05" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.2" />
          <text x="50" y="432" fontSize="10" fontWeight="600" fill="var(--text-primary)">设计原则: 上半部只做最紧急的应答和标记, 下半部在开中断环境完成剩余工作</text>
          <text x="50" y="448" fontSize="9" fill="var(--text-secondary)">既保证中断及时响应, 又不长时间禁用中断; 中断返回路径检查并执行pending的softirq</text>
          <text x="50" y="462" fontSize="9" fill="var(--text-tertiary)">选择: 不能睡眠高性能→softirq / 不能睡眠→tasklet / 需要睡眠→workqueue</text>
          <text x="50" y="474" fontSize="9" fill="var(--text-tertiary)">完整路径: 设备→APIC→CPU→IDT查表→ISR(上半部)→调度→softirq/tasklet/workqueue(下半部)→iret返回</text>

          <defs>
            <marker id="arr3" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--text-tertiary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        中断处理上下半部——硬件中断经IDT路由到ISR，耗时工作推迟到softirq/tasklet/workqueue下半部执行
      </figcaption>
    </figure>
  );
}
