/**
 * <DujFinalReviewDiagram>：全书知识体系整合复习图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function DujFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="深入理解Java虚拟机全书知识体系整合图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            深入理解Java虚拟机——知识体系整合
          </text>

          {/* 三大体系 */}
          <rect x="30" y="50" width="215" height="400" rx="10" fill="var(--warning)" fillOpacity="0.05" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="137" y="72" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">自动内存管理</text>

          <rect x="50" y="84" width="175" height="50" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="137" y="104" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">内存区域</text>
          <text x="137" y="120" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">PC/栈/堆/方法区/直接内存</text>

          <rect x="50" y="142" width="175" height="50" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="137" y="162" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">GC 算法</text>
          <text x="137" y="178" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">标记-清除/复制/标记-整理</text>

          <rect x="50" y="200" width="175" height="50" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="137" y="220" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">GC 收集器</text>
          <text x="137" y="236" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Serial→ParNew→CMS→G1→ZGC</text>

          <rect x="50" y="258" width="175" height="50" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="137" y="278" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">对象生命周期</text>
          <text x="137" y="294" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">创建/访问/回收</text>

          <rect x="50" y="316" width="175" height="50" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="137" y="336" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">OOM 诊断</text>
          <text x="137" y="352" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">堆/元空间/栈/直接内存</text>

          <text x="137" y="392" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">第1-2章</text>
          <text x="137" y="408" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">内存是 JVM 运行的基础</text>

          {/* 中间 */}
          <rect x="262" y="50" width="215" height="400" rx="10" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="369" y="72" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">虚拟机执行子系统</text>

          <rect x="282" y="84" width="175" height="50" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="369" y="104" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">类加载机制</text>
          <text x="369" y="120" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">加载/验证/准备/解析/初始化</text>

          <rect x="282" y="142" width="175" height="50" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="369" y="162" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">双亲委派</text>
          <text x="369" y="178" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Bootstrap/Ext/App/Custom</text>

          <rect x="282" y="200" width="175" height="50" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="369" y="220" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">字节码执行</text>
          <text x="369" y="236" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">栈帧/操作数栈/动态链接</text>

          <rect x="282" y="258" width="175" height="50" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="369" y="278" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">JIT 编译优化</text>
          <text x="369" y="294" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">分层编译/逃逸分析/内联</text>

          <rect x="282" y="316" width="175" height="50" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="369" y="336" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">实战调优</text>
          <text x="369" y="352" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">监控/分析/调整/验证</text>

          <text x="369" y="392" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">第3-5章 + 第8章</text>
          <text x="369" y="408" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">执行决定 JVM 如何跑代码</text>

          {/* 右侧 */}
          <rect x="494" y="50" width="216" height="400" rx="10" fill="var(--success)" fillOpacity="0.05" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="602" y="72" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">并发与锁体系</text>

          <rect x="514" y="84" width="176" height="50" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="602" y="104" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">Java内存模型</text>
          <text x="602" y="120" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">主内存/工作内存</text>

          <rect x="514" y="142" width="176" height="50" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="602" y="162" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">happens-before</text>
          <text x="602" y="178" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">八大规则/内存屏障</text>

          <rect x="514" y="200" width="176" height="50" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="602" y="220" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">volatile/synchronized</text>
          <text x="602" y="236" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">可见性/原子性/有序性</text>

          <rect x="514" y="258" width="176" height="50" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="602" y="278" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">锁优化</text>
          <text x="602" y="294" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">偏向/轻量级/重量级升级</text>

          <rect x="514" y="316" width="176" height="50" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="602" y="336" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">并发问题排查</text>
          <text x="602" y="352" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">死锁/可见性/线程安全</text>

          <text x="602" y="392" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">第6-7章</text>
          <text x="602" y="408" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">并发是多线程正确性的保障</text>

          {/* 底部整合线 */}
          <rect x="30" y="466" width="680" height="28" rx="6" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="484" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">内存管理（空间） × 执行子系统（时间） × 并发体系（正确性）= 完整 JVM 技术闭环</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        深入理解Java虚拟机全书三大知识体系整合——自动内存管理、虚拟机执行子系统、并发与锁体系构成完整闭环
      </figcaption>
    </figure>
  );
}
