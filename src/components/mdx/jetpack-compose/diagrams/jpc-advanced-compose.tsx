/**
 * <JpcAdvancedComposeDiagram>：Compose 自定义布局与手势处理图解。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 540;

export function JpcAdvancedComposeDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Compose自定义布局与手势处理图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            高级Compose——自定义布局与手势处理
          </text>

          {/* 左侧：自定义布局 */}
          <rect x="30" y="50" width="330" height="460" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="195" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">自定义布局</text>

          {/* Layout 组件 */}
          <rect x="50" y="90" width="290" height="80" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="60" y="110" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--success)">Layout() 组件</text>
          <text x="60" y="128" textAnchor="start" fontSize="11" fill="var(--text-secondary)">measure policy: MeasurePolicy</text>
          <text x="60" y="146" textAnchor="start" fontSize="11" fill="var(--text-secondary)">measure: 测量子元素（Constraints）</text>
          <text x="60" y="162" textAnchor="start" fontSize="11" fill="var(--text-secondary)">place: 摆放子元素（Placeable.placeRelative）</text>

          {/* 测量流程 */}
          <rect x="50" y="182" width="290" height="100" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="60" y="202" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--warning)">测量流程</text>
          <text x="60" y="220" textAnchor="start" fontSize="11" fill="var(--text-secondary)">1. 父约束 Constraints(minW,maxW,minH,maxH)</text>
          <text x="60" y="238" textAnchor="start" fontSize="11" fill="var(--text-secondary)">2. 子元素 measurable.measure(constraints)</text>
          <text x="60" y="256" textAnchor="start" fontSize="11" fill="var(--text-secondary)">3. 返回 Placeable（含宽高）</text>
          <text x="60" y="274" textAnchor="start" fontSize="11" fill="var(--text-secondary)">4. layout(w,h) &lbrace; placeable.place(x,y) &rbrace;</text>

          {/* SubcomposeLayout */}
          <rect x="50" y="294" width="290" height="60" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="60" y="314" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--danger)">SubcomposeLayout</text>
          <text x="60" y="332" textAnchor="start" fontSize="11" fill="var(--text-secondary)">分阶段组合：先测外层再决定组合内层</text>
          <text x="60" y="348" textAnchor="start" fontSize="11" fill="var(--text-secondary)">适用：LazyList/TabRow 等依赖测量结果的内容</text>

          {/* 修饰符自定义 */}
          <rect x="50" y="366" width="290" height="60" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="60" y="386" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--accent)">Modifier.layout() / drawBehind()</text>
          <text x="60" y="404" textAnchor="start" fontSize="11" fill="var(--text-secondary)">layout: 拦截测量与摆放</text>
          <text x="60" y="420" textAnchor="start" fontSize="11" fill="var(--text-secondary)">drawBehind: 自定义绘制（Canvas）</text>

          <text x="60" y="452" textAnchor="start" fontSize="11" fill="var(--text-secondary)">IntrinsicSize: 自适应内容大小</text>
          <text x="60" y="470" textAnchor="start" fontSize="11" fill="var(--text-secondary)">minIntrinsicWidth / maxIntrinsicHeight</text>
          <text x="60" y="488" textAnchor="start" fontSize="11" fill="var(--text-secondary)">BoxWithConstraints: 获取可用约束</text>

          {/* 右侧：手势处理 */}
          <rect x="380" y="50" width="330" height="460" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="545" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">手势处理</text>

          {/* pointerInput */}
          <rect x="400" y="90" width="290" height="80" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="410" y="110" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--success)">Modifier.pointerInput()</text>
          <text x="410" y="128" textAnchor="start" fontSize="11" fill="var(--text-secondary)">detectTapGestures: 点击/双击/长按</text>
          <text x="410" y="146" textAnchor="start" fontSize="11" fill="var(--text-secondary)">detectDragGestures: 拖拽</text>
          <text x="410" y="162" textAnchor="start" fontSize="11" fill="var(--text-secondary)">detectTransformGestures: 缩放+旋转</text>

          {/* 点击 */}
          <rect x="400" y="182" width="290" height="56" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="410" y="202" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--warning)">Modifier.clickable() / combinedClickable()</text>
          <text x="410" y="220" textAnchor="start" fontSize="11" fill="var(--text-secondary)">clickable: 单击事件</text>
          <text x="410" y="234" textAnchor="start" fontSize="11" fill="var(--text-secondary)">combinedClickable: 单击+双击+长按</text>

          {/* 拖拽 */}
          <rect x="400" y="250" width="290" height="56" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="410" y="270" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--danger)">Modifier.draggable() / swipeable()</text>
          <text x="410" y="288" textAnchor="start" fontSize="11" fill="var(--text-secondary)">draggable: 单方向拖拽（带状态）</text>
          <text x="410" y="302" textAnchor="start" fontSize="11" fill="var(--text-secondary)">swipeable: 锚点式滑动（Drawer）</text>

          {/* 滚动 */}
          <rect x="400" y="318" width="290" height="56" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="410" y="338" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--accent)">Modifier.scrollable() / nestedScroll()</text>
          <text x="410" y="356" textAnchor="start" fontSize="11" fill="var(--text-secondary)">scrollable: 自定义滚动方向</text>
          <text x="410" y="370" textAnchor="start" fontSize="11" fill="var(--text-secondary)">nestedScroll: 嵌套滚动连接</text>

          {/* 手势原理 */}
          <rect x="400" y="386" width="290" height="100" rx="6" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="0.8" strokeOpacity="0.3" />
          <text x="410" y="406" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--text-primary)">手势传播原理</text>
          <text x="410" y="424" textAnchor="start" fontSize="11" fill="var(--text-secondary)">PointerInput 事件自顶向下传播</text>
          <text x="410" y="442" textAnchor="start" fontSize="11" fill="var(--text-secondary)">消费机制：consume() 阻止向下传递</text>
          <text x="410" y="460" textAnchor="start" fontSize="11" fill="var(--text-secondary)">多指：PointerId 区分不同触摸点</text>
          <text x="410" y="478" textAnchor="start" fontSize="11" fill="var(--text-secondary)">协程：awaitPointerEventScope 挂起</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Compose高级技术——自定义布局（Layout/SubcomposeLayout）与手势处理（pointerInput/draggable/nestedScroll）
      </figcaption>
    </figure>
  );
}
