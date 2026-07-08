/**
 * <LkeKernelDebuggingDiagram>：Linux内核调试与性能分析工具图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function LkeKernelDebuggingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Linux内核调试与性能分析工具图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            内核调试与性能分析工具链
          </text>

          {/* 三大类别 */}
          <text x="130" y="52" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">日志与观测</text>
          <text x="370" y="52" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">动态追踪</text>
          <text x="610" y="52" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">崩溃分析</text>

          {/* 日志与观测 */}
          <rect x="20" y="62" width="230" height="180" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <rect x="35" y="74" width="200" height="38" rx="4" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="0.6" />
          <text x="135" y="90" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">printk</text>
          <text x="135" y="104" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">KERN_EMERG~KERN_DEBUG</text>

          <rect x="35" y="118" width="200" height="38" rx="4" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="0.6" />
          <text x="135" y="134" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">ftrace</text>
          <text x="135" y="148" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">函数追踪 / 调用图</text>

          <rect x="35" y="162" width="200" height="38" rx="4" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="0.6" />
          <text x="135" y="178" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">tracepoints</text>
          <text x="135" y="192" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">静态埋点 / /sys/kernel/debug</text>

          <rect x="35" y="206" width="200" height="28" rx="4" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="0.6" />
          <text x="135" y="224" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">proc / sysfs</text>

          {/* 动态追踪 */}
          <rect x="260" y="62" width="230" height="180" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <rect x="275" y="74" width="200" height="38" rx="4" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="0.6" />
          <text x="375" y="90" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">kprobes / kretprobes</text>
          <text x="375" y="104" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">动态插入断点指令</text>

          <rect x="275" y="118" width="200" height="38" rx="4" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="0.6" />
          <text x="375" y="134" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">eBPF / bpftrace</text>
          <text x="375" y="148" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">内核态安全运行沙箱</text>

          <rect x="275" y="162" width="200" height="38" rx="4" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="0.6" />
          <text x="375" y="178" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">perf</text>
          <text x="375" y="192" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">PMU采样 / 热点分析</text>

          <rect x="275" y="206" width="200" height="28" rx="4" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="0.6" />
          <text x="375" y="224" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">SystemTap / LTTng</text>

          {/* 崩溃分析 */}
          <rect x="500" y="62" width="230" height="180" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <rect x="515" y="74" width="200" height="38" rx="4" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="0.6" />
          <text x="615" y="90" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">kdump / kexec</text>
          <text x="615" y="104" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">崩溃时转储内存镜像</text>

          <rect x="515" y="118" width="200" height="38" rx="4" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="0.6" />
          <text x="615" y="134" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">crash 工具</text>
          <text x="615" y="148" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">分析 vmcore 转储文件</text>

          <rect x="515" y="162" width="200" height="38" rx="4" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="0.6" />
          <text x="615" y="178" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">gdb + vmlinux</text>
          <text x="615" y="192" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">源码级调试 / 符号解析</text>

          <rect x="515" y="206" width="200" height="28" rx="4" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="0.6" />
          <text x="615" y="224" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">KASAN / KMSAN</text>

          {/* 调试流程 */}
          <rect x="20" y="252" width="700" height="110" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="270" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">典型调试流程</text>
          <text x="40" y="288" fontSize="9" fill="var(--text-secondary)">1. 复现：用 stress / 模糊测试 / kgdb 断点定位</text>
          <text x="40" y="304" fontSize="9" fill="var(--text-secondary)">2. 观测：printk 确认执行路径 / ftrace 追踪函数调用</text>
          <text x="40" y="320" fontSize="9" fill="var(--text-secondary)">3. 深入：eBPF 采集函数参数与返回值 / perf 找CPU热点</text>
          <text x="40" y="336" fontSize="9" fill="var(--text-secondary)">4. 崩溃：kdump 捕获 → crash 分析 → bt 查看调用栈 → 定位源码行</text>
          <text x="40" y="352" fontSize="8" fill="var(--text-tertiary)">辅助：KASAN 检测内存越界 / lockdep 检测锁死锁 / ftrace 找耗时</text>

          {/* 性能分析 */}
          <rect x="20" y="372" width="340" height="110" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="190" y="390" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">perf 性能分析</text>
          <text x="35" y="408" fontSize="9" fill="var(--text-secondary)">perf record -F 99 -g -- sleep 10</text>
          <text x="35" y="424" fontSize="9" fill="var(--text-secondary)">perf report  ← 热点函数排序</text>
          <text x="35" y="440" fontSize="9" fill="var(--text-secondary)">perf stat  ← 计数器统计</text>
          <text x="35" y="456" fontSize="9" fill="var(--text-secondary)">perf top  ← 实时热点</text>
          <text x="35" y="472" fontSize="8" fill="var(--text-tertiary)">基于PMU硬件计数器：cycles / cache-miss / branch-miss</text>

          {/* eBPF能力 */}
          <rect x="380" y="372" width="340" height="110" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="0.8" />
          <text x="550" y="390" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">eBPF 可观测性</text>
          <text x="395" y="408" fontSize="9" fill="var(--text-secondary)">bpftrace -e 'tracepoint:syscalls:sys_enter_openat &#123;...&#125;'</text>
          <text x="395" y="424" fontSize="9" fill="var(--text-secondary)">bcc 工具集：execsnoop / opensnoop / biolatency</text>
          <text x="395" y="440" fontSize="9" fill="var(--text-secondary)">attach点：kprobe / tracepoint / perf_event / XDP</text>
          <text x="395" y="456" fontSize="9" fill="var(--text-secondary)">验证器保证安全：不循环不越界不睡眠</text>
          <text x="395" y="472" fontSize="8" fill="var(--text-tertiary)">生产环境低开销追踪：网络 / I/O / 安全 / 调度</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        内核调试分日志观测（printk/ftrace）、动态追踪（kprobes/eBPF/perf）、崩溃分析（kdump/crash）三大类，eBPF是现代可观测性核心
      </figcaption>
    </figure>
  );
}
