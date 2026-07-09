/**
 * <JvtFinalReviewDiagram>：全书复习知识图谱图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function JvtFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="JVM故障诊断全书复习知识图谱图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            JVM 故障诊断全栈技术体系整合
          </text>

          {/* 四层递进 */}
          <text x="40" y="54" fontSize="13" fontWeight="600" fill="var(--warning)">四层递进（理论 → 实战）</text>

          {/* 层1：理论地基 */}
          <rect x="40" y="62" width="660" height="70" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="60" y="82" fontSize="12" fontWeight="600" fill="var(--warning)">理论地基（第1-4章）</text>
          <rect x="60" y="90" width="150" height="34" rx="4" fill="var(--warning)" fillOpacity="0.16" stroke="var(--warning)" strokeWidth="1" />
          <text x="135" y="112" textAnchor="middle" fontSize="10" fill="var(--warning)">JVM架构/类加载</text>

          <rect x="220" y="90" width="150" height="34" rx="4" fill="var(--warning)" fillOpacity="0.16" stroke="var(--warning)" strokeWidth="1" />
          <text x="295" y="112" textAnchor="middle" fontSize="10" fill="var(--warning)">内存模型/对象布局</text>

          <rect x="380" y="90" width="150" height="34" rx="4" fill="var(--warning)" fillOpacity="0.16" stroke="var(--warning)" strokeWidth="1" />
          <text x="455" y="112" textAnchor="middle" fontSize="10" fill="var(--warning)">GC机制/收集器</text>

          <rect x="540" y="90" width="140" height="34" rx="4" fill="var(--warning)" fillOpacity="0.16" stroke="var(--warning)" strokeWidth="1" />
          <text x="610" y="112" textAnchor="middle" fontSize="10" fill="var(--warning)">GC调优/参数</text>

          <text x="370" y="146" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr; 理论决定能看懂工具输出</text>

          {/* 层2：工具手段 */}
          <rect x="40" y="156" width="660" height="50" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="60" y="176" fontSize="12" fontWeight="600" fill="var(--accent)">工具手段（第5章）</text>
          <text x="60" y="196" fontSize="10" fill="var(--text-secondary)">jps/jstat/jmap/jstack/jcmd 命令行 + MAT/Arthas/VisualVM 可视化 —— 诊断的眼睛</text>

          <text x="370" y="222" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr; 工具采集证据，实战决定能解决真实问题</text>

          {/* 层3：实战诊断 */}
          <rect x="40" y="232" width="660" height="70" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="60" y="252" fontSize="12" fontWeight="600" fill="var(--danger)">实战诊断（第6-8章）三大故障场景</text>

          <rect x="60" y="260" width="200" height="34" rx="4" fill="var(--danger)" fillOpacity="0.16" stroke="var(--danger)" strokeWidth="1" />
          <text x="160" y="282" textAnchor="middle" fontSize="10" fill="var(--danger)">线程分析/死锁</text>

          <rect x="270" y="260" width="200" height="34" rx="4" fill="var(--danger)" fillOpacity="0.16" stroke="var(--danger)" strokeWidth="1" />
          <text x="370" y="282" textAnchor="middle" fontSize="10" fill="var(--danger)">内存泄漏排查</text>

          <rect x="480" y="260" width="200" height="34" rx="4" fill="var(--danger)" fillOpacity="0.16" stroke="var(--danger)" strokeWidth="1" />
          <text x="580" y="282" textAnchor="middle" fontSize="10" fill="var(--danger)">CPU性能分析</text>

          <text x="370" y="322" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr; 整合为完整诊断能力</text>

          {/* 层4：方法论 */}
          <rect x="40" y="332" width="660" height="60" rx="8" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1.2" />
          <text x="60" y="352" fontSize="12" fontWeight="600" fill="var(--text-primary)">诊断方法论：现象 → 工具 → 定位 → 修复（证据驱动）</text>
          <text x="60" y="372" fontSize="10" fill="var(--text-secondary)">OOM 看 dump、CPU 高看栈顶、响应慢看等待、死锁 jstack 自动检测</text>

          {/* 三层进阶 */}
          <text x="40" y="416" fontSize="13" fontWeight="600" fill="var(--success)">三层进阶</text>

          <rect x="40" y="424" width="200" height="60" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="140" y="444" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">会重启（入门）</text>
          <text x="140" y="462" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">黑盒重启扩容</text>
          <text x="140" y="476" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">问题反复</text>

          <text x="250" y="456" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="270" y="424" width="200" height="60" rx="6" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="444" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">会诊断（中级）</text>
          <text x="370" y="462" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">工具采集证据</text>
          <text x="370" y="476" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">不停机定位</text>

          <text x="480" y="456" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="500" y="424" width="200" height="60" rx="6" fill="var(--success)" fillOpacity="0.20" stroke="var(--success)" strokeWidth="1.2" />
          <text x="600" y="444" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">会调优（高级）</text>
          <text x="600" y="462" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">理解原理主动优化</text>
          <text x="600" y="476" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">监控预防不故障</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        JVM 故障诊断全栈体系——理论地基（架构/内存/GC/调优）+ 工具手段 + 三大实战诊断场景，从会重启到会诊断到会调优
      </figcaption>
    </figure>
  );
}
