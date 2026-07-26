/**
 * <DujMemoryRegionDiagram>：JVM运行时数据区内存布局图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function DujMemoryRegionDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="JVM运行时数据区内存布局图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            JVM运行时数据区（JDK 8+）
          </text>
          <text x={VIEW_W / 2} y="46" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            线程私有 vs 线程共享——决定生命周期与回收策略
          </text>

          {/* 线程私有区域 */}
          <rect x="30" y="64" width="330" height="370" rx="10" fill="var(--warning)" fillOpacity="0.05" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="195" y="82" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">线程私有（Per-Thread）</text>

          <rect x="50" y="96" width="290" height="58" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="195" y="116" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">程序计数器（PC Register）</text>
          <text x="195" y="132" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">记录当前线程执行字节码行号</text>
          <text x="195" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">唯一不会 OOM 的区域</text>

          <rect x="50" y="168" width="290" height="78" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="195" y="188" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">虚拟机栈（VM Stack）</text>
          <text x="195" y="204" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">每个方法调用 = 一个栈帧</text>
          <text x="195" y="218" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">局部变量表 / 操作数栈 / 动态链接 / 返回地址</text>
          <text x="195" y="236" textAnchor="middle" fontSize="11" fill="var(--danger)">异常：StackOverflowError / OOM</text>

          <rect x="50" y="260" width="290" height="58" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="195" y="280" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">本地方法栈（Native Method Stack）</text>
          <text x="195" y="296" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">为 Native 方法服务</text>
          <text x="195" y="310" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">HotSpot 与虚拟机栈合二为一</text>

          <text x="195" y="348" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">随线程创建而生，随线程消亡而灭</text>
          <text x="195" y="364" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">无需 GC 干预</text>

          {/* 线程共享区域 */}
          <rect x="380" y="64" width="330" height="370" rx="10" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="545" y="82" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">线程共享（Shared）</text>

          <rect x="400" y="96" width="290" height="108" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="545" y="116" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">堆（Heap）</text>
          <text x="545" y="132" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">存放对象实例与数组——GC 主战场</text>
          <text x="545" y="148" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">新生代（Eden + S0 + S1）</text>
          <text x="545" y="162" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">老年代（Old Generation）</text>
          <text x="545" y="180" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">-Xms / -Xmx 控制大小</text>
          <text x="545" y="196" textAnchor="middle" fontSize="11" fill="var(--danger)">异常：OutOfMemoryError: Java heap space</text>

          <rect x="400" y="218" width="290" height="78" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="545" y="238" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">方法区（Method Area）</text>
          <text x="545" y="254" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">类信息 / 常量池 / 静态变量 / JIT 代码</text>
          <text x="545" y="270" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">JDK 7 永久代（PermGen）→ JDK 8 元空间（Metaspace）</text>
          <text x="545" y="286" textAnchor="middle" fontSize="11" fill="var(--danger)">异常：OOM: Metaspace / PermGen space</text>

          <rect x="400" y="310" width="290" height="58" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="545" y="330" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">直接内存（Direct Memory）</text>
          <text x="545" y="346" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">NIO Buffer / 堆外分配</text>
          <text x="545" y="360" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">-XX:MaxDirectMemorySize 控制</text>

          <text x="545" y="396" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">所有线程共享，需要 GC 回收</text>
          <text x="545" y="412" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">堆是 GC 核心区域</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        JVM运行时数据区——程序计数器、虚拟机栈、本地方法栈为线程私有；堆、方法区为线程共享
      </figcaption>
    </figure>
  );
}
