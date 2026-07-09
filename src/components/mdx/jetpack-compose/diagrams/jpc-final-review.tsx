/**
 * <JpcFinalReviewDiagram>：全书知识图谱与选型矩阵图解。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 580;

export function JpcFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Jetpack Compose全书知识图谱与选型矩阵图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            全书知识图谱——核心概念关联与选型矩阵
          </text>

          {/* 中心节点 */}
          <rect x="270" y="50" width="200" height="44" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">UI = f(state)</text>
          <text x="370" y="88" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">声明式核心心智模型</text>

          {/* 放射状分支：六大核心领域 */}
          {/* 基础（左上） */}
          <line x1="290" y1="94" x2="150" y2="130" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 2" />
          <rect x="40" y="115" width="180" height="56" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="130" y="137" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">基础</text>
          <text x="130" y="155" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">@Composable / remember</text>
          <text x="130" y="167" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Slot API / Composition</text>

          {/* 布局（左中） */}
          <line x1="280" y1="94" x2="150" y2="200" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 2" />
          <rect x="40" y="185" width="180" height="56" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="130" y="207" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">布局</text>
          <text x="130" y="225" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Column/Row/Box/LazyColumn</text>
          <text x="130" y="237" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Modifier 链 / 约束传播</text>

          {/* 状态（右上） */}
          <line x1="450" y1="94" x2="590" y2="130" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 2" />
          <rect x="520" y="115" width="180" height="56" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="610" y="137" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">状态</text>
          <text x="610" y="155" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">State / 重组 / 状态提升</text>
          <text x="610" y="167" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">ViewModel / derivedStateOf</text>

          {/* 动画（右中） */}
          <line x1="460" y1="94" x2="590" y2="200" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 2" />
          <rect x="520" y="185" width="180" height="56" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="610" y="207" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">动画</text>
          <text x="610" y="225" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">animate*AsState / Animatable</text>
          <text x="610" y="237" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">AnimatedVisibility / Transition</text>

          {/* 主题（左下） */}
          <line x1="290" y1="94" x2="150" y2="270" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 2" />
          <rect x="40" y="255" width="180" height="56" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="130" y="277" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">主题</text>
          <text x="130" y="295" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">MaterialTheme / ColorScheme</text>
          <text x="130" y="307" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Typography / Shapes</text>

          {/* 导航+互操作+高级（右下） */}
          <line x1="450" y1="94" x2="590" y2="270" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 2" />
          <rect x="520" y="255" width="180" height="56" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="610" y="277" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">导航 / 互操作 / 高级</text>
          <text x="610" y="295" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">NavHost / AndroidView</text>
          <text x="610" y="307" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">自定义布局 / 手势</text>

          {/* 底部：选型矩阵 */}
          <rect x="30" y="330" width="680" height="220" rx="10" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="352" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">选型决策矩阵</text>

          {/* 表头 */}
          <rect x="50" y="362" width="160" height="28" rx="4" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="130" y="380" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">场景</text>

          <rect x="220" y="362" width="200" height="28" rx="4" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="320" y="380" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">首选方案</text>

          <rect x="430" y="362" width="260" height="28" rx="4" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="560" y="380" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">理由</text>

          {/* 行1 */}
          <rect x="50" y="394" width="160" height="28" rx="4" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="0.5" />
          <text x="130" y="412" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">列表展示</text>
          <rect x="220" y="394" width="200" height="28" rx="4" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="0.5" />
          <text x="320" y="412" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">LazyColumn + key</text>
          <rect x="430" y="394" width="260" height="28" rx="4" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="0.5" />
          <text x="560" y="412" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">懒加载，key 保障稳定</text>

          {/* 行2 */}
          <rect x="50" y="426" width="160" height="28" rx="4" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="0.5" />
          <text x="130" y="444" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">状态持有</text>
          <rect x="220" y="426" width="200" height="28" rx="4" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="0.5" />
          <text x="320" y="444" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">ViewModel + StateFlow</text>
          <rect x="430" y="426" width="260" height="28" rx="4" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="0.5" />
          <text x="560" y="444" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">跨重组存活，生命周期感知</text>

          {/* 行3 */}
          <rect x="50" y="458" width="160" height="28" rx="4" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="0.5" />
          <text x="130" y="476" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">显隐动画</text>
          <rect x="220" y="458" width="200" height="28" rx="4" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="0.5" />
          <text x="320" y="476" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">AnimatedVisibility</text>
          <rect x="430" y="458" width="260" height="28" rx="4" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="0.5" />
          <text x="560" y="476" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">声明式，自动 fade+slide</text>

          {/* 行4 */}
          <rect x="50" y="490" width="160" height="28" rx="4" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="0.5" />
          <text x="130" y="508" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">嵌入 WebView</text>
          <rect x="220" y="490" width="200" height="28" rx="4" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="0.5" />
          <text x="320" y="508" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">AndroidView</text>
          <rect x="430" y="490" width="260" height="28" rx="4" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="0.5" />
          <text x="560" y="508" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">互操作，factory+update</text>

          {/* 行5 */}
          <rect x="50" y="522" width="160" height="28" rx="4" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="0.5" />
          <text x="130" y="540" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">手势缩放</text>
          <rect x="220" y="522" width="200" height="28" rx="4" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="0.5" />
          <text x="320" y="540" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">pointerInput + detectTransform</text>
          <rect x="430" y="522" width="260" height="28" rx="4" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="0.5" />
          <text x="560" y="540" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">底层API，精确控制多指</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Jetpack Compose全书知识图谱——以UI=f(state)为核心的六大领域关联与选型决策矩阵
      </figcaption>
    </figure>
  );
}
