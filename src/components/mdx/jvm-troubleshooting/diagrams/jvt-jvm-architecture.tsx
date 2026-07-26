/**
 * <JvtJvmArchitectureDiagram>：JVM 架构与类加载机制图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function JvtJvmArchitectureDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="JVM架构与类加载机制图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            JVM 架构与类加载机制
          </text>

          {/* 运行时数据区：线程私有 */}
          <text x="40" y="56" fontSize="13" fontWeight="600" fill="var(--warning)">线程私有</text>
          <rect x="40" y="64" width="200" height="100" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="140" y="84" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">程序计数器 PC</text>
          <text x="140" y="102" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">记录字节码行号</text>
          <text x="140" y="118" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">线程切换可恢复</text>
          <text x="140" y="140" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">无 OOM 风险</text>

          <rect x="250" y="64" width="200" height="100" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="350" y="84" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">虚拟机栈 VM Stack</text>
          <text x="350" y="102" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">方法调用=栈帧压栈</text>
          <text x="350" y="118" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">局部变量表/操作数栈</text>
          <text x="350" y="140" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">StackOverflow / OOM</text>

          <rect x="460" y="64" width="200" height="100" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="560" y="84" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">本地方法栈</text>
          <text x="560" y="102" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">为 native 方法服务</text>
          <text x="560" y="118" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">与 VM Stack 类似</text>
          <text x="560" y="140" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">-Xss 调栈大小</text>

          {/* 运行时数据区：线程共享 */}
          <text x="40" y="190" fontSize="13" fontWeight="600" fill="var(--danger)">线程共享</text>
          <rect x="40" y="198" width="310" height="100" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="195" y="218" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">堆 Heap（GC 主战场）</text>
          <text x="195" y="236" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">新生代：Eden + S0 + S1（8:1:1）</text>
          <text x="195" y="252" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">老年代：长期存活对象</text>
          <text x="195" y="274" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">OOM: Java heap space</text>

          <rect x="360" y="198" width="300" height="100" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="510" y="218" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">方法区（元空间 Metaspace）</text>
          <text x="510" y="236" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">类信息/常量/静态变量</text>
          <text x="510" y="252" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">JDK8 移到本地内存</text>
          <text x="510" y="274" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">OOM: Metaspace</text>

          {/* 类加载双亲委派 */}
          <text x="40" y="324" fontSize="13" fontWeight="600" fill="var(--accent)">双亲委派模型（自顶向下委派）</text>

          <rect x="250" y="334" width="240" height="30" rx="6" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="354" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">启动类加载器 Bootstrap（rt.jar）</text>

          <text x="370" y="376" textAnchor="middle" fontSize="12" fill="var(--text-tertiary)">&uarr; 委派 &darr; 回传</text>

          <rect x="250" y="384" width="240" height="30" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="404" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">扩展类加载器 ExtClassLoader</text>

          <text x="370" y="426" textAnchor="middle" fontSize="12" fill="var(--text-tertiary)">&uarr; 委派 &darr; 回传</text>

          <rect x="250" y="434" width="240" height="30" rx="6" fill="var(--accent)" fillOpacity="0.07" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="454" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">应用类加载器 AppClassLoader</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        JVM 运行时数据区（线程私有 PC/栈/本地栈 vs 线程共享堆/方法区）与双亲委派类加载模型
      </figcaption>
    </figure>
  );
}
