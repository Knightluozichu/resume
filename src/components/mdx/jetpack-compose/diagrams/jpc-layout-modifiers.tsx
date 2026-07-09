/**
 * <JpcLayoutModifiersDiagram>：Compose 布局体系与Modifier链图解。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 540;

export function JpcLayoutModifiersDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Compose布局体系与Modifier链图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            布局体系——核心组件与Modifier链
          </text>

          {/* 左侧：三大核心布局容器 */}
          <rect x="30" y="50" width="330" height="460" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="195" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">核心布局容器</text>

          {/* Column */}
          <rect x="50" y="90" width="290" height="70" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="60" y="110" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--success)">Column</text>
          <text x="60" y="128" textAnchor="start" fontSize="11" fill="var(--text-secondary)">垂直排列子元素</text>
          <text x="60" y="146" textAnchor="start" fontSize="11" fill="var(--text-secondary)">Arrangement.SpaceBetween / Alignment.Center</text>

          {/* Row */}
          <rect x="50" y="172" width="290" height="70" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="60" y="192" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--accent)">Row</text>
          <text x="60" y="210" textAnchor="start" fontSize="11" fill="var(--text-secondary)">水平排列子元素</text>
          <text x="60" y="228" textAnchor="start" fontSize="11" fill="var(--text-secondary)">Arrangement.SpaceEvenly / Alignment.Bottom</text>

          {/* Box */}
          <rect x="50" y="254" width="290" height="70" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="60" y="274" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--warning)">Box</text>
          <text x="60" y="292" textAnchor="start" fontSize="11" fill="var(--text-secondary)">层叠排列子元素（Z轴）</text>
          <text x="60" y="310" textAnchor="start" fontSize="11" fill="var(--text-secondary)">Alignment.TopStart / BottomEnd</text>

          {/* LazyColumn */}
          <rect x="50" y="336" width="290" height="70" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="60" y="356" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--danger)">LazyColumn / LazyRow</text>
          <text x="60" y="374" textAnchor="start" fontSize="11" fill="var(--text-secondary)">懒加载列表（替代RecyclerView）</text>
          <text x="60" y="392" textAnchor="start" fontSize="11" fill="var(--text-secondary)">items() / itemsIndexed() / key()</text>

          <text x="60" y="435" textAnchor="start" fontSize="11" fill="var(--text-secondary)">布局测量流程：</text>
          <text x="60" y="453" textAnchor="start" fontSize="11" fill="var(--text-secondary)">measure → place → 自上而下约束传播</text>
          <text x="60" y="471" textAnchor="start" fontSize="11" fill="var(--text-secondary)">place → 自下而上摆放</text>
          <text x="60" y="489" textAnchor="start" fontSize="11" fill="var(--text-secondary)">IntrinsicMeasurements 对齐自适应</text>

          {/* 右侧：Modifier 链 */}
          <rect x="380" y="50" width="330" height="460" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="545" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">Modifier 链（从外到内）</text>

          <rect x="400" y="90" width="290" height="34" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="545" y="111" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">Modifier.fillMaxWidth()</text>

          <text x="545" y="140" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="420" y="150" width="250" height="34" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="545" y="171" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">.padding(16.dp)</text>

          <text x="545" y="200" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="440" y="210" width="210" height="34" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="545" y="231" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">.background(Color.Blue)</text>

          <text x="545" y="260" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="460" y="270" width="170" height="34" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="545" y="291" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">.clip(CircleShape)</text>

          <text x="545" y="320" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="480" y="330" width="130" height="34" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="545" y="351" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">.clickable &lbrace;...&rbrace;</text>

          <text x="545" y="380" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="500" y="390" width="90" height="34" rx="6" fill="var(--text-primary)" fillOpacity="0.1" stroke="var(--text-primary)" strokeWidth="1" />
          <text x="545" y="411" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">Text()</text>

          <text x="545" y="450" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Modifier 不可变，链式调用返回新实例</text>
          <text x="545" y="468" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">顺序决定效果：先 padding 后 background</text>
          <text x="545" y="486" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">vs 先 background 后 padding（背景被裁）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Compose布局体系——Column/Row/Box/LazyColumn四大容器与Modifier链式修饰符的执行顺序
      </figcaption>
    </figure>
  );
}
