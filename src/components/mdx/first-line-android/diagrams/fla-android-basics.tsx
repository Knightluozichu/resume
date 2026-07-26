/**
 * <FlaAndroidBasicsDiagram>：Android入门——项目结构与四层架构图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function FlaAndroidBasicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Android项目结构与四层架构图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Android项目结构与四层架构
          </text>

          {/* 左侧：Android四层架构 */}
          <text x="170" y="58" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Android四层架构</text>

          <rect x="40" y="70" width="260" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="170" y="90" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">应用层（Applications）</text>
          <text x="170" y="106" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">用户App：电话/短信/浏览器</text>

          <rect x="40" y="130" width="260" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="170" y="150" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">应用框架层（Application Framework）</text>
          <text x="170" y="166" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">ActivityManager/WindowManager/</text>
          <text x="170" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">ContentProvider/View System</text>

          <rect x="40" y="190" width="260" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="170" y="210" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">系统运行层（Libraries + Android Runtime）</text>
          <text x="170" y="226" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">SQLite/OpenGL/Media</text>
          <text x="170" y="238" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Dalvik/ART虚拟机</text>

          <rect x="40" y="250" width="260" height="50" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="170" y="270" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">Linux内核层（Linux Kernel）</text>
          <text x="170" y="286" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">驱动/电源管理/进程管理</text>

          {/* 箭头连接 */}
          <text x="340" y="310" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&lt;—— 开发者主要关注 ——&gt;</text>

          {/* 右侧：项目目录结构 */}
          <text x="540" y="58" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">项目目录结构</text>

          <rect x="420" y="70" width="260" height="50" rx="8" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="540" y="88" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">app/src/main/</text>
          <text x="540" y="104" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">java/com/example/app/ — Kotlin/Java源码</text>
          <text x="540" y="116" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">AndroidManifest.xml — 清单文件</text>

          <rect x="420" y="130" width="260" height="50" rx="8" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="540" y="148" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">res/ — 资源目录</text>
          <text x="540" y="164" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">layout/ 布局XML</text>
          <text x="540" y="176" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">values/ 字符串/颜色/样式</text>

          <rect x="420" y="190" width="260" height="50" rx="8" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="540" y="208" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">build.gradle — Gradle构建</text>
          <text x="540" y="224" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">dependencies 依赖管理</text>
          <text x="540" y="236" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">compileSdk / minSdk / targetSdk</text>

          <rect x="420" y="250" width="260" height="50" rx="8" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="540" y="268" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">Gradle Wrapper</text>
          <text x="540" y="284" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">gradlew / gradle-wrapper.properties</text>
          <text x="540" y="296" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">版本锁定，团队一致性</text>

          {/* 底部：日志工具与资源引用 */}
          <rect x="40" y="340" width="660" height="80" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="362" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">开发工具链与调试</text>
          <text x="120" y="386" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Log.d() 调试日志</text>
          <text x="120" y="400" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Logcat 过滤查看</text>
          <text x="300" y="386" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">R.string.app_name</text>
          <text x="300" y="400" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">R.layout.activity_main</text>
          <text x="500" y="386" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">AndroidManifest</text>
          <text x="500" y="400" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">注册四大组件</text>
          <text x="650" y="386" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">ADB调试</text>
          <text x="650" y="400" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">adb install / adb shell</text>

          <text x="370" y="448" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Gradle编译 → APK → 安装到设备/模拟器 → Logcat调试</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Android四层架构（应用层/框架层/运行层/内核层）与项目目录结构、Gradle构建、资源引用全貌
      </figcaption>
    </figure>
  );
}
