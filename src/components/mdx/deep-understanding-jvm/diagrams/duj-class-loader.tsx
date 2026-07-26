/**
 * <DujClassLoaderDiagram>：类加载机制与双亲委派模型图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function DujClassLoaderDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="类加载机制与双亲委派模型图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            类加载机制：生命周期 + 双亲委派
          </text>

          {/* 左半：类加载生命周期 */}
          <text x="195" y="50" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">类加载生命周期（7 阶段）</text>

          <rect x="50" y="62" width="290" height="40" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="195" y="87" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">加载（Loading）</text>

          <text x="195" y="114" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="50" y="122" width="290" height="40" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="195" y="147" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">验证（Verification）</text>

          <text x="195" y="174" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darrow;</text>

          <rect x="50" y="182" width="290" height="40" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="195" y="207" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">准备（Preparation）— 分配内存，设默认零值</text>

          <text x="195" y="234" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darrow;</text>

          <rect x="50" y="242" width="290" height="40" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="195" y="267" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">解析（Resolution）— 符号引用 → 直接引用</text>

          <text x="195" y="294" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darrow;</text>

          <rect x="50" y="302" width="290" height="40" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="195" y="327" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">初始化（Initialization）— 执行 &lt;clinit&gt; 方法</text>

          <text x="195" y="354" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">连接 = 验证 + 准备 + 解析</text>

          <rect x="50" y="370" width="135" height="36" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="117" y="392" textAnchor="middle" fontSize="11" fill="var(--success)">使用（Using）</text>

          <rect x="205" y="370" width="135" height="36" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="272" y="392" textAnchor="middle" fontSize="11" fill="var(--success)">卸载（Unloading）</text>

          {/* 右半：双亲委派模型 */}
          <text x="545" y="50" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">双亲委派模型</text>

          <rect x="420" y="62" width="250" height="52" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="545" y="82" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">启动类加载器（Bootstrap）</text>
          <text x="545" y="100" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">加载 rt.jar / java.lang.* 等</text>

          <text x="545" y="126" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr; 委派</text>

          <rect x="420" y="134" width="250" height="52" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="545" y="154" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">扩展类加载器（Extension）</text>
          <text x="545" y="172" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">加载 ext 目录 / java.ext.dirs</text>

          <text x="545" y="198" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr; 委派</text>

          <rect x="420" y="206" width="250" height="52" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="545" y="226" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">应用程序类加载器（Application）</text>
          <text x="545" y="244" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">加载 classpath / -cp</text>

          <text x="545" y="270" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr; 委派</text>

          <rect x="420" y="278" width="250" height="52" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="545" y="298" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">自定义类加载器（Custom）</text>
          <text x="545" y="316" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">网络/加密/热部署加载</text>

          <rect x="380" y="348" width="330" height="130" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.2" />
          <text x="545" y="368" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">委派规则</text>
          <text x="395" y="386" fontSize="11" fill="var(--text-secondary)">1. 先委派父加载器尝试加载</text>
          <text x="395" y="402" fontSize="11" fill="var(--text-secondary)">2. 父加载器无法加载时，子加载器才尝试</text>
          <text x="395" y="418" fontSize="11" fill="var(--text-secondary)">3. 保证核心类的安全性与唯一性</text>
          <text x="395" y="438" fontSize="11" fill="var(--danger)">打破：SPI（JDBC）、OSGi、Tomcat</text>
          <text x="395" y="458" fontSize="11" fill="var(--text-secondary)">线程上下文类加载器（TCCL）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        类加载七阶段生命周期与双亲委派模型——自底向上委派、自顶向下加载，保证核心类安全唯一
      </figcaption>
    </figure>
  );
}
