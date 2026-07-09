/**
 * <FlaUiLayoutDiagram>：UI布局与控件——六大布局与RecyclerView图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 540;

export function FlaUiLayoutDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="UI布局与控件图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            UI布局体系与RecyclerView工作流
          </text>

          {/* 上半：六大布局对比 */}
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">六大布局布局方式对比</text>

          <rect x="30" y="66" width="210" height="70" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="135" y="86" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">LinearLayout</text>
          <text x="135" y="102" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">线性排列（水平/垂直）</text>
          <text x="135" y="116" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">layout_weight 权重分配</text>
          <text x="135" y="130" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">orientation: horizontal|vertical</text>

          <rect x="255" y="66" width="210" height="70" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="360" y="86" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">RelativeLayout</text>
          <text x="360" y="102" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">相对定位</text>
          <text x="360" y="116" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">layout_above/below/toLeftOf</text>
          <text x="360" y="130" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">灵活但嵌套易乱</text>

          <rect x="480" y="66" width="230" height="70" rx="8" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="595" y="86" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">ConstraintLayout</text>
          <text x="595" y="102" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">约束布局（推荐）</text>
          <text x="595" y="116" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">约束关系连接两端</text>
          <text x="595" y="130" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">扁平化，减少嵌套层级</text>

          <rect x="30" y="148" width="330" height="56" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.5" />
          <text x="195" y="168" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">FrameLayout</text>
          <text x="195" y="184" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">帧布局——控件层叠堆放</text>
          <text x="195" y="196" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Fragment切换容器</text>

          <rect x="375" y="148" width="335" height="56" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.5" />
          <text x="542" y="168" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">TableLayout / GridLayout</text>
          <text x="542" y="184" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">表格/网格布局</text>
          <text x="542" y="196" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">行列结构化排列</text>

          {/* 下半：RecyclerView 工作流 */}
          <text x={VIEW_W / 2} y="232" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">RecyclerView 复用机制</text>

          <rect x="30" y="246" width="200" height="80" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="130" y="266" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">Adapter</text>
          <text x="130" y="282" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">onCreateViewHolder</text>
          <text x="130" y="296" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">创建ViewHolder</text>
          <text x="130" y="310" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">onBindViewHolder</text>
          <text x="130" y="324" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">绑定数据到控件</text>

          <text x="240" y="290" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="260" y="246" width="200" height="80" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="360" y="266" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">LayoutManager</text>
          <text x="360" y="282" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">LinearLayoutManager</text>
          <text x="360" y="296" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">GridLayoutManager</text>
          <text x="360" y="310" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">StaggeredGridLayoutManager</text>
          <text x="360" y="324" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">决定布局排列方式</text>

          <text x="470" y="290" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="490" y="246" width="220" height="80" rx="8" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="600" y="266" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">ViewHolder 复用池</text>
          <text x="600" y="282" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">滑出屏幕的ViewHolder</text>
          <text x="600" y="296" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">放入 RecycledViewPool</text>
          <text x="600" y="310" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">新item复用，只调onBind</text>
          <text x="600" y="324" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">避免重复inflate</text>

          {/* 常用控件列表 */}
          <rect x="30" y="346" width="680" height="80" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="368" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">常用控件速查</text>
          <text x="105" y="392" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">TextView 文本</text>
          <text x="105" y="406" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">EditText 输入</text>
          <text x="245" y="392" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Button 按钮</text>
          <text x="245" y="406" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">ImageView 图片</text>
          <text x="385" y="392" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">ProgressBar 进度</text>
          <text x="385" y="406" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">AlertDialog 对话框</text>
          <text x="530" y="392" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">ListView（已过时）</text>
          <text x="530" y="406" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">RecyclerView（推荐）</text>
          <text x="665" y="392" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">ViewPager2</text>
          <text x="665" y="406" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">自定义View</text>

          <text x="370" y="460" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">数据变化时调 adapter.notifyDataSetChanged() 或更细粒度的 notifyItemInserted/Removed</text>
          <text x="370" y="478" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">ItemDecoration 分隔线 / ItemAnimation 切换动画</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        六大布局（LinearLayout/RelativeLayout/ConstraintLayout/FrameLayout/TableLayout）与RecyclerView三件套（Adapter/LayoutManager/ViewHolder复用）
      </figcaption>
    </figure>
  );
}
