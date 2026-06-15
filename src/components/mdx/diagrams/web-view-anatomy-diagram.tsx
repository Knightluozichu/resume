/**
 * <WebViewAnatomyDiagram />：《Android 编程权威指南》advanced-ui-animation/webview 章
 * 「WebView 集成解剖」配图（HEL-198）。
 *
 * 画面内容：中央是 App 内嵌的 WebView 渲染区（画一个网页缩略：标题栏 + 几行内容 +
 * 一个链接），它就是被各个角色环绕、配置、驱动的核心控件。围绕它五个角色框，
 * 用箭头表达「谁作用在 WebView 上 / WebView 把事件回调给谁」：
 *   ① loadUrl() / loadData()（accent 配 WebView 自身）：把内容塞进 WebView——
 *      loadUrl 加载远程 URL、loadData/loadDataWithBaseURL 直接渲染 HTML 字符串。
 *      箭头：内容 → WebView（实线）。
 *   ② WebViewClient（success）：页面导航回调——shouldOverrideUrlLoading 拦截跳转
 *      让链接留在 WebView 内、onPageFinished 页面加载完成。
 *      箭头：WebView → WebViewClient（导航事件回调）。
 *   ③ WebChromeClient（success）：浏览器 UI 回调——onProgressChanged 进度条、
 *      onReceivedTitle 标题、onJsAlert 把 JS alert 换成原生对话框。
 *      箭头：WebView → WebChromeClient（UI 事件回调）。
 *   ④ WebSettings（warning）：一组开关——javaScriptEnabled、domStorageEnabled 等，
 *      决定 WebView 能力边界（默认不执行 JS）。箭头：WebSettings → WebView（配置）。
 *   ⑤ addJavascriptInterface（danger）：JS ↔ 原生双向桥——把原生对象注入 JS 全局，
 *      网页用 Android.方法名() 直接调原生；标注安全风险：暴露原生方法给网页。
 *      箭头：双向（原生 ⇄ JS）。
 * 整图点睛：JS 与原生的双向通信方向（原生→JS 走 evaluateJavascript，
 * JS→原生 走 addJavascriptInterface 注入的桥）。
 *
 * Server Component（纯展示，静态 SVG，无交互、无动画）。
 * 视觉语言：全部 DESIGN token 配色（accent = WebView 核心 / success = 客户端回调类 /
 * warning = WebSettings 配置 / danger = addJavascriptInterface 安全提示 /
 * text-primary / text-secondary / border / bg / bg-elevated），无裸 hex，rx 圆角，
 * 无阴影，几何常量具名且为 4 的倍数（硬规则 5）。
 */

// —— 周边角色框：tag = 调用/类名；kind = 一句话职责；notes = 要点；color = 语义色 token；
//    dir = 与 WebView 的关系方向（in：作用于 WebView；out：WebView 回调出去；both：双向）。 ——
type Role = {
  /** API / 类名（mono 字体高亮）。 */
  tag: string;
  /** 一句话职责。 */
  kind: string;
  /** 要点（多行）。 */
  notes: readonly string[];
  /** 语义色 token。 */
  color: string;
  /** 与 WebView 的关系方向。 */
  dir: "in" | "out" | "both";
};

// 左列角色（作用于 WebView：加载内容 + 配置）。
const LEFT_ROLES: readonly Role[] = [
  {
    tag: "loadUrl() / loadData()",
    kind: "把内容塞进 WebView",
    notes: ["loadUrl 加载远程 URL", "loadDataWithBaseURL 渲染 HTML 串"],
    color: "var(--accent)",
    dir: "in",
  },
  {
    tag: "WebSettings",
    kind: "能力开关",
    notes: ["javaScriptEnabled 显式开 JS", "domStorageEnabled 等开关"],
    color: "var(--warning)",
    dir: "in",
  },
];

// 右列角色（WebView 把事件回调出去）。
const RIGHT_ROLES: readonly Role[] = [
  {
    tag: "WebViewClient",
    kind: "页面导航回调",
    notes: ["shouldOverrideUrlLoading 拦截跳转", "onPageFinished 加载完成"],
    color: "var(--success)",
    dir: "out",
  },
  {
    tag: "WebChromeClient",
    kind: "浏览器 UI 回调",
    notes: ["onProgressChanged 进度 / onReceivedTitle 标题", "onJsAlert 换成原生对话框"],
    color: "var(--success)",
    dir: "out",
  },
];

// —— 布局常量（间距走 4 倍数语言）。 ——
const TOP = 76; // 内容区顶部 y（标题留白）

