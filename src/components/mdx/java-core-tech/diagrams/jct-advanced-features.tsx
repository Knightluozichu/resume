/**
 * <JctAdvancedFeaturesDiagram>：高级特性图解（注解/反射/类加载）。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function JctAdvancedFeaturesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="高级特性（注解反射类加载）图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            高级特性——注解、反射与类加载
          </text>

          {/* 注解 */}
          <rect x="30" y="48" width="340" height="160" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="200" y="70" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">注解（Annotation）</text>
          <text x="45" y="90" fontSize="10" fill="var(--text-secondary)">@Override / @Deprecated / @SuppressWarnings</text>
          <text x="45" y="106" fontSize="10" fill="var(--text-secondary)">@FunctionalInterface / @Repeatable</text>
          <text x="45" y="126" fontSize="10" fill="var(--text-secondary)">元注解:</text>
          <text x="45" y="142" fontSize="10" fill="var(--text-secondary)">  @Target: 可标注位置</text>
          <text x="45" y="158" fontSize="10" fill="var(--text-secondary)">  @Retention: 保留期</text>
          <text x="45" y="174" fontSize="10" fill="var(--text-secondary)">    SOURCE / CLASS / RUNTIME</text>
          <text x="45" y="194" fontSize="10" fill="var(--text-secondary)">@Retention(RUNTIME) 可被反射读取</text>

          {/* 反射 */}
          <rect x="390" y="48" width="320" height="160" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.5" />
          <text x="550" y="70" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--danger)">反射（Reflection）</text>
          <text x="405" y="90" fontSize="10" fill="var(--text-secondary)">Class&lt;?&gt; cls = obj.getClass();</text>
          <text x="405" y="106" fontSize="10" fill="var(--text-secondary)">Field[] fs = cls.getDeclaredFields();</text>
          <text x="405" y="122" fontSize="10" fill="var(--text-secondary)">Method[] ms = cls.getDeclaredMethods();</text>
          <text x="405" y="138" fontSize="10" fill="var(--text-secondary)">Constructor&lt;?&gt;[] cs = cls.getConstructors();</text>
          <text x="405" y="158" fontSize="10" fill="var(--text-secondary)">f.setAccessible(true);  // 突破private</text>
          <text x="405" y="174" fontSize="10" fill="var(--text-secondary)">m.invoke(obj, args);  // 动态调用</text>
          <text x="405" y="194" fontSize="10" fill="var(--text-secondary)">用途: 框架/Spring/JSON序列化</text>

          {/* 类加载器 */}
          <text x={VIEW_W / 2} y="238" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-primary)">
            类加载器与双亲委派
          </text>

          <rect x="270" y="252" width="200" height="40" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="272" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">AppClassLoader</text>
          <text x="370" y="286" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">加载 classpath 下的类</text>

          <text x="370" y="308" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&uarr;</text>
          <text x="400" y="308" fontSize="8" fill="var(--text-tertiary)">委派</text>

          <rect x="270" y="314" width="200" height="40" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="334" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">ExtClassLoader</text>
          <text x="370" y="348" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">加载 ext 目录扩展类</text>

          <text x="370" y="370" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&uarr;</text>

          <rect x="270" y="376" width="200" height="40" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="370" y="396" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">BootstrapClassLoader</text>
          <text x="370" y="410" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">加载 rt.jar 核心类</text>

          {/* 类加载过程 */}
          <rect x="30" y="430" width="680" height="56" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" />
          <text x="370" y="450" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">类加载生命周期</text>
          <text x="370" y="470" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">加载 &rarr; 验证 &rarr; 准备 &rarr; 解析 &rarr; 初始化 &rarr; 使用 &rarr; 卸载</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        高级特性——注解元注解Retention、反射动态获取字段方法构造器、类加载器双亲委派机制与类加载生命周期
      </figcaption>
    </figure>
  );
}
