/**
 * <JpcViewInteropDiagram>：Compose 与传统 View 互操作双向集成图解。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function JpcViewInteropDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Compose与View互操作双向集成图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            与View互操作——双向集成与迁移策略
          </text>

          {/* 左侧：View 中嵌入 Compose */}
          <rect x="30" y="50" width="330" height="320" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="195" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">View 中嵌入 Compose</text>

          <rect x="50" y="90" width="290" height="34" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="195" y="111" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">ComposeView（XML 中用）</text>

          <rect x="50" y="134" width="290" height="56" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.8" />
          <text x="60" y="154" textAnchor="start" fontSize="11" fill="var(--text-secondary)">&lt;androidx.compose.ui.platform.ComposeView</text>
          <text x="60" y="172" textAnchor="start" fontSize="11" fill="var(--text-secondary)">  android:id="@+id/compose_view" /&gt;</text>

          <rect x="50" y="200" width="290" height="34" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="195" y="221" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">AbstractComposeView（自定义View）</text>

          <rect x="50" y="244" width="290" height="56" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.8" />
          <text x="60" y="264" textAnchor="start" fontSize="11" fill="var(--text-secondary)">findViewById&lt;ComposeView&gt;(R.id.compose_view)</text>
          <text x="60" y="282" textAnchor="start" fontSize="11" fill="var(--text-secondary)">  .setContent &lbrace; MyComposable() &rbrace;</text>

          <text x="195" y="320" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">适用：渐进迁移、嵌入 WebView/Map 等已有View体系</text>
          <text x="195" y="338" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">注意：每个 ComposeView 独立 Composition 开销</text>

          {/* 右侧：Compose 中嵌入 View */}
          <rect x="380" y="50" width="330" height="320" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="545" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">Compose 中嵌入 View</text>

          <rect x="400" y="90" width="290" height="34" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="545" y="111" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">AndroidView（Compose 中用）</text>

          <rect x="400" y="134" width="290" height="80" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="410" y="154" textAnchor="start" fontSize="11" fill="var(--text-secondary)">AndroidView(factory = &lbrace; ctx -&gt;</text>
          <text x="410" y="172" textAnchor="start" fontSize="11" fill="var(--text-secondary)">  WebView(ctx) // 创建传统View</text>
          <text x="410" y="190" textAnchor="start" fontSize="11" fill="var(--text-secondary)">&rbrace;, update = &lbrace; view -&gt;</text>
          <text x="410" y="208" textAnchor="start" fontSize="11" fill="var(--text-secondary)">  view.loadUrl(url) // 重组时更新</text>

          <rect x="400" y="224" width="290" height="34" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="545" y="245" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">AndroidView with recycle</text>

          <rect x="400" y="268" width="290" height="56" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="410" y="288" textAnchor="start" fontSize="11" fill="var(--text-secondary)">factory 只调用一次（创建View）</text>
          <text x="410" y="306" textAnchor="start" fontSize="11" fill="var(--text-secondary)">update 每次重组调用（同步属性）</text>

          <text x="545" y="338" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">适用：WebView/MapView/AdView/视频播放器</text>

          {/* 底部：互操作性能与迁移策略 */}
          <rect x="30" y="390" width="680" height="100" rx="10" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="412" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">互操作性能与迁移策略</text>

          <text x="50" y="434" textAnchor="start" fontSize="11" fill="var(--text-secondary)">- 性能开销：每次 AndroidView 重组会触发 View 的 measure/layout，避免在快速滚动列表中使用</text>
          <text x="50" y="452" textAnchor="start" fontSize="11" fill="var(--text-secondary)">- 迁移策略：自底向上（先迁移叶子页面，再迁移容器），每个 Fragment 独立迁移</text>
          <text x="50" y="470" textAnchor="start" fontSize="11" fill="var(--text-secondary)">- 共享主题：用 MaterialTheme 包裹 AndroidView，或通过 LocalContext 传递主题</text>
          <text x="50" y="488" textAnchor="start" fontSize="11" fill="var(--text-secondary)">- 事件传递：View 的事件用 Modifier 拦截，Compose 的事件用 View.OnClickListener 桥接</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Compose与View互操作——AndroidView/ComposeView双向集成与渐进迁移策略
      </figcaption>
    </figure>
  );
}
