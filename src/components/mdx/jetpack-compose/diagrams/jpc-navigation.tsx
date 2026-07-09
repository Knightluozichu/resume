/**
 * <JpcNavigationDiagram>：Compose Navigation 导航图结构与路由流程图解。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 540;

export function JpcNavigationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Compose Navigation导航图结构与路由流程图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            导航与路由——NavHost 结构与导航流程
          </text>

          {/* 顶部：NavHost 结构 */}
          <rect x="30" y="50" width="680" height="180" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">NavHost 结构（导航图容器）</text>

          <rect x="50" y="90" width="640" height="34" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="370" y="111" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">NavHost(navController, startDestination = "home")</text>

          {/* 三个目的地 */}
          <rect x="60" y="136" width="190" height="80" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="155" y="158" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">composable("home")</text>
          <text x="155" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">HomeScreen()</text>
          <text x="155" y="196" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">起始目的地</text>
          <text x="155" y="210" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">startDestination</text>

          <rect x="275" y="136" width="190" height="80" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="370" y="158" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">composable("detail/&lbrace;id&rbrace;")</text>
          <text x="370" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">DetailScreen()</text>
          <text x="370" y="196" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">带参数路由</text>
          <text x="370" y="210" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">arguments = listOf(...)</text>

          <rect x="490" y="136" width="190" height="80" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="585" y="158" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">composable("settings")</text>
          <text x="585" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">SettingsScreen()</text>
          <text x="585" y="196" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">无参数路由</text>
          <text x="585" y="210" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">深层链接入口</text>

          {/* 中部：导航流程 */}
          <rect x="30" y="250" width="680" height="120" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="370" y="275" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">导航流程</text>

          <rect x="50" y="290" width="150" height="44" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="125" y="308" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">用户点击</text>
          <text x="125" y="324" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">onClick &lbrace;...&rbrace;</text>

          <text x="215" y="316" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="230" y="290" width="170" height="44" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="315" y="308" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">navController.navigate()</text>
          <text x="315" y="324" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">指定路由 + 参数</text>

          <text x="415" y="316" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="430" y="290" width="130" height="44" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="495" y="308" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">BackStack 入栈</text>
          <text x="495" y="324" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">保存状态</text>

          <text x="575" y="316" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="590" y="290" width="100" height="44" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="640" y="308" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">目标重组</text>
          <text x="640" y="324" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">渲染新屏</text>

          <text x="50" y="358" textAnchor="start" fontSize="11" fill="var(--text-secondary)">返回：navController.popBackStack() 或 navigate() &lbrace; popUpTo() &rbrace; 管理回退栈</text>

          {/* 底部：导航最佳实践 */}
          <rect x="30" y="390" width="680" height="120" rx="10" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="412" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">导航最佳实践</text>

          <text x="50" y="434" textAnchor="start" fontSize="11" fill="var(--text-secondary)">- 路由用常量定义，避免硬编码字符串散落各处</text>
          <text x="50" y="452" textAnchor="start" fontSize="11" fill="var(--text-secondary)">- 类型安全路由：用 Serializable 对象替代字符串拼接（Navigation 2.8+）</text>
          <text x="50" y="470" textAnchor="start" fontSize="11" fill="var(--text-secondary)">- 嵌套导航图：navigation() 分组管理多级页面流（如登录流程）</text>
          <text x="50" y="488" textAnchor="start" fontSize="11" fill="var(--text-secondary)">- BottomBar/TopBar 与 NavHost 联动：通过 currentBackStackEntryAsState() 高亮</text>
          <text x="50" y="506" textAnchor="start" fontSize="11" fill="var(--text-secondary)">- 深层链接：composable() 的 deepLinks 参数支持 URI scheme 和 intent filter</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Compose Navigation——NavHost导航图结构、导航流程与类型安全路由最佳实践
      </figcaption>
    </figure>
  );
}
