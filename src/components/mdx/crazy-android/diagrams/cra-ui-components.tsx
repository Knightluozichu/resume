/**
 * <CraUiComponentsDiagram>：UI组件与布局图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 580;

export function CraUiComponentsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Android UI布局与组件体系图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Android六大布局 与 常用UI组件
          </text>

          {/* 左侧：六大布局 */}
          <text x="185" y="52" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">六大布局管理器</text>

          <rect x="50" y="64" width="270" height="44" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="65" y="82" fontSize="11" fontWeight="600" fill="var(--accent)">LinearLayout</text>
          <text x="65" y="98" fontSize="11" fill="var(--text-secondary)">线性排列 orientation: horizontal/vertical + weight权重</text>

          <rect x="50" y="114" width="270" height="44" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="65" y="132" fontSize="11" fontWeight="600" fill="var(--accent)">RelativeLayout</text>
          <text x="65" y="148" fontSize="11" fill="var(--text-secondary)">相对定位 above/below/toLeftOf/toRightOf/alignParentX</text>

          <rect x="50" y="164" width="270" height="44" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="65" y="182" fontSize="11" fontWeight="600" fill="var(--warning)">TableLayout</text>
          <text x="65" y="198" fontSize="11" fill="var(--text-secondary)">表格 TableRow行 + collapseColumns/shrinkColumns/stretchColumns</text>

          <rect x="50" y="214" width="270" height="44" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="65" y="232" fontSize="11" fontWeight="600" fill="var(--warning)">FrameLayout</text>
          <text x="65" y="248" fontSize="11" fill="var(--text-secondary)">层叠堆放 layout_gravity定位，Fragment容器首选</text>

          <rect x="50" y="264" width="270" height="44" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="65" y="282" fontSize="11" fontWeight="600" fill="var(--danger)">GridLayout</text>
          <text x="65" y="298" fontSize="11" fill="var(--text-secondary)">网格 rowCount/columnCount + layout_columnSpan跨列</text>

          <rect x="50" y="314" width="270" height="44" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="65" y="332" fontSize="11" fontWeight="600" fill="var(--danger)">AbsoluteLayout</text>
          <text x="65" y="348" fontSize="11" fill="var(--text-secondary)">绝对坐标 x/y（已废弃，不推荐使用）</text>

          {/* 右侧：常用组件 */}
          <text x="555" y="52" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">常用UI组件</text>

          <rect x="420" y="64" width="270" height="124" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="435" y="84" fontSize="11" fontWeight="600" fill="var(--accent)">文本类</text>
          <text x="435" y="102" fontSize="11" fill="var(--text-secondary)">TextView — 文本显示</text>
          <text x="435" y="118" fontSize="11" fill="var(--text-secondary)">EditText — 可编辑输入框</text>
          <text x="435" y="134" fontSize="11" fill="var(--text-secondary)">AutoCompleteTextView — 自动补全</text>
          <text x="435" y="150" fontSize="11" fontWeight="600" fill="var(--accent)">按钮类</text>
          <text x="435" y="168" fontSize="11" fill="var(--text-secondary)">Button / ImageButton / ToggleButton</text>
          <text x="435" y="184" fontSize="11" fill="var(--text-secondary)">CheckBox / RadioButton / Switch</text>

          <rect x="420" y="196" width="270" height="100" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="435" y="216" fontSize="11" fontWeight="600" fill="var(--accent)">图像与进度</text>
          <text x="435" y="234" fontSize="11" fill="var(--text-secondary)">ImageView — 图片显示</text>
          <text x="435" y="250" fontSize="11" fill="var(--text-secondary)">ProgressBar — 进度条（圆/横）</text>
          <text x="435" y="266" fontSize="11" fill="var(--text-secondary)">SeekBar — 可拖拽进度条</text>
          <text x="435" y="282" fontSize="11" fill="var(--text-secondary)">RatingBar — 评分条</text>

          <rect x="420" y="304" width="270" height="62" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="435" y="324" fontSize="11" fontWeight="600" fill="var(--accent)">AdapterView（列表型）</text>
          <text x="435" y="342" fontSize="11" fill="var(--text-secondary)">ListView / GridView / Spinner</text>
          <text x="435" y="358" fontSize="11" fill="var(--text-secondary)">Gallery / AdapterViewFlipper</text>

          {/* 下方：AdapterView工作原理 */}
          <text x={VIEW_W / 2} y="398" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">AdapterView工作原理：Adapter桥接数据与视图</text>

          <rect x="50" y="414" width="180" height="60" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="140" y="438" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">数据源</text>
          <text x="140" y="456" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">List&lt;Map&gt; / 数组</text>
          <text x="140" y="468" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Cursor / JSON</text>

          <text x="240" y="446" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="260" y="414" width="180" height="60" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="350" y="438" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">Adapter适配器</text>
          <text x="350" y="456" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">ArrayAdapter</text>
          <text x="350" y="468" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">SimpleAdapter / BaseAdapter</text>

          <text x="450" y="446" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="470" y="414" width="220" height="60" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="580" y="438" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">AdapterView</text>
          <text x="580" y="456" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">ListView / GridView</text>
          <text x="580" y="468" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">getView() 创建/复用item视图</text>

          {/* 底部提示 */}
          <rect x="50" y="494" width="640" height="50" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="370" y="516" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">核心：Adapter = 数据源与 AdapterView 之间的桥梁</text>
          <text x="370" y="532" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">getView() 负责把数据项渲染为列表项View，View复用机制决定性能</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Android六大布局管理器与常用UI组件，AdapterView通过Adapter桥接数据源与列表视图
      </figcaption>
    </figure>
  );
}
