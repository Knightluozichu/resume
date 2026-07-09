/**
 * <CraAndroidQuickstartDiagram>：Android快速入门图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 560;

export function CraAndroidQuickstartDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Android系统架构与项目结构图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Android系统四层架构 与 项目结构
          </text>

          {/* 左侧：四层架构 */}
          <text x="185" y="52" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Android四层架构</text>

          <rect x="50" y="64" width="270" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="185" y="86" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">Applications（应用层）</text>
          <text x="185" y="102" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">用户App / 系统App（电话/短信/浏览器）</text>
          <text x="185" y="114" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Java/Kotlin编写，调用框架层API</text>

          <rect x="50" y="128" width="270" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="185" y="150" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">Application Framework（框架层）</text>
          <text x="185" y="166" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">ActivityManager / WindowManager</text>
          <text x="185" y="178" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">ContentProvider / View System / Notification</text>

          <rect x="50" y="192" width="270" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="185" y="214" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">Libraries + Android Runtime</text>
          <text x="185" y="230" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">SQLite / OpenGL ES / WebKit / Media</text>
          <text x="185" y="242" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Dalvik/ART虚拟机 / 核心库</text>

          <rect x="50" y="256" width="270" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="185" y="278" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">Linux Kernel（内核层）</text>
          <text x="185" y="294" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">驱动 / 进程管理 / 电源管理</text>
          <text x="185" y="306" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Display / Camera / Binder IPC</text>

          {/* 右侧：项目结构 */}
          <text x="555" y="52" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Android项目结构</text>

          <rect x="420" y="64" width="270" height="248" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="435" y="86" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">MyApp/</text>
          <text x="455" y="104" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">app/</text>
          <text x="475" y="122" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">src/main/</text>
          <text x="495" y="140" fontSize="11" fontFamily="monospace" fill="var(--accent)">java/</text>
          <text x="515" y="158" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">com/pkg/MainActivity.java</text>
          <text x="495" y="176" fontSize="11" fontFamily="monospace" fill="var(--accent)">res/</text>
          <text x="515" y="194" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">layout/activity_main.xml</text>
          <text x="515" y="212" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">values/strings.xml</text>
          <text x="515" y="230" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">drawable/ mipmap/</text>
          <text x="495" y="248" fontSize="11" fontFamily="monospace" fill="var(--danger)">AndroidManifest.xml</text>
          <text x="495" y="266" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">assets/</text>
          <text x="455" y="284" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">build.gradle</text>
          <text x="455" y="302" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">settings.gradle</text>

          {/* 下方：开发流程 */}
          <text x={VIEW_W / 2} y="350" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Android应用开发流程</text>

          <rect x="50" y="366" width="120" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="110" y="388" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">1.建项目</text>
          <text x="110" y="404" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">AS向导/Gradle</text>

          <text x="178" y="394" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="195" y="366" width="120" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="255" y="388" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">2.写界面</text>
          <text x="255" y="404" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">XML布局+控件</text>

          <text x="323" y="394" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="340" y="366" width="120" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="400" y="388" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">3.写逻辑</text>
          <text x="400" y="404" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Activity/事件</text>

          <text x="468" y="394" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="485" y="366" width="120" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="545" y="388" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">4.注册</text>
          <text x="545" y="404" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">清单文件声明</text>

          <text x="613" y="394" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="630" y="366" width="60" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="660" y="388" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">5.运行</text>
          <text x="660" y="404" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">模拟器/真机</text>

          {/* LogCat调试 */}
          <rect x="50" y="436" width="640" height="70" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="70" y="458" fontSize="12" fontWeight="600" fill="var(--accent)">LogCat日志调试</text>
          <text x="70" y="478" fontSize="10" fontFamily="monospace" fill="var(--text-secondary)">Log.v(tag, msg)  // VERBOSE 详细</text>
          <text x="70" y="494" fontSize="10" fontFamily="monospace" fill="var(--text-secondary)">Log.d(tag, msg)  // DEBUG 调试   Log.i(tag, msg) // INFO</text>
          <text x="400" y="478" fontSize="10" fontFamily="monospace" fill="var(--text-secondary)">Log.w(tag, msg)  // WARN 警告</text>
          <text x="400" y="494" fontSize="10" fontFamily="monospace" fill="var(--danger)">Log.e(tag, msg)  // ERROR 错误</text>

          <text x="70" y="530" fontSize="10" fill="var(--text-secondary)">DDMS = Dalvik Debug Monitor Service，提供线程/堆/文件浏览等调试视图</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Android四层架构（应用/框架/库与运行时/内核）与标准项目结构，从建项目到运行的完整开发流程
      </figcaption>
    </figure>
  );
}