// 中央 WebView 渲染区（被各角色环绕的核心）。
const WV_W = 224; // WebView 框宽
const WV_H = 264; // WebView 框高
const WV_X = 268; // WebView 框左边距（让左右两列对称环绕）
const WV_PAD = 16; // WebView 框到内部网页缩略的内边距

// 左右角色框列。
const ROLE_W = 232; // 角色框宽
const ROLE_H = 96; // 角色框高
const ROLE_GAP = 32; // 同列角色框竖向间距
const LEFT_X = 12; // 左列左边距
const RIGHT_X = 520; // 右列左边距

// 底部 addJavascriptInterface 双向桥框（横跨中下方）。
const BRIDGE_W = 480; // 桥框宽
const BRIDGE_H = 80; // 桥框高
const BRIDGE_X = (764 - BRIDGE_W) / 2; // 桥框水平居中
const BRIDGE_TOP = TOP + 2 * ROLE_H + ROLE_GAP + 48; // 桥框顶部 y

const ARROW = 5; // 箭头三角半高

const VIEW_W = 764;
const VIEW_H = BRIDGE_TOP + BRIDGE_H + 48;

/** 同列第 i 个角色框的顶部 y。 */
function roleTop(i: number): number {
  return TOP + i * (ROLE_H + ROLE_GAP);
}

