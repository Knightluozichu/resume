/**
 * <AalClassloaderDiagram>：Android类加载器层级与双亲委派图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function AalClassloaderDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Android类加载器层级与双亲委派机制图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Android 类加载器层级与双亲委派
          </text>

          {/* BootClassLoader */}
          <rect x="220" y="50" width="300" height="50" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="370" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">BootClassLoader</text>
          <text x="370" y="90" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">加载核心库（java.lang.* 等），C++实现</text>

          <text x="370" y="114" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr; parent</text>

          {/* PathClassLoader / DexClassLoader */}
          <rect x="50" y="126" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="205" y="148" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">PathClassLoader</text>
          <text x="205" y="166" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">加载已安装APK的 classes.dex</text>
          <text x="205" y="178" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">/data/app/*.dex（系统默认加载器）</text>

          <rect x="380" y="126" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="535" y="148" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--danger)">DexClassLoader</text>
          <text x="535" y="166" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">加载任意路径的 dex/jar/apk</text>
          <text x="535" y="178" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">插件化/热修复核心加载器</text>

          {/* 双亲委派流程 */}
          <text x="370" y="210" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">双亲委派机制（Parent Delegation）</text>

          <rect x="50" y="226" width="640" height="50" rx="6" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="65" y="246" textAnchor="start" fontSize="11" fontWeight="600" fill="var(--accent)">1. loadClass() 先查 parent</text>
          <text x="65" y="264" textAnchor="start" fontSize="10" fill="var(--text-secondary)">DexClassLoader → 交给 PathClassLoader → 交给 BootClassLoader，逐级向上委派</text>

          <rect x="50" y="284" width="640" height="50" rx="6" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="65" y="304" textAnchor="start" fontSize="11" fontWeight="600" fill="var(--warning)">2. parent 尝试加载</text>
          <text x="65" y="322" textAnchor="start" fontSize="10" fill="var(--text-secondary)">BootClassLoader 尝试加载核心类 → 成功则返回；失败则向下回传</text>

          <rect x="50" y="342" width="640" height="50" rx="6" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="65" y="362" textAnchor="start" fontSize="11" fontWeight="600" fill="var(--success)">3. 自行加载 findClass()</text>
          <text x="65" y="380" textAnchor="start" fontSize="10" fill="var(--text-secondary)">所有 parent 都加载失败 → 当前 ClassLoader 调用 findClass() 自行加载 dex 中的类</text>

          {/* 插件化应用 */}
          <rect x="50" y="408" width="310" height="72" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="65" y="428" textAnchor="start" fontSize="11" fontWeight="600" fill="var(--danger)">插件化原理</text>
          <text x="65" y="446" textAnchor="start" fontSize="10" fill="var(--text-secondary)">DexClassLoader 加载插件APK的dex</text>
          <text x="65" y="462" textAnchor="start" fontSize="10" fill="var(--text-secondary)">突破PathClassLoader只能加载已安装包限制</text>

          <rect x="380" y="408" width="310" height="72" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="395" y="428" textAnchor="start" fontSize="11" fontWeight="600" fill="var(--success)">热修复原理</text>
          <text x="395" y="446" textAnchor="start" fontSize="10" fill="var(--text-secondary)">DexClassLoader 加载补丁dex</text>
          <text x="395" y="462" textAnchor="start" fontSize="10" fill="var(--text-secondary)">插入 dexElements 数组头部优先加载</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Android类加载器层级与双亲委派——BootClassLoader、PathClassLoader、DexClassLoader
      </figcaption>
    </figure>
  );
}
