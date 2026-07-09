/**
 * <JpcStateManagementDiagram>：Compose 状态管理与重组机制图解。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 540;

export function JpcStateManagementDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Compose状态管理与重组机制图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            状态管理——State驱动重组与状态持有
          </text>

          {/* 顶部：重组流程环 */}
          <rect x="30" y="50" width="680" height="130" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">重组流程（Recomposition Loop）</text>

          <rect x="50" y="90" width="130" height="44" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="115" y="108" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">State 变化</text>
          <text x="115" y="124" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">mutableStateOf</text>

          <text x="195" y="116" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="210" y="90" width="130" height="44" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="275" y="108" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">调度重组</text>
          <text x="275" y="124" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Snapshot 追踪</text>

          <text x="355" y="116" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="370" y="90" width="130" height="44" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="435" y="108" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">重组 @Composable</text>
          <text x="435" y="124" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">重新执行函数体</text>

          <text x="515" y="116" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="530" y="90" width="160" height="44" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="610" y="108" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">更新 UI 树</text>
          <text x="610" y="124" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">diff + applyChanges</text>

          {/* 中部左侧：状态持有方式 */}
          <rect x="30" y="200" width="330" height="310" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="195" y="225" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">状态持有方式</text>

          <rect x="50" y="240" width="290" height="56" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="60" y="260" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--success)">remember &lbrace; mutableStateOf() &rbrace;</text>
          <text x="60" y="278" textAnchor="start" fontSize="11" fill="var(--text-secondary)">组合内记忆，重组不丢失</text>
          <text x="60" y="292" textAnchor="start" fontSize="11" fill="var(--text-secondary)">配置变更（旋转）会丢失</text>

          <rect x="50" y="306" width="290" height="56" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="60" y="326" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--warning)">rememberSaveable &lbrace;...&rbrace;</text>
          <text x="60" y="344" textAnchor="start" fontSize="11" fill="var(--text-secondary)">跨配置变更存活</text>
          <text x="60" y="358" textAnchor="start" fontSize="11" fill="var(--text-secondary)">通过 Bundle 序列化保存</text>

          <rect x="50" y="372" width="290" height="56" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="60" y="392" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--danger)">ViewModel + StateFlow</text>
          <text x="60" y="410" textAnchor="start" fontSize="11" fill="var(--text-secondary)">跨重组和配置变更存活</text>
          <text x="60" y="424" textAnchor="start" fontSize="11" fill="var(--text-secondary)">生命周期感知，业务逻辑承载</text>

          <rect x="50" y="438" width="290" height="56" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="60" y="458" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--accent)">derivedStateOf &lbrace;...&rbrace;</text>
          <text x="60" y="476" textAnchor="start" fontSize="11" fill="var(--text-secondary)">派生状态，依赖变化才重组</text>
          <text x="60" y="490" textAnchor="start" fontSize="11" fill="var(--text-secondary)">避免不必要重组，性能优化</text>

          {/* 中部右侧：状态提升 */}
          <rect x="380" y="200" width="330" height="310" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="545" y="225" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">状态提升（State Hoisting）</text>

          <rect x="400" y="240" width="290" height="70" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="545" y="260" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">有状态（Stateful）</text>
          <text x="545" y="278" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">@Composable fun Counter() &lbrace;</text>
          <text x="545" y="294" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">  var count by remember &lbrace; mutableStateOf(0) &rbrace;</text>

          <text x="545" y="326" textAnchor="middle" fontSize="16" fill="var(--accent)">&darr; 提升状态 &darr;</text>

          <rect x="400" y="340" width="290" height="90" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="545" y="360" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">无状态（Stateless）</text>
          <text x="545" y="378" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">@Composable fun Counter(</text>
          <text x="545" y="394" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">  count: Int, onIncrement: () -&gt; Unit</text>
          <text x="545" y="410" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">) // 父组件持有状态</text>

          <rect x="400" y="442" width="290" height="56" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="545" y="462" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">单向数据流</text>
          <text x="545" y="480" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">状态向下流动，事件向上传递</text>
          <text x="545" y="494" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">State &darr; &nbsp; Event &uarr;</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Compose状态管理——State驱动重组循环、四种状态持有方式与状态提升单向数据流
      </figcaption>
    </figure>
  );
}