export function WebViewAnatomyDiagram() {
  // WebView 框竖向居中于左右两列之间（两列共占 2*ROLE_H + ROLE_GAP）。
  const colSpan = 2 * ROLE_H + ROLE_GAP;
  const wvTop = TOP + (colSpan - WV_H) / 2;
  const wvCx = WV_X + WV_W / 2;

  // WebView 内部网页缩略区。
  const pageX = WV_X + WV_PAD;
  const pageY = wvTop + WV_PAD + 24; // 让出 WebView 框顶部小标签
  const pageW = WV_W - WV_PAD * 2;

  // 桥框水平中线（双向箭头落点）。
  const bridgeCx = BRIDGE_X + BRIDGE_W / 2;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="WebView 集成解剖图。画面正中央是 App 内嵌的 WebView 渲染区，画成一个网页缩略：顶部一条地址栏，下面是网页标题、两行正文和一个可点击的链接——这就是被周边各个角色环绕、配置和驱动的核心控件，用品牌强调色突出。左侧从上到下两个作用于 WebView 的角色框：第一个是 loadUrl() 和 loadData()，职责是把内容塞进 WebView，其中 loadUrl 加载远程 URL，loadDataWithBaseURL 直接渲染 HTML 字符串，用一条实线箭头指向 WebView，表示内容流入；第二个是 WebSettings，是一组能力开关，必须显式打开 javaScriptEnabled 才会执行 JS，还有 domStorageEnabled 等开关，用箭头指向 WebView 表示配置生效。右侧从上到下两个接收 WebView 回调的客户端类，用成功色表示：第一个是 WebViewClient，负责页面导航回调，shouldOverrideUrlLoading 拦截链接跳转让它留在 WebView 内部，onPageFinished 在页面加载完成时触发，箭头方向是 WebView 指向 WebViewClient，表示导航事件回调出去；第二个是 WebChromeClient，负责浏览器外观相关的 UI 回调，onProgressChanged 报告加载进度、onReceivedTitle 拿到网页标题、onJsAlert 把网页里的 JS alert 弹窗替换成原生对话框，箭头同样从 WebView 指向它。下方横跨一条用危险红色标注的桥框：addJavascriptInterface，它把原生对象注入 JS 全局作用域，实现 JavaScript 与原生代码的双向通信——网页里的 JavaScript 通过 Android.方法名() 直接调用原生方法，原生侧则通过 evaluateJavascript 反向执行网页里的 JS。桥框用一个双向箭头连接原生与网页，并明确标注安全风险：addJavascriptInterface 等于把原生方法暴露给网页，恶意网页可能借此调用原生能力，必须谨慎控制注入对象的权限。"
          className="mx-auto block h-auto w-full max-w-[764px]"
        >
          {/* —— 标题 —— */}
          <text
            x={LEFT_X}
            y="28"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            WebView 集成解剖：内容塞进去、事件回调出来、JS 与原生双向通
          </text>
          <text
            x={LEFT_X}
            y="48"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            中央 WebView 是核心；loadUrl/WebSettings 作用于它，两个 Client 接它的回调，addJavascriptInterface 架起双向桥
          </text>

          {/* —— 左列角色框：loadUrl/loadData、WebSettings（作用于 WebView，箭头 → WebView）—— */}
          {LEFT_ROLES.map((r, i) => {
            const y = roleTop(i);
            const cy = y + ROLE_H / 2;
            const fromX = LEFT_X + ROLE_W;
            return (
              <g key={r.tag}>
                <rect
                  x={LEFT_X}
                  y={y}
                  width={ROLE_W}
                  height={ROLE_H}
                  rx="8"
                  fill={r.color}
                  fillOpacity="0.08"
                  stroke={r.color}
                  strokeWidth="1.4"
                />
                {/* 左侧语义色条 */}
                <rect
                  x={LEFT_X}
                  y={y}
                  width="4"
                  height={ROLE_H}
                  rx="2"
                  fill={r.color}
                />
                {/* API / 类名 */}
                <text
                  x={LEFT_X + 16}
                  y={y + 24}
                  fontSize="12"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                  fill={r.color}
                >
                  {r.tag}
                </text>
                {/* 职责 */}
                <text
                  x={LEFT_X + 16}
                  y={y + 44}
                  fontSize="10.5"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {r.kind}
                </text>
                {/* 要点（多行） */}
                {r.notes.map((n, j) => (
                  <text
                    key={n}
                    x={LEFT_X + 16}
                    y={y + 62 + j * 14}
                    fontSize="9.5"
                    fill="var(--text-secondary)"
                  >
                    {n}
                  </text>
                ))}
                {/* 箭头：角色 → WebView（作用于 WebView） */}
                <line
                  x1={fromX}
                  y1={cy}
                  x2={WV_X - ARROW}
                  y2={cy}
                  stroke={r.color}
                  strokeWidth="1.6"
                />
                <path
                  d={`M ${WV_X} ${cy}
                      l -${ARROW * 1.6} -${ARROW}
                      l 0 ${ARROW * 2} Z`}
                  fill={r.color}
                />
                <text
                  x={(fromX + WV_X) / 2}
                  y={cy - 6}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="600"
                  fill={r.color}
                >
                  {i === 0 ? "加载内容 →" : "配置开关 →"}
                </text>
              </g>
            );
          })}

          {/* —— 右列角色框：WebViewClient、WebChromeClient（接 WebView 回调，箭头 WebView →）—— */}
          {RIGHT_ROLES.map((r, i) => {
            const y = roleTop(i);
            const cy = y + ROLE_H / 2;
            return (
              <g key={r.tag}>
                <rect
                  x={RIGHT_X}
                  y={y}
                  width={ROLE_W}
                  height={ROLE_H}
                  rx="8"
                  fill={r.color}
                  fillOpacity="0.08"
                  stroke={r.color}
                  strokeWidth="1.4"
                />
                {/* 左侧语义色条 */}
                <rect
                  x={RIGHT_X}
                  y={y}
                  width="4"
                  height={ROLE_H}
                  rx="2"
                  fill={r.color}
                />
                {/* 类名 */}
                <text
                  x={RIGHT_X + 16}
                  y={y + 24}
                  fontSize="12"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                  fill={r.color}
                >
                  {r.tag}
                </text>
                {/* 职责 */}
                <text
                  x={RIGHT_X + 16}
                  y={y + 44}
                  fontSize="10.5"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {r.kind}
                </text>
                {/* 要点（多行） */}
                {r.notes.map((n, j) => (
                  <text
                    key={n}
                    x={RIGHT_X + 16}
                    y={y + 62 + j * 14}
                    fontSize="9"
                    fill="var(--text-secondary)"
                  >
                    {n}
                  </text>
                ))}
                {/* 箭头：WebView → 角色（回调） */}
                <line
                  x1={WV_X + WV_W}
                  y1={cy}
                  x2={RIGHT_X - ARROW}
                  y2={cy}
                  stroke={r.color}
                  strokeWidth="1.6"
                />
                <path
                  d={`M ${RIGHT_X} ${cy}
                      l -${ARROW * 1.6} -${ARROW}
                      l 0 ${ARROW * 2} Z`}
                  fill={r.color}
                />
                <text
                  x={(WV_X + WV_W + RIGHT_X) / 2}
                  y={cy - 6}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="600"
                  fill={r.color}
                >
                  → 事件回调
                </text>
              </g>
            );
          })}

          {/* —— 中央：App 内嵌的 WebView 渲染区（核心，accent 色）—— */}
          <rect
            x={WV_X}
            y={wvTop}
            width={WV_W}
            height={WV_H}
            rx="12"
            fill="var(--accent)"
            fillOpacity="0.06"
            stroke="var(--accent)"
            strokeWidth="1.8"
          />
          {/* WebView 顶部标签 */}
          <text
            x={wvCx}
            y={wvTop + 18}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--accent)"
          >
            WebView（App 内嵌浏览器）
          </text>
          {/* —— 内部网页缩略：地址栏 + 标题 + 正文 + 链接 —— */}
          {/* 地址栏 */}
          <rect
            x={pageX}
            y={pageY}
            width={pageW}
            height="22"
            rx="6"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <text
            x={pageX + 10}
            y={pageY + 15}
            fontSize="9"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            https://example.com
          </text>
          {/* 网页内容卡片 */}
          <rect
            x={pageX}
            y={pageY + 34}
            width={pageW}
            height={WV_H - WV_PAD * 2 - 24 - 34}
            rx="6"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1"
          />
          {/* 网页标题 */}
          <text
            x={pageX + 12}
            y={pageY + 60}
            fontSize="11"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            活动页 / 隐私协议
          </text>
          {/* 正文两行（占位线条） */}
          {[0, 1].map((r) => (
            <rect
              key={`line-${r}`}
              x={pageX + 12}
              y={pageY + 76 + r * 16}
              width={pageW - 24 - r * 24}
              height="6"
              rx="3"
              fill="var(--text-secondary)"
              fillOpacity="0.4"
            />
          ))}
          {/* 网页里的链接（被 shouldOverrideUrlLoading 拦截的对象） */}
          <text
            x={pageX + 12}
            y={pageY + 124}
            fontSize="10"
            fontWeight="600"
            fill="var(--accent)"
          >
            点此查看详情 ↗
          </text>
          <text
            x={pageX + 12}
            y={pageY + 142}
            fontSize="8.5"
            fill="var(--text-secondary)"
          >
            （链接点击 → WebViewClient 决定去留）
          </text>

          {/* —— 底部桥框：addJavascriptInterface（JS ↔ 原生双向桥，danger 安全提示）—— */}
          {/* WebView → 桥：竖直连线 + 箭头 */}
          <line
            x1={wvCx}
            y1={wvTop + WV_H}
            x2={wvCx}
            y2={BRIDGE_TOP - ARROW}
            stroke="var(--danger)"
            strokeWidth="1.6"
            strokeDasharray="5 4"
          />
          <path
            d={`M ${wvCx} ${BRIDGE_TOP}
                l -${ARROW} -${ARROW * 1.6}
                l ${ARROW * 2} 0 Z`}
            fill="var(--danger)"
          />
          <rect
            x={BRIDGE_X}
            y={BRIDGE_TOP}
            width={BRIDGE_W}
            height={BRIDGE_H}
            rx="8"
            fill="var(--danger)"
            fillOpacity="0.08"
            stroke="var(--danger)"
            strokeWidth="1.4"
          />
          {/* 左侧语义色条 */}
          <rect
            x={BRIDGE_X}
            y={BRIDGE_TOP}
            width="4"
            height={BRIDGE_H}
            rx="2"
            fill="var(--danger)"
          />
          {/* 桥名 */}
          <text
            x={BRIDGE_X + 16}
            y={BRIDGE_TOP + 22}
            fontSize="12"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--danger)"
          >
            addJavascriptInterface（JS ⇄ 原生双向桥）
          </text>
          {/* 双向通信方向标注 */}
          <text
            x={BRIDGE_X + 16}
            y={BRIDGE_TOP + 42}
            fontSize="9.5"
            fill="var(--text-primary)"
          >
            JS → 原生：网页用 Android.方法名() 调注入的原生对象
          </text>
          <text
            x={BRIDGE_X + 16}
            y={BRIDGE_TOP + 58}
            fontSize="9.5"
            fill="var(--text-primary)"
          >
            原生 → JS：evaluateJavascript() 反向执行网页里的 JS
          </text>
          {/* 安全风险点睛 */}
          <text
            x={BRIDGE_X + 16}
            y={BRIDGE_TOP + 74}
            fontSize="9"
            fontWeight="600"
            fill="var(--danger)"
          >
            ⚠ 安全风险：等于把原生方法暴露给网页，恶意页面可借此调原生能力——慎控注入对象权限
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        <code>WebView</code> 是 App 内嵌的浏览器引擎，处在所有角色的正中央：
        <code> loadUrl()</code> / <code>loadData()</code> 把内容塞进去、
        <code> WebSettings</code> 用 <code>javaScriptEnabled</code> 等开关划定能力边界；
        <code> WebViewClient</code>（<code>shouldOverrideUrlLoading</code> 拦跳转、
        <code> onPageFinished</code>）与 <code>WebChromeClient</code>（进度 / 标题 / JS
        alert）接收它的事件回调；而 <code>addJavascriptInterface</code> 在 JS 与原生之间架起双向桥——
        强大但危险，等于把原生方法暴露给网页，务必谨慎控制注入对象的权限。
      </figcaption>
    </figure>
  );
}
