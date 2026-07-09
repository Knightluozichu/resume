/**
 * <KdgKotlinAndroidDiagram>：Kotlin Android开发核心概念图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function KdgKotlinAndroidDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Kotlin Android开发核心概念图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Kotlin Android 开发核心概念
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            扩展函数 / Android KTX / 协程替代回调 / 互操作 / Compose
          </text>

          <rect x="30" y="62" width="680" height="442" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 左列：扩展函数 */}
          <rect x="50" y="80" width="320" height="130" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="210" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">扩展函数</text>
          <text x="65" y="124" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">fun View.visible() &lbrace;</text>
          <text x="65" y="142" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  this.visibility = View.VISIBLE</text>
          <text x="65" y="160" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">&rbrace;</text>
          <text x="65" y="180" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">button.visible()  // 像成员一样调用</text>
          <text x="65" y="200" fontSize="10" fill="var(--text-tertiary)">不修改源类，静态解析，零运行时开销</text>

          {/* 右列：Android KTX */}
          <rect x="390" y="80" width="320" height="130" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="550" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">Android KTX 简化</text>
          <text x="405" y="124" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">// Java 写法</text>
          <text x="405" y="142" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">view.setOnClickListener &lbrace; ... &rbrace;</text>
          <text x="405" y="160" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace"></text>
          <text x="405" y="180" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">// KTX 简化</text>
          <text x="405" y="200" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">view.onClick &lbrace; ... &rbrace;  // 更简洁</text>

          {/* 左列：协程替代回调 */}
          <rect x="50" y="230" width="320" height="130" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="210" y="252" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">协程替代回调地狱</text>
          <text x="65" y="274" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">suspend fun login() =</text>
          <text x="65" y="292" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">  withContext(Dispatchers.IO) &lbrace;</text>
          <text x="65" y="310" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">    val token = api.auth()</text>
          <text x="65" y="328" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">    val user = api.getUser(token)</text>
          <text x="65" y="346" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">    user  // 顺序写法，非回调嵌套</text>

          {/* 右列：Java 互操作 */}
          <rect x="390" y="230" width="320" height="130" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="550" y="252" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">Java 互操作</text>
          <text x="405" y="274" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">// Kotlin 调 Java</text>
          <text x="405" y="292" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">val list = ArrayList&lt;String&gt;()</text>
          <text x="405" y="310" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">list.add("hi")  // 直接调用</text>
          <text x="405" y="330" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace"></text>
          <text x="405" y="348" fontSize="10" fill="var(--text-tertiary)">@JvmStatic / @JvmField / @file:JvmName</text>

          {/* 底部：Jetpack Compose */}
          <rect x="50" y="380" width="660" height="100" rx="8" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="380" y="402" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">Jetpack Compose：声明式 UI</text>
          <text x="65" y="424" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">@Composable</text>
          <text x="65" y="442" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">fun Greeting(name: String) &lbrace; Text("Hello, $name") &rbrace;</text>
          <text x="65" y="464" fontSize="10" fill="var(--text-tertiary)">Kotlin DSL 能力的极致应用——用函数式构建 UI 树，替代 XML 布局</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Kotlin Android开发——扩展函数、Android KTX简化、协程替代回调、Java互操作与Jetpack Compose
      </figcaption>
    </figure>
  );
}
