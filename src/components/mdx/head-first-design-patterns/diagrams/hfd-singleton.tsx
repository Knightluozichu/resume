/**
 * <HfdSingletonDiagram>：单例模式实现对比（Head First 设计模式 · 单例模式章）。
 *
 * 四列对比四种 Java 实现：
 *   饿汉式 / 懒汉式（同步）/ 双检锁 / 静态内部类
 *   每列标注线程安全性、延迟加载、性能评级。
 *
 * 纯静态展示，无交互。Server Component。
 * viewBox 720×420、四周留白 ≥32、字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

export function HfdSingletonDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="单例模式四种 Java 实现对比。饿汉式：类加载时创建实例，线程安全但不延迟加载。懒汉式同步方法：首次调用时创建，线程安全但每次调用都同步性能差。双检锁（DCL）：先判空再加锁再判空，线程安全且高性能，需 volatile 修饰。静态内部类：利用类加载机制保证线程安全和延迟加载，是最推荐的方案。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            单例模式 · 四种实现对比
          </text>
          <text x={VIEW_W / 2} y="56" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            全局唯一实例：线程安全 + 延迟加载 + 高性能，三者如何兼得
          </text>

          {/* ===== 四列 ===== */}
          {/* 列 1：饿汉式 */}
          <rect x="36" y="74" width="158" height="28" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="115" y="92" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">饿汉式</text>
          <rect x="36" y="106" width="158" height="110" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="44" y="124" fontSize="11" fill="var(--text-primary)">private static Singleton</text>
          <text x="44" y="140" fontSize="11" fill="var(--text-primary)">  instance = new ...</text>
          <text x="44" y="156" fontSize="11" fill="var(--text-primary)">{"private Singleton() {}"}</text>
          <text x="44" y="172" fontSize="11" fill="var(--text-primary)">{"getInstance() {"}</text>
          <text x="44" y="188" fontSize="11" fill="var(--text-primary)">  return instance;</text>
          <text x="44" y="204" fontSize="11" fill="var(--text-primary)">{"}"}</text>

          <text x="115" y="236" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">线程安全 ✓</text>
          <text x="115" y="254" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">延迟加载 ✗</text>
          <text x="115" y="272" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">性能优 ✓</text>

          {/* 列 2：懒汉同步 */}
          <rect x="204" y="74" width="158" height="28" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="283" y="92" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">懒汉同步方法</text>
          <rect x="204" y="106" width="158" height="110" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="212" y="124" fontSize="11" fill="var(--text-primary)">private static Singleton</text>
          <text x="212" y="140" fontSize="11" fill="var(--text-primary)">  instance;</text>
          <text x="212" y="156" fontSize="11" fill="var(--text-primary)">synchronized</text>
          <text x="212" y="172" fontSize="11" fill="var(--text-primary)">{"getInstance() {"}</text>
          <text x="212" y="188" fontSize="11" fill="var(--text-primary)">  if (instance == null)</text>
          <text x="212" y="204" fontSize="11" fill="var(--text-primary)">    instance = new ...</text>

          <text x="283" y="236" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">线程安全 ✓</text>
          <text x="283" y="254" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">延迟加载 ✓</text>
          <text x="283" y="272" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">性能差 ✗</text>

          {/* 列 3：双检锁 */}
          <rect x="372" y="74" width="158" height="28" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="451" y="92" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">双检锁 DCL</text>
          <rect x="372" y="106" width="158" height="110" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="380" y="124" fontSize="11" fill="var(--text-primary)">private volatile static</text>
          <text x="380" y="140" fontSize="11" fill="var(--text-primary)">  Singleton instance;</text>
          <text x="380" y="156" fontSize="11" fill="var(--text-primary)">{"getInstance() {"}</text>
          <text x="380" y="172" fontSize="11" fill="var(--text-primary)">  if (instance == null)</text>
          <text x="380" y="188" fontSize="11" fill="var(--text-primary)">{"    synchronized(...) {"}</text>
          <text x="380" y="204" fontSize="11" fill="var(--text-primary)">      if (instance == null)</text>

          <text x="451" y="236" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">线程安全 ✓</text>
          <text x="451" y="254" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">延迟加载 ✓</text>
          <text x="451" y="272" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">性能优 ✓</text>

          {/* 列 4：静态内部类 */}
          <rect x="540" y="74" width="144" height="28" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="612" y="92" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">静态内部类（推荐）</text>
          <rect x="540" y="106" width="144" height="110" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="548" y="124" fontSize="11" fill="var(--text-primary)">private static class</text>
          <text x="548" y="140" fontSize="11" fill="var(--text-primary)">{"  Holder {"}</text>
          <text x="548" y="156" fontSize="11" fill="var(--text-primary)">    static final Singleton</text>
          <text x="548" y="172" fontSize="11" fill="var(--text-primary)">      INSTANCE = new ...</text>
          <text x="548" y="188" fontSize="11" fill="var(--text-primary)">{"  }"}</text>
          <text x="548" y="204" fontSize="11" fill="var(--text-primary)">return Holder.INSTANCE</text>

          <text x="612" y="236" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">线程安全 ✓</text>
          <text x="612" y="254" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">延迟加载 ✓</text>
          <text x="612" y="272" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">性能优 ✓</text>

          {/* ===== 底部总结 ===== */}
          <rect x="36" y="298" width={VIEW_W - 72} height="94" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.4" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="320" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">推荐选择</text>
          <text x="56" y="342" fontSize="11" fill="var(--text-primary)">静态内部类：JVM 类加载机制天然保证线程安全 + 延迟加载，代码最简洁，绝大多数场景首选。</text>
          <text x="56" y="360" fontSize="11" fill="var(--text-primary)">双检锁：需要延迟加载且对性能有极致要求时用，必须加 volatile 防止指令重排。</text>
          <text x="56" y="378" fontSize="11" fill="var(--text-secondary)">饿汉式适合实例轻量、启动即需要；懒汉同步方法性能太差，不推荐生产使用。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        四种实现逐步解决线程安全、延迟加载和性能的三角矛盾。静态内部类利用 JVM 类加载机制同时满足三者，是最推荐的 Java 单例实现。双检锁需要 volatile 防止指令重排序。
      </figcaption>
    </figure>
  );
}
